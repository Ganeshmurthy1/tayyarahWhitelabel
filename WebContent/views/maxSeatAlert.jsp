<%@taglib prefix="s" uri="/struts-tags"%>
<div class="modal-dialog seat-count margintop85px" tabindex="-1"
	role="dialog" aria-labelledby="myModalLabel">
	<div class="modal-content timeModal">
		<div class="modal-header">
			<h4 class="modal-title text-center mobWhiteText">Seat Count</h4>
		</div>
		<div class="modal-body errorBody">
			<div class="row padtopDown20px text-center">{{message}}</div>

			<div id="ErrFooter" class="row">
				<div class="modal-footer">
					<div class="form-btn-group tayy-button ">
						<button type="button"
							class="btn btn-default btn-xs border-Btn closeBtn"
							data-ng-click="close()">Close</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>






