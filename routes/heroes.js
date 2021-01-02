var express = require("express");
var router = express.Router();
const axios = require("axios");

router.get("/heroes", function (req, res, next) {
  var url = "https://api.opendota.com/api/heroes";
  axios
    .get(url, {
      crossorigin: true,
    })
    .then((result) => {
      res.send(result.data);
    });
});

module.exports = router;
