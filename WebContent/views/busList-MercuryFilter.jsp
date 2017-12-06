
<%@taglib prefix="s" uri="/struts-tags"%>
<s:if test="#session.isCorporate == true">
	<input type="hidden" name="isCorporate" id="isCorporate" value="true">
</s:if>
<input type="hidden" name="ay"
	value="<s:property value="%{#session.agent.Securityanswer}"/>"
	id="apky">
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
<div class=" minheight500px" data-ng-cloak>
	<div class="row">
		<div class="col-md-2 col-sm-3 offcanvas" id="one"
			data-ng-show="leftmenuloader">
			<div id="fixingPosition" class="fixedPosition">
				<div class="closebtn done">
					<button class="offcanvas__trigger--close btn" data-rel="one">Done</button>
				</div>
				<aside class="clearfix">
					<div class="panel-group price-box" id="accordion" role="tablist"
						aria-multiselectable="true">
						<div class="panel panel-default">
							<div class="panel-heading" role="tab" id="headingname">
								<h4 class="panel-title">
									<a role="button" data-toggle="collapse"
										data-parent="#accordion" data-target="#collapsename"
										aria-expanded="true" class="accordion"
										aria-controls="collapsename"> Find by Bus Name <span><i
											class="tayy tayyarah-keyboard_arrow_right"></i></span>
									</a>
								</h4>
							</div>
							<div id="collapsename" class="panel-collapse collapse in"
								role="tabpanel" aria-labelledby="headingname">
								<div class="panel-body">
									<div class="input-group">
										<input type="text" id="BusName" class="form-control"
											autocomplete="off" placeholder="Enter Bus Name"
											data-ng-model="busname" data-auto-complete-directives-Bus
											data-ui-items="names"> <span class="input-group-btn">

											<button class="btn btn-info" type="button"
												style="padding: 3px 5px;">
												<span class="tayyarah-search"></span>
											</button>
										</span>
									</div>

								</div>
							</div>
						</div>

						<div class="panel panel-default">
							<div class="panel-heading" role="tab" id="headingOne">
								<h4 class="panel-title">
									<a role="button" data-toggle="collapse"
										data-parent="#accordion" data-target="#collapseOne"
										aria-expanded="true" class="accordion"
										aria-controls="collapseOne"> Prices <span><i
											class="tayy tayyarah-keyboard_arrow_right"></i></span>
									</a>
								</h4>
							</div>
							<div id="collapseOne" class="panel-collapse collapse in"
								role="tabpanel" aria-labelledby="headingOne">
								<div class="panel-body">


									<span><b class="text-left"><i class="tayyarah-inr"></i>{{priceSlider.min}}</b></span><span
										class="pull-right"><b><i class="tayyarah-inr"></i>{{priceSlider.max}}</b></span>
									<rzslider rz-slider-floor="priceSlider.floor"
										rz-slider-ceil="priceSlider.ceil"
										rz-slider-model="priceSlider.min"
										rz-slider-high="priceSlider.max"
										rz-slider-step="{{priceSlider.step}}"></rzslider>
								</div>
							</div>
						</div>
						<div class="panel panel-default"
							data-ng-if="bustypelist.length > 0">
							<div class="panel-heading" role="tab" id="headingFive">
								<h4 class="panel-title">
									<a class="collapsed" role="button" data-toggle="collapse"
										data-parent="#accordion" data-target="#collapseThree"
										aria-expanded="false" aria-controls="collapseThree"> Bus
										Type<span><i class="tayy tayyarah-keyboard_arrow_right"></i></span>
									</a>
								</h4>
							</div>
							<div id="collapseThree" class="panel-collapse collapse in"
								role="tabpanel" aria-labelledby="headingFive">
								<div class="panel-body">

									<div class="checkbox" data-ng-repeat="bustype in bustypelist">
										<label> <input type="checkbox" value="{{bustype}}"
											name="airlines" data-ng-change="getbustypename(bustype)"
											data-ng-model="todo"> <span class="checkbox-material"><span
												class="check"></span></span> <span class="searchcheck-b">{{bustype}}
										</span>
										</label>
									</div>
								</div>
							</div>
						</div>

						<div class="panel panel-default"
							data-ng-if="boardlocationlist.length > 0">
							<div class="panel-heading" role="tab" id="headingThree">
								<h4 class="panel-title">
									<a class="collapsed" role="button" data-toggle="collapse"
										data-parent="#accordion" data-target="#collapseFour"
										aria-expanded="false" aria-controls="collapseThree">
										Boarding Point <span><i
											class="tayy tayyarah-keyboard_arrow_right"></i></span>
									</a>
								</h4>
							</div>
							<div id="collapseFour" class="panel-collapse collapse in"
								role="tabpanel" aria-labelledby="headingThree">
								<div class="panel-body">

									<div class="checkbox"
										data-ng-repeat="blocation in boardlocationlist">
										<label> <input type="checkbox" value="{{blocation}}"
											name="airlines"
											data-ng-change="getboardlocationname(blocation)"
											data-ng-model="todo"> <span class="checkbox-material"><span
												class="check"></span></span> <span class="searchcheck-b">{{blocation}}
										</span>
										</label>
									</div>
								</div>
							</div>
						</div>

						<div class="panel panel-default"
							data-ng-if="droplocationlist.length > 0">
							<div class="panel-heading" role="tab" id="headingFour">
								<h4 class="panel-title">
									<a class="collapsed" role="button" data-toggle="collapse"
										data-parent="#accordion" data-target="#collapseFive"
										aria-expanded="false" aria-controls="collapseFour">
										Dropping Point <span><i
											class="tayy tayyarah-keyboard_arrow_right"></i></span>
									</a>
								</h4>
							</div>
							<div id="collapseFive" class="panel-collapse collapse in"
								role="tabpanel" aria-labelledby="headingFour">
								<div class="panel-body">
									<div class="checkbox"
										data-ng-repeat="dlocation in droplocationlist">
										<label> <input type="checkbox" value="{{dlocation}}"
											name="airlines"
											data-ng-change="getdroppinglocationname(dlocation)"
											data-ng-model="todo"> <span class="checkbox-material"><span
												class="check"></span></span> <span class="searchcheck-b">{{dlocation}}
										</span>
										</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</aside>
			</div>
		</div>
	</div>
</div>
