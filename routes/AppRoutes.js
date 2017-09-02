
/*
var couchbase = require('couchbase');
var MongoClient = require('mongodb').MongoClient;

var CouchbaseURL = 'couchbase://localhost:8091';
var MongoClientURL = 'mongodb://localhost:27017/account_selector';
// var MongoClientURL  = 'mongodb://dcpAppUser:dcpuser@LPDOSPUT00332.phx.aexp.com:27017/account_selector?authSource=admin';

*/

module.exports = function (app) {


// server routes ===========================================================
// handle things like api calls
// authentication routes
// sample api route

// Handle default get home page
  app.get('/', function(req, res) {
    res.sendFile(`${__dirname}/site/index.html`)
  }) ;

// Handle get JSON list of Automation Save types
  app.get('/AutomationTypes', function(req, res) {

  	var tempJSON = '[ {   "AutomationID": 1,   "ToolName": "GUS Scrubber",   "AxpApp": "GUS",   "AxpEnvironment": "Mainframe",   "SaveHours": "4",   "Description": "Scrubs production data before using in test environment Generally used once per project" }, {   "AutomationID": 2,   "ToolName": "eSDR Test environment setup automation",   "AxpApp": "ESDR",   "AxpEnvironment": "Mainframe",   "SaveHours": "16",   "Description": "For test support projects this utility is used to set up the test environment for eSDR testing" }, {   "AutomationID": 3,   "ToolName": "eSDR Optim test data setup automation",   "AxpApp": "ESDR",   "AxpEnvironment": "Mainframe",   "SaveHours": "20",   "Description": "Where test data is required in eSDR the Optim tool can be used to extract data from production eSDR mask PII data copy and load to the test eSDR database Please note that this process is semiautomated in that there is still manual effort required to get the account list in to production and load  run the schedule" }, {   "AutomationID": 4,   "ToolName": "Environment Refresh",   "AxpApp": "UCRS",   "AxpEnvironment": "Mainframe",   "SaveHours": "8",   "Description": "Shake down the environment before it is used for testing Mostly used once for project" }, {   "AutomationID": 5,   "ToolName": "Package refresh",   "AxpApp": "UCRS",   "AxpEnvironment": "Mainframe",   "SaveHours": "1",   "Description": "Once build is completedchanges will be moved to test region" }, {   "AutomationID": 6,   "ToolName": "New schedule for testing",   "AxpApp": "UCRS",   "AxpEnvironment": "Mainframe",   "SaveHours": "6",   "Description": "To create 3 schedules for each project" }, {   "AutomationID": 7,   "ToolName": "Webservice processing",   "AxpApp": "UCRS",   "AxpEnvironment": "Mainframe",   "SaveHours": "2",   "Description": "To create message condition and message criteria file from webservice extract from Designerweb" }, {   "AutomationID": 8,   "ToolName": "Regression test suite",   "AxpApp": "UCRS",   "AxpEnvironment": "Mainframe",   "SaveHours": "4",   "Description": "This will search accounts in production for few scenarios and scrub the data and it be used for regression testing" }, {   "AutomationID": 9,   "ToolName": "Volume testing",   "AxpApp": "UCRS",   "AxpEnvironment": "Mainframe",   "SaveHours": "8",   "Description": "This tool will be used to create files for volume testing using sample RL2C file shared" }, {   "AutomationID": 10,   "ToolName": "Test Support Automation",   "AxpApp": "UCRS",   "AxpEnvironment": "Mainframe",   "SaveHours": "12",   "Description": "It is used for automate the process of Schedule creationWebservice processingStream Execution  which is used for test support project" }, {   "AutomationID": 11,   "ToolName": "ALY tool",   "AxpApp": "UCRS",   "AxpEnvironment": "Mainframe",   "SaveHours": "12",   "Description": "It is used to compare AFP files Up to 12 hours per execution dependent upon the number of differences detected" }, {   "AutomationID": 12,   "ToolName": "ReEnablement of Streams",   "AxpApp": "CSF",   "AxpEnvironment": "Distributed",   "SaveHours": "3",   "Description": "This saves good amount of effort in lower environments   Can be used in E1 and E2 effectively without having the need to create Control and Raw files for each test transfer  By reenabling the same file can be passed multiple times and can be tested and this gives significant time save" }, {   "AutomationID": 13,   "ToolName": "Transfer to downstream",   "AxpApp": "CSF",   "AxpEnvironment": "Distributed",   "SaveHours": "2",   "Description": "Avoids creating the Connect Direct Process String preparation for each of the 7 output files and running the connect direct manually in case of network issues" }, {   "AutomationID": 14,   "ToolName": "Resource Copy",   "AxpApp": "CSF",   "AxpEnvironment": "Distributed",   "SaveHours": "1",   "Description": "Copies the Resources" }, {   "AutomationID": 15,   "ToolName": "Document  Message Refresh",   "AxpApp": "CSF",   "AxpEnvironment": "Distributed",   "SaveHours": "1",   "Description": "Refreshes Message  Document  both" }, {   "AutomationID": 16,   "ToolName": "Environment Refresh",   "AxpApp": "IECRS",   "AxpEnvironment": "Mainframe",   "SaveHours": "4",   "Description": "Shake down the environment before it is used for testing   Mostly used once for project" }, {   "AutomationID": 17,   "ToolName": "XML Volume test",   "AxpApp": "IECRS",   "AxpEnvironment": "Mainframe",   "SaveHours": "3",   "Description": "Tool will be used to create SOLACE XML files for Volume testing" }, {   "AutomationID": 18,   "ToolName": "Globestar Extract Scrubber Consumer",   "AxpApp": "GLOBESTAR CONSUMER MARKET",   "AxpEnvironment": "Mainframe",   "SaveHours": "4",   "Description": "Scrubs production data before using in test environment Generally used once per project Exception is Double byte market – Japan Taiwan etc This can be extended to double byte  needs some enhancement" }, {   "AutomationID": 19,   "ToolName": "Globestar Extract Scrubber Corporate",   "AxpApp": "GLOBESTAR CORPORATE MARKET",   "AxpEnvironment": "Mainframe",   "SaveHours": "4",   "Description": "Scrubs production data before using in test environment Generally used once per project Exception is Double byte market – Japan This can be extended to double byte  needs some enhancement" }, {   "AutomationID": 20,   "ToolName": "AMCR DataTime Sync Up with ATSMATST",   "AxpApp": "GLOBESTAR CONSUMER MARKET",   "AxpEnvironment": "Mainframe",   "SaveHours": "025",   "Description": "Sometimes during testing the AMCR file gets refreshed in  particular Test Region But if developer wants to validate something from old Statement file ATSMATST datetimestamp needs to be synced up first to avoid job abend" }, {   "AutomationID": 21,   "ToolName": "JOBCONV",   "AxpApp": "GLOBESTAR EMEA MARKET",   "AxpEnvironment": "Mainframe",   "SaveHours": "5",   "Description": "Job Conversion from Production to Test version using REXX Tool only in Globestar EMEA market Enhancement required to extend it for other international markets" }, {   "AutomationID": 22,   "ToolName": "OneClick",   "AxpApp": "GLOBESTAR STATEMENTS",   "AxpEnvironment": "DistributedMainframe",   "SaveHours": "5",   "Description": "Job Conversion from production to Test and Running the batch behind the scene so that developer can focus on other priority works POC was done in Taiwan Charge conversion project but needs enhancement" }, {   "AutomationID": 23,   "ToolName": "Globestar Statement  B2B Byte to Byte",   "AxpApp": "GLOBESTAR STATEMENTS – CONSUMER  CORPORATE",   "AxpEnvironment": "Mainframe",   "SaveHours": "4",   "Description": "Statement Extract output validation against Production as part of Regression test in Pre Composition Step  Tool has been developed and tested during the development Need more time to integrate in Overall GlobeStar B2B Tool" }, {   "AutomationID": 24,   "ToolName": "StreamDiff",   "AxpApp": "PDF COMPARISON",   "AxpEnvironment": "Distributed access from Citrix",   "SaveHours": "4",   "Description": "PDF compare during regression test or any other unit test phases to find out the differences between two StatementLetter PDF from the same Input file processing MASSIVE savings for Designer upgrade" }, {   "AutomationID": 25,   "ToolName": "REXX JCL generation",   "AxpApp": "GLOBESTAR",   "AxpEnvironment": "Mainframe",   "SaveHours": "50",   "Description": "Used to generate hundreds of JCL’s  Mostly used when new markets are added" }, {   "AutomationID": 26,   "ToolName": "Preprod region",   "AxpApp": "GLOBESTAR",   "AxpEnvironment": "Mainframe",   "SaveHours": "NA",   "Description": "Ability to run jobs in a prodlike environment  Save some time but real advantage is quality picking up errors before live" }, {   "AutomationID": 27,   "ToolName": "TDSTest Data Search Optim",   "AxpApp": "GLOBESTAR",   "AxpEnvironment": "Mainframe",   "SaveHours": "4",   "Description": "G internal test data search tool Account selection from Gold copy and Merge to Test regionCICS  This tool is owned by G core team" }, {   "AutomationID": 28,   "ToolName": "TDMTDOD",   "AxpApp": "GLOBESTAR",   "AxpEnvironment": "MainframeDistributed",   "SaveHours": "NA",   "Description": "This is a Test data management tool to select data from Gold copy and extract it to desired test region  This tool can be used across other team also and we have no real data on usage from our end" }, {   "AutomationID": 29,   "ToolName": "TDAP",   "AxpApp": "GLOBESTAR",   "AxpEnvironment": "Mainframe",   "SaveHours": "NA",   "Description": "This is a test data management tool for corporate accounts synced up with corporate applications  This tool can be used across other team also and we have no real data on usage from our end" }, {   "AutomationID": 30,   "ToolName": "HP ALM QC UFT",   "AxpApp": "GLOBESTAR",   "AxpEnvironment": "DistributedMainframe",   "SaveHours": "4",   "Description": "Automation Test scripts and process for regression testing and execution  This tool is owned by G core team" }, {   "AutomationID": 31,   "ToolName": "Service Virtualization tools like Soap UI Lisa test and CA Lisa Virtualization",   "AxpApp": "GLOBESTAR",   "AxpEnvironment": "Distributed",   "SaveHours": "NA",   "Description": "Used for functional or regression testing for test data setup Used to generate G request and G responses during service virtualization This tool is owned by G core team and we have no real data on usage from our end" }, {   "AutomationID": 32,   "ToolName": "QA excel tool Aid",   "AxpApp": "GLOBESTAR",   "AxpEnvironment": "Microsoft Excel Macro",   "SaveHours": "10",   "Description": "This tool is used to board new accounts post transactions and update accounts in the test environmentCICS  and updates the database" }, {   "AutomationID": 33,   "ToolName": "BA tool",   "AxpApp": "GLOBESTAR",   "AxpEnvironment": "Microsoft Excel Macro",   "SaveHours": "6",   "Description": "This tool is used to create financial file in excel format and then convert it to the mainframe file" }, {   "AutomationID": 34,   "ToolName": "Selenium  Java",   "AxpApp": "BMIS UI",   "AxpEnvironment": "Distributed",   "SaveHours": "3",   "Description": "This is implemented for regression testing of Kennedy and Return mail Project for UI Automation" }, {   "AutomationID": 35,   "ToolName": "CSV splitter",   "AxpApp": "BMIS",   "AxpEnvironment": "Distributed",   "SaveHours": "16",   "Description": "This is to splits the large CSV file into multiple smaller CSV files" }, {   "AutomationID": 36,   "ToolName": "Excel merger",   "AxpApp": "BMIS",   "AxpEnvironment": "Distributed",   "SaveHours": "16",   "Description": "This is to merge the multiple excel into one Excel" }, {   "AutomationID": 37,   "ToolName": "BCP Reprint Automation",   "AxpApp": "BMIS",   "AxpEnvironment": "Distributed",   "SaveHours": "15",   "Description": "This is used to automatically reprint specific customer in a job without involving any manual work" }]';
		console.log("Inside AutomationTypes Get call");
console.log(tempJSON);
	//Call MySQL, Select * from AutomationTypes
		//Respond with JSON.

 		res.json(JSON.parse(tempJSON));


  }) ;


	/*
	app.get('/IAData/:cbQuery', function (req, res) {

		var thisReq = decodeURIComponent(req.params.cbQuery).replace("undefined", "");

		// console.log("Inside app.get IAData: " + thisReq);

		var cluster = new couchbase.Cluster(CouchbaseURL);
		var bucket = cluster.openBucket('IADetails');
		var N1qlQuery = couchbase.N1qlQuery;
		var query;

		if (thisReq == "'All'") {
			query = N1qlQuery.fromString('SELECT * FROM IADetails');
		} else {
			query = N1qlQuery.fromString('SELECT * FROM IADetails WHERE IA_Online_Name IN ' + "[" + thisReq + "]");
		}
		// console.log("Running query: " + query);

		bucket.query(query, function (err, rows) {
			//   for (row in rows) {  console.log(row); }

			if (err) {
				console.log("error in IAData app.get");
				res.send(err);
			} else {
				res.json(rows); // return all nerds in JSON format
			}

		});
	});
*/

};

