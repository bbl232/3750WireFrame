<?php
require("includes/header.php");
?>
    <div class="container" id="top-content">
        <h2>Welcome to the Appleseed Collective Homepage.</h2>
    </div>
    <br>
    <center><div class="container" id='homepage_image'></div></center>
    <br>
    <div class="container">
        <div class='panel panel-default' id="about-us-panel">
            <div class='panel-heading'>
                <h3>About Us</h3>
            </div>
            <div class='panel-body'>
                <p>Appleseed Collective Revival builds from previous efforts to reconnect our urban food network and make use of the abundant food sources in our own community.  The Appleseed Collective is a Working Group of Transition Guelph, picking un-used fruit and nuts from privately owned fruit trees and bushes, mostly in and around the city of Guelph.</p>

                <p>What's new about the Appleseed Collective Revival is that it is a Social Enterprise - that means, along with our community values, and prioritizing the collection of organically-produced fruit and veg, we are attempting to generate revenue that will support and sustain our activities.</p>

                <p>The Appleseed Collective Revival is also looking to expand our database of trees, volunteers, and recipient organizations.  We are looking for members of the public with fruit or nut trees - or vegetables - that could be harvested and / or processed.</p>
            </div>
        </div>
        <div class='panel panel-default' id="news-and-events-panel">
            <div class='panel-heading'>
                <h3>News and Events</h3>
            </div>
            <table class='table'>
                <tr><td>News Item 1</td></tr>
                <tr><td>Event Here</td></tr>
            </table>
        </div>
    </div>

<div class="modal fade" id="loginModal">
    <div class="modal-dialog">
	<div class="modal-content">
		<div class="modal-header">
			<h4 class="modal-title">Login</h4>
		</div>
		<div class="modal-body" id="login_body">
			<form class="form-inline" role="form">
				<label>Email Address:</label><input class="form-control" id="login-email" type="text" /><br>
				<label>Password:</label><input class="form-control" id="login-password" type="text" /><br>
			</form>
		</div>
		<div class="modal-footer">
			<button type="submit" class="btn btn-primary" data-dismiss="modal" onclick="loginButton()">Login</button>
			<button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
		</div>
	</div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div class="modal fade" id="registerModal">
    <div class="modal-dialog">
	<div class="modal-content">
		<div class="modal-header">
			<h4 class="modal-title">Register</h4>
		</div>
			<div class="modal-body" id="register_body">
				<form class="form-inline" role="form">
					<label>First Name:</label><input class="form-control" id="register-first" type="text" /><br>
					<label>Last Name:</label><input class="form-control" id="register-last" type="text" /><br>
					<label>Email Address:</label><input class="form-control" id="register-email" type="text" /><br>
					<label>Phone Number:</label><input class="form-control" id="register-phone" type="text" /><br>
					<label>Street Address:</label><input class="form-control" id="register-address" type="text" /><br>
					<label>City:</label><input class="form-control" id="register-city" type="text" /><br>
					<label>Postal Code:</label><input class="form-control" id="register-postal" type="text" /><br>
					<label>Country:</label><input class="form-control" id="register-country" type="text" /><br>
					<label>Password:</label><input class="form-control" id="register-password" type="text" /><br>
					<label>Confrim Password:</label><input class="form-control" id="register-confirm" type="text" /><br>
				</form>
			</div>
			<div class="modal-footer">
				<button type="submit" class="btn btn-primary" data-dismiss="modal" onclick="register()">Register</button>
				<button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<script type="text/javascript" src="js/index.js"></script>
<?php
    require("includes/footer.php");
?>
