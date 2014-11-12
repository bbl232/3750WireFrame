<?php
    require("includes/header.php");
?>
    <div class="container" id="top-content">
        <h2>Staff Login</h2>
    </div>
    <br>
    <div class="container">
       <form role = "login">
           <div class = "col-xs-4">
               <input type="text" class="form-control input-normal" placeholder="E-mail" id="staff-login-email" required> 
	       <br>
               <input type="password" class="form-control" placeholder="Password" id="staff-login-password" required>  	
	       <br>
	       <button type="submit" class="btn btn-primary" onclick="staffLogin()">Log In</button>
	   </div>
       </form>
    </div>
<?php
    require("includes/footer.php");
?>
