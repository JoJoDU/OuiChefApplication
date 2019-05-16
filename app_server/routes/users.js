var express = require('express');
var router = express.Router();
global.fetch = require('node-fetch');
var AmazonCognitoIdentity = require('amazon-cognito-identity-js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('users', { title: 'Recette dans Oui Chef' });
});
router.post('/', function(req,res, next){

  var poolData = {
    UserPoolId : 'us-east-2_tjXnjbURk', // your user pool id here
    ClientId : '4tkakr53s85hrt7mpqve70bi0v' // your app client id here
  };
  var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  var userData = {
    Username : 'ZijieAN', // your username here
    Pool : userPool
  };
  
  var attributeList = [];
  
  var dataEmail = {
     Name : 'email',
     Value : 'zijie.an@utt.fr' // your email here
  };
  var dataPhoneNumber = {
     Name : 'phone_number',
     Value : '+33668797666' // your phone number here with +country code and no delimiters in front
  };
  var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
  var attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(dataPhoneNumber);
  
  attributeList.push(attributeEmail);
  attributeList.push(attributePhoneNumber);
  
  var cognitoUser;
  userPool.signUp('ZijieAN', '515239aaBB', attributeList, null, function(err, result){
     if (err) {
         alert(err);
         return;
     }
     cognitoUser = result.user;
     console.log('user name is ' + cognitoUser.getUsername());
  });
  res.render('users', { title: 'Recette dans Oui Chef' });
})


module.exports = router;
