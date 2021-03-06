
var app = angular.module('myApp');
app.controller('Flights-DomesticCtrl',['$scope','commonService','$window','$http','$document','$location','$compile','limitToFilter','$rootScope','flightServices','localStorageService','$route','$modal','$log','$timeout','flightServices',function($scope,commonService,$window,$http,$document,$location,$compile,limitToFilter,$rootScope,flightServices,localStorageService,$route,$modal,$log,$timeout,flightServices){
	var adminUrl = commonService.AdminbaseUrl;
	var ibeurl = commonService.Ibebaseurl;
	$scope.init = function(){
		var Theme = $location.search().thm;
		$scope.filter = 'views/Flights-Domestic-'+Theme+'Filter.jsp';
		$scope.Content = 'views/Flights-Domestic-'+Theme+'Content.jsp';
		$scope.user = {};
		$scope.urlParams = $scope.getParamData();
		$scope.user = $scope.domesticApiParams($scope.urlParams);

		$scope.mainContent = true;
		$scope.bookNowButtonQuotation = false;
		$scope.isQuoteAvailable = false;

		// Check Quote is avaliable 
		if($location.search().flightquotationid != undefined)
		{
			$scope.isQuoteAvailable = true;
			$scope.bookNowButtonQuotation = true;
		}
	
		$scope.display = "none";
		$scope.loading = false ;
		$scope.fligtSearch();
		$scope.isQuoteloaded = false;
		$scope.flightroundquotemap = {};
		$scope.flightroundquotetripmap = {};
		$scope.flightroundquoteconnecttripmap = {};

		$scope.origincity = $scope.urlParams.origincity;
		$scope.destinationcity =  $scope.urlParams.destinationcity;
		$scope.departuredate = $scope.urlParams.departure;
		$scope.arrivaldate = $scope.urlParams.arrival;
		$scope.totalpassenger = parseInt($scope.urlParams.adult)+parseInt($scope.urlParams.kid)+parseInt($scope.urlParams.infant);

		$scope.cabin =  $scope.urlParams.cabinClass;

		$scope.twoorigin = $scope.urlParams.origin;
		$scope.twodestination = $scope.urlParams.destination;

		/*-------------New cChanges--------*/
		$scope.markupammount = $scope.user.markupAmount;
		$scope.origin = $scope.user.origin;
		$scope.destination = $scope.user.destination;
		$scope.departureDate = $scope.user.departureDate;
		$scope.arrivalDate = $scope.user.arrivalDate;
		$scope.moriginall = $scope.user.originall;
		$scope.mdestinationall = $scope.urlParams.destinationall;
		$scope.mdepDate = $scope.urlParams.depDate;
		$scope.marvlDate = $scope.urlParams.arvlDate;
		$scope.mtriptype = $scope.urlParams.triptype ;
		$scope.mtrips = $scope.urlParams.trips ;
		$scope.mapp_key = $scope.urlParams.app_key ;
		$scope.mairline = $scope.urlParams.airline;
		$scope.misDomestic = $scope.urlParams.isDomestic ;

		$scope.adult = $scope.user.adult;
		$scope.child = $scope.user.kid;
		$scope.infant = $scope.user.infant;

		$scope.maincontainer = "maincontainhide";


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
		$scope.SecondDepartSlider = {
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
		$scope.SecondArrivalSlider = {
				min: 0,
				max: 1440,
				ceil: 1440,
				floor: 0,
				step: 10
		};

		$scope.loadpricebar = true;
		$scope.stopslist = [];
		for(var i = 0;i<2;i++){
			$scope.stopslist.push(i);
		}

		//Read value from properties file


		$scope.cities=function(cityName){var cityarr=[];return $http.get(apiUrl+"Search/bycity/"+cityName).then(function(response){angular.forEach(response.data,function(value){cityarr.push(value.city+","+value.country+","+"("+value.airport_code+")");});return limitToFilter(cityarr,15);});};
		$scope.onSelectPart = function($item, $model, $label) {
			$scope.$item = $item;
			$scope.$model = $model;
			$scope.$label = $label;
			$('#hideori').val($scope.twoorigin);
			$('#hidedes').val($scope.twodestination);
			if ($scope.twodestination != undefined) {
				angular.element(document.querySelector('#twodpd1')).focus();
			}
		};

		$scope.errordiv = false;
		$scope.lowprice =  0;       
		$scope.floorprice = 0;
		$scope.highprice =  0;  
		$scope.ceilingprice = 0; 
		$scope.currencyvalue = 1;
		$scope.currencyname = $scope.user.currency;
		$scope.basecurrencyname = $scope.user.currency;


		$scope.Cabinclass = "";		
		if($scope.user.cabinClass == 'Business')
			$scope.Cabinclass = "C";
		else if($scope.user.cabinClass == 'Premium')
			$scope.Cabinclass = "W";
		else if($scope.user.cabinClass == 'First')
			$scope.Cabinclass = "F";
		else
			$scope.Cabinclass = "E";

		/*$timeout($scope.callAtTimeout,3000);*/
		$scope.TimeLimit = flightServices.flighttime;

		$scope.onwardLowFareData = {};
		$scope.returnLowFareData = {};
		$scope.islowfare = true;
		$scope.islowfarereturn = true; 

	};

	function pad(n){return n<10 ? '0'+n : n}
	var apiUrl = commonService.baseUrl;	
	$scope.currencychangedValue = function()
	{
		flightServices.CurrencyConvert($scope.currencyname).then(function(res){
			var data = res.data;
			$scope.currencyvalue = parseFloat(data.value);
			$scope.classname = "tayyarah-"+$scope.currencyname;
		},function(){

		});
	}
	$scope.getParamData = function(){
		var domesticParam = {};
		domesticParam.origin = decodeURIComponent($location.search().ori);
		domesticParam.destination = decodeURIComponent($location.search().des);
		domesticParam.departure = decodeURIComponent($location.search().depart);
		domesticParam.arrival = decodeURIComponent($location.search().arrival);
		domesticParam.cabinClass = decodeURIComponent($location.search().class);
		domesticParam.currency = $location.search().ccy;
		domesticParam.isDomestic = $location.search().isDom;
		domesticParam.isDynamicmarkup = $location.search().isDyn;
		domesticParam.markup = $location.search().marAt;
		domesticParam.triptype = $location.search().tty;
		domesticParam.app_key  = $location.search().ay;
		domesticParam.searchkey = $location.search().sky;
		domesticParam.adult = $location.search().adt;
		domesticParam.kid = $location.search().kid;
		domesticParam.infant = $location.search().inf;
		domesticParam.airline = $location.search().airline;
		var origin = domesticParam.origin;
		var oriIndex = origin.indexOf(',') ;
		var Oricity = origin.substring(0, oriIndex);
		domesticParam.origincity = Oricity.replaceAll('+',' ');
		var destination = domesticParam.destination;
		var DestIndex = destination.indexOf(',') ;
		var Destcity = destination.substring(0, DestIndex);
		domesticParam.destinationcity = Destcity.replaceAll('+',' ');
		domesticParam.cache = $location.search().cache;
		return domesticParam;
	}


	$scope.domesticApiParams = function(params){

		var domApiParam = {};
		var ori = params.origin;
		var Ostart = ori.lastIndexOf('(') +1;
		var Oend = ori.lastIndexOf(')');	
		domApiParam.origin  = ori.substring(Ostart, Oend);
		var destn = params.destination;
		var Ostart = destn.lastIndexOf('(') +1;
		var Oend = destn.lastIndexOf(')');
		domApiParam.destination = destn.substring(Ostart, Oend);
		var deptDate = params.departure;
		var dept = new Date(deptDate.split("/").reverse().join("-"));
		domApiParam.depDate = $scope.yyyymmdd(dept);
		var avlDate = params.arrival;
		var arrive = new Date(avlDate.split("/").reverse().join("-"));
		domApiParam.arvlDate = $scope.yyyymmdd(arrive);
		domApiParam.adult = params.adult;
		domApiParam.kid = params.kid;
		domApiParam.infant = params.infant;	
		if(angular.element('#isLogged').val() != undefined && angular.element('#isLogged').val() != '')
			domApiParam.app_key  = angular.element('#ay').val();
		else
			domApiParam.app_key = params.app_key;

		domApiParam.cabinClass = params.cabinClass;
		domApiParam.currency = params.currency;
		domApiParam.isDynamicMarkup = params.isDynamicmarkup;
		domApiParam.isSpecialSearch = true;
		domApiParam.markupAmount = params.markup;
		domApiParam.triptype = params.triptype;
		domApiParam.airline = params.airline;
		domApiParam.searchkey = params.searchkey;
		domApiParam.isCacheData = params.cache;
		return domApiParam;		
	}

	String.prototype.replaceAll = function(s,r){return this.split(s).join(r)}
	$(window).scroll(function () {
		var i = $('#sele-summary');
		var h = i.outerHeight(true);
		if ($(window).scrollTop() > h) {
			if (!i.hasClass('scroll-header')) i.hide().addClass('scroll-header').fadeIn("slow");
		}
		if ($(window).scrollTop() >= 250) {
			i.slideDown('slow');
		} else {
			i.removeClass('scroll-header').show();
		}
	});
	$scope.fligtSearch = function(){		
		$scope.user.app_key=angular.element('#ay').val();
		flightServices.FlightSearch($scope.user).then(function(response){
			//$http.get('domesticSearch.json').then(function(response){	
			$scope.data = response.data;	
			if($scope.data.fareFlightSegment.length > 0){

				$scope.display = "block";

				$scope.classname = "tayyarah-"+$scope.user.currency;
				$scope.errormeg = "";
				$scope.bookingCurrency = $scope.data.bookedCurrency;
				$scope.fareFlightSegment = $scope.data.fareFlightSegment;
				$scope.searchkey =  decodeURIComponent($scope.data.searchKey); 
				$scope.app_key =  decodeURIComponent($scope.user.app_key);
				$scope.totalflightsaviable =  $scope.fareFlightSegment.length;
				var lastele =  $scope.fareFlightSegment.length - 1; 
				$scope.origincodename = $scope.data.ori;
				$scope.destcodename = $scope.data.dest;
				$scope.defaultmintime = "00.00";
				$scope.defaultmaxtime = "23.59";
				var airlinesarrwithdup = [];
				var stopsarr = [];
				var pricearr = [];
				$scope.onwardflights = [];
				$scope.returnflights = [];
				angular.forEach($scope.fareFlightSegment, function(value,fareindex) { 
					pricearr.push(value.totalPrice);

					if(value.flightSegmentsGroups[0].flightSegments[0].segments[0].ori == $scope.origincodevalue){
						$scope.onwardflights.push(value);
					}
					if(value.flightSegmentsGroups[0].flightSegments[0].segments[0].ori == $scope.destinationvalue){
						$scope.returnflights.push(value);
					}
					angular.forEach(value.flightSegmentsGroups, function(Groupsvalue,groupindex) { 
						angular.forEach(Groupsvalue.flightSegments, function(Segmentsvalue,index) {
							angular.forEach(Segmentsvalue.segments, function(Segmentvalue,segindex) {

								if(Segmentvalue.ori == $scope.origincodename){
									$scope.onwardflights.push(value);
								}
								if(Segmentvalue.ori == $scope.destcodename){
									$scope.returnflights.push(value);
								}
							});
						});
					});
				}); 
				$scope.onwardCompleteFlights = $scope.onwardflights;
				$scope.returnCompleteFlights = $scope.returnflights;

				$scope.selectedonwardflight = $scope.onwardflights[0].flightSegmentsGroups[0].flightSegments[0];
				$scope.selectedreturnflight = $scope.returnflights[0].flightSegmentsGroups[0].flightSegments[0];
				$scope.selectedonwardflightprice = $scope.onwardflights[0].totalPrice;
				$scope.selectedreturnflightprice = $scope.returnflights[0].totalPrice;

				$scope.selectedonwardflightfareobj =  $scope.onwardflights[0];
				$scope.selectedreturnflightfareobj =  $scope.returnflights[0];		

				$scope.selectedonwardbase = $scope.onwardflights[0].basePrice;
				$scope.selectedonwardtaxes = $scope.returnflights[0].taxes;

				$scope.selectedonwardbase = $scope.onwardflights[0].basePrice;
				$scope.selectedonwardtaxes =  $scope.onwardflights[0].taxes;

				$scope.selectedreturnbase=$scope.returnflights[0].basePrice
				$scope.selectedreturntaxes=$scope.returnflights[0].taxes;

				var totalprice  = parseFloat($scope.selectedonwardflightprice) +  parseFloat($scope.selectedreturnflightprice);
				$scope.selectedtotalflightsprice = parseFloat(totalprice).toFixed(2);
				/*	 Get total stops and airlines function*/
				angular.forEach($scope.fareFlightSegment, function(value,fareindex) { 
					angular.forEach(value.flightSegmentsGroups, function(Groupsvalue,groupindex) { 
						angular.forEach(Groupsvalue.flightSegments, function(Segmentsvalue,index) {
							stopsarr.push(Segmentsvalue.segments.length - 1);
							angular.forEach(Segmentsvalue.segments, function(Segmentvalue,segindex) {							
								if(Segmentvalue.carrier.name!=null){								
									if(index == 0 && segindex == 0){
										airlinesarrwithdup.push({"name":Segmentvalue.carrier.name,"code":Segmentvalue.carrier.code});
									}
								}
							});
						});
					});
				}); 
				var tempairlineoperarray = [];
				var uniqueairlineoperarray = [];
				$.each(airlinesarrwithdup, function(index, value) {
					if ($.inArray(value.name, tempairlineoperarray)==-1) {
						tempairlineoperarray.push(value.name);
						uniqueairlineoperarray.push(value);
					}
				});
				var uniquestopsarr = [];
				uniquestopsarr = stopsarr.unique();
				$scope.stopslist = uniquestopsarr;
				$scope.airlinelist = uniqueairlineoperarray;
				var uniquepricesarr = [];
				uniquepricesarr = pricearr.unique();
				/*Form matrix Array Function*/
				$scope.matrixairlinecode = [];
				var matrixairlines = [];
				var matrixairlinesarray = [];
				var matrixairlinesmap = {};
				angular.forEach($scope.fareFlightSegment, function(value,fareindex) { 
					angular.forEach(value.flightSegmentsGroups, function(Groupsvalue,groupindex) { 
						angular.forEach(Groupsvalue.flightSegments, function(Segmentsvalue,index) {
							angular.forEach(Segmentsvalue.segments, function(Segmentvalue,segindex) {
								if(index == 0 && segindex == 0){
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
								if(index == 0 && segindex == 0)
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
					});			});				
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
				$scope.Matrixairlinepriceitems = $scope.onestopsort(matrixairlinesarray);	
				uniquepricesarr.sort(function(a,b){return a - b});
				$scope.priceSlider = {
						min: parseFloat(uniquepricesarr[0]),
						max: parseFloat(uniquepricesarr[uniquepricesarr.length - 1]),
						ceil: parseFloat(uniquepricesarr[uniquepricesarr.length - 1]),
						floor: parseFloat(uniquepricesarr[0]),
						step: 10
				};

				$scope.loadpricebar = false;
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
				$scope.secondsliderConfigstep = 1;
				$scope.secondsliderConfigmin = 0;
				$scope.secondsliderConfigmax = 1440;
				$scope.secondsliderConfiguserMin = 0;
				$scope.secondsliderConfiguserMax = 1440; 
				$scope.secondarrsliderConfigstep = 1;
				$scope.secondarrsliderConfigmin = 0;
				$scope.secondarrsliderConfigmax = 1440;
				$scope.secondarrsliderConfiguserMin = 0;
				$scope.secondarrsliderConfiguserMax = 1440;	
			}
			else{
				{
					$scope.errormeg = "Sorry we could not process your request as server is busy. please try after some time.";
					$scope.errordiv = true;
					$scope.loadpricebar = false;
					$scope.errorDisplay($scope.errormeg,$scope.ErrorFlightTravelDetails);
				}
			}
		},function(errorStatus){
			$scope.loadpricebar = false;
			$scope.httpvalue = errorStatus.httpStatus;
			if($scope.httpvalue == '500')
				$scope.errormeg = "We could not find any flight matching your requirements, Try Again.";
			else
				$scope.errormeg = "Sorry we could not process your request as server is busy. please try after some time.";
			$scope.errordiv = true;
			$scope.errorDisplay($scope.errormeg,$scope.ErrorFlightTravelDetails);
		});
	}


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
	$('#seconddepartMin').html(hours1 + ':' + minutes1);
	$('#seconddepartMax').html(hours2 + ':' + minutes2);
	$('#secondarriMin').html(hours1 + ':' + minutes1);
	$('#secondarriMax').html(hours2 + ':' + minutes2);





	$scope.sortdescending  = false;  
	$scope.sortlist = [];
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

	$scope.returnsortdescending  = false;  
	$scope.returnsortlist = [];
	$scope.returnsortorder = function(items,type)
	{	
		$scope.returnpriceasc = "";
		$scope.returnairlineasc = "";
		$scope.returndepartasc = "";
		$scope.returnarrivalasc = "";
		$scope.returndurationasc = "";

		if($scope.returnsortdescending == false)
		{			
			$scope.returnsortlist =  items.sort(function(a, b) {

				if(type == 'price'){
					$scope.returnpriceasc = "tayyarah-arrow-down";
					return parseFloat(a.totalPrice) - parseFloat(b.totalPrice);						
				}
				if(type == 'airline'){
					$scope.returnairlineasc = "tayyarah-arrow-down";
					if ( a.flightSegmentsGroups[0].flightSegments[0].segments[0].carrier.name < b.flightSegmentsGroups[0].flightSegments[0].segments[0].carrier.name )
						return -1;
					if ( a.flightSegmentsGroups[0].flightSegments[0].segments[0].carrier.name > b.flightSegmentsGroups[0].flightSegments[0].segments[0].carrier.name )
						return 1;
					return 0;
				}					
				if(type == 'depart'){
					$scope.returndepartasc = "tayyarah-arrow-down";
					if ( a.flightSegmentsGroups[0].flightSegments[0].segments[0].depTime < b.flightSegmentsGroups[0].flightSegments[0].segments[0].depTime )
						return -1;
					if ( a.flightSegmentsGroups[0].flightSegments[0].segments[0].depTime > b.flightSegmentsGroups[0].flightSegments[0].segments[0].depTime )
						return 1;
					return 0;
				}
				if(type == 'arrival'){
					$scope.returnarrivalasc = "tayyarah-arrow-down";
					if(a.flightSegmentsGroups[0].flightSegments[0].segments[a.flightSegmentsGroups[0].flightSegments[0].segments.length - 1].arrTime!=undefined){
						if ( a.flightSegmentsGroups[0].flightSegments[0].segments[a.flightSegmentsGroups[0].flightSegments[0].segments.length - 1].arrTime < b.flightSegmentsGroups[0].flightSegments[0].segments[b.flightSegmentsGroups[0].flightSegments[0].segments.length - 1].arrTime )
							return -1;
						if ( a.flightSegmentsGroups[0].flightSegments[0].segments[a.flightSegmentsGroups[0].flightSegments[0].segments.length - 1].arrTime > b.flightSegmentsGroups[0].flightSegments[0].segments[b.flightSegmentsGroups[0].flightSegments[0].segments.length - 1].arrTime )
							return 1;
						return 0;
					}

				}
				if(type == 'duration'){
					$scope.returndurationasc = "tayyarah-arrow-down";
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

			$scope.returnsortdescending  = true;  
		}
		else
		{			
			$scope.returnsortlist =  items.sort(function(a, b) {
				if(type == 'price'){	
					$scope.returnpriceasc = "tayyarah-arrow-up";
					return parseFloat(a.totalPrice) - parseFloat(b.totalPrice);					
				}

				if(type == 'airline'){
					$scope.returnairlineasc = "tayyarah-arrow-up";
					if ( a.flightSegmentsGroups[0].flightSegments[0].segments[0].carrier.name < b.flightSegmentsGroups[0].flightSegments[0].segments[0].carrier.name )
						return -1;
					if ( a.flightSegmentsGroups[0].flightSegments[0].segments[0].carrier.name > b.flightSegmentsGroups[0].flightSegments[0].segments[0].carrier.name )
						return 1;
					return 0;
				}				
				if(type == 'depart'){
					$scope.returndepartasc = "tayyarah-arrow-up";
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
					$scope.returndurationasc = "tayyarah-arrow-up";

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
			$scope.returnsortlist.reverse()
			$scope.returnsortdescending  = false;  
		}

		return $scope.returnsortlist;
	}


	$scope.isRefuntable = function(item)
	{
		if(item)
			return "REFUNDABLE";
		if(!item)
			return "NON REFUNDABLE";
	}


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


	$scope.numberWithCommas =  function(x) {
		if(x != undefined)
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	$scope.replacetimeformat = function(time){

		var changeformat = time.replaceAll(':','');
		return changeformat;

	}

	$scope.onestopsort = function(items)
	{
		var sortlist = [];
		sortlist =  items.sort(function(a, b) {			
			return parseFloat(a.onestops) - parseFloat(b.onestops);
		});		
		return sortlist;
	}

	$scope.getconvertedcurrency = function(currentamt)
	{		
		var covertamt = parseFloat(currentamt) * parseFloat($scope.currencyvalue);	
		return parseFloat(covertamt).toFixed(2);
	}
	$scope.getslideconvertedcurrency = function(currentamt)
	{		
		var covertamt = parseFloat(currentamt) * parseFloat($scope.currencyvalue);	
		return parseInt(covertamt);
	}

	$scope.getcurrencyvalue = function(currentamt,exchangerate)
	{		
		var covertamt = parseFloat(currentamt) * parseFloat(exchangerate);	
		return parseFloat(covertamt).toFixed(2);
	}

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

	$scope.isCorp=angular.element('#isCorporate').val();


	/* selectonwardflight */
	$scope.selectonwardflight = function(onwardobj,onwardfareobj){	

		$scope.selectedonwardflight = onwardobj;
		$scope.selectedonwardflightfareobj = onwardfareobj;
		$scope.selectedonwardflightprice = onwardfareobj.totalPrice;
		$scope.selectedonwardbase=onwardfareobj.basePrice;
		$scope.selectedonwardtaxes=onwardfareobj.taxes;
		var totalprice  = parseFloat($scope.selectedonwardflightprice) +  parseFloat($scope.selectedreturnflightprice);
		$scope.selectedtotalflightsprice = parseFloat(totalprice).toFixed(2);

		if($scope.isCorp == 'true'){
			$scope.lowfareAlertfunction(onwardobj.flightIndex,"onwardFlight");	
		} 
	}

	/*selectreturnflight*/
	$scope.selectreturnflight = function(returnobj,returnfareobj){		 
		$scope.selectedreturnflight = returnobj;
		$scope.selectedreturnflightfareobj = returnfareobj;
		$scope.selectedreturnflightprice = returnfareobj.totalPrice;
		$scope.selectedreturnbase=returnfareobj.basePrice;
		$scope.selectedreturntaxes=returnfareobj.taxes;
		var totalprice  = parseFloat($scope.selectedonwardflightprice) +  parseFloat($scope.selectedreturnflightprice);
		$scope.selectedtotalflightsprice = parseFloat(totalprice).toFixed(2);	
		if($scope.isCorp == 'true'){
			$scope.lowfareAlertfunction(returnobj.flightIndex,"returnFlight");
		} 		 
	}

	/*showselectedsegments*/
	$scope.showdetailsspclround = function(onwardobj,returnobj){

		$scope.selectedonwardflight = onwardobj;
		$scope.selectedreturnflight = returnobj;
		// Time Duration
		var departObj = []; var arrvlObj = [];  $scope.Onwardduration = [];  $scope.returnDuration = [];
		angular.forEach($scope.selectedonwardflight.segments, function(timeobj,index) {
			var departHour = timeobj.depart;
			var arrivalHour = timeobj.arrival;
			var a = moment(arrivalHour); 
			var b = moment(departHour);
			var c = a.diff(b, 'minutes');
			var Duration = $scope.convertminToHour(c);
			$scope.Onwardduration.push(Duration);

		});
		angular.forEach($scope.selectedreturnflight.segments, function(timeobj,index) {
			var departHour = timeobj.depart;
			var arrivalHour = timeobj.arrival;
			var a = moment(arrivalHour); 
			var b = moment(departHour);
			var c = a.diff(b, 'minutes');
			var Duration = $scope.convertminToHour(c);
			$scope.returnDuration.push(Duration);

		});	 	 
		// End Duration

		var fareref =   $scope.selectedonwardflightfareobj.fareRules[0].fareRule[0].fareInfoRef;  
		var farerule = $scope.selectedonwardflightfareobj.fareRules[0].fareRule[0].fareValue;
		var providercode = $scope.selectedonwardflightfareobj.fareRules[0].fareRule[0].fareProviderCode;
		$scope.onwardbaggageunit = $scope.selectedonwardflightfareobj.fareRules[0].fareRule[0].bagAllowanceUnit;
		$scope.onwardbaggagevalue =$scope.selectedonwardflightfareobj.fareRules[0].fareRule[0].bagAllowanceValue;
		if($scope.onwardbaggageunit ==null && ($scope.onwardbaggagevalue ==0 ||$scope.onwardbaggagevalue ==null)){
			$scope.onwardbaggagevalue="No Information Available";	
		}
		else if($scope.onwardbaggageunit ==null){
			$scope.onwardbaggageunit="Kg";
		}
		$scope.returnbaggageunit = $scope.selectedreturnflightfareobj.fareRules[0].fareRule[0].bagAllowanceUnit;
		$scope.returnbaggagevalue =$scope.selectedreturnflightfareobj.fareRules[0].fareRule[0].bagAllowanceValue;
		if($scope.returnbaggageunit ==null && ($scope.returnbaggagevalue ==0 ||$scope.returnbaggagevalue ==null)){
			$scope.returnbaggagevalue="No Information Available";	
		}
		else if($scope.returnbaggageunit ==null){
			$scope.returnbaggageunit="Kg";
		}

		$scope.rulesloader = "block";
		$http({method:'get',url:apiUrl+'farerule/response',headers:{'Content-Type': 'application/json'},params: {app_key:$scope.user.app_key,farerulekey:fareref,farerulevalue:farerule,providercode:providercode}}).

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
	}	


	/* Price Filter */
	$scope.filterprice = function(obj) { 
		return (parseFloat(obj.totalPrice) >= parseFloat($scope.priceSlider.min) && parseFloat(obj.totalPrice) <= parseFloat($scope.priceSlider.max));
	};

	/* Get Datatime to Time */
	$scope.getDateObject = function(dt){
		var date = new Date(dt);
		var hours = date.getHours();
		if(hours < 10) hours = '0' + hours;
		var min = date.getMinutes();
		if(min < 10) min = '0' + min;
		return hours + ':' + min;
	}

	$scope.predicate = '';
	$scope.reverse = false;
	$scope.order = function(predicate) {
		$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
		$scope.predicate = predicate;
	};

	$scope.customorderBy =  function(allobj) { 
		return allobj;
	}

	$scope.showAllairline = true;
	$scope.filterairline = 0;
	$scope.Airlinesname = null;	
	//$scope.MatrixAirlinesIncludes = [];	
	$scope.Matrixclickairlinefilter = function($event,airline){
		$scope.AirlinesIncludes = [];
		if($scope.Airlinesname != null && $scope.Airlinesname == airline)
		{
			$scope.Airlinesname =  null; 			
			var selectable =  angular.element($.find('#selectable li')); 
			selectable.removeClass('ui-selectee ui-selected');  			
			var aircode = $scope.getairlinecode(airline);
			var airlineselectable =  angular.element($.find('#name'+aircode));  
			airlineselectable.prop('checked',false);
		}
		else
		{
			$scope.Airlinesname =  airline; 
			$scope.AirlinesIncludes.push(airline);
			var selectable =  angular.element($.find('#selectable li'));      
			selectable.removeClass('ui-selectee ui-selected');       
			($($event.target).addClass('ui-selectee ui-selected'));
			var removeseleteditem =  angular.element($.find('.airlinefilter'));  
			removeseleteditem.prop('checked',false);			
			var aircode = $scope.getairlinecode($scope.Airlinesname);
			var airlineselectable =  angular.element($.find('#name'+aircode));  
			airlineselectable.prop('checked',true);			
		}   

	}
	$scope.MatrixAirlineFilter = function(obj) {	
		var Airobjfilter = false;   
		if ($scope.Airlinesname != null) {			
			angular.forEach(obj.segments, function(svalue,index) { 
				if(index == 0){                     	 
					if (svalue.carrier.name == $scope.Airlinesname){
						Airobjfilter = true;   
					}
				}
			});			
		}   
		else
		{
			Airobjfilter = true; 
		}
		return Airobjfilter;

	}

	$scope.returnIndex = function(){
		window.location.href = window.location.href.replace(/#.*$/, '');
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
			var selectable =  angular.element($.find('#selectable li'));      
			selectable.removeClass('ui-selectee ui-selected');  
		}
		//console.log($scope.AirlinesIncludes.length);
		if($scope.AirlinesIncludes.length == 1){			
			$scope.Airlinesname =  $scope.AirlinesIncludes[0]; 
			var selectable =  angular.element($.find('#selectable li'));      
			selectable.removeClass('ui-selectee ui-selected');  
			var aircode = $scope.getairlinecode($scope.Airlinesname);
			var myEl = angular.element(document.querySelector('#mat'+aircode));
			myEl.addClass('ui-selectee ui-selected');		
		}

	}


	$scope.AirlineFilter = function(obj) {
		var RoundAirobjfilter = false;   
		if ($scope.AirlinesIncludes.length > 0) {
			angular.forEach(obj.segments, function(svalue,index) { 
				angular.forEach($scope.AirlinesIncludes, function(airline,airindex) {
					if (svalue.carrier.name == $scope.AirlinesIncludes[airindex])
					{
						RoundAirobjfilter = true;   
					}
				});
			});
		}   
		else
		{
			RoundAirobjfilter = true; 
		}
		return RoundAirobjfilter;
	}


	$scope.showAllstops = true;
	$scope.filterstops = 0;	
	$scope.stopsIncludes = [];	
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
				if (parseInt(stopobj.segments.length- 1) == $scope.stopsIncludes[airindex])
				{
					stopobjfilter = true; 
				}		
			});
		}  
		else
		{
			stopobjfilter = true; 
		}
		return stopobjfilter;
	}	


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
		var result = false;
		var departobj = null;
		var departtime = null;
		var departseconds = null;
		var ddepartminseconds = null;
		var departmaxdepartseconds = null;
		if(obj.flightSegmentsGroups[0].flightSegments[0].segments[0].depTime!=null)
		{
			departobj = obj.flightSegmentsGroups[0].flightSegments[0].segments[0].depTime;
			var time = departobj;
			if(time!=null)
			{

				var depart = time.split(':'); // split it at the colons
				var departmin = min.split(':');
				var departmax = max.split(':');
				departseconds = (+depart[0]) * 60 * 60 + (+depart[1]) * 60 ; 
				ddepartminseconds = (+departmin[0]) * 60 * 60 + (+departmin[1]) * 60 ; 
				departmaxdepartseconds = (+departmax[0]) * 60 * 60 + (+departmax[1]) * 60 ; 
			}
		}
		else
		{
			departobj = obj.flightSegmentsGroups[0].flightSegments[0].segments[0].depart;
			var departtime = new Date(departobj); 
			var timed = departtime.getHours()+ departtime.getMinutes();
			var mind = hours1 + minutes1;
			var maxd = hours2 +  minutes2;

			var time = departtime.getHours() + ':' + departtime.getMinutes();
			var depart = time.split(':'); // split it at the colons
			var departmin = min.split(':');
			var departmax = max.split(':');
			departseconds = (+depart[0]) * 60 * 60 + (+depart[1]) * 60 ; 
			ddepartminseconds = (+departmin[0]) * 60 * 60 + (+departmin[1]) * 60 ; 
			departmaxdepartseconds = (+departmax[0]) * 60 * 60 + (+departmax[1]) * 60 ; 
		}

		if(departseconds >= ddepartminseconds  && departseconds <= departmaxdepartseconds)
		{
			result = true;
		}
		if(result){
			return obj;
		}
	}



	$scope.filterreturndeparttime = function(obj){  

		var hours1 = Math.floor($scope.SecondDepartSlider.min / 60);
		var minutes1 = $scope.SecondDepartSlider.min - (hours1 * 60);

		if(hours1.length < 10) hours1= '0' + hours;
		if(minutes1.length < 10) minutes1 = '0' + minutes;
		if(hours1 == 0) hours1 = '00';
		if(minutes1 == 0) minutes1 = '00';
		var hours2 = Math.floor($scope.SecondDepartSlider.max / 60);
		var minutes2 = $scope.SecondDepartSlider.max - (hours2 * 60);
		if(hours2.length < 10) hours2= '0' + hours;
		if(minutes2.length < 10) minutes2 = '0' + minutes;
		if(hours2 == 0) hours2 = '00';
		if(minutes2 == 0) minutes2 = '00';
		var min = hours1 + ':' + minutes1;
		var max = hours2 + ':' + minutes2;
		$('#seconddepartMin').html(hours1 + ':' + minutes1);
		$('#seconddepartMax').html(hours2 + ':' + minutes2);
		var result = false;
		var departobj = null;
		var departtime = null;
		var departseconds = null;
		var ddepartminseconds = null;
		var departmaxdepartseconds = null;
		if(obj.flightSegmentsGroups[0].flightSegments[0].segments[0].depTime!=null)
		{
			departobj = obj.flightSegmentsGroups[0].flightSegments[0].segments[0].depTime;
			var time = departobj;
			if(time!=null)
			{

				var depart = time.split(':'); // split it at the colons
				var departmin = min.split(':');
				var departmax = max.split(':');
				departseconds = (+depart[0]) * 60 * 60 + (+depart[1]) * 60 ; 
				ddepartminseconds = (+departmin[0]) * 60 * 60 + (+departmin[1]) * 60 ; 
				departmaxdepartseconds = (+departmax[0]) * 60 * 60 + (+departmax[1]) * 60 ; 
			}
		}
		else
		{
			departobj = obj.flightSegmentsGroups[0].flightSegments[0].segments[0].depart;
			var departtime = new Date(departobj); 
			var timed = departtime.getHours()+ departtime.getMinutes();
			var mind = hours1 + minutes1;
			var maxd = hours2 +  minutes2;

			var time = departtime.getHours() + ':' + departtime.getMinutes();
			var depart = time.split(':'); // split it at the colons
			var departmin = min.split(':');
			var departmax = max.split(':');
			departseconds = (+depart[0]) * 60 * 60 + (+depart[1]) * 60 ; 
			ddepartminseconds = (+departmin[0]) * 60 * 60 + (+departmin[1]) * 60 ; 
			departmaxdepartseconds = (+departmax[0]) * 60 * 60 + (+departmax[1]) * 60 ; 
		}			 

		if(departseconds >= ddepartminseconds  && departseconds <= departmaxdepartseconds)
		{
			result = true;
		}
		if(result){
			return obj;
		}
	}

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
		var arrivalobj = null;
		var arrivalseconds = null; 
		var arrivalminseconds = null; 
		var arrivalmaxdepartseconds = null ; 
		if(obj.flightSegmentsGroups[0].flightSegments[0].segments[obj.flightSegmentsGroups[0].flightSegments[0].segments.length -1].arrTime!=null)
		{
			arrivalobj = obj.flightSegmentsGroups[0].flightSegments[0].segments[obj.flightSegmentsGroups[0].flightSegments[0].segments.length -1].arrTime;
			var time = arrivalobj;
			if(time!=null)
			{		
				var arrival = time.split(':'); // split it at the colons
				var arrivalmin = min.split(':');
				var arrivalmax = max.split(':');
				arrivalseconds = (+arrival[0]) * 60 * 60 + (+arrival[1]) * 60 ; 
				arrivalminseconds = (+arrivalmin[0]) * 60 * 60 + (+arrivalmin[1]) * 60 ; 
				arrivalmaxdepartseconds = (+arrivalmax[0]) * 60 * 60 + (+arrivalmax[1]) * 60 ; 
			}
		}
		else
		{
			arrivalobj = obj.flightSegmentsGroups[0].flightSegments[0].segments[obj.flightSegmentsGroups[0].flightSegments[0].segments.length -1].arrival;

			var arrivaltime = new Date(arrivalobj);  
			var timed = arrivaltime.getHours()+ arrivaltime.getMinutes();
			var mind = hours1 + minutes1;
			var maxd = hours2 +  minutes2;			

			var time = arrivaltime.getHours() + ':' + arrivaltime.getMinutes();
			var arrival = time.split(':'); // split it at the colons
			var arrivalmin = min.split(':');
			var arrivalmax = max.split(':');

			arrivalseconds = (+arrival[0]) * 60 * 60 + (+arrival[1]) * 60 ; 
			arrivalminseconds = (+arrivalmin[0]) * 60 * 60 + (+arrivalmin[1]) * 60 ; 
			arrivalmaxdepartseconds = (+arrivalmax[0]) * 60 * 60 + (+arrivalmax[1]) * 60 ; 
		}		
		if(arrivalseconds >= arrivalminseconds  && arrivalseconds <= arrivalmaxdepartseconds)
		{
			result = true;
		}
		//	});
		if(result){
			return obj;
		}
	}



	$scope.filterreturnarrivaltime = function(obj){  

		var hours1 = Math.floor($scope.SecondArrivalSlider.min / 60);
		var minutes1 = $scope.SecondArrivalSlider.min - (hours1 * 60);

		if(hours1.length < 10) hours1= '0' + hours;
		if(minutes1.length < 10) minutes1 = '0' + minutes;

		if(minutes1 == 0) minutes1 = '00';

		var hours2 = Math.floor($scope.SecondArrivalSlider.max / 60);
		var minutes2 = $scope.SecondArrivalSlider.max - (hours2 * 60);

		if(hours2.length < 10) hours2= '0' + hours;
		if(minutes2.length < 10) minutes2 = '0' + minutes;


		if(minutes2 == 0) minutes2 = '00';

		var min = hours1 + ':' + minutes1;
		var max = hours2 + ':' + minutes2;

		$('#secondarriMin').html(hours1 + ':' + minutes1);
		$('#secondarriMax').html(hours2 + ':' + minutes2);
		var result = false;

		var arrivalobj = null;
		var arrivalseconds = null; 
		var arrivalminseconds = null; 
		var arrivalmaxdepartseconds = null ; 
		if(obj.flightSegmentsGroups[0].flightSegments[0].segments[obj.flightSegmentsGroups[0].flightSegments[0].segments.length -1].arrTime!=null)
		{
			arrivalobj = obj.flightSegmentsGroups[0].flightSegments[0].segments[obj.flightSegmentsGroups[0].flightSegments[0].segments.length -1].arrTime;
			var time = arrivalobj;
			if(time!=null)
			{				
				var arrival = time.split(':'); // split it at the colons
				var arrivalmin = min.split(':');
				var arrivalmax = max.split(':');
				arrivalseconds = (+arrival[0]) * 60 * 60 + (+arrival[1]) * 60 ; 
				arrivalminseconds = (+arrivalmin[0]) * 60 * 60 + (+arrivalmin[1]) * 60 ; 
				arrivalmaxdepartseconds = (+arrivalmax[0]) * 60 * 60 + (+arrivalmax[1]) * 60 ; 
			}
		}
		else
		{
			arrivalobj = obj.flightSegmentsGroups[0].flightSegments[0].segments[obj.flightSegmentsGroups[0].flightSegments[0].segments.length -1].arrival;

			var arrivaltime = new Date(arrivalobj);  
			var timed = arrivaltime.getHours()+ arrivaltime.getMinutes();
			var mind = hours1 + minutes1;
			var maxd = hours2 +  minutes2;		


			var time = arrivaltime.getHours() + ':' + arrivaltime.getMinutes();
			var arrival = time.split(':'); // split it at the colons
			var arrivalmin = min.split(':');
			var arrivalmax = max.split(':');

			arrivalseconds = (+arrival[0]) * 60 * 60 + (+arrival[1]) * 60 ; 
			arrivalminseconds = (+arrivalmin[0]) * 60 * 60 + (+arrivalmin[1]) * 60 ; 
			arrivalmaxdepartseconds = (+arrivalmax[0]) * 60 * 60 + (+arrivalmax[1]) * 60 ; 
		}

		if(arrivalseconds >= arrivalminseconds  && arrivalseconds <= arrivalmaxdepartseconds)
		{
			result = true;
		}
		if(result){
			return obj;
		}
	}


	function escapeRegExp(string) {
		return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
	}
	function replaceAll(string, find, replace) {
		return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
	}



	//do hide empty group on  isShowable -- to be called on every onFilter event
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


	//do hide empty group on  isShowable -- to be called on every onFilter event
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

	$scope.isShowable1 = function(groupindex) {
		var groupdivparentlist = $window.document.getElementsByClassName("flightlistcon1");
		var isshowable = true;
		for(var i = 0; i<groupdivparentlist.length; i++)
		{
			var childcount = groupdivparentlist[i].getElementsByClassName("sin-row1").length;
			if(i == groupindex && childcount == 0)
			{
				isshowable = false;
				break;
			}
			var defaultsummaryindex = $scope.returnFirstVisibleGroupindex();
		}		
		return isshowable;
	}

	$scope.returnFirstVisibleGroupindex1 = function() {
		var groupdivparenthidelist = $window.document.getElementsByClassName("flightlistcon1 ng-scope");
		var hiddengrouplist = $window.document.getElementsByClassName("flightlistcon1 ng-scope ng-hide");		
		var groupdivparentshowlist = $window.document.getElementsByClassName("flightlistcon1");
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


	$scope.yyyymmdd = function(dateIn) {
		var yyyy = dateIn.getFullYear();
		var mm = dateIn.getMonth()+1; // getMonth() is zero-based
		var dd  = dateIn.getDate();
		return String(10000*yyyy + 100*mm + dd); // Leading zeros for mm and dd
	}
	$scope.ThemeType = $location.search().thm;
	$scope.flightresearch = function(){

		var origin = $("#originid").val();
		var destination =$("#destinationid").val();
		var adult = angular.element('#adultid').text();
		var kid = angular.element('#kidid').text();
		var infant = angular.element('#infantid').text();
		var triptype = angular.element('#triptype').val();
		var cabinClass = angular.element('#cabinReselect').val();
		var airline = angular.element('#airlinecode').val();
		var currency = angular.element('#onecurrencyname').val(); 
		var app_key = angular.element('#ay').val();
		var isDynamicmarkup = angular.element('#isDynamicmarkup').val();
		var markupAmount = angular.element('#markupAmount').val();
		var searchkey = '';		
		var orifirstindex =origin.indexOf(',') + 1;
		var orilastindex = origin.lastIndexOf(',');          
		var desfirstindex = destination.indexOf(',') + 1;
		var deslastindex = destination.lastIndexOf(',');
		var originCountry = origin.substring(orifirstindex, orilastindex);
		var destinationCountry = destination.substring(desfirstindex, deslastindex);
		var Deptdate = $("#twodpd1").val();
		var arravaialDate = $("#twodpd2").val();
		if (originCountry == "") {
			$("#erroriround").text("Please Enter the Origin City");
			$('#erroriround').stop().fadeIn(400).delay(1500).fadeOut(400);       
		} else if (destinationCountry == "") {
			$("#errdesround").text("Please Enter the Destination City");
			$('#errdesround').stop().fadeIn(400).delay(1500).fadeOut(400);
		} 
		else if (origin == destination) {
			$("#errdesround").text("Please Enter the Different Destination City");
			$('#errdesround').stop().fadeIn(400).delay(1500).fadeOut(400);
		}
		else if (Deptdate == "") {      
			$("#errdepround").text("Select the Depart date");
			$('#errdepround').stop().fadeIn(400).delay(1500).fadeOut(400);

		} else if (arravaialDate == "") {
			$("#errarrround").text("Select the Arrival date");
			$('#errarrround').stop().fadeIn(400).delay(1500).fadeOut(400);      
		}else{


			if(originCountry == "India" && destinationCountry == "India"){
				var isdomestic = true;


				var domModify = ('/Flights-Domestic-'+$scope.ThemeType+'?ori='+encodeURIComponent(origin)+'&des='+encodeURIComponent(destination)+'&depart='+encodeURIComponent(Deptdate)+'&arrival='+encodeURIComponent(arravaialDate)
						+'&class='+encodeURIComponent(cabinClass)+'&ccy='+currency+'&isDom='+isdomestic+'&isDyn='+isDynamicmarkup+'&marAt='+encodeURIComponent(markupAmount)+'&tty='+encodeURIComponent(triptype)
						+'&ay='+encodeURIComponent(app_key)+'&sky='+encodeURIComponent(searchkey)+'&adt='+adult+'&kid='+kid+'&inf='+infant+'&airline='+airline+'&thm='+$scope.ThemeType);
				localStorageService.set('UrlParameters',domModify);
				$location.url(domModify);

			}else{		    		

				var isdomestic = false;

				var international = ('/Flights-International-'+$scope.ThemeType+'?ori='+encodeURIComponent(origin)+'&des='+encodeURIComponent(destination)+'&depart='+encodeURIComponent(Deptdate)+'&arrival='+encodeURIComponent(arravaialDate)
						+'&class='+encodeURIComponent(cabinClass)+'&ccy='+currency+'&isDom='+isdomestic+'&isDyn='+isDynamicmarkup+'&marAt='+encodeURIComponent(markupAmount)+'&tty='+encodeURIComponent(triptype)
						+'&ay='+encodeURIComponent(app_key)+'&sky='+encodeURIComponent(searchkey)+'&adt='+adult+'&kid='+kid+'&inf='+infant+'&airline='+airline+'&thm='+$scope.ThemeType);
				localStorageService.set('UrlParameters',international);
				$location.url(international);
			}
		}

	};
	$scope.addmarkup = function(){

		var markUp = {};
		markUp.isDynamicMarkup = angular.element('#Dynamic').val();
		markUp.markupAmount = angular.element('#appliedmarkamt').val();
		markUp.searchkey=$scope.searchkey;
		markUp.origin = $("#originid").val();
		markUp.destination = $("#destinationid").val();
		markUp.adult = $scope.adult;
		markUp.kid = $scope.child;
		markUp.infant = $scope.infant;		
		markUp.departureDate = $("#twodpd1").val();
		markUp.arrivalDate =  $("#twodpd2").val();
		markUp.cabinClass = $scope.cabin;
		markUp.currency = $scope.currencyname;		
		markUp.triptype = $scope.mtriptype;		
		markUp.app_key =angular.element('#ay').val();
		markUp.airline = angular.element('#airlinecode').val();
		markUp.isDomestic = $scope.misDomestic;
		$location.url('/Flights-Domestic-'+$scope.ThemeType+'?ori='+encodeURIComponent(markUp.origin)+'&des='+encodeURIComponent(markUp.destination)+'&depart='+encodeURIComponent(markUp.departureDate)+'&arrival='+encodeURIComponent(markUp.arrivalDate)
				+'&clas='+encodeURIComponent(markUp.cabinClass)+'&ccy='+markUp.currency+'&isDom='+markUp.isDomestic+'&isDyn='+markUp.isDynamicMarkup+'&marAt='+encodeURIComponent(markUp.markupAmount)+'&tty='+encodeURIComponent(markUp.triptype)
				+'&ay='+encodeURIComponent(markUp.app_key)+'&sky='+encodeURIComponent(markUp.searchkey)+'&adt='+markUp.adult+'&kid='+markUp.kid+'&inf='+markUp.infant+'&airline='+markUp.airline+'&thm='+$scope.ThemeType);



	}

	$scope.booknow = function(index){
		var intrBook = {};
		intrBook.ccy = angular.element('#ccy'+index).val();
		intrBook.adult = angular.element('#adult'+index).val();  
		intrBook.child = angular.element('#child'+index).val();
		intrBook.infant =angular.element('#infant'+index).val();
		intrBook.searchkey = angular.element('#searchkey'+index).val();   
		intrBook.app_key = angular.element('#app_key'+index).val();
		intrBook.flightindex =angular.element('#fid'+index).val();
		intrBook.sflightindex =angular.element('#sid'+index).val();
		intrBook.typeroute="spcl";
		intrBook.bookingRound = "book";	
		if($scope.onwardLowFareData.islowfare == false){			 
			intrBook.OnwdFare = $scope.onwardLowFareData.islowfare;
			intrBook.Onwdlowflx1 = $scope.onwardLowFareData.onwardLowFareIndex1;
			intrBook.Onwdlowflx2 = $scope.onwardLowFareData.onwardLowFareIndex2;
			intrBook.Onreason = $scope.onwardLowFareData.onwardLowFareReason;
		}else{
			intrBook.OnwdFare = true;
			intrBook.Onwdlowflx1 = "";
			intrBook.Onwdlowflx2 = "";
			intrBook.Onreason = "";
		}		 
		if($scope.returnLowFareData.islowfarereturn  == false){			 
			intrBook.returnFare = $scope.returnLowFareData.islowfarereturn;
			intrBook.returnlowflx1 = $scope.returnLowFareData.returnLowFareIndex1;
			intrBook.returnlowflx2 = $scope.returnLowFareData.returnLowFareIndex2;
			intrBook.returnreason = $scope.returnLowFareData.returnLowFareReason;
		}else{
			intrBook.returnFare = true;
			intrBook.returnlowflx1 = "";
			intrBook.returnlowflx2 = "";
			intrBook.returnreason = "";
		}

		var url='/Flights-BookSummary-'+$scope.ThemeType+'?ad='+intrBook.adult+'&chd='+intrBook.child+'&inf='+intrBook.infant
		+'&sfindx='+encodeURIComponent(intrBook.sflightindex)+'&ccy='+encodeURIComponent(intrBook.ccy)+'&ay='+encodeURIComponent(intrBook.app_key)+'&finx='+encodeURIComponent(intrBook.flightindex)+'&sky='+encodeURIComponent(intrBook.searchkey)
		+'&typRoute='+intrBook.typeroute+'&bkTy='+intrBook.bookingRound+'&thm='+$scope.ThemeType
		+'&ori='+encodeURIComponent($scope.urlParams.origin)+'&des='+encodeURIComponent($scope.urlParams.destination)+'&depart='+encodeURIComponent($scope.urlParams.departure)+'&arrival='+encodeURIComponent($scope.urlParams.arrival)+'&tty='+encodeURIComponent($scope.urlParams.triptype)
		+'&islowfare='+intrBook.OnwdFare+'&lowfareflightindex1='+encodeURIComponent(intrBook.Onwdlowflx1)+'&lowfareflightindex2='+encodeURIComponent(intrBook.Onwdlowflx2)+'&reasontoselect='+encodeURIComponent(intrBook.Onreason)
		+'&islowfarereturn='+intrBook.returnFare+'&lowfareflightindexreturn1='+encodeURIComponent(intrBook.returnlowflx1)+'&lowfareflightindexreturn2='
		+encodeURIComponent(intrBook.returnlowflx2)+'&reasontoselectreturn='+encodeURIComponent(intrBook.returnreason);
		$location.url(url);
	}
	$scope.modalbooknow = function(index){

		var intrBook = {};
		intrBook.ccy = angular.element('#ccy'+index).val();
		intrBook.adult = angular.element('#adult'+index).val();  
		intrBook.child = angular.element('#child'+index).val();
		intrBook.infant =angular.element('#infant'+index).val();
		intrBook.searchkey = angular.element('#searchkey'+index).val();   
		intrBook.app_key = angular.element('#app_key'+index).val();
		intrBook.flightindex =angular.element('#fid'+index).val();
		intrBook.sflightindex =angular.element('#sid'+index).val();
		intrBook.typeroute="spcl";
		intrBook.bookingRound = "book";

			var url='/Flights-BookSummary-'+$scope.ThemeType+'?ad='+intrBook.adult+'&chd='+intrBook.child+'&inf='+intrBook.infant+'&sfindx='+encodeURIComponent(intrBook.sflightindex)+'&ccy='+encodeURIComponent(intrBook.ccy)+'&ay='+encodeURIComponent(intrBook.app_key)+'&finx='+encodeURIComponent(intrBook.flightindex)+'&sky='+encodeURIComponent(intrBook.searchkey)+'&typRoute='+intrBook.typeroute+'&bkTy='+intrBook.bookingRound+'&thm='+$scope.ThemeType;
		//window.open(url,'_blank');
		$location.url(url);
		jQuery.noConflict(); 
		$('body').removeClass('modal-open');
		$('.modal-backdrop').remove();


	}


	$scope.addtoquotelist = function(onwardflight,returnflight){
		angular.element('#QuoteClick').removeClass('btn-info').addClass('btn-greeninfo');
		var passcount = parseInt($scope.user.adult)+parseInt($scope.user.kid)+parseInt($scope.user.infant);	
		var totaldurationarray=[];
		var totalduration ="";
		var quotejson = {'airline':onwardflight.segments[0].carrier.name,
				'departureDate':onwardflight.segments[0].depDate,
				'arrivalDate':returnflight.segments[0].arrDate,				
				'travelRequestDate':onwardflight.segments[0].depDate, 
				'origin':$location.search().ori,
				'destination':$location.search().des,
				'tripType':'R',
				'flightNumber':onwardflight.segments[0].flight.number,
				'bookingClassPrefer':$location.search().class,
				'adultCount':$location.search().adt,
				'childCount':$location.search().kid,
				'infantCount':$location.search().inf,
				'baseAmount':parseInt($scope.selectedonwardbase)+parseInt($scope.selectedreturnbase),				
				'taxAmount':parseInt($scope.selectedonwardtaxes)+parseInt($scope.selectedreturntaxes),
				'booked':false,
				'passengerCount':passcount,
				'totalAmount':$scope.selectedtotalflightsprice}; 


		var quotetripdetailarray = [];



		var quotetripdetailjson = {
				'operatedByName':onwardflight.segments[0].carrier.name,
				'operatedByCode':onwardflight.segments[0].carrier.code,
				'departureTimestamp':onwardflight.segments[0].depDate,
				'departureDate':onwardflight.segments[0].depDate,
				'depTime':onwardflight.segments[0].depTime,
				'arrivalTimestamp':onwardflight.segments[0].arrDate,
				'arrivalDate':onwardflight.segments[0].arrDate,
				'arrTime':onwardflight.segments[0].arrTime,
				'flightDuration':onwardflight.segments[0].duration,
				'flightNumber':onwardflight.segments[0].flight.number,
				'originName':onwardflight.segments[0].oriName,
				'originCode':onwardflight.segments[0].ori,
				'destinationName':onwardflight.segments[0].destName,
				'destinationCode':onwardflight.segments[0].dest,
				'trips':2,
				'classOfService':$location.search().class,
				'destinationTerminal':onwardflight.segments[0].flight.destTerminal,
				'originTerminal':onwardflight.segments[0].flight.oriTerminal
		};

		var quotereturntripdetailjson = {
				'operatedByName':returnflight.segments[0].carrier.name,
				'operatedByCode':returnflight.segments[0].carrier.code,
				'departureTimestamp':returnflight.segments[0].depDate,
				'departureDate':returnflight.segments[0].depDate,
				'depTime':returnflight.segments[0].depTime,
				'arrivalTimestamp':returnflight.segments[0].arrDate,
				'arrivalDate':returnflight.segments[0].arrDate,
				'arrTime':returnflight.segments[0].arrTime,
				'flightDuration':returnflight.segments[0].duration,
				'flightNumber':returnflight.segments[0].flight.number,
				'originName':returnflight.segments[0].oriName,
				'originCode':returnflight.segments[0].ori,
				'destinationName':returnflight.segments[0].destName,
				'destinationCode':returnflight.segments[0].dest,
				'trips':2,
				'classOfService':$location.search().class,
				'destinationTerminal':returnflight.segments[0].flight.destTerminal,
				'originTerminal':returnflight.segments[0].flight.oriTerminal
		};
		quotetripdetailarray.push(quotetripdetailjson);
		quotetripdetailarray.push(quotereturntripdetailjson);

		var quoteconnectingflightjsonarray=[];
		var quoteconnectingflightonward = [];
		var quoteconnectingflightoreturn=[];
		var quoteconnectobject = [];
		angular.forEach(onwardflight.segments, function(segmentobj,segmentindex) { 					
			if(segmentindex != 0){
				var onwardflightjson = {'operatedByName':segmentobj.carrier.name,
						'operatedByCode':segmentobj.carrier.code,
						'departureTimestamp':segmentobj.depDate,
						'departureDate':segmentobj.depDate,
						'depTime':segmentobj.depTime,
						'arrivalTimestamp':segmentobj.arrDate,
						'arrivalDate':segmentobj.arrDate,
						'arrTime':segmentobj.arrTime,
						'flightDuration':segmentobj.duration,
						'flightNumber':segmentobj.flight.number,
						'originName':segmentobj.oriName,
						'originCode':segmentobj.ori,
						'destinationName':segmentobj.destName,
						'destinationCode':segmentobj.dest,
						'trips':1,
						'classOfService':$location.search().class,
						'destinationTerminal':segmentobj.flight.destTerminal,
						'originTerminal':segmentobj.flight.oriTerminal};
				quoteconnectobject.push(onwardflightjson);
			}    
		});


		angular.forEach(returnflight.segments, function(segmentobj,segmentindex) { 					
			if(segmentindex != 0){
				var returnsflightjson = {'operatedByName':segmentobj.carrier.name,
						'operatedByCode':segmentobj.carrier.code,
						'departureTimestamp':segmentobj.depDate,
						'departureDate':segmentobj.depDate,
						'depTime':segmentobj.depTime,
						'arrivalTimestamp':segmentobj.arrDate,
						'arrivalDate':segmentobj.arrDate,
						'arrTime':segmentobj.arrTime,
						'flightDuration':segmentobj.duration,
						'flightNumber':segmentobj.flight.number,
						'originName':segmentobj.oriName,
						'originCode':segmentobj.ori,
						'destinationName':segmentobj.destName,
						'destinationCode':segmentobj.dest,
						'trips':1,
						'classOfService':$location.search().class,
						'destinationTerminal':segmentobj.flight.destTerminal,
						'originTerminal':segmentobj.flight.oriTerminal};
				quoteconnectobject.push(returnsflightjson);
			}    
		});



		//var quoteconnectobject = {'onwards':quoteconnectingflightonward,'returns':quoteconnectingflightoreturn};
		var key = onwardflight.flightIndex + onwardflight.flightIndex +  onwardflight.segments[0].flight.number;		

		$scope.flightroundquotemap[key] = quotejson;
		$scope.flightroundquotetripmap[key] = quotetripdetailarray;
		if(quoteconnectobject.length > 0)
			$scope.flightroundquoteconnecttripmap[key] = quoteconnectobject;	




		$scope.isQuoteloaded = true;
		jQuery.noConflict(); 
		$('#InfoModal').modal('show');

		setTimeout(function(){
			$('#InfoModal').modal('hide');
		}, 3000);

	}

	$scope.showallquotes = function(){

		$scope.quotearray = [];
		for (var key in $scope.flightroundquotemap) {
			if ($scope.flightroundquotemap.hasOwnProperty(key)) {				
				var obj = $scope.flightroundquotemap[key];			
				$scope.quotearray.push(obj);
			}
		}			

		$("#myModalQuotation").modal(); 
		$scope.$apply();
	}
	$scope.removequote=function(flightnumber){
		delete $scope.flightroundquotemap[flightnumber];
		delete $scope.flightroundquotetripmap[flightnumber];		
		delete $scope.flightroundquoteconnecttripmap[flightnumber];	
		$scope.quotearray = [];
		for (var key in $scope.flightroundquotemap) {
			if ($scope.flightroundquotemap.hasOwnProperty(key)) {				
				var obj = $scope.flightroundquotemap[key];			
				$scope.quotearray.push(obj);
			}
		}

	}

	$scope.addquotesModal = function(){
		$('#myModalQuotation').modal('hide');

		$scope.quotearray = [];
		for (var key in $scope.flightroundquotemap) {
			if ($scope.flightroundquotemap.hasOwnProperty(key)) {				
				var obj = $scope.flightroundquotemap[key];			
				$scope.quotearray.push(obj);
			}
		}
		$scope.quotetriparray = [];
		for (var key in $scope.flightroundquotetripmap) {
			if ($scope.flightroundquotetripmap.hasOwnProperty(key)) {				
				var obj = $scope.flightroundquotetripmap[key];			
				$scope.quotetriparray.push(obj);
			}
		}

		$scope.quoteconnecttriparray = [];


		for (var key in $scope.flightroundquoteconnecttripmap) {
			if ($scope.flightroundquoteconnecttripmap.hasOwnProperty(key)) {				
				var obj = $scope.flightroundquoteconnecttripmap[key];
				if(obj!=undefined){
					$scope.quoteconnecttriparray.push(obj);
				}
			}
		}

		var quotejson = {'flightTravelRequest':$location.search().flightquotationid,"quotes":$scope.quotearray,"trips":$scope.quotetriparray,'connecttrip':$scope.quoteconnecttriparray};
		var finalUrl = ibeurl+"InsertRoundFlightQuote";
		var url = adminUrl +'getFlightQuotationList?flightQuotationRequestId='+$location.search().flightquotationid;

		$http({method:'POST',url:finalUrl,data:'QuotationJson='+JSON.stringify(quotejson),headers:{'Content-Type' : 'application/x-www-form-urlencoded'}}).		
		success(function(data, status, headers, config){			

		}).error(function(data, status, headers, config){ 


		});
		$('#addQuoteConfirmModal').modal('show');
	}


	$scope.addquotes = function(){
		$('#addQuoteConfirmModal').modal('hide');
		var redirecturl = adminUrl+'getFlightQuotationList?flightQuotationRequestId='+$location.search().flightquotationid;	
		var redirectWindow = window.open(redirecturl, '_blank'); 
		$scope.quotearray = [];
		$scope.flightroundquotemap = {};
		$scope.flightroundquotetripmap = {};
		$scope.flightroundquoteconnecttripmap = {};
		$scope.isQuoteloaded = true;

	}

	$scope.returnIndex = function(){
		window.location.href = window.location.href.replace(/#.*$/, '');
	}

	/*
	 *Error Display msg Parameter
	 * */	
	var orioIndex = decodeURIComponent($location.search().ori).indexOf(',') ;
	var oriocity = decodeURIComponent($location.search().ori).substring(0, orioIndex);
	var orioncity = oriocity.replaceAll('+',' ');
	var DestIndex = decodeURIComponent($location.search().des).indexOf(',') ;
	var Destcity = decodeURIComponent($location.search().des).substring(0, DestIndex);
	var desticity = Destcity.replaceAll('+',' ');
	$scope.ErrorFlightTravelDetails = {};
	$scope.ErrorFlightTravelDetails.origin = orioncity;
	$scope.ErrorFlightTravelDetails.destination = desticity;
	$scope.ErrorFlightTravelDetails.depDate = decodeURIComponent($location.search().depart);
	$scope.ErrorFlightTravelDetails.arvlDate = decodeURIComponent($location.search().arrival);
	$scope.ErrorFlightTravelDetails.cabinClass = decodeURIComponent($location.search().class);
	$scope.ErrorFlightTravelDetails.showData = true;
	localStorageService.set('ErrorSearchData',$scope.ErrorFlightTravelDetails);
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


	$scope.lowfareAlertfunction = function(flightIndex,type){	

		$scope.FlightType = type;

		var Selectedflight= $scope.selectedFlight(flightIndex);	
		$scope.selectedflight = Selectedflight;
		var lowfareFlight1;
		var lowfareFlight2;
		var onWardTime = Selectedflight.flightSegmentsGroups[0].flightSegments[0].segments[0].depTime;				 
		var onwardMinMax = $scope.returnMaxMinTime(onWardTime);				 			 
		var onwardCheapFlights = $scope.lowpricetimeflights(onwardMinMax.MinClosetTime,onwardMinMax.MaxClosetTime);	

		if(onwardCheapFlights.length!=0){
			var onwardLowFareFlights=[];  
			angular.forEach(onwardCheapFlights, function(value) { 
				if(value.totalPrice != null){
					if(Selectedflight.totalPrice > value.totalPrice){
						onwardLowFareFlights.push(value);	
					}else{
						onwardLowFareFlights.push(value);	
					} 
				}
			})						
		}

		if(onwardLowFareFlights.length != 0 ){	
			$scope.lowFareData = [];
			$scope.SortedFareData = [];

			if(onwardLowFareFlights.length >0){

				onwardLowFareFlights.sort(function(a, b) {
					return parseFloat(a.totalPrice) - parseFloat(b.totalPrice);
				});

				lowfareFlight1=onwardLowFareFlights[0];
				lowfareFlight2=onwardLowFareFlights[1];					
			}else if(onwardLowFareFlights.length ==1){
				lowfareFlight1=onwardLowFareFlights[0];
				lowfareFlight2=null;							
			}			 

			$scope.lowFareData.push(lowfareFlight1);
			$scope.lowFareData.push(lowfareFlight2); 


			if($scope.ThemeType != "Default"){
				jQuery.noConflict(); 
				$(document).ready(function( ) {
					jQuery.noConflict(); 	
					$('#LowFareModal').modal();
				}); 
			}else{
				$('.LowFareModal').modal();
			}

		}else{

			$scope.islowfare = true;
		} 

	} 





	// low fare Alert
	$scope.selectedFlight = function(fidx){

		var selectedflight;

		angular.forEach($scope.fareFlightSegment, function(obj,index) { 
			angular.forEach(obj.flightSegmentsGroups, function(Groupsobj,index) { 
				angular.forEach(Groupsobj.flightSegments, function(Segmentobj,index) { 					
					if(fidx == Segmentobj.flightIndex)
					{
						selectedflight=obj;

					}
				})
			})
		})



		return  selectedflight;


	}
	$scope.convertmin= function(time){
		var a = time.split(':');
		var minutes = (+a[0]) * 60 + (+a[1]);
		return minutes;
	}

	$scope.lowpricetimeflights =function(min,max) { 
		$scope.timeCheapFlights=[];
		angular.forEach($scope.fareFlightSegment, function(value,index) { 
			var departtime=value.flightSegmentsGroups[0].flightSegments[0].segments[0].depTime;
			var departMin=$scope.convertmin(departtime);
			if(min<=departMin && max>=departMin){
				$scope.timeCheapFlights.push(value);
			}
		})


		return $scope.timeCheapFlights;
	}

	$scope.returnMaxMinTime = function(timeGiven){
		var selectedObj = {};
		var dTime = $scope.convertmin(timeGiven);				 
		selectedObj.MinClosetTime = dTime - $scope.TimeLimit;
		selectedObj.MaxClosetTime = dTime + $scope.TimeLimit;
		return selectedObj;
	}


	$scope.SortingFlightLowFares = function(flightArryList){
		var lowfareFlight = {};

		if(flightArryList.length !=0){
			if(flightArryList.length >1){

				flightArryList.sort(function(a, b) {
					return parseFloat(a.totalPrice) - parseFloat(b.totalPrice);
				});

				lowfareFlight.first = flightArryList[0];
				lowfareFlight.second = flightArryList[1];

			}
			else if(flightArryList.length ==1){

				lowfareFlight.first = flightArryList[0];				 

			}
		}
		return lowfareFlight;
	}		

	$scope.reason="";
	$( document ).ready(function() {
		setTimeout(function(){			 
			$('#radio1').click();		 

		}, 2000);
	});
	$scope.newValue = function(value) {
		var myEl = angular.element( document.querySelector( '#resText' ) );
		myEl.attr('disabled',true); 
		// $("#resText").prop('disabled', true);
		if(value ==1)
			$scope.reason="Does not suit my schedule" ;
		else if(value =="2")
			$scope.reason ="Penalty/Refund restriction";
		else if(value =="3")
			$scope.reason="Alternate corporate preferred fare selected";
		else if(value =="4")
			$scope.reason="Policy exception approval obtained";
		else if(value =="5")
			$scope.reason="Personal preference";
		else if(value =="6")
			$scope.reason="Location does not suit me";
		else if(value =="7")
			$scope.reason="Compliant to the company Travel Allowance Policy";
		else if(value =="8"){
			$scope.reason="";
			$scope.lowfareReason = "";
			var myEl = angular.element( document.querySelector( '#resText' ) );
			myEl.attr('disabled',false); 
			// $("#resText").prop('disabled', false);


		}

	}

	$scope.continueonWardBooking = function(type){
		$scope.islowfare = false;
		$scope.islowfarereturn = false;
		if(type == "onwardFlight"){
			if($scope.reason==""){
				$scope.lowfareReason = angular.element('#resText').val();
			}else{
				$scope.lowfareReason= $scope.reason;
			} 


			$scope.onwardLowFareData.islowfare = $scope.islowfare;
			$scope.onwardLowFareData.onwardLowFareReason = $scope.lowfareReason;
			$scope.onwardLowFareData.onwardLowFareIndex1 = $scope.lowFareData[0].flightSegmentsGroups[0].flightSegments[0].flightIndex;
			$scope.onwardLowFareData.onwardLowFareIndex2 = $scope.lowFareData[1].flightSegmentsGroups[0].flightSegments[0].flightIndex;
		}else if(type == "returnFlight"){
			if($scope.reason==""){
				$scope.lowfareReason = angular.element('#resText').val();
			}else{
				$scope.lowfareReason= $scope.reason;
			}

			$scope.returnLowFareData.islowfarereturn = $scope.islowfarereturn;
			$scope.returnLowFareData.returnLowFareReason = $scope.lowfareReason;				  
			$scope.returnLowFareData.returnLowFareIndex1 = $scope.lowFareData[0].flightSegmentsGroups[0].flightSegments[0].flightIndex;
			$scope.returnLowFareData.returnLowFareIndex2 = $scope.lowFareData[1].flightSegmentsGroups[0].flightSegments[0].flightIndex;

		}

		$('#LowFareModal').modal('hide');


	};
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

app.filter('customFilter', function () {
	return function (value) {
		var h = parseInt(value / 60); 
		var m = parseInt(value % 60);
		var hStr = (h > 0) ? h + 'hr'  : '';
		var mStr = (m > 0) ? m + 'min' : ''; 
		var glue = (hStr && mStr) ? ' ' : '';
		return hStr + glue + mStr;
	};
});


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





