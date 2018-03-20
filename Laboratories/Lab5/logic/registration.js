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
		$.ajax({
			type: "POST",
			url: "./data/registration.php",
			data : jsonObject,
			dataType : "json",
			success: function(jsonData) {
				if(jsonData.success){
					window.location.replace("home.html");	
				} else {
					console.log("There was an error when registering.");
				}
			},
			error: function(errorMsg) {
				alert(errorMsg.statusText);
			}
		});
	});
	
	$("#cancelButton").on("click", function() {
		window.location.replace("login.html");
	});
	
});