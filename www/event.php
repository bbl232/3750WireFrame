<?php
	require("includes/header.php");
?>
		<div class="container">
		<div class='row' id="events">
			<div class='heading'>
				<div class='pull-left'>
					<h3>Planned Events</h3>
				</div>
				<div class='pull-right'>
					<button type="button" class="btn btn-success" onclick="newEvent()">Add New Event</button>
				</div>
			</div>
			<table class='table'>
				<thead>
					<tr><th>Fri, 21 Nov 2014</th><th>Time: 7:00AM</th></tr>
				</thead>
				<tbody>
					<tr><td>Location: address</td><td>Producer: Name</td></tr>
					<tr><td>Time Needed: 1:00 hour</td><td>Volunteers: 2/10</td></tr>
					<tr><td>Nbr Trees: 20</td><td>Type of trees: Apple</td></tr>
				</tbody>
			</table>
		</div>
	</div>

	<div class="modal fade" id="addEventModal">
	<div class="modal-dialog">
		<div class="modal-content">
		<div class="modal-header">
			<h4 class="modal-title" id="message-modal_header">Create New Event</h4>
		</div>
		<div class="modal-body" id="add-event_body">
			<form class="form-inline" role="form">
				<p>Enter Location:<input id="location" type="text" ></p>
				<p>Enter Number of volunteers:<input id="volunteers" type="text" ></p>
				<p>Enter Date:<span class="innerdp"><input id="datepick" type="text" /></span></p>
				<p>Enter time:<span class="innerdp"><input id="time" type="text" /></span></p>
			</form>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-primary" onclick="addEvent()">Create</button>
			<a type="button" class="btn btn-danger" href="/event.php">Cancel</a>
		</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
	</div><!-- /.modal -->


<script src="http://ajax.aspnetcdn.com/ajax/globalize/0.1.1/globalize.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>
<script src="http://cdn.syncfusion.com/js/web/ej.web.all-latest.min.js"></script>
<script type="text/javascript" src="js/event.js"></script>
<script type="text/javascript">
$(function () {
// document ready
// simple time picker creation
	$("#datepick").ejDatePicker();
	$("#time").ejTimePicker();
});
</script>
<?php
	require("includes/footer.php");
?>
