<%@taglib prefix="s" uri="/struts-tags"%>
<div class="iamge">
	<img alt="privacty policy" src="images/termsandcondition3.jpg"
		class="img-responsive" style="width: 100%;">
</div>
<article class="container TermsArtic">
	<div class="policy clearfix">
		<h1 class="privacypolicy">Terms and Conditions</h1>
		<ul class="TermsArticUl">
			<li>Fares are subject to availability. If there is any fare
				change we will notify you immediately.</li>

			<li>Online Date/Flight change not allowed.</li>

			<li>All reservations made through our website are as per the
				terms and conditions of the concerned airlines.</li>



			<li>The primary guest must be at least 18 years of age to check
				into this hotel</li>
			<li>It is mandatory for all guests above 18 years of age to
				carry a valid photo identity card &amp; address proof at the time of
				check-in. You can carry any of the following documents as a valid
				proof - Driving License, Passport or Voters ID. If your check-in is
				denied by the hotel due to lack of required documents, you cannot
				claim a refund &amp; your booking will be considered as NO SHOW.</li>

			<li>In case of an increase in the hotel tariff (for example
				Christmas, New Year, International Event, Holidays) the customer is
				liable to pay the difference if the stay period falls during these
				dates.</li>

			<li>Tayyarah will not be responsible for any service issues at
				the hotel.</li>

			<li>If you wish to book multiple rooms, you must use a different
				name for each room or the duplicate reservation may be cancelled by
				the hotel.</li>

			<li>Most hotels do not allow unmarried / unrelated couples to
				check-in. This is at full discretion of the hotel management. No
				refund would be applicable in case the hotel denies check-in under
				such circumstances.</li>

			<li>The standard check-in time is 12:00 PM and the standard
				check-out time is 12:00 PM. Early check-in or late check-out is
				strictly subjected to availability and may be chargeable by the
				hotel. Any early check-in or late check-out request must be directed
				and reconfirmed with hotel directly.</li>
		</ul>
		<p class="h3 pull-right">Thank you for choosing Tayyarah !</p>
	</div>
</article>



<script>
	
</script>

<script>
	$(document).ready(function() {
		$('#login-trigger').click(function() {
			$(this).next('#login-content').slideToggle();
			$(this).toggleClass('active');

			if ($(this).hasClass('active'))
				$(this).find('span').html('&#x25B2;')
			else
				$(this).find('span').html('&#x25BC;')
		})
	});

	
</script>
