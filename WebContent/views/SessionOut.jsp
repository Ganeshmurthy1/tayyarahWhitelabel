
<div data-ng-include="header" data-ng-controller="HeadCtrl"></div>
<!--  <div id="NullScope" class="DisplayNone"> -->
<div id="NullScope" style="min-height: 425px;">
	<div class="custom-error text-center">
		<div class="error-mess">
			<p>
				<b>Session Expired.</b>
			<p>Please Re-initate the Search</p>
			</p>
			<!-- <a href="#/" class="btn btn-primary  SessionBtn"
                            data-ng-click="submitted==true">Search again</a> -->
			<form data-ng-submit="returnIndex()">
				<button type="submit" class="btn btn-primary but SessionBtn"
					data-ng-click="submitted==true">Search again</button>
			</form>

		</div>
	</div>
</div>
<div data-ng-include="footer" data-ng-controller="FootCtrl"></div>