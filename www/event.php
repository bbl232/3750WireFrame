<?php
	require("includes/header.php");
	?>
	<div class="container">
	<?php
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
				<form role="form">
					<div id="location-input"></div>
					<label>Enter Date:</label><input class="form-control" id="datepicker" type="text" /><br>
					<label>Enter Time:</label><input class="form-control" id="time" type="text" class="time ui-timepicker-input" /><br>
					<label>Enter Duration:</label><input class="form-control" id="duration" type="text" ><br>
					<label>Enter Number of volunteers required:</label><input class="form-control" id="volunteers" type="text" ><br>
					<label>Please describe the type and number of plants to be picked.</label><br><textarea rows="7" id="tree-text" class="form-control"></textarea><br>
					<!-- TODO: add tree -->
				</form>
				<div class="alert alert-danger" role="alert"><p><b>Please Note</b> that this form is not yet functional.</p></div>
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
</div>
<?php
	require("includes/footer.php");
?>
