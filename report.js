function printReport(pages) {
    console.log('Crawl Report');
    console.log('============');
  
    // Sort pages by the number of inbound internal links, in descending order
    const sortedPages = Object.entries(pages).sort(([, a], [, b]) => b - a);
  
    // Print each page in a formatted way
    sortedPages.forEach(([url, count]) => {
      console.log(`Found ${count} internal links to ${url}`);
    });
  }
  
  module.exports = { printReport };
  