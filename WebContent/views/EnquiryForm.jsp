<%@taglib prefix="s" uri="/struts-tags"%>
<s:if test="hasActionErrors()">

	<div class="login-pop-up clearfix" id="error-alert"
		style="display: block;">
		<div class="login-pop-continer">
			<div class="login-pop-header col-sm-12 clearfix">
				<div class="col-xs-6">
					<p class="h4">Error</p>

				</div>
				<div class="col-xs-6">
					<p class="pull-right">
						<a href="#" class="b-cl"><i class="fa fa-times"></i></a>
					</p>
				</div>
			</div>
			<div class="login-pop-content">
				<p class="clearfix">
					<s:actionerror />
				</p>
				<div class=" clearfix">
					<button type="button" class="btn btn-primary b-ok pull-right">ok
					</button>
				</div>
			</div>
			<div class="login-pop-footer cleqarfix"></div>
		</div>
	</div>
</s:if>
<s:if test="hasActionMessages()">
	<div class="login-pop-up clearfix" id="success-alert">
		<div class="login-pop-continer">
			<div class="login-pop-header col-sm-12 clearfix">
				<div class="col-xs-6">
					<p class="h4">Success</p>
				</div>
				<div class="col-xs-6">
					<p class="pull-right">
						<a href="#" class="b-cl"><i class="fa fa-times"></i></a>
					</p>
				</div>
			</div>
			<div class="login-pop-content">
				<p>
					<s:actionmessage />
				</p>
				<div class=" clearfix">
					<button type="button" class="btn btn-primary b-ok pull-right">ok
					</button>
				</div>
			</div>
			<div class="login-pop-footer cleqarfix"></div>
		</div>
	</div>
</s:if>
<article class="container">
	<div class="enquery-fform">
		<h3>
			<span>Enquiry Form</span>
		</h3>



		<form class="form-horizontal" id="my-form">
			<fieldset>

				<div class="form-group">
					<label for="destination" class="col-sm-4 control-label">Destination*</label>
					<div class="col-sm-8">
						<!-- onkeypress="return isAlphabetKey(event,this);" -->
						<input type="text" class="form-control" id="destination"
							name="destination" placeholder="Destination" required
							onkeypress="return isAlphabetKey(event,this);">

					</div>
				</div>

				<div class="form-group">
					<label for="sa" class="col-sm-4 control-label">Mode Of
						Travel</label>
					<div class="col-sm-8">
						<select class="form-control" id="modeOfTravel" name="modeOfTravel"
							required>
							<option value="mode" class="disabled">Select your mode</option>
							<option value="TourPackages">General Enquiry</option>
							<option value="TourPackages">Tour Packages</option>
							<option value="GroupPackages">Group Packages</option>
							<option value="HolidayPackages">Holiday Packages</option>
							<option value="UmrahPackages">Umrah Packages</option>

						</select>
					</div>
				</div>

				<div class="form-group">
					<label for="inputFrom" class="col-sm-4 control-label">Starting
						City*</label>
					<div class="col-sm-8">
						<input type="text" class="form-control" id="orginCity"
							name="orginCity" placeholder="Starting City" required
							onkeypress="return isAlphabetKey(event,this);">
					</div>
				</div>

				<div class="form-group">
					<label for="checkin" class="col-sm-4 control-label">Check
						in*</label>
					<div class="col-sm-8">
						<input type="text" class="form-control" id="datein"
							name="checkinDateTime" onkeydown="return false;"
							placeholder="DD/MM/YYYY" autocomplete="off" required>
					</div>
				</div>

				<div class="form-group">
					<label for="checkin" class="col-sm-4 control-label">Check
						Out*</label>
					<div class="col-sm-8">
						<input type="text" class="form-control" id="dateout"
							name="checkoutDateTime" onkeydown="return false;"
							placeholder="DD/MM/YYYY" autocomplete="off" required>
					</div>
				</div>

				<div class="form-group">
					<label for="destination" class="col-sm-4 control-label">No
						Of People</label>
					<!-- onkeypress="return isNumberKey(event,this)" -->
					<div class="col-sm-8">
						<input type="text" class="form-control" id="noOfPeople"
							name="noOfPeople" placeholder="No of people"
							onkeypress="return isNumberKey(event,this)">
					</div>
				</div>

				<div class="form-group">
					<label for="destination" class="col-sm-4 control-label">Type
						of Hotel</label>
					<div class="col-sm-8">
						<input type="text" class="form-control" id="typeOfHotel"
							name="typeOfHotel" placeholder="Type of Hotel">
					</div>
				</div>

				<div class="form-group">
					<label for="destination" class="col-sm-4 control-label">Budget
						Range ( if any ) per person</label>
					<div class="col-sm-8">
						<input type="text" class="form-control" id="budgetRange"
							name="budgetRange" placeholder="Budget Range"
							onkeypress="return isNumberKey(event,this)">
					</div>
				</div>

				<div class="form-group">
					<label for="textArea" class="col-sm-4 control-label">Any
						other details</label>
					<div class="col-sm-8">
						<textarea class="form-control" placeholder="Any other details"
							rows="3" id="textArea" name="others"></textarea>
					</div>
				</div>



				<div>
					<legend>Personal Information for us to reach you back.</legend>
				</div>


				<div class="form-group">
					<label for="inputEmail" class="col-sm-4 control-label">Name*</label>
					<div class="col-sm-8">
						<input type="text" class="form-control" id="userName"
							name="userName" placeholder="Name" required
							onkeypress="return isAlphabetKey(event,this);">
					</div>
				</div>

				<div class="form-group">
					<label for="inputEmail" class="col-sm-4 control-label">Email*</label>
					<div class="col-sm-8">
						<input type="email" class="form-control" id="userEmail"
							name="userEmail" placeholder="Email" required
							pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
							oninvalid="setCustomValidity('Email address not vaild')"
							onchange="try{setCustomValidity('')}catch(e){}">
					</div>
				</div>

				<div class="form-group">
					<label for="inputEmail" class="col-sm-4 control-label">Mobile*</label>
					<div class="col-sm-8">
						<input type="text" class="form-control" id="userMobile"
							name="userMobile" placeholder="Mobile" required minlength="10"
							maxlength="10" onkeypress="return isNumberKey(event,this)"
							required autocomplete="off"
							oninvalid="setCustomValidity('Mobile number not vaild')"
							onchange="try{setCustomValidity('')}catch(e){}">
					</div>
				</div>
				<div class="form-group">
					<label for="textArea" id="preferedDateTime"
						class="col-sm-4 control-label">Prefered Time to Call</label>
					<div class="col-sm-8">
						<!--  <input type="text" class="form-control"  name="preferedDateTime" data-date-format="DD/MM/YYYY HH:mm:ss" id="datetimepicker" /> -->
						<textarea class="form-control" rows="3" id="preferedDateTime"
							placeholder="Prefered Time to Call" name="preferedDateTime"></textarea>
						<!--  <input type="time" id="preferedDateTime" name="preferedDateTime" placeholder="hrs:mins" value="" pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$"  required> -->
					</div>
				</div>
				<div class="form-group tayy-button text-center">
					<button type="submit" id="enquiry" class="btn btn-info">Submit</button>
				</div>
			</fieldset>
		</form>
	</div>
	<div id="myDialog" title="Important information">
		<span class="ui-state-default"><span
			class="ui-icon ui-icon-info" style="float: left; margin: 0 7px 0 0;"></span></span>
		<div style="margin-left: 23px;">
			<p>
				Registration Failed - try After Sometime <br />
				<br /> Thank You
			</p>
		</div>
	</div>
	<div id="myDialogs" title="Important information">
		<span class="ui-state-default"><span
			class="ui-icon ui-icon-info" style="float: left; margin: 0 7px 0 0;"></span></span>
		<div style="margin-left: 23px;">
			<p>
				Thank you for filling out your information! <br />
				<br /> We have received your message and would like to thank you
				for writing to us. If your inquiry is urgent, please use the
				telephone number listed below, to talk to one of our staff members.
				Otherwise, we will reply by email shortly. Talk to you soon,

				Tayyarah # 19 "The Oyster",2nd floor, Nandi durga road, Jaymahal
				extension, Bengaluru-560046 +91-080-42855555
			</p>
		</div>
	</div>

</article>
<!-- Your site ends -->

<script>


$(document).ready(function(){
    $('#login-trigger').click(function() {
        $(this).next('#login-content').slideToggle();
        $(this).toggleClass('active');                    
        
        if ($(this).hasClass('active')) $(this).find('span').html('&#x25B2;')
            else $(this).find('span').html('&#x25BC;')
        })
});


$('#datein').datepicker({
	    numberOfMonths: 2,
	    firstDay: 1,
	    dateFormat: 'dd/mm/yy',
	    minDate: '0', 
	  
	    onSelect: function(dateStr) {
	    	console.log(dateStr);
	        var d1 = $(this).datepicker("getDate");
	        d1.setDate(d1.getDate() + 0); // change to + 1 if necessary
	        var d2 = $(this).datepicker("getDate");
	        d2.setDate(d2.getDate() + 31); // change to + 29 if necessary
	        $("#dateout").datepicker("setDate", null);
	        $("#dateout").datepicker("option", "minDate", d1);
	       // $("#twodpd2").datepicker("option", "maxDate", d2);
	       
	    },
	    onClose : function(dateSt)
	    {
	      $("#dateout").focus();  
	    }
	});


	$("#dateout").datepicker({
	  numberOfMonths: 2,
	    firstDay: 1,
	    dateFormat: 'dd/mm/yy',
	   
	    onSelect: function(dateStr) {
	       
	    }
	});

	  function isNumberKey(evt,obj){
       var charCode = (evt.which) ? evt.which : event.keyCode;
       if (charCode > 31 && (charCode < 48 || charCode > 57))   
      	
           return false;
   }
   function isAlphabetKey(evt,textbox){
       evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if(textbox.value.trim() == ''){
        	if(charCode == 32)
        	       return false;
        }
        if (charCode > 32 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
            return false;
        }             
        return true;
        } 
        
$(document).on("click", "#enquiry", signupClick);

function signupClick() {
if($('#my-form')[0].checkValidity()){
console.log("signup");
var destination = $("#destination").val();
var modeOfTravel = $("#modeOfTravel").val();
var orginCity = $("#orginCity").val();
var checkinDateTime = $("#datein").val();
var checkoutDateTime = $("#dateout").val();
var noOfPeople = $("#noOfPeople").val();
var typeOfHotel = $("#typeOfHotel").val();
var budgetRange = $("#budgetRange").val();
var others = $("#textArea").val();
var userName = $("#userName").val();
var userEmail=$("#userEmail").val();
var userMobile = $("#userMobile").val();
var preferedDateTime=$("#preferedDateTime").val();
            
var totUrl = $(location).attr('href');
//console.log(totUrl);
var newUrl = totUrl.substr(0, totUrl.lastIndexOf('/#/') + 1);
//console.log(newUrl);
	/* var newUrl = totUrl.substr(0, totUrl.lastIndexOf('/') + 1); */
	var finalUrl = newUrl+"SendTravelQuery";
	 console.log(finalUrl);
$.ajax({
  url: finalUrl,
  type: 'POST',
  dataType: 'json',
  data: {
  	destination: destination,
  	modeOfTravel: modeOfTravel,
  	orginCity: orginCity,
  	checkinDateTime: checkinDateTime,
  	checkoutDateTime: checkoutDateTime,
  	noOfPeople: noOfPeople,
  	typeOfHotel: typeOfHotel,
  	budgetRange: budgetRange,
  	others: others,
	    userName: userName,
	    userEmail: userEmail,
	    userMobile: userMobile,
	  preferedDateTime: preferedDateTime
    },
  success: function (response) {
    handleResult(response); 
    
  },
	error: function(xhr, status, error)
	{
		 $("#myDialog").dialog("open"); 
	   console.log("Error----------"+error);
	 console.log("Error----------"+error);
	}
  
});
}
}

function handleResult(response) {
var message = "Enquiry successfully send";
var totUrl = $(location).attr('href');
//console.log(totUrl);
var newUrl = totUrl.substr(0, totUrl.lastIndexOf('/#/') + 1);
  $("#myDialogs").dialog("open");
  console.log("location index",newUrl+"#/");
document.location.href=newUrl+"#/";

} 



$("#myDialog").dialog({
autoOpen  : false,
modal     : true,
draggable: false,
resizable: false,
position: ['center', 'top'],
show: 'blind',
hide: 'blind',
width: 400,
dialogClass: 'ui-dialog-osx',
buttons: {
  "I've read and understand this": function() {
      $(this).dialog("close");
  }
}

});

$("#myDialogs").dialog({
autoOpen  : false,
modal     : true,
draggable: false,
resizable: false,
position: ['center', 'top'],
show: 'blind',
hide: 'blind',
width: 400,
dialogClass: 'ui-dialog-osx',
buttons: {
 Close: function() {
      $(this).dialog("close");
  }
}

});
</script>