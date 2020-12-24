var express = require("express");
var router = express.Router();
const axios = require("axios");

router.get("/matchups/:id", function(req, res, next) {
  var url = "https://api.opendota.com/api/heroes/" + req.params.id + "/matchups";
  axios
    .get(url, {
      headers: {
        crossorigin: true,
      },
    })
    .then((result) => {
      res.send(result.data);
    });
});

module.exports = router;
