/**
 *Author : Prabhakaran
 *Description: hotel index page code redefined and listed the functionality.
 **/

var app = angular.module('myApp');
app.controller('HotelindexCtrl',['$scope','$http','hotelServices','$location','localStorageService','commonService', function($scope,$http,hotelServices,$location,localStorageService,commonService) {
	
	$scope.init = function(){
		$scope.user = {};
		localStorageService.remove('hotelData');	
		$(function() {
			var citylist = [];
			$scope.loadstations();
		});
		localStorageService.remove('hotelUrlParameters');
		localStorageService.remove('HotelErrordata');
	};
	
	/*Url menulist*/
	$scope.FlightMenu = function(){ 	$location.path('/');        }
	$scope.HotelMenu = function(){		$location.path('/hotel');	}
	$scope.BusMenu = function(){		$location.path('/bus');  	}
	$scope.CarMenu = function(){		$location.path('/cars');	}
	
	/*calling Hotelcity local json and api for hotel city loading*/
	
	$scope.loadstations = function()
	{ 
		var localcitydata=[];
		/*calling local json*/
		$http.get('hotel-city.json').then(function(response){
			citydata=response.data;
			citylist = [];
			citymap = [];
			angular.forEach(citydata.areas, function( value, i) {  
				citylist.push(value.name); 
				citymap[value.name] = value.id;
			});
			
			/*autocomplete with  regular expression*/
			$("#hotelcity").autocomplete({
				source: function( request, response ) {
					var matcher = new RegExp( $.ui.autocomplete.escapeRegex( request.term ), "gi" );
					response( $.grep( citylist, function( item ){				
						var itemavailavle = item;					
						return matcher.test( item );
					}).slice(0, 15) );
				},
				select: function (event, ui) {				
					var label = ui.item.label;
					var value = ui.item.value;					
					var citycode = citymap[ui.item.value];
					$('#datain').focus();
					$('#citycode').val(citycode);
				}
			});  		
		},function(errorStatus){
			/*calling hotelcity api*/
			hotelServices.searchCity("").then(function(res){
				citylist = [];
				citymap = [];
				angular.forEach(res.data.areas, function( val, i) {  
					citylist.push(val.name); 
					citymap[val.name] = val.id;
				});
				/*autocomplete with  regular expression*/
				$("#hotelcity").autocomplete({
					source: function( request, response ) {
						var matcher = new RegExp( $.ui.autocomplete.escapeRegex( request.term ), "gi" );
						response( $.grep( citylist, function( item ){				
							var itemavailavle = item;					
							return matcher.test( item );
						}).slice(0, 15) );
					},
					select: function (event, ui) {				
						var label = ui.item.label;
						var value = ui.item.value;					
						var citycode = citymap[ui.item.value];
						$('#datain').focus();
						$('#citycode').val(citycode);
					}
				});  		
			
			})
		});
	}
	
	/*Finding Hotel function*/
	
	$scope.SearchHotels = function(){	
		/*Fetching req input values*/
		var citycode = angular.element('#citycode').val();
		var startDate = angular.element('#datain').val();		
		var EndDate = angular.element('#dateout').val();
		var cityname = angular.element('#hotelcity').val();
		var agentapp_key = angular.element('#ay').val();
		if(agentapp_key ==undefined ||agentapp_key== null)
			var app_key = angular.element('#hky').val();
		else
			var app_key=agentapp_key;
		/*validate and fadeout for most req input values*/
		if (citycode == "") {
			$("#errori").text("Please Enter the City Name");
			$('#errori').stop().fadeIn(400).delay(1500).fadeOut(400);	   
		}
		else if (cityname == "") {			
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
		else if (agentapp_key=="") {			
			$("#errconfig").text("User not Configured");
			$('#errconfig').stop().fadeIn(400).delay(1500).fadeOut(400);
		}
		else{

			var currency = angular.element('#currency').val();			

			var totalrooms = angular.element('#totalrooms').val(); var room1adult = angular.element('#RoomAdult1').val();
			var room2adult = angular.element('#RoomAdult2').val(); var room3adult = angular.element('#RoomAdult3').val();
			var room4adult = angular.element('#RoomAdult4').val(); var room1child = angular.element('#Childs').val();
			var room2child = angular.element('#Childs2').val();    var room3child = angular.element('#Childs3').val();
			var room4child = angular.element('#Childs4').val();
			
			var roomindex1 = "$0,";	var roomindex2 = "$1,";	var roomindex3 = "$2,";	var roomindex4 = "$3,"; 

			var firstRoomAge = '';	var secondRoomAge = '';	var thirdRoomAge = ''; var fourthRoomAge = '';
			var room1childage = "";	var room1childage2 = ""; var room1childage3 = ""; var room1childage4 = ""; var room1childage5 = "";
			var child1WithAge = '';	var child2WithAge = '';	var child3WithAge = '';	var child4WithAge = '';

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

			if(room1child == 0)
				child1WithAge = 0;
			else
				child1WithAge = room1child+','+room1childage;

			if(room2child == 0)
				child2WithAge = 0;
			else
				child2WithAge = room2child+','+room1childage2;

			if(room3child == 0)
				child3WithAge = 0;
			else
				child3WithAge = room3child+','+room1childage3;

			if(room4child == 0)
				child4WithAge = 0;
			else
				child4WithAge = room4child+','+room1childage4;


			var room1complete = roomindex1+room1adult+','+child1WithAge;
			var room2complete = roomindex2+room2adult+','+child2WithAge;
			var room3complete = roomindex3+room3adult+','+child3WithAge;
			var room4complete = roomindex4+room4adult+','+child4WithAge;
			var rooms = 0;
			var totalAdultCount = 0;
			var totalChildCount = 0;
			if(totalrooms == 1){
				rooms = room1complete;
				totalAdultCount = parseInt(room1adult);
				totalChildCount = parseInt(room1child);
			}else if(totalrooms == 2){
				rooms = room1complete+','+room2complete;
				totalAdultCount = parseInt(room1adult) + parseInt(room2adult);
				totalChildCount = parseInt(room1child)+  parseInt(room2child);

			}else if(totalrooms == 3){
				rooms = room1complete+','+room2complete+','+room3complete;
				totalAdultCount = parseInt(room1adult) + parseInt(room2adult) + parseInt(room3adult);
				totalChildCount = parseInt(room1child) + parseInt(room2child) + parseInt(room3child);
			}else if(totalrooms == 4){
				rooms = room1complete+','+room2complete+','+room3complete+','+room4complete;
				totalAdultCount = parseInt(room1adult) + parseInt(room2adult) + parseInt(room3adult)+ parseInt(room4adult);
				totalChildCount = parseInt(room1child) + parseInt(room2child) + parseInt(room3child)+ parseInt(room4child);
			}		
			$scope.ThemeType = angular.element('#themeType').val();
			var noofrooms = totalrooms;	
			var SearchData = ('city='+encodeURIComponent(cityname)+'&citycode='+encodeURIComponent(citycode)+'&datain='+encodeURIComponent(startDate)+'&dateout='+encodeURIComponent(EndDate)+'&ay='+encodeURIComponent(app_key)+'&noofrooms='+noofrooms+'&currency='+currency+'&rooms='+encodeURIComponent(rooms)+'&adt='+totalAdultCount+'&chd='+totalChildCount)+'&thm='+$scope.ThemeType;
			localStorageService.set('hotelUrlParameters',SearchData);
			/*next page (Hotel-List.jsp)calling for listing the result*/
			$location.path('/Hotel-List-'+$scope.ThemeType).search(SearchData);
		}
	};

	$scope.init();
}]);