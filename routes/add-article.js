const express = require("express");
const Router = express.Router();
const multer = require("multer");
const bodyParser = require("body-parser");
const Article = require("../models/articleModel");
const Category = require("../models/categoriesModel");

Router.use(bodyParser.json());

const articleImageStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function(req, file, cb) {
    cb(
      null,
      new Date()
        .toISOString()
        .replace(/:/g, "-")
        .replace(/\./g, "-") + file.originalname
    );
  }
});

const fileFilter = (req, file, cb) => {
  if (file) {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/gif" ||
      file.mimetype === "image/svg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("file Type Error"), false);
    }
  } else {
    cb(new Error("no file"), false);
  }
};

const articleImageUpload = multer({
  storage: articleImageStorage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

Router.get("/:id", (req, res, next) => {
  Category.find().then(data => {
    res.status(200).render("add-article", { catData: data });
  });
});

Router.post(
  "/create-form/submit",
  articleImageUpload.single("image"),
  (req, res, next) => {
    const body = req.body;
    const image = req.file;
    const article = createArticle(body, image);
    article.save();
    Category.find().then(data => {
      res.status(200).redirect("../create-form");
    });
  }
);

const createArticle = function(art, imageName) {
  return new Article({
    author: art.author,
    title: art.title,
    createdOn: art.date,
    image: "../images/" + imageName.filename,
    categories: art.selection,
    text: art.article
  });
};

// add category

// const createCategory = function(){
//       return new Category({
//             name: 'Marketing'
//       });
// };

// const newCategory = createCategory();
// newCategory.save();

module.exports = Router;
