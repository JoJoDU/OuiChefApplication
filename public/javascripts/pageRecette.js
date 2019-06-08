var app = new Vue({
    el: '#app',
    data: {
        title: 'Recettes populaires'
    }
})
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

docClient.scan(params, onScan);

function onScan(err, data) {
    if (err) {
        console.log(err)
    } else {
        var result=data.Items
   console.log(result)
        var recette=[]
        localStorage.nombre=result.length+1
        console.log(localStorage.nombre)
        for(let i=0;i<result.length;i++){
            recette[i]={id:result[i].id,title:result[i].title,text:result[i].text}
        }
        console.log(recette)
        var recette = new Vue({
            el: '#recette',
            data: {
                recette: recette
            }
        })
    }
}