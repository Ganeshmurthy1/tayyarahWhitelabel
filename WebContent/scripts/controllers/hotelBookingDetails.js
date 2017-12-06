var app = angular.module('myApp');
app.controller('hotelBookingDetailCtrl',['$scope','hotelServices','transporter','localStorageService','$http','$location','$modal','$log','$route','commonService', function($scope,hotelServices,transporter,localStorageService,$http,$location,$modal,$log,$route,commonService) {
	$scope.init = function(){
		$scope.Theme = $location.search().thm;
		$scope.Filter = 'views/hotelBookingDetails-'+$scope.Theme+'Filter.jsp';
		$scope.mainContent = 'views/hotelBookingDetails-'+$scope.Theme+'Content.jsp';		
		$scope.bookSummaryData = {};
		$scope.bookSummaryData=$scope.setScopeBookingdata($location.search());
		$scope.isrmDetails=false;
		var isB2BandB2E=angular.element('#isB2BandB2E').val();
		$scope.isCor=angular.element('#isCor').val();
		if($scope.isCor=='true'){
			$scope.getCompanyEn();
		}
		if(isB2BandB2E=='true'){
			$scope.getRmFields();
		}
		$scope.bookingSummary();
		$scope.PersonsArray = {};
		$scope.completeData = {};
		var data = '';
		$scope.roomindexes = [];//
		$scope.bookconfirmloader = true;
		$scope.errorClass = "none";
		$scope.faredivdisplay = "none";
		$scope.display = "block";	
		$scope.quoteuser = {};
		$scope.timestamp;
		if($location.search().ay == null || $location.search().ay == undefined){

			$location.path('/SessionOut');

		}
		if($location.search().fname != undefined && $location.search().lname != undefined){

			$scope.quoteuser.firstname = $location.search().fname;
			$scope.quoteuser.lastname = $location.search().lname;
			$scope.quoteuser.hotelquotationid = $location.search().quotationId;
			$scope.quoteuser.isQuotation = true;
		}
		$scope.ImageLoader = false;
		$scope.ButtonDisable = false;
		$scope.ServiceTaxes = false;
		$scope.GSTServiceTaxes=false;
		$scope.ApiUrl = commonService.baseUrl;
	};

	$scope.ErrorModalData = {};
	$scope.ErrorModalData.city = "";
	$scope.ErrorModalData.checkin = "";
	$scope.ErrorModalData.checkout = "";
	$scope.ErrorModalData.noofrooms = "";
	$scope.ErrorModalData.rooms = "";
	$scope.ErrorModalData.showData = false;


	$scope.bookingSummary = function(){

		hotelServices.BookSummary($scope.bookSummaryData).then(function(response){		
			//$http.get('hotelsum.json').then(function(response){
			$scope.bookconfirmloader = false; 
			data = response.data;
			$scope.previewData = response.data;
			if(data.status.code != '0'){
				if(data.rs.roomRates.roomRates != undefined && data.rs.roomRates.roomRates.length > 0){
					$scope.bookloader = false;
					$scope.appkey = angular.element('#appkey').val();
					$scope.apiProvider =  data.rs.basicPropertyInfo.apiProvider;
					$scope.hotelCode = data.rs.basicPropertyInfo.hotelCode;
					$scope.searchKey = data.searchKey;
					$scope.noofrooms = data.hotelSearchCommand.noofrooms;
					$scope.searchdata = data.hotelSearchCommand;
					$scope.hotelinfo = data.rs;
					$scope.basicinfo=data.rs.basicPropertyInfo;
					//$scope.hotelimage = data.rs.basicPropertyInfo.imageurl;
					$scope.hotelimage= data.rs.basicPropertyInfo.imageurl.replace(/_TN/g, "");
					$scope.basecurrencyname = data.rs.basicPropertyInfo.bookingCurrency;
					$scope.searchcommand = data.hotelSearchCommand;

					var noofadults=0;
					var noofChild=0;
					angular.forEach(data.hotelSearchCommand.roomrequests, function(obj,index) {
						noofadults +=obj.noofAdult;
						noofChild +=obj.noofChild;
					});
					$scope.noofadults=noofadults;
					$scope.noofChild=noofChild;


					var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
					var firstDate = new Date($scope.searchdata.datestart);
					var secondDate = new Date($scope.searchdata.dateend);

					var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
					$scope.noofnights = diffDays;

					$scope.roomindexes = [];

					$scope.totalamtbeforeothercharges = $scope.getTotalAmountDisplayed(data);					
					$scope.totalpayableamount = $scope.totalamtbeforeothercharges;
					$scope.totalamttopaybeforeothercharges = $scope.getTotalAmountToPayDisplayed(data);	
					$scope.totalamountpayable = $scope.totalamttopaybeforeothercharges;



					$scope.completeData = response.data;
					var roomstext = data.hotelSearchCommand.roomstext;
					var roomreqs = [];
					var room1;
					var roomsPerson = $scope.noofrooms;
					roomreqs = data.hotelSearchCommand.roomrequests;
					for(var i = 0;i<roomreqs.length;i++){
						$scope.roomindexes.push(i);
						var adultCount = roomreqs[i].noofAdult;
						var ChildCountRoom = roomreqs[i].noofChild;
					}
					/*labeling Codes*/
					$scope.whitelabelCardAccess = angular.element('#iswhitelabel').val(); 				
					if($scope.whitelabelCardAccess == "true"){
						setTimeout(function(){							
							$('#Cardoption').click();

						}, 2000);
					}
					// end of Labeling

					var isagentlogged =  angular.element(document.getElementById('isagent'));			
					var paymentgatewayprice ;
					var GovtServiceTax = data.rs.roomRates.roomRates[0].rates.rates[0].bookingPrice.hotelServiceTax;
					if(isagentlogged.val() == 'cash'){ if(GovtServiceTax != null || GovtServiceTax != undefined){
						$scope.GSTServiceTaxes=false;
						$scope.ServiceTaxes = true;
						$scope.baseServicetax =  parseFloat(GovtServiceTax.baseServicetax).toFixed(2) ;
						$scope.totalServiceTax =   parseFloat(GovtServiceTax.totalServiceTax).toFixed(2);
						$scope.kkc = parseFloat(GovtServiceTax.kkc).toFixed(2);
						$scope.managementFee = parseFloat(GovtServiceTax.managementFee).toFixed(2);
						$scope.sbc = parseFloat(GovtServiceTax.sbc).toFixed(2);
						$scope.totalpayableamount =  parseFloat($scope.totalpayableamount) + parseFloat($scope.totalServiceTax) + parseFloat($scope.managementFee);
						$scope.totalamountpayable = parseFloat($scope.totalamountpayable) + parseFloat($scope.totalServiceTax) + parseFloat($scope.managementFee);
					}
					/*########Gst price calculation########*/
					else if(data.rs.roomRates.roomRates[0].rates.rates[0].bookingPrice.hotelGstTax != null || data.rs.roomRates.roomRates[0].rates.rates[0].bookingPrice.hotelGstTax  != undefined){
						var gstServiceTax=data.rs.roomRates.roomRates[0].rates.rates[0].bookingPrice.hotelGstTax ;
						$scope.GSTServiceTaxes=true;
						$scope.ServiceTaxes = false;
						$scope.gstNumber = data.gstNumber;
						$scope.CGSTTax=parseFloat(gstServiceTax.cgst).toFixed(2) ;
						$scope.SGSTTax=parseFloat(gstServiceTax.sgst).toFixed(2) ;
						$scope.IGSTTax=parseFloat(gstServiceTax.igst).toFixed(2) ;
						$scope.UGSTTax=parseFloat(gstServiceTax.ugst).toFixed(2) ;
						$scope.GSTTax=parseFloat(gstServiceTax.totalTax).toFixed(2) ;
						$scope.managementFee = parseFloat(gstServiceTax.managementFee).toFixed(2);
						$scope.totalpayableamount =  parseFloat($scope.totalpayableamount) + parseFloat($scope.GSTTax) + parseFloat($scope.managementFee);
						$scope.totalamountpayable = parseFloat($scope.totalamountpayable) + parseFloat($scope.GSTTax) + parseFloat($scope.managementFee);
					}
					else{
						$scope.ServiceTaxes = false;
						$scope.GSTServiceTaxes=false;
					}
					var addpercent = ($scope.totalamountpayable/parseFloat(100).toFixed(2)) * parseFloat(2.0).toFixed(2);			
					var addedpercent = addpercent.toFixed(2);
					paymentgatewayprice = (parseFloat($scope.totalamountpayable) + parseFloat(addedpercent)).toFixed(2);
					}
					else{
						$scope.ServiceTaxes = false;
						$scope.GSTServiceTaxes=false;
						$scope.otherchargesB2C = parseFloat((parseFloat($scope.totalamountpayable) * parseFloat(2.0) / parseFloat(100))).toFixed(2);					
						$scope.totalpayableamount = parseFloat(parseFloat($scope.totalamttopaybeforeothercharges) + parseFloat($scope.otherchargesB2C)).toFixed(2);
						$scope.totalamountpayable = parseFloat(parseFloat($scope.totalamttopaybeforeothercharges) + parseFloat($scope.otherchargesB2C)).toFixed(2);
						paymentgatewayprice = $scope.totalamountpayable;

					}


					$scope.totalpayableamount = parseFloat(Math.ceil($scope.totalpayableamount)).toFixed(2);
					$scope.totalamountpayable = parseFloat(Math.ceil($scope.totalamountpayable)).toFixed(2);
					paymentgatewayprice = parseFloat(Math.ceil(paymentgatewayprice)).toFixed(2);



					$http({
						method: 'Get',
						url: 'SetPricevalue',
						params: {Totalprice : paymentgatewayprice},
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then(function(result) {
					}, function(error) {
					});			   
				}			

			}
			else
			{
				$scope.errorClass = "block";
				$scope.errormeg = "No data available.Try Again";
				$scope.errorDisplay($scope.errormeg,$scope.ErrorModalData);	
			}

		},function(error){
			$scope.errorClass = "block";
			$scope.errormeg = "No data available.Try Again";
			$scope.errorDisplay($scope.errormeg,$scope.ErrorModalData);	
		});
	}

	/*#########Get comapny entity details######## Prabha */

	$scope.getCompanyEn =function(){
		transporter.getcompanyentity().then(function(response){
			$scope.CompanyEn=response.data.jsonResult.companyEntities;
		});
	}

	/*#########Get rm  details######## Prabha */
	
	$scope.getRmFields = function(){
		transporter.getrmdetail().then(function(response){
			$scope.dynamicField=response.data.fieldName;
			var defaultfield = response.data.rmConfigModel;
			$scope.isrmDetails=true;
			$scope.isApprover=false;$scope.isBillNon=false; $scope.isBussinessUnit=false;
			$scope.isCostCenter=false; $scope.isDepartment=false; $scope.isEmpCode=false;
			$scope.isLocation=false; $scope.isProjectCode=false; $scope.isReasonForTravel=false;
			$scope.isTrNumber=false;

			if(defaultfield != undefined){

				if(defaultfield.approverName == true)
					$scope.isApprover=true;
				if(defaultfield.billNonBill == true)
					$scope.isBillNon=true;
				if(defaultfield.bussinessUnit == true)
					$scope.isBussinessUnit=true;
				if(defaultfield.costCenter == true)
					$scope.isCostCenter=true;
				if(defaultfield.department == true)
					$scope.isDepartment=true;
				if(defaultfield.empCode == true)
					$scope.isEmpCode=true;
				if(defaultfield.location == true)
					$scope.isLocation=true;
				if(defaultfield.projectCode == true)
					$scope.isProjectCode=true;
				if(defaultfield.reasonForTravel == true)
					$scope.isReasonForTravel=true;
				if(defaultfield.trNumber == true)
					$scope.isTrNumber=true; 
			}

			angular.forEach(response.data.fieldName, function(dynamicField) {
				// $scope.dynamicField=dynamicField;
			});
		},function(){
			$scope.isrmDetails=false;
			//console.log("walleterror")
		});

	}

/*get hoteldetail vlaues from url*/
	$scope.setScopeBookingdata = function(locationpath){
		var bookingdata={};
		bookingdata.appkey = locationpath.ay;
		bookingdata.bookingkey = locationpath.bookingCode;
		bookingdata.hotelcode = locationpath.hotelcode;
		bookingdata.searchkey = locationpath.searchkey;
		return bookingdata
	}

	
	$scope.getTotalAmountDisplayed = function(data)
	{ 
		var totalAmount = 0;

		angular.forEach(data.rs.roomRates.roomRates, function(value,index) { 
			var basic = 0.0;
			var tax = 0.0;
			var discount = 0.0;
			if(value != undefined && value.rates != undefined && value.rates.rates != undefined && value.rates.rates[0] != undefined && value.rates.rates[0].bookingPrice != undefined)
			{
				basic = value.rates.rates[0].bookingPrice.amountBeforeTax;
				if(value.rates.rates[0].bookingPrice.taxes != undefined && value.rates.rates[0].bookingPrice.taxes.taxes != undefined &&
						value.rates.rates[0].bookingPrice.taxes.taxes.length >0 &&
						value.rates.rates[0].bookingPrice.taxes.taxes[0] != undefined && value.rates.rates[0].bookingPrice.taxes.taxes[0].amount != undefined)
					tax = value.rates.rates[0].bookingPrice.taxes.taxes[0].amount;
				if(value.rates.rates[0].bookingPrice.discounts != undefined && value.rates.rates[0].bookingPrice.discounts.length>0 &&
						value.rates.rates[0].bookingPrice.discounts[0] != undefined && value.rates.rates[0].bookingPrice.discounts[0].amountBeforeTax != undefined)
					discount = value.rates.rates[0].bookingPrice.discounts[0].amountBeforeTax;


			}	
			totalAmount = parseFloat(totalAmount) + parseFloat(basic) + parseFloat(tax) - parseFloat(discount);	
		});
		totalAmount =  parseFloat(totalAmount) * parseFloat($scope.noofnights);	
		return parseFloat(totalAmount).toFixed(2);
	}
	
	$scope.getTotalAmountToPayDisplayed = function(data)
	{ 	
		var totalPayableAmount = 0;	
		angular.forEach(data.rs.roomRates.roomRates, function(value,index) {

			if(value != undefined && value.rates != undefined && value.rates.rates != undefined && value.rates.rates[0] != undefined && value.rates.rates[0].bookingPrice != undefined)
			{
				var totalAmount = value.rates.rates[0].bookingPrice.PayableAmount;
				totalPayableAmount = totalPayableAmount + totalAmount;
			}				
		});	
		totalPayableAmount =  parseFloat(parseFloat(totalPayableAmount) * parseFloat($scope.noofnights));		
		return parseFloat(totalPayableAmount).toFixed(2);
	}

	$scope.getTotalAmountPreBookDisplayed = function(data)
	{
		var totalAmount = 0;
		data.roomsummary.roomRates.roomRates

		angular.forEach(data.roomsummary.roomRates.roomRates, function(value,index) { 
			var basic = 0.0;
			var tax = 0.0;
			var discount = 0.0;
			if(value != undefined && value.rates != undefined && value.rates.rates != undefined && value.rates.rates[0] != undefined && value.rates.rates[0].bookingPrice != undefined)
			{
				basic = value.rates.rates[0].bookingPrice.amountBeforeTax;
				if(value.rates.rates[0].bookingPrice.taxes != undefined && value.rates.rates[0].bookingPrice.taxes.taxes != undefined &&
						value.rates.rates[0].bookingPrice.taxes.taxes.length >0 &&
						value.rates.rates[0].bookingPrice.taxes.taxes[0] != undefined && value.rates.rates[0].bookingPrice.taxes.taxes[0].amount != undefined)
					tax = value.rates.rates[0].bookingPrice.taxes.taxes[0].amount;
				if(value.rates.rates[0].bookingPrice.discounts != undefined && value.rates.rates[0].bookingPrice.discounts.length>0 &&
						value.rates.rates[0].bookingPrice.discounts[0] != undefined && value.rates.rates[0].bookingPrice.discounts[0].amountBeforeTax != undefined)
					discount = value.rates.rates[0].bookingPrice.discounts[0].amountBeforeTax;

			}	
			totalAmount = parseFloat(totalAmount) + parseFloat(basic) + parseFloat(tax) - parseFloat(discount);	
		});
		totalAmount =  parseFloat(totalAmount) * parseFloat($scope.noofnights);

		return parseFloat(totalAmount).toFixed(2);
	}

	$scope.adultindexes = function(romindex)
	{	
		var adultindexes = [];
		if($scope.searchcommand != null &&  $scope.searchcommand.roomrequests != null &&  $scope.searchcommand.roomrequests.length > romindex)
		{
			var adultCount = $scope.searchcommand.roomrequests[romindex].noofAdult;
			for(var i = 0; i< parseInt(adultCount); i++)
				adultindexes.push(i);
		}		
		return adultindexes;
	}
	$scope.childindexes = function(romindex)
	{	
		var childindexes = [];
		if($scope.searchcommand != null &&  $scope.searchcommand.roomrequests != null &&  $scope.searchcommand.roomrequests.length > romindex)
		{
			var childCount = $scope.searchcommand.roomrequests[romindex].noofChild;
			for(var i = 0; i< parseInt(childCount); i++)
				childindexes.push(i);
		}	
		return childindexes;
	}

	$scope.getRoomTax = function(roomrate)
	{

		var tax = 0;
		if(roomrate != undefined && roomrate.rates != undefined && roomrate.rates.rates != undefined && roomrate.rates.rates[0] != undefined && roomrate.rates.rates[0].bookingPrice != undefined)
		{				
			if(roomrate.rates.rates[0].bookingPrice.taxes != undefined && roomrate.rates.rates[0].bookingPrice.taxes.taxes != undefined &&
					roomrate.rates.rates[0].bookingPrice.taxes.taxes.length >0 &&
					roomrate.rates.rates[0].bookingPrice.taxes.taxes[0] != undefined && roomrate.rates.rates[0].bookingPrice.taxes.taxes[0].amount != undefined)
				tax = roomrate.rates.rates[0].bookingPrice.taxes.taxes[0].amount;			
		}	

		return parseFloat(tax).toFixed(2);
	}
	$scope.getRoomDiscount = function(roomrate)
	{
		var discount = 0;
		if(roomrate != undefined && roomrate.rates != undefined && roomrate.rates.rates != undefined && roomrate.rates.rates[0] != undefined && roomrate.rates.rates[0].bookingPrice != undefined)
		{				
			if(roomrate.rates.rates[0].bookingPrice.discounts != undefined && roomrate.rates.rates[0].bookingPrice.discounts.length>0 &&
					roomrate.rates.rates[0].bookingPrice.discounts[0] != undefined && roomrate.rates.rates[0].bookingPrice.discounts[0].amountBeforeTax != undefined)
				discount = roomrate.rates.rates[0].bookingPrice.discounts[0].amountBeforeTax;
		}	
		return parseFloat(discount).toFixed(2);
	}
	$scope.getTotalAmountAfterCharges = function(totalAmount, isB2C)
	{		
		var chargesPercentage = 2.0;
		if(isB2C)
			totalAmount = parseFloat(totalAmount) + (parseFloat(totalAmount) * parseFloat(chargesPercentage) / parseFloat(100));

		return parseFloat(totalAmount).toFixed(2);
	}
	$scope.getTotalAmountAfterAgentCardCharges = function(totalAmount, isB2B)
	{		
		var chargesPercentage = 2.0;
		if(isB2B)
			totalAmount = parseFloat(totalAmount) + (parseFloat(totalAmount) * parseFloat(chargesPercentage) / parseFloat(100));

		return parseFloat(totalAmount).toFixed(2);
	}
	$scope.convertrateintoint = function(rate)
	{
		var ratevalue = parseInt(rate, 10);
		return  ratevalue;
	}
	$scope.convertrateintofloat = function(rate)
	{
		var price = parseFloat(rate);
		return  price.toFixed(2);
	}
	$scope.getroomtypename = function(roomTypeCode)
	{
		var roomtypename = "";
		angular.forEach($scope.hotelinfo.roomTypes.roomTypes, function(value,index) { 

			if(value.roomTypeCode == roomTypeCode)
			{
				roomtypename = value.roomType;
			}			
		});		
		return roomtypename;
	}
	$scope.roomAdultsRmData = function(){
		var rmDetail={};
		var customersRm=[];
		for(var i = 0;i<$scope.searchcommand.roomrequests.length;i++){
			var adultCount = $scope.searchcommand.roomrequests[i].noofAdult;
			
		//console.log("$scope.flightBookData.adult",$scope.flightBookData.adult)
		for (var j = 0; j < adultCount; j++) {
			var hotelRmDetail = {};
			var uid=angular.element('#compId').val();
			hotelRmDetail.paxId='tr-'+$scope.previewData.transactionKey+'sk-'+$scope.previewData.searchKey+'R-'+i+uid+j+$scope.timestamp;
			console.log("$scope.data",$scope.previewData);
			//hotelRmDetail.paxI="dfgdfgdfgdf43534";
			
			if(angular.element('#room-'+i+'-pass-'+j+'-empCode').val())
				hotelRmDetail.empCode = angular.element('#room-'+i+'-pass-'+j+'-empCode').val();
			else
				hotelRmDetail.empCode = "";
			if(angular.element('#room-'+i+'-pass-'+j+'-department').val())
				hotelRmDetail.department = angular.element('#room-'+i+'-pass-'+j+'-department').val();
			else
				hotelRmDetail.department = "";
			if(angular.element('#room-'+i+'-pass-'+j+'-costCenter').val())
				hotelRmDetail.costCenter = angular.element('#room-'+i+'-pass-'+j+'-costCenter').val();
			else
				hotelRmDetail.costCenter = "";
			if(angular.element('#room-'+i+'-pass-'+j+'-approverName').val())
				hotelRmDetail.approverName = angular.element('#room-'+i+'-pass-'+j+'-approverName').val();
			else
				hotelRmDetail.approverName = "";
			if(angular.element('#room-'+i+'-pass-'+j+'-location').val())
				hotelRmDetail.location = angular.element('#room-'+i+'-pass-'+j+'-location').val();
			else
				hotelRmDetail.location = "";
			if(angular.element('#room-'+i+'-pass-'+j+'-trNumber').val())
				hotelRmDetail.trNumber = angular.element('#room-'+i+'-pass-'+j+'-trNumber').val();
			else
				hotelRmDetail.trNumber = "";
			if(angular.element('#room-'+i+'-pass-'+j+'-bussinessUnit').val())
				hotelRmDetail.bussinessUnit = angular.element('#room-'+i+'-pass-'+j+'-bussinessUnit').val();
			else
				hotelRmDetail.bussinessUnit = "";
			if(angular.element('#room-'+i+'-pass-'+j+'-projectCode').val())
				hotelRmDetail.projectCode = angular.element('#room-'+i+'-pass-'+j+'-projectCode').val();
			else
				hotelRmDetail.projectCode = "";
			if(angular.element('#room-'+i+'-pass-'+j+'-reasonForTravel').val())
				hotelRmDetail.reasonForTravel = angular.element('#room-'+i+'-pass-'+j+'-reasonForTravel').val();
			else
				hotelRmDetail.reasonForTravel = "";
			if(angular.element('#room-'+i+'-pass-'+j+'-billNonBill').val())
				hotelRmDetail.billNonBill = angular.element('#room-'+i+'-pass-'+j+'-billNonBill').val();
			else
				hotelRmDetail.billNonBill = "";

			if(angular.element('#room-'+i+'-pass-'+j+'-manual-0').val())
				hotelRmDetail.manualField1 = angular.element('#room-'+i+'-pass-'+j+'-manual-0').val();
			else
				hotelRmDetail.manualField1 = "";
			if(angular.element('#room-'+i+'-pass-'+j+'-manual-1').val())
				hotelRmDetail.manualField2 = angular.element('#room-'+i+'-pass-'+j+'-manual-1').val();
			else
				hotelRmDetail.manualField2 = "";
			if(angular.element('#room-'+i+'-pass-'+j+'-manual-2').val())
				hotelRmDetail.manualField3 = angular.element('#room-'+i+'-pass-'+j+'-manual-2').val();
			else
				hotelRmDetail.manualField3 = "";
			if(angular.element('#room-'+i+'-pass-'+j+'-manual-3').val())
				hotelRmDetail.manualField4 = angular.element('#room-'+i+'-pass-'+j+'-manual-3').val();
			else
				hotelRmDetail.manualField4 = "";
			if(angular.element('#room-'+i+'-pass-'+j+'-manual-4').val())
				hotelRmDetail.manualField5 = angular.element('#room-'+i+'-pass-'+j+'-manual-4').val();
			else
				hotelRmDetail.manualField5 = "";
			
			
		
		//	console.log("flightRmDetail",flightRmDetail);
			customersRm.push(hotelRmDetail);
		//	console.log("passengersRm",passengersRm);
		}	
		}
		
		rmDetail.rmConfigList=customersRm;
		rmDetail.serviceType='Hotel';
		rmDetail.txKey=$scope.previewData.transactionKey;
		
		console.log("rmDetail",rmDetail)
		return rmDetail;
		
		
	}
	
	$scope.proceedDetails = function(){
		var hotelConformation = {};
		var basecurrencyname = angular.element('#ccy').val();
		var totalpayableamount = angular.element('#totpr').val();
		var totalamountpayable = angular.element('#totpay').val();
		var dummyValue = angular.element('#dammyva').val();
		var apiDetails= angular.element('#apiPro').val();
		hotelConformation.totalPayable = totalamountpayable;
		hotelConformation.apiProvider = parseInt(apiDetails);
		hotelConformation.appkey = angular.element('#appkey').val();
		hotelConformation.bookingCode = $scope.bookSummaryData.bookingkey;
		hotelConformation.hotelCode = angular.element('#hCode').val();
		hotelConformation.searchKey = angular.element('#sky').val();
		hotelConformation.numberOfUnits = angular.element('#Units').val();
		hotelConformation.userid = angular.element('#uid').val();
		hotelConformation.username = angular.element('#uname').val();
		hotelConformation.payBy = angular.element('#isagent').val();
		hotelConformation.quotationId = angular.element('#quotationId').val();
		hotelConformation.isQuotation = angular.element('#isQuotation').val();
		var emflag=angular.element('#emFlag').val();
		if(emflag == 'true'){
			hotelConformation.emulateByCompanyId = angular.element('#emCompany').val();
			hotelConformation.emulateByUserId = angular.element('#emUname').val();
		}else{
			hotelConformation.emulateByCompanyId = '';
			hotelConformation.emulateByUserId = '';
		}

		// Company Entity Values 
		var companyEntityId='';
		if($scope.isCor=='true'){
			if($scope.CompanyEn.length >= 1){
				var companyen="";
				companyen=angular.element('#CompanyEntity').val();
				var iscom=false;
				if(companyen =="null"||companyen==undefined||companyen==""){
					hotelConformation.isCompanyEntity=false;
				}else{
					var ComEntityobj = JSON.parse(companyen);
					iscom=true;
					companyEntityId=ComEntityobj.companyEntityId;
				}
				hotelConformation.companyEntityId = companyEntityId;
				hotelConformation.isCompanyEntity = iscom;
			}
			else{
				hotelConformation.companyEntityId = companyEntityId;
				hotelConformation.isCompanyEntity = false;
			}}else{
				hotelConformation.companyEntityId = companyEntityId;
				hotelConformation.isCompanyEntity = false;
			}


	/*	// Rm details Values 
		if($scope.isrmDetails == true){
			var rmDataListDetails=[];
			var RmdetailList={};
			hotelConformation.isRmDetails = $scope.isrmDetails;
			var empCode=angular.element('#EmployeeCode').val();
			if (empCode !=undefined )
				RmdetailList.empCode=empCode;
			else
				RmdetailList.empCode="";
			var department=angular.element('#Department').val();
			if (department !=undefined )
				RmdetailList.department=department;
			else
				RmdetailList.department="";
			var costCenter=angular.element('#CostCenter').val();
			if (costCenter !=undefined )
				RmdetailList.costCenter=costCenter;
			else
				RmdetailList.costCenter="";
			var approverName=angular.element('#Approver').val();
			if (approverName !=undefined )
				RmdetailList.approverName=approverName;
			else
				RmdetailList.approverName="";
			var location=angular.element('#Location').val();
			if (location !=undefined )
				RmdetailList.location=location;
			else
				RmdetailList.location="";
			var trNumber=angular.element('#trNumber').val();
			if (trNumber !=undefined )
				RmdetailList.trNumber=trNumber;
			else
				RmdetailList.trNumber="";
			var bussinessUnit=angular.element('#businessUnit').val();
			if (bussinessUnit !=undefined )
				RmdetailList.bussinessUnit=bussinessUnit;
			else
				RmdetailList.bussinessUnit="";
			var projectCode=angular.element('#projectCode').val();
			if (projectCode !=undefined )
				RmdetailList.projectCode=projectCode;
			else
				RmdetailList.projectCode="";
			var reasonForTravel=angular.element('#reason').val();
			if (reasonForTravel !=undefined )
				RmdetailList.reasonForTravel=reasonForTravel;
			else
				RmdetailList.reasonForTravel="";
			var billNonBill=angular.element('#billingCode').val();
			if (billNonBill !=undefined )
				RmdetailList.billNonBill=billNonBill;
			else
				RmdetailList.billNonBill="";

			var manualField1=angular.element('#Dfield-0').val();
			if (manualField1 !=undefined )
				RmdetailList.manualField1=manualField1;
			else
				RmdetailList.manualField1="";
			var manualField2=angular.element('#Dfield-1').val();
			if (manualField2 !=undefined )
				RmdetailList.manualField2=manualField2;
			else
				RmdetailList.manualField2="";
			var manualField3=angular.element('#Dfield-2').val();
			if (manualField3 !=undefined )
				RmdetailList.manualField3=manualField3;
			else
				RmdetailList.manualField3="";
			var manualField4=angular.element('#Dfield-3').val();
			if (manualField4 !=undefined )
				RmdetailList.manualField4=manualField4;
			else
				RmdetailList.manualField4="";
			var manualField5=angular.element('#Dfield-4').val();
			if (manualField5 !=undefined )
				RmdetailList.manualField5=manualField5;
			else
				RmdetailList.manualField5="";

			rmDataListDetails.push(RmdetailList);
			hotelConformation.rmDataListDetails=rmDataListDetails;
		}else{
			hotelConformation.isRmDetails = $scope.isrmDetails;
			var rmDetails=[];
			hotelConformation.RmDetails=rmDetails;
		}	*/	
		hotelConformation.isEmulateFlag = emflag;

		if($scope.quoteuser.hotelquotationid == undefined){
			hotelConformation.quotationId = '-1';
			hotelConformation.isQuotation = false;
		}


		var roomAdult = [];
		var personName = []; var customer = []; var Profiles = [];
		var Adultgender = []; var childgender = [];
		var Adultfname = []; var Adultlname = [];
		var childfname = []; var childlname = [];
		var profileType;
		var idvalue = 1;
		var address =  angular.element('#address').val();
		var address2 =  angular.element('#address2').val();
		var city =  angular.element('#city').val();
		var state =  angular.element('#state').val();
		var country =  angular.element('#country').val();
		var zip =  angular.element('#zip').val();
		var mobile =  angular.element('#phone').val();
		var email =  angular.element('#email1').val();
		var comments =  angular.element('#comments').val();

		if($scope.searchcommand != null &&  $scope.searchcommand.roomrequests != null &&  $scope.searchcommand.roomrequests.length > 0)
		{
			for(var i = 0;i<$scope.searchcommand.roomrequests.length;i++){
				var adultCount = $scope.searchcommand.roomrequests[i].noofAdult;
				var ChildCountRoom = $scope.searchcommand.roomrequests[i].noofChild;

				for(j=0;j<adultCount;j++)
				{
					Adultgender = document.getElementById(i+'-adult-'+j+'-gender').value;
					Adultfname = document.getElementById(i+'-adult-'+j+'-fname').value;
					Adultlname =  document.getElementById(i+'-adult-'+j+'-lname').value;
					Adultage =  document.getElementById(i+'-age-'+j).value;
					Adultdob =  document.getElementById(i+'-dob-'+j).value;

					if(Adultgender =="Mr" ){
						gender = "male";
					}else if(Adultgender =="Miss"){
						gender = "female";
					}else{
						gender = "female";
					}
					if(j == 0){
						profileType = "1";
					}else{
						profileType = "0";
					}
					var resGuestRPHValue = i;

					if($scope.isCor=='true'){
						var uid=angular.element('#compId').val();
						
						//var paxId=$scope.data.transactionKey+uid+j;
						var paxId='tr-'+$scope.previewData.transactionKey+'sk-'+$scope.previewData.searchKey+'R-'+i+uid+j+$scope.timestamp;
						console.log("hotelRmDetail.paxId",paxId);
						//var paxId="dfgdfgdfgdfgdf546dgfdd";}
					}else
							var	paxId='';
					var adult ={"namePrefix":Adultgender,"givenName":Adultfname,"surname":Adultlname,"middleName":"","paxId":paxId,};
					var Completeprofile = {"customer":{"personName":adult,"telephone":[{"extension":"0","areaCityCode":"80","phoneTechType":"1","phoneNumber":mobile,"countryAccessCode":"91"},{"extension":"0","areaCityCode":"80","phoneTechType":"1","phoneNumber":mobile,"countryAccessCode":"91"}],"email":email,"address":{"countryName":country,"postalCode":zip,"stateProv":state,"cityName":city,"addressLine":[address,address2]},"age":Adultage,"dob":Adultdob,"gender":gender},"profileType":profileType,"id":idvalue,"resGuestRPH":resGuestRPHValue,adult:true};	


					Profiles.push(Completeprofile);

				}
				for(j=0;j<ChildCountRoom;j++)
				{
					childgender = document.getElementById(i+'-child-'+j+'-gender').value;
					childfname = document.getElementById(i+'-child-'+j+'-fname').value;
					childlname =  document.getElementById(i+'-child-'+j+'-lname').value;
					childage =  document.getElementById(i+'-cage-'+j).value;
					childdob =  document.getElementById(i+'-cdob-'+j).value;

					if(childgender =="Master" ){
						gender = "male";
					}else if(childgender =="Miss"){
						gender = "female";
					}
					profileType = "0";
					var resGuestRPHValue = i;
					var child = {"namePrefix":childgender,"givenName":childfname,"surname":childlname,"middleName":""};
					var Completeprofile = {"customer":{"personName":child,"telephone":[{"extension":"0","areaCityCode":"80","phoneTechType":"1","phoneNumber":mobile,"countryAccessCode":"91"},{"extension":"0","areaCityCode":"80","phoneTechType":"1","phoneNumber":mobile,"countryAccessCode":"91"}],"email":email,"address":{"countryName":country,"postalCode":zip,"stateProv":state,"cityName":city,"addressLine":[address,address2]},"age":childage,"dob":childdob,"gender":gender},"profileType":profileType,"id":idvalue,"resGuestRPH":resGuestRPHValue,adult:false};	
					Profiles.push(Completeprofile);

				}

			}
		}	hotelConformation.comments = [];
		var cmnt = comments;
		hotelConformation.comments.push(cmnt) ;
		hotelConformation.correlationid = ''; 
		hotelConformation.orderid = '';
		hotelConformation.password = "lintas";
		hotelConformation.profiles = Profiles;

		return hotelConformation;

	}

	$scope.agentBookConfirmation = function(){
		var confirmAgentvalues={};
		confirmAgentvalues = $scope.proceedDetails();
		if(confirmAgentvalues.userid != 2){
			var totalprice = $scope.totalpayableamount;
			var agentbal = 0;
			var agentDeposit = 0;
			var totUrl = $(location).attr('href');
			var newUrl = totUrl.substr(0, totUrl.lastIndexOf('/#/') + 1);
			var finalUrl = newUrl+"GetwalletBalance";

			$http({method:'get',url:finalUrl,headers:{'Content-Type': 'application/json'}}).success(function(data){
				agentbal = Math.round(data.jsonResult.walletbal).toFixed(2);
				agentDeposit = Math.round(data.jsonResult.walletdepbal).toFixed(2);
				if(parseInt(agentDeposit) > parseInt(totalprice))
				{
					$location.path('/AgentHotelBookingConfirmation');	
					localStorageService.set('prebook',confirmAgentvalues);
					localStorageService.set('roomAdultsRmData',$scope.roomAdultsRmData());
				}else if(parseInt(agentbal) > parseInt(totalprice))
				{
					$location.path('/AgentHotelBookingConfirmation');	
					localStorageService.set('prebook',confirmAgentvalues);
					localStorageService.set('roomAdultsRmData',$scope.roomAdultsRmData());
				}else{
					$scope.ImageLoader = false;
					$scope.ButtonDisable = false;
					$scope.insufficientFundopen();
				}
			});

		}else{

			$scope.userHotelBookConfirmation();
		}

	}

	$scope.insufficientFundopen = function(){
		//$('#insufficientFund').modal('show');
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


		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
		});
	}
	
	$scope.userHotelBookmodal = function(){

		$scope.items1 = $scope.previewData;   	
		$scope.items2 = $scope.proceedDetails();
		$scope.items3 = $scope.proceedDetails().totalPayable;
		var modalInstance = $modal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'views/hotelBookingPreviewModal.jsp',
			controller: 'hotelBookingPreviewModalCtrl',
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
				}
			}
		});

		modalInstance.result.then(function (selectedItem) {
			$scope.userHotelBookConfirmation();

		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});

	}
	$scope.userHotelBookConfirmation = function(){
		$scope.hotelSummary=undefined;
		$scope.ImageLoader = true;
		$scope.ButtonDisable = true;
		$scope.bookconfirmloader = true; 
		var confirmvalues={};

		confirmvalues = $scope.proceedDetails();
		/*if(confirmvalues.userid == 2){*/
		hotelServices.PreBook(confirmvalues).then(function(hotelResponse){				
			$scope.bookconfirmloader = false; 
			if(hotelResponse.data.status.code == '1'){ var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
			var firstDate = new Date(hotelResponse.data.search.datestart);
			var secondDate = new Date(hotelResponse.data.search.dateend);
			var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
			$scope.noofnights = diffDays;     
			$scope.totalPAyprice = parseFloat(hotelResponse.data.bookingRate.payableAmt).toFixed(2);
			$scope.oldprice = parseFloat($scope.totalamountpayable).toFixed(2);      
			$scope.pgid = hotelResponse.data.book.paymentid;
			$scope.confirmationNumber = hotelResponse.data.book.paymentid;
			$scope.totalamt = $scope.totalPAyprice;
			$scope.totalprice = $scope.totalPAyprice;				      
			$("#reference_no").val($scope.pgid);
			$("#totalamt").val(parseFloat(Math.ceil($scope.totalamt)).toFixed(2));
			$scope.oldprice = Math.ceil($scope.oldprice);
			if(parseInt($scope.oldprice) != parseInt($scope.totalprice))
			{     
				$scope.updatedprice = $scope.totalprice;
				$scope.searchdata = hotelResponse.data.search;
				$scope.fareChangeModalAlert($scope.oldprice,$scope.totalprice);
				if(parseInt($scope.oldprice) > parseInt($scope.totalprice))
					$scope.pricechagetext = "Hurrey.. The fare for selected hotel has decreased to ";
				if(parseInt($scope.oldprice) < parseInt($scope.totalprice))
					$scope.pricechagetext = "oops The fare for selected hotel has increased to";
				$scope.totalprice = parseFloat(Math.ceil($scope.totalprice)).toFixed(2);
				$http({
					method: 'Get',
					url: 'SetPricevalue',
					params: {Totalprice :$scope.totalprice},
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(function(result) {
					//console.log("resultnoeq",result);
				}, function(error) {
					//console.log("error",error);
				});
			}
			else
			{
				$scope.totalprice = parseFloat(Math.ceil($scope.totalprice)).toFixed(2);
				$http({
					method: 'Get',
					url: 'SetPricevalue',
					params: {Totalprice : $scope.totalprice},
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(function(result) {
					//console.log("result",result);
				}, function(error) {
				});
				$scope.formsumbit();
			}
			}
			else if(hotelResponse.data.status.code == '0'){

				if(hotelResponse.data.preBookRes.priceChanged == true){
					$scope.searchkey = hotelResponse.data.searchKey;
					$scope.hotelcode = hotelResponse.data.book.hotelCode;
					$scope.orderid = hotelResponse.data.book.orderid;
					$scope.oldhotelprice = hotelResponse.data.preBookRes.oldBookingFinalPrice;
					$scope.newhotelprice = hotelResponse.data.preBookRes.bookingFinalPrice;
					$scope.fareChangeModalAlert($scope.oldhotelprice,$scope.newhotelprice);
					if($scope.oldhotelprice > $scope.newhotelprice)
						$scope.pricechagetext = "Hurrey.. The fare for selected room has decreased to";
					if($scope.oldhotelprice < $scope.newhotelprice)
						$scope.pricechagetext = "oops The fare for selected room has increased to";
				}else{
					$scope.errormeg = "PreBooking Failed.Try Again";
					$scope.errorClass = "block";
					$scope.errorDisplay($scope.errormeg,$scope.ErrorModalData);	
				}
			}
			else
			{
				$scope.errormeg = "PreBooking Failed.Try Again";
				$scope.errorClass = "block";
				$scope.errorDisplay($scope.errormeg,$scope.ErrorModalData);	

			}	
		},function(hotelResponse){
			$scope.errormeg = "PreBooking Failed.Try Again";
			$scope.errorClass = "block";
			$scope.errorDisplay($scope.errormeg,$scope.ErrorModalData);	

		});

		/*}*/
	};

	$scope.userBookAgain = {};

	$scope.bookagain = function(){
		$scope.faredivdisplay = "none";
		$scope.bookconfirmloader = true;
		$scope.userBookAgain.appkey = angular.element('#appkey').val();
		$scope.userBookAgain.searchkey = $scope.bookAgainSearchkey ;
		$scope.userBookAgain.hotelcode =$scope.bookAgainHotelcode;
		$scope.userBookAgain.orderid = $scope.bookAgainOrderid;
		hotelServices.bookAgain($scope.userBookAgain).then(function(bookAgainResponse){
			$scope.bookconfirmloader = false;  
			if(bookAgainResponse.data.status.code == '1'){
				var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
				var firstDate = new Date(bookAgainResponse.data.search.datestart);
				var secondDate = new Date(bookAgainResponse.data.search.dateend);
				var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
				$scope.noofnights = diffDays;
				$scope.totalprice = parseFloat(bookAgainResponse.data.bookingRate.payableAmt).toFixed(2);						
				$scope.otherchargesB2C = (parseFloat($scope.totalprice) * parseFloat(2) / parseFloat(100));
				$scope.totalprice = $scope.getTotalAmountAfterCharges($scope.totalprice, true);						
				$scope.oldprice = $scope.getTotalAmountPreBookDisplayed(bookAgainResponse.data);					
				$scope.oldprice = $scope.getTotalAmountAfterCharges($scope.oldprice, true);	
				$scope.pgid = bookAgainResponse.data.book.paymentid;
				$scope.confirmationNumber = bookAgainResponse.data.book.paymentid;
				$scope.totalamt = $scope.totalprice;
				if(parseInt($scope.oldprice) != parseInt($scope.totalprice))
				{					
					$scope.updatedprice = $scope.totalprice;
					$scope.searchdata = bookAgainResponse.data.search;
					$scope.fareChangeModalAlert($scope.oldprice,$scope.totalprice);
					if(parseInt($scope.oldprice) > parseInt($scope.totalprice))
						$scope.pricechagetext = "Hurrey.. The fare for selected hotel has decreased to ";
					if(parseInt($scope.oldprice) < parseInt($scope.totalprice))
						$scope.pricechagetext = "oops The fare for selected hotel has increased to";
					$scope.totalprice = parseFloat(Math.ceil($scope.totalprice)).toFixed(2);
					$http({
						method: 'Get',
						url: 'SetPricevalue',
						params: {Totalprice : $scope.totalprice},
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then(function(result) {
					}, function(error) {
					});
				}
				else
				{
					$scope.totalprice = parseFloat(Math.ceil($scope.totalprice)).toFixed(2);
					$http({
						method: 'Get',
						url: 'SetPricevalue',
						params: {Totalprice : $scope.totalprice},
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then(function(result) {
						//console.log("sessionSet",result);
					}, function(error) {
					});
					$scope.formsumbit();
				}
			}
			else if(bookAgainResponse.data.status.code == '0'){
				if(bookAgainResponse.data.preBookRes.priceChanged == true){
					$scope.searchkey = bookAgainResponse.data.searchKey;
					$scope.hotelcode = bookAgainResponse.data.book.hotelCode;
					$scope.orderid = bookAgainResponse.data.book.orderid;
					$scope.oldhotelprice = bookAgainResponse.data.preBookRes.oldBookingFinalPrice;
					$scope.newhotelprice = bookAgainResponse.data.preBookRes.bookingFinalPrice;
					$scope.fareChangeModalAlert($scope.oldhotelprice,$scope.newhotelprice);
					if($scope.oldhotelprice > $scope.newhotelprice)
						$scope.pricechagetext = "Hurrey.. The fare for selected room has decreased to";
					if($scope.oldhotelprice < $scope.newhotelprice)
						$scope.pricechagetext = "oops The fare for selected room has increased to";
				}
			}			
			else
			{
				$scope.errormeg = bookAgainResponse.data.status.message;
				$scope.errorClass = "block";
				$scope.errorDisplay($scope.errormeg,$scope.ErrorModalData);	
			}	
		},function(bookAgainResponse){
			if(bookAgainResponse.data.status.code == 0){
				$scope.errormeg = bookAgainResponse.data.status.message;
				$scope.errorClass = "block";
				$scope.errorDisplay($scope.errormeg,$scope.ErrorModalData);	
			}

		});
	}

	$scope.formsumbit = function()
	{
		var frm = document.getElementById("ePayment");
		//console.log("submit",frm);
		frm.submit();

	}

	$scope.searcAgain = function(){
		window.location.href = window.location.href.replace(/#.*$/, '');

	}

//	description : Corporate Opening popup to add the notification

	$scope.CorporateHotelBook = function(){ 
		$scope.ImageLoader = true;
		$scope.ButtonDisable = true;
		var modalInstance = $modal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'views/CustomNotification.jsp',
			controller: 'CustomNotificationCtrl',
			backdrop: 'static',
			keyboard: false,
			resolve: {
				items: function () {
					return $scope.items;
				}
			}
		});

		modalInstance.result.then(function (selectedItem) {
			$scope.agentBookConfirmation();

		}, function () {
			// $log.info('Modal dismissed at: ' + new Date());
		});
	};
	$scope.CorporateHotelBookmodal = function(){
		$scope.timestamp = jQuery.now();
		 
		
		$scope.ImageLoader = true;
		$scope.ButtonDisable = true;
		$scope.items1 = $scope.previewData;   	
		$scope.items2 = $scope.proceedDetails();
		$scope.items3 = $scope.proceedDetails().totalPayable;
		var modalInstance = $modal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'views/hotelBookingPreviewModal.jsp',
			controller: 'hotelBookingPreviewModalCtrl',
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
				}
			}
		});

		modalInstance.result.then(function (selectedItem) {
			$scope.agentBookConfirmation();

		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
			$scope.ImageLoader = false;
			$scope.ButtonDisable = false;
		});


	};
	$scope.AgentCardBook = function(){
		$scope.ImageLoader = true;
		$scope.ButtonDisable = true;
		var modalInstance = $modal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'views/CustomNotification.jsp',
			controller: 'CustomNotificationCtrl',
			backdrop: 'static',
			keyboard: false,
			resolve: {
				items: function () {
					return $scope.items;
				}
			}
		});

		modalInstance.result.then(function (selectedItem) {
			$scope.agentCardBookConfirmation();

		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
			$scope.ImageLoader = false;
			$scope.ButtonDisable = false;
		});
	};  
	$scope.AgentCardBookmodal = function(){
		$scope.ImageLoader = true;
		$scope.ButtonDisable = true;
		$scope.items1 = $scope.previewData;   	
		$scope.items2 = $scope.proceedDetails();
		var completeTotal = parseFloat($scope.proceedDetails().totalPayable);
		var paymentGatePrice = parseFloat((parseFloat($scope.proceedDetails().totalPayable) * parseFloat(2.0) / parseFloat(100)));
		$scope.items3 = Math.ceil(completeTotal + paymentGatePrice).toFixed(2);	

		var modalInstance = $modal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'views/hotelBookingPreviewModal.jsp',
			controller: 'hotelBookingPreviewModalCtrl',
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
				}
			}
		});

		modalInstance.result.then(function (selectedItem) {
			$scope.agentCardBookConfirmation();

		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
			$scope.ImageLoader = false;
			$scope.ButtonDisable = false;
		});
	};

	$scope.agentCardBookConfirmation = function(){

		$scope.bookconfirmloader = true; 
		//$scope.display = "none";
		var AgentCardconfirmvalues={};

		AgentCardconfirmvalues = $scope.proceedDetails();
		//console.log("AgentCardconfirmvalues",AgentCardconfirmvalues);

		hotelServices.PreBook(AgentCardconfirmvalues).then(function(hotelResponse){	
			$scope.bookconfirmloader = false; 
			if(hotelResponse.data.status.code == '1'){
				var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
				var firstDate = new Date(hotelResponse.data.search.datestart);
				var secondDate = new Date(hotelResponse.data.search.dateend);
				var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
				$scope.noofnights = diffDays;					
				$scope.totalPAyprice = parseFloat(hotelResponse.data.bookingRate.payableAmt).toFixed(2);
				$scope.oldprice = parseFloat($scope.totalamountpayable).toFixed(2);
				//	$scope.oldprice = $scope.getTotalAmountAfterCharges($scope.oldprice, true);	
				$scope.pgid = hotelResponse.data.book.paymentid;
				$scope.confirmationNumber = hotelResponse.data.book.paymentid;
				$scope.totalamt = $scope.totalPAyprice;
				$scope.totalprice = $scope.totalPAyprice;
				$("#reference_no").val($scope.pgid);
				$("#totalamt").val($scope.totalamt);			
				if(parseInt($scope.oldprice) != parseInt($scope.totalprice))
				{					
					//$scope.faredivdisplay = "block";				
					$scope.updatedprice = $scope.totalprice;
					$scope.updatedprice = Math.ceil($scope.updatedprice);
					$scope.searchdata = hotelResponse.data.search;
					$scope.fareChangeModalAlert($scope.oldprice,$scope.totalprice);
					if(parseInt($scope.oldprice) > parseInt($scope.totalprice))
						$scope.pricechagetext = "Hurrey.. The fare for selected hotel has decreased to ";
					if(parseInt($scope.oldprice) < parseInt($scope.totalprice))
						$scope.pricechagetext = "oops The fare for selected hotel has increased to";
					$scope.totalprice = parseFloat(Math.ceil($scope.totalprice)).toFixed(2);
					$http({
						method: 'Get',
						url: 'SetPricevalue',
						params: {Totalprice : $scope.totalprice},
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then(function(result) {

					}, function(error) {
					});
				}
				else
				{
					$scope.totalprice = parseFloat(Math.ceil($scope.totalprice)).toFixed(2);
					$http({
						method: 'Get',
						url: 'SetPricevalue',
						params: {Totalprice : $scope.totalprice},
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then(function(result) {


					}, function(error) {
					});
					$scope.formsumbit();
				}


			}
			else if(hotelResponse.data.status.code == '0'){

				if(hotelResponse.data.preBookRes.priceChanged == true){
					// $scope.faredivdisplay = "block";
					$scope.searchkey = hotelResponse.data.searchKey;
					$scope.hotelcode = hotelResponse.data.book.hotelCode;
					$scope.orderid = hotelResponse.data.book.orderid;
					$scope.oldhotelprice = hotelResponse.data.preBookRes.oldBookingFinalPrice;
					$scope.newhotelprice = hotelResponse.data.preBookRes.bookingFinalPrice;	  						     
					$scope.oldhotelprice = Math.ceil($scope.oldhotelprice);
					$scope.newhotelprice = Math.ceil($scope.newhotelprice);
					$scope.fareChangeModalAlert($scope.oldhotelprice,$scope.updatedprice);
					if($scope.oldhotelprice > $scope.newhotelprice)
						$scope.pricechagetext = "Hurrey.. The fare for selected room has decreased to";
					if($scope.oldhotelprice < $scope.newhotelprice)
						$scope.pricechagetext = "oops The fare for selected room has increased to";
				}else{
					$scope.errormeg = hotelResponse.data.status.message;
					/*$scope.errorClass = "block";
	  								$scope.display = "none";*/
					$scope.errorDisplay($scope.errormeg,$scope.ErrorModalData);	
				}
			}
			else
			{

				$scope.errormeg = hotelResponse.data.status.message;
				$scope.errorDisplay($scope.errormeg,$scope.ErrorModalData);	
			}	
		},function(hotelResponse){
			$scope.errormeg = hotelResponse.data.status.message;
			$scope.errorDisplay($scope.errormeg,$scope.ErrorModalData);	

		});



	}
	$scope.returnIndex = function(){
		window.location.href = window.location.href.replace(/#.*$/, '');
	}

	$scope.fareChangeModalAlert = function(old,newPrice){
		$(document).ready(function() {var modalInstance = $modal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'views/fareChangeModalHotel.jsp',
			controller: 'fareChangeModalHotelCtrl',
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
			$scope.formsumbit();

		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
		});
	}
	/*Show Error Message and Research on Error modal*/
	$scope.errorDisplay = function(errorMsg,Parameters){
		$(document).ready(function(){
			var modalInstance = $modal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'views/hotelErrorSearch.jsp',
				controller:'HotelErrorSearchCtrl',
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
	$scope.getRmdetails = function(roomIndex,passIndx,empID){
		var roomIndexID = roomIndex;
		 var passengerIndx = passIndx;
		 var empid = empID;
		 $scope.empCode = false;	$scope.department = false;	$scope.costCenter = false; 	$scope.apprName = false;
		 $scope.location = false;    $scope.trNumber = false; 	$scope.bussinessUnit = false;	$scope.projectCode = false;
		 $scope.reasonForTravel = false; 	$scope.billNonBill = false;
		 hotelServices.getRmDetailFields(empid).then(function(response){
			 //$http.get('rmfields.json').then(function(response){				
				 $('#room-'+roomIndexID+'-rmDetails-'+passengerIndx).show();				 
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

app.directive("starrating", function() {
	return {
		restrict : "ECA",
		transclude : true,
		template : "<a class=\"fa fa-star\" ng-repeat=\"i in getNumber(hotelinfo.basicPropertyInfo.hotel_Star) track by $index\"></a> "

	};
});

app.filter('num', function() {
	return function(input) {
		return parseInt(input, 10);
	}
});