var express = require("express");
var router = express.Router();
const puppeteer = require("puppeteer");

router.get("/winrates/:name", function (req, res, next) {
  // console.log(req.params.name);
  async function scrape(url, name) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);


    let heroNames = await page.evaluate(() => {
      let names = Array.from(
        document.querySelectorAll(".container-inner td:first-of-type"),
        (element) => element.textContent
      );
      return names;
    });
    let winrate = "";
    console.log(name);
    for (var i = 0; i < heroNames.length; i++) {
      if (heroNames[i] === name) {
        winrate = await page.evaluate(() => {
          let rate = document.querySelector(".container-inner td").nextSibling
            .nextSibling.innerText;
          return rate;
        });
      }
    }

    console.log("current winrate: " + winrate);
    res.send(winrate);
  }

  scrape("https://www.dotabuff.com/heroes/trends", req.params.name);
});

module.exports = router;
