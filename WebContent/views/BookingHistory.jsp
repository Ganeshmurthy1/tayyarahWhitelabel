<!--  <div data-ng-include="header" data-ng-controller="HeadCtrl"></div> -->
<%@taglib prefix="s" uri="/struts-tags"%>


<style type="text/css">
#booktwodpd1>div>input, #booktwodpd2>div>input {
	border: 0;
	background-size: 0 2px, 100% 1px;
	background-repeat: no-repeat;
	background-position: center bottom, center calc(100% - 1px);
	transition: background 0s ease-out;
	vertical-align: middle;
	position: relative;
	z-index: 2;
	float: left;
	width: 100%;
	margin-bottom: 0;
	display: table-cell;
	padding-bottom: 5px;
	font-family: 'Open Sans', sans-serif;
}

.lint-useer {
	margin: 20px;
}
/* 
@import url(https://fonts.googleapis.com/css?family=Supermercado+One);

@import url(https://fonts.googleapis.com/css?family=Montserrat:400,700);
 */
.home_class {
	border-radius: 10px;
	padding: 14px;
	margin-top: -4px;
	margin-bottom: 10px;
	width: 100%;
	font-size: 12px;
	letter-spacing: 0.5px;
}

.home_classloading {
	padding: 30px;
	margin-top: 54px;
	margin-bottom: 10px;
	width: 100%;
	font-size: 14px;
	letter-spacing: 0.5px;
}

.home_class img {
	width: 100%;
	height: auto;
	max-width: 100%;
}

.home_1 {
	background: #3f7391;
	color: #fff;
	font-weight: 100;
}

.home_1 b {
	color: #fff;
}

.home_2 h5 {
	letter-spacing: 1px;
	text-align: right;
}

.home_2 {
	background: #fd9;
	color: #222;
	front-family:;
}

.home_3 {
	background: #fff;
	border: 2px solid #ddd;
	color: #222;
	font-weight: 100;
}

* {
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	font-family: "Montserrat";
	-webkit-appearance: none;
}

h1, h2, h3, h4, h5, h6 {
	-webkit-margin-before: 1em;
	-webkit-margin-after: 1em;
}
</style>

<input type="hidden" name="ay" value="<s:property value="%{#session}"/>"
	id="apky">

<article class="container">
	<div class="row">
		<div class="home_class home_1">

			<h3>Flight Booking History</h3>

		</div>


		<script type="text/ng-template" id="custom-datepicker.html">
    <div class="enhanced-datepicker">
        <div class="proxied-field-wrap">
            <input type="text" ui-date-format="yy-mm-dd" ng-model="ngModel" ui-date="dateOptions"/>
        </div>
        <label>
             
        
        </label>
    </div>
</script>
		<div ng-show="loading"
			class=" col-md-12 history-loading home_classloading"></div>

		<div ng-hide="loading">
			<div ng-if="flightbookinglists !=0 && flightbookinglists !=undefined"
				class="col-sm-12">

				<form class="form-inline" data-ng-submit="Bookingsearch()">
					<div id="hdepe"></div>


					<div class=" col-md-12 home_class home_2">

						<h4 class="col-md-12" style="padding-bottom: 15px;">Flight
							Booking Date Search</h4>


						<div class="col-md-12">
							<div class="form-group col-md-4">
								<label for="exampleInputAmount"
									style="padding-left: 16px; padding-right: 10px;">From
									Date: </label>
								<div class="input-group">
									<input type="text" class="form-control" id="booktwodpd1"
										date-options="dateOptions" custom-datepicker />
									<div class="input-group-addon">
										<i class="fa fa-calendar"></i>
									</div>
								</div>
							</div>

							<div class="form-group col-md-4">
								<label for="exampleInputAmount"
									style="padding-left: 16px; padding-right: 10px;">End
									Date: </label>
								<div class="input-group">
									<!-- <input type="text" class="form-control" id="booktwodpd2"
										placeholder="DD-MM-YYYY" name="todate"> -->
									<input type="text" class="form-control" id="booktwodpd2"
										date-options="dateOptions" custom-datepicker />
									<div class="input-group-addon">
										<i class="fa fa-calendar"></i>
									</div>
								</div>
								<div class="ttst" id="errorione"></div>
							</div>




							<div class="col-md-2 form-group rep-buto"
								style="padding-left: 16px; margin-top: -2%;">
								<button type="submit" data-ng-click="submitted == true"
									class="btn btn-primary">Show</button>
							</div>
							<div class="col-md-1" ng-if="!isdefaultHistory">
								<a ng-click="defaultpage()">Reset</a>
							</div>
						</div>
					</div>
				</form>

			</div>


			<div ng-if="isdefaultHistory" class="col-sm-12 ">
				<div class="table-responsive dash-table clearfix">

					<!-- testing -->

					<div
						ng-if="flightbookinglists !=0 && flightbookinglists !=undefined"
						class="box clearfix">
						<!-- <div class="box-body"> -->
						<table id="mytable" class="table table-striped ddd"
							data-sort-name="name" data-sort-order="desc">
							<thead>
								<tr>
									<th>S.No</th>
									<th>Order Id</th>
									<th>Trip Type</th>
									<th>Airline</th>
									<th>Origin</th>
									<th>Destination</th>
									<th>Departure Date</th>
									<th>Arrival Date</th>
									<th>Booking Date</th>
									<th>Price</th>
									<th>Status</th>
								</tr>
							</thead>
							<tbody>

								<tr
									data-dir-paginate="(groupindex,flight) in flightbookinglists | itemsPerPage:10">
									<td>{{groupindex + 1}}.</td>
									<td>{{flight.orderId}}</td>
									<td>{{flight.tripType}}</td>
									<td>{{flight.airline}}</td>
									<td>{{flight.origin}}</td>
									<td>{{flight.destination}}</td>
									<td>{{flight.departureDate|date:'dd-MM-yyyy' }}</td>

									<td ng-if="flight.arrivalDate ==''">-</td>
									<td ng-if="flight.arrivalDate !=''">{{flight.arrivalDate|date:'dd-MM-yyyy'}}</td>
									<td>{{flight.bookingDate|date:'dd-MM-yyyy'}}</td>
									<td>{{flight.totInvoiceAmount}}</td>
									<td>{{flight.statusAction}}</td>
								</tr>

							</tbody>
						</table>
						<div style="text-align: center">
							<dir-pagination-controls max-size="5" direction-links="true"
								boundary-links="true"> </dir-pagination-controls>
						</div>
					</div>
					<div
						ng-if="flightbookinglists ==0 || flightbookinglists==undefined">


						<div class=" col-md-12 home_class home_2">

							<h4 class="col-md-8">No Flight Booking Data in Your Account</h4>


							<div class="col-md-4">
								<button class="btn btn-primary" ng-click="returnIndex()"
									style="float: right;">Tayyarah Home</button>
							</div>


						</div>
					</div>
				</div>



			</div>
			<div ng-if="!isdefaultHistory" class="col-sm-12 ">
				<div class="table-responsive dash-table clearfix">

					<!-- testing -->

					<div
						ng-if="flightbookingDatelists !=0 && flightbookingDatelists !=undefined"
						class="box clearfix">
						<!-- <div class="box-body"> -->
						<table id="mytable" class="table table-striped ddd"
							data-sort-name="name" data-sort-order="desc">
							<thead>
								<tr>
									<th>S.No</th>
									<th>Order Id</th>
									<th>Trip Type</th>
									<th>Airline</th>
									<th>Origin</th>
									<th>Destination</th>
									<th>Departure Date</th>
									<th>Arrival Date</th>
									<th>Booking Date</th>
									<th>Price</th>
									<th>Status</th>
								</tr>
							</thead>
							<tbody>

								<tr
									data-dir-paginate="(groupindex,flight) in flightbookingDatelists | itemsPerPage:10">
									<td>{{groupindex + 1}}.</td>
									<td>{{flight.orderId}}</td>
									<td>{{flight.tripType}}</td>
									<td>{{flight.airline}}</td>
									<td>{{flight.origin}}</td>
									<td>{{flight.destination}}</td>
									<td>{{flight.departureDate|date:'dd-MM-yyyy' }}</td>

									<td ng-if="flight.arrivalDate ==''">-</td>
									<td ng-if="flight.arrivalDate !=''">{{flight.arrivalDate|date:'dd-MM-yyyy'}}</td>
									<td>{{flight.bookingDate|date:'dd-MM-yyyy'}}</td>
									<td>{{flight.totInvoiceAmount}}</td>
									<td>{{flight.statusAction}}</td>
								</tr>

							</tbody>
						</table>
						<div style="text-align: center">
							<dir-pagination-controls max-size="5" direction-links="true"
								boundary-links="true"> </dir-pagination-controls>
						</div>
					</div>
					<div
						ng-if="flightbookingDatelists ==0 || flightbookingDatelists ==undefined">


						<div class=" col-md-12 home_class home_2">

							<h4 class="col-md-8">No Data Found For Particular Date</h4>
						</div>
					</div>
				</div>



			</div>
		</div>
	</div>

</article>
<script src="js/jquery.js"></script>
<script src="js/jquery-ui.min.js"></script>
