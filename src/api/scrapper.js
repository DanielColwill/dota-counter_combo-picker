const { json } = require("express");
const puppeteer = require("puppeteer");

// console.log(req.params.name);
async function scrape(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);

  let winrates = await page.evaluate(() => {
    let names = Array.from(
      document.querySelectorAll(".container-inner td:first-of-type"),
      (element) => element.textContent
    );

    let rates = Array.from(
      document.querySelectorAll(".container-inner td:first-of-type"),
      (element) => element.nextSibling.nextSibling.textContent
    );

    let temp = {};
    for (var i = 0; i < names.length; i++) {
      temp[names[i]] = rates[i];
   }
    return temp;
  });

  console.log(winrates);

  return winrates;
}

scrape("https://www.dotabuff.com/heroes/trends");
