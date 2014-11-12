function getEvents() {
	var events = getCookie('events');
	return JSON.parse(events);
}

function addEvent() {
	/*
	var events = getEvents();
	var lenght = events.lenght() - 1;
	events[lenght] = [];
	*/
	alert('event');
}

function newEvent() {
	$('#addEventModal').modal('show');
}

$(function() {
	$( "#datepicker" ).datepicker();
})
