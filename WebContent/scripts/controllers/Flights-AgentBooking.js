var app = angular.module('myApp');
app.controller('Flights-AgentBookingCtrl', function($scope,localStorageService,flightServices,$location,$http,$route,$window,commonService,$modal,$log,$timeout) {

	$scope.init = function(){
		$scope.pdfloader = false;
		$scope.bookconfirmloader = true;
		$scope.successprintRound = false;
		$scope.isCor=angular.element('#isCor').val();
		$scope.AgentConfirmation = localStorageService.get('AgentConfirmData');		
		$scope.adultarray = [];
		$scope.childarray = [];
		$scope.infantarray = [];
		$scope.RoundTripConformation();
		$scope.apiUrl = commonService.baseUrl;
	};
	$scope.ErrorFlightTravelDetails = {};
	  $scope.ErrorFlightTravelDetails.origin = "";
	  $scope.ErrorFlightTravelDetails.destination = "";
	  $scope.ErrorFlightTravelDetails.depDate = "";
	  $scope.ErrorFlightTravelDetails.arvlDate = "";
	  $scope.ErrorFlightTravelDetails.cabinClass = "";
	  $scope.ErrorFlightTravelDetails.showData = false;
	  
	function pad(n){return n<10 ? '0'+n : n};
	function escapeRegExp(string) {
		return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
	}

	function replaceAll1(string, find, replace) {
		return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
	}
	$scope.RoundTripConformation = function(){
		if($scope.AgentConfirmation == null || $scope.AgentConfirmation == undefined){
			$location.path('/SessionOut');
		}
		
		flightServices.Flightbook($scope.AgentConfirmation).then(function(response){
		//$http.get('flightBookResponse.json').then(function(response){		
			$scope.bookconfirmloader = false;
			$scope.returnconfirmationNumber = response.data.confirmationNumberSpecial;
			$scope.confirmationNumber = response.data.confirmationNumber;
			
			
			/*if($scope.isCor =='true'){
			$scope.rmUserDetails = localStorageService.get('rmUserDetails');
			console.log("rmUserDetails",$scope.rmUserDetails);
		flightServices.FlightRmbook($scope.rmUserDetails).then(function(response){
			
		});}*/
			
			if(response.data.fareFlightSegmentSpecial != null){
				
				$scope.orderid = $scope.confirmationNumber;
				$scope.orderid2 = $scope.returnconfirmationNumber
				 calldataplugin1();
			}
			else{
				$scope.orderid = $scope.confirmationNumber;
				 calldataplugin();
			}
			$scope.contentloaded = true;
			
			if($scope.isCor =='true'){				  
			$scope.callRmApi();			 
			}
			
		},function(error){
			$scope.bookingComments = "Booking Failed";	
			$scope.errordiv = true;
			$scope.errorDisplay($scope.bookingComments,$scope.ErrorFlightTravelDetails);
			if($scope.isCor =='true'){				 
			$scope.callRmApi();			 
			}
		});
		
		
	
		
	};
		
		  function calldataplugin(sessionKey)
		  {
			  $scope.bookconfirmloader =true;
		          var ApiURL=  $scope.apiUrl;		        
		            var formURL = ApiURL+'Email/getHtmlTemplateById?orderid='+$scope.orderid+'&emailType=2';     
		          
		        
		          $.ajax({
		            url : formURL,
		            type : "GET",
		            dataType : "html",
		            success : function(data,textStatus,jqXHR) { 
		              
		              if (jqXHR.status == 200) {
		            	  $scope.bookconfirmloader =false;
		            	  $scope.successprint=true;
		            	  $scope.successprintRound = false;
		            	  if(data == 'Data is not avaible currently, Plese try again later'){
		            		  calldataplugin('');
		            	  }else{
		                  $("#display-api-content").html(data);
		                  
		            	  }		              
		                $scope.getbal();
		              } 
		            },
		            error : function(jqXHR,textStatus,errorThrown) {
		            
		              $scope.bookconfirmloader =false;
		              $scope.successprintRound = false;
	            	  $scope.successprint=true;
		              $(".display-api-content").html("We could not get the content, please contact administrator.");
		            }
		          });
		       
		   
		  }
		  function calldataplugin1(sessionKey)
		  {
			  $scope.bookconfirmloader =true;
		          var ApiURL=  $scope.apiUrl;
		          var formURL = ApiURL+'Email/getHtmlTemplateById?orderid='+$scope.orderid+'&emailType=2';     
		         $.ajax({
		            url : formURL,
		            type : "GET",
		            dataType : "html",
		            success : function(data,textStatus,jqXHR) { 		              
		              if (jqXHR.status == 200) {
		            	  $scope.bookconfirmloader =false;
		            	  $scope.successprint=false;
		            	  $scope.successprintRound = true;
		            	  if(data == 'Data is not avaible currently, Plese try again later'){
		            		  calldataplugin1('');		            	  
		              }else{
		                $("#display-api-Roundcontent").html(data);
		                calldataplugin2();
		                }
		                $scope.getbal();
		              } 
		            },
		            error : function(jqXHR,textStatus,errorThrown) {
		             
		              $scope.bookconfirmloader =false;
		              $scope.successprint=false;
	            	  $scope.successprintRound = true;
		              $(".display-api-content").html("We could not get the content, please contact administrator.");
		            }
		          });
		       
		   
		  }
		  function calldataplugin2(sessionKey)
		  {
			  $scope.bookconfirmloader =true;
		          var ApiURL=  $scope.apiUrl;
		          var formURL = ApiURL+'Email/getHtmlTemplateById?orderid='+$scope.orderid2+'&emailType=2';     
		          $.ajax({
		            url : formURL,
		            type : "GET",
		            dataType : "html",
		            success : function(data,textStatus,jqXHR) { 
		              
		              if (jqXHR.status == 200) {
		            	  $scope.bookconfirmloader =false;
		            	  $scope.successprint=false;
		            	  $scope.successprintRound = true;
		            	  if(data == 'Data is not avaible currently, Plese try again later'){
		            		  calldataplugin2('');
		            	  }else{
		            		  $("#display-api-Roundcontent2").html(data);
		            	  }		              
		                $scope.getbal();
		              } 
		            },
		            error : function(jqXHR,textStatus,errorThrown) {
		             
		              $scope.bookconfirmloader =false;
		              $scope.successprint=false;
	            	  $scope.successprintRound = true;
		              $(".display-api-content").html("We could not get the content, please contact administrator.");
		            }
		          });
		       
		   
		  }
		  
		  $scope.getbal = function()
			{
				var totUrl = $(location).attr('href');
				var newUrl = totUrl.substr(0, totUrl.lastIndexOf('/#/') + 1);
				var finalUrl = newUrl+"GetwalletBalance";

				$http({method:'get',url:finalUrl,headers:{'Content-Type': 'application/json'}}).success(function(data){
					var myEl = angular.element( document.querySelector( '#agentbal' ) );
					myEl.text(parseFloat(data.jsonResult.walletbal).toFixed(2)) ;	
					var myDeposit = angular.element( document.querySelector( '#agentDepbal' ));
					myDeposit.text(parseFloat(data.jsonResult.walletdepbal).toFixed(2)) ;	
					
				}).error(function(data, status, headers, config){ 
					//console.log(data);
				});
			}
	/*	};	*/

	
	
	//Download or Open PDF
	$scope.downloadFile = function () {
		$scope.pdfloader = true;
		var data = "";
		if($scope.returnconfirmationNumber!=undefined)
			data = "orderids="+$scope.confirmationNumber;
		else
			data = "orderids="+$scope.confirmationNumber;

		flightServices.downloadPdfFile(data).then(function(response){
			
			var url = response.config.url; 
			window.location.href = url;
			$scope.pdfloader = false;
		

		},function(){
			// console.log(data);
		});
	};
	$scope.downloadFile2 = function () {
		$scope.pdfloader = true;
		var data = "";
		if($scope.returnconfirmationNumber!=undefined)
			data = "orderids="+$scope.returnconfirmationNumber;
		else
			data = "orderids="+$scope.confirmationNumber;

		flightServices.downloadPdfFile(data).then(function(response){
			
			var url = response.config.url; 
		window.location.href = url;
		$scope.pdfloader = false;
		
		},function(){
			// console.log(data);
		});
	};

	
	$scope.returnIndex = function(){
			window.location.href = window.location.href.replace(/#.*$/, '');
	}
	$scope.errorDisplay = function(errorMsg,Parameters){
		$(document).ready(function(){
			var modalInstance = $modal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'views/FlightErrorPage.jsp',
			controller:'FlightErrorPageCtrl',
			backdrop:'static',
			keyboard:false,
			resolve:{
				items:function(){
					return errorMsg;
				},
				items2:function(){
					return Parameters;
				}
			}});
		modalInstance.result.then(function(selectedItem){
			$route.reload();
			
		},function(){
			$log.info('modal Dismissed at :'+new Date());
		});
			
		});
	}
	
	$scope.callRmApi = function(){
		$scope.rmUserDetails = localStorageService.get('rmUserDetails');		
	flightServices.FlightRmbook($scope.rmUserDetails).then(function(response){
		
	});
	}
	
	$scope.init();
});