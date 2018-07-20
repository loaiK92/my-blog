const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const morgan = require("morgan");
const app = express();
require("dotenv").config({ path: "./variables.env" });

// app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect(process.env.DATABASE);
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Routes
const indexRouter = require("./routes/indexRoute");
const categoryRouter = require("./routes/category");
const articleRouter = require("./routes/article");
const addArticleRouter = require("./routes/add-article");

app.use("/", indexRouter);
app.use("/category", categoryRouter);
app.use("/article", articleRouter);
app.use("/addArticle", addArticleRouter);

//mongoose
const db = mongoose.connection;
db.on("error", err => {
  console.log(`connection error is ${err}`);
});
db.once("open", () => {
  console.log("Database connection is open!!!");
});

// listening
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
