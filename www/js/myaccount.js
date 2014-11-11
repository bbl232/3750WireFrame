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
  //var address=document.getElementById("address");
  var phone=document.getElementById("phone");


  var userDetails=getCookie("account_details_appleseed");

  var jsonCookie=JSON.parse(userDetails);
  var bodyReg=document.getElementById('regularInfo');
  bodyReg.innerHTML="<table> \
  <tr><td>Username:</td><td>"+jsonCookie['userID']+"</td></tr> \
  <tr><td>Email:</td><td>"+jsonCookie['userEmail']+"</td></tr> \
  <tr><td>Phone Number:</td><td>"+jsonCookie['userPhone']+"</td></tr><tr> \
  <button type='button' class='btn btn-default' data-dismiss='modal' style='float:right' onclick='editRegular()'>Edit</button> \
  <button type='button' class='btn btn-default' data-dismiss='modal' style='float:right'>Delete Account</button></tr></table><br>";

  var addresses=[];
  addresses=jsonCookie['userAddress'];
  //console.log(addresses);
  var addressHtml="";
  for (var i=0;i<addresses.length;i++){
    addressHtml+=addresses[i]['name'];
    addressHtml+="<br>";
    addressHtml+=addresses[i]['location'];
    //pass in i for onclick so we know which to edit
    addressHtml+="<button type='button' class='btn btn-default' style='float:right' onclick='editAddress("+i+")'>Edit</button>";
    addressHtml+="<hr>";
  }
  var modalBodyAddress=document.getElementById('addressInfo');
  modalBodyAddress.innerHTML=addressHtml;

}

function editRegular(){
  var userDetails=getCookie("account_details_appleseed");
  var jsonCookie=JSON.parse(userDetails);

  var bodyReg=document.getElementById('message-modal_body');
  bodyReg.innerHTML="<table> \
  <tr><td>Username:</td><td><form><input type='text' name='userName' value='"+jsonCookie['userID']+"'></form></td></tr> \
  <tr><td>Email:</td><td><form><input type='text' name='userEmail' value='"+jsonCookie['userEmail']+"'></form></td></tr> \
  <tr><td>Phone Number:</td><td><form><input type='text' name='userPhone' value='"+jsonCookie['userPhone']+"'></form></td></tr> \
  <tr><button type='button' class='btn btn-default' data-dismiss='modal' style='float:right'>Save</button></tr></table>";

  $('#editDetailsModal').modal('show');

}
function editAddress(index){
  var userDetails=getCookie("account_details_appleseed");
  var jsonCookie=JSON.parse(userDetails);
  var addresses=[];
  addresses=jsonCookie['userAddress'];
  var addName=addresses[index]['name'];
  var addLoc=addresses[index]['location'];

  var bodyReg=document.getElementById('message-modal_body');
  bodyReg.innerHTML="<table> \
  <tr><td>Name:</td><td><form><input type='text' name='userName' value='"+addName+"'></form></td></tr> \
  <tr><td>Address:</td><td><form><input type='text' name='userEmail' value='"+addLoc+"'></form></td></tr> \
  <tr><button type='button' class='btn btn-default' data-dismiss='modal' style='float:right'>Save</button></tr></table>";
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
