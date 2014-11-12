function setupFooter(){
    var user_id = getCookie("User_id_appleseed");
    var staff_id = getCookie("Staff_id_appleseed");
    var footer_right = document.getElementById("footer-right");
    var footer_left = document.getElementById("footer-left");
    if(user_id=="" && staff_id==""){
        footer_left.innerHTML = '<li><p class="navbar-text"><a href="/staffLogin.php" class="navbar-link">Staff Login</a></p></li>';
        footer_right.innerHTML = '<li><p class="navbar-text"><span class="glyphicon glyphicon-thumbs-up"></span>&nbsp;<a data-toggle="modal" data-target="#feedbackModal" class="navbar-link">Provide Feedback</a></p>&nbsp;</li><li>&nbsp;</li><li><p class="navbar-text">&nbsp;<span class="glyphicon glyphicon-user"></span>&nbsp;<a data-toggle="modal" data-target="#forgotModal" class="navbar-link">Forgot Password</a></p></li>';
    }
    else if(staff_id!="staff"){
        footer_right.innerHTML = '<li><p class="navbar-text"><span class="glyphicon glyphicon-thumbs-up"></span>&nbsp;<a data-toggle="modal" data-target="#feedbackModal" class="navbar-link">Provide Feedback</a></p>&nbsp;</li><li>&nbsp;</li>';
    }
}

setupFooter();
