<%-- <%@ page session="true" %>
${sessionScope}   --%>
<%@taglib prefix="s" uri="/struts-tags"%>
<s:if test="#session['agent'] != null">
	<s:if test="#session.isLabeling == true">
		<input type="hidden" name="ay" id="iswhitelabel"
			value="<s:property value="%{#session.isLabeling}"/>">
		<input type="hidden" name="ay" id="lay"
			value="<s:property value="%{#session.agent.Securityanswer}"/>">

	</s:if>
</s:if>
<div data-ng-controller="HeadCtrl">
	<div class="header-top dark ">
		<div class="container">
			<div class="row">

				<div class="col-xs-3 col-sm-7 col-md-6">
					<!-- header-top-first start -->
					<!-- ================ -->
					<div class="header-top-first clearfix">
						<ul class="social-links circle small clearfix hidden-xs">
							<li class="facebook"><a target="_blank"
								href="https://www.facebook.com/tayyarahonline"><i
									class="tayyarah-facebook"></i></a></li>
							<li class="twitter"><a target="_blank"
								href="https://twitter.com/tayyarahonline"><i
									class="tayyarah-twitter"></i></a></li>
							<li class="skype"><a target="_blank"
								href="http://www.skype.com"><i class="tayyarah-skype"></i></a></li>
							<li class="linkedin"><a target="_blank"
								href="http://www.linkedin.com"><i class="tayyarah-linkedin"></i></a></li>
							<li class="googleplus"><a target="_blank"
								href="http://plus.google.com"><i
									class="tayyarah-google-plus"></i></a></li>
							<li class="youtube"><a target="_blank"
								href="http://www.youtube.com"><i
									class="tayyarah-youtube-play"></i></a></li>
							<!-- <li class="flickr"><a target="_blank" href="http://www.flickr.com"><i class="tayyarah-flickr"></i></a></li>
										
										<li class="pinterest"><a target="_blank" href="http://www.pinterest.com"><i class="tayyarah-pinterest"></i></a></li> -->
						</ul>
						<div
							class="social-links hidden-lg hidden-md hidden-sm circle small">
							<div class="btn-group dropdown">
								<button type="button" class="btn dropdown-toggle"
									data-toggle="dropdown">
									<i class="tayyarah-share-alt"></i>
								</button>
								<ul class="dropdown-menu dropdown-animation">
									<li class="facebook"><a target="_blank"
										href="https://www.facebook.com/tayyarahonline"><i
											class="tayyarah-facebook"></i></a></li>
									<li class="twitter"><a target="_blank"
										href="https://twitter.com/tayyarahonline"><i
											class="tayyarah-twitter"></i></a></li>
									<li class="skype"><a target="_blank"
										href="http://www.skype.com"><i class="tayyarah-skype"></i></a></li>
									<li class="linkedin"><a target="_blank"
										href="http://www.linkedin.com"><i
											class="tayyarah-linkedin"></i></a></li>
									<li class="googleplus"><a target="_blank"
										href="http://plus.google.com"><i
											class="tayyarah-google-plus"></i></a></li>
									<li class="youtube"><a target="_blank"
										href="http://www.youtube.com"><i
											class="tayyarah-youtube-play"></i></a></li>
									<!-- <li class="flickr"><a target="_blank" href="http://www.flickr.com"><i class="tayyarah-flickr"></i></a></li>
												
												<li class="pinterest"><a target="_blank" href="http://www.pinterest.com"><i class="tayyarah-pinterest"></i></a></li> -->
								</ul>
							</div>
						</div>
						<ul class="list-inline">
							<li><i class="tayyarah-phone pr-5 pl-10"></i> 080-42855555</li>
							<li><a id="emailLnk" href="#"><i
									class="tayyarah-envelope-o pr-5 pl-10"></i> care@tayyarah.com </a></li>
						</ul>
					</div>
				</div>


				<div class="col-xs-9 col-sm-5 col-md-6">

					<!-- header-top-second start -->
					<!-- ================ -->
					<div id="header-top-second" class="clearfix">
						<!-- header top dropdowns start -->
						<!-- ================ -->
						<div class="header-top-dropdown text-right">


							<ul>
								<s:if test="#session['user'] != null">
									<input type="hidden" id="isuserloggedin" value="yes">
									<li class="dropdown">
										<%-- <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="tayyarah-user"></i><s:property value="#session.user.firstName" /> <b class="caret"></b></a> --%>
										<a href="#" class="dropdown-toggle" data-toggle="dropdown">HI
											&nbsp <s:property value="#session.user.firstName" /> <b
											class="caret"></b>
									</a>
										<ul class="dropdown-menu">
											<li><a href="#/UserProfile"><i
													class="tayyarah-circle-o-notch"></i> My Profile</a></li>
											<li><a href="#/BookingHistory"><i
													class="tayyarah-circle-o-notch"></i> My FlightBookings</a></li>
											<li><a href="#/HotelBookingHistory"><i
													class="tayyarah-circle-o-notch"></i> My HotelBookings</a></li>
											<li><a href="#/bus-BookingHistory"><i
													class="tayyarah-circle-o-notch"></i> My BusBookings</a></li>
											<!--  <li><a href="UserHistory" ><i class="tayyarah-circle-o-notch"></i> My Bookings</a></li> -->
											<li><a class="logout-form" data-target="UserLogout"><i
													class="tayyarah-sign-out"></i> Log Out</a></li>
										</ul>
								</s:if>
								<input type="hidden" name="companyId" id="cmpanyId"
									value="<s:property value="%{#session.agent.Companyid}"/>">
								<s:elseif test="#session['agent'] != null">
									<input type="hidden" name="userid" id="userid"
										value="<s:property value="%{#session.agent.id}"/>">
									<input type="hidden" id="isuserloggedin" value="yes">
									<input type="hidden" id="thelink" name="adminlink"
										value="<s:property value="#session.EncryptedAdminlink" />">
									<s:if test="#session.emulateFlag == true">
										<li class="EMUC"><a>Emulated By Company : <s:property
													value="#session.emulateByCompany.companyname" /></a> <a>Emulated
												By User : <s:property
													value="#session.emulateByUser.username" />
										</a></li>
									</s:if>
									<input type="hidden" id="adminurl"
										value="{{AdminDashboardUrl}}">
									<input type="hidden" id="thelink" name="adminlink"
										value="<s:property value="#session.EncryptedAdminlink" />">


									<li class="dropdown"><s:if
											test="#session.isLabeling == true">

										</s:if> <s:else>
											<a href="#" class="dropdown-toggle" data-toggle="dropdown">Welcome
												&nbsp<s:property value="#session.agent.Username" /> <b
												class="caret"></b>&nbsp
											</a>
											<ul class="dropdown-menu">
												<li><a class="logout-form"><i
														class="tayyarah-sign-out"></i> Log Out</a></li>
											</ul>
											<!--  <li ><a onclick="adminform();">Dash board</a></li> -->
											<li><span>Credit:&nbsp;<i
													class="tayyarah-<s:property value="#session.agent.agentWallet.currencyCode" />"></i>
													<span class="" id="agentbal" value=""
													data-ng-bind="agentbal"></span> &nbsp; Deposit:&nbsp;<i
													class="tayyarah-<s:property value="#session.agent.agentWallet.currencyCode" />"></i><span
													class="" id="agentDepbal" value=""
													data-ng-bind="agentDepbal"></span></span></li>

										</s:else>
								</s:elseif>
								<s:else>
									<input type="hidden" id="isuserloggedin" value="no">

									<li id="login"><a data-toggle="modal"
										data-target="#welcome"><i class="tayyarah-sign-in  pr-5"></i>
											Sign In</a>
										<div class="featherlight light" style="display: none;">

											<div class="featherlight-content">
												<span class="featherlight-close">X</span>
												<div class="lightbox featherlight-inner" id="logins">
													<div class="lioghead">Welcome</div>

													<div id="formwrapper">
														<div id="form-login">
															<form class="form-horizontal" action="UserLogin"
																method="post">
																<fieldset id="inputs">
																	<div class="form-group label-floating">
																		<label class="control-label" for="email">Email</label>
																		<input id="username" type="email" class="form-control"
																			name="Email" placeholder="Your email address"
																			required autocomplete="off"
																			pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
																			oninvalid="setCustomValidity('Email address not vaild')"
																			onchange="try{setCustomValidity('')}catch(e){}">

																	</div>
																	<div class="form-group label-floating">
																		<label class="control-label" for="password">Password</label>
																		<input id="password" type="password"
																			class="form-control" name="Password"
																			placeholder="Password" autocomplete="off" required>
																	</div>
																</fieldset>
																<fieldset id="inputs">
																	<div class="form-group label-floating">
																		<p id="forgot_link">Forget Password?</p>
																	</div>
																</fieldset>
																<fieldset id="actions">
																	<div class="form-group">
																		<button type="submit" class="btn btn-info btn-lg">
																			<i class="tayyarah-home visible-xs-inline"></i>Log In
																		</button>
																	</div>
																</fieldset>
															</form>

															<!-- Begin | Lost Password Form -->
															<form id="forgot_div" style="display: none;"
																action="AgentPassword" method="post">

																<div id="div-lost-msg">
																	<span id="text-lost-msg">Enter your e-mail.</span>
																</div>


																<div class="form-group">
																	<div class="ag-col">
																		<div class="input-group">
																			<span class="input-group-addon"><i
																				class="fa fa-envelope fa-fw"></i></span> <input
																				type="email" class="form-control input-sm"
																				placeholder="Email" autocomplete="off" required>
																		</div>
																	</div>
																</div>
																<div class="row">
																	<div class="form-group">
																		<div class="col-xs-12 submitWrap">
																			<button type="submit" class="btn btn-info btn-lg">Send</button>
																		</div>
																	</div>
																</div>
															</form>
															<!-- End | Lost Password Form -->
														</div>
													</div>
												</div>
											</div>
										</div></li>
									<li id="signup"><a id="signup-trigger"
										href="#/UserRegister"> <i class="tayyarah-edit  pr-5"></i>
											<Span>Register Now </Span>
									</a></li>
								</s:else>
							</ul>

						</div>
						<!--  header top dropdowns end -->
					</div>
					<!-- header-top-second end -->
				</div>


			</div>
		</div>
	</div>

	<!-- header-top-end -->
	<header class="header fixed clearfix liceheader">
		<div class="container mobContainer">

			<nav class="navbar navbar-default" role="navigation" id="navbar2">
				<!-- Brand and toggle get grouped for better mobile display -->
				<div class="navbar-header">
					<button type="button" class="navbar-toggle" data-toggle="collapse"
						data-target=".navbar-ex1-collapse">
						<span class="sr-only">Toggle navigation</span> <span
							class="icon-bar"></span> <span class="icon-bar"></span> <span
							class="icon-bar"></span>
					</button>
					<div class="logo">
						<h1>
							<a data-ng-href="#flights" data-ng-click="returnIndex()"><img
								src="images/t-n.png" class="img-responsive" alt="tayyarah"></a>
							<a class="imgSiz" data-ng-href="#flights"
								data-ng-click="returnIndex()"><img
								class="img-responsive logoImage"></a>
						</h1>

					</div>


				</div>
				<div class="nav-header-right clearfix">
					<div class="nav-bag clearfix">

						<div class="collapse navbar-collapse navbar-ex1-collapse ">
							<ul
								class="nav navbar-nav navbar-right widthHeader100per hidden-xs"
								id="id">

								<li data-ng-class="{ active: isActive('/')}"><a
									data-ng-href="#flights" data-ng-click="returnIndex()"
									return="false"><i class="visible-xs-inline"></i><img
										class="airimg  "></img> <Span>Flight</Span></a></li>


								<li data-ng-class="{ active: isActive('/hotel')}"><a
									data-ng-href="#/hotel" data-ng-click="returnHotelIndex()"
									return="false"><i class="visible-xs-inline"></i><img
										class="hotimg  "></img> <Span>Hotel</Span></a></li>


								<li data-ng-class="{ active: isActive('/bus')}"><a
									data-ng-href="#/bus" return="false"
									data-ng-click="returnBusIndex()"><i
										class="visible-xs-inline"></i><img class="busimg  "></img> <Span>Bus</Span></a></li>


								<li data-ng-class="{ active: isActive('/cars')}"><a
									data-ng-href="#/cars" return="false"><i
										class="visible-xs-inline"></i><img class="carimg  "></img> <Span>Car</Span></a></li>

								<li data-ng-class="{ active: isActive('/about')}"><a
									data-ng-href="#/about" return="false"><i
										class="visible-xs-inline"></i><img class="abtimg  "></img> <Span>About
											Us</Span></a></li>

							</ul>
							<ul
								class="nav navbar-nav navbar-right widthHeader100per visible-xs"
								id="id">
								<li data-toggle="collapse" data-target=".navbar-ex1-collapse"
									data-ng-class="{ active: isActive('/')}"><a
									data-ng-href="#flights" data-ng-click="returnIndex()"><i
										class="visible-xs-inline"></i><img class="airimg  "></img> <Span>Flight</Span></a></li>
								<li data-toggle="collapse" data-target=".navbar-ex1-collapse"
									data-ng-class="{ active: isActive('/hotel')}"><a
									data-ng-href="#/hotel" data-ng-click="returnHotelIndex()"><i
										class="visible-xs-inline"></i><img class="hotimg  "></img> <Span>Hotel</Span></a></li>
								<li data-toggle="collapse" data-target=".navbar-ex1-collapse"
									data-ng-class="{ active: isActive('/bus')}"><a
									data-ng-href="#/bus" data-ng-click="returnBusIndex()"><i
										class="visible-xs-inline"></i><img class="busimg  "></img> <Span>Bus</Span></a></li>
								<li data-toggle="collapse" data-target=".navbar-ex1-collapse"
									data-ng-class="{ active: isActive('/cars')}"><a
									data-ng-href="#/cars"><i class="visible-xs-inline"></i><img
										class="carimg  "></img> <Span>Car</Span></a></li>
								<li data-toggle="collapse" data-target=".navbar-ex1-collapse"
									data-ng-class="{ active: isActive('/about')}"><a
									data-ng-href="#/about"><i class="visible-xs-inline"></i><img
										class="abtimg  "></img> <Span>About Us</Span></a></li>
								<li data-toggle="collapse" data-target=".navbar-ex1-collapse"><a
									id="signup-trigger" href="#/UserRegister"><i
										class="tayyarah-edit  pr-5"></i> <Span>Register Now </Span> </a></li>
								<s:if test="#session['agent'] == null">

									<li data-toggle="collapse" data-target=".navbar-ex1-collapse"><a
										data-toggle="modal" data-target="#welcomeagent"
										ng-click="b2blogin()" class="b2bHAnd">B2B Login </a></li>
									<li data-toggle="collapse" data-target=".navbar-ex1-collapse"><a
										data-toggle="modal" data-target="#welcomeagent"
										ng-click="corporatelogin()" class="b2bHAnd"> Corporate
											Login</a></li>
								</s:if>
								<s:if test="#session['user'] == null">
									<li data-toggle="collapse" data-target=".navbar-ex1-collapse"><a
										data-toggle="modal" data-target="#welcome"><i
											class="tayyarah-sign-in  pr-5"></i> Sign In</a></li>
								</s:if>
								<s:if test="#session['user'] != null">
									<li><a class="logout-form" data-target="UserLogout"><i
											class="tayyarah-sign-out"></i> Log Out</a></li>
								</s:if>
								<s:elseif test="#session['agent'] != null">
									<li><a class="logout-form"><i
											class="tayyarah-sign-out"></i> Log Out</a></li>
								</s:elseif>






							</ul>
							<s:if test="#session['agent'] != null">
								<%-- <span data-ng-click="showDetailNotifications()"><i class="tayyarah-bell" ><span data-ng-bind="notificationCount"></span></i> </span>
           	 --%>
								<a class="dropdown-toggle textdecorNone"
									data-ng-show="NotifyCount"
									data-ng-click="showDetailNotifications()" role="button"
									data-toggle="dropdown"> <span
									class="icon-with-child hidden-xs"> <span
										class="tayyarah-bell bellOver"></span> <span
										class="badge badge-danger badge-above right bellBadge"
										data-ng-bind="notificationCount"></span>
								</span> <span class="visible-xs-block"> <span
										class="tayyarah-bell"></span> <span
										class="badge badge-danger pull-right"
										data-ng-bind="notificationCount"></span> Notifications
								</span>
								</a>
								<div class="dropdown-menu dropNotification dropdown-menu-lg ">
									<div class="dropdown-header headerBackground col-md-12 ">
										<h5 class="dropdown-heading NoteHead col-md-7">Recent
											Notifications</h5>
										<a class="dropdown-link col-md-5" href="#"
											data-ng-click="markallasread()">Mark all as read</a>
									</div>
									<div class="dropdown-body">
										<div class="custom-scrollable-area">
											<ul class="list-group list-group-divided customNew-scrollbar">
												<li class="list-group list-group-divided "
													data-ng-repeat="notted in NoteDetails track by $index">
													<div
														class="col-md-12 list-group-item clearfix backgroundColour"
														id='{{$index}}'>
														<a class="notification "
															data-ng-click="viewdetail($index,notted)">
															<div class="notification-content">
																<h5 class="notification-heading">
																	{{notted.details[0].title}}</h5>
																<div class="col-md-12">
																	<small class="notification-timestamp"
																		style="color: #999;">{{notted.details[0].comments}}
																	</small> <small class="notification-timestamp pull-right"
																		style="color: #999;">{{convertToHours(notted.createdAt)}}</small>
																</div>

															</div>
														</a>

													</div>

												</li>
											</ul>
										</div>
									</div>
								</div>
						</div>

						</s:if>
					</div>

				</div>
		</div>
		</nav>
		<s:if test="#session['agent'] != null">
			<div
				class="col-md-12 col-sm-12 col-xs-12 backgroundGrey visible-xs hidden-md hidden-sm">
				<div class="col-md-12 col-sm-12 col-xs-12 pad-LR-Zero">
					<div class="col-md-12 col-sm-12 col-xs-10 pad-LR-Zero">
						Welcome &nbsp <span class="blueColorText"><s:property
								value="#session.agent.Username" /> </span>
					</div>
					<div class="col-md-4 col-sm-4 col-xs-2 pad-LR-Zero floatRight">

						<%-- <a data-ng-href="#flights" >
      <img src="<s:url action='AgentImageAction?imageId=%{#session.agent.imagepath}'/>"  id="imgres" width="50" height="50" class="img-responsive" onerror="imgError(this);">
      </a> --%>

					</div>
				</div>
				<div class="col-md-12 col-sm-12 col-xs-12 pull-right pad-LR-Zero">
					<span>Credit:&nbsp;<i
						class="tayyarah-<s:property value="#session.agent.agentWallet.currencyCode" />"></i>
						<span class="" id="agentbal" value="" data-ng-bind="agentbal"></span>
						&nbsp; Deposit:&nbsp;<i
						class="tayyarah-<s:property value="#session.agent.agentWallet.currencyCode" />"></i><span
						class="" id="agentDepbal" value="" data-ng-bind="agentDepbal"></span></span>
				</div>


			</div>
		</s:if>
		<s:if test="#session['user'] != null">
			<div
				class="col-md-12 col-sm-12 col-xs-12 mobbackgroundGrey visible-xs hidden-md hidden-sm">
				<div class="col-md-12 col-sm-12 col-xs-12 pad-LR-Zero">
					<div class="col-md-12 col-sm-12 col-xs-10 pad-LR-Zero pull-right">
						Welcome &nbsp <span class="blueColorText"><s:property
								value="#session.user.firstName" /> </span>
					</div>
				</div>
			</div>
		</s:if>
</div>

</header>

</div>

<div class="modal fade welcomemodel" id="welcome" tabindex="-1"
	role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!-- <h4 class="modal-title">Modal Header</h4> -->
				<div class="lioghead">Welcome</div>
			</div>
			<div class="modal-body form-module">
				<button type="button" class="close" data-dismiss="welcomemodel">
					<span class="sr-only">Close</span>
				</button>

				<!-- <div class="lioghead">Welcome</div> -->
				<div id="formwrapper">
					<div id="form-login">
						<form class="form-horizontal" id="floginForm">
							<fieldset id="inputs" class="lgi">
								<div class="form-group label-floating">
									<label class="control-label" for="email">Email</label> <input
										id="fusername" type="email" class="form-control" name="Email"
										placeholder="Your email address" required autocomplete="off"
										pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
										oninvalid="setCustomValidity('Email address not vaild')"
										onchange="try{setCustomValidity('')}catch(e){}">
								</div>
								<div class="form-group">
									<label class="control-label" for="password">Password</label> <input
										id="fpassword" type="password" class="form-control"
										name="Password" placeholder="Password" autocomplete="off"
										required>
								</div>
								<div class="form-group text-center">
									<div class="col-xs-12">
										<div class="row">
											<div class=" text-right">
												<div class="cta">
													<div class="toggle">
														<i class="tayyarah-times tayyarah-pencil"></i> <a href="#">Forgot
															your password?</a>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="form-group text-center">
									<button type="submit" id="frontusersubmit"
										class="btn btn-info btn-lg">Log In</button>
								</div>
							</fieldset>
						</form>
						<span class="row colorRed" id="floginresult"></span>
						<form class="form-horizontal" id="fRecoverPassword">
							<fieldset class="form1">
								<div class="tog col-md-12">
									<span class="colorTextRed" id="fmessageerrorSpan"></span>
								</div>
								<div class="form-group label-floating">
									<label class="control-label" for="focusedInput1">Email</label>
									<input class="form-control" id="fpemail" name="Emailid"
										type="email" placeholder="Your email address" required
										autocomplete="off"
										pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
										oninvalid="setCustomValidity('Email address not vaild')"
										onchange="try{setCustomValidity('')}catch(e){}">

								</div>
								<div class="form-group">
									<button type="submit" id="fforgotpassword"
										class="btn btn-info btn-lg">Send</button>
								</div>
								<div class="tog">
									<div class="cta">
										<a><i class="tayyarah-times tayyarah-chevron-left"></i>
											Back to Login</a>
									</div>
								</div>
							</fieldset>
						</form>
					</div>
				</div>
			</div>
		</div>

	</div>
</div>
<div class="modal fade " id="fsucessforgetmsg" tabindex="-1"
	role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
			</div>
			<div class="modal-body form-module " style="margin-top: 15px;">
				<div class="text-center lioghead" id="fmessageSpan"></div>


			</div>
		</div>

	</div>
</div>





<script>



$(document).on("click", "#frontusersubmit", frontuserloginClick);

function frontuserloginClick() {
	if($('#floginForm')[0].checkValidity()){  
	
    var user = $("#fusername").val();
    var password = $("#fpassword").val();
              
    var totalUrl = $(location).attr('href');
  	var newfUrl = totalUrl.substr(0, totalUrl.lastIndexOf('/#/') + 1);
		var finalfUrl = newfUrl+"FrontUserLogin";
	
    $.ajax({
        url: finalfUrl,
        type: 'POST',
        dataType: 'json',
        data: {
        	Email: user,
        	Password: password
		    },
        success: function (response) {
            handleLoginResult(response);
        },
			error: function(xhr, status, error)
			{ 
		
			   handleLoginerror(xhr);
			}
        
    });
	}
}


function handleLoginResult(response) {
    var status = response.status;
    var message = "login successfully";
    if (status == 0) {
        // do whatever needs to be done after successful login
        $("#floginresult").html(message);
        location.reload();  
        $('#welcome').modal('hide');
        
    }
} 
function handleLoginerror(xhr) {
    var status = xhr;
    var message = "Please Enter Valid Login Credentials";
   
        // do whatever needs to be done after successful login
        $("#floginresult").html(message); 
        
}
$(document).on("click", "#forgetagentpassword", agentforgotClick);

function agentforgotClick() {
    var agentemail = $("#agentfemailid").val();
    
                   
    var totalUrl = $(location).attr('href');
  	var newfUrl = totalUrl.substr(0, totalUrl.lastIndexOf('/#/') + 1);
		var finalfUrl = newfUrl+"Forgotpassword";
    $.ajax({
        url: finalfUrl,
        type: 'POST',
        dataType: 'json',
        data: {
        	Email: agentemail
		    },
        success: function (response) {
            handleforgotpasswordResult(response);
        },
			error: function(status)
			{ 
			 handleforgotpassworderror(status);
			}
        
    });
}

function handleforgotpasswordResult(response) {
    var status = response.status;
    if (status == false) {
    	var message= "Sucessfully Sent To Your Mail";
    	jQuery("#messageSpan").text(message);
        // do whatever needs to be done after successful login
       // location.reload();  
        //window.location.href=window.location.href
        $('#forgetPassword').modal('hide');
        $('#sucessforgetmsg').modal('show');
        
    }
    else
    	{
    	var message= "please contact your admin";
    	jQuery("#messageSpan").text(message); 
        $('#forgetPassword').modal('hide');
        $('#sucessforgetmsg').modal('show');
    	
    	}
} 
function handleforgotpassworderror(status) {
   
    	var message= "Please Enter Regitered Mail id" ;
    	jQuery("#messageerrorSpan").text(message);
        $('#forgetPassword').modal('show');
       
} 



$(document).on("click", "#fforgotpassword", fforgotClick);

function fforgotClick() {
	if($('#fRecoverPassword')[0].checkValidity()){  
    var useremail = $("#fpemail").val();
    
  
                   
    var totalUrl = $(location).attr('href');
  	var newfUrl = totalUrl.substr(0, totalUrl.lastIndexOf('/#/') + 1);
		var finalfUrl = newfUrl+"ForgotPassword";
    $.ajax({
        url: finalfUrl,
        type: 'POST',
        dataType: 'json',
        data: {
        	Emailid: useremail
		    },
        success: function (response) {
            handlefforgotpasswordResult(response);
        },
			error: function(status)
			{ 
			 handlefforgotpassworderror(status);
			}
        
    });
}
}

function handlefforgotpasswordResult(response) {
    var status = response.status;
    if (status == false) {
    	var message= "Sucessfully Sent To Your Mail";
    	jQuery.noConflict(); 
    	jQuery("#fmessageSpan").text(message);
    	 $('#welcome').modal('hide');
    	 $('#fsucessforgetmsg').modal('show');
      
    }
    else
    	{
    	var message= "please contact your admin";
    	jQuery("#fmessageSpan").text(message); 
    	 $log.info('Modal dismissed at: ' + new Date());
        $('#welcome').modal('hide');
        $('#fsucessforgetmsg').modal('show');
    	
    	}
}  
function handlefforgotpassworderror(status) {
   
    	var message= "Please Enter Regitered Mail id" ;
    	jQuery("#fmessageerrorSpan").text(message);
        
       
} 


</script>
<script>

$('.logout-form').click(function()
/* function logoutform()  */{

	  var totUrl = $(location).attr('href');
  
  	var newUrl = totUrl.substr(0, totUrl.lastIndexOf('/#/') + 1);
 	var fUrl = newUrl+"AgentLogout";
	 // var URL = "http://192.168.1.63:8000/weather/logout/";
	  $.ajax({
	    url : fUrl,
	    type: "POST",
	    xhrFields: {
	      withCredentials: true
	    }
	  }).success(function(res) {
		  location.reload();
		 window.location = newUrl;
	    hide_error();
	  }).error(function(res) {
	  });
	});
	
	

</script>

<script>

 function adminform(){
	 

	 var url = $('#adminurl').val();	 
 var data = $('#thelink').val();
  var mapForm = document.createElement("form");
    mapForm.target = "Map";
    mapForm.method = "POST";  
   mapForm.action = url;
    var mapInput = document.createElement("input");
    mapInput.type = "hidden";
    mapInput.name = "encryptedid";
    mapInput.value = data;
    mapForm.appendChild(mapInput);   

     document.body.appendChild(mapForm);

   
    mapForm.submit();
if (map) {
  
   
} else {
 
}  
 }
</script>


<script type="text/javascript">
                       $("#id li a").click(function() {   
                    
                    	  $('.navbar .navbar-nav>.active>a').css("color","#555");
                    	  $(this).css("color","#D50000");
                        $('.tayyarah-home-tabs .active-tab li').removeClass('active');                    
                        var currentactiveele = $(this).text()+'li';                       
                         $('#'+currentactiveele.trim()).addClass('active');
                        
                       }); 
                     
                </script>
<script>
                $(document).ready(function() {
                    $("#emailLnk").attr('href',"mailto:care@tayyarah.com");
                });
                
                 </script>

<script>
    $(document).ready(function(){
     $("#forgot_link").click(function(){
         $("#forgot_div").slideToggle();
     }); 
    });
        </script>
<script>
    // Toggle Function
    $(document).ready(function() {

        $('.form1').hide();

      

        $(".toggle").click(function() {
            $('.lgi').hide();

            $(".form1").fadeIn(1500, function() {
                $(".form1").fadeIn(1000);
            });
            return false;
        });


        $(".tog").click(function() {
            $('.form1').hide();

            $(".lgi").fadeIn(1500, function() {
                $(".lgi").fadeIn(1000);
            });
            return false;
        });

    });
    </script>

<!-- header ends here -->