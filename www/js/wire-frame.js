//getCookie function taken from w3schools: http://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1);
		if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
	}
	return "";
}

/*
	getCurrentUser() - return the current logged in user
*/
function getCurrentUser() {
	var user;
	var message;
	var cookie = getCookie("Appleseed_user_details");
	var parsed = JSON.parse(cookie);

	$.ajax({
		url: "http://127.0.0.1:3000/users/current",
		dataType: "json",
		beforeSend: function (request) {
			request.setRequestHeader("Authorization", "AppleSeed token="+parsed['token']);
		},
		success: function(json) {
			return JSON.stringify(json);
		},
		statusCode: {
			401: function(json) {
				parsed = JSON.parse(json);
				alert(parsed["message"]);
			}
		},
		error: function() {
			alert("Ajax request failed");
		}
	});
}
/*
	getEvents - return a list of event object
*/
function getEvents() {
	$.ajax({
		url: "http://127.0.0.1:3000/event",
		dataType: "json",
		/*headers:{
		"Authorization": "AppleSeed token=IIjjCqQNuuO1iwkB6v7kiV6Z44c"
		},*/
		success: function(json) {
			return JSON.parse(json);
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

/*
	getEvent - return an event object
		eventID - the ID of the event to look up
*/
function getEvent(eventID) {
	var cookie = getCookie("Appleseed_user_details");
	var parsed = JSON.parse(cookie);

	$.ajax({
		url: "http://127.0.0.1:3000/events/"+eventID,
		dataType: "json",
		beforeSend: function (request) {
			request.setRequestHeader("Authorization", "AppleSeed token="+parsed['token']);
		},
		success: function(json) {
			return JSON.parse(json);
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

/*
	getUserLocations() - return the locations for the specified user
		userID - the ID of the user
*/
function getUserLocations(userId) {
	var message;
	var cookie = getCookie("Appleseed_user_details");
	var parsed = JSON.parse(cookie);

	$.ajax({
		url: "http://127.0.0.1:3000/user/"+ userId +"/locations",
		dataType: "json",
		beforeSend: function (request) {
			request.setRequestHeader("Authorization", "AppleSeed token="+parsed['token']);
		},
		success: function(json) {
			return JSON.parse(json);
		},
		statusCode: {
			401: function(json) {
				parsed = JSON.parse(json);
				alert(parsed["message"]);
			},
			403: function(json) {
				parsed = JSON.parse(json);
				alert(parsed["message"]);
			},
			404: function(json) {
				parsed = JSON.parse(json);
				alert(parsed["message"]);
			}
		},
		error: function() {
			alert("Ajax request failed");
		}
	});
}

/*
	login() - log the user in.
		uid - the object returned from the email field
		upa - the object returned from the password field
		hex - the hex string of the password hash
*/
function login(uid, upa, hex) {
	if (uid.value != "" && upa.value != ""){
		document.cookie = "User_id_appleseed="+uid.value;
		//here we will pull data set cookies for account details
		//document.cookie = "Email_appleseed=testEmail";
		//document.cookie = "eAddress_appleseed=rmarcott@uoguelph.ca";
		//document.cookie = "Phone_appleseed=519-249-9220";

		var auth = {};
		auth['email'] = uid.value;
		auth['passwordHash'] = hex.toString();

		var data = JSON.stringify(auth);

		$.ajax({
			type: "POST",
			url: "http://127.0.0.1:3000/users/authenticate",
			data: data,
			dataType: "json",
			success: function(json) {
				document.cookie = "Appleseed_user_details="+JSON.stringify(json);
				setAccountCookie(uid);
				window.location.reload();
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

/*
	loginButton() - collect the information from the login fields and
	pass it to login(). This function exists solely so that register()
	can call the login() function directly and pass data from the
	register fields instead of the login fields.
*/
function loginButton() {
	var uid = document.getElementById('login-email');
	var upa = document.getElementById('login-password');
	var hashed = sjcl.hash.sha256.hash(upa.value);
	var hex = sjcl.codec.hex.fromBits(hashed);
	login(uid, upa, hex);
}

/*
	staffLogin() - log in as a staff member.
*/
function staffLogin() {
	var sid = document.getElementById('staff-login-email');
	var spa = document.getElementById('staff-login-password');
	var hashed = sjcl.hash.sha256.hash(spa.value);
	var hex = sjcl.codec.hex.fromBits(hashed);
	if (sid.value != "" && spa.value != "") {
		document.cookie = "User_id_appleseed="+sid.value;
		document.cookie = "Staff_id_appleseed=staff";

		var auth = {};
		auth['email'] = sid.value;
		auth['passwordHash'] = hex.toString();

		var data = JSON.stringify(auth);

		$.ajax({
			type: "POST",
			url: "http://127.0.0.1:3000/users/authenticate",
			data: data,
			dataType: "json",
			success: function(json) {
				document.cookie = "Appleseed_user_details="+JSON.stringify(json);
				setAccountCookie(sid);
				window.location.reload();
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

/*
	register() - register a user and log them in automatically
*/
function register(){
	var uid = document.getElementById('register-email')
	var upa = document.getElementById('register-password');
	var upc = document.getElementById('register-confirm');
	var hashed = sjcl.hash.sha256.hash(upa.value);
	var hex = sjcl.codec.hex.fromBits(hashed);
	if (upa.value == upc.value) {
		var uinfo = {};
		uinfo['user'] = {};
		uinfo['user']['firstname'] = document.getElementById('register-first').value;
		uinfo['user']['lastname'] = document.getElementById('register-last').value;
		uinfo['user']['email'] = uid.value;
		uinfo['user']['roles'] = [];
		uinfo['user']['roles'].push("normal");
		uinfo['user']['phone'] = parseInt(document.getElementById('register-phone').value);
		uinfo['user']['passwordHash'] = hex.toString();
		uinfo['user']['locations'] = [];
		var loc = {};
		loc['description'] = "Home";
		loc['address1'] = document.getElementById('register-address').value;
		loc['address2'] = "";
		loc['city'] = document.getElementById('register-city').value;
		loc['postal'] = document.getElementById('register-postal').value;
		loc['country'] = document.getElementById('register-country').value;
		loc['latitude'] = "";
		loc['longitude'] = "";
		uinfo['user']['locations'].push(loc);
		uinfo['user']['userNotes'] = "";
		uinfo['user']['company'] = "";
		uinfo['user']['emailEnabled'] = false;

		var data = JSON.stringify(uinfo);

		$.ajax({
			type: "POST",
			url: "http://127.0.0.1:3000/users",
			data: data,
			dataType: "json",
			success: function(json) {
				alert("Success!");
				login(uid, upa, hex);
			},
			statusCode: {
				400: function(json) {
					//parsed = JSON.parse(json);
					alert("Error 400");
				}
			},
			error: function() {
				alert("Ajax request failed");
			}
		});
	}
	else
		$('#passwordMismatchModal').modal('show');	//Apparently this doesn't exist
}


/*
	logout() - log the user out, reset cookies, and refresh the page
*/
function logout() {
	var cookie = getCookie("Appleseed_user_details");
	var parsed = JSON.parse(cookie);

	$.ajax({
		type: "POST",
		url: "http://127.0.0.1:3000/users/current/logout",
		beforeSend: function (request) {
			request.setRequestHeader("Authorization", "AppleSeed token="+parsed['token']);
		},
		success: function(json) {
			document.cookie = "User_id_appleseed=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
			document.cookie = "Staff_id_appleseed=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
			document.cookie = 'account_details_appleseed=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
			document.cookie = "Appleseed_events=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
			document.cookie = "Appleseed_user_details=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
			window.location.href = "/index.php";
		},
		error: function() {
			alert("Ajax request failed");
		}
	});
}

/*
	showLoginModal() - show the modal with the login fields and login
	button.
*/
function showLoginModal(){
	$('#loginModal').modal('show');
}

/*
	showLoginModal() - show the modal with the registration fields
	and register button.
*/
function showRegisterModal(){
	$('#registerModal').modal('show');
}

/*
	setupNavbar() - add login/register buttons if the user is not
	logged in. If the user is staff, show the staff menu. If the
	user is a normal user, show the normal menu.
*/
function setupNavbar(){
/*Set up header*/
	var user_id = getCookie("User_id_appleseed");
	var staff_id = getCookie("Staff_id_appleseed");
	var nav_right = document.getElementById("nav-right");
	var nav_left = document.getElementById("nav-left");

	if (user_id=="" && staff_id=="") {
		nav_right.innerHTML = '<li><form class="navbar-form" role="login"> \
			<button type="button" class="btn btn-primary" onclick="showLoginModal()">Log In</button> \
			<button type="button" class="btn btn-default" onclick="showRegisterModal()">Create Account</button> \
			</form></li>';
	}
	else if (staff_id=="staff") {
		nav_left.innerHTML = nav_left.innerHTML + "<li class='dropdown'><a href='#' class='dropdown-toggle' data-toggle='dropdown'>Menu <span class='caret'></span></a><ul class='dropdown-menu' role='menu'><li><a href='/volunteer.php'>Volunteer</a></li><li><a href='/eventMgmt.php'>Event Management</a></li><li><a href='/myaccount.php'>My Account</a></li><li><a href='/viewFeedback.php'>View Feedback</a></li></ul></li>";
		nav_right.innerHTML = '<li><p class="navbar-text">Staff logged in as '+user_id+'</p></li><li><form class="navbar-form"><button type="button" class="btn btn-default" onclick="logout()">Log Out</button></form></li>';
	}
	else {
		nav_left.innerHTML = nav_left.innerHTML + "<li class='dropdown'><a href='#' class='dropdown-toggle' data-toggle='dropdown'>Menu <span class='caret'></span></a><ul class='dropdown-menu' role='menu'><li><a href='/volunteer.php'>Volunteer</a></li><li><a href='/eventMgmt.php'>Event Management</a></li><li><a href='/myaccount.php'>My Account</a></li></ul></li>";
		nav_right.innerHTML = '<li><p class="navbar-text">Logged in as '+user_id+'</p></li><li><form class="navbar-form"><button type = "button" class="btn btn-default" onclick="logout()">Log Out</button></form></li>';
	}
}

/*
	addEvent() - push a new gleaning event onto the event list with
	the data given in the parameters.
		name - the event creator's name
		address - the location of the event
		date - the date of the event
		time - the time of the event
		duration - the duration of the event
		numVol - the number of volunteers needed
		trees - a list of trees that need to be gleaned
*/
function addEvent(name,address,date,end,trees) {

	var newEvent = {};
	newEvent['owner'] = name;
	newEvent['description'] = address;
	newEvent['datetime'] = date;
	newEvent['endtime'] = end;
	newEvent['attendees']=[];
	newEvent['trees'] = trees;
	newEvent['status']="pending";

	$.ajax({
		url: "http://127.0.0.1:3000/events/",
		type: "POST",
		data: newEvent,
		dataType: "json",
		success: function(json) {
            //success
        },
        statusCode: {
                401: function(json) {
                    parsed = JSON.parse(json);
                    alert(parsed["message"]);
                }
        },
        error: function() {
            alert("Ajax request failed.");
        }
	});

}

/*
	sendFeedback() - gather the feedback from the fields and
	push the feedback given in the parameters to the
	feedback list.
		name - name of feedback submitter
		email - email of feedback submitter
		contact - whether the user wants to be contacted back
		feedback - the actual feedback
*/
function sendFeedback() {
	var user = getCurrentUser();
	var idOwner = user['id'];
	var name = document.getElementById("feedback-name").value;
	var email = document.getElementById("feedback-email").value;
	var contact = document.getElementById("feedback-contact_me").value;
	var feedback = document.getElementById("feedback-text").value;

	var bodyFeedback = {};
	bodyFeedback['feedback'] = {};
	bodyFeedback['feedback']['id'] = 0; //?;
	bodyFeedback['feedback']['subject'] = "";
	bodyFeedback['feedback']['message'] = feedback;
	bodyFeedback['feedback']['shouldBeContacted'] = contact;
	bodyFeedback['feedback']['owner']['id'] = idOwner;
	bodyFeedback['feedback']['event']['id'] = 0; //event id - 0 for now

	feedbackData = JSON.stringify(bodyFeedback);

	$.ajax({
		url: "http://127.0.0.1:3000/feedback/",
		type: "POST",
		data: feedbackData,
		dataType: "json",
		success: function(json) {
            //success
        },
        statusCode: {
                401: function(json) {
                    parsed = JSON.parse(json);
                    alert(parsed["message"]);
                }
        },
        error: function() {
            alert("Ajax request failed.");
        }
	});
}

/*
	setAccountCookie() - Set the cookie to a JSON string containing
	the user ID (currently email), the email address, and the street
	addresses.
		sid - the field containing the user's email address
*/
function setAccountCookie(sid) {
	account_details = {};
	account_details['userID'] = sid.value;
	account_details['userEmail'] = "testEmail@google.ca";
	account_details['userAddress'] = [];
	account_details['userAddress'][0] = {};
	account_details['userAddress'][0]['name'] = "Home";
	account_details['userAddress'][0]['location'] = "123 Fake St.";
	account_details['userAddress'][1] = {};

	account_details['userAddress'][1]['name'] = "Work";
	account_details['userAddress'][1]['location'] = "123 Billy St.";
	account_details['userAddress'][2] = {};

	account_details['userAddress'][2]['name'] = "Cell";
	account_details['userAddress'][2]['location'] = "123 Ryan St.";

	account_details['userPhone'] = "519-123-1234";
	document.cookie = "account_details_appleseed="+JSON.stringify(account_details);
}

//Set up tooltips, popovers, and set up the navbar on load
$(function () {
	$("[data-toggle='tooltip']").tooltip();
});;
/* To initialize BS3 popovers set this below */
$(function () {
	$("[data-toggle='popover']").popover();
});

$(document).load(setupNavbar());
