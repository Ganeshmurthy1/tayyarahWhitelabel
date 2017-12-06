var app = angular.module('myApp');


app.controller('Flights-BookSummaryCtrl',['$scope','commonService', '$window','$http','$document','$compile','$rootScope','flightServices','localStorageService','transporter','$location','$modal','$log','$route',function($scope,commonService,$window,$http,$document,$compile,$rootScope,flightServices,localStorageService,transporter,$location,$modal,$log,$route){
	$scope.init = function(){		 
		
		var agentbal = 0;
		$scope.MainContent = false;
		$scope.resultset = false;
		$scope.Adultprice = 0.0;			$scope.Adultbaseprice = 0.0;			$scope.Adulttaxes = 0.0;
		$scope.Infantprice = 0.0;			$scope.Infantbaseprice = 0.0;			$scope.Infanttaxes = 0.0;
		$scope.Childprice = 0.0;			$scope.Childbaseprice = 0.0;			$scope.Childtaxes = 0.0;				
		$scope.Adulttotalprice =  0.0; 		$scope.Infanttotalprice =  0.0 ;		$scope.Childtotalprice =  0.0;	   			 
		$scope.Adulttotalbaseprice = 0.0; 	$scope.Infanttotalbaseprice = 0.0; 		$scope.Childtotalbaseprice = 0.0;	   			 
		$scope.Adulttotaltaxes =  0.0;		$scope.Infanttotaltaxes = 0.0;			$scope.Childtotaltaxes =  0.0; 	
		$scope.AdultspecialFareprice = 0.0;	$scope.AdultspecialFarebaseprice =0.0;	$scope.AdultspecialFaretaxes =  0.0;					
		$scope.InfantspecialFareprice = 0.0;$scope.InfantspecialFarebaseprice = 0.0;$scope.InfantspecialFaretaxes =  0.0;
		$scope.ChildspecialFareprice = 0.0;	$scope.ChildspecialFarebaseprice = 0.0;	$scope.ChildspecialFaretaxes =  0.0;
		$scope.loading = false ;
		$scope.contentloaded = false;	
		$scope.errordiv = false;
		$scope.mainContentToLoad = false;
		$scope.bookloader = false ; 	$scope.isuserbook = false;
		$scope.isagentbook = false;		$scope.isagenthold = false;		
		$scope.isuserhold = false;
		$scope.faredivdisplay = "none";
		$scope.flightBookData = {};		
		$scope.flightBookData = $scope.getUrlParams();
		$scope.apiBookData = $scope.getApiParams($scope.flightBookData);
		$scope.currencyname = $scope.flightBookData.ccy;
		$scope.classname = "tayyarah-"+$scope.currencyname;
		$scope.currencyvalue="";
		$scope.ImageLoader = false;
		$scope.ServiceTaxes = false;
		$scope.GSTServiceTaxes = false;
		$scope.currencychangedValue();	
		$scope.adultDetails();
		$scope.flightBooking();
		$scope.bookingPreviewData = {};
		//$scope.isRmDetails = "false";	
		var isB2BandB2E=angular.element('#isB2BandB2E').val();
		$scope.isCor=angular.element('#isCor').val();
		
		 
		if($scope.isCor=='true'){
			$scope.getCompanyEn();
		}
		if(isB2BandB2E=='true'){
			//$scope.getRmFields();
		}
		var Theme = $location.search().thm;
		$scope.filter = 'views/Flights-BookSummary-'+Theme+'Filter.jsp';
		$scope.mainContent = 'views/Flights-BookSummary-'+Theme+'Content.jsp';	
		$scope.ErrData = localStorageService.get('ErrorSearchData');
		$scope.insuranceExist = false;
		$scope.insuranceApiDetails = {};
		$scope.insuranceChildApiDetails = {};
		$scope.dayCalculation();	
		$scope.internationalPlanId = '';
		$scope.InsuranceTotal = 0;	
		$scope.timestamp;
		$scope.insurancePlanEmbedding = '';
	};
	$scope.ApiUrl = commonService.baseUrl;
	//Meal Changing Varibales
	var mealmap = {};	$scope.mealprice = 0;	var totalmealmap = {};	$scope.baggageprice = 0;

	function pad(n){return n<10 ? '0'+n : n}
	String.prototype.replaceAll = function(s,r){return this.split(s).join(r)};

	$scope.getUrlParams = function(){
		var bookSumyData = {};
		bookSumyData.adult = $location.search().ad;
		bookSumyData.child = $location.search().chd;
		bookSumyData.infant = $location.search().inf;
		bookSumyData.bookingtype = decodeURIComponent($location.search().bkTy);
		bookSumyData.ccy = decodeURIComponent($location.search().ccy);
		if(angular.element('#isLogged').val() != undefined && angular.element('#isLogged').val() != ''){
			bookSumyData.app_key  = angular.element('#ay').val();
		}else{
			bookSumyData.app_key = decodeURIComponent($location.search().ay);
		}

		if($location.search().sfindx == undefined){
			bookSumyData.searchkey = decodeURIComponent($location.search().sky);
			bookSumyData.flightindex = $location.search().finx;
			bookSumyData.islowfare = $location.search().islowfare;
			bookSumyData.lowfareflightindex1 = $location.search().lowfareflightindex1;
			bookSumyData.lowfareflightindex2 = $location.search().lowfareflightindex2;
			bookSumyData.reasontoselect = $location.search().reasontoselect;			
		}else{
			bookSumyData.searchkey = decodeURIComponent($location.search().sky);
			bookSumyData.flightindex = $location.search().finx+'_'+$location.search().sfindx;
			bookSumyData.islowfare = $location.search().islowfare;
			bookSumyData.lowfareflightindex1 = $location.search().lowfareflightindex1;
			bookSumyData.lowfareflightindex2 = $location.search().lowfareflightindex2;
			bookSumyData.islowfarereturn =$location.search().islowfarereturn;
			bookSumyData.lowfareflightindexreturn1 =$location.search().lowfareflightindexreturn1;
			bookSumyData.lowfareflightindexreturn2 =$location.search().lowfareflightindexreturn2;
			bookSumyData.reasontoselect = $location.search().reasontoselect;
			bookSumyData.reasontoselectreturn = $location.search().reasontoselectreturn;
		}	
		return bookSumyData;

	};
	$scope.spclindex="undefined"
		$scope.spclindex=$location.search().typRoute;

	$scope.sindex="undefined"
		$scope.sindex=$location.search().sfindx;

	$scope.getApiParams = function(parameters){
		var apiParams = {};
		if(angular.element('#isLogged').val() != undefined && angular.element('#isLogged').val() != ''){
			apiParams.app_key  = angular.element('#ay').val();
		}else{
			apiParams.app_key = decodeURIComponent($location.search().ay);
		}
		apiParams.flightindex = parameters.flightindex;
		apiParams.searchkey = parameters.searchkey;		
		if($location.search().sfindx == undefined){
			apiParams.islowfare =parameters.islowfare;
			apiParams.lowfareflightindex1 =parameters.lowfareflightindex1 ;
			apiParams.lowfareflightindex2 =parameters.lowfareflightindex2 ;
			apiParams.reasontoselect =parameters.reasontoselect;
		}else{
			apiParams.islowfare =parameters.islowfare;
			apiParams.islowfarereturn =parameters.islowfarereturn;
			apiParams.lowfareflightindex1 =parameters.lowfareflightindex1 ;
			apiParams.lowfareflightindex2 =parameters.lowfareflightindex2 ;
			apiParams.lowfareflightindexreturn1 =parameters.lowfareflightindexreturn1;
			apiParams.lowfareflightindexreturn2 =parameters.lowfareflightindexreturn2;
			apiParams.reasontoselect =parameters.reasontoselect;
			apiParams.reasontoselectreturn = parameters.reasontoselectreturn;			
		}
		
		return apiParams;		
	}
	$scope.currencychangedValue = function()
	{	

		flightServices.CurrencyConvert($scope.currencyname).then(function(res){
			var data = res.data;
			$scope.currencyvalue = parseFloat(data.value).toFixed(2);
			$scope.classname = "tayyarah-"+$scope.currencyname;		
		},function(){
			$scope.currencyname = "INR";
			$scope.classname = "tayyarah-INR";
		});
	}

//	Dynamically Display the adultdetails
	$scope.adultDetails = function(){
		$scope.adult = $scope.flightBookData.adult;
		$scope.child = $scope.flightBookData.child;
		$scope.infant = $scope.flightBookData.infant;
		$scope.adultarray = []; 
		$scope.childarray = []; 
		$scope.infantarray = []; 

		for (var i = 0; i < $scope.flightBookData.adult; i++) { 
			$scope.adultarray.push(i);
			//console.log($scope.adultarray);
		} 
		for (var i = 0; i < $scope.flightBookData.child; i++) { 
			$scope.childarray.push(i);
		} 
		for (var i = 0; i < $scope.flightBookData.infant; i++) { 
			$scope.infantarray.push(i);
		} 
	};
	$scope.loadpricebar = true;
	$scope.fareloader = true;
	$scope.isfareloaded = "none";
	$scope.farebeforeload = true;
 	$scope.ErrData = localStorageService.get('ErrorSearchData');
	$scope.ErrorFlightTravelDetails = {};
		if($scope.ErrData != null){
			  $scope.ErrorFlightTravelDetails.origin = $scope.ErrData.origin;
			  $scope.ErrorFlightTravelDetails.destination = $scope.ErrData.destination;
			  $scope.ErrorFlightTravelDetails.depDate = $scope.ErrData.depDate;
			  $scope.ErrorFlightTravelDetails.arvlDate = $scope.ErrData.arvlDate;
			  $scope.ErrorFlightTravelDetails.cabinClass = $scope.ErrData.cabinClass;
			  $scope.ErrorFlightTravelDetails.showData = false; 
		}else{
			$scope.ErrorFlightTravelDetails.origin = "";
			  $scope.ErrorFlightTravelDetails.destination = "";
			  $scope.ErrorFlightTravelDetails.depDate = "";
			  $scope.ErrorFlightTravelDetails.arvlDate = "";
			  $scope.ErrorFlightTravelDetails.cabinClass = "";
			  $scope.ErrorFlightTravelDetails.showData = false; 
		}
	  

//	Booking Data response
$scope.beforeInsurancePrice = 0;
 $scope.flightBooking = function(){		
		$scope.MainContent = true;
		$scope.errordiv = false;
		$scope.contentloaded = false;
		var booktype = $scope.flightBookData.bookingtype;
		flightServices.Bookflight($scope.apiBookData).then(function(response){
			//$http.get('airprice.json').then(function(response){
			//$http.get('internationalAirprice.json').then(function(response){
			
			$scope.mainContentToLoad = true;
			$scope.MainContent = true;
			$scope.loadpricebar = false;
			$scope.loading = false ;	
			$scope.data = response.data;
			$scope.bookingPreviewData = response.data;
			$scope.pricekey = decodeURIComponent($scope.data.priceKey);
			$scope.transactionKey = decodeURIComponent($scope.data.transactionKey);
			$scope.appkey = decodeURIComponent($scope.data.flightsearch.app_key);
			$scope.fareflightsegment = $scope.data.fareFlightSegment;
			$scope.adult = $scope.data.flightsearch.adult;
			$scope.child = $scope.data.flightsearch.kid;
			$scope.infant = $scope.data.flightsearch.infant;
			$scope.totalpassenger = parseInt($scope.adult) +  parseInt($scope.child) +  parseInt($scope.infant);
			if($scope.data.flightsearch.isInternational){
				$scope.isInternational = true;
			}	  
			if($scope.data.flightsearch.isInternational== false && $scope.data.flightsearch.domestic ==true ){
				$scope.domestic = true;
			}
			angular.forEach($scope.data.passengerFareBreakUps, function(obj,index) { 
				if(obj.type == "ADT")
				{
					$scope.Adultprice =  obj.totalPrice;
					$scope.Adultbaseprice =  obj.basePrice;
					$scope.Adulttaxes =  obj.taxes;
				}
				if(obj.type == "INF")
				{
					$scope.Infantprice =  obj.totalPrice;
					$scope.Infantbaseprice =  obj.basePrice;
					$scope.Infanttaxes =  obj.taxes;
				}
				if(obj.type == "CNN")
				{
					$scope.Childprice =  obj.totalPrice;
					$scope.Childbaseprice =  obj.basePrice;
					$scope.Childtaxes =  obj.taxes;
				}

			});

			if($scope.data.specialFareFlightSegment != null){
				$scope.specialFareFlightSegment =  $scope.data.specialFareFlightSegment;
				angular.forEach($scope.data.specialPassengerFareBreakUps, function(obj,index) { 
					if(obj.type == "ADT")
					{							
						$scope.AdultspecialFareprice =  parseFloat(obj.totalPrice);
						$scope.AdultspecialFarebaseprice =  parseFloat(obj.basePrice);
						$scope.AdultspecialFaretaxes =  parseFloat(obj.taxes);							
					}
					if(obj.type == "INF")
					{
						$scope.InfantspecialFareprice =  parseFloat(obj.totalPrice);
						$scope.InfantspecialFarebaseprice =  parseFloat(obj.basePrice);
						$scope.InfantspecialFaretaxes =  parseFloat(obj.taxes);
					}
					if(obj.type == "CNN")
					{
						$scope.ChildspecialFareprice =  parseFloat(obj.totalPrice);
						$scope.ChildspecialFarebaseprice =  parseFloat(obj.basePrice);
						$scope.ChildspecialFaretaxes =  parseFloat(obj.taxes);
					}						 
				});
				$scope.Adultprice = parseFloat($scope.Adultprice) + parseFloat($scope.AdultspecialFareprice);
				$scope.Childprice = parseFloat($scope.Childprice) + parseFloat($scope.ChildspecialFareprice);
				$scope.Infantprice = parseFloat($scope.Infantprice) + parseFloat($scope.InfantspecialFareprice) ;
				$scope.Adultbaseprice = parseFloat($scope.Adultbaseprice) + parseFloat($scope.AdultspecialFarebaseprice);
				$scope.Childbaseprice = parseFloat($scope.Childbaseprice) + parseFloat($scope.ChildspecialFarebaseprice);
				$scope.Infantbaseprice = parseFloat($scope.Infantbaseprice) + parseFloat($scope.InfantspecialFarebaseprice);
				$scope.Adulttaxes = parseFloat($scope.Adulttaxes) + parseFloat($scope.AdultspecialFaretaxes);
				$scope.Childtaxes = parseFloat($scope.Childtaxes) + parseFloat($scope.ChildspecialFaretaxes);
				$scope.Infanttaxes = parseFloat($scope.Infanttaxes) + parseFloat($scope.InfantspecialFaretaxes);
				$scope.GSTprice += parseFloat($scope.data.gstonMarkupSpecial);
				$scope.GSTprice = parseFloat($scope.GSTprice).toFixed(2);

			}
			$scope.Adulttotalprice =  (parseFloat($scope.Adultprice) *  parseFloat($scope.adult)).toFixed(2);
			$scope.Infanttotalprice =  (parseFloat($scope.Infantprice) *  parseFloat($scope.infant)).toFixed(2);
			$scope.Childtotalprice =  (parseFloat($scope.Childprice) *  parseFloat($scope.child)).toFixed(2);
			$scope.Adulttotalbaseprice =  (parseFloat($scope.Adultbaseprice) *  parseFloat($scope.adult)).toFixed(2);
			$scope.Infanttotalbaseprice =  (parseFloat($scope.Infantbaseprice) *  parseFloat($scope.infant)).toFixed(2);
			$scope.Childtotalbaseprice =  (parseFloat($scope.Childbaseprice) *  parseFloat($scope.child)).toFixed(2);
			$scope.Adulttotaltaxes =  (parseFloat($scope.Adulttaxes) *  parseFloat($scope.adult)).toFixed(2);
			$scope.Infanttotaltaxes = ( parseFloat($scope.Infanttaxes) *  parseFloat($scope.infant)).toFixed(2);
			$scope.Childtotaltaxes =  (parseFloat($scope.Childtaxes) *  parseFloat($scope.child)).toFixed(2);
			$scope.departdate = $scope.data.flightsearch.depDate;
			//for conveyence calculation
			/*Two way Price Showing*/
			if($scope.data.specialFareFlightSegment != null || $scope.data.specialFareFlightSegment != undefined){	
				/*#######GST Price ADDING#########*/
				if($scope.data.specialFareFlightSegment.flightGstTax != null || $scope.data.specialFareFlightSegment.flightGstTax != undefined){
					$scope.GSTServiceTaxes=true;
					$scope.ServiceTaxes = false;
					$scope.gstNumber = $scope.data.gstNumber;
					$scope.CGSTTax=parseFloat(($scope.data.specialFareFlightSegment.flightGstTax.cgst) + parseFloat($scope.data.fareFlightSegment.flightGstTax.cgst)).toFixed(2);
					$scope.SGSTTax=parseFloat(($scope.data.specialFareFlightSegment.flightGstTax.sgst) + parseFloat($scope.data.fareFlightSegment.flightGstTax.sgst)).toFixed(2);
					$scope.IGSTTax=parseFloat(($scope.data.specialFareFlightSegment.flightGstTax.igst) + parseFloat($scope.data.fareFlightSegment.flightGstTax.igst)).toFixed(2);
					$scope.UGSTTax=parseFloat(($scope.data.specialFareFlightSegment.flightGstTax.ugst) + parseFloat($scope.data.fareFlightSegment.flightGstTax.ugst)).toFixed(2);
					$scope.GSTTax=parseFloat(($scope.data.specialFareFlightSegment.flightGstTax.totalTax) + parseFloat($scope.data.fareFlightSegment.flightGstTax.totalTax)).toFixed(2);
					$scope.managementFee = parseFloat(($scope.data.specialFareFlightSegment.flightGstTax.managementFee) + parseFloat($scope.data.fareFlightSegment.flightGstTax.managementFee)).toFixed(2);
					$scope.totalflightprice =  parseFloat(parseFloat($scope.data.fareFlightSegment.totalPrice) + parseFloat($scope.data.specialFareFlightSegment.totalPrice)).toFixed(2);

				}else if($scope.data.specialFareFlightSegment.flightServiceTax != null || $scope.data.specialFareFlightSegment.flightServiceTax != undefined){
					/*#######Flight service Price ADDING#########*/
					$scope.ServiceTaxes = true;
					$scope.GSTServiceTaxes=false;					 
					$scope.baseServicetax = parseFloat(($scope.data.specialFareFlightSegment.flightServiceTax.baseServicetax) + parseFloat($scope.data.fareFlightSegment.flightServiceTax.baseServicetax)).toFixed(2);
					$scope.totalServiceTax = parseFloat(($scope.data.specialFareFlightSegment.flightServiceTax.totalServiceTax) + parseFloat($scope.data.fareFlightSegment.flightServiceTax.totalServiceTax)).toFixed(2);
					$scope.kkc = parseFloat(($scope.data.specialFareFlightSegment.flightServiceTax.kkc) + parseFloat($scope.data.fareFlightSegment.flightServiceTax.kkc)).toFixed(2);
					$scope.managementFee = parseFloat(($scope.data.specialFareFlightSegment.flightServiceTax.managementFee) + parseFloat($scope.data.fareFlightSegment.flightServiceTax.managementFee)).toFixed(2);
					$scope.sbc = parseFloat(($scope.data.specialFareFlightSegment.flightServiceTax.sbc) + parseFloat($scope.data.fareFlightSegment.flightServiceTax.sbc)).toFixed(2);
					$scope.totalflightprice =  parseFloat(parseFloat($scope.data.fareFlightSegment.totalPrice) + parseFloat($scope.data.specialFareFlightSegment.totalPrice)).toFixed(2);	
				}else{
					/*#######No service Price #########*/
					$scope.GSTServiceTaxes=false;
					$scope.ServiceTaxes = false;
					$scope.totalflightprice =  parseFloat(parseFloat($scope.data.fareFlightSegment.totalPrice) + parseFloat($scope.data.specialFareFlightSegment.totalPrice)).toFixed(2);
				}		
			}else if($scope.data.specialFareFlightSegment == null && $scope.data.specialFareFlightSegment == undefined){
				/*one way Price Showing*/
				/*#######GST Price ADDING#########*/ 
				if($scope.data.fareFlightSegment.flightGstTax != null || $scope.data.fareFlightSegment.flightGstTax != undefined){
					$scope.GSTServiceTaxes=true;
					$scope.ServiceTaxes = false;
					$scope.gstNumber = $scope.data.gstNumber;
					$scope.CGSTTax=parseFloat($scope.data.fareFlightSegment.flightGstTax.cgst).toFixed(2);
					$scope.SGSTTax=parseFloat($scope.data.fareFlightSegment.flightGstTax.sgst).toFixed(2);
					$scope.IGSTTax=parseFloat($scope.data.fareFlightSegment.flightGstTax.igst).toFixed(2);
					$scope.UGSTTax=parseFloat($scope.data.fareFlightSegment.flightGstTax.ugst).toFixed(2);
					$scope.GSTTax=parseFloat($scope.data.fareFlightSegment.flightGstTax.totalTax).toFixed(2);
					$scope.managementFee = parseFloat($scope.data.fareFlightSegment.flightGstTax.managementFee).toFixed(2);
					$scope.totalflightprice = parseFloat($scope.data.fareFlightSegment.totalPrice).toFixed(2);
				}else if($scope.data.fareFlightSegment.flightServiceTax != null || $scope.data.fareFlightSegment.flightServiceTax != undefined){
					/*#######Flight service Price ADDING#########*/
					$scope.GSTServiceTaxes=false;
					$scope.ServiceTaxes = true;
					$scope.baseServicetax = parseFloat($scope.data.fareFlightSegment.flightServiceTax.baseServicetax).toFixed(2);
					$scope.totalServiceTax = parseFloat($scope.data.fareFlightSegment.flightServiceTax.totalServiceTax).toFixed(2);
					$scope.kkc = parseFloat($scope.data.fareFlightSegment.flightServiceTax.kkc).toFixed(2);
					$scope.managementFee = parseFloat($scope.data.fareFlightSegment.flightServiceTax.managementFee).toFixed(2);
					$scope.sbc = parseFloat($scope.data.fareFlightSegment.flightServiceTax.sbc).toFixed(2);
					$scope.totalflightprice = parseFloat($scope.data.fareFlightSegment.totalPrice).toFixed(2);
				}else{
					/*#######No service Price #########*/
					$scope.GSTServiceTaxes=false;
					$scope.ServiceTaxes = false;
					$scope.totalflightprice = parseFloat($scope.data.fareFlightSegment.totalPrice).toFixed(2);	
				}				
			}
			var isagentlogged =  angular.element(document.getElementById('isagent'));	
			var isCardAcess =  angular.element(document.getElementById('isCardAcess')).val();	
			$scope.totalflightprice = Math.ceil($scope.totalflightprice);
			$scope.meallist = [];
			$scope.seatlist = [];
			$scope.baggagelist = [];
			$scope.IsSSRAvaiable = false;

			if($scope.data.specialServiceRequest!=null && $scope.data.specialServiceRequest!=undefined){
				$scope.IsSSRAvaiable = true;
				$scope.IsLCC = $scope.data.specialServiceRequest.isLCC;
				if($scope.data.specialServiceRequest.isLCC){
					angular.forEach($scope.data.specialServiceRequest.mealDynamic, function(obj,index) {
						if(index == 0){
							angular.forEach(obj, function(mealobj,mealindex) {	
								if(mealobj.Code == "No Meal"){
									$scope.meallist.push({"Code":mealobj.Code,"Description":mealobj.Code,"Price":0});
								}else{
									$scope.meallist.push({"Code":mealobj.Code,"Description":mealobj.AirlineDescription,"Price":mealobj.Price});							
								}
							});
						}
					});
					angular.forEach($scope.data.specialServiceRequest.seatPreference, function(obj,index) { 
						$scope.seatlist.push(obj);
					});
					angular.forEach($scope.data.specialServiceRequest.baggage, function(obj,index) { 
						if(index == 0){
							angular.forEach(obj, function(baggageobj,baggageindex) { 
								$scope.baggagelist.push(baggageobj);
							});
						}
					});
				}
				else{

					$scope.meallist.push({"Code":"No Meal","Description":"None"});
					$scope.seatlist.push({"Code":"None","Description":"None"});
					angular.forEach($scope.data.specialServiceRequest.meal, function(obj,index) { 							  
						$scope.meallist.push(obj);						
					});
					angular.forEach($scope.data.specialServiceRequest.seatPreference, function(obj,index) { 
						$scope.seatlist.push(obj);

					});
					angular.forEach($scope.data.specialServiceRequest.baggage, function(obj,index) { 
						$scope.baggagelist.push(obj);
					});
				}

			}

		 $scope.MealDivShow = $scope.data.returnspecialServiceRequest;
				for(var i=0;i<$scope.adult;i++){
					if($scope.MealDivShow!= null){
						$('#mealDivClass'+i).addClass('col-md-6'); 
	
					}else{
						$('#mealDivClass'+i).addClass('col-md-12'); 
					}
				}
				for(var i=0;i<$scope.child;i++){
					if($scope.MealDivShow!= null){
						$('#childmealDivClass'+i).addClass('col-md-6'); 
	
					}else{
						$('#childmealDivClass'+i).addClass('col-md-12'); 
					}
			}


			$scope.returnmeallist = [];
			$scope.returnseatlist = [];
			$scope.returnbaggagelist = [];
			$scope.returnIsSSRAvaiable = false;
			if($scope.data.returnspecialServiceRequest!=null && $scope.data.returnspecialServiceRequest!=undefined){
				$scope.returnIsSSRAvaiable = true;
				$scope.returnIsLCC = $scope.data.returnspecialServiceRequest.isLCC;
				if($scope.data.returnspecialServiceRequest.isLCC){
					angular.forEach($scope.data.returnspecialServiceRequest.mealDynamic, function(obj,index) {							 
						if(index == 0){
							angular.forEach(obj, function(mealobj,mealindex) {								
								if(mealobj.Code == "No Meal")
									$scope.returnmeallist.push({"Code":mealobj.Code,"Description":mealobj.Code,"Price":0});
								else
									$scope.returnmeallist.push({"Code":mealobj.Code,"Description":mealobj.AirlineDescription,"Price":mealobj.Price});							
							});
						}
					});
					angular.forEach($scope.data.returnspecialServiceRequest.seatPreference, function(obj,index) { 
						$scope.returnseatlist.push(obj);
					});
					angular.forEach($scope.data.returnspecialServiceRequest.baggage, function(obj,index) { 
						if(index == 0){
							angular.forEach(obj, function(baggageobj,baggageindex) { 
								$scope.returnbaggagelist.push(baggageobj);
							});
						}
					});
				}
				else{
					$scope.returnmeallist.push({"Code":"No Meal","Description":"None"});
					$scope.returnseatlist.push({"Code":"None","Description":"None"});
					angular.forEach($scope.data.returnspecialServiceRequest.meal, function(obj,index) { 							  
						$scope.returnmeallist.push(obj);
					});
					angular.forEach($scope.data.returnspecialServiceRequest.seatPreference, function(obj,index) { 
						$scope.returnseatlist.push(obj);
					});
					angular.forEach($scope.data.returnspecialServiceRequest.baggage, function(obj,index) { 
						$scope.returnbaggagelist.push(obj);
					});
				}

			}



			$scope.farebeforeload = false;
			$scope.isfareloaded = "block";
			$scope.contentloaded = true;
			$scope.bookloader = false ;
			if(!$scope.IsSSRAvaiable && $scope.isInternational)
				$scope.isdomestic = 'international';				
			if(!$scope.IsSSRAvaiable && !$scope.isInternational)
				$scope.isdomestic = 'domestic';

			$scope.totalpayableamt = $scope.data.totalPayableAmount;
			$scope.totalpayableamtwithoutothercharges = $scope.totalpayableamt;	
			$scope.totalticketprice = $scope.totalflightprice; 
			$scope.totalpricewithoutothercharges = $scope.totalflightprice;	
			
		//	if(isCardAcess == 'true'){
				var paymentgatewayprice;						
				if(isagentlogged.val() == 'cash'){
					var addpercent = ($scope.totalpayableamt/parseFloat(100)) * parseFloat(2.0);			
					var addedpercent = parseFloat(Math.ceil(addpercent)).toFixed(2);			
					paymentgatewayprice = (parseFloat($scope.totalpayableamt) + parseFloat(addedpercent)).toFixed(2);
					//console.log("if_paymentgatewayprice",paymentgatewayprice);
					if(booktype == 'book')
						$scope.isagentbook = true;
					if(booktype == 'hold')
						$scope.isagenthold = true;

				}else{
					
					var addpercent = ($scope.totalpayableamt/parseFloat(100)) * parseFloat(2.0);			
					var addedpercent = parseFloat(Math.ceil(addpercent)).toFixed(2);			
					$scope.otherchargesB2C = addedpercent;
					paymentgatewayprice = (parseFloat($scope.totalpayableamt) + parseFloat(addedpercent)).toFixed(2);
					//paymentgatewayprice = $scope.totalflightprice ;						
					$scope.totalflightprice = paymentgatewayprice;
					$scope.totalpayableamt = paymentgatewayprice;
					$scope.totalticketprice = paymentgatewayprice;
					if(booktype == 'book')
						$scope.isuserbook = true;
					if(booktype == 'hold')
						$scope.isuserhold = true;
				}
				
			
				$scope.data.oldPrice = Math.ceil($scope.data.oldPrice);
				$scope.data.newPrice = Math.ceil($scope.data.newPrice);
				$scope.oldprice = '';
				$scope.updatedprice = '';
				if($scope.data.oldPrice != $scope.data.newPrice)
				{					
					if(isagentlogged.val() == 'cash'){						
						$scope.oldprice = parseFloat($scope.data.oldPrice).toFixed(2);
						$scope.updatedprice = parseFloat($scope.data.newPrice).toFixed(2);
					}
					else{				
						
						$scope.oldprice = parseFloat(parseFloat($scope.data.oldPrice) + parseFloat($scope.otherchargesB2C)).toFixed(2);
						$scope.updatedprice = parseFloat(parseFloat($scope.data.newPrice) + parseFloat($scope.otherchargesB2C)).toFixed(2);
						
					}
					$scope.fareChangeModalAlert($scope.oldprice,$scope.updatedprice);
					//$scope.totalflightprice = parseFloat($scope.updatedprice).toFixed(2);
				}
			paymentgatewayprice = parseFloat(Math.ceil(paymentgatewayprice)).toFixed(2);

				$http({
					method: 'Get',
					url: 'SetPricevalue',
					params: {Totalprice : paymentgatewayprice},
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(function(result) {
					//console.log("result-paymentgatewayprice",result);
				}, function(error) {
					//console.log(error);
				});
			//}
				
				
		// Insurance Details Coding
				 if($scope.data.insurancePlanResponse != null && $scope.data.insurancePlanResponse.isPolicyAvaiable == true && $scope.data.flightsearch.isInternational == false){
					 $scope.insuranceExist = true; 
					 setTimeout(function(){
						 $('#MyCheckBox').click();
						 }, 1000);
				 }else if($scope.data.insurancePlanResponse == null && $scope.data.flightsearch.isInternational == true){
					 $scope.insuranceExist = true; 
				 }else{
					 $scope.insuranceExist = false; 
				 }
				 $scope.Insuranceadd = function(){
					 $(document).ready(function() { 
					 $("#MyCheckBox").click(function(){
						 $("html, body").animate({ scrollTop: 0 }, "slow");
						 var childCount = $location.search().chd;
						 var infantCount = $location.search().inf;						 
						 angular.forEach(childCount,function(key,value){							  
							 $('#childdate'+value).val('');							 
						 })
						 angular.forEach(infantCount,function(key,value){							  
							 $('#infantdate'+value).val('');							 
						 })
						 
					   });
					 });
					 
			if($scope.data.insurancePlanResponse != null && $scope.data.insurancePlanResponse.isPolicyAvaiable == true && $scope.data.flightsearch.isInternational == false){
				 $scope.Isinsurance=false;
				 $scope.InsurancePrice = 0;
				  
					
					$scope.insuranceExist = true;
					var TotalMembers = ($scope.adult)+($scope.infant)+($scope.child);
					$scope.insurancePerPassenger = $scope.data.insurancePlanResponse.insuranceAmt;
					$scope.InsurancePrice = $scope.data.insurancePlanResponse.insuranceAmt * TotalMembers;
					$scope.insurancePlanID =$scope.data.insurancePlanResponse.planId;	
					$scope.insurancePlanEmbedding = $scope.data.insurancePlanResponse.planId;
					$scope.addInsuranceCheckModel = {
						       value : true
						    };
					   
					  if($scope.addInsuranceCheckModel.value == true){
						  $scope.Isinsurance=true;
						  $scope.insuranceprice = $scope.InsurancePrice;
						  $scope.totalflightprice = parseFloat(parseFloat($scope.totalflightprice)+parseFloat($scope.InsurancePrice)).toFixed(2);
							$scope.totalpayableamt = parseFloat(parseFloat($scope.totalpayableamt)+parseFloat($scope.InsurancePrice)).toFixed(2);
						
							 } 
				        }
			else if($scope.data.insurancePlanResponse == null && $scope.data.flightsearch.isInternational == true){
				//console.log('international');
				 $scope.Isinsurance=false;
				 $scope.InsurancePrice = 0;
				 $scope.insuranceExist = true; 
				 $scope.addInsuranceCheckModel = {
					       value : true					       
					     };
				 
				  if($scope.addInsuranceCheckModel.value == true){
					  $scope.Isinsurance=true;					 
					  $scope.insuranceprice = $scope.InsurancePrice;
				 } 
				
			}
				 }
		    $scope.InsuranceTermCheckModel = {
					  value : true
			};
		    $scope.InsuranceTermNotCheckModel = {
					  value : false
			};
			 $scope.Insurancechange = function(){
				
				  if($scope.InsuranceTermCheckModel.value != true){
					  $scope.Isinsurance=false;
					  $scope.totalflightprice = parseFloat(parseFloat($scope.totalflightprice)- parseFloat($scope.insuranceprice)).toFixed(2);
					  $scope.totalpayableamt = parseFloat(parseFloat($scope.totalpayableamt)- parseFloat($scope.insuranceprice)).toFixed(2);
				}else{
					$('#uncheckInsurance').attr('checked', false); 
					 $('#showInsurConditions').show();
					  $scope.Isinsurance=true;
					  $scope.insuranceprice = $scope.InsurancePrice;
					  $scope.totalflightprice = parseFloat(parseFloat($scope.totalflightprice)+parseFloat($scope.insuranceprice)).toFixed(2);
					  $scope.totalpayableamt = parseFloat(parseFloat($scope.totalpayableamt)+parseFloat($scope.insuranceprice)).toFixed(2);
				  }
			 } 
			 $scope.InsuranceNotchange = function(){
				 $('#showInsurConditions').hide();
				  $scope.InsuranceTermCheckModel = {
						  value : false
				};
				  $scope.Isinsurance=false;
				  $scope.totalflightprice = parseFloat(parseFloat($scope.totalflightprice)- parseFloat($scope.insuranceprice)).toFixed(2);
				  $scope.totalpayableamt = parseFloat(parseFloat($scope.totalpayableamt)- parseFloat($scope.insuranceprice)).toFixed(2);
				 
			  
			 }
			 
			 $scope.insuranceFlight = $scope.totalflightprice;
			 $scope.insurancetotalpayableamt = $scope.totalpayableamt;
			  
	// End of Insurance

		},function(errorStatus){			
			$scope.errordiv = true;
			$scope.loadpricebar = false;
			$scope.errormeg = "Sorry we could not process your request as server is busy. please try after some time.";
			$scope.errorDisplay($scope.errormeg,$scope.ErrorFlightTravelDetails);
			
		});
	};
	
	
	
	
	
	
	$scope.addmealbaggageprice = function(passtype,itemcode,id,price,weight){
		$scope.IsLCC = $scope.data.specialServiceRequest.isLCC;
		$scope.mealprice = 0;
		$scope.baggageprice = 0;
		$scope.totalkg = 0;
		if(passtype.includes("baggage")){
			mealmap[passtype+id] = {"passtype":passtype,"itemcode":itemcode,"baggageprice":price,"weight":weight};
		}        	
		else{
			mealmap[passtype+id] = {"passtype":passtype,"itemcode":itemcode,"price":price};
			totalmealmap[passtype+id] = {"passtype":passtype,"itemcode":itemcode,"price":price};
		}
		$scope.totalflightprice = $scope.totalpricewithoutothercharges;
		$scope.totalpayableamt = $scope.totalpayableamtwithoutothercharges;
	 
		for (var x in mealmap)
		{
			if (mealmap.hasOwnProperty(x)) {			   
				//console.log('Keyss: ' + x + '\n');
			}			
			var value = mealmap[x];			
			for (var y in value)
			{
				if(y == 'price'){
					if($scope.mealprice!=undefined)
						$scope.mealprice += parseFloat(value[y]);
					else
						$scope.mealprice = parseFloat(value[y]);
					$scope.mealprice = parseFloat($scope.mealprice);				
					$scope.totalflightprice = parseFloat(parseFloat($scope.totalflightprice) + parseFloat(value[y])).toFixed(2);
					$scope.totalpayableamt = parseFloat(parseFloat($scope.totalpayableamt)+parseFloat(value[y])).toFixed(2);
				}
				if(y == 'baggageprice'){
					if($scope.baggageprice!=undefined){					
						$scope.baggageprice += parseFloat(value[y]);					
					}else{
						$scope.baggageprice = parseFloat(value[y]);				
					}
					$scope.baggageprice = parseFloat($scope.baggageprice);
					$scope.totalflightprice = parseFloat(parseFloat($scope.totalflightprice)+parseFloat(value[y])).toFixed(2);
					$scope.totalpayableamt = parseFloat(parseFloat($scope.totalpayableamt)+parseFloat(value[y])).toFixed(2);
				}
				if(y == 'weight'){
					if($scope.totalkg!=undefined){						
						$scope.totalkg += parseInt(value[y]);						
					}else{						
						$scope.totalkg = parseInt(value[y]);						
					}}
			}		
		}
		if(price != "0"){			
			$scope.totalplate = Object.keys(totalmealmap).length;			
		}
		if(price == "0"){
			delete mealmap[passtype+id];	
			delete totalmealmap[passtype+id];
			$scope.totalplate = Object.keys(totalmealmap).length;			
		}
		var isagentlogged =  angular.element(document.getElementById('isagent'));		
		if(isagentlogged.val() != 'cash'){
			var addpercent = ($scope.totalpayableamt/parseFloat(100)) * parseFloat(2.0);			
			var addedpercent = parseFloat(Math.ceil(addpercent)).toFixed(2);			
			$scope.otherchargesB2C = addedpercent;
			$scope.totalflightprice = (parseFloat($scope.totalflightprice) + parseFloat(addedpercent)).toFixed(2);
			$scope.totalpayableamt = (parseFloat($scope.totalpayableamt) + parseFloat(addedpercent)).toFixed(2);			
		}

		$scope.totalflightprice = parseFloat(Math.ceil($scope.totalflightprice)).toFixed(2);
		$scope.totalpayableamt = parseFloat(Math.ceil($scope.totalpayableamt)).toFixed(2);


		$http({
			method: 'Get',
			url: 'SetPricevalue',
			params: {Totalprice : $scope.totalpayableamt},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then(function(result) {
		}, function(error) {
			//console.log(error);
		});

	}

	$scope.addcardchargesforagent = function(iscard,b2ccharges,totalprice,payableamt){

		if(iscard)		
			$scope.otherchargesB2C = b2ccharges;
		else
			$scope.otherchargesB2C = undefined;

		$scope.totalflightprice = parseFloat(Math.ceil(totalprice)).toFixed(2);
		$scope.totalpayableamt = parseFloat(Math.ceil(payableamt)).toFixed(2);	
		 
		
		$http({
			method: 'Get',
			url: 'SetPricevalue',
			params: {Totalprice : $scope.totalpayableamt},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then(function(result) {
		}, function(error) {
			//console.log(error);
		});


		$scope.$apply();
	}



	$scope.getbasecurrencyvalue = function(currentamt,exchangerate)
	{		

		var covertamt = parseFloat(currentamt) * parseFloat(exchangerate);	
		return parseFloat(covertamt).toFixed(2);
	}

	$scope.getconvertedcurrency = function(currentamt)
	{		
		var covertamt = parseFloat(currentamt) * parseFloat($scope.currencyvalue);	
		var nStr = parseFloat(covertamt).toFixed(2).toString();
		nStr += '';
		var x = nStr.split('.');
		var x1 = x[0];
		var x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}

		if(x2.length != 0)
		{
			if(x2.length < 3)
			{
				if(x2.length == 1)
					x2+="00";
				else	
					x2+="0";
			}
		}
		else
		{
			x2+=".00";
		}

		$scope.coverttotalprice = x1 + x2;
		return parseFloat(covertamt).toFixed(2);
	}

	$scope.convertrateintoint = function(rate)
	{
		var ratevalue = parseInt(rate, 10);
		return  ratevalue;
	}

	$scope.getconverteddisplayablecurrency = function(currentamt)
	{		
		var covertamt = parseFloat(currentamt) * parseFloat($scope.currencyvalue);	
		var nStr = parseFloat(covertamt).toFixed(2).toString();
		nStr += '';
		var x = nStr.split('.');
		var x1 = x[0];
		var x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}

		if(x2.length != 0)
		{
			if(x2.length < 3)
			{
				if(x2.length == 1)
					x2+="00";
				else	
					x2+="0";
			}
		}
		else
		{
			x2+=".00";
		}
		$scope.coverttotalprice = x1 + x2;

		return ;
	}
	$scope.showdetails = function(obj){	   

		angular.forEach(obj.flightSegmentsGroups, function(Groupsobj,index) { 
			angular.forEach(Groupsobj.flightSegments, function(Segmentobj,index) { 
				$scope.selectedsegments = Segmentobj.segments;
				$scope.totalprice = obj.totalPrice;            

			});
		});


	};
	$scope.showdetailstwo = function(obj){
		 $scope.duration = [];
		angular.forEach(obj.flightSegments, function(Segmentobj,index) { 
			$scope.selectedsegments = Segmentobj.segments;
			$scope.totalprice = $scope.fareflightsegment.totalPrice;
			angular.forEach($scope.selectedsegments, function(obj,index) { 
				$scope.selecteddestname = obj.destName;
				$scope.selecteddestcode = obj.dest;
		//Start Duration
				var departHour = obj.depart;
				var arrivalHour = obj.arrival;
				var a = moment(arrivalHour); 
				var b = moment(departHour);
				var c = a.diff(b, 'minutes');
				 var Duration = $scope.convertminToHour(c);
				 $scope.duration.push(Duration);		 
		// End Duration 
			});
		});
	};

	$scope.returnIndex = function(){
		window.location.href = window.location.href.replace(/#.*$/, '');
	}


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

	/* Get Datatime to Time */
	$scope.getDateObject = function(dt){
		var date = new Date(dt);
		var hours = date.getHours();
		if(hours < 10) hours = '0' + hours;
		var min = date.getMinutes();
		if(min < 10) min = '0' + min;
		return hours + ':' + min;

	}
	function escapeRegExp(string) {
		return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
	}
	function replaceAll(string, find, replace) {
		return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
	}

	$scope.flightother = function(){
		var flightOtherDetails = {};
		flightOtherDetails.spclindex = $scope.spclindex;
		flightOtherDetails.amount =  $scope.totalpayableamt;
		return flightOtherDetails;
	}
	$scope.flightPassengerRmData = function(){
		var rmDetail={};
		var passengersRm=[];
		
		
		//console.log("$scope.flightBookData.adult",$scope.flightBookData.adult)
		for (var i = 0; i < $scope.flightBookData.adult; i++) {
			var flightRmDetail = {};
			var uid=angular.element('#compId').val();
			flightRmDetail.paxId=$scope.data.transactionKey+uid+i+$scope.timestamp;
			if(angular.element('#EmployeeCode-'+i).val())
				flightRmDetail.empCode = angular.element('#EmployeeCode-'+i).val();
			else
				flightRmDetail.empCode = "";
			if(angular.element('#Department-'+i).val())
				flightRmDetail.department = angular.element('#Department-'+i).val();
			else
				flightRmDetail.department = "";
			if(angular.element('#CostCenter-'+i).val())
				flightRmDetail.costCenter = angular.element('#CostCenter-'+i).val();
			else
				flightRmDetail.costCenter = "";
			if(angular.element('#Approver-'+i).val())
				flightRmDetail.approverName = angular.element('#Approver-'+i).val();
			else
				flightRmDetail.approverName = "";
			if(angular.element('#Location-'+i).val())
				flightRmDetail.location = angular.element('#Location-'+i).val();
			else
				flightRmDetail.location = "";
			if(angular.element('#trNumber-'+i).val())
				flightRmDetail.trNumber = angular.element('#trNumber-'+i).val();
			else
				flightRmDetail.trNumber = "";
			if(angular.element('#businessUnit-'+i).val())
				flightRmDetail.bussinessUnit = angular.element('#businessUnit-'+i).val();
			else
				flightRmDetail.bussinessUnit = "";
			if(angular.element('#projectCode-'+i).val())
				flightRmDetail.projectCode = angular.element('#projectCode-'+i).val();
			else
				flightRmDetail.projectCode = "";
			if(angular.element('#reasonForTravel-'+i).val())
				flightRmDetail.reasonForTravel = angular.element('#reasonForTravel-'+i).val();
			else
				flightRmDetail.reasonForTravel = "";
			if(angular.element('#billNonBill-'+i).val())
				flightRmDetail.billNonBill = angular.element('#billNonBill-'+i).val();
			else
				flightRmDetail.billNonBill = "";
			//console.log("(angular.element('#manual0'+i).val()",angular.element('#manual0'+i).val());
			if(angular.element('#manual0'+i).val())
				flightRmDetail.manualField1 = angular.element('#manual0'+i).val();
			else
				flightRmDetail.manualField1 = "";
			if(angular.element('#manual1'+i).val())
				flightRmDetail.manualField2 = angular.element('#manual1'+i).val();
			else
				flightRmDetail.manualField2 = "";
			if(angular.element('#manual2'+i).val())
				flightRmDetail.manualField3 = angular.element('#manual2'+i).val();
			else
				flightRmDetail.manualField3 = "";
			if(angular.element('#manual3'+i).val())
				flightRmDetail.manualField4 = angular.element('#manual3'+i).val();
			else
				flightRmDetail.manualField4 = "";
			if(angular.element('#manual4'+i).val())
				flightRmDetail.manualField5 = angular.element('#manual4'+i).val();
			else
				flightRmDetail.manualField5 = "";
			
			
		
		//	console.log("flightRmDetail",flightRmDetail);
			passengersRm.push(flightRmDetail);
		//	console.log("passengersRm",passengersRm);
		}	
		
		//console.log("passengersRm",passengersRm);
		rmDetail.rmConfigList=passengersRm;
		rmDetail.serviceType='Flight';
		rmDetail.txKey=$scope.data.transactionKey;
		
		
		
		return rmDetail;
	}
	$scope.flightPassengerData = function(){
		var flightBookDetails = {};
		flightBookDetails.quotationid = "-1";
		flightBookDetails.isQuotation = "false";
		flightBookDetails.address = angular.element('#address').val();
		flightBookDetails.address2 = angular.element('#address2').val();
		flightBookDetails.city = angular.element('#city').val();
		flightBookDetails.state = angular.element('#state').val();
		flightBookDetails.district = angular.element('#state').val();
		flightBookDetails.country = angular.element('#country').val();
		flightBookDetails.phone = angular.element('#phone').val();
		flightBookDetails.zip = angular.element('#zip').val();
		flightBookDetails.pincode = angular.element('#zip').val();
		flightBookDetails.app_key = angular.element('#ay').val();
		flightBookDetails.app_key = angular.element('#ay').val();
		flightBookDetails.userid = angular.element('#userid').val();
		flightBookDetails.username = angular.element('#uname').val();
		flightBookDetails.paymode = angular.element('#isagent').val();
		var emflag=angular.element('#emFlag').val();
		if(emflag == 'true'){
			flightBookDetails.emulateByCompanyId = angular.element('#emCompany').val();
			flightBookDetails.emulateByUserId = angular.element('#emUname').val();
		}
		else{
			flightBookDetails.emulateByCompanyId = '';
			flightBookDetails.emulateByUserId = '';
		}
		flightBookDetails.isEmulateFlag = emflag;
		flightBookDetails.price_key = angular.element('#pricekey').val();
		flightBookDetails.currencyname = angular.element('#currencyname').val();
		flightBookDetails.transactionkey = angular.element('#transactionKey').val();
		flightBookDetails.mobile = angular.element('#mobile').val();
		flightBookDetails.email = angular.element('#email').val();
		flightBookDetails.adult = angular.element('#adult').val();
		flightBookDetails.child = angular.element('#child').val();
		flightBookDetails.infant = angular.element('#infant').val();
		flightBookDetails.countryCode ="IN";
		flightBookDetails.countryId = "IN";

		var adultTitle = []; var adultFname = [];  var adultSname = [] ; var adultMeal = []; var adultSeat = [];var adultMname = [];
		var childTitle = []; var childFname = [];  var childSname = []; var childDate = [];
		var infantTitle = []; var infantFname = [];  var infantSname = []; var infantDate = [];
		var admeal = '';   var passengers = []; var insuranceType = []; var childInsuranceType = []; var InfantInsuranceType = [];
		for (var i = 0; i < $scope.flightBookData.adult; i++) {
			if($scope.isCor=='true'){
			var uid=angular.element('#compId').val();
			var paxId=$scope.data.transactionKey+uid+i+$scope.timestamp;}
			else
				var	paxId='';
			adultTitle = document.getElementById('mrMss'+i).value;
			adultFname = document.getElementById('AdFirstName-'+i).value;
			adultSname = document.getElementById('Surname-'+i).value;
			adultMname = document.getElementById('MiddleName-'+i).value;
			insuranceType = document.getElementById('insurance-'+i).value;
			$scope.adultDob = "";
			var birthday = "";
			if(document.getElementById('Adultdate'+i).value && $scope.InsuranceTermCheckModel.value == true){
				var Adultdob = document.getElementById('Adultdate'+i).value;
				birthday = Adultdob.split("-").reverse().join("-");
				$scope.adultDob = document.getElementById('Adultdate'+i).value;
			}else{
				var startDate = angular.element('#adb').val();
				birthday = startDate.split("/").reverse().join("-");
				var formatedDate = startDate.split("/").join("-");
				$scope.adultDob = formatedDate;
			}
			if($scope.InsuranceTermCheckModel.value != true){
				
				$scope.nomineeName =  "";
				$scope.nomineeRelation = ""
				 $scope.isSelfAdultInsurance = false;
			}else{
				if(insuranceType != 'Self' && $scope.Isinsurance == true){
					$scope.isSelfAdultInsurance = false;
					$scope.nomineeName = document.getElementById('nomineeName-'+i).value;
					$scope.nomineeRelation = document.getElementById('nomineeRel-'+i).value;
				}
				else if(insuranceType == 'Self' && $scope.Isinsurance == true){
					$scope.nomineeName =  adultFname + adultSname;
					$scope.nomineeRelation = "self"
					 $scope.isSelfAdultInsurance = true;					
				}else{
					$scope.nomineeName =  "";
					$scope.nomineeRelation = ""
					 $scope.isSelfAdultInsurance = false;
				}
			}
			
			  
			if($scope.baggagelist.length == 0){
				baggage = null;	
				$scope.baggageWeigh = null;	
			}else{
				baggage = document.getElementById('baggitem-'+i).value;
				$scope.baggageWeigh = $scope.baggageweightdetails(baggage);
			} 

			if($scope.meallist.length == 0){
				adultMeal = null;
				$scope.meal=null;
			}else{
				adultMeal = document.getElementById('adultMeal-'+i).value;
				$scope.meal=$scope.mealdetails(adultMeal);
			}

			if($scope.seatlist.length == 0){
				adultSeat = "None";
				$scope.seat="None";
			}else{
				adultSeat = document.getElementById('adultSeat-'+i).value;
				$scope.seat=$scope.seatdetails(adultSeat);
			}

			

			var passportExpiry = angular.element('#adpEx').val();
			var passportExpiryDate = passportExpiry.split("/").reverse().join("-");
			var baggage;
			var baggageWeight;
			var weight;
			var passportNumb; var returnbaggage; var returnmealcode; var returnseatcode;
			//	console.log("$scope.data.returnspecialServiceRequest",$scope.data.returnspecialServiceRequest);
			if($scope.data.flightsearch.isInternational == true){
				passportNumb = document.getElementById('passport-'+i).value;
			}else{
				passportNumb = "";
			}

			if($scope.data.returnspecialServiceRequest!=null){
				if($scope.returnbaggagelist.length > 0){
					returnbaggage =  document.getElementById('baggitem'+i).value;
					$scope.returnbaggageWeigh = $scope.returnbaggageweightdetails(returnbaggage);
				}else{
					returnbaggage=null;
					$scope.returnbaggageWeigh =null;
				}

				if($scope.returnmeallist.length > 0){
					returnmealcode =  document.getElementById('returnmealitem'+i).value;
					$scope.returnmeal=$scope.returnmealdetails(returnmealcode);
				}else{
					returnmealcode = null;
					$scope.returnmeal=null;
				}
				if($scope.returnseatlist.length > 0){
					returnseatcode = document.getElementById('returnseat'+i).value;
					$scope.returnseat=$scope.returnseatdetails(returnseatcode);
				}else{
					returnseatcode = "None";
					$scope.returnseat= "None";
				}

			}else{
				returnbaggage = null; 
				$scope.returnbaggageWeigh = null;
				returnmealcode =  null;
				$scope.returnmeal=null;
				returnseatcode =  null;
				$scope.returnseat=null;

			}
			var adultDetails = "";
			 adultDetails = {"paxId":paxId,"baggagecode":baggage,"passengerId":"adult"+i,"title":adultTitle,"firstName":adultFname,"middleName":adultMname,
					"lastName":adultSname,"mealcode":adultMeal,"seatcode":adultSeat,"birthday":birthday,"passengerTypeCode":"ADT",
					"passportExpiryDate":passportExpiryDate,"returnbaggagecode":returnbaggage,"returnmealcode":returnmealcode,
					"returnseatcode":returnseatcode,"passportNo":passportNumb,"baggageWeight":$scope.baggageWeigh,"returnbaggageWeight":$scope.returnbaggageWeigh,
					"mealName":$scope.meal,"returnmealName":$scope.returnmeal,"seatName":$scope.seat,"returnseatName":$scope.returnseat,
					"age":$scope.calculateAge($scope.parseAgeDate($scope.adultDob)),"isSelfInsurance":$scope.isSelfAdultInsurance,"nomineeName":$scope.nomineeName,"nomineeRelationShip":$scope.nomineeRelation
			};
			passengers.push(adultDetails);
				 

		}

		for (var i = 0; i < $scope.flightBookData.child; i++) { 
			childTitle = document.getElementById('childTitle-'+i).value;
			childFname = document.getElementById('childFname-'+i).value;
			childMname = document.getElementById('childMname-'+i).value;
			childSname = document.getElementById('childSurname-'+i).value;
			childDate = document.getElementById('childdate'+i).value;		 
			
			var childbirthday = childDate.split("-").reverse().join("-");
			childInsuranceType = document.getElementById('chinsurance-'+i).value;
			if($scope.InsuranceTermCheckModel.value != true){
				$scope.ChildnomineeName =  "";
				$scope.ChildnomineeRelation = ""
				 $scope.isSelfChildInsurance = false;
			}else{
			if(childInsuranceType != 'Self' && $scope.Isinsurance == true){
				$scope.isSelfChildInsurance = false;
				$scope.ChildnomineeName = document.getElementById('chNomineeName-'+i).value;
				$scope.ChildnomineeRelation = document.getElementById('chNomineeRel-'+i).value;
			}else if(childInsuranceType == 'Self' && $scope.Isinsurance == true){
				$scope.ChildnomineeName =  childFname + childSname;
				$scope.ChildnomineeRelation = "self";
				$scope.isSelfChildInsurance = true;
			 }else{
				 $scope.ChildnomineeName = "";
					$scope.ChildnomineeRelation = "";
					$scope.isSelfChildInsurance = false; 
			 }
			}
			var childMealDetails;
			var childSeat;
			if($scope.meallist.length == 0){
				childMealDetails = null;
				$scope.childmeal=null;
			}else{
				childMealDetails = document.getElementById('mealitem-'+i).value;
				
				$scope.childmeal=$scope.mealdetails(childMealDetails);
			}

			if($scope.seatlist.length == 0){
				childSeat = null;
				$scope.childseat=null;
				//console.log("adultSeatCount1");
			}else{
				childSeat = document.getElementById('childSeatCode'+i).value;
				$scope.childseat=$scope.seatdetails(childSeat);
				//console.log("adultSeatCount2");
			}
			var childbaggage;
			 
			if($scope.baggagelist.length == 0){
				childbaggage = null;	
				$scope.childbaggageWeigh = null;
			}else{
				childbaggage = document.getElementById('Chbaggitem-'+i).value;
				 
				$scope.childbaggageWeigh = $scope.baggageweightdetails(childbaggage);	
			}

			var passportExpiry = angular.element('#adpEx').val();
			var childpassportExpiryDate = passportExpiry.split("/").reverse().join("-");


			var childpassportNumb; var childreturnbaggage; var childreturnmealcode; var childreturnseatcode;

			if($scope.data.flightsearch.isInternational == true){
				childpassportNumb = document.getElementById('childPassportNo'+i).value;
			}else{
				childpassportNumb = "";
			}

			if($scope.data.returnspecialServiceRequest!=null){
				if($scope.returnbaggagelist.length > 0){
					childreturnbaggage =  document.getElementById('childReturnbaggitem'+i).value;
					$scope.childreturnbaggageWeigh = $scope.returnbaggageweightdetails(childreturnbaggage);
				}else{

					childreturnbaggage=null;
					$scope.childreturnbaggageWeigh =null;

				}
				if($scope.returnmeallist.length > 0){
					childreturnmealcode =  document.getElementById('returnmealitem'+i).value;
					$scope.childreturnmeal=$scope.returnmealdetails(childreturnmealcode);
				}else{
					childreturnmealcode =  null;
					$scope.childreturnmeal=null;
				}

				if($scope.returnseatlist.length > 0){
					childreturnseatcode = document.getElementById('childreturnseatcode'+i).value;
					$scope.childreturnseat=$scope.returnseatdetails(childreturnseatcode);
				}else{
					childreturnseatcode = null;
					$scope.childreturnseat=null;
				}		

			}else{
				childreturnbaggage =  null;
				$scope.childreturnbaggageWeigh = null;
				childreturnmealcode =  null;
				$scope.childreturnmeal=null;
				childreturnseatcode =  null;
				$scope.childreturnseat=null;

			}
			var childDetails = "";
			 childDetails = {"paxId":'',"baggagecode":childbaggage,"passengerId":"child"+i,"title":childTitle,"firstName":childFname,"middleName":childMname,
					"lastName":childSname,"mealcode":childMealDetails,"seatcode":childSeat,"birthday":childbirthday,"passengerTypeCode":"CHD",
					"passportExpiryDate":childpassportExpiryDate,"baggagecode":childbaggage,"returnbaggagecode":childreturnbaggage,"returnmealcode":childreturnmealcode,
					"returnseatcode":childreturnseatcode,"passportNo":childpassportNumb,"baggageWeight":$scope.childbaggageWeigh,"returnbaggageWeight":$scope.childreturnbaggageWeigh,
					"mealName":$scope.childmeal,"returnmealName":$scope.childreturnmeal,"seatName":$scope.childseat,"returnseatName":$scope.childreturnseat,
					"age":$scope.calculateAge($scope.parseAgeDate(childDate)),"isSelfInsurance":$scope.isSelfChildInsurance,"nominee":$scope.ChildnomineeName,"relationShipWithNominee":$scope.ChildnomineeRelation
					};
			 
			passengers.push(childDetails);

		} 
		for (var i = 0; i < $scope.flightBookData.infant; i++) { 
			infantTitle = document.getElementById('infantTitle-'+i).value;
			infantFname = document.getElementById('infantFname-'+i).value;
			infantMname = document.getElementById('infantMname-'+i).value;
			infantSname = document.getElementById('infantSname-'+i).value;
			infantDate = document.getElementById('infantdate'+i).value;
			var infbirthday = infantDate.split("-").reverse().join("-");
			var infpassportExpiry = angular.element('#inppEx').val();
			var infantpassportExpiryDate = infpassportExpiry.split("/").reverse().join("-");
			var infntpassportNumb;
			InfantInsuranceType = document.getElementById('InfantInsurance-'+i).value;
			if($scope.InsuranceTermCheckModel.value != true){
				$scope.InfantNomineeName =  "";
				$scope.InfantNomineeRelation = ""
				 $scope.isInfantSelfInsurance = false;
			}else{
			if(InfantInsuranceType != 'Self'){
				$scope.isInfantSelfInsurance = false;
				$scope.InfantNomineeName = document.getElementById('InfNomineeName-'+i).value;
				$scope.InfantNomineeRelation = document.getElementById('InfNomineeRel-'+i).value;
			}else if(InfantInsuranceType == 'Self' && $scope.Isinsurance == true){
				$scope.InfantNomineeName =  infantFname + infantSname;
				$scope.InfantNomineeRelation = "self";
				$scope.isInfantSelfInsurance = true;
			 }else{
				 $scope.InfantNomineeName =  "";
					$scope.InfantNomineeRelation = "";
					$scope.isInfantSelfInsurance = false;
			 }	
			
			}

			if($scope.data.flightsearch.isInternational == true){
				infntpassportNumb = document.getElementById('inppNo'+i).value;
			}else{
				infntpassportNumb = "";
			}
			var infantDetails = "";
			infantDetails = {"paxId":'',"passengerId":"infant"+i,"title":infantTitle,"firstName":infantFname,"middleName":infantMname,
					"lastName":infantSname,"birthday":infbirthday,"passengerTypeCode":"INF",
					"passportExpiryDate":infantpassportExpiryDate,"passportNo":infntpassportNumb,
					"age":$scope.calculateAge($scope.parseAgeDate(infantDate)),"isSelfInsurance":$scope.isInfantSelfInsurance,"nominee":$scope.InfantNomineeName,"relationShipWithNominee":$scope.InfantNomineeRelation
					};
			passengers.push(infantDetails);
			 
		} 

		flightBookDetails.passengerdetailsList = passengers;
		var companyEntityId='';
		if($scope.isCompany == 'true'){
			var companyen=angular.element('#CompanyEntity').val();
			var iscom=false;
			
			if(companyen =="null"||companyen==undefined||companyen==""){
				flightBookDetails.isCompanyEntity=false;
			}else{
				var ComEntityobj = JSON.parse(companyen);
				iscom=true;
				companyEntityId=ComEntityobj.companyEntityId;
			}
			flightBookDetails.companyEntityId = companyEntityId;
			flightBookDetails.isCompanyEntity = iscom;
		}
		else{
			flightBookDetails.companyEntityId = companyEntityId;
			flightBookDetails.isCompanyEntity = false;
		}
		
		// Rm Details Codes
		/*var rmDataList={};
		var rmDataArrayList = [];
		flightBookDetails.isRmDetails = $scope.isRmDetails;
		if(angular.element('#EmployeeCode').val())
			rmDataList.empCode = angular.element('#EmployeeCode').val();
		else
			rmDataList.empCode = "";
		if(angular.element('#Department').val())
			rmDataList.department = angular.element('#Department').val();
		else
			rmDataList.department = "";
		if(angular.element('#CostCenter').val())
			rmDataList.costCenter = angular.element('#CostCenter').val();
		else
			rmDataList.costCenter = "";
		if(angular.element('#Approver').val())
			rmDataList.approverName = angular.element('#Approver').val();
		else
			rmDataList.approverName = "";
		if(angular.element('#Location').val())
			rmDataList.location = angular.element('#Location').val();
		else
			rmDataList.location = "";
		if(angular.element('#trNumber').val())
			rmDataList.trNumber = angular.element('#trNumber').val();
		else
			rmDataList.trNumber = "";
		if(angular.element('#businessUnit').val())
			rmDataList.bussinessUnit = angular.element('#businessUnit').val();
		else
			rmDataList.bussinessUnit = "";
		if(angular.element('#projectCode').val())
			rmDataList.projectCode = angular.element('#projectCode').val();
		else
			rmDataList.projectCode = "";
		if(angular.element('#reason').val())
			rmDataList.reasonForTravel = angular.element('#reason').val();
		else
			rmDataList.reasonForTravel = "";
		if(angular.element('#billingCode').val())
			rmDataList.billNonBill = angular.element('#billingCode').val();
		else
			rmDataList.billNonBill = "";
		if(angular.element('#manual0').val())
			rmDataList.manualField1 = angular.element('#manual0').val();
		else
			rmDataList.manualField1 = "";
		if(angular.element('#manual1').val())
			rmDataList.manualField2 = angular.element('#manual1').val();
		else
			rmDataList.manualField2 = "";
		if(angular.element('#manual2').val())
			rmDataList.manualField3 = angular.element('#manual2').val();
		else
			rmDataList.manualField3 = "";
		if(angular.element('#manual3').val())
			rmDataList.manualField4 = angular.element('#manual3').val();
		else
			rmDataList.manualField4 = "";
		if(angular.element('#manual4').val())
			rmDataList.manualField5 = angular.element('#manual4').val();
		else
			rmDataList.manualField5 = "";

		rmDataArrayList.push(rmDataList); 
		flightBookDetails.rmDataListDetails = rmDataArrayList;	*/
		 
		var departDate = $location.search().depart;
		//console.log("departDate-------",departDate);
		 if($scope.InsuranceTermCheckModel.value != true){
			 flightBookDetails.planId = "";
			 flightBookDetails.age = "";
			 flightBookDetails.isInsuranceAvailable = false;
			 
		 }else{ 
			 if($scope.data.insurancePlanResponse && $scope.data.insurancePlanResponse != null){
					flightBookDetails.isInsuranceAvailable = $scope.data.insurancePlanResponse.isPolicyAvaiable;
				}
		if($scope.insurancePlanID){
			flightBookDetails.planId = $scope.insurancePlanID;			
			if(flightBookDetails.planId == "2" || flightBookDetails.planId == 2){
				
				flightBookDetails.age = "40";
			}
			
		}else{	
			if($scope.internationalPlanId){	flightBookDetails.planId = $scope.internationalPlanId;
			}else{ flightBookDetails.planId = ""; }
			if($scope.Intenational_Isinsurance){	 flightBookDetails.isInsuranceAvailable =  $scope.Intenational_Isinsurance;
			}else{ flightBookDetails.isInsuranceAvailable = false; }
			if($('#Adultdate0').val()){
				 flightBookDetails.age = $scope.calculateAge($scope.parseAgeDate($('#Adultdate0').val()));
			}else{
				flightBookDetails.age = "";
			}
			 
			 
			if(flightBookDetails.planId == "2" || flightBookDetails.planId == 2){
				flightBookDetails.age = "40";
			}
		}		
		 }		
		return flightBookDetails;
	}



	var data;
	$scope.UserFlightBook = function(){
		$scope.ImageLoader = true;
		var userbook = $scope.flightPassengerData();		 
		
		flightServices.Flightbook(userbook).then(function(response){
			
			$scope.ImageLoader = false;			
			data = response.data;
			//console.log("response",data);
			$scope.flightprice = '';
			if(data.fareFlightSegment != null){
				$scope.flightprice = data.fareFlightSegment.totalPrice;
				
			}
			if(data.fareFlightSegmentSpecial != null){
				$scope.flightprice = parseFloat(parseFloat($scope.flightprice) +  parseFloat(data.fareFlightSegmentSpecial.totalPrice));
				
			}
			$scope.flightprice = parseFloat(Math.ceil($scope.flightprice)).toFixed(2);
			$scope.bookingComments = data.bookingComments;
			$scope.confirmationNumber = data.pgID;		 
			$scope.customername = data.flightCustomerDetails.passengerdetailsList[0].firstName+data.flightCustomerDetails.passengerdetailsList[0].lastName;
			$scope.customerno = data.flightCustomerDetails.mobile;
			$scope.customeremail = data.flightCustomerDetails.email;		
			$scope.pnr = data.pnr;
			$("#reference_no").val($scope.confirmationNumber);
			$("#totalamt").val($scope.flightprice);
			$("#customername").val($scope.customername);
			$("#customeremail").val($scope.customeremail);
			$("#customerno").val($scope.customerno);
			$("#ship_name").val($scope.customername);
			$("#ship_phone").val($scope.customerno);			 
			$scope.usetip = "Use this Payment gateway id " + $scope.confirmationNumber  + " Booking Amount is " +$scope.totalflightprice
			$scope.resultset = true;
			$scope.bookconfirmloader = false;
			$scope.errordiv = false;
			
			if($scope.isCor =='true'){
				var rmUserDetails=$scope.flightPassengerRmData();
				flightServices.FlightRmbook(rmUserDetails).then(function(response){
					if($scope.resultset)
					{
						var frm = $window.document.getElementById("frmTransaction");
						//console.log('frmT',frm);
						frm.submit();
					}
				});
			}else{
				if($scope.resultset)
				{
					var frm = $window.document.getElementById("frmTransaction");
					//console.log('frmT',frm);
					frm.submit();
				}
			}
			
			
			
			
		},function(errorStatus){			
			$scope.errormeg = "Sorry we could not process your request as server is busy. please try after some time.";
			$scope.errordiv = true;
			$scope.errorDisplay($scope.errormeg,$scope.ErrorFlightTravelDetails);
		});
		
		
		
		
	};

	$scope.baggageweightdetails= function(obj){
		var beggageweight;

		angular.forEach($scope.baggagelist, function(begobj) {	
			if(begobj.Code==obj){
				beggageweight= begobj.Weight;
			}

		});
		return beggageweight;
	}
	$scope.returnbaggageweightdetails= function(obj){
		var returnbeggageweight;
		angular.forEach($scope.returnbaggagelist, function(begobj) {	
			if(begobj.Code==obj){
				returnbeggageweight= begobj.Weight;
			}
		});
		return returnbeggageweight;
	}

	$scope.seatdetails= function(obj){
		var seat;
		angular.forEach($scope.seatlist, function(seatobj) {	
			if(seatobj.Code==obj){
				seat= seatobj.Description;
			}
		});
		return seat;
	}
	$scope.returnseatdetails= function(obj){
		var returnseat;
		angular.forEach($scope.returnseatlist, function(reseatobj) {	
			if(reseatobj.Code==obj){
				returnseat= reseatobj.Description;
			}
		});
		return returnseat;
	}

	$scope.mealdetails= function(obj){
		var meal;
		angular.forEach($scope.meallist, function(mealobj) {	
			if(mealobj.Code==obj){
				meal= mealobj.Description;
			}
		});
		return meal;
	}
	
	$scope.returnmealdetails= function(obj){
		var remeal;
		angular.forEach($scope.returnmeallist, function(remealobj) {	
			if(remealobj.Code==obj){
				remeal= remealobj.Description;

			}

		});
		return remeal;
	}


	$scope.agentFlightBook = function(){

		if($scope.flightBookData.bookingtype == "hold"){
			$scope.agentHoldBooking();
		}else if($scope.flightBookData.holdingRound == "hold"){
			$scope.agentHoldBookingRoundTrip();
		}
		else{
			$scope.agentBook();
		}
	};

	$scope.agentHoldBooking = function(){
		$scope.ImageLoader = true;
		var agentholddata = $scope.flightPassengerData();
		$location.path('/Flights-Holding');
		localStorageService.set('Agentholddata',agentholddata);
	};
	$scope.agentHoldBookingRoundTrip = function(){
		$scope.ImageLoader = true;
		var agentRholddata = $scope.flightPassengerData();
		$location.path('/Flights-Holding');
		localStorageService.set('Agentholddata',agentRholddata);
	};
	$scope.agentBook = function(){
		$scope.ImageLoader = true;
		var totalPrice = $scope.totalflightprice;
		var agentbook = $scope.flightPassengerData();
		var rmUserDetails=$scope.flightPassengerRmData();
		transporter.getwallet().then(function(response){
			$scope.agentbalance = Math.round(response.data.jsonResult.walletbal).toFixed(2);
			$scope.agentDepositBalance = Math.round(response.data.jsonResult.walletdepbal).toFixed(2);			 
			
			//console.log("varrmUserDetails",rmUserDetails);
			if(parseFloat($scope.agentDepositBalance) >= parseFloat(totalPrice)){
				localStorageService.set('rmUserDetails',rmUserDetails);
				$location.path('/Flights-AgentBooking');
				localStorageService.set('AgentConfirmData',agentbook);
				
			}
			else if(parseFloat($scope.agentbalance) >= parseFloat(totalPrice)){
				localStorageService.set('rmUserDetails',rmUserDetails);
				$location.path('/Flights-AgentBooking');
				localStorageService.set('AgentConfirmData',agentbook);
				
			}else if(parseFloat($scope.agentbalance) == 0){
				 
				$scope.insufficientFundopen();
				$scope.ImageLoader = false;
			}
			else{
				$scope.insufficientFundopen();
				$scope.ImageLoader = false;
			}

		},function(){
			$scope.errormeg = "Unable to process your Request";			
			$scope.errordiv = true;
			$scope.errorDisplay($scope.errormeg,$scope.ErrorFlightTravelDetails);
		});
	}


	function replaceAll1(string, find, replace) {
		return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
	}

	$scope.getbal = function()
	{
		var totUrl = $(location).attr('href');
		var newUrl = totUrl.substr(0, totUrl.lastIndexOf('/#/') + 1);
		var finalUrl = newUrl+"GetwalletBalance";

		$http({method:'get',url:finalUrl,headers:{'Content-Type': 'application/json'}}).success(function(data){
			var myEl = angular.element( document.querySelector( '#agentbal' ) );
			myEl.text(parseFloat(data.jsonResult.walletbal).toFixed(2)) ;			

		}).error(function(data, status, headers, config){ 
			//console.log(data);
		});
	}


//	description : Corporate Opening popup to add the notification

	$scope.corporateFlightBook = function(){
		$scope.timestamp = jQuery.now();
		$scope.items1 = $scope.bookingPreviewData;    	
		$scope.items2 = $scope.flightPassengerData();
		$scope.items3 =  $scope.sindex;
		$scope.items4 =  $scope.flightother();
		$scope.item5 =$scope.flightPassengerRmData();
				
		var modalInstance = $modal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'views/BookingPreview.jsp',
			controller: 'BookingPreviewCtrl',
			backdrop: 'static',
			keyboard: false,
			resolve: {
				items1: function () {
					return $scope.items1;
				},
				items2: function () {
					return $scope.items2;
				},
				items3: function(){
					return $scope.items3;
				},
				items4: function(){
					return $scope.items4;
				}
			}
		});

		modalInstance.result.then(function (selectedItem) {
			$scope.agentFlightBook();

		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});};

		$scope.addprice = function(passtype,obj){
			 
			var id = obj.id.substring(8);                	
			angular.element(document.getElementById(obj.id)).scope().addmealbaggageprice(passtype,obj.value,id,obj.options[obj.selectedIndex].getAttribute('itemprice'),obj.options[obj.selectedIndex].getAttribute('itemweight'));
		}

		$scope.AgentFlightCardBook = function(){
			$scope.items1 = $scope.bookingPreviewData;    	
			$scope.items2 = $scope.flightPassengerData();
			$scope.items3 =  $scope.sindex;
			$scope.items4 =  $scope.flightother();
			var modalInstance = $modal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'views/BookingPreview.jsp',
				controller: 'BookingPreviewCtrl',
				backdrop: 'static',
				keyboard: false,
				resolve: {
					items1: function () {
						return $scope.items1;
					},
					items2: function () {
						return $scope.items2;
					},
					items3: function(){
						return $scope.items3;
					},
					items4: function(){
						return $scope.items4;
					}
				}
			});

			modalInstance.result.then(function (selectedItem) {
				$scope.AgentFlightCardBooking();

			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}

		$scope.AgentFlightCardBooking = function(){
			$scope.ImageLoader = true;
			var userCardBook = $scope.flightPassengerData();
			flightServices.Flightbook(userCardBook).then(function(response){
				$scope.ImageLoader = false;				 
				data = response.data;
				$scope.fareflightsegment = data.fareFlightSegment;
				$scope.origin = data.fareFlightSegment.flightSegmentsGroups[0].flightSegments[0].segments[0].oriName;
				$scope.origincode = data.fareFlightSegment.flightSegmentsGroups[0].flightSegments[0].segments[0].ori;
				$scope.destcode = data.flightsearch.destination;
				$scope.dest = "";
				angular.forEach(data.fareFlightSegment.flightSegmentsGroups[0].flightSegments[0].segments, function(obj,index) { 
					if($scope.destcode == obj.dest)
					{
						$scope.dest = obj.destName;
					}				 
				});


				$scope.gstamount = 0.0;
				$scope.gstamount = (parseFloat(data.gstonMarkup) +  parseFloat(data.gstonFlights));

				$scope.adultarray = [];
				$scope.childarray = [];
				$scope.infantarray = [];

				angular.forEach(data.passengerFareBreakUps, function(obj,index) { 						 
					if(obj.type == "ADT")
					{
						$scope.adultarray.push(index);
						$scope.Adultprice =  parseFloat(obj.totalPrice);
						$scope.Adultbaseprice =  parseFloat(obj.basePrice);
						$scope.Adulttaxes =  parseFloat(obj.taxes);
					}
					if(obj.type == "INF")
					{
						$scope.infantarray.push(index);
						$scope.Infantprice =  parseFloat(obj.totalPrice);
						$scope.Infantbaseprice =  parseFloat(obj.basePrice);
						$scope.Infanttaxes =  parseFloat(obj.taxes);
					}
					if(obj.type == "CNN")
					{
						$scope.childarray.push(index);
						$scope.Childprice =  parseFloat(obj.totalPrice);
						$scope.Childbaseprice =  parseFloat(obj.basePrice);
						$scope.Childtaxes =  parseFloat(obj.taxes);
					}						 
				}); 				 

				if(data.fareFlightSegmentSpecial != null){
					$scope.fareFlightSegmentSpecial = data.fareFlightSegmentSpecial;
					var ticdate = new Date(data.lastTicketingDateSpecial);					
					$scope.returnlastticketdate = ("0" + ticdate.getDate()).slice(-2)+"/"+(("0" + (ticdate.getMonth() + 1)).slice(-2))+"/"+ticdate.getFullYear();
					$scope.returnbookingComments = data.bookingCommentsSpecial; 
					$scope.returnpnr = data.pnrSpecial;
					$scope.returnconfirmationNumber = data.confirmationNumberSpecial;

					angular.forEach(data.specialPassengerFareBreakUps, function(obj,index) { 

						if(obj.type == "ADT")
						{
							$scope.Adultprice +=  parseFloat(obj.totalPrice);
							$scope.Adultbaseprice +=  parseFloat(obj.basePrice);
							$scope.Adulttaxes +=  parseFloat(obj.taxes);
						}
						if(obj.type == "INF")
						{						
							$scope.Infantprice +=  parseFloat(obj.totalPrice);
							$scope.Infantbaseprice +=  parseFloat(obj.basePrice);
							$scope.Infanttaxes +=  parseFloat(obj.taxes);
						}
						if(obj.type == "CNN")
						{							
							$scope.Childprice +=  parseFloat(obj.totalPrice);
							$scope.Childbaseprice +=  parseFloat(obj.basePrice);
							$scope.Childtaxes +=  parseFloat(obj.taxes);
						}					 
					});

					$scope.gstamount += parseFloat(data.gstonMarkupSpecial);
					$scope.gstamount = parseFloat($scope.gstamount).toFixed(2);

				}

				$scope.totalprice = data.fareFlightSegment.totalPrice;

				var addpercent = ($scope.totalprice/parseFloat(100).toFixed(2)) * parseFloat(2.0).toFixed(2);			
				var addedpercent = addpercent.toFixed(2);

				$scope.otherchargesB2C = addedpercent;
				/*$scope.totalflightprice = (parseFloat($scope.totalprice) + parseFloat(addedpercent)).toFixed(2);*/
				$scope.totalflightprice =  parseFloat(Math.ceil($scope.totalprice)).toFixed(2);
				 
				$scope.bookingComments = data.bookingComments;
				$scope.confirmationNumber = data.pgID;
				$scope.customername = data.flightCustomerDetails.passengerdetailsList[0].firstName+data.flightCustomerDetails.passengerdetailsList[0].lastName;
				$scope.customerno =data.flightCustomerDetails.mobile;
				$scope.customeremail = data.flightCustomerDetails.email;		
				$scope.pnr =data.pnr;
				$("#reference_no").val($scope.confirmationNumber);
				$("#totalamt").val($scope.totalflightprice);
				$("#customername").val($scope.customername);
				$("#customeremail").val($scope.customeremail);
				$("#customerno").val($scope.customerno);
				$("#ship_name").val($scope.customername);
				$("#ship_phone").val($scope.customerno);
				$scope.classname = "tayyarah-"+data.flightsearch.currency;     
				$scope.adult =  $scope.adultarray.length;
				$scope.child =  $scope.childarray.length;
				$scope.infant =  $scope.infantarray.length;
				$scope.Adulttotalprice =  $scope.Adultprice; 
				$scope.Infanttotalprice =  $scope.Infantprice ;
				$scope.Childtotalprice =  $scope.Childprice ;
				$scope.Adulttotalbaseprice =  $scope.Adultbaseprice; 
				$scope.Infanttotalbaseprice =  $scope.Infantbaseprice; 
				$scope.Childtotalbaseprice = $scope.Childbaseprice;
				$scope.Adulttotaltaxes =  $scope.Adulttaxes ;
				$scope.Infanttotaltaxes = $scope.Infanttaxes;
				$scope.Childtotaltaxes =  $scope.Childtaxes;	 	
				

				angular.forEach(data.flightCustomerDetails.passengerdetailsList, function(obj,index) {					

					var serialno = index + 1;
					var gender = '';
					if(obj.title == 'M')
						gender = 'Male';
					else
						gender = 'Female';

					var dd = new Date(obj.birthday);			
					var birthday =   pad(dd.getDate()+ "/" + pad((dd.getMonth() + 1)) + "/"  + dd.getFullYear() ) ;
					var firsname = replaceAll1(decodeURIComponent(obj.firstName),'+',' '); 
					var lastname = replaceAll1(decodeURIComponent(obj.lastName),'+',' ');  

					var passdetail = "";

					if(obj.passengerTypeCode == "INF"){
						passdetail =  "<tr><th scope='row'>"+serialno+"</th><td>"+obj.passengerTypeCode+"</td><td>"+firsname+"</td><td>"+lastname+"</td><td>"+gender+"</td><td>"+birthday+"</td></tr>";		
					}else{
						passdetail =  "<tr><th scope='row'>"+serialno+"</th><td>"+obj.passengerTypeCode+"</td><td>"+firsname+"</td><td>"+lastname+"</td><td>"+gender+"</td></tr>";		
					}


					var myElpassdetails = angular.element( document.querySelector( '#passdetails' ) );					
					myElpassdetails.append(passdetail);

				});		 	
				$scope.usetip = "Use this Payment gateway id " + $scope.confirmationNumber  + " Booking Amount is " +$scope.totalflightprice
				//console.log("$scope.usetip",$scope.usetip)
				$scope.resultset = true;
				$scope.bookconfirmloader = false;
				$scope.errordiv = false;
				if($scope.isCor =='true'){
					var rmUserDetails=$scope.flightPassengerRmData();
					flightServices.FlightRmbook(rmUserDetails).then(function(response){
						if($scope.resultset)
						{
							var frm = $window.document.getElementById("frmTransaction");
							//console.log('frmT',frm);
							frm.submit();
						}
					});
				}else{
					if($scope.resultset)
					{
						var frm = $window.document.getElementById("frmTransaction");
	 
						frm.submit();
					}
				}
				
				
				
			},function(errorStatus){
				$scope.httpvalue = errorStatus.httpStatus;				
				if($scope.httpvalue == '500')
					$scope.errormeg = "We could not find any flight matching your requirements, Try Again.";
				else
					$scope.errormeg = "Sorry we could not process your request as server is busy. please try after some time.";
				$scope.errordiv = true;
				$scope.errorDisplay($scope.errormeg,$scope.ErrorFlightTravelDetails);
			});

		}

		$scope.returnIndex = function(){
			window.location.href = window.location.href.replace(/#.*$/, '');
		}


		$scope.userBookingPreview = function(){
			$scope.items1 = $scope.bookingPreviewData;    	
			$scope.items2 = $scope.flightPassengerData();
			$scope.items3 =  $scope.sindex;
			$scope.items4 =  $scope.flightother();
			var modalInstance = $modal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'views/BookingPreview.jsp',
				controller: 'BookingPreviewCtrl',
				backdrop: 'static',
				keyboard: false,
				resolve: {
					items1: function () {
						return $scope.items1;
					},
					items2: function () {
						return $scope.items2;
					},
					items3: function(){
						return $scope.items3;
					},
					items4: function(){
						return $scope.items4;
					}
				}
			});

			modalInstance.result.then(function (selectedItem) {
				$scope.UserFlightBook();

			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});


		}

		$scope.insufficientFundopen = function(){
			$(document).ready(function() {var modalInstance = $modal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'views/InsufficientFund.jsp',
				controller: 'InsufficientFundCtrl',
				backdrop: 'static',
				keyboard: false,
				resolve: {
					items: function () {
						return $scope.items;
					}
				}
			});

			modalInstance.result.then(function (selectedItem) {
				$scope.agentFlightBook();

			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
			});
		}

		$scope.getCompanyEn =function(){
			transporter.getcompanyentity().then(function(response){
				 $scope.CompanyEn=response.data.jsonResult.companyEntities;
				// console.log('companyDetails',$scope.CompanyEn);
			});
		} 
		
	/*	$scope.getRmFields = function(){
			transporter.getrmdetail().then(function(response){
				$scope.rmData = response.data;
				console.log('$scope.rmData',$scope.rmData);
				var RmData = $scope.rmData.rmConfigModel;
				$scope.approverName = false;	$scope.billNonBill = false;	$scope.bussinessUnit = false;
				$scope.costCenter = false;	$scope.department = false;	$scope.empCode = false;
				$scope.projectCode = false;	$scope.location = false;	$scope.reasonForTravel = false;
				$scope.trNumber = false;
				if(RmData){
					$scope.isRmDetails = "true";
					if(RmData.approverName == true){ $scope.approverName = true; }
					if(RmData.billNonBill == true){ $scope.billNonBill = true; }
					if(RmData.bussinessUnit == true){ $scope.bussinessUnit = true; }
					if(RmData.costCenter == true){ $scope.costCenter = true; }
					if(RmData.department == true){ $scope.department = true; }
					if(RmData.empCode == true){ $scope.empCode = true; }
					if(RmData.projectCode == true){ $scope.projectCode = true; }
					if(RmData.location == true){ $scope.location = true; }
					if(RmData.reasonForTravel == true){ $scope.reasonForTravel = true; }
					if(RmData.trNumber == true){ $scope.trNumber = true; }

				}
				$scope.ManulaFieldList = $scope.rmData.fieldName;
			});
		};*/

		$scope.fareChangeModalAlert = function(old,newPrice){
			$(document).ready(function() {var modalInstance = $modal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'views/fareChangeModal.jsp',
				controller: 'fareChangeModalCtrl',
				backdrop: 'static',
				keyboard: false,
				resolve: {
					items1: function () {
						return old;
					},
					items2: function () {
						return newPrice;
					}
				}
			});

			modalInstance.result.then(function (selectedItem) {


			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
			});
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
				$route.reload();
				
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
	 

 	 $scope.calculateAge = function(birthday) {
 		   var ageDifMs = Date.now() - birthday.getTime();
 		    var ageDate = new Date(ageDifMs); // miliseconds from epoch
 		    return Math.abs(ageDate.getUTCFullYear() - 1970);			    
			}; 
	 
		 
		 
		 $scope.dayCalculation = function(){
			 var arrivalDate = $scope.convertDate($location.search().arrival);
			 var departDate = $scope.convertDate($location.search().depart);
		 
			var Dayys =  $scope.daydiff($scope.parseDate(departDate), $scope.parseDate(arrivalDate)) 
		    
			return  Dayys;
			 
		 }
		 $scope.convertDate = function(usDate) {
			  var dateParts = usDate.split(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
			  return dateParts[3] + "-" + dateParts[2] + "-" + dateParts[1];
			}
		 
		  $scope.parseDate = function(str) {
			    var mdy = str.split('-');
			    return new Date(mdy[0], mdy[1]-1, mdy[2]);
			}
		  $scope.parseAgeDate = function(str){
			  var mdy = str.split('-');			
			    return new Date(mdy[2], mdy[1]-1, mdy[0]);  
		  }

			 $scope.daydiff= function(first, second) {
			    return (second-first)/(1000*60*60*24);
			}
		 
		$scope.checkAdultAge = function(elem,inx) {
				  var birthdate = angular.element('#Adultdate'+inx).val();
				   if(birthdate){
				    if (elem.$index == inx && elem.insuranceType == "Other") {	
				    	 $('#AdultNominees'+inx).removeClass('displayNone').addClass('displayTab');
				    } else {
				    	$('#AdultNominees'+inx).removeClass('displayTab').addClass('displayNone');
				     } 
				    	
				    }else{
				    	alert("Please select Age");
				    }
				    				   
				};
		$scope.checkChildAge = function(elem,inx) {	
		    var chBirthdate = angular.element('#childdate'+inx).val();
		    if(chBirthdate){ 
			 if (elem.$index == inx && elem.chinsuranceType == "Other") {				         
		    	$('#ChildNominees'+inx).removeClass('displayNone').addClass('displayTab');
		    } else {				       
		    	$('#ChildNominees'+inx).removeClass('displayTab').addClass('displayNone');
		    } 
		    
		    }else{
		    	alert("Please select Age");
		    }
		};
		
		
		
		$scope.checkInfantAge = function(elem,inx) {	
		    var InfantBirthdate = angular.element('#infantdate'+inx).val();	    
		    if(InfantBirthdate){ 	 
			 if (elem.$index == inx && elem.InfantInsuranceType == "Other") {       
		    	$('#InfantNominees'+inx).removeClass('displayNone').addClass('displayTab');
		    } else {				       
		    	$('#InfantNominees'+inx).removeClass('displayTab').addClass('displayNone');
		    	
		    }
			}else{
			    	alert("Please select Age");
			    }
		};
		
		
		
		$scope.InsurancecallApi = function(indx){
			 $("#Adultdate"+indx).on("dp.change", function(e) {
				if($scope.Isinsurance != undefined && $scope.Isinsurance ==true){
				 $scope.CallApi("Adult",indx);
				  }
				 $('#insurance-'+indx).focus();
			 });
		}
		$scope.InsuranceChildcallApi = function(indx){
			 $("#childdate"+indx).on("dp.change", function(e) {
				if($scope.Isinsurance != undefined && $scope.Isinsurance ==true){
					 $scope.CallApi("Child",indx);
				 }
				$('#chinsurance-'+indx).focus(); 
			 });
		}
		$scope.InsuranceInfantcallApi = function(indx){
			 $("#infantdate"+indx).on("dp.change", function(e) {				  
				  if($scope.Isinsurance != undefined && $scope.Isinsurance ==true){
				  $scope.CallApi("Infant",indx);
			  }				  
				  $('#InfantInsurance-'+indx).focus(); 
			 });
		}
		
		
	   
		 $scope.CallApi = function(person,indx){
			 var birthdate = "";
			 if(person == "Adult"){
				 birthdate = angular.element('#Adultdate'+indx).val();	
			 }else if(person == "Child"){
				 birthdate = angular.element('#childdate'+indx).val();	
			 }else if(person == "Infant"){
				 birthdate = angular.element('#infantdate'+indx).val();	
			 }			  		  
			  var originbefore = $location.search().ori;            
	          var destbefore = $location.search().des;            
	          var orifirstindex =originbefore.indexOf(',') + 1;
	          var orilastindex = originbefore.lastIndexOf(',');         
	          var desfirstindex = destbefore.indexOf(',') + 1;
	          var deslastindex = destbefore.lastIndexOf(',');
	          $scope.insuranceApiDetails.app_key = $location.search().ay;	          
	          if($scope.dayCalculation()){
	            $scope.insuranceApiDetails.noOfDays =  $scope.dayCalculation(); 
	          }else{
	            $scope.insuranceApiDetails.noOfDays =  1;
	          }	                 
	          $scope.insuranceApiDetails.age =  $scope.calculateAge($scope.parseAgeDate(birthdate));
	          $scope.insuranceApiDetails.oriCountry = originbefore.substring(orifirstindex, orilastindex);
	          $scope.insuranceApiDetails.destCountry = destbefore.substring(desfirstindex, deslastindex);
	          if($scope.insuranceApiDetails.oriCountry == "India" &&  $scope.insuranceApiDetails.destCountry != "India"){
	              $scope.InsurancePlanCall($scope.insuranceApiDetails,indx,person);
	               } 
	           
		 }
		 var adultMap = new Map();
		 var childMap = new Map();
		 var InfantMap = new Map();
		 $scope.MapObject = {};
		 $scope.Insprice = 0;	 
		 $scope.AdultTotal=0;	 $scope.ChildTotal=0;	 $scope.InfantTotal=0; 
		 var ValeArray = [];
		
			$scope.InsurancePlanCall = function(planData,index,person){		
						
				 var price = 0;
				 flightServices.insurancePolicyDetails(planData).then(function(response){
					 
					 price = response.data.insuranceAmt;					
					 $scope.insurancePerPassenger =  response.data.insuranceAmt;
					 $scope.internationalPlanId = response.data.planId;
					 $scope.insurancePlanEmbedding = response.data.planId;
					 $scope.Intenational_Isinsurance = response.data.isPolicyAvaiable;
				 $scope.PriceCallMethod(price,index,person);
				 		}); 
			}
			
			$scope.price = 0;
			$scope.PriceCallMethod = function(price,index,person){
				 
				$scope.price = price;
				 if(person =="Adult"){
						adultMap.set(index,$scope.price)
					 }		 
				  if(person =="Child"){
					  childMap.set(index,$scope.price)
					 }		 
				  if(person =="Infant"){
					  InfantMap.set(index,$scope.price)
					 }
				 
				  $scope.MapObject.adult = adultMap;
				  $scope.MapObject.child = childMap;
				  $scope.MapObject.infant = InfantMap;				 
				  var AdultTotal1=0;
				  var ChildTotal1=0;
				  var InfantTotal1=0;
				  adultMap.forEach(function(value,key) {	
					  AdultTotal1=AdultTotal1+value;				 
					});
				  childMap.forEach(function(value,key) {
					  ChildTotal1=ChildTotal1+value;
					});
				  InfantMap.forEach(function(value, key) {						   
					  InfantTotal1=InfantTotal1+value;	
					});
			 
			 
			 var InsuranceTotal = AdultTotal1 + ChildTotal1 + InfantTotal1;
			 $scope.insuranceprice = InsuranceTotal;
			  var totalFlight = $('#totalInsuranceFare').val();
              var totalPayable = $('#totalInsurancePayable').val();
              $scope.totalflightprice =  parseFloat(parseFloat(totalFlight) + parseFloat(InsuranceTotal)).toFixed(2);
 			 $scope.totalpayableamt =parseFloat(parseFloat(totalPayable) + parseFloat(InsuranceTotal)).toFixed(2);		 
			}
	/*$scope.insurancePage = function(){
		var url = "#/InsuranceDetails";
		 window.open(url, '_blank');
	}*/
			
				
	 $scope.InsproductBenefits = function(){		
				$(document).ready(function(){
					var modalInstance = $modal.open({
						animation: $scope.animationsEnabled,
						templateUrl: 'views/InsuranceProductBenefits.jsp',
						controller:'InsuranceProductCtrl',
						backdrop:'static',
						keyboard:false,
						resolve:{
							items: function () {
								return $scope.insurancePlanEmbedding;
							}
							 
						}});
					modalInstance.result.then(function(selectedItem){
						
					},function(){
						$log.info('modal Dismissed at :'+new Date());
					});

				});
		 
	 }
     $scope.insurancePage = function(){
    	 $(document).ready(function(){
				var modalInstance = $modal.open({
					animation: $scope.animationsEnabled,
					templateUrl: 'views/InsuranceTermsDetails.jsp',
					controller:'InsuranceTermsCtrl',
					backdrop:'static',
					keyboard:false,
					resolve:{
						items: function () {
							return $scope.insurancePlanEmbedding;
						}
					}});
				modalInstance.result.then(function(selectedItem){
					
				},function(){
					$log.info('modal Dismissed at :'+new Date());
				});

			});
				 
      }	
     $scope.rmDetailsList = [];
	  $scope.getRmdetails = function(index,employid){
		
		 var rowID = index;
		 var empid = employid;
		 $scope.empCode = false;	$scope.department = false;	$scope.costCenter = false; 	$scope.apprName = false;
		 $scope.location = false;    $scope.trNumber = false; 	$scope.bussinessUnit = false;	$scope.projectCode = false;
		 $scope.reasonForTravel = false; 	$scope.billNonBill = false;
			 flightServices.getRmDetailFields(empid).then(function(response){
			// $http.get('rmfields.json').then(function(response){				
				 $('#rmDetailsExists-'+rowID).show();				 
			 $scope.rmDetails = response.data;
			
			  if($scope.rmDetails.rmDetailsSet == "true" || $scope.rmDetails.rmDetailsSet == true){
				  if($scope.rmDetails.rmDataListDetails.empCode ||$scope.rmDetails.rmDataListDetails.empCode != null ){
					  $scope.empCode = true;
					  $scope.employeeCode = $scope.rmDetails.rmDataListDetails.empCode;
				  }
				  if($scope.rmDetails.rmDataListDetails.department ||$scope.rmDetails.rmDataListDetails.department != null ){
					  $scope.department = true;
					  $scope.departmentModel = $scope.rmDetails.rmDataListDetails.department;
				  }
				  if($scope.rmDetails.rmDataListDetails.costCenter ||$scope.rmDetails.rmDataListDetails.costCenter != null ){
					  $scope.costCenter = true;
					  $scope.costCenterModel = $scope.rmDetails.rmDataListDetails.costCenter;
				  }
				  if($scope.rmDetails.rmDataListDetails.approverName ||$scope.rmDetails.rmDataListDetails.approverName != null ){
					  $scope.apprName = true;
					  $scope.approverName = $scope.rmDetails.rmDataListDetails.approverName;
				  }
				  if($scope.rmDetails.rmDataListDetails.location ||$scope.rmDetails.rmDataListDetails.location != null ){
					  $scope.location = true;
					  $scope.locationModel = $scope.rmDetails.rmDataListDetails.location;
				  }
				  if($scope.rmDetails.rmDataListDetails.trNumber ||$scope.rmDetails.rmDataListDetails.trNumber != null ){
					  $scope.trNumber = true;
					  $scope.trNumberModel = $scope.rmDetails.rmDataListDetails.trNumber;
				  }
				  if($scope.rmDetails.rmDataListDetails.bussinessUnit ||$scope.rmDetails.rmDataListDetails.bussinessUnit != null ){
					  $scope.bussinessUnit = true;
					  $scope.bussinessUnitModel = $scope.rmDetails.rmDataListDetails.bussinessUnit;
				  }
				  if($scope.rmDetails.rmDataListDetails.projectCode ||$scope.rmDetails.rmDataListDetails.projectCode != null ){
					  $scope.projectCode = true;
					  $scope.projectCodeModel = $scope.rmDetails.rmDataListDetails.projectCode;
				  }
				  if($scope.rmDetails.rmDataListDetails.reasonForTravel ||$scope.rmDetails.rmDataListDetails.reasonForTravel != null ){
					  $scope.reasonForTravel = true;
					  $scope.reasonForTravelModel = $scope.rmDetails.rmDataListDetails.reasonForTravel;
				  }
				  if($scope.rmDetails.rmDataListDetails.billNonBill ||$scope.rmDetails.rmDataListDetails.billNonBill != null ){
					  $scope.billNonBill = true;
					  $scope.billNonBillModel = $scope.rmDetails.rmDataListDetails.billNonBill;
				  }
				  
				  if($scope.rmDetails.rmDataListDetails.manualFields.length != 0){
					  $scope.dynamicFields = $scope.rmDetails.rmDataListDetails.manualFields;					  
				  }				  
			  }
	 
			 }); 
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
