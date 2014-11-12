function showEvents(){
    console.log("show");
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
//Filter by field type and the data in the field
//Filter by user bob
//filter by date 11/11/14
function filter_list(field) {
    var table = document.getElementById("events_table");

    var data;
    if(field=="date"){
        var date = document.getElementById("datepicker").value;
        //date.replace('\/','-');
        //date.trim
        data=date;
    }
    
    var eventsListText = getCookie("Appleseed_events");
    if (eventsListText != "") {
        var eventsList = JSON.parse(eventsListText);
        eventsList.forEach(function (event) {
            //NameOfCreator
            //Address
            //Date
            //Time
            //Duration
            //NumberOfVolunteersNeeded
            //Trees
            tr="";
            if (event[field]==data) {//filter by data
                var tr = "<tr>"; //table row
                tr += "<td>Producer: " + event.creator + "</td>"; // td= table cell
                tr += "<td>Date: " + event.date + "</td>";
                tr += "<td>Address: " + event.address + "</td>";
                tr += "</tr>";
                table.innerHTML = tr;
            }else{
                console.log(data +" "+event[field]+" "+date);
            }
        });

    }else{
    }

    //showEvents();
}