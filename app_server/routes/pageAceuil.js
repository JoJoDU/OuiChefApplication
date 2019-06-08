
var session = require('express-session');
var express = require('express');
var router = express.Router();
var decode = require('./decode.js');
var exec = require('child_process').exec
var host = 'https://ouichef.auth.us-east-2.amazoncognito.com/oauth2/token';
var uri = 'http%3A%2F%2Flocalhost%3A3000%2F';
var client_id = '16g26706ovmhfj4d3o08qnnso';
var FileStore = require('session-file-store')(session);

var https = require('https');
var jose = require('node-jose');

var region = 'us-east-2';
var userpool_id = 'us-east-2_t0sh60GU2';
var app_client_id = '16g26706ovmhfj4d3o08qnnso';
var keys_url = 'https://cognito-idp.' + region + '.amazonaws.com/' + userpool_id + '/.well-known/jwks.json';
var tokenDecode = '';

var identityKey = 'skey';

router.use(session({
    name: identityKey,
    secret: 'ouichef',  // 用来对session id相关的cookie进行签名
    store: new FileStore({path : './sessions/'}),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
    saveUninitialized: true,  // 是否自动保存未初始化的会话，建议false
    resave: false,  // 是否每次都重新保存会话，建议false
    cookie: {
        maxAge: 1000 * 1000  // 有效期，单位是毫秒
    }
}));

/* GET home page. */
router.get('/', function (req, res, next) {
  var token = "";
  res.render('pageAceuil', { title: 'Oui Chef' });
  var uuid = req.query.code;
  console.log('code = ' + uuid);
  if (uuid==undefined){
    console.log('pas encore login')
  }
  else{
  var cmd = "curl -X POST " + host + " -H 'Content-Type: application/x-www-form-urlencoded'  -d 'grant_type=authorization_code&redirect_uri=" + uri + "&code=" + uuid + "&client_id=" + client_id + "'"
  exec(cmd, function (err, stdout, stderr) {
    
      if (err) {
        console.log(stderr);
        //return stderr;
      }
      else {
        console.log('return data: ' + JSON.parse(stdout));
        token = JSON.parse(stdout).id_token;
        console.log('token: '+token);
        /*decode1(token).then(()=>{
          //var tokenDecode = decode(token);
          console.log(tokenDecode);
        });
        */
        decode1(token);
        setTimeout(()=>{
          console.log('tokenDecode: '+tokenDecode);
          req.session.regenerate(function(err) {
            if(err){
                console.log('log err!');
                return res.json({ret_code: 2, ret_msg: '登录失败'});                
            }
            
            req.session.username = tokenDecode;
            console.log("session.aceuil: "+req.session.username);
            //res.json({ret_code: 0, ret_msg: '登录成功'});                           
        });
        },1000);
        
        
        //console.log('decode: '+ decode(tokenDecode));
        //console.log('noew token: '+jose.util.base64url.decode(token));
        //console.log(JSON.parse(jose.util.base64url.decode(token)))
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
