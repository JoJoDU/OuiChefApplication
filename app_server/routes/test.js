var express = require('express');
var app = express();
var fs = require("fs");

app.get('/listUsers', function (req, res) {
  var data={
      "user1" : {
          "name" : "mahesh",
          "password" : "password1",
          "profession" : "teacher",
          "id": 1
      },
      "user2" : {
          "name" : "suresh",
          "password" : "password2",
          "profession" : "librarian",
          "id": 2
      },
      "user3" : {
          "name" : "ramesh",
          "password" : "password3",
          "profession" : "clerk",
          "id": 3
      }
  }
  console.log(data)
    console.log('hello')
})

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})