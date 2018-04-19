$(document).ready(function(){
    loadOrders();
});

function loadOrders(){
    var jsonToSend ={
		"action" : 'LOADORDERS'
	};

	$.ajax({
		url: "data/applicationLayer.php",
		type: "POST",
		data : jsonToSend,
		ContentType : "application/json",
		dataType: "json",
		success: function (dataReceived){
			if(dataReceived.status == 'SUCCESS'){
				var tableElements = "";
				$("#userOrdersTable tbody tr").remove();
		
				for(var i = 0; i < dataReceived.orders.length; i++){
					tableElements += "<tr>"
					var orderID = dataReceived.orders[i].orderID;
					var burgerType = dataReceived.orders[i].burgerType;
					var breadType = dataReceived.orders[i].breadType;
					var burgerSize = dataReceived.orders[i].burgerSize;
					var addKetchup = dataReceived.orders[i].addKetchup;
					var addTopings = dataReceived.orders[i].addTopings;
					var sauces = dataReceived.orders[i].sauces;
					var addFries = dataReceived.orders[i].addFries;
                    
					tableElements += "<td>" + orderID + "</td>";
                    tableElements += "<td>" +
                        burgerType + ", " + 
                        breadType + ", " + 
                        burgerSize + ", " + 
                        addKetchup + ", " + 
                        addTopings + ", " + 
                        sauces + ", " + 
                        addFries + ", " + 
                         "</td>";
		
					tableElements += "</tr>";
				}

				$("#userOrdersTable tbody").append(tableElements);
			}else{
				console.log("loadOrders else statement in success function.");
			}
		}, 
		error: function (error){
            console.log("loadOrders error function.")
		}
	});
}