function showEvents(){
    console.log("show");
    var table = document.getElementById("events_table");
    var eventsListText = getCookie("Appleseed_events");
    var url = document.URL;
    var id = 0;

    if (eventsListText != ""){
        var eventsList = JSON.parse(eventsListText);
        eventsList.forEach(function (event){
               var tr = "<tr>"; //table row
                tr += "<td>Producer: " + event.creator + "</td>"; // td= table cell
                tr += "<td>Date: " + event.date + "</td>";
                tr += "<td>Address: " + event.address + "</td>";
                tr+="<td>Time: "+event.time+"</td></tr><tr>";
                var numTreeTypes = Object.keys(event.trees).length;
                if(numTreeTypes>1){
                    var index=1;
                    tr+="<td>Tree(s):"+Object.keys(event.trees[0]);
                    for(index;index<numTreeTypes;index++){
                        tr+=","+Object.keys(event.trees[index]);
                    }
                    tr+="</td>"

                }else{
                    tr+="<td>Tree(s):"+Object.keys(event.trees[0])+"</td>";
                }
                tr+="<td>Number of volunteers needed "+event.numVolunteers+"</td>";
                tr+="<td>Number of registered volunteers "+event.numRegVolunteers+"</td>";
                if(url.indexOf("volunteer.php") > -1) {
                    tr+='<td><button type="button" class="btn btn-success" onclick="volunteerEvent('+id+')">Register</button></td>';
                }
                tr += "</tr>";
                table.innerHTML +=tr;
                id++;
        });
    }

}
//Filter by field type and the data in the field
//Filter by user bob
//filter by date 11/11/14
function filter_list(field) {
    var table = document.getElementById("events_table");
    table.innerHTML="";
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
                tr+="<td>Time: "+event.time+"</td>";
                var numTreeTypes = Object.keys(event.trees).length;
                if(numTreeTypes>1){
                    var index=1;
                    tr+="<td>Tree(s):"+Object.keys(event.trees[0]);
                    for(index;index<numTreeTypes;index++){
                        tr+=","+Object.keys(event.trees[index]);
                    }
                    tr+="</td>"

                }else{
                    tr+="<td>Tree(s):"+Object.keys(event.trees[0])+"</td>";
                }
                tr+="<td>Number of volunteers needed "+event.numVolunteers+"</td>";
                tr+="<td>Number of registered volunteers "+event.numRegVolunteers+"</td>";


                tr += "</tr>";
                table.innerHTML +=tr;
            }else{
                console.log(data +" "+event[field]+" "+date);
            }
        });
    }
}

function volunteerEvent(){
    var date = document.getElementById("datepicker").value;
    var eventsListText = getCookie("Appleseed_events");
    var eventsList = JSON.parse(eventsListText);

    var count=0;
    var theEvent;
    var dateEvent;

        eventsList.forEach(function (event) {
            if(event.date=date){
                count++;
                dateEvent+=event;
                theEvent=event;
            }
        });
        console.log(count);
        if(count>1){
            //Ask user which time, since apparently they are on the same day

        }else if (count==1){
            //Success, get current user's name and add them to event, increase num volunteers
            theEvent.numRegVolunteers++;//this isnt working, not global?
        }else{
            //fail
        }

}
