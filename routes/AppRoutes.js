var createConnection = require('../db/database');

var tempJSON = "";

module.exports = function (app) {


// server routes ===========================================================
// handle things like api calls
// authentication routes
// sample api route

// Handle default get home page
  app.get('/', function(req, res) {
    res.sendFile(`${__dirname}/site/index.html`)
  }) ;

// Handle get JSON list of Automation types from MySQL db
  app.get('/AutomationTypes', function(req, res) {

      console.log("Inside Get for AutomationTypes");

          console.log("Creating connection and query");
          createConnection(function(err, connection) {

              if (err) {console.log(err); throw error};

              tempJSON = "";

              // do what we need with the connection here
              connection.query("SELECT * from AutomationTypes",
                  function (error, results) {
                      if (error) throw error;

                      console.log("Results length: " + results.length);
                      for (var i = 0; i < results.length; i++) {

                          // console.log(JSON.stringify(results[i]));
                          tempJSON += JSON.stringify(results[i]);
                          if (i < results.length - 1) {
                              tempJSON += ",";
                          }
                      }
                      tempJSON = "[" + tempJSON.replace("undefined", "") + "]";

                      //Return the result as a bunch of JSON Objects in a single array
                      res.json(JSON.parse(tempJSON));

                      console.log("Releasing db connection.");
                      //release the connection after we're done
                      connection.release();
                  });
          });

  }) ;
};

