<%@taglib prefix="s" uri="/struts-tags"%>
<div class="col-md-12 ">
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

	<div class="login-pop-up clearfix" id="farechangediv"
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
	<div class="col-md-12" data-ng-style="{'display' : display}"
		data-ng-cloak>
		<!-- <div id="loading-bar-container" class="hidden-xs"></div> -->
		<div class="row" data-ng-show="bookconfirmloader">
			<div class="bar hidden-xs"></div>
			<span><b class="LoadingDetailText col-md-12">Please wait
					while we loading hotel summary...</b></span>
		</div>
		<div class="booking-details clearfix">
			<!-- col-3 -->

			<div class="col-md-12 col-sm-12 col-xs-12 padding-0px ">

				<div class="clearfix visible-xs">

					<div id="offnone">
						<a class="sort-by-container clearfix"> <span
							class="offcanvas__trigger--open h-filters" data-rel="fare"><i
								class="tayyarah-th"></i> Fare Details</span>
						</a>
					</div>
				</div>
				<div
					class="booking-details-heading clearfix hidden-xs backgroundWhite">
					<div class="b-d-h-list clearfix">
						<div class="b-d-h-l col-sm-9 col-md-9">
							<div class="col-sm-3">
								<figure>
									<img src="{{hotelimage}}" class="img-responsive" width="305px"
										height="305px;">
								</figure>
							</div>

							<div class="col-md-9 col-sm-9 col-xs-9">
								<div class="bok-con-hotel text-left">
									<h4>
										<a>{{hotelinfo.basicPropertyInfo.hotelName}}</a>
									</h4>
									<h6>{{hotelinfo.basicPropertyInfo.address.addressLines[1]}}
									</h6>
									<p class="clearfix"
										data-ng-if="hotelinfo.basicPropertyInfo.hotel_Star  > 0 ">
										<a href="#" class="fa fa-star"
											data-ng-repeat="i in getNumber(hotelinfo.basicPropertyInfo.hotel_Star) track by $index"></a>
									</p>

								</div>
								<div class="col-md-12 text-left loc-ta PadLeft0px">
									<span class="boldFont font13px">Room Type</span> <span
										data-ng-repeat="roomtype in hotelinfo.roomRates.roomRates">
										: {{getroomtypename(roomtype.roomTypeCode)}}</span>
								</div>
							</div>

						</div>


						<div class="col-md-3 col-sm-3 total-travels padLeftRightZero">
							<div class="h-d-cheko spanShift col-md-12 padLeftRightZero">
								<p class="font13px col-md-12 padLeftRightZero">
									<span class="col-md-4 boldFont padLeftRightZero">Room(s)</span>
									<span class="col-md-8"> : {{searchdata.noofrooms}}</span>
								</p>
								<p class="font13px col-md-12 padLeftRightZero">
									<span class="col-md-4 boldFont padLeftRightZero">Check
										in</span>
									<!-- <time>{{searchdata.datestart | date: 'EEE, MMM d'}}- {{basicinfo.defaultCheckInTime |date:'hh:mm'}}</time> -->
									<span class="font13px col-md-8"> :
										{{searchdata.datestart | date: 'EEE, MMM d'}}</span>
								</p>
								<p class="font13px col-md-12 padLeftRightZero">
									<span class="col-md-4 boldFont padLeftRightZero">Check
										out</span> <span class="font13px col-md-8"> :
										{{searchdata.dateend | date: 'EEE, MMM d'}}</span>
								</p>
							</div>
						</div>
					</div>
				</div>


				<!-- traveler details  -->
				<div class="panel-heading travelHead">
					<h3 class="panel-title display-td">Traveller(s) Details</h3>
				</div>
				<div class="whiteBakground ">
					<form class="form clearfix" name="hotelSummary">
						<input type="hidden" name="totalroomwithpersons"
							value="{{totalroomwithpersons}}" id="totalroomwithpersons">

						<input type="hidden" name="ccy" value="{{basecurrencyname}}"
							id="ccy"> <input name="isQuotation" type="hidden"
							id="isQuotation" value="{{quoteuser.isQuotation}}" /> <input
							name="quotationId" type="hidden" id="quotationId"
							value="{{quoteuser.hotelquotationid}}" />

						<s:if test="#session['agent'] != null">
							<input type="hidden" name="ay" id="appkey"
								value="<s:property value="%{#session.agent.Securityanswer}"/>">
						</s:if>
						<s:else>

							<input type="hidden" name="ay" value="zqJ3R9cGpNWgNXG55ub/WQ=="
								id="appkey">
						</s:else>
						<input type="hidden" name="sky" value="{{searchKey}}" id="sky">
						<input type="hidden" name="apiPro" value="{{apiProvider}}"
							id="apiPro"> <input type="hidden" name="hCode"
							value="{{hotelCode}}" id="hCode"> <input type="hidden"
							name="bCe" value="{{bookingCode}}" id="bCe"> <input
							type="hidden" name="Units" value="{{noofrooms}}" id="Units">


						<s:if test="#session['agent'] != null">
							<input type="hidden" name="ud"
								value="<s:property value="%{#session.agent.id}"/>" id="uid">
							<input type="hidden" name="uname" id="uname"
								value="<s:property value="%{#session.agent.Username}"/>">
							<input type="hidden" name="pmode" id="isagent" value="cash">
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

						</s:if>
						<s:elseif test="#session['user'] != null">
							<input type="hidden" name="ud" id="uid"
								value="<s:property value="%{#session.user.id}"/>">
							<input type="hidden" name="pmode" id="isagent" value="card">
							<input type="hidden" name="uname" id="uname"
								value="<s:property value="%{#session.user.userName}"/>">
						</s:elseif>
						<s:else>
							<input type="hidden" name="ud" id="uid" value="2">
							<input type="hidden" name="pmode" id="isagent" value="card">
							<input type="hidden" name="uname" id="uname" value="DirectUser">
						</s:else>
						<input type="hidden" name="tp" id="totpr"
							value="{{totalpayableamount}}"> <input type="hidden"
							id="dammyva" value="{{totalpayableamount}}"> <input
							type="hidden" id="totpay" value="{{totalamountpayable}}">
						<input type="hidden" id="dammytotpay"
							value="{{totalamountpayable}}">

						<div class="panel panel-default traveler-details">




							<div class="panel-body">
								<div class="col-sm-12"
									data-ng-repeat="(roomindex, roomindexValue) in roomindexes">
									<p class="h4 bb t1-color">Room {{roomindex + 1}}</p>
									<div class="adult clearfix"
										data-ng-repeat="(adultindex, adultindexValue) in adultindexes(roomindex)">
										<div class="form-group clearfix tile-bd1">
											<label class="adultLeft" for="exampleInputName2"
												data-ng-if="roomindex == 0 && adultindex == 0">Adult
												{{adultindex +1}} <span class="block">(Lead Guest)</span>
											</label> <label for="exampleInputName2"
												data-ng-if="roomindex != 0 || adultindex != 0">Adult
												{{adultindex +1}}</label>
										</div>
										<div class="form-group clearfix tile-bd">
											<label for="exampleInputName2">Title</label> <select
												class="form-control" name="adt1"
												id="{{roomindex}}-adult-{{adultindex}}-gender">
												<option>Mr</option>
												<option>Miss</option>
												<option>Mrs</option>
											</select>
										</div>
										<div class="form-group clearfix">
											<label for="exampleInputName2">Given / First Name</label> <input
												type="text" class="form-control" name="adfN1"
												placeholder="Given Name"
												id="{{roomindex}}-adult-{{adultindex}}-fname" maxlength="18"
												autocomplete="off"
												onkeypress="return isAlphabetKey(event,this);"
												value="{{quoteuser.firstname}}" data-ng-required="true">
										</div>

										<div class="form-group clearfix">
											<label for="exampleInputName2">Surname / Last Name</label> <input
												type="text" class="form-control" name="adlN1"
												placeholder="Surname"
												id="{{roomindex}}-adult-{{adultindex}}-lname" maxlength="18"
												autocomplete="off"
												onkeypress="return isAlphabetKey(event,this);"
												value="{{quoteuser.lastname}}" data-ng-required="true">
										</div>

										<input type="hidden" name="age1" value="25"
											id="{{roomindex}}-age-{{adultindex}}"> <input
											type="hidden" name="addob1" value="25/01/1991"
											id="{{roomindex}}-dob-{{adultindex}}"> <input
											type="hidden" class="form-control" name="admN1" value=""
											id="{{roomindex}}-admN1-{{adultindex}}">

									</div>
									<div class="adult clearfix"
										data-ng-repeat="(childindex,child) in childindexes(roomindex)">
										<div class="form-group clearfix tile-bd1">
											<label for="exampleInputName2">Child {{childindex +
												1}}</label>
										</div>

										<div class="form-group clearfix tile-bd">
											<label for="exampleInputName2">Title</label> <select
												class="form-control" name="cht1"
												id="{{roomindex}}-child-{{childindex}}-gender">
												<option>Master</option>
												<option>Miss</option>
											</select>
										</div>
										<div class="form-group clearfix">
											<label for="exampleInputName2">Given / First Name</label> <input
												type="text" class="form-control" name="chfN1"
												id="{{roomindex}}-child-{{childindex}}-fname" maxlength="18"
												placeholder="Given Name" autocomplete="off"
												onkeypress="return isAlphabetKey(event,this);"
												data-ng-model="cfname" data-ng-required="true">
										</div>
										<div class="form-group clearfix">
											<label for="exampleInputName2">Surname / Last Name</label> <input
												type="text" class="form-control" name="chlN1"
												id="{{roomindex}}-child-{{childindex}}-lname" maxlength="18"
												placeholder="Last Name" autocomplete="off"
												onkeypress="return isAlphabetKey(event,this);"
												data-ng-model="clname" data-ng-required="true">
										</div>
										<input type="hidden" name="cha1" value="6"
											id="{{roomindex}}-cage-{{childindex}}"> <input
											type="hidden" name="chdob1" value="25/01/2010"
											id="{{roomindex}}-cdob-{{childindex}}"> <input
											type="hidden" class="form-control" name="chmN1" value=""
											id="chmN1-{{childindex}}">

									</div>
								</div>
							</div>

							<!-- traveler details ends -->
							<!-- billing details  -->

							<div class="panel panel-default traveler-details ">

								<div class="panel-body biil-bd">

									<input type="hidden" name="address" value="bangalore"
										id="address"> <input type="hidden" name="address2"
										value="bangalore" id="address2"> <input type="hidden"
										name="city" value="bangalore" id="city"> <input
										type="hidden" name="state" value="karanataka" id="state">
									<input type="hidden" name="country" value="india" id="country">
									<input type="hidden" name="phone" value="645646464"
										id="telphone"> <input type="hidden" name="zip"
										value="545454" id="zip">

									<div class="biiling-bd2">
										<div class="form-group clearfix bii-bd">
											<label for="exampleInputName2">Mobile</label> <input
												type="tel" class="form-control" name="mobile" id="phone"
												pattern="[0-9]{10}" placeholder="Mobile" maxlength="10"
												onkeypress="return isNumberKey(event,this)"
												autocomplete="off" oninvalid="InvalidMsg(this);"
												oninput="InvalidMsg(this);" data-ng-model="mobile"
												data-ng-required="true">
										</div>

									</div>
									<s:if test="#session['agent'] != null">
										<div class="biiling-bd2">
											<div class="form-group clearfix ">
												<label for="exampleInputName2">Email</label> <input
													type="email" class="form-control" name="email" id="email1"
													placeholder="Email" autocomplete="off"
													value="<s:property value="#session.agent.Email" />"
													oninvalid="InvalidEmailMsg(this);"
													oninput="InvalidEmailMsg(this);">
											</div>
										</div>
									</s:if>
									<s:else>
										<div class="biiling-bd2">
											<div class="form-group clearfix ">
												<label for="exampleInputName2">Email</label> <input
													type="email" class="form-control" name="email" id="email1"
													placeholder="Email" autocomplete="off"
													value="<s:property value="#session.agent.Email" />"
													oninvalid="InvalidEmailMsg(this);"
													oninput="InvalidEmailMsg(this);" data-ng-model="email1"
													data-ng-required="true">
											</div>
										</div>
									</s:else>


									<s:if
										test="#session.isCorporate == true || #session['agent'] != null">
										<div class="padding15px input_fields_wrap">
											<s:if test="#session.isCorporate == true">
												<div ng-if="CompanyEn.length != 0"
													class="biiling-bd2 col-md-6 col-sm-6 col-xs-12">
													<div class="form-group clearfix bii-bd">
														<label for="exampleInputName2">Company Entity</label> <select
															id="CompanyEntity" class=" form-control " name="">
															<!--  <option   ng-if="CompanyEn.length == 0" value="null"  >No Company Entity</option> -->
															<option value="null">Select Company Entity</option>
															<option ng-if="CompanyEn.length != 0"
																ng-repeat="company in CompanyEn" value="{{company}}">
																{{company.companyEntityName}}</option>
														</select>
													</div>
												</div>
												<div class="biiling-bd2" data-ng-if="isEmpCode">
													<div class="form-group clearfix bii-bd">
														<label for="exampleInputName2">Employee Code</label> <input
															type="text" class="form-control NameFontMAnl"
															name="EmployeeCode" id="EmployeeCode"
															placeholder="Employee Code" ng-model="employeeCode"
															required autocomplete="off" data-ng-required="true">
													</div>
												</div>
												<div class="biiling-bd2" data-ng-if="isDepartment">
													<div class="form-group clearfix bii-bd">
														<label for="exampleInputName2">Department</label> <input
															type="text" class="form-control NameFontMAnl"
															name="Department" id="Department"
															placeholder="Department" ng-model="department" required
															autocomplete="off" data-ng-required="true">
													</div>
												</div>

												<div class="biiling-bd2" data-ng-if="isCostCenter">
													<div class="form-group clearfix bii-bd">
														<label for="exampleInputName2">Cost Center</label> <input
															type="text" class="form-control NameFontMAnl"
															name="CostCenter" id="CostCenter"
															placeholder="Cost Center" ng-model="costCenter" required
															autocomplete="off" data-ng-required="true">
													</div>
												</div>
												<div class="biiling-bd2" data-ng-if="isApprover">
													<div class="form-group clearfix bii-bd">
														<label for="exampleInputName2">Approver Name</label> <input
															type="text" class="form-control NameFontMAnl"
															name="Approver" id="Approver" placeholder="Approver Name"
															ng-model="approver" required autocomplete="off"
															data-ng-required="true">
													</div>

												</div>
												<div class="biiling-bd2" data-ng-if="isLocation">
													<div class="form-group clearfix bii-bd">
														<label for="exampleInputName2">Location</label> <input
															type="text" class="form-control NameFontMAnl"
															name="Location" id="Location" placeholder="Location"
															ng-model="location" required autocomplete="off"
															data-ng-required="true">
													</div>
												</div>
												<div class="biiling-bd2" data-ng-if="isTrNumber">
													<div class="form-group clearfix bii-bd">
														<label for="exampleInputName2">TR Number</label> <input
															type="text" class="form-control NameFontMAnl"
															name="trNumber" id="trNumber" placeholder="TR Number"
															ng-model="trnumber" required autocomplete="off"
															data-ng-required="true">
													</div>
												</div>
												<div class="biiling-bd2" data-ng-if="isBussinessUnit">
													<div class="form-group clearfix bii-bd">
														<label for="exampleInputName2">Business unit</label> <input
															type="text" class="form-control NameFontMAnl"
															name="businessUnit" id="businessUnit"
															placeholder="Business unit" ng-model="businessunit"
															required autocomplete="off" data-ng-required="true">
													</div>
												</div>
												<div class="biiling-bd2" data-ng-if="isProjectCode">
													<div class="form-group clearfix bii-bd">
														<label for="exampleInputName2">Project Code</label> <input
															type="text" class="form-control NameFontMAnl"
															name="projectCode" id="projectCode"
															placeholder="Project Code" ng-model="projectcode"
															required autocomplete="off" data-ng-required="true">
													</div>
												</div>
												<div class="biiling-bd2" data-ng-if="isReasonForTravel">
													<div class="form-group NameFontMAnl clearfix bii-bd">
														<label for="exampleInputName2">Reason for travel</label> <input
															type="text" class="form-control NameFontMAnl"
															name="reason" id="reason" placeholder="Reason for travel"
															ng-model="Reason" required autocomplete="off"
															data-ng-required="true">
													</div>
												</div>
												<div class="biiling-bd2" data-ng-if="isBillNon">
													<div class="form-group NameFontMAnlclearfix bii-bd">
														<label for="exampleInputName2">Billable/ non
															billable</label> <input type="text"
															class="form-control NameFontMAnl" name="billingCode"
															id="billingCode" ng-model="billingcode"
															placeholder="Billable/ non billable" required
															autocomplete="off" data-ng-required="true">
													</div>
												</div>
											</s:if>
											<s:if
												test="#session['agent'] != null && #session.isCorporate != true ">
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
														id="businessUnit{{routeserviceid}}{{busindex}}"> <input
														data-ng-if="projectCode" type="hidden" value="NA"
														id="projectCode{{routeserviceid}}{{busindex}}"> <input
														data-ng-if="reasonForTravel" type="hidden" value="NA"
														id="reason{{routeserviceid}}{{busindex}}"> <input
														data-ng-if="billNonBill" type="hidden" value="NA"
														id="billingCode{{routeserviceid}}{{busindex}}">
												</div>
											</s:if>
											<!--   <div data-ng-repeat="(index,field)in dynamicField "> -->
											<div data-ng-repeat="(index,field) in dynamicField">
												<div class="biiling-bd2">
													<div class="form-group clearfix bii-bd">
														<label for="exampleInputName2">{{field}}</label> <input
															type="text" class="form-control" name="Dfield"
															id="Dfield-{{index}}" placeholder="{{field}}" required
															autocomplete="off" data-ng-required="true">
													</div>
												</div>
											</div>
										</div>
									</s:if>







									<div class="clearfix" id="spcl-req">
										<div class="form-group clearfix ">
											<label for="exampleInputName2">Special requests</label>
											<textarea class="form-control" name="comments" id="comments"
												placeholder="Special requests cannot be guaranteed"
												data-autocomplete="off"></textarea>

										</div>

									</div>

								</div>

							</div>
						</div>

						<s:if test="#session['agent'] != null">
							<div class="col-sm-12 clearfix">
								<div class="form-group clearfix">
									<label><b>Select Payment Option</b></label><br> <span
										style="margin-right: 10px;"> <input type="radio"
										id="Walletoption" name="paytype" checked="checked"
										value="Wallet"> Wallet
									</span>
									<s:if test="#session.isCardAcess == true">
										<span> <input type="radio" id="Cardoption"
											name="paytype" value="Card"> Card
										</span>
										<label id="payoptiontext" class="cardText"> (Card
											charges will be applicable)</label>
									</s:if>
								</div>

							</div>
						</s:if>
						<div class="col-sm-12 clearfix terms-cond">
							<div class="form-group clearfix">
								<b> Terms & Conditions</b> <br> <label>
									<p>
										<input type="checkbox" id="field_terms"
											onchange="this.setCustomValidity(validity.valueMissing ? 'Please indicate that you accept the Terms and Conditions' : '');"
											data-ng-model="checked" data-ng-required="true"> <span
											class="marginRemove">I agree to the <a
											data-toggle="modal" data-target="#termscondition">Terms
												&amp; Conditions </a>for booking this ticket, abide by
											cancellation &amp; booking policies.
										</span>
									</p>

								</label>


							</div>

						</div>
						<!--    model goes here -->

						<!-- Modal -->
						<div class="modal fade" id="termscondition" tabindex="-1"
							role="dialog" aria-labelledby="myModalLabel">
							<div class="modal-dialog modal-lg" role="document">
								<div class="modal-content" id="model-f-d">
									<div class="modal-header">
										<button type="button" class="close" data-dismiss="modal"
											aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>

									</div>
									<div class="modal-body">

										<h1>Terms and Conditions</h1>
										<ul class="TermsHotel">
											<li>Fares are subject to availability. If there is any
												fare change we will notify you immediately.</li>

											<li>Online Date/Flight change not allowed.</li>

											<li>All reservations made through our website are as per
												the terms and conditions of the concerned airlines.</li>

											<li>The primary guest must be at least 18 years of age
												to check into this hotel</li>
											<li>It is mandatory for all guests above 18 years of age
												to carry a valid photo identity card &amp; address proof at
												the time of check-in. You can carry any of the following
												documents as a valid proof - Driving License, Passport or
												Voters ID. If your check-in is denied by the hotel due to
												lack of required documents, you cannot claim a refund &amp;
												your booking will be considered as NO SHOW.</li>

											<li>In case of an increase in the hotel tariff (for
												example Christmas, New Year, International Event, Holidays)
												the customer is liable to pay the difference if the stay
												period falls during these dates.</li>

											<li>Tayyarah will not be responsible for any service
												issues at the hotel.</li>

											<li>If you wish to book multiple rooms, you must use a
												different name for each room or the duplicate reservation
												may be cancelled by the hotel.</li>

											<li>Most hotels do not allow unmarried / unrelated
												couples to check-in. This is at full discretion of the hotel
												management. No refund would be applicable in case the hotel
												denies check-in under such circumstances.</li>

											<li>The standard check-in time is 12:00 PM and the
												standard check-out time is 12:00 PM. Early check-in or late
												check-out is strictly subjected to availability and may be
												chargeable by the hotel. Any early check-in or late
												check-out request must be directed and reconfirmed with
												hotel directly.</li>
										</ul>

									</div>
								</div>
							</div>
						</div>

						<!-- model ends here -->
						<div class="col-sm-12 clearfix">
							<div class="form-group clearfix">
								<s:if test="#session.agent.userrole_id.isDemoUser() == true">
								</s:if>
								<s:else>
									<s:if
										test="#session['agent'] != null &&#session.isCorporate != true">
										<div class="input-group butonRight hotelBtn pull-right">
											<button id="wallentOption" type="submit"
												data-ng-click="hotelSummary.$valid && CorporateHotelBookmodal()"
												class="btn btn-primary but book-btn widthClass"
												data-ng-disabled="ButtonDisable">
												Proceed <span data-ng-show="ImageLoader" class="ng-hide"><img
													class="imageLoader" src="images/loginLoader.gif"></span>
											</button>

											<button id="cardOption" type="submit"
												data-ng-click="hotelSummary.$valid && AgentCardBookmodal()"
												class="btn btn-primary but book-btn widthClass"
												data-ng-disabled="ButtonDisable">
												Proceed <span data-ng-show="ImageLoader" class="ng-hide"><img
													class="imageLoader" src="images/loginLoader.gif"></span>
											</button>

										</div>
									</s:if>
									<s:elseif test="#session.isCorporate == true">
										<div class="input-group butonRight hotelBtn pull-right">
											<button id="wallentOption" type="submit"
												data-ng-click="hotelSummary.$valid && CorporateHotelBookmodal()"
												class="btn btn-primary but book-btn widthClass"
												data-ng-disabled="ButtonDisable">
												Proceed <span data-ng-show="ImageLoader" class="ng-hide"><img
													class="imageLoader" src="images/loginLoader.gif"></span>
											</button>
											<button id="cardOption" type="submit"
												data-ng-click="hotelSummary.$valid && AgentCardBookmodal()"
												class="btn btn-primary but book-btn widthClass"
												data-ng-disabled="ButtonDisable">
												Proceed <span data-ng-show="ImageLoader" class="ng-hide"><img
													class="imageLoader" src="images/loginLoader.gif"></span>
											</button>
										</div>
									</s:elseif>
									<s:else>
										<div class="input-group butonRight hotelBtn pull-right">
											<button type="submit"
												data-ng-click="hotelSummary.$valid && userHotelBookmodal()"
												class="btn btn-primary but book-btn widthClass"
												data-ng-disabled="ButtonDisable">
												Proceed <span data-ng-show="ImageLoader" class="ng-hide"><img
													class="imageLoader" src="images/loginLoader.gif"></span>
											</button>
										</div>
									</s:else>
								</s:else>
							</div>
						</div>

						<!-- traveler details ends -->
					</form>
				</div>
			</div>
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

<form method="post" action="https://www.tayyarah.com/pay.jsp"
	name="ePayment" id="ePayment">
	<input type="hidden" name="V3URL"
		value="https://secure.ebs.in/pg/ma/payment/request" /> <input
		name="channel" type="hidden" value="10" /> <input name="account_id"
		type="hidden" value="19570" /> <input name="reference_no"
		type="hidden" id="reference_no" value="" /> <input name="amount"
		type="hidden" id="totalamt" value="" /> <input name="mode"
		type="hidden" value="LIVE" /> <input name="currency" type="hidden"
		value="INR" /> <input name="description" type="hidden"
		value="Hotel Book" /> <input name="return_url" type="hidden"
		value="https://www.tayyarah.com/response.jsp" /> <input name="name"
		type="hidden" value="vimal" /> <input name="address" type="hidden"
		value="bangalore" /> <input name="city" type="hidden"
		value="bangalore" /> <input name="state" type="hidden"
		value="karanataka" /> <input name="country" type="hidden" value="IND" />
	<input name="postal_code" type="hidden" value="560046" /> <input
		name="phone" type="hidden" value="8123447347" /> <input name="email"
		type="hidden" value="vimalsvsr@gmail.com" /> <input name="ship_name"
		type="hidden" value="vimal" /> <input name="ship_address"
		type="hidden" value="bangalore" /> <input name="ship_country"
		type="hidden" value="IND" /> <input name="ship_state" type="hidden"
		value="karanataka" /> <input name="ship_city" type="hidden"
		value="bangalore" /> <input name="ship_postal_code" type="hidden"
		value="560046" /> <input name="ship_phone" type="hidden"
		value="8123447347" /> <input name="algo" type="hidden" value="MD5" />

</form>

<script src="js/calender/jquerycal.js"></script>
<script src="js/calender/jquerycalUI.js"></script>
<script src="js/jquery-offcanvas.min.js"></script>
<script>
	$(document).ready(function() {
		  $('#one, #searchrefine, #fare').iptOffCanvas({
	      baseClass: 'offcanvas',
	      type: 'left' 
	    });
	  }); 

   </script>
<script>
var query = (typeof(custom)=="undefined") ? window.location.search.substring(1) : custom;
    var hu = query;     
    var gy = hu.split("&");    
     var vars = [], hash;
     var checkbookingkey = false;
   
    for (i=0;i<gy.length;i++) {
      var ft = gy[i].split("=");      
      vars[ft[0]] = ft[1];      
    }
 
 $(document).ready(function(){  
var dates22 = $("#adult1date0,#adult1date1,#adult1date2,#adult1date3,#adult2date0,#adult2date1,#adult2date2,#adult2date3,#adult3date0,#adult3date1,#adult3date2,#adult3date3,#adult4date0,#adult4date1,#adult4date2,#adult4date3").datepicker({  
	   maxDate:0,
		dateFormat: 'dd/mm/yy',
		numberOfMonths: 2,
		yearRange: "-100:+0",
		changeMonth: true,
		changeYear: true
		 
	});
var dates1 = $("#child1date0,#child1date1,#child1date2,#child1date3,#child2date0,#child2date1,#child2date2,#child2date3,#child3date0,#child3date1,#child3date2,#child3date3,#child4date0,#child4date1,#child4date2,#child4date3").datepicker({  
	 maxDate:0,
		dateFormat: 'dd/mm/yy',
		numberOfMonths: 2,
		yearRange: "-100:+0",
		changeMonth: true,
		changeYear: true
		
		 
	});
 });
	 function isNumberKey(evt,obj){
         evt = (evt) ? evt : window.event;
           var charCode = (evt.which) ? evt.which : evt.keyCode;
           if ((charCode > 31) && (charCode < 48 || charCode > 57))            
               return false;    
          
       }
	 
        function isAlphabetKey(evt){
         evt = (evt) ? evt : window.event;
           var charCode = (evt.which) ? evt.which : evt.keyCode;
           if (charCode > 31 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
               return false;
           }
           return true;          
     }
        
 function InvalidMsg(textbox) {	    
	    if(textbox.validity.patternMismatch){
	       textbox.setCustomValidity('Mobile number not vaild.');
	   }    
	   else {
	       textbox.setCustomValidity('');
	   }
	   return true;
	}
	function InvalidEmailMsg(textbox) {
	    
		  var email = $(textbox).val();
		  var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
		  if (re.test(email)) {
			  textbox.setCustomValidity('');
		  } else {
			  textbox.setCustomValidity('Email address not vaild.');
		  }
		
	   return true;
	}
	
	 function onlyalphabets(e, t) {
         try {
             if (window.event) {
                 var charCode = window.event.keyCode;
             }
             else if (e) {
                 var charCode = e.which;
             }
             else { return true; }
             if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 32)
                 return true;
             else
                 return false;
         }
         catch (err) {
             alert(err.Description);
         }
     }
	 $("#cardOption").hide();
	 
	 $('#Cardoption').on('click', function() { 
		 $('#Cardoption').attr('disabled',true);
      	$('#payoptiontext').show(); 
      	var dammyprice = $('#totpr').val(); 
      	var addpercent = (dammyprice/parseFloat(100).toFixed(2)) * parseFloat(2.0).toFixed(2);			
			var addedpercent = addpercent.toFixed(2);
			var paymentgatewayprice = (parseFloat(dammyprice) + parseFloat(addedpercent)).toFixed(2);
			$('#B2Bothercharges').show();
			$('#otherchargetext').text(addedpercent);
			$('#hoteltotal').text(paymentgatewayprice);
			$('#hotelAmttotal').text(paymentgatewayprice);
			
			$('#totpr').val(paymentgatewayprice);
			$('#isagent').val('card');
			//$('#walletbooksubmit').attr('ng-submit', 'AgentCardBook()');
			 $("#wallentOption").hide();
			 $("#cardOption").show();
			
      	});
       $('#Walletoption').on('click', function() {  
    	   $('#Cardoption').attr('disabled',false);
       	$('#payoptiontext').hide(); 
       	var oriprice = $('#dammyva').val(); 
       	var dammyprice = $('#totpr').val();                  	
       	if(oriprice != dammyprice)
       	{
      	var addpercent = (oriprice/parseFloat(100).toFixed(2)) * parseFloat(2.0).toFixed(2);			
			var addedpercent = addpercent.toFixed(2);
			var paymentgatewayprice = (parseFloat(dammyprice) - parseFloat(addedpercent)).toFixed(2);
			$('#totpr').val(paymentgatewayprice);
			$('#hoteltotal').text(paymentgatewayprice);
			$('#hotelAmttotal').text(paymentgatewayprice);
       	}
       	$('#B2Bothercharges').hide();
      	$('#isagent').val('cash');
      	 $("#wallentOption").show();
		 $("#cardOption").hide();
      //	$('#walletbooksubmit').attr('data-ng-submit', 'CorporateHotelBook()');
       	//$('#walletbooksubmit').attr('action', 'HotelBook');
       	});
	 

  document.getElementById("field_terms").setCustomValidity("Please indicate that you accept the Terms and Conditions");
</script>

<script>
$(document).ready(function() { 	
	 var iscor=$("#isCorporate").val();
	 if(iscor == 'true'){
	$("#0-adult-0-fname,#0-adult-1-fname,#0-adult-2-fname,#0-adult-3-fname,#1-adult-0-fname,#1-adult-1-fname,#1-adult-2-fname,#1-adult-3-fname,#2-adult-0-fname,#2-adult-1-fname,#2-adult-2-fname,#2-adult-3-fname,#3-adult-0-fname,#3-adult-1-fname,#3-adult-2-fname,#3-adult-3-fname").autocomplete({
	        minLength: 1,
	        source: function( request, response ) {
	        	var companyid=3;
	        	var userlist = "hotel";
	    	var totUrl = $(location).attr('href');
	  		var newUrl = totUrl.substr(0, totUrl.lastIndexOf('/#/') + 1);
	  		var finalUrl = newUrl+"GetCorporateEmployeeList";
	  		
	            $.ajax({
	                url: finalUrl,
	                dataType: "json",
	                data: { userlistInput:userlist,searchText: request.term, maxResults: 10 },
	                success: function( data ) { 
	 var array= $.map( data.jsonResult.passengers, function( item ) {
            return {    label: item.firstName +' '+ item.lastName, 
                        value: item.firstName, //value: item.route_name+', '+item.route_grade+', '+item.area_name, 
                        lastname: item.lastName,
                        email: item.emailId,
                        title: item.title
                        }   
        });
	 response($.ui.autocomplete.filter(array, request.term));
	               }
	            });
	        },
	        select: function (event, ui) {
	        	var index = event.target.id.substring(0, 1); 
	        	var adindex=event.target.id.substring(8, 9);
	        	if(ui.item.email != undefined){
	       	$('#email1').val(ui.item.email); 
	            
	       	}     	
	           $('#'+event.target.id).val(ui.item.value);
	           $('#'+index+'-adult-'+adindex+'-gender').val(ui.item.title);
	           $('#'+index+'-adult-'+adindex+'-lname').val(ui.item.lastname);
	           return false;
	        },
	    });
	 }
	  });

</script>





