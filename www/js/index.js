function makeImage()
{
    var div = document.getElementById('homepage_image');
    var panelBelow = document.getElementById('about-us-panel');
    var img = new Image();

    img.onload = function(){
        div.appendChild(img);
    }

    img.src = "http://placehold.it/"+(panelBelow.offsetWidth)+"x250&text=Appleseed Collective Image Banner";
}


makeImage();
