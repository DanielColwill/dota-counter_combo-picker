const puppeteer = require("puppeteer");

async function scrape(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);

  let data = await page.evaluate(() => {
    let name = document.querySelectorAll('.container-inner, td:first-of-type').getAttribute('data-value');
    return name;
  });
}

scrape("https://www.dotabuff.com/heroes/trends");
