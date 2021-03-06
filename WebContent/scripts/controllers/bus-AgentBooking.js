var app = angular.module('myApp');
app.controller('busAgentBookingCtrl', function($scope,$location,busServices,$http,$modal,$log,$window,localStorageService,commonService) {
	$scope.init = function(){
		$scope.bookingVocherData = localStorageService.get('AgentBusConfirmData');
		$scope.apiUrl = commonService.baseUrl;
		$scope.bookingConfirmation();
		$scope.orderId = '';
	}
	$scope.blockingData = localStorageService.get('seatblockData');
	$scope.ErrorBusTravelDetails = {};
	  $scope.ErrorBusTravelDetails.origin = $scope.blockingData.origin;
	  $scope.ErrorBusTravelDetails.destination = $scope.blockingData.destination;
	  $scope.ErrorBusTravelDetails.depDate = $scope.blockingData.onwardDate;
	  
	$scope.bookingConfirmation = function(){
		  $scope.bookconfirmloader =true;
		busServices.busBookingB2B($scope.bookingVocherData).then(function(response){
		// $http.get('busVocher.json').then(function(response){			
			var bookdata = response.data;
			if(bookdata.status == null){
				$scope.errormeg = "Booking Failed";					 		
				$scope.errorDisplay($scope.errormeg,$scope.ErrorBusTravelDetails);
			}
			else if(bookdata.status.code == 1){
				  $scope.bookconfirmloader =false;
				$scope.orderId = bookdata.orderId;
				$scope.calldataplugin($scope.orderId)
			}else 	if(bookdata.status.code == 0){
				$scope.errormeg = "Booking Failed";					 		
				$scope.errorDisplay($scope.errormeg,$scope.ErrorBusTravelDetails);
			}else{
				$scope.errormeg = "Booking Failed";					 		
				$scope.errorDisplay($scope.errormeg,$scope.ErrorBusTravelDetails);
			}
						
		},function(){
			$scope.errormeg = "Booking Failed";					 		
			$scope.errorDisplay($scope.errormeg,$scope.ErrorBusTravelDetails);
		});
	};
	
	  $scope.calldataplugin = function(orderValue)
	  {
		   $scope.bookconfirmloader =true;
	          var ApiURL=  $scope.apiUrl;
	            var formURL = ApiURL+'Email/getHtmlTemplateById?orderid='+orderValue+'&emailType=88';     
	          
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
	            		  $scope.calldataplugin('');
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
		//Download or Open PDF
		$scope.downloadFile = function () {
			$scope.pdfloader = true;
			var data = "";
			if($scope.orderId!=undefined)
				data = "orderids="+$scope.orderId;
			else
				data = "orderids="+$scope.orderId;

			busServices.downloadPdfFile(data).then(function(response){
				
				var url = response.config.url; 
				window.location.href = url;
				$scope.pdfloader = false;
			

			},function(){
				// console.log(data);
			});
		};
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
		  
		  $scope.errorDisplay = function(msg,paramDetails){
				 $(document).ready(function(){
					var modalInstance = $modal.open({
					animation: $scope.animationsEnabled,
					templateUrl: 'views/busErrorDisplay.jsp',
					controller:'busErrorDisplayCtrl',
					backdrop:'static',
					keyboard:false,
					resolve:{
						items:function(){
							return msg;
						},
						items2:function(){
							return paramDetails;
						}
					}});
					modalInstance.result.then(function(selectedItem){
				},function(){
					$log.info('modal Dismissed at :'+new Date());
				});
					
				});
			}
	$scope.init();
	
});