<%--  <%@ page session="true" %>
${sessionScope}  --%>

<style>
#loading-bar-container {
	display: none;
}
</style>

<%@taglib prefix="s" uri="/struts-tags"%>

<div>
	<div class=" super-content">
		<s:if test="#session.isCorporate == true">
			<!-- Advertise banner options come here -->
			<div class=" clearfix">

				<div id="carousel-id" class="carousel slide carousel-fade"
					data-ride="carousel">

					<div class="carousel-inner">
						<div class="item">
							<img alt="First slide" src="images/HD/cor1.jpg">
						</div>
						<div class="item active">
							<img alt="First slide" src="images/HD/cor2.jpg">
						</div>
						<div class="item">
							<img alt="First slide" src="images/HD/cor3.jpg">
						</div>
						<div class="item">
							<img alt="First slide" src="images/HD/cor4.jpg">
						</div>
					</div>
				</div>
			</div>
		</s:if>
		<s:else>
			<s:if test="#session.isSliderEnabled == false">
				<div class="SliderRemovedHeight"></div>
			</s:if>
			<s:else>
				<div class=" clearfix">
					<div id="carousel-id" class="carousel slide carousel-fade"
						data-ride="carousel">

						<div class="carousel-inner">
							<div class="item">
								<img alt="First slide" src="images/HD/cor1.jpg">
							</div>
							<div class="item active">
								<img alt="First slide" src="images/HD/cor2.jpg">
							</div>
							<div class="item">
								<img alt="First slide" src="images/HD/cor3.jpg">
							</div>
							<div class="item">
								<img alt="First slide" src="images/HD/cor4.jpg">
							</div>
						</div>
					</div>
				</div>
			</s:else>
			<!-- Advertise banner options come here -->

		</s:else>
		<!-- booking options comes here -->
		<div class="col-sm-10 tayyarah-search-engine">
			<div class="tayyarah-home-tabs">
				<!-- Nav tabs -->
				<s:if test="#session.isCorporate == true">

					<ul class="nav nav-tabs active-tab" role="tablist">
						<li role="presentation" class="active" id="Flightli"><a
							data-ng-click="FlightMenu()" aria-controls="flights" role="tab"
							data-toggle="tab"> <img class="airimge  "></img> <!-- <i class="tayyarah-plane"></i> -->
								Flight
						</a></li>

						<li role="presentation" id="Hotelli"><a
							data-ng-click="HotelMenu()" aria-controls="hotels" role="tab"
							data-toggle="tab"> <!--  <i
							class="tayyarah-hotel"></i> --> <img class="hotimge  "></img>
								Hotel
						</a></li>
						<li role="presentation" id="Busesli"><a
							data-ng-click="BusMenu()" aria-controls="bus" role="tab"
							data-toggle="tab"> <!-- <i
							class="tayyarah-directions_bus"></i> --> <img class="busimge  "></img>
								Bus
						</a></li>

					</ul>

				</s:if>
				<s:else>
					<s:if test="#session.isLabeling == true">
						<ul class="nav nav-tabs active-tab" role="tablist">
							<s:if test="#session.isFlightsEnabled == true">
								<li role="presentation" class="active" id="Flightli"><a
									data-ng-click="FlightMenu()" aria-controls="flights" role="tab"
									data-toggle="tab"> <img class="airimge  "></img> <!-- <i class="tayyarah-plane"></i> -->
										Flight
								</a></li>
							</s:if>
							<s:if test="#session.isHotelEnabled == true">
								<li role="presentation" id="Hotelli"><a
									data-ng-click="HotelMenu()" aria-controls="hotels" role="tab"
									data-toggle="tab"> <!--  <i
								class="tayyarah-hotel"></i> --> <img class="hotimge  "></img>
										Hotel
								</a></li>
							</s:if>
							<s:if test="#session.isBusEnabled == true">
								<li role="presentation" id="Busesli"><a
									data-ng-click="BusMenu()" aria-controls="bus" role="tab"
									data-toggle="tab"> <!-- <i
								class="tayyarah-directions_bus"></i> --> <img class="busimge  "></img>
										Bus
								</a></li>
							</s:if>
							<s:if test="#session.isCarEnabled == true">
								<li role="presentation" id="Carsli"><a
									data-ng-click="CarMenu()" aria-controls="car" role="tab"
									data-toggle="tab"> <!-- <i
								class="tayyarah-directions_car"></i> --> <img class="carimge  "></img>
										Car
								</a></li>
							</s:if>
						</ul>
					</s:if>
					<s:else>
						<ul class="nav nav-tabs active-tab" role="tablist">
							<li role="presentation" class="active" id="Flightli"><a
								data-ng-click="FlightMenu()" aria-controls="flights" role="tab"
								data-toggle="tab"> <img class="airimge  "></img> <!-- <i class="tayyarah-plane"></i> -->
									Flight
							</a></li>

							<li role="presentation" id="Hotelli"><a
								data-ng-click="HotelMenu()" aria-controls="hotels" role="tab"
								data-toggle="tab"> <!--  <i
							class="tayyarah-hotel"></i> --> <img class="hotimge  "></img>
									Hotel
							</a></li>

							<li role="presentation" id="Busesli"><a
								data-ng-click="BusMenu()" aria-controls="bus" role="tab"
								data-toggle="tab"> <!-- <i
							class="tayyarah-directions_bus"></i> --> <img class="busimge  "></img>
									Bus
							</a></li>
							<li role="presentation" id="Carsli"><a
								data-ng-click="CarMenu()" aria-controls="car" role="tab"
								data-toggle="tab"> <!-- <i
							class="tayyarah-directions_car"></i> --> <img class="carimge  "></img>
									Car
							</a></li>

						</ul>
					</s:else>

				</s:else>


				<!-- Tab panes -->
				<div class="tab-content">
					<div role="tabpanel" class="tab-pane active" id="flights">

						<div class="tayyarah-inner-tab">
							<ul class="nav nav-tabs" style="margin-bottom: 15px;">
								<li class="active "><a href="#ones" data-toggle="tab"
									class="radio-primary" id="oneway">One way</a></li>
								<li><a href="#twos" data-toggle="tab" id="return-tab">
										Round Trip</a></li>

							</ul>
							<div id="myTabContent" class="tab-content mobFlightTab">
								<div class="tab-pane fade active in" id="ones">
									<form name="flightsearchForm" class="form-inline"
										id="onewayform" data-ng-submit="flightsearch()">

										<input type="hidden" name="trips" value="2"> <input
											type="hidden" name="$&*D5K" value="false"> <input
											type="hidden" name="$M*A@" value="0"> <input
											type="hidden" id="hideori" value=""> <input
											type="hidden" id="hidedes" value="">

										<s:if test="#session.isLabeling == true">
											<s:if test="#session['agent'] != null">
												<input type="hidden" name="ccy" id="onecurrencyname"
													value="<s:property value="%{#session.agent.currencyCode}"/>">
												<input type="hidden" name="ay" id="ay"
													value="<s:property value="%{#session.agent.Securityanswer}"/>">

											</s:if>
											<s:else>
												<input type="hidden" name="ccy" id="onecurrencyname"
													value="INR">
												<input type="hidden" name="ay" id="ay"
													value="<s:property value="%{#session.ThemeAppkey}"/>">

											</s:else>
										</s:if>
										<s:else>
											<s:if test="#session['agent'] != null">
												<input type="hidden" name="ccy" id="onecurrencyname"
													value="<s:property value="%{#session.agent.currencyCode}"/>">
												<input type="hidden" name="ay" id="ay"
													value="<s:property value="%{#session.agent.Securityanswer}"/>">
											</s:if>
											<s:else>
												<input type="hidden" name="ccy" id="onecurrencyname"
													value="INR">
												<input type="hidden" id="oky" name="ay"
													value="zqJ3R9cGpNWgNXG55ub/WQ==">

											</s:else>
										</s:else>





										<fieldset>
											<div class="clearfix">
												<div class="col-sm-3 clearfix i-fr">
													<div class="form-group">
														<label for="inputFrom">From</label>
														<div class="input-group">
															<span class="tayya-h-iicons"><i
																class="tayyarah-plane"></i></span> <input type="text"
																name="ori" data-ng-model="user.originall"
																id="search-source" autocomplete="off"
																onkeypress="return isAlphabetKeywithspace(event,this);"
																data-typeahead="c as c for c in cities($viewValue) | limitTo:10"
																placeholder="City or Airport"
																data-typeahead-min-length='1'
																data-typeahead-on-select='onSelectPart($item, $model, $label)'
																data-typeahead-template-url="customTemplate.html"
																class="form-control width100per" required>
														</div>
														<div class="ttst" id="errori"></div>
													</div>
												</div>
												<div class="col-sm-3 clearfix i-to">
													<div class="form-group">
														<label for="inputEmail">To</label>
														<div class="input-group">
															<span class="tayya-h-iicons"><i
																class=" tayyarah-plane"></i></span> <input type="text"
																name="des" id="to" autocomplete="off"
																data-ng-model="user.destinationall"
																placeholder="City or Airport"
																onkeypress="return isAlphabetKeywithspace(event,this);"
																data-typeahead="c as c for c in cities($viewValue) | limitTo:10"
																data-typeahead-min-length='1'
																data-typeahead-on-select='onSelectPart($item, $model, $label)'
																data-typeahead-template-url="customTemplate.html"
																class="form-control" required>
														</div>
														<div class="ttst" id="errdes"></div>
														<div class="ttst" id="errdep"></div>
													</div>
												</div>
												<div id="hdepe"></div>
												<div class="col-sm-1 clearfix" id="dep">
													<div class="form-group">
														<label for="inputEmail">Departure</label>
														<div class="input-group">
															<span class="tayya-h-iicons"><i
																class="tayyarah-calendar"></i></span> <input type="text"
																class="form-control" id="twodpd1" name="depDate"
																placeholder="DD/MM/YYYY" autocomplete="off"
																onkeydown="return false;" required>

														</div>
														<div class="ttst" id="errdes"></div>
														<div class="ttst" id="errdep"></div>
													</div>
												</div>
												<div class="col-sm-1 clearfix" id="arrival">
													<div class="form-group">
														<label for="inputEmail">Arrival</label>
														<div class="input-group">
															<span class="tayya-h-iicons"><i
																class="tayyarah-calendar"></i></span> <input type="text"
																class="form-control" id="twodpd2"
																placeholder="DD/MM/YYYY" autocomplete="off"
																disabled="disabled" onkeydown="return false;">
														</div>
														<div class="ttst" id="errarr"></div>
													</div>
												</div>
												<div class="col-sm-3" id="home-details">

													<div class="form-group">
														<label for="inputEmail">Travellers</label>
														<div class="input-group">

															<span class="tayya-h-iicons"><i
																class="tayyarah-group_add"></i></span> <span
																class="form-control dropdown" data-toggle="dropdown"><span
																id="totaltraveller">1</span> Traveller(s)</span>


															<ul
																class="dropdown-menu mega-dropdown-menu traveller-menu">
																<span class="arrow-up"></span>
																<li><a href="#">

																		<div class="form-group">
																			<label>Adult(s)</label>
																			<div class="input-group">
																				<span class="input-group-btn">
																					<button type="button"
																						class="btn btn-default btn-number"
																						data-type="minus" data-field="adultid">
																						<span class="tayyarah-minus"></span>
																					</button>
																				</span> <span id="adultid" class="infid input-number"
																					min="1" max="9" data-ng-model="user.adultid">1</span>
																				<input type="hidden" name="$A*D" id="hiddenadult"
																					value="1"> <span class="input-group-btn">
																					<button type="button"
																						class="btn btn-default btn-number"
																						data-type="plus" data-field="adultid">
																						<span class="tayyarah-plus"></span>
																					</button>
																				</span>
																			</div>
																		</div>
																</a></li>

																<li><a href="#">
																		<div class="form-group">
																			<label>Child(s)</label>
																			<div class="input-group">
																				<span class="input-group-btn">
																					<button type="button"
																						class="btn btn-default btn-number"
																						disabled="disabled" data-type="minus"
																						data-field="kidid">
																						<span class="tayyarah-minus"></span>
																					</button>
																				</span> <span id="kidid" class="infid input-number" min="0"
																					max="9" data-ng-model="user.kidid">0</span> <input
																					type="hidden" name="$K*D" id="hiddenkid" value="0">

																				<span class="input-group-btn">
																					<button type="button"
																						class="btn btn-default btn-number"
																						data-type="plus" data-field="kidid">
																						<span class="tayyarah-plus"></span>
																					</button>
																				</span>
																			</div>
																		</div>
																</a></li>

																<li><a href="#"><div class="form-group">
																			<label>Infant(s)</label>
																			<div class="input-group">
																				<span class="input-group-btn">
																					<button type="button"
																						class="btn btn-default btn-number"
																						disabled="disabled" data-type="minus"
																						data-field="infantid">
																						<span class="tayyarah-minus"></span>
																					</button>
																				</span><span class="infid input-number" id="infantid"
																					min="0" max="1" data-ng-model="user.infantid">0</span>
																				<input type="hidden" name="$I*T" id="hiddeninfant"
																					value="0"> <span class="input-group-btn">
																					<button type="button"
																						class="btn btn-default btn-number"
																						data-type="plus" data-field="infantid">
																						<span class="tayyarah-plus"></span>
																					</button>
																				</span>
																			</div>
																		</div></a></li>

																<li class="dorp-done">
																	<div class="form-group">
																		<button type="button" class="btn btn-info"
																			id="but-up1">Done</button>
																	</div>

																</li>

															</ul>
														</div>

														<div class="ttst" id="errconfig"></div>
													</div>
												</div>
											</div>

											<!-- more options added here -->
											<div class="h-type clearfix">


												<div class="home-trip-type">

													<div class="form-group">
														<label>Trip Type : </label>
														<div class="input-group dropdownstyle">

															<select class="form-control" name="$TT*Y"
																id="triptypeselect" onchange="selecttriptype();">

																<option value="O" selected>One Way</option>
																<option value="R">Round Trip</option>
																<option value="SR">Special Round Trip(LCC)</option>
															</select>
														</div>
													</div>

												</div>


												<div class="home-class-type">
													<div class="form-group">
														<label>Class :</label>
														<div class="input-group dropdownstyle">

															<select class="form-control" name="cabinClass"
																id="cabinselect">
																<option id="Economy">Economy</option>
																<option id="PremiumEconomy">PremiumEconomy</option>
																<option id="Business">Business</option>
																<option id="PremiumBusiness">PremiumBusiness</option>
																<option id="First">First</option>
																<option id="All">All</option>

															</select> <i class="imgdrop"></i>
														</div>
													</div>
												</div>
												<div class="home-air-type">
													<div class="form-group">
														<label class="hidden-xs">Preferred Airlines</label> <label
															class="visible-xs">Airlines : </label>
														<div class="input-group dropdownstyle">
															<select class="form-control" id="onewayairline"
																name="Airlinecode">
															</select>
														</div>
													</div>
												</div>
											</div>
											<div id="home-btn-search">
												<div class="form-group tayy-button ">
													<button type="submit" class="btn btn-info homeSearchBtn"
														data-ng-click="submitted==true">Search</button>
												</div>
											</div>
										</fieldset>
									</form>
								</div>

							</div>
						</div>
					</div>
					<div role="tabpanel" class="tab-pane" id="hotels"></div>
					<div role="tabpanel" class="tab-pane " id="car">

						<div class="comming-soon">

							<div class="col-sm-5" id="spin">

								<i class="tayyarah-cog pull-right cog"></i>
							</div>
							<div class="col-sm-5 under">
								<h1>Page Under Construction</h1>
							</div>
						</div>
					</div>
					<div role="tabpanel" class="tab-pane " id="bus">
						<div class="comming-soon">
							<div class="col-sm-5" id="spin">
								<i class="tayyarah-cog pull-right cog"></i>
							</div>
							<div class="col-sm-5 under">
								<h1>Page Under Construction</h1>
							</div>
						</div>
					</div>
				</div>

			</div>

		</div>
	</div>
	<!-- container ends -->
	<!-- super-banner ends -->
	<s:if test="#session.isCorporate == true">
		<article class="container corporateheader">

			<section>
				<div class="choose-us">
					<div class="container clear-padding">
						<!-- <div class="col-sm-4"> -->
						<div class="choose-us-item text-center">
							<h4>Why us?</h4>

							<p>Tayyarah.com today is the leading consolidator provider of
								consumer-direct travel services in India. Based in
								Bangalore-India, Tayyarah.com is a one-stop-shop for all
								travel-related services. Tayyarah provides you a access over 70+
								countries with 900+ airlines on just one platform, Tayyarah.com
								provides hotel reservation facility for more than 45,000 hotels
								in India and over 9,00,000 hotels around the world which makes
								us a leading consolidator of all travel products. Through
								continued excellence in providing travel solutions, Tayyarah.com
								provides booking facility for all the popular as well as exotic
								national and international destinations. If you have been
								managing your travel through a Travel Agent, it is quite
								possible that you have availed of our products and services even
								before you knew each other. Tayyarah provides online car rental
								services in 210 + cities within India and also offer over 85,000
								+ bus routes across India.</p>
						</div>
						<!-- </div> -->
					</div>
				</div>
			</section>
		</article>

	</s:if>
	<s:else>
		<s:if test="#session.isDealsEnabled == false">
		</s:if>
		<s:else>
			<article class="container">

				<section class="packages">
					<h4 class="text-center">
						<a href="#">Pack<span>ages</span></a>
					</h4>

					<div class="main">
						<ul id="og-grid" class="og-grid">
							<li><a href="#/EnquiryForm" data-largesrc="images/1.jpg"
								data-title="Tour Packages"
								data-description="Tayyarah works hard to secure the best deals on packages covering different types of vacations like Family tours, adventure tours, beach vacations luxury tours and so on...">
									<img src="images/1.jpg" alt="img01"/>
									<span>Tour Packages</span>

									<div class="hoverpackages">

										<p>We already know our customers need best and cheapest
											travel experience. Send your request now.</p>
										<button type="button" class="btn btn-info btQoute">Get
											my Qoute</button>
									</div>
							</a></li>

							<li><a href="#/EnquiryForm" data-largesrc="images/3.jpg"
								data-title="Group Packages"
								data-description="Some of the best destinations in the world are covered by our Group fixed departures, relax in sunshine near a seashore or on the banks of a river or choose to stay up all night in a luxury resort, tayyarah gives you all the customized options.">
									<img src="images/3.jpg" alt="img01"/>
									<span>Group Packages</span>
									<div class="hoverpackages">
										<p>We already know our customers need best and cheapest
											travel experience. Send your request now.</p>
										<button type="button" class="btn btn-info btQoute">Get
											my Qoute</button>

									</div>
							</a></li>


							<li><a href="#/EnquiryForm" data-largesrc="images/2.jpg"
								data-title="Holiday Packages"
								data-description="Best way to relax is to pack your bags and go on a holiday, tayyarah 
suggests and guides people to find the right destination covering wildlife destinations, beach vacations, adventure holiday and so on at affordable prices.
The cost of outbound packages are payable in convertible foreign exchange (at the current prevailing exchange rates) for Indian residents traveling under the BTQ & other schemes subject to RBI regulations
except the cost of Airline ticket. Accommodation (if included) is based on twin share basis. Seasonal and weekend surcharges may apply, meals & sightseeing are as per itinerary. All transfers in SIC basis unless
otherwise specified, other terms and conditions apply. ">
									<img src="images/2.jpg" alt="img02"/>
									<span>Holiday Packages</span>
									<div class="hoverpackages">

										<p>We already know our customers need best and cheapest
											travel experience. Send your request now.</p>
										<button type="button" class="btn btn-info btQoute">Get
											my Quote</button>

									</div>
							</a></li>


							<li><a href="#/EnquiryForm"
								data-largesrc="images/ummrah.jpg" data-title="Umrah Packages"
								data-description="Umrah Travel for us is a noble service in which we aim to offer the best possible advice and assistance, making us unique from other tour operators. Special arrangements include Best of Hotels, Transportation, Meals &amp; Other Complimentary Services. We commit to offer best umrah service at unbeatable prices. We cover all range of travelers like Economy ,Prestige &amp; Luxury.">
									<img src="images/ummrah.jpg" alt="img03" /> <span>Umrah Packages</span>
									<div class="hoverpackages">

										<p>We already know our customers need best and cheapest
											travel experience. Send your request now.</p>
										<button type="button" class="btn btn-info btQoute">Get
											my Quote</button>

									</div>
							</a></li>
						</ul>
					</div>
				</section>
			</article>
		</s:else>


	</s:else>
	<!-- END: HOT DEALS -->




	<!-- START: WHY CHOOSE US SECTION -->
	<section id="why-choose-us">
		<div class="choose-us-row">
			<div class="container clear-padding">
				<div class="light-section-title text-center">
					<h2>WHY CHOOSE US?</h2>
					<h4>REASONS TO TRUST US</h4>
					<div class="space"></div>
					<p>Access of booking flight tickets over 70+ countries with
						900+ airlines on one platform &amp; we provide hotel reservation
						facility for more than 45,000 hotels in India and over 9,00,000
						hotels globally with no hidden cost.</p>
				</div>


				<div class="main-footer-sub">
					<div class="container clear-padding">
						<div class="col-sm-12 text-center">
							<form class="clearfix text-center">
								<label>SUBSCRIBE TO OUR NEWSLETTER</label>
								<div class="clearfix"></div>
								<div class=" col-sm-8 clear-padding">
									<input class="form-control" type="email" required
										placeholder="Enter Your Email" name="email">
								</div>
								<div class="col-sm-4 clear-padding">
									<button type="submit">
										<i class="fa fa-paper-plane"></i>SUBSCRIBE
									</button>
								</div>
							</form>
						</div>
						<div class=" col-sm-12 ">
							<div class="social-media text-center">
								<ul>
									<li><a href="#"><i class="tayyarah-facebook4"></i></a></li>
									<li><a href="#"><i class="tayyarah-twitter4"></i></a></li>
									<li><a href="#"><i class="tayyarah-google-plus"></i></a></li>
									<li><a href="#"><i class="tayyarah-youtube"></i></a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- END: WHY CHOOSE US SECTION -->
	<!-- STart: WHY CHOOSE US details SECTION -->

	<s:if test="#session.isCorporate == false">
		<section>
			<div class="choose-us">
				<div class="container clear-padding">
					<div class="col-sm-4">
						<div class="choose-us-item text-center">
							<div class="choose-icon">
								<i class="tayyarah-suitcase"></i>
							</div>
							<h4>Handpicked Tour</h4>

							<p>We have our travel network partners across globe to
								suggest you with the best logical routing and cater to
								customized package requirements</p>
							<a href="#/" class="btn btn-info">KNOW MORE</a>
						</div>
					</div>
					<div class="col-sm-4">
						<div class="choose-us-item text-center">
							<div class="choose-icon">
								<i class="tayyarah-phone"></i>
							</div>
							<h4>Dedicated Support</h4>
							<p>We are available round the clock 365 days to cater to your
								needs. We would always love to hear your feedback about our
								services.</p>
							<a href="#/ContactUs" class="btn btn-info">KNOW MORE</a>
						</div>
					</div>
					<div class="col-sm-4">
						<div class="choose-us-item text-center">
							<div class="choose-icon">
								<i class="tayyarah-smile"></i>
							</div>
							<h4>Lowest Price Guarantee</h4>
							<p>Applies to genuine quotes from airlines and India
								registered businesses and websites for travel that
								originates/departs from India.</p>
							<!-- <p>Access to book tickets over in 70+ countries with 900+
							airlines on one platform with 45,000 hotels in India and
							over 9,00,000 across globe.</p> -->
							<a href="#/" class="btn btn-info">KNOW MORE</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	</s:if>

	<!-- END: WHY CHOOSE US details SECTION -->


	<!-- Your site ends -->

	<script type="text/ng-template" id="customTemplate.html">
  <a>
      <span bind-html-unsafe="match.label | typeaheadHighlight:query"></span>
      <i></i>
  </a>
</script>

</div>
<script>
	$(document).ready(function(event) {

		$(document).click(function() {
			//event.stopPropagation();
			$('.traveller-menu').slideUp();
		});
		$('#but-up1').on('click', function(event) {
			//event.stopPropagation();
			$('.traveller-menu').slideToggle();
		});
		$('.dropdown').on('click', function(event) {
			//event.stopPropagation();
			$('.traveller-menu').slideToggle();
		});
	});
</script>
<script src="js/tayycustom.js"></script>
