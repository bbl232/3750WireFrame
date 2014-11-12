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

<p>Date: <input onchange="filter_list('date')" type="text" id="datepicker"></p>
<script type="text/javascript" src="js/volunteer.js"></script>
<script>
 $( "#datepicker" ).datepicker();
</script>
</div>
<?php
    require("includes/footer.php");
?>
