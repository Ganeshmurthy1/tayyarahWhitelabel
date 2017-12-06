 
<%@taglib prefix="s" uri="/struts-tags"%>

<s:if test="#session.isCorporate == true">
	<input type="hidden" id="isCor" value="true">
</s:if>
<s:if test="#session.isCorporate == true || #session['agent'] != null ">
	<input type="hidden" name="isB2BandB2E" id="isB2BandB2E" value="true">
</s:if>
<input type="hidden" name="ay"
	value="<s:property value="%{#session.agent.Securityanswer}"/>"
	id="apky">
<!--    <div id="loading-bar-container" data-ng-show="loadpricebar" class="hidden-xs"></div>	
 -->
<!--  <div ng-hide="pageloading" class="container minheight500px" data-ng-cloak>
 </div> -->

<div class="visible-xs gradient" data-ng-show="loadpricebar">

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
<div class="minheight500px" data-ng-cloak>
	<div class="col-md-12 col-sm-12 col-xs-12 removePadMobile">
		<!-- col-3 -->
		<div class="col-md-9 col-sm-9 col-xs-12 searched-result" id="two"
			data-ng-show="rightmenuloader">
			<!-- <div id="loading-bar-container" class="hidden-xs"> -->
				<!-- <div data-ng-show="loadpricebar" id="loading-bar">
					<div class="bar" style="width: 88.34%;">
						<div class="peg"></div>
					</div>
				</div> -->
				<div id="loading-bar-spinner">
					<div class="spinner-icon"></div>
				</div>
			<!-- </div> -->
			<div data-ng-show="loadpricebar">
			<div class="bar"></div>
				<span><b>Getting prices and availability...</b></span>
			</div>
			<div class="row hotelredefine" data-ng-show="loadpricebar">

				<div class="col-md-12 col-sm-12 col-xs-12 clearfix">

					<div class="row">
						<div class="col-md-3 col-sm-3 col-xs-12 searched-date padLR0Px">
							<span class="col-md-12 col-sm-12 col-xs-3 padLR0Px">Source</span>
							<p class="col-md-12 col-sm-12 col-xs-9 searchCity padLR0Px">
								<span>{{origin}}</span>
							</p>
						</div>
						<div class="col-md-1 col-sm-1 col-xs-12 searched-city padLR0Px">
							<i class="tayyarah-long-arrow-right"></i>
						</div>
						<div class="col-md-3 col-sm-3 col-xs-12 searched-date padLR0Px">
							<span class="col-md-12 col-sm-12 col-xs-3 padLR0Px">Destination</span>
							<p class="col-md-12 col-sm-12 col-xs-9 padLR0Px">
								<span>{{destination}}</span>
							</p>
						</div>

						<div class="col-md-3 col-sm-3 col-xs-12 searched-date padLR0Px">

							<span class="col-md-12 col-sm-12 col-xs-3 padLR0Px">Date</span>
							<p class="col-md-12 col-sm-12 col-xs-9 padLR0Px">
								<span>{{datein}}</span>
							</p>

						</div>
					</div>
				</div>





			</div>
			<div class="row hotelredefine" id="changerefine"
				data-ng-show="loaderSpin">
				<div class="col-md-8 col-sm-8 col-xs-12 clearfix">
					<div class="row hidden-xs">
						<div class="col-md-4 col-sm-4 col-xs-12 searched-city padLR0Px">
							<span class="col-md-12 col-sm-12 col-xs-3 padLR0Px">Source</span>
							<p class="col-md-12 col-sm-12 col-xs-9 searchCity padLR0Px">
								<span>{{origin}}</span>
							</p>
						</div>
						<div class="col-md-1 col-sm-1 col-xs-12 searched-city padLR0Px">
							<i class="tayyarah-long-arrow-right"></i>
						</div>
						<div class="col-md-3 col-sm-3 col-xs-12 searched-date padLR0Px">
							<span class="col-md-12 col-sm-12 col-xs-3 padLR0Px">Destination</span>
							<p class="col-md-12 col-sm-12 col-xs-9 padLR0Px">
								<span>{{destination}}</span>
							</p>
						</div>

						<div class="col-md-4 col-sm-4 col-xs-12 searched-date padLR0Px">

							<span class="col-md-12 col-sm-12 col-xs-3 padLR0Px">Date</span>
							<p class="col-md-12 col-sm-12 col-xs-9 padLR0Px">
								<span>{{datein}}</span>
							</p>

						</div>
						<%-- <div class="col-md-2 col-sm-2 col-xs-12 searched-economy padLR0Px">
                             <span class="col-md-12 col-sm-12 col-xs-3 padLR0Px">Check-Out</span>
							<p class="col-md-12 col-sm-12 col-xs-9 padLR0Px">
								<span></span>
							</p>
							

						</div> --%>
					</div>

					<div class="row visible-xs modmob-Bus">
						<div class="col-md-4 col-sm-4 col-xs-5 searched-city padLR0Px">
							<p class="col-md-12 col-sm-12 col-xs-12 searchCity padLR0Px">
								<span>{{origin}}</span>
							</p>
						</div>
						<div
							class="col-md-1 col-sm-1 col-xs-3 modmid-Bus searched-city padLR0Px">
							<div class="col-xs-12 ">
								<i class="tayyarah-long-arrow-right"></i>
							</div>
							<div class="col-xs-12 ">
								<span>{{datein}}</span>
							</div>
						</div>

						<div class="col-md-3 col-sm-3 col-xs-4 searched-city padLR0Px">
							<%-- <span class="col-md-12 col-sm-12 col-xs-3 padLR0Px">Destination</span> --%>
							<p class="col-md-12 col-sm-12 col-xs-12 padLR0Px">
								<span>{{destination}}</span>
							</p>
						</div>

						<div class="col-md-4 col-sm-4 col-xs-12">
							<div class="margin text-center">
								<div class="button-group clean">
									<a
										class="btn btn-info but btn-clean offcanvas__trigger--open btn offclose mobrefine"
										style="font-size: 11px;" data-rel="searchrefine"><span>Modify
											Search <i class="tayyarah-search"></i>
									</span> </a>
								</div>
							</div>
						</div>
					</div>


				</div>
				<div class="col-md-4 col-sm-4 col-xs-12">
					<div class="margin text-right">
						<div class="button-group clean">
							<a class="btn btn-info btn-clean button-dropdown hidden-xs"
								id="changebutton"> <span class="hidden-xs"
								data-toggle="dropdown">Modify Search <i
									class="tayyarah-angle-double-right"></i></span>
							</a>
						</div>
					</div>
				</div>
			</div>


			<div class="clearfix offcanvas sfine" id="searchrefine">
				<div class="closebtn done">
					<button class="offcanvas__trigger--close btn"
						data-rel="searchrefine">
						<i class="tayyarah-left"></i> Back
					</button>
				</div>
				<!-- <form action="" method="get" id="modifiedsearch"> -->
				<form name="modify" data-ng-submit="modifysearch()">

					<s:if test="#session['agent'] != null">
						<input type="hidden" name="ay"
							value="<s:property value="%{#session.agent.Securityanswer}"/>"
							id="ky">
						<input type="hidden" name="ccy"
							value="<s:property value="%{#session.agent.currencyCode}"/>"
							id="hccy">
					</s:if>
					<s:else>
						<input type="hidden" id="hky" name="ay"
							value="zqJ3R9cGpNWgNXG55ub/WQ==">
						<input type="hidden" name="ccy" id="hccy" value="INR">
					</s:else>
					<input type="hidden" name="request_locale" id="hotelrequestlocale"
						value="">
					<div class="row modifybus">
						<div class="col-md-9 col-sm-9 clearfix">
							<div class="col-md-4 col-sm-4 clearfix">
								<div class="form-group">
									<div class="input-group">
										<div class="hidden-xs" style="padding-right: 78px;">
											<i class="tayyarah-directions_bus"></i><span
												style="font-weight: 700;">Source</span>
										</div>
										<div class="visible-xs">
											<i class="tayyarah-directions_bus"></i><span
												style="font-weight: 700;">Source</span>
										</div>
										<input type="text" class="form-control o-c-s"
											data-ng-model="origin" placeholder="Select Location"
											id="fromstation" name="oristationname"
											onkeypress="return isAlphabetKeywithspace(event,this);"
											autocomplete="off"> <input type="hidden"
											name="citycode" id="fromstationcode" value="">

									</div>
									<div class="ttst" id="errori"></div>
								</div>
							</div>

							<div id="hdepe"></div>

							<div class="col-md-1 col-sm-1 searched-city padLR0Px hidden-xs">
								<i class="tayyarah-long-arrow-right"></i>
							</div>
							<div class="col-md-4 col-sm-4 clearfix">
								<div class="form-group">
									<div class="input-group">
										<div class="hidden-xs" style="padding-right: 78px;">
											<i class="tayyarah-directions_bus"></i><span
												style="font-weight: 700;">Destination</span>
										</div>
										<div class="visible-xs">
											<i class="tayyarah-directions_bus"></i><span
												style="font-weight: 700;">Destination</span>
										</div>
										<input type="text" class="form-control o-c-s"
											data-ng-model="destination" placeholder="Select Location"
											id="tostation" name="oristationname"
											onkeypress="return isAlphabetKeywithspace(event,this);"
											autocomplete="off"> <input type="hidden"
											name="citycode" id="tostationcode" value="">

									</div>
									<div class="ttst" id="errori"></div>
								</div>
							</div>

							<div class="col-md-3 col-sm-3 clearfix">
								<div class="form-group">
									<div class="input-group">
										<i class="tayyarah-calendar"></i><span
											style="font-weight: 700;">Travelling Date</span> <input
											type="text" class="form-control o-c-s" name="dateend"
											id="depDate" data-ng-model="datein" placeholder="Check out"
											onkeydown="return false;">
									</div>
									<div class="ttst" id="errarr"></div>
								</div>
							</div>




						</div>

						<div class="col-md-2 col-sm-2 col-xs-12 ">
							<div class="margin  col-xs-12">
								<div class="btn-group clean">
									<input type="submit"
										class="btn btn-info btn-clean button-dropdown"
										data-ng-click="submitted == true" value="Search">
									<%-- 	</s:else> --%>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
			<%-- <div class="clearfix offcanvas sfine" id="searchreturn">
				<div class="closebtn done">
					<button class="offcanvas__trigger--close btn"
						data-rel="searchrefine">
						<i class="tayyarah-left"></i> Back
					</button>
				</div>
				<!-- <form action="" method="get" id="modifiedsearch"> -->
				<form name="return" data-ng-submit="returnsearch()">

					<s:if test="#session['agent'] != null">
						<input type="hidden" name="ay"
							value="<s:property value="%{#session.agent.Securityanswer}"/>"
							id="rhky">
						<input type="hidden" name="ccy"
							value="<s:property value="%{#session.agent.currencyCode}"/>"
							id="hccy">
					</s:if>
					<s:else>
						<input type="hidden" id="rhky" name="ay" value="{{appkey}}">
						<input type="hidden" name="ccy" id="hccy" value="INR">
					</s:else>
					<input type="hidden" name="request_locale" id="hotelrequestlocale"
						value="">
					<div class="row modifybus">
						<div class="col-sm-10 clearfix">
						<div class="col-sm-3 clearfix">
						<div class="form-group">
						 <div class="input-group">
							<i class="tayyarah-directions_bus"></i><span>From</span>
								<input type="text" class="form-control o-c-s" data-ng-model="destination" placeholder="Select Location" id="fromstation" name="oristationname" 
												autocomplete="off" >
								<input type="hidden" name="citycode" id="fromstationcode" value="" >
																
								</div>
						<div class="ttst" id="errori"></div>
						</div>
					</div>

                        <div id="hdepe"></div>
							<div class="col-sm-3 clearfix">
						<div class="form-group">
						 <div class="input-group">
							<i class="tayyarah-directions_bus"></i><span>To</span>
								<input type="text" class="form-control o-c-s" data-ng-model="origin" placeholder="Select Location" id="tostation" name="oristationname" 
												autocomplete="off" >
								<input type="hidden" name="citycode" id="tostationcode" value="" >
																
								</div>
						<div class="ttst" id="errori"></div>
						</div>
					</div>

							<div class=" col-sm-3 clearfix">
								<div class="form-group">
									<div class="input-group">
									<i class="tayyarah-calendar"></i><span>Travelling Date</span>
										<input type="text" class="form-control o-c-s" name="dateend"
											id="depDate" data-ng-model="datein" placeholder="Check out" onkeydown="return false;">
									</div>
									<div class="ttst" id="errarr"></div>
								</div>
							</div>

							


						</div>

						<div class="col-sm-2 col-xs-12 ">
							<div class="margin xs-hotel-btn col-xs-8">
								<div class="btn-group clean">
									<s:if test="#session.isCorporate == true">
										<input type="submit" id="corporatesearch"
											class="btn btn-info-corporate but btn-clean button-dropdown"
											data-ng-click="submitted == true" value="Search">
									</s:if>
									<s:else>
										<input type="submit"
											class="btn btn-info btn-clean button-dropdown"
											data-ng-click="submitted == true" value="Search">
									</s:else>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div> --%>


			<div class="sort-by-section clearfix box" data-ng-show="loaderSpin">
				<div class="col-sm-12 col-xs-12 clearfix">
					<div class="clearfix visible-xs displayNone">
						<div id="offnone">
							<a class="sort-by-container clearfix breakupMargin"> <span
								class="offcanvas__trigger--open h-filters" data-rel="busone"><i
									class="tayyarah-th"></i> Fare Breakup</span>
							</a>
						</div>
					</div>
					<ul class="col-md-12 col-sm-12 sort-bar clearfix">
						<li class="col-md-2 col-sm-2 hidden-xs col-xs-12 margin-top5">
							<h5>
								Results <b>{{(availableBus | filter:filterprices |
									filter:busTypeFilter | filter:boardLocationFilter|
									filter:droppingLocationFilter| filter:BusnameFilter ).length}}</b>
								out of <b>{{availableBus.length}}</b>

							</h5>
						</li>
						<li class="col-md-2 visible-xs mob-sortfil col-xs-4 margin-top5">
							<h5>
								Results <b>{{(availableBus | filter:filterprices |
									filter:busTypeFilter | filter:boardLocationFilter|
									filter:droppingLocationFilter| filter:BusnameFilter ).length}}</b>
								out of <b>{{availableBus.length}}</b>

							</h5>
						</li>


						<s:if test="#session['agent'] != null">
							<li><a href="javascript:void(0);"
								class="sort-by-price clearfix"> <label id="mark">Add
										Markup </label>
									<div id="markup" style="display: none;">
										<form class="form-inline" data-ng-submit="addmarkup()">
											<input type="hidden" name="ay"
												value="<s:property value="%{#session.agent.Securityanswer}"/>"
												id="ay"> <input type="hidden" name="$&*D5K"
												id="isDynamic" value="true"> <input name="$M*A@"
												class="form-control" id="appliedmarkamt"
												value="{{markupammount}}" placeholder="Markup"
												autocomplete="off">
											<button class="btn btn-info but btn-clean" type="submit"
												data-ng-click="submitted==true">Add</button>
										</form>
									</div>
							</a></li>
							<li data-ng-show="!isDynamicMark" style="display: none;"
								id="appliedmarkup"><a href="#"
								class="sort-by-price pull-right"> <label id="appliedmarkamt">
								</label>
							</a></li>
							<li data-ng-show="isDynamicMark" id="appliedmarkup"><a
								class="sort-by-price pull-right"> <label id="appliedmarkamt">Markup
										Applied {{markupammount}} </label>
							</a></li>
						</s:if>
						<li class="sort-by-name hidden-xs s-price lastFilters">
							<h5>
								<b data-ng-click="sortorder(availableBus,'depart')"><i
									class="tayyarah-clock"></i> Departure <i
									data-ng-class="departasc"></i></b>
							</h5>
							<h5>
								<b data-ng-click="sortorder(availableBus,'Seats')"> Seats <i
									data-ng-class="Seatsc"></i></b>
							</h5>
							<h5>
								<b data-ng-click="sortorder(availableBus,'price')"> Price <i
									data-ng-class="priceasc"></i>
								</b>
							</h5>
						</li>
						<li class="sort-by-name mob-sortfil col-xs-8 visible-xs s-price"
							style="width: 66.666667%;">
							<div class="col-xs-12">
								<h5 class=" col-xs-4" style="padding: 0;">
									<b data-ng-click="sortorder(availableBus,'depart')"><i
										class="tayyarah-clock"></i> </b>
								</h5>
								<h5 class=" col-xs-4">
									<b data-ng-click="sortorder(availableBus,'Seats')"> Seats <i
										data-ng-class="Seatsc"></i></b>
								</h5>
								<h5 class=" col-xs-4">
									<b data-ng-click="sortorder(availableBus,'price')"> Price <i
										data-ng-class="priceasc"></i>
									</b>
								</h5>
							</div>
						</li>


					</ul>


				</div>

			</div>


			<!-- <div class="flbus clearfix" data-ng-repeat="(busindex,buslists) in availableBus | filter:filterprices | filter:busTypeFilter | filter:boardLocationFilter| filter:droppingLocationFilter| filter:BusnameFilter "> -->
			<div class="flbus clearfix"
				data-ng-repeat="(busindex,buslists) in availableBus | filter:filterprices | filter:busTypeFilter | filter:boardLocationFilter| filter:droppingLocationFilter| filter:BusnameFilter ">
				<div class="row hidden-xs RemoveLRmargin">
					<div class="col-md-4 col-sm-4 hidden-xs">
						<label class="hot-hd margin-top20px blueText handCursor">{{buslists.operatorName}}
						</label>
						<div class="row">
							<div class="col-md-4 col-sm-4 col-xs-4 containerbusico">
								<a class="buslisticon"></a>
							</div>
							<div class="col-md-8 col-sm-8 col-xs-8">
								<div>{{buslists.busType}}(2+1)</div>
								<ul class="aminities">
									<li><i class="tayyarah-television" aria-hidden="true"></i></li>
									<li><i class="tayyarah-cutlery" aria-hidden="true"></i></li>
									<li><i class="tayyarah-plug" aria-hidden="true"></i></li>
									<li><i class="tayyarah-wifi" aria-hidden="true"></i></li>
								</ul>
							</div>
						</div>
					</div>
					<div class="col-xs-12 pad-r0 visible-xs">
						<label style="font-size: 11px !important;"
							class="hot-hd margin-top10px blueText handCursor">{{buslists.operatorName}}
						</label>
					</div>
					<div class="col-xs-12 pad-r0 visible-xs f-7">{{buslists.busType}}(2+1)</div>
					<div class="col-xs-3 pad-r0 visible-xs">
						<!-- <label class="hot-hd margin-top10px blueText handCursor">{{buslists.operatorName}} </label> -->
						<div class="row">
							<div class="col-md-4 col-sm-4 col-xs-12 containerbusico">
								<i class="buslisticon"></i>
							</div>
							<div class="pad-r0  col-xs-12">
								<ul class="aminities">
									<li class="f-7"><i class="tayyarah-television"
										aria-hidden="true"></i></li>
									<li class="f-7"><i class="tayyarah-cutlery"
										aria-hidden="true"></i></li>
									<li class="f-7"><i class="tayyarah-plug"
										aria-hidden="true"></i></li>
									<li class="f-7"><i class="tayyarah-wifi"
										aria-hidden="true"></i></li>
								</ul>
							</div>
						</div>
					</div>
					<div class="col-md-3 col-sm-3 hidden-xs">
						<div class="margin-top20px">
							<i class="tayyarah-clock-o"></i> {{buslists.departureTime}} <span><i
								class="tayyarah-arrow-right" aria-hidden="true"></i></span><i
								class="tayyarah-clock-o"></i>{{buslists.arrivalTime}}
						</div>

					</div>
					<!-- <div class="col-md-2">
				<div class="margin-top20px">
				4/5
				</div>
				</div> -->
					<div class="col-md-3 col-sm-3 hidden-xs">
						<div class="margin-top20px">{{buslists.availableSeats}}
							Seats Available!</div>

					</div>

					<div class="col-xs-6 pad-l0 pad-r0 visible-xs">
						<div class="row margin-top20px f-10">
							<i class="tayyarah-clock-o"></i> {{buslists.departureTime}} <span><i
								class="tayyarah-arrow-right" aria-hidden="true"></i></span><i
								class="tayyarah-clock-o"></i>{{buslists.arrivalTime}}
						</div>
						<div class="row margin-top20px f-7">
							{{buslists.availableSeats}} Seats Available!</div>
					</div>

					<div class="col-md-2 col-sm-2 hidden-xs">
						<div class="margin-top20px">
							<div>
								<i data-ng-class="classname" class="tayyarah-INR"></i>{{buslists.fare.bookingPrice}}
							</div>

							<button ng-if="buslists.availableSeats !=0"
								class="btn btn-info bookBtn"
								data-ng-click="Showseats(buslists,buslists.routeScheduleId,busindex)">
								View Seats <span
									data-ng-show="loaderSpin{{buslists.routeScheduleId}}"
									class="loaderSpan"><img id="removeImg"
									src="images/loginLoader.gif" width="20px" /></span>
							</button>
							<button ng-if="buslists.availableSeats ==0"
								class="btn btn-info bookBtn" disabled>Closed</button>
						</div>
					</div>
					<div class="col-xs-3 pad-l0 visible-xs">
						<div class="margin-top20px">
							<div class="f-10">
								<i data-ng-class="classname" class="tayyarah-INR"></i>{{buslists.fare.bookingPrice}}
							</div>

							<button class="btn btn-info bookBtn"
								data-ng-click="Showseats(buslists,buslists.routeScheduleId,busindex)">
								View Seats <span
									data-ng-show="loaderSpin{{buslists.routeScheduleId}}"
									class="loaderSpan"><img id="removeImg"
									src="images/loginLoader.gif" width="20px" /></span>
							</button>
						</div>
					</div>
				</div>


				<div class="row visible-xs RemoveLRmargin"
					data-ng-click="Showseats(buslists,buslists.routeScheduleId,busindex)">
					<span data-ng-show="loaderSpin{{buslists.routeScheduleId}}"
						class="loaderSpan"><img id="removeImg"
						src="images/loginLoader.gif" width="40px" /></span>
					<div class="col-md-4 col-sm-4 hidden-xs">
						<label class="hot-hd margin-top20px blueText handCursor">{{buslists.operatorName}}
						</label>
						<div class="row">
							<div class="col-md-4 col-sm-4 col-xs-4 containerbusico">
								<a class="buslisticon"></a>
							</div>
							<div class="col-md-8 col-sm-8 col-xs-8">
								<div>{{buslists.busType}}(2+1)</div>
								<ul class="aminities">
									<li><i class="tayyarah-television" aria-hidden="true"></i></li>
									<li><i class="tayyarah-cutlery" aria-hidden="true"></i></li>
									<li><i class="tayyarah-plug" aria-hidden="true"></i></li>
									<li><i class="tayyarah-wifi" aria-hidden="true"></i></li>
								</ul>
							</div>
						</div>
					</div>
					<div class="col-xs-12 pad-r0 visible-xs">
						<label style="font-size: 11px !important;"
							class="hot-hd margin-top10px blueText handCursor">{{buslists.operatorName}}
						</label>
					</div>
					<div class="col-xs-12 pad-r0 visible-xs f-7">{{buslists.busType}}(2+1)</div>
					<div class="col-xs-3 pad-r0 visible-xs">
						<!-- <label class="hot-hd margin-top10px blueText handCursor">{{buslists.operatorName}} </label> -->
						<div class="row">
							<div class="col-md-4 col-sm-4 col-xs-12 containerbusico">
								<i class="buslisticon"></i>
							</div>
							<div class="pad-r0  col-xs-12">
								<ul class="aminities">
									<li class="f-7"><i class="tayyarah-television"
										aria-hidden="true"></i></li>
									<li class="f-7"><i class="tayyarah-cutlery"
										aria-hidden="true"></i></li>
									<li class="f-7"><i class="tayyarah-plug"
										aria-hidden="true"></i></li>
									<li class="f-7"><i class="tayyarah-wifi"
										aria-hidden="true"></i></li>
								</ul>
							</div>
						</div>
					</div>
					<div class="col-md-3 col-sm-3 hidden-xs">
						<div class="margin-top20px">
							<i class="tayyarah-clock-o"></i> {{buslists.departureTime}} <span><i
								class="tayyarah-arrow-right" aria-hidden="true"></i></span><i
								class="tayyarah-clock-o"></i>{{buslists.arrivalTime}}
						</div>

					</div>
					<!-- <div class="col-md-2">
				<div class="margin-top20px">
				4/5
				</div>
				</div> -->
					<div class="col-md-3 col-sm-3 hidden-xs">
						<div class="margin-top20px">{{buslists.availableSeats}}
							Seats Available!</div>

					</div>

					<div class="col-xs-6 pad-l0 pad-r0 visible-xs">
						<div class="row margin-top20px f-10">
							<i class="tayyarah-clock-o"></i> {{buslists.departureTime}} <span><i
								class="tayyarah-arrow-right" aria-hidden="true"></i></span><i
								class="tayyarah-clock-o"></i>{{buslists.arrivalTime}}
						</div>
						<div class="row margin-top20px f-7">
							{{buslists.availableSeats}} Seats Available!</div>
					</div>

					<div class="col-md-2 col-sm-2 hidden-xs">
						<div class="margin-top20px">
							<div>
								<i data-ng-class="classname" class="tayyarah-INR"></i>{{buslists.fare.bookingPrice}}
							</div>

							<button ng-if="buslists.availableSeats !=0"
								class="btn btn-info bookBtn"
								data-ng-click="Showseats(buslists,buslists.routeScheduleId,busindex)">
								View Seats <span
									data-ng-show="loaderSpin{{buslists.routeScheduleId}}"
									class="loaderSpan"><img id="removeImg"
									src="images/loginLoader.gif" width="20px" /></span>
							</button>
							<button ng-if="buslists.availableSeats ==0"
								class="btn btn-info bookBtn" disabled>Closed</button>
						</div>
					</div>
					<div class="col-xs-3 pad-l0 visible-xs">
						<div class="margin-top20px">
							<div class="f-10">
								<i data-ng-class="classname" class="tayyarah-INR"></i>{{buslists.fare.bookingPrice}}
							</div>

							<%-- <button class="btn btn-info bookBtn" data-ng-click="Showseats(buslists,buslists.routeScheduleId,busindex)">View Seats <span data-ng-show="loaderSpin{{buslists.routeScheduleId}}" class="loaderSpan"><img
											id="removeImg" src="images/loginLoader.gif" width="20px" /></span></button> --%>
						</div>
					</div>


					<!-- 	
				<div class="visible-xs gradient" data-ng-show="loadpricebar">
   
			<div class="spinner">
				<p class="white"><i class="tayyarah-plane"></i></p>
				<div class="rect1"></div>
				<div class="rect2"></div>
				<div class="rect3"></div>
				<div class="rect4"></div>
				<div class="rect5"></div>
				<p class="white">Loading....</p>
			</div>
		</div> -->
				</div>






				<div class="row pullingDown">
					<div class="col-md-4 col-sm-4  hidden-xs textRed handCursor">
						<p data-ng-click="ShowAmenities(buslists,busindex)">
							<span class="showBorder{{busindex}}">Amenities</span>
						</p>
					</div>
					<div class="col-md-4 col-sm-4 col-xs-7 textRed handCursor"
						data-ng-click="ShowBoarding(buslists,busindex)">
						<span class="showBoarding{{busindex}}">Boarding & Dropping
							Points</span>
					</div>
					<%-- <div class="col-md-2 textRed handCursor" data-ng-click="ShowReviews(buslists,busindex)"><span class="showReviews{{busindex}}">Reviews</span></div>
				<div class="col-md-2 textRed handCursor" data-ng-click="ShowAvalability(buslists,busindex)"><span class="showAvalability{{busindex}}">Avalability</span></div> --%>
					<div class="col-md-4 col-sm-4 col-xs-5 textRed handCursor"
						data-ng-click="ShowCancelationPolicy(buslists,busindex)">
						<span class="showPolicy{{busindex}}">Cancelation Policy</span>
					</div>
				</div>
				<div id="Amenities{{busindex}}"
					class="collapse backgroundGrey packOpen">
					<div class="row">
						<div class="col-md-6 col-sm-6 col-xs-6">
							<i class="tayyarah-television" aria-hidden="true"></i>
						</div>
						<div class="col-md-6 col-sm-6 col-xs-6">
							<i class="tayyarah-cutlery" aria-hidden="true"></i>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6 col-sm-6 col-xs-6">
							<i class="tayyarah-plug" aria-hidden="true"></i>
						</div>
						<div class="col-md-6 col-sm-6 col-xs-6">
							<i class="tayyarah-wifi" aria-hidden="true"></i>
						</div>
					</div>

				</div>
				<div id="Boarding{{busindex}}"
					class="collapse backgroundGrey packOpen ">
					<div class="row">
						<div class="col-md-6 col-sm-6 hidden-xs boardLi"
							style="padding-right: 0px;">
							<p class="padLeft35per font600 margin-top-20px">Boarding
								Points</p>
							<div class="col-md-12 backgroundGrey ">
								<div class="col-md-1 paddingLR0px">S.No</div>
								<div class="col-md-9 paddingLR0px">Boarding Point Details</div>
								<div class="col-md-2 paddingLR0px">Time</div>
							</div>
							<ul class="col-md-12 listNone margin-top-20px">
								<li ng-if="!isboard"><a class="col-md-9">view seats to
										check boarding points </a><a class="col-md-3"></a></li>
								<li class="col-md-12" style="padding: 0px;" ng-if="isboard"
									data-ng-repeat="boarding in boardingPoints track by $index"><a
									class="col-md-1">{{$index + 1}}.</a><a class="col-md-9">{{boarding.location}}
								</a><a class="col-md-2">{{boarding.Time}} </a></li>
							</ul>
						</div>
						<div class="col-md-6 col-sm-6 hidden-xs dropLi"
							style="padding-left: 0px;">
							<p class=" padLeft35per font600 margin-top-20px">Dropping
								Points</p>
							<div class="col-md-12 font600 backgroundGrey ">
								<div class="col-md-1 paddingLR0px">S.No</div>
								<div class="col-md-9 paddingLR0px">Dropping Point Details</div>
								<div class="col-md-2 paddingLR0px">Time</div>
							</div>
							<ul class="col-md-12 listNone row padLeft20per margin-top-20px">
								<li ng-if="!isdrop"><a class="col-md-9 ">view seats to
										check dropping points </a><a class="col-md-3"></a></li>
								<li class="col-md-12" style="padding: 0px;" ng-if="isdrop"
									data-ng-repeat="droping in droppingPoints track by $index"><a
									class="col-md-1">{{$index + 1}}.</a><a class="col-md-9 ">{{droping.location}}
								</a><a class="col-md-2">
										<!-- <i class="tayyarah-clock-o"></i> -->{{droping.Time}}
								</a></li>
							</ul>
						</div>
						<div class="col-xs-12 visible-xs">
							<p class="font600 f-10 margin-top-10px">Boarding Points</p>
							<div ng-if="isboard" class="col-xs-12 font600 backgroundmob ">
								<div class="col-xs-1 paddingLR0px">S.No</div>
								<div class="col-xs-9 paddingLR0px">Boarding Point Details</div>
								<div class="col-xs-2 paddingLR0px">Time</div>
							</div>
							<div ng-if="!isboard" class="col-xs-12 font600 backgroundmob "
								style='background-color: #13181c;'>
								<a>view seats to check boarding points </a>
							</div>
							<ul class="mobpoint margin-top-10px">
								<!-- <li ng-if="!isboard"><a class="col-xs-10">view seats to check boarding points </a><a class="col-xs-2"></a></li> -->
								<li ng-if="isboard" class="col-xs-12"
									data-ng-repeat="boarding in boardingPoints"><a
									class="col-xs-1">{{$index + 1}}.</a><a class="col-xs-9">{{boarding.location}}
								</a><a class="col-xs-2">{{boarding.Time}} </a></li>
							</ul>
						</div>
						<div class="col-xs-12 visible-xs">
							<p class=" font600 f-10 margin-top-10px">Dropping Points</p>
							<div ng-if="isdrop" class="col-xs-12 font600 backgroundmob ">
								<div class="col-xs-1 paddingLR0px">S.No</div>
								<div class="col-xs-9 paddingLR0px">Dropping Point Details</div>
								<div class="col-xs-2 paddingLR0px">Time</div>
							</div>
							<div ng-if="!isdrop" class="col-xs-12 font600 backgroundmob "
								style='background-color: #13181c;'>
								<a>view seats to check dropping points </a>
							</div>
							<ul class="mobpoint row margin-top-10px">
								<!-- <li ng-if="!isdrop"><a class="col-xs-10 ">view seats to check dropping points </a><a class="col-xs-2"></a></li> -->
								<li ng-if="isdrop" class="col-xs-12"
									data-ng-repeat="droping in droppingPoints"><a
									class="col-xs-1">{{$index + 1}}.</a><a class="col-xs-9 ">{{droping.location}}
								</a><a class="col-xs-2">{{droping.Time}} </a></li>
							</ul>
						</div>
					</div>
				</div>
				<!-- <div id="Reviews{{busindex}}" class="collapse backgroundGrey ">
				Reviews
				</div>
				<div id="Avalability{{busindex}}" class="collapse backgroundGrey">
				Avalability
				</div> -->
				<div id="CancelationPolicy{{busindex}}"
					class="collapse backgroundGrey packOpen">
					<div class="row">
						<div class="col-md-12 col-sm-12 hidden-xs ">
							<p class="font600 margin-top-20px">CancelationPolicy</p>
							<ul class="listNone padLeft20per margin-top-20px">
								<li><a class="col-md-6 col-sm-6 col-xs-6">CutOff
										Time(Hours) <i class="tayyarah-clock-o"></i>
								</a> <a class="col-md-6 col-sm-6 col-xs-6">Percentage </a></li>
							</ul>
						</div>
						<div class="col-md-12 col-sm-12 hidden-xs ">
							<ul class="listNone padLeft20per">
								<li data-ng-repeat="cancelation in cancellations"><a
									class="col-md-6 col-sm-6 col-xs-6 padLeft10per">{{cancelation.cutoffTime}}
								</a> <a class="col-md-6 col-sm-6 col-xs-6 padLeft5per">
										{{cancelation.refundInPercentage}}% </a></li>
							</ul>
						</div>
						<div class="col-sm-12 visible-xs ">
							<p class="font600 f-9 ">CancelationPolicy</p>
							<ul class="mobpoint padLeft20per margin-top-20px">
								<li><a class="f-9 font600 col-xs-6">CutOff Time(Hours)
										<i class="tayyarah-clock-o"></i>
								</a> <a class="f-9 font600 col-xs-6">Percentage </a></li>
							</ul>
						</div>
						<div class="visible-xs col-xs-12">
							<!-- <p class=" font600 margin-top-10px">CancelationPolicy</p> -->
							<ul class="listNone margin-top-10px">
								<li data-ng-repeat="cancelation in cancellations"><a
									class="f-9 col-md-6  col-sm-6 col-xs-6"
									style="padding-left: 32%;">{{cancelation.cutoffTime}} </a> <a
									class="f-9 col-md-6 col-sm-6 col-xs-6"
									style="padding-left: 15%;">{{cancelation.refundInPercentage}}%
								</a></li>
							</ul>
						</div>
						<div class="col-md-4 col-sm-4 col-xs-4"></div>
						<div class="col-md-4 col-sm-4 col-xs-4"></div>
					</div>
				</div>
				<div id="seats{{busindex}}{{routeserviceid}}"
					class="collapse seatOpen">

					<%-- <div data-ng-hide="!loaderSpin" class="col-md-12 col-sm-12 col-xs-12 backgroundGrey minHeight100px"><span class="loaderSpan"><img  src="images/loginLoader.gif" width="40px" /></span></div> --%>
					<div data-ng-show="seatloader">

						<div ng-if="!is_mobile"
							class="col-md-12 col-sm-12 col-xs-12 backgroundGrey minHeight100px scrollSeatTop hidden-xs">
							<button class="btn btn-info colbtn"
								data-ng-click="Showseats(buslists,busindex)">X</button>
							<div class="col-md-12 col-sm-12 col-xs-12 rowdetailseat">
								<div class="col-md-2 col-sm-2 col-xs-2 detailseat">
									<div class="col-md-3 col-sm-3 col-xs-3 avilableseat"></div>
									<div class="col-md-9 col-sm-9 col-xs-9">Available</div>
								</div>
								<div class="col-md-3 col-sm-3 col-xs-3 detailseat">
									<div class="col-md-3 col-sm-3 col-xs-3 avilableseatlady"></div>
									<div class="col-md-9 col-sm-9 col-xs-9">Available Ladies
										Seat</div>
								</div>
								<div class="col-md-2 col-sm-2 col-xs-2 detailseat">
									<div class="col-md-3 col-sm-3 col-xs-3 SeatSelected"></div>
									<div class="col-md-9 col-sm-9 col-xs-9">Selected</div>
								</div>
								<div class="col-md-3 col-sm-3 col-xs-3 detailseat">
									<div class="col-md-3 col-sm-3 col-xs-3 SeatSelectedladies"></div>
									<div class="col-md-9 col-sm-9 col-xs-9">Selected Ladies
										Seat</div>
								</div>
								<div class="col-md-2 col-sm-2 col-xs-2 detailseat">
									<div
										class="col-md-3 col-sm-3 col-xs-3 selectedlady bookedseat Booked"></div>
									<div class="col-md-9 col-sm-9 col-xs-9">Booked</div>
								</div>
							</div>
							<div class="col-md-12 col-sm-12 col-xs-12 rowdetailseat"
								ng-if="(lowerberth || lowerberthwithseat) || upper">
								<div class="col-md-2 col-sm-2 col-xs-2 pad-r0  detailseat">
									<div class="col-md-12 col-sm-12 col-xs-12 pad-r0">
										<div class="col-md-3 col-sm-3 col-xs-3 avilablebed"></div>
										<div class="col-md-7 col-sm-8 col-xs-9 pad-r0">Available</div>
									</div>
								</div>
								<div class="col-md-3 col-sm-3 col-xs-3 pad-r0  detailseat">
									<div class="col-md-12 col-sm-12 col-xs-12 pad-r0">
										<div class="col-md-3 col-sm-3 col-xs-3 avilableladiesbed"></div>
										<div class="col-md-8 col-sm-8 col-xs-9 pad-r0">Available
											Ladies Seat</div>
									</div>
								</div>
								<div class="col-md-2 col-sm-2 col-xs-2 pad-r0  detailseat">
									<div class="col-md-12 col-sm-12 col-xs-12 pad-r0">
										<div class="col-md-3 col-sm-3 col-xs-3 selectedbed"></div>
										<div class="col-md-7 col-sm-8 col-xs-9 pad-r0">Selected</div>
									</div>
								</div>
								<div class="col-md-2 col-sm-2 col-xs-2 pad-r0  detailseat">
									<div class="col-md-12 col-sm-12 col-xs-12 pad-r0">
										<div class="col-md-3 col-sm-3 col-xs-3 bookedbed"></div>
										<div class="col-md-7 col-sm-8 col-xs-9 pad-r0">Booked</div>
									</div>
								</div>
							</div>
							<div class="col-md-12 col-sm-12 col-xs-12 busSeatTable">

								<!-- ################upper seat table#################### -->

								<div id="buscontainer" ng-if="upper" class="SleeperSeats">

									<table class="upperPortion" style="margin-top: 16px;">
										<thead></thead>
										<tbody ng-if="!uppervertical">
											<tr>
												<td width="13%"></td>
												<td rowspan="10"><p class="vericaltext"></p></td>
												<td class="tool"
													data-ng-repeat="(index,seatlist) in useatsline1"
													colspan="1">
													<div class="tooltip">
														<div class="row">
															<h2 style="font-size: 10px;">Seat Information</h2>
														</div>
														<div class="row">
															<span>Seat Id:{{seatlist.id}}</span>
														</div>
														<div class="row">
															<span>Seat
																Price:{{seatlist.seatFare.totalPayableAmount}}</span>
														</div>
														<div ng-if="seatlist.available==true" class="row">
															<span>Status:Seat Available!</span>
														</div>
														<div ng-if="seatlist.available==false" class="row">
															<span>Status:Seat Not Available!</span>
														</div>
													</div>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==false"
														class="SleeperseatRow avilablebed"
														id="upperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==true"
														class="SleeperseatRow avilableladiesbed"
														id="upperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==true"
														class="SleeperseatRow bookedbed"
														id="upperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==false"
														class="SleeperseatRow bookedbed"
														id="upperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
												</td>
											</tr>
											<tr>
												<td width="13%"><p class="letterP4"
														style="margin-bottom: -24px;">Upper</p></td>
												<td class="tool"
													data-ng-repeat="(index,seatlist) in useatsline2"
													colspan="1">
													<div class="tooltip">
														<div class="row">
															<h2 style="font-size: 10px;">Seat Information</h2>
														</div>
														<div class="row">
															<span>Seat Id:{{seatlist.id}}</span>
														</div>
														<div class="row">
															<span>Seat
																Price:{{seatlist.seatFare.totalPayableAmount}}</span>
														</div>
														<div ng-if="seatlist.available==true" class="row">
															<span>Status:Seat Available!</span>
														</div>
														<div ng-if="seatlist.available==false" class="row">
															<span>Status:Seat Not Available!</span>
														</div>
													</div>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==false"
														class="SleeperseatRow avilablebed"
														id="upperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==true"
														class="SleeperseatRow avilableladiesbed"
														id="upperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==true"
														class="SleeperseatRow bookedbed"
														id="upperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==false"
														class="SleeperseatRow bookedbed"
														id="upperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
												</td>
											</tr>
											<tr height="20">
											</tr>
											<tr height="25">
												<td width="13%"></td>
												<td class="tool"
													data-ng-repeat="(index,seatlist) in useatsline3"
													colspan="1">
													<div class="tooltip">
														<div class="row">
															<h2 style="font-size: 10px;">Seat Information</h2>
														</div>
														<div class="row">
															<span>Seat Id:{{seatlist.id}}</span>
														</div>
														<div class="row">
															<span>Seat
																Price:{{seatlist.seatFare.totalPayableAmount}}</span>
														</div>
														<div ng-if="seatlist.available==true" class="row">
															<span>Status:Seat Available!</span>
														</div>
														<div ng-if="seatlist.available==false" class="row">
															<span>Status:Seat Not Available!</span>
														</div>
													</div>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==false"
														class="SleeperseatRow avilablebed"
														id="upperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==true"
														class="SleeperseatRow avilableladiesbed"
														id="upperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==true"
														class="SleeperseatRow bookedbed"
														id="upperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==false"
														class="SleeperseatRow bookedbed"
														id="upperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
												</td>
											</tr>
											<tr>
												<td width="13%"></td>
												<td class="tool"
													data-ng-repeat="(index,seatlist) in useatsline4"
													colspan="1">
													<div class="tooltip">
														<div class="row">
															<h2 style="font-size: 10px;">Seat Information</h2>
														</div>
														<div class="row">
															<span>Seat Id:{{seatlist.id}}</span>
														</div>
														<div class="row">
															<span>Seat
																Price:{{seatlist.seatFare.totalPayableAmount}}</span>
														</div>
														<div ng-if="seatlist.available==true" class="row">
															<span>Status:Seat Available!</span>
														</div>
														<div ng-if="seatlist.available==false" class="row">
															<span>Status:Seat Not Available!</span>
														</div>
													</div>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==false"
														class="SleeperseatRow avilablebed"
														id="upperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==true"
														class="SleeperseatRow avilableladiesbed"
														id="upperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==true"
														class="SleeperseatRow bookedbed"
														id="upperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==false"
														class="SleeperseatRow bookedbed"
														id="upperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
												</td>
											</tr>

										</tbody>
										<tbody ng-if="uppervertical">
											<tr height="15"></tr>
											<tr>
												<td width="10%"><p ng-if="upper" class="letterP4"
														style="margin-bottom: -29px;">Upper</p></td>
												<td rowspan="10"><p class="vericaltext marginLeft15px"></p></td>
												<td class="tool"
													data-ng-repeat="(index,seatlist) in useatvertical">
													<div class="tooltip">
														<div class="row">
															<h2 style="font-size: 10px;">Seat Information</h2>
														</div>
														<div class="row">
															<span>Seat Id:{{seatlist.id}}</span>
														</div>
														<div class="row">
															<span>Seat
																Price:{{seatlist.seatFare.totalPayableAmount}}</span>
														</div>
														<div ng-if="seatlist.available==true" class="row">
															<span>Status:Seat Available!</span>
														</div>
														<div ng-if="seatlist.available==false" class="row">
															<span>Status:Seat Not Available!</span>
														</div>
													</div>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==false"
														class=" avilablebedver"
														id="upperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==true"
														class=" avilableladiesbedver"
														id="upperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==false"
														class=" bookedbedver"
														id="upperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==true"
														class="bookedbedver"
														id="upperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
												</td>
											</tr>
											<tr height="25"></tr>
										</tbody>
									</table>
								</div>



								<div id="buscontainer" class="lowernormal"
									ng-if="!lowerberth && !lowerberthwithseat">

									<table class="upperPortion lowerpart">
										<thead></thead>
										<tbody ng-if="isFirstrow == true">
											<tr>
												<td width="10%"><img src="images/drive.png"
													width="30px" height="20px" /></td>
												<td rowspan="10"><p class="vericaltext marginLeft15px"></p></td>
												<td data-ng-repeat="(index,seatlist) in seatsline1">
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click=lowerSeatSelect(seatlist.id,seatlist)>{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
												</td>
											</tr>
											<tr>
												<td width="10%"><p ng-if="upper" class="letterP4"
														style="margin-bottom: -29px;">Lower</p></td>
												<td data-ng-repeat="(index,seatlist) in seatsline2">
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
											</tr>
											<tr height="25">
												<td width="13%"></td>
												<td ng-hide="$last"
													data-ng-repeat="(index,seatlist) in seatsline1"></td>
												<!-- <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td> -->
												<td data-ng-repeat="(index,seatlist) in seatsline3">
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
											</tr>
											<tr ng-if="isFirstrow==true">
												<td width="10%"></td>
												<td data-ng-repeat="(index,seatlist) in seatsline4"
													colspan="1">
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
											</tr>
											<tr>
												<td width="10%"></td>
												<td data-ng-repeat="(index,seatlist) in seatsline5"
													colspan="1">
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
											</tr>
										</tbody>
										<tbody ng-if="isFirstrow !=true">

											<tr>
												<td width="10%"><img src="images/drive.png"
													width="30px" height="20px" /></td>
												<td rowspan="10"><p class="vericaltext marginLeft15px"></p></td>
												<td data-ng-repeat="(index,seatlist) in seatsline2">
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
											</tr>
											<tr>
												<td width="10%"><p ng-if="upper" class="letterP4"
														style="margin-bottom: -29px;">Lower</p></td>
												<td data-ng-repeat="(index,seatlist) in seatsline3">
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
											</tr>


											<tr height="25">
												<td width="13%"></td>
												<td ng-hide="$last"
													data-ng-repeat="(index,seatlist) in seatsline2"></td>
												<!-- <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td> -->
												<td data-ng-repeat="(index,seatlist) in seatsline4">
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
											</tr>
											<tr>
												<td width="10%"></td>
												<td data-ng-repeat="(index,seatlist) in seatsline5"
													colspan="1">
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
											</tr>
										</tbody>
									</table>
								</div>

								<div ng-if="lowerberth" id="buscontainer" class="lowernormal">

									<table class="upperPortion lowerpart">
										<thead></thead>
										<tbody ng-if="!verticalBerth">
											<tr>
												<td width="10%"><img src="images/drive.png"
													width="30px" height="20px" /></td>
												<td rowspan="10"><p class="vericaltext marginLeft15px"></p></td>
												<td data-ng-repeat="(index,seatlist) in seatsline1">
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==false"
														class="SleeperseatRow avilablebed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==true"
														class="SleeperseatRow avilablebed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==false"
														class="SleeperseatRow avilablebed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==true"
														class="SleeperseatRow avilablebed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
												</td>
											</tr>
											<tr>
												<td width="13%"><p ng-if="upper"
														style="margin-bottom: -29px;" class="letterP4">Lower</p></td>
												<td data-ng-repeat="(index,seatlist) in seatsline2"
													colspan="1"><button class="SleeperseatRow avilablebed"
														id="upperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button></td>
											</tr>
											<tr height="25"></tr>
											<tr>
												<td width="13%"></td>
												<td data-ng-repeat="(index,seatlist) in seatsline4"
													colspan="1"><button class="SleeperseatRow avilablebed"
														id="upperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button></td>
											</tr>
										</tbody>
										<tbody ng-if="verticalBerth">
											<tr height="15">
												<td width="10%"><img src="images/drive.png"
													width="30px" height="20px" /></td>
											</tr>
											<tr>
												<td width="10%"><p ng-if="upper" class="letterP4"
														style="margin-bottom: -29px;">Lower</p></td>
												<td rowspan="10"><p class="vericaltext marginLeft15px"></p></td>
												<td data-ng-repeat="(index,seatlist) in seatvertical">
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==false"
														class=" avilablebedver"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==true"
														class=" avilableladiesbedver"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==false"
														class=" bookedbedver"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==true"
														class="bookedbedver"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
												</td>
											</tr>
											<tr height="25"></tr>
										</tbody>

									</table>
								</div>

								<div id="buscontainer" ng-if="lowerberthwithseat"
									class="lowernormal">

									<table class="upperPortion lowerpartwithseat">
										<thead></thead>
										<tbody ng-if="twoLine ==false">
											<tr>
												<td width="10%"><img src="images/drive.png"
													width="30px" height="20px" /></td>
												<td rowspan="10"><p ng-if="upper"
														class="vericaltext marginLeft15px"></p></td>
												<td class="busrow tool"
													data-ng-repeat="(index,seatlist) in seatsline3">
													<div class="tooltip">
														<div class="row">
															<h2 style="font-size: 10px;">Seat Information</h2>
														</div>
														<div class="row">
															<span>Seat Id:{{seatlist.id}}</span>
														</div>
														<div class="row">
															<span>Seat
																Price:{{seatlist.seatFare.totalPayableAmount}}</span>
														</div>
														<div ng-if="seatlist.available==true" class="row">
															<span>Status:Seat Available!</span>
														</div>
														<div ng-if="seatlist.available==false" class="row">
															<span>Status:Seat Not Available!</span>
														</div>
													</div> <!-- title="<table><tr><td style='color:red;'>complex</td><td>HTML</td></tr></table> rel="tooltip" data-toggle="tooltip"" data-trigger="hover" data-placement="bottom" data-html="true"-->
													<button
														ng-if="seatlist.length == 1 && seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat "
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 && seatlist.available==true && seatlist.ladiesSeat ==false"
														class="SleeperseatRow avilablebed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="SleeperseatRow avilableladiesbed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="SleeperseatRow bookedbed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="SleeperseatRow bookedbed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
												</td>
											</tr>
											<tr>
												<td width="13%"><p ng-if="upper"
														style="margin-bottom: 7px;" class="letterP4">Lower</p></td>
												<%-- 				<td data-ng-repeat="(index,seatlist) in seatsline2" colspan="1"><button class="SleeperseatRow" id="upperseat{{busindex}}{{seatlist.seatindex}}" data-ng-click="lowerSeatSelect(seatlist.seatindex)">{{seatlist.id}}<span class="pillow"></span></button></td>
 --%>
												<td class="tool"
													data-ng-repeat="(index,seatlist) in seatsline4">
													<div class="tooltip">
														<div class="row">
															<h2 style="font-size: 10px;">Seat Information</h2>
														</div>
														<div class="row">
															<span>Seat Id:{{seatlist.id}}</span>
														</div>
														<div class="row">
															<span>Seat
																Price:{{seatlist.seatFare.totalPayableAmount}}</span>
														</div>
														<div ng-if="seatlist.available==true" class="row">
															<span>Status:Seat Available!</span>
														</div>
														<div ng-if="seatlist.available==false" class="row">
															<span>Status:Seat Not Available!</span>
														</div>
													</div>
													<button
														ng-if="seatlist.length == 1 && seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">
														{{seatlist.id}}</span>
													</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 && seatlist.available==true && seatlist.ladiesSeat ==false"
														class="SleeperseatRow avilablebed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="SleeperseatRow avilableladiesbed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="SleeperseatRow bookedbed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="SleeperseatRow bookedbed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
												</td>
											</tr>
											<tr height="20"></tr>
											<tr>
												<td width="13%"></td>
												<td ng-hide="$last"
													data-ng-repeat="(index,seatlist) in seatsline3" colspan="1"></td>
												<td class="tool"
													data-ng-repeat="(index,seatlist) in seatsline5" colspan="1">
													<div class="tooltip">
														<div class="row">
															<h2 style="font-size: 10px;">Seat Information</h2>
														</div>
														<div class="row">
															<span>Seat Id:{{seatlist.id}}</span>
														</div>
														<div class="row">
															<span>Seat
																Price:{{seatlist.seatFare.totalPayableAmount}}</span>
														</div>
														<div ng-if="seatlist.available==true" class="row">
															<span>Status:Seat Available!</span>
														</div>
														<div ng-if="seatlist.available==false" class="row">
															<span>Status:Seat Not Available!</span>
														</div>
													</div>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 && seatlist.available==true && seatlist.ladiesSeat ==false"
														class="SleeperseatRow avilablebed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="SleeperseatRow avilableladiesbed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="SleeperseatRow bookedbed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="SleeperseatRow bookedbed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
												</td>
											</tr>
											<tr>
												<td width="13%"></td>
												<td class="tool"
													data-ng-repeat="(index,seatlist) in seatsline6" colspan="1">
													<div class="tooltip">
														<div class="row">
															<h2 style="font-size: 10px;">Seat Information</h2>
														</div>
														<div class="row">
															<span>Seat Id:{{seatlist.id}}</span>
														</div>
														<div class="row">
															<span>Seat
																Price:{{seatlist.seatFare.totalPayableAmount}}</span>
														</div>
														<div ng-if="seatlist.available==true" class="row">
															<span>Status:Seat Available!</span>
														</div>
														<div ng-if="seatlist.available==false" class="row">
															<span>Status:Seat Not Available!</span>
														</div>
													</div>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 && seatlist.available==true && seatlist.ladiesSeat ==false"
														class="SleeperseatRow avilablebed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="SleeperseatRow avilableladiesbed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="SleeperseatRow bookedbed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="SleeperseatRow bookedbed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
												</td>
											</tr>
										</tbody>
										<tbody ng-if="firstLine ==false">
											<tr>
												<td width="10%"><img src="images/drive.png"
													width="30px" height="20px" /></td>
												<td rowspan="10"><p ng-if="upper"
														class="vericaltext marginLeft15px"></p></td>
												<td class="busrow tool"
													data-ng-repeat="(index,seatlist) in seatsline2">
													<div class="tooltip">
														<div class="row">
															<h2 style="font-size: 10px;">Seat Information</h2>
														</div>
														<div class="row">
															<span>Seat Id:{{seatlist.id}}</span>
														</div>
														<div class="row">
															<span>Seat
																Price:{{seatlist.seatFare.totalPayableAmount}}</span>
														</div>
														<div ng-if="seatlist.available==true" class="row">
															<span>Status:Seat Available!</span>
														</div>
														<div ng-if="seatlist.available==false" class="row">
															<span>Status:Seat Not Available!</span>
														</div>
													</div>
													<button
														ng-if="seatlist.length == 1 && seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 && seatlist.available==true && seatlist.ladiesSeat ==false"
														class="SleeperseatRow avilablebed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="SleeperseatRow avilableladiesbed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="SleeperseatRow bookedbed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="SleeperseatRow bookedbed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
												</td>
											</tr>
											<tr>
												<td width="13%"><p ng-if="upper"
														style="margin-bottom: 7px;" class="letterP4">Lower</p></td>

												<td class="tool"
													data-ng-repeat="(index,seatlist) in seatsline3">
													<div class="tooltip">
														<div class="row">
															<h2 style="font-size: 10px;">Seat Information</h2>
														</div>
														<div class="row">
															<span>Seat Id:{{seatlist.id}}</span>
														</div>
														<div class="row">
															<span>Seat
																Price:{{seatlist.seatFare.totalPayableAmount}}</span>
														</div>
														<div ng-if="seatlist.available==true" class="row">
															<span>Status:Seat Available!</span>
														</div>
														<div ng-if="seatlist.available==false" class="row">
															<span>Status:Seat Not Available!</span>
														</div>
													</div>
													<button
														ng-if="seatlist.length == 1 && seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">
														{{seatlist.id}}</span>
													</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 && seatlist.available==true && seatlist.ladiesSeat ==false"
														class="SleeperseatRow avilablebed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="SleeperseatRow avilableladiesbed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="SleeperseatRow bookedbed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="SleeperseatRow bookedbed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
												</td>
											</tr>
											<tr>
											</tr>
											<tr>
												<td width="13%"></td>
												<td ng-hide="$last"
													data-ng-repeat="(index,seatlist) in seatsline2" colspan="1"></td>
												<td class="tool"
													data-ng-repeat="(index,seatlist) in seatsline4" colspan="1">
													<div class="tooltip">
														<div class="row">
															<h2 style="font-size: 10px;">Seat Information</h2>
														</div>
														<div class="row">
															<span>Seat Id:{{seatlist.id}}</span>
														</div>
														<div class="row">
															<span>Seat
																Price:{{seatlist.seatFare.totalPayableAmount}}</span>
														</div>
														<div ng-if="seatlist.available==true" class="row">
															<span>Status:Seat Available!</span>
														</div>
														<div ng-if="seatlist.available==false" class="row">
															<span>Status:Seat Not Available!</span>
														</div>
													</div>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<div ng-if="seatlist.length == 2">
														<button
															ng-if="seatlist.length == 2 && seatlist.available==true && seatlist.ladiesSeat ==false"
															class="SleeperseatRow avilablebed"
															id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
															data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
														<button
															ng-if="seatlist.length == 2 &&seatlist.available==true && seatlist.ladiesSeat ==true"
															class="SleeperseatRow avilableladiesbed"
															id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
															data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
														<button
															ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==false"
															class="SleeperseatRow bookedbed"
															id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
															data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
														<button
															ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==true"
															class="SleeperseatRow bookedbed"
															id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
															data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													</div>
												</td>
											</tr>
											<tr>
												<td width="13%"></td>
												<td width="17%" class="tool"
													data-ng-repeat="(index,seatlist) in seatsline5" colspan="2">
													<div class="tooltip">
														<div class="row">
															<h2 style="font-size: 10px;">Seat Information</h2>
														</div>
														<div class="row">
															<span>Seat Id:{{seatlist.id}}</span>
														</div>
														<div class="row">
															<span>Seat
																Price:{{seatlist.seatFare.totalPayableAmount}}</span>
														</div>
														<div ng-if="seatlist.available==true" class="row">
															<span>Status:Seat Available!</span>
														</div>
														<div ng-if="seatlist.available==false" class="row">
															<span>Status:Seat Not Available!</span>
														</div>
													</div>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<div ng-if="seatlist.length == 2">
														<!-- <button  class="seatIndication"></button> -->
														<button
															ng-if="seatlist.length == 2 && seatlist.available==true && seatlist.ladiesSeat ==false"
															class="SleeperseatRow avilablebed"
															id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
															data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
														<button
															ng-if="seatlist.length == 2 &&seatlist.available==true && seatlist.ladiesSeat ==true"
															class="SleeperseatRow avilableladiesbed"
															id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
															data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
														<button
															ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==false"
															class="SleeperseatRow bookedbed"
															id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
															data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
														<button
															ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==true"
															class="SleeperseatRow bookedbed"
															id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
															data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													</div>
												</td>
											</tr>
										</tbody>
										<tbody ng-if="firstLine ==true &&twoLine ==true">
											<tr height="40">
												<td width="10%"><img src="images/drive.png"
													width="30px" height="20px" /></td>
												<td rowspan="10"><p ng-if="upper"
														class="vericaltext marginLeft15px"></p></td>
												<td class="busrow tool"
													data-ng-repeat="(index,seatlist) in seatsline1">
													<div class="tooltip">
														<div class="row">
															<h2 style="font-size: 10px;">Seat Information</h2>
														</div>
														<div class="row">
															<span>Seat Id:{{seatlist.id}}</span>
														</div>
														<div class="row">
															<span>Seat
																Price:{{seatlist.seatFare.totalPayableAmount}}</span>
														</div>
														<div ng-if="seatlist.available==true" class="row">
															<span>Status:Seat Available!</span>
														</div>
														<div ng-if="seatlist.available==false" class="row">
															<span>Status:Seat Not Available!</span>
														</div>
													</div>
													<button
														ng-if="seatlist.length == 1 && seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 && seatlist.available==true && seatlist.ladiesSeat ==false"
														class="SleeperseatRow avilablebed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="SleeperseatRow avilableladiesbed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="SleeperseatRow bookedbed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="SleeperseatRow bookedbed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
												</td>
											</tr>
											<tr height="40">
												<td width="13%"><p ng-if="upper"
														style="margin-bottom: 7px;" class="letterP4">Lower</p></td>
												<%-- 				<td data-ng-repeat="(index,seatlist) in seatsline2" colspan="1"><button class="SleeperseatRow" id="upperseat{{busindex}}{{seatlist.seatindex}}" data-ng-click="lowerSeatSelect(seatlist.seatindex)">{{seatlist.id}}<span class="pillow"></span></button></td>
 --%>
												<td class="tool"
													data-ng-repeat="(index,seatlist) in seatsline2">
													<div class="tooltip">
														<div class="row">
															<h2 style="font-size: 10px;">Seat Information</h2>
														</div>
														<div class="row">
															<span>Seat Id:{{seatlist.id}}</span>
														</div>
														<div class="row">
															<span>Seat
																Price:{{seatlist.seatFare.totalPayableAmount}}</span>
														</div>
														<div ng-if="seatlist.available==true" class="row">
															<span>Status:Seat Available!</span>
														</div>
														<div ng-if="seatlist.available==false" class="row">
															<span>Status:Seat Not Available!</span>
														</div>
													</div>
													<button
														ng-if="seatlist.length == 1 && seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">
														{{seatlist.id}}</span>
													</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 && seatlist.available==true && seatlist.ladiesSeat ==false"
														class="SleeperseatRow avilablebed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="SleeperseatRow avilableladiesbed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="SleeperseatRow bookedbed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="SleeperseatRow bookedbed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
												</td>
											</tr>
											<tr></tr>
											<tr>
												<td width="13%"></td>
												<td ng-hide="$last"
													data-ng-repeat="(index,seatlist) in seatsline1" colspan="1"></td>
												<td class="tool"
													data-ng-repeat="(index,seatlist) in seatsline3" colspan="1">
													<div class="tooltip">
														<div class="row">
															<h2 style="font-size: 10px;">Seat Information</h2>
														</div>
														<div class="row">
															<span>Seat Id:{{seatlist.id}}</span>
														</div>
														<div class="row">
															<span>Seat
																Price:{{seatlist.seatFare.totalPayableAmount}}</span>
														</div>
														<div ng-if="seatlist.available==true" class="row">
															<span>Status:Seat Available!</span>
														</div>
														<div ng-if="seatlist.available==false" class="row">
															<span>Status:Seat Not Available!</span>
														</div>
													</div>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 && seatlist.available==true && seatlist.ladiesSeat ==false"
														class="SleeperseatRow avilablebed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="SleeperseatRow avilableladiesbed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="SleeperseatRow bookedbed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="SleeperseatRow bookedbed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
												</td>
											</tr>
											<tr>
												<td width="13%"></td>
												<td class="tool"
													data-ng-repeat="(index,seatlist) in seatsline4" colspan="1">
													<div class="tooltip">
														<div class="row">
															<h2 style="font-size: 10px;">Seat Information</h2>
														</div>
														<div class="row">
															<span>Seat Id:{{seatlist.id}}</span>
														</div>
														<div class="row">
															<span>Seat
																Price:{{seatlist.seatFare.totalPayableAmount}}</span>
														</div>
														<div ng-if="seatlist.available==true" class="row">
															<span>Status:Seat Available!</span>
														</div>
														<div ng-if="seatlist.available==false" class="row">
															<span>Status:Seat Not Available!</span>
														</div>
													</div>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 && seatlist.available==true && seatlist.ladiesSeat ==false"
														class="SleeperseatRow avilablebed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="SleeperseatRow avilableladiesbed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="SleeperseatRow bookedbed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="SleeperseatRow bookedbed"
														id="lowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
												</td>
											</tr>
										</tbody>
									</table>
								</div>

							</div>
						</div>



						<!-- Mobile Responsiveness seat layouy -->

						<div ng-if="is_mobile"
							class="col-md-12 col-sm-12 col-xs-12 visible-xs backgroundGrey minHeight100px mob-seat">
							<button class="btn btn-info colbtn buscolbtn"
								data-ng-click="Showseats(buslists,busindex)">X</button>
							<div class="col-md-12 col-sm-12 col-xs-12 rowdetailseat">
								<div class="col-md-2 col-sm-2 col-xs-2 detailseat">
									<div class="col-xs-12">
										<div class="col-md-3 col-sm-3 col-xs-3 avilableseat"></div>
										<div class="col-md-9 col-sm-9 col-xs-8">Available</div>
									</div>
								</div>
								<div class="col-md-3 col-sm-3 col-xs-3 detailseat">
									<div class="col-xs-12">
										<div class="col-md-3 col-sm-3 col-xs-3 avilableseatlady"></div>
										<div class="col-md-9 col-sm-9 col-xs-8">Available Ladies
											Seat</div>
									</div>
								</div>
								<div class="col-md-2 col-sm-2 col-xs-2 detailseat">
									<div class="col-xs-12">
										<div class="col-md-3 col-sm-3 col-xs-3 SeatSelected"></div>
										<div class="col-md-9 col-sm-9 col-xs-8">Selected</div>
									</div>
								</div>
								<div class="col-md-3 col-sm-3 col-xs-3 detailseat">
									<div class="col-xs-12">
										<div class="col-md-3 col-sm-3 col-xs-3 SeatSelectedladies"></div>
										<div class="col-md-9 col-sm-9 col-xs-8">Selected Ladies
											Seat</div>
									</div>
								</div>
								<div class="col-md-2 col-sm-2 col-xs-2 detailseat">
									<div class="col-xs-12">
										<div
											class="col-md-3 col-sm-3 col-xs-3 selectedlady bookedseat Booked"></div>
										<div class="col-md-9 col-sm-9 col-xs-8">Booked</div>
									</div>
								</div>
							</div>
							<div class="col-md-12 col-sm-12 col-xs-12 rowdetailseat"
								ng-if="(lowerberth || lowerberthwithseat) || upper">
								<div class="col-md-2 col-sm-2 col-xs-2 pad-r0  detailseat">
									<div class="col-md-12 col-sm-12 col-xs-12 pad-r0">
										<div class="col-md-3 col-sm-3 col-xs-3 avilablebed"></div>
										<div class="col-md-7 col-sm-8 col-xs-9 pad-r0">Available</div>
									</div>
								</div>
								<div class="col-md-3 col-sm-3 col-xs-3 pad-r0  detailseat">
									<div class="col-md-12 col-sm-12 col-xs-12 pad-r0">
										<div class="col-md-3 col-sm-3 col-xs-3 avilableladiesbed"></div>
										<div class="col-md-8 col-sm-8 col-xs-9 pad-r0">Available
											Ladies Seat</div>
									</div>
								</div>
								<div class="col-md-2 col-sm-2 col-xs-2 pad-r0  detailseat">
									<div class="col-md-12 col-sm-12 col-xs-12 pad-r0">
										<div class="col-md-3 col-sm-3 col-xs-3 selectedbed"></div>
										<div class="col-md-7 col-sm-8 col-xs-9 pad-r0">Selected</div>
									</div>
								</div>
								<div class="col-md-2 col-sm-2 col-xs-2 pad-r0  detailseat">
									<div class="col-md-12 col-sm-12 col-xs-12 pad-r0">
										<div class="col-md-3 col-sm-3 col-xs-3 bookedbed"></div>
										<div class="col-md-7 col-sm-8 col-xs-9 pad-r0">Booked</div>
									</div>
								</div>
							</div>
							<div class="col-md-12 col-sm-12 col-xs-12 busSeatTable">

								<!-- ################upper seat table#################### -->

								<div id="buscontainer" ng-if="upper" class="SleeperSeats">

									<table class="upperPortion" style="margin-top: 16px;">
										<thead></thead>
										<tbody ng-if="!uppervertical">
											<tr>
												<td width="3%"></td>
												<td rowspan="6"><p class="vericaltext"></p></td>
												<td class="tool"
													data-ng-repeat="(index,seatlist) in useatsline1"
													colspan="1">
													<div class="tooltip hidden-xs">
														<div class="row">
															<h2 style="font-size: 10px;">Seat Information</h2>
														</div>
														<div class="row">
															<span>Seat Id:{{seatlist.id}}</span>
														</div>
														<div class="row">
															<span>Seat
																Price:{{seatlist.seatFare.totalPayableAmount}}</span>
														</div>
														<div ng-if="seatlist.available==true" class="row">
															<span>Status:Seat Available!</span>
														</div>
														<div ng-if="seatlist.available==false" class="row">
															<span>Status:Seat Not Available!</span>
														</div>
													</div>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==false"
														class="SleeperseatRow avilablebed"
														id="mupperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==true"
														class="SleeperseatRow avilableladiesbed"
														id="mupperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==true"
														class="SleeperseatRow bookedbed"
														id="mupperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==false"
														class="SleeperseatRow bookedbed"
														id="mupperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
												</td>
											</tr>
											<tr>
												<td width="3%"><p class="letterP4"
														style="margin-bottom: -24px;">Upper</p></td>
												<td class="tool"
													data-ng-repeat="(index,seatlist) in useatsline2"
													colspan="1">
													<div class="tooltip hidden-xs">
														<div class="row">
															<h2 style="font-size: 10px;">Seat Information</h2>
														</div>
														<div class="row">
															<span>Seat Id:{{seatlist.id}}</span>
														</div>
														<div class="row">
															<span>Seat
																Price:{{seatlist.seatFare.totalPayableAmount}}</span>
														</div>
														<div ng-if="seatlist.available==true" class="row">
															<span>Status:Seat Available!</span>
														</div>
														<div ng-if="seatlist.available==false" class="row">
															<span>Status:Seat Not Available!</span>
														</div>
													</div>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==false"
														class="SleeperseatRow avilablebed"
														id="mupperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==true"
														class="SleeperseatRow avilableladiesbed"
														id="mupperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==true"
														class="SleeperseatRow bookedbed"
														id="mupperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==false"
														class="SleeperseatRow bookedbed"
														id="mupperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
												</td>
											</tr>
											<tr height="20">
											</tr>
											<tr height="25">
												<td width="3%"></td>
												<td class="tool"
													data-ng-repeat="(index,seatlist) in useatsline3"
													colspan="1">
													<div class="tooltip hidden-xs">
														<div class="row">
															<h2 style="font-size: 10px;">Seat Information</h2>
														</div>
														<div class="row">
															<span>Seat Id:{{seatlist.id}}</span>
														</div>
														<div class="row">
															<span>Seat
																Price:{{seatlist.seatFare.totalPayableAmount}}</span>
														</div>
														<div ng-if="seatlist.available==true" class="row">
															<span>Status:Seat Available!</span>
														</div>
														<div ng-if="seatlist.available==false" class="row">
															<span>Status:Seat Not Available!</span>
														</div>
													</div>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==false"
														class="SleeperseatRow avilablebed"
														id="mupperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==true"
														class="SleeperseatRow avilableladiesbed"
														id="mupperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==true"
														class="SleeperseatRow bookedbed"
														id="mupperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==false"
														class="SleeperseatRow bookedbed"
														id="mupperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
												</td>
											</tr>
											<tr>
												<td width="3%"></td>
												<td class="tool"
													data-ng-repeat="(index,seatlist) in useatsline4"
													colspan="1">
													<div class="tooltip hidden-xs">
														<div class="row">
															<h2 style="font-size: 10px;">Seat Information</h2>
														</div>
														<div class="row">
															<span>Seat Id:{{seatlist.id}}</span>
														</div>
														<div class="row">
															<span>Seat
																Price:{{seatlist.seatFare.totalPayableAmount}}</span>
														</div>
														<div ng-if="seatlist.available==true" class="row">
															<span>Status:Seat Available!</span>
														</div>
														<div ng-if="seatlist.available==false" class="row">
															<span>Status:Seat Not Available!</span>
														</div>
													</div>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==false"
														class="SleeperseatRow avilablebed"
														id="mupperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==true"
														class="SleeperseatRow avilableladiesbed"
														id="mupperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==true"
														class="SleeperseatRow bookedbed"
														id="mupperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==false"
														class="SleeperseatRow bookedbed"
														id="mupperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
												</td>
											</tr>

										</tbody>
										<tbody ng-if="uppervertical">
											<tr height="15"></tr>
											<tr>
												<td width="3%"><p ng-if="upper" class="letterP4"
														style="margin-bottom: -29px;">Upper</p></td>
												<td rowspan="6"><p class="vericaltext marginLeft15px"></p></td>
												<td class="tool"
													data-ng-repeat="(index,seatlist) in useatvertical">
													<div class="tooltip hidden-xs">
														<div class="row">
															<h2 style="font-size: 10px;">Seat Information</h2>
														</div>
														<div class="row">
															<span>Seat Id:{{seatlist.id}}</span>
														</div>
														<div class="row">
															<span>Seat
																Price:{{seatlist.seatFare.totalPayableAmount}}</span>
														</div>
														<div ng-if="seatlist.available==true" class="row">
															<span>Status:Seat Available!</span>
														</div>
														<div ng-if="seatlist.available==false" class="row">
															<span>Status:Seat Not Available!</span>
														</div>
													</div>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==false"
														class=" avilablebedver"
														id="mupperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==true"
														class=" avilableladiesbedver"
														id="mupperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==false"
														class=" bookedbedver"
														id="mupperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==true"
														class="bookedbedver"
														id="mupperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
												</td>
											</tr>
											<tr height="25"></tr>
										</tbody>
									</table>
								</div>



								<div id="buscontainer" class="lowernormal"
									ng-if="!lowerberth && !lowerberthwithseat">

									<table class="upperPortion lowerpart">
										<thead></thead>
										<tbody ng-if="isFirstrow == true">
											<tr>
												<td width="3%"><img src="images/mdrive.png"
													width="15px" height="10px" /></td>
												<td rowspan="6"><p class="vericaltext marginLeft15px"></p></td>
												<td data-ng-repeat="(index,seatlist) in seatsline1">
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click=lowerSeatSelect(seatlist.id,seatlist)>{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
												</td>
											</tr>
											<tr>
												<td width="3%"><p ng-if="upper" class="letterP4"
														style="margin-bottom: -29px;">Lower</p></td>
												<td data-ng-repeat="(index,seatlist) in seatsline2">
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
											</tr>
											<tr height="25">
												<td width="3%"></td>
												<td ng-hide="$last"
													data-ng-repeat="(index,seatlist) in seatsline1"></td>
												<!-- <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td> -->
												<td data-ng-repeat="(index,seatlist) in seatsline3">
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
											</tr>
											<tr ng-if="isFirstrow==true">
												<td width="3%"></td>
												<td data-ng-repeat="(index,seatlist) in seatsline4"
													colspan="1">
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
											</tr>
											<tr>
												<td width="3%"></td>
												<td data-ng-repeat="(index,seatlist) in seatsline5"
													colspan="1">
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
											</tr>
										</tbody>
										<tbody ng-if="isFirstrow !=true">

											<tr>
												<td width="3%"><img src="images/mdrive.png"
													width="15px" height="10px" /></td>
												<td rowspan="6"><p class="vericaltext marginLeft15px"></p></td>
												<td data-ng-repeat="(index,seatlist) in seatsline2">
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
											</tr>
											<tr>
												<td width="3%"><p ng-if="upper" class="letterP4"
														style="margin-bottom: -29px;">Lower</p></td>
												<td data-ng-repeat="(index,seatlist) in seatsline3">
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
											</tr>


											<tr height="25">
												<td width="3%"></td>
												<td ng-hide="$last"
													data-ng-repeat="(index,seatlist) in seatsline2"></td>
												<!-- <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td> -->
												<td data-ng-repeat="(index,seatlist) in seatsline4">
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
											</tr>
											<tr>
												<td width="3%"></td>
												<td data-ng-repeat="(index,seatlist) in seatsline5"
													colspan="1">
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
											</tr>
										</tbody>
									</table>
								</div>

								<div ng-if="lowerberth" id="buscontainer" class="lowernormal">

									<table class="upperPortion lowerpart">
										<thead></thead>
										<tbody ng-if="!verticalBerth">
											<tr>
												<td width="3%"><img src="images/mdrive.png"
													width="15px" height="10px" /></td>
												<td rowspan="10"><p class="vericaltext marginLeft15px"></p></td>
												<td data-ng-repeat="(index,seatlist) in seatsline1">
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==false"
														class="SleeperseatRow avilablebed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==true"
														class="SleeperseatRow avilablebed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==false"
														class="SleeperseatRow avilablebed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==true"
														class="SleeperseatRow avilablebed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
												</td>
											</tr>
											<tr>
												<td width="3%"><p ng-if="upper"
														style="margin-bottom: -29px;" class="letterP4">Lower</p></td>
												<td data-ng-repeat="(index,seatlist) in seatsline2"
													colspan="1"><button class="SleeperseatRow avilablebed"
														id="mupperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button></td>
											</tr>
											<tr height="25"></tr>
											<tr>
												<td width="3%"></td>
												<td data-ng-repeat="(index,seatlist) in seatsline4"
													colspan="1"><button class="SleeperseatRow avilablebed"
														id="mupperseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button></td>
											</tr>
										</tbody>
										<tbody ng-if="verticalBerth">
											<tr height="15">
												<td width="10%"><img src="images/drive.png"
													width="30px" height="20px" /></td>
											</tr>
											<tr>
												<td width="3%"><p ng-if="upper" class="letterP4"
														style="margin-bottom: -29px;">Lower</p></td>
												<td rowspan="6"><p class="vericaltext marginLeft15px"></p></td>
												<td data-ng-repeat="(index,seatlist) in seatvertical">
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==false"
														class=" avilablebedver"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==true && seatlist.ladiesSeat ==true"
														class=" avilableladiesbedver"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==false"
														class=" bookedbedver"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.available==false && seatlist.ladiesSeat ==true"
														class="bookedbedver"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
												</td>
											</tr>
											<tr height="25"></tr>
										</tbody>

									</table>
								</div>

								<div id="buscontainer" ng-if="lowerberthwithseat"
									class="lowernormal">

									<table class="upperPortion lowerpartwithseat">
										<thead></thead>
										<tbody ng-if="twoLine ==false">
											<tr>
												<td width="3%"><img src="images/mdrive.png"
													width="15px" height="10px" /></td>
												<td rowspan="6"><p ng-if="upper"
														class="vericaltext marginLeft15px"></p></td>
												<td class="busrow tool"
													data-ng-repeat="(index,seatlist) in seatsline3">
													<div class="tooltip hidden-xs">
														<div class="row">
															<h2 style="font-size: 10px;">Seat Information</h2>
														</div>
														<div class="row">
															<span>Seat Id:{{seatlist.id}}</span>
														</div>
														<div class="row">
															<span>Seat
																Price:{{seatlist.seatFare.totalPayableAmount}}</span>
														</div>
														<div ng-if="seatlist.available==true" class="row">
															<span>Status:Seat Available!</span>
														</div>
														<div ng-if="seatlist.available==false" class="row">
															<span>Status:Seat Not Available!</span>
														</div>
													</div> <!-- title="<table><tr><td style='color:red;'>complex</td><td>HTML</td></tr></table> rel="tooltip" data-toggle="tooltip"" data-trigger="hover" data-placement="bottom" data-html="true"-->
													<button
														ng-if="seatlist.length == 1 && seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat "
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 && seatlist.available==true && seatlist.ladiesSeat ==false"
														class="SleeperseatRow avilablebed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="SleeperseatRow avilableladiesbed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="SleeperseatRow bookedbed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="SleeperseatRow bookedbed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
												</td>
											</tr>
											<tr>
												<td width="3%"><p ng-if="upper"
														style="margin-bottom: 7px;" class="letterP4">Lower</p></td>
												<%-- 				<td data-ng-repeat="(index,seatlist) in seatsline2" colspan="1"><button class="SleeperseatRow" id="mupperseat{{busindex}}{{seatlist.seatindex}}" data-ng-click="lowerSeatSelect(seatlist.seatindex)">{{seatlist.id}}<span class="pillow"></span></button></td>
 --%>
												<td class="tool"
													data-ng-repeat="(index,seatlist) in seatsline4">
													<div class="tooltip hidden-xs">
														<div class="row">
															<h2 style="font-size: 10px;">Seat Information</h2>
														</div>
														<div class="row">
															<span>Seat Id:{{seatlist.id}}</span>
														</div>
														<div class="row">
															<span>Seat
																Price:{{seatlist.seatFare.totalPayableAmount}}</span>
														</div>
														<div ng-if="seatlist.available==true" class="row">
															<span>Status:Seat Available!</span>
														</div>
														<div ng-if="seatlist.available==false" class="row">
															<span>Status:Seat Not Available!</span>
														</div>
													</div>
													<button
														ng-if="seatlist.length == 1 && seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">
														{{seatlist.id}}</span>
													</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 && seatlist.available==true && seatlist.ladiesSeat ==false"
														class="SleeperseatRow avilablebed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="SleeperseatRow avilableladiesbed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="SleeperseatRow bookedbed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="SleeperseatRow bookedbed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
												</td>
											</tr>
											<tr height="20"></tr>
											<tr>
												<td width="3%"></td>
												<td ng-hide="$last"
													data-ng-repeat="(index,seatlist) in seatsline3" colspan="1"></td>
												<td class="tool"
													data-ng-repeat="(index,seatlist) in seatsline5" colspan="1">
													<div class="tooltip hidden-xs">
														<div class="row">
															<h2 style="font-size: 10px;">Seat Information</h2>
														</div>
														<div class="row">
															<span>Seat Id:{{seatlist.id}}</span>
														</div>
														<div class="row">
															<span>Seat
																Price:{{seatlist.seatFare.totalPayableAmount}}</span>
														</div>
														<div ng-if="seatlist.available==true" class="row">
															<span>Status:Seat Available!</span>
														</div>
														<div ng-if="seatlist.available==false" class="row">
															<span>Status:Seat Not Available!</span>
														</div>
													</div>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 && seatlist.available==true && seatlist.ladiesSeat ==false"
														class="SleeperseatRow avilablebed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="SleeperseatRow avilableladiesbed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="SleeperseatRow bookedbed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="SleeperseatRow bookedbed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
												</td>
											</tr>
											<tr>
												<td width="3%"></td>
												<td class="tool"
													data-ng-repeat="(index,seatlist) in seatsline6" colspan="1">
													<div class="tooltip hidden-xs">
														<div class="row">
															<h2 style="font-size: 10px;">Seat Information</h2>
														</div>
														<div class="row">
															<span>Seat Id:{{seatlist.id}}</span>
														</div>
														<div class="row">
															<span>Seat
																Price:{{seatlist.seatFare.totalPayableAmount}}</span>
														</div>
														<div ng-if="seatlist.available==true" class="row">
															<span>Status:Seat Available!</span>
														</div>
														<div ng-if="seatlist.available==false" class="row">
															<span>Status:Seat Not Available!</span>
														</div>
													</div>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 && seatlist.available==true && seatlist.ladiesSeat ==false"
														class="SleeperseatRow avilablebed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="SleeperseatRow avilableladiesbed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="SleeperseatRow bookedbed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="SleeperseatRow bookedbed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
												</td>
											</tr>
										</tbody>
										<tbody ng-if="firstLine ==false">
											<tr>
												<td width="3%"><img src="images/mdrive.png"
													width="15px" height="10px" /></td>
												<td rowspan="6"><p ng-if="upper"
														class="vericaltext marginLeft15px"></p></td>
												<td class="busrow tool"
													data-ng-repeat="(index,seatlist) in seatsline2">
													<div class="tooltip hidden-xs">
														<div class="row">
															<h2 style="font-size: 10px;">Seat Information</h2>
														</div>
														<div class="row">
															<span>Seat Id:{{seatlist.id}}</span>
														</div>
														<div class="row">
															<span>Seat
																Price:{{seatlist.seatFare.totalPayableAmount}}</span>
														</div>
														<div ng-if="seatlist.available==true" class="row">
															<span>Status:Seat Available!</span>
														</div>
														<div ng-if="seatlist.available==false" class="row">
															<span>Status:Seat Not Available!</span>
														</div>
													</div>
													<button
														ng-if="seatlist.length == 1 && seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 && seatlist.available==true && seatlist.ladiesSeat ==false"
														class="SleeperseatRow avilablebed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="SleeperseatRow avilableladiesbed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="SleeperseatRow bookedbed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="SleeperseatRow bookedbed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
												</td>
											</tr>
											<tr>
												<td width="3%"><p ng-if="upper"
														style="margin-bottom: 7px;" class="letterP4">Lower</p></td>

												<td class="tool"
													data-ng-repeat="(index,seatlist) in seatsline3">
													<div class="tooltip hidden-xs">
														<div class="row">
															<h2 style="font-size: 10px;">Seat Information</h2>
														</div>
														<div class="row">
															<span>Seat Id:{{seatlist.id}}</span>
														</div>
														<div class="row">
															<span>Seat
																Price:{{seatlist.seatFare.totalPayableAmount}}</span>
														</div>
														<div ng-if="seatlist.available==true" class="row">
															<span>Status:Seat Available!</span>
														</div>
														<div ng-if="seatlist.available==false" class="row">
															<span>Status:Seat Not Available!</span>
														</div>
													</div>
													<button
														ng-if="seatlist.length == 1 && seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">
														{{seatlist.id}}</span>
													</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 && seatlist.available==true && seatlist.ladiesSeat ==false"
														class="SleeperseatRow avilablebed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="SleeperseatRow avilableladiesbed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="SleeperseatRow bookedbed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="SleeperseatRow bookedbed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
												</td>
											</tr>
											<tr>
											</tr>
											<tr>
												<td width="3%"></td>
												<td ng-hide="$last"
													data-ng-repeat="(index,seatlist) in seatsline2" colspan="1"></td>
												<td class="tool"
													data-ng-repeat="(index,seatlist) in seatsline4" colspan="1">
													<div class="tooltip hidden-xs">
														<div class="row">
															<h2 style="font-size: 10px;">Seat Information</h2>
														</div>
														<div class="row">
															<span>Seat Id:{{seatlist.id}}</span>
														</div>
														<div class="row">
															<span>Seat
																Price:{{seatlist.seatFare.totalPayableAmount}}</span>
														</div>
														<div ng-if="seatlist.available==true" class="row">
															<span>Status:Seat Available!</span>
														</div>
														<div ng-if="seatlist.available==false" class="row">
															<span>Status:Seat Not Available!</span>
														</div>
													</div>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<div ng-if="seatlist.length == 2">
														<button
															ng-if="seatlist.length == 2 && seatlist.available==true && seatlist.ladiesSeat ==false"
															class="SleeperseatRow avilablebed"
															id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
															data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
														<button
															ng-if="seatlist.length == 2 &&seatlist.available==true && seatlist.ladiesSeat ==true"
															class="SleeperseatRow avilableladiesbed"
															id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
															data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
														<button
															ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==false"
															class="SleeperseatRow bookedbed"
															id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
															data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
														<button
															ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==true"
															class="SleeperseatRow bookedbed"
															id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
															data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													</div>
												</td>
											</tr>
											<tr>
												<td width="3%"></td>
												<td width="17%" class="tool"
													data-ng-repeat="(index,seatlist) in seatsline5" colspan="2">
													<div class="tooltip hidden-xs">
														<div class="row">
															<h2 style="font-size: 10px;">Seat Information</h2>
														</div>
														<div class="row">
															<span>Seat Id:{{seatlist.id}}</span>
														</div>
														<div class="row">
															<span>Seat
																Price:{{seatlist.seatFare.totalPayableAmount}}</span>
														</div>
														<div ng-if="seatlist.available==true" class="row">
															<span>Status:Seat Available!</span>
														</div>
														<div ng-if="seatlist.available==false" class="row">
															<span>Status:Seat Not Available!</span>
														</div>
													</div>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<div ng-if="seatlist.length == 2">
														<!-- <button  class="seatIndication"></button> -->
														<button
															ng-if="seatlist.length == 2 && seatlist.available==true && seatlist.ladiesSeat ==false"
															class="SleeperseatRow avilablebed"
															id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
															data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
														<button
															ng-if="seatlist.length == 2 &&seatlist.available==true && seatlist.ladiesSeat ==true"
															class="SleeperseatRow avilableladiesbed"
															id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
															data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
														<button
															ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==false"
															class="SleeperseatRow bookedbed"
															id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
															data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
														<button
															ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==true"
															class="SleeperseatRow bookedbed"
															id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
															data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													</div>
												</td>
											</tr>
										</tbody>
										<tbody ng-if="firstLine ==true &&twoLine ==true">
											<tr height="25">
												<td width="5%"><img src="images/drive.png" width="15px"
													height="10px" /></td>
												<td rowspan="6"><p ng-if="upper"
														class="vericaltext marginLeft15px"></p></td>
												<td class="busrow tool"
													data-ng-repeat="(index,seatlist) in seatsline1">
													<div class="tooltip hidden-xs">
														<div class="row">
															<h2 style="font-size: 10px;">Seat Information</h2>
														</div>
														<div class="row">
															<span>Seat Id:{{seatlist.id}}</span>
														</div>
														<div class="row">
															<span>Seat
																Price:{{seatlist.seatFare.totalPayableAmount}}</span>
														</div>
														<div ng-if="seatlist.available==true" class="row">
															<span>Status:Seat Available!</span>
														</div>
														<div ng-if="seatlist.available==false" class="row">
															<span>Status:Seat Not Available!</span>
														</div>
													</div>
													<button
														ng-if="seatlist.length == 1 && seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 && seatlist.available==true && seatlist.ladiesSeat ==false"
														class="SleeperseatRow avilablebed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="SleeperseatRow avilableladiesbed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="SleeperseatRow bookedbed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="SleeperseatRow bookedbed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
												</td>
											</tr>
											<tr height="25">
												<td width="5%"><p ng-if="upper"
														style="margin-bottom: 7px; padding-bottom: 7px;
														" class="letterP4">Lower</p></td>
												<%-- 				<td data-ng-repeat="(index,seatlist) in seatsline2" colspan="1"><button class="SleeperseatRow" id="mupperseat{{busindex}}{{seatlist.seatindex}}" data-ng-click="lowerSeatSelect(seatlist.seatindex)">{{seatlist.id}}<span class="pillow"></span></button></td>
 --%>
												<td class="tool"
													data-ng-repeat="(index,seatlist) in seatsline2">
													<div class="tooltip hidden-xs">
														<div class="row">
															<h2 style="font-size: 10px;">Seat Information</h2>
														</div>
														<div class="row">
															<span>Seat Id:{{seatlist.id}}</span>
														</div>
														<div class="row">
															<span>Seat
																Price:{{seatlist.seatFare.totalPayableAmount}}</span>
														</div>
														<div ng-if="seatlist.available==true" class="row">
															<span>Status:Seat Available!</span>
														</div>
														<div ng-if="seatlist.available==false" class="row">
															<span>Status:Seat Not Available!</span>
														</div>
													</div>
													<button
														ng-if="seatlist.length == 1 && seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">
														{{seatlist.id}}</span>
													</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 && seatlist.available==true && seatlist.ladiesSeat ==false"
														class="SleeperseatRow avilablebed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="SleeperseatRow avilableladiesbed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="SleeperseatRow bookedbed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="SleeperseatRow bookedbed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
												</td>
											</tr>
											<tr></tr>
											<tr>
												<td width="3%"></td>
												<td ng-hide="$last"
													data-ng-repeat="(index,seatlist) in seatsline1" colspan="1"></td>
												<td class="tool"
													data-ng-repeat="(index,seatlist) in seatsline3" colspan="1">
													<div class="tooltip hidden-xs">
														<div class="row">
															<h2 style="font-size: 10px;">Seat Information</h2>
														</div>
														<div class="row">
															<span>Seat Id:{{seatlist.id}}</span>
														</div>
														<div class="row">
															<span>Seat
																Price:{{seatlist.seatFare.totalPayableAmount}}</span>
														</div>
														<div ng-if="seatlist.available==true" class="row">
															<span>Status:Seat Available!</span>
														</div>
														<div ng-if="seatlist.available==false" class="row">
															<span>Status:Seat Not Available!</span>
														</div>
													</div>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 && seatlist.available==true && seatlist.ladiesSeat ==false"
														class="SleeperseatRow avilablebed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="SleeperseatRow avilableladiesbed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="SleeperseatRow bookedbed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="SleeperseatRow bookedbed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
												</td>
											</tr>
											<tr>
												<td width="3%"></td>
												<td class="tool"
													data-ng-repeat="(index,seatlist) in seatsline4" colspan="1">
													<div class="tooltip hidden-xs">
														<div class="row">
															<h2 style="font-size: 10px;">Seat Information</h2>
														</div>
														<div class="row">
															<span>Seat Id:{{seatlist.id}}</span>
														</div>
														<div class="row">
															<span>Seat
																Price:{{seatlist.seatFare.totalPayableAmount}}</span>
														</div>
														<div ng-if="seatlist.available==true" class="row">
															<span>Status:Seat Available!</span>
														</div>
														<div ng-if="seatlist.available==false" class="row">
															<span>Status:Seat Not Available!</span>
														</div>
													</div>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==true && seatlist.ladiesSeat ==false"
														class="seatIndication avilableseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="seatIndication ladiesseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 1 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="seatIndication bookedseat"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 && seatlist.available==true && seatlist.ladiesSeat ==false"
														class="SleeperseatRow avilablebed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==true && seatlist.ladiesSeat ==true"
														class="SleeperseatRow avilableladiesbed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="lowerSeatSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==false"
														class="SleeperseatRow bookedbed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
													<button
														ng-if="seatlist.length == 2 &&seatlist.available==false && seatlist.ladiesSeat ==true"
														class="SleeperseatRow bookedbed"
														id="mlowerseat{{routeserviceid}}{{busindex}}{{seatlist.id}}"
														data-ng-click="bookedSelect(seatlist.id,seatlist)">{{seatlist.id}}</button>
												</td>
											</tr>
										</tbody>
									</table>
								</div>

							</div>
						</div>
 					<form name="busBlock" id="busBlock"
							ng-submit="busBlock.$valid && blockseat(routeserviceid)">

							<div
								class="col-md-12 col-sm-12 col-xs-12 busPanel panel panel-default margin-LR-0px whiteBackground">
								<div
									class="panel panel-default traveler-details  col-md-12 col-sm-12 col-xs-12">
									<!-- //<input class="col-md-4 col-sm-4 col-xs-4 padding0px"type="email" placeholder="email"/> -->
									<s:if test="#session['agent'] != null">
										<input type="hidden" id="isLogged" value="true">
										<input type="hidden" name="ay" id="ay"
											value="<s:property value="%{#session.agent.Securityanswer}"/>">
										<input type="hidden" name="ud" id="userid"
											value="<s:property value="%{#session.agent.id}"/>">
										<input type="hidden" name="uname" id="uname"
											value="<s:property value="%{#session.agent.Username}"/>">
										<input type="hidden" name="pmode" id="isagent" value="cash">

									</s:if>
									<s:elseif test="#session['user'] != null">
										<input type="hidden" name="ay" id="ay"
											value="zqJ3R9cGpNWgNXG55ub/WQ==">
										<input type="hidden" name="ud" id="userid"
											value="<s:property value="%{#session.user.id}"/>">
										<input type="hidden" name="pmode" id="isagent" value="card">
										<input type="hidden" name="uname" id="uname"
											value="<s:property value="%{#session.user.userName}"/>">

									</s:elseif>
									<s:else>
										<input type="hidden" name="ay" id="ay"
											value="zqJ3R9cGpNWgNXG55ub/WQ==">
										<input type="hidden" name="ud" id="userid"
											value="<s:property value="%{#session.Directuser.id}"/>">
										<input type="hidden" name="pmode" id="isagent" value="card">
										<input type="hidden" name="uname" id="uname"
											value="<s:property value="%{#session.Directuser.Username}"/>">
									</s:else>
									<s:if test="#session.emulateFlag == true">
										<input type="hidden" name="emFlag" id="emFlag"
											value="<s:property value="%{#session.emulateFlag}"/>">
										<input type="hidden" name="emCompany" id="emCompany"
											value="<s:property value="%{#session.emulateByCompany.companyid}"/>">
										<input type="hidden" name="emUname" id="emUname"
											value="<s:property value="%{#session.emulateByUserId}"/>">
									</s:if>
									<s:else>
										<input type="hidden" name="emFlag" id="emFlag" value="false">
									</s:else>

									<div class="biiling-bd2 col-md-6 col-sm-6 col-xs-12">
										<div class="form-group clearfix ">
											<input type="tel" class="form-control" name="mobile"
												id="mobile{{routeserviceid}}{{busindex}}"
												pattern="[0-9]{10}" placeholder="Mobile" maxlength="10"
												required onkeypress="return isNumberKey(event,this)"
												autocomplete="off" data-ng-model="mobile"
												data-ng-required="true">
										</div>
									</div>
									<s:if test="#session['agent'] != null">
										<div class="biiling-bd2 col-md-6 col-sm-6 col-xs-12">
											<div class="form-group clearfix ">
												<input type="email" class="form-control" name="email"
													id="email{{routeserviceid}}{{busindex}}"
													placeholder="Email" autocomplete="off" required
													value="<s:property value="#session.agent.Email" />">
											</div>
										</div>
									</s:if>
									<s:else>
										<div class="biiling-bd2 col-md-6 col-sm-6 col-xs-12">
											<div class="form-group clearfix ">
												<input type="email" class="form-control" name="email"
													id="email{{routeserviceid}}{{busindex}}"
													placeholder="Email" autocomplete="off" required
													value="<s:property value="#session.agent.Email" />"
													data-ng-model="nEmail" data-ng-required="true">
											</div>
										</div>
									</s:else>

									<s:if
										test="#session.isCorporate == true || #session['agent'] != null">

										<div class="padding15px">
											<div class="row">

												<s:if test="#session.isCorporate == true">
													<div
														ng-if="CompanyEn.length != 0 || CompanyEn.length !=null"
														class="biiling-bd2 col-md-6 col-sm-6 col-xs-12">
														<div class="form-group clearfix bii-bd">
															<!-- <label>Company Entity</label> -->
															<select id="CompanyEntity{{routeserviceid}}{{busindex}}"
																class=" form-control " name="">
																<!-- <option   ng-if="CompanyEn.length == 0" value="null"  >No Company Entity</option> -->
																<!-- <option ng-if="CompanyEn.length != 0"
																	ng-repeat="company in CompanyEn" value="{{company}}">
																	{{company.companyEntityName}}</option> -->
																	<option value="null" > Select Company Entity </option>
					     <option ng-if="CompanyEn.length != 0" ng-repeat="company in CompanyEn" value="{{company}}" > {{company.companyEntityName}} </option>
															</select>
														</div>
													</div>

													<!-- <div class="biiling-bd2 col-md-6 col-sm-6 col-xs-12"
														data-ng-if="empCode">
														<div class="form-group clearfix bii-bd">
															<input type="text" class="form-control NameFontMAnl"
																name="EmployeeCode"
																id="EmployeeCod{{routeserviceid}}{{busindex}}"
																ng-model="EmployeeCode" placeholder="Employee Code"
																autocomplete="off" data-ng-required="true">
														</div>
													</div>
													<div class="biiling-bd2 col-md-6 col-sm-6 col-xs-12"
														data-ng-if="department">
														<div class="form-group clearfix bii-bd">
															<input type="text" class="form-control NameFontMAnl"
																name="Department"
																id="Department{{routeserviceid}}{{busindex}}"
																ng-model="dePart" placeholder="Department" required
																autocomplete="off" data-ng-required="true">
														</div>
													</div>

													<div class="biiling-bd2 col-md-6 col-sm-6 col-xs-12"
														data-ng-if="costCenter">
														<div class="form-group clearfix bii-bd">
															<input type="text" class="form-control NameFontMAnl"
																name="CostCenter"
																id="CostCenter{{routeserviceid}}{{busindex}}"
																ng-model="CostCen" placeholder="Cost Center" required
																autocomplete="off" data-ng-required="true">
														</div>
													</div>
													<div class="biiling-bd2 col-md-6 col-sm-6 col-xs-12"
														data-ng-if="approverName">
														<div class="form-group clearfix bii-bd">
															<input type="text" class="form-control NameFontMAnl"
																name="Approver"
																id="Approver{{routeserviceid}}{{busindex}}"
																ng-model="Appr" placeholder="Approver Name" required
																autocomplete="off" data-ng-required="true">
														</div>
													</div>

													<div class="biiling-bd2 col-md-6 col-sm-6 col-xs-12"
														data-ng-if="location">
														<div class="form-group clearfix bii-bd">
															<input type="text" class="form-control NameFontMAnl"
																name="Location"
																id="Location{{routeserviceid}}{{busindex}}"
																ng-model="Loc" placeholder="Location" required
																autocomplete="off" data-ng-required="true">
														</div>
													</div>
													<div class="biiling-bd2 col-md-6 col-sm-6 col-xs-12"
														data-ng-if="trNumber">
														<div class="form-group clearfix bii-bd">
															<input type="text" class="form-control NameFontMAnl"
																name="TrNumber"
																id="trNumber{{routeserviceid}}{{busindex}}"
																ng-model="trNo" placeholder="TR Number" required
																autocomplete="off" data-ng-required="true">
														</div>
													</div>

													<div class="biiling-bd2 col-md-6 col-sm-6 col-xs-12"
														data-ng-if="bussinessUnit">
														<div class="form-group clearfix bii-bd">
															<input type="text" class="form-control NameFontMAnl"
																name="BusinessUnit" ng-model="busiUnit"
																id="businessUnit{{routeserviceid}}{{busindex}}" required
																placeholder="Business unit" autocomplete="off"
																data-ng-required="true">
														</div>
													</div>
													<div class="biiling-bd2 col-md-6 col-sm-6 col-xs-12"
														data-ng-if="projectCode">
														<div class="form-group clearfix bii-bd">
															<input type="text" class="form-control NameFontMAnl"
																name="ProjectCode"
																id="projectCode{{routeserviceid}}{{busindex}}"
																ng-model="projCode" placeholder="Project Code" required
																autocomplete="off" data-ng-required="true">
														</div>
													</div>

													<div class="biiling-bd2  col-md-6 col-sm-6 col-xs-12"
														data-ng-if="reasonForTravel">
														<div class="form-group clearfix bii-bd">
															<input type="text" class="form-control NameFontMAnl"
																name="reason" id="reason{{routeserviceid}}{{busindex}}"
																ng-model="Reason" placeholder="Reason for travel"
																required autocomplete="off" data-ng-required="true">
														</div>
													</div>
													<div class="biiling-bd2 col-md-6 col-sm-6 col-xs-12"
														data-ng-if="billNonBill">
														<div class="form-group clearfix bii-bd">
															<input type="text" class="form-control NameFontMAnl"
																name="billingCode"
																id="billingCode{{routeserviceid}}{{busindex}}"
																ng-model="billCode" placeholder="Billable/ non billable"
																required autocomplete="off" data-ng-required="true">
														</div>
													</div> -->
												</s:if>
												<%-- <s:if
													test="#session['agent'] != null && #session.isCorporate != true">
													<div ng-if="isRmDetails">
														<input data-ng-if="empCode" type="hidden" value="NA"
															id="EmployeeCod{{routeserviceid}}{{busindex}}"> <input
															data-ng-if="department" type="hidden" value="NA"
															id="Department{{routeserviceid}}{{busindex}}"> <input
															data-ng-if="costCenter" type="hidden" value="NA"
															id="CostCenter{{routeserviceid}}{{busindex}}"> <input
															data-ng-if="approverName" type="hidden" value="NA"
															id="Approver{{routeserviceid}}{{busindex}}"> <input
															data-ng-if="location" type="hidden" value="NA"
															id="Location{{routeserviceid}}{{busindex}}"> <input
															data-ng-if="trNumber" type="hidden" value="NA"
															id="trNumber{{routeserviceid}}{{busindex}}"> <input
															data-ng-if="bussinessUnit" type="hidden" value="NA"
															id="businessUnit{{routeserviceid}}{{busindex}}">
														<input data-ng-if="projectCode" type="hidden" value="NA"
															id="projectCode{{routeserviceid}}{{busindex}}"> <input
															data-ng-if="reasonForTravel" type="hidden" value="NA"
															id="reason{{routeserviceid}}{{busindex}}"> <input
															data-ng-if="billNonBill" type="hidden" value="NA"
															id="billingCode{{routeserviceid}}{{busindex}}">
													</div>
												</s:if> --%>
												<!-- <div data-ng-repeat="(index,manual) in ManulaFieldList">

													<div class="biiling-bd2 col-md-6 col-sm-6 col-xs-12">
														<div class="form-group clearfix bii-bd">
															<input type="text" class="form-control NameFontMAnl"
																name="billingCode"
																id="manual{{index}}{{routeserviceid}}{{busindex}}"
																placeholder="{{manual}}" autocomplete="off">
														</div>
													</div>

												</div> -->
											</div>
										</div>
									</s:if>
								</div>

								<div class="col-md-12 board-drop col-sm-12 col-xs-12">
									<div class="biiling-bd2 col-md-6 col-sm-6 col-xs-12">
										<label>Boarding Points</label> <select id="boardingPoints"
											class=" form-control " name="" onchange="Boarding();">
											<option ng-if="seatdata.boardingPoints.length == 0">{{origin}}</option>
											<option ng-if="seatdata.boardingPoints.length != 0"
												ng-repeat="operator in seatdata.boardingPoints"
												value="{{operator}}">{{operator.loc}}&#160; (
												{{operator.time}} )</option>
										</select>
									</div>
									<div class="biiling-bd2 col-md-6 col-sm-6 col-xs-12">
										<label>Dropping Point</label> <select class="form-control "
											name="" onchange="Dropping();">
											<option ng-if="seatdata.droppingPoints.length == 0">{{destination}}</option>
											<option ng-if="seatdata.droppingPoints.legnth != 0 "
												ng-repeat="operator in seatdata.droppingPoints"
												value="{{operator.loc}}">{{operator.loc}}&#160; (
												{{operator.time}} )</option>
										</select>
									</div>
								</div>
							 
   
								<div ng-show='selection'
									class="col-md-12 col-sm-12 col-xs-12 buspassDet">

									<div class="col-md-12 col-xs-12 backgroundGrey hidden-xs">
										<div class="col-md-1 col-xs-1 paddingLR0px">Gender</div>
										<div class="col-md-2 col-xs-2 paddingLR0px">Name</div>
										<div class="col-md-2 col-xs-2 paddingLR0px">SurName</div>
										<div class="col-md-1 col-xs-1 paddingLR0px">Age</div>
										<div class="col-md-1 col-xs-1 paddingLR0px">Seat No</div>
										<div class="col-md-1 col-xs-1 paddingLR0px">Base Fare</div>
										<div data-ng-show="!GSTservices"
											class="col-md-3 col-xs-3 paddingLR0px ">Service Tax</div>
										<div data-ng-show="GSTservices"
											class="col-md-2 col-xs-2 paddingLR0px ">Management Fee</div>
										<div data-ng-show="GSTservices"
											class="col-md-2 col-xs-2 paddingLR0px ">GST</div>
									</div>
									<div
										class="col-md-12 col-xs-12 backgroundGrey pad_r_l_0px f_10B visible-xs">
										<div class="col-md-1 col-xs-2 paddingLR0px">Gender</div>
										<div class="col-md-2 col-xs-4 paddingLR0px">First Name</div>
										<div class="col-md-2 col-xs-4 paddingLR0px">Last Name</div>
										<div class="col-md-1 col-xs-2 paddingLR0px">Age</div>
										<div class="col-md-1 col-xs-1 hidden-xs paddingLR0px">Seat</div>
										<div class="col-md-1 col-xs-2 hidden-xs paddingLR0px">Base
											Fare</div>
										<div data-ng-show="!GSTservices"
											class="col-md-3 col-xs-3 hidden-xs paddingLR0px">Service
											Tax</div>
										<div data-ng-show="GSTservices"
											class="col-md-2 col-xs-2 hidden-xs paddingLR0px">Management
											Fee</div>
										<div data-ng-show="GSTservices"
											class="col-md-2 col-xs-2 hidden-xs paddingLR0px">GST</div>
									</div>
									 
									<div id="passengerDetails{{routeserviceid}}{{busindex}}"></div>
									<div id="prices{{routeserviceid}}{{busindex}}"></div>
									<div class="col-xs-12 blockbt-bus">
										<button class="btn btn-info bookBtn"
											data-ng-click="submitted == true">Block Seats</button>
									</div>

								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>

	</div>
</div>
<script src="js/tayycustom.js"></script>
<%-- <script src="js/tayyarahcommon.js"></script> --%>
<script>
$(document).ready(function() {
	$("#changebutton").click(function() {        	
		$("#changerefine").hide();

		$("#searchrefine").show();
	});
	
	$('#mark').click(function(){
		$('#markup').css('display', "block");
	});
});
 
$(document).ready(function() {  
	  $('#one, #searchrefine, #fare, #busone').iptOffCanvas({
    baseClass: 'offcanvas',
    type: 'left' 
  });
});

</script>
 <script>
 var iscor=$("#isCor").val();
 console.log('iscor',iscor);
 
 if(iscor == 'true'){
 function calltheApi(id){
	 
	 
	 fieldId = "#firstname"+id;	
	 $(fieldId)
	 .autocomplete({
	 minLength:1,
	 source:function(e,t){
	 	 var CorpCompanyId = $('#compId').val(); 
	 	 var apiUrl = $('#apiUrl').val(); 
	 	 var completeUrl = apiUrl+'employee/list';	 	
	 	 console.log('completeUrl',completeUrl);
	 	 console.log('CorpCompanyId',CorpCompanyId);
	 			$.ajax({
	 				url:completeUrl,
	 				//url: 'emplyeeList.json',
	 				dataType:"json",
	 				data:{companyid:CorpCompanyId },
	 				success:function(res){
	 					
	 						var result=$.map(res,function(e){
	 						 console.log('result',result);
	 					return{
	 						label:e.firstName+" "+e.lastName,
	 						value:e.firstName,
	 						lastname:e.lastName,											
	 						empCode:e.id
	 				 }
	 					
	 					});
	 						
	 			t($.ui.autocomplete.filter(result,e.term))
	 			
	 			}
	 				})
	 				},
	 			select:function(e,t){
	 				 
	 				 var a=e.target.id.substring(9,10);
	 				callApi(e.target.id,a,t.item.empCode);
	 				 
	 				return void 0!=t.item.email&&$("#email").val(t.item.email),
	 					$("#"+e.target.id).val(t.item.value),
	 					$("#lastname"+a).val(t.item.lastname),																				 
	 					$("#employeeID"+a).val(t.item.empCode),
	 					!1
	 						
	 			}})
	 
 }
 }
 

function callApi(idName,idIndex,empId){	
angular.element(document.getElementById(idName)).scope().getRmdetails(idIndex,empId);

}
 </script>

