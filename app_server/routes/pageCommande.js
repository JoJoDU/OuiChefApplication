var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
AWS.config.loadFromPath('config.json');
//var data = require('../models/pageCommandeData');

/* GET home page. */
router.get('/', function(req, res, next) {
  //console.log(data);  
var db = new AWS.DynamoDB();

var product = 
{
  Key:{
    "viande":{S:"porc"},
},
  TableName:"Viande"
};

db.getItem(product,function(err,data){
    if (err) {
        console.log("Error", err);
      } else {
        console.log("Table Read", data);
      }
});

  res.render('pageCommande', { title: 'Commande' });
});

module.exports = router;
