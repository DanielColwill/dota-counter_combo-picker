var express = require("express");
var router = express.Router();
const axios = require("axios");

router.get("/winrates/:id", function (req, res, next) {
  var url = "https://api.opendota.com/api/heroes/" + req.params.id + "/durations";
  axios
    .get(url, {
      headers: {
        crossorigin: true,
      },
    })
    .then((result) => {
      var gamesPlayed = 0;
      var wins = 0;
      var winrate;
      for (var i = 0; i < result.data.length; i++) {
        gamesPlayed += result.data[i].games_played;
        //console.log(gamesPlayed);
        wins += result.data[i].wins;
        //console.log(wins);
      }
      winrate = wins / gamesPlayed;
      winrate = winrate.toFixed(3);
      winrate = winrate*100;
      var result = '' + winrate;
      res.send(result);
    });
});

module.exports = router;
