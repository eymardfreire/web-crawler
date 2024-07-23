const axios = require('axios');
const cheerio = require('cheerio');

// The URL of the website you want to crawl
const url = 'https://example.com';

axios(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    // Example: Extract all the text inside <h1> tags
    const headings = [];
    $('h1').each((index, element) => {
      headings.push($(element).text());
    });

    console.log(headings);
  })
  .catch(error => {
    console.error(`There was an error fetching the URL: ${error}`);
  });
