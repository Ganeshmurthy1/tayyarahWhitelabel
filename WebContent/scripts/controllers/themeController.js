var app = angular.module('myApp');

app.controller('themeCtrl',['$scope','$http','$rootScope','$modal','$log','$route','$location', function($scope,$http,$rootScope,transporter,$route,$modal,$log,$route,$location) {

	$scope.iswhitehead="";
	$scope.css = 'default';
	$scope.value={};
	$scope.value=angular.element('#cmpnyid').val();
	$scope.themee='';
	$scope.cssurl='';
	$scope.logo='';
	$scope.themee=angular.element('#themeType').val();
	$scope.cssurl=angular.element('#cssPath').val();
	$scope.logo=angular.element('#Logo').val();

	if(!$scope.themee){
		$scope.themee="Default";
		$scope.cssurl="Default";
		$scope.logo="Default";
	}

//	loading index page for whitelabeling
	$scope.headerUrl='';
	$scope.footerUrl='';
	var totUrl = $(location).attr('href');			 
	var pagename =  domain=totUrl.split("/#/")[1];	
	var themeType =  $('#themeType').val();
	if( pagename != '' && pagename !='hotel' && pagename !='bus' && pagename !='about'){		
		$scope.loadcssTheme = function(){		
			var totUrl = $(location).attr('href');
			var DirectUserKey = totUrl.substr(0, totUrl.lastIndexOf('/#/') + 1);		
			var hostData = window.location.hostname;
			var pathData = window.location.pathname;		
			var LabelAppkey =  domain=totUrl.split("/#/")[1];		
			var DirectUserUrl = DirectUserKey + "GetCompanyThemes";			
			var DefaultLocation = "https://dev.tayyarah.com/tayyarahWhiteLabel/#/";
			if(LabelAppkey != '' && LabelAppkey !='hotel' && LabelAppkey !='bus' && LabelAppkey !='about'){		
				$http({			   
					method : "GET",			    
					url : DirectUserUrl,			    
					params:{"hostName": hostData, "LabelAppkey": LabelAppkey}			  
				}).then(function mySuccess(response) {
					if(response.data.jsonResult.status != "500"){						 	
						if(response.data.jsonResult.reload =="true"){
							window.location.reload();
						}					 
					}else{	
						if(response.data.jsonResult.status == 500 || response.data.jsonResult == null){									
							$(document).ready(function(){
								jQuery.noConflict();										     
								$("#LabelingModal").modal();	    
							});									
						}						  
					}
				}, function myError(response) {
					if(response.data.jsonResult.status == 500 || response.data.jsonResult == null){	
						$(document).ready(function(){							 
							jQuery.noConflict(); 
							$("#LabelingModal").modal();						    
						});					
					}
				});
			} 
		}		
	}

	$scope.getQuery = function(q) {
		return (window.location.search.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1];
	}

}]);