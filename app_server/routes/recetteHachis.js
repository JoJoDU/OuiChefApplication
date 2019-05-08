var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/recetteHachis', function(req, res, next) {
    res.render('recetteHachis',);
});

module.exports = router;
