$(document).ready(function(){
    var jsonToSend = {
		"action" : 'CHECKCOOKIE'
	}
    // AJAX call to check if we had to remember a username (the remember cookie is set).
	$.ajax({
		url: "./data/applicationLayer.php",
		type: "POST",
		data : jsonToSend,
		dataType: "json",
		ContentType : "application/json",
		success: function(dataReceived){
			$("#username").val(dataReceived.cookieUsername);
		},
		error: function(errorMessage){
        }
    });
        
    $("#loginButton").on("click", function(){

		var username = $("#username").val();
		var password = $("#userPassword").val();
		var remember = $("#rememberBox").is(":checked");

		if (username != "" && password != ""){
			var jsonToSend = {
				"uName" : username,
				"uPassword" : password,
				"rememberMe" : remember,
				"action" : 'LOGIN'
			};
							 
			$.ajax({
				url : "./data/applicationLayer.php",
				type : "POST",
				data : jsonToSend,
				ContentType : "application/json",
				dataType : "json",
				success : function(dataReceived){
					console.log("Login success function.");
					if(dataReceived.status == 'SUCCESS') {
						alert("Welcome back " + dataReceived.firstname + " " + dataReceived.lastname);
						window.location.href = "./home.html";
					} else {
						alert('We were not able to log you in. Please try again.');
					}
				},
				error : function(errorMessage){
					console.log("Login failed.");
					alert(errorMessage.statusText);
				}
			});
		}
	});
});