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
  //res.render('users', { title: 'Recette dans Oui Chef' });
  res.redirect('https://ouichef.auth.us-east-2.amazoncognito.com/login?response_type=code&client_id=16g26706ovmhfj4d3o08qnnso&redirect_uri=http://localhost:3000/');
});
router.post('/', function(req, res, next) {
  //res.redirect('https://ouichef.auth.us-east-2.amazoncognito.com/login?response_type=code&client_id=16g26706ovmhfj4d3o08qnnso&redirect_uri=http://localhost:3000/');
});
//inscription
/*
router.post('/', function(req,res, next){
 console.log('1');
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
  var dataName = {
    Name : 'name',
    Value : 'ZijieAN' // your phone number here with +country code and no delimiters in front
 };

  var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
  var attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(dataPhoneNumber);
  var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(dataName);
  attributeList.push(attributeName);
  attributeList.push(attributeEmail);
  attributeList.push(attributePhoneNumber);
  
  var cognitoUser;
  userPool.signUp('ZijieAN', '515239aaBB', attributeList, null, function(err, result){
     if (err) {
         console.log(attributeList);
         console.log(err);
         return;
     }
     cognitoUser = result.user;
     console.log('user name is ' + cognitoUser.getUsername());
  });

  res.render('users', { title: 'Recette dans Oui Chef' });
})
*/
//login
/*
router.post('/', function(req,res, next){
var authenticationData = {
  Username : req.body.username, // your username here
  Password : req.body.password, // your password here
};
var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
var poolData = {
  UserPoolId : 'us-east-2_tjXnjbURk', // your user pool id here
  ClientId : '4tkakr53s85hrt7mpqve70bi0v' // your app client id here
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
var userData = {
  Username : req.body.username, // your username here
  Pool : userPool
};
var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
cognitoUser.authenticateUser(authenticationDetails, {
  onSuccess: function (result) {
      var accessToken = result.getAccessToken().getJwtToken();
      console.log(accessToken);

      //POTENTIAL: Region needs to be set if not already set previously elsewhere.
      AWS.config.region = 'us-east-2';

      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId : 'us-east-2_tjXnjbURk', // your identity pool id here
          Logins : {
              // Change the key below according to the specific region your user pool is in.
              'cognito-idp.us-east-2.amazonaws.com/us-east-2_tjXnjbURk' : result.getIdToken().getJwtToken()
          }
      });

      //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
      AWS.config.credentials.refresh((error) => {
          if (error) {
               console.error(error);
          } else {
               // Instantiate aws sdk service objects now that the credentials have been updated.
               // example: var s3 = new AWS.S3();
               console.log('Successfully logged!');
          }
      });
  },

  onFailure: function(err) {
      console.log(err.message || JSON.stringify(err));
  },

});
})
*/


module.exports = router;

