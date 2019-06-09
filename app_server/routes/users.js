var express = require('express');
var router = express.Router();
global.fetch = require('node-fetch');
var AmazonCognitoIdentity = require('amazon-cognito-identity-js');

/*
var poolData = {
  UserPoolId : 'us-east-2_tjXnjbURk', // your user pool id here
  ClientId : '4tkakr53s85hrt7mpqve70bi0v' // your app client id here
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
var userData = {
  Username : 'test', // your username here
  Pool : userPool
};
*/
/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.username==undefined){
  //res.render('users', { title: 'Recette dans Oui Chef' });
  res.redirect('https://ouichef.auth.us-east-2.amazoncognito.com/login?response_type=code&client_id=16g26706ovmhfj4d3o08qnnso&redirect_uri=http://localhost:3000/');
  }
  else{
    req.session.destroy();
    res.render('users', { title: 'Oui Chef' });
  }
});
router.post('/', function(req, res, next) {
  //res.redirect('https://ouichef.auth.us-east-2.amazoncognito.com/login?response_type=code&client_id=16g26706ovmhfj4d3o08qnnso&redirect_uri=http://localhost:3000/');
});



module.exports = router;

