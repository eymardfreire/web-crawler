const axios = require('axios');
const { getURLsFromHTML, normalizeURL } = require('./helpers');
const { printReport } = require('./report');

async function crawlPage(baseURL, currentURL, pages = {}) {
  if (!currentURL.startsWith(baseURL)) {
    return pages;
  }

  const normalizedURL = normalizeURL(currentURL);

  if (pages[normalizedURL]) {
    pages[normalizedURL]++;
    return pages;
  }

  pages[normalizedURL] = 1;

  try {
    const response = await axios.get(currentURL);

    if (response.status >= 400) {
      console.error(`Error: Received status code ${response.status} for ${currentURL}`);
      return pages;
    }

    const contentType = response.headers['content-type'];
    if (!contentType || !contentType.includes('text/html')) {
      console.error(`Error: Non-HTML content received for ${currentURL} (Content-Type: ${contentType})`);
      return pages;
    }

    const htmlBody = response.data;
    const urls = getURLsFromHTML(htmlBody, baseURL);

    for (const url of urls) {
      pages = await crawlPage(baseURL, url, pages);
    }
  } catch (error) {
    console.error(`Error fetching ${currentURL}:`, error.message);
  }

  return pages;
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length !== 1) {
    console.error('Usage: npm start BASE_URL');
    process.exit(1);
  }

  const baseURL = args[0];
  console.log(`Starting crawl at: ${baseURL}`);

  const pages = await crawlPage(baseURL, baseURL);
  printReport(pages);
}

main();
