<?php
	require("includes/header.php");
	require("eventsList.php");
?>
<script>
showEvents();
</script>

<div class='pull-right'>
	<button type="button" class="btn btn-success" onclick="newEvent()">Add New Event</button>
</div>

<div class="modal fade" id="addEventModal">
<div class="modal-dialog">
	<div class="modal-content">
		<div class="modal-header">
			<h4 class="modal-title" id="message-modal_header">Create New Event</h4>
		</div>
		<div class="modal-body" id="add-event_body">
				<form class="form-inline" role="form">
					<div id="location-input"></div>
					<p>Enter Date:<input id="datepicker" type="text" /></p>
					<p>Enter Time:<input id="time" type="text" class="time ui-timepicker-input" /></p>
					<p>Enter Duration:<input id="duration" type="text" ></p>
					<p>Enter Number of volunteers:<input id="volunteers" type="text" ></p>
					<!-- TODO: add tree -->
				</form>
			</div>
			<div class="modal-footer" id="footer">
				<button type="button" class="btn btn-primary" data-dismiss="modal" onclick="addNewEvent()">Create</button>
				<button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<script type="text/javascript" src="js/event.js"></script>
<script>
$( "#datepicker" ).datepicker();
$( "#time" ).timepicker();
</script>
<?php
	require("includes/footer.php");
?>
