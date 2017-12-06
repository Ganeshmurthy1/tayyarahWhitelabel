<div class="login-pop-continer fare-change">
	<div class="login-pop-header clearfix">

		<div class="col-md-12 col-sm-12 col-xs-12">
			<p class="h4">Fare Change alert</p>
		</div>
		<div class="col-xs-6"></div>
	</div>
	<div class="login-pop-content">
		<div class="oops">
			<p class="bg-info" style="padding: 5px;">
				<span><i class="tayyarah-info-circle fa-2x"></i></span>
				{{pricechagetext}} <i data-ng-class="classname"></i>
				{{updatedprice}}
			</p>
		</div>
		<div class="clearfix">
			<div class="col-xs-6 updated clearfix">
				<ul>
					<li>Old fare<span class=""><i data-ng-class="classname"></i>
							{{oldprice}}</span></li>
					<li>Updated fare<span class="320pxUpdateFare"><i
							data-ng-class="classname "></i>{{updatedprice}}</span></li>
				</ul>
			</div>
			<div class="col-xs-6 reasons clearfix">
				<h5>Reasons</h5>
				<ul>
					<li>Room rates are dynamic and subject to change.This change
						is beyond our control</li>
				</ul>
			</div>
		</div>

		<div class=" clearfix text-center">
			<button type="button" class="btn btn-primary b-ok " id="Continuefare"
				data-ng-click="continueBooking()">Continue</button>
			<button type="button" class="btn btn-primary b-ok " id="dontContinue"
				data-ng-click="cancelBooking()">Cancel</button>

		</div>
	</div>
	<div class="login-pop-footer cleqarfix"></div>
</div>