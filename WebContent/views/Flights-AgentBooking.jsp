<%@taglib prefix="s" uri="/struts-tags"%>

<s:if test="#session.isCorporate == true">
	<input type="hidden" id="isCor" value="true">
	
</s:if>
<div class="visible-xs gradient" data-ng-show="bookconfirmloader">
	<div class="spinner">
		<!-- <p class="white"><i class="tayyarah-plane"></i></p> -->
		<div class="rect1"></div>
		<div class="rect2"></div>
		<div class="rect3"></div>
		<div class="rect4"></div>
		<div class="rect5"></div>
		<p class="white">Loading....</p>
	</div>
</div>
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

			<div class="print-this" style="background-color: #ffffff">

				<div class="row mobRow">
					<input type="hidden" value="" id="orderIdVal" />
					<div class="col-sm-12 clearfix ">
						<div id="display-api-content" class="container"></div>
					</div>
				</div>
			</div>
		</div>

	</form>
</div>
<!-- </div>  -->
<div class="row print-contai" data-ng-show="successprintRound">

	<div class="col-md-6">
		<form id="form">
			<div class="booking-details clearfix" id="print-page">
				<div class="printicopdf">
					<p class="print-icons">
						<a><i class="tayyarah-file-pdf-o" id="create_pdf"
							data-ng-click="downloadFile()"></i></a>
					</p>
				</div>

				<div class="" style="background-color: #ffffff">

					<div class="row">
						<input type="hidden" value="" id="orderIdVal" />
						<div class="col-sm-12 clearfix ">
							<div id="display-api-Roundcontent" class=""></div>

						</div>
					</div>
				</div>
			</div>

		</form>
	</div>
	<div class="col-md-6">
		<form id="form">
			<div class="booking-details clearfix" id="print-page">
				<div class="printicopdf">
					<p class="print-icons">
						<a><i class="tayyarah-file-pdf-o" id="create_pdf"
							data-ng-click="downloadFile2()"></i></a>
					</p>
				</div>

				<div class="" style="background-color: #ffffff">

					<div class="row">
						<input type="hidden" value="" id="orderIdVal" />
						<div class="col-sm-12 clearfix ">
							<div id="display-api-Roundcontent2" class=""></div>

						</div>
					</div>
				</div>
			</div>

		</form>
	</div>
</div>
</div>

<div class="seeeeee ErrorSee" data-ng-show="errordiv" data-ng-cloak>

	<div class="visible-xs gradient-error ">

		<div class="spinner-error">
			<div class="double-bounce1"></div>
			<div class="double-bounce2"></div>
		</div>
		<div class="col-xs-12 mobContinue">
			<p class="col-xs-12 text-center">
				<b class="text-center whiteText">{{bookingComments}}</b>
			</p>
		</div>
		<form class="col-xs-12 mobContinue" ng-submit="returnIndex()">
			<button type="submit" ng-click="submitted == true"
				class="btn btn-primary but">Search again</button>
		</form>

	</div>
</div>

