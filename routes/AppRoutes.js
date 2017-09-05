var createConnection = require('../db/database');

var tempJSON = "";

module.exports = function (app) {

// server routes ===========================================================

// Handle default get home page
    app.get('/', function (req, res) {
        res.sendFile(`${__dirname}/site/index.html`)
    });

// Handle posts to insert user selected items into the MySQL db
    app.post('/AddSelections', function (req, res) {
        var mySelectedItems = req.body.selectedItems;
       // console.log(mySelectedItems + " with lenth: " + mySelectedItems.length);

        createConnection(function (err, connection) {

            if (err) {
                console.log(err);
                //Return to client a positive status code
                res.sendStatus(500);
            };

            for (var i = 0; i < mySelectedItems.length; i++) {

                /* INSERT QUERY */
                var thisItem = mySelectedItems[i];
                var insertString = "INSERT INTO AutomationToolsTracking (AutomationId) VALUES (" + thisItem + ")";
                // Insert the items into the AutomationToolsTracking Table
                console.log("Inserting new AutomationToolsTracking record for item: " + thisItem);
                connection.query(insertString,
                    function (error, result) {
                        if (error)
                            {
                            res.sendStatus(500);
                            }
                        else {
                            console.log("Inserted new AutomationToolsTracking record : " + result.insertId);
                        }
                     });

            };

            console.log("Releasing db connection.");
            //release the connection after we're done
            connection.release();

            //Return to client a positive status code
            res.sendStatus(200);

        });
    });

// Handle gets to fetch the AutomatioType record information that will be used to populate the chosen.js multi select box
// and other arrays
    app.get('/AutomationTypes', function (req, res) {

        console.log("Inside Get for AutomationTypes");

        console.log("Creating connection and query");
        createConnection(function (err, connection) {

            if (err) {
                console.log(err);
                throw error
            };

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

    });

    // Handle get to fetch the total hours saved, for the home page display
    app.get('/TotalSaved', function (req, res) {

         createConnection(function (err, connection) {

            if (err) {
                console.log(err);
                //Return to client a positive status code
                res.sendStatus(500);
            };

                 var selectString = "SELECT SUM(AutomationTypes.SaveHours) AS TotalSaved FROM AutomationToolsTracking " +
                     "INNER JOIN AutomationTypes ON AutomationToolsTracking.AutomationID=AutomationTypes.AutomationID";
                 connection.query(selectString,
                    function (error, result) {
                        if (error)
                        {
                            res.sendStatus(500);
                        }
                        else {
                            console.log("Releasing db connection.");
                            //release the connection after we're done
                            connection.release();
                            //Return to client a positive status code
                            //Return the result as a bunch of JSON Objects in a single array
                            var resultString = result[0];
                            res.json(resultString);
                        }
                    });

        });
    });


};

