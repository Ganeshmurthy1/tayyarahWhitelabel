package com.admin.flight.fin.sheet.action;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.struts2.dispatcher.SessionMap;
import org.apache.struts2.interceptor.SessionAware;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import com.admin.common.util.CommonUtilSession;
import com.admin.flight.fin.sheet.Dao.FlightTravelRequestDao;
import com.admin.flight.fin.sheet.model.FlightTravelRequest;
import com.admin.flight.fin.sheet.model.FlightTravelRequestConnectingFlightTripDetail;
import com.admin.flight.fin.sheet.model.FlightTravelRequestQuotation;
import com.admin.flight.fin.sheet.model.FlightTravelRequestTripDetail;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lintas.model.User;
import com.opensymphony.xwork2.ActionSupport;

public class FlightTravelRequestQuotationAction  extends ActionSupport implements SessionAware {
	private static final long serialVersionUID = 1L;
	private FlightTravelRequestDao flightTravelRequestDao = new FlightTravelRequestDao();
	private String QuotationJson;
	private String QuotationUpdateJson;
	private Long flightQuotationRequestId;
	private List<FlightTravelRequestQuotation> flightRequestQuotationList = null;
	SessionMap<String, Object> sessionMap; 

	public String createFlightRequestTravelQuotationIBE()  {
		User sessionUser=(User)sessionMap.get("agent");
		int userId= CommonUtilSession.checkEmulatedUser(sessionMap)?CommonUtilSession.getEmulatedUserIdInt(sessionMap):sessionUser.getId();
		int companyId= sessionUser.getCompanyid();
		try{
			JSONParser parser = new JSONParser();
			JSONObject quotejson = (JSONObject) parser.parse(QuotationJson);	
			String RequestId =  (String) quotejson.get("flightTravelRequest");
			flightQuotationRequestId = Long.parseLong(RequestId);	
			FlightTravelRequest flightTravelRequest = flightTravelRequestDao.getFlightTravelRequestDetails(flightQuotationRequestId);
			JSONArray quotationsArray = (JSONArray) quotejson.get("quotes");
			JSONArray quotationsTripsArray = (JSONArray) quotejson.get("trips");
			JSONArray quotationsConnectTripsArray = (JSONArray) quotejson.get("connecttrip");
			flightRequestQuotationList = new ArrayList<FlightTravelRequestQuotation>();
			ObjectMapper mapper = new ObjectMapper();

			if (quotationsArray != null) { 			
				for (int i=0;i<quotationsArray.size();i++){ 
					FlightTravelRequestQuotation flightTravelRequestQuotation =  mapper.readValue(quotationsArray.get(i).toString(), FlightTravelRequestQuotation.class);

					String additionalDataSchema = "<#origin(|)text(|)oridata(|)1(|)fixed(|)Origin#>"
							+"<#destination(|)text(|)destdata(|)2(|)fixed(|)Destination#>"
							+"<#tripType(|)select(|)tripdata(|)3(|)fixed(|)Trip Type#>"
							+"<#transDepartureDate(|)text(|)departdata(|)4(|)fixed(|)Onward Date#>"
							+"<#transArrivalDate(|)text(|)arrivaldata(|)5(|)fixed(|)Return Date#>"
							+ "<#airline(|)select(|)airdata(|)6(|)fixed(|)Airline#>"
							+ "<#bookingClassPrefer(|)select(|)classdata(|)7(|)fixed(|)Booking Class#>"
							+ "<#passengerCount(|)number(|)passcountdata(|)8(|)fixed(|)Passenger Count#>"
							+ "<#totalAmount(|)text(|)totaldata(|)9(|)fixed(|)TotalAmount (INR)#>";
					
					additionalDataSchema = additionalDataSchema.replace("oridata", flightTravelRequestQuotation.getOrigin());
					additionalDataSchema = additionalDataSchema.replace("destdata",flightTravelRequestQuotation.getDestination() );
					additionalDataSchema = additionalDataSchema.replace("tripdata",(flightTravelRequestQuotation.getTripType().equalsIgnoreCase("O")?"Oneway":"Round") );

					additionalDataSchema = additionalDataSchema.replace("departdata",flightTravelRequestQuotation.getTransDepartureDate() );
					if(flightTravelRequestQuotation.getTransArrivalDate()!=null)
						additionalDataSchema = additionalDataSchema.replace("arrivaldata",flightTravelRequestQuotation.getTransArrivalDate());
					else
						additionalDataSchema = additionalDataSchema.replace("arrivaldata","----");
					additionalDataSchema = additionalDataSchema.replace("airdata",flightTravelRequestQuotation.getAirline());
					additionalDataSchema = additionalDataSchema.replace("classdata",flightTravelRequestQuotation.getBookingClassPrefer());
					additionalDataSchema = additionalDataSchema.replace("passcountdata",String.valueOf(flightTravelRequestQuotation.getPassengerCount()));
					additionalDataSchema = additionalDataSchema.replace("totaldata",String.valueOf(flightTravelRequestQuotation.getTotalAmount()));

					flightTravelRequestQuotation.setAdditionalData(additionalDataSchema);
					flightTravelRequestQuotation.setUserId(userId);
					flightTravelRequestQuotation.setCompanyId(companyId);

					flightRequestQuotationList.add(flightTravelRequestQuotation);
				}
			}

			List<FlightTravelRequestQuotation> flightTravelRequestQuotationlist = new ArrayList<>();
			List<FlightTravelRequestTripDetail> updateWithQuoteIdFlightTravelRequestTripDetailList = new ArrayList<>();
			if(flightTravelRequest!=null){				
				flightTravelRequestQuotationlist = flightTravelRequestDao.insertFlightQuotationList(flightRequestQuotationList, flightTravelRequest);				
				List<FlightTravelRequestTripDetail> flightTravelRequestTripDetailList = new ArrayList<>();
				if (quotationsTripsArray != null) { 			
					for (int i=0;i<quotationsTripsArray.size();i++){ 
						JSONArray quotationsTripconnectArray = (JSONArray) quotationsTripsArray.get(i);
						for (int j=0;j<quotationsTripconnectArray.size();j++){ 
							FlightTravelRequestTripDetail flightTravelRequestTripDetail =  mapper.readValue(quotationsTripconnectArray.get(j).toString(), FlightTravelRequestTripDetail.class);
							FlightTravelRequestQuotation flightTravelRequestQuotation = flightTravelRequestQuotationlist.get(i);
							SimpleDateFormat sdfT = new SimpleDateFormat("HH:mm");
							flightTravelRequestTripDetail.setDepartureTime(sdfT.parse(flightTravelRequestTripDetail.getDepTime()));
							flightTravelRequestTripDetail.setArrivalTime(sdfT.parse(flightTravelRequestTripDetail.getArrTime()));					
							flightTravelRequestTripDetail.setCreatedAt(new Timestamp(new Date().getTime()));	
							flightTravelRequestTripDetail.setFlightTravelRequest(flightTravelRequest);
							flightTravelRequestTripDetail.setFlightTravelRequestQuotationId(flightTravelRequestQuotation.getId());
							flightTravelRequestTripDetailList.add(flightTravelRequestTripDetail);
						}
					}
				}

				List<FlightTravelRequestTripDetail> updateFlightTravelRequestTripDetailList = flightTravelRequestDao.insertFlightTravelTripDetailList(flightTravelRequestTripDetailList);
				List<FlightTravelRequestConnectingFlightTripDetail> flightTravelRequestConnectingFlightTripDetailList = new ArrayList<>();
				if(updateFlightTravelRequestTripDetailList.size() > 0){			
				if (quotationsConnectTripsArray != null && quotationsConnectTripsArray.size() > 0) { 		
					for (int i=0;i<quotationsConnectTripsArray.size();i++){
						JSONArray connectArray = (JSONArray) quotationsConnectTripsArray.get(i);
						if(connectArray.size() > 0){
							for (int j=0;j<connectArray.size();j++){
								FlightTravelRequestConnectingFlightTripDetail flightTravelRequestConnectingFlightTripDetail = mapper.readValue(connectArray.get(j).toString(), FlightTravelRequestConnectingFlightTripDetail.class);
								FlightTravelRequestTripDetail flightTravelRequestTripDetail = updateFlightTravelRequestTripDetailList.get(i);
								if(flightTravelRequestTripDetail!=null){
									flightTravelRequestConnectingFlightTripDetail.setFlightTravelRequestTripDetail(flightTravelRequestTripDetail);
								}
								SimpleDateFormat sdfT = new SimpleDateFormat("HH:mm");
								flightTravelRequestConnectingFlightTripDetail.setDepartureTime(sdfT.parse(flightTravelRequestConnectingFlightTripDetail.getDepTime()));
								flightTravelRequestConnectingFlightTripDetail.setArrivalTime(sdfT.parse(flightTravelRequestConnectingFlightTripDetail.getArrTime()));					
								flightTravelRequestConnectingFlightTripDetail.setCreatedAt(new Timestamp(new Date().getTime()));	
								flightTravelRequestConnectingFlightTripDetailList.add(flightTravelRequestConnectingFlightTripDetail);
							}
						}
					}
				}
				}
				boolean isInserted = flightTravelRequestDao.insertFlightTravelConnectingTripDetailList(flightTravelRequestConnectingFlightTripDetailList);
				
				if(isInserted){
					return SUCCESS;
				}
				else{

					return ERROR;
				}			

			}
			else{
				return ERROR;
			}
		}catch(Exception e){
			//System.out.println("Exception "+e.getLocalizedMessage());
			return ERROR;
		}



	}
	
	
	public String createRoundFlightRequestTravelQuotation()  {
		User sessionUser=(User)sessionMap.get("agent");
		int userId= CommonUtilSession.checkEmulatedUser(sessionMap)?CommonUtilSession.getEmulatedUserIdInt(sessionMap):sessionUser.getId();
		int companyId= sessionUser.getCompanyid();
		try{	
			JSONParser parser = new JSONParser();
			JSONObject quotejson = (JSONObject) parser.parse(QuotationJson);	
			String RequestId =  (String) quotejson.get("flightTravelRequest");
			flightQuotationRequestId = Long.parseLong(RequestId);	
			FlightTravelRequest flightTravelRequest = flightTravelRequestDao.getFlightTravelRequestDetails(flightQuotationRequestId);
			JSONArray quotationsArray = (JSONArray) quotejson.get("quotes");
			JSONArray quotationsTripsArray = (JSONArray) quotejson.get("trips");
			JSONArray quotationsConnectTripsArray = (JSONArray) quotejson.get("connecttrip");
			flightRequestQuotationList = new ArrayList<FlightTravelRequestQuotation>();
			ObjectMapper mapper = new ObjectMapper();
			
			
			
			if (quotationsArray != null) { 			
				for (int i=0;i<quotationsArray.size();i++){ 
					FlightTravelRequestQuotation flightTravelRequestQuotation =  mapper.readValue(quotationsArray.get(i).toString(), FlightTravelRequestQuotation.class);
					
					String additionalDataSchema = "<#origin(|)text(|)oridata(|)1(|)fixed(|)Origin#>"
							+"<#destination(|)text(|)destdata(|)2(|)fixed(|)Destination#>"
							+"<#tripType(|)select(|)tripdata(|)3(|)fixed(|)Trip Type#>"
							+"<#transDepartureDate(|)text(|)departdata(|)4(|)fixed(|)Onward Date#>"
							+"<#transArrivalDate(|)text(|)arrivaldata(|)5(|)fixed(|)Return Date#>"
							+ "<#airline(|)select(|)airdata(|)6(|)fixed(|)Airline#>"
							+ "<#bookingClassPrefer(|)select(|)classdata(|)7(|)fixed(|)Booking Class#>"
							+ "<#passengerCount(|)number(|)passcountdata(|)8(|)fixed(|)Passenger Count#>"
							+ "<#totalAmount(|)text(|)totaldata(|)9(|)fixed(|)TotalAmount (INR)#>";
					
					additionalDataSchema = additionalDataSchema.replace("oridata", flightTravelRequestQuotation.getOrigin());
					additionalDataSchema = additionalDataSchema.replace("destdata",flightTravelRequestQuotation.getDestination() );
					additionalDataSchema = additionalDataSchema.replace("tripdata",(flightTravelRequestQuotation.getTripType().equalsIgnoreCase("O")?"OneWay":"RoundTrip") );
					
					additionalDataSchema = additionalDataSchema.replace("departdata",flightTravelRequestQuotation.getTransDepartureDate() );
					if(flightTravelRequestQuotation.getTransArrivalDate()!=null)
						additionalDataSchema = additionalDataSchema.replace("arrivaldata",flightTravelRequestQuotation.getTransArrivalDate());
				
					additionalDataSchema = additionalDataSchema.replace("airdata",flightTravelRequestQuotation.getAirline());
					additionalDataSchema = additionalDataSchema.replace("classdata",flightTravelRequestQuotation.getBookingClassPrefer());
					additionalDataSchema = additionalDataSchema.replace("passcountdata",String.valueOf(flightTravelRequestQuotation.getPassengerCount()));
					additionalDataSchema = additionalDataSchema.replace("totaldata",String.valueOf(flightTravelRequestQuotation.getTotalAmount()));

					flightTravelRequestQuotation.setAdditionalData(additionalDataSchema);

					//flightTravelRequestQuotation.setFlightTravelRequestTripDetails(updateFlightTravelRequestTripDetailList);
					flightTravelRequestQuotation.setUserId(userId);
					flightTravelRequestQuotation.setCompanyId(companyId);
					flightRequestQuotationList.add(flightTravelRequestQuotation);
				}				


			}

			List<FlightTravelRequestQuotation> flightTravelRequestQuotationlist = new ArrayList<>();
			List<FlightTravelRequestTripDetail> updateWithQuoteIdFlightTravelRequestTripDetailList = new ArrayList<>();
			if(flightTravelRequest!=null){
				flightTravelRequestQuotationlist = flightTravelRequestDao.insertFlightQuotationList(flightRequestQuotationList, flightTravelRequest);				
				List<FlightTravelRequestTripDetail> flightTravelRequestTripDetailList = new ArrayList<>();
				if (quotationsTripsArray != null) { 			
					for (int i=0;i<quotationsTripsArray.size();i++){ 
						JSONArray quotationsTripconnectArray = (JSONArray) quotationsTripsArray.get(i);
						for (int j=0;j<quotationsTripconnectArray.size();j++){ 
							FlightTravelRequestTripDetail flightTravelRequestTripDetail =  mapper.readValue(quotationsTripconnectArray.get(j).toString(), FlightTravelRequestTripDetail.class);
							FlightTravelRequestQuotation flightTravelRequestQuotation = flightTravelRequestQuotationlist.get(i);
							SimpleDateFormat sdfT = new SimpleDateFormat("HH:mm");
							flightTravelRequestTripDetail.setDepartureTime(sdfT.parse(flightTravelRequestTripDetail.getDepTime()));
							flightTravelRequestTripDetail.setArrivalTime(sdfT.parse(flightTravelRequestTripDetail.getArrTime()));					
							flightTravelRequestTripDetail.setCreatedAt(new Timestamp(new Date().getTime()));	
							flightTravelRequestTripDetail.setFlightTravelRequest(flightTravelRequest);	
							flightTravelRequestTripDetail.setFlightTravelRequestQuotationId(flightTravelRequestQuotation.getId());
							flightTravelRequestTripDetailList.add(flightTravelRequestTripDetail);
						}
					}
				}
				
				List<FlightTravelRequestConnectingFlightTripDetail> flightTravelRequestConnectingFlightTripDetailList = new ArrayList<>();
				if (quotationsConnectTripsArray != null && quotationsConnectTripsArray.size() > 0) { 
					for (int i=0;i<quotationsConnectTripsArray.size();i++){
						JSONArray connectArray = (JSONArray) quotationsConnectTripsArray.get(i);					
						for (int j=0;j<connectArray.size();j++){
							FlightTravelRequestConnectingFlightTripDetail flightTravelRequestConnectingFlightTripDetail = mapper.readValue(connectArray.get(j).toString(), FlightTravelRequestConnectingFlightTripDetail.class);
							SimpleDateFormat sdfT = new SimpleDateFormat("HH:mm");
							flightTravelRequestConnectingFlightTripDetail.setDepartureTime(sdfT.parse(flightTravelRequestConnectingFlightTripDetail.getDepTime()));
							flightTravelRequestConnectingFlightTripDetail.setArrivalTime(sdfT.parse(flightTravelRequestConnectingFlightTripDetail.getArrTime()));					
							flightTravelRequestConnectingFlightTripDetail.setCreatedAt(new Timestamp(new Date().getTime()));							
							flightTravelRequestConnectingFlightTripDetailList.add(flightTravelRequestConnectingFlightTripDetail);
						}
						
					}
				}
				
				boolean onwardinserted = flightTravelRequestDao.insertFlightTravelConnectingTripDetail(flightTravelRequestTripDetailList,flightTravelRequestConnectingFlightTripDetailList);
				
				if(onwardinserted){
					return SUCCESS;
				}				
				else{
					return ERROR;
				}

			}
			else{
				return ERROR;
			}
		}catch(Exception e){
			//System.out.println("Exception "+e.getLocalizedMessage());
			return ERROR;
		}



	}
	
	public String updateQuotation(){		
		try{
			JSONParser parser = new JSONParser();
			JSONObject quotejson = (JSONObject) parser.parse(QuotationUpdateJson);	
			String QuotationId =  (String) quotejson.get("flightQuotationRequestId");
			long flightQuotationId = Long.parseLong(QuotationId);
			long totalAmount =  (Long) quotejson.get("totalAmount");
			long totalBasePrice =  (Long) quotejson.get("totalBasePrice");
			long totalTaxes =  (Long) quotejson.get("totalTaxed");
			boolean isUpdated = flightTravelRequestDao.updateFlightQuotation(flightQuotationId, totalAmount, totalBasePrice, totalTaxes);
			if (isUpdated) {
				return SUCCESS;
			}else
			{
				return ERROR;
			}
		}catch(Exception e){
		//	System.out.println("updateQuotation Exception " +e);
			return ERROR;
			
		}	
		
	}

	public String getQuotationJson() {
		return QuotationJson;
	}

	public void setQuotationJson(String quotationJson) {
		QuotationJson = quotationJson;
	}

	public Long getFlightQuotationRequestId() {
		return flightQuotationRequestId;
	}

	public void setFlightQuotationRequestId(Long flightQuotationRequestId) {
		this.flightQuotationRequestId = flightQuotationRequestId;
	}


	public String getQuotationUpdateJson() {
		return QuotationUpdateJson;
	}


	public void setQuotationUpdateJson(String quotationUpdateJson) {
		QuotationUpdateJson = quotationUpdateJson;
	}
	@Override
	public void setSession(Map<String, Object> map) {
		// TODO Auto-generated method stub
		sessionMap=(SessionMap<String, Object>) map;
	}
}
