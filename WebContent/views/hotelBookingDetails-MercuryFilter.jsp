<%@taglib prefix="s" uri="/struts-tags"%>
<div>
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
	<!-- Price Change Div -->

	<div class="login-pop-up clearfix " id="farechangediv"
		data-ng-style="{ 'display' : faredivdisplay}" data-ng-cloak>
		<div class="login-pop-continer fare-change">
			<div class="login-pop-header clearfix">

				<div class="col-xs-6">
					<p class="h4">Fare Change alert</p>
				</div>
				<div class="col-xs-6"></div>
			</div>
			<div class="login-pop-content">
				<div class="oops">
					<p class="bg-info" style="padding: 5px;">
						<span><i class="tayyarah-info-circle fa-2x"></i></span>
						{{pricechagetext}} <i data-ng-class="classname"></i>
						{{newhotelprice}}
					</p>
				</div>
				<div class="clearfix">
					<div class="col-xs-5 updated clearfix">
						<ul>
							<li>Old fare<span class=""><i
									data-ng-class="classname"></i> {{oldhotelprice}}</span></li>
							<li>Updated fare<span class=""><i
									data-ng-class="classname"></i>{{newhotelprice}}</span></li>
						</ul>
					</div>
					<div class="col-xs-7 reasons clearfix">
						<h5>Reasons</h5>
						<ul>
							<li>Room rates are dynamic and subject to change.This change
								is beyond our control</li>
						</ul>
					</div>
				</div>

				<div class=" clearfix text-center">
					<button type="button" class="btn btn-primary b-ok "
						id="Continuefare" data-ng-click="bookagain();">Continue</button>
					<button type="button" class="btn btn-primary b-ok " id="Change"
						data-ng-click="searcAgain()">Cancel</button>
				</div>
			</div>
			<div class="login-pop-footer cleqarfix"></div>
		</div>
	</div>
	<!-- End of price div -->
	<s:if test="#session.isCorporate == true">
		<input type="hidden" name="isCorporate" id="isCorporate" value="true">
	</s:if>
	<div class="col-md-12 padding-0px"
		data-ng-style="{'display' : display}" data-ng-cloak>
		<!-- <div id="loading-bar-container" class="hidden-xs"></div> -->
		<div class="row" data-ng-show="bookconfirmloader">
			<div class="bar hidden-xs"></div>
			<span><b class="LoadingDetailText col-md-12">Please wait
					while we loading hotel summary...</b></span>
		</div>
		<div class="booking-details clearfix">

			<div class="col-md-12 offcanvas padding-0px" id="fare">

				<div class="closebtn done">
					<button class="offcanvas__trigger--close btn" data-rel="fare">Done</button>
				</div>
				<aside class="clearfix">
					<div class="booking-box">

						<h4>Fare details</h4>
						<ul class="booking-fare-details backgroundWhite">
							<li class="border-bottomNone"
								data-ng-repeat="roomtype in hotelinfo.roomRates.roomRates">

								<p>
									<span class="ty-orange" style="font-size: 12px;"> Room
										{{getroomtypename(roomtype.roomTypeCode)}}/ Per night</span>
								</p>
								<p class="bsp ">
									Base Price <span><span class="pull-right"><i
											class="tayyarah-inr"></i>
											{{convertrateintofloat(roomtype.rates.rates[0].bookingPrice.amountBeforeTax)}}</span></span>
								</p>
								<p data-ng-show="getRoomTax(roomtype) != 0" class="bsp ">
									Taxes <span><span class="pull-right"><i
											class="tayyarah-inr"></i> {{getRoomTax(roomtype)}}</span></span>
								</p>
								<p data-ng-show="getRoomDiscount(roomtype) != 0"
									class="bsps borderBtm">
									Discount
									<!-- <img src="images/discount.gif"> -->
									<span><span class="pull-right"><i
											class="tayyarah-inr"></i> {{getRoomDiscount(roomtype)}}</span></span>
								</p>

							</li>
							<li class="border-topNone"><span>{{noofrooms}}</span>
								Room(s) x <span>{{noofnights}}</span> Night(s) <span></span> <span><span
									class="pull-right"><i class="tayyarah-inr"></i>
										{{totalamtbeforeothercharges}}</span></span></li>
							<div data-ng-show="ServiceTaxes">
								<li>Base Service Tax <span class="pull-right"
									data-ng-style="{ 'display' : isfareloaded}"> <i
										data-ng-class="classname"></i>{{baseServicetax}}
								</span><span id="leftloading" data-ng-show="farebeforeload"> <img
										src="images/priceloadingsmall.gif" class="pricesmallload"></span>
								</li>
								<li>Swatch Bharath Cess<span class="pull-right"
									data-ng-style="{ 'display' : isfareloaded}"> <i
										data-ng-class="classname"></i>{{sbc}}
								</span><span id="leftloading" data-ng-show="farebeforeload"> <img
										src="images/priceloadingsmall.gif" class="pricesmallload"></span>
								</li>
								<li>Krishi Kalyan Cess<span class="pull-right"
									data-ng-style="{ 'display' : isfareloaded}"> <i
										data-ng-class="classname"></i>{{kkc}}
								</span><span id="leftloading" data-ng-show="farebeforeload"> <img
										src="images/priceloadingsmall.gif" class="pricesmallload"></span>
								</li>
								<li>Total Service Tax <span class="pull-right"
									data-ng-style="{ 'display' : isfareloaded}"> <i
										data-ng-class="classname"></i>{{totalServiceTax}}
								</span><span id="leftloading" data-ng-show="farebeforeload"> <img
										src="images/priceloadingsmall.gif" class="pricesmallload"></span>
								</li>
								<li class="hotelmanagement">Management Fee<span
									class="pull-right" data-ng-style="{ 'display' : isfareloaded}">
										<i data-ng-class="classname"></i>{{managementFee}}
								</span><span id="leftloading" data-ng-show="farebeforeload"> <img
										src="images/priceloadingsmall.gif" class="pricesmallload"></span>
								</li>
							</div>
							<div data-ng-show="GSTServiceTaxes">

								<li ng-if="CGSTTax !=0">CGST <span class="pull-right"
									data-ng-style="{ 'display' : isfareloaded}"> <i
										data-ng-class="classname"></i>{{CGSTTax }}
								</span><span id="leftloading" data-ng-show="farebeforeload"> <img
										src="images/priceloadingsmall.gif" class="pricesmallload"></span>
								</li>
								<li ng-if="SGSTTax !=0">SGST <span class="pull-right"
									data-ng-style="{ 'display' : isfareloaded}"> <i
										data-ng-class="classname"></i>{{SGSTTax}}
								</span><span id="leftloading" data-ng-show="farebeforeload"> <img
										src="images/priceloadingsmall.gif" class="pricesmallload"></span>
								</li>
								<li ng-if="IGSTTax !=0">IGST <span class="pull-right"
									data-ng-style="{ 'display' : isfareloaded}"> <i
										data-ng-class="classname"></i>{{IGSTTax}}
								</span><span id="leftloading" data-ng-show="farebeforeload"> <img
										src="images/priceloadingsmall.gif" class="pricesmallload"></span>
								</li>
								<li ng-if="UGSTTax !=0">UGST <span class="pull-right"
									data-ng-style="{ 'display' : isfareloaded}"> <i
										data-ng-class="classname"></i>{{UGSTTax}}
								</span><span id="leftloading" data-ng-show="farebeforeload"> <img
										src="images/priceloadingsmall.gif" class="pricesmallload"></span>
								</li>
								<li>GST <span class="pull-right"
									data-ng-style="{ 'display' : isfareloaded}"> <i
										data-ng-class="classname"></i>{{GSTTax}}
								</span><span id="leftloading" data-ng-show="farebeforeload"> <img
										src="images/priceloadingsmall.gif" class="pricesmallload"></span>
								</li>
								<li class="hotelmanagement">Management Fee<span
									class="pull-right" data-ng-style="{ 'display' : isfareloaded}">
										<i data-ng-class="classname"></i>{{managementFee}}
								</span><span id="leftloading" data-ng-show="farebeforeload"> <img
										src="images/priceloadingsmall.gif" class="pricesmallload"></span>
								</li>

							</div>
							<li data-ng-show="otherchargesB2C != undefined">Conveyance
								Fee<span class="pull-right"><i class="tayyarah-inr"></i>{{otherchargesB2C}}</span>
							</li>
							<li style="display: none;" id="B2Bothercharges">Conveyance
								Fee<span class="pull-right"><i class="tayyarah-inr"></i><span
									id="otherchargetext"></span></span>
							</li>
							<li>Grand Total <span><span class="pull-right"><i
										class="tayyarah-inr"></i> <span id="hoteltotal">
											{{totalpayableamount}} </span></span></span></li>
							<li class="h3 fontsz18px">Total Payable Amount <span><span
									class="pull-right"><i class="tayyarah-inr"></i> <span
										id="hotelAmttotal"> {{totalamountpayable}} </span></span></span></li>

						</ul>

					</div>
				</aside>
			</div>
			<!-- col-3 -->

			<!-- col-9 ends -->
		</div>
	</div>

	<div class="container minheight250px"
		data-ng-style="{'display' : errorClass}" data-ng-cloak>
		<div class="visible-xs gradient-error">
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
</div>
<script src="js/calender/jquerycal.js"></script>
<script src="js/calender/jquerycalUI.js"></script>
<script src="js/jquery-offcanvas.min.js"></script>
<script>
	$(document).ready(function() {
		$('#one, #searchrefine, #fare').iptOffCanvas({
			baseClass : 'offcanvas',
			type : 'left'
		});
	});
</script>
