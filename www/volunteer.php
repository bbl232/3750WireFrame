<?php
require("includes/header.php");
require("eventsList.php");
?>


<p>Date: <input onchange="filter_list('date')" type="text" id="datepicker"></p>
<script>
 $( "#datepicker" ).datepicker();
</script>

    


<?php
    require("includes/footer.php");
?>
