var express = require('express');
var router = express.Router();
var session = require('express-session');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pageCommande', { title: 'Commande' });
  console.log("session: "+req.session.username);
});

module.exports = router;
