var whichService = null;
var valueSaved = null;
var screenWidth = window.innerWidth;
var verticalPosition = window.pageYOffset | document.body.scrollTop;


/**
* Event Listener for resizing the window to help ensure the menu is toggled correctly for the window size.
*/
window.addEventListener('resize', function(event){
	screenWidth = window.innerWidth;
	if(document.getElementById('menu').style.display != "inline"){
		if(screenWidth>=768){
			document.getElementById('menu').style.display = "inline";
		}
	}
	else{
		if(screenWidth<768){
			document.getElementById('menu').style.display = "none";
		}
	}
});

/**
* Changes the transparancy of the nav menu when the page is scrolled up or down.
* Has a few mini bugs, but gets the job done for the most part.
*/
navTransparencyChange = function(){
	screenWidth = window.innerWidth;
	var element = document.getElementById('newnavbar');
	if(screenWidth >=768){
		verticalPosition = window.pageYOffset | document.body.scrollTop;
		if(verticalPosition >=50){
			element.style.opacity = "1";
			element.style.filter  = 'alpha(opacity=100)';
			element.style.borderBottom= "1px solid white";
		}
		else{
			element.style.opacity = "0.6";
			element.style.filter  = 'alpha(opacity=60)';
			element.style.borderBottom= "none";
		}
	}
	else{
		element.style.opacity = "1";
		element.style.filter  = 'alpha(opacity=100)';
		element.style.borderBottom= "1px solid white";
	}
}

/**
* Toggles the menu on the click of the hamburger 'more' icon. Works via CSS/
*/
document.getElementById('show-menu').onclick = function(){
	console.log("clicked");
	if(document.getElementById('menu').style.display === "block"){
		document.getElementById('menu').style.display = "none";
	}
	else{
		document.getElementById('menu').style.display = "block";
	}
};


function doConfirm(msg, yesFn, noFn)
{
	var confirmBox = $("#confirmBox");
	confirmBox.find(".message").text(msg);
	confirmBox.find(".yes,.no").unbind().click(function()
	{
		confirmBox.hide();
	});
	confirmBox.find(".yes").click(yesFn);
	confirmBox.find(".no").click(noFn);
	confirmBox.show();
}

function myTest() {

	alert("test");

};

function submitToolsUsed() {

	doConfirm("Are you sure?",
	function yes()
	{
	 window.location.href = "#/thanks";
	 var element = document.getElementById("whichTool");
	 element.innerHTML = "Thank you for using the " + whichService + " tool! - You've just help save " + valueSaved;
	//alert("Yes")
	},
	function no()
	{
	whichService = null;
		//alert("No")
	});
}

//************************************************************** - Developer.html Scripts
var ndxIAFilters;
var axpApp;
var toolName;
var axpEnvironment;
var axpApp;

var AutomationTypesLookupArray = {};

function logOutput(message) {
  console.log(message);
}

function setupAutomationTypesFilter(error, apiData) {

  var dataSet = apiData;

  //console.log(dataSet);

  logOutput("Inside setupAutomationTypesFilter");

  //Create a Crossfilter instance
  ndxIAFilters = crossfilter(dataSet);

	/*
	 //Define Dimensions
	 iaCode = ndxIAFilters.dimension(function (d) {
	 return d.IADetails.IA_Code;
	 });
	 iaDescription = ndxIAFilters.dimension(function (d) {
	 return d.IADetails.IA_Online_Name;
	 });

	 */
  var AutomationTypeSelect = $("#AutomationTypeSelect");
  //Establish blank option
   AutomationTypeSelect.append($("<option />").val(" ").text(" "));

  console.log("Loading Automation Types array")
  //Build AutomationTypesLookupArray
  dataSet.forEach(function (d) {
 // 	console.log(d);
    var valueToAdd = {};
    var tempKey = "";
    valueToAdd.AutomationID = d.AutomationID;
    valueToAdd.ToolName = d.ToolName;
    valueToAdd.AxpApp = d.AxpApp;
    valueToAdd.AxpEnvironment = d.AxpEnvironment;
    valueToAdd.SaveHours = d.SaveHours;
    valueToAdd.Description = d.Description;

    AutomationTypeSelect.append($("<option />").val(d.ToolName).text(d.AxpApp + "-" + d.ToolName));
    AutomationTypesLookupArray[d.ToolName] = valueToAdd;

  });

  $(".chosen-select").chosen({no_results_text: "Oops, nothing found!"});

  //Setup handlers for Selects when things change
  $("#AutomationTypeSelect").chosen({}).change(function (event, params) {
    logOutput("AutomationTypeSelect change chosen function entered");

    if (params.selected != 'All') {
      var count = $("#AutomationTypeSelect :selected").length;

      if (count == 0) {
        $('#AutomationTypeSelect.chosen-select option[value=" "]').prop('selected', true);
        $('#AutomationTypeSelect').trigger('chosen:updated');
      } else {
        $('#AutomationTypeSelect.chosen-select option[value=" "]').prop('selected', false);
        $('#AutomationTypeSelect').trigger('chosen:updated');
      }

      logOutput($("#AutomationTypeSelect").chosen().val());


    } else {
      $('#AutomationTypeSelect option').prop('selected', false); // Selects all option
      $('#AutomationTypeSelect.chosen-select option[value=" "]').prop('selected', true);
      $('#AutomationTypeSelect').trigger('chosen:updated');

      logOutput("AutomationTypeSelect = All");

    };

  });
}


function getAutomationTypesData() {

  var currentPage = document.location.href;
  //Only want to make this call IF we're going into the Developer page
  if (currentPage.indexOf("developer") > 0) {
    console.log("Calling to getAutomationTypesData");

    queue()
        .defer(d3.json, "/AutomationTypes" )
        .await(setupAutomationTypesFilter);

  }


}




