$(document).ready(function(){

	$.ajax({
		url : "./data/sessionService.php",
		type : "POST",
		dataType : "json",
		success : function(dataReceived){
			$("h2").text(dataReceived.fName + " " + dataReceived.lName);
		},
		error : function(errorMessage){
			alert(errorMessage.statusText);
			window.location.replace("./index.html");
		}

	});

	$("#logoutButton").on("click", function(){
		$.ajax({
			url : "./data/deleteSessionService.php",
			type : "POST",
			dataType : "json",
			success : function(dataReceived){
				alert(dataReceived.success);
				window.location.replace("./index.html");
			},
			error : function(errorMessage){
				alert(errorMessage.statusText);
			}

		});
	});
});