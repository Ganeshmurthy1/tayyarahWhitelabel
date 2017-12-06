var app = angular.module('myApp');
app.controller('FlightIndexCtrl',['$scope','$http','flightServices','limitToFilter','commonService','$location','$rootScope','localStorageService','$timeout','transporter', function($scope,$http,flightServices,limitToFilter,commonService,$location,$rootScope,localStorageService,$timeout,transporter) {
	var apiUrl = commonService.baseUrl;
	$scope.user = {}; 
	$scope.init = function(){
		localStorageService.remove('userdata');
		localStorageService.remove('AgentConfirmData');
		localStorageService.remove('Agentholddata');
		localStorageService.remove('UrlParameters'); 
		localStorageService.remove('rmblockData');

		$(document).ready(function(){
			var countrylist = "<option value='Airline'>Airline</option>";
			$.ajax({
				url: 'airlines.json',
				type: 'post',      
				dataType: 'json', 
				success: function (data) {   
					data.sort(compare);
					for(var i=0;i<data.length;i++)
					{
						countrylist += "<option value="+data[i].airlinecode+">"+data[i].airlinename+"</option>";               
					}
					$("#onewayairline").append(countrylist);
					$("#roundairline").append(countrylist);
					$("#multiairline").append(countrylist);       
				}   
			}); 
			$("#origin2").focus(function () {   
				$("#origin2").val($("#destmulti1").val());
			});
			$("#origin3").focus(function () {   
				$("#origin3").val($("#destmulti2").val());
			});
			$("#origin4").focus(function () {   
				$("#origin4").val($("#destmulti3").val());
			});
		});

		function compare(a,b) {
			if (a.airlinename < b.airlinename)
				return -1;
			else if (a.airlinename > b.airlinename)
				return 1;
			else 
				return 0;
		}	
		$scope.cacheInitalCall();
	};


	$scope.FlightMenu = function(){ 	$location.path('/');        }
	$scope.HotelMenu = function(){		$location.path('/hotel');	}
	$scope.BusMenu = function(){		$location.path('/bus');  	}
	$scope.CarMenu = function(){		$location.path('/cars');	}
	

/**
*Description: To Load the Cities in index page.
 **/
	$scope.cities = function(cityName) {
		var cityarr = [];

		return $http.get(apiUrl + "Search/bycity/" + cityName).then(function(response) {

			angular.forEach(response.data, function(value) {
				cityarr.push(value.city + "," + value.country + "," + "(" + value.airport_code + ")");

			});

			return limitToFilter(cityarr, 5);
		});
	};

/**
*Description: To show focus after destination index page.
 **/
	$scope.onSelectPart = function($item, $model, $label) {
		$scope.$item = $item;
		$scope.$model = $model;
		$scope.$label = $label;
		$('#hideori').val($scope.user.originall);
		$('#hidedes').val($scope.user.destinationall);
		var fromDate=angular.element('#twodpd1').val();

		if ($scope.user.destinationall != undefined) {
			$timeout(function() {
				angular.element(document.querySelector('#twodpd1')).focus();
			},0);

		}  

	};

/**
*Description: prototype of date in index page.
 **/
	$scope.yyyymmdd = function(dateIn) {
		var yyyy = dateIn.getFullYear();
		var mm = dateIn.getMonth()+1; // getMonth() is zero-based
		var dd  = dateIn.getDate();
		return String(10000*yyyy + 100*mm + dd); // Leading zeros for mm and dd
	}


/**
*Description: Form submit in index page.
**/
	$scope.flightsearch = function(){
		var origin = $scope.user.originall;
		var destination = $scope.user.destinationall;
		var isDynamicmarkup = false;
		var markupAmount = 0;
		var searchkey = '';
		var adult = angular.element('#adultid').text();
		var kid = angular.element('#kidid').text();
		var infant = angular.element('#infantid').text();
		var agentapp_key = angular.element('#ay').val();		
		var app_key  = '';
		var isLabeling = angular.element('#iswhitelabel').val();		
		if(agentapp_key ==undefined ||agentapp_key== null){
			app_key = angular.element('#oky').val();

		}
		else{
			app_key= agentapp_key;
		}
			
		var currency = angular.element('#onecurrencyname').val();
		var cabinClass = angular.element('#cabinselect').val();		
		var newAirline = angular.element('#onewayairline').val();
		var triptype = angular.element('#triptypeselect').val();
		var trips = '1';
		var airline = '';
		if(newAirline == "Airline")
			airline = '';
		else
			airline = angular.element('#onewayairline').val();
		var isDomestic = false;
//domestic check code
		if (originCountry == "India" && destinationCountry == "India")
			isDomestic = true;
// Set Origin Country	 	
		var orifirstindex = origin.indexOf(',') + 1;
		var orilastindex = origin.lastIndexOf(',');	
		var originCountry = origin.substring(orifirstindex, orilastindex);
// Set Destination Country 	
		var desfirstindex = destination.indexOf(',') + 1;
		var deslastindex = destination.lastIndexOf(',');		
		var destinationCountry = destination.substring(desfirstindex, deslastindex);
		$scope.ThemeType = angular.element('#themeType').val();

/**
 *Cache country for flights
 */ 
		var oriCachefirstindex = origin.indexOf('(') + 1;
		var oriCachelastindex = origin.lastIndexOf(')');	
		var originCacheCity = origin.substring(oriCachefirstindex, oriCachelastindex);	
		var desCachefirstindex = destination.indexOf('(') + 1;
		var desCachelastindex = destination.lastIndexOf(')');	
		var destCacheCity = destination.substring(desCachefirstindex, desCachelastindex);		 
		$scope.cacheData = {};			 

/**
 *Description: condition check for oneway,roundtrip and specialround trip.
 **/
		if(triptype == "O"){

			var deptDate = $("#twodpd1").val();
			var arrivalDate = $("#twodpd2").val();
			if (origin == "") {
				$("#errori").text("Please Enter the Origin City");
				$('#errori').stop().fadeIn(400).delay(1500).fadeOut(400);		   
			} else if (destination == "") {
				$("#errdes").text("Please Enter the Destination City");
				$('#errdes').stop().fadeIn(400).delay(1500).fadeOut(400);
			} 

			else if (origin == destination) {
				$("#errdes").text("Please Enter the Different Destination City");
				$('#errdes').stop().fadeIn(400).delay(1500).fadeOut(400);
			}else if (deptDate == "") {			
				$("#errdep").text("Select the Depart date");
				$('#errdep').stop().fadeIn(400).delay(1500).fadeOut(400);
			} 
			else if (agentapp_key=="") {			
				$("#errconfig").text("User not Configured");
				$('#errconfig').stop().fadeIn(400).delay(1500).fadeOut(400);
			} 
			else{				
				trips = '1';		
				var cachedData;
				var oneWayUrl;

				angular.forEach($scope.cacheDataArray,function(value,index){
					angular.forEach(value,function(value2,index){
						if(originCacheCity == value2.origin && destCacheCity == value2.destination && value2.oneway == true){
							$scope.cacheData.origin = value2.origin;
							$scope.cacheData.destination = value2.destination;
							$scope.cacheData.oneway = value2.oneway;
							$scope.cacheData.roundTrip = value2.roundTrip;
						}
					})
				})
				if(originCacheCity == $scope.cacheData.origin && destCacheCity == $scope.cacheData.destination && originCountry == destinationCountry && $scope.cacheData.oneway == true){
					cachedData = true;
					oneWayUrl = ('/Flights-oneway-'+$scope.ThemeType+'?ori='+encodeURIComponent(origin)+'&des='+encodeURIComponent(destination)+'&depart='+encodeURIComponent(deptDate)+'&arrival='+encodeURIComponent(arrivalDate)
							+'&class='+encodeURIComponent(cabinClass)+'&ccy='+currency+'&isDom='+isDomestic+'&isDyn='+isDynamicmarkup+'&marAt='+encodeURIComponent(markupAmount)+'&tty='+encodeURIComponent(triptype)
							+'&ay='+encodeURIComponent(app_key)+'&sky='+encodeURIComponent(searchkey)+'&adt='+adult+'&kid='+kid+'&inf='+infant+'&airline='+airline+'&thm='+$scope.ThemeType+'&cache='+cachedData);
				}else{
					cachedData = false;
					oneWayUrl = ('/Flights-oneway-'+$scope.ThemeType+'?ori='+encodeURIComponent(origin)+'&des='+encodeURIComponent(destination)+'&depart='+encodeURIComponent(deptDate)+'&arrival='+encodeURIComponent(arrivalDate)
							+'&class='+encodeURIComponent(cabinClass)+'&ccy='+currency+'&isDom='+isDomestic+'&isDyn='+isDynamicmarkup+'&marAt='+encodeURIComponent(markupAmount)+'&tty='+encodeURIComponent(triptype)
							+'&ay='+encodeURIComponent(app_key)+'&sky='+encodeURIComponent(searchkey)+'&adt='+adult+'&kid='+kid+'&inf='+infant+'&airline='+airline+'&thm='+$scope.ThemeType+'&cache='+cachedData);
				} 
				localStorageService.set('UrlParameters',oneWayUrl);
				$location.url(oneWayUrl);

			}
		}
		else if(triptype == "R"){
			trips = '2';		
			var deptDate = $("#twodpd1").val();
			var arrivalDate = $("#twodpd2").val();
			if (origin == "") {
				$("#errori").text("Please Enter the Origin City");
				$('#errori').stop().fadeIn(400).delay(1500).fadeOut(400);		   
			} else if (destination == "") {
				$("#errdes").text("Please Enter the Destination City");
				$('#errdes').stop().fadeIn(400).delay(1500).fadeOut(400);
			} 
			else if (origin == destination) {
				$("#errdes").text("Please Enter the Different Destination City");
				$('#errdes').stop().fadeIn(400).delay(1500).fadeOut(400);
			}else if (deptDate == "") {			
				$("#errdep").text("Select the Depart date");
				$('#errdep').stop().fadeIn(400).delay(1500).fadeOut(400);
			} 
			else if (arrivalDate == "") {
				$("#errarr").text("Select the Arrival date");
				$('#errarr').stop().fadeIn(400).delay(1500).fadeOut(400);			
			}
			else if (agentapp_key=="") {			
				$("#errconfig").text("User not Configured");
				$('#errconfig').stop().fadeIn(400).delay(1500).fadeOut(400);
			} else{
				var twoWayUrl;
				var roundCached;
				if(originCountry == "India" && destinationCountry == "India"){
					angular.forEach($scope.cacheDataArray,function(value,index){
						angular.forEach(value,function(value2,index){
							if(originCacheCity == value2.origin && destCacheCity == value2.destination && value2.roundTrip == true){
								$scope.cacheData.origin = value2.origin;
								$scope.cacheData.destination = value2.destination;
								$scope.cacheData.oneway = value2.oneway;
								$scope.cacheData.roundTrip = value2.roundTrip;
							}
						})
					})
					if(originCacheCity == $scope.cacheData.origin && destCacheCity == $scope.cacheData.destination && originCountry == destinationCountry){
						roundCached = true;
						twoWayUrl = ('/Flights-Domestic-'+$scope.ThemeType+'?ori='+encodeURIComponent(origin)+'&des='+encodeURIComponent(destination)+'&depart='+encodeURIComponent(deptDate)+'&arrival='+encodeURIComponent(arrivalDate)
								+'&class='+encodeURIComponent(cabinClass)+'&ccy='+currency+'&isDom='+isDomestic+'&isDyn='+isDynamicmarkup+'&marAt='+encodeURIComponent(markupAmount)+'&tty='+encodeURIComponent(triptype)
								+'&ay='+encodeURIComponent(app_key)+'&sky='+encodeURIComponent(searchkey)+'&adt='+adult+'&kid='+kid+'&inf='+infant+'&airline='+airline+'&thm='+$scope.ThemeType+'&cache='+roundCached);
					}else{
						roundCached = false;
						twoWayUrl = ('/Flights-Domestic-'+$scope.ThemeType+'?ori='+encodeURIComponent(origin)+'&des='+encodeURIComponent(destination)+'&depart='+encodeURIComponent(deptDate)+'&arrival='+encodeURIComponent(arrivalDate)
								+'&class='+encodeURIComponent(cabinClass)+'&ccy='+currency+'&isDom='+isDomestic+'&isDyn='+isDynamicmarkup+'&marAt='+encodeURIComponent(markupAmount)+'&tty='+encodeURIComponent(triptype)
								+'&ay='+encodeURIComponent(app_key)+'&sky='+encodeURIComponent(searchkey)+'&adt='+adult+'&kid='+kid+'&inf='+infant+'&airline='+airline+'&thm='+$scope.ThemeType+'&cache='+roundCached);

					}
					localStorageService.set('UrlParameters',twoWayUrl);
					$location.url(twoWayUrl);

				}else{

					var international = ('/Flights-International-'+$scope.ThemeType+'?ori='+encodeURIComponent(origin)+'&des='+encodeURIComponent(destination)+'&depart='+encodeURIComponent(deptDate)+'&arrival='+encodeURIComponent(arrivalDate)
							+'&class='+encodeURIComponent(cabinClass)+'&ccy='+currency+'&isDom='+isDomestic+'&isDyn='+isDynamicmarkup+'&marAt='+encodeURIComponent(markupAmount)+'&tty='+encodeURIComponent(triptype)
							+'&ay='+encodeURIComponent(app_key)+'&sky='+encodeURIComponent(searchkey)+'&adt='+adult+'&kid='+kid+'&inf='+infant+'&airline='+airline+'&thm='+$scope.ThemeType);

					localStorageService.set('UrlParameters',international);
					$location.url(international);
				}
			} 

		}	
		else if(triptype == "SR"){
			trips = '2';		
			var deptDate = $("#twodpd1").val();
			var arrivalDate = $("#twodpd2").val();
			if (origin == "") {
				$("#errori").text("Please Enter the Origin City");
				$('#errori').stop().fadeIn(400).delay(1500).fadeOut(400);		   
			} else if (destination == "") {
				$("#errdes").text("Please Enter the Destination City");
				$('#errdes').stop().fadeIn(400).delay(1500).fadeOut(400);
			} 
			else if (origin == destination) {
				$("#errdes").text("Please Enter the Different Destination City");
				$('#errdes').stop().fadeIn(400).delay(1500).fadeOut(400);
			}else if (deptDate == "") {			
				$("#errdep").text("Select the Depart date");
				$('#errdep').stop().fadeIn(400).delay(1500).fadeOut(400);
			} 
			else if (arrivalDate == "") {
				$("#errarr").text("Select the Arrival date");
				$('#errarr').stop().fadeIn(400).delay(1500).fadeOut(400);			
			}
			else if (agentapp_key=="") {			
				$("#errconfig").text("User not Configured");
				$('#errconfig').stop().fadeIn(400).delay(1500).fadeOut(400);
			} else{
				if(originCountry == "India" && destinationCountry == "India"){

					$location.url('/Flights-Domestic-'+$scope.ThemeType+'?ori='+encodeURIComponent(origin)+'&des='+encodeURIComponent(destination)+'&depart='+encodeURIComponent(deptDate)+'&arrival='+encodeURIComponent(arrivalDate)
							+'&class='+encodeURIComponent(cabinClass)+'&ccy='+currency+'&isDom='+isDomestic+'&isDyn='+isDynamicmarkup+'&marAt='+encodeURIComponent(markupAmount)+'&tty='+encodeURIComponent(triptype)
							+'&ay='+encodeURIComponent(app_key)+'&sky='+encodeURIComponent(searchkey)+'&adt='+adult+'&kid='+kid+'&inf='+infant+'&airline='+airline+'&thm='+$scope.ThemeType);
				}else{

					var specialSearch = ('/Flights-International-'+$scope.ThemeType+'?ori='+encodeURIComponent(origin)+'&des='+encodeURIComponent(destination)+'&depart='+encodeURIComponent(deptDate)+'&arrival='+encodeURIComponent(arrivalDate)
							+'&class='+encodeURIComponent(cabinClass)+'&ccy='+currency+'&isDom='+isDomestic+'&isDyn='+isDynamicmarkup+'&marAt='+encodeURIComponent(markupAmount)+'&tty='+encodeURIComponent(triptype)
							+'&ay='+encodeURIComponent(app_key)+'&sky='+encodeURIComponent(searchkey)+'&adt='+adult+'&kid='+kid+'&inf='+infant+'&airline='+airline+'&thm='+$scope.ThemeType);
					localStorageService.set('UrlParameters',specialSearch);
					$location.url(specialSearch);
				}
			} 

		}

	};
	$scope.returnIndex = function(){
		window.location.href = window.location.href.replace(/#.*$/, '');
	}

	$scope.cacheDataArray = [];
	$scope.cacheInitalCall = function(){
		flightServices.CacheSearchList().then(function(response){		 
		// $http.get('cacheList.json').then(function(response){	
			$scope.cacheDataArray.push(response.data);                         
		}); 	

	}
	$scope.init();
}]);