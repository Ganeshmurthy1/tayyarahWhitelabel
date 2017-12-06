<style type="text/css">
.flightloading {
	width: 100%;
	height: 100%;
	position: fixed;
	display: block;
	opacity: 0.8;
	background-color: #fff;
	z-index: 99;
	text-align: center;
}

.flightloading-image {
	position: relative;
	top: 50%;
	z-index: 100;
}

.custom-er {
	width: 100%;
}

.custom-error {
	width: 50%;
	margin: 6% auto;
	background-color: #f1f1f1;
	border: 1px solid #ccc;
}

.custom-error .error-mess {
	padding: 30px 10px;
	color: #555;
}

.custom-er button {
	padding: 5px;
	font-size: 14px;
	margin-top: 30px;
}

.changeback {
	background-color: #f1f1f1;
	color: #45A16E;
}

.capitalize {
	display: inline-block;
}

.capitalize::first-letter {
	text-transform: uppercase;
}

.capitalize2 {
	text-transform: capitalize;
}
</style>
<style>
.spinloading {
	position: fixed;
	z-index: 9999;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.8);
	text-align: center;
}

.spinloading img {
	padding-top: 20%;
}

.spinloading p {
	margin-top: 10px;
	color: #fff;
}
</style>
<%@taglib prefix="s" uri="/struts-tags"%>
<s:if test="#session.isCorporate == true">
	<input type="hidden" id="isCor" value="true">
	
</s:if>
<div>
	<!-- header ends here -->
	<div class="spinloading" data-ng-show="pdfloader" data-ng-cloak>
		<img alt="loading" src="./images/spin.gif" width="50px">
		<p>Please wait while we are generating Hotel Voucher Pdf file</p>
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

	<div data-ng-show="PdfShowDiv">
		<form id="form">
			<div class="booking-details clearfix pdfPageWithPAd" id="print-page">
				<div class="printicopdf">
					<p class="print-icons">
						<a data-ng-click="downloadFile()"><i
							class="tayyarah-file-pdf-o" id="create_pdf"></i> </a>

					</p>
				</div>


				<div class="print-this" id="booking-hotel"
					style="background-color: #ffffff">
					<input type="hidden" value="" id="hotelorder">

					<div class="row">
						<div class="col-sm-12 clearfix">
							<div id="display-api-content" class="container"></div>
						</div>
					</div>
				</div>
			</div>
		</form>
	</div>
</div>
<!-- Price Change Div -->

<div class="container min-height500px" data-ng-show="errordiv"
	data-ng-cloak>
	<div class="visible-xs gradient-error ">

		<div class="spinner-error-mess">
			<div class="cont_error">
				<h1>Oops !</h1>
				<h2>
					<i class="tayyarah-frown-o" aria-hidden="true"></i>
				</h2>
				<p>Some thing went wrong.</p>
				<form data-ng-submit="returnIndex()">
					<button type="submit" data-ng-click="submitted == true"
						class="btn btn-primary btn-xs  ">Search again</button>
				</form>
			</div>
		</div>

	</div>
</div>
<div id="NullScope" class="DisplayNone">
	<div class="custom-error text-center">
		<div class="error-mess">
			<p>
				<b>Session Expired.</b>
			<p>Please Re-initate the Search</p>
			</p>
			<form data-ng-submit="returnIndex()">
				<button type="submit" class="btn btn-primary but"
					data-ng-click="submitted==true">Search again</button>
			</form>

		</div>
	</div>
</div>

