var mysql = require("mysql");
var myPropParser = require("properties-parser");

var pool;

function getPropsData (myPropFile, cb) {

    console.log("Inside getPropsData");
    myPropFile.read("./mysql.properties", function(error, data) {
        if (error) throw error;

        console.log("calling Callback function");
        cb(data);

    });
};

getPropsData(myPropParser, function (data) {

    console.log ("Inside pool callback");

    pool = mysql.createPool({
        connectionLimit: 5,
        host: data.host,
        user: data.user,
        password: data.password,
        database: data.database,
        debug: false
    });

    pool.on('acquire', function (connection) {
        console.log('Connection %d acquired', connection.threadId);
    });
    pool.on('connection', function (connection) {
        connection.query('SET SESSION auto_increment_increment=1')
    });
    pool.on('release', function (connection) {
        console.log('Connection %d released', connection.threadId);
    });

});

var getConnection = function(callback) {

    pool.getConnection(function(err, connection) {
        callback(err, connection);
    });


};


module.exports = getConnection;









