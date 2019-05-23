var AWS = require("aws-sdk");

AWS.config.update({ region: "eu-west-3",
    endpoint: "https://dynamodb.eu-west-3.amazonaws.com"});
var docClient = new AWS.DynamoDB.DocumentClient();

var table = "recette";

var id="1"

var params = {
    TableName: table,
    Key:{
        "id": id,
    }
};

docClient.get(params, function(err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("GetItem succeeded:", data.Item);
    }
});