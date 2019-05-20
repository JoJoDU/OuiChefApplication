

var express = require('express');
var router = express.Router();
var decode = require('./decode.js');
var exec = require('child_process').exec
var host = 'https://ouichef.auth.us-east-2.amazoncognito.com/oauth2/token';
var uri = 'http%3A%2F%2Flocalhost%3A3000%2F';
var client_id = '16g26706ovmhfj4d3o08qnnso';
/* GET home page. */
router.get('/', function (req, res, next) {
  var token = "";
  res.render('pageAceuil', { title: 'Oui Chef' });
  var uuid = req.query.code;
  console.log('code = ' + uuid);
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
        decode(token);
        //console.log('noew token: '+jose.util.base64url.decode(token));
        //console.log(JSON.parse(jose.util.base64url.decode(token)))
      }
    })
});


module.exports = router;
