//配置dynamodb
var AWS = require('aws-sdk');
var dynamoose = require('dynamoose');

AWS.config.loadFromPath('config.json');

var db = new AWS.DynamoDB();
dynamoose.setDDB(db);

var commandSchema = new dynamoose.Schema({
   // email:String,
    paymentId:String,
    cardHolder:String,
    address:String,
    amount:String
});

module.exports = dynamoose.model("Command",commandSchema);