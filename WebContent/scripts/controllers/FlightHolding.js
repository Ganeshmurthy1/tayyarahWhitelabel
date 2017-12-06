var app = angular.module('myApp');
app.controller('FlightHoldingCtrl', function($scope,localStorageService,transporter,flightServices,$http,$location,commonService) {
	$scope.init = function(){
		$scope.FlightHoldData =localStorageService.get('Agentholddata');
		$scope.cnfrmApp_key = $scope.FlightHoldData.app_key;
		$scope.BookingHeld();
		var data;
		$scope.adultarray = [];
		$scope.childarray = [];
		$scope.infantarray = [];
		$scope.apiUrl = commonService.baseUrl;
		if($scope.FlightHoldData == null || $scope.FlightHoldData == undefined || $scope.FlightHoldData.app_key == null || $scope.FlightHoldData.app_key == undefined ){
			$scope.ticketprocessloader = false;
			$location.path('/SessionOut');

		}
	}

	function pad(n){return n<10 ? '0'+n : n}

	$scope.ErrorFlightTravelDetails = {};
	$scope.ErrorFlightTravelDetails.origin = "";
	$scope.ErrorFlightTravelDetails.destination = "";
	$scope.ErrorFlightTravelDetails.depDate = "";
	$scope.ErrorFlightTravelDetails.arvlDate = "";
	$scope.ErrorFlightTravelDetails.cabinClass = "";
	$scope.ErrorFlightTravelDetails.showData = false;

	$scope.BookingHeld = function(){
		$scope.bookconfirmloader = true;
		flightServices.FlightHoldbooking($scope.FlightHoldData).then(function(response){
			//$http.get('holdbooking.json').then(function(response){
			$scope.bookconfirmloader = false;
			$scope.contentloaded = true;
			data = response.data;
			$scope.CnfrmUserid = data.flightCustomerDetails.userid;
			$scope.Cnfrmusername = data.flightCustomerDetails.username;
			$scope.Cnfrmtransactionkey = data.transactionKey;
			$scope.CnfrmPrice_key = data.flightCustomerDetails.price_key;
			$scope.pnr =data.pnr;	
			$scope.totalflightprice = parseFloat(data.finalPriceWithGST).toFixed(2);
			$scope.bookingComments = data.bookingComments;
			$scope.returnconfirmationNumber = response.data.confirmationNumberSpecial;
			$scope.confirmationNumber = response.data.confirmationNumber;

			if(response.data.fareFlightSegmentSpecial != null){

				$scope.orderid = $scope.confirmationNumber;
				$scope.orderid2 = $scope.returnconfirmationNumber
				$scope.calldataplugin();
			}
			else{
				$scope.orderid = $scope.confirmationNumber;
				$scope.calldataplugin();
			}

			//$scope.getbal(); 

		},function(err){
			$scope.bookingComments = "Booking Failed";			
			$scope.errordiv = true;
			$scope.errorDisplay($scope.bookingComments,$scope.ErrorFlightTravelDetails);
		});
	};

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

	$scope.calldataplugin = function()
	{
		$scope.bookconfirmloader =true;
		var ApiURL=  $scope.apiUrl;
		// console.log("ApiURL",ApiURL);
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
						$scope.calldataplugin('');
					}else{

						$("#display-api-Roundcontent").html(data);
						$scope.TicketingStatus = true;

					}
					$scope.getbal();
				} 
			},
			error : function(jqXHR,textStatus,errorThrown) {
				$(".display-api-content").html("We could not get the content, please contact administrator.");
			}
		});  
	}

	$scope.ConfirmCancel = function()
	{
		$scope.ticketprocessloader = true;
		var ApiURL=  $scope.apiUrl;
		// console.log("ApiURL",ApiURL);
		var formURL = ApiURL+'Email/getHtmlTemplateById?orderid='+$scope.orderid+'&emailType=2';     

		$.ajax({
			url : formURL,
			type : "GET",
			dataType : "html",
			success : function(data,textStatus,jqXHR) { 

				if (jqXHR.status == 200) {
					$scope.ticketprocessloader = false;
					$scope.successprint=true;
					$scope.successprintRound = false;
					if(data == 'Data is not avaible currently, Plese try again later'){
						$scope.ConfirmCancel('');
					}else{
						$("#display-api-Roundcontent").html(data);
						$scope.TicketingStatus = false;
						localStorageService.remove('Agentholddata');

					}
					$scope.getbal();
				} 
			},
			error : function(jqXHR,textStatus,errorThrown) {
				$(".display-api-content").html("We could not get the content, please contact administrator.");
			}
		});  
	}


	var agentWalletBalance;
	var agentDepositBalance;
	$scope.getbal = function()
	{
		transporter.getwallet().then(function(response){
			var myEl = angular.element( document.querySelector( '#agentbal' ) );
			myEl.text(response.data.jsonResult.walletbal) ;
			var deposit = angular.element( document.querySelector( '#agentDepbal' ) );
			deposit.text(response.data.jsonResult.walletdepbal) ;
			agentWalletBalance = response.data.jsonResult.walletbal;
			agentDepositBalance = response.data.jsonResult.walletdepbal;
		});
	}

	function escapeRegExp(string) {
		return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
	}

	function replaceAll1(string, find, replace) {
		return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
	}

	$scope.showmodel = function(requesttype){
		if(requesttype == 'Confirm'){
			$scope.modeltitle = "Confirm Ticket";
			$scope.modelcontent = "Do you want to confirm your PNR ";
		}

		if(requesttype == 'Release'){
			$scope.modeltitle = "Release Ticket";
			$scope.modelcontent = "Do you want to release your PNR ";
		}

		if(requesttype == 'Proceed'){
			if($scope.modeltitle == 'Confirm Ticket'){
				$scope.ticketprocessloader = true;
				$scope.processcomments = "Please wait while we are confirm your PNR " + $scope.pnr;
				$scope.confirmticket();
			}
			if($scope.modeltitle == 'Release Ticket'){
				$scope.ticketprocessloader = true;
				$scope.processcomments = "Please wait while we are release your PNR " + $scope.pnr;
				$scope.cancelorreleaseticket();
			}
		}
	}

	var confirmdata;
	$scope.confirmticket = function(){
		confirmdata = {"userid":$scope.CnfrmUserid,"username":$scope.Cnfrmusername,"paymode":"cash",
				"transactionkey":$scope.Cnfrmtransactionkey,"price_key":$scope.CnfrmPrice_key,
				"app_key":$scope.cnfrmApp_key,"orderid":$scope.confirmationNumber,"requesttype":0};

		if(agentDepositBalance >= $scope.totalflightprice){
			$scope.ConfirmingHoldBooking();
		}else if(agentWalletBalance >= $scope.totalflightprice){
			$scope.ConfirmingHoldBooking();
		}else if(agentWalletBalance == 0){
			$scope.insufficientFundopen();
			$scope.bookconfirmloader = false;
		}else{
			$scope.insufficientFundopen();
			$scope.bookconfirmloader = false;
		}
	};


	$scope.ConfirmingHoldBooking = function(){
		$scope.TicketingStatus = true;
		$scope.ticketprocessloader = true;
		flightServices.ConfirmHeldTicket(confirmdata).then(function(response){
			$scope.bookconfirmloader = false;
			$scope.contentloaded = true;
			$scope.ticketprocessloader = false;
			data = response.data;
			$scope.returnconfirmationNumber = data.confirmationNumberSpecial;
			$scope.confirmationNumber = data.confirmationNumber;
			if(data.fareFlightSegmentSpecial != null){
				$scope.orderid = $scope.confirmationNumber;
				$scope.orderid2 = $scope.returnconfirmationNumber
				$scope.ConfirmCancel();
				$scope.TicketingStatus = false;
			}
			else{
				$scope.orderid = $scope.confirmationNumber;
				$scope.ConfirmCancel();
				$scope.TicketingStatus = false;
			}

		},function(res){
			$scope.bookingComments = "Ticketing Failed.Try Again";			
			$scope.ticketprocessloader = false;
			$scope.errordiv = true;
		});
	}

	$scope.cancelorreleaseticket = function(){
		$scope.ticketprocessloader = true;
		var canceldata = {"userId":$scope.CnfrmUserid,"password":"some","appKey":$scope.cnfrmApp_key,
				"orderId":$scope.confirmationNumber,"remarks":"Test","methodtype":"0",
				"requesttype":"1","cancellationtype":"3"};
		flightServices.cancelHeldTicket(canceldata).then(function(response){

			$scope.bookingComments = response.data.bookstatus;
			$scope.ticketprocessloader = false;
			$scope.orderid = response.data.orderid;
			$scope.ConfirmCancel();
			$scope.TicketingStatus = false;
		},function(){
			$scope.bookingComments = "Ticket Cancellation Failed.Try Again";			
			$scope.ticketprocessloader = false;
			$scope.errordiv = true;
		});
	};

	//Download or Open PDF
	$scope.downloadFile = function () {
		$scope.pdfloader = true;
		var data = "";
		if($scope.returnconfirmationNumber!=undefined)
			data = "orderids="+$scope.confirmationNumber+'","'+$scope.returnconfirmationNumber;
		else
			data = "orderids="+$scope.confirmationNumber;

		flightServices.downloadPdfFile(data).then(function(response){
			var filename = "FlightVoucher";	     
			// var contentType = headers['content-type'];
			var linkElement = document.createElement('a');
			try {
				var url = response.config.url;

				// this code for download PDF File
				linkElement.setAttribute('href', url);
				linkElement.setAttribute('target',"_blank");
				//linkElement.setAttribute("download", filename);

				var clickEvent = new MouseEvent("click", {
					"view": window,
					"bubbles": true,
					"cancelable": false
				});
				linkElement.dispatchEvent(clickEvent);
				$scope.pdfloader = false;
				// Open pdf in new window
				// $window.open(url);
			} catch (ex) {
				// console.log(ex);
			}
		},function(){
			// console.log(data);
		});
	};

	$scope.returnToindex = function(){
		window.location.href = window.location.href.replace(/#.*$/, '');
	};
	$scope.init();
});