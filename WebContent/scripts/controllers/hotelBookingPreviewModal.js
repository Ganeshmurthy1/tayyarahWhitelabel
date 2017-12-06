var app = angular.module('myApp');
app.controller('hotelBookingPreviewModalCtrl', function ($scope,$modalInstance,flightServices,items1,items2,items3,$filter,$log) {

$scope.hotelimage= items1.rs.basicPropertyInfo.imageurl.replace(/_TN/g, "");
$scope.hotelinfo = items1.rs;
$scope.searchdata = items1.hotelSearchCommand;
$scope.ProfileDetails = items2.profiles;
$scope.totalPayable = items3;

$scope.getroomtypename = function(roomTypeCode)
{
	var roomtypename = "";
	angular.forEach($scope.hotelinfo.roomTypes.roomTypes, function(value,index) { 
		if(value.roomTypeCode == roomTypeCode)
		{
			roomtypename = value.roomType;
		}			
	});		
	return roomtypename;
}

$scope.continueBooking = function(){
	$modalInstance.close('ok');
}

$scope.cancel = function () {
    $modalInstance.dismiss('');
};

});