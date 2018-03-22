 $(document).ready(function() {
          
  $("#registerButton").on("click", function() {

    var uFirstName = $("#firstName").val();
    var uLastName = $("#lastName").val();
    var uUsername = $("#username").val();
    var uPassword = $("#userPassword").val();
    var validation = validateFields(uFirstName, uLastName, uUsername, uPassword);

    if(validation){
        var jsonToSend = {
                "uUsername" : uUsername,
                "uPassword" : uPassword,
                "uFirstName" : uFirstName,
                "uLastName" : uLastName,
                "action" : 'REGISTER'
            };

        $.ajax({
            url : "./data/applicationLayer.php",
            type : "POST",
            data : jsonToSend,
            ContentType : "application/json",
            dataType : "json",
            success : function(dataReceived){
                alert("You are registered! Welcome to the site.");
                window.location.replace("./home.html");
            },
            error : function(errorMessage){
                console.log("Registration error function.");
                alert(errorMessage.statusText);
            }
        });

    } else {
        alert("Please fill out the fields correctly.");
    }
});

   $("#cancelButton").on("click", function() {
        window.location.replace("login.html");
   });

});

function validateFields(uFirstName, uLastName, uUsername, uPassword){

    if(uFirstName == null || uFirstName == ""){
        return false;
    }

    if(uLastName == null || uLastName == ""){
        return false;
    }

    if(uUsername == null || uUsername == ""){
        return false;
    }

    if(uPassword == null || uPassword == ""){
        return false;
    }

    return true;
}