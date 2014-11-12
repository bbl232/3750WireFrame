function showFeedback(){
    var feedbackText = getCookie("Appleseed_feedback");
    var table = document.getElementById("feedback-table");
    var index = 0;
    table.innerHTML = "<tr><td>Now new feedback available/</td></tr>"
    if(feedbackText != ""){
        table.innerHTML = "<tr><td><p>Needs Contact</p></td><td><p>Name</p></td><td><p>Feedback</p></td><td></td></tr>";
        feedbackList = JSON.parse(feedbackText);
        feedbackList.forEach(function (feedback){
            var tr = "<tr><td>";
            if(feedback.contact){
                tr += "<span class='glyphicon glyphicon-ok'></span>";
            }
            tr += "</td><td>"+feedback.name+"</td><td>"+feedback.feedback+"</td><td>";
            if(feedback.email != ""){
                tr += "<a href='mailto:"+feedback.email+"'><span class='glyphicon glyphicon-envelope'></span></a>";
            }
            tr += "</td><td><button type='button' class='btn btn-default' onclick='removeFeedback("+index+")'>Remove</button></td></tr>";
            table.innerHTML += tr;
            index++;
        });
    }
}

function removeFeedback(index){
    var feedbackText = getCookie("Appleseed_feedback");
    if(feedbackText != ""){
        feedbackList = JSON.parse(feedbackText);
        feedbackList.splice(index,1);
        document.cookie = "Appleseed_feedback="+JSON.stringify(feedbackList);
        window.location = window.location;
    }
}
showFeedback();
