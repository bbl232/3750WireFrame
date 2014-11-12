function setLocationInput() {
	var locationInputHTML="";
	var locationInput = document.getElementById("location-input");
	var userDetails=getCookie("account_details_appleseed");
	var jsonCookie=JSON.parse(userDetails);
	var addresses=[];

	addresses=jsonCookie['userAddress'];
	locationInputHTML+='<div class="form-group">Choose a location:<select class="form-control" id="location">';
	for (var i=0;i<addresses.length;i++){
		locationInputHTML+='<option value=';
		locationInputHTML+=addresses[i]['location'];
		locationInputHTML+=">";
		locationInputHTML+=addresses[i]['location'];
		locationInputHTML+="</option>";
	}
	locationInputHTML+='</select></div>'
	locationInput.innerHTML=locationInputHTML;
}

function newEvent() {
	setLocationInput();
	$('#addEventModal').modal('show');
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

function addNewEvent(){
	var user_id = getCookie("User_id_appleseed");
	var address = document.getElementById("location").value;
	var date = document.getElementById("datepicker").value;
	var time = document.getElementById("time").value;
	var duration = document.getElementById("duration").value;
	var numVol = document.getElementById("volunteers").value;
	var trees = [{'Apple':2}, {'Cherry':1}];
	addEvent(user_id, address, date, time, duration, numVol, trees);
	window.location.reload();
}

function deleteEvent(eventID) {
	var eventsList=getCookie("Appleseed_events");
	var jsonCookie=JSON.parse(eventsList);
	//jsonCookie[eventID].splice(index,1);
	//document.cookie="Appleseed_events="+JSON.stringify(jsonCookie);
	window.location.reload();
}
