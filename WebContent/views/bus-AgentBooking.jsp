<style>
#print-page .print-this {
	border: 5px solid #ccc;
	width: 60% !important;
	margin-left: 19%;
	padding: 40px;
}

.printicopdf {
	width: 78%;
}

#print-page .print-icons i {
	font-size: 20px;
}
</style>
<%@taglib prefix="s" uri="/struts-tags"%>
<div class="seeeeee hidden-xs" data-ng-show="bookconfirmloader"
	data-ng-cloak>
	<div class="search-advertisement-box">
		<div class="clearfix">
			<img class="flightloading-image" src="images/spin.gif" width="50px"
				height="50px" alt="Loading..." />
			<p class="h5">Please wait, your booking is being proccessed</p>

		</div>
	</div>
</div>

<div class="spinloading" data-ng-show="pdfloader" data-ng-cloak>
	<img alt="loading" src="./images/spin.gif" width="50px">
	<p>Please wait while we are generating Flight Voucher Pdf file</p>
</div>
<!-- header ends here -->
<div class="print-contai" data-ng-show="successprint">
	<form id="form">
		<div class="booking-details clearfix" id="print-page">
			<div class="printicopdf">
				<p class="print-icons">
					<a><i class="tayyarah-file-pdf-o" id="create_pdf"
						data-ng-click="downloadFile()"></i></a>
				</p>
			</div>
			<div class="vouchmob-bus">
				<div class="print-this" style="background-color: #ffffff">

					<div class="row mobRow">
						<input type="hidden" value="" id="orderIdVal" />
						<div class="col-sm-12 clearfix ">
							<div id="display-api-content" class="container"></div>
						</div>
					</div>
				</div>
			</div>
		</div>

	</form>
</div>
