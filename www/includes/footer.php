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
                  <input type="text" class="form-control" id="feedback-name"></input>
              </div>
              <br>
              <div class="input-group">
                  <span class="input-group-addon">E-mail</span>
                  <input type="text" class="form-control" id="feedback-email"></input>
              </div>
              <div class="checkbox form-control">
                  <label>
                      <input type="checkbox" id="feedback-contact_me"> Please contact me about this feedback.
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
        <button type="button" class="btn btn-default" onclick="sendFeedback()" data-dismiss="modal">Send</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<nav class="navbar navbar-default navbar-fixed-bottom" role="navigation">
  <div class="container">
    <ul class="nav navbar-nav navbar-right" id="footer-right"></ul>
    <ul class="nav navbar-nav navbar-left" id="footer-left"></ul>
  </div>
</nav>
<script src="/js/trees.js"></script>
<script src="/js/footer.js"></script>
</html>
