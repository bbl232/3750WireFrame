<?php
require("includes/header.php");
?>
    <div class="container" id="top-content">
        <h2>Account Details.</h2>
    </div>
    <br>
    <br>
    <div class="container">
        <div class='panel panel-default' id="about-us-panel">
            <div class='panel-heading'>
                <h3>Edit Your Details Here.</h3>
            </div>
            <div class='panel-body'>

                  <!--<table>
                    <tr>
                      <td>
                        <div>
                          User-Name:
                        </div>
                      </td>
                      <td>
                      <div id="userName">
                        </div>
                      </td>

                    </tr>

                  <tr>
                    <td>
                      <div>
                        Email:
                      </div>
                    </td>
                    <td>
                    <div id="email">
                      </div>
                    </td>

                  </tr>

                  <tr>
                    <td>
                      <div>
                        Phone:
                      </div>
                    </td>
                    <td>
                    <div id="phone">
                      </div>
                    </td>

                  </tr>

                </table>-->
                <div id="regularInfo"></div>
                <hr>
                <div id="addressInfo"></div>
                  <!--<div class="updateField">
                    <input type="text" placeholder="519-123-2134">
                  </div>-->
                  <!--<button type="button" class="btn btn-default" onclick="editDetails()">Edit Data</button>-->
                  <br>
                  <button type="button" class="btn btn-default" onclick="returnHome()">Ok</button>
                  <button type="button" class="btn btn-default" onclick="returnHome()">Cancel</button>

            </div>
        </div>

    </div>

    <div class="modal fade" id="editDetailsModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title" id="message-modal_header">Edit <div id="editModalPopup"></div></h4>
          </div>
          <div class="modal-body" id="message-modal_body">
            <!--<div id="regularInfo"></div>
            <hr>
            <div id="addressInfo"></div>-->

          </div>
          <div class="modal-footer">
            <!--<button type="button" class="btn btn-default" data-dismiss="modal" onclick="checkInput()">Edit Changes</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>-->
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
<script type="text/javascript" src="js/myaccount.js"></script>

<?php
    require("includes/footer.php");
?>
