<%@taglib prefix="s" uri="/struts-tags"%>
<!-- ----------------------- step result shown here ------------------------ -->
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
<div
	class="col-md-12 col-sm-12 searched-result mainContentHeight500px padLeftDom10px"
	id="two">
	<div class="scrollTrails">
		<!-- <div id="loading-bar-container" class="hidden-xs"></div> -->
		<div data-ng-show="loadpricebar">
			<div class="bar"></div>
			<span><b>Getting prices and availability...</b></span>
		</div>
		<!-- ----------- step result shown here ------------------------  -->
		<div class="clearfix displayRigthPAd"
			data-ng-style="{'display' : display}" data-ng-cloak>
			<div class="row" id="changerefine" data-ng-show="isQuoteAvailable">
				<div class="col-sm-11 clearfix">
					<div class="row">
						<div class="col-md-3 col-sm-3 col-xs-3 searched-city">
							<p>
								<b>{{origincodename}} <i class="tayyarah-arrows-h"></i>
									{{destcodename}}
								</b>
							</p>
						</div>
						<div class="col-md-5 col-sm-5 col-xs-5 searched-date">
							<div class="row">
								<div class="col-sm-5">
									<p>
										<b>{{departuredate | date:'MMM d'}}</b>
									</p>									
								</div>
								<div class="col-sm-2">
									<p class="ten">
										<b class="tayyarah-arrows-h"></b>
									</p>
								</div>
								<div class="col-sm-5">
									<p>
										<b>{{arrivaldate | date:'MMM d'}}</b>
									</p>									
								</div>
							</div>
						</div>

						<div class="col-md-4 col-sm-4 col-xs-4 searched-qeconomy">
							<div class="row">
								<div class="col-sm-6">
									<p>
										<b>Cabin</b>
									</p>
									<span>{{cabin}}</span>
								</div>
								<div class="col-sm-6">
									<p>
										<b>{{totalpassenger}}</b>
									</p>
									<span>Traveller(s)</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row removeBorder-Right" id="changerefine"
				data-ng-hide="hideDiv || isQuoteAvailable">
				<div class="col-md-10 col-sm-10 col-xs-11 clearfix">
					<div class="">
						<div
							class="col-md-3 col-sm-3 col-xs-3 searched-city pad-LR-Zero marginMobTop">
							<p>
								<b>{{origincodename}} <i class="tayyarah-arrows-h"></i>
									{{destcodename}}
								</b>
							</p>
						</div>
						<div class="col-md-5 col-sm-5 col-xs-6 searched-date pad-LR-Zero">
							<div class="row">
								<div class="col-md-5 col-sm-5 col-xs-5 ">
									<p>
										<b>{{departuredate | date:'MMM d'}}</b>
									</p>
									<%-- <span>{{departuredate | date:'EEEE'}}</span> --%>
								</div>
								<div class="col-md-2 col-sm-2 col-xs-1 pad-LR-Zero">
									<p class="ten">
										<b class="tayyarah-arrows-h"></b>
									</p>
								</div>
								<div class="col-md-5 col-sm-5 col-xs-5 pad-LR-Zero">
									<p>
										<b>{{arrivaldate | date:'MMM d'}}</b>
									</p>
									<%-- <span>{{arrivaldate | date:'EEEE'}}</span> --%>
								</div>
							</div>
						</div>

						<div
							class="col-md-4 col-sm-4 col-xs-2 searched-economy pad-LR-Zero">
							<div class="row">
								<div class="col-md-6 col-sm-6 col-xs-6 hidden-xs">
									<p>
										<b>Cabin</b>
									</p>
									<span>{{cabin}}</span>
								</div>
								<div class="col-md-6 col-sm-6 col-xs-6 hidden-xs">
									<p>
										<b>{{totalpassenger}}</b>
									</p>
									<span>Traveller(s)</span>
								</div>
								<div
									class="col-md-6 col-sm-6 col-xs-6 mobPadZero mobMargin-top-15px hidden-md hidden-sm visible-xs">

									<span>{{totalpassenger}}</span><span><i
										class="tayyarah-users" aria-hidden="true"></i></span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-2 col-sm-2 col-xs-1">
					<div class="margin padding10px">
						<div class="button-group clean">
							<a class="btn btn-info but btn-clean button-dropdown hidden-xs"
								id="changebutton"
								data-ng-click="showDiv=true;hideDiv=true; hideMe()"><span
								class="hidden-xs" data-toggle="dropdown"> Modify Search <i
									class="tayyarah-angle-double-right"></i></span> </a> <a
								class="btn btn-info but btn-clean offcanvas__trigger--open btn offclose mobModifyBtn"
								data-rel="searchrefine" data-ng-click="showDiv=true"><span><i
									class="tayyarah-search"></i></span> </a>
						</div>
					</div>
				</div>
			</div>

			<!-- this is hided div on click it is to be displayed -->
			<div class="clearfix offcanvas" data-ng-show="showDiv"
				id="searchrefine">
				<div class="closebtn done">
					<button class="offcanvas__trigger--close btn"
						data-rel="searchrefine">
						<i class="tayyarah-left"></i> Back
					</button>
				</div>
				<form name="flightsearchForm" id="searchagain"
					data-ng-submit="flightresearch()">

					<div class="topboxspcl">
						<input type="hidden" id="hideori" value=""> <input
							type="hidden" id="hidedes" value=""> <input type="hidden"
							id="cabinselect" value="All"> <input type="hidden"
							name="triptype" id="triptype" value="R"> <input
							type="hidden" name="airlinecode" id="airlinecode" value="all">
						<input type="hidden" value="M"> <input type="hidden"
							name="isDynamicmarkup" value="false" id="isDynamicmarkup">
						<input type="hidden" name="markupAmount" value="0"
							id="markupAmount">
						<s:if test="#session['agent'] != null">
							<input type="hidden" name="ccy" id="onecurrencyname"
								value="<s:property value="%{#session.agent.currencyCode}"/>">
							<input type="hidden" name="ay" id="ay"
								value="<s:property value="%{#session.agent.Securityanswer}"/>">
						</s:if>
						<s:else>
							<input type="hidden" name="ccy" id="onecurrencyname" value="INR">
							<input type="hidden" name="ay" id="ay"
								value="zqJ3R9cGpNWgNXG55ub/WQ==">
						</s:else>
						<input type="hidden" id="tripsid" name="trips" value="2">
						<div class="col-sm-2 clearfix">
							<div class="form-group">
								<div class="input-group">
									<input type="text" name="ori" data-ng-model="twoorigin"
										id="originid" autocomplete="off"
										onkeypress="return isAlphabetKeywithspace(event,this);"
										typeahead="c as c for c in cities($viewValue)  | limitTo:10"
										placeholder="City or Airport" typeahead-min-length='1'
										typeahead-on-select='onSelectPart($item, $model, $label)'
										typeahead-template-url="customTemplate.html"
										class="form-control" required>
								</div>
								<div class="ttst" id="errorispcl"></div>
							</div>
						</div>
						<div class="col-sm-2  clearfix">
							<div class="form-group">
								<div class="input-group">
									<input type="text" name="des" id="destinationid"
										autocomplete="off" data-ng-model="twodestination"
										placeholder="City or Airport"
										typeahead="c as c for c in cities($viewValue)  | limitTo:10"
										typeahead-min-length='1'
										onkeypress="return isAlphabetKeywithspace(event,this);"
										typeahead-on-select='onSelectPart($item, $model, $label)'
										typeahead-template-url="customTemplate.html"
										class="form-control" required>
								</div>
								<div class="ttst" id="errdesspcl"></div>
								<div class="ttst" id="errdepspcl"></div>
							</div>
						</div>
						<div id="hdepe"></div>
						<div class="col-sm-2 clearfix">
							<div class="form-group datetwo">
								<div class="input-group">
									<input type="text" class="form-control o-c-s"
										value="{{user.departureDate}}" placeholder="MM/DD/YY"
										name="depDate" id="twodpd1" ng-model="departuredate">
								</div>
								<div class="ttst" id="errdesspcl"></div>
								<div class="ttst" id="errdepspcl"></div>
							</div>
						</div>
						<div class=" col-sm-2 clearfix">
							<div class="form-group">
								<div class="input-group">
									<input type="text" class="form-control o-c-s" id="twodpd2"
										value="{{user.arrivalDate}}" name="arvlDate"
										placeholder="MM/DD/YY" ng-model="arrivaldate">
								</div>
								<div class="ttst" id="errarrspcl"></div>
							</div>
						</div>
						<div class="col-sm-2 clearfix">
							<div class="form-group mobfloatLeft">
								<div class="input-group">
									<span class="form-control dropdown-toggle "
										data-toggle="dropdown"><span id="totaltraveller">{{totalpassenger}}</span>
										Traveller(s)</span>
									<ul id="domesticRefine"
										class="dropdown-menu mega-dropdown-menu">
										<li><a href="#"><label>Adult(s)</label>
												<div class="input-group">
													<span class="input-group-btn">
														<button type="button" class="btn btn-default btn-number"
															data-type="minus" data-field="adultid">
															<span class="tayyarah-minus"></span>
														</button>
													</span> <span id="adultid" class="input-number infid" min="1"
														max="9">1</span> <input type="hidden" name="$A*D"
														id="hiddenadult" value="1"><span
														class="input-group-btn">
														<button type="button" class="btn btn-default btn-number"
															data-type="plus" data-field="adultid">
															<span class="tayyarah-plus"></span>
														</button>
													</span>
												</div></a></li>

										<li><a href="#"><label>Child</label>
												<div class="input-group">
													<span class="input-group-btn">
														<button type="button" class="btn btn-default btn-number"
															data-type="minus" data-field="kidid">
															<span class="tayyarah-minus"></span>
														</button>
													</span> <span id="kidid" class="input-number infid" min="0"
														max="9">0</span> <input type="hidden" name="$K*D"
														id="hiddenkid" value="0"><span
														class="input-group-btn">
														<button type="button" class="btn btn-default btn-number"
															data-type="plus" data-field="kidid">
															<span class="tayyarah-plus"></span>
														</button>
													</span>
												</div></a></li>

										<li><a href="#"><label>Infant(s)</label>
												<div class="input-group">
													<span class="input-group-btn">
														<button type="button" class="btn btn-default btn-number"
															data-type="minus" data-field="infantid">
															<span class="tayyarah-minus"></span>
														</button>
													</span> <span class="infid input-number infid" id="infantid"
														min="0" max="1">0</span> <input type="hidden" name="$I*T"
														id="hiddeninfant" value="0"> <span
														class="input-group-btn">
														<button type="button" class="btn btn-default btn-number"
															data-type="plus" data-field="infantid">
															<span class="tayyarah-plus"></span>
														</button>
													</span>
												</div></a></li>
										<li><a><label>Class</label>
												<div class="input-group">
													<select class="form-control" name="cabinClass"
														id="cabinReselect">
														<option id="All">All</option>
														<option id="Economy">Economy</option>
														<option id="PremiumEconomy">PremiumEconomy</option>
														<option id="Business">Business</option>
														<option id="PremiumBusiness">PremiumBusiness</option>
														<option id="First">First</option>
													</select>
												</div> </a></li>

									</ul>
								</div>
							</div>
						</div>
					</div>
					<div class="col-sm-2">
						<div class="margin">
							<div class="btn-group clean">
								<button id="modifiedsearch" type="submit" class="btn btn-info"
									data-ng-click="submitted==true">Search</button>
							</div>
						</div>
					</div>

				</form>
			</div>
			<!-- END OF row -->
			<!-- this is hided div on click it is to be displayed-ends -->

			<div class="clearfix">
				<s:if
					test="#session['agent'] == null || #session.isCorporate == true">
					<div class="sort-by-section clearfix box">
						<div class="col-sm-12 clearfix">
							<ul class="sort-bar clearfix">
								<li id="offnone"><a class="sort-by-container clearfix">
										<span class="offcanvas__trigger--open h-filters"
										data-rel="one"><i class="tayyarah-th"></i>Filters</span>
								</a></li>
								<li><a href="javascript:void(0);" class="sort-by-container">
										<form class="form-inline">
											<label>Currency</label> <select id="selectcurrencyname"
												class="form-control spclcurrency"
												data-ng-model="currencyname"
												data-ng-change="currencychangedValue()">
												<option>INR</option>
												<option>EUR</option>
												<option>USD</option>
												<option>MYR</option>
												<option>EUR</option>
												<option>JPY</option>
												<option>GBP</option>
												<option>NZD</option>
												<option>QAR</option>
												<option>CAD</option>
												<option>CNY</option>
												<option>HKD</option>
												<option>KRW</option>
												<option>PKR</option>
												<option>RUB</option>
												<option>LKR</option>
												<option>ZAR</option>
												<option>CHF</option>
												<option>SAR</option>
											</select>
										</form>
								</a></li>
								<li class="sort-by-price pull-right mobileFont">
									<h5>
										Results <b>{{fareFlightSegment.length}}</b> out of <b>{{fareFlightSegment.length}}</b>
									</h5>
								</li>
							</ul>


						</div>
					</div>
				</s:if>
				<s:else>
					<div class="sort-by-section clearfix box">
						<div class="col-sm-12 clearfix">

							<ul class="sort-bar clearfix">
								<li><a href="javascript:void(0);"
									class="sort-by-price pull-right"> <label id="mark">Add
											Markup</label>
										<form class="form-inline" id="markup"
											data-ng-submit="addmarkup()" style="display: none;">
											<input type="hidden" id="isLogged" value="true"> <input
												type="hidden" name="ccy"
												value="<s:property value="%{#session.agent.currencyCode}"/>">
											<input type="hidden" name="ay"
												value="<s:property value="%{#session.agent.Securityanswer}"/>">
											<input type="hidden" name="ori" id="markorigin" value="">
											<input type="hidden" name="des" id="markdestination" value="">
											<input type="hidden" name="depDate" id="markdepDate" value="">
											<input type="hidden" name="arvlDate" id="markarvlDate"
												value=""> <input type="hidden" name="$A*D"
												id="markadult" value=""> <input type="hidden"
												name="$K*D" id="markkid" value=""> <input
												type="hidden" name="$I*T" id="markinfant" value="">
											<input type="hidden" name="cabinClass" id="markcabinClass"
												value=""> <input type="hidden" name="$TT*Y"
												value="R"> <input type="hidden" id="Dynamic"
												name="$&*D5K" value="true"> <input name="$M*A@"
												class="form-control mobile-inline" placeholder="Markup"
												id="appliedmarkamt" autocomplete="off"
												value="{{markupammount}}">
											<button class="btn btn-info but btn-clean mobile-inline"
												type="submit" id="submitmarkup" ng-click="submitted==true">Add</button>
										</form>
								</a></li>
								<li data-ng-show="{{user.isDynamicmarkup == false}}"
									style="display: none;" id="appliedmarkup"><a href="#"
									class="sort-by-price pull-right"> <label
										id="appliedmarkamt"> </label>
								</a></li>
								<li data-ng-show="{{user.isDynamicmarkup == true}}"
									id="appliedmarkup"><a class="sort-by-price pull-right">
										<label id="appliedmarkamt">Markup Applied
											{{markupammount}} </label>
								</a></li>								
								<li class="sort-by-price pull-right"><a
									href="javascript:void(0);" class="sort-by-container ">
										<h5>
											Results <b>{{fareFlightSegment.length}}</b> out of <b>{{fareFlightSegment.length}}</b>
										</h5>
								</a></li>
							</ul>
						</div>

					</div>
				</s:else>
			</div>

			<!-- Matrix search -->
			<div class="row margin-top10px pad-Left-Right-10px">
				<div class="col-xs-3 col-sm-2 col-md-2 mtx-list clearfix ">

					<div class="matrix-stop clearfix">
						<div class="m-imgs clearfix">
							<p>Airlines</p>
						</div>
						<div class="m-non-stops clearfix">
							<p>Non-stop</p>
						</div>
						<div class="m-stops clearfix">
							<p>1+ Stop</p>
						</div>
					</div>
				</div>

				<div class="col-xs-9 col-sm-10 col-md-10 clearfix matrix-search ">

					<ol class="matrix-box clearfix" id="selectable">

						<li class="matrix-air clearfix lintas-content"
							data-ng-repeat="item in Matrixairlinepriceitems"
							data-ng-click="Matrixclickairlinefilter($event,item.Airline)"
							id="mat{{getairlinecode(item.Airline)}}">

							<div class="m-img clearfix" style="pointer-events: none">
								<figure>
									<span class="spriteFltLogos x{{getairlinecode(item.Airline)}}"></span>
									<figcaption>{{item.Airline}}</figcaption>
								</figure>
							</div>

							<div class="m-non-stop clearfix" style="pointer-events: none">
								<p data-ng-show="{{item.nonstop != 0}}">
									<i data-ng-class="classname"></i>{{getconvertedcurrency(item.nonstop)}}
								</p>
								<p data-ng-show="{{item.nonstop == 0}}">
									<i></i> -
								</p>
							</div>

							<div class="m-stop clearfix" style="pointer-events: none">
								<p data-ng-show="{{item.onestops != 0}}">
									<i data-ng-class="classname"></i>
									{{getconvertedcurrency(item.onestops)}}
								</p>
								<p data-ng-show="{{item.onestops == 0}}">
									<i></i> -
								</p>
							</div>
						</li>
					</ol>
				</div>
			</div>

			<!-- ......Matrix end...... -->
			<!--  Spcl round selection -->

			<div class="clearfix special-round-selection">
				<div class="clearfix col-sm-12" id="sele-summary"
					style="display: block;">
					<p class="h5 current-selection">
						Currently Selected <span class="arrow-down"></span>
					</p>

					<div class="clearfix current-section">
						<div class="col-md-6 col-sm-6 col-xs-6 brrt pad-Left-Right-10px"
							class="selecedradio content">
							<ul class="clearfix corp-br">
								<li class="c-air-image"><span
									class="spriteFltLogos x{{selectedonwardflight.segments[0].carrier.code}}"
									width="28px" height="25px;"></span> <!-- img src="images/4.png" -->
									<a href="javascript:void(0);"><p>{{selectedonwardflight.segments[0].carrier.name}}</p></a></li>
								<li class="c-air-image">
									<ul class="clearfix c-dir">
										<li class="col-md-4 col-sm-4 col-xs-4"><p>
												<b>{{selectedonwardflight.segments[0].ori}}</b>
											</p> <span>{{selectedonwardflight.segments[0].depTime}}</span></li>
										<li class="col-md-3 col-sm-3 col-xs-3 ">
											<p class="ten">
												<b class="tayyarah-long-arrow-right"></b>
											</p>
										</li>

										<li class="col-md-4 col-sm-4 col-xs-4"><p>
												<b>{{selectedonwardflight.segments[selectedonwardflight.segments.length
													- 1].dest}}</b>
											</p> <span>{{selectedonwardflight.segments[selectedonwardflight.segments.length
												- 1].arrTime}}</span></li>
									</ul>
								</li>
								<li class="c-air-image">
									<p>
										<b>{{listTimingsDuration((selectedonwardflight.segments[0].depTime),(selectedonwardflight.segments[selectedonwardflight.segments.length
											- 1].arrTime))}} </b>
									</p> <span data-ng-show="selectedonwardflight.segments.length == 1">{{selectedonwardflight.segments.length-
										1}} Stop</span> <span
									data-ng-show="selectedonwardflight.segments.length == 2">{{selectedonwardflight.segments.length-
										1}} Stop</span> <span
									data-ng-show="selectedonwardflight.segments.length > 2">{{selectedonwardflight.segments.length-
										1}} Stops</span>
								</li>
							</ul>

						</div>
						<div class="col-md-6 col-sm-6 col-xs-6 pad-Left-Right-10px">

							<ul class="clearfix corp-br">
								<li class="c-air-image"><span
									class="spriteFltLogos x{{selectedreturnflight.segments[0].carrier.code}}"
									width="28px" height="25px;"></span>
									<p>
										<a href="javascript:void(0);">{{selectedreturnflight.segments[0].carrier.name}}</a>
									</p></li>
								<li class="c-air-image">
									<ul>
										<li class="col-md-4 col-sm-4 col-xs-4"><p>
												<b>{{selectedreturnflight.segments[0].ori}} </b>
											</p> <span>{{selectedreturnflight.segments[0].depTime}}</span></li>

										<li class="col-md-3 col-sm-3 col-xs-3">
											<p class="ten">
												<b class="tayyarah-long-arrow-right"></b>
											</p>
										</li>

										<li class="col-md-4 col-sm-4 col-xs-4"><p>
												<b>{{selectedreturnflight.segments[selectedreturnflight.segments.length
													- 1].dest}}</b>
											</p> <span>{{selectedreturnflight.segments[selectedreturnflight.segments.length
												- 1].arrTime}}</span></li>
									</ul>
								</li>
								<li class="c-air-image">
									<p>
										<!-- <b>{{selectedreturnflight.segments |
											totaltime:'mm':'hhhmmm':false}}</b> -->
										<b>{{listTimingsDuration((selectedreturnflight.segments[0].depTime),(selectedreturnflight.segments[selectedreturnflight.segments.length
											- 1].arrTime))}}</b>
									</p> <span data-ng-show="selectedreturnflight.segments.length == 1">{{selectedreturnflight.segments.length-
										1}} Stop</span> <span
									data-ng-show="selectedreturnflight.segments.length == 2">{{selectedreturnflight.segments.length
										- 1}} Stops</span> <span
									data-ng-show="selectedreturnflight.segments.length > 2">{{selectedreturnflight.segments.length
										- 1}} Stops</span>
								</li>
							</ul>

						</div>
						<div class="col-sm-2 domasticprice">

							<div class="sele-shoe">
								<a href="javascript:void(0);" data-toggle="modal" class="sh-det"
									data-target="#myModal"
									data-ng-click="showdetailsspclround(selectedonwardflight,selectedreturnflight);"><b><i
										class="tayyarah-share"></i> Show details </b></a>


								<form data-ng-submit="booknow(groupindex+1)">
									<input type="hidden" name="at" id="adult{{groupindex+1}}"
										value="{{adult}}"> <input type="hidden" name="cd"
										id="child{{groupindex+1}}" value="{{child}}"> <input
										type="hidden" name="it" id="infant{{groupindex+1}}"
										value="{{infant}}"> <input type="hidden" name="sky"
										id="searchkey{{groupindex+1}}" value="{{searchkey}}">
									<input type="hidden" name="ccy" id="ccy{{groupindex+1}}"
										value="{{bookingCurrency}}"> <input type="hidden"
										name="fidx" id="fid{{groupindex+1}}"
										value="{{selectedonwardflight.flightIndex}}"> <input
										type="hidden" name="sidx" id="sid{{groupindex+1}}"
										value="{{selectedreturnflight.flightIndex}}"> <input
										type="hidden" name="request_locale" id="tworequestlocale"
										value=""> <input type="hidden" name="ay"
										id="app_key{{groupindex+1}}" value="{{app_key}}"> <input
										id="flightspclbook"
										class="btn btn-info but btn-clean button-dropdown"
										type="submit" name="Book" value="Book"
										data-ng-hide="bookNowButtonQuotation">
									<s:if test="#session['agent'] != null">
										<button type="button" id="QuoteClick"
											class="btn btn-info bookBtn quoteBtnn"
											data-ng-show="isQuoteAvailable"
											data-ng-click="addtoquotelist(selectedonwardflight,selectedreturnflight)">Quote
											Now</button>
									</s:if>

								</form>

								<span class="special-price"> <i data-ng-class="classname"></i>
									{{getconvertedcurrency(selectedtotalflightsprice)}}
								</span>


							</div>
						</div>
					</div>
				</div>
			</div>

			<!--    ...................Onward flights...............   -->

			<div
				class="col-md-6 col-sm-6 col-xs-6 domestic-round-trip padLeft0px clearfix">
				<div class="flight-list flight-list-background">
					<div>
						<div class="flight-booking-heading padding10px clearfix">
							<div class="airlines col-xs-2">
								<h5>
									<b data-ng-click="sortorder(onwardflights,'airline')">
										Airlines <i data-ng-class="airlineasc"></i>
									</b>
								</h5>
							</div>
							<div class="departure col-xs-2">
								<h5>
									<b data-ng-click="sortorder(onwardflights,'depart')">
										Depart <i data-ng-class="departasc"></i>
									</b>
								</h5>
							</div>
							<div class="arrive col-xs-2">
								<h5>
									<b data-ng-click="sortorder(onwardflights,'arrival')">
										Arrival <i data-ng-class="arrivalasc"></i>
									</b>
								</h5>

							</div>
							<div class="duration col-xs-2">
								<h5>
									<b data-ng-click="sortorder(onwardflights,'duration')">
										Duration <i data-ng-class="durationasc"></i>
									</b>
								</h5>

							</div>

							<div class="Price col-xs-2">
								<h5>
									<b data-ng-click="sortorder(onwardflights,'price')">Price <i
										data-ng-class="priceasc"></i></b>
								</h5>
							</div>
						</div>
					</div>

					<!-- col-sm-6 -->
					<!--   ----------------------- `	  -------------- -->
					<!--  <md-radio-group ng-model="onwardflights.selectedonwardflight" > | filter:filterdeparttime  | filter:filterarrivaltime-->
					<div class="f-domestic-ro clearfix flightlistcon"
						id="fareflightlist{{groupindex}}"
						data-ng-show="isShowable(groupindex);"
						data-ng-repeat="(groupindex,fareFlightSegments) in onwardflights| filter:filterprice| filter:filterdeparttime  | filter:filterarrivaltime | filter:FareTypeFilter   track by $index">

						<div
							class="flight-booking-list flight-booking-list-Border clearfix"
							data-ng-repeat="(index,flightSegmentsGroups) in fareFlightSegments.flightSegmentsGroups">
							<label class="block clearfix"
								id="seggroupchild{{fareFlightSegments.id}}"
								data-ng-repeat="(segindex,flightSegments) in flightSegmentsGroups.flightSegments | filter:StopsFilter| filter:AirlineFilter | filter:MatrixAirlineFilter">

								<div class="sin-row">
									<div class="col-md-4 col-sm-4 col-xs-12 airlines">
										<div class="pull-left">
											<input id="onwardselected" type="radio"
												name="selectedonwardflight"
												data-ng-click="selectonwardflight(flightSegments,fareFlightSegments);"
												data-ng-checked="groupindex == 0 && segindex == 0">
										</div>
										<div class="sprite-carrier-sec">
											<span
												class="spriteFltLogos x{{flightSegments.segments[0].carrier.code}}"></span>

											<p class="carrier-name-two">
												<a href="javascript:void(0);">{{flightSegments.segments[0].carrier.name}}</a>
											</p>
											<p class="carrier-code-two">
												<a href="javascript:void(0);">{{flightSegments.segments[0].carrier.code}}-</a>
												<a href="javascript:void(0);"
													data-ng-repeat="(segmindex,segment) in flightSegments.segments">{{segment.flight.number}}
													<span
													data-ng-hide="segmindex == flightSegments.segments.length - 1">/</span>
												</a>
											</p>
										</div>

										<div class="sprite-carrier-comp">
											<a class="complementry"
												data-ng-if="flightSegments.segments[0].carrier.name =='Jet Airways'"><i
												class="toolti tayyarah-cutlery"></i><span class="tooltitext">Complimentary
													Meal/Snacks</span> </a> <a class="complementry"
												data-ng-if="flightSegments.segments[0].carrier.name =='Air India'"><i
												class="toolti tayyarah-cutlery"></i><span class="tooltitext">Complimentary
													Meal/Snacks</span> </a>
										</div>
									</div>

									<div class="col-md-2 col-sm-2 col-xs-6 departure mobintlist">
										<div class="flight-timings">
											<p class="h4">
												<!-- <i class="tayyarah-plane"></i> -->
												{{(flightSegments.segments[0].depTime)}}
											</p>
											<span>{{flightSegments.segments[0].ori}}</span>
										</div>
									</div>
									<div class="visible-xs arrive mobiar col-xs-1">
										<i class="tayyarah-long-arrow-right"></i>
									</div>
									<div class="arrive col-md-2 col-sm-2 col-xs-6 mobintlist">
										<div class="flight-timings">
											<p class="h4">
												<!-- <i class="tayyarah-fighter-jet"></i> -->
												{{(flightSegments.segments[flightSegments.segments.length -
												1].arrTime)}}
											</p>
											<span>{{flightSegments.segments[flightSegments.segments.length
												- 1].dest}}</span>
										</div>
									</div>
									<div class="duration col-md-2 col-sm-2 col-xs-2 mobintlist">
										<div class="flight-timings">											
											<p class="h4">
												<!-- <i class="tayyarah-clock-o"></i> -->
												{{listTimingsDuration((flightSegments.segments[0].depTime),(flightSegments.segments[flightSegments.segments.length
												- 1].arrTime))}}
											</p>
											<span data-ng-show="flightSegments.segments.length == 1">{{flightSegments.segments.length
												- 1}} Stop</span> <span
												data-ng-show="flightSegments.segments.length == 2">{{flightSegments.segments.length
												- 1}} Stop</span> <span
												data-ng-show="flightSegments.segments.length > 2">{{flightSegments.segments.length
												- 1}} Stops</span>
										</div>
									</div>
									<div
										class="duration pricebar-two col-md-2 col-sm-2 col-xs-12 mobintlistp">
										<div class="flight-timings mobfont600">
											<i data-ng-class="classname"></i>
											<!-- {{getconvertedcurrency(fareFlightSegments.totalPrice)}} -->
											{{numberWithCommas(getconvertedcurrency(fareFlightSegments.totalPrice))}}
											<span class="refund">{{isRefuntable(fareFlightSegments.refundable)}}</<span>
													<!--  <a href="#" class="btn btn-primary but btn-clean button-dropdown"> Select</a> -->
										</div>
									</div>
								</div> <!-- single-row-ends -->
							</label>
						</div>
					</div>
				</div>
				<!--  e o flight list -->
			</div>

			<!--  .................Ruturn Flights.................. -->

			<div
				class="col-md-6 col-sm-6 col-xs-6 domestic-round-trip padright0px clearfix">
				<div class="flight-list flight-list-background">
					<div>
						<div class="flight-booking-heading padding10px clearfix">
							<div class="airlines col-xs-2">
								<h5>
									<b data-ng-click="returnsortorder(returnflights,'airline')">
										Airlines <i data-ng-class="returnairlineasc"></i>
									</b>
								</h5>
							</div>
							<div class="departure col-xs-2">
								<h5>
									<b data-ng-click="returnsortorder(returnflights,'depart')">
										Depart <i data-ng-class="returndepartasc"></i>
									</b>
								</h5>
							</div>
							<div class="arrive col-xs-2">
								<h5>
									<b data-ng-click="returnsortorder(returnflights,'arrival')">
										Arrival <i data-ng-class="returnarrivalasc"></i>
									</b>
								</h5>

							</div>
							<div class="duration col-xs-2">
								<h5>
									<b data-ng-click="returnsortorder(returnflights,'duration')">
										Duration <i data-ng-class="returndurationasc"></i>
									</b>
								</h5>

							</div>

							<div class="Price col-xs-2">
								<h5>
									<b data-ng-click="returnsortorder(returnflights,'price')">Price
										<i data-ng-class="returnpriceasc"></i>
									</b>
								</h5>

							</div>
						</div>
					</div>
					<!-- col-sm-6 -->

					<!--   ----------------------- flight booking list is displayed here  -------------- -->

					<div class="f-domestic-ro clearfix flightlistcon1"
						id="fareflightlist1{{groupindex}}"
						data-ng-show="isShowable1(groupindex);"
						data-ng-repeat="(groupindex,fareFlightSegments) in returnflights| filter:filterprice|filter:filterreturndeparttime|filter:filterreturnarrivaltime | filter:FareTypeFilter  track by $index">

						<div
							class="flight-booking-list flight-booking-list-Border clearfix"
							data-ng-repeat="(index,flightSegmentsGroups) in fareFlightSegments.flightSegmentsGroups ">
							<label class="block clearfix"
								data-ng-repeat="(segindex,flightSegments) in flightSegmentsGroups.flightSegments | filter:StopsFilter| filter:AirlineFilter | filter:MatrixAirlineFilter">
								<div class="sin-row1">
									<div class="col-sm-4 airlines">
										<div class="pull-left">
											<input type="radio" id="returnselected"
												name="selectedreturnflight"
												data-ng-click="selectreturnflight(flightSegments,fareFlightSegments);"
												data-ng-checked="groupindex == 0 && segindex == 0">
										</div>
										<div class="sprite-carrier-sec">
											<span
												class="spriteFltLogos x{{flightSegments.segments[0].carrier.code}}"></span>
											<p class="carrier-name-two">
												<a href="javascript:void(0);">{{flightSegments.segments[0].carrier.name}}</a>

											</p>
											<p class="carrier-code-two">

												<a href="javascript:void(0);">{{flightSegments.segments[0].carrier.code}}-</a>
												<a href="javascript:void(0);"
													data-ng-repeat="(segmindex,segment) in flightSegments.segments">{{segment.flight.number}}
													<span
													data-ng-hide="segmindex == flightSegments.segments.length - 1">/</span>
												</a>

											</p>
										</div>
										<div class="sprite-carrier-comp">
											<a class="complementry"
												data-ng-if="flightSegments.segments[0].carrier.name =='Jet Airways'"><i
												class="toolti tayyarah-cutlery"></i><span class="tooltitext">Complimentary
													Meal/Snacks</span> </a> <a class="complementry"
												data-ng-if="flightSegments.segments[0].carrier.name =='Air India'"><i
												class="toolti tayyarah-cutlery"></i><span class="tooltitext">Complimentary
													Meal/Snacks</span> </a>
										</div>
									</div>

									<div class="col-sm-2 departure mobintlist">
										<div class="flight-timings">
											<p class="h4">
												<!-- <i class="tayyarah-plane"></i> -->
												{{(flightSegments.segments[0].depTime)}}
											</p>
											<span>{{flightSegments.segments[0].ori}}</span>
										</div>
									</div>
									<div class="visible-xs arrive col-xs-1 mobiar">
										<i class="tayyarah-long-arrow-right"></i>
									</div>
									<div class="arrive col-xs-2 mobintlist">
										<div class="flight-timings">
											<p class="h4">
												<!-- <i class="tayyarah-fighter-jet"></i> -->
												{{(flightSegments.segments[flightSegments.segments.length -
												1].arrTime)}}
											</p>
											<span>{{flightSegments.segments[flightSegments.segments.length
												- 1].dest}}</span>
										</div>
									</div>
									<div class="duration col-xs-2 mobintlist">
										<div class="flight-timings">
											<!-- <p class="h4">
												<i class="tayyarah-clock-o"></i> {{flightSegments.segments |
												totaltime:'mm':'hhhmmm':false}}
											</p> -->
											<p class="h4">
												<!-- 	<i class="tayyarah-clock-o"></i> -->
												{{listTimingsDuration((flightSegments.segments[0].depTime),(flightSegments.segments[flightSegments.segments.length
												- 1].arrTime))}}
											</p>
											<span data-ng-show="flightSegments.segments.length == 1">{{flightSegments.segments.length
												- 1}} Stop</span> <span
												data-ng-show="flightSegments.segments.length == 2">{{flightSegments.segments.length
												- 1}} Stop</span> <span
												data-ng-show="flightSegments.segments.length > 2">{{flightSegments.segments.length
												- 1}} Stops</span>
										</div>
									</div>
									<div class="duration pricebar-two col-xs-2 mobintlistp">
										<div class="flight-timings mobfont600">
											<i data-ng-class="classname"></i>
											<!-- {{getconvertedcurrency(fareFlightSegments.totalPrice)}} -->
											{{numberWithCommas(getconvertedcurrency(fareFlightSegments.totalPrice))}}
											<span class="refund">{{isRefuntable(fareFlightSegments.refundable)}}</<span>
													<!-- <a href="#" class="btn btn-primary but btn-clean button-dropdown"> Select</a> -->
										</div>
									</div>
								</div>
							</label>
						</div>
					</div>
				</div>
			</div>


			<!-- Modal -->
			<div class="modal fade special-round-model" id="myModal"
				tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
				<div class="modal-dialog modal-lg" role="document">
					<div class="modal-content" id="model-f-d">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
							<div class="mod-fli-de clearfix">
								<div class="mod-price">
									<div class="m-city">
										<p>
											{{selectedonwardflight.segments[0].oriName}}({{selectedonwardflight.segments[0].ori}})
											<i class="tayyarah-long-arrow-right"></i>
											{{selectedonwardflight.segments[selectedonwardflight.segments.length
											- 1].destName}}(
											{{selectedonwardflight.segments[selectedonwardflight.segments.length
											- 1].dest}})
										</p>
										<p>
											{{selectedreturnflight.segments[0].oriName}}({{selectedreturnflight.segments[0].ori}})
											<i class="tayyarah-long-arrow-right"></i>
											{{selectedreturnflight.segments[selectedreturnflight.segments.length
											- 1].destName}}(
											{{selectedreturnflight.segments[selectedreturnflight.segments.length
											- 1].dest}})


										</p>
									</div>
									<div class="m-price">
										<p class="h4">
											<i data-ng-class="classname"></i>{{selectedtotalflightsprice}}
											<!-- {{numberWithCommas(getconvertedcurrency(totalprice))}} -->
										</p>
										<form data-ng-submit="modalbooknow(groupindex+1)">
											<input type="hidden" name="at" id="adult{{groupindex+1}}"
												value="{{adult}}"> <input type="hidden" name="cd"
												id="child{{groupindex+1}}" value="{{child}}"> <input
												type="hidden" name="it" id="infant{{groupindex+1}}"
												value="{{infant}}"> <input type="hidden" name="sky"
												id="searchkey{{groupindex+1}}" value="{{searchkey}}">
											<input type="hidden" name="ccy" id="ccy{{groupindex+1}}"
												value="{{bookingCurrency}}"> <input type="hidden"
												name="fidx" id="fid{{groupindex+1}}"
												value="{{selectedonwardflight.flightIndex}}"> <input
												type="hidden" name="sidx" id="sid{{groupindex+1}}"
												value="{{selectedreturnflight.flightIndex}}"> <input
												type="hidden" name="request_locale" id="tworequestlocale"
												value=""> <input type="hidden" name="ay"
												id="app_key{{groupindex+1}}" value="{{app_key}}"> <input
												id="flightspclselect"
												class="btn btn-info but btn-clean button-dropdown"
												type="submit" name="Select" value="Select">

										</form>

									</div>
								</div>
							</div>
						</div>
						<div class="modal-body">
							<div class="showviews">
								<ul class="nav nav-tabs" role="tablist">

									<li role="presentation" class="active"><a
										data-target="#home" aria-controls="home" role="tab"
										data-toggle="tab"> Flight Details</a></li>
									<%-- <s:text name="global.FlightDetails" ></s:text> --%>
									<li role="presentation"><a data-target="#profile"
										aria-controls="profile" role="tab" data-toggle="tab"> Fare
											Details</a></li>
									<li role="presentation"><a data-target="#messages"
										aria-controls="messages" role="tab" data-toggle="tab">
											Baggage </a></li>
								</ul>
								<!-- Tab panes -->
								<div class="tab-content" id="mode-cont">
									<div role="tabpanel" class="tab-pane active" id="home">

										<div class="onwards-returns">

											<!-- Nav tabs -->
											<ul class="nav nav-tabs" role="tablist">
												<li role="presentation" class="active"><a
													data-target="#onward" aria-controls="home" role="tab"
													data-toggle="tab">Onward</a></li>
												<li role="presentation"><a data-target="#return"
													aria-controls="profile" role="tab" data-toggle="tab">Return</a></li>

											</ul>

											<!-- Tab panes -->
											<div class="tab-content">
												<div role="tabpanel" class="tab-pane active" id="onward">
													<!-- model main-details-first  -->
													<div
														data-ng-repeat="(segindex,seg) in selectedonwardflight.segments ">

														<div class="model-main-details">
															<div class="d-h-air">
																<ul class="mod-f-details clearfix">
																	<li class="mobLi100Per">
																		<figure>
																			<span class="spriteFltLogos x{{seg.carrier.code}}"></span>
																			<figcaption>{{seg.carrier.code}}-{{seg.flight.number}}</figcaption>
																			<figcaption>Booking Class :
																				{{seg.cabin.code}}</figcaption>
																			<figcaption>Airplane Type:
																				{{seg.flight.equipment}}</figcaption>
																		</figure>
																	</li>
																	<li class="mod-dep mobLi40Per">
																		<h5 class="col-xs-12">{{seg.oriName}}(
																			{{seg.ori}} )</h5> <time class="col-xs-12">{{seg.depDate
																			| date:'EEE, dd MMM'}}</time> <time class="col-xs-12">Departure
																			: {{seg.depTime }}</time>
																		<h6 class="col-xs-12">{{seg.oriAirportName}}</h6>
																	</li>

																	<li class="module-direction">
																		<div>
																			<p class="m-rou ">
																				<i class="tayyarah-long-arrow-right"></i>
																			</p>
																		</div>
																	</li>

																	<li class="mod-dep mobLi40Per">
																		<h5 class="col-xs-12">{{seg.destName}} (
																			{{seg.dest}})</h5> <time class="col-xs-12">{{seg.arrDate
																			|date:'EEE, dd MMM'}}</time> <time class="col-xs-12">Arrival
																			: {{seg.arrTime }}</time>
																		<h6 class="col-xs-12">{{seg.destAirportName}}</h6>
																	</li>
																	<li class="module-direction mobLi100Per">
																		<h5>
																			<i class="tayyarah-clock-o"></i>
																			{{Onwardduration[segindex]}}
																		</h5> <span>0 Stop</span>
																	</li>
																</ul>

																<p class="operated">
																	{{seg.carrier.name}}, {{seg.flight.number}} <span>
																		Operated by {{seg.carrier.name}}</span>
																</p>
																<div class="mod-flight-row clearfix"
																	data-ng-hide="{{$index == selectedonwardflight.segments.length - 1}}">
																	<div class="layover clearfix"
																		data-ng-hide="{{segindex == seg.length - 1}}">
																		<div class="col-sm-6">
																			<div class="lay">
																				<i class="tayyarah-clock-o"></i> Layover:
																				{{seg.destName}} ({{seg.dest}}), Time:
																				{{datecompare11(seg.arrival,seg.depart) }}
																			</div>
																		</div>
																		<div class="col-sm-6">
																			<div class="lay-connect">
																				<i class="tayyarah-plane"></i> Connecting flight may
																				depart from different Terminal
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
												<!-- onward ends here -->
												<div role="tabpanel" class="tab-pane" id="return">
													<!-- model main-details-first  -->
													<div
														data-ng-repeat="(segindex,seg) in selectedreturnflight.segments">
														<div class="model-main-details">
															<div class="d-h-air">
																<ul class="mod-f-details clearfix">
																	<li class="mobLi100Per">
																		<figure>
																			<span class="spriteFltLogos x{{seg.carrier.code}}"></span>
																			<figcaption>{{seg.carrier.code}}-{{seg.flight.number}}</figcaption>
																			<figcaption>Booking Class :
																				{{seg.cabin.code}}</figcaption>
																			<figcaption>Airplane Type:
																				{{seg.flight.equipment}}</figcaption>
																		</figure>
																	</li>
																	<li class="mod-dep mobLi40Per">
																		<h5>{{seg.oriName}}( {{seg.ori}} )</h5> <time
																			class="col-xs-12">{{seg.depDate | date:'EEE,
																			dd MMM'}}</time> <time class="col-xs-12">Departure :
																			{{seg.depTime }}</time>
																		<h6 class="col-xs-12">{{seg.oriAirportName}}</h6>
																	</li>

																	<li class="module-direction">
																		<div>
																			<p class="m-rou ">
																				<i class="tayyarah-long-arrow-right"></i>
																			</p>
																		</div>
																	</li>
																	<!-- replacetimeformat( -->
																	<li class="mod-dep mobLi40Per">
																		<h5>{{seg.destName}} ( {{seg.dest}})</h5> <time
																			class="col-xs-12">{{seg.arrDate |date:'EEE, dd
																			MMM'}}</time> <time class="col-xs-12">Arrival :
																			{{seg.arrTime }}</time>
																		<h6 class="col-xs-12">{{seg.destAirportName}}</h6>
																	</li>
																	<li class="module-direction mobLi100Per">
																		<h5>
																			<i class="tayyarah-clock-o"></i>
																			{{returnDuration[segindex]}}
																		</h5> <span>0 Stop</span>
																	</li>
																</ul>

																<p class="operated">
																	{{seg.carrier.name}}, {{seg.flight.number}} <span>
																		Operated by {{seg.carrier.name}}</span>
																</p>
																<div class="mod-flight-row clearfix"
																	data-ng-hide="{{$index == selectedreturnflight.segments.length - 1}}">
																	<div class="layover clearfix"
																		data-ng-hide="{{segindex == seg.length - 1}}">
																		<div class="col-sm-6">
																			<div class="lay">
																				<i class="tayyarah-clock-o"></i> Layover:
																				{{seg.destName}} ({{seg.dest}}), Time:
																				{{datecompare11(seg.arrival,seg.depart) }}
																			</div>
																		</div>
																		<div class="col-sm-6">
																			<div class="lay-connect">
																				<i class="tayyarah-plane"></i> Connecting flight may
																				depart from different Terminal
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
												<!-- return ends here -->

											</div>

										</div>
										<!-- onward and return ends here -->

									</div>
									<!-- flight-details ends here -->
									<div role="tabpanel" class="tab-pane" id="profile">

										<div class="onwards-returns">
											<!-- Nav tabs -->
											<ul class="nav nav-tabs" role="tablist">
												<li role="presentation" class="active"><a
													data-target="#onwardfare" aria-controls="home" role="tab"
													data-toggle="tab">Onward Fare</a></li>
												<li role="presentation"><a data-target="#returnfare"
													aria-controls="profile" role="tab" data-toggle="tab">Return
														Fare</a></li>

											</ul>
											<!-- Tab panes -->
											<div class="tab-content">
												<div role="tabpanel" class="tab-pane active" id="onwardfare">

													<div class="col-sm-4 m-f-summary">
														<h4>Fare Summary</h4>
														<table class="table table-condensed">
															<tbody>
																<tr>
																	<td>Passenger X {{totalpassenger}}</td>
																	<td><i data-ng-class="classname"></i>
																		{{numberWithCommas(getconvertedcurrency(selectedonwardflightfareobj.basePrice))}}</td>
																</tr>
																<tr>
																	<td>Tax</td>
																	<td><i data-ng-class="classname"></i>
																		{{numberWithCommas(getconvertedcurrency(selectedonwardflightfareobj.taxes))}}</td>
																</tr>
																<tr>
																	<td class="h4">Total Price</td>
																	<td class="h4"><i data-ng-class="classname"></i>
																		{{numberWithCommas(getconvertedcurrency(selectedonwardflightfareobj.totalPrice))}}</td>
																</tr>
															</tbody>
														</table>
													</div>

													<div class="col-sm-8 m-f-Rules">
														<h4>Fare Rules</h4>
														<div class="ruleflightloading"
															data-ng-style="{'display' : rulesloader}" data-ng-cloak>
															<img class="ruleflightloading-image"
																src="images/divloading.gif" alt="Loading..." />
														</div>
														<p data-ng-repeat="(ruleindex,rules) in farerulelist">
															<b>{{rules.header}}</b> <span ng-bind-html="rules.value"></span>
														</p>
													</div>
												</div>
												<div role="tabpanel" class="tab-pane" id="returnfare">
													<div class="col-sm-4 m-f-summary">
														<h4>FareSummary</h4>
														<table class="table table-condensed">
															<tbody>
																<tr>
																	<td>Passenger X {{totalpassenger}}</td>
																	<td><i data-ng-class="classname"></i>
																		{{numberWithCommas(getconvertedcurrency(selectedreturnflightfareobj.basePrice))}}</td>
																</tr>
																<tr>
																	<td>Tax</td>
																	<td><i data-ng-class="classname"></i>
																		{{numberWithCommas(getconvertedcurrency(selectedreturnflightfareobj.taxes))}}</td>
																</tr>
																<tr>
																	<td class="h4">Total Price</td>
																	<td class="h4"><i data-ng-class="classname"></i>
																		{{numberWithCommas(getconvertedcurrency(selectedreturnflightfareobj.totalPrice))}}</td>
																</tr>
															</tbody>
														</table>
													</div>
													<div class="col-sm-8 m-f-Rules">
														<h4>Fare Rules</h4>
														<div class="ruleflightloading"
															data-ng-style="{'display' : rulesloader}" data-ng-cloak>
															<img class="ruleflightloading-image"
																src="images/divloading.gif" alt="Loading..." />
														</div>
														<p data-ng-repeat="(ruleindex,rules) in farerulelist">
															<b>{{rules.header}}</b> <span ng-bind-html="rules.value"></span>
														</p>
													</div>

												</div>
											</div>

										</div>
									</div>


									<div role="tabpanel" class="tab-pane" id="messages">

										<div class="clearfix">
											<div class="col-sm-6 m-baggage">
												<div class="m-baggage-heading">
													<h4>
														<i class="tayyarah-plane"></i> Onward
													</h4>
													<p>
														{{selectedonwardflight.segments[0].ori}} <i
															class="tayyarah-long-arrow-right"></i>
														{{selectedonwardflight.segments[selectedonwardflight.segments.length
														- 1].dest}}
													</p>
												</div>

												<div class="m-baggage-cont clearfix">
													<div class="col-sm-6">
														<p>
															{{selectedonwardflight.segments[0].oriName}} <i
																class="tayyarah-long-arrow-right"></i>
															{{selectedonwardflight.segments[selectedonwardflight.segments.length
															- 1].destName}}
														</p>
														<span>Adult</span>
													</div>

													<div class="col-sm-3">
														<p>Check In</p>
														<span> {{onwardbaggagevalue}} {{onwardbaggageunit}}</span>
													</div>
												</div>
											</div>
											<div class="col-sm-6 m-baggage">
												<div class="m-baggage-heading">
													<h4>
														<i class="tayyarah-plane"></i> Return
													</h4>
													<p>
														{{selectedreturnflight.segments[0].ori}} <i
															class="tayyarah-long-arrow-right"></i>
														{{selectedreturnflight.segments[selectedreturnflight.segments.length
														- 1].dest}}
													</p>
												</div>
												<div class="m-baggage-cont clearfix">
													<div class="col-sm-6">
														<p>
															{{selectedreturnflight.segments[0].oriName}} <i
																class="tayyarah-long-arrow-right"></i>
															{{selectedreturnflight.segments[selectedreturnflight.segments.length
															- 1].destName}}
														</p>
														<span>Adult</span>
													</div>
													<div class="col-sm-3">
														<p>Check In</p>
														<span> {{returnbaggagevalue}} {{returnbaggageunit}}</span>
													</div>
												</div>
											</div>
											<div class="b-info clearfix">The baggage information is
												just for reference. Please check with airline before
												check-in. For more information , visit airline website.</div>
										</div>

									</div>
								</div>
								<!-- </div> -->
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Admin Redirect model  -->

			<div class="modal fade" id="addQuoteConfirmModal" role="dialog">
				<div class="modal-dialog">

					<!-- Modal content-->
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal">&times;</button>

						</div>
						<div class="modal-body "
							style="margin-top: 20px !important; padding-top: 0px !important;">
							<h4 class="text-center">Are you Sure to Redirect to Admin</h4>
							<div class="row marginTop20px">
								<button type="button" class="btn btn-primary "
									data-ng-click="addquotes()">yes</button>
								<button type="button" class="btn btn-default "
									style="margin-left: 40px; border: 1px solid #ccc;"
									data-dismiss="modal">No</button>
							</div>
						</div>
					</div>

				</div>
			</div>

			<div class="modal fade" id="InfoModal" role="dialog">
				<div class="modal-dialog modal-sm">

					<!-- Modal content-->
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal">&times;</button>

						</div>
						<div class="modal-body "
							style="margin-top: 20px !important; padding-top: 10px !important;">
							<h4 class="text-center">We have added this flight to your
								quotation list.</h4>
							<h5 class="text-center PleaseCheck">Please check !!</h5>
						</div>
					</div>
				</div>
			</div>

			<!-- corporate-quotation-list start here -->
			<s:if test="#session['agent'] != null">
				<div class="corporate-quotation-list"
					data-ng-show="isQuoteAvailable">
					<button type="button" class="btn btn-info btn-lg" id="myQuotation">
						<span class="hidden-xs">Your Quotation List </span> <i
							class="tayyarah-th visible-xs quot-list"> <span
							class="padrigth10px">Quote List</span></i>
					</button>


					<!-- Modal -->

					<div class="modal left fade" id="myModalQuotation" role="dialog">
						<div class="modal-dialog">
							<div class="modal-content">
								<div class="modal-header">
									<button type="button" class="close" data-dismiss="modal"
										aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
									<h4 class="modal-title" id="myModalLabel">Quotations</h4>
								</div>
								<div class="modal-body">

									<div data-ng-repeat="quote in quotearray track by $index">
										<ul>
											<li class="qoute-list"><span class="q2">{{$index
													+ 1}} </span> <span class="q1">Airline :<b>{{quote.airline}}</b></span>
												<span class="q2">Flight No: {{quote.flightNumber}} </span> <span
												class="q2">Price: <i class="tayyarah-inr"></i><b>{{quote.totalAmount}}</b></span>
												<span class="q4"><i class="tayyarah-close red"
													data-ng-click="removequote(quote.flightNumber)"></i></span></li>
										</ul>
									</div>
								</div>
							</div>
							<div class="modal-footer">

								<button type="button" class="btn btn-primary"
									data-ng-click="addquotesModal()" data-ng-show="isQuoteloaded">Add
									Quotation</button>
							</div>
						</div>
					</div>
				</div>
			</s:if>
		</div>
	</div>
</div>
</div>
<div class="container errorPageHeight" data-ng-show="errordiv"
	data-ng-cloak>
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
<div class="modal fade LowFareModal" id="LowFareModal" role="dialog">
	<div class="modal-dialog modal-lg">

		<!--  Modal content -->
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title text-center">Low Fare Alert</h4>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-md-12">
						<div class="row reviewRow">
							<div class="domesticlowpriceRed">Selected Flight</div>
						</div>
						<div class="sin-row row">
							<div
								class="col-md-4 col-sm-4 col-xs-12 airlines selectedDivBorder">
								<div class="pull-left"></div>

								<div class="sprite-carrier-sec">
									<span
										class="spriteFltLogos x{{selectedflight.flightSegmentsGroups[0].flightSegments[0].segments[0].carrier.code}}"></span>

									<p class="carrier-name-two">
										<a href="javascript:void(0);">{{selectedflight.flightSegmentsGroups[0].flightSegments[0].segments[0].carrier.name}}</a>
									</p>
									<p class="carrier-code-two">
										<a href="javascript:void(0);">{{selectedflight.flightSegmentsGroups[0].flightSegments[0].segments[0].carrier.code}}-</a>
										<a href="javascript:void(0);">{{selectedflight.flightSegmentsGroups[0].flightSegments[0].segments[0].flight.number}}
										</a>
									</p>
								</div>

								<div class="sprite-carrier-comp compModal">
									<a class="complementry"
										data-ng-if="selectedflight.flightSegmentsGroups[0].flightSegments[0].segments[0].carrier.name =='Jet Airways'"><i
										class="toolti tayyarah-cutlery"></i><span class="tooltitext">Complimentary
											Meal/Snacks</span> </a> <a class="complementry"
										data-ng-if="selectedflight.flightSegmentsGroups[0].flightSegments[0].segments[0].carrier.name =='Air India'"><i
										class="toolti tayyarah-cutlery"></i><span class="tooltitext">Complimentary
											Meal/Snacks</span> </a>
								</div>
							</div>

							<div
								class="col-md-2 col-sm-2 col-xs-6 departure selectedDivBorder">
								<div class="flight-timings">
									<p class="h4">
										<i class="tayyarah-plane"></i>{{(selectedflight.flightSegmentsGroups[0].flightSegments[0].segments[0].depTime)}}
									</p>
									<span>{{selectedflight.flightSegmentsGroups[0].flightSegments[0].segments[0].ori}}</span>
								</div>
							</div>
							<div class="arrive col-md-2 col-sm-2 col-xs-6 selectedDivBorder">
								<div class="flight-timings">
									<p class="h4">
										<i class="tayyarah-fighter-jet"></i>
										{{(selectedflight.flightSegmentsGroups[0].flightSegments[0].segments[selectedflight.flightSegmentsGroups[0].flightSegments[0].segments.length
										- 1].arrTime)}}
									</p>
									<span>{{selectedflight.flightSegmentsGroups[0].flightSegments[0].segments[selectedflight.flightSegmentsGroups[0].flightSegments[0].segments.length
										- 1].dest}}</span>
								</div>
							</div>
							<div
								class="duration col-md-2 col-sm-2 col-xs-2 selectedDivBorder">
								<div class="flight-timings">
									<p class="h4">
										<i class="tayyarah-clock-o"></i>{{selectedflight.flightSegmentsGroups[0].flightSegments[0].segments
										| totaltime:'mm':'hhhmmm':false}}
									</p>
									<span
										data-ng-show="selectedflight.flightSegmentsGroups[0].flightSegments[0].segments.length == 1">{{selectedflight.flightSegmentsGroups[0].flightSegments[0].segments.length
										- 1}} Stop</span> <span
										data-ng-show="selectedflight.flightSegmentsGroups[0].flightSegments[0].segments.length == 2">{{selectedflight.flightSegmentsGroups[0].flightSegments[0].segments.length
										- 1}} Stop</span> <span
										data-ng-show="selectedflight.flightSegmentsGroups[0].flightSegments[0].segments.length > 2">{{selectedflight.flightSegmentsGroups[0].flightSegments[0].segments.length
										- 1}} Stops</span>
								</div>
							</div>
							<div
								class="duration pricebar-two col-md-2 col-sm-2 col-xs-12 selectedDivBorder text-center">
								<div class="flight-timings mobfont600 ">
									<i data-ng-class="classname"></i>
									{{numberWithCommas(getconvertedcurrency(selectedflight.totalPrice))}}
									<span class="refund col-md-12">{{isRefuntable(selectedflight.refundable)}}</<span>
								</div>
							</div>
						</div>

					</div>

					<div class="col-md-12">

						<div class="row reviewRow">
							<div class="domesticlowpriceGreen">Recommended Flights</div>
							<div class="f-domestic-ro clearfix flightlistcon"
								id="fareflightlist{{groupindex}}"
								data-ng-show="isShowable(groupindex);"
								data-ng-repeat="(groupindex,fareFlightSegments) in lowFareData| filter:filterprice| filter:filterdeparttime  | filter:filterarrivaltime | filter:FareTypeFilter   track by $index">

								<div
									class="flight-booking-list domflight-booking-list flight-booking-list-Border clearfix"
									data-ng-repeat="(index,flightSegmentsGroups) in fareFlightSegments.flightSegmentsGroups">
									<label class="block clearfix"
										id="seggroupchild{{fareFlightSegments.id}}"
										data-ng-repeat="(segindex,flightSegments) in flightSegmentsGroups.flightSegments | filter:StopsFilter| filter:AirlineFilter | filter:MatrixAirlineFilter">
										<div class="sin-row">
											<div class="col-md-4 col-sm-4 col-xs-12 airlines">
												<div class="pull-left"
													data-ng-if="FlightType == 'onwardFlight'">
													<input id="onwardselected" type="radio"
														name="selectedonwardflight"
														data-ng-click="selectonwardflight(flightSegments,fareFlightSegments);">
												</div>
												<div class="pull-left"
													data-ng-if="FlightType == 'returnFlight'">
													<input type="radio" id="returnselected"
														name="selectedreturnflight"
														data-ng-click="selectreturnflight(flightSegments,fareFlightSegments);">
												</div>
												<div class="sprite-carrier-sec">
													<span
														class="spriteFltLogos x{{flightSegments.segments[0].carrier.code}}"></span>

													<p class="carrier-name-two">
														<a href="javascript:void(0);">{{flightSegments.segments[0].carrier.name}}</a>
													</p>
													<p class="carrier-code-two">
														<a href="javascript:void(0);">{{flightSegments.segments[0].carrier.code}}-</a>
														<a href="javascript:void(0);"
															data-ng-repeat="(segmindex,segment) in flightSegments.segments">{{segment.flight.number}}
															<span
															data-ng-hide="segmindex == flightSegments.segments.length - 1">/</span>
														</a>
													</p>
												</div>

												<div class="sprite-carrier-comp">
													<a class="complementry"
														data-ng-if="flightSegments.segments[0].carrier.name =='Jet Airways'"><i
														class="toolti tayyarah-cutlery"></i><span
														class="tooltitext">Complimentary Meal/Snacks</span> </a> <a
														class="complementry"
														data-ng-if="flightSegments.segments[0].carrier.name =='Air India'"><i
														class="toolti tayyarah-cutlery"></i><span
														class="tooltitext">Complimentary Meal/Snacks</span> </a>
												</div>
											</div>

											<div class="col-md-2 col-sm-2 col-xs-6 departure modalDept">
												<div class="flight-timings">
													<p class="h4">
														<i class="tayyarah-plane"></i>{{(flightSegments.segments[0].depTime)}}
													</p>
													<span>{{flightSegments.segments[0].ori}}</span>
												</div>
											</div>
											<div class="arrive col-md-2 col-sm-2 col-xs-6 modalDept">
												<div class="flight-timings">
													<p class="h4">
														<i class="tayyarah-fighter-jet"></i>
														{{(flightSegments.segments[flightSegments.segments.length
														- 1].arrTime)}}
													</p>
													<span>{{flightSegments.segments[flightSegments.segments.length
														- 1].dest}}</span>
												</div>
											</div>
											<div class="duration col-md-2 col-sm-2 col-xs-2 modalDept">
												<div class="flight-timings">
													<p class="h4">
														<i class="tayyarah-clock-o"></i>{{flightSegments.segments
														| totaltime:'mm':'hhhmmm':false}}
													</p>
													<span data-ng-show="flightSegments.segments.length == 1">{{flightSegments.segments.length
														- 1}} Stop</span> <span
														data-ng-show="flightSegments.segments.length == 2">{{flightSegments.segments.length
														- 1}} Stop</span> <span
														data-ng-show="flightSegments.segments.length > 2">{{flightSegments.segments.length
														- 1}} Stops</span>
												</div>
											</div>
											<div
												class="duration pricebar-two col-md-2 col-sm-2 col-xs-12">
												<div class="flight-timings mobfont600 text-center">
													<i data-ng-class="classname"></i>
													<!-- {{getconvertedcurrency(fareFlightSegments.totalPrice)}} -->
													{{numberWithCommas(getconvertedcurrency(fareFlightSegments.totalPrice))}}
													<span class="refund col-md-12 font10">{{isRefuntable(fareFlightSegments.refundable)}}</<span>
															<!--  <a href="#" class="btn btn-primary but btn-clean button-dropdown"> Select</a> -->
												</div>
											</div>
										</div> <!-- single-row-ends -->
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
			<div class="modal-footer">
				<div class="col-md-12">

					<form name="lowfarebook" id="continueBookingform">
						<div ng-init="value = 1"
							class="col-md-12 col-sm-12 col-xs-12 reviewRow">

							<div class="row ">
								<div class="col-md-4 col-sm-4 col-xs-4 padZero">
									<input id="radio1" type="radio" class="inlineradio"
										name="radio" value="1" ng-model="value"
										ng-change='newValue(value)' required> <label
										for="radio1" class="inlineradio">Does not suit my
										schedule</label>
								</div>
								<div class="col-md-4 col-sm-4 col-xs-4 padZero">
									<input id="radio2" type="radio" name="radio"
										class="inlineradio" value="2" ng-model="value"
										ng-change='newValue(value)' required> <label
										for="radio2" class="inlineradio">Penalty/Refund
										restriction</label>
								</div>
								<div class="col-md-4 col-sm-4 col-xs-4 padZero">
									<input id="radio3" type="radio" name="radio"
										class="inlineradio" value="3" ng-model="value"
										ng-change='newValue(value)' required> <label
										for="radio3" class="inlineradio">Alternate corporate
										preferred fare selected </label>
								</div>
							</div>
							<div class="row  ">
								<div class="col-md-4 col-sm-4 col-xs-4 padZero">
									<input id="radio4" type="radio" name="radio"
										class="inlineradio" value="4" ng-model="value"
										ng-change='newValue(value)' required> <label
										for="radio4" class="inlineradio">Policy exception
										approval obtained</label>
								</div>
								<div class="col-md-4 col-sm-4 col-xs-4 padZero">
									<input id="radio5" type="radio" name="radio"
										class="inlineradio" value="5" ng-model="value"
										ng-change='newValue(value)' required> <label
										for="radio5" class="inlineradio">Personal preference </label>
								</div>
								<div class="col-md-4 col-sm-4 col-xs-4 padZero">
									<input id="radio6" type="radio" name="radio"
										class="inlineradio" value="6" ng-model="value"
										ng-change='newValue(value)' required> <label
										for="radio6" class="inlineradio">Location does not
										suit me </label>
								</div>
							</div>
							<div class="row padZero">
								<div class="col-md-4 col-sm-4 col-xs-4 padZero">
									<input id="radio7" type="radio" name="radio"
										class="inlineradio" value="7" ng-model="value"
										ng-change='newValue(value)' required> <label
										for="radio7" class="inlineradio">Compliant to the
										company Travel Allowance Policy </label>
								</div>
								<div class="col-md-5 col-sm-5 col-xs-5 padZero">

									<input id="radio8" type="radio" value="8" class="inlineradio"
										name="radio" ng-model="value" ng-change='newValue(value)'
										required> <label for="radio8" class="inlineradio">Any
										other Reason</label> <input id="resText" type="text" name="resText"
										value="" disabled style="margin-right: 40px;">
								</div>
							</div>
						</div>
						<button class="btn btn-default bordergrey" data-dismiss="modal">Cancel</button>


						<button class="btn btn-info mobContinue"
							ng-click="continueonWardBooking(FlightType)">Continue</button>
					</form>


				</div>
			</div>
		</div>

	</div>
</div>
<script src="js/grid.js"></script>

<script type="text/ng-template" id="customTemplate.html">
  <a>
      <span bind-html-unsafe="match.label | typeaheadHighlight:query"></span>
      <i></i>
  </a>
</script>
<script>
	$('#mark').click(function() {
		if ($("#markup").is(':visible') == false)
			$("#markup").show("slow");
		else
			$("#markup").hide();
	});
</script>

<script>
	$("#myQuotation").click(
			function() {
				jQuery.noConflict();
				$('#myModalQuotation').modal('show');
				angular.element(document.getElementById('myModalQuotation'))
						.scope().showallquotes();
			});
</script>
<div class="container" data-ng-show="errordiv" data-ng-cloak>
	<div class="custom-er">
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
</div>

<script src="js/tayycustom.js"></script>
<script src="js/tayyarahcommon.js"></script>

