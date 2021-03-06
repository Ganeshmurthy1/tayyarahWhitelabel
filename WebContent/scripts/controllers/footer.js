var app = angular.module('myApp');
app.controller('FootCtrl', function($scope,transporter,$rootScope) {
$scope.init = function(){
	
	$scope.loaderSpin = false;
	
};
	
	
$scope.hidingModal = function(){
    jQuery.noConflict(); 
   	$('#welcomeagent').modal('hide');
   	$('#forgetPassword').modal('show');
	
}

$scope.openLogin = function(){
	jQuery.noConflict(); 
	$('#forgetPassword').modal('hide');
	$('#welcomeagent').modal('show');
}


$scope.loginClick = function() {
	$("#removeImg").css('display', 'inline-block');
	$scope.loaderSpin = true;
	var user = $("#hemail").val();
    var password = $("#pass").val();
    var companyid=$("#companyid").val();
    var isCorporate = $("#isCorporate").val(); 
    var totUrl = $(location).attr('href');
  	var newUrl = totUrl.substr(0, totUrl.lastIndexOf('/#/') + 1);
  	var finalUrl = "";
  	if(isCorporate == 'true')
	 finalUrl = newUrl+"CorporateLogin";
  	else 
  	  finalUrl = newUrl+"AgentLogin";
 
	
    $.ajax({
        url: finalUrl,
        type: 'POST',
        dataType: 'json',
        data: {
      	  Email: user,
  		  Password: password,
  		  Company_userid: companyid
		    },
        success: function (response) {
        	
        	$scope.loaderSpin = false;
        	
      	     $scope.handleLoginResult(response);
        },
			error: function(xhr, status, error)
			{
						
				 $scope.loaderSpin = false;
				$scope.handleagentLoginerror(status); 
			}
        
    });
 
}


$scope.loginWhiteLabelClick = function() {
	$("#removeImg").css('display', 'inline-block');
	$scope.loaderSpin = true;
	var user = $("#hemail").val();
    var password = $("#pass").val();
    var companyid=$("#companyid").val();
     var isCorporate = $("#isCorporate").val(); 
                   
    var totUrl = $(location).attr('href');
  	var newUrl = totUrl.substr(0, totUrl.lastIndexOf('/#/') + 1);
  	var finalUrl = "";
  	if(isCorporate == 'true')
	 finalUrl = newUrl+"corporateWhiteLabelLogin";
  	else 
  	  finalUrl = newUrl+"AgentLoginFromWhiteLabel";
 
	
    $.ajax({
        url: finalUrl,
        type: 'POST',
        dataType: 'json',
        data: {
      	  Email: user,
  		  Password: password,
  		  Company_userid: companyid
		    },
        success: function (response) {
        	
        	$scope.loaderSpin = false;
        	
      	     $scope.handleLoginResult(response);
        },
			error: function(xhr, status, error)
			{
						
				 $scope.loaderSpin = false;
				$scope.handleagentLoginerror(status); 
			}
        
    });
 
}

  $scope.b2blogin=function() {
	  $('div.lioghead').text('B2B Login');
	  $("#isCorporate").val("false"); 
}
  $scope.corporatelogin=function() {
	  $('div.lioghead').text('Corporate Login');
	  $("#isCorporate").val("true"); 
}
 

$scope.handleLoginResult  = function(response) {
    var status = response.status;
    var message = "login successfully";
    if (status === false) {
        // do whatever needs to be done after successful login
        $("#aloginresult").html(message);
        location.reload();  
        $('#welcomeagent').modal('hide');
        
    }
} 
$scope.handleagentLoginerror = function(xhr) {
	//console.log("dasf",xhr);
	    var status = xhr;
	   
	    if(xhr == "error"){
	    	
	    	
	    	$("#removeImg").css('display', 'none');
	     	 var logmessage = "Please Enter Valid Login Credentials";
	 	    $("#loginerror").html(logmessage);	
	    };
	}




$scope.AddLogButton = function(){
	$("#hemail").val('');
	 $("#pass").val('');
	 $("#companyid").val('');
	 
	 var logmessage = "";
	 $("#loginerror").html(logmessage);
}
$scope.returnIndex = function(){
	window.location.href = window.location.href.replace(/#.*$/, '');
}
$scope.returnHotelIndex = function(){
	window.location.href = window.location.href.replace(/#.*$/ , '#/hotel');
	
}
$scope.init();
});
	