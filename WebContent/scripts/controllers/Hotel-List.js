/**
 *Author : Prabhakaran
 *Description: hotel list page code redefined and listed the functionality.
 **/

var app = angular.module('myApp');
app.controller('hotelListCtrl',['$scope','localStorageService','hotelServices','$modal','$log','$window','$http','$route','$location','commonService','$timeout', function($scope,localStorageService,hotelServices,$modal,$log,$window,$http,$route,$location,commonService,$timeout) {
	$scope.AdminUrl = commonService.AdminbaseUrl;
	var ibeurl = commonService.Ibebaseurl;
	function pad(n){return n<10 ? '0'+n : n}
	
	$scope.init = function(){
		$scope.errordiv = false;
		$scope.loadpricebar = false;
		$scope.loaderdisplay = "show" ;
		$scope.display = "none";
		$scope.hotelquotemap = {};
		$scope.hoteluser = {};		
		$scope.quoteloaded = false;
		$scope.ChooseRoomButtonQuotation = false;
		$scope.isQuoteAvail = false;
		$scope.HotelFoundBar = false;
		
		/*isQuote Url*/
		if($location.search().ay != null && $location.search().hotelquotationid != null ){
			$scope.hoteluser = $scope.setScopeQuoteUser($location.search());	
			$scope.isQuoteAvail = true;
			$scope.ChooseRoomButtonQuotation = true;
		}
		/*isibe normal Url(hotel-index)*/
		else if($location.search().ay != null){			
			$scope.hoteluser = $scope.setScopeUser($location.search());
		} 
		$scope.roomlist = []; $scope.names = []; $scope.hotelname = null;
		$scope.priceSlider = {min: 1000, max: 2000, ceil: 2000, floor: 1000, step: 10 };		
		$scope.appkey = $scope.hoteluser.appkey;
		var citySplited = $scope.hoteluser.cityfull.split(',');
		//$scope.searchcityname = $scope.hoteluser.cityfull;
		$scope.searchcityname = citySplited[0];
		var datestart=$scope.hoteluser.datestart.split("-").reverse().join("/"); 
		$scope.datestart=datestart;
		var dateend= $scope.hoteluser.dateend.split("-").reverse().join("/"); 
		$scope.dateend =dateend;
		$scope.noofrooms=$location.search().noofrooms;
		if($location.search().adt == undefined && $location.search().chd == undefined){
			$scope.getnoofadultandchild($location.search().rooms);
		}else{
			$scope.noofadults = $location.search().adt;
			$scope.noofchilds  =  $location.search().chd;
		}
		$scope.pagination = false;
		$scope.hotelSearches();
		$scope.Theme = $location.search().thm;
		$scope.filter = 'views/Hotel-List-'+$scope.Theme+'Filter.jsp';
		$scope.mainContent = 'views/Hotel-List-'+$scope.Theme+'Content.jsp';
		$timeout($scope.callAtTimeout,3000);
		$scope.CompleteData = {};
	    $scope.modifyHotel = false;
	}; 
	
	/*getting value from url for errormodel*/
	$scope.ErrorModalData = {};
	$scope.ErrorModalData.city = $location.search().city;
	$scope.ErrorModalData.cityCode = $location.search().citycode;
	$scope.ErrorModalData.checkin = $location.search().datain;
	$scope.ErrorModalData.checkout = $location.search().dateout;
	$scope.ErrorModalData.noofrooms = $location.search().noofrooms;
	$scope.ErrorModalData.rooms = $location.search().rooms;	
	$scope.ErrorModalData.noofadults = $location.search().adt;
	$scope.ErrorModalData.noofchilds  =  $location.search().chd;
	$scope.ErrorModalData.showData = true;	 
	localStorageService.set('HotelErrordata',$scope.ErrorModalData);	
	$scope.hotelSearches = function(){
		$scope.display = "block";
		$scope.loadpricebar = true;	
		$scope.isQuoteAvailable = false;
		//$scope.isQuoteAvail = true;
		$scope.errordiv = false;
		//$scope.isQuoteAvail = true;
		$scope.HotelFoundBar = true;
		/*hotelList api calling*/
		hotelServices.HotelSearch($scope.hoteluser).then(function(response){
			//$http.get('hotelList.json').then(function(response){
			$scope.modifyHotel = true;
			$scope.isQuoteAvail = false;
			$scope.loadpricebar = false;
			$scope.hotelData = response.data;
			$scope.CompleteData = response.data;
			$scope.citycode = $scope.hoteluser.citycode;		
			$scope.markupammount = $scope.hoteluser.markupAmount;
			if($scope.hotelData.status.code !='0'|| $scope.hotelData.status.code != 0)
			{	
				for (var key in $scope.hotelData.roomStays) {
					if ($scope.hotelData.roomStays.hasOwnProperty(key)) {
						$scope.roomlist.push($scope.hotelData.roomStays[key]);
					}
				}
				$scope.searchkey = $scope.hotelData.searchKey;
				$scope.Roomstaylist = $scope.roomlist;
				if($scope.Roomstaylist.length > 0)
				{
					var locarr = []; var pricearr = [];	var hotelarr = []; var Amenitiesarr = []; var hotelstar1=[];var hotelstar2=[];var hotelstar3=[];var hotelstar4=[];var hotelstar5=[];
					angular.forEach($scope.Roomstaylist, function(value) {                      
						if(value.basicPropertyInfo.area != null){
							locarr.push(value.basicPropertyInfo.area); 
						}
						if(value.basicPropertyInfo.bookingPrice != null){
							pricearr.push(parseInt(value.basicPropertyInfo.bookingPrice)); 
						}
						if(value.basicPropertyInfo.hotel_Star != null){
							hotelarr.push(value.basicPropertyInfo.hotel_Star); 
						}
						if(value.basicPropertyInfo.hotel_Star == 1){
							hotelstar1.push(value.basicPropertyInfo.hotel_Star); 
						}
						if(value.basicPropertyInfo.hotel_Star == 2){
							hotelstar2.push(value.basicPropertyInfo.hotel_Star); 
						}
						if(value.basicPropertyInfo.hotel_Star == 3){
							hotelstar3.push(value.basicPropertyInfo.hotel_Star); 
						}
						if(value.basicPropertyInfo.hotel_Star == 4){
							hotelstar4.push(value.basicPropertyInfo.hotel_Star); 
						}
						if(value.basicPropertyInfo.hotel_Star == 5){
							hotelstar5.push(value.basicPropertyInfo.hotel_Star); 
						}
						if(value.basicPropertyInfo.hotelName != null){
							$scope.names.push(value.basicPropertyInfo.hotelName); 
						}
						angular.forEach(value.basicPropertyInfo.hotelAmenities, function(Amvalue) { 
							if(Amvalue.description!=null)
							{
								Amenitiesarr.push(Amvalue.description);
							}		   		
						});
					});
					$scope.hotelstars={};	
					$scope.hotelstars.one=hotelstar1;
					$scope.hotelstars.two=hotelstar2;
					$scope.hotelstars.three=hotelstar3;
					$scope.hotelstars.four=hotelstar4;
					$scope.hotelstars.five=hotelstar5;
					$scope.hotelstarlist = hotelarr;
					var uniquelocaarr = [];
					uniquelocaarr = locarr.unique();
					$scope.locationlist = uniquelocaarr;
					var uniqueAmenitiesaarr = [];
					uniqueAmenitiesaarr = Amenitiesarr.unique();
					$scope.Amenitieslist = uniqueAmenitiesaarr;
					var uniquepricearr = [];
					uniquepricearr = pricearr.unique();
					$scope.pricelist = uniquepricearr.sort(function(a, b){return a-b});
					$scope.priceSlider = {
							min: $scope.pricelist[0],
							max: $scope.pricelist[$scope.pricelist.length - 1],
							ceil: $scope.pricelist[$scope.pricelist.length - 1],
							floor: $scope.pricelist[0],
							step: 10
					};

					var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
					var firstDate = new Date($scope.hotelData.hotelSearchCommand.datestart);
					var secondDate = new Date($scope.hotelData.hotelSearchCommand.dateend);
					var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
					$scope.noofnights = diffDays;
					$scope.noofrooms = $scope.hotelData.hotelSearchCommand.noofrooms;		
					$scope.loaderdisplay = "none" ;		   
					if($location.search().hotelquotationid == undefined ){	
						$scope.isQuoteAvailable = false;
					}
					$scope.HotelFoundBar = false;
					$scope.multicall = {};
					if($scope.hotelData.hotelSearchCommand.callableAgain == true){
						$scope.multicall.appkey=$scope.appkey;
						$scope.multicall.searchkey=$scope.searchkey;
						$scope.reloadCall();	
					} 					
				}			
				else
				{
					$scope.errordiv = true;
					$scope.errormeg = "No Hotels Avaiable";					
					$scope.errorDisplay($scope.errormeg,$scope.ErrorModalData);					
				}
			}
			else
			{				
				$scope.errormeg = "No Hotels Available";
				$scope.errordiv = true;
				$scope.errorDisplay($scope.errormeg,$scope.ErrorModalData);				
			}	

		},function(errorStatus){
			$scope.errormeg = "No Hotels Available";
			$scope.errordiv = true;
			$scope.errorDisplay($scope.errormeg,$scope.ErrorModalData);			
		});
	};

//	multicall reload function
	$scope.reloadCall = function(){
		$scope.loadpricebar = false;	
		hotelServices.HotelSearchContinue($scope.multicall).then(function(response){
			$scope.hotelData = response.data;	
			if($scope.hotelData.status.code !='0')
			{	
				$scope.roomlist = [];
				for (var key in $scope.hotelData.roomStays) {
					if ($scope.hotelData.roomStays.hasOwnProperty(key)) {
						$scope.roomlist.push($scope.hotelData.roomStays[key]);
					}
				}
				$scope.Roomstaylist = $scope.roomlist;
				if($scope.Roomstaylist.length > 0)
				{
					var locarr = []; var pricearr = []; var hotelarr = []; var Amenitiesarr = [];
					angular.forEach($scope.Roomstaylist, function(value) {                      
						if(value.basicPropertyInfo.area != null){
							locarr.push(value.basicPropertyInfo.area); 
						}
						if(value.basicPropertyInfo.bookingPrice != null){
							pricearr.push(parseInt(value.basicPropertyInfo.bookingPrice)); 
						}
						if(value.basicPropertyInfo.hotel_Star != null){
							hotelarr.push(value.basicPropertyInfo.hotel_Star); 
						}
						if(value.basicPropertyInfo.hotelName != null){
							$scope.names.push(value.basicPropertyInfo.hotelName); 
						}
						angular.forEach(value.basicPropertyInfo.hotelAmenities, function(Amvalue) { 
							if(Amvalue.description!=null)
							{
								Amenitiesarr.push(Amvalue.description);
							}		   		
						});
					});

					$scope.hotelstarlist = hotelarr;
					var uniquelocaarr = [];
					uniquelocaarr = locarr.unique();
					$scope.locationlist = uniquelocaarr;
					var uniqueAmenitiesaarr = [];
					uniqueAmenitiesaarr = Amenitiesarr.unique();
					$scope.Amenitieslist = uniqueAmenitiesaarr;
					var uniquepricearr = [];
					uniquepricearr = pricearr.unique();
					$scope.pricelist = uniquepricearr.sort(function(a, b){return a-b});
					$scope.priceSlider = {
							min: $scope.pricelist[0],
							max: $scope.pricelist[$scope.pricelist.length - 1],
							ceil: $scope.pricelist[$scope.pricelist.length - 1],
							floor: $scope.pricelist[0],
							step: 10
					};  
					var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
					var firstDate = new Date($scope.hotelData.hotelSearchCommand.datestart);
					var secondDate = new Date($scope.hotelData.hotelSearchCommand.dateend);
					var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
					$scope.noofnights = diffDays;
					$scope.noofrooms = $scope.hotelData.hotelSearchCommand.noofrooms;		
					$scope.loaderdisplay = "none" ;		   
					$scope.display = "block";		  
				}			
			}
			$scope.pagination = true;
		},function(errorStatus){
			$scope.errordiv = true;
			$scope.errormeg = "No Hotels Available";
			$scope.errorDisplay($scope.errormeg,$scope.ErrorModalData);	
		});
	}
	/*Price Sorting*/

	$scope.sortdescending  = false;  
	$scope.sortlist = [];
	$scope.pricesort = function(items)
	{
		$scope.priceasc = "";
		if($scope.sortdescending == false)
		{			
			$scope.sortlist =  items.sort(function(a, b) {
				return parseFloat(a.basicPropertyInfo.bookingPrice) - parseFloat(b.basicPropertyInfo.bookingPrice);
			});	
			$scope.sortdescending  = true;
			$scope.priceasc = "tayyarah-arrow-down";
		}
		else
		{			
			$scope.sortlist =  items.sort(function(a, b) {
				return parseFloat(a.basicPropertyInfo.bookingPrice) - parseFloat(b.basicPropertyInfo.bookingPrice);
			});	
			$scope.sortlist.reverse()
			$scope.sortdescending  = false; 
			$scope.priceasc = "tayyarah-arrow-up";
		}
		return $scope.sortlist;
	}
	
	$scope.starsort = function(items)
	{
		$scope.priceasc = "";
		if($scope.sortdescending == false)
		{			
			$scope.sortlist =  items.sort(function(a, b) {
				if(a.basicPropertyInfo.hotel_Star ==""||a.basicPropertyInfo.hotel_Star ==null ||a.basicPropertyInfo.hotel_Star ==undefined)
				{
					return parseFloat(0) - parseFloat(b.basicPropertyInfo.hotel_Star);
				}
				if(b.basicPropertyInfo.hotel_Star ==""||b.basicPropertyInfo.hotel_Star ==null ||b.basicPropertyInfo.hotel_Star ==undefined)
				{
					return parseFloat(a.basicPropertyInfo.hotel_Star) - parseFloat(0);
				}
				return parseFloat(a.basicPropertyInfo.hotel_Star) - parseFloat(b.basicPropertyInfo.hotel_Star);
			});	
			$scope.sortdescending  = true;  
			$scope.priceasc = "tayyarah-arrow-down";
		}
		else
		{			
			$scope.sortlist =  items.sort(function(a, b) {
				if(a.basicPropertyInfo.hotel_Star ==""||a.basicPropertyInfo.hotel_Star ==null ||a.basicPropertyInfo.hotel_Star ==undefined)
				{
					return parseFloat(0) - parseFloat(b.basicPropertyInfo.hotel_Star);
				}
				if(b.basicPropertyInfo.hotel_Star ==""||b.basicPropertyInfo.hotel_Star ==null ||b.basicPropertyInfo.hotel_Star ==undefined)
				{
					return parseFloat(a.basicPropertyInfo.hotel_Star) - parseFloat(0);
				}

				return parseFloat(a.basicPropertyInfo.hotel_Star) - parseFloat(b.basicPropertyInfo.hotel_Star);
			});	
			$scope.sortlist.reverse()
			$scope.sortdescending  = false; 
			$scope.priceasc = "tayyarah-arrow-up";
		}
		return $scope.sortlist;
	}

	/* Price Filter */
	$scope.filterprices = function(obj) {
		if($scope.Roomstaylist.length == 1)
		{
			return obj;
		}
		else
		{
			return (parseFloat(obj.basicPropertyInfo.bookingPrice) >= parseFloat($scope.priceSlider.min) && parseFloat(obj.basicPropertyInfo.bookingPrice) <= parseFloat($scope.priceSlider.max) );
		}
	};

	/*Location Filter*/
	$scope.showAlllocation = true;
	$scope.LocationIncludes = [];	
	$scope.getlocationname = function(locname){
		var i = $.inArray(locname, $scope.LocationIncludes);
		if (i > -1) {
			$scope.LocationIncludes.splice(i, 1);
		} else {
			$scope.LocationIncludes.push(locname);
			$scope.showAlllocation = false;
		}
		if($scope.LocationIncludes.length == 0)
			$scope.showAlllocation = true;  
	}
	$scope.LocationFilter = function(locobj) {
		var selloc = false;   
		if($scope.showAlllocation) 
		{
			return true;
		}
		else
		{
			angular.forEach($scope.LocationIncludes, function(arrvalue,arrindex) { 	
				if($scope.LocationIncludes[arrindex] == locobj.basicPropertyInfo.area) 
				{
					selloc = true;
				}
			});
		}
		return selloc;
	};

	/*Amenties Filter*/
	$scope.showAllAmenities = true;
	$scope.AmenitiesIncludes = [];	
	$scope.getamenitiesname = function(name){
		var i = $.inArray(name, $scope.AmenitiesIncludes);
		if (i > -1) {
			$scope.AmenitiesIncludes.splice(i, 1);
		} else {
			$scope.AmenitiesIncludes.push(name);
			$scope.showAllAmenities = false;
		}
		if($scope.AmenitiesIncludes.length == 0)
			$scope.showAllAmenities = true;  
	}
	$scope.AmenitiesFilter = function(obj) {
		var selloc = false;   
		if($scope.showAllAmenities) 
		{
			return true;
		}
		else
		{
			angular.forEach($scope.AmenitiesIncludes, function(arrvalue,arrindex) {  
				angular.forEach(obj.basicPropertyInfo.hotelAmenities, function(value,index) {          		
					if($scope.AmenitiesIncludes[arrindex] == value.description) 
					{
						selloc = true;
					}
				});
			});
		}
		return selloc;
	};

	$scope.CheckAmenities = function(name,obj)
	{
		var isthere  = false;		
		angular.forEach(obj, function(value,index) { 
			if(name == value.description) 
			{				
				isthere =  true;				
			}	
		});
		return isthere;
	}

	/*Rating Filter*/
	$scope.showAllrating = true;
	$scope.ratingIncludes = [];	
	$scope.getmode = function(name){
		var i = $.inArray(name, $scope.Hotelmoding);
		if (i > -1) {
			$scope.Hotelmoding.splice(i, 1);
		} else {
			$scope.Hotelmoding.push(name);
			$scope.showAllhotelmode = false;
		}
		if($scope.Hotelmoding == false)
			$scope.showAllhotelmode = true;  
	}
	$scope.FilterSet = false;
	
	$scope.getrating = function(name){
		$scope.dataRating = true;
		$scope.dataMode = false;
		var FilterCheck = angular.element('.starFilter'+name).val();
		if(FilterCheck == 'false'){
			angular.element('.starFilter'+name).val("true");		
		}else{
			angular.element('.starFilter'+name).val("false");			
		}

		$scope.Filtervalue = name;		 	 
		var i = $.inArray(name, $scope.ratingIncludes);
		if (i > -1) {
			$scope.ratingIncludes.splice(i, 1);
			//console.log('Rating 1',$scope.ratingIncludes);
		} else {
			$scope.ratingIncludes.push(name);
			$scope.showAllrating = false;
			//console.log('Rating 2',name);
		}
		if($scope.ratingIncludes.length == 0){
			$scope.showAllrating = true; 
			//console.log('Rating 3',$scope.ratingIncludes);
		}
	}
	$scope.RatingFilter = function(obj) {

		var selloc = false;   
		if($scope.showAllrating) 
		{
			return true;
		}
		else
		{
			angular.forEach($scope.ratingIncludes, function(arrvalue,arrindex) { 				
				if($scope.ratingIncludes[arrindex] == obj.basicPropertyInfo.hotel_Star) 
				{
					selloc = true;
				} 
			});
		}
		return selloc;
	};
	
	/*Hotel Name Filter*/
	$scope.showAllHotels = true;
	$scope.HotelnameIncludes = [];	
	$scope.HotelnameFilter = function(obj) {
		if($scope.hotelname == ''){
			$scope.HotelnameIncludes.splice(0, 1);
			$scope.showAllHotels = true; 
		}	
		var selloc = false;   
		if($scope.showAllHotels) 
		{return true;}
		else
		{
			angular.forEach($scope.HotelnameIncludes, function(arrvalue,arrindex) { 	
				if($scope.HotelnameIncludes[arrindex] == obj.basicPropertyInfo.hotelName) 
				{
					selloc = true;
				}
			});
			return selloc;
		}		
	};

	/*Hotel Mode Filter*/
	$scope.offlinehotelIncludes= [];	
	$scope.checkhotelmodefilter = function(type){
		$scope.dataRating = false;
		$scope.dataMode = true;
		$scope.checkHotelType(type);	
		$scope.filteredhotels = [];
		var i = $.inArray(type, $scope.offlinehotelIncludes);
		if (i > -1) {
			$scope.offlinehotelIncludes.splice(i, 1);
		} else {
			$scope.offlinehotelIncludes.push(type);
		}
	}

	$scope.HotelModeFilter = function(hotelmodeobj) {
		var objfilter = false; 
		if ($scope.offlinehotelIncludes.length > 0) {
			angular.forEach($scope.offlinehotelIncludes, function(type,index) {	
				if($scope.isofflineHotel(hotelmodeobj.basicPropertyInfo.isOfflineBooking) == type)
				{
					objfilter = true;  
				}			
			});
		}  
		else
		{
			objfilter = true; 
		}
		return objfilter;
	}

	/*Prototype Function*/
	Array.prototype.unique = function() {
		var a = [];
		for ( i = 0; i < this.length; i++ ) {
			var current = this[i];
			if (a.indexOf(current) < 0) a.push(current);
		}
		this.length = 0;
		for ( i = 0; i < a.length; i++ ) {
			this.push( a[i] );
		}
		return this.sort();
	}

	/*Hotel Map View*/
	var map;        
	var myCenter = new google.maps.LatLng(12.9998700, 77.5950530);
	var marker=new google.maps.Marker({
		position:myCenter
	});
	$scope.mapview = function(obj)
	{ 	
		var lat = obj.basicPropertyInfo.position.latitude;
		var long = obj.basicPropertyInfo.position.longitude;
		$scope.hotelmapname = obj.basicPropertyInfo.hotelName;	
		var modalInstance = $modal.open({templateUrl: 'myModalContent.html', controller: ModalInstanceCtrl, scope: $scope,size: 'lg',
			resolve: { lat: function () {
				return lat;
			},
			lng: function () {
				return long;
			}
			}
		});

		modalInstance.result.then(function (selectedItem) {
		}, function () {
		});
	}

	$scope.fullimageview = function(obj)
	{ 	
		var image = obj.basicPropertyInfo.imageurl.replace(/_TN/g, "");
		return image;
	}

	/*Hotel Picture View*/
	$scope.picview = function(obj)
	{
		$scope.hotelimages = "";
		$scope.hotelimages = obj.basicPropertyInfo.hotelimages;
		$scope.pichotelname = obj.basicPropertyInfo.hotelName;
		$scope.pichoteladdress = obj.basicPropertyInfo.address.addressLines[1] ;
		$scope.picprice = $scope.convertrateintoint(obj.basicPropertyInfo.bookingPrice);
		$scope.selectedhotelcode = obj.basicPropertyInfo.hotelCode;
		$scope._Index = 0;
		$scope.isActive = function (index) {		 
			return $scope._Index === index;
		};
		$scope.showPrev = function () {
			$scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.photos.length - 1;
		};
		$scope.showNext = function () {
			$scope._Index = ($scope._Index < $scope.photos.length - 1) ? ++$scope._Index : 0;
		};
		$scope.showPhoto = function (index) {
			$scope._Index = index;
		};
	}

	$scope.isofflineHotel = function(item)
	{
		if(item)
			return "OFFLINE";
		if(!item)
			return "ONLINE";
	}
	$scope.convertrateintoint = function(rate)
	{
		var ratevalue = parseInt(rate, 10);
		return  ratevalue;
	}

	$scope.gethotelcode = function(hotelcode)
	{
		var hcode = decodeURIComponent(hotelcode);
		return  hcode;
	}

	/*change button click to show new search*/
	$scope.addmarkup = function(){
		var currency = $location.search().currency;   var appkey = angular.element('#ay').val();
		var cityname = $location.search().city;		  var citycode = $location.search().citycode;
		var noofrooms = $location.search().noofrooms; var rooms = $location.search().rooms;
		var searchkey = $scope.searchkey;             var tchilt=$location.search().chd;
		var tadult=$location.search().adt;            var datestart = $location.search().datain;
		var dateend= $location.search().dateout;      var isdynamocmarkup = angular.element('#isDynamic').val();
		var isDynamicMarkup=isdynamocmarkup;          var markupamt = angular.element('#appliedmarkamt').val(); 
		var markupAmount=markupamt; 
		$location.path('/Hotel-List-'+$scope.Theme).search('city='+encodeURIComponent(cityname)+'&citycode='+encodeURIComponent(citycode)+'&datain='+encodeURIComponent(datestart)+'&dateout='+encodeURIComponent(dateend)+'&ay='+encodeURIComponent(appkey)+'&noofrooms='+noofrooms+'&currency='+currency+'&rooms='+encodeURIComponent(rooms)+'&isdynamocmarkup='+encodeURIComponent(isDynamicMarkup)+'&markupamt='+markupAmount+'&adt='+tadult+'&chd='+tchilt+'&searchkey='+searchkey);
	}

	/*modify search*/
	$scope.modifysearch = function()
	{
		var appkey =angular.element('#hky').val();
		var currency = angular.element('#hccy').val();			
		var citycode = angular.element('#citycode').val();
		var startDate = angular.element('#datein').val();		
		var EndDate = angular.element('#dateout').val();			
		var cityname = angular.element('#hotelcity').val();
		if (cityname == "") {			
			$("#errori").text("Please Enter the City Name");
			$('#errori').stop().fadeIn(400).delay(1500).fadeOut(400);
		} 
		else if (startDate == "") {			
			$("#errdep").text("Select the Check-in date");
			$('#errdep').stop().fadeIn(400).delay(1500).fadeOut(400);
		} 
		else if (EndDate == "") {
			$("#errarr").text("Select the Check-out date");
			$('#errarr').stop().fadeIn(400).delay(1500).fadeOut(400);
		}
		else{
			var roomindex1 = "$0,"; var roomindex2 = "$1,"; var roomindex3 = "$2,"; var roomindex4 = "$3,"; 
			var totalrooms = angular.element('#totalrooms').val(); var room1adult = angular.element('#Room1Adult').val();
			var room2adult = angular.element('#RoomAdult2').val(); var room3adult = angular.element('#RoomAdult3').val();
			var room4adult = angular.element('#RoomAdult4').val(); var room1child = angular.element('#Childs').val();
			var room2child = angular.element('#Childs2').val(); var room3child = angular.element('#Childs3').val();
			var room4child = angular.element('#Childs4').val();
			var room1childage = "";	var room1childage2 = ""; var room1childage3 = ""; var room1childage4 = ""; var room1childage5 = "";
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

			var child1WithAge = ''; var child2WithAge = '';	var child3WithAge = '';	var child4WithAge = '';
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

			var room1complete = roomindex1+room1adult+','+child1WithAge; var room2complete = roomindex2+room2adult+','+child2WithAge;
			var room3complete = roomindex3+room3adult+','+child3WithAge; var room4complete = roomindex4+room4adult+','+child4WithAge;
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
			var noofrooms = totalrooms;
			var modifyData = ('city='+encodeURIComponent(cityname)+'&citycode='+encodeURIComponent(citycode)+'&datain='+encodeURIComponent(startDate)+'&dateout='+encodeURIComponent(EndDate)+'&ay='+encodeURIComponent(appkey)+'&noofrooms='+noofrooms+'&currency='+currency+'&rooms='+encodeURIComponent(rooms)+'&adt='+totalAdultCount+'&chd='+totalChildCount+'&thm='+$scope.Theme);
			localStorageService.set('hotelUrlParameters',modifyData);
			$location.path('/Hotel-List-'+$scope.Theme).search(modifyData);
		}
		$scope.pagination = false;
	}

	$scope.returnIndex = function(){
		window.location.href = window.location.href.replace(/#.*$/, '#/hotel');
	}
	/* mobile responsiveness setting up*/
	var is_mobile = false;
	if( $('#hideloader').css('display')=='none') {
		is_mobile = true;       
	}

	/* Call Hotel Room Details*/
	$scope.hotelRoomDetail = function(index){
		var roomdetails = {};
		roomdetails.roomApkey = angular.element('#roomApkey-'+index).val();
		roomdetails.roomsearchKey = angular.element('#roomsearchKey-'+index).val();
		roomdetails.hotelCode = angular.element('#hotelCode-'+index).val();
		roomdetails.citycode = angular.element('#citycode').val();
		roomdetails.cityname = angular.element('#hotelcity').val();
		if (is_mobile == true) {
			$location.path('/Hotel-Details-'+$scope.Theme).search('roomsearchKey='+encodeURIComponent(roomdetails.roomsearchKey)+
					'&roomApkey='+encodeURIComponent(roomdetails.roomApkey)+'&hotelCode='+encodeURIComponent(roomdetails.hotelCode)+'&citycode='+encodeURIComponent(roomdetails.citycode)+'&city='+encodeURIComponent(roomdetails.cityname)+
					'&datain='+$scope.ErrorModalData.checkin+'&dateout='+$scope.ErrorModalData.checkout+'&noofrooms='+$scope.ErrorModalData.noofrooms+
					'&adt='+$scope.ErrorModalData.noofadults+'&chd='+$scope.ErrorModalData.noofchilds+'&rooms='+encodeURIComponent($location.search().rooms)+
					'&apiids='+encodeURIComponent(roomdetails.apiids)+'&thm='+$scope.Theme);
		}else{
			var url='#/Hotel-Details-'+$scope.Theme+'?'+'roomsearchKey='+encodeURIComponent(roomdetails.roomsearchKey)+'&roomApkey='+encodeURIComponent(roomdetails.roomApkey)+
			'&hotelCode='+encodeURIComponent(roomdetails.hotelCode)+'&citycode='+encodeURIComponent(roomdetails.citycode)+'&city='+encodeURIComponent(roomdetails.cityname)+
			'&datain='+$scope.ErrorModalData.checkin+'&dateout='+$scope.ErrorModalData.checkout+'&noofrooms='+$scope.ErrorModalData.noofrooms+
			'&adt='+$scope.ErrorModalData.noofadults+'&chd='+$scope.ErrorModalData.noofchilds+'&rooms='+encodeURIComponent($location.search().rooms)+			
			'&apiids='+encodeURIComponent(roomdetails.apiids)+'&thm='+$scope.Theme;
			window.open(url, '_blank');
		}
	}

	/*Get No of Adult and Child Count*/
	$scope.getnoofadultandchild = function(passdetail){
		var temp = passdetail;
		var noofadults = 0;
		var noofchild = 0;
		var count = 0;
		while(temp.length >= 2 && temp.indexOf("$") > -1 )
		{		  
			var guesttextindex = temp.lastIndexOf("$");
			var guesttext = temp.substring(guesttextindex);    
			var roomid = guesttext.substring(1, 2);
			var adultcount = guesttext.substring(3, 4); 
			var childcount = guesttext.substring(5, 6);
			noofadults = parseInt(adultcount) +  parseInt(noofadults);	  
			noofchild = parseInt(childcount) +  parseInt(noofchild);
			if(guesttextindex == 0)
				break;
			else
				temp = temp.substring(0, guesttextindex-1);
		}
		$scope.noofadults = noofadults;
		$scope.noofchilds  = noofchild;
	}


	/*Getting Room Details to the Room Quote on same Page*/	
	$scope.getroomdetails = function(hotelcode,roomstayindex){
		$scope.loadpricebar = false;
		$scope.getRoom = {};
		jQuery.noConflict();	
		$("#btn"+roomstayindex).removeClass('btn-info').addClass('btn-greeninfo');
		$scope.roomstayindex = roomstayindex;
		var hcode = $scope.gethotelcode(hotelcode);
		$scope.getRoom.appkey = $scope.appkey;
		$scope.getRoom.searchkey = $scope.searchkey;
		$scope.getRoom.hotelcode = hcode;
		$("#load_"+roomstayindex).attr('style', 'display:block;');
		$scope.roomloader = true;

		hotelServices.Roomdetails($scope.getRoom).then(function(response){
			$scope.loadpricebar = false;
			//$http.get('roomdetail.json').then(function(response){	
			//console.log(response);
			var data = response.data;
			if(data.status.code == '1')
			{
				$scope.basic = null;
				$scope.HotelResult = data.rs;
				$scope.searchdata = data.hotelSearchCommand;
				$scope.appkey = data.hotelSearchCommand.apikey;
				$scope.noofrooms=data.hotelSearchCommand.noofrooms;
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
				var latitude = $scope.HotelResult.basicPropertyInfo.position.latitude;
				var longitude = $scope.HotelResult.basicPropertyInfo.position.longitude;
				var hotelname = $scope.HotelResult.basicPropertyInfo.hotelName;
				var queryResult = angular.element('#selectandadd');
				queryResult.val('Add');
				var roomreqsarray = []; /* If you have no data to put in yet. */
				var rooms = [];
				angular.forEach($scope.RoomGroup, function(roomgroupindexvalue,roomgroupindex) {
					if(roomgroupindex == 0)
					{
						if(roomgroupindexvalue.InfoSource == 'FixedCombination' || roomgroupindexvalue.InfoSource == 'Fixed Combination')
						{
							angular.forEach(roomgroupindexvalue.RoomCombination, function(value,index) {	
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
				$scope.room0 = undefined; $scope.room1 = undefined;	$scope.room2 = undefined; $scope.room3 = undefined;
				$scope.roomreqsarray = roomreqsarray;				
				$scope.selectDefaults();
				$scope.getselectbookingcode();
				$scope.getTotal();
				$scope.getselectroomtype();
				$scope.getroomrateusingindex();
				$scope.display = "block";
				$scope.bookloader = false; 
				$scope.errordiv = false;
				$scope.totalroomtype = 0;
				$scope.totalselecedrooms = $scope.searchdata.noofrooms;
				$scope.deaultselecedrooms = $scope.HotelResult.roomRates.roomRates[0].RoomTypeName;
				$scope.totalprice = parseFloat(parseFloat($scope.roomprice0) + parseFloat($scope.roomprice1) + parseFloat($scope.roomprice2) +  parseFloat($scope.roomprice3)).toFixed(2);
				$scope.room1loadoption = 'preload';	$scope.room2loadoption = 'preload';
				$scope.room3loadoption = 'preload';	$scope.room4loadoption = 'preload';
				$("#load_"+roomstayindex).attr('style', 'display:none;');
				$('#QuoteModal').modal('show');
				$(window).trigger("resize"); 
			}
			else
			{
				jQuery.noConflict();	
				$("#btn"+roomstayindex).removeClass('btn-greeninfo').addClass('btn-info');
				$("#load_"+roomstayindex).attr('style', 'display:none;');
				$('#QuoteErrorModal').modal('show');
			}
		},function(){
			jQuery.noConflict();	
			$("#btn"+roomstayindex).removeClass('btn-greeninfo').addClass('btn-info');
			$("#load_"+roomstayindex).attr('style', 'display:none;');
			$('#QuoteErrorModal').modal('show');
		})
	}
	
	/*	Return Room Amenties */
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
								amenitiesvalue.description = amenitiesvalue.description.substring(0, amenitiesvalue.description.length - 1);
							}
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
			amenities.push("No Information Avaiable.");

		return amenities;
	}
	
	$scope.getNumber = function(num) {
		var intnum = parseInt(num)
		return new Array(intnum);   
	}

	/*Return Room Combo Options*/
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

	/*Return Room Rate*/
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

	$scope.getselectbookingcode=function(roomIndex)
	{ 
		var selcetedbookingCode=0;
		angular.forEach($scope.HotelResult.roomRates.roomRates, function(value,index) { 
			if(roomIndex == value.RoomIndex){
				selcetedbookingCode = value.bookingCode;
			}		
		});
		return selcetedbookingCode;		
	}
	
	$scope.getselectroomtype = function(roomIndex)
	{ 
		var selcetedroomtype = '';
		angular.forEach($scope.HotelResult.roomRates.roomRates, function(value,index) { 
			if(roomIndex == value.RoomIndex){
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
						$scope.roomprice0 = value.rates.rates[0].bookingPrice.totalAmountPayable;
						$scope.roomtype0 =  $scope.getroomtypename(value.roomTypeCode);
					}
				});
			}
			if(roomIndex == 1)
			{
				angular.forEach($scope.HotelResult.roomRates.roomRates, function(value,index) { 
					if($scope.sortindex ==index){
						$scope.roomprice1 = value.rates.rates[0].bookingPrice.totalAmountPayable;
						$scope.roomtype1 =  $scope.getroomtypename(value.roomTypeCode);
					}
				});
			}
			if(roomIndex == 2)
			{
				angular.forEach($scope.HotelResult.roomRates.roomRates, function(value,index) { 
					if($scope.sortindex ==index){
						$scope.roomprice2 = value.rates.rates[0].bookingPrice.totalAmountPayable;
						$scope.roomtype2 =  $scope.getroomtypename(value.roomTypeCode);
					}
				});
			}
			if(roomIndex == 3)
			{
				$scope.roomprice3 = value.rates.rates[0].bookingPrice.totalAmountPayable;
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
						$scope.roomprice0 = value.rates.rates[0].bookingPrice.totalAmountPayable;
						$scope.roomtype0 =  $scope.getroomtypename(value.roomTypeCode);
					}
				});
			}
			if(roomIndex == 1)
			{
				angular.forEach($scope.HotelResult.roomRates.roomRates, function(value,index) { 
					if($scope.sortindex ==index){
						$scope.roomprice1 = value.rates.rates[0].bookingPrice.totalAmountPayable;
						$scope.roomtype1 =  $scope.getroomtypename(value.roomTypeCode);
					}
				});
			}
			if(roomIndex == 2)
			{
				angular.forEach($scope.HotelResult.roomRates.roomRates, function(value,index) { 
					if($scope.sortindex ==index){
						$scope.roomprice2 = value.rates.rates[0].bookingPrice.totalAmountPayable;
						$scope.roomtype2 =  $scope.getroomtypename(value.roomTypeCode);
					}
				});
			}
			if(roomIndex == 3)
			{
				$scope.roomprice3 = value.rates.rates[0].bookingPrice.totalAmountPayable;
				$scope.roomtype3 =  $scope.getroomtypename(value.roomTypeCode);
			}
		});
		$scope.$apply(function() { $scope.totalprice = ( $scope.roomprice0 + $scope.roomprice1 + $scope.roomprice2 +  $scope.roomprice3 ).toFixed(2)});
	}
//	Room combination group available room index
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
	//Geting Room Request Options call...
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
		//GetRoomCombinationroom load rooms ...				
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

	$scope.getroomid = function(roomIndex){
		var roomid = '0';
		angular.forEach($scope.HotelResult.roomRates.roomRates, function(value,index) {
			if(value.RoomIndex == roomIndex)
			{
				roomid = value.roomID;
			}
		});

		return roomid;
	}

	//Api Provider code
	$scope.getApiProvider = function(roomIndexSelected) {
		var apiProvider = -1;
		angular.forEach($scope.RoomGroup, function(roomgroupindexvalue,roomgroupindex) {
			if(roomgroupindexvalue.InfoSource == 'FixedCombination' || roomgroupindexvalue.InfoSource == 'Fixed Combination')
			{
				angular.forEach(roomgroupindexvalue.RoomCombination, function(value,index) {									
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

	$scope.getTotal = function() {
		var total = parseInt(0);
		angular.forEach($scope.roomreqsarray, function(roomreq, roomreqindex) {
			total = parseFloat(total) + parseFloat(roomreq.price);					
		});
		return parseFloat(total).toFixed(2);  
	}
	$scope.getselectroomtype = function(roomIndex)
	{ 
		var selcetedroomtype = '';
		angular.forEach($scope.HotelResult.roomRates.roomRates, function(value,index) { 
			if(roomIndex == value.RoomIndex){
				selcetedroomtype = value.RoomTypeName;
			}		
		});
		return selcetedroomtype;		
	}

	$scope.getselectbookingcode=function(roomIndex)
	{
		var selcetedbookingCode=0;
		angular.forEach($scope.HotelResult.roomRates.roomRates, function(value,index) { 
			if(roomIndex == value.RoomIndex){		
				selcetedbookingCode = value.bookingCode;
			}
		});
		return selcetedbookingCode;		
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

	/* Set Default Values */
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

	/* Clear Default Values */
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

	
	$scope.disableIfNotSelected = function() {
		if($scope.roomreqsarray == undefined || $scope.indexarray == undefined)
			return true;
		if($scope.roomreqsarray.length == $scope.indexarray.length)
			return false;
		else
			return true;
	}
	
	//fixed group Rooms
	$scope.isFixedGroupRoom = function(roomIndex) {
		var isFixedGroupRoom = false;
		angular.forEach($scope.RoomGroup, function(roomgroupindexvalue,roomgroupindex) {
			if(roomgroupindexvalue.InfoSource == 'FixedCombination' || roomgroupindexvalue.InfoSource == 'Fixed Combination')
			{
				angular.forEach(roomgroupindexvalue.RoomCombination, function(value,index) {							
					angular.forEach(value.RoomIndex, function(roomindexvalue,roomindex) {
						if(roomindexvalue == roomIndex)
							isFixedGroupRoom = true;
					});						
				});
			}			
		});
		return isFixedGroupRoom;
	}

	/*getting value from url for hotelsearch value*/
	$scope.setScopeUser = function(locationpath){
		var hotelSearch={};
		var startDate = locationpath.datain;
		var datestart = startDate.split("/").reverse().join("-");
		var EndDate = locationpath.dateout;
		var dateend = EndDate.split("/").reverse().join("-");
		hotelSearch.mode = '0';
		hotelSearch.type = '4';
		hotelSearch.order = 'PRICE';
		hotelSearch.filter = '7';
		hotelSearch.cachelevel = 'Live';
		hotelSearch.version = '1.0';
		hotelSearch.lang ='en';
		hotelSearch.apiid = "4,1";
		hotelSearch.currency = locationpath.currency;
		var appky= angular.element('#apky').val();	
		if(appky != null && appky != '')
			locationpath.ay = appky;	

		hotelSearch.appkey = locationpath.ay; 
		hotelSearch.istesting = false;
		if(locationpath.isdynamocmarkup != null){		
			hotelSearch.isDynamicMarkup = locationpath.isdynamocmarkup;
			hotelSearch.markupAmount = locationpath.markupamt;	
			hotelSearch.searchkey = locationpath.searchkey;
		}else{			
			hotelSearch.isDynamicMarkup=false;
			hotelSearch.markupAmount='0';
			hotelSearch.searchkey = '';
		}
		hotelSearch.cityfull = locationpath.city;  hotelSearch.citycode = locationpath.citycode; hotelSearch.noofrooms = locationpath.noofrooms;
		hotelSearch.rooms = locationpath.rooms;	hotelSearch.datestart = datestart; hotelSearch.dateend= dateend;

		return hotelSearch;
	}

	/*get value from url for hotelquote search value*/
	$scope.setScopeQuoteUser = function(locationpath){
		var hotelSearch={};
		var startDate = locationpath.datain;
		var datestart = startDate.split("/").reverse().join("-");
		var EndDate = locationpath.dateout;
		var dateend = EndDate.split("/").reverse().join("-");
		hotelSearch.mode = '0';
		hotelSearch.type = '4';
		hotelSearch.order = 'PRICE';
		hotelSearch.filter = '7';
		hotelSearch.cachelevel = 'Live';
		hotelSearch.version = '1.0';
		hotelSearch.lang ='en';
		hotelSearch.apiid = "4,1";
		hotelSearch.currency = locationpath.currency;
		var appky= angular.element('#apky').val();	
		if(appky != null && appky != '')
			locationpath.ay = appky;	

		hotelSearch.appkey = locationpath.ay; 
		hotelSearch.istesting = false;
		if(locationpath.isdynamocmarkup != null){		
			hotelSearch.isDynamicMarkup = locationpath.isdynamocmarkup;
			hotelSearch.markupAmount = locationpath.markupamt;	
			hotelSearch.searchkey = locationpath.searchkey;
		}else{			
			hotelSearch.isDynamicMarkup=false;
			hotelSearch.markupAmount='0';
			hotelSearch.searchkey = '';
		}
		hotelSearch.cityfull = locationpath.city;  hotelSearch.citycode = locationpath.citycode; hotelSearch.noofrooms = locationpath.noofrooms;
		hotelSearch.rooms = locationpath.rooms;	hotelSearch.datestart = datestart; hotelSearch.dateend= dateend;

		return hotelSearch;
	}

	$scope.selectandadd =  function(roomReqIndexSelected ,roomIndex,event)
	{	
		// Get All the Input element
		var queryResult =  angular.element.find('.bok-ty input');
		// Change all element inner html value with default text select
		for(var i=0;i<angular.element(queryResult).length;i++){
			var wrappedQueryResult = angular.element(queryResult).next()[i];
			wrappedQueryResult.innerHTML = 'Add';			
		}
		// Change the text for current and select click event
		angular.element(event.currentTarget).next()[0].innerHTML = 'Added'
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
		}
		if($scope.isFixedGroupRoom(roomIndex))
		{
			$scope.roomreqsarray = [];	
			$scope.room0 = undefined; $scope.room1 = undefined;	$scope.room2 = undefined; $scope.room3 = undefined;
			for(var roomcomboindex=0;roomcomboindex<$scope.searchdata.noofrooms;roomcomboindex++) {			
				if(roomReqIndexSelected != roomcomboindex )
				{
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
			//room should be added when the selection is empty or selection doesnt have selected room req index
			if (roomreqsarraytemp.length == 0 || isNewSelection) {
				//new selection ..## first selection
				roomreqsarraytemp.push({reqindex: roomReqIndexSelected, name: $scope.getselectroomtype(roomIndex), price: $scope.getroomrateusingindex(roomIndex), bookingcode:$scope.getselectbookingcode(roomIndex), roomindex:roomIndex, apiProvider:selectedRoomProvider});  
			}
			$scope.roomreqsarray = roomreqsarraytemp;
		}	

		$scope.roomSchema = $location.search().rooms;
		$scope.userId = $location.search().userId;
		$scope.CompanyId = $location.search().companyId;
		var quotejson = {'hotelName':$scope.HotelResult.basicPropertyInfo.hotelName,'hotelCode':$scope.HotelResult.basicPropertyInfo.hotelCode,'hotelCategory':$scope.HotelResult.basicPropertyInfo.hotelClass,'hotelAddress':$scope.HotelResult.basicPropertyInfo.address.addressLines[0],
				'hotelCity':$scope.searchcityname,'hotelCountry':$scope.HotelResult.basicPropertyInfo.address.countryName.value,'projectAddress':'','distanceFromWork':'','roomType':$scope.roomreqsarray[0].name,
				'checkInDate':$scope.hoteluser.datestart,'checkInTime':'12:00','checkOutDate':$scope.dateend,'checkOutTime':'12:00','nightCount':$scope.noofnights,'roomCount':$scope.noofrooms,'adultCount':$scope.noofadults,'childCount':$scope.noofchilds,'roomRatePerNight':$scope.roomreqsarray[0].price,'availablePaymentOption':'Online',
				'taxes':'yes','breakfast':'yes','internet':'yes','cancellationPolicy':'','preferProperty':true,'companyId':$scope.CompanyId,'userId':$scope.userId,'bookingMode':'online','cityCode':$scope.citycode,'statusId':1,'roomSchema':$scope.roomSchema};
		$scope.hotelquotemap[$scope.HotelResult.basicPropertyInfo.hotelName] = quotejson;
	}

	$scope.showallquotes = function(){
		$scope.loadpricebar = false;
		$scope.quotearray = [];
		for (var key in $scope.hotelquotemap) {
			if ($scope.hotelquotemap.hasOwnProperty(key)) {				
				var obj = $scope.hotelquotemap[key];			
				$scope.quotearray.push(obj);
			}
		}	
		$("#myModalQuotation").modal(); 
		$scope.$apply();
	}

	$scope.removequote = function(hotelname){
		delete $scope.hotelquotemap[hotelname];
		$scope.quotearray = [];
		for (var key in $scope.hotelquotemap) {
			if ($scope.hotelquotemap.hasOwnProperty(key)) {				
				var obj = $scope.hotelquotemap[key];			
				$scope.quotearray.push(obj);
			}
		}	
	}

	$scope.getratePlanCode = function(roomindex){
		var ratePlanCode = '';
		angular.forEach($scope.HotelResult.roomRates.roomRates, function(value,index) { 

			if(roomindex == value.RoomIndex){
				ratePlanCode = value.ratePlanCode;
			}

		});
		return ratePlanCode;
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
		return description
	}

	$scope.selectandchange =  function(roomReqIndexSelected , roomIndex)
	{
		var queryResult = angular.element('#selectandadd');
		queryResult.val('Add');
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
			//clears slection		
			$scope.roomreqsarray = [];	
			$scope.clearDefaults(roomReqIndexSelected);
			//clearDefaults	
		}
		if($scope.isFixedGroupRoom(roomIndex))
		{
			//room request index Selection for fixed combination					
			$scope.roomreqsarray = [];			
			//clear room selection 
			//auto select other rooms
			$scope.room0 = undefined; $scope.room1 = undefined;	$scope.room2 = undefined; $scope.room3 = undefined;

			for(var roomcomboindex=0;roomcomboindex<$scope.searchdata.noofrooms;roomcomboindex++) {			
				if(roomReqIndexSelected != roomcomboindex )
				{
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
			//room request index Selection for Open combination
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
			//room should be added when the selection is empty or selection doesnt have selected room req index
			if (roomreqsarraytemp.length == 0 || isNewSelection) {
				//new selection ..## first selection
				roomreqsarraytemp.push({reqindex: roomReqIndexSelected, name: $scope.getselectroomtype(roomIndex), price: $scope.getroomrateusingindex(roomIndex), bookingcode:$scope.getselectbookingcode(roomIndex), roomindex:roomIndex, apiProvider:selectedRoomProvider});  
			}
			$scope.roomreqsarray = roomreqsarraytemp;
		}
	}

	$scope.selectandadded =  function(value)
	{
		var queryResult = angular.element('#selectandadd');		
		queryResult.val('Added');
		angular.element('#selectandadd').removeClass('but').addClass('btn-greeninfo'); 
		$scope.pernightpricetotal=$scope.getTotal();
		$scope.roomSchema = $location.search().rooms;
		$scope.userId = $location.search().userId;
		$scope.CompanyId = $location.search().companyId;
		var rateplancode = $scope.getratePlanCode($scope.roomreqsarray[0].roomindex);
		var cancellationPolicy = $scope.getCancelationPolicy(rateplancode,$scope.roomreqsarray[0].roomindex);
		var quotejson = {'hotelName':$scope.HotelResult.basicPropertyInfo.hotelName,'hotelCode':$scope.HotelResult.basicPropertyInfo.hotelCode,'hotelCategory':$scope.HotelResult.basicPropertyInfo.hotel_Star+' Star','hotelAddress':encodeURIComponent($scope.HotelResult.basicPropertyInfo.address.addressLines[0]),
				'hotelCity':$scope.searchcityname,'hotelCountry':$scope.HotelResult.basicPropertyInfo.address.countryName.value,'projectAddress':'','distanceFromWork':'','roomType':encodeURIComponent($scope.roomreqsarray[0].name),
				'checkInDate':$scope.hoteluser.datestart,'checkInTime':'12:00','checkOutDate':$scope.hoteluser.dateend,'checkOutTime':'12:00','nightCount':$scope.noofnights,'roomCount':$scope.noofrooms,'adultCount':$scope.noofadults,'childCount':$scope.noofchilds,'roomRatePerNight':$scope.pernightpricetotal,'availablePaymentOption':'Prepaid','nightCount':$scope.noofnights,
				'taxes':'yes','breakfast':'yes','internet':'yes','cancellationPolicy':encodeURIComponent(cancellationPolicy.toString()),'preferProperty':true,'companyId':$scope.CompanyId,'userId':$scope.userId,'bookingMode':'online','cityCode':$scope.citycode,'statusId':1,'roomSchema':$scope.roomSchema,'roomId':$scope.getroomid($scope.roomreqsarray[0].roomindex)};
		$scope.hotelquotemap[$scope.HotelResult.basicPropertyInfo.hotelName] = quotejson;
		setTimeout(function(){
			$('#QuoteModal').modal('hide');
			angular.element('#selectandadd').removeClass('btn-greeninfo').addClass('btn-info'); 
		},1500);
		$scope.quoteloaded = true;
		//$scope.getCancelationPolicy(rateplancode,$scope.roomreqsarray[0].roomindex)
	}

	$scope.decoderoomtype = function(roomtype){
		return decodeURIComponent(roomtype);
	}

	$scope.addquotesModal = function(){
		$('#myModalQuotation').modal('hide');
		$scope.quotearray = [];
		for (var key in $scope.hotelquotemap) {
			if ($scope.hotelquotemap.hasOwnProperty(key)) {				
				var obj = $scope.hotelquotemap[key];			
				$scope.quotearray.push(obj);
			}
		}
		$scope.hotelquotationid = $location.search().hotelquotationid;
		var quotejson = {'hotelTravelRequest':$scope.hotelquotationid,"quotes":$scope.quotearray};
		var finalUrl = ibeurl+"InsertQuote";
		var urlnew = $scope.AdminUrl +'getHotelRequestTravelQuotationList?hotelQuotationRequestId='+$scope.hotelquotationid;
		$http({method:'POST',url:finalUrl,data:'QuotationJson='+JSON.stringify(quotejson),async: false,headers:{'Content-Type' : 'application/x-www-form-urlencoded'}}).		
		success(function(data, status, headers, config){
		}).error(function(data, status, headers, config){ 
		});
		$('#addQuoteConfirmModal').modal('show');
	}

	/* Add All Quote to database */
	$scope.addquotes = function(){
		$('#addQuoteConfirmModal').modal('hide');
		var redirecturl = $scope.AdminUrl +'getHotelRequestTravelQuotationList?hotelQuotationRequestId='+$scope.hotelquotationid;
		var redirectWindow = window.open(redirecturl, '_blank'); 
		$scope.quotearray = [];
		$scope.hotelquotemap ={};
		$scope.quoteloaded = false;
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

	$scope.resetLastFilters = function(id){
		$scope.getrating(id);		
		angular.element('.starFilter'+id).val("true");
	}
	
	$scope.checkHotelType = function(type){		
		if(type =='OFFLINE'){
			$scope.hotelMode = 'OFFLINE';
			angular.element('.hotelFunction'+type).val("true");
		}
	};
	
	$scope.undoHotelModeFilters = function(bool){	
		$scope.checkhotelmodefilter(bool);
		angular.element('.hotelFunctionOFFLINE').val("false");

	}
	$scope.resetAllFilters = function(id,type){
		var FilterId = angular.element('.starFilter'+id).val();
		var mode = angular.element('.hotelFunctionOFFLINE').val();
		$scope.priceSlider = {min: 1000, max: 2000, ceil: 2000, floor: 1000, step: 10 };
		$(document).ready(function(){
			if(FilterId == 'true' && mode == 'false'){			 
				$('.starFilter1').click(); 			 
			}else if(FilterId == 'false' && mode == 'true'){
				setTimeout(function(){ $('.hotelFunctionOFFLINE').click();	 },1000);
			}else if(FilterId == 'true' && mode == 'true'){
				$('.starFilter1').click();			 
				setTimeout(function(){ $('.hotelFunctionOFFLINE').click();	 },1000); 
			}
		});	 
	}
	
	$scope.modifySearch = function(){
		angular.element('#changerefine').hide();
		angular.element('#searchrefine').show();
	}


	$scope.init();
}]);

app.animation('.slide-animation', function () {
	return {
		beforeAddClass: function (element, className, done) {
			var scope = element.scope();
			if (className == 'ng-hide') {
				var finishPoint = element.parent().width();
				if(scope.direction !== 'right') {
					finishPoint = -finishPoint;
				}
				TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done });
			}
			else {
				done();
			}
		},
		removeClass: function (element, className, done) {
			var scope = element.scope();
			if (className == 'ng-hide') {
				element.removeClass('ng-hide');
				var startPoint = element.parent().width();
				if(scope.direction === 'right') {
					startPoint = -startPoint;
				}
				TweenMax.fromTo(element, 0.5, { left: startPoint }, {left: 0, onComplete: done });
			}
			else {
				done();
			}
		}
	};
});

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

app.filter('array', function() {
	return function(items) {
		var filtered = [];
		var createuniquearr = [];
		angular.forEach(items, function(item) {			
			createuniquearr.push(item.basicPropertyInfo.basic);
		});
		filtered = createuniquearr.unique();
		var jsonfiltered = [];
		angular.forEach(filtered, function(item) {
			var jsonname = {price:item }
			jsonfiltered.push(jsonname);
		});
		Array.prototype.unique = function() {
			var a = [];
			for ( i = 0; i < this.length; i++ ) {
				var current = this[i];
				if (a.indexOf(current) < 0) a.push(current);
			}
			this.length = 0;
			for ( i = 0; i < a.length; i++ ) {
				this.push( a[i] );
			}
			return this.sort();
		}
		return filtered;
	};
});

app.directive('myDirective', function() {
	return function(scope, element, attrs) { 

		scope.$watch(attrs.myDirective, function(value) {

			alert(attrs.class)
		}); 
	}
});

app.directive('autoCompleteDirectives', function($timeout) {
	return function(scope, iElement, iAttrs) {
		iElement.autocomplete({
			minLength:3,
			source: scope[iAttrs.uiItems] ,
			select: function() {			 
				$timeout(function() {

					var focused = angular.element( document.activeElement); 
					scope.$parent.hotelname = focused.val();
					if(scope.$parent.hotelname != ''){
						var i = $.inArray(focused.val(), scope.$parent.HotelnameIncludes);
						if (i > -1) {
							scope.$parent.HotelnameIncludes.splice(i, 1);
						} else {
							scope.$parent.HotelnameIncludes.push(focused.val());
							scope.$parent.showAllHotels = false;
						}
						if(scope.$parent.HotelnameIncludes.length == 0)
							scope.$parent.showAllHotels = true;    
					}

				}, 0);

			}

		});
	};
});

//hotel map show view
var ModalInstanceCtrl = function ($scope, $modalInstance, lat, lng) {

	$scope.lat = lat; $scope.lng = lng;	$scope.render = true;
	$scope.$on('mapInitialized', function(evt, evtMap) {
		var mynewCenter = null;	$scope.map = null; $scope.map = evtMap;
		$scope.marker = new google.maps.Marker({position: evt.latLng, map: $scope.map});
		var mynewCenter = new google.maps.LatLng(lat, lng);	 
		var marker = new google.maps.Marker({position: mynewCenter, map: $scope.map});
		$scope.marker.setPosition(mynewCenter);
		$scope.click = function(evt) {
			title:  hotelname
		}
	});

	$scope.ok = function () {
		$modalInstance.close();
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
};