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
  <tr><td><span class='glyphicon glyphicon-user' style='padding:10px'></span></td><td>"+jsonCookie['userID']+"</td></tr> \
  <tr><td><span class='glyphicon glyphicon-envelope' style='padding:10px'></span></td><td>"+jsonCookie['userEmail']+"</td></tr> \
  <tr><td><span class='glyphicon glyphicon-phone-alt' style='padding:10px'></span></td><td>"+jsonCookie['userPhone']+"</td></tr><tr> \
  <button type='button' class='btn btn-default' data-dismiss='modal' style='float:right' onclick='deleteAccount()'>Delete Account</button> \
  <button type='button' class='btn btn-default' data-dismiss='modal' style='float:right' onclick='editRegular()'>Edit</button></tr></table>";

  var addresses=[];
  addresses=jsonCookie['userAddress'];
  //console.log(addresses);
  var addressHtml="";
  addressHtml+="<h4>Addresses:</h4><hr>"
  for (var i=0;i<addresses.length;i++){
    addressHtml+="<span class='glyphicon glyphicon-map-marker' style='padding:10px'></span>";
    addressHtml+=addresses[i]['name'];
    addressHtml+="<br>";
    addressHtml+=addresses[i]['location'];
    //pass in i for onclick so we know which to edit
    addressHtml+="<button type='button' class='btn btn-default' style='float:right' onclick='editAddress("+i+")'>Edit</button> \
    <button type='button' class='btn btn-default' style='float:right' onclick='deleteAdr("+i+")'>Delete</button>";
    addressHtml+="<hr>";
  }
  addressHtml+="<button type='button' class='btn btn-default' style='float:right' onclick='addAddressModal()'>Add</button>";
  var modalBodyAddress=document.getElementById('addressInfo');
  modalBodyAddress.innerHTML=addressHtml;

}

function editRegular(){
  var userDetails=getCookie("account_details_appleseed");
  var jsonCookie=JSON.parse(userDetails);

  var bodyReg=document.getElementById('message-modal_body');
  bodyReg.innerHTML="<table> \
  <tr><td><span class='glyphicon glyphicon-user' style='padding:10px'></span></td><td><form><input type='text' class='form-control' name='userName' id='userName' value='"+jsonCookie['userID']+"'></form></td></tr> \
  <tr><td><span class='glyphicon glyphicon-envelope' style='padding:10px'></span></td><td><form><input type='text' class='form-control' name='userEmail' id='userEmail' value='"+jsonCookie['userEmail']+"'></form></td></tr> \
  <tr><td><span class='glyphicon glyphicon-phone-alt' style='padding:10px'></span></td><td><form><input type='text' class='form-control' name='userPhone' id='userPhone' value='"+jsonCookie['userPhone']+"'></form></td></tr> \
  <tr><button type='button' class='btn btn-default' data-dismiss='modal' style='float:right' onclick='saveRegInfo()'>Save</button></tr></table>";

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
  <tr><td>Name:</td><td><form><input type='text' class='form-control' name='adrName' id='adrName' value='"+addName+"'></form></td></tr> \
  <tr><td>Address:</td><td><form><input type='text' class='form-control' name='userAdr' id='userAdr' value='"+addLoc+"'></form></td></tr> \
  <tr><button type='button' class='btn btn-default' data-dismiss='modal' style='float:right' onclick='saveAdrInfo("+index+")'>Save</button></tr></table>";
  $('#editDetailsModal').modal('show');

}

function addAddressModal(){

  var bodyReg=document.getElementById('message-modal_body');
  bodyReg.innerHTML="<table> \
  <h5>New Address</h5> \
  <tr><td>Address Type:</td><td><form><input type='text' class='form-control' name='adrType' id='adrType' value='Ex. Cell, Home...'></form></td></tr> \
  <tr><td>Address:</td><td><form><input type='text' class='form-control' name='userLoc' id='userLoc' value=''></form></td></tr> \
  <tr><button type='button' class='btn btn-default' data-dismiss='modal' style='float:right' onclick='addAddress()'>Add Address</button></tr></table>";
  $('#editDetailsModal').modal('show');

}

function addAddress(){
  var userDetails=getCookie("account_details_appleseed");
  var jsonCookie=JSON.parse(userDetails);
  var addresses=[];
  addresses=jsonCookie['userAddress'];
  var adrLength=addresses.length;
  jsonCookie['userAddress'][adrLength]={};
  jsonCookie['userAddress'][adrLength]['name']=$('#adrType').val();
  jsonCookie['userAddress'][adrLength]['location']=$('#userLoc').val();
  document.cookie="account_details_appleseed="+JSON.stringify(jsonCookie);
  window.location = window.location;


}

function returnHome(){
  document.location="index.php";
}

function saveRegInfo(){
  var userName=$('#userName').val();
  var userEmail=$('#userEmail').val();
  var userPhone=$('#userPhone').val();

  var userDetails=getCookie("account_details_appleseed");
  var jsonCookie=JSON.parse(userDetails);

  jsonCookie['userID']=userName;
  jsonCookie['userEmail']=userEmail;
  jsonCookie['userPhone']=userPhone;
  document.cookie = "User_id_appleseed="+userName;

  document.cookie="account_details_appleseed="+JSON.stringify(jsonCookie);
  //we need to build the cookie here
  //alert(userName);

  window.location = window.location;

}

function saveAdrInfo(index){
  var adrName=$('#adrName').val();
  var userAdr=$('#userAdr').val();
  var userDetails=getCookie("account_details_appleseed");
  var jsonCookie=JSON.parse(userDetails);

  jsonCookie['userAddress'][index]['name']=adrName;
  jsonCookie['userAddress'][index]['location']=userAdr;

  document.cookie="account_details_appleseed="+JSON.stringify(jsonCookie);
  window.location = window.location;


}

function deleteAdr(index){
  var userDetails=getCookie("account_details_appleseed");
  var jsonCookie=JSON.parse(userDetails);
  jsonCookie['userAddress'].splice(index,1);
  document.cookie="account_details_appleseed="+JSON.stringify(jsonCookie);
  window.location = window.location;

}

function deleteAccount(){

  document.cookie = 'User_id_appleseed=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';

  document.cookie = 'account_details_appleseed=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
  window.location = '/index.php';
}

setupAccDetails();
