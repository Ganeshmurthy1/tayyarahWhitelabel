var app = angular.module('myApp');

app.controller('Flights-onewayCtrl',['$scope','commonService','$window','$http','$document','$location','$compile','limitToFilter','$rootScope','flightServices','localStorageService','$route','$filter','$modal','$timeout','$log','transporter',function($scope,commonService,$window,$http,$document,$location,$compile,limitToFilter,$rootScope,flightServices,localStorageService,$route,$filter,$modal,$timeout,$log,transporter){
	var apiUrl = commonService.baseUrl;
	var adminUrl = commonService.AdminbaseUrl;
	var ibeurl = commonService.Ibebaseurl;
	$scope.init = function(){
		$scope.getAllParams = $scope.getUrlParams();	
		$scope.apiParams = $scope.apiParameter($scope.getAllParams);	
		$scope.apiCachedData = $scope.apiCachedParams($scope.getAllParams);
		$scope.reSearchParam = {};	 
		$scope.loading = false ;
		$scope.quoteloaded = false;
		$scope.display = "none";
		$scope.errordiv = false;
		$scope.Oricity = $scope.getAllParams.oriCity;
		$scope.Descity= $scope.getAllParams.desCity;
		$scope.departuredate = $scope.getAllParams.depDate;
		$scope.totalpassenger = parseInt($scope.getAllParams.adult)+parseInt($scope.getAllParams.kid)+parseInt($scope.getAllParams.infant);
		$scope.cabin = $scope.getAllParams.cabinClass;
		$scope.adult = $scope.getAllParams.adult;
		$scope.child = $scope.getAllParams.kid;
		$scope.infant = $scope.getAllParams.infant;
		$scope.origincity = $scope.getAllParams.origin;
		$scope.destinationcity = $scope.getAllParams.destination;
		$scope.originall = $scope.getAllParams.origin;
		$scope.destinationall = $scope.getAllParams.destination; 
		$scope.currencyname=$scope.getAllParams.currency;		
		$scope.currencyvalue = 1;
		$scope.bookNowButtonQuotation = false;
		$scope.classname = "tayyarah-"+$scope.getAllParams.currency;
		$scope.isQuoteAvailable = false;
		// Check Quote is avaliable 
		if($location.search().flightquotationid != undefined){
			$scope.isQuoteAvailable = true;
			$scope.bookNowButtonQuotation = true;
		}
		var depdate;
		depdate = $scope.getAllParams.depDate;
		var depday; var depMonth; var depYear; 
		var curday; var curMonth; var curYear;
		depday = depdate.substring(6,8);
		depMonth = depdate.substring(4,6);
		depYear = depdate.substring(0,4);
		var Currentdate = $filter('date')(new Date(), 'yyyyMMdd');
		curday = Currentdate.substring(6,8);
		curMonth = Currentdate.substring(4,6);
		curYear = Currentdate.substring(0,4);
		if(depday <= curday && depMonth == curMonth && depYear == curYear ){		
			$scope.isholdeligibility = false;
		}else if ((depday == curday || depday > curday) && depMonth < curMonth && depYear < curYear ){
			$scope.isholdeligibility = false;
		}
		else{
			$scope.isholdeligibility = true;
		}
		if($scope.getAllParams.originCountry == "India" && $scope.getAllParams.destCountry == "India"){
			$scope.isInternational = false;
		}else{
			$scope.isInternational = true;
		}
		//end of Holiding
		function pad(n){return n<10 ? '0'+n : n}
		$scope.fligtSearch();
		angular.element('#onedpd').val(depdate); 
		$scope.filter = '';
		$scope.mainContent = '';
		$scope.ThemeType = $location.search().thm;
		$scope.filter = 'views/FlightsOneway-'+$scope.ThemeType+'Filter.jsp';
		$scope.mainContent = 'views/FlightsOneway-'+$scope.ThemeType+'Content.jsp';
		$scope.FlightTimeLimit = flightServices.flighttime;		
		$scope.FilterArray = [];
		$scope.iscached = $location.search().cache;		
	};


	/**
	 *Description: Getting the parameters from the url to the api.
	 **/
	$scope.getUrlParams = function(){
		var UrlParam = {};
		UrlParam.origin = $location.search().ori;
		UrlParam.destination = $location.search().des;
		UrlParam.depDate = $location.search().depart;
		UrlParam.arvlDate = $location.search().arrival;
		UrlParam.cabinClass = $location.search().class;
		UrlParam.currency = $location.search().ccy;
		UrlParam.isDomestic = $location.search().isDom;
		UrlParam.isDynamicmarkup = $location.search().isDyn;
		UrlParam.markupAmount = $location.search().marAt;	
		UrlParam.triptype = $location.search().tty;	
		UrlParam.app_key  = decodeURIComponent($location.search().ay);
		UrlParam.searchkey = $location.search().sky;
		UrlParam.adult = $location.search().adt;
		UrlParam.kid = $location.search().kid;
		UrlParam.infant = $location.search().inf;
		UrlParam.airline = $location.search().airline;
		var originbefore = UrlParam.origin;	
		var Oriindex = originbefore.indexOf(',') ;
		UrlParam.oriCity = originbefore.substring(0, Oriindex);
		var destbefore = UrlParam.destination;	
		var destindex = destbefore.indexOf(',') ;
		UrlParam.desCity = destbefore.substring(0, destindex);
		var orifirstindex =originbefore.indexOf(',') + 1;
		var orilastindex = originbefore.lastIndexOf(',');		    	
		var desfirstindex = destbefore.indexOf(',') + 1;
		var deslastindex = destbefore.lastIndexOf(',');
		UrlParam.originCountry = originbefore.substring(orifirstindex, orilastindex);
		UrlParam.destCountry = destbefore.substring(desfirstindex, deslastindex);
		UrlParam.cache = $location.search().cache;
		return UrlParam;
	}
	/**
	 *Description: Error Modal parameters.
	 **/
	$scope.ErrorFlightTravelDetails ={};
	$scope.ErrorFlightTravelDetails.origin = $scope.getUrlParams().origin;
	$scope.ErrorFlightTravelDetails.destination = $scope.getUrlParams().destination;
	$scope.ErrorFlightTravelDetails.depDate = $scope.getUrlParams().depDate;
	$scope.ErrorFlightTravelDetails.arvlDate = $scope.getUrlParams().arvlDate;
	$scope.ErrorFlightTravelDetails.cabinClass = $scope.getUrlParams().cabinClass;
	$scope.ErrorFlightTravelDetails.showData = true;
	localStorageService.set('ErrorSearchData',$scope.ErrorFlightTravelDetails);


	/**
	 *Description: Constructing Data for the Api.
	 **/
	$scope.apiParameter = function(params){
		var ApiParam = {};
		var ori = decodeURIComponent(params.origin);
		var Ostart = ori.lastIndexOf('(') +1;
		var Oend = ori.lastIndexOf(')');	
		ApiParam.origin  = ori.substring(Ostart, Oend);
		var destn = decodeURIComponent(params.destination);
		var Ostart = destn.lastIndexOf('(') +1;
		var Oend = destn.lastIndexOf(')');
		ApiParam.destination = destn.substring(Ostart, Oend);
		var deptDate = params.depDate;
		var dept = new Date(deptDate.split("/").reverse().join("-"));
		ApiParam.depDate = $scope.yyyymmdd(dept);
		if(params.arvlDate){
			var arrvlDate = params.arvlDate;
			var arvlDate = new Date(arrvlDate.split("/").reverse().join("-"));
			ApiParam.arvlDate = $scope.yyyymmdd(arvlDate);
		}else{
			ApiParam.arvlDate = '';
		}
		ApiParam.adult = params.adult;
		ApiParam.airline = params.airline;
		if(angular.element('#isLogged').val() != undefined && angular.element('#isLogged').val() != '')
			ApiParam.app_key  = angular.element('#ay').val();
		else
			ApiParam.app_key  = params.app_key;	
		ApiParam.cabinClass = params.cabinClass;
		ApiParam.currency = params.currency;
		ApiParam.infant = params.infant;
		ApiParam.isDomestic = params.isDomestic;
		ApiParam.isDynamicMarkup = params.isDynamicmarkup;
		ApiParam.kid = params.kid;
		ApiParam.markupAmount = params.markupAmount;
		ApiParam.searchkey = params.searchkey;
		ApiParam.triptype = params.triptype;
		ApiParam.isCacheData = params.cache;
		return ApiParam;		
	}
	/**
	 *Description: Constructing Data for the Api Cached Data Params.
	 **/
	$scope.apiCachedParams = function(params){	
		var ApiCahedParam = {};
		var ori = decodeURIComponent(params.origin);
		var Ostart = ori.lastIndexOf('(') +1;
		var Oend = ori.lastIndexOf(')');	
		ApiCahedParam.origin  = ori.substring(Ostart, Oend);
		var destn = decodeURIComponent(params.destination);
		var Ostart = destn.lastIndexOf('(') +1;
		var Oend = destn.lastIndexOf(')');
		ApiCahedParam.destination = destn.substring(Ostart, Oend);
		var deptDate = params.depDate;
		var dept = new Date(deptDate.split("/").reverse().join("-"));
		ApiCahedParam.depDate = $scope.yyyymmdd(dept);
		if(params.arvlDate){
			var arrvlDate = params.arvlDate;
			var arvlDate = new Date(arrvlDate.split("/").reverse().join("-"));
			ApiCahedParam.arvlDate = $scope.yyyymmdd(arvlDate);
		}else{
			ApiCahedParam.arvlDate = '';
		}

		ApiCahedParam.adult = params.adult;
		ApiCahedParam.airline = params.airline;

		if(angular.element('#isLogged').val() != undefined && angular.element('#isLogged').val() != '')
			ApiCahedParam.app_key  = angular.element('#ay').val();
		else
			ApiCahedParam.app_key  = params.app_key;	

		ApiCahedParam.cabinClass = params.cabinClass;
		ApiCahedParam.currency = params.currency;
		ApiCahedParam.infant = params.infant;
		ApiCahedParam.isDomestic = params.isDomestic;
		ApiCahedParam.isDynamicMarkup = params.isDynamicmarkup;
		ApiCahedParam.kid = params.kid;
		ApiCahedParam.markupAmount = params.markupAmount;
		ApiCahedParam.searchkey = params.searchkey;
		ApiCahedParam.triptype = params.triptype;
		ApiCahedParam.isCacheData = false;
		return ApiCahedParam;

	}
	/**
	 *Description: years Converstion Prototype  Function.
	 **/ 
	$scope.yyyymmdd = function(dateIn) {
		var yyyy = dateIn.getFullYear();
		var mm = dateIn.getMonth()+1; // getMonth() is zero-based
		var dd  = dateIn.getDate();
		return String(10000*yyyy + 100*mm + dd); // Leading zeros for mm and dd
	}

	function escapeRegExp(string) {
		return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
	}
	function replaceAll(string, find, replace) {
		return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
	}

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
	Array.prototype.airlineunique = function() {
		var a = [];
		for ( i = 0; i < this.length; i++ ) {
			var current = this[i];
			if (a.indexOf(current) < 0) a.push(current);
		}

		this.length = 0;
		for ( i = 0; i < a.length; i++ ) {
			this.push( a[i] );
		}
		return this;
	}

	/**
	 *Description:Currency Convertion.
	 **/ 
	$scope.currencychangedValue = function()
	{

		$scope.currencyname = angular.element('#selectcurrencyname').val();
		flightServices.CurrencyConvert($scope.currencyname).then(function(res){
			var data = res.data;
			$scope.currencyvalue = parseFloat(data.value);	
			$scope.classname = "tayyarah-"+$scope.currencyname;

		},function(){

		});
	}
	/**
	 *Description: left menu sliders and defaults.
	 **/
	$scope.priceSlider = {
			min: 1000,
			max: 2000,
			ceil: 2000,
			floor: 1000,
			step: 10
	};

	$scope.DepartSlider = {
			min: 0,
			max: 1440,
			ceil: 1440,
			floor: 0,
			step: 10
	};

	$scope.ArrivalSlider = {
			min: 0,
			max: 1440,
			ceil: 1440,
			floor: 0,
			step: 10
	};

	$scope.loadpricebar = true;
	$scope.leftmenuloader = true;
	$scope.rightmenuloader = true;	
	$scope.stopslist = [];
	for(var i = 0;i<2;i++){
		$scope.stopslist.push(i);
	}


	/**	
	 *Description: loading cities from api.
	 **/	
	$scope.cities = function(cityName) {
		var cityarr = [];
		return $http.get(apiUrl + "Search/bycity/" + cityName).then(function(response) {
			angular.forEach(response.data, function(value) {
				cityarr.push(value.city + "," + value.country + "," + "(" + value.airport_code + ")");
			});
			/* console.log(cityarr);*/
			return limitToFilter(cityarr, 15);
		});
	};
	/**	
	 *Description: Change Date focus.
	 **/
	$scope.onSelectPart = function($item, $model, $label) {
		$scope.$item = $item;
		$scope.$model = $model;
		$scope.$label = $label;
		$('#hideori').val($scope.originall);
		$('#hidedes').val($scope.destinationall);
		if ($scope.twodestination != undefined) {
			angular.element(document.querySelector('#twodpd1')).focus();
		}
	};

	/**	
	 *Description: Flight Search Process for oneway trip.
	 **/
	$scope.fligtSearch = function(){
		$scope.errordiv = false;
		flightServices.FlightSearch($scope.apiParams).then(function(response){
			//$http.get('onewayList.json').then(function(response){
			$scope.loading = false ;
			$scope.data = response.data;
			if($scope.data.fareFlightSegment.length > 0)
			{
				$scope.baseToBookingExchangeRate = $scope.data.baseToBookingExchangeRate;
				$scope.fareFlightSegment = $scope.data.fareFlightSegment;
				$scope.searchkey = $scope.data.searchKey;
				$scope.app_key = decodeURIComponent($scope.apiParams.app_key);
				$scope.totalflightsaviable =  $scope.fareFlightSegment.length;
				var lastele =  $scope.fareFlightSegment.length - 1; 
				$scope.origincodename = $scope.data.ori;
				$scope.destcodename = $scope.data.dest;
				$scope.defaultmintime = "00.00";
				$scope.defaultmaxtime = "23.59";
				var airlinesarrwithdup = [];
				var stopsarr = [];
				var pricearray = [];
				angular.forEach($scope.fareFlightSegment, function(value,fareindex) {
					pricearray.push(value.totalPrice);
					angular.forEach(value.flightSegmentsGroups, function(Groupsvalue,groupindex) { 
						angular.forEach(Groupsvalue.flightSegments, function(Segmentsvalue,index) {
							stopsarr.push(Segmentsvalue.segments.length - 1);
							angular.forEach(Segmentsvalue.segments, function(Segmentvalue,segindex) {
								if(segindex == 0){
									if(Segmentvalue.carrier.name!=null){
										airlinesarrwithdup.push({"name":Segmentvalue.carrier.name,"code":Segmentvalue.carrier.code});
									}
								}
							});
						});
					});
				}); 
				var uniqueairlineoperarray = [];
				var tempairlineoperarray = [];
				$.each(airlinesarrwithdup, function(index, value) {
					if ($.inArray(value.name, tempairlineoperarray)==-1) {
						tempairlineoperarray.push(value.name);
						uniqueairlineoperarray.push(value);
					}
				});
				uniqueairlineoperarray = uniqueairlineoperarray;
				var uniquestopsarr = [];
				uniquestopsarr = stopsarr.unique();
				$scope.stopslist = uniquestopsarr;
				$scope.airlinelist = uniqueairlineoperarray;
				var uniquepricearr = [];
				uniquepricearr = pricearray.unique();
				$scope.pricelist = uniquepricearr.sort(function(a, b){return a-b});
				$scope.matrixairlinecode = [];
				var matrixairlines = [];
				var matrixairlinesarray = [];
				var matrixairlinesmap = {};
				angular.forEach($scope.fareFlightSegment, function(value,fareindex) { 
					angular.forEach(value.flightSegmentsGroups, function(Groupsvalue,groupindex) { 
						angular.forEach(Groupsvalue.flightSegments, function(Segmentsvalue,index) {
							angular.forEach(Segmentsvalue.segments, function(Segmentvalue,segindex) {
								if(segindex == 0){
									if(Segmentvalue.carrier.name!=null){						
										if(matrixairlines.hasOwnProperty(Segmentvalue.carrier.name) == false)
										{
											matrixairlines.push(Segmentvalue.carrier.name);	
											var airlinenamewithcode = {"airline":Segmentvalue.carrier.name,"code":Segmentvalue.carrier.code}
											$scope.matrixairlinecode.push(airlinenamewithcode);	
											var pricematrix = {"nonstop":"0", "1+stops":"0"};
											matrixairlinesmap[Segmentvalue.carrier.name] = pricematrix;							
										}
									}
								}
							});
						});
					});
				});

				angular.forEach($scope.fareFlightSegment, function(value,fareindex) { 
					for (var key in matrixairlinesmap) {
						if (matrixairlinesmap.hasOwnProperty(key)) {			   

						}
					}
					angular.forEach(value.flightSegmentsGroups, function(Groupsvalue,groupindex) { 
						angular.forEach(Groupsvalue.flightSegments, function(Segmentsvalue,index) {
							angular.forEach(Segmentsvalue.segments, function(Segmentvalue,segindex) {
								if(segindex == 0)
								{	
									var price = value.totalPrice;
									var pricemetrixmap = matrixairlinesmap[Segmentvalue.carrier.name];							
									if(pricemetrixmap!=undefined)
									{
										if((Segmentsvalue.segments.length - 1) == 0){											
											if(parseInt(pricemetrixmap["nonstop"]) > parseInt(price) || parseInt(pricemetrixmap["nonstop"]) == 0)
											{										
												pricemetrixmap["nonstop"] = price;	
											}
										}
										if((Segmentsvalue.segments.length - 1) >= 1){
											if(parseInt(pricemetrixmap["1+stops"]) > parseInt(price) || parseInt(pricemetrixmap["1+stops"]) == 0)
											{
												pricemetrixmap["1+stops"] = price;		
											}
										}
									}
								}
							});

						});
					});
				});				
				for (var key in matrixairlinesmap) {
					if (matrixairlinesmap.hasOwnProperty(key)) {				
						var pricemetrix = matrixairlinesmap[key];
						if(pricemetrix != null)
						{					
							var priceitem = {"Airline":key,"nonstop":pricemetrix["nonstop"],"onestops":pricemetrix["1+stops"]};						
							matrixairlinesarray.push(priceitem);						
						}
					}
				}		

				$scope.priceSlider = {
						min: parseFloat($scope.pricelist[0]),
						max: parseFloat($scope.pricelist[$scope.pricelist.length - 1]),
						ceil: parseFloat($scope.pricelist[$scope.pricelist.length - 1]),
						floor: parseFloat($scope.pricelist[0]),
						step: 10
				};
				$scope.loadpricebar = false;
				$scope.Matrixairlinepriceitems = $scope.onestopsort(matrixairlinesarray);			 
				$scope.sliderConfigstep = 1;
				$scope.sliderConfigmin = 0;
				$scope.sliderConfigmax = 1440;
				$scope.sliderConfiguserMin = 0;
				$scope.sliderConfiguserMax = 1440;
				$scope.arrsliderConfigstep = 1;
				$scope.arrsliderConfigmin = 0;
				$scope.arrsliderConfigmax = 1440;
				$scope.arrsliderConfiguserMin = 0;
				$scope.arrsliderConfiguserMax = 1440;			
				$scope.loading = false ;  
				$scope.display = "block";
				$scope.newflightgroup = $scope.fareFlightSegment;
				// $scope.lowpriceflight();
				//$scope.durationTime();
				if($location.search().cache == true || $location.search().cache == 'true'){
					$scope.bookNowButtonQuotation = true;
					$scope.fligtCacheReSearch();
				}

			}
			else
			{
				$scope.errormeg = "Sorry we could not process your request as server is busy. please try after some time.";
				$scope.errordiv = true;
				$scope.loadpricebar = false;
				$scope.errorDisplay($scope.errormeg,$scope.ErrorFlightTravelDetails);
			}
		},function(errorStatus){
			$scope.httpvalue = errorStatus.httpStatus;
			if($scope.httpvalue == '500')
				$scope.errormeg = "We could not find any flight matching your requirements, Try Again.";
			else
				$scope.errormeg = "Sorry we could not process your request as server is busy. please try after some time.";
			$scope.errordiv = true;
			$scope.loadpricebar = false;
			$scope.errorDisplay($scope.errormeg,$scope.ErrorFlightTravelDetails);
		});
	}
	/**	
	 *Description: Cache based Search for Flights.
	 **/
	$scope.fligtCacheReSearch = function(){
		$scope.errordiv = false;
		flightServices.FlightSearch($scope.apiCachedData).then(function(response){
			//$http.get('onewayList.json').then(function(response){
			$scope.loading = false ;
			$scope.data = response.data;
			if($scope.data.fareFlightSegment.length > 0)
			{    
			$scope.bookNowButtonQuotation = false;
			$scope.baseToBookingExchangeRate = $scope.data.baseToBookingExchangeRate;
			$scope.fareFlightSegment = $scope.data.fareFlightSegment;
			$scope.searchkey = $scope.data.searchKey;
			$scope.app_key = decodeURIComponent($scope.apiParams.app_key);
			$scope.totalflightsaviable =  $scope.fareFlightSegment.length;
			var lastele =  $scope.fareFlightSegment.length - 1; 
			$scope.origincodename = $scope.data.ori;
			$scope.destcodename = $scope.data.dest;
			$scope.defaultmintime = "00.00";
			$scope.defaultmaxtime = "23.59";
			var airlinesarrwithdup = [];
			var stopsarr = [];
			var pricearray = [];
			angular.forEach($scope.fareFlightSegment, function(value,fareindex) {
				pricearray.push(value.totalPrice);
				angular.forEach(value.flightSegmentsGroups, function(Groupsvalue,groupindex) { 
					angular.forEach(Groupsvalue.flightSegments, function(Segmentsvalue,index) {
						stopsarr.push(Segmentsvalue.segments.length - 1);
						angular.forEach(Segmentsvalue.segments, function(Segmentvalue,segindex) {
							if(segindex == 0){
								if(Segmentvalue.carrier.name!=null){
									airlinesarrwithdup.push({"name":Segmentvalue.carrier.name,"code":Segmentvalue.carrier.code});
								}
							}
						});
					});
				});
			}); 

			var uniqueairlineoperarray = [];
			var tempairlineoperarray = [];
			$.each(airlinesarrwithdup, function(index, value) {
				if ($.inArray(value.name, tempairlineoperarray)==-1) {
					tempairlineoperarray.push(value.name);
					uniqueairlineoperarray.push(value);
				}
			});
			uniqueairlineoperarray = uniqueairlineoperarray;
			var uniquestopsarr = [];
			uniquestopsarr = stopsarr.unique();
			$scope.stopslist = uniquestopsarr;
			$scope.airlinelist = uniqueairlineoperarray;		

			var uniquepricearr = [];
			uniquepricearr = pricearray.unique();
			$scope.pricelist = uniquepricearr.sort(function(a, b){return a-b});

			$scope.matrixairlinecode = [];
			var matrixairlines = [];
			var matrixairlinesarray = [];
			var matrixairlinesmap = {};
			angular.forEach($scope.fareFlightSegment, function(value,fareindex) { 
				angular.forEach(value.flightSegmentsGroups, function(Groupsvalue,groupindex) { 
					angular.forEach(Groupsvalue.flightSegments, function(Segmentsvalue,index) {
						angular.forEach(Segmentsvalue.segments, function(Segmentvalue,segindex) {
							if(segindex == 0){
								if(Segmentvalue.carrier.name!=null){						
									if(matrixairlines.hasOwnProperty(Segmentvalue.carrier.name) == false)
									{
										matrixairlines.push(Segmentvalue.carrier.name);	
										var airlinenamewithcode = {"airline":Segmentvalue.carrier.name,"code":Segmentvalue.carrier.code}
										$scope.matrixairlinecode.push(airlinenamewithcode);	
										var pricematrix = {"nonstop":"0", "1+stops":"0"};
										matrixairlinesmap[Segmentvalue.carrier.name] = pricematrix;							
									}
								}
							}
						});
					});
				});
			});

			angular.forEach($scope.fareFlightSegment, function(value,fareindex) { 
				for (var key in matrixairlinesmap) {
					if (matrixairlinesmap.hasOwnProperty(key)) {			   

					}
				}
				angular.forEach(value.flightSegmentsGroups, function(Groupsvalue,groupindex) { 
					angular.forEach(Groupsvalue.flightSegments, function(Segmentsvalue,index) {
						angular.forEach(Segmentsvalue.segments, function(Segmentvalue,segindex) {
							if(segindex == 0)
							{	
								var price = value.totalPrice;
								var pricemetrixmap = matrixairlinesmap[Segmentvalue.carrier.name];							
								if(pricemetrixmap!=undefined)
								{
									if((Segmentsvalue.segments.length - 1) == 0){											
										if(parseInt(pricemetrixmap["nonstop"]) > parseInt(price) || parseInt(pricemetrixmap["nonstop"]) == 0)
										{										
											pricemetrixmap["nonstop"] = price;	
										}
									}
									if((Segmentsvalue.segments.length - 1) >= 1){
										if(parseInt(pricemetrixmap["1+stops"]) > parseInt(price) || parseInt(pricemetrixmap["1+stops"]) == 0)
										{
											pricemetrixmap["1+stops"] = price;		
										}
									}
								}
							}
						});

					});
				});
			});				
			for (var key in matrixairlinesmap) {
				if (matrixairlinesmap.hasOwnProperty(key)) {				
					var pricemetrix = matrixairlinesmap[key];
					if(pricemetrix != null)
					{					
						var priceitem = {"Airline":key,"nonstop":pricemetrix["nonstop"],"onestops":pricemetrix["1+stops"]};						
						matrixairlinesarray.push(priceitem);						
					}
				}
			}		

			$scope.priceSlider = {
					min: parseFloat($scope.pricelist[0]),
					max: parseFloat($scope.pricelist[$scope.pricelist.length - 1]),
					ceil: parseFloat($scope.pricelist[$scope.pricelist.length - 1]),
					floor: parseFloat($scope.pricelist[0]),
					step: 10
			};
			$scope.loadpricebar = false;
			$scope.Matrixairlinepriceitems = $scope.onestopsort(matrixairlinesarray);			 
			$scope.sliderConfigstep = 1;
			$scope.sliderConfigmin = 0;
			$scope.sliderConfigmax = 1440;
			$scope.sliderConfiguserMin = 0;
			$scope.sliderConfiguserMax = 1440;
			$scope.arrsliderConfigstep = 1;
			$scope.arrsliderConfigmin = 0;
			$scope.arrsliderConfigmax = 1440;
			$scope.arrsliderConfiguserMin = 0;
			$scope.arrsliderConfiguserMax = 1440;			
			$scope.loading = false ;  
			$scope.display = "block";
			$scope.newflightgroup = $scope.fareFlightSegment;
			// $scope.lowpriceflight();
			//$scope.durationTime();

			}
			else
			{
				$scope.errormeg = "Sorry we could not process your request as server is busy. please try after some time.";
				$scope.errordiv = true;
				$scope.loadpricebar = false;
				$scope.errorDisplay($scope.errormeg,$scope.ErrorFlightTravelDetails);
			}
		},function(errorStatus){
			$scope.httpvalue = errorStatus.httpStatus;
			if($scope.httpvalue == '500')
				$scope.errormeg = "We could not find any flight matching your requirements, Try Again.";
			else
				$scope.errormeg = "Sorry we could not process your request as server is busy. please try after some time.";
			$scope.errordiv = true;
			$scope.loadpricebar = false;
			$scope.errorDisplay($scope.errormeg,$scope.ErrorFlightTravelDetails);
		});
	}
	/**	
	 *Description: Sorting Process for the side bar.
	 **/
	$scope.sortdescending  = false;  
	$scope.sortlist  = [];
	$scope.sortorder = function(items,type)
	{	
		$scope.priceasc = "";
		$scope.airlineasc = "";
		$scope.departasc = "";
		$scope.arrivalasc = "";
		$scope.durationasc = "";
		if($scope.sortdescending == false)
		{			
			$scope.sortlist =  items.sort(function(a, b) {
				if(type == 'price'){
					$scope.priceasc = "tayyarah-arrow-down";
					return parseFloat(a.totalPrice) - parseFloat(b.totalPrice);						
				}
				if(type == 'airline'){
					$scope.airlineasc = "tayyarah-arrow-down";
					if ( a.flightSegmentsGroups[0].flightSegments[0].segments[0].carrier.name < b.flightSegmentsGroups[0].flightSegments[0].segments[0].carrier.name )
						return -1;
					if ( a.flightSegmentsGroups[0].flightSegments[0].segments[0].carrier.name > b.flightSegmentsGroups[0].flightSegments[0].segments[0].carrier.name )
						return 1;
					return 0;
				}					
				if(type == 'depart'){
					$scope.departasc = "tayyarah-arrow-down";
					if ( a.flightSegmentsGroups[0].flightSegments[0].segments[0].depTime < b.flightSegmentsGroups[0].flightSegments[0].segments[0].depTime )
						return -1;
					if ( a.flightSegmentsGroups[0].flightSegments[0].segments[0].depTime > b.flightSegmentsGroups[0].flightSegments[0].segments[0].depTime )
						return 1;
					return 0;
				}
				if(type == 'arrival'){
					$scope.arrivalasc = "tayyarah-arrow-down";
					if(a.flightSegmentsGroups[0].flightSegments[0].segments[a.flightSegmentsGroups[0].flightSegments[0].segments.length - 1].arrTime!=undefined){
						if ( a.flightSegmentsGroups[0].flightSegments[0].segments[a.flightSegmentsGroups[0].flightSegments[0].segments.length - 1].arrTime < b.flightSegmentsGroups[0].flightSegments[0].segments[b.flightSegmentsGroups[0].flightSegments[0].segments.length - 1].arrTime )
							return -1;
						if ( a.flightSegmentsGroups[0].flightSegments[0].segments[a.flightSegmentsGroups[0].flightSegments[0].segments.length - 1].arrTime > b.flightSegmentsGroups[0].flightSegments[0].segments[b.flightSegmentsGroups[0].flightSegments[0].segments.length - 1].arrTime )
							return 1;
						return 0;
					}

				}
				if(type == 'duration'){
					$scope.durationasc = "tayyarah-arrow-down";
					var atime = 0;
					var btime = 0;
					if(a.flightSegmentsGroups[0].flightSegments[0].segments.length > 2){
						var totaldur = 0;
						var arrtime = new Date(a.flightSegmentsGroups[0].flightSegments[0].segments[0].arrival);
						var deptime = new Date(a.flightSegmentsGroups[0].flightSegments[0].segments[1].depart);
						var arrtime1 = new Date(a.flightSegmentsGroups[0].flightSegments[0].segments[1].arrival);
						var deptime1 = new Date(a.flightSegmentsGroups[0].flightSegments[0].segments[2].depart);
						var tseconds = (deptime.getTime() - arrtime.getTime()  )/1000;    
						var contomin = tseconds / 60 ;
						var tseconds1 = (deptime1.getTime() - arrtime1.getTime()  )/1000;    
						var contomin1 = tseconds1 / 60 ;

						angular.forEach(a.flightSegmentsGroups[0].flightSegments[0].segments, function(obj,index) {			
							totaldur = totaldur + parseInt(obj.duration);         
						});
						totaldur = totaldur + contomin +contomin1;

						var btotaldur = 0;
						if(b.flightSegmentsGroups[0].flightSegments[0].segments.length > 2){
							var barrtime = new Date(b.flightSegmentsGroups[0].flightSegments[0].segments[0].arrival);
							var bdeptime = new Date(b.flightSegmentsGroups[0].flightSegments[0].segments[1].depart);
							var barrtime1 = new Date(b.flightSegmentsGroups[0].flightSegments[0].segments[1].arrival);
							var bdeptime1 = new Date(b.flightSegmentsGroups[0].flightSegments[0].segments[2].depart);

							var btseconds = (bdeptime.getTime() - barrtime.getTime()  )/1000;    
							var bcontomin = tseconds / 60 ;
							var btseconds1 = (bdeptime1.getTime() - barrtime1.getTime()  )/1000;    
							var bcontomin1 = tseconds1 / 60 ;

							angular.forEach(b.flightSegmentsGroups[0].flightSegments[0].segments, function(obj,index) {			
								btotaldur = btotaldur + parseInt(obj.duration);         
							});
							btotaldur = btotaldur + bcontomin + bcontomin1;
						}

						atime = totaldur;
						btime = btotaldur;

					}
					if(a.flightSegmentsGroups[0].flightSegments[0].segments.length == 2 ){
						var arrtime = new Date(a.flightSegmentsGroups[0].flightSegments[0].segments[0].arrival);
						var deptime = 0;
						if(a.flightSegmentsGroups[0].flightSegments[0].segments[1].depart!=undefined)
							deptime = new Date(a.flightSegmentsGroups[0].flightSegments[0].segments[1].depart);	

						var tseconds = (deptime.getTime() - arrtime.getTime())/1000;    
						var contomin = tseconds / 60 ;
						var totaldur = 0;		
						angular.forEach(a.flightSegmentsGroups[0].flightSegments[0].segments, function(obj,index) { 			
							totaldur = totaldur + parseInt(obj.duration);         
						});
						totaldur = totaldur + contomin;	


						var btotaldur = 0;
						if(b.flightSegmentsGroups[0].flightSegments[0].segments.length == 2){
							var barrtime = new Date(b.flightSegmentsGroups[0].flightSegments[0].segments[0].arrival);
							var bdeptime = 0;
							if(b.flightSegmentsGroups[0].flightSegments[0].segments[1].depart!=undefined)
								bdeptime = new Date(b.flightSegmentsGroups[0].flightSegments[0].segments[1].depart);	

							var btseconds = (bdeptime.getTime() - barrtime.getTime())/1000;    
							var bcontomin = btseconds / 60 ;
							var btotaldur = 0;		
							angular.forEach(b.flightSegmentsGroups[0].flightSegments[0].segments, function(obj,index) { 			
								btotaldur = btotaldur + parseInt(obj.duration);         
							});
							btotaldur = btotaldur + bcontomin;						

						}
						atime = totaldur;
						btime = btotaldur;

					}
					if(a.flightSegmentsGroups[0].flightSegments[0].segments.length == 1){
						atime = a.flightSegmentsGroups[0].flightSegments[0].segments[0].duration;
						btime = b.flightSegmentsGroups[0].flightSegments[0].segments[0].duration;
					}
					return parseInt(atime) - parseInt(btime);					
				}
			});		   

			$scope.sortdescending  = true;  
		}
		else
		{			
			$scope.sortlist =  items.sort(function(a, b) {
				if(type == 'price'){	
					$scope.priceasc = "tayyarah-arrow-up";
					return parseFloat(a.totalPrice) - parseFloat(b.totalPrice);					
				}

				if(type == 'airline'){
					$scope.airlineasc = "tayyarah-arrow-up";
					if ( a.flightSegmentsGroups[0].flightSegments[0].segments[0].carrier.name < b.flightSegmentsGroups[0].flightSegments[0].segments[0].carrier.name )
						return -1;
					if ( a.flightSegmentsGroups[0].flightSegments[0].segments[0].carrier.name > b.flightSegmentsGroups[0].flightSegments[0].segments[0].carrier.name )
						return 1;
					return 0;
				}				
				if(type == 'depart'){
					$scope.departasc = "tayyarah-arrow-up";
					if ( a.flightSegmentsGroups[0].flightSegments[0].segments[0].depTime < b.flightSegmentsGroups[0].flightSegments[0].segments[0].depTime )
						return -1;
					if ( a.flightSegmentsGroups[0].flightSegments[0].segments[0].depTime > b.flightSegmentsGroups[0].flightSegments[0].segments[0].depTime )
						return 1;
					return 0;
				}
				if(type == 'arrival'){
					$scope.arrivalasc = "tayyarah-arrow-up";
					if(a.flightSegmentsGroups[0].flightSegments[0].segments[a.flightSegmentsGroups[0].flightSegments[0].segments.length - 1].arrTime!=undefined){
						if ( a.flightSegmentsGroups[0].flightSegments[0].segments[a.flightSegmentsGroups[0].flightSegments[0].segments.length - 1].arrTime < b.flightSegmentsGroups[0].flightSegments[0].segments[b.flightSegmentsGroups[0].flightSegments[0].segments.length - 1].arrTime )
							return -1;
						if ( a.flightSegmentsGroups[0].flightSegments[0].segments[a.flightSegmentsGroups[0].flightSegments[0].segments.length - 1].arrTime > b.flightSegmentsGroups[0].flightSegments[0].segments[b.flightSegmentsGroups[0].flightSegments[0].segments.length - 1].arrTime )
							return 1;
						return 0;
					}
				}
				if(type == 'duration'){
					$scope.durationasc = "tayyarah-arrow-up";

					var atime = 0;
					var btime = 0;
					if(a.flightSegmentsGroups[0].flightSegments[0].segments.length > 2){
						var totaldur = 0;
						var arrtime = new Date(a.flightSegmentsGroups[0].flightSegments[0].segments[0].arrival);
						var deptime = new Date(a.flightSegmentsGroups[0].flightSegments[0].segments[1].depart);
						var arrtime1 = new Date(a.flightSegmentsGroups[0].flightSegments[0].segments[1].arrival);
						var deptime1 = new Date(a.flightSegmentsGroups[0].flightSegments[0].segments[2].depart);

						var tseconds = (deptime.getTime() - arrtime.getTime()  )/1000;    
						var contomin = tseconds / 60 ;
						var tseconds1 = (deptime1.getTime() - arrtime1.getTime()  )/1000;    
						var contomin1 = tseconds1 / 60 ;

						angular.forEach(a.flightSegmentsGroups[0].flightSegments[0].segments, function(obj,index) {			
							totaldur = totaldur + parseInt(obj.duration);         
						});
						totaldur = totaldur + contomin +contomin1;

						var btotaldur = 0;
						if(b.flightSegmentsGroups[0].flightSegments[0].segments.length > 2){
							var barrtime = new Date(b.flightSegmentsGroups[0].flightSegments[0].segments[0].arrival);
							var bdeptime = new Date(b.flightSegmentsGroups[0].flightSegments[0].segments[1].depart);
							var barrtime1 = new Date(b.flightSegmentsGroups[0].flightSegments[0].segments[1].arrival);
							var bdeptime1 = new Date(b.flightSegmentsGroups[0].flightSegments[0].segments[2].depart);

							var btseconds = (deptime.getTime() - arrtime.getTime()  )/1000;    
							var bcontomin = tseconds / 60 ;
							var btseconds1 = (deptime1.getTime() - arrtime1.getTime()  )/1000;    
							var bcontomin1 = tseconds1 / 60 ;

							angular.forEach(b.flightSegmentsGroups[0].flightSegments[0].segments, function(obj,index) {			
								btotaldur = btotaldur + parseInt(obj.duration);         
							});
							btotaldur = btotaldur + bcontomin + bcontomin1;
						}

						atime = totaldur;
						btime = btotaldur;

					}
					if(a.flightSegmentsGroups[0].flightSegments[0].segments.length == 2 ){
						var arrtime = new Date(a.flightSegmentsGroups[0].flightSegments[0].segments[0].arrival);
						var deptime = 0;
						if(a.flightSegmentsGroups[0].flightSegments[0].segments[1].depart!=undefined)
							deptime = new Date(a.flightSegmentsGroups[0].flightSegments[0].segments[1].depart);	

						var tseconds = (deptime.getTime() - arrtime.getTime())/1000;    
						var contomin = tseconds / 60 ;
						var totaldur = 0;		
						angular.forEach(a.flightSegmentsGroups[0].flightSegments[0].segments, function(obj,index) { 			
							totaldur = totaldur + parseInt(obj.duration);         
						});
						totaldur = totaldur + contomin;	


						var btotaldur = 0;
						if(b.flightSegmentsGroups[0].flightSegments[0].segments.length == 2){
							var barrtime = new Date(b.flightSegmentsGroups[0].flightSegments[0].segments[0].arrival);
							var bdeptime = 0;
							if(b.flightSegmentsGroups[0].flightSegments[0].segments[1].depart!=undefined)
								bdeptime = new Date(b.flightSegmentsGroups[0].flightSegments[0].segments[1].depart);	

							var btseconds = (bdeptime.getTime() - barrtime.getTime())/1000;    
							var bcontomin = btseconds / 60 ;
							var btotaldur = 0;		
							angular.forEach(b.flightSegmentsGroups[0].flightSegments[0].segments, function(obj,index) { 			
								btotaldur = btotaldur + parseInt(obj.duration);         
							});
							btotaldur = btotaldur + bcontomin;						

						}
						atime = totaldur;
						btime = btotaldur;

					}
					if(a.flightSegmentsGroups[0].flightSegments[0].segments.length == 1){
						atime = a.flightSegmentsGroups[0].flightSegments[0].segments.duration;
						btime = b.flightSegmentsGroups[0].flightSegments[0].segments.duration;
					}
					return parseInt(atime) - parseInt(btime);
				}
			});	
			$scope.sortlist.reverse()
			$scope.sortdescending  = false;  
		}
		return $scope.sortlist;
	}

	/**	
	 *Description: One Stop Sorting Process.
	 **/
	$scope.onestopsort = function(items)
	{
		var sortlist = [];
		sortlist =  items.sort(function(a, b) {			
			return parseFloat(a.onestops) - parseFloat(b.onestops);
		});		
		return sortlist;
	}
	/**	
	 *Description: Non Stop Sorting Process.
	 **/
	$scope.nonstopsort = function(items)
	{
		var sortlist = [];
		sortlist =  items.sort(function(a, b) {
			return parseFloat(a.nonstop) - parseFloat(b.nonstop);
		});
		return sortlist;
	}
	/**	
	 *Description:converting Currency Process.
	 **/
	$scope.getconvertedcurrency = function(currentamt)
	{	
		var selectedcurrentvalue;
		if($scope.currencyvalue != undefined)
			selectedcurrentvalue = $scope.currencyvalue;

		else
			selectedcurrentvalue = $scope.baseToBookingExchangeRate;

		var covertamt = parseFloat(currentamt) * parseFloat(selectedcurrentvalue);		
		return parseFloat(covertamt).toFixed(2);

	}
	
	$scope.getbasecurrencyvalue = function(currentamt,exchangerate)
	{		
		var covertamt = parseFloat(currentamt) * parseFloat(exchangerate);		
		return parseFloat(covertamt).toFixed(2);
	}
	$scope.getcurrencyvalue = function(currentamt,exchangerate)
	{		
		var covertamt = parseFloat(currentamt) * parseFloat(exchangerate);	
		return parseFloat(covertamt).toFixed(2);
	}
	
	/**	
	 *Description:getting airline code with airline name.
	 **/
	$scope.getairlinecode = function(airlinename)
	{
		var airlinecode = "";
		angular.forEach($scope.matrixairlinecode, function(value,index) { 
			if($scope.matrixairlinecode[index].airline == airlinename)
			{
				airlinecode = $scope.matrixairlinecode[index].code;
			}
		});
		return airlinecode;
	}
	$scope.isRefuntable = function(item)
	{
		if(item)
			return "REFUNDABLE";
		if(!item)
			return "NON REFUNDABLE";
	}
	/**	
	 *Description:Get Datatime to Time.
	 **/
	$scope.getDateObject = function(dt){

		var datetime = dt.split("T");
		var fulltime = datetime[1].split(".");
		var time = fulltime[0]
		time = fulltime[0].replace(":00", "");		
		var date = new Date(datetime[0]);		
		return time;
	}	
	/**	
	 *Description:Filters.
	 **/
	var hours1 = Math.floor(0 / 60);
	var minutes1 = 0 - (hours1 * 60);
	if(hours1.length < 10) hours1= '0' + hours1;
	if(minutes1.length < 10) minutes1 = '0' + minutes1;
	if(hours1 == 0) hours1 = '00';
	if(minutes1 == 0) minutes1 = '00';
	var hours2 = Math.floor(1440 / 60);
	var minutes2 = 1440 - (hours2 * 60);
	if(hours2.length < 10) hours2= '0' + hours2;
	if(minutes2.length < 10) minutes2 = '0' + minutes2;
	if(hours2 == 0) hours2 = '00';
	if(minutes2 == 0) minutes2 = '00';
	var min = hours1 + ':' + minutes1;
	var max = hours2 + ':' + minutes2;
	$('#departMin').html(hours1 + ':' + minutes1);
	$('#departMax').html(hours2 + ':' + minutes2);
	$('#arriMin').html(hours1 + ':' + minutes1);
	$('#arriMax').html(hours2 + ':' + minutes2);

	/**	
	 *Description:Fare Type Filter.
	 **/
	$scope.refundableIncludes= [];	
	$scope.checkfaretypefilter = function(type){
		$scope.filteredfilghts = [];
		var i = $.inArray(type, $scope.refundableIncludes);
		if (i > -1) {
			$scope.refundableIncludes.splice(i, 1);
		} else {
			$scope.refundableIncludes.push(type);
		}
	}

	$scope.FareTypeFilter = function(faretypeobj) {		
		var objfilter = false;   
		if ($scope.refundableIncludes.length > 0) {
			angular.forEach($scope.refundableIncludes, function(faretype,faretypeindex) {				
				if(faretype == $scope.isRefuntable(faretypeobj.refundable))
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

	/* Price Filter */
	/* Price Filter */

	/*	$scope.lowpriceflight =function() { 	
		$scope.min = Math.min.apply(Math,$scope.fareFlightSegment.map(function(item){return item.totalPrice;}));
		$scope.CheapFlights=[];
		angular.forEach($scope.fareFlightSegment, function(value,index) {	
			if(value.totalPrice==$scope.min){
				var departtime=value.flightSegmentsGroups[0].flightSegments[0].segments[0].depTime;
				converting min
				var departMin=$scope.convertmin(departtime);
				value.departMin=departMin;
				$scope.CheapFlights.push(value);

			}
		});
	}*/
	/**	
	 *Description:lowest price getting with stops.
	 **/
	$scope.lowpricewithStopflight=function(value) {

		$scope.sortet_stopFlights=value.sort(function (one, other) {
			return one.flightSegmentsGroups[0].flightSegments[0].segments.length - other.flightSegmentsGroups[0].flightSegments[0].segments.length;
		});
	}
	/**	
	 *Description:closest flight with search data.
	 **/
	$scope.closestflights =function(min,max) { 
		$scope.closestFlights=[];
		angular.forEach($scope.fareFlightSegment, function(value,index) {	
			var departtime=value.flightSegmentsGroups[0].flightSegments[0].segments[0].depTime;
			var departMin=$scope.convertmin(departtime);
			if(min<=departMin && max>=departMin){
				$scope.closestFlights.push(value);
			}
		})
	}

	$scope.filterprice = function(obj) { 
		var filteredobj;
		if(((parseFloat(obj.totalPrice) >= parseFloat($scope.priceSlider.min)) && (parseFloat(obj.totalPrice) <= parseFloat($scope.priceSlider.max))))
		{		
			filteredobj = obj;
		} 

		return filteredobj;
	};	 
	/**	
	 *Description:Airline Filter for matrix.
	 **/
	$scope.showAllairline = true;
	$scope.filterairline = 0;
	$scope.Airlinesname = null;	
	$scope.Matrixclickairlinefilter = function($event,airline){    
		$scope.AirlinesIncludes = [];
		if($scope.Airlinesname != null && $scope.Airlinesname == airline)
		{
			$scope.Airlinesname =  null; 
			var selectable =  angular.element(angular.element.find('#selectable li')); 			
			selectable.removeClass('ui-selectee ui-selected'); 
			var aircode = $scope.getairlinecode(airline);
			var airlineselectable =  angular.element(angular.element.find('#name'+aircode));  
			airlineselectable.prop('checked',false);
		}
		else
		{
			$scope.Airlinesname =  airline; 
			$scope.AirlinesIncludes.push(airline);
			var selectable =  angular.element(angular.element.find('#selectable li'));   
			selectable.removeClass('ui-selectee ui-selected');       
			($($event.target).addClass('ui-selectee ui-selected'));
			var removeseleteditem =  angular.element(angular.element.find('.airlinefilter'));  
			removeseleteditem.prop('checked',false);
			var aircode = $scope.getairlinecode($scope.Airlinesname);
			var airlineselectable =  angular.element(angular.element.find('#name'+aircode));			
			airlineselectable.prop('checked',true);

		}   
	}

	$scope.AirlineFilter = function(obj) {
		var Airobjfilter = false;   
		if ($scope.AirlinesIncludes.length > 0) {
			angular.forEach(obj.flightSegmentsGroups[0].flightSegments, function(airobj) {
				angular.forEach(airobj.segments, function(svalue,index) { 
					if(index == 0){                   	 
						angular.forEach($scope.AirlinesIncludes, function(airline,airindex) { 							
							if (svalue.carrier.name == $scope.AirlinesIncludes[airindex])
							{								
								Airobjfilter = true; 

							}
						});							
					}			
				});
			});
		}   
		else
		{
			Airobjfilter = true; 

		}

		return Airobjfilter;
	}

 	/**	
	 *Description:Airline Filter for matrix.
	 **/
	$scope.MatrixAirlineFilter = function(obj) {
		var Airobjfilter = false;   
		if ($scope.Airlinesname != null) {
			angular.forEach(obj.flightSegmentsGroups[0].flightSegments, function(matrixairobj) {
				angular.forEach(matrixairobj.segments, function(svalue,index) { 
					if(index == 0){                     	 
						if (svalue.carrier.name == $scope.Airlinesname){
							Airobjfilter = true;   
						}
					}
				});
			});			
		}   
		else
		{
			Airobjfilter = true; 
		}
		return Airobjfilter;

	}

	$scope.showAllairline = true;
	$scope.filterairline = 0;
	$scope.AirlinesIncludes = [];	
	$scope.airlinefilter = function(airline){
		$scope.Airlinesname = null;	
		var i = $.inArray(airline, $scope.AirlinesIncludes);
		if (i > -1) {
			$scope.AirlinesIncludes.splice(i, 1);

		} else {
			$scope.AirlinesIncludes.push(airline);

		}

		if($scope.AirlinesIncludes.length == 0 || $scope.AirlinesIncludes.length > 1){
			$scope.Airlinesname =  null; 
			var selectable =  angular.element(angular.element.find('#selectable li'));      
			selectable.removeClass('ui-selectee ui-selected');

		}

		if($scope.AirlinesIncludes.length == 1){			
			$scope.Airlinesname =  $scope.AirlinesIncludes[0]; 
			var selectable =  angular.element(angular.element.find('#selectable li'));      
			selectable.removeClass('ui-selectee ui-selected');  
			var aircode = $scope.getairlinecode($scope.Airlinesname);
			var myEl = angular.element(document.querySelector('#mat'+aircode));
			myEl.addClass('ui-selectee ui-selected');	

		}

	}

	/**	
	 *Description:Stops Filter.
	 **/
	$scope.showAllstops = true;
	$scope.filterstops = 0;	
	$scope.stopsIncludes= [];	
	$scope.checkstopsfilter = function(stops){	
		$scope.Airlinesname = null;	
		$scope.filteredfilghts = [];
		var i = $.inArray(stops, $scope.stopsIncludes);
		if (i > -1) {
			$scope.stopsIncludes.splice(i, 1);
		} else {
			$scope.stopsIncludes.push(stops);
		}
	}
	$scope.StopsFilter = function(stopobj) {
		var stopobjfilter = false;   
		if ($scope.stopsIncludes.length > 0) {
			angular.forEach($scope.stopsIncludes, function(airline,airindex) { 	
				angular.forEach(stopobj.flightSegmentsGroups[0].flightSegments, function(segobj,segindex) {
					if (parseInt(segobj.segments.length- 1) == $scope.stopsIncludes[airindex])
					{
						stopobjfilter = true;  
					}
				});
			});
		}  
		else
		{
			stopobjfilter = true; 
		}
		return stopobjfilter;
	}
	/**	
	 *Description:Departure Time Filter.
	 **/
	$scope.filterdeparttime = function(obj){ 

		var hours1 = Math.floor($scope.DepartSlider.min / 60);
		var minutes1 = $scope.DepartSlider.min - (hours1 * 60);

		if(hours1.length < 10) hours1= '0' + hours;
		if(minutes1.length < 10) minutes1 = '0' + minutes;

		if(hours1 == 0) hours1 = '00';
		if(minutes1 == 0) minutes1 = '00';

		var hours2 = Math.floor($scope.DepartSlider.max / 60);
		var minutes2 = $scope.DepartSlider.max - (hours2 * 60);

		if(hours2.length < 10) hours2= '0' + hours;
		if(minutes2.length < 10) minutes2 = '0' + minutes;

		if(hours2 == 0) hours2 = '00';
		if(minutes2 == 0) minutes2 = '00';

		var min = hours1 + ':' + minutes1;
		var max = hours2 + ':' + minutes2;

		$('#departMin').html(hours1 + ':' + minutes1);
		$('#departMax').html(hours2 + ':' + minutes2);

		if(min == '00:00' && max == '24:00')
		{			
			return obj;
		}
		else
		{
			var result = false;
			var newobjarr = [];		
			var depart = obj.segments[0].depTime.split(':'); 
			var departmin = min.split(':');
			var departmax = max.split(':');

			var departseconds = (+depart[0]) * 60 * 60 + (+depart[1]) * 60 ; 
			var ddepartminseconds = (+departmin[0]) * 60 * 60 + (+departmin[1]) * 60 ; 
			var departmaxdepartseconds = (+departmax[0]) * 60 * 60 + (+departmax[1]) * 60 ; 
			if(departseconds >= ddepartminseconds  && departseconds <= departmaxdepartseconds)
			{
				result = true;			
			}
			if(result){			
				return obj;
			}
		}
	}
	/**	
	 *Description:Arrival Time Filter.
	 **/
	$scope.filterarrivaltime = function(obj){  
		var hours1 = Math.floor($scope.ArrivalSlider.min / 60);
		var minutes1 = $scope.ArrivalSlider.min - (hours1 * 60);
		if(hours1.length < 10) hours1= '0' + hours;
		if(minutes1.length < 10) minutes1 = '0' + minutes;
		if(minutes1 == 0) minutes1 = '00';
		var hours2 = Math.floor($scope.ArrivalSlider.max / 60);
		var minutes2 = $scope.ArrivalSlider.max - (hours2 * 60);
		if(hours2.length < 10) hours2= '0' + hours;
		if(minutes2.length < 10) minutes2 = '0' + minutes;
		if(minutes2 == 0) minutes2 = '00';
		var min = hours1 + ':' + minutes1;
		var max = hours2 + ':' + minutes2;
		$('#arriMin').html(hours1 + ':' + minutes1);
		$('#arriMax').html(hours2 + ':' + minutes2);
		var result = false;
		var arrivalminbe = min.split(':');
		var arrivalmaxbe = max.split(':');
		if(arrivalminbe[0] == 0 && arrivalmaxbe[0] == 24)
		{
			result = true;
		}
		else{
			var arrivalobj = obj.segments[obj.segments.length -1].arrTime;
			var arrival = arrivalobj.split(':'); 
			var arrivalmin = min.split(':');
			var arrivalmax = max.split(':');
//			minutes are worth 60 seconds. Hours are worth 60 minutes.
			var arrivalseconds = (+arrival[0]) * 60 * 60 + (+arrival[1]) * 60 ; 
			var arrivalminseconds = (+arrivalmin[0]) * 60 * 60 + (+arrivalmin[1]) * 60 ; 
			var arrivalmaxdepartseconds = (+arrivalmax[0]) * 60 * 60 + (+arrivalmax[1]) * 60 ; 

			if(arrivalseconds >= arrivalminseconds  && arrivalseconds <= arrivalmaxdepartseconds)
			{
				result = true;
			}
		}		
		if(result){
			return obj;
		}
	}

	$scope.selectflight  = function(groupid,flightid,$event){
		angular.forEach($scope.fareFlightSegment, function(fareflightvalue,fareindex) { 
			if(fareflightvalue.id == groupid)
			{
				angular.forEach(fareflightvalue.flightSegmentsGroups, function(groupvalue,groupindex) { 
					angular.forEach(groupvalue.flightSegments, function(segvalue,index) { 
						if(segvalue.flightIndex == flightid)
						{ 
							var newobjid = replaceAll(groupid,':','\\:');
							var flightidindex =  angular.element($().find('input[name=fidx'+newobjid+']'));
							angular.element(flightidindex.attr('value',flightid));
						}
					});

				});
			}
		});
	}
	/**	
	 *Description:Show Paticular Flight Details.
	 **/
	$scope.showdetails = function(obj){		
		$scope.selectedSegmentsid = obj.id;
		var newobjid = replaceAll(obj.id,':','\\:');    
		var radioid = '#radiobutton'+newobjid;    
		var radiobyname =  'input[name=selectedflight'+newobjid+']';    
		var checkedid = angular.element($.find(radiobyname+':checked'));
		var flightindexid = checkedid.attr('id');   
		angular.forEach(obj.flightSegmentsGroups, function(Groupsobj,index) { 
			angular.forEach(Groupsobj.flightSegments, function(Segmentobj,index) { 
				if(flightindexid == Segmentobj.flightIndex)
				{
					$scope.selectedflightindex = Segmentobj.flightIndex;
					$scope.selectedsegments = Segmentobj.segments;			 
					$scope.totalprice = obj.totalPrice;
					$scope.exchangerate = obj.exchangeRate;					 
					var departObj = []; var arrvlObj = [];  $scope.duration = [];
					angular.forEach($scope.selectedsegments, function(timeobj,index) {
						var departHour = timeobj.depart;
						var arrivalHour = timeobj.arrival;
						var a = moment(arrivalHour); 
						var b = moment(departHour);
						var c = a.diff(b, 'minutes');
						var Duration = $scope.convertminToHour(c);
						$scope.duration.push(Duration);

					}); 		 

				}

			});
		});

		$scope.selectedflight = obj;  

		var fareref =   $scope.selectedsegments[$scope.selectedsegments.length - 1].fareInfoRef;         
		var farerule = $scope.selectedflight.fareRules[$scope.selectedflight.fareRules.length - 1].fareRule[0].fareValue;
		var providercode = $scope.selectedflight.fareRules[$scope.selectedflight.fareRules.length - 1].fareRule[0].fareProviderCode;
		$scope.baggageunit = $scope.selectedflight.fareRules[$scope.selectedflight.fareRules.length - 1].fareRule[0].bagAllowanceUnit;
		$scope.baggagevalue = $scope.selectedflight.fareRules[$scope.selectedflight.fareRules.length - 1].fareRule[0].bagAllowanceValue;
		if($scope.baggageunit ==null && ($scope.baggagevalue ==0 ||$scope.baggagevalue ==null)){
			$scope.baggagevalue="No Information Available";
		}
		else if($scope.baggageunit ==null){
			$scope.baggageunit="Kg";
		}
		$scope.rulesloader = "block";


		$http({method:'get',url:apiUrl+'farerule/response',headers:{'Content-Type': 'application/json'},params: {app_key: $scope.apiParams.app_key,farerulekey:fareref,farerulevalue:farerule,providercode:providercode}}).
		success(function(data, status, headers, config){
			if(data.fareruleList==undefined||data.fareruleList==0){
				$scope.rulesloader = "none";
				$scope.farerulelist = [{category: 0,type: "RULE",value:"<b>No Fare Rules</b>"}];
			}
			else{
				$scope.rulesloader = "none";
				$scope.farerulelist = data.fareruleList;	
			}	
		}).error(function(data, status, headers, config){
			$scope.rulesloader = "none";
			$scope.farerulelist = [{category: 0,type: "RULE",value:"No Fare Rules"}];
		});
	};


	$scope.isshowableflightSegments = function(index){
		var groupdivparentlist = $window.document.getElementsByClassName("seglist");
		var isshowable = true;
		for(var i = 0; i<groupdivparentlist.length; i++)
		{
			var childcount = groupdivparentlist[i].getElementsByClassName("sin-row").length;			
			if(i == index && childcount == 0)
			{
				isshowable = false;
				break;
			}
		}
		return isshowable;		
	}
	/**	
	 *Description:do hide empty group on  isShowable -- to be called on every onFilter event.
	 **/
	$scope.isShowable = function(groupindex) {

		var groupdivparentlist = $window.document.getElementsByClassName("flightlistcon");
		var isshowable = true;
		for(var i = 0; i<groupdivparentlist.length; i++)
		{
			var childcount = groupdivparentlist[i].getElementsByClassName("sin-row").length;

			if(i == groupindex && childcount == 0)
			{				
				isshowable = false;
				break;

			}
			var defaultsummaryindex = $scope.returnFirstVisibleGroupindex();


		}
		return isshowable;
	}
	/**	
	 *Description:do hide empty group on  isShowable -- to be called on every onFilter event.
	 **/
	$scope.returnFirstVisibleGroupindex = function() {
		var groupdivparenthidelist = $window.document.getElementsByClassName("flightlistcon ng-scope");
		var hiddengrouplist = $window.document.getElementsByClassName("flightlistcon ng-scope ng-hide");		
		var groupdivparentshowlist = $window.document.getElementsByClassName("flightlistcon");		
		var isshowable = true;
		for(var i = 0; i<groupdivparentshowlist.length; i++)
		{			
			var ishidden = false;
			for(var hideindex = 0; hideindex<hiddengrouplist.length; hideindex++)
			{
				var groupdivid = groupdivparentshowlist[i].id;
				var hiddengroupdivid = hiddengrouplist[hideindex].id;
				if(groupdivid == hiddengroupdivid)
				{
					ishidden  = true;
					break;
				}
			}
			if(!ishidden)
			{
				return i;
			}
		}
		return isshowable;
	};
	/**	
	 *Description:do hide empty group on  isShowable -- to be called on every onFilter event.
	 **/
	$scope.populateSummaryDetails = function() {		

		if($scope.checksummary == 0)
		{	
			var groupdivparenthidelist = document.getElementsByClassName("flightlistcon");
			var hiddengrouplist = document.getElementsByClassName("flightlistcon ng-scope ng-hide");		
			var groupdivparentshowlist = document.getElementsByClassName("flightlistcon");

			var firstvisibleindex = -1;
			for(var i = 0; i<groupdivparentshowlist.length; i++)
			{			
				var ishidden = false;			
				for(var hideindex = 0; hideindex<hiddengrouplist.length; hideindex++)
				{
					var groupdivid = groupdivparentshowlist[i].id;
					var hiddengroupdivid = hiddengrouplist[hideindex].id;
					if(groupdivid == hiddengroupdivid)
					{
						ishidden  = true;
						break;
					}
				}
				if(!ishidden)
				{
					firstvisibleindex =  i;					
					var baseprice = groupdivparenthidelist[firstvisibleindex].getElementsByClassName("basepriceval")[0];
					var taxes = groupdivparenthidelist[firstvisibleindex].getElementsByClassName("taxesval")[0];
					var totalPrice = groupdivparenthidelist[firstvisibleindex].getElementsByClassName("totalPriceval")[0];
					if(baseprice != undefined){
						$scope.summarybaseprice = baseprice.value;
						$scope.summarytax = taxes.value;
						$scope.summarytotalprice = totalPrice.value;
					}
					return true;
				}
			}
			return false;
		} 
		else
		{
			$scope.checksummary = 0;
			return true;
		}
	};

	/* Time Converstion Filters */

	$scope.datecompare11 = function(obj1,obj2)
	{

		var arrtime = new Date(obj2);
		var deptime = new Date(obj1);
		var tseconds = (arrtime.getTime() - deptime.getTime())/1000;      

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


		var totalSeconds = conversions['ss'](tseconds),
		hh = Math.floor(totalSeconds / 3600),
		mm = Math.floor((totalSeconds % 3600) / 60),
		ss = totalSeconds % 60;

		var format = 'hh:mm';
		var isPadded = angular.isDefined(isPadded)? isPadded: true;
		hh = isPadded? padding(hh, 2): hh;
		mm = isPadded? padding(mm, 2): mm;
		ss = isPadded? padding(ss, 2): ss;

		return format.replace(/hh/, hh).replace(/mm/, mm).replace(/ss/, ss);
	}

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

	$scope.getlayovercomparelevel2 = function(obj1,arrobj,depobj,arrobj1,depobj1)
	{		

		var arrtime = new Date(arrobj);
		var deptime = new Date(depobj);
		var arrtime1 = new Date(arrobj1);
		var deptime1 = new Date(depobj1);
		var tseconds = (deptime.getTime() - arrtime.getTime()  )/1000;    
		var contomin = tseconds / 60 ;
		var tseconds1 = (deptime1.getTime() - arrtime1.getTime()  )/1000;    
		var contomin1 = tseconds1 / 60 ;
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
		totaldur = totaldur + contomin +contomin1;
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

	/**
	 *Description: Modify search Process.
	 **/
	$scope.flightresearch = function(){	
		var reSearch = {};
		neworigin =  $("#originid").val();
		newdestination = $("#destinationid").val();
		var newDeptdate = $("#onedpd").val();		
		var originbefore = decodeURIComponent(neworigin);
		var Ostart = originbefore.lastIndexOf('(') +1;
		var Oend = originbefore.lastIndexOf(')');
		var origindesbefore = decodeURIComponent(newdestination);
		var Dstart = origindesbefore.lastIndexOf('(') +1;
		var Dend = origindesbefore.lastIndexOf(')');
		//orgin country and destination country format 
		var orifirstindex =neworigin.indexOf(',') + 1;
		var orilastindex = neworigin.lastIndexOf(',');		    	
		var desfirstindex = newdestination.indexOf(',') + 1;
		var deslastindex = newdestination.lastIndexOf(',');
		var originCountry = neworigin.substring(orifirstindex, orilastindex);
		var destinationCountry = newdestination.substring(desfirstindex, deslastindex);		
		if (originCountry == "") {
			$("#errorione").text("Please Enter the Origin City");
			$('#errorione').stop().fadeIn(400).delay(1500).fadeOut(400);		   
		} else if (destinationCountry == "") {
			$("#errdesone").text("Please Enter the Destination City");
			$('#errdesone').stop().fadeIn(400).delay(1500).fadeOut(400);
		} 
		else if (neworigin == newdestination) {
			$("#errdesone").text("Please Enter the Different Destination City");
			$('#errdesdone').stop().fadeIn(400).delay(1500).fadeOut(400);
		}else if (newDeptdate == "") {			
			$("#errdepone").text("Select the Depart date");
			$('#errdepone').stop().fadeIn(400).delay(1500).fadeOut(400);

		} 
		else{
			var d = new Date(newDeptdate.split("/").reverse().join("-"));
			// airlines list for oneway
			var newAirline = angular.element('#onewayairline').val();
			reSearch.isDynamicmarkup = angular.element('#isDynamicmarkup').val();
			reSearch.searchkey="";
			reSearch.markupAmount = angular.element('#markupAmount').val();
			reSearch.origin = originbefore.substring(Ostart, Oend);
			reSearch.destination = origindesbefore.substring(Dstart, Dend);
			reSearch.originall=neworigin;
			reSearch.destinationall=newdestination;
			reSearch.departureDate = newDeptdate;
			reSearch.depDate = $scope.yyyymmdd(d);
			reSearch.adult = angular.element('#adultid').text();
			reSearch.kid = angular.element('#kidid').text();
			reSearch.infant = angular.element('#infantid').text();
			reSearch.triptype = angular.element('#triptype').val();
			reSearch.cabinClass = angular.element('#cabinselect').val();
			reSearch.trips = angular.element('#trips').val();
			reSearch.app_key = angular.element('#ay').val();
			reSearch.currency = angular.element('#onecurrencyname').val();	
			reSearch.arrivalDate = '';
			if(newAirline == "Airline"){
				reSearch.airline = '';
			}
			else{
				reSearch.airline = angular.element('#airlinecode').val();
			}
			//domestic check code
			if (originCountry == "India" && destinationCountry == "India"){
				$scope.isDomestic = true;
				$scope.isInternational = false;
			}else{
				$scope.isDomestic = false;
				$scope.isInternational = true;			
			} 
			reSearch.isDomestic = $scope.isDomestic;


			var modifySearch = ('/Flights-oneway-'+$scope.ThemeType+'?ori='+encodeURIComponent(reSearch.originall)+'&des='+encodeURIComponent(reSearch.destinationall)+'&depart='+encodeURIComponent(reSearch.departureDate)+'&arrival='+encodeURIComponent(reSearch.arrivalDate)
					+'&class='+encodeURIComponent(reSearch.cabinClass)+'&ccy='+reSearch.currency+'&isDom='+reSearch.isDomestic+'&isDyn='+reSearch.isDynamicmarkup+'&marAt='+encodeURIComponent(reSearch.markupAmount)+'&tty='+encodeURIComponent(reSearch.triptype)
					+'&ay='+encodeURIComponent(reSearch.app_key)+'&sky='+encodeURIComponent(reSearch.searchkey)+'&adt='+reSearch.adult+'&kid='+reSearch.kid+'&inf='+reSearch.infant+'&airline='+reSearch.airline+'&thm='+$scope.ThemeType);
			localStorageService.set('UrlParameters',modifySearch);
			$location.url(modifySearch);

		}
	}

	$scope.addmarkup = function(){	
		var markupParam = {};
		var isDynamicmarkup =angular.element('#Dynamic').val();
		var markAmount =angular.element('#appliedmarkamt').val();
		markupParam.isDynamicMarkup = isDynamicmarkup;
		markupParam.markupAmount = markAmount;
		markupParam.searchkey=$scope.searchkey;
		markupParam.adult = $scope.adult;
		markupParam.kid = $scope.child;
		markupParam.infant = $scope.infant;
		markupParam.origin = $scope.origincity;
		var ori = markupParam.origin;		
		markupParam.destination = $scope.destinationcity;
		var dest = markupParam.destination;
		markupParam.departureDate = $scope.departuredate;
		markupParam.arrivalDate = '';
		markupParam.cabinClass = $scope.cabin;
		markupParam.currency = $scope.currencyname;
		markupParam.triptype = angular.element('#tty').val();
		markupParam.app_key = angular.element('#ay').val();
		markupParam.airline = $scope.mairline;
		markupParam.isDomestic = $scope.misDomestic;
		markupParam.airline = angular.element('#airlinecode').val();
		var orifirstindex =ori.indexOf(',') + 1;
		var orilastindex = ori.lastIndexOf(',');		    	
		var desfirstindex = dest.indexOf(',') + 1;
		var deslastindex = dest.lastIndexOf(',');
		var originCountry = ori.substring(orifirstindex, orilastindex);
		var destinationCountry = dest.substring(desfirstindex, deslastindex);
		if (originCountry == "India" && destinationCountry == "India"){
			markupParam.isDomestic = true;
			markupParam.isInternational = false;
		}else{
			markupParam.isDomestic = false;
			markupParam.isInternational = true;
		} 
		$location.url('/Flights-oneway-'+$scope.ThemeType+'?ori='+encodeURIComponent(markupParam.origin)+'&des='+encodeURIComponent(markupParam.destination)+'&depart='+encodeURIComponent(markupParam.departureDate)+'&arrival='+encodeURIComponent(markupParam.arrivalDate)
				+'&class='+encodeURIComponent(markupParam.cabinClass)+'&ccy='+markupParam.currency+'&isDom='+markupParam.isDomestic+'&isDyn='+markupParam.isDynamicMarkup+'&marAt='+encodeURIComponent(markupParam.markupAmount)+'&tty='+encodeURIComponent(markupParam.triptype)
				+'&ay='+encodeURIComponent(markupParam.app_key)+'&sky='+encodeURIComponent(markupParam.searchkey)+'&adt='+markupParam.adult+'&kid='+markupParam.kid+'&inf='+markupParam.infant+'&airline='+markupParam.airline+'&thm='+$scope.ThemeType+'&cache'+false);
	}

	$scope.booknow = function(index){
		$scope.isCor=angular.element('#isCorporate').val();
		var flightbook = {};
		flightbook.ccy = angular.element('#ccy'+index).val();
		flightbook.bookingtype =angular.element('#bookingtype'+index).val();
		flightbook.adult = angular.element('#adult'+index).val();  
		flightbook.child = angular.element('#child'+index).val();
		flightbook.infant =angular.element('#infant'+index).val();
		flightbook.searchkey = angular.element('#searchkey'+index).val();  
		flightbook.app_key = angular.element('#app_key'+index).val();
		flightbook.flightindex =angular.element('#fid'+index).val();
		if($scope.isCor =='true'){
			flightbook.isOneway=true;
			var selectedflight=$scope.selectedFlight(flightbook);
			var depart=selectedflight.flightSegmentsGroups[0].flightSegments[0].segments[0].depTime;
			var closestTime=$scope.convertmin(depart);
			var minclosetime;
			var maxclosetime;
			minclosetime=closestTime-$scope.FlightTimeLimit;
			maxclosetime=closestTime+$scope.FlightTimeLimit;				 
			$scope.closestflights(minclosetime,maxclosetime);

			if($scope.closestFlights.length!=0){
				var lowFareFlights=[];
				angular.forEach($scope.closestFlights, function(value) {
					if(selectedflight.totalPrice > value.totalPrice){
						lowFareFlights.push(value);
					}
				})

				$scope.lowpricewithStopflight(lowFareFlights);
				var lowfareFlight1;
				var lowfareFlight2;
				if(lowFareFlights.length !=0){
					flightbook.origin=$scope.getAllParams.origin;
					flightbook.destination=$scope.getAllParams.destination;
					flightbook.depDate=$scope.getAllParams.depDate;
					flightbook.arvlDate=$scope.getAllParams.arvlDate;
					flightbook.triptype=$scope.getAllParams.triptype;


					if(lowFareFlights.length >1){
						var cheaplowfareStop=[];
						cheaplowfareStop.push($scope.sortet_stopFlights[0]);
						cheaplowfareStop.push($scope.sortet_stopFlights[1]);					
						cheaplowfareStop.sort(function(a, b) {
							return parseFloat(a.totalPrice) - parseFloat(b.totalPrice);
						});

						lowfareFlight1=cheaplowfareStop[0];
						lowfareFlight2=cheaplowfareStop[1];
					}
					else if(lowFareFlights.length ==1){
						lowfareFlight1=lowFareFlights[0];
						lowfareFlight2=null;

					}
					$scope.items1 = selectedflight; 	
					$scope.items2 = lowfareFlight1;
					$scope.items3 =  lowfareFlight2;
					$scope.items4 =  flightbook;
					var modalInstance = $modal.open({
						animation: $scope.animationsEnabled,
						templateUrl: 'views/LowestFareAlert.jsp',
						controller: 'LowestFareAlertCtrl',
						backdrop: 'static',
						keyboard: false,
						resolve: {
							items1: function () {
								return $scope.items1;
							},
							items2: function () {
								return $scope.items2;
							},
							items3: function () {
								return $scope.items3;
							},
							items4: function () {
								return $scope.items4;
							}
						}
					});

				}
				else{
					var url='/Flights-BookSummary-'+$scope.ThemeType+'?ad='+flightbook.adult+'&chd='+flightbook.child+'&inf='+flightbook.infant+'&bkTy='+encodeURIComponent(flightbook.bookingtype)+'&ccy='+encodeURIComponent(flightbook.ccy)+'&ay='+encodeURIComponent(flightbook.app_key)+'&finx='+encodeURIComponent(flightbook.flightindex)+'&sky='+encodeURIComponent(flightbook.searchkey)
					+'&ori='+encodeURIComponent($scope.getAllParams.origin)+'&des='+encodeURIComponent($scope.getAllParams.destination)+'&depart='+encodeURIComponent($scope.getAllParams.depDate)+'&arrival='+encodeURIComponent($scope.getAllParams.arvlDate)+'&tty='+encodeURIComponent($scope.getAllParams.triptype)+
					'&islowfare='+true+'&lowfareflightindex1='+""+'&lowfareflightindex2='+""+'&reasontoselect='+''+'&thm='+$scope.ThemeType;
					$location.url(url);
					}
			}
			else{
				var url='/Flights-BookSummary-'+$scope.ThemeType+'?ad='+flightbook.adult+'&chd='+flightbook.child+'&inf='+flightbook.infant+'&bkTy='+encodeURIComponent(flightbook.bookingtype)+'&ccy='+encodeURIComponent(flightbook.ccy)+'&ay='+encodeURIComponent(flightbook.app_key)+'&finx='+encodeURIComponent(flightbook.flightindex)+'&sky='+encodeURIComponent(flightbook.searchkey)
				+'&ori='+encodeURIComponent($scope.getAllParams.origin)+'&des='+encodeURIComponent($scope.getAllParams.destination)+'&depart='+encodeURIComponent($scope.getAllParams.depDate)+'&arrival='+encodeURIComponent($scope.getAllParams.arvlDate)+'&tty='+encodeURIComponent($scope.getAllParams.triptype)+
				'&islowfare='+true+'&lowfareflightindex1='+""+'&lowfareflightindex2='+""+'&reasontoselect='+''+'&thm='+$scope.ThemeType;
				$location.url(url);
				}
		}else{
			var url='/Flights-BookSummary-'+$scope.ThemeType+'?ad='+flightbook.adult+'&chd='+flightbook.child+'&inf='+flightbook.infant+'&bkTy='+encodeURIComponent(flightbook.bookingtype)+'&ccy='+encodeURIComponent(flightbook.ccy)+'&ay='+encodeURIComponent(flightbook.app_key)+'&finx='+encodeURIComponent(flightbook.flightindex)+'&sky='+encodeURIComponent(flightbook.searchkey)
			+'&ori='+encodeURIComponent($scope.getAllParams.origin)+'&des='+encodeURIComponent($scope.getAllParams.destination)+'&depart='+encodeURIComponent($scope.getAllParams.depDate)+'&arrival='+encodeURIComponent($scope.getAllParams.arvlDate)+'&tty='+encodeURIComponent($scope.getAllParams.triptype)+
			'&islowfare='+true+'&lowfareflightindex1='+""+'&lowfareflightindex2='+""+'&reasontoselect='+''+'&thm='+$scope.ThemeType;
			$location.url(url);
			}

		jQuery.noConflict(); 
		$('body').removeClass('modal-open');
		$('.modal-backdrop').remove();

	}

	$scope.convertmin= function(time){
		var a = time.split(':');
		var minutes = (+a[0]) * 60 + (+a[1]);
		return minutes;
	}

	$scope.selectedFlight = function(fidx){
		var selectedflight;
		angular.forEach($scope.fareFlightSegment, function(obj,index) { 
			angular.forEach(obj.flightSegmentsGroups, function(Groupsobj,index) { 
				angular.forEach(Groupsobj.flightSegments, function(Segmentobj,index) { 
					if(fidx.flightindex == Segmentobj.flightIndex)
					{
						selectedflight=obj;
					}
				})
			})
		})

		return selectedflight;

	}

	$scope.holdnow = function(index){
		var flightHold = {};
		flightHold.ccy = angular.element('#ccy'+index).val();
		flightHold.bookingtype = angular.element('#holdingtype'+index).val();
		flightHold.adult = angular.element('#adult'+index).val();  
		flightHold.child = angular.element('#child'+index).val();
		flightHold.infant =angular.element('#infant'+index).val();
		flightHold.searchkey = angular.element('#searchkey'+index).val();  
		flightHold.app_key = angular.element('#app_key'+index).val();
		flightHold.flightindex =angular.element('#fid'+index).val();
		var url='/Flights-BookSummary?ad='+flightHold.adult+'&chd='+flightHold.child+'&inf='+flightHold.infant+'&bkTy='+encodeURIComponent(flightHold.bookingtype)+'&ccy='+encodeURIComponent(flightHold.ccy)+'&ay='+encodeURIComponent(flightHold.app_key)+'&finx='+encodeURIComponent(flightHold.flightindex)+'&sky='+encodeURIComponent(flightHold.searchkey);
		$location.url(url);
	};
	
	$scope.returnIndex = function(){
		window.location.href = window.location.href.replace(/#.*$/, '');
	}
	
	$scope.flightquotemap = {};
	$scope.flightquotetripmap = {};
	$scope.flightquoteconnecttripmap = {};
	$scope.addtoquotelist = function(fareFlightSegment,index){
		angular.element('#QuoteClick'+index).removeClass('btn-info').addClass('btn-greeninfo');
		var quoteconnectingflightjsonarray = [];
		var quotetripdetailjsonjsonarray = [];
		var passcount = parseInt($scope.getAllParams.adult)+parseInt($scope.getAllParams.kid)+parseInt($scope.getAllParams.infant);
		var totalduration ;
		if(fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments[0].segments.length == 1){
			totalduration = $filter('tayyarahtimeformat')(fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments[0].segments);
		}
		if(fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments[0].segments.length == 2){
			totalduration = $scope.getlayovercompare(fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments[0].segments,fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments[0].segments[0].arrival,fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments[0].segments[1].depart);
		}
		if(fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments[0].segments.length == 3){
			totalduration = $scope.getlayovercomparelevel2(fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments[0].segments,fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments[0].segments[0].arrival,fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments[0].segments[1].depart,fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments[0].segments[1].arrival,fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments[0].segments[2].depart);
		}

		var quotejson = {'airline':fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments[fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments.length - 1].segments[0].carrier.name,'departureDate':fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments[fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments.length - 1].segments[0].depDate,'arrivalDate':''				
			,'travelRequestDate':fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments[fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments.length - 1].segments[0].depDate,'totalDuration':totalduration,'flightNumber':fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments[fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments.length - 1].segments[0].flight.number,'origin':$scope.originall,'destination':$scope.destinationall,'tripType':$scope.getAllParams.triptype,'bookingClassPrefer':$scope.getAllParams.cabinClass,'adultCount':$scope.getAllParams.adult,'childCount':$scope.getAllParams.kid,'infantCount':$scope.getAllParams.infant,'totalAmount':fareFlightSegment.totalPrice,'baseAmount':fareFlightSegment.basePrice,'taxAmount':fareFlightSegment.taxes,'booked':false,'passengerCount':passcount};

		var quotetripdetailjson = {'operatedByName':fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments[fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments.length - 1].segments[0].carrier.name,'operatedByCode':fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments[fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments.length - 1].segments[0].carrier.code,'departureTimestamp':fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments[fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments.length - 1].segments[0].depDate,'departureDate':fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments[fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments.length - 1].segments[0].depDate,'depTime':fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments[fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments.length - 1].segments[0].depTime,'arrivalTimestamp':fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments[fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments.length - 1].segments[0].arrDate,'arrivalDate':fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments[fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments.length - 1].segments[0].arrDate,'arrTime':fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments[fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments.length - 1].segments[0].arrTime
				,'flightDuration':fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments[fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments.length - 1].segments[0].duration,'flightNumber':fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments[fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments.length - 1].segments[0].flight.number,'originName':$scope.Oricity,'originCode':fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments[fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments.length - 1].segments[0].ori,'destinationName':$scope.Descity,'destinationCode':fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments[fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments.length - 1].segments[0].dest,'trips':1,'classOfService':$scope.getAllParams.cabinClass,'destinationTerminal':fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments[fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments.length - 1].segments[0].flight.destTerminal,'originTerminal':fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments[fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments.length - 1].segments[0].flight.oriTerminal};

		quotetripdetailjsonjsonarray.push(quotetripdetailjson);
		if(fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments[fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments.length - 1].segments.length > 0)
		{
			angular.forEach(fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments[fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments.length - 1].segments, function(obj,index) { 			
				if(index != 0){
					var quoteconnectingflightjson = {'operatedByName':obj.carrier.name,'operatedByCode':obj.carrier.code,'departureTimestamp':obj.depDate,'departureDate':obj.depDate,'depTime':obj.depTime,'arrivalTimestamp':obj.arrDate,'arrivalDate':obj.arrDate,'arrTime':obj.arrTime
							,'flightDuration':obj.duration,'flightNumber':obj.flight.number,'originName':$scope.Oricity,'originCode':obj.ori,'destinationName':$scope.Descity,'destinationCode':obj.dest,'trips':1,'classOfService':$scope.getAllParams.cabinClass,'destinationTerminal':obj.flight.destTerminal,'originTerminal':obj.flight.oriTerminal};
					quoteconnectingflightjsonarray.push(quoteconnectingflightjson);					
				}    
			});
		}
		$scope.flightquotemap[fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments[fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments.length - 1].segments[0].flight.number] = quotejson;
		$scope.flightquotetripmap[fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments[fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments.length - 1].segments[0].flight.number] = quotetripdetailjsonjsonarray;
		$scope.flightquoteconnecttripmap[fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments[fareFlightSegment.flightSegmentsGroups[fareFlightSegment.flightSegmentsGroups.length - 1].flightSegments.length - 1].segments[0].flight.number] = quoteconnectingflightjsonarray;

		// Show Add Quouation Button
		$scope.quoteloaded = true;
		jQuery.noConflict(); 
		$('#InfoModal').modal('show');

		setTimeout(function(){
			$('#InfoModal').modal('hide');
		}, 3000);
	}

	/* Show All Quotes*/
	$scope.showallquotes = function(){

		$scope.quotearray = [];
		for (var key in $scope.flightquotemap) {
			if ($scope.flightquotemap.hasOwnProperty(key)) {				
				var obj = $scope.flightquotemap[key];			
				$scope.quotearray.push(obj);
			}
		}			

		$("#myModalQuotation").modal(); 
		$scope.$apply();
	}
	/* Remove Quotes */
	$scope.removequote = function(flightnumber){

		delete $scope.flightquotemap[flightnumber];
		delete $scope.flightquotetripmap[flightnumber];		
		delete $scope.flightquoteconnecttripmap[flightnumber];	
		$scope.quotearray = [];
		for (var key in $scope.flightquotemap) {
			if ($scope.flightquotemap.hasOwnProperty(key)) {				
				var obj = $scope.flightquotemap[key];			
				$scope.quotearray.push(obj);
			}
		}
		// Hide Quouation Button
		if($scope.quotearray.length == 0)		
			$scope.quoteloaded = false;
	}


	$scope.addquotesModal = function(){
		$('#myModalQuotation').modal('hide');

		$scope.quotearray = [];
		for (var key in $scope.flightquotemap) {
			if ($scope.flightquotemap.hasOwnProperty(key)) {				
				var obj = $scope.flightquotemap[key];			
				$scope.quotearray.push(obj);
			}
		}
		$scope.quotetriparray = [];
		for (var key in $scope.flightquotetripmap) {
			if ($scope.flightquotetripmap.hasOwnProperty(key)) {				
				var obj = $scope.flightquotetripmap[key];			
				$scope.quotetriparray.push(obj);
			}
		}

		$scope.quoteconnecttriparray = [];
		for (var key in $scope.flightquoteconnecttripmap) {
			if ($scope.flightquoteconnecttripmap.hasOwnProperty(key)) {				
				var obj = $scope.flightquoteconnecttripmap[key];			
				$scope.quoteconnecttriparray.push(obj);
			}
		}

		var quotejson = {'flightTravelRequest':$location.search().flightquotationid,"quotes":$scope.quotearray,"trips":$scope.quotetriparray,'connecttrip':$scope.quoteconnecttriparray};
		var finalUrl = ibeurl+"InsertFlightQuote";		
		$http({method:'POST',url:finalUrl,data:'QuotationJson='+JSON.stringify(quotejson),headers:{'Content-Type' : 'application/x-www-form-urlencoded'}}).		
		success(function(data, status, headers, config){

		}).error(function(data, status, headers, config){ 

		});


		$('#addQuoteConfirmModal').modal('show');
	}

	/* Add All Quote to database */
	$scope.addquotes = function(){
		var redirecturl = adminUrl+'getFlightQuotationList?flightQuotationRequestId='+$location.search().flightquotationid;	
		var redirectWindow = window.open(redirecturl, '_blank'); 
		$scope.flightquotemap = {};
		$scope.flightquotetripmap = {};
		$scope.flightquoteconnecttripmap = {};
		$scope.quotearray = [];
		$scope.quoteloaded = false;
		$('#addQuoteConfirmModal').modal('hide');
	}

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
				
			},function(){
				$log.info('modal Dismissed at :'+new Date());
			});

		});
	}

	// Time Duration modal
	$scope.convertminToHour= function(a){
		var hours = Math.trunc(a/60);
		var minutes = a % 60;
		var convertedhour = hours +"h "+ minutes+"m";
		return convertedhour;
	}

	// Reseting the filters
	$scope.resetLastFilters = function(){
		$scope.resetStop = false;
		$scope.FilterArray.reverse();
		if($scope.FilterArray.length>1){
			if($scope.FilterArray[0] == "AirLine"){
				$scope.airlinefilter($scope.resetAirlineName);
				$scope.FilterArray.splice(0,1); 
			}
		}
	}

	// Time Duration modal
	$scope.convertminToHour= function(a){
		var hours = Math.trunc(a/60);
		var minutes = a % 60;
		var convertedhour = hours +"h "+ minutes+"m";
		return convertedhour;
	}

	$scope.listTimingsDuration = function(dept,arr){
		if(arr === undefined || dept === undefined){
			return false;
		}
		var arr = arr.split(':');  	 	 
		var arrMinutes = (+arr[0]) * 60 + (+arr[1]);
		var dept = dept.split(':');  	 	 
		var deptMinutes = (+dept[0]) * 60 + (+dept[1]);
		var duration;
		if(parseInt(arrMinutes) < parseInt(deptMinutes) ){
			var twentyFourHour = parseInt(1440)- parseInt(deptMinutes);
			duration = twentyFourHour + parseInt(arrMinutes);

		}else if(parseInt(arrMinutes) == parseInt(deptMinutes)){
			duration =  parseInt(1440);
		}else{
			duration = parseInt(arrMinutes) - parseInt(deptMinutes);
		}
		return $scope.convertminToHour(duration);	 		 

	} 


	$scope.init();

}]);

/* Convert Mintues to Hours */
app.filter('totaltime', function() {
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

	return function(value, unit, format, isPadded) {

		var totaldur = 0;
		angular.forEach(value, function(obj,index) { 

			totaldur = totaldur + parseInt(obj.duration);         
		});

		var totalSeconds = conversions[unit || 'ss'](totaldur),
		hh = Math.floor(totalSeconds / 3600),
		mm = Math.floor((totalSeconds % 3600) / 60),
		ss = totalSeconds % 60;

		format = format || 'hh:mm:ss';
		isPadded = angular.isDefined(isPadded)? isPadded: true;
		hh = isPadded? padding(hh, 2): hh;
		mm = isPadded? padding(mm, 2): mm;
		ss = isPadded? padding(ss, 2): ss;

		return format.replace(/hh/, hh).replace(/mm/, mm).replace(/ss/, ss);
	};
});

app.filter('tayyarahtimeformat', function() {
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
	return function(value, unit, format, isPadded) {
		var totaldur = 0;
		angular.forEach(value, function(obj,index) {
			totaldur = totaldur + parseInt(obj.duration);         
		});
		var totalSeconds = conversions[unit || 'ss'](totaldur * 60),
		hh = Math.floor(totalSeconds / 3600),
		mm = Math.floor((totalSeconds % 3600) / 60),
		ss = totalSeconds % 60;
		var format = 'hhh mmm';
		isPadded = angular.isDefined(isPadded)? isPadded: true;
		hh = isPadded? padding(hh, 2): hh;
		mm = isPadded? padding(mm, 2): mm;
		ss = isPadded? padding(ss, 2): ss;
		return format.replace(/hh/, hh).replace(/mm/, mm);	
	};
});

app.filter('time', function() {
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
	return function(value, unit, format, isPadded) {

		var totalSeconds = conversions[unit || 'ss'](value),
		hh = Math.floor(totalSeconds / 3600),
		mm = Math.floor((totalSeconds % 3600) / 60),
		ss = totalSeconds % 60;
		format = format || 'hh:mm:ss';
		isPadded = angular.isDefined(isPadded)? isPadded: true;
		hh = isPadded? padding(hh, 2): hh;
		mm = isPadded? padding(mm, 2): mm;
		ss = isPadded? padding(ss, 2): ss;
		return format.replace(/hh/, hh).replace(/mm/, mm).replace(/ss/, ss);
	};
});








