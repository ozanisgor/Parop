import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import puppeteer from "puppeteer";
import cheerio from "cheerio";
// import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Post from "@/models/Post";
import "dotenv/config";
import connect from "@/lib/mongodb";
// puppeteer.use(StealthPlugin());
import dotenv from "dotenv";

dotenv.config();

const readExistingArticles = async () => {
  try {
    const existingArticles = await Post.find({});
    return existingArticles;
  } catch (error) {
    console.error("Error reading articles from MongoDB:", error);
    return [];
  }
};
const scrapeArticles = async () => {
  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();
    const url = `${process.env.SOURCE_URL}${process.env.TAG}`;
    await page.goto(url, { waitUntil: "domcontentloaded" });
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
  const prompt = `Read this '${scrapedContent}' ${process.env.PROMPT}`;
  const result = await model.generateContent(prompt);
  return result.response.text();
};
const updateArticles = async () => {
  await connect();
  const existingArticles = await readExistingArticles();
  const scrapedArticles = await scrapeArticles();
  for (const scrapedArticle of scrapedArticles) {
    const found = existingArticles.some(
      (article) => article.title === scrapedArticle.title
    );
    if (!found) {
      const browser = await puppeteer.launch({ headless: true });
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
      await browser.close();
      const newContent = await processWithGemini(scrapedContent.join("\n"));
      const newTitle = extractTitle(newContent);
      const newSlug = createSlug(newTitle);
      await Post.create({
        title: scrapedArticle.title,
        titleTR: newTitle,
        content: newContent,
        link: scrapedArticle.href,
        slug: newSlug,
      });
    }
  }
};
export async function GET() {
  await updateArticles();
  return NextResponse.json({ message: "Articles updated successfully!" });
}
const extractTitle = (content: string): string | null => {
  const titleRegex = /^## (.*?)\n\n/;
  const match = content.match(titleRegex);
  return match ? match[1] : null;
};
const createSlug = (title: string | null): string | null => {
  if (!title) return null;
  title = title.replace(/['".,]/g, "");
  return title.toLowerCase().replace(/\s+/g, "-");
};
const wait = async () => {
  const getRandomWaitTime =
    Math.floor(Math.random() * (4000 - 5000 + 1)) + 4000;
  console.log(`Waiting for ${getRandomWaitTime / 1000} seconds...`);
  await new Promise((resolve) => setTimeout(resolve, getRandomWaitTime));
};
