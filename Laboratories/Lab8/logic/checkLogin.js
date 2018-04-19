// Check if the user is logged in (hide login button).
$(document).ready(function(){
	jsonToSend ={
		"action" : 'CHECKSESSION'
	};
	
	$.ajax({
		url : "./data/applicationLayer.php",
		type : "POST",
		dataType : "json",
		data : jsonToSend,
		success : function(dataReceived){
			if(!dataReceived.fName){
				// User is not logged in.
				$("#login").css("display", "block");
				$("#logout").css("display", "none");
				$("#userLogged").html(" ")
				$('.userOrders').css("display", "none");;
			}else{
				// User is logged in.
				$("#login").css("display", "none");
				$("#logout").css("display", "block");
				$("#userLogged").html("What's up, <strong>" + dataReceived.fName + "</strong>");
				$('.userOrders').css("display", "block");
			}
		},
		error : function(errorMessage){
		}
	});
});
