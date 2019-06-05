var express = require('express');
var router = express.Router();
const stripe = require('stripe')('sk_test_4jUpThxHZ9e8zstxaKvpRvBX006pZEuw4u');
var Command = require('../models/command');
/* GET home page. */
//4242 4242 4242 4242
//4000 0000 0000 3063
router.get('/', function(req, res, next) {
  console.log(req.query.autoCompleteAdress);
  console.log(req.query.tel);
  console.log(req.query.totalPay);
  var totalPay = req.query.totalPay;
(async () => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalPay*100,
    currency: 'eur',
  });
console.log(paymentIntent);
res.render('paiement', 
  { title: 'Payer',
  adresse:req.query.autoCompleteAdress,
  paymentIntent:paymentIntent,
  totalPay:totalPay
  });
})();
  
});
router.post('/', function(req, res, next) {
  console.log("pay");
  console.log(req.body);
  var email = "222@qq.com";
  var client = req.body.cardHolder;
  var paymentId = req.body.paymentId;
  var address = req.body.address;
  var amount = req.body.amountSubmit;
  console.log(amount);
  var command = new Command();
  command.paymentId = paymentId;
  command.cardHolder = client;
  command.address = address;
  command.amount = amount;
  command.save(function(err){
    if (err){
       res.send(err);
     } 
     else{
     res.redirect('payReussi');
     }
 })
});
module.exports = router;
