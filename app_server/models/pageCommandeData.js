//配置dynamodb
var AWS = require('aws-sdk');
var dynamoose = require('dynamoose');

AWS.config.loadFromPath('config.json');

var db = new AWS.DynamoDB();
dynamoose.setDDB(db);

var productSchema = new dynamoose.Schema({
    title:String,
    price:String,
    quantity:String
});
module.exports = dynamoose.model("Product",productSchema);