<?php
require("includes/header.php");
?>
    <div class="container" id="top-content">
        <h2>Plant Management</h2>
    </div>
    <br>
    <center><div class="container" id='homepage_image'></div></center>
    <br>
    <div class="container">
        <div class='panel panel-default' id="trees-panel">
            <div class="panel-heading">
                <button type="submit" class="btn btn-primary" onclick="showAddTreeModal()">Add Tree</button>
                <h4>Plants associated with your account</h4>
            </div>
            <table class="table table-striped table-bordered" id="trees-table">
                <thead>
                    <tr>
                        <th>Tree Type</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Apple Tree</td>
                        <td>Branchy</td>
                    </tr>
                    <tr>
                        <td>Raspberry Bush</td>
                        <td>Pi</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="modal fade" id="addTreeModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title">Add Tree</h4>
          </div>
          <div class="modal-body" id="add-tree_body">
              <form class="form-inline" role="form">
                  <input type="text" class="form-control" placeholder="New Tree Name" id="tree-name" required>
                  <input type="text" class="form-control" placeholder="Location on Property" id="tree-location">

                  <div class="form-group">
                      <select class="form-control" id="tree-type">
                          <option value="Apple Tree" onclick="disableOther()">Apple Tree</option>
                          <option value="Orange Tree" onclick="disableOther()">Orange Tree</option>
                          <option value="Pear Tree" onclick="disableOther()">Pear Tree</option>
                          <option value="Raspberry Bush" onclick="disableOther()">Raspberry Bush</option>
                          <option value="Blueberry Bush" onclick="disableOther()">Blueberry Bush</option>
                          <option value="other" onclick="enableOther()">other</option>
                      </select>
                      <input type="text" class="form-control" placeholder="If &quot;other&quot;, please enter here" id="tree-type-other" disabled>
                  </div>
              </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal" onclick="addTree()">Add</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->

    <div class="modal fade" id="treeInfoModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title">Tree Info</h4>
          </div>
          <div class="modal-body" id="tree-info_body">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" onclick="deleteTree">Delete Tree</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->

<?php
    require("includes/footer.php");
?>