function getEvents() {
	var events = getCookie('events');
	return JSON.parse(events);
}

function newEvent() {
	$('#addEventModal').modal('show');
}

function addNewEvent() {
	
}

$(function() {
	$( "#datepicker" ).datepicker();
})
