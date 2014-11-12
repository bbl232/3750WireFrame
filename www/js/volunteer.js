function volunteerEvent(eventID) {
	var eventsListText = getCookie("Appleseed_events");
	var eventsList = JSON.parse(eventsListText);

	if(eventsList[eventID].numRegVolunteers < eventsList[eventID].numVolunteers) {
		eventsList[eventID].numRegVolunteers++;
		document.cookie="Appleseed_events="+JSON.stringify(eventsList);
		window.location.reload();
	} else {
		alert("Can't register to this event, no space available.");
	}
}
