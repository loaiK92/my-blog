const express = require('express');
const Router= express.Router();
const moment = require('moment');
const Article = require('../models/articleModel');
const Category = require('../models/categoriesModel');

let num=4,pageNum=0,artNum,prevBtn,nextBtn,lastP;

Router.get('/',(req,res,next)=>{
      Article.find().sort({createdOn: 'ascending'}).skip(pageNum*num).limit(num).populate('categories')
            .then(data=>{
                  Article.find().count((err,result)=>{
                        if(err) return;
                  }).then( artNum=>{
                        if(!pageNum) pageNum=0;
                        if(pageNum==0) prevBtn=true; else prevBtn=false;
                        lastP= Math.ceil(artNum/num)-1;
                        if(pageNum==lastP) nextBtn=true; else nextBtn=false;
                        let catData;
                        Category.find().then(catData=>{
                              res.render('index.pug', {artData: data,pState:prevBtn,nState:nextBtn,thisP:pageNum, catData:catData, moment:moment});
                        });    
                  });                
            })
            .catch(err=>{
                  console.log('catched an error ', err);
            });
});

Router.get('/:p', (req, res)=>{
      pageNum=Number(req.params.p);
      
      Article.find().sort({createdOn: 'ascending'}).skip(pageNum*num).limit(num).populate('categories')
            .then(data=>{
                  Article.find().count((err,result)=>{
                        if(err)return;
                  }).then( artNum=>{
                        if(!pageNum) pageNum=0;
                        if(pageNum==0) prevBtn=true; else prevBtn=false;
                        lastP= Math.ceil(artNum/num)-1;
                        if(pageNum==lastP) nextBtn=true; else nextBtn=false;
                        Category.find().then(catData=>{
                              res.render('index.pug', {artData: data,pState:prevBtn,nState:nextBtn,thisP:pageNum, catData:catData, moment:moment});
                        }); 
                  });  
            })
            .catch(err=>{
                  console.log('catched an error ', err);
            });
});

module.exports=Router;