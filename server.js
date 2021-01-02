const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 4000;
/* const whitelist = [
  "http://localhost:3000",
  "http://localhost:4000",
  "http://localhost:4000/heroes",
  "http://localhost:4000/winrates",
  "http://localhost:4000/matchups",
  "https://dota-app-combo-counter.herokuapp.com",
];
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable");
      callback(null, true);
    } else {
      console.log("Origin rejected");
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions)); */

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );

  // intercept OPTIONS method
  if ("OPTIONS" == req.method) {
    res.send(200);
  } else {
    next();
  }
};
app.use(allowCrossDomain);
app.use(cors());

require("dotenv").config();

var testRouter = require("./routes/test");
var heroesRouter = require("./routes/heroes");
var winrateRouter = require("./routes/winrate");
var matchupRouter = require("./routes/matchups");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/public"));

app.use("/test", testRouter);
app.use("/", heroesRouter);
app.use("/", winrateRouter);
app.use("/", matchupRouter);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Listening on Port ${PORT}`);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}
