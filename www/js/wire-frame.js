//getCookie function taken from w3schools: http://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
}

function login(){
    var uid = document.getElementById('login-email');
    var upa = document.getElementById('login-password');
    if(uid.value != "" && upa.value != ""){
        document.cookie = "User_id_appleseed="+uid.value;
        window.location = window.location;
    }

    addEvent('wvandenb','123 Fake St','2014-11-11','13:30', '3h0m', 10, [{'Apple':2}, {'Cherry':1}]);
}

function register(){
    var upa = document.getElementById('login-password');
    var upc = document.getElementById('login-confirm_password');
    if(upa.value == upc.value){
        login();
    }
    else{
        $('#popover-signup').popover('hide');
        $('#passwordMismatchModal').modal('show');
    }
}

function logout(){
    document.cookie = "User_id_appleseed=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "Appleseed_events=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    window.location = "/index.php";
}

function setupNavbar(){
    var user_id = getCookie("User_id_appleseed");
    var div = document.getElementById("nav-right");
    var div_left = document.getElementById("nav-left");
    if(user_id==""){
        div.innerHTML = '<li><form class="navbar-form" role="login"> \
          <div class="form-group"> \
            <input type="text" class="form-control" placeholder="E-mail" id="login-email" required> \
            <input type="password" class="form-control" placeholder="Password" id="login-password" required> \
          </div> \
          <button type="submit" class="btn btn-primary" onclick="login()">Log In</button> \
          <button type="button" class="btn btn-default" id="popover-signup" data-container="body" data-toggle="popover" data-placement="bottom" data-html="true" data-content="<div class=\'input-group\'><input size=\'10\' type=\'password\' placeholder=\'Confirm Password\' id=\'login-confirm_password\' class=\'form-control\'><span class=\'input-group-btn\'><button onclick=\'register()\' type=\'button\' class=\'form-control btn btn-default\'>Register</button></span></div>">Create Account</button> \
        </form></li>';
    }
    else{
        div_left.innerHTML = div_left.innerHTML + "<li class='dropdown'><a href='#' class='dropdown-toggle' data-toggle='dropdown'>Actions <span class='caret'></span></a><ul class='dropdown-menu' role='menu'><li><a href='/volunteer.php'>Volunteer</a></li><li><a href='/trees.php'>Trees</a></li><li><a href='/myaccount.php'>My Account</a></li></ul></li>";
        div.innerHTML = '<li><p class="navbar-text">Logged in as '+user_id+'</p></li><li><form class="navbar-form"><button class="btn btn-default" onclick="logout()">Log Out</button></form></li>';
    }
}

$(function () {
    $("[data-toggle='tooltip']").tooltip();
});;
/* To initialize BS3 popovers set this below */
$(function () {
    $("[data-toggle='popover']").popover();
});



function addEvent(name,address, date, time, duration, numVol, trees){

    var eventsListText = getCookie('Appleseed_events');
    if(eventsListText == ""){
        var eventsList=[];
    }
    else{
        var eventsList=JSON.parse(eventsListText);
    }
    var newEvent = {};
    newEvent['creator'] = name;
    newEvent['address'] = address;
    newEvent['date'] = date;
    newEvent['time'] = time;
    newEvent['duration'] = duration;
    newEvent['numVolunteers'] = numVol;
    newEvent['numRegVolunteers'] = 0;
    newEvent['trees'] = trees;

    eventsList.push(newEvent);
    document.cookie = "Appleseed_events="+JSON.stringify(eventsList);
}

function addFeedback(){
    
}

setupNavbar();
