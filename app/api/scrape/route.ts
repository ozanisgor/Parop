import { NextRequest, NextResponse } from "next/server";
import chromium from "@sparticuz/chromium-min";
import puppeteer from "puppeteer-extra";
import cheerio from "cheerio";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Post from "@/models/Post";
import connect from "@/app/api/mongodb";
import "dotenv/config";

export const maxDuration = 60;
export const dynamic = "force-dynamic";
export const revalidate = 0;

const SECRET_TOKEN = process.env.CRON_JOB_SECRET_TOKEN;
const ALLOWED_IPS = process.env.ALLOWED_IPS?.split(",") || [];

const normalizeIp = (ip: string) => {
  if (ip.startsWith("::ffff:")) {
    return ip.replace("::ffff:", "");
  }
  return ip;
};

puppeteer.use(StealthPlugin());

const readExistingArticles = async () => {
  console.log("Reading existing articles from MongoDB...");
  try {
    const existingArticles = await Post.find({});
    return existingArticles;
  } catch (error) {
    console.error("Error reading articles from MongoDB:", error);
    return [];
  }
};
const scrapeArticles = async () => {
  console.log("Scraping articles...");

  const browser = await puppeteer.launch({
    args: [...chromium.args, "--no-sandbox"],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(
      process.env.CHROMIUM_EXECUTABLE_PATH
    ),
    headless: chromium.headless,
  });
  console.log("Browser launched successfully");

  try {
    const page = await browser.newPage();
    const url = `${process.env.SOURCE_URL}${process.env.TAG}`;
    await page.goto(url, { waitUntil: "domcontentloaded" });
    console.log(`Navigated to URL: ${url}`);

    await page.waitForSelector(".group.inline");
    const htmlContent = await page.content();
    const $ = cheerio.load(htmlContent);
    const scrapedArticles: { title: string; href: string }[] = [];
    $(".group.inline li").each((index, element) => {
      if (index < 1) {
        const title = $(element).find(".post-card-inline__title").text().trim();
        const href = $(element).find("a").attr("href");
        if (title && href) {
          scrapedArticles.push({ title, href });
        }
      }
    });
    await wait();
    return scrapedArticles;
  } catch (error) {
    console.error("Error scraping articles:", error);
    return [];
  } finally {
    await browser.close();
  }
};
const processWithGemini = async (scrapedContent: string) => {
  console.log("Processing with Gemini...");
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
  const prompt = `Read this news content: '${scrapedContent}' ${process.env.PROMPT}`;
  const result = await model.generateContent(prompt);
  const responseText = result.response.text();
  console.log("Raw response from Gemini:", responseText);

  try {
    const cleanResponse = responseText
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    console.log("Cleaned response:", cleanResponse);
    const parsedResponse = JSON.parse(cleanResponse);
    if (!parsedResponse.content || !parsedResponse.tags) {
      throw new Error("Invalid response structure from Gemini");
    }
    return parsedResponse;
  } catch (error) {
    console.error("Error parsing Gemini response:", error);
    console.error("Raw response:", responseText);

    return {
      content: scrapedContent,
      tags: ["genel"],
      title: "Yeni Makale",
    };
  }
};
const updateArticles = async () => {
  try {
    console.log("Updating articles...");
    await connect();
    const existingArticles = await readExistingArticles();
    console.log(
      "Existing articles fetched: ",
      existingArticles[existingArticles.length - 1]
    );

    const scrapedArticles = await scrapeArticles();
    console.log("Scraped articles: ", scrapedArticles);

    if (!scrapedArticles.length) {
      console.log("No articles scraped.");
      return;
    }

    for (const scrapedArticle of scrapedArticles) {
      const found = existingArticles.some(
        (article) => article.link === scrapedArticle.href
      );
      if (!found) {
        console.log(
          `New article found: ${scrapedArticle.href}, scraping content...`
        );
        const browser = await puppeteer.launch({
          args: [...chromium.args, "--no-sandbox"],
          defaultViewport: chromium.defaultViewport,
          executablePath: await chromium.executablePath(
            "https://github.com/Sparticuz/chromium/releases/download/v127.0.0/chromium-v127.0.0-pack.tar"
          ),
          headless: chromium.headless,
        });
        const page = await browser.newPage();
        await page.goto(`${process.env.SOURCE_URL}${scrapedArticle.href}`, {
          waitUntil: "domcontentloaded",
        });
        const htmlContent = await page.content();
        const $ = cheerio.load(htmlContent);
        const scrapedContent: string[] = [];
        $(
          "div.post-content.relative p:not([class]):not(:has(strong)), blockquote, h2"
        ).each((index, element) => {
          scrapedContent.push($(element).text().trim());
        });
        console.log("Scraped content: ", scrapedContent);

        await browser.close();
        const newContent = await processWithGemini(scrapedContent.join("\n"));
        console.log(newContent, "newContent");
        const newTitle = extractTitleFromContent(newContent.content);
        const newSlug = createSlug(newTitle);
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        try {
          await Post.create({
            title: scrapedArticle.title,
            titleTR: newTitle,
            content: newContent.content,
            tags: newContent.tags,
            description: newContent.description,
            link: scrapedArticle.href,
            slug: newSlug,
            imageNum: randomNumber,
            readingTime: newContent.readingTime,
          });
        } catch (error: any) {
          console.error("Error saving post:", error);
        }
      } else {
        console.log(`Article already exists: ${scrapedArticle.href}`);
      }
    }
  } catch (error) {
    console.error("Error updating articles:", error);
  }
};
export async function GET(request: NextRequest) {
  console.log("GET request received, starting updateArticles...");

  const clientIp = request.headers.get("x-forwarded-for") || request.ip || "";
  const normalizedIp = normalizeIp(clientIp);
  const authToken = request.headers.get("x-cron-job-token");

  if (!process.env.ALLOWED_IPS || !process.env.CRON_JOB_SECRET_TOKEN) {
    return NextResponse.json(
      { status: "error", message: "Server configuration error." },
      { status: 500 }
    );
  }

  if (!ALLOWED_IPS.includes(normalizedIp)) {
    return NextResponse.json(
      { status: "error", message: "Access denied. Invalid IP." },
      { status: 403 }
    );
  }

  if (authToken !== SECRET_TOKEN) {
    return NextResponse.json(
      { status: "error", message: "Access denied. Invalid token." },
      { status: 403 }
    );
  }

  try {
    await updateArticles();
    console.log("Articles updated successfully!");

    const headers = {
      "Cache-Control": "no-store",
    };

    return NextResponse.json(
      { status: "success", message: "Articles updated successfully!" },
      { headers, status: 200 }
    );
  } catch (error) {
    console.error("Error updating articles:", error);

    const headers = {
      "Cache-Control": "no-store",
    };

    return NextResponse.json(
      { status: "error", message: "Failed to update articles." },
      { headers, status: 500 }
    );
  }
}
const extractTitleFromContent = (content: string): string => {
  console.log("Extracting title from markdown content...");

  // Match both ## Title and ##Title formats
  const h1Match = content.match(/^##\s*([^\n]+)/m);

  if (!h1Match) {
    console.log("No title found in content, using default");
    throw new Error(
      "No title found in content. Blog post cannot be created without a title."
    );
  }

  const title = h1Match[1].trim();
  console.log("Extracted title:", title);
  return title;
};

const createSlug = (title: string): string => {
  console.log("Creating slug...");

  const turkishMap: { [key: string]: string } = {
    ı: "i",
    ğ: "g",
    ü: "u",
    ş: "s",
    ö: "o",
    ç: "c",
    İ: "i",
    Ğ: "g",
    Ü: "u",
    Ş: "s",
    Ö: "o",
    Ç: "c",
  };

  return title
    .toLowerCase()
    .trim()
    .split("")
    .map((char) => turkishMap[char] || char)
    .join("")
    .normalize("NFD") // normalize unicode characters
    .replace(/[\u0300-\u036f]/g, "") // remove diacritics/accents
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars except spaces and hyphens
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-") // remove consecutive hyphens
    .replace(/^-+/, "") // remove leading hyphens
    .replace(/-+$/, ""); // remove trailing hyphens
};

const wait = async () => {
  const getRandomWaitTime =
    Math.floor(Math.random() * (4000 - 5000 + 1)) + 4000;
  console.log(`Waiting for ${getRandomWaitTime / 1000} seconds...`);
  await new Promise((resolve) => setTimeout(resolve, getRandomWaitTime));
};
