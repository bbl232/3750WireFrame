</body>
<br><br>

<div class="modal fade" id="feedbackModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h4 class="modal-title" id="message-modal_header">Appleseed Collective Feedback</h4>
      </div>
      <table class="table">
          <tr><td>
              <h5><b>Note</b> that this section is not required to submit feedback.</h5>
          <form id="feedback-form">
              <div class="input-group">
                  <span class="input-group-addon">Name</span>
                  <input type="text" class="form-control" id=""></input>
              </div>
              <br>
              <div class="input-group">
                  <span class="input-group-addon">E-mail</span>
                  <input type="text" class="form-control" id=""></input>
              </div>
              <div class="checkbox form-control">
                  <label>
                      <input type="checkbox" id="feedback-conatact_me"> Please contact me about this feedback.
                  </label>
              </div>
        </td></tr>
        <tr><td>
              <h4>Feedback</h4>
              <textarea rows='10' class="form-control" id="feedback-text" placeholder="Provide your feedback here."></textarea><br>
          </form>
      </td></tr>
      </table>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" onclick="addFeedback()" data-dismiss="modal">Send</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<nav class="navbar navbar-default navbar-fixed-bottom" role="navigation">
  <div class="container">
    <ul class="nav navbar-nav navbar-right">
        <li><p class="navbar-text navbar-right"><span class="glyphicon glyphicon-thumbs-up"></span>&nbsp;<a data-toggle="modal" data-target="#feedbackModal" class="navbar-link">Provide Feedback</a></p>&nbsp;</li>
        <li class="divider-vertical">&nbsp;</li>
        <li><p class="navbar-text navbar-right">&nbsp;<span class="glyphicon glyphicon-user"></span>&nbsp;<a href="/passwordReset.php" class="navbar-link">Forgot Password</a></p></li>
    </ul>
    <ul class="nav navbar-nav navbar-left">
        <li><p class="navbar-text navbar-right"><a href="/staffLogin.php" class="navbar-link">Staff Login</a></p></li>
    </ul>
  </div>
</nav>
<script src="/js/trees.js"></script>
</html>
