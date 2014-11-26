function showEvents(){
    console.log("show");
    var table = document.getElementById("events_table");
    var eventsList;
    var url = document.URL;
    var cookie = getCookie("Appleseed_user_details");
    var parsed = JSON.parse(cookie);
    var id = parsed['user']['id'];
    var tr;

    $.ajax({
        url: "http://127.0.0.1:3000/events",
        dataType: "json",
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", "AppleSeed token="+parsed['token']);
        },
        success: function(json) {
            alert(JSON.stringify(json));
            for (var i=0;i<json['events'].length;i++) {
                tr = "<tr>"; //table row
                tr += "<td>Producer: " + json['events'][i]['owner']['firstname'] + " " + json['events'][i]['owner']['lastname'] + "</td>"; // td= table cell
                tr += "<td>Date: " + json['events'][i]['datetime'] + "</td>";
                tr += "<td>Address: " + json['events'][i]['location'] + "</td>";
                tr+="<td>End: "+json['events'][i]['endtime']+"</td></tr><tr>";
                //print trees
                tr+="<td>Tree(s): ";
                /*var l = json['events'][i]['trees'].length
                for (var j=0;j<l;i++) {
                    tr+=json['events'][i]['trees']['type'] + "(" + json['events'][i]['trees']['quantity'] + "),";
                }*/
                tr+="</td>";

                //They are a volunteer
                if(url.indexOf("volunteer.php") > -1) {
                    tr+='<td><button type="button" class="btn btn-success" onclick="volunteerEvent('+json['events'][i]['id']+')">Register</button></td>';
                } else if(url.indexOf("eventMgmt.php") > -1) {
                    //creator of event
                    if (json['events'][i]['owner']['id'] == id){
                        tr+='<td><button type="button" class="btn btn-primary" onclick="modifyEvent('+json['events'][i]['id']+')">Modify</button></td>';
                    }
                }
                tr += "</tr>";
                table.innerHTML +=tr;
            }
        },
        statusCode: {
            201: function(json) {
                parsed = JSON.parse(json);
                return parsed;
            },
            404: function(json) {
                parsed = JSON.parse(json);
                alert(parsed["message"]);
            },
            401: function(json) {
                parsed = JSON.parse(json);
                alert(parsed["message"]);
            },
            403: function(json) {
                parsed = JSON.parse(json);
                alert(parsed["message"]);
            }
        },
        error: function() {
            alert("Ajax request failed");
        }
    });
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
//popup modal for creating an event and adding it to the database
function createEventModal(){
	$('#addEventModal').modal('show');
}
