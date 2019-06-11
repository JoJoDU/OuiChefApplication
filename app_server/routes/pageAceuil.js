
var session = require('express-session');
var express = require('express');
var router = express.Router();
var decode = require('./decode.js');
var exec = require('child_process').exec
var host = 'https://ouichef.auth.us-east-2.amazoncognito.com/oauth2/token';
var uri = 'http%3A%2F%2Flocalhost%3A3000%2F';
var client_id = '16g26706ovmhfj4d3o08qnnso';
var FileStore = require('session-file-store')(session);
var cookieParser = require('cookie-parser');
var https = require('https');
var jose = require('node-jose');

var region = 'us-east-2';
var userpool_id = 'us-east-2_t0sh60GU2';
var app_client_id = '16g26706ovmhfj4d3o08qnnso';
var keys_url = 'https://cognito-idp.' + region + '.amazonaws.com/' + userpool_id + '/.well-known/jwks.json';
var tokenDecode = '';

var identityKey = 'skey';
router.use(cookieParser());
router.use(session({
  secret :  'secret', // 对session id 相关的cookie 进行签名
  resave : false,
  saveUninitialized: false, // 是否保存未初始化的会话
  cookie : {
      maxAge : 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
  },
  
}))
/*
router.use(session({
  secret :  'secret', // 对session id 相关的cookie 进行签名
  resave : true,
  saveUninitialized: false, // 是否保存未初始化的会话
  cookie : {
      maxAge : 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
  }
}));
*/
/* GET home page. */
router.get('/', function (req, res, next) {
 // console.log('session='+req.session.username)
 // req.session.username = 'zijieAN';
  var token = "";
  
  var uuid = req.query.code;
  console.log('code = ' + uuid);
  if (uuid==undefined){
    console.log('pas encore login')
    res.render('pageAceuil', { title: 'Oui Chef' });
  }
  else{
  var cmd = "curl -X POST " + host + " -H 'Content-Type: application/x-www-form-urlencoded'  -d 'grant_type=authorization_code&redirect_uri=" + uri + "&code=" + uuid + "&client_id=" + client_id + "'"
  console.log('cmd: '+cmd)
  exec(cmd, function (err, stdout, stderr) {
    
      if (err) {
        console.log(stderr);
      }
      else {
        console.log('return data: ' + JSON.parse(stdout));
        token = JSON.parse(stdout).id_token;
        console.log('token: '+token);
        decode1(token);
      //  setTimeout(()=>{
          console.log('tokenDecode: '+tokenDecode);
          
          req.session.save(function(err) {
            if(err){
                console.log('log err!');
                //return res.json({ret_code: 2, ret_msg: '登录失败'});                
            }
            
            req.session.username = tokenDecode;
            //res.send(req.session.username);
            
            console.log("session.aceuil: "+req.session.username);
            console.log("sess id acueil: "+JSON.stringify(req.session));
            res.render('pageAceuil', { title: 'Oui Chef' });
            //res.json({ret_code: 0, ret_msg: '登录成功'});                           
        });
      // },1000)
      }
    })
  }
});

function decode1(event, context, callback){
  var token = event;
  var sections = token.split('.');
  // get the kid from the headers prior to verification
  var header = jose.util.base64url.decode(sections[0]);
  header = JSON.parse(header);
  var kid = header.kid;
  // download the public keys
  https.get(keys_url, function(response) {
      if (response.statusCode == 200) {
          response.on('data', function(body) {
              var keys = JSON.parse(body)['keys'];
              console.log('keys: '+keys);
              // search for the kid in the downloaded public keys
              var key_index = -1;
              for (var i=0; i < keys.length; i++) {
                      if (kid == keys[i].kid) {
                          key_index = i;
                          break;
                      }
              }
              if (key_index == -1) {
                  console.log('Public key not found in jwks.json');
                  callback('Public key not found in jwks.json');
              }
              // construct the public key
              jose.JWK.asKey(keys[key_index]).
              then(function(result) {
                  // verify the signature
                  jose.JWS.createVerify(result).
                  verify(token).
                  then(function(result) {
                      // now we can use the claims
                      var claims = JSON.parse(result.payload);
                      console.log('payload: '+JSON.stringify(claims));
                      console.log(claims.email);
                      tokenDecode = claims.email;
                      
                      // additionally we can verify the token expiration
                      var current_ts = Math.floor(new Date() / 1000);
                      if (current_ts > claims.exp) {
                          callback('Token is expired');
                      }
                      // and the Audience (use claims.client_id if verifying an access token)
                      if (claims.aud != app_client_id) {
                          callback('Token was not issued for this audience');
                      }
                      callback(null, claims);
                  }).
                  catch(function() {
                     // callback('Signature verification failed');
                  });
              });
          });
      }
  });
}

module.exports = router;
