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

function setupAccDetails(){
  var userName=document.getElementById("userName");
  var email=document.getElementById("email");
  var address=document.getElementById("address");
  var phone=document.getElementById("phone");

  //make values equal to set cookies here
  userName.innerHTML=getCookie("User_id_appleseed");
  email.innerHTML=getCookie("Email_appleseed");
  address.innerHTML=getCookie("Address_appleseed");
  phone.innerHTML=getCookie("Phone_appleseed");

}

function editDetails(){
  var userDetails=getCookie("account_details_appleseed");

  var jsonCookie=JSON.parse(userDetails);

  var modalBody=document.getElementById('regularInfo');
  modalBody.innerHTML="<table> \
  <tr><td>Username:</td><td>"+jsonCookie['userID']+"</td></tr> \
  <tr><td>Email:</td><td>"+jsonCookie['userEmail']+"</td></tr> \
  <tr><td>Phone Number:</td>"+jsonCookie['userPhone']+"<td></td></tr></table>";
  $('#editDetailsModal').modal('show');

}
function editEmail(){
  var email=getCookie("Email_appleseed");
  var modalBody=document.getElementById('message-modal_body');
  modalBody.innerHTML="<table> \
  <tr><td>Current Email:</td><td>"+email+"</td></tr> \
  <tr><td>New Email:</td><td><input type='text' id='verify1'></td></tr> \
  <tr><td>Confirm Email:</td><td><input type='text' id='verify2'></td></tr>";
  $('#editDetailsModal').modal('show');
}
function editAddress(){
  var address=getCookie("Address_appleseed");
  var modalBody=document.getElementById('message-modal_body');
  modalBody.innerHTML="<table> \
  <tr><td>Current Address:</td><td>"+address+"</td></tr> \
  <tr><td>New Address:</td><td><input type='text' id='verify1'></td></tr> \
  <tr><td>Confirm Address:</td><td><input type='text' id='verify2'></td></tr>";
  $('#editDetailsModal').modal('show');
}
function editPhone(){
  var phone=getCookie("Phone_appleseed");
  var modalBody=document.getElementById('message-modal_body');
  modalBody.innerHTML="<table> \
  <tr><td>Current Phone Number:</td><td>"+phone+"</td></tr> \
  <tr><td>New Phone Number:</td><td><input type='text' id='verify1'></td></tr> \
  <tr><td>Confirm Phone Number:</td><td><input type='text' id='verify2'></td></tr>";
  $('#editDetailsModal').modal('show');
}

function returnHome(){
  document.location="index.php";
}

function checkInput(){
  //alert("in");
  if($("#verify1").val()==$("#verify2").val()){
    //success, they equal
    document.cookie="User_id_appleseed=checked";
    document.location=document.location;

  }
  else{

  }


}



setupAccDetails();
