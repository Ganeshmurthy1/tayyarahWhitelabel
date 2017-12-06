<style>
.sessionDiv, .SessionTemplate {
	/* background: url(design/bg_blue.jpeg) no-repeat center center fixed; */
	background-size: cover;
	background-color: transparent;
	min-height: 800px;
}

.group1Border {
	border: 1px solid #ccc;
	margin-bottom: 15px;
	background-color: #fff;
}

.booking-details aside .booking-box ul.booking-fare-details {
	list-style: none;
	padding: 7px;
	/* border: 1px solid #ccc; */
	color: #555;
}
</style>
<%@taglib prefix="s" uri="/struts-tags"%>
<input type="hidden" name="apiUrl" id="apiUrl" value="{{ApiUrl}}">
<input type="hidden" name="companyId" id="compId"	value="<s:property value="%{#session.agent.Companyid}"/>">
<s:if test="#session.isCorporate == true">
	<input type="hidden" id="isCor" value="true">
	
</s:if>
<s:if test="#session.isCorporate == true || #session['agent'] != null ">
	<input type="hidden" name="isB2BandB2E" id="isB2BandB2E" value="true">
</s:if>
<div class=" container FlightBookCont greyContainer">
	<div class="col-md-12 col-sm-12 col-xs-12 initialHeight">
		<div class="col-md-3 col-sm-12 col-xs-12 mobHide">
			<div data-ng-include="filter"></div>
		</div>
		<div class="col-md-9 col-sm-12 col-xs-12">
			<div data-ng-include="mainContent"></div>
		</div>


	</div>

</div>

