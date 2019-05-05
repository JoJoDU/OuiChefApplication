var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
AWS.config.loadFromPath('config.json');
var Product = require('../models/pageCommandeData');

/* GET home page. */
router.get('/', function(req, res, next) {

Product.get({title:"porc"},function(err,data){
    if (err) {
        console.log("Error", err);
      } else {
        console.log("Table Read", data);
      }
});

  res.render('pageCommande', { title: 'Commande' });
});

module.exports = router;
