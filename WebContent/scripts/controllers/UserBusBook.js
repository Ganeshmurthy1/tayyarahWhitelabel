var app = angular.module('myApp');
app.controller('UserBusBookCtrl', function($scope,localStorageService,busServices,$location,commonService,$modal,$log,$route,$http) {
	$scope.init = function(){
		$scope.busBooking = {};		
		$scope.bookingComments  = "";
		$scope.pdfloader = false;
		$scope.errordiv = false;	 
		$scope.bookconfirmloader = false;
		$scope.contentloaded = false;		
		$scope.busBooking.app_key = "zqJ3R9cGpNWgNXG55ub/WQ==";
		$scope.busBooking.paymentId = $location.search().orderid;
		if($location.search().payment_status == 1){
			$scope.paymentStats = "Success";
		}else{
			$scope.paymentStats = "Failed";
		}
		$scope.busBooking.paymentStatus = $scope.paymentStats;
		$scope.busBooking.responseMessage = $location.search().response_message;
		if($location.search().response_code == 1){
			$scope.resp_code = 0;
		}else{
			$scope.resp_code = 1;
		}
		$scope.busBooking.responseCode = $scope.resp_code;
		$scope.bookingComments  = "";
		$scope.BookingConformation();
		$scope.apiUrl = commonService.baseUrl;
		$scope.successprint=false;  
		$scope.orderId ={};
		$scope.errorloader = false;
	}

	function pad(n){return n<10 ? '0'+n : n};
	var data;
	$scope.BookingConformation = function(){
		$scope.bookconfirmloader = true;
		busServices.busBookingB2C($scope.busBooking).then(function(res){
			//$http.get('userbusBook.json').then(function(res){
			data = res.data;
			if(data.status.code == 1){			
				$scope.bookconfirmloader = false;			
				$scope.contentloaded = true;				
				$scope.orderid = data.orderId;
				// $scope.orderId = "TYBU9";
				$scope.calldataplugin($scope.orderId);					
			}else if(data.status.code == 0){
				$scope.bookconfirmloader = false;				
				$scope.errorloader = true;
			}
		},function(errorResponse){			
			$scope.bookconfirmloader = false;				
			$scope.errorloader = true;
		});
	};
	
	$scope.calldataplugin = function()
	{		 
		var ApiURL=  $scope.apiUrl;
		var orderIDs = $scope.orderid;		
		var formURL = ApiURL+'Email/getHtmlTemplateById?orderid='+orderIDs+'&emailType=88';     
		$.ajax({
			url : formURL,
			type : "GET",
			dataType : "html",
			success : function(data,textStatus,jqXHR) { 
				$scope.bookconfirmloader =false;
				if (jqXHR.status == 200) {
					$scope.successprint=true;
					$scope.successprintRound = false;
					if(data == 'Data is not avaible currently, Plese try again later'){
						$scope.calldataplugin('');
					}else{
						$("#display-api-content").html(data);
					}
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
		if($scope.orderId != undefined)
			data = "orderids="+$scope.orderid;
		else
			data = "orderids="+$scope.orderid;

		busServices.downloadPdfFile(data).then(function(response){
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

	$scope.ReloadToindex = function(){
		window.location.href = window.location.href.replace(/#.*$/, '');	}
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
