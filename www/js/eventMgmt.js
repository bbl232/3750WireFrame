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

function getEvent(eventID) {
	$.ajax({
		url: "/events/"+eventID,
		dataType: "json",
		headers:{
			"Authorization": "AppleSeed token=IIjjCqQNuuO1iwkB6v7kiV6Z44c"
		},
		success: function(json) {
			parsed = JSON.parse(json);
			return parsed;
		},
		statusCode: {
			201: function(json) {
				parsed = JSON.parse(json);
				return parsed;
			},
			404: function(json) {
				parsed = JSON.parse(json);
				alert(parsed["message"]);
			},
			401: function(json) {
				parsed = JSON.parse(json);
				alert(parsed["message"]);
			},
			403: function(json) {
				parsed = JSON.parse(json);
				alert(parsed["message"]);
			}
		},
		error: function() {
			alert("Ajax request failed");
		}
	});
}

function modifyEvent(eventID) {
	var myEvent = getEvent(eventID);

	document.getElementById("datepicker").disabled = true;
	document.getElementById("timepicker").disabled = true;
	var endDate = new Date(myEvent["endTime"]);
	document.getElementById("timepicker2").value = endDate.getHours()+":"+endDate.getMinutes();

	var trees = myEvent["trees"];
	var treesHTML = '<div id="trees">';
	var i;
	for (i=0;i<trees.length;i++){
		treesHTML += '<input class="form-control" id="tree'+i+'type" value="'+trees[i]["type"]+'" type="text"> <input class="form-control" id="tree'+i+'num" value="'+trees[i]["quantity"]+'" type="text">'
	}
	treesHTML += '</div><button type="button" class="btn btn-link" onclick="addEventTree('+i+')">+ Add Type</button><br>'
	document.getElementById("treesForm").innerHTML = treesHTML;
	document.getElementById("description").value = myEvent["description"];

	var footer = document.getElementById("footer");
	footerHTML = '<button type="button" class="btn btn-primary" data-dismiss="modal" onclick="saveEvent('+eventID+','+i+')">Save</button> \
	<button type="button" class="btn btn-danger" data-dismiss="modal" onclick="deleteEvent('+eventID+')">Delete</button> \
	<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>';
	footer.innerHTML = footerHTML;

	$('#addEventModal').modal('show');
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

function saveRequest(eventID, numberTrees) {
	var description = document.getElementById("tree-text").value;
	var date = document.getElementById("datepicker").value;
	var end = document.getElementById("timepicker2").value;
	var endTime = new Date(date, end);
	var trees = getTrees(numberTrees);

	return {
		"event": {
			"id": eventID,
			"description": description,
			"endtime": endTime.toISOString(),
			"trees": trees
		}
	};
}

function saveEvent(eventID, numberTrees) {
	var eventData = saveRequest(eventID,numberTrees);

	$.ajax({
		url: "/events/"+eventID,
		type: "PUT",
		data: eventData,
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
				alert(parsed["message"]);
			},
			401: function(json) {
				parsed = JSON.parse(json);
				alert(parsed["message"]);
			},
			404: function(json) {
				parsed = JSON.parse(json);
				alert(parsed["message"]);
			},
			403: function(json) {
				parsed = JSON.parse(json);
				alert(parsed["message"]);
			}
		},
		error: function() {
			alert("Ajax request failed");
		}
	});
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

function builBodyRequest(numberTrees) {
	var idOwner = getCurrentUserID();
	var description = document.getElementById("tree-text").value;
	var idLocation = getLocation(document.getElementById("location").value);
	var date = document.getElementById("datepicker").value;
	var time = document.getElementById("timepicker").value;
	var end = document.getElementById("timepicker2").value;
	var dateTime = new Date(date, time);
	var endTime = new Date(date, end);
	var trees = getTrees(numberTrees);

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
		data: bodyRequest,
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
				parsed = JSON.parse(json);
				alert(parsed["message"]);
			},
			403: function(json) {
				parsed = JSON.parse(json);
				alert(parsed["message"]);
			}
		},
		error: function() {
			alert("Ajax request failed");
		}
	});
}

function deleteEvent(eventID) {
	$.ajax({
		url: "/events/"+eventID,
		type: "DELETE",
		dataType: "json",
		headers:{
			"Authorization": "AppleSeed token=IIjjCqQNuuO1iwkB6v7kiV6Z44c"
		},
		success: function(json) {
			parsed = JSON.parse(json);
			alert(parsed["message"]);
			window.location.reload();
		},
		statusCode: {
			401: function(json) {
				parsed = JSON.parse(json);
				alert(parsed["message"]);
			},
			404: function(json) {
				parsed = JSON.parse(json);
				alert(parsed["message"]);
			},
			403: function(json) {
				parsed = JSON.parse(json);
				alert(parsed["message"]);
			}
		},
		error: function() {
			alert("Ajax request failed");
		}
	});
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
