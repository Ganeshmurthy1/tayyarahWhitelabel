'use strict';

/**
 * @ngdoc service
 * @name myApp
 * @description
 * Factory in the myApp.
 */
angular.module('myApp')
.factory('busServices', function (transporter) {

	var dataFactory = {};	
	dataFactory.busSearch = function(param){
		return transporter.post('bus/available/search',param).then(function(response){
			return response;
		});
	}
	dataFactory.buslayout = function(param){
		return transporter.post('bus/layout',param).then(function(response){
			return response;
		});
	}
	dataFactory.busBlocking = function(param){
		return transporter.post('bus/block',param).then(function(response){
			return response;
		});
	}
	dataFactory.busBookingB2C = function(param){
		return transporter.post('bus/payment',param).then(function(response){
			return response;
		});
	}
	dataFactory.busBookingB2B = function(param){
		return transporter.post('bus/confirm',param).then(function(response){
			return response;
		});
	}	
	 dataFactory.downloadPdfFile = function(param){
   	  return transporter.getmethod('/getpdf/bus?'+param,{ responseType: 'arraybuffer'}).then(function(response){
   		  return response;
   	  });
     }
	 dataFactory.busRmbook = function(param) {
	        return transporter.post('rmconfig/details', param).then(function(response) {
	         return response;
	          });
	     };
	     dataFactory.getRmDetailFields = function(param){            	 
          	return transporter.get('employee/empdetailsById?id='+param).then(function(response) {
                  return response;
                   });
          }
	return dataFactory;
});

