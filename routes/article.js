const express = require("express");
const Router = express.Router();
const moment = require("moment");
const Article = require("../models/articleModel");
const Category = require("../models/categoriesModel");
const Comment = require("../models/addCommentModel");
let articleId;

Router.get("/", (req, res, next) => {
  res.status(200).json({
    msg: "handing get /"
  });
});

Router.get("/:id", (req, res, next) => {
  articleId = req.params.id;
  Article.find({ _id: req.params.id })
    .populate("categories")
    .then(data => {
      Category.find().then(catData => {
        Comment.find({ articleID: req.params.id }).then(comment => {
          res.status(200).render("article", {
            artData1: data,
            catData: catData,
            comments: comment,
            moment: moment
          });
        });
      });
    });
});

Router.post(`/:comment`, (req, res, next) => {
  const body = req.body;
  const comment = CreateComment(body);
  comment.save();
  res.status(200).json({ msg: "handing post /" });
});

Router.delete("/:delete", (req, res, next) => {
  Comment.findByIdAndRemove(req.body.id, (err, result) => {
    if (err) return;
    return res.status(200).json({ msg: "successfull delete" });
  });
});

Router.post("/:comment/:editComment", (req, res, next) => {
  Comment.find({ _id: req.body.data }).then(data => {
    return res.send(data);
  });
});

Router.put("/:edit", (req, res, next) => {
  let doc = {
    name: req.body.name,
    comment: req.body.comment,
    updatedOn: req.body.updatedOn
  };
  Comment.update({ _id: req.body.id }, doc).then(data => {
    return res.send("successfull edit");
  });
});

const CreateComment = function(item) {
  return new Comment({
    name: item.name,
    comment: item.comment,
    articleID: item.article,
    createdOn: item.date,
    updatedOn: item.updatedOn
  });
};

module.exports = Router;
