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
        (element) => element.textContent.toString
      );

      let rates = Array.from(
        document.querySelectorAll(".container-inner td:first-of-type"),
        (element) => element.nextSibling.nextSibling.textContent
      );
      let result = {};
      for (var i = 0; i < names.length; i++) {
        result[names[i]] = rates[i];
      }
      return result;
    });

    console.log(winrates);
    res.send(winrates);
  }
});

module.exports = router;
