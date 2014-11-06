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
	var table = $("#trees-table").DataTable();
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

function editTree() {

}

$('.modal').on('hidden.bs.modal', function(){
    $(this).find('form')[0].reset();
});
