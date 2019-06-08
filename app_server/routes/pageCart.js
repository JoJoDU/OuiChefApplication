var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');

router.get('/', function(req, res, next) {
    console.log(cart);
    /* if(!req.session.cart){
      return res.render('cart',{
        products:null
      });
    } 
      var cart = new Cart(req.session.cart);
      console.log(cart);
      res.render('cart', {
        title: 'NodeJS Shopping Cart',
        products: cart.getItems(),
        totalPrice: cart.totalPrice
      });*/
  });
module.exports = router;