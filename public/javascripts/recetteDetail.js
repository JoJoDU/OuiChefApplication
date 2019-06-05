AWS.config.update({
    region: "eu-west-3",
    endpoint: "https://dynamodb.eu-west-3.amazonaws.com",
    accessKeyId: "AKIAJVP25MD64NIN6B4A",
    secretAccessKey: "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"
});


var docClient = new AWS.DynamoDB.DocumentClient();

var table = "recette";
var pip = UrlParam.paramValues("id")
var id = pip[0]
console.log(id)
var params = {
    TableName: table,
    Key: {
        "id": id,
    }
};


docClient.get(params, function (err, data) {
    if (err) {
        console.log(err)
    } else {
        var recette = data.Item
        delete recette.id
        console.log(recette)
        var ingredient = []
        var j = 0
        for (let ing in recette) {
            console.log(ing)
            ingredient[j] = new Object
            ingredient[j].name = ing
            ingredient[j].val = recette[ing]
            ingredient[j].prix = Math.ceil(Math.random()*50)/10
            j++
        }
        console.log(ingredient)
        var list = new Vue({
            el: '#list',
            data: {
                items: ingredient
            },
            methods: {
                add: function (index) {
                   let ingredient= this.items[index]
                    let name=ingredient.name
                    let prix=ingredient.prix
                    let panier=localStorage.panier
                    console.log(panier)
                    if(panier){
                        console.log("exist")
                        panier=JSON.parse(panier)
                        panier[name]=prix
                        panier = JSON.stringify(panier)
                        localStorage.panier=panier
                    }else{
                        panier=new Object
                        panier[name]=prix
                        panier = JSON.stringify(panier)
                        localStorage.panier=panier
                    }
                    console.log(localStorage.panier)
                }
            }
        })
    }
});
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
        var pre = data.Item
        delete pre.id
        console.log(pre)
        var count = {}
        var list2 = new Vue({
            el: '#list2',
            data: {
                items: pre,
                count: count
            }
        })
    }
});