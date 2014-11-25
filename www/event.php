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
				<form class="form-inline" role="form">
					<div id="location-input"></div>
					<label>Enter Date:</label><input class="form-control" id="datepicker" type="text" /><br>
					<div class="bootstrap-timepicker">
						<label>Enter Start Time:</label>
						<input id="timepicker" type="text" value="10:30 AM" class="form-control">
						<i class="icon-time"></i>
					</div>
					<div class="bootstrap-timepicker">
						<label>Enter End Time:</label>
						<input id="timepicker2" type="text" value="11:30 AM" class="form-control">
						<i class="icon-time"></i>
					</div>
					<label>Enter Number of volunteers required:</label><input class="form-control" id="volunteers" type="text" ><br>
					<label>Enter Tree Types and Numbers:</label><br>
					<div id="treesForm">
						<div id="trees">
							<input class="form-control" id="tree1type" placeholder="Type" type="text">
							<input class="form-control" id="tree1num" placeholder="Number" type="text">
						</div>
						<button type="button" class="btn btn-link" onclick="addEventTree(1)">+ Add Type</button><br>
					</div>
					<label>Please describe the event:</label><br><textarea rows="7" id="tree-text" class="form-control"></textarea><br>
				</form>
			</div>
			<div class="modal-footer" id="footer">
				<button type="button" class="btn btn-primary" id="addEvent" data-dismiss="modal" onclick="addNewEvent(1)">Create</button>
				<button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<script type="text/javascript" src="js/event.js"></script>
<script>
$( "#datepicker" ).datepicker();
$('#timepicker').timepicker({
				minuteStep: 15,
				showInputs: false,
				template: 'modal',
				showMeridian: true
			});
$('#timepicker2').timepicker({
				minuteStep: 15,
				showInputs: false,
				template: 'modal',
				showMeridian: true
			});
</script>
</div>
<?php
	require("includes/footer.php");
?>
