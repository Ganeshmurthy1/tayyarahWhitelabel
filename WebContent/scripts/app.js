'use strict';

/**
 * @ngdoc overview
 * @name tayyarahApp
 * @description
 * # tayyarahApp
 *
 * Main module of the application.
 */
angular
  .module('myApp',[
       'ngRoute',
    'ui.bootstrap',
    'LocalStorageModule',
    'rzModule',
    'angularUtils.directives.dirPagination',
    'ngMap',
    'ngSanitize',
   /* 'angular-loading-bar',*/
    'ui.date'
    
   
  
  ])
  
  /*.config(function ($routeProvider,$httpProvider,cfpLoadingBarProvider,$locationProvider) {*/
  .config(function ($routeProvider,$httpProvider,$locationProvider) {
	  $httpProvider.defaults.useXDomain = true;   
	  
	  delete $httpProvider.defaults.headers.common['X-Requested-With']; 
	/*  cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
	  cfpLoadingBarProvider.latencyThreshold = 500;*/
	
    $routeProvider
           .when('/', {
        templateUrl: 'views/Flightindex.jsp',
        controller: 'FlightIndexCtrl'        
      })
      /*Deafult Theme Controllers*/
       .when('/Flights-oneway-Default', {
        templateUrl: 'views/FlightsOneway-Default.jsp',
        controller: 'Flights-onewayCtrl'               
      }) 
      .when('/Flights-Domestic-Default', {
        templateUrl: 'views/Flights-Domestic-Default.jsp',
        controller: 'Flights-DomesticCtrl'               
      })
      .when('/Flights-International-Default', {
        templateUrl: 'views/Flights-International-Default.jsp',
        controller: 'Flights-InternationalCtrl'               
      })
        .when('/Flights-BookSummary-Default', {
        templateUrl: 'views/Flights-BookSummary-Default.jsp',
        controller: 'Flights-BookSummaryCtrl'
      })
      .when('/Hotel-List-Default', {
        templateUrl: 'views/Hotel-List-Default.jsp',
        controller: 'hotelListCtrl'
      })      
      .when('/Hotel-Details-Default', {
        templateUrl: 'views/hotel-Details-Default.jsp',
        controller: 'hotelDetailCtrl'
      })
        .when('/HotelBookingDetails-Default', {
        templateUrl: 'views/hotelBookingDetails-Default.jsp',
        controller: 'hotelBookingDetailCtrl'
      })
	    .when('/bus', {
	        templateUrl: 'views/busIndex.jsp',
	        controller: 'busCtrl'
	    })
        .when('/busList-Default', {
        templateUrl: 'views/busList-Default.jsp',
        controller: 'busListCtrl'
      })
       .when('/BusSummary-Default', {
        templateUrl: 'views/busSummary-Default.jsp',
        controller: 'busSummaryCtrl'
      })
      /*End of Default Theme*/
      /*mercury Theme Controllers*/
       .when('/Flights-oneway-Mercury', {
        templateUrl: 'views/FlightsOneway-Mercury.jsp',
        controller: 'Flights-onewayCtrl'               
      }) 
      .when('/Flights-Domestic-Mercury', {
        templateUrl: 'views/Flights-Domestic-Mercury.jsp',
        controller: 'Flights-DomesticCtrl'               
      })
      .when('/Flights-International-Mercury', {
        templateUrl: 'views/Flights-International-Mercury.jsp',
        controller: 'Flights-InternationalCtrl'               
      })
        .when('/Flights-BookSummary-Mercury', {
        templateUrl: 'views/Flights-BookSummary-Mercury.jsp',
        controller: 'Flights-BookSummaryCtrl'
      })
      .when('/Hotel-List-Mercury', {
        templateUrl: 'views/Hotel-List-Mercury.jsp',
        controller: 'hotelListCtrl'
      })      
      .when('/Hotel-Details-Mercury', {
        templateUrl: 'views/hotel-Details-Mercury.jsp',
        controller: 'hotelDetailCtrl'
      })
        .when('/HotelBookingDetails-Mercury', {
        templateUrl: 'views/hotelBookingDetails-Mercury.jsp',
        controller: 'hotelBookingDetailCtrl'
      })
	    .when('/bus', {
	        templateUrl: 'views/busIndex.jsp',
	        controller: 'busCtrl'
	    })
        .when('/busList-Mercury', {
        templateUrl: 'views/busList-Mercury.jsp',
        controller: 'busListCtrl'
      })
       .when('/BusSummary-Mercury', {
        templateUrl: 'views/busSummary-Mercury.jsp',
        controller: 'busSummaryCtrl'
      })
      /*End of Mercury Theme*/
        /*Root Theme Controllers*/
       .when('/Flights-oneway-Root', {
        templateUrl: 'views/FlightsOneway-Root.jsp',
        controller: 'Flights-onewayCtrl'               
      }) 
      .when('/Flights-Domestic-Root', {
        templateUrl: 'views/Flights-Domestic-Root.jsp',
        controller: 'Flights-DomesticCtrl'               
      })
      .when('/Flights-International-Root', {
        templateUrl: 'views/Flights-International-Root.jsp',
        controller: 'Flights-InternationalCtrl'               
      })
        .when('/Flights-BookSummary-Root', {
        templateUrl: 'views/Flights-BookSummary-Root.jsp',
        controller: 'Flights-BookSummaryCtrl'
      })
      .when('/Hotel-List-Root', {
        templateUrl: 'views/Hotel-List-Root.jsp',
        controller: 'hotelListCtrl'
      })      
      .when('/Hotel-Details-Root', {
        templateUrl: 'views/hotel-Details-Root.jsp',
        controller: 'hotelDetailCtrl'
      })
        .when('/HotelBookingDetails-Root', {
        templateUrl: 'views/hotelBookingDetails-Root.jsp',
        controller: 'hotelBookingDetailCtrl'
      })
	    .when('/bus', {
	        templateUrl: 'views/busIndex.jsp',
	        controller: 'busCtrl'
	    })
        .when('/busList-Root', {
        templateUrl: 'views/busList-Root.jsp',
        controller: 'busListCtrl'
      })
       .when('/BusSummary-Root', {
        templateUrl: 'views/busSummary-Root.jsp',
        controller: 'busSummaryCtrl'
      })
      /*End of Root Theme*/
      .when('/Flights-AgentBooking', {
        templateUrl: 'views/Flights-AgentBooking.jsp',
        controller: 'Flights-AgentBookingCtrl'
      })
       .when('/header', {
        templateUrl: 'views/Header.jsp',
        controller: 'HeadCtrl'
      })
       .when('/footer', {
        templateUrl: 'views/Footer.jsp',
        controller: 'FootCtrl'
      })
       .when('/about', {
        templateUrl: 'views/about.jsp'
      })
      .when('/hotel', {
        templateUrl: 'views/hotelindex.jsp',
        controller: 'HotelindexCtrl'
      })
      .when('/cars', {
        templateUrl: 'views/cars.jsp',
        controller: 'carsCtrl'
      })
     .when('/EnquiryForm', {
        templateUrl: 'views/EnquiryForm.jsp'
      })
       .when('/ContactUs', {
        templateUrl: 'views/contactUs.jsp'
      })
      .when('/Privacypolicy', {
        templateUrl: 'views/privacy-policy.jsp'
      })
      .when('/TermsandConditions', {
        templateUrl: 'views/terms-conditions.jsp'
      })
      .when('/Cancellation', {
        templateUrl: 'views/cancellation-refund-policy.jsp'
      })
      .when('/Disclaimer', {
        templateUrl: 'views/Disclaimer.jsp'
      })
       .when('/UserRegister', {
        templateUrl: 'views/UserRegister.jsp'
      })
      .when('/UserProfile', {
        templateUrl: 'views/UserProfile.jsp'
      })
       .when('/BookingHistory', {
        templateUrl: 'views/BookingHistory.jsp',
        controller: 'BookingHistoryCtrl'
      })
       .when('/HotelBookingHistory', {
        templateUrl: 'views/HotelBookingHistory.jsp',
        controller: 'HotelBookingHistoryCtrl'
      })
       .when('/bus-BookingHistory', {
        templateUrl: 'views/bus-BookingHistory.jsp',
        controller: 'bus-BookingHistoryCtrl'
      })      
      .when('/Hotel-QuoteDetails', {
        templateUrl: 'views/hotel-QuoteRoomDetails.jsp',
        controller: 'hotelQuoteDetailCtrl'
      }) 
       .when('/UserHotelBookingConformation', {
        templateUrl: 'views/GetHotelConformation.jsp',
        controller: 'UserConformationCtrl'
      })
       .when('/AgentHotelBookingConfirmation', {
        templateUrl: 'views/AgentHotelBookingConfirmation.jsp',
        controller: 'AgentConformationCtrl'
      })
     .when('/UserConfirmFlightBook', {
        templateUrl: 'views/UserConfirmFlightBook.jsp',
        controller: 'FlightBookConfirmed'
      }) 
       .when('/UserHotelBook', {
        templateUrl: 'views/UserHotelBook.jsp',
        controller: 'UserHotelBookCtrl'
      })
       .when('/Flights-Holding', {
        templateUrl: 'views/Flights-Holding.jsp',
        controller: 'FlightHoldingCtrl'
      })
         .when('/CorporateHeader', {
        templateUrl: 'views/Corporateheader.jsp',
        controller: 'CorporateheaderCtrl'
      })
         .when('/CorporateFooter', {
        templateUrl: 'views/CorporateFooter.jsp',
        controller: 'CorporateFooterCtrl'
      })
        .when('/SessionOut', {
        templateUrl: 'views/SessionOut.jsp',
        controller: 'SessionOutCtrl'
      })
       .when('/FlightQuoteBookSummary', {
        templateUrl: 'views/FlightQuoteBookSummary.jsp',
        controller: 'FlightQuoteBookSummaryCtrl'
      })
      .when('/CustomNotification', {
        templateUrl: 'views/CustomNotification.jsp',
        controller: 'CustomNotificationCtrl'
      })
      .when('/detailedNotification', {
        templateUrl: 'views/detailedNotification.jsp',
        controller: 'detailedNotificationCtrl'
      })
      .when('/BookingPreview', {
        templateUrl: 'views/BookingPreview.jsp',
        controller: 'BookingPreviewCtrl'
      })
       .when('/HotelBookingPreview', {
        templateUrl: 'views/hotelBookingPreviewModal.jsp',
        controller: 'hotelBookingPreviewModalCtrl'
      })
        .when('/InsufficientFund', {
        templateUrl: 'views/InsufficientFund.jsp',
        controller: 'InsufficientFundCtrl'
      })
       .when('/fareChangeModal', {
        templateUrl: 'views/fareChangeModal.jsp',
        controller: 'fareChangeModalCtrl'
      })
       .when('/fareChangeModalHotel', {
        templateUrl: 'views/fareChangeModalHotel.jsp',
        controller: 'fareChangeModalHotelCtrl'
      })
      .when('/FlightErrorPage', {
        templateUrl: 'views/FlightErrorPage.jsp',
        controller: 'FlightErrorPageCtrl'
      })
       .when('/HotelErrorSearch', {
        templateUrl: 'views/hotelErrorSearch.jsp',
        controller: 'HotelErrorSearchCtrl'
      })
      .when('/BusError', {
        templateUrl: 'views/busErrorDisplay.jsp',
        controller: 'busErrorDisplayCtrl'
      })
       .when('/BusAgentBooking', {
        templateUrl: 'views/bus-AgentBooking.jsp',
        controller: 'busAgentBookingCtrl'
      })
       .when('/UserBusBook', {
        templateUrl: 'views/UserBusBook.jsp',
        controller: 'UserBusBookCtrl'
      })
       .when('/LabelingError', {
        templateUrl: 'views/WhiteLabelIndexErrorModal.jsp',
        controller: 'WhiteLabelIndexErrorModalCtrl'
      })
      .when('/LowestFareAlert', {
        templateUrl: 'views/LowestFareAlert.jsp',
        controller: 'LowestFareAlertCtrl'
      })
       .when('/InsuranceTermsDetails', {
        templateUrl: 'views/InsuranceTermsDetails.jsp',
        controller: 'InsuranceTermsCtrl'
      })
      .when('/InsuranceProductBenefits', {
        templateUrl: 'views/InsuranceProductBenefits.jsp',
        controller: 'InsuranceProductCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
   
    
  });
