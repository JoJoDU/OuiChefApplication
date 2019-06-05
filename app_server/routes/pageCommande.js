var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
AWS.config.loadFromPath('config.json');
var Product = require('../models/product');
var Cart = require('../models/cart');

/* GET home page. */
router.get('/', function(req, res, next) {

/*Product.get({title:"porc"},function(err,data){
    if (err) {
        console.log("Error", err);
      } else {
        console.log("Table Read", data);
      }
});
Use json temperately, then I'll get this data from Ye's page

  var cart = new Cart(req.session.cart ? req.session.cart : {});
  var products = [{"title":"porc","price":"10euros/kg"},{"title":"porc","price":"10euros/kg"}];
  */
  res.render('pageCommande');
});
module.exports = router;
