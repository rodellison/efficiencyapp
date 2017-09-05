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


function submitToolsUsed() {

    doConfirm("Are you sure?",
        function yes() {
            //$jquery post call here to record user's selections
            var selectedItems = $("#AutomationTypeSelect").chosen().val();
            if (selectedItems.length === 0) {
                alert("No items selected!");
            } else {
                // console.log(tempString);
                $.post("/AddSelections",
                    {
                        selectedItems: selectedItems
                    },
                    function (status) {
                        if (!status === 200) {
                            alert("Sorry!, a problem occurred attempting to insert records at the server side: " + status);
                        } else {
                            //Happy path
                            window.location.href = "#/thanks";
                        }
                    });
            }

        },
        function no() {
            whichService = null;
            //alert("No")
        });
}

//************************************************************** - Developer.html Scripts

var AutomationTypesLookupArray = {};

function logOutput(message) {
  console.log(message);
}

function setupAutomationTypesFilter(error, apiData) {

  var dataSet = apiData;
  //console.log(dataSet);

  logOutput("Inside setupAutomationTypesFilter");

  var AutomationTypeSelect = $("#AutomationTypeSelect");

  //Build AutomationTypesLookupArray
    console.log("Loading Automation Types array")
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

    AutomationTypeSelect.append($("<option />").val(d.AutomationID).text(d.AxpApp + "-" + d.ToolName));
    AutomationTypesLookupArray[d.AutomationID] = valueToAdd;

  });

  $(".chosen-select").chosen({no_results_text: "Oops, nothing found!"});

  //Setup handlers for Selects when things change
  $("#AutomationTypeSelect").chosen({}).change(function (event, params) {
  //  logOutput("AutomationTypeSelect change chosen function entered");
      var count = $("#AutomationTypeSelect :selected").length;

      if (count == 0) {
        $('#AutomationTypeSelect.chosen-select option[value=" "]').prop('selected', true);
        $('#AutomationTypeSelect').trigger('chosen:updated');
      } else {
        $('#AutomationTypeSelect.chosen-select option[value=" "]').prop('selected', false);
        $('#AutomationTypeSelect').trigger('chosen:updated');
      };
  });
}

function setupHomePageTotalSaved(error, apiData) {
    var dataSet = apiData;
    //console.log(dataSet);

    logOutput("Inside setupHomePageTotalSaved, TotalSaved returned: " + dataSet.TotalSaved);
    $("#hoursSaved").text(dataSet.TotalSaved);

}



function setupReports(error, ReportData) {
    var ndx;
    var timeStamps;
    var teamName;
    var toolName;
    var axpEnvironment;
    var axpApp;
    var saveHours;
    var timeStampsGroup;
    var teamNameGroup;
    var toolNameGroup;
    var axpEnvironmentGroup;
    var axpAppGroup;
    var saveHoursGroup;

    var toolFrequencyChart;
    var appChart;
    var envChart;
    

    var dataSet = ReportData;

    logOutput("Inside setupReports: " );

    console.log(dataSet);

    ndx = crossfilter(dataSet);

    timeStamps = ndx.dimension(function (d) {
    	return d.TrackingTimeStamp;
	})
    teamName = ndx.dimension(function (d) {
        return d.TeamName;
    })
    toolName = ndx.dimension(function (d) {
        return d.ToolName;
    })
    axpEnvironment = ndx.dimension(function (d) {
        return d.AxpEnvironment;
    })
    axpApp = ndx.dimension(function (d) {
        return d.AxpApp;
    })
    saveHours = ndx.dimension(function (d) {
        return d.SaveHours;
    })


    timeStampsGroup = timeStamps.group();
    teamNameGroup = teamName.group();
    toolNameGroup = toolName.group();
    axpEnvironmentGroup = axpEnvironment.group();
    axpAppGroup = axpApp.group();
    saveHoursGroup = saveHours.group();

    all = ndx.groupAll();


    toolFrequencyChart = dc.rowChart("#toolRowChart")

	toolFrequencyChart
		.height (400)
		.dimension (toolName)
		.group (toolNameGroup)
		.elasticX (true)
		.xAxis ().ticks (4)

	appChart = dc.pieChart('#appPieChart')
		.height (400)
		.radius (200)
		.innerRadius (90)
		.transitionDuration(1000)
		.dimension(axpApp)
		.group(axpAppGroup)

    envChart = dc.pieChart('#envPieChart')
        .height (400)
        .radius (200)
        .innerRadius (90)
        .transitionDuration(1000)
        .dimension(axpEnvironment)
        .group(axpEnvironmentGroup)


    dc.renderAll();

}


function getDataForPage() {

  var currentPage = document.location.href;

  console.log("Current page: " + currentPage)

  //Only want to make this call IF we're going into the Developer page
  if (currentPage.indexOf("developer") > 0) {
    console.log("Calling to get AutomationTypesData");

    queue()
        .defer(d3.json, "/AutomationTypes" )
        .await(setupAutomationTypesFilter);

  } else {
  	//either home, or the last char of the href being simply / mean we're at the home page, need to fetch the TotalSaves
      if (currentPage.indexOf("home") > 0 || currentPage.charAt(currentPage.length - 1) === "/") {
          console.log("Calling to get TotalSaved");
          queue()
              .defer(d3.json, "/TotalSaved" )
              .await(setupHomePageTotalSaved);

      } else {
          if (currentPage.indexOf("reports") > 0) {
              console.log("Calling to get Report Data");
              queue()
                  .defer(d3.json, "/ReportData" )
                  .await(setupReports);

		  }
	  }

  }


}




