var express = require("express");
var router = express.Router();
const axios = require("axios");

router.get("/winrates/:id", function (req, res, next) {
  res.send(getWinrate(req.params.id));
});

async function getWinrate() {
  var url = "https://api.opendota.com/api/heroes/" + id + "/durations";
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
      for (var i = 0; i < result.data.length; i++) {
        gamesPlayed += result.data.games_played[i];
        wins += result.data.wins[i];
      }
      winrate = wins / gamesPlayed;
      return winrate
    });
}

module.exports = router;
