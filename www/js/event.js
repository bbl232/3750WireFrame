function getEvents() {
	var events = getCookie('events');
	return JSON.parse(events);
}

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

function addNewEvent(){
	var user_id = getCookie("User_id_appleseed");
	var location = document.getElementById("location").value;
	var date = document.getElementById("datepicker").value;
	alert(""+user_id+" "+location+" "+date);
	//addEvent(user_id, address, date, time, duration, numVol, trees);
}

$(function() {
	$( "#datepicker" ).datepicker();
})
