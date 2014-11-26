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


  //get token cookie
  tokenCookie=getCookie("Appleseed_user_details");
  var cookie=JSON.parse(tokenCookie);
  var token=cookie["token"];
  mainToken="AppleSeed token="+token;

var userID;
var userFirst;
var userLast;
var userEmail;
var userPhone;
var userLocations=[];

  //var user;
  var message;
    var cookie = getCookie("Appleseed_user_details");
    var parsed = JSON.parse(cookie);

  $.ajax({
  //async:false,
    url: "http://127.0.0.1:3000/users/current",
    dataType: "json",
    beforeSend: function (request) {
      request.setRequestHeader("Authorization", "AppleSeed token="+parsed['token']);
    },
    success: function(userInfo) {

       userID=userInfo['user']['id'];
       userFirst=userInfo['user']['firstname'];

       userLast=userInfo['user']['lastname'];
       userEmail=userInfo['user']['email'];
       userPhone=userInfo['user']['phone'];

      userLocations=userInfo['user']['locations'];

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
        <button type='button' class='btn btn-danger' style='float:right' onclick='deleteAdr("+locID+","+userID+")'>Delete</button><br>";
        addressHtml+="<hr>";
      }
      addressHtml+="<button type='button' class='btn btn-primary' style='float:right' onclick='addAddressModal("+userID+")'>Add</button><br>";
      var modalBodyAddress=document.getElementById('addressInfo');
      modalBodyAddress.innerHTML=addressHtml;
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
    //alert(JSON.stringify(user));


}

function editRegular(){
  //first we get current user information, this function can be replaced to function call in wireframe
  var message;
      var cookie = getCookie("Appleseed_user_details");
      var parsed = JSON.parse(cookie);

    $.ajax({
    //async:false,
      url: "http://127.0.0.1:3000/users/current",
      dataType: "json",
      beforeSend: function (request) {
        request.setRequestHeader("Authorization", "AppleSeed token="+parsed['token']);
      },
      success: function(userInfo) {
      //userInfo = JSON.parse(json);
      //return user["id"];
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

function editAddress(id){
    var userInfo;
    var message;
    var cookie = getCookie("Appleseed_user_details");
    var parsed = JSON.parse(cookie);

    $.ajax({
    //async:false,
      url: "http://127.0.0.1:3000/users/current",
      dataType: "json",
      beforeSend: function (request) {
        request.setRequestHeader("Authorization", "AppleSeed token="+parsed['token']);
      },
      success: function(userInfo) {
        alert(JSON.stringify(userInfo));
      //userInfo = JSON.parse(json);
      //return user["id"];
      var userID=userInfo['user']['id'];
      var locations;
      var locURL="http://127.0.0.1:3000/user/"+userID+"/locations";
      //now we make call to /user/{uid}/locations and get back a list of locations
      $.ajax({
        type:"GET",
        url:locURL,
        dataType: "json",
        success: function(json) {
          //alert(id);
          //locations = JSON.parse(json);
          //return user["id"];
          var locations=json;



                var locDesc;
                var locAddr1;
                var locAddr2;
                var locCity;
                var locPostal;
                var locCountry;


                var userLocations=[];
                userLocations=locations['locations'];

                for(var i=0;i<userLocations.length;i++){
                  //alert(userLocations[i]);
                  if (userLocations[i]['id']==id){
                    //we found the location to edit since it matched id that was passed in
                    locDesc=userLocations[i]['description'];
                    locAddr1=userLocations[i]['address1'];
                    locAddr2=userLocations[i]['address2'];
                    locCity=userLocations[i]['city'];
                    locPostal=userLocations[i]['postal'];
                    locCountry=userLocations[i]['country'];
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
                  <button type='button' class='btn btn-primary' data-dismiss='modal' style='float:right' onclick='saveAdrInfo("+id+","+userID+")'>Save</button><br> \
                </form>";


                /*<table> \
                <tr><td><label>Name:</label></td><td><form><input type='text' class='form-control' name='adrName' id='adrName' value='"+addName+"'></form></td></tr> \
                <tr><td><label>Address:</label></td><td><form><input type='text' class='form-control' name='userAdr' id='userAdr' value='"+addLoc+"'></form></td></tr> \
                <tr><button type='button' class='btn btn-default' data-dismiss='modal' style='float:right' onclick='saveAdrInfo("+index+")'>Save</button></tr></table>";*/
                $('#editDetailsModal').modal('show');

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

function addAddressModal(userID){

  var bodyReg=document.getElementById('message-modal_body');
  bodyReg.innerHTML="\
  <form id='editaddress-form'> \
    <div class='input-group'> \
      <span class='input-group-addon'>Location Description</span><input type='text' class='form-control' name='locationDesc' id='adrDesc' value='Ex. Cell, Home...'> \
    </div><br> \
    <div class='input-group'> \
      <span class='input-group-addon'><span class='glyphicon glyphicon-map-marker'></span> Address 1</span><input type='text' class='form-control' name='locA1' id='locAdr1' value=''> \
    </div><br> \
    <div class='input-group'> \
      <span class='input-group-addon'><span class='glyphicon glyphicon-map-marker'></span> Address 2</span><input type='text' class='form-control' name='locA2' id='locAdr2' value=''> \
    </div><br> \
    <div class='input-group'> \
      <span class='input-group-addon'>City</span><input type='text' class='form-control' name='adrCity' id='adrCity' value=''> \
    </div><br> \
    <div class='input-group'> \
      <span class='input-group-addon'>Postal Code</span><input type='text' class='form-control' name='adrPostal' id='adrPostal' value=''> \
    </div><br> \
    <div class='input-group'> \
      <span class='input-group-addon'>Country</span><input type='text' class='form-control' name='adrCountry' id='adrCountry' value=''> \
    </div><br> \
    <button type='button' class='btn btn-primary' data-dismiss='modal' style='float:right' onclick='addAddress("+userID+")'>Add Address</button><br> \
  </form>";

  $('#editDetailsModal').modal('show');

}

function addAddress(userID){
  var adrDesc=$('#adrDesc').val();
  var locAdr1=$('#locAdr1').val();
  var locAdr2=$('#locAdr2').val();
  var adrCity=$('#adrCity').val();
  var adrPostal=$('#adrPostal').val();
  var adrCountry=$('#adrCountry').val();

  if(adrDesc !=""&&locAdr1!=""&&adrCity!=""&&adrPostal!=""&&adrCountry!=""){


    var jsonObj={};
    jsonObj['location']={};
    jsonObj['location']['description']=adrDesc;
    jsonObj['location']['address1']=locAdr1;
    jsonObj['location']['address2']=locAdr2;
    jsonObj['location']['city']=adrCity;
    jsonObj['location']['postal']=adrPostal;
    jsonObj['location']['country']=adrCountry;
    jsonObj['location']['longitude']='';
    jsonObj['location']['latitude']='';
    var data=JSON.stringify(jsonObj);

    var locURL="http://127.0.0.1:3000/user/"+userID+"/locations";
    $.ajax({
      type:"POST",
      url: locURL,
      data: data,
      dataType: "json",
      success: function(json) {
window.location = window.location;
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
  var message;
    var cookie = getCookie("Appleseed_user_details");
    var parsed = JSON.parse(cookie);
  $.ajax({
    type:"PUT",
    url: "http://127.0.0.1:3000/user/"+userID,
    beforeSend: function (request) {
      request.setRequestHeader("Authorization", "AppleSeed token="+parsed['token']);
    },
    data: data,
    //dataType: "json",
    success: function(json) {

      window.location = window.location;

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
    var message;
    var cookie = getCookie("Appleseed_user_details");
    var parsed = JSON.parse(cookie);
    var locURL="http://127.0.0.1:3000/user/"+userID+"/locations/"+id;
    $.ajax({
      type:"PUT",
      url: locURL,
      beforeSend: function (request) {
        request.setRequestHeader("Authorization", "AppleSeed token="+parsed['token']);
      },

      data: data,
      //dataType: "json",
      success: function(json) {
window.location = window.location;

        //userInfo = JSON.parse(json);
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


  }
  else{
    var bodyReg=document.getElementById('message-modal_body');
    bodyReg.innerHTML="Error! Please enter something in the description box. \
    <button type='button' class='btn btn-primary' data-dismiss='modal' style='float:right' onclick='editAddress("+id+")'>Ok</button>";
    $('#editDetailsModal').modal('show');
  }


}

function deleteAdr(locID,userID){
  //var userDetails=getCookie("account_details_appleseed");
  //var jsonCookie=JSON.parse(userDetails);
  //jsonCookie['userAddress'].splice(index,1);
  //document.cookie="account_details_appleseed="+JSON.stringify(jsonCookie);
  //window.location = window.location;

  var message;
    var cookie = getCookie("Appleseed_user_details");
    var parsed = JSON.parse(cookie);
  $.ajax({
    type:"DELETE",
    url: "http://127.0.0.1:3000/user/"+userID+"/locations/"+locID,
    beforeSend: function (request) {
      request.setRequestHeader("Authorization", "AppleSeed token="+parsed['token']);
    },
    //dataType: "json",
    success: function(json) {

      window.location = window.location;

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

function deleteAccount(){

  document.cookie = 'User_id_appleseed=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';

  document.cookie = 'account_details_appleseed=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  document.cookie = "Staff_id_appleseed=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
;
  window.location = '/index.php';
}

setupAccDetails();
