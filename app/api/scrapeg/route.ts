import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

const scrapeGoogle = async () => {
  let fullTitle = ""; // Declare fullTitle outside of try block

  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: true });

  try {
    const page = await browser.newPage();

    // Navigate the page to a URL.
    await page.goto("https://developer.chrome.com/");

    // Set screen size.
    await page.setViewport({ width: 1080, height: 1024 });

    // Type into search box.
    await page
      .locator(".devsite-search-field")
      .fill("automate beyond recorder");

    // Wait and click on first result.
    await page.locator(".devsite-result-item-link").click();

    // Locate the full title with a unique string.
    const textSelector = await page
      .locator("text/Customize and automate")
      .waitHandle();

    // Get the full title text content
    fullTitle =
      (await textSelector.evaluate((el) => el.textContent)) || "Default Title";
  } catch (error) {
    console.error("Error scraping Google:", error);
  } finally {
    await browser.close();
  }

  return fullTitle; // Return the full title
};

export async function GET() {
  const fullTitle = await scrapeGoogle(); // Get the title from scrapeGoogle function
  return NextResponse.json({
    message: "Google scraped successfully!",
    title: fullTitle,
  });
}
