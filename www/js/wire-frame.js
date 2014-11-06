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
    document.cookie = "User_id_appleseed="+document.getElementById('login-email').value;
    window.location = window.location;
}

function register(){
    login();
    //document.cookie = "User_id_appleseed="+document.getElementById('login-email').value;
}

function logout(){
    document.cookie = "User_id_appleseed=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    window.location = window.location;
}

function makeImage()
{
    var div = document.getElementById('homepage_image');
    var img = new Image();

    img.onload = function(){
        div.appendChild(img);
    }

    img.src = "http://placekitten.com/g/"+(div.offsetWidth)+"/350";
}

function setupNavbar(){
    var user_id = getCookie("User_id_appleseed");
    var div = document.getElementById("nav-right");
    if(user_id==""){
        div.innerHTML = '<li><form class="navbar-form" role="login"> \
          <div class="form-group"> \
            <input type="text" class="form-control" placeholder="E-mail" id="login-email"> \
            <input type="password" class="form-control" placeholder="Password" id="login-password"> \
          </div> \
          <button type="submit" class="btn btn-primary" onclick="login()">Log In</button> \
          <button type="submit" class="btn btn-default" onclick="register()">Register</button> \
        </form></li>';
    }
    else{
        div.innerHTML = '<li><p class="navbar-text">Logged in as '+user_id+'</p></li><li><form class="navbar-form"><button class="btn btn-default" onclick="logout()">Log Out</button></form></li>';
    }
}

makeImage();
setupNavbar();
