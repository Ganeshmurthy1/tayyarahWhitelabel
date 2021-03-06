/**
 *Author : Prabhakaran
 *Description: hotel list page code redefined and listed the functionality.
 **/

var app = angular.module('myApp');
app.controller('hotelDetailCtrl',['$scope','localStorageService','hotelServices','$http','$parse','$location','$modal','$log','$route', function($scope,localStorageService,hotelServices,$http,$parse,$location,$modal,$log,$route) {

	$scope.init = function(){
		$scope.hotelChoose = {};
		$scope.hoteluser = {};
		$scope.hotelcitychoose = {};
		$scope.bookloader = true;
		$scope.errordiv = false;
		$scope.hotelDetailsTemplate = false;
		$scope.hotelChoose = {};
		$scope.searchcitycode = $location.search().citycode;
		$scope.searchcityname = $location.search().city;
		$scope.hotelChoose.appkey =$location.search().roomApkey;
		$scope.hotelChoose.hotelcode = $location.search().hotelCode;
		$scope.hotelChoose.searchkey =$location.search().roomsearchKey;
		$scope.RoomLisiting();
		var data ;
		$scope.Theme = $location.search().thm;
		$scope.imageFilter = 'views/hotel-Details-'+$scope.Theme+'Image.jsp';
		$scope.mainContent = 'views/hotel-Details-'+$scope.Theme+'Content.jsp';
		$scope.MapContent = 'views/hotel-Details-'+$scope.Theme+'Map.jsp';
	}

	$scope.ErrorModalData = {};
	/*	$scope.ErrorModalData.city = "";
	$scope.ErrorModalData.checkin = "";
	$scope.ErrorModalData.checkout = "";
	$scope.ErrorModalData.noofrooms = "";
	$scope.ErrorModalData.rooms = "";
	$scope.ErrorModalData.showData = false;*/


	$scope.ErrorModalData.city = $location.search().city;
	$scope.ErrorModalData.cityCode = $location.search().citycode;
	$scope.ErrorModalData.checkin = $location.search().datain;
	$scope.ErrorModalData.checkout = $location.search().dateout;
	$scope.ErrorModalData.noofrooms = $location.search().noofrooms;
	$scope.ErrorModalData.rooms = $location.search().rooms;	
	$scope.ErrorModalData.noofadults = $location.search().adt;
	$scope.ErrorModalData.noofchilds  =  $location.search().chd;
	$scope.ErrorModalData.showData = false;	 
	localStorageService.set('HotelErrordata',$scope.ErrorModalData);	

	/*Room-listing api service*/
	$scope.RoomLisiting = function(){
		$scope.hotelDetailsContent = false;
		$scope.hotelDetailsTemplate = true;
		$scope.hidePoliciesTemplates = false;
		$scope.display = "block";
		hotelServices.Roomdetails($scope.hotelChoose).then(function(response){
			//$http.get('hotelRoom.json').then(function(response){
			$scope.bookloader = false;
			$scope.hotelDetailsContent = true;
			$scope.hotelDetailsTemplate = false;
			$scope.hidePoliciesTemplates = true;
			data = response.data;
			//console.log("response",data);
			if(data.status.code == '1')
			{
				$scope.basic = null;
				$scope.HotelResult = data.rs;
				results = data.rs;	
				$scope.searchdata = data.hotelSearchCommand;
				$scope.appkey = data.hotelSearchCommand.apikey;
				$scope.noofrooms=data.hotelSearchCommand.noofrooms;
				var noofadults=0;
				var noofChild=0;
				angular.forEach(data.hotelSearchCommand.roomrequests, function(obj,index) {
					noofadults +=obj.noofAdult;
					noofChild +=obj.noofChild;
				});
				$scope.noofadults=noofadults;
				$scope.noofChild=noofChild;
				$scope.searchkey = data.searchKey;
				$scope.hotelCode = data.rs.basicPropertyInfo.hotelCode;
				$scope.RoomGroup = data.rs.RoomGroups;
				var roomGroupArrayTemp = [];
				for(var roomgroupindex=0;roomgroupindex<$scope.searchdata.noofrooms;roomgroupindex++) {	
					roomGroupArrayTemp.push(roomgroupindex);					
				}
				var indexarraytemp = [];
				for (var i=0; i<$scope.noofrooms; i++) {
					indexarraytemp.push(i);
				}
				$scope.indexarray = indexarraytemp;
				$scope.roomGroupArray = roomGroupArrayTemp;
				$scope.Roomrateobj =  data.rs.roomRates.roomRates;		
				var latitude = results.basicPropertyInfo.position.latitude;
				var longitude = results.basicPropertyInfo.position.longitude;
				var hotelname = $scope.HotelResult.basicPropertyInfo.hotelName;
				var isOffline = results.basicPropertyInfo.isOfflineBooking;
				var roomreqsarray = []; /* If you have no data to put in yet. */
				$scope.isavilablemap=false;
				/*map validation*/
				if((latitude == '' && longitude == '')||(latitude ==undefined && longitude ==undefined)||isOffline==true)
				{
					$http.get('//maps.googleapis.com/maps/api/geocode/json?address='+data.rs.basicPropertyInfo.address.addressLines[0]).then(function (response) {
						if(response.data.results[0]==undefined){
							$scope.isavilablemap=false;
						}
						else{
							$scope.isavilablemap=true;
							latitude = response.data.results[0].geometry.location.lat;
							longitude = response.data.results[0].geometry.location.lng;	
							var mynewCenter=new google.maps.LatLng(latitude,longitude);
							var mapProp = {
									center:mynewCenter,
									zoom: 14,
									draggable: true,
									scrollwheel: false,
									mapTypeId:google.maps.MapTypeId.ROADMAP,
									title:  hotelname
							};
							marker=new google.maps.Marker({
								position:mynewCenter
							});
							map=new google.maps.Map(document.getElementById("resultmap-canvas"),mapProp);
							marker.setMap(map);
							google.maps.event.addListener(marker, 'click', function() {
								infowindow.setContent(hotelname);
								infowindow.open(map, marker);
							});			
						}
					});
				}
				else
				{
					$scope.isavilablemap=true;
					var mynewCenter=new google.maps.LatLng(latitude,longitude);
					//console.log("2",mynewCenter);
					var mapProp = {
							center:mynewCenter,
							zoom: 14,
							draggable: true,
							scrollwheel: false,
							mapTypeId:google.maps.MapTypeId.ROADMAP,
							title:  hotelname
					};
					marker=new google.maps.Marker({
						position:mynewCenter
					});
					var infowindow = new google.maps.InfoWindow({
						content: hotelname
					});
					//console.log("mapProp",mapProp);
					map=new google.maps.Map(document.getElementById("resultmap-canvas"),mapProp);
					marker.setMap(map);
					google.maps.event.addListener(marker, 'click', function() {
						infowindow.setContent(hotelname);
						infowindow.open(map, marker);
					}); 			
				}				
				var rooms = [];
				angular.forEach($scope.RoomGroup, function(roomgroupindexvalue,roomgroupindex) {
					//console.log("################### room group found " +roomgroupindex );
					if(roomgroupindex == 0)
					{
						if(roomgroupindexvalue.InfoSource == 'FixedCombination' || roomgroupindexvalue.InfoSource == 'Fixed Combination')
						{
							//console.log("################### room group found fixed combination" +roomgroupindex );
							angular.forEach(roomgroupindexvalue.RoomCombination, function(value,index) {	
								//console.log("################### room group found fixed combination" +index );
								if(index == 0)
								{
									angular.forEach(value.RoomIndex, function(roomindexvalue,roomindex) {
										roomreqsarray.push({reqindex: roomindex, name: $scope.getselectroomtype(roomindexvalue), price: $scope.getroomrateusingindex(roomindexvalue), bookingcode:$scope.getselectbookingcode(roomindexvalue), roomindex:roomindexvalue, apiProvider:roomgroupindexvalue.ApiProvider});  
									});
								}							

							});
						}
						else if(roomgroupindexvalue.InfoSource == 'OpenCombination' || roomgroupindexvalue.InfoSource == 'Open Combination')
						{	
							//console.log("################### room group found open combination" +roomgroupindex );

							angular.forEach(roomgroupindexvalue.RoomCombination, function(value,index) {
								angular.forEach(value.RoomIndex, function(roomindex, roomindexindex) {
									if(roomindexindex == 0)
									{
										roomreqsarray.push({reqindex: index, name: $scope.getselectroomtype(roomindex), price: $scope.getroomrateusingindex(roomindex), bookingcode:$scope.getselectbookingcode(roomindex), roomindex:roomindex, apiProvider:roomgroupindexvalue.ApiProvider});  

									}
								});	
							});
						}
					}
				});

				$scope.roomreqsarray = roomreqsarray;
				$scope.selectDefaults();
				$scope.bookloader = false;
				$(window).trigger("resize"); 
				$scope.errordiv = false;
				$scope.totalroomtype = 0;
				$scope.totalselecedrooms = $scope.searchdata.noofrooms;
				$scope.deaultselecedrooms = $scope.HotelResult.roomRates.roomRates[0].RoomTypeName;
				$scope.totalprice = parseFloat(parseFloat($scope.roomprice0) + parseFloat($scope.roomprice1) + parseFloat($scope.roomprice2) +  parseFloat($scope.roomprice3)).toFixed(2);
				$scope.room1loadoption = 'preload';
				$scope.room2loadoption = 'preload';
				$scope.room3loadoption = 'preload';
				$scope.room4loadoption = 'preload';
			}
			else
			{				
				$scope.errormeg = "Result Not Found. Please try again.";				
				$scope.errordiv = true;
				$scope.errorDisplay($scope.errormeg,$scope.ErrorModalData);	
			}
		},function(error){			
			$scope.errormeg = "Result Not Found. Please try again."
				$scope.errordiv = true;
			$scope.errorDisplay($scope.errormeg,$scope.ErrorModalData);	
		});
	};

	/*default romm selection*/ 
	$scope.selectDefaults = function() {
		angular.forEach($scope.roomreqsarray, function(roomreq, roomreqindex) {
			switch (roomreq.reqindex) {
			case 0:
				$scope.room0 = roomreq.roomindex;						
				break;
			case 1:
				$scope.room1 = roomreq.roomindex;						
				break;
			case 2:						
				$scope.room2 = roomreq.roomindex;					
				break;
			case 3:
				$scope.room3 = roomreq.roomindex;					
				break;
			default:

			}
		});		
	}

	$scope.clearDefaults = function(exceptIndex) {
		angular.forEach($scope.indexarray, function(obj, roomReqIndex) {
			if(roomReqIndex != exceptIndex)
			{
				switch (roomReqIndex) {
				case 0:
					$scope.room0 = undefined;						
					break;
				case 1:
					$scope.room1 = undefined;						
					break;
				case 2:						
					$scope.room2 = undefined;					
					break;
				case 3:
					$scope.room3 = undefined;					
					break;
				default:

				}
			}
		});		  
	}

	$scope.getTotal = function() {
		var total = parseInt(0);
		angular.forEach($scope.roomreqsarray, function(roomreq, roomreqindex) {
			total = parseFloat(total) + parseFloat(roomreq.price);					
		});
		return parseFloat(total).toFixed(2);  
	}

	$scope.disableIfNotSelected = function() {
		if($scope.roomreqsarray == undefined || $scope.indexarray == undefined)
			return true;
		if($scope.roomreqsarray.length == $scope.indexarray.length)
			return false;
		else
			return true;
	}

	$scope.isFixedGroupRoom = function(roomIndex) {
		var isFixedGroupRoom = false;
		angular.forEach($scope.RoomGroup, function(roomgroupindexvalue,roomgroupindex) {
			if(roomgroupindexvalue.InfoSource == 'FixedCombination' || roomgroupindexvalue.InfoSource == 'Fixed Combination')
			{
				angular.forEach(roomgroupindexvalue.RoomCombination, function(value,index) {	
					//console.log("################### room group found fixed combination" +index );						
					angular.forEach(value.RoomIndex, function(roomindexvalue,roomindex) {
						if(roomindexvalue == roomIndex)
							isFixedGroupRoom = true;
					});						
				});
			}			
		});
		return isFixedGroupRoom;
	}

	$scope.getApiProvider = function(roomIndexSelected) {
		var apiProvider = -1;
		angular.forEach($scope.RoomGroup, function(roomgroupindexvalue,roomgroupindex) {
			if(roomgroupindexvalue.InfoSource == 'FixedCombination' || roomgroupindexvalue.InfoSource == 'Fixed Combination')
			{
				angular.forEach(roomgroupindexvalue.RoomCombination, function(value,index) {	
					//console.log("################### room group found fixed combination" +index );						
					angular.forEach(value.RoomIndex, function(roomindexvalue,roomindex) {
						if(roomindexvalue == roomIndexSelected)
							apiProvider = roomgroupindexvalue.ApiProvider;
					});						
				});
			}
			else if(roomgroupindexvalue.InfoSource == 'OpenCombination' || roomgroupindexvalue.InfoSource == 'Open Combination')
			{
				angular.forEach(roomgroupindexvalue.RoomCombination, function(value,index) {
					angular.forEach(value.RoomIndex, function(roomindex, roomindexindex) {
						if(roomindex == roomIndexSelected)
						{
							apiProvider = roomgroupindexvalue.ApiProvider;
						}
					});	
				});
			}
		});
		return apiProvider;
	}

	$scope.getNumber = function(num) {
		var intnum = parseInt(num)
		return new Array(intnum);   
	}

	$scope.getCancelationPolicy = function(roomTypeCode,roomindex)
	{
		$scope.CancelationPolicies = [];
		var description = [];
		angular.forEach($scope.HotelResult.ratePlans.ratePlan, function(value,index) { 
			if(roomTypeCode = value.ratePlanCode)
			{
				if(roomindex == index){

					angular.forEach(value.cancelPenalties.cancelPenalties, function(cancelvalue,cancelindex) { 
						var cancellationtext = "";
						if(cancelvalue.nonRefundable != undefined){
							if(cancelvalue.nonRefundable == true) 
								cancellationtext = parseFloat(cancelvalue.amountPercent.amount).toFixed(2)+" % of total amount will be charged";
							else
								cancellationtext = parseFloat(cancelvalue.amountPercent.amount).toFixed(2)+" % of total amount will be charged, if you cancel between  "+cancelvalue.deadline.FromDate+" and "+cancelvalue.deadline.ToDate;
						}
						else{
							if(cancelvalue.amountPercent.basisType == "Amount")
								cancellationtext = parseFloat(cancelvalue.amountPercent.amount).toFixed(2)+" "+cancelvalue.amountPercent.currencyCode+" will be charged, if you cancel between  "+cancelvalue.deadline.FromDate+" to "+cancelvalue.deadline.ToDate;
							else if(cancelvalue.amountPercent.basisType == "Nights")
								cancellationtext = parseFloat(cancelvalue.amountPercent.amount).toFixed(2)+" Night of total amount will be charged, if you cancel between  "+cancelvalue.deadline.FromDate+" and "+cancelvalue.deadline.ToDate;
							else
								cancellationtext = parseFloat(cancelvalue.amountPercent.amount).toFixed(2)+" % of total amount will be charged, if you cancel between  "+cancelvalue.deadline.FromDate+" and "+cancelvalue.deadline.ToDate;
						}
						description.push(cancellationtext);
					});
				}
			}
		});

		if(description.length > 0)			
			$scope.CancelationPolicies = description;		
		else
			$scope.CancelationPolicies.push("No Information Avilable");
		$scope.$apply();
		return description
	}

	$scope.getroomrate = function(bookingCode)
	{
		var Price = 0;
		angular.forEach($scope.HotelResult.roomRates.roomRates, function(value,index) { 

			if(value.bookingCode == bookingCode)
			{
				Price = value.rates.rates[0].bookingPrice.amountBeforeTax;
			}
		});
		return Price.toFixed(2);
	}

	$scope.getroomrateusingindex = function(roomindex)
	{
		var Price = 0.0;
		angular.forEach($scope.HotelResult.roomRates.roomRates, function(value,index) { 

			if(value.RoomIndex == roomindex)
			{
				Price = value.rates.rates[0].bookingPrice.amountBeforeTax;
			}
		});
		return Price.toFixed(2);
	}

	$scope.getBasicPrice = function()
	{
		var Price = 0.0;
		var count = 0 ;
		angular.forEach($scope.HotelResult.roomRates.roomRates, function(value,index) { 
			if(count == 0)
			{
				Price = value.rates.rates[0].bookingPrice.amountBeforeTax;
			}
			count = count +1;
		});
		return Price.toFixed(2);
	}

	$scope.selectandchange =  function(roomReqIndexSelected , roomIndex)
	{		
		var anotherGroupSelected = false;
		//apiProvider:roomgroupindexvalue.ApiProvider
		var selectedRoomProvider = $scope.getApiProvider(roomIndex);
		angular.forEach($scope.roomreqsarray, function(roomreq,index) {
			if(roomreq.apiProvider != selectedRoomProvider)
			{
				anotherGroupSelected = true;
			}			
		});
		if(anotherGroupSelected)
		{	
			$scope.roomreqsarray = [];	
			$scope.clearDefaults(roomReqIndexSelected);
		}

		if($scope.isFixedGroupRoom(roomIndex))
		{
			//console.log("################### selecting room "+roomIndex+" for room req " +roomReqIndexSelected +" Fixed combination");						
			$scope.roomreqsarray = [];			
			//clear room selection 
			//auto select other rooms
			$scope.room0 = undefined;
			$scope.room1 = undefined;
			$scope.room2 = undefined;
			$scope.room3 = undefined;
			for(var roomcomboindex=0;roomcomboindex<$scope.searchdata.noofrooms;roomcomboindex++) {			
				if(roomReqIndexSelected != roomcomboindex )
				{
					//	console.log("### auto select for...roomgroupindex "+roomgroupindex);
					var targetRoomIndex = $scope.getRoomindex(roomReqIndexSelected, roomIndex, roomcomboindex);
					$scope.roomreqsarray.push({reqindex: roomcomboindex, name: $scope.getselectroomtype(targetRoomIndex), price: $scope.getroomrateusingindex(targetRoomIndex), bookingcode:$scope.getselectbookingcode(targetRoomIndex), roomindex:targetRoomIndex,apiProvider:selectedRoomProvider});  
					switch (roomcomboindex) {
					case 0:
						$scope.room0 = targetRoomIndex;						
						break;
					case 1:
						$scope.room1 = targetRoomIndex;						
						break;
					case 2:						
						$scope.room2 = targetRoomIndex;					
						break;
					case 3:
						$scope.room3 = targetRoomIndex;					
						break;
					default:

					}
				}
				else
				{
					$scope.roomreqsarray.push({reqindex: roomReqIndexSelected, name: $scope.getselectroomtype(roomIndex), price: $scope.getroomrateusingindex(roomIndex), bookingcode:$scope.getselectbookingcode(roomIndex), roomindex:roomIndex, apiProvider:selectedRoomProvider});  
				}
			}
			$('document').ready(function () { 
				$('.highlight').click(function () {    
					// alert("hi");
					$('#hotelbookHD').addClass('SetButtonActive'); 
				});
			});
		}
		else
		{
			// clear room selection array if any fixed is selected
			// keep the selected room in that index
			for(var roomcomboindex=0;roomcomboindex<$scope.searchdata.noofrooms;roomcomboindex++) {			
				if(roomReqIndexSelected == roomcomboindex )
				{
					switch (roomcomboindex) {
					case 0:
						$scope.room0 = roomIndex;						
						break;
					case 1:
						$scope.room1 = roomIndex;						
						break;
					case 2:						
						$scope.room2 = roomIndex;					
						break;
					case 3:
						$scope.room3 = roomIndex;					
						break;
					default:
					}
				}

			}
			var isNewSelection = true;
			var roomreqsarraytemp = [];
			//console.log("################### selecting room "+roomIndex+" for room req " +roomReqIndexSelected +" Open combination");
			angular.forEach($scope.roomreqsarray, function(roomreq,index) {
				if(roomreq.reqindex == roomReqIndexSelected)
				{
					isNewSelection = false;
					roomreqsarraytemp.push({reqindex: roomReqIndexSelected, name: $scope.getselectroomtype(roomIndex), price: $scope.getroomrateusingindex(roomIndex), bookingcode:$scope.getselectbookingcode(roomIndex), roomindex:roomIndex, apiProvider:selectedRoomProvider});  
				}
				else
				{
					roomreqsarraytemp.push(roomreq);
				}
			});
			if (roomreqsarraytemp.length == 0 || isNewSelection) {
				//new selection ..## first selection
				roomreqsarraytemp.push({reqindex: roomReqIndexSelected, name: $scope.getselectroomtype(roomIndex), price: $scope.getroomrateusingindex(roomIndex), bookingcode:$scope.getselectbookingcode(roomIndex), roomindex:roomIndex, apiProvider:selectedRoomProvider});  
			}
			$scope.roomreqsarray = roomreqsarraytemp;
			//$scope.roomreqsarray.push({reqindex: roomReqIndexSelected, name: $scope.getselectroomtype(roomIndex), price: $scope.getroomrateusingindex(roomIndex), bookingcode:$scope.getselectbookingcode(roomIndex), roomindex:roomIndex});  
		}
	}

	$scope.getselectbookingcode=function(roomIndex)
	{ 
		//console.log("room index ###########"+roomIndex);
		var selcetedbookingCode=0;
		angular.forEach($scope.HotelResult.roomRates.roomRates, function(value,index) { 
			if(roomIndex == value.RoomIndex){
				//console.log("value.RoomIndex ###########"+value.RoomIndex);
				selcetedbookingCode = value.bookingCode;
			}		
		});
		return selcetedbookingCode;		
	}

	$scope.getselectroomtype = function(roomIndex)
	{ 
		//console.log("room index ###########"+roomIndex);
		var selcetedroomtype = '';
		angular.forEach($scope.HotelResult.roomRates.roomRates, function(value,index) { 
			if(roomIndex == value.RoomIndex){
				//console.log("value.RoomTypeName ###########"+value.RoomTypeName);
				selcetedroomtype = value.RoomTypeName;
			}		
		});
		return selcetedroomtype;		
	}

	$scope.gettargetbookingcode=function(roomIndex,targetRoomGroupIndex)
	{ 
		for(var roomgroupindex=0;roomgroupindex<$scope.searchdata.noofrooms;roomgroupindex++) {	

			var targetbookingCode=0;
			angular.forEach($scope.HotelResult.roomRates.roomRates, function(value,index) { 
				if(targetRoomGroupIndex == index){
					targetbookingCode=value.bookingCode;
					$scope.changepriceroomfixed1(targetbookingCode,roomIndex);
				}
			});
			return targetbookingCode;
		}
	}

	$scope.changepriceroomfixed1 =  function(bookingCode, roomIndex,targetbookingCode)
	{
		var Price = 0;
		angular.forEach($scope.HotelResult.roomRates.roomRates, function(value,index) { 
			if(roomIndex == 0)
			{
				angular.forEach($scope.HotelResult.roomRates.roomRates, function(value,index) { 
					if($scope.sortindex ==index){
						$scope.roomprice0 = value.rates.rates[0].bookingPrice.amountBeforeTax;
						$scope.roomtype0 =  $scope.getroomtypename(value.roomTypeCode);
					}
				});
			}
			if(roomIndex == 1)
			{
				angular.forEach($scope.HotelResult.roomRates.roomRates, function(value,index) { 
					if($scope.sortindex ==index){
						$scope.roomprice1 = value.rates.rates[0].bookingPrice.amountBeforeTax;
						//console.log("room2 price ###########"+$scope.roomprice1);
						$scope.roomtype1 =  $scope.getroomtypename(value.roomTypeCode);
					}
				});
			}
			if(roomIndex == 2)
			{
				angular.forEach($scope.HotelResult.roomRates.roomRates, function(value,index) { 
					if($scope.sortindex ==index){
						$scope.roomprice2 = value.rates.rates[0].bookingPrice.amountBeforeTax;
						$scope.roomtype2 =  $scope.getroomtypename(value.roomTypeCode);
					}
				});
			}
			if(roomIndex == 3)
			{
				$scope.roomprice3 = value.rates.rates[0].bookingPrice.amountBeforeTax;
				$scope.roomtype3 =  $scope.getroomtypename(value.roomTypeCode);
			}

		});
		$scope.totalprice = ( $scope.roomprice0 + $scope.roomprice1 + $scope.roomprice2 +  $scope.roomprice3 ).toFixed(2);
	}

	$scope.changepriceroomopen =  function(bookingCode, roomgroupindexSelected, roomcombIndexSelected, roomIndex)
	{
		var Price = 0;
		angular.forEach($scope.HotelResult.roomRates.roomRates, function(value,index) { 
			if(roomIndex == 0)
			{
				angular.forEach($scope.HotelResult.roomRates.roomRates, function(value,index) { 
					if($scope.sortindex ==index){
						$scope.roomprice0 = value.rates.rates[0].bookingPrice.amountBeforeTax;
						$scope.roomtype0 =  $scope.getroomtypename(value.roomTypeCode);
					}
				});
			}
			if(roomIndex == 1)
			{
				angular.forEach($scope.HotelResult.roomRates.roomRates, function(value,index) { 
					if($scope.sortindex ==index){
						$scope.roomprice1 = value.rates.rates[0].bookingPrice.amountBeforeTax;
						$scope.roomtype1 =  $scope.getroomtypename(value.roomTypeCode);
					}
				});
			}
			if(roomIndex == 2)
			{
				angular.forEach($scope.HotelResult.roomRates.roomRates, function(value,index) { 
					if($scope.sortindex ==index){
						$scope.roomprice2 = value.rates.rates[0].bookingPrice.amountBeforeTax;
						$scope.roomtype2 =  $scope.getroomtypename(value.roomTypeCode);
					}
				});
			}
			if(roomIndex == 3)
			{
				$scope.roomprice3 = value.rates.rates[0].bookingPrice.amountBeforeTax;
				$scope.roomtype3 =  $scope.getroomtypename(value.roomTypeCode);
			}
		});
		$scope.$apply(function() { $scope.totalprice = ( $scope.roomprice0 + $scope.roomprice1 + $scope.roomprice2 +  $scope.roomprice3 ).toFixed(2)});
	}

	$scope.getRoomindex =  function(selectedRoomComboIndex, selectRoomindex, targetRoomComboIndex)
	{
		var targetRoomIndex = 0;
		angular.forEach($scope.RoomGroup, function(roomGroupObj,roomgroupindex) {
			angular.forEach(roomGroupObj.RoomCombination, function(value,index) {
				var isComboFound = false;
				angular.forEach(value.RoomIndex, function(roomvalue,roomindex) {
					if(selectedRoomComboIndex == roomindex && selectRoomindex == roomvalue)
					{
						isComboFound = true;
					}
				});
				if(isComboFound)
				{
					angular.forEach(value.RoomIndex, function(roomvalue,roomindex) {			
						if(targetRoomComboIndex == roomindex)
						{
							targetRoomIndex = roomvalue;
						}
					});
				}
			});
		});	
		return targetRoomIndex;
	}

	$scope.GetRoomRequestOptions = function(roomReqIndex, val)
	{
		var rooms = [];	
		var roomcount = 0;
		var currentidarrayindex = 0;
		angular.forEach($scope.RoomGroup, function(roomGroupObj,roomgroupindex) {
			if(roomGroupObj.InfoSource == 'FixedCombination' || roomGroupObj.InfoSource == 'Fixed Combination'){	
				angular.forEach(roomGroupObj.RoomCombination, function(roomCombinationObj,roomCombinationIndex) {
					angular.forEach(roomCombinationObj.RoomIndex, function(roomvalue,roomindex) {
						if(roomReqIndex == roomindex){
							angular.forEach($scope.HotelResult.roomRates.roomRates, function(ratevalue,rateindex) {	
								if(roomvalue == ratevalue.RoomIndex){	
									roomcount ++;
									ratevalue.price = $scope.getroomrate(ratevalue.bookingCode);
									rooms.push(ratevalue); 									
								}		
							});
						}					
					});				
					$scope.totalroomtype = $scope.HotelResult.roomRates.roomRates.length - roomCombinationObj.RoomIndex.length;
				});
			}else{
				angular.forEach(roomGroupObj.RoomCombination, function(roomCombinationObj,roomCombinationIndex) { 	
					if(roomCombinationIndex == roomReqIndex){
						angular.forEach(roomCombinationObj.RoomIndex, function(roomvalue,roomindex) {
							angular.forEach($scope.HotelResult.roomRates.roomRates, function(ratevalue,rateindex) {	
								if(roomvalue == ratevalue.RoomIndex){	
									roomcount ++;
									ratevalue.price = $scope.getroomrate(ratevalue.bookingCode);
									rooms.push(ratevalue); 									
								}		
							});
						});	
					}
					$scope.totalroomtype = $scope.HotelResult.roomRates.roomRates.length - roomCombinationObj.RoomIndex.length;
				});
			}
		});		
		rooms.sort($scope.priceComparetor);
		if($scope.basic == 'undefined' || $scope.basic == null || $scope.basic > 0)
		{
			if(rooms != null && rooms.length > 0)
				$scope.basic = parseFloat(rooms[0].price).toFixed(2);
		}
		return rooms;
	}

	$scope.priceComparetor = function mycomparator(a,b) {
		return parseFloat(a.price, 10) - parseInt(b.price, 10);
	}

	$scope.GetRoomCombinationroom = function(roomGroupIndex, roomComboIndex, val)
	{
		var rooms = [];	
		var roomcount = 0;
		var currentidarrayindex = 0;
		angular.forEach($scope.RoomGroup, function(roomGroupObj,roomgroupindex) {
			if(roomgroupindex == roomGroupIndex)
			{
				if(roomGroupObj.InfoSource == 'FixedCombination' || roomGroupObj.InfoSource == 'Fixed Combination'){	
					angular.forEach(roomGroupObj.RoomCombination, function(roomCombinationObj,roomCombinationIndex) {
						angular.forEach(roomCombinationObj.RoomIndex, function(roomvalue,roomindex) {
							if(roomComboIndex == roomindex){
								angular.forEach($scope.HotelResult.roomRates.roomRates, function(ratevalue,rateindex) {	
									if(roomvalue == ratevalue.RoomIndex){	
										roomcount ++;
										rooms.push(ratevalue); 									
									}		
								});
							}					
						});				
						$scope.totalroomtype = $scope.HotelResult.roomRates.roomRates.length - roomCombinationObj.RoomIndex.length;
					});
				}else{
					angular.forEach(roomGroupObj.RoomCombination, function(roomCombinationObj,roomCombinationIndex) { 	
						if(roomCombinationIndex == roomComboIndex){
							angular.forEach(roomCombinationObj.RoomIndex, function(roomvalue,roomindex) {
								angular.forEach($scope.HotelResult.roomRates.roomRates, function(ratevalue,rateindex) {	
									if(roomvalue == ratevalue.RoomIndex){	
										roomcount ++;
										rooms.push(ratevalue); 									
									}		
								});
							});	
						}
						$scope.totalroomtype = $scope.HotelResult.roomRates.roomRates.length - roomCombinationObj.RoomIndex.length;
					});
				}
			}
		});

		return rooms;
	}

	//GetRoomCombinationroom call
	$scope.GetOpenRoomCombinationroom = function(roomGroups)
	{
		var rooms = [];	
		var roomcount = 0;
		angular.forEach(roomGroups, function(groupval,groupindex) {
			angular.forEach($scope.HotelResult.roomRates.roomRates, function(ratevalue,rateindex) {	
				if(groupval == ratevalue.RoomIndex){
					roomcount ++;
					rooms.push(ratevalue); 									
				}		
			});
		});

		return rooms;
	}

	$scope.changepriceroom2 =  function(bookingCode)
	{
		var Price = 0;
		angular.forEach($scope.HotelResult.roomRates.roomRates, function(value,index) { 
			if(value.bookingCode == bookingCode)
			{
				$scope.roomprice1 = value.rates.rates[0].bookingPrice.amountBeforeTax;
				$scope.roomtype1 = $scope.getroomtypename(value.roomTypeCode);
			}
		});
		$scope.totalprice = ( $scope.roomprice0 + $scope.roomprice1 + $scope.roomprice2 +  $scope.roomprice3 ).toFixed(2);
	}

	$scope.changepriceroom3 =  function(bookingCode)
	{
		var Price = 0;
		angular.forEach($scope.HotelResult.roomRates.roomRates, function(value,index) { 
			if(value.bookingCode == bookingCode)
			{
				$scope.roomprice2 = value.rates.rates[0].bookingPrice.amountBeforeTax;
				$scope.roomtype2 =$scope.getroomtypename(value.roomTypeCode);
			}
		});
		$scope.totalprice = ( $scope.roomprice0 + $scope.roomprice1 + $scope.roomprice2 +  $scope.roomprice3 ).toFixed(2);
	}

	$scope.changepriceroom4 =  function(bookingCode)
	{
		var Price = 0;
		angular.forEach($scope.HotelResult.roomRates.roomRates, function(value,index) { 
			if(value.bookingCode == bookingCode)
			{
				$scope.roomprice3 = value.rates.rates[0].bookingPrice.amountBeforeTax;
				$scope.roomtype3 = $scope.getroomtypename(value.roomTypeCode);
			}
		});
		$scope.totalprice = ( $scope.roomprice0 + $scope.roomprice1 + $scope.roomprice2 +  $scope.roomprice3 ).toFixed(2);
	}

	$scope.getamenityType = function(roomTypeCode,roomindex)
	{
		var amenities = [];
		angular.forEach($scope.HotelResult.roomTypes.roomTypes, function(value,index) { 
			if(value.roomTypeCode === roomTypeCode )
			{	
				if(value.amenities.length > 0){
					angular.forEach(value.amenities, function(amenitiesvalue,amenitiesindex) { 
						if(amenitiesvalue != undefined && amenitiesvalue.description != undefined && amenitiesvalue.description.length > 3)
						{
							amenitiesvalue.description = amenitiesvalue.description.trim();
							if (amenitiesvalue.description.endsWith('.') || amenitiesvalue.description.endsWith(',') || amenitiesvalue.description.endsWith('!'))
							{
								//console.log('amenity contains \.,\,' );
								amenitiesvalue.description = amenitiesvalue.description.substring(0, amenitiesvalue.description.length - 1);
							}
							//console.log('amenity description..' +amenitiesvalue.description);
							if(amenitiesindex == (value.amenities.length - 1)  )
							{
								amenities.push(amenitiesvalue.description +". ");	
							}
							else
							{
								amenities.push(amenitiesvalue.description +", ");	
							}
						}
					});									
				}
			}
		});
		if(amenities.length < 1	)
			amenities.push("No Information Available.");
		return amenities;
	}

	$scope.getroomimage = function(roomTypeCode)
	{
		var imagepath = "";
		angular.forEach($scope.HotelResult.roomTypes.roomTypes, function(value,index) { 
			if(value.roomTypeCode == roomTypeCode)
			{
				if(value.roomDescription!=undefined){
					imagepath = value.roomDescription.imagePath;					
					if(imagepath == "")
						imagepath = $scope.HotelResult.basicPropertyInfo.imageurl;
				}else{
					imagepath = $scope.HotelResult.basicPropertyInfo.imageurl;
				}
			}			
		});
		return imagepath;
	}

	$scope.getroomtypename = function(roomTypeCode)
	{
		var roomtypename = "";
		angular.forEach($scope.HotelResult.roomTypes.roomTypes, function(value,index) { 
			if(value.roomTypeCode == roomTypeCode)
			{
				roomtypename = value.roomType;
			}
		});

		return roomtypename;
	}

	$scope.getroomrateplancode = function(roomTypeCode)
	{
		var PlanCode = "";
		angular.forEach($scope.HotelResult.roomRates.roomRates, function(value,index) { 
			if(value.roomID == roomTypeCode)
			{
				PlanCode = value.ratePlanCode;
			}
		});
		return PlanCode;
	}

	$scope.getavailableroomscount = function(roomTypeCode)
	{
		var availableQuantity = "";
		var PlanCode = "";
		angular.forEach($scope.HotelResult.roomRates.roomRates, function(value,index) { 
			if(value.roomID == roomTypeCode)
			{				
				PlanCode = value.ratePlanCode;
			}			
		});
		angular.forEach($scope.HotelResult.ratePlans.ratePlan, function(value,index) {			
			if(value.ratePlanCode == PlanCode)
			{				
				availableQuantity = value.availableQuantity;
			}			
		});		
		return availableQuantity;
	}

	$scope.getfreecancellationpolicy = function(roomTypeCode)
	{
		var freecancellation = false;
		var PlanCode = "";
		angular.forEach($scope.HotelResult.roomRates.roomRates, function(value,index) { 
			if(value.roomID == roomTypeCode)
			{				
				PlanCode = value.ratePlanCode;
			}			
		});
		angular.forEach($scope.HotelResult.ratePlans.ratePlan, function(value,index) {			
			if(value.ratePlanCode == PlanCode)
			{				
				if(value.cancelPenalties.cancelPenalties[0].nonRefundable == false)
				{
					freecancellation = true;
				}				
			}			
		});		
		return freecancellation;
	}

	$scope.convertrateintoint = function(rate)
	{
		return  parseInt(rate);;
	}

	$scope.getbookingkey = function(roomTypeCode)
	{
		var key = "";
		angular.forEach($scope.HotelResult.roomRates.roomRates, function(value,index) { 
			if(value.roomTypeCode == roomTypeCode)
			{
				key = value.bookingCode;
			}
		});
		return key;
	}

	var bookingCode = {};
	$scope.hotelSummary = function(){
		var book1 = angular.element('#bookingCode0').val();
		var book2 = angular.element('#bookingCode1').val();
		var book3 = angular.element('#bookingCode2').val();
		var book4 = angular.element('#bookingCode3').val();
		if(book1 != undefined && book2 == undefined && book3 == undefined && book4 == undefined){
			bookingCode = book1;
		}else if(book1 != undefined && book2 != undefined && book3 == undefined && book4 == undefined){
			bookingCode = book1+','+book2;
		}else if(book1 != undefined && book2 != undefined && book3 != undefined && book4 == undefined){
			bookingCode = book1+','+book2+','+book3;
		}else if(book1 != undefined && book2 != undefined && book3 != undefined && book4 != undefined){
			bookingCode = book1+','+book2+','+book3+','+book4;
		}
		var appkey = angular.element('#bookAppkey').val();
		var searchkey = angular.element('#SearchKey').val();
		var hotelcode = angular.element('#hotelCode').val();
		$location.path('/HotelBookingDetails-'+$scope.Theme).search('bookingCode='+encodeURIComponent(bookingCode)+'&ay='+encodeURIComponent(appkey)+'&searchkey='+encodeURIComponent(searchkey)+'&hotelcode='+encodeURIComponent(hotelcode)+
				'&citycode='+encodeURIComponent( $location.search().citycode)+'&city='+encodeURIComponent($location.search().city)+
				'&datain='+$location.search().datain+'&dateout='+$location.search().dateout+'&noofrooms='+$location.search().noofrooms+'&rooms='+encodeURIComponent($location.search().rooms)+
				'&adt='+$location.search().adt+'&chd='+$location.search().chd+'&thm='+$scope.Theme);	
	}

	$scope.modifysearch = function(){
		var roomindex1 = "$0,";	var roomindex2 = "$1,";	var roomindex3 = "$2,";	var roomindex4 = "$3,"; 
		var totalrooms = angular.element('#totalrooms').val();
		var room1adult = angular.element('#Room1Adult').val(); var room2adult = angular.element('#RoomAdult2').val(); 
		var room3adult = angular.element('#RoomAdult3').val(); var room4adult = angular.element('#RoomAdult4').val();
		var room1child = angular.element('#Childs').val();     var room2child = angular.element('#Childs2').val();
		var room3child = angular.element('#Childs3').val();    var room4child = angular.element('#Childs4').val();
		var room1childage = "";  var room1childage2 = "";  var room1childage3 = "";
		var room1childage4 = ""; var room1childage5 = "";
		for(var i=0;i<room1child;i++){
			room1childage += angular.element('#room1Age'+(i+1)).val();    
			if(i != room1child -1){ 
				room1childage += ",";
			}            
		}
		for(var i=0;i<room2child;i++){
			room1childage2 += angular.element('#room2Age'+(i+1)).val();    
			if(i != room2child -1){ 
				room1childage2 += ",";
			}            
		}
		for(var i=0;i<room3child;i++){
			room1childage3 += angular.element('#room3Age'+(i+1)).val();    
			if(i != room3child -1){ 
				room1childage3 += ",";
			}            
		}
		for(var i=0;i<room4child;i++){
			room1childage4 += angular.element('#room4Age'+(i+1)).val();    
			if(i != room4child -1){ 
				room1childage4 += ",";
			}            
		}

		var child1WithAge = ''; var child2WithAge = '';
		var child3WithAge = ''; var child4WithAge = '';
		if(room1child == 0){
			child1WithAge = 0;
		}else{
			child1WithAge = room1child+','+room1childage;
		}
		if(room2child == 0){
			child2WithAge = 0;
		}else{
			child2WithAge = room2child+','+room1childage2;
		}
		if(room3child == 0){
			child3WithAge = 0;
		}else{
			child3WithAge = room3child+','+room1childage3;
		}
		if(room4child == 0){
			child4WithAge = 0;
		}else{
			child4WithAge = room4child+','+room1childage4;
		}

		var room1complete = roomindex1+room1adult+','+child1WithAge;
		var room2complete = roomindex2+room2adult+','+child2WithAge;
		var room3complete = roomindex3+room3adult+','+child3WithAge;
		var room4complete = roomindex4+room4adult+','+child4WithAge;
		var rooms = 0;	var totalAdultCount = 0; var totalChildCount = 0;
		if(totalrooms == 1){
			rooms = room1complete;
			totalAdultCount =   parseInt(room1adult);
			totalChildCount  =  parseInt(child1WithAge);
		}else if(totalrooms == 2){
			rooms = room1complete+','+room2complete;
			totalAdultCount =   parseInt(room1adult)+parseInt(room2adult);
			totalChildCount  =  parseInt(child1WithAge)+parseInt(child2WithAge);
		}else if(totalrooms == 3){
			rooms = room1complete+','+room2complete+','+room3complete;
			totalAdultCount =   parseInt(room1adult)+parseInt(room2adult)+parseInt(room3adult);
			totalChildCount  =  parseInt(child1WithAge)+parseInt(child2WithAge)+parseInt(child3WithAge);
		}else if(totalrooms == 4){
			rooms = room1complete+','+room2complete+','+room3complete+','+room4complete;
			totalAdultCount =   parseInt(room1adult)+parseInt(room2adult)+parseInt(room3adult)+parseInt(room4adult);
			totalChildCount  =  parseInt(child1WithAge)+parseInt(child2WithAge)+parseInt(child3WithAge)+parseInt(child4WithAge);
		}	

		var appkey = angular.element('#hky').val();
		var currency = angular.element('#hccy').val();
		var citycode = angular.element('#citycode').val();
		var cityname= angular.element('#hotelcity').val();
		var noofrooms = $scope.noofrooms;
		var startDate = angular.element('#datein').val();
		var EndDate = angular.element('#dateout').val();
		/*$location.path('/Hotel-List').search('city='+encodeURIComponent(cityname)+'&citycode='+encodeURIComponent(citycode)+'&datain='+encodeURIComponent(startDate)+'&dateout='+encodeURIComponent(EndDate)+'&ay='+encodeURIComponent(appkey)+'&noofrooms='+noofrooms+'&currency='+currency+'&rooms='+encodeURIComponent(rooms)+'&adt='+totalAdultCount+'&chd='+totalChildCount);*/
		var hotelModifyData = ('city='+encodeURIComponent(cityname)+'&citycode='+encodeURIComponent(citycode)+'&datain='+encodeURIComponent(startDate)+'&dateout='+encodeURIComponent(EndDate)+'&ay='+encodeURIComponent(appkey)+'&noofrooms='+noofrooms+'&currency='+currency+'&rooms='+encodeURIComponent(rooms)+'&adt='+totalAdultCount+'&chd='+totalChildCount+'&thm='+$scope.Theme);
		localStorageService.set('hotelUrlParameters',hotelModifyData);
		//$scope.$apply();
		//$location.path('/Hotel-List-'+$scope.Theme).search(hotelModifyData);
		//$location.reload();
		$scope.$evalAsync (function(){
			$location.path('/Hotel-List-'+$scope.Theme).search(hotelModifyData); 
		})
	}
	$scope.returnIndex = function(){
		window.location.href = window.location.href.replace(/#.*$/, '#/hotel');

	}

	$(document).ready(function(){
		$('#show').click(function(){
			$('#CancellationDeatils').css("display","block");
		});
	});

	/*Show Error Message and Research on Error modal*/
	$scope.errorDisplay = function(errorMsg,Parameters){
		console.log("errorMsg",errorMsg);
		console.log("Parameters",Parameters);
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
}]);

app.directive("starrating", function() {
	return {
		restrict : "ECA",
		transclude : true,
		template : "<a class=\"fa fa-star\" ng-repeat=\"i in getNumber(Roomstay.basicPropertyInfo.hotel_Star) track by $index\"></a> "
	};
});

app.filter('num', function() {
	return function(input) {
		return parseInt(input, 10);
	}
});

