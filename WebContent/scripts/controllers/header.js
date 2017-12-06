var app = angular.module('myApp');
app.controller('HeadCtrl', function($scope,transporter,$interval,$location,flightServices,$filter,$modal,$log,commonService,$rootScope,$http) {

	$scope.init = function(){
		$scope.NotifyCount = false;
		$scope.compIdd = angular.element('#cmpanyId').val();
		$scope.useridd = angular.element('#userid').val();
		if($scope.compIdd != undefined && $scope.useridd != undefined){
			//$scope.showNotifications();
			$scope.walletBalance();			
		}
		$scope.isAdminDashboard=true;
		if(commonService.AdminbaseUrl=='https://dev.tayyarah.com/devadmin/'){
			$scope.isAdminDashboard=false;
		}

		$scope.AdminDashboardUrl = commonService.AdminbaseUrl+"IBELogin"; 	

		$scope.adminimageid=angular.element('#Logo').val();
		$scope.WhiteLabelLogo =commonService.AdminbaseUrl+"WhiteLabelImageAction.action?imageId="+$scope.adminimageid;
	};	 



	$scope.comp = angular.element('#cmpanyId').val();
	if($scope.comp == "" ){
		transporter.getDirectUser().then(function(response){
			$('#oky').val(response.data.jsonResult.appkey);
			$('#hky').val(response.data.jsonResult.appkey);			
		},function(){
			//console.log("DirectUserError")
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

	$scope.isActive = function (viewLocation) { 
		return viewLocation === $location.path();
	};
	$scope.walletBalance = function(){	
		transporter.getwallet().then(function(response){			
			var agentbal = Math.round(response.data.jsonResult.walletbal).toFixed(2);
			var depBal=Math.round(response.data.jsonResult.walletdepbal).toFixed(2);			
			$scope.agentDepbal = ""
				$scope.agentbal=$scope.addCommas(agentbal);
			if(depBal == "NaN"){
				$scope.agentDepbal='0.00';
			}else{
				$scope.agentDepbal=$scope.addCommas(depBal);
			}
		},function(){
			//console.log("walleterror")
		});
	}

	$scope.addCommas = function(num) {
		num=num.toString();
		var afterPoint = '';
		if(num.indexOf('.') > 0)
			afterPoint = num.substring(num.indexOf('.'),num.length);
		num = Math.floor(num);
		num=num.toString();
		var lastThree = num.substring(num.length-3);
		var otherNumbers = num.substring(0,num.length-3);
		if(otherNumbers != '')
			lastThree = ',' + lastThree;
		var bal = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;

		return bal;
	}

	$scope.returnIndex = function(e){
		window.location.href = window.location.href.replace(/#.*$/, '');

	}
	$scope.returnHotelIndex = function(){

		window.location.href = window.location.href.replace(/#.*$/ , '#/hotel');
		location.reload();

	}
	$scope.returnBusIndex = function(e){
		window.location.href = window.location.href.replace(/#.*$/ , '#/bus');
		location.reload();

	}
	$scope.showNotifications = function(){
		var getNotification = {};
		getNotification.companyId = angular.element('#cmpanyId').val();
		getNotification.userId= angular.element('#userid').val();
		flightServices.getCountNotification(getNotification).then(function(response){

			$scope.allData = response;
			$scope.notificationCount = response.data.count;
			if($scope.notificationCount > 0){
				$scope.NotifyCount = true;
			}else{
				$scope.NotifyCount = false;
			}		
		});
		return $scope.allData;
	}
	//Notification Deatils showing
	$scope.NoteArray = [];
	$scope.showDetailNotifications = function(){		
		var detailedData = $scope.showNotifications();		
		$scope.NoteDetails = detailedData.data.notications;		
	}
	// Hours Converter of the days
	$scope.convertToHours = function(ms) {
		var result = "";
		var date_now = new Date();
		var date_future = new Date(ms);
		// get total seconds between the times
		var delta = Math.abs(date_future - date_now) / 1000;
		// calculate (and subtract) whole days
		var days = Math.floor(delta / 86400);
		delta -= days * 86400;
		// calculate (and subtract) whole hours
		var hours = Math.floor(delta / 3600) % 24;
		delta -= hours * 3600;
		// calculate (and subtract) whole minutes
		var minutes = Math.floor(delta / 60) % 60;
		delta -= minutes * 60;
		// what's left is seconds
		var seconds = delta % 60; // in theory the modulus is not required
		if (days == 0 && hours != 0)
			result = hours + " hours ago";
		if (days == 0 && hours == 0)
			result = minutes + " minutes ago";
		if (days != 0)
			result = days + " days ago ";
		return result;
	}


	$scope.viewdetail = function(index,value){
		$scope.items = value;
		var modalInstance = $modal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'views/detailedNotification.jsp',
			controller: 'detailedNotificationCtrl',
			backdrop: 'static',
			keyboard: false,
			resolve: {
				items: function () {
					return $scope.items;
				}
			}
		});

		modalInstance.result.then(function (selectedItem) {
			$scope.showNotifications();

		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	}

	$scope.markallasread = function(){
		var NotificationData = {};
		NotificationData.companyId = angular.element('#cmpanyId').val();
		NotificationData.userId= angular.element('#userid').val();
		flightServices.expireAllNotification(NotificationData).then(function(response){						
			$scope.showNotifications();
		})
	}

	if($scope.compIdd != undefined && $scope.useridd != undefined){
		$interval( function(){$scope.walletBalance();}, 60000);
	}		
	$scope.init();
});