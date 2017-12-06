var app = angular.module('myApp');
app.controller('UserHotelBookCtrl', function($scope,localStorageService,hotelServices,$location,$http,commonService,$modal,$log,$route) {

	$scope.init = function(){
		$scope.bookingParams = {};		
		var appkey = "zqJ3R9cGpNWgNXG55ub/WQ==";
		$scope.bookingParams.appkey = appkey;
		$scope.bookingParams.refno = $location.search().orderid;
		$scope.bookingParams.transaction_id = $location.search().transaction_id
		$scope.bookingParams.payby = 'card';
		$scope.bookingParams.response_message = $location.search().response_message;
		$scope.bookingParams.response_code =  $location.search().response_code;
		$scope.bookingParams.payment_status = $location.search().payment_status;
		$scope.bookingParams.AuthCode =  $location.search().AuthCode;
		$scope.hotelBook();	
		$scope.bookconfirmloader = true;	
		$scope.display = "none";
		$scope.errordiv = false;
		$scope.pdfloader = false;
		$scope.apiUrl = commonService.baseUrl;
	}

	$scope.ErrorModalData = {};
	$scope.ErrorModalData.city = "";
	$scope.ErrorModalData.checkin = "";
	$scope.ErrorModalData.checkout = "";
	$scope.ErrorModalData.noofrooms = "";
	$scope.ErrorModalData.rooms = "";
	$scope.ErrorModalData.showData = false;

	$scope.hotelBook = function(){
		hotelServices.hotelBook($scope.bookingParams).then(function(response){
			//$http.get('price.json').then(function(response){
			var data = response.data;
			$scope.orderid = data.book.orderid;
			if(data.status.code == '1')
			{
				if(data.bookRes.status.code == '1')
				{
					angular.element('#hotelorder').val($scope.orderid);
					var formURL = $scope.apiUrl+"Email/getHtmlTemplateById?orderid="+$scope.orderid+"&emailType=1";
					$.ajax({
						url : formURL,
						type : "GET",
						dataType : "html",
						success : function(data,textStatus,jqXHR) {
							if (jqXHR.status == 200) {
								$scope.bookconfirmloader = false;
								$scope.PdfShowDiv = true;
								$("#display-api-content").html(data);
								setInterval(function() {
									$("#display-api-content").show();
								}, 1000); 
							} 
						},
						error : function(jqXHR,textStatus,errorThrown) {							
							$scope.bookconfirmloader =false;
							$scope.PdfShowDiv = true;
							$(".display-api-content").html("We could not get the content, please contact administrator.");

						}
					});
					$scope.display = "block";
					$scope.bookconfirmloader = false;
				}
				else
				{
					$scope.display = "none";
					$scope.errordiv = true;
					$scope.bookconfirmloader = false;
					$scope.errormeg =  "Booking Failed. Your Order Id is "+$scope.orderid+",Please Contact Customer Care.";
					$scope.bookingComments = "Booking Failed. Your Order Id is "+$scope.orderid+",Please Contact Customer Care.";
				}		 
			}
			else
			{
				$scope.errordiv = true;
				$scope.errormeg =  "Payment Failed. Please Try Again.";			
				$scope.errorDisplay($scope.errormeg,$scope.ErrorModalData);	
			}
		},function(){
			$scope.errordiv = true;
			$scope.errormeg =  "Payment Failed. Please Try Again.";			
			$scope.errorDisplay($scope.errormeg,$scope.ErrorModalData);	

		});
	};

	$scope.downloadFile = function () {

		$scope.pdfloader = true;
		var data = "orderids="+$scope.orderid;
		// console.log("pdf",data)
		hotelServices.downloadPdfFile(data).then(function(response){
			var url = response.config.url;
			window.location.href = url;
			$scope.pdfloader = false;		  
		},function(error){
			$scope.bookingComments = error.data.debugMessage;			
			$scope.bookconfirmloader = false;
			$scope.errordiv = true;
			$scope.resultset = false;
			$scope.display = "none";
		});
	};

	$scope.reloadToIndex = function(){
		window.location.href = window.location.href.replace(/#.*$/, '');
	}

	/*Show Error Message and Research on Error modal*/
	$scope.errorDisplay = function(errorMsg,Parameters){
		$(document).ready(function(){
			var modalInstance = $modal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'views/hotelErrorSearch.jsp',
				controller:'HotelErrorSearchCtrl',
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

	$scope.init();

});