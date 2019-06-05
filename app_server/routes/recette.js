var express = require('express');
var app = express();
var router = express.Router();
var xml2js = require('xml2js');

var builder = new xml2js.Builder();  // JSON->xml
var parser = new xml2js.Parser();   //xml -> json
var AWS = require("aws-sdk");
AWS.config.update({
    region: "eu-west-3",
    endpoint: "https://dynamodb.eu-west-3.amazonaws.com",
    accessKeyId: "AKIAJVP25MD64NIN6B4A",
    secretAccessKey: "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"
});


var docClient = new AWS.DynamoDB.DocumentClient();

var table = "pageRecette";
var params = {
    TableName: table,

};

var recetteInfo=[]
var ingredient = {}
var pre=[]


router.get('/', function (req, res) {
const json={
    "list":{
        "uri":"/recette/list",
        "method":"GET"
    },
    "ingredient":{
        "uri":"/recette/ingredient?id={id}",
        "method":"GET"
    },
    "preparation":{
        "uri":"/recette/preparation?id={id}",
        "method":"GET"
    },
}


    if(req.query.m==="xml"){
        const xml = builder.buildObject(json);
        res.send(xml)
    }else{
        res.send(json)
    }

})
router.get('/list', function (req, res) {
    docClient.scan(params,function (err, data) {
        if (err) {
            console.log(err)
        } else {
            var result=data.Items
            console.log(result)
            for(let i=0;i<result.length;i++){
                recetteInfo[i]={id:result[i].id,title:result[i].title,text:result[i].text}
            }
            if(req.query.m==="xml"){
                const xml = builder.buildObject(recetteInfo);
                res.send(xml)
            }else{
                res.send(recetteInfo)
            }
        }
    });


})
router.get('/ingredient', function (req, res) {
    let id=req.query.id
    if(!id){
        res.send("Vous n'avez pas spécifié d'identifiant")
    }else{
        var table3="recette"
        var params3 = {
            TableName: table3,
            Key: {
                "id": id,
            }
        };


        docClient.get(params3, function (err, data) {
            if (err) {
                console.log(err)
            } else {
                var recette = data.Item
                delete recette.id
                console.log(recette)

                for (let ing in recette) {
                    console.log(ing)
                    ingredient[ing]= recette[ing]
                }
                console.log(ingredient)
                if(req.query.m==="xml"){
                    const xml = builder.buildObject(ingredient);
                    res.send(xml)
                }else{
                    res.send(ingredient)
                }
            }
        });

    }


})

router.get('/preparation', function (req, res) {
    let id=req.query.id
    if(!id){
        res.send("Vous n'avez pas spécifié d'identifiant")
    }else{
        var table2 = "Preparation"
        var params2 = {
            TableName: table2,
            Key: {
                "id": id,
            }
        };

        docClient.get(params2, function (err, data) {
            if (err) {
                console.log(err)
            } else {
                console.log(JSON.stringify(data, undefined, 2))
                 pre = data.Item;
                delete pre.id
                if(req.query.m==="xml"){
                    const xml = builder.buildObject(pre);
                    res.send(xml)
                }else{
                    res.send(pre)
                }
            }
        });

    }


})

module.exports = router;