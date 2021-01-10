const puppeteer = require('puppeteer');

async function scrape(url){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const [el] = await page.$x('/html/body/div[1]/div[8]/div[2]/div[3]/div[1]/div[1]/section[2]/article/div[1]/a/img');
  const src = await el.getProperty('src');
  const srcTxt = await src.jsonValue();

  console.log(srcTxt);
  
}

scrape("https://www.dotabuff.com/");