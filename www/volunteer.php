<?php
require("includes/header.php");
require("eventsList.php");
?>
<script>
showEvents();
</script>

<div class='pull-right'>
	<button type="button" class="btn btn-success" onclick="volunteerEvent()">Register for event</button>
</div>

<p>Date: <input onchange="filter_list('date')" type="text" id="datepicker"></p>
<script>
 $( "#datepicker" ).datepicker();
</script>

    


<?php
    require("includes/footer.php");
?>
