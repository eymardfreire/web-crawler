const { getURLsFromHTML } = require('./helpers');

describe('getURLsFromHTML', () => {
  test('should extract absolute URLs', () => {
    const htmlBody = '<a href="https://blog.boot.dev/path/">Go to Boot.dev</a>';
    const baseURL = 'https://blog.boot.dev';
    const urls = getURLsFromHTML(htmlBody, baseURL);
    expect(urls).toEqual(['https://blog.boot.dev/path/']);
  });

  test('should convert relative URLs to absolute URLs', () => {
    const htmlBody = '<a href="/path/">Go to Boot.dev</a>';
    const baseURL = 'https://blog.boot.dev';
    const urls = getURLsFromHTML(htmlBody, baseURL);
    expect(urls).toEqual(['https://blog.boot.dev/path/']);
  });

  test('should find all anchor elements in HTML body', () => {
    const htmlBody = `
      <a href="https://blog.boot.dev/path1/">Path 1</a>
      <a href="/path2/">Path 2</a>
    `;
    const baseURL = 'https://blog.boot.dev';
    const urls = getURLsFromHTML(htmlBody, baseURL);
    expect(urls).toEqual(['https://blog.boot.dev/path1/', 'https://blog.boot.dev/path2/']);
  });
});
