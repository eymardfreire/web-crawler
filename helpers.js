const { JSDOM } = require('jsdom');

function normalizeURL(url) {
  try {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'http://' + url; // Default to http if no protocol is provided
    }
    const urlObj = new URL(url);
    let normalizedURL = `${urlObj.hostname}${urlObj.pathname}`;
    normalizedURL = normalizedURL.toLowerCase(); // Convert to lowercase
    return normalizedURL.endsWith("/") ? normalizedURL.slice(0, -1) : normalizedURL;
  } catch (error) {
    console.error(`Invalid URL: ${url}`);
    return null;
  }
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const anchors = dom.window.document.querySelectorAll('a');
  anchors.forEach(anchor => {
    let href = anchor.href;
    if (!href.startsWith('http://') && !href.startsWith('https://')) {
      href = new URL(href, baseURL).href; // Convert relative URLs to absolute URLs
    }
    urls.push(href);
  });
  return urls;
}

module.exports = { normalizeURL, getURLsFromHTML };
