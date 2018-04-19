$(document).ready(function(){
	$("#logout").on("click", logout);
});

function logout(){
	$.ajax({
		url : "./data/applicationLayer.php",
		type : "POST",
		dataType : "text",
		success : function(dataReceived){
			window.location.href = "index.html";
		},
		error : function(errorMessage){
			alert(errorMessage.statusText);
		}
	});
}