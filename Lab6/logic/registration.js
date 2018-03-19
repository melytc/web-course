$(document).ready(function(){
	
	// User is automatically logged in upon registration (process is done on the server)			
	$("#registerButton").on("click", function(){
		var jsonToSend = {
			"uFirstName" : $("#firstName").val(),
			"uLastName" : $("#lastName").val(),
			"uUsername" : $("#username").val(),
			"uPassword" : $("#userPassword").val(),
			"uEmail" : $("#email").val(),
			"action" : 'REGISTER'
		};
		console.log("Clicked the registration button.");

		$.ajax({
			url: "./data/applicationLayer.php",
			type: "POST",
			data : jsonToSend,
			ContentType : "application/json",
			dataType : "json",
			success : function(dataReceived){
				console.log("Registration success function.");
				if(dataReceived.status == "SUCCESS"){
					alert("You are registered!");
					window.location.replace("home.html");	
				} else {
					alert("There was an error when registering, please try again.");
				}
			},
			error : function(errorMsg){
				console.log("Registration error function.");
				alert(errorMsg.statusText);
			}
		});
	});
	
	$("#cancelButton").on("click", function(){
		window.location.replace("login.html");
	});
});