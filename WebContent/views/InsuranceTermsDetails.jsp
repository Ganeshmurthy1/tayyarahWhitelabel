 <style>
.modal-lg{
    width: 900px;
    margin: 10px -20%;
}
.bodyHeight{
height:450px;
}
.embeddedPDF{
width:100%;
 height:422px;
}
 </style>
<div class="modal-dialog  modal-lg margintop85px" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel">
	<div class="modal-content timeModal">
		<div class="modal-header">
			<h4 class="modal-title text-center">Insurance Terms and Conditions.</h4>
		</div>
		<div class="modal-body">

		<div class="row">
			<div data-ng-if="plan1" >
			<embed src="./images/BharathiAxAInternational.PDF" class="embeddedPDF"/>
			</div>
			  <div data-ng-if="plan2" >
			<embed src="./images/GroupDomesticTravel-PolicyWordings.pdf" class="embeddedPDF"/>
			</div>
			 <div data-ng-if="noPlan" >
			 <div class="text-center margin50px">Please Select the DOB to show the Details.</div>
			</div>
			
			<div></div>
		 </div>
		</div>
		<div class="modal-footer margin5px">
			<button class="btn btn-default bordergrey" ng-click="close()">Close</button>


		</div>