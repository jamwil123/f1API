const puppeteer = require("puppeteer");
const fs = require("fs");
const cheerio = require("cheerio");

async function getHTML(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const html = await page.content();
  await browser.close();
  return html;
}

function getContentFromElement(html, selector) {
  const $ = cheerio.load(html);
  return $(selector).text();
}

function areContentsDifferent(content1, content2) {
  return content1.trim() !== content2.trim();
}

async function main() {
  const url = "https://www.jamesdavidwilson.co.uk/";
  const elementSelector =
    "#root > div > main > div:nth-child(1) > div > div.introText > main";
  const previousContentPath = "previous-content.txt";

  // Check if the previous content file exists
  let previousContent = "";
  try {
    previousContent = fs.readFileSync(previousContentPath, "utf-8");
  } catch (err) {
    // Handle the case where there is no previous content file
    if (err.code === "ENOENT") {
      console.log(
        "No previous content file found. Creating one with the current content."
      );

      // Get the current HTML content
      const currentHTML = await getHTML(url);

      // Get the content from the specified element
      const currentContent = getContentFromElement(
        currentHTML,
        elementSelector
      );

      // Save the current content to the file
      fs.writeFileSync(previousContentPath, currentContent, "utf-8");

      // End the function
      return;
    } else {
      // Handle other errors
      console.error("Error reading previous content file:", err.message);
      return;
    }
  }

  // Get the HTML content of the web page
  const currentHTML = await getHTML(url);

  // Get the content from the specified element
  const currentContent = getContentFromElement(currentHTML, elementSelector);

  // Check if the content is different
  if (areContentsDifferent(currentContent, previousContent)) {
    console.log("Content inside the specified element has changed!");
  } else {
    console.log("Content inside the specified element has not changed.");
  }

  // Store the new content as the previous one for the next comparison
  fs.writeFileSync(previousContentPath, currentContent, "utf-8");
}

main();
