$(document).ready(function(){

	// Attach event handlers
	$("#submitComment").on("click", validateComment);
	$("#modalLoginButton").on("click", sendLoginInfoToServer);

	// Load comment data.
	loadComments();

	// Updating content when clicking the menu.
	$("#homeMenu > li").on("click", function(){
	
		// Hiding current element.
		$(".elementSelected").addClass("hiddenElement").removeClass("elementSelected");

		// Update option selected.
		$(".selected").removeClass("selected");

		// Show current element.
		var currentOption = $(this).attr("class");
		$("#" + currentOption).removeClass("hiddenElement");
		$("#" + currentOption).addClass("elementSelected");

		// Update option selected in menu.
		$(this).addClass("selected");
	});
});

function showModal(){
	$("#loginModal").dialog({modal: true, position: { my: 'top', at: 'top+180' }});
}

// Function to load comment data from xml file.
function loadComments(){

	var jsonToSend = {
		"action" : 'LOADCOMMENTS'
	}
	$.ajax({
		url: "data/applicationLayer.php",
		type: "GET",
		data : jsonToSend,
		ContentType : "application/json",
		dataType: "json",
		success: function (dataReceived) {
			var tableElements = "";
	
			for(var i = 0; i < dataReceived.length; i++){
				tableElements += "<tr>"
				var name = dataReceived[i].username;
				var email = dataReceived[i].email;
				var text = dataReceived[i].comment;
	
				tableElements += "<td>" + name + "</td>";
				tableElements += "<td>" + email + "</td>";
				tableElements += "<td>" + text + "</td>";
	
				tableElements += "</tr>";
			}
	
			$("#commentLogTable tbody").append(tableElements);
	
		}, error: function (error) {
		}
	});
}

// Function to validate comment submission.
function validateComment(){
	var name = $("#nameText").val();
	var nameError = name == "";

	var email = $("#emailText").val();
	var emailError = email == "";

	var comment = $("#commentText").val()
	var commentError = comment == "";

	var commentHTML = "";

	// Validation of name.
	if(nameError){
		$("#nameError").removeClass("hiddenMessage");
	} else {
		$("#nameError").addClass("hiddenMessage");
	}

	// Validation of user email.
	if(emailError){
		$("#emailError").removeClass("hiddenMessage");
	} else {
		$("#emailError").addClass("hiddenMessage");
	}

	// Validation of user comment.
	if(commentError){
		$("#commentError").removeClass("hiddenMessage");
	} else {
		$("#commentError").addClass("hiddenMessage");
	}

	// If no errors were found, add comment to log.
	if(!emailError && !commentError && !nameError){
		checkSession();
	}
}

// Function to post a comment into the comment log.
function postComment(username, fromModal){

	var commentText = $("#commentText").val();
	var jsonToSend = {
		"commentText" : commentText,
		"username" : username,
		"action" : 'POSTCOMMENT'
	}

	$.ajax({
		url : "./data/applicationLayer.php",
		type : "POST",
		data : jsonToSend,
		ContentType : "application/json",
		dataType : "json",
		success : function(dataReceived){
			if(dataReceived.success){
				alert("Comment posted!");
				loadComments();    
			} else {
				alert("Sorry, error posting comments.");
				console.error("Error posting comment.");
			}
			
		},
		error : function(errorMessage){
			alert(errorMessage.statusText);
		}
	});
}


function sendLoginInfoToServer() {
	var username = $("#modalUsername").val();
	var password = $("#modalPassword").val();

	if (username != "" && password != ""){
		var jsonToSend = {
			"uName" : username,
			"uPassword" : password,
			"rememberMe" : false,
			"action" : 'LOGIN'
		};

		$.ajax({
			url : "./data/applicationLayer.php",
			type : "POST",
			data : jsonToSend,
			dataType : "json",
			success : function(dataReceived){
				if(dataReceived.success){
					$("#loginModal").dialog("close");
					postComment(username, true);	
				} else {
					alert("Incorrect credentials. Please try again.");
				}
			},
			error : function(errorMessage){
				alert("Could not post message.");
			}

		});
	}
}

// Function to validate that there is a current session.
function checkSession(){
	jsonToSend = {
		"action" : 'CHECKSESSION'
	};
	
	$.ajax({
		url : "./data/applicationLayer.php",
		type : "POST",
		dataType : "json",
		data : jsonToSend,
		success : function(dataReceived){
			if(dataReceived.fName){
				postComment(dataReceived.uName, false);
			} else {
				showModal();
			}
		},
		error : function(errorMessage){
			alert(errorMessage.statusText);
		}
	});
}

