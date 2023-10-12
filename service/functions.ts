import puppeteer from "puppeteer";
import cheerio from "cheerio";
import BlogEntry from "../models/BlogEntry.model";
import { config } from "../const/config";
import fs from "fs";
import PDFDocument from "pdfkit";

export function analyzeSentiment(title: string, description: string) {
  const positiveWords = [
    "joy",
    "positive impact",
    "vibrant",
    "joyful",
    "amazing",
    "excellent",
    "love"
  ];
  const negativeWords = [
    "challenges",
    "disappointing",
    "negative impact",
    "critical",
    "candid",
    "unbiased"
  ];

  const text = `${title.toLowerCase()} ${description.toLowerCase()}`;
  const words = text.split(/\s+/);
  let positiveCount = 0;
  let negativeCount = 0;

  words.forEach(word => {
    if (positiveWords.includes(word)) {
      positiveCount++;
    } else if (negativeWords.includes(word)) {
      negativeCount++;
    }
  });

  if (positiveCount > negativeCount) {
    return "positive";
  } else if (negativeCount > positiveCount) {
    return "negative";
  } else {
    return "neutral";
  }
}

export function countWords(text: string): number {
  const words = text.split(/\s+/);

  const filteredWords = words.filter(word => word.trim() !== "");

  return filteredWords.length;
}

export function scrapeBlogEntries(html: string): BlogEntry[] {
  const $ = cheerio.load(html);
  const entries: BlogEntry[] = [];
  const outputFilePath: string = "output.pdf";

  $("main > div > div > div > div").each(function() {
    const element = $(this);
    const title = element.find('a[href*="/blog/"]').text();
    const short_description = element
      .find("div > div > div > div + div")
      .text();
    const image =
      config.BASE_URL + element.find("img").first().attr("src") || "";
    const author = element.find("div > div > div > div > div").first().text();
    const authorDescription = element
      .find("div > div > div > div > div + div")
      .first()
      .text();
    const date = element.find("time").text();
    const href =
      config.BASE_URL + element.find('a[href*="/blog/"]').attr("href") || "";
    const sentiment = analyzeSentiment(title, short_description);
    const words =
      countWords(title) +
      countWords(short_description) +
      countWords(author) +
      countWords(authorDescription);

    entries.push({
      title,
      short_description,
      image,
      author,
      authorDescription,
      date,
      href,
      sentiment,
      words
    });
  });

  entries.splice(0, 2);
  createPDF(entries, outputFilePath);
  return entries;
}

export async function scrapeWebsite(url: string) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const content = await page.content();
    const scrapedDataArray = scrapeBlogEntries(content);

    await browser.close();
    return scrapedDataArray;
  } catch (error) {
    throw error;
  }
}

function createPDF(data: BlogEntry[], outputFilePath: string) {
  const doc = new PDFDocument();
  const stream = fs.createWriteStream(outputFilePath);
  doc.pipe(stream);

  data.forEach(entry => {
    doc.fontSize(16).text(entry.title);
    doc.fontSize(12).text(entry.short_description);
    doc.fontSize(10).text(`Author: ${entry.author}`);
    doc.fontSize(10).text(`Author Description: ${entry.authorDescription}`);
    doc.fontSize(10).text(`Date: ${entry.date}`);
    doc.fontSize(8).text(`Sentiment: ${entry.sentiment}`);
    doc.fontSize(8).text(`Word Count: ${entry.words}`);
    doc.fontSize(10).text(`URL: ${entry.href}`);
    doc.fontSize(10).text("");
  });

  doc.end();
}
