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

function hexFromAscii(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

function login(){
    var uid = document.getElementById('login-email');
    var upa = document.getElementById('login-password');
    var hashed = sjcl.hash.sha256.hash(upa.value);
    var hex = sjcl.codec.hex.fromBits(hashed);
    if(uid.value != "" && upa.value != ""){
        document.cookie = "User_id_appleseed="+uid.value;
        //here we will pull data set cookies for account details
        //document.cookie = "Email_appleseed=testEmail";
        //document.cookie = "eAddress_appleseed=rmarcott@uoguelph.ca";
        //document.cookie = "Phone_appleseed=519-249-9220";


        //Theses cookies are here till we have backend - to be removed
        setAccountCookie(uid);

        //I have no idea what I'm doing here, if you can't tell already
        var auth = {};
        auth['email'] = uid.value;
        auth['passwordHash'] = hex.toString();

	$.ajax({
		url: "127.0.0.1:3000/users/authenticate",
		data: auth,
		dataType: "json",
		success: function(json) {
                	addEvent('wvandenb', '123 Fake Street','11/11/2014','13:30', '3h0m', 10, [{'Apple':2}, {'Cherry':1}]);
		},
		statusCode: {
			403: function(json) {
				alert("Invalid password or email.");
			}
		},
		error: function() {
			alert("Ajax request failed");
		}
	});
    }
}

function staffLogin(){
    var sid = document.getElementById('staff-login-email');
    var spa = document.getElementById('staff-login-password');
    var hashed = sjcl.hash.sha256.hash(spa.value);
    var hex = sjcl.codec.hex.fromBits(hashed);
    if(sid.value != "" && spa.value != ""){
        document.cookie = "User_id_appleseed="+sid.value;
        document.cookie = "Staff_id_appleseed=staff";

        //Theses cookies are here till we have backend - to be removed
        setAccountCookie(sid);

        var auth = {};
        auth['email'] = sid.value;
        auth['passwordHash'] = hex.toString();

	$.ajax({
		url: "127.0.0.1:3000/users/authenticate",
		data: auth,
		dataType: "json",
		success: function(json) {
                	addEvent('wvandenb', '123 Fake Street','11/11/2014','13:30', '3h0m', 10, [{'Apple':2}, {'Cherry':1}]);
		},
		statusCode: {
			403: function(json) {
				alert("Invalid password or email.");
			}
		},
		error: function() {
			alert("Ajax request failed");
		}
	});

        window.location.href = "/";
    }
}

function register(){
    var upa = document.getElementById('login-password');
    var upc = document.getElementById('login-confirm_password');
    var hashed = sjcl.hash.sha256.hash(upa.value);
    var hex = sjcl.codec.hex.fromBits(hashed);
    if(upa.value == upc.value){
        var uinfo = {};
        uinfo['user'] = {};
        uinfo['user']['firstname'] = "John";
        uinfo['user']['lastname'] = "Doe";
        uinfo['user']['email'] = "john@example.com";
        uinfo['user']['roles'] = ["staff"];
        uinfo['user']['phone'] = 9052435432;
        uinfo['user']['passwordHash'] = hex.toString();
        uinfo['user']['locations'] = {};
        uinfo['user']['locations']['description'] = "Home";
        uinfo['user']['locations']['address1'] = "41 Old Rd";
        uinfo['user']['locations']['address2'] = "";
        uinfo['user']['locations']['city'] = "Guelph";
        uinfo['user']['locations']['postal'] = "N1G 0A0";
        uinfo['user']['locations']['country'] = "Canada";
        uinfo['user']['locations']['latitude'] = "43.530766";
        uinfo['user']['locations']['longitude'] = "-80.229016";
        uinfo['user']['userNotes'] = "";
	uinfo['user']['company'] = "";
	uinfo['user']['emailEnabled'] = false;

	$.ajax({
		url: "127.0.0.1:3000/users",
		data: uinfo,
		dataType: "json",
		success: function(json) {
                	login();
		},
		statusCode: {
			400: function(json) {
				parsed = JSON.parse(json);
				alert(parsed["message"]);
			}
		},
		error: function() {
			alert("Ajax request failed");
		}
	});
    }
    else{
        $('#popover-signup').popover('hide');
        $('#passwordMismatchModal').modal('show');
    }
}

function logout(){
    document.cookie = "User_id_appleseed=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "Staff_id_appleseed=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = 'account_details_appleseed=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    document.cookie = "Appleseed_events=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    window.location.href = "/index.php";
}

function setupNavbar(){
    /*Set up header*/
    var user_id = getCookie("User_id_appleseed");
    var staff_id = getCookie("Staff_id_appleseed");
    var nav_right = document.getElementById("nav-right");
    var nav_left = document.getElementById("nav-left");

    if(user_id=="" && staff_id==""){
        nav_right.innerHTML = '<li><form class="navbar-form" role="login"> \
          <div class="form-group"> \
            <input type="text" class="form-control" placeholder="E-mail" id="login-email" required> \
            <input type="password" class="form-control" placeholder="Password" id="login-password" required> \
          </div> \
          <button type="submit" class="btn btn-primary" onclick="login()">Log In</button> \
          <button type="button" class="btn btn-default" id="popover-signup" data-container="body" data-toggle="popover" data-placement="bottom" data-html="true" data-content="<div class=\'input-group\'><input size=\'10\' type=\'password\' placeholder=\'Confirm Password\' id=\'login-confirm_password\' class=\'form-control\'><span class=\'input-group-btn\'><button onclick=\'register()\' type=\'button\' class=\'form-control btn btn-default\'>Register</button></span></div>">Create Account</button> \
        </form></li>';
    }
    else if(staff_id=="staff"){
        nav_left.innerHTML = nav_left.innerHTML + "<li class='dropdown'><a href='#' class='dropdown-toggle' data-toggle='dropdown'>Menu <span class='caret'></span></a><ul class='dropdown-menu' role='menu'><li><a href='/volunteer.php'>Volunteer</a></li><li><a href='/event.php'>Event Management</a></li><li><a href='/myaccount.php'>My Account</a></li><li><a href='/viewFeedback.php'>View Feedback</a></li></ul></li>";
        nav_right.innerHTML = '<li><p class="navbar-text">Staff logged in as '+user_id+'</p></li><li><form class="navbar-form"><button type="button" class="btn btn-default" onclick="logout()">Log Out</button></form></li>';
    }
    else{
        nav_left.innerHTML = nav_left.innerHTML + "<li class='dropdown'><a href='#' class='dropdown-toggle' data-toggle='dropdown'>Menu <span class='caret'></span></a><ul class='dropdown-menu' role='menu'><li><a href='/volunteer.php'>Volunteer</a></li><li><a href='/event.php'>Event Management</a></li><li><a href='/myaccount.php'>My Account</a></li></ul></li>";
        nav_right.innerHTML = '<li><p class="navbar-text">Logged in as '+user_id+'</p></li><li><form class="navbar-form"><button type = "button" class="btn btn-default" onclick="logout()">Log Out</button></form></li>';
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

function sendFeedback(){
    var name = document.getElementById("feedback-name").value;
    var email = document.getElementById("feedback-email").value;
    var contact = document.getElementById("feedback-contact_me").checked;
    var feedback = document.getElementById("feedback-text").value;

    addFeedback(name,email,contact,feedback);
}

function setAccountCookie(sid){
    account_details={};
    account_details['userID']=sid.value;
    account_details['userEmail']="testEmail@google.ca";
    account_details['userAddress']=[];
    account_details['userAddress'][0]={};
    account_details['userAddress'][0]['name']="Home";
    account_details['userAddress'][0]['location']="123 Fake St.";
    account_details['userAddress'][1]={};

    account_details['userAddress'][1]['name']="Work";
    account_details['userAddress'][1]['location']="123 Billy St.";
    account_details['userAddress'][2]={};

    account_details['userAddress'][2]['name']="Cell";
    account_details['userAddress'][2]['location']="123 Ryan St.";

    account_details['userPhone']="519-123-1234";
    document.cookie = "account_details_appleseed="+JSON.stringify(account_details);
}

function addFeedback(name, email, contact, feedback){
    var newFeedback={};

    var feedbackListText = getCookie('Appleseed_feedback');
    if(feedbackListText == ""){
        var feedbackList=[];
    }
    else{
        var feedbackList=JSON.parse(feedbackListText);
    }

    newFeedback['name'] = name;
    newFeedback['email'] = email;
    newFeedback['contact'] = contact;
    newFeedback['feedback'] = feedback;

    feedbackList.push(newFeedback);
    document.cookie = "Appleseed_feedback="+JSON.stringify(feedbackList);
}

$(document).load(setupNavbar());
