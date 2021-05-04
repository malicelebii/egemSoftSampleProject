const express = require("express");
const router = express.Router();
const cheerio = require("cheerio");
const request = require("request");
const puppeteer = require("puppeteer");

const vgmUrl = "https://www.bynogame.com/Oyunlar/knight-online/gold-bar";

router.get("/", (req, res) => {
  res.json({ asd: "asd" });
});

router.get("/1", (req, res) => {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(vgmUrl);
    let array = [];
    const links = await page.$$eval("div", (elements) =>
      elements
        .filter((element) => {
          const parensRegex = /^((?!\().)*$/;
          return element.className.includes("ko-gb-card-price");
        })
        .map((element) => element.innerText)
    );

    links.forEach((link) => {
      array.push(link.replace(/\s\s+/g, ""));
    });
    console.log(array);

    const json = {
      SiriusBuy: array[0].slice(26, 30).replace(/\s\s+/g, ""),
      SiriusSell: array[0].slice(7, 12),
      VegaBuy: array[1].slice(25, 30),
      VegaSell: array[1].slice(7, 12),
      AltarBuy: array[2].slice(25, 30),
      AltarSell: array[2].slice(7, 12),
      OlympiaBuy: array[3].slice(25, 30),
      OlympiaSell: array[3].slice(7, 12),
      AresBuy: array[4].slice(23, 30),
      AresSell: array[4].slice(7, 12),
      DiezBuy: array[5].slice(25, 30),
      DiezSell: array[5].slice(7, 12),
      GordionBuy: array[6].slice(25, 30),
      GordionSell: array[6].slice(7, 12),
      RosettaBuy: array[7].slice(25, 30),
      RosettaSell: array[7].slice(7, 12),
      DestanBuy: array[8].slice(25, 30),
      DestanSell: array[8].slice(7, 12),
    };
    console.log(json);
    await browser.close();
    res.send("asd");
  })();
});

router.get("/bynogamegb", (req, res) => {
  const asd = {};
  var options = {
    proxy: process.env.QUOTAGUARDSTATIC_URL,
    url: 'https://www.bynogame.com/oyunlar/knight-online/premium-cash',
    headers: {
        'User-Agent': 'node.js'
    }
};
var options2 = {
    proxy: process.env.QUOTAGUARDSTATIC_URL,
    url: 'https://www.bynogame.com/Oyunlar/knight-online/gold-bar',
    headers: {
        'User-Agent': 'node.js'
    }
};
    
  request(
    options,
    (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        let arrayCash = [];

        $(".ko-gb-card-price span span").each((i, el) => {
          const item = $(el).html();
          arrayCash.push(item.slice(1, 5).replace(/\s\s+/g, ""));
        });
        // console.log(arrayCash[1])
        asd.cash = arrayCash[1];
        console.log(asd.cash);
      }
    }
  );

  request(
    options2,
    (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        let arrayGB = [];
        /*SERVER LİSTESİ */
        // let arraySERVER = [];

        // $(".no-gutters .gb-product-name .card-title").each((i, el) => {
        //   const item = $(el).text().replace(/\s\s+/g, ""); //brad approach
        //   arraySERVER.push(item);
        // });

        $(".others1 span span").each((i, el) => {
          const item = $(el)
            .text()
            .split(" ")
            .filter((price) => /\S/.test(price)); //stackoverflowdan buldum
          arrayGB.push(item.join());
        });

        const json = {
          SiriusBuy: arrayGB.slice(1, 2).join(),
          SiriusSell: arrayGB.slice(0, 1).join(),
          VegaBuy: arrayGB.slice(3, 4).join(),
          VegaSell: arrayGB.slice(2, 3).join(),
          AltarBuy: arrayGB.slice(5, 6).join(),
          AltarSell: arrayGB.slice(4, 5).join(),
          OlympiaBuy: arrayGB.slice(7, 8).join(),
          OlympiaSell: arrayGB.slice(6, 7).join(),
          AresBuy: arrayGB.slice(9, 10).join(),
          AresSell: arrayGB.slice(8, 9).join(),
          DiezBuy: arrayGB.slice(11, 12).join(),
          DiezSell: arrayGB.slice(10, 11).join(),
          GordionBuy: arrayGB.slice(13, 14).join(),
          GordionSell: arrayGB.slice(12, 13).join(),
          RosettaBuy: arrayGB.slice(15, 16).join(),
          RosettaSell: arrayGB.slice(14, 15).join(),
          DestanBuy: arrayGB.slice(17, 18).join(),
          DestanSell: arrayGB.slice(16, 17).join(),
          Cash: asd.cash,
        };

        console.log(json);
        // console.log(arraySERVER);
        res.json(json);
      }
    }
  );
});

router.get("/kopazargb", async (req, res) => {
  const asd = {};

  await request(
    "https://www.kopazar.com/knight-online-cash",
    (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        let arrayCash = [];

        $(".order-4 strong").each((i, el) => {
          const item = $(el).text();
          arrayCash.push(item.slice(0, 5).replace(/\s\s+/g, ""));
        });
        asd.cash = arrayCash[1];
        // console.log(asd.cash)
      }
    }
  );
  setTimeout(() => {
    request(
      "https://www.kopazar.com/knight-online-gold-bar",
      (error, response, html) => {
        if (!error && response.statusCode == 200) {
          const $ = cheerio.load(html);

          let arrayGB = [];
          for (let i = 0; i < 10; i++) {
            $(`#FormGold${i} strong`).each((i, el) => {
              const item = $(el)
                .text()
                .replace(/\s\s+/g, "")
                .split(" ")
                .slice(0, 1)
                .join(); //brad approach
              arrayGB.push(item);
            });
          }

          const json = {
            SiriusBuy: arrayGB.slice(7, 8).join(),
            SiriusSell: arrayGB.slice(8, 9).join(),
            VegaBuy: arrayGB.slice(4, 5).join(),
            VegaSell: arrayGB.slice(5, 6).join(),
            AltarBuy: arrayGB.slice(1, 2).join(),
            AltarSell: arrayGB.slice(2, 3).join(),
            OlympiaBuy: arrayGB.slice(22, 23).join(),
            OlympiaSell: arrayGB.slice(23, 24).join(),
            AresBuy: arrayGB.slice(10, 11).join(),
            AresSell: arrayGB.slice(11, 12).join(),
            DiezBuy: arrayGB.slice(13, 14).join(),
            DiezSell: arrayGB.slice(14, 15).join(),
            GordionBuy: arrayGB.slice(16, 17).join(),
            GordionSell: arrayGB.slice(17, 18).join(),
            RosettaBuy: arrayGB.slice(19, 20).join(),
            RosettaSell: arrayGB.slice(20, 21).join(),
            DestanBuy: arrayGB.slice(25, 26).join(),
            DestanSell: arrayGB.slice(26, 27).join(),
            Cash: asd.cash,
          };

          console.log(arrayGB);
          res.json(json);
        }
      }
    );
  }, 500);
});

module.exports = router;
