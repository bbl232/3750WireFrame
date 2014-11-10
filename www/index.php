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

    <div class="modal fade" id="passwordMismatchModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title" id="message-modal_header">Error!</h4>
          </div>
          <div class="modal-body" id="message-modal_body">
              <p>Your passwords did not match. Please try again.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
<script type="text/javascript" src="js/index.js"></script>
<?php
    require("includes/footer.php");
?>
