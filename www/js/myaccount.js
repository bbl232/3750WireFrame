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

/*This function will initially setup the Account Details page
and put the current users information on screen available for edit*/
function setupAccDetails(){
  var userName=document.getElementById("userName");
  var email=document.getElementById("email");
  //var address=document.getElementById("address");
  var phone=document.getElementById("phone");
  var userInfo;
  var message;

  //first we get current user information, this function can be replaced to function call in wireframe
  $.ajax({
    type:"GET",
    url: "http://127.0.0.1:3000/users/current",
    dataType: "json",
    success: function(json) {
      userInfo = JSON.parse(json);
      //return user["id"];
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


  //parse json data
  var userID=userInfo['user']['id'];
  var userFirst=userInfo['user']['firstname'];
  var userLast=userInfo['user']['lastname'];
  var userEmail=userInfo['user']['email'];
  var userPhone=userInfo['user']['phone'];
  var userLocations=[];
  userLocations=userInfo['user']['locations'];

  //get element for user regular info from myaccount.php
  var bodyReg=document.getElementById('regularInfo');

  //Populate user info page without locations
  bodyReg.innerHTML="<table> \
  <tr><td><span class='glyphicon glyphicon-envelope' style='padding:10px'></span></td><td>"+userEmail+"</td></tr> \
  <tr><td><span class='glyphicon glyphicon-user' style='padding:10px'></span></td><td>"+userFirst+" "+userLast+"</td></tr> \
  <tr><td><span class='glyphicon glyphicon-phone-alt' style='padding:10px'></span></td><td>"+userPhone+"</td></tr><tr> \
  <button type='button' class='btn btn-danger' data-dismiss='modal' style='float:right' onclick='deleteAccount()'>Delete Account</button> \
  <button type='button' class='btn btn-primary' data-dismiss='modal' style='float:right' onclick='editRegular()'>Edit</button></tr></table>";

  var locID;
  //display list of locations below user info
  var addressHtml="";
  addressHtml+="<h4>Addresses:</h4><hr>"
  for (var i=0;i<userLocations.length;i++){
    addressHtml+="<span class='glyphicon glyphicon-map-marker' style='padding:10px'></span><b>";
    addressHtml+=userLocations[i]['description'];//ex 'home'
    addressHtml+="</b><br>";
    addressHtml+=userLocations[i]['address1'];

    addressHtml+="</b><br>";
    addressHtml+=userLocations[i]['city'];

    addressHtml+="</b><br>";
    addressHtml+=userLocations[i]['postal'];

    addressHtml+="</b><br>";
    addressHtml+=userLocations[i]['country'];

    //pass in i for onclick so we know which to edit
    locID=userLocations[i]['id'];
    //pass in location id so we know which to edit on editAddress
    addressHtml+="<button type='button' class='btn btn-primary' style='float:right' onclick='editAddress("+locID+")'>Edit</button><br><br> \
    <button type='button' class='btn btn-danger' style='float:right' onclick='deleteAdr("+i+")'>Delete</button><br>";
    addressHtml+="<hr>";
  }
  addressHtml+="<button type='button' class='btn btn-primary' style='float:right' onclick='addAddressModal()'>Add</button><br>";
  var modalBodyAddress=document.getElementById('addressInfo');
  modalBodyAddress.innerHTML=addressHtml;

}

function editRegular(){
  //var userDetails=getCookie("account_details_appleseed");
  //var jsonCookie=JSON.parse(userDetails);
  //first we get current user information, this function can be replaced to function call in wireframe
  $.ajax({
    type:"GET",
    url: "http://127.0.0.1:3000/users/current",
    dataType: "json",
    success: function(json) {
      userInfo = JSON.parse(json);
      //return user["id"];
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



  var userID=userInfo['user']['id'];
  var userFirst=userInfo['user']['firstname'];
  var userLast=userInfo['user']['lastname'];
  var userEmail=userInfo['user']['email'];
  var userPhone=userInfo['user']['phone'];

  var bodyReg=document.getElementById('message-modal_body');

  bodyReg.innerHTML=" \
  <form id='editRegular-form'> \
    <div class='input-group'> \
      <span class='glyphicon glyphicon-envelope' style='padding:10px'></span><input type='text' class='form-control' name='userEmail' id='userEmail' value='"+userEmail+"'> \
    </div><br> \
    <div class='input-group'> \
      <span class='glyphicon glyphicon-user' style='padding:10px'></span><input type='text' class='form-control' name='userFirst' id='userFirst' value='"+userFirst+"'> \
    </div><br> \
    <div class='input-group'> \
      <span class='glyphicon glyphicon-user' style='padding:10px'></span><input type='text' class='form-control' name='userLast' id='userLast' value='"+userLast+"'> \
    </div><br> \
    <div class='input-group'> \
      <span class='glyphicon glyphicon-phone-alt' style='padding:10px'></span><input type='text' class='form-control' name='userPhone' id='userPhone' value='"+userPhone+"'> \
    </div><br> \
    <div class='input-group'> \
    <button type='button' class='btn btn-primary' data-dismiss='modal' style='float:right' onclick='saveRegInfo("+userID+")'>Save</button><br> \
    </div> \
  </form>";


  $('#editDetailsModal').modal('show');

}

function editAddress(id){
  //var userDetails=getCookie("account_details_appleseed");
  //var jsonCookie=JSON.parse(userDetails);
  //var addresses=[];
  //addresses=jsonCookie['userAddress'];
  ///var addName=addresses[index]['name'];
  //var addLoc=addresses[index]['location'];

  var userInfo;


  //first we get current user information, so we can get user id
  $.ajax({
    type:"GET",
    url: "http://127.0.0.1:3000/users/current",
    dataType: "json",
    success: function(json) {
      userInfo = JSON.parse(json);
      //return user["id"];
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

  var userID=userInfo['users']['id'];
  var locations;
  var locURL="http://127.0.0.1:3000/user/"+userID+"/locations";
  //now we make call to /user/{uid}/locations and get back a list of locations
  $.ajax({
    type:"GET",
    url:locURL,
    dataType: "json",
    success: function(json) {
      locations = JSON.parse(json);
      //return user["id"];
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



  var locDesc;
  var locAddr1;
  var locAddr2;
  var locCity;
  var locPostal;
  var locCountry;


  var userLocations=[];
  userLocations=locations['locations'];

  for(var i=0;i<userLocations.length;i++){
    if (userLocations[i]==id){
      //we found the location to edit since it matched id that was passed in
      locDesc=userLocations['description'];
      locAddr1=userLocations['address1'];
      locAddr2=userLocations['address2'];
      locCity=userLocations['city'];
      locPostal=userLocations['postal'];
      locCountry=userLocations['country'];
    }
  }


  var bodyReg=document.getElementById('message-modal_body');
  bodyReg.innerHTML=" \
  <form id='editaddress-form'> \
    <div class='input-group'> \
      <span class='input-group-addon'>Description</span><input type='text' class='form-control' name='locDesc' id='locDesc' value='"+locDesc+"'> \
    </div><br> \
    <div class='input-group'> \
      <span class='input-group-addon'><span class='glyphicon glyphicon-map-marker'></span> Address 1</span><input type='text' class='form-control' name='userAdr' id='userAdr' value='"+locAddr1+"' readonly> \
    </div><br> \
    <div class='input-group'> \
      <span class='input-group-addon'><span class='glyphicon glyphicon-map-marker'></span> Address 2</span><input type='text' class='form-control' name='userAdr' id='userAdr' value='"+locAddr2+"' readonly> \
    </div><br> \
    <div class='input-group'> \
      <span class='input-group-addon'><span class='glyphicon glyphicon-map-marker'></span> City</span><input type='text' class='form-control' name='userAdr' id='userAdr' value='"+locCity+"' readonly> \
    </div><br> \
    <div class='input-group'> \
      <span class='input-group-addon'><span class='glyphicon glyphicon-map-marker'></span> Postal Code</span><input type='text' class='form-control' name='userAdr' id='userAdr' value='"+locPostal+"' readonly> \
    </div><br> \
    <div class='input-group'> \
      <span class='input-group-addon'><span class='glyphicon glyphicon-map-marker'></span> Country</span><input type='text' class='form-control' name='userAdr' id='userAdr' value='"+locCountry+"' readonly> \
    </div><br> \
    <button type='button' class='btn btn-primary' data-dismiss='modal' style='float:right' onclick='saveAdrInfo("+id","+userID+")'>Save</button><br> \
  </form>";


  /*<table> \
  <tr><td><label>Name:</label></td><td><form><input type='text' class='form-control' name='adrName' id='adrName' value='"+addName+"'></form></td></tr> \
  <tr><td><label>Address:</label></td><td><form><input type='text' class='form-control' name='userAdr' id='userAdr' value='"+addLoc+"'></form></td></tr> \
  <tr><button type='button' class='btn btn-default' data-dismiss='modal' style='float:right' onclick='saveAdrInfo("+index+")'>Save</button></tr></table>";*/
  $('#editDetailsModal').modal('show');

}

function addAddressModal(){

  var bodyReg=document.getElementById('message-modal_body');
  bodyReg.innerHTML="\
  <form id='editaddress-form'> \
    <div class='input-group'> \
      <span class='input-group-addon'>Address Type</span><input type='text' class='form-control' name='adrType' id='adrType' value='Ex. Cell, Home...'> \
    </div><br> \
    <div class='input-group'> \
      <span class='input-group-addon'><span class='glyphicon glyphicon-map-marker'></span> Address</span><input type='text' class='form-control' name='userLoc' id='userLoc' value=''> \
    </div><br> \
    <button type='button' class='btn btn-primary' data-dismiss='modal' style='float:right' onclick='addAddress()'>Add Address</button><br> \
  </form>";
  /*<table> \
  <h5>New Address</h5> \
  <tr><td>Address Type:</td><td><form><input type='text' class='form-control' name='adrType' id='adrType' value='Ex. Cell, Home...'></form></td></tr> \
  <tr><td>Address:</td><td><form><input type='text' class='form-control' name='userLoc' id='userLoc' value=''></form></td></tr> \
  <tr><button type='button' class='btn btn-default' data-dismiss='modal' style='float:right' onclick='addAddress()'>Add Address</button></tr></table>";*/
  $('#editDetailsModal').modal('show');

}

function addAddress(){
  var userDetails=getCookie("account_details_appleseed");
  var jsonCookie=JSON.parse(userDetails);
  var addresses=[];
  var adrType=$('#adrType').val();
  var userLoc=$('#userLoc').val();
  if(adrType !=""&&userLoc!=""){
    addresses=jsonCookie['userAddress'];
    var adrLength=addresses.length;
    jsonCookie['userAddress'][adrLength]={};
    jsonCookie['userAddress'][adrLength]['name']=adrType;
    jsonCookie['userAddress'][adrLength]['location']=userLoc;
    document.cookie="account_details_appleseed="+JSON.stringify(jsonCookie);
    window.location = window.location;
  }
  else{
    //$('#editDetailsModal').modal('hide');
    var bodyReg=document.getElementById('message-modal_body');
    bodyReg.innerHTML="Error! Please enter something in each box. \
    <button type='button' class='btn btn-primary' data-dismiss='modal' style='float:right' onclick='addAddressModal()'>Ok</button>";
    $('#editDetailsModal').modal('show');

  }

}

function returnHome(){
  document.location="index.php";
}

//Here is where we save the changes the user made in the edit personal info modal
function saveRegInfo(userID){
  var userEmail=$('#userEmail').val();
  var userPhone=$('#userPhone').val();
  var userFirst=$('#userFirst').val();
  var userLast=$('#userLast').val();

  if(userEmail!="" && userPhone!=""&&userFirst !=""&&userLast!=""){

  //build json object to edit user details
  var jsonObj={};
  jsonObj['user']={};
  jsonObj['user']['phone']=userPhone;
  jsonObj['user']['firstname']=userFirst;
  jsonObj['user']['lastname']=userLast;

  var data=JSON.stringify(jsonObj);

  $.ajax({
    type:"PUT",
    url: "http://127.0.0.1:3000/user/"+userID,
    headers:{"Authorization":"Appleseed token="+},//cookie goes here
    data: data,
    dataType: "json",
    success: function(json) {
      userInfo = JSON.parse(json);
      //return user["id"];
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
    window.location = window.location;
  }
  else{
    var bodyReg=document.getElementById('message-modal_body');
    bodyReg.innerHTML="Error! Please enter something in each box. \
    <button type='button' class='btn btn-primary' data-dismiss='modal' style='float:right' onclick='editRegular()'>Ok</button>";
    $('#editDetailsModal').modal('show');
  }

}

/*
  We pass in id which is the location id of the address we edit
*/
function saveAdrInfo(id,userID){
  var locDesc=$('#locDesc').val();
  //var userAdr=$('#userAdr').val();
  if(locDesc !=""){
    //Now we put /user/{uid}/locations/{id} and pass in jsonObject that contains new description
    //build json object to edit user details
    var jsonObj={};
    jsonObj['location']={};
    jsonObj['location']['description']=locDesc;

    var data=JSON.stringify(jsonObj);

    var locURL="http://127.0.0.1:3000//user/"+userID+"/locations/"+id;
    $.ajax({
      type:"PUT",
      url: locURL,
      headers:{"Authorization":"Appleseed token="+},//cookie goes here
      data: data,
      dataType: "json",
      success: function(json) {
        userInfo = JSON.parse(json);
        //return user["id"];
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

    //var userDetails=getCookie("account_details_appleseed");
    //var jsonCookie=JSON.parse(userDetails);

    //jsonCookie['userAddress'][index]['name']=adrName;
    //jsonCookie['userAddress'][index]['location']=userAdr;

    //document.cookie="account_details_appleseed="+JSON.stringify(jsonCookie);
    window.location = window.location;
  }
  else{
    var bodyReg=document.getElementById('message-modal_body');
    bodyReg.innerHTML="Error! Please enter something in each box. \
    <button type='button' class='btn btn-primary' data-dismiss='modal' style='float:right' onclick='editAddress("+index+")'>Ok</button>";
    $('#editDetailsModal').modal('show');
  }


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

  document.cookie = 'account_details_appleseed=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  document.cookie = "Staff_id_appleseed=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
;
  window.location = '/index.php';
}

setupAccDetails();
