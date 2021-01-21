var express = require("express");
var router = express.Router();
const puppeteer = require("puppeteer");

router.get("/winrates", function (req, res, next) {
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

      let temp = [];
      for (var i = 0; i < names.length; i++) {
        temp.push({ name: names[i], winrate: rates[i] });
      }
      return temp;
    });

    // console.log(winrates);
    res.send(winrates);
  }
  scrape("https://www.dotabuff.com/heroes/trends");
});

module.exports = router;
