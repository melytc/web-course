$(document).ready(function(){
	
	// User is automatically logged in upon registration (process is done on the server)			
	$("#registerButton").on("click", function(){
		var jsonToSend ={
			"uFirstName" : $("#firstName").val(),
			"uLastName" : $("#lastName").val(),
			"uUsername" : $("#username").val(),
			"uPassword" : $("#userPassword").val(),
			"uEmail" : $("#email").val(),
			"action" : 'REGISTER'
		};

		$.ajax({
			url: "./data/applicationLayer.php",
			type: "POST",
			data : jsonToSend,
			dataType : "json",
			ContentType : "application/json",
			success : function(dataReceived){
				if(dataReceived.status == "SUCCESS"){
					console.log("Success");
					alert("You are registered!");
					window.location.replace("home.html");	
				}else{
					console.log("Error in registration");
					alert("There was an error when registering, please try again.");
				}
			},
			error : function(errorMsg){
				console.log("Error function :(");
				alert(errorMsg.statusText);
			}
		});
	});
	
	$("#cancelButton").on("click", function(){
		window.location.replace("login.html");
	});
});