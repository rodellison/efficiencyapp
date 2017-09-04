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




