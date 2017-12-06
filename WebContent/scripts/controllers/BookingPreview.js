var app = angular.module('myApp');
app.controller('BookingPreviewCtrl', function ($scope,$modalInstance,flightServices,items1,items2,items3,items4,$filter,$log) {
	$scope.init = function(){
	 }
	$scope.sindex= items3;
	if(items4 && items4 != 'undefined'){
		$scope.spclindex = items4.spclindex;
		$scope.totelprice = items4.amount;
	}


	$scope.fareflightsegment = items1.fareFlightSegment;
	$scope.passengerDetails = items2.passengerdetailsList;
	if(items1.specialFareFlightSegment != null){
		$scope.specialFareFlightSegment = items1.specialFareFlightSegment;
	}

	angular.forEach($scope.passengerDetails, function(obj) { 
		if(obj.passportNo==""){
			$scope.passport=obj.passportNo;
		}
		$scope.passport=obj.passportNo;

	});

	$scope.getlayovercompare = function(obj1,arrobj,depobj)
	{
		var arrtime = new Date(arrobj);
		var deptime = new Date(depobj);
		var tseconds = (deptime.getTime() - arrtime.getTime()  )/1000;    
		var contomin = tseconds / 60 ;

		var conversions = {
				'ss': angular.identity,
				'mm': function(value) { return value * 60; },
				'hh': function(value) { return value * 3600; }
		};

		var padding = function(value, length) {
			var zeroes = length - ('' + (value)).length,
			pad = '';
			while(zeroes-- > 0) pad += '0';
			return pad + value;
		};

		var totaldur = 0;
		angular.forEach(obj1, function(obj,index) {
			totaldur = totaldur + parseInt(obj.duration);         
		});

		totaldur = totaldur + contomin;

		var totalSeconds = conversions['ss'](totaldur * 60),
		hh = Math.floor(totalSeconds / 3600),
		mm = Math.floor((totalSeconds % 3600) / 60),
		ss = totalSeconds % 60;

		var format = 'hhh mmm';
		var isPadded = angular.isDefined(isPadded)? isPadded: true;
		hh = isPadded? padding(hh, 2): hh;
		mm = isPadded? padding(mm, 2): mm;
		ss = isPadded? padding(ss, 2): ss;

		return format.replace(/hh/, hh).replace(/mm/, mm);
	}
	$scope.continueBooking = function(){
		$modalInstance.close('ok');
	}
	$scope.cancel = function () {
		$modalInstance.dismiss('');
	};
	$scope.init();
});