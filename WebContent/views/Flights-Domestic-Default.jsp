<%@taglib prefix="s" uri="/struts-tags"%>
<s:if test="#session.isCorporate == true">
	<input type="hidden" id="isCorporate" value="true">
</s:if>
<s:else>
	<input type="hidden" id="isCorporate" value="false">
</s:else>

<s:if test="#session['agent'] != null">
	<input type="hidden" name="ccy" id="onecurrencyname"
		value="<s:property value="%{#session.agent.currencyCode}"/>">
	<input type="hidden" name="ay" id="ay"
		value="<s:property value="%{#session.agent.Securityanswer}"/>">
</s:if>
<s:else>
	<input type="hidden" name="ccy" id="onecurrencyname" value="INR">
	<input type="hidden" name="ay" id="ay" value="zqJ3R9cGpNWgNXG55ub/WQ==">
</s:else>
<div class=" container flightDomCont greyContainer">
	<div class="col-md-12 col-sm-12 col-xs-12 initialHeight">
		<div class="col-md-2 padZero mobHide">
			<div data-ng-include="filter"></div>
		</div>
		<div class="col-md-10 padZero ">
			<div data-ng-include="Content"></div>
		</div>
	</div>

</div>


