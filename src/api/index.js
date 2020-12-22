const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const publicPath = path.join(__dirname, '');

var testRouter = require("./routes/test");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use("/test",testRouter);

app.listen(4000, () => {
  console.log('Server is up!');
});