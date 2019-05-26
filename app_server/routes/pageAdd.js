var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var products = [{"title":"porc","price":"10euros/kg"}];

router.get('/:title', function(req, res, next) {
    console.log(req.params.title);
    var productId = req.params.title;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    var product = products.filter(function(item){
        return item.id == productId;
    });
    cart.add(product[0],productId);
      console.log(cart);
      req.session.cart = cart;
      res.redirect('/');
  });
module.exports = router;