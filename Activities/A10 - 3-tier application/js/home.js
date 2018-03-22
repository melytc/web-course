$(document).ready(function(){

	jsonToSend = {
		"action" : 'CHECKSESSION'
	};

	$.ajax({
		url : "./data/applicationLayer.php",
		type : "POST",
		dataType : "json",
		data : jsonToSend,
		success : function(dataReceived){
			if(dataReceived.status == "SUCCESS"){
				$("h2").text(dataReceived.fName + " " + dataReceived.lName);
			} else {
				alert("dataReceived was not success.");
			}
		},
		error : function(errorMessage){
			alert(errorMessage.statusText);
			window.location.replace("./index.html");
		}

	});

	$("#logoutButton").on("click", function(){
		jsonToSend = {
			"action" : 'LOGOUT'
		};

		$.ajax({
			url : "./data/applicationLayer.php",
			type : "POST",
			dataType : "text",
			data : jsonToSend,
			success : function(dataReceived){
				window.location.href = "index.html";
			},
			error : function(errorMessage){
				alert(errorMessage.statusText);
			}
		});
	});
});