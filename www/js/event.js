function getCurrentUserID() {
	var user;
	var message;

	$.ajax({
		url: "/users/current",
		dataType: "json",
		success: function(json) {
			user = JSON.parse(json);
			return user["id"];
		},
		statusCode: {
			401: function(json) {
				message = JSON.parse(json);
				alert(message);
			}
		},
		error: function() {
			alert("Ajax request failed");
		}
	});
}

function getUserLocations() {
	var userId = getCurrentUserID();
	var message;

	$.ajax({
		url: "/user/"+ userId +"/locations",
		dataType: "json",
		headers:{
			"Authorization": "AppleSeed token=IIjjCqQNuuO1iwkB6v7kiV6Z44c"
		},
		success: function(json) {
			return JSON.parse(json);
		},
		statusCode: {
			401: function(json) {
				message = JSON.parse(json);
				alert(message);
			},
			403: function(json) {
				message = JSON.parse(json);
				alert(message);
			},
			404: function(json) {
				message = JSON.parse(json);
				alert(message);
			}
		},
		error: function() {
			alert("Ajax request failed");
		}
	});
}

function setLocationInput() {
	var locationInputHTML="";
	var locationInput = document.getElementById("location-input");
	var addresses = getUserLocations();

	locationInputHTML+='<div class="form-group"><label>Choose a location:</label><select class="form-control" id="location">';
	for (var i=0;i<addresses.length;i++){
		locationInputHTML+='<option value=';
		locationInputHTML+=addresses[i]['description'];
		locationInputHTML+=">";
		locationInputHTML+=addresses[i]['description'];
		locationInputHTML+="</option>";
	}
	locationInputHTML+='</select></div>'
	locationInput.innerHTML=locationInputHTML;
}

function newEvent() {
	setLocationInput();
	$('#addEventModal').modal('show');
}

function addEventTree(numberTrees) {
	numberTrees++;
	var trees = document.getElementById("trees").innerHTML;
	trees += '<br><input class="form-control" id="tree'+ numberTrees +'type" placeholder="Type" type="text"> <input class="form-control" id="tree'+ numberTrees +'num" placeholder="Number" type="text">';
	document.getElementById("treesForm").innerHTML = '<div id="trees">'+ trees +'</div><button type="button" class="btn btn-link" onclick="addEventTree('+ numberTrees +')">+ Add Type</button><br>';
	document.getElementById("addEvent").onclick = "addNewEvent("+ numberTrees +")";
}

function modifyEvent(eventID) {
	var eventsList=getCookie("Appleseed_events");
	var jsonCookie=JSON.parse(eventsList);
	var footer = document.getElementById("footer");
	footerHTML = '<button type="button" class="btn btn-primary" data-dismiss="modal" onclick="saveEvent()">Save</button> \
	<button type="button" class="btn btn-danger" data-dismiss="modal" onclick="deleteEvent('+eventID+')">Delete</button> \
	<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>';
	footer.innerHTML = footerHTML;
	setLocationInput();
	var date = document.getElementById("datepicker").value = jsonCookie[eventID].date;
	var time = document.getElementById("time").value = jsonCookie[eventID].time;
	var duration = document.getElementById("duration").value = jsonCookie[eventID].duration;
	var numVol = document.getElementById("volunteers").value = jsonCookie[eventID].numVolunteers;
	$('#addEventModal').modal('show');
}

function getLocation(description) {
	var addresses = getUserLocations();

	for (var i=0;i<addresses.length;i++){
		if(addresses[i]['description'].localCompare(description) == 0) {
			return addresses[i]['id'];
		}
	}

	return -1;
}

function getTrees(numberTrees) {
	var trees = [];

	for(var i=0;i<numberTrees;i++) {
		trees[i] = {
				"type": document.getElementById("tree"+i+"type").value,
				"quantity": document.getElementById("tree"+i+"num").value
			}
	}
}

function builBodyRequest(numberTrees) {
	var idOwner = getCurrentUserID();
	var description = document.getElementById("tree-text").value;
	var idLocation = getLocation(document.getElementById("location").value);
	var date = document.getElementById("datepicker").value;
	var time = document.getElementById("timepicker").value;
	var end = document.getElementById("timepicker2").value;
	var dateTime = new Date(date, time);
	var endTime = new Date(date, end);
	var trees = getTrees();

	return {
		"event": {
			"owner": {
				"id": idOwner,
			},
			"description": description,
			"location": {
				"id": idLocation,
			},
			"datetime": dateTime.toISOString(),
			"endtime": endTime.toISOString(),
			"trees": trees
		}
	};
}

function addNewEvent(numberTrees){
	var bodyRequest = builBodyRequest(numberTrees);

	$.ajax({
		url: "/events",
		type: "POST",
		data: bodyRequest;
		dataType: "json",
		headers:{
			"Authorization": "AppleSeed token=IIjjCqQNuuO1iwkB6v7kiV6Z44c"
		},
		success: function(json) {
			window.location.reload();
		},
		statusCode: {
			400: function(json) {
				parsed = JSON.parse(json);
				alert(parsed["message"]+"<br>"+parsed["errors"]);
			},
			401: function(json) {
				message = JSON.parse(json);
				alert(message);
			},
			403: function(json) {
				message = JSON.parse(json);
				alert(message);
			}
		},
		error: function() {
			alert("Ajax request failed");
		}
	});
}

function deleteEvent(eventID) {
	var eventsList=getCookie("Appleseed_events");
	var jsonCookie=JSON.parse(eventsList);
	//jsonCookie[eventID].splice(index,1);
	//document.cookie="Appleseed_events="+JSON.stringify(jsonCookie);
	window.location.reload();
}

function disableOther() {
	$('#tree-type-other').val('');
	$('#tree-type-other').attr('disabled', true);
}

function enableOther() {
	$('#tree-type-other').attr('disabled', false);
}

$('#other-check').mousedown(function() {
	if (!$(this).is(':checked'))
		$('#tree-type-other').attr('disabled', false);
	else {
		$('#tree-type-other').val('');
		$('#tree-type-other').attr('disabled', true);
	}
});
