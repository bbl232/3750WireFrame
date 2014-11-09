//getCookie function taken from w3schools: http://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
}

function showAddTreeModal(){
    $('#addTreeModal').modal('show');
}

function addTree() {
	var table = $('#trees-table').DataTable();
	var name = document.getElementById("tree-name").value;
	var type = document.getElementById("tree-type").value;
	if (type == "other")
		type = document.getElementById("tree-type-other").value;
	table.row.add([type, name]).draw();
}

function disableOther() {
	$('#tree-type-other').val('');
	$('#tree-type-other').attr('disabled', true);
}

function enableOther() {
	$('#tree-type-other').attr('disabled', false);
}

function showTreeInfoModal(tbody) {
        var type = $('td', tbody).eq(0).text();
        var name = $('td', tbody).eq(1).text();
	var info = "<h4>Tree Name</h4>"
	info = info.concat("<p>", name, "</p> \
              <h4>Tree Type:</h4> \
              <p>", type, "</p>");
        var div = document.getElementById("tree-info_body");
        $('#treeInfoModal').modal('show');
	div.innerHTML = info;
}

function deleteTree() {

}

$(document).ready(function(){
    $('#trees-table').dataTable();

    $('#trees-table tbody').on('click', 'tr', function(){showTreeInfoModal(this);});
});

$('.modal').on('hidden.bs.modal', function(){
    $(this).find('form')[0].reset();
});
