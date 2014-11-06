function login(){

}

function logout(){

}

var div = document.getElementById('homepage_image');
var img = new Image();

img.onload = function(){
    div.appendChild(img);
}

img.src = "http://placekitten.com/"+(div.offsetWidth)+"/200";
