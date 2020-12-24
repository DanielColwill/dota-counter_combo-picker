var express = require("express");
var router = express.Router();
const axios = require("axios");

router.get("/winrates/:id", function (req, res, next) {
  getWinrate(req.params.id);
});

async function getWinrate(id) {
  var url =
    "https://api.opendota.com/api/heroes/" + id + "/durations";
  await axios
    .get(url, {
      headers: {
        crossorigin: true,
      },
    })
    .then((result) => {
      var gamesPlayed;
      var wins;
      var winrate;
      console.log(result.data);
      for (var i = 0; i < result.data.length; i++) {
        //gamesPlayed += result.data.games_played[i];
        //wins += result.data.wins[i];
      }
      /*       winrate = wins / gamesPlayed;
      console.log(winrate);
      res.send(winrate); */
    });
}

module.exports = router;