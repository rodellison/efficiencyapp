'use strict'
//These lines go in the package.json script section if using AWS Lambda + API Gateway
//"deploy": "claudia create --profile ClaudiaJS --handler lambda.handler --deploy-proxy-api --region us-east-1",
//"update": "claudia update --profile ClaudiaJS",
//"generate-proxy": "claudia generate-serverless-express-proxy --express-module app"
//"main": "lambda.js",

const express = require('express')
const app = express()

app.use(express.static(`${__dirname}/site`))

// routes ==================================================
require('./routes/AppRoutes')(app); // pass our application into our routes

//Commenting out the below, which was for a normal ip/port run express node app.. don't need this when running
//a ClaudiaJS oriented Express app in Lambda and API Gateway..
// Constants
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
app.listen(port, ip);
console.log('Listening on '+ ip + ':' + port);

//module.exports = app; // add this line


