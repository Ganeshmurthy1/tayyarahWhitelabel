
<%@taglib prefix="s" uri="/struts-tags"%>
<div class="col-md-12 col-sm-12 col-xs-12 mainContentHotelHeight500px"
	id="hotel">
	<!--  <div id="loading-bar-container" data-ng-show="loadpricebar" class="hidden-xs"></div> -->
	<div class="col-md-12" data-ng-show="loadpricebar">
		<div class="bar hidden-xs"></div>
		<span><b class="LoadingText col-md-12">Please wait while
				we check for the lowest rates and availability...</b></span>
	</div>
	<div class="scrollHotelTrails">
		<!--     Search again -->
		<div class="row hotelredefine" id="changerefine"
			data-ng-hide="isQuoteAvail">
			<div class="col-md-10 col-sm-10 col-xs-12 clearfix">
				<div class="row">
					<div class="col-md-3 col-sm-3 col-xs-12 searched-city padLR0Px">
						<span class="col-md-12 col-sm-12 col-xs-3 padLR0Px">City</span>
						<p class="col-md-12 col-sm-12 col-xs-9 searchCity padLR0Px">
							{{searchcityname}}</p>
					</div>

					<div class="col-md-2 col-sm-2 col-xs-12 searched-date padLR0Px">
						<span class="col-md-12 col-sm-12 col-xs-3 padLR0Px">Check-In</span>
						<p class="col-md-12 col-sm-12 col-xs-9 padLR0Px">
							<span>{{datestart}}</span>
						</p>
					</div>

					<div class="col-md-2 col-sm-2 col-xs-12 searched-date padLR0Px">

						<span class="col-md-12 col-sm-12 col-xs-3 padLR0Px">Check-Out</span>
						<p class="col-md-12 col-sm-12 col-xs-9 padLR0Px">
							<span>{{dateend}}</span>
						</p>

					</div>
					<div class="col-md-5 col-sm-5 col-xs-12 searched-economy padLR0Px">

						<span class="col-md-12 col-sm-12 col-xs-3 padLR0Px">Detail</span>
						<p class="col-md-12 col-sm-12 col-xs-9 padLR0Px">
							<span>{{noofadults}} Adult(s) {{noofchilds}} Child(s) in
								{{noofrooms}} Room(s)</span>
						</p>


					</div>
				</div>
			</div>
			<div class="col-md-2 col-sm-2 col-xs-12">
				<div class="margin">
					<div class="button-group clean">
						<a class="btn btn-info btn-clean button-dropdown hidden-xs"
							id="changebutton"> <span class="hidden-xs"
							data-toggle="dropdown">Modify Search <i
								class="tayyarah-angle-double-right"></i></span>
						</a> <a
							class="btn btn-info but btn-clean offcanvas__trigger--open btn offclose mobrefine"
							data-rel="searchrefine" href="#"><span>Modify Search <i
								class="tayyarah-search"></i></span> </a>
					</div>
				</div>
			</div>
		</div>


		<!-- Change -->


		<!-- this is hided div on click it is to be displayed -->
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
						id="hky">
					<input type="hidden" name="ccy"
						value="<s:property value="%{#session.agent.currencyCode}"/>"
						id="hccy">
				</s:if>
				<s:else>
					<input type="hidden" id="hky" name="ay" value="{{appkey}}">
					<input type="hidden" name="ccy" id="hccy" value="INR">
				</s:else>
				<input type="hidden" name="request_locale" id="hotelrequestlocale"
					value="">
				<div class="row">
					<div class="col-sm-10 clearfix">
						<div class="col-sm-3 xs-mod-name clearfix">
							<div class="form-group">
								<div class="input-group">
									<!--  <input type="text" class="form-control" id="city" placeholder="City" name="city" autocomplete="off" required> -->


									<input type="text" class="form-control" placeholder="City"
										id="hotelcity" name="cityname" data-ng-model="searchcityname"
										onkeypress="return isAlphabetKeywithspace(event,this);"
										autocomplete="off"> <input type="hidden"
										name="citycode" id="citycode" value="{{hoteluser.citycode}}">
								</div>
								<div class="ttst" id="errori"></div>
							</div>
						</div>

						<div id="hdepe"></div>
						<div class="col-sm-2 clearfix">
							<div class="form-group">
								<div class="input-group">
									<input type="text" class="form-control o-c-s" name="datestart"
										id="datein" data-ng-model="datestart" placeholder="Check in"
										onkeydown="return false;">
								</div>
								<div class="ttst" id="errdep"></div>
							</div>
						</div>

						<div class=" col-sm-2 clearfix">
							<div class="form-group">
								<div class="input-group">
									<input type="text" class="form-control o-c-s" name="dateend"
										id="dateout" data-ng-model="dateend" placeholder="Check out"
										onkeydown="return false;">
								</div>
								<div class="ttst" id="errarr"></div>
							</div>
						</div>

						<div class="col-sm-5 clearfix">
							<div class="form-group">
								<!-- <label for="inputAdult">Details</label> -->
								<div id="dropdown">
									<span><span id="totalpeopletext">{{noofadults}}</span>
										Adult(s) <span id="totalchildtext">{{noofchilds}}</span>
										Child(s) in <span id="totalroomtext">{{noofrooms}}</span>
										Room(s)</span>

								</div>
							</div>
						</div>


						<div class="dropdownwrap" style="display: none;">
							<div class="col-sm-12 clearfix">
								<div class="form-group">
									<label for="inputGroupSuccess2">Room(s)</label>
									<div class="input-group">

										<select class="form-control" name="rooms" id="totalrooms"
											onchange="AddChangeRooms()" required>
											<option>1</option>
											<option>2</option>
											<option>3</option>
											<option>4</option>

										</select>
									</div>
								</div>
							</div>

							<div class="hotel-repeat ">
								<!-- groweble div in hotel -->

								<div class="row" id="rowid1" data-index='1'>

									<div class="col-md-3 col-sm-2 clearfix rooms-multiple">
										<p class="ro-heading">Room 1:</p>
									</div>

									<!-- <p>Room1</p> -->
									<div class="col-md-4 col-sm-5 clearfix">
										<div class="form-group">
											<label for="inputGroupSuccess2">Adult(s)</label>
											<div class="input-group">

												<select class="form-control" name="Adults1" id="Room1Adult"
													required onchange="FirstRoomChangeAdult()">
													<option>1</option>
													<option>2</option>
													<option>3</option>
													<option>4</option>
												</select>
											</div>
										</div>
									</div>

									<div class="col-md-4 col-sm-5 clearfix">
										<div class="form-group">
											<label for="inputGroupSuccess2">Child(s)</label>


											<div class="input-group">
												<!-- <span > Room 1</span> -->


												<select class="form-control" id="Childs" name="Childs1"
													required onchange="FirstrowChildchange('1')">
													<option>0</option>
													<option>1</option>
													<option>2</option>
													<option>3</option>
													<option>4</option>
													<option>5</option>
												</select>
											</div>
										</div>
									</div>



									<div class="col-sm-2 clearfix Room1Child1 AgeDivWidth"
										id="c-age" style="display: none;">
										<div class="form-group">
											<label for="inputGroupSuccess2">Age 1</label>
											<div class="input-group ">

												<select class="form-control" name="Age1" id="room1Age1"
													required>
													<option value="1">< 1</option>
													<option>1</option>
													<option>2</option>
													<option>3</option>
													<option>4</option>
													<option>5</option>
													<option>6</option>
													<option>7</option>
													<option>8</option>
													<option>9</option>
													<option>10</option>
													<option>11</option>
												</select>
											</div>
										</div>
									</div>

									<div class="col-sm-2 clearfix Room1Child2 AgeDivWidth"
										id="c-age" style="display: none;">
										<div class="form-group">
											<label for="inputGroupSuccess2">Age 2</label>
											<div class="input-group ">

												<select class="form-control" name="Age1" id="room1Age2"
													required>
													<option value="1">< 1</option>
													<option>1</option>
													<option>2</option>
													<option>3</option>
													<option>4</option>
													<option>5</option>
													<option>6</option>
													<option>7</option>
													<option>8</option>
													<option>9</option>
													<option>10</option>
													<option>11</option>
												</select>
											</div>
										</div>
									</div>

									<div class="col-sm-2 clearfix Room1Child3 AgeDivWidth"
										id="c-age" style="display: none;">
										<div class="form-group">
											<label for="inputGroupSuccess2">Age 3</label>
											<div class="input-group ">

												<select class="form-control" name="Age1" id="room1Age3"
													required>
													<option value="1">< 1</option>
													<option>1</option>
													<option>2</option>
													<option>3</option>
													<option>4</option>
													<option>5</option>
													<option>6</option>
													<option>7</option>
													<option>8</option>
													<option>9</option>
													<option>10</option>
													<option>11</option>
												</select>
											</div>
										</div>
									</div>

									<div class="col-sm-2 clearfix Room1Child4 AgeDivWidth"
										id="c-age" style="display: none;">
										<div class="form-group">
											<label for="inputGroupSuccess2">Age 4</label>
											<div class="input-group ">
												<select class="form-control" id="room1Age4" name="Age1"
													required>
													<option value="1">< 1</option>
													<option>1</option>
													<option>2</option>
													<option>3</option>
													<option>4</option>
													<option>5</option>
													<option>6</option>
													<option>7</option>
													<option>8</option>
													<option>9</option>
													<option>10</option>
													<option>11</option>
												</select>
											</div>
										</div>
									</div>

									<div class="col-sm-2 clearfix Room1Child5 AgeDivWidth"
										id="c-age" style="display: none;">
										<div class="form-group">
											<label for="inputGroupSuccess2">Age 5</label>
											<div class="input-group ">

												<select class="form-control" id="room1Age5" name="Age1"
													required>
													<option value="1">< 1</option>
													<option>1</option>
													<option>2</option>
													<option>3</option>
													<option>4</option>
													<option>5</option>
													<option>6</option>
													<option>7</option>
													<option>8</option>
													<option>9</option>
													<option>10</option>
													<option>11</option>
												</select>
											</div>
										</div>
									</div>


								</div>
								<div class="hotel-repeatadd"></div>
								<div class="clearfix text-right">
									<button type="button" class="btn btn-info" id="but-up">Done</button>
								</div>
							</div>
						</div>
					</div>

					<div class="col-sm-2 col-xs-12 ">
						<div class="margin xs-hotel-btn col-xs-8">
							<div class="btn-group clean">
								<input type="submit"
									class="btn btn-info btn-clean button-dropdown"
									data-ng-click="submitted == true" value="Search">
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>


		<div class="clearfix">
			<div class="col-xs-12 clearfix">
				<s:if
					test="#session['agent'] == null || #session.isCorporate == true">
					<div class="row clearfix" data-ng-hide="HotelFoundBar">
						<div class="clearfix">
							<div class="sort-by-section clearfix box">
								<div class="found-details col-sm-6 clearfix">
									<h4 class="sort-by-title block-sm">
										Found <span>{{(Roomstaylist | filter:filterprices |
											filter:LocationFilter | filter:AmenitiesFilter |
											filter:RatingFilter | filter:HotelnameFilter).length}}</span>
										Hotel(s)
									</h4>
								</div>
								<ul class="sort-bar clearfix block-sm col-sm-6">
									<li id="offnone"><a class="sort-by-container clearfix">
											<span class="offcanvas__trigger--open h-filters filterone"
											data-rel="one"><i class="tayyarah-th"></i>Filters</span>
									</a></li>
									<li class="sort-by-name s-price">Sort by:<a href=""
										data-ng-click="pricesort(Roomstaylist)"
										class="sort-by-container"> Price </a></li>

									<li class="sort-by-name">Sort by:<a href=""
										data-ng-click="starsort(Roomstaylist)"
										class="sort-by-container"> Stars </a></li>
								</ul>
							</div>
						</div>
					</div>
				</s:if>
				<s:else>
					<div class="row clearfix">

						<div class="clearfix">
							<div class="sort-by-section clearfix box">
								<div class="found-details col-xs-3">
									<h4 class="sort-by-title block-sm">
										Found <span>{{(Roomstaylist | filter:filterprices |
											filter:LocationFilter | filter:AmenitiesFilter |
											filter:RatingFilter | filter:HotelnameFilter
											|filter:HotelModeFilter).length}}</span> Hotel(s)
									</h4>
								</div>
								<s:if test="#session['agent'] != null">
									<ul class="sort-bar clearfix block-sm col-xs-9">
										<li><a href="javascript:void(0);"
											class="sort-by-price clearfix"> <label id="mark">Add
													Markup </label>
												<form class="form-inline" id="markup"
													data-ng-submit="addmarkup()" style="display: none;">
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
										</a></li>
										<li data-ng-show="{{user.isDynamicMarkup ==undefined}}"
											style="display: none;" id="appliedmarkup"><a href="#"
											class="sort-by-price pull-right"> <label
												id="appliedmarkamt"> </label>
										</a></li>
										<li data-ng-show="{{user.isDynamicMarkup != undefined}}"
											id="appliedmarkup"><a class="sort-by-price pull-right">
												<label id="appliedmarkamt">Markup Applied
													{{markupammount}} </label>
										</a></li>
										<li class="sort-by-name">Sort:<a href=""
											data-ng-click="pricesort(Roomstaylist)"
											class="sort-by-container"> Price </a></li>
										<li class="sort-by-name">Sort by:<a href=""
											data-ng-click="starsort(Roomstaylist)"
											class="sort-by-container"> Stars </a></li>
									</ul>
								</s:if>
							</div>
						</div>
					</div>
				</s:else>
				<div class="row clearfix scrollHotels">
					<div class="hotels-booking-list clearfix corporate-hoverable"
						data-dir-paginate="Roomstay in Roomstaylist | filter:filterprices | filter:LocationFilter | filter:AmenitiesFilter | filter:RatingFilter| filter:HotelnameFilter | filter:HotelModeFilter | itemsPerPage:50">
						<div class="clearfix hotels-booking-item">
							<div class="col-xs-3 col-sm-3">
								<div class="hotel-img"
									data-ng-if="Roomstay.basicPropertyInfo.imageurl!=undefined">
									<img data-ng-src="{{fullimageview(Roomstay)}}"
										alt="{{Roomstay.basicPropertyInfo.hotelName}}"
										title="{{Roomstay.basicPropertyInfo.hotelName}}"
										class="img-responsive" width="125px" height="125px;"
										data-ng-cloak>
								</div>
							</div>
							<div class="col-xs-9 col-sm-9">
								<div class="row">
									<div class="col-xs-6">
										<div class="hot-hd">
											<h4>
												<a id="hotelnamelink">{{Roomstay.basicPropertyInfo.hotelName}}</a>
											</h4>
											<h6>{{Roomstay.basicPropertyInfo.address.addressLines[0]}}</h6>

											<p class="qick">
												<a data-ng-click="mapview(Roomstay)"><i
													class="tayyarah-map-marker"></i> View Map</a>
												<!-- - <a href="#" data-toggle="modal" data-target="#myModal1"  ng-click="picview(Roomstay);"><i class="tayyarah-eye"></i> Quick View</a> -->
											</p>

											<ul class="aminities">
												<li
													data-ng-show="CheckAmenities('Laundry facilities',Roomstay.basicPropertyInfo.hotelAmenities)"><a
													href="#" data-toggle="tooltip" title="Laundray"><i
														class="tayyarah-local_laundry_service"></i></a></li>
												<li
													data-ng-show="CheckAmenities('Coffee shop or cafe',Roomstay.basicPropertyInfo.hotelAmenities)"><a
													href="#" data-toggle="tooltip" title="Cafe"><i
														class="tayyarah-coffee"></i></a></li>
												<li
													data-ng-show="CheckAmenities('Bar',Roomstay.basicPropertyInfo.hotelAmenities)"><a
													href="#" data-toggle="tooltip" title="Bar"><i
														class="tayyarah-beer"></i></a></li>
												<li
													data-ng-show="CheckAmenities('Restaurant',Roomstay.basicPropertyInfo.hotelAmenities)"><a
													href="#" data-toggle="tooltip" title="Restaurant"><i
														class="tayyarah-cutlery"></i></a></li>
												<li
													data-ng-show="CheckAmenities('WIFI',Roomstay.basicPropertyInfo.hotelAmenities)"><a
													href="#" data-toggle="tooltip" title="WIFI"><i
														class="tayyarah-wifi"></i></a></li>

											</ul>

										</div>
									</div>
									<div class="col-xs-2 h-revi">

										<!--    <p class="clearfix"><img src="images/trip.png" class="img-responsive"></p> -->

										<p class="clearfix"
											data-ng-if="Roomstay.basicPropertyInfo.hotel_Star  > 0 ">
											<a class="tayyarah-star"
												data-ng-repeat="i in getNumber(Roomstay.basicPropertyInfo.hotel_Star) track by $index"></a>
										</p>

										<div class="ratings"
											data-ng-if="Roomstay.basicPropertyInfo.reviewRating > 0 ">
											<span class="r-colr">{{Roomstay.basicPropertyInfo.reviewRating}}</span>
											/ 5
										</div>

										<!--  <span class="ratings">4.5 / <span class="r-colr">5</span></span>
                                          </p>
                                           -->
										<span
											data-ng-if="Roomstay.basicPropertyInfo.reviewRating > 0 ">{{Roomstay.basicPropertyInfo.reviewCount}}
											reviews</span>
									</div>
									<div class="col-sm-4 text-center">
										<!--  <a href="#">Free Cancelation</a> -->

										<s:if test="#session['agent'] != null">

											<div class="choose-sec newChoose">
												<p class="h3">
													<i class="tayyarah-inr"></i> <span>{{convertrateintoint(Roomstay.basicPropertyInfo.bookingPrice)}}</span>
												</p>
												<form data-ng-click="hotelRoomDetail($index+1)">
													<input type="hidden" name="totalroomwithpersons"
														value="{{totalroomwithpersons}}"
														id="roomtotalPerson-{{$index+1}}"> <input
														type="hidden" name="ay" value="{{appkey}}"
														id="roomApkey-{{$index+1}}"> <input type="hidden"
														name="sky" value="{{searchkey}}"
														id="roomsearchKey-{{$index+1}}"> <input
														type="hidden" name="hcode"
														value="{{gethotelcode(Roomstay.basicPropertyInfo.hotelCode)}}"
														id="hotelCode-{{$index+1}}"> <input type="submit"
														data-ng-submit="submitted == true"
														class="btn btn-info but btn-clean button-dropdown"
														value="Choose Room"
														data-ng-hide="ChooseRoomButtonQuotation">
												</form>
												<!-- <form id="roomform"> -->
												<form id="roomQuoteform" data-ng-show="isQuoteAvail">
													<input type="hidden" name="totalroomwithpersons"
														value="{{totalroomwithpersons}}"> <input
														type="hidden" name="ay" value="{{appkey}}"> <input
														type="hidden" name="sky" value="{{searchkey}}"> <input
														type="hidden" name="cityname" value="{{searchcityname}}">
													<input type="hidden" name="citycode"
														value="{{searchcitycode}}"> <input type="hidden"
														name="datestart" value="{{datest}}"> <input
														type="hidden" name="dateend" value="{{dateen}}"> <input
														type="hidden" name="hcode"
														value="{{gethotelcode(Roomstay.basicPropertyInfo.hotelCode)}}">
													<input type="button"
														class="btn btn-info but btn-clean button-dropdown quoteBtn"
														value="Choose Room Quote" id="btn{{$index}}"
														data-ng-click="getroomdetails(Roomstay.basicPropertyInfo.hotelCode,$index)">
													<div id="load_{{$index}}" style="display: none;">
														<img src="images/divloading.gif">
													</div>
												</form>

												<span class="refundround"
													data-ng-if="Roomstay.basicPropertyInfo.isOfflineBooking">
													{{isofflineHotel(Roomstay.basicPropertyInfo.isOfflineBooking)}}</span>
											</div>

										</s:if>
										<s:else>

											<div class="choose-sec newChoose">
												<p class="h3">
													<i class="tayyarah-inr"></i> <span>{{convertrateintoint(Roomstay.basicPropertyInfo.bookingPrice)}}</span>
												</p>
												<form data-ng-click="hotelRoomDetail($index+1)">
													<input type="hidden" name="totalroomwithpersons"
														value="{{totalroomwithpersons}}"
														id="roomtotalPerson-{{$index+1}}"> <input
														type="hidden" name="ay" value="{{appkey}}"
														id="roomApkey-{{$index+1}}"> <input type="hidden"
														name="sky" value="{{searchkey}}"
														id="roomsearchKey-{{$index+1}}"> <input
														type="hidden" name="hcode"
														value="{{gethotelcode(Roomstay.basicPropertyInfo.hotelCode)}}"
														id="hotelCode-{{$index+1}}"> <input type="submit"
														data-ng-submit="submitted == true"
														class="btn btn-info but btn-clean button-dropdown"
														value="Choose Room">
												</form>
												<span class="refundround"
													data-ng-if="Roomstay.basicPropertyInfo.isOfflineBooking">
													{{isofflineHotel(Roomstay.basicPropertyInfo.isOfflineBooking)}}</span>
											</div>
										</s:else>
									</div>
								</div>

							</div>
						</div>
					</div>

					<div class="modal fade" id="QuoteModal" role="dialog">
						<div class="modal-dialog ModalWidth1150px">

							<!-- Modal content-->
							<div class="modal-content">
								<div class="modal-header model-header-Quote">
									<button type="button" class="close" data-dismiss="modal">&times;</button>
									<h4 class="modal-title">Room Types</h4>
									<h5>
										Total Rooms selected : <span>{{roomreqsarray.length}}</span>
									</h5>
								</div>
								<div class="mod-fli-de clearfix">
									<div class="m-city m-city-Quote">
										<div class="blocks-Quote"
											data-ng-repeat="(roomReqIndex, roomReq) in roomreqsarray ">
											<p>
												Room {{roomReq.reqindex + 1}} : <span class="ty-blue"
													id="room{{roomReqIndex+1}}"> {{roomReq.name}}</span>
											</p>
										</div>
									</div>
									<div class="m-price">
										<p>Total Room Price</p>
										<span><i class="tayyarah-inr"></i> <span>
												{{getTotal()}} /per night</span> </span> <input type="button"
											data-ng-click="selectandadded(profileForm.$valid)"
											class="btn btn-info but btn-clean button-dropdown"
											id="selectandadd" value="add">

									</div>
								</div>

								<div class="modal-body model-body-Quote">
									<div id="choose">
										<div class="panel-group" id="accordion"
											data-ng-show="roomloader">
											<div class="panel-group" id="accordion">
												<div class="panel panel-default"
													data-ng-repeat="(roomReqIndex, obj) in indexarray ">
													<div class="hotel-roomselecting-Quote clearfix">
														<a data-toggle="collapse" class="accordiontoggle"
															data-parent="#accordion"
															data-target="#collapse{{(roomReqIndex) + 1}}"> ROOM :
															{{(roomReqIndex) + 1}}</a>
														<div id="collapse{{(roomReqIndex) + 1}}"
															class="panel-collapse collapse"
															data-ng-class="{'in':roomReqIndex==0}">


															<div class="hotel-room-showing">
																<div id="standared" class="roomtype">
																	<div class="col-sm-12 clearfix" id="r-type">
																		<div class="room-type">
																			<ul class="room-heading clearfix">
																				<li class="r_type">Room Type</li>
																				<li class="r_inclusions">Inclusions</li>
																				<li class="r_price">Price</li>
																				<li class="r_select">Select</li>
																			</ul>
																			<div class="clearfix room-type-repeat"
																				data-ng-repeat="(roomindex, room) in GetRoomRequestOptions(roomReqIndex, HotelResult.roomRates.roomRates)">

																				<label id="{{room.RoomIndex}}"
																					class="roomtype{{roomReqIndex}}"> <!-- removed gere to loop rooms with out select option:: data-ng-style="roomindex != 0 && {'display':'none'}" -->


																					<ul class="room-type-desc clearfix">
																						<li class="name">

																							<p>{{getselectroomtype(room.RoomIndex)}}</p>
																							<figure
																								data-ng-if="getroomimage(room.roomTypeCode)!= '' ">
																								<img
																									data-ng-src="{{getroomimage(room.roomTypeCode)}}"
																									alt="hotel-img" data-ng-cloak>
																								<figcaption>
																									<!-- <h4>{{getselectroomtype(room.RoomIndex)}}</h4> -->
																								</figcaption>
																							</figure>

																						</li>
																						<li class="faci"><span
																							data-ng-repeat="amenity in getamenityType(room.roomTypeCode,roomindex) track by $index">
																								{{amenity}}</span></li>

																						<li class="price">
																							<p class="h3">
																								<i class="tayyarah-inr"></i>{{getroomrate(room.bookingCode)}}
																								<span>per room / per night</span>
																							</p>
																							<div class="free-cancelation">
																								<a data-target="#cancelPolicy"
																									data-toggle="modal" class="cancelpolicymodel"
																									data-rateplancode="{{room.ratePlanCode}}"
																									data-roomindex="{{roomindex}}"><i
																									class="tayyarah-info-circle"></i> <span>Cancellation
																										Policy</span></a>

																							</div>
																						</li>

																						<li class="bok-ty">
																							<!-- {{room.price}} --> <span class="highlight"
																							data-ng-if="roomReqIndex == 0"> <input
																								type="radio" name="rad{{roomReqIndex}}"
																								data-ng-value="{{room.RoomIndex}}"
																								data-ng-model="room0"
																								data-ng-click="selectandchange(roomReqIndex, room.RoomIndex,$event);"
																								id="rc{{roomReqIndex}}"> <b>Select</b>
																						</span> <span class="highlight"
																							data-ng-if="roomReqIndex == 1"> <input
																								type="radio" name="rad{{roomReqIndex}}"
																								data-ng-value="{{room.RoomIndex}}"
																								data-ng-model="room1"
																								data-ng-click="selectandchange(roomReqIndex, room.RoomIndex,$event);"
																								id="rc{{roomReqIndex}}"> <b>Select</b>
																						</span> <span class="highlight"
																							data-ng-if="roomReqIndex == 2"> <input
																								type="radio" name="rad{{roomReqIndex}}"
																								data-ng-value="{{room.RoomIndex}}"
																								data-ng-model="room2"
																								data-ng-click="selectandchange(roomReqIndex, room.RoomIndex,$event);"
																								id="rc{{roomReqIndex}}"> <b>Select</b>
																						</span> <span class="highlight"
																							data-ng-if="roomReqIndex == 3"> <input
																								type="radio" name="rad{{roomReqIndex}}"
																								data-ng-value="{{room.RoomIndex}}"
																								data-ng-model="room3"
																								data-ng-click="selectandchange(roomReqIndex, room.RoomIndex,$event);"
																								id="rc{{roomReqIndex}}"> <b>Select</b>
																						</span>
																						</li>
																					</ul>
																				</label>
																			</div>




																		</div>
																	</div>

																</div>
															</div>
															<!-- col-12 -->


														</div>
													</div>
												</div>

												<!-- standared -->


											</div>
										</div>
									</div>
								</div>
								<div class="modal-footer"></div>
							</div>

						</div>
					</div>


					<!-- end show rooms -->
					<div style="text-align: center" data-ng-show="pagination">
						<dir-pagination-controls max-size="5" direction-links="true"
							boundary-links="true"> </dir-pagination-controls>
					</div>

					<!-- quick view Modal -->
					<div class="modal hotel-mode fade" id="myModal1" tabindex="-1"
						role="dialog" aria-labelledby="myModalLabel">
						<div class="modal-dialog modal-lg" role="document">
							<div class="modal-content">
								<div class="modal-header">
									<button type="button" class="close" data-dismiss="modal"
										aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div class="modal-body clearfix" style="height: 300px;">



									<div class="col-sm-6">

										<!-- bootstrap carousel -->
										<div id="carousel-example-generic" class="carousel slide"
											data-ride="carousel" data-interval="false">
											<!--  Indicators -->
											<!-- Wrapper for slides -->
											<div class="carousel-inner"
												data-ng-if="hotelimages!=undefined">
												<div class="item srle" data-ng-repeat="photo in hotelimages"
													data-ng-class="{'active':isActive($index)}">
													<img data-ng-src='{{photo}}' alt="03"
														class="img-responsive"
														style="height: 282px; width: 450px;">
												</div>
												<!--  Controls -->
												<a class="left carousel-control"
													href="#carousel-example-generic" role="button"
													data-slide="prev"> <span
													class="glyphicon glyphicon-chevron-left"></span>
												</a> <a class="right carousel-control"
													href="#carousel-example-generic" role="button"
													data-slide="next"> <span
													class="glyphicon glyphicon-chevron-right"></span>
												</a>
											</div>

										</div>
									</div>
									<div class="col-sm-6">
										<div class="h-model-details">
											<h4>{{pichotelname}}</h4>
											<span>{{pichoteladdress}}</span>
											<div class="clearfix">
												<ul class="r-b">
													<li><p class="h4">{{noofrooms}}as Rooms
															{{noofnights}} Nights</p></li>
													<li class="pull-right">
														<form action="hotel-detail.jsp" target="_blank">
															<input type="hidden" name="ay" value="{{appkey}}">
															<input type="hidden" name="totalroomwithpersons"
																value="{{totalroomwithpersons}}"> <input
																type="hidden" name="sky" value="{{searchkey}}">
															<input type="hidden" name="hcode"
																value="{{selectedhotelcode}}"> <input
																type="submit"
																class="btn btn-primary but btn-clean button-dropdown"
																value="Choose Room">
														</form>
													</li>
												</ul>

											</div>
											<div class="row">
												<div class="col-sm-6">
													<div class="hotel-u-d">
														<h5>
															<b>Fare details</b>
														</h5>
														<ul class="clearfix">
															<li class="clearfix">Total<span> </span> <span
																class="pull-right"><i class="tayyarah-inr"></i>
																	{{(picprice * noofrooms)* noofnights}}</span></li>
														</ul>
													</div>
												</div>
											</div>
										</div>
									</div>
									<!-- col-6 -->
								</div>
							</div>
						</div>
					</div>
					<!-- model-ends -->

				</div>
			</div>
			<!-- col12 -->

			<div class="modal fade" id="QuoteErrorModal" role="dialog">
				<div class="modal-dialog">

					<!-- Modal content-->
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal">&times;</button>

						</div>
						<div class="modal-body "
							style="margin-top: 20px !important; padding-top: 0px !important;">
							<h2 class="text-center">No Room Found.</h2>
							<h4 class="text-center">Please try Another Hotel.</h4>
						</div>
						<!-- <div class="modal-footer">
										<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
									</div> -->
					</div>

				</div>
			</div>

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
							<div class="row">
								<button type="button" class="btn btn-primary "
									style="margin-left: 165px; margin-top: 40px;"
									data-ng-click="addquotes()">yes</button>
								<button type="button" class="btn btn-default adminModal"
									style="margin-top: 40px;" data-dismiss="modal">No</button>
							</div>
						</div>
					</div>

				</div>
			</div>
			<div class="col-sm-3 display-none" id="three">
				<div class="hotel-b-summary">
					<p>Advertisement</p>
				</div>
			</div>
			<s:if test="#session['agent'] != null">
				<%-- <s:if test="#session['agent'] != null"> --%>
				<div class="corporate-quotation-list" data-ng-show="isQuoteAvail">
					<button type="button" class="btn btn-info btn-lg" id="myQuotation">
						Your Quotation List</button>


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
													+ 1}} </span> <span class="q1"><b>{{quote.hotelName}}</b></span> <span
												class="q2">Room-Type:
													{{decoderoomtype(quote.roomType)}} </span> <span class="q2"><i
													class="tayyarah-inr"></i>{{quote.roomRatePerNight}} </span> <span
												class="q4"><i class="tayyarah-close red"
													data-ng-click="removequote(quote.hotelName)"></i></span></li>
										</ul>

									</div>
								</div>
							</div>
							<div class="modal-footer">

								<!-- <button type="button" class="btn btn-primary"
										data-ng-click="addquotes()">Add Quotation</button> -->
								<button type="button" class="btn btn-primary"
									data-ng-click="addquotesModal()" data-ng-show="quoteloaded">Add
									Quotation</button>
							</div>
						</div>
					</div>
				</div>
			</s:if>
		</div>
		<!-- col-9 -->
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
</div>


<script type="text/javascript">
	
	function myFunction(name, value) {
		var x = document.createElement("INPUT");
		x.setAttribute("type", "hidden");
		x.setAttribute("name", name);
		x.setAttribute("value", decodeURIComponent(value));
		$("#markup").append(x);
	}

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

	$(document).on(
			'click',
			'.accordion',
			function(event) {
				event.stopPropagation();
				var $this = $(this);
				var parent = $this.data('parent');
				var actives = parent && $(parent).find('.collapse.in');
				var href = '#'; // Keeps JSHint from reporting 'href' undefined
				var hasData = '#'; // Keeps JSHint from reporting 'hasData' undefined

				// From bootstrap itself
				if (actives && actives.length) {
					hasData = actives.data('collapse');
					//if (hasData && hasData.transitioning) return;
					actives.collapse('hide');

				}
				make_minus = false;
				if ($this.find('.tayy').hasClass(
						'tayyarah-keyboard_arrow_right')) {
					make_minus = true;
				}

				$('.tayyarah-keyboard_arrow_down').removeClass(
						'tayyarah-keyboard_arrow_down').addClass(
						'tayyarah-keyboard_arrow_right');

				if (make_minus) {
					$this.find('.tayy').removeClass(
							'tayyarah-keyboard_arrow_right').addClass(
							'tayyarah-keyboard_arrow_down');
				}

				var target = $this.attr('data-target')
						|| (href = $this.attr('href'))
						&& href.replace(/.*(?=#[^\s]+$)/, ''); //strip for ie7
				$(target).collapse('toggle');
			});

	$(window).scroll(function() {
		var i = $('#nav');
		var h = i.outerHeight(true);
		if ($(window).scrollTop() > h) {
			if (!i.hasClass('scroll-header'))
				i.hide().addClass('scroll-header').fadeIn("slow");
		}
		if ($(window).scrollTop() >= 250) {
			i.slideDown('slow');
		} else {
			i.removeClass('scroll-header').show();
		}
	});
	$("label.block").click(function() {
		$(this).find('input:radio').attr('checked', true);
		$(this).css({
			'backgroundColor' : "#f1f1f1",
			'color' : "#d56100"
		});

	});

	$('#mark').click(function() {
		if ($("#markup").is(':visible') == false)
			$("#markup").show("slow");
		else
			$("#markup").hide();
	});

	/*   $('#submitmarkup').click(function(){
	  	$('#markup').submit();
	  });  
	 */
	$('.btn-number').click(function(e) {
		e.preventDefault();

		fieldName = $(this).attr('data-field');
		type = $(this).attr('data-type');
		var input = $("input[name='" + fieldName + "']");

		var currentVal = parseInt(input.val());
		console.log(currentVal);
		if (!isNaN(currentVal)) {
			if (type == 'minus') {

				if (currentVal > input.attr('min')) {
					input.val(currentVal - 1).change();
					var total = $('#totaltraveller').val();
					$('#totaltraveller').val(parseInt(total) - 1);
				}
				if (parseInt(input.val()) == input.attr('min')) {
					$(this).attr('disabled', true);
				}

			} else if (type == 'plus') {
				var totallist = $('#totaltraveller').val();
				if (totallist <= 8) {
					if (currentVal < input.attr('max')) {
						input.val(currentVal + 1).change();
						var total = $('#totaltraveller').val();
						$('#totaltraveller').val(parseInt(total) + 1);

					}
					if (parseInt(input.val()) == input.attr('max')) {
						$(this).attr('disabled', true);
					}
				} else {
					// $(this).attr('disabled', true);
				}
			}
		} else {
			input.val(0);
		}

		$('ul.dropdown-menu.mega-dropdown-menu').on('click', function(event) {
			event.stopPropagation();

		});
		$('ul.dropdown-menu.mega-dropdown-menu').on('change', function(event) {
			event.stopPropagation();
		});
	});
	$('.input-number').focusin(function() {
		$(this).data('oldValue', $(this).val());
	});
	$('.input-number').change(
			function() {
				minValue = parseInt($(this).attr('min'));
				maxValue = parseInt($(this).attr('max'));
				valueCurrent = parseInt($(this).val());

				name = $(this).attr('name');
				if (valueCurrent >= minValue) {
					$(
							".btn-number[data-type='minus'][data-field='"
									+ name + "']").removeAttr('disabled')
				} else {
					alert('Sorry, the minimum value was reached');
					$(this).val($(this).data('oldValue'));
				}
				if (valueCurrent <= maxValue) {
					$(
							".btn-number[data-type='plus'][data-field='" + name
									+ "']").removeAttr('disabled')
				} else {
					alert('Sorry, the maximum value was reached');
					$(this).val($(this).data('oldValue'));
				}

			});
	$(".input-number").keydown(function(e) {
		// Allow: backspace, delete, tab, escape, enter and .
		if ($.inArray(e.keyCode, [ 46, 8, 9, 27, 13, 190 ]) !== -1 ||
		// Allow: Ctrl+A
		(e.keyCode == 65 && e.ctrlKey === true) ||
		// Allow: home, end, left, right
		(e.keyCode >= 35 && e.keyCode <= 39)) {
			// let it happen, don't do anything
			return;
		}
		// Ensure that it is a number and stop the keypress 
		/*  if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))) {
		     e.preventDefault();
		 } */
	});

	function AddChangeRooms() {
		var totalrooms = $('#totalrooms').val();
		//console.log(totalrooms);
		$('#totalroomtext').text(totalrooms);
		$('#totalpeopletext').text(totalrooms);
		var addrooms = "";

		$('.hotel-repeatadd').html("");
		for (var i = 0; i < parseInt(totalrooms - 1); i++) {
			// var lastindex = $('.hotel-repeat > .row:last-child').attr("index");

			var index = i + 2;
			addrooms += "<div class='row' id='rowid"+index+"' ><div class='col-sm-2 clearfix rooms-multiple'><p class='ro-heading'>Room"
					+ index
					+ ":</p></div><div class='col-sm-5 clearfix'><div class='form-group'><label for='inputGroupSuccess2'>Adult(s)</label><div class='input-group'> <select class='form-control' name='Adults"
					+ index
					+ "' id='RoomAdult"
					+ index
					+ "' autocomplete='off' required onchange='ChangeRoomDynamicChild("
					+ index
					+ ")'><option>1</option><option>2</option><option>3</option><option>4</option></select></div></div></div>"
					+ "<div class='col-sm-5 clearfix'><div class='form-group'><label for='inputGroupSuccess2'>Child(s)</label><div class='input-group'><select class='form-control' id='Childs"
					+ index
					+ "' name='Childs"
					+ index
					+ "' autocomplete='off' required onchange='InsertAge("
					+ index
					+ ")'><option>0</option> <option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select></div></div></div><div id='childrow"+index+"'></div></div>"
		}
		$('.hotel-repeatadd').append(addrooms);
	}

	function ChangeRoomDynamicChild(roomindex) {

		var totaladult = $('#RoomAdult' + roomindex).val();
		var totalrooms = $('#totalrooms').val();

		$('#Childs' + roomindex).html("");
		if (totaladult == '1') {

			var option = "<option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option> ";
			$('#Childs' + roomindex).append(option);
		}
		if (totaladult == '2') {
			var option = "<option>0</option><option>1</option><option>2</option><option>3</option><option>4</option>";
			$('#Childs' + roomindex).append(option);
		}
		if (totaladult == '3') {
			var option = "<option>0</option><option>1</option><option>2</option><option>3</option>";
			$('#Childs' + roomindex).append(option);
		}
		if (totaladult == '4') {
			var option = "<option>0</option><option>1</option><option>2</option>";
			$('#Childs' + roomindex).append(option);
		}

		$('#childrow' + roomindex).html("");
		if (totalrooms == 1) {
			$('#totalpeopletext').text(parseInt(totaladult));
			$('#totalchildtext').text(parseInt($('#Childs').val()));
		}
		if (totalrooms == 2) {
			$('#totalpeopletext').text(
					parseInt($('#Room1Adult').val())
							+ parseInt($('#RoomAdult2').val()));
			$('#totalchildtext').text(
					parseInt($('#Childs').val())
							+ parseInt($('#Childs2').val()));
		}
		if (totalrooms == 3) {
			$('#totalpeopletext').text(
					parseInt($('#Room1Adult').val())
							+ parseInt($('#RoomAdult2').val())
							+ parseInt($('#RoomAdult3').val()));
			$('#totalchildtext').text(
					parseInt($('#Childs').val())
							+ parseInt($('#Childs2').val())
							+ parseInt($('#Childs3').val()));
		}

		if (totalrooms == 4) {
			$('#totalpeopletext').text(
					parseInt($('#Room1Adult').val())
							+ parseInt($('#RoomAdult2').val())
							+ parseInt($('#RoomAdult3').val())
							+ parseInt($('#RoomAdult4').val()));
			$('#totalchildtext').text(
					parseInt($('#Childs').val())
							+ parseInt($('#Childs2').val())
							+ parseInt($('#Childs3').val())
							+ parseInt($('#Childs4').val()));
		}

		if (totalrooms == 5) {
			$('#totalpeopletext').text(
					parseInt($('#Room1Adult').val())
							+ parseInt($('#RoomAdult2').val())
							+ parseInt($('#RoomAdult3').val())
							+ parseInt($('#RoomAdult4').val())
							+ parseInt($('#RoomAdult5').val()));
			$('#totalchildtext').text(
					parseInt($('#Childs').val())
							+ parseInt($('#Childs2').val())
							+ parseInt($('#Childs3').val())
							+ parseInt($('#Childs4').val())
							+ parseInt($('#Childs5').val()));
		}
		if (totalrooms == 6) {
			$('#totalpeopletext').text(
					parseInt($('#Room1Adult').val())
							+ parseInt($('#RoomAdult2').val())
							+ parseInt($('#RoomAdult3').val())
							+ parseInt($('#RoomAdult4').val())
							+ parseInt($('#RoomAdult5').val())
							+ parseInt($('#RoomAdult6').val()));
			$('#totalchildtext').text(
					parseInt($('#Childs').val())
							+ parseInt($('#Childs2').val())
							+ parseInt($('#Childs3').val())
							+ parseInt($('#Childs4').val())
							+ parseInt($('#Childs5').val())
							+ parseInt($('#Childs6').val()));
		}
	}

	function FirstrowChildchange(rowindex) {

		var total = $('#Childs').val();
		var totalrooms = $('#totalrooms').val();
		if (totalrooms == 1) {
			$('#totalchildtext').text(parseInt(total));
		}
		if (totalrooms == 2)
			$('#totalchildtext').text(
					parseInt($('#Childs').val())
							+ parseInt($('#Childs2').val()));
		if (totalrooms == 3)
			$('#totalchildtext').text(
					parseInt($('#Childs').val())
							+ parseInt($('#Childs2').val())
							+ parseInt($('#Childs2').val()));
		if (totalrooms == 4)
			$('#totalchildtext').text(
					parseInt($('#Childs').val())
							+ parseInt($('#Childs2').val())
							+ parseInt($('#Childs2').val())
							+ parseInt($('#Childs3').val()));
		if (totalrooms == 5)
			$('#totalpeopletext').text(
					parseInt($('#Childs').val())
							+ parseInt($('#Childs2').val())
							+ parseInt($('#Childs2').val())
							+ parseInt($('#Childs3').val())
							+ parseInt($('#Childs4').val()));
		if (totalrooms == 6)
			$('#totalchildtext').text(
					parseInt($('#Childs').val())
							+ parseInt($('#Childs2').val())
							+ parseInt($('#Childs2').val())
							+ parseInt($('#Childs3').val())
							+ parseInt($('#Childs4').val())
							+ parseInt($('#Childs5').val()));

		console.log(total);
		if (total == '0') {
			$('.Room1Child1').hide();
			$('.Room1Child2').hide();
			$('.Room1Child3').hide();
			$('.Room1Child4').hide();
			$('.Room1Child5').hide();
		}

		if (total == '1') {
			$('.Room1Child1').show();
			$('.Room1Child2').hide();
			$('.Room1Child3').hide();
			$('.Room1Child4').hide();
			$('.Room1Child5').hide();
		}
		if (total == '2') {
			$('.Room1Child1').show();
			$('.Room1Child2').show();
			$('.Room1Child3').hide();
			$('.Room1Child4').hide();
			$('.Room1Child5').hide();
		}
		if (total == '3') {
			$('.Room1Child1').show();
			$('.Room1Child2').show();
			$('.Room1Child3').show();
			$('.Room1Child4').hide();
			$('.Room1Child5').hide();
		}
		if (total == '4') {
			$('.Room1Child1').show();
			$('.Room1Child2').show();
			$('.Room1Child3').show();
			$('.Room1Child4').show();
			$('.Room1Child5').hide();
		}
		if (total == '5') {
			$('.Room1Child1').show();
			$('.Room1Child2').show();
			$('.Room1Child3').show();
			$('.Room1Child4').show();
			$('.Room1Child5').show();
		}
	}

	function FirstRoomChangeAdult() {
		var totaladult = $('#Room1Adult').val();
		var totalpeoplelength = $('#totalpeopletext').text();
		var totalrooms = $('#totalrooms').val();

		$('#Childs').html("");
		if (totaladult == '1') {
			var option = "<option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option>";
			$('#Childs').append(option);
		}
		if (totaladult == '2') {
			var option = "<option>0</option><option>1</option><option>2</option><option>3</option><option>4</option>";
			$('#Childs').append(option);
		}
		if (totaladult == '3') {
			var option = "<option>0</option><option>1</option><option>2</option><option>3</option>";
			$('#Childs').append(option);
		}
		if (totaladult == '4') {
			var option = "<option>0</option><option>1</option><option>2</option>";
			$('#Childs').append(option);
		}

		$('.Room1Child1').hide();
		$('.Room1Child2').hide();
		$('.Room1Child3').hide();
		$('.Room1Child4').hide();
		$('.Room1Child5').hide();

		if (totalrooms == 1) {
			$('#totalpeopletext').text(parseInt(totaladult));
			$('#totalchildtext').text(parseInt($('#Childs').val()));
		}
		if (totalrooms == 2) {
			$('#totalpeopletext').text(
					parseInt($('#Room1Adult').val())
							+ parseInt($('#RoomAdult2').val()));
			$('#totalchildtext').text(
					parseInt($('#Childs').val())
							+ parseInt($('#Childs2').val()));
		}
		if (totalrooms == 3) {
			$('#totalpeopletext').text(
					parseInt($('#Room1Adult').val())
							+ parseInt($('#RoomAdult2').val())
							+ parseInt($('#RoomAdult3').val()));
			$('#totalchildtext').text(
					parseInt($('#Childs').val())
							+ parseInt($('#Childs2').val())
							+ parseInt($('#Childs3').val()));
		}

		if (totalrooms == 4) {
			$('#totalpeopletext').text(
					parseInt($('#Room1Adult').val())
							+ parseInt($('#RoomAdult2').val())
							+ parseInt($('#RoomAdult3').val())
							+ parseInt($('#RoomAdult4').val()));
			$('#totalchildtext').text(
					parseInt($('#Childs').val())
							+ parseInt($('#Childs2').val())
							+ parseInt($('#Childs3').val())
							+ parseInt($('#Childs4').val()));
		}

		if (totalrooms == 5) {
			$('#totalpeopletext').text(
					parseInt($('#Room1Adult').val())
							+ parseInt($('#RoomAdult2').val())
							+ parseInt($('#RoomAdult3').val())
							+ parseInt($('#RoomAdult4').val())
							+ parseInt($('#RoomAdult5').val()));
			$('#totalchildtext').text(
					parseInt($('#Childs').val())
							+ parseInt($('#Childs2').val())
							+ parseInt($('#Childs3').val())
							+ parseInt($('#Childs4').val())
							+ parseInt($('#Childs5').val()));
		}
		if (totalrooms == 6) {
			$('#totalpeopletext').text(
					parseInt($('#Room1Adult').val())
							+ parseInt($('#RoomAdult2').val())
							+ parseInt($('#RoomAdult3').val())
							+ parseInt($('#RoomAdult4').val())
							+ parseInt($('#RoomAdult5').val())
							+ parseInt($('#RoomAdult6').val()));
			$('#totalchildtext').text(
					parseInt($('#Childs').val())
							+ parseInt($('#Childs2').val())
							+ parseInt($('#Childs3').val())
							+ parseInt($('#Childs4').val())
							+ parseInt($('#Childs5').val())
							+ parseInt($('#Childs6').val()));
		}

	}

	 var is_mobile = false;
	    if( $('#hdepe').css('display')=='none') {
	        is_mobile = true;       
	    }
	    if (is_mobile == true) {
	    	$('#datein').datepicker({
	    		numberOfMonths : 1,
	    		firstDay : 1,
	    		dateFormat : 'dd/mm/yy',
	    		minDate : '0',

	    		onSelect : function(dateStr) {
	    			var d1 = $(this).datepicker("getDate");
	    			d1.setDate(d1.getDate() + 1); // change to + 1 if necessary
	    			var d2 = $(this).datepicker("getDate");
	    			d2.setDate(d2.getDate() + 31); // change to + 29 if necessary
	    			$("#dateout").datepicker("setDate", null);
	    			$("#dateout").datepicker("option", "minDate", d1);
	    			// $("#twodpd2").datepicker("option", "maxDate", d2);

	    		},
	    		onClose : function(dateSt) {
	    			$("#dateout").focus();
	    		}
	    	});

	    	$("#dateout").datepicker({
	    		numberOfMonths : 1,
	    		firstDay : 1,
	    		dateFormat : 'dd/mm/yy',

	    		onSelect : function(dateStr) {

	    		}
	    	});
	    }
	    if (is_mobile == false) {
	    	$('#datein').datepicker({
	    		numberOfMonths : 2,
	    		firstDay : 1,
	    		dateFormat : 'dd/mm/yy',
	    		minDate : '0',

	    		onSelect : function(dateStr) {
	    			var d1 = $(this).datepicker("getDate");
	    			d1.setDate(d1.getDate() + 1); // change to + 1 if necessary
	    			var d2 = $(this).datepicker("getDate");
	    			d2.setDate(d2.getDate() + 31); // change to + 29 if necessary
	    			$("#dateout").datepicker("setDate", null);
	    			$("#dateout").datepicker("option", "minDate", d1);
	    			// $("#twodpd2").datepicker("option", "maxDate", d2);

	    		},
	    		onClose : function(dateSt) {
	    			$("#dateout").focus();
	    		}
	    	});

	    	$("#dateout").datepicker({
	    		numberOfMonths : 2,
	    		firstDay : 1,
	    		dateFormat : 'dd/mm/yy',

	    		onSelect : function(dateStr) {

	    		}
	    	});
	    }

	function openchangeroom() {
		$('#rowid1').show();
	}
</script>
<script>
	function FirstrowChildchange(rowindex) {

		var total = $('#Childs').val();
		var totalrooms = $('#totalrooms').val();
		if (totalrooms == 1) {
			$('#totalchildtext').text(parseInt(total));
		}
		if (totalrooms == 2)
			$('#totalchildtext').text(
					parseInt($('#Childs').val())
							+ parseInt($('#Childs2').val()));
		if (totalrooms == 3)
			$('#totalchildtext').text(
					parseInt($('#Childs').val())
							+ parseInt($('#Childs2').val())
							+ parseInt($('#Childs2').val()));
		if (totalrooms == 4)
			$('#totalchildtext').text(
					parseInt($('#Childs').val())
							+ parseInt($('#Childs2').val())
							+ parseInt($('#Childs2').val())
							+ parseInt($('#Childs3').val()));
		if (totalrooms == 5)
			$('#totalpeopletext').text(
					parseInt($('#Childs').val())
							+ parseInt($('#Childs2').val())
							+ parseInt($('#Childs2').val())
							+ parseInt($('#Childs3').val())
							+ parseInt($('#Childs4').val()));
		if (totalrooms == 6)
			$('#totalchildtext').text(
					parseInt($('#Childs').val())
							+ parseInt($('#Childs2').val())
							+ parseInt($('#Childs2').val())
							+ parseInt($('#Childs3').val())
							+ parseInt($('#Childs4').val())
							+ parseInt($('#Childs5').val()));

		console.log(total);
		if (total == '0') {
			$('.Room1Child1').hide();
			$('.Room1Child2').hide();
			$('.Room1Child3').hide();
			$('.Room1Child4').hide();
			$('.Room1Child5').hide();
		}

		if (total == '1') {
			$('.Room1Child1').show();
			$('.Room1Child2').hide();
			$('.Room1Child3').hide();
			$('.Room1Child4').hide();
			$('.Room1Child5').hide();
		}
		if (total == '2') {
			$('.Room1Child1').show();
			$('.Room1Child2').show();
			$('.Room1Child3').hide();
			$('.Room1Child4').hide();
			$('.Room1Child5').hide();
		}
		if (total == '3') {
			$('.Room1Child1').show();
			$('.Room1Child2').show();
			$('.Room1Child3').show();
			$('.Room1Child4').hide();
			$('.Room1Child5').hide();
		}
		if (total == '4') {
			$('.Room1Child1').show();
			$('.Room1Child2').show();
			$('.Room1Child3').show();
			$('.Room1Child4').show();
			$('.Room1Child5').hide();
		}
		if (total == '5') {
			$('.Room1Child1').show();
			$('.Room1Child2').show();
			$('.Room1Child3').show();
			$('.Room1Child4').show();
			$('.Room1Child5').show();
		}
	}

	$('a[href="#hotelnamelink"]').click(function(index) {
		console.log('here');
		$("#roomform" + index).submit();

	});
</script>
<script type="text/ng-template" id="myModalContent.html">
<div class="modal-header">
	<button type="button"  class="close" data-ng-click="cancel()">&times;</button>
		<h4 class="modal-title">{{hotelmapname}}</h4>
</div>
<div class="modal-body">	
		<div class="row">
			<map ng-if="$parent.$parent.render" center="[{{$parent.lat}}, {{$parent.lng}}]"  position="{{$parent.lat}}, {{$parent.lng}}" "zoom-control="true" zoom="14" on-click="click()"> 
                    <marker  position="{{$parent.lat}}, {{$parent.lng}}"></marker>
           </map>

</div>
</div>
 </script>
<script>
	$("#myQuotation").click(
			function() {
				jQuery.noConflict();
				//$('#myModalQuotation').modal('show'); 
				angular.element(document.getElementById('myModalQuotation'))
						.scope().showallquotes();
			});
</script>
<script src="js/hotelDefaultLoad.js"></script>
<script src="js/loading-bar.min.js"></script>
<script>
	$(document).ready(function() {
		$("#changebutton").hide();
		$("#changebutton").click(function() {        	
			$("#changerefine").hide();

			$("#searchrefine").show();
		});
	});
   </script>

