'use strict';

/**
 * @ngdoc service
 * @name myApp
 * @description
 * Factory in the myApp.
 */
angular.module('myApp')
.factory('hotelServices', function (transporter) {

	var dataFactory = {};

	dataFactory.searchCity = function(param) {
		return transporter.getmethod('cities/search?', param).then(function(response) {

			return response;
		});
	};
	
	 dataFactory.HotelSearch = function(params) {

		return transporter.get('hotelnew/search/fast',params).then(function(response) {
			return response;
		});
	};
	dataFactory.HotelQuoteSearch = function(params) {

		return transporter.get('hotelquote/search/fast',params).then(function(response) {
			return response;
		});
	};
	dataFactory.HotelSearchContinue = function(params) {

		return transporter.get('hotelnew/search/fast/multicall',params).then(function(response) {
			return response;
		});
	};
	dataFactory.bookAgain = function(params) {

		return transporter.getmethod('hotel/prebook/bookagain',params).then(function(response) {
			return response;
		});
	};
	dataFactory.hotelRmbook = function(param) {
        return transporter.post('rmconfig/details', param).then(function(response) {
         return response;
          });
	};
	dataFactory.Roomdetails = function(params) {

		return transporter.getmethod('hotel/roomdetail/new',params).then(function(response) {
			return response;
		});
	};
	dataFactory.BookSummary = function(params) {

		return transporter.get('hotel/roomdetail/summarynew',params).then(function(response) {
			return response;
		});
	};

	dataFactory.PreBook = function(param){
		return transporter.post('hotel/prebook',param).then(function(response){
			return response;
		});
	}
	dataFactory.downloadPdfFile = function(param){
		return transporter.getmethod('/getpdf/hotel?'+param,{ responseType: 'arraybuffer'}).then(function(response){
			return response;
		});
	}
	dataFactory.hotelBook = function(param){
		return transporter.get('hotel/book',param).then(function(response){
			return response;
		});
	}
	 dataFactory.getRmDetailFields = function(param){            	 
      	return transporter.get('employee/empdetailsById?id='+param).then(function(response) {
              return response;
               });
      }
	return dataFactory;
});

