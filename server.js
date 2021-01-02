const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const publicPath = path.join(__dirname, "");

require("dotenv").config();

var testRouter = require("./routes/test");
var heroesRouter = require("./routes/heroes");
var winrateRouter = require("./routes/winrate");
var matchupRouter = require("./routes/matchups");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));

app.use("/test", testRouter);
app.use("/", heroesRouter);
app.use("/", winrateRouter);
app.use("/", matchupRouter);

const whitelist = ["http://localhost:3000","http://localhost:4000"]
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))

app.listen(process.env.PORT || 4000, () => {
  console.log("Server is up!");
});
