var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pageRecette', { title: 'Recette dans Oui Chef' });
});

module.exports = router;
