const express = require('express');
const Router= express.Router();
const moment = require('moment');
const Article = require('../models/articleModel');
const Category = require('../models/categoriesModel');

Router.get('/categories',(req, res,next)=>{
      Article.find().sort({createdOn: 'ascending'}).populate('categories')
            .then(data=>{
                  Category.find().then(catData=>{
                        res.status(200).render('category', {artData: data, catData:catData, moment:moment});
                  });
            });
});

Router.get('/:id',(req, res,next)=>{
      
      Article.find({categories: req.params.id}).sort({createdOn: 'ascending'}).populate('categories')
            .then(data=>{
                  Category.find().then(catData=>{
                        res.status(200).render('category', {artData: data, catData:catData, moment:moment});
                  });
            });
});

Router.post('/',(req, res,next)=>{
      res.status(200).json({
            "msg": "handing post /",

      });
});

module.exports=Router;