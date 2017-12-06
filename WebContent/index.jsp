<!DOCTYPE html>
<%@page language="java" session="true" %>
<%@taglib prefix="s" uri="/struts-tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html data-ng-app="myApp" data-ng-controller="indexCtrl">
<link rel="icon" href="favicon.ico" type="image/x-icon">
<head>
<meta name="viewport" content="width=device-width, initial-scale=1"> 
<title>Tayyarah-Home</title>
<link href="css/bootstrap.css" rel="stylesheet">
<link data-ng-href="css/tayyarah-icon.css?v={{version}}" rel="stylesheet">
<link href="css/material.css" rel="stylesheet">
<link href="css/ripples.min.css" rel="stylesheet">
<link data-ng-href="css/tayyaraha.css?v=<s:text name="global.Version" ></s:text>" rel="stylesheet">
<link href="css/animate.min.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="css/calender/jquerydarkness-ui.min.css">
<link rel="stylesheet" type="text/css"  href="css/calender/cal.datepicker.css">
<link rel="stylesheet" type="text/css"  href="css/bootstrap-datetimepicker.css">
<link rel='stylesheet' href='css/loading-bar.min.css' type='text/css' media='all' />
<link href="css/mobile.css" media="(max-width: 768px)" rel="stylesheet">
<link href="css/nprogress.css" rel="stylesheet">
<link href="css/slider.css" rel="stylesheet">
<link href="css/cutomslider.css" rel="stylesheet">
<link href="css/RangeSlider.css" rel="stylesheet">
<link href="css/logoposition.css" rel="stylesheet">
<link href="css/main.css"  rel="stylesheet">
<link href="css/lightslider.css" rel="stylesheet">
<link href="js/lib/intlTelInput.css" rel="stylesheet">
<link href="css/mapdetails.css" rel="stylesheet">
<link href="css/WhiteLabeling/{{companyCss}}.css"  rel="stylesheet">
<link href="//fonts.googleapis.com/css?family=Lato:300,400,400italic,600,700|Raleway:300,400,500,600,700|Crete+Round:400italic" rel="stylesheet" type="text/css">
<link rel="stylesheet" type="text/css" href="css/jquerydarkness-ui.min.css">
<script src="js/jquery.js"></script>
<script src="js/jquery-ui.min.js"></script>
<script src="js/jquery-offcanvas.min.js"></script>
<script src="js/angular.js"></script>
<script src="js/angular-route.js"></script>
<script  src="//maps.googleapis.com/maps/api/js?key=AIzaSyAoMkzqKzHasdbGK9hbuwbMgalLTuZFMro"></script>
<script src="js/ng-map.min.js"></script>
</head>
<body>
<input type='hidden' id="cmpnyid" value="<s:property value="%{#session.agent.company_userid}"/>">
<div id="hideloader"></div>  
    <s:if test="#session.isLabeling == true">       
	<input type="hidden" name="thm" id="themeType" value="<s:property value="%{#session.ThemeName}"/>">
	<input type="hidden" name="thm" id="cssPath" value="<s:property value="%{#session.cssPath}"/>">
	<input type="hidden" name="thm" id="Logo" value="<s:property value="%{#session.Logo}"/>">
	</s:if>  
	<s:else>
	<input type="hidden" name="thm" id="themeType" value="Default">
	<input type="hidden" name="thm" id="cssPath" value="Default">
	<input type="hidden" name="thm" id="Logo" value="Default">
	</s:else>  
	 <input type="hidden" name="themeId" id="themeValue" value="<%=session.getAttribute("themeKey" )%>" />  
<s:if test="#session.isCorporate == true">  
<div data-ng-include="header" data-ng-controller="CorporateheaderCtrl"></div>
 </s:if>
 <s:else>
 <div data-ng-include="headerUrl" data-ng-controller="HeadCtrl"></div> 
 </s:else>  
 <c:out value="" />
 <c:if test="${sessionScope.themeKey == null}">
  <div ng-controller="themeCtrl" ng-init="loadcssTheme()"></div>
 </c:if>  
 
<div data-ng-view="" autoscroll="true" class="greyDiv mainPageHeight"></div>

 <!-- Modal -->
  <div class="modal fade" id="LabelingModal" role="dialog">
    <div class="modal-dialog">    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title"> </h4>
        </div>
        <div class="modal-body">
          <p class="text-center" >Please Enter the Correct Application Url Key</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>      
    </div>
  </div>   
	<script src="js/bootstrap.min.js"></script>	
	<script src="js/calender/jquerycal.js"></script>
	<script src="js/calender/jquerycalUI.js"></script>
	<script src="js/core.js"></script>
	<script src="js/md5.js"></script>
	<script src="js/ui-bootstrap-tpls-0.9.0.js"></script>
	<script src="js/ripples.min.js"></script>
	<script src="js/material.min.js"></script>
	<script src="js/bootstrap-select.js"></script>
	<script src="js/moment-with-locales.js"></script>
	<script src="js/modernizr.custom.js"></script>	
	<script src="js/rzslider.js"></script>
	<script src="js/custom.js"></script>
	<script src="js/featherlight.js"></script>
	<script src="js/angular-local-storage.min.js"></script>
	<script src="js/RangeSlider.js"></script>	
	<script src="js/angular-animate.min.js"></script>
	<script src="js/angular-touch.min.js"></script>
	<script src="js/loading-bar.min.js"></script>
	<script src="js/angular-slider.js"></script>
	<script src="js/dirPagination.js"></script>
	<script src="js/angular-sanitize.js"></script>
	<script  src="js/date.js"></script>
	<script src="js/bootstrap-slider.js"></script>
	<script src="js/tayyarahcommon.js?v=<s:text name="global.Version" ></s:text>"></script> 
	<script src="js/hotelDetails.js?v=<s:text name="global.Version" ></s:text>"></script> 
	<!-- custom services -->
	<script src="scripts/app.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/services/commonservice.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/services/transporter.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/services/flightServices.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/services/hotelServices.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/services/busServices.js?v=<s:text name="global.Version" ></s:text>"></script>
	<!-- custom controllers -->	
	<script src="scripts/controllers/index.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/controllers/header.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/controllers/footer.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/controllers/cars.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/controllers/bus.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/controllers/SessionOut.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/controllers/CustomNotification.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/controllers/detailedNotification.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/controllers/InsufficientFund.js?v=<s:text name="global.Version" ></s:text>"></script>	
	<script src="scripts/controllers/InsuranceTermsDetails.js?v=<s:text name="global.Version" ></s:text>"></script>	
	<script src="scripts/controllers/InsuranceProductBenefit.js?v=<s:text name="global.Version" ></s:text>"></script>	
	<!-- Flights Controllers -->
	<script src="scripts/controllers/Flightindex.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/controllers/Flights-Domestic.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/controllers/Flights-International.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/controllers/Flights-oneway.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/controllers/Flights-BookSummary.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/controllers/Flights-AgentBooking.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/controllers/FlightHolding.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/controllers/UserConfirmFlightBook.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/controllers/FlightQuoteBookSummary.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/controllers/BookingPreview.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/controllers/fareChangeModal.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/controllers/FlightErrorPage.js?v=<s:text name="global.Version" ></s:text>"></script>	
	<!-- Hotel Controllers -->
	<script src="scripts/controllers/hotelindex.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/controllers/Hotel-List.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/controllers/hotelDetails.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/controllers/hotelBookingDetails.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/controllers/AgentHotelBookingConfirmation.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/controllers/BookingHistory.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/controllers/HotelBookingHistory.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/controllers/bus-BookingHistory.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/controllers/GetHotelConformation.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/controllers/UserHotelBook.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/controllers/hotelQuoteRoomDetails.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/controllers/hotelBookingPreviewModal.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/controllers/fareChangeModalHotel.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/controllers/hotelErrorSearch.js?v=<s:text name="global.Version" ></s:text>"></script>	
	 <!-- Bus Controllers -->
	<script src="scripts/controllers/busList.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/controllers/busSummary.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/controllers/busErrorDisplay.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/controllers/bus-AgentBooking.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/controllers/UserBusBook.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/controllers/maxSeatAlert.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="scripts/controllers/lowestFareAlert.js?v=<s:text name="global.Version" ></s:text>"></script>	
	<!-- Corporate scripts -->	
	<script src="scripts/controllers/Corporateheader.js?v=<s:text name="global.Version" ></s:text>"></script>
    <script src="scripts/controllers/CorporateFooter.js?v=<s:text name="global.Version" ></s:text>"></script>
    <script src="scripts/controllers/themeController.js?v=<s:text name="global.Version" ></s:text>"></script>
	<script src="js/jquery-offcanvas.min.js"></script>	
 
<!-- To Disable Console log from the browser -->
<%--  <script>
var DEBUG = false;
if(!DEBUG){
    if(!window.console) window.console = {};
    var methods = ["log", "debug", "warn", "info"];
    for(var i=0;i<methods.length;i++){
        console[methods[i]] = function(){};
    }
}
</script>  --%> 

<script>
jQuery(document).ready(function($) {
    var open = false;

    var openSidebar = function(){
   $('.navbar-ex1-collapse').addClass('in');
   $('#navbar2').addClass('toggle-close');
   open = true;
}
var closeSidebar = function(){
   $('.navbar-ex1-collapse').removeClass('in');
   $('#navbar2').removeClass('toggle-close');
   open = false;
} 

 $(document).click( function(event){
   if ( !$(event.target).closest('.navbar-ex1-collapse').length ) {
       closeSidebar();   
   }
}); 
});
 
$(window).on('popstate', function() { 
	$('.modal').hide();
	$('.modal-backdrop').remove();
	$('body').removeClass('modal-open');
  });
 
</script> 
  <s:if test="#session.isCorporate == true">  
<div data-ng-include="Corporatefooter" data-ng-controller="CorporateFooterCtrl"></div> 
</s:if>
<s:else>
<div data-ng-include="footerUrl" data-ng-controller="FootCtrl"></div>
</s:else> 
</body>
</html>