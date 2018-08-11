const express = require("express");
const Router = express.Router();
const Category = require("../models/categoriesModel");

Router.get("/newCategory", (req, res, next) => {
  Category.find().then(data => {
    res.status(200).render("add-category", { catData: data });
  });
});

Router.post("/newCategory/submit", (req, res, next) => {
  console.log(req.body.category);
  const createCategory = function() {
    return new Category({
      name: req.body.category
    });
  };

  const newCategory = createCategory();
  newCategory.save();
  res.status(200).redirect("/add-category/newCategory");
});

module.exports = Router;
