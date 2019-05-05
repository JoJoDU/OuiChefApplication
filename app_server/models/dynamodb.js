//配置dynamodb
var AWS = require('aws-sdk');
AWS.config.loadFromPath('config.json');

var db = new AWS.DynamoDB();

module.exports = db;