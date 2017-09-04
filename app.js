'use strict'
const express = require('express')
const app = express()

var bodyParser = require("body-parser");
app.use(express.static(`${__dirname}/site`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// routes ==================================================
require('./routes/AppRoutes')(app); // pass our application into our routes

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
app.listen(port, ip);
console.log('Listening on '+ ip + ':' + port);

