// Check if the user is logged in (hide login button).
$(document).ready(function(){
	$.ajax({
		url : "./data/checkSession.php",
		type : "GET",
		dataType : "json",
		success : function(dataReceived){
			console.log(dataReceived);
			if(!dataReceived.fName){
				// User is not logged in.
				$("#login").css("display", "block");
				$("#logout").css("display", "none");
				$("#userLogged").html(" ");
			} else {
				// User is logged in.
				$("#login").css("display", "none");
				$("#logout").css("display", "block");
				$("#userLogged").html("What's up, <strong>" + dataReceived.fName + "</strong>");
			}
		},
		error : function(errorMessage){
			console.error(errorMessage);
		}
	});
});
