function showEvents(){
    var table = document.getElementById("events_table");
    var eventsListText = getCookie("Appleseed_events");
    if (eventsListText != ""){
        var eventsList = JSON.parse(eventsListText);
        eventsList.forEach(function (event){
            //NameOfCreator
            //Address
            //Date
            //Time
            //Duration
            //NumberOfVolunteersNeeded
            //Trees
            var tr = "<tr>"; //table row
            tr += "<td>Producer: "+event.creator+"</td>"; // td= table cell
            tr += "<td>Date: "+event.date+"</td>";
            tr += "<td>Address: "+event.address+"</td>";
            tr += "</tr>";
            table.innerHTML += tr;
        });
    }

}

showEvents();
