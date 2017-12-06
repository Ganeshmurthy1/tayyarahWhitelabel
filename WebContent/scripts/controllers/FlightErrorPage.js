
var app = angular.module('myApp');
app.controller('FlightErrorPageCtrl',['$scope','$http','commonService','limitToFilter','$modalInstance','$log','$location','items','items2','$route','localStorageService', function ($scope,$http,commonService,limitToFilter,$modalInstance,$log,$location,items,items2,$route,localStorageService) {
$scope.init = function(){
	
	$scope.apiUrl = commonService.baseUrl;
	
	$scope.user = {};
	$scope.showData = true;
	
    if(items !=undefined || item == null){
    	$scope.Message = items;	
    }else{
    	$scope.Message = "Details missed,please try agian Modified Search";
    }
	$scope.getAllParams = $scope.getUrlParams();
	
	$scope.origin = $scope.getAllParams.origin;
	$scope.destination = $scope.getAllParams.destination;	 
	$scope.user.originall = $scope.getAllParams.origin;
	$scope.user.destinationall = $scope.getAllParams.destination;
	$scope.departureFrom = $scope.getAllParams.depDate;
	$scope.arrivalTo = $scope.getAllParams.arvlDate;
	$scope.depDate = $scope.getAllParams.depDate;
	$scope.arvlDate = $scope.getAllParams.arvlDate;
	$scope.TripT=$scope.getAllParams.triptype;
	$scope.madt=$scope.getAllParams.adt;
	$scope.mkid=$scope.getAllParams.kid;
	$scope.minf=$scope.getAllParams.inf;
	if( items2.arvlDate != ''){
		$scope.CustomParam = "Arrival Date";
		$scope.CustomParamValue = $scope.getAllParams.arvlDate;
	}else{
		$scope.CustomParam = "Class";
		$scope.CustomParamValue = $scope.getAllParams.cabinClass
	}
	
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
	$scope.Theme = $location.search().thm;
}

$scope.getUrlParams = function(){

	var UrlParam = {};
	UrlParam.origin = $location.search().ori;
	UrlParam.destination = $location.search().des;
	UrlParam.depDate = $location.search().depart;
	UrlParam.arvlDate = $location.search().arrival;
	UrlParam.triptype = $location.search().tty;	
	UrlParam.adt = $location.search().ad;
	UrlParam.kid = $location.search().chd;	
	UrlParam.inf = $location.search().inf;
	UrlParam.thm= $location.search().thm;


	return UrlParam;
}


/**
 *Description: To Load the Cities in index page.
 **/
$scope.cities = function(cityName) {
	var cityarr = [];

	return $http.get($scope.apiUrl + "Search/bycity/" + cityName).then(function(response) {

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
	var fromDate=angular.element('#twoEdpd1').val();
	
	if ($scope.user.destinationall != undefined) {
		angular.element(document.querySelector('#twoEdpd1')).focus();
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
var urlValues = '';
$scope.errorflightsearch = function(){
	localStorageService.remove('UrlParameters');
	var origin = $scope.user.originall;
	var destination = $scope.user.destinationall;
	var isDynamicmarkup = false;
	var markupAmount = 0;
	var searchkey = '';
	var adult = angular.element('#adultEid').text();
	var kid = angular.element('#kidEid').text();
	var infant = angular.element('#infantEid').text();
	var agentapp_key = angular.element('#ay').val();
	if(agentapp_key ==undefined ||agentapp_key== null)
		var app_key = angular.element('#oky').val();
	else
		var app_key=agentapp_key;
	var currency = angular.element('#onecurrencyname').val();
	var cabinClass = 'All';		
	var newAirline = angular.element('#onewayairline').val();
	var triptype = angular.element('#triptypeEselect').val();
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


	/**
	 *Description: condition check for oneway,roundtrip and specialround trip.
	 **/
	if(triptype == "O"){

		var deptDate = $("#twoEdpd1").val();
		var arrivalDate = $("#twoEdpd2").val();
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

			var onewayErrUrl = ('/Flights-oneway-'+$scope.Theme+'?ori='+encodeURIComponent(origin)+'&des='+encodeURIComponent(destination)+'&depart='+encodeURIComponent(deptDate)+'&arrival='+encodeURIComponent(arrivalDate)
					+'&class='+encodeURIComponent(cabinClass)+'&ccy='+currency+'&isDom='+isDomestic+'&isDyn='+isDynamicmarkup+'&marAt='+encodeURIComponent(markupAmount)+'&tty='+encodeURIComponent(triptype)
					+'&ay='+encodeURIComponent(app_key)+'&sky='+encodeURIComponent(searchkey)+'&adt='+adult+'&kid='+kid+'&inf='+infant+'&airline='+airline+'&thm='+$scope.Theme);
			//localStorageService.set('UrlParameters',onewayErrUrl);
			$location.url(onewayErrUrl);
		}
	}
	else if(triptype == "R"){
		trips = '2';		
		var deptDate = $("#twoEdpd1").val();
		var arrivalDate = $("#twoEdpd2").val();
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

				var DomEurl = ('/Flights-Domestic-'+$scope.Theme+'?ori='+encodeURIComponent(origin)+'&des='+encodeURIComponent(destination)+'&depart='+encodeURIComponent(deptDate)+'&arrival='+encodeURIComponent(arrivalDate)
						+'&class='+encodeURIComponent(cabinClass)+'&ccy='+currency+'&isDom='+isDomestic+'&isDyn='+isDynamicmarkup+'&marAt='+encodeURIComponent(markupAmount)+'&tty='+encodeURIComponent(triptype)
						+'&ay='+encodeURIComponent(app_key)+'&sky='+encodeURIComponent(searchkey)+'&adt='+adult+'&kid='+kid+'&inf='+infant+'&airline='+airline+'&thm='+$scope.Theme);

				//localStorageService.set('UrlParameters',DomEurl);
				$location.url(DomEurl);
			}else{

				var internalEUrl = ('/Flights-International-'+$scope.Theme+'?ori='+encodeURIComponent(origin)+'&des='+encodeURIComponent(destination)+'&depart='+encodeURIComponent(deptDate)+'&arrival='+encodeURIComponent(arrivalDate)
						+'&class='+encodeURIComponent(cabinClass)+'&ccy='+currency+'&isDom='+isDomestic+'&isDyn='+isDynamicmarkup+'&marAt='+encodeURIComponent(markupAmount)+'&tty='+encodeURIComponent(triptype)
						+'&ay='+encodeURIComponent(app_key)+'&sky='+encodeURIComponent(searchkey)+'&adt='+adult+'&kid='+kid+'&inf='+infant+'&airline='+airline+'&thm='+$scope.Theme);
				
				//localStorageService.set('UrlParameters',internalEUrl);
				$location.url(internalEUrl);
				}
		} 

	}	
	else if(triptype == "SR"){
		trips = '2';		
		var deptDate = $("#twoEdpd1").val();
		var arrivalDate = $("#twoEdpd2").val();
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
				var DomEUrl = ('/Flights-Domestic-'+$scope.Theme+'?ori='+encodeURIComponent(origin)+'&des='+encodeURIComponent(destination)+'&depart='+encodeURIComponent(deptDate)+'&arrival='+encodeURIComponent(arrivalDate)
						+'&class='+encodeURIComponent(cabinClass)+'&ccy='+currency+'&isDom='+isDomestic+'&isDyn='+isDynamicmarkup+'&marAt='+encodeURIComponent(markupAmount)+'&tty='+encodeURIComponent(triptype)
						+'&ay='+encodeURIComponent(app_key)+'&sky='+encodeURIComponent(searchkey)+'&adt='+adult+'&kid='+kid+'&inf='+infant+'&airline='+airline+'&thm='+$scope.Theme);
			//	localStorageService.set('UrlParameters',DomEUrl);
				$location.url(DomEUrl);

			}else{

				var internalEUrl = ('/Flights-International-'+$scope.Theme+'?ori='+encodeURIComponent(origin)+'&des='+encodeURIComponent(destination)+'&depart='+encodeURIComponent(deptDate)+'&arrival='+encodeURIComponent(arrivalDate)
						+'&class='+encodeURIComponent(cabinClass)+'&ccy='+currency+'&isDom='+isDomestic+'&isDyn='+isDynamicmarkup+'&marAt='+encodeURIComponent(markupAmount)+'&tty='+encodeURIComponent(triptype)
						+'&ay='+encodeURIComponent(app_key)+'&sky='+encodeURIComponent(searchkey)+'&adt='+adult+'&kid='+kid+'&inf='+infant+'&airline='+airline+'&thm='+$scope.Theme);
				//localStorageService.set('UrlParameters',internalEUrl);
				$location.url(internalEUrl);
			}
		} 

	}
	 $modalInstance.dismiss('');
};


$scope.research = function(){
	//$modalInstance.close('ok');
	$scope.onewayResearch();
	 $modalInstance.dismiss('');
	
}





$scope.onewayResearch = function(){
	var thm=$scope.getAllParams.thm;
	var origin = $scope.getAllParams.origin;
	var destination = $scope.getAllParams.destination;	
	var isDynamicmarkup = false;
	var markupAmount = 0;
	var searchkey = '';
	var adult = $scope.getAllParams.adt;
	var kid = $scope.getAllParams.kid;
	var infant =$scope.getAllParams.inf;
	
	var deptDate=$scope.getAllParams.depDate;
	var arrivalDate=$scope.getAllParams.arvlDate;
	var agentapp_key = angular.element('#eray').val();	
	var app_key  = '';	
	if(agentapp_key ==undefined ||agentapp_key== null){
		app_key = angular.element('#eroky').val();
			
	}
	else
		app_key= agentapp_key;
	var currency = angular.element('#eronecurrencyname').val();
	var cabinClass = "all";		
	var triptype = $scope.getAllParams.triptype;
	var trips = '1';
	var airline = '';
	var isDomestic = false;
	// Set Origin Country	 	
	var orifirstindex = origin.indexOf(',') + 1;
	var orilastindex = origin.lastIndexOf(',');	
	var originCountry = origin.substring(orifirstindex, orilastindex);		

	// Set Destination Country 	
	var desfirstindex = destination.indexOf(',') + 1;
	var deslastindex = destination.lastIndexOf(',');		
	var destinationCountry = destination.substring(desfirstindex, deslastindex);
	//domestic check code
	if (originCountry == "India" && destinationCountry == "India")
		isDomestic = true;


	/**
	 *Description: condition check for oneway,roundtrip and specialround trip.
	 **/
	if(triptype == "O"){
		trips = '1';
		var oneWayUrl = ('/Flights-oneway-'+thm+'?ori='+encodeURIComponent(origin)+'&des='+encodeURIComponent(destination)+'&depart='+encodeURIComponent(deptDate)+'&arrival='+encodeURIComponent(arrivalDate)
				+'&class='+encodeURIComponent(cabinClass)+'&ccy='+currency+'&isDom='+isDomestic+'&isDyn='+isDynamicmarkup+'&marAt='+encodeURIComponent(markupAmount)+'&tty='+encodeURIComponent(triptype)
				+'&ay='+encodeURIComponent(app_key)+'&sky='+encodeURIComponent(searchkey)+'&adt='+adult+'&kid='+kid+'&inf='+infant+'&airline='+airline+'&thm='+thm);
	
	localStorageService.set('UrlParameters',oneWayUrl);
	$location.url(oneWayUrl);
	}
	else if(triptype == "R"){
		trips = '2';	
		if(originCountry == "India" && destinationCountry == "India"){
			var twoWayUrl = ('/Flights-Domestic-'+thm+'?ori='+encodeURIComponent(origin)+'&des='+encodeURIComponent(destination)+'&depart='+encodeURIComponent(deptDate)+'&arrival='+encodeURIComponent(arrivalDate)
					+'&class='+encodeURIComponent(cabinClass)+'&ccy='+currency+'&isDom='+isDomestic+'&isDyn='+isDynamicmarkup+'&marAt='+encodeURIComponent(markupAmount)+'&tty='+encodeURIComponent(triptype)
					+'&ay='+encodeURIComponent(app_key)+'&sky='+encodeURIComponent(searchkey)+'&adt='+adult+'&kid='+kid+'&inf='+infant+'&airline='+airline+'&thm='+thm);
			
			localStorageService.set('UrlParameters',twoWayUrl);
			$location.url(twoWayUrl);

		}else{
			var international = ('/Flights-International-'+thm+'?ori='+encodeURIComponent(origin)+'&des='+encodeURIComponent(destination)+'&depart='+encodeURIComponent(deptDate)+'&arrival='+encodeURIComponent(arrivalDate)
					+'&class='+encodeURIComponent(cabinClass)+'&ccy='+currency+'&isDom='+isDomestic+'&isDyn='+isDynamicmarkup+'&marAt='+encodeURIComponent(markupAmount)+'&tty='+encodeURIComponent(triptype)
					+'&ay='+encodeURIComponent(app_key)+'&sky='+encodeURIComponent(searchkey)+'&adt='+adult+'&kid='+kid+'&inf='+infant+'&airline='+airline+'&thm='+thm);

			localStorageService.set('UrlParameters',international);
			$location.url(international);
		}
	}
	else if(triptype == "SR"){
		trips = '2';
		if(originCountry == "India" && destinationCountry == "India"){

			$location.url('/Flights-Domestic-'+thm+'?ori='+encodeURIComponent(origin)+'&des='+encodeURIComponent(destination)+'&depart='+encodeURIComponent(deptDate)+'&arrival='+encodeURIComponent(arrivalDate)
					+'&class='+encodeURIComponent(cabinClass)+'&ccy='+currency+'&isDom='+isDomestic+'&isDyn='+isDynamicmarkup+'&marAt='+encodeURIComponent(markupAmount)+'&tty='+encodeURIComponent(triptype)
					+'&ay='+encodeURIComponent(app_key)+'&sky='+encodeURIComponent(searchkey)+'&adt='+adult+'&kid='+kid+'&inf='+infant+'&airline='+airline+'&thm='+thm);


		}else{

		var specialSearch = ('/Flights-International-'+thm+'?ori='+encodeURIComponent(origin)+'&des='+encodeURIComponent(destination)+'&depart='+encodeURIComponent(deptDate)+'&arrival='+encodeURIComponent(arrivalDate)
					+'&class='+encodeURIComponent(cabinClass)+'&ccy='+currency+'&isDom='+isDomestic+'&isDyn='+isDynamicmarkup+'&marAt='+encodeURIComponent(markupAmount)+'&tty='+encodeURIComponent(triptype)
					+'&ay='+encodeURIComponent(app_key)+'&sky='+encodeURIComponent(searchkey)+'&adt='+adult+'&kid='+kid+'&inf='+infant+'&airline='+airline+'&thm='+thm);
		localStorageService.set('UrlParameters',specialSearch);
		$location.url(specialSearch);
		}
		
	}
}
$scope.close = function () {
	    $modalInstance.dismiss('');
	    window.location.href = window.location.href.replace(/#.*$/, '');
		
	};
$scope.init();
}]);
