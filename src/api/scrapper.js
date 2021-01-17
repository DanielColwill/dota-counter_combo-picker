const puppeteer = require("puppeteer");

async function scrape(url, name) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);

  const test1 = await page.$x('//td[text()="Axe"]/following-sibling');
  const test2 = await test1[0].getProperty('innerText');
  const text = await test2.jsonValue();
  console.log(text);
  // await page.evaluate(() => {
    // let winrate = await page.evaluate(() => {
    //   let names = Array.from(
    //     document.querySelectorAll(".container-inner td:first-of-type"),
    //     (element) => element.textContent
    //   );
    //   for (var i = 0; i < names.length; i++){
    //     if (names[i] === name) {
    //       return names[i];
    //     }
    //   }
    //   // for (var i = 0; i < names.length; i++) {
    //   //   if (heroNames[i] === name) {
    //   //     winrate = await page.evaluate(() => {
    //   //       let rate = document.querySelector(".container-inner td").nextSibling
    //   //         .nextSibling.innerText;
    //   //       return rate;
    //   //     });
    //   //   }
    //   // }
    // });

    // return winrate;
  // });
}
scrape("https://www.dotabuff.com/heroes/trends", "Outworld Destroyer");
