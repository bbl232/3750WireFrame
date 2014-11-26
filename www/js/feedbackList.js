function getFeedback(){
    var feedbackList;
    $.ajax({
        url: "http://127.0.0.1:3000/feedback/",
        type: "GET",
        dataType: "json",
        /*headers:{
            "Authorization": "AppleSeed token=IIjjCqQNuuO1iwkB6v7kiV6Z44c"
        },*/
        success: function(json) {
            feedbackList = JSON.parse(json);
        },
        error: function() {
            //alert("Ajax request failed. Unable to get feedback.");
        }
    });

    return feedbackList;
}

function showFeedback(){
    var feedbackList = getFeedback();
    var table = document.getElementById("feedback-table");
    table.innerHTML = "<tr><td>No new feedback available.</td></tr>"
    if(feedbackList.length != 0){ 
        table.innerHTML = "<tr><td><p>Needs Contact</p></td><td><p>Name</p></td><td><p>Feedback</p></td><td></td></tr>";
        feedbackList.forEach(function (feedback){
            var tr = "<tr><td>";
            if(feedback.contact){
                tr += "<span class='glyphicon glyphicon-ok'></span>";
            }
            tr += "</td><td>"+feedback.owner.firstname+" "+feedback.owner.lastname+"</td><td>"+feedback.message+"</td><td>";
            if(feedback.owner.email != ""){
                tr += "<a href='mailto:"+feedback.owner.email+"'><span class='glyphicon glyphicon-envelope'></span></a>";
            }
            tr += "</td><td><button type='button' class='btn btn-default' onclick='removeFeedback("+feedback.id+")'>Remove</button></td></tr>";
            table.innerHTML += tr;
        });
    }
}

function removeFeedback(id){
    $.ajax({
        url: "http://127.0.0.1:3000/feedback/"+id,
        type: "DELETE",
        dataType: "json",
        success: function(json) {

        }, 
        error: function() {
            alert("Ajax request failed. Unable to delete feedback.");
        }   
    });
}
showFeedback();
