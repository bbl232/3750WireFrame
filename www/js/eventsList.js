function showEvents(){
    console.log("show");
    var table = document.getElementById("events_table");
    var eventsList = getEvents();
    var url = document.URL;
	var user=getCurrentUser();
    var id = user.id;

    if (eventsListText != ""){
        eventsList.forEach(function (event){
               var tr = "<tr>"; //table row
                tr += "<td>Producer: " + event.owner + "</td>"; // td= table cell
                tr += "<td>Date: " + event.date + "</td>";
                tr += "<td>Address: " + event.address + "</td>";
                tr+="<td>Time: "+event.time+"</td></tr><tr>";
				//print trees
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
				
				//They are a volunteer
                if(url.indexOf("volunteer.php") > -1) {
                    tr+='<td><button type="button" class="btn btn-success" onclick="volunteerEvent('+id+')">Register</button></td>';
                } else if(url.indexOf("eventMgmt.php") > -1) {
					//creator of event
                    if (event.owner == id){
                        tr+='<td><button type="button" class="btn btn-primary" onclick="modifyEvent('+id+')">Modify</button></td>';
                    }
                }
                tr += "</tr>";
                table.innerHTML +=tr;
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
            if (event[field]==data || data=="") {//filter by data
                var tr = "<tr>"; //table row
                tr += "<td>Producer: " + event.owner + "</td>"; // td= table cell
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
