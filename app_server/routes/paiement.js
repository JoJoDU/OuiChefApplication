var express = require('express');
var router = express.Router();
const stripe = require('stripe')('sk_test_4jUpThxHZ9e8zstxaKvpRvBX006pZEuw4u');

/* GET home page. */
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
  paymentIntent:paymentIntent
  });
})();
  
});
router.post('/', function(req, res, next) {
  console.log("pay");
  console.log(req.body);
});
module.exports = router;
