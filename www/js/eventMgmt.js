/*
	setLocationInput() - creates an input with all the current user's locations
	It uses getCurrentUser to get the current user.
	Then it uses getUserLocations to get all the user's locations.
	Finaly it parses all the locations into select option input
*/
function setLocationInput() {
	console.log("locations");
	var locationInputHTML="";
	var locationInput = document.getElementById("location-input");
	var message;
	var cookie = getCookie("Appleseed_user_details");
	var parsed = JSON.parse(cookie);

	$.ajax({
		url: "http://127.0.0.1:3000/users/current",
		dataType: "json",
		beforeSend: function (request) {
			request.setRequestHeader("Authorization", "AppleSeed token="+parsed['token']);
		},
		success: function(json) {
			$.ajax({
				url: "http://127.0.0.1:3000/user/"+ json['user']['id'] +"/locations",
				dataType: "json",
				beforeSend: function (request) {
					request.setRequestHeader("Authorization", "AppleSeed token="+parsed['token']);
				},
				success: function(json) {
					alert(JSON.stringify(json));
					locationInputHTML+='<div class="form-group"><label>Choose a location:</label><select class="form-control" id="location">';
					for (var i=0;i<json['user']['locations'].length;i++){
						locationInputHTML+='<option value=';
						locationInputHTML+=json['user']['locations'][i]['id'];
						locationInputHTML+="'>";
						locationInputHTML+=json['user']['locations'][i]['description'];
						locationInputHTML+="</option>";
					}
					locationInputHTML+='</select></div>'
					locationInput.innerHTML=locationInputHTML;
				},
				statusCode: {
					401: function(json) {
						parsed = JSON.parse(json);
						alert(parsed["message"]);
					},
					403: function(json) {
						parsed = JSON.parse(json);
						alert(parsed["message"]);
					},
					404: function(json) {
						parsed = JSON.parse(json);
						alert(parsed["message"]);
					}
				},
				error: function() {
					alert("Ajax request failed");
				}
			});
		},
		statusCode: {
			401: function(json) {
				parsed = JSON.parse(json);
				alert(parsed["message"]);
			}
		},
		error: function() {
			alert("Ajax request failed");
		}
	});
}

/*
	newEvent - shows the modal to create an event
	calls setLocationInput to set all the user's locations into input
*/
function newEvent() {
	setLocationInput();
	$('#addEventModal').modal('show');
}

/*
	addEventTree() - adds a new tree input field
		numberTrees - the actual number of fields
	it adds the new field to the actual number of fields
	and updates the number of fields store in the hidden input "trees-number"
*/
function addEventTree(numberTrees) {
	var trees = document.getElementById("trees").innerHTML;
	trees += '<br><input class="form-control" id="tree'+ numberTrees +'type" placeholder="Type" type="text"> <input class="form-control" id="tree'+ numberTrees +'num" placeholder="Number" type="text">';
	numberTrees++;
	document.getElementById("treesForm").innerHTML = '<div id="trees">'+ trees +'</div><input id="trees-number" type="hidden" value="'+ numberTrees +'"><button type="button" class="btn btn-link" onclick="addEventTree('+ numberTrees +')">+ Add Type</button><br>';
}

/*
	modifyEvent() - shows the modal with the events value
		eventID - the ID of the event to show
	The modifiation of an event uses the same modal as the vent creation.
	The user can only change the end time, the trees and the description.
	A staff can add a note. TODO
*/
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
	treesHTML += '</div><input id="trees-number" type="hidden" value="'+ i +'"><button type="button" class="btn btn-link" onclick="addEventTree('+i+')">+ Add Type</button><br>'
	document.getElementById("treesForm").innerHTML = treesHTML;
	document.getElementById("description").value = myEvent["description"];

	var footer = document.getElementById("footer");
	footerHTML = '<button type="button" class="btn btn-primary" data-dismiss="modal" onclick="saveEvent('+eventID+','+i+')">Save</button> \
	<button type="button" class="btn btn-danger" data-dismiss="modal" onclick="deleteEvent('+eventID+')">Delete</button> \
	<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>';
	footer.innerHTML = footerHTML;

	$('#addEventModal').modal('show');
}

/*
	getTrees() - gets all the trees values from the fields
		numberTrees - number of fields
*/
function getTrees(numberTrees) {
	var trees = [];
	var type;
	var quantity;

	for(var i=0;i<numberTrees;i++) {
		type = document.getElementById("tree"+i+"type").value;
		quantity = document.getElementById("tree"+i+"num").value;
		if(type!=null && quantity!=null) {
			trees[i] = {};
			trees[i]['type'] = type;
			trees[i]['quantity'] = parseInt(quantity);
		}
	}

	return trees;
}

/*
	saveRequest() - creates a JSON string to modify an event
		eventID - the ID of the event to modify
*/
function saveRequest(eventID) {
	var description = document.getElementById("tree-text").value;
	var date = document.getElementById("datepicker").value;
	var end = document.getElementById("timepicker2").value;
	var endTime = new Date(date, end);
	var numberTrees = document.getElementById("trees-number");
	var trees = getTrees(numberTrees);

	var bodyEvent = {};
	bodyEvent['event'] = {};
	bodyEvent['event']['id'] = eventID;
	bodyEvent['event']['description'] = description;
	bodyEvent['event']['endtime'] = endTime.toISOString();
	bodyEvent['event']['trees'] = trees;

	return JSON.stringify(bodyEvent);
}

/*
	saveEvent - saves the event modification to the database
		eventID - the ID of the event to modify
*/
function saveEvent(eventID) {
	var eventData = saveRequest(eventID);

	$.ajax({
		url: "http://127.0.0.1:3000/events/"+eventID,
		type: "PUT",
		data: eventData,
		dataType: "json",
		/*headers:{
			"Authorization": "AppleSeed token=IIjjCqQNuuO1iwkB6v7kiV6Z44c"
		},*/
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

/*
	buildBodyRequest() - build a JSON string to create an event
*/
function builBodyRequest() {
	var numberTrees = parseInt(document.getElementById("trees-number").value);
	var user = getCurrentUser();
	var idOwner = user['id'];
	var description = document.getElementById("tree-text").value;
	var idLocation = parseInt(document.getElementById("location").value);
	var date = document.getElementById("datepicker").value;
	var time = document.getElementById("timepicker").value;
	var end = document.getElementById("timepicker2").value;
	var dateTime = new Date(date+" "+time);
	var endTime = new Date(date+" "+end);
	var trees = getTrees(numberTrees);

	var bodyEvent = {};
	bodyEvent['event'] = {}
	bodyEvent['event']['owner'] = {};
	bodyEvent['event']['owner']['id'] = idOwner;
	bodyEvent['event']['description'] = description;
	bodyEvent['event']['location'] = {};
	bodyEvent['event']['location']['id'] = idLocation;
	bodyEvent['event']['datetime'] = dateTime.toISOString();
	bodyEvent['event']['endtime'] = endTime.toISOString();
	bodyEvent['event']['trees'] = trees;
	bodyEvent['event']['attendees'] = [];
	bodyEvent['event']['staffNotes'] = "";

	return JSON.stringify(bodyEvent);
}

/*
	addNewEvent() - add a new event to the database
*/
function addNewEvent(){
	var bodyRequest = builBodyRequest();

	$.ajax({
		url: "http://127.0.0.1:3000/events",
		type: "POST",
		data: bodyRequest,
		dataType: "json",
		/*headers:{
			"Authorization": "AppleSeed token=IIjjCqQNuuO1iwkB6v7kiV6Z44c"
		},*/
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

/*
	deleteEvent() - delete an event from the database
		eventID - the id of the event to delete
*/
function deleteEvent(eventID) {
	$.ajax({
		url: "http://127.0.0.1:3000/events/"+eventID,
		type: "DELETE",
		dataType: "json",
		/*headers:{
			"Authorization": "AppleSeed token=IIjjCqQNuuO1iwkB6v7kiV6Z44c"
		},*/
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
