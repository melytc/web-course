$(document).ready(function(){

	// AJAX call to retrieve cookie.
	$.ajax({
		url: "./data/cookieService.php",
		type: "POST",
		dataType: "json",
		success: function(dataReceived){
			$("#username").val(dataReceived.cookieUsername);
		},
		error: function(errorMessage){
			alert("Error on AJAX call for cookies! " + errorMessage.statusText);
		}
	})


	$("#loginButton").on("click", function(){

		var username = $("#username").val();
		var password = $("#userPassword").val();
		var remember = $("#rememberBox").is(":checked");

		if (username != "" && password != "")
		{
			var jsonToSend = {
								"uName" : username,
								"uPassword" : password ,
								"rememberMe" : remember
							 };

			$.ajax({
				url : "/A9 - PHP Service/data/loginService.php",
				type : "POST",
				data : jsonToSend,
				ContentType : "application/json",
				dataType : "json",
				success : function(dataReceived){
					alert("Welcome back " + dataReceived.firstname
									+ " " + dataReceived.lastname);

					window.location.href = "home.html";
				},
				error : function(errorMessage){
					alert(errorMessage.statusText);
				}
			});
		}
	});
});