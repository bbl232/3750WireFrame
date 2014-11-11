function showEvents(){
    var table = document.getElementById("events_table");
    var eventsListText = getCookie("Appleseed_events");
    var eventsList = JSON.parse(getCookie("Appleseed_events"));
    if (eventsList != ""){
        eventsList.forEach(function (event){
            //NameOfCreator
            //Address
            //Date
            //Time
            //Duration
            //NumberOfVolunteersNeeded
            //Trees
            var tr = "<tr>";
            tr += "<td>Producer: "+event.creator+"</td>";
            tr += "<td>Date: "+event.date+"</td>";
            tr += "<td>Address: "+event.address+"</td>";
            tr += "</tr>";
            table.innerHTML += tr;
        });
    }

}

showEvents();
