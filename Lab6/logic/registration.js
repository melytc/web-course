$(document).ready(function() {
	
	// User is automatically logged in upon registration (process is done on the server)			
	$("#registerButton").on("click", function() {
		var jsonObject = {
			"uUsername" : $("#username").val(),
			"uPassword" : $("#userPassword").val(),
			"uFirstName" : $("#firstName").val(),
			"uLastName" : $("#lastName").val(),
			"uEmail" : $("#email").val()
		};
		console.log("Clicked the registration button.");

		$.ajax({
			type: "POST",
			url: "./data/applicationLayer.php",
			data : jsonObject,
			dataType : "json",
			success: function(jsonData) {
				console.log("success function");
				if(jsonData.status == "SUCCESS"){
					alert("You are registered!");
					window.location.replace("home.html");	
				} else {
					alert("There was an error when registering, please try again.");
				}
			},
			error: function(errorMsg) {
				console.log("error function");
				alert(errorMsg.statusText);
			}
		});
	});
	
	$("#cancelButton").on("click", function() {
		window.location.replace("login.html");
	});
});