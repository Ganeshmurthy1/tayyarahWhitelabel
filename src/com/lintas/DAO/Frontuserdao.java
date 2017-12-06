package com.lintas.DAO;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.SimpleTimeZone;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import com.lintas.config.HibernateUtil;
import com.lintas.model.BusOrderRow;
import com.lintas.model.Country;
import com.lintas.model.Email;
import com.lintas.model.Enquery;
import com.lintas.model.FlightOrderRow;
import com.lintas.model.FrontUserDetail;
import com.lintas.model.HotelOrderRow;
import com.lintas.model.HotelReport;
import com.lintas.model.LintasQueryForm;



public class Frontuserdao {
	SessionFactory sessionfactory;
	Session session = null;
	Transaction transaction = null;
	public static final org.apache.log4j.Logger logger=org.apache.log4j.Logger.getLogger(Frontuserdao.class);
	/*Insert the User details into the database*/
	public void insertDetails(FrontUserDetail user) 
	{
		try
		{
			session = HibernateUtil.getSessionFactory().openSession();
			transaction = session.beginTransaction();
			session.save(user);
			transaction.commit();
			session.close();
		}
		catch(Exception e)
		{
			logger.info("-----Frontuserdao insertDetails Failed--------"+e.getMessage());
		}


	}
	/*Check User emailid exists or not  in DB */
	public boolean isEmailExists(FrontUserDetail user) 
	{
		boolean exists = false;
		try
		{
			session = HibernateUtil.getSessionFactory().openSession();
			transaction = session.beginTransaction();
			String sql = "from FrontUserDetail a where a.email=:email"; 
			Query query = session.createQuery(sql);
			query.setParameter("email", user.getEmail());
			List<FrontUserDetail> list = query.list();
			if (list.size() > 0) {
				exists = true;
			}
			transaction.commit();
			session.close();
		}catch(Exception e)
		{
			logger.info("-----Frontuserdao isEmailExists Failed--------"+e.getMessage());
		}

		return exists;
	}
	/*Check Email and password are correct*/
	public FrontUserDetail UserLogin(String email, String password)
	{

		FrontUserDetail user = null;
		try
		{	

			session = HibernateUtil.getSessionFactory().openSession();		
			String sql = "from FrontUserDetail a where a.email=:email and  a.password=:password";
			Query query = session.createQuery(sql);
			query.setParameter("email", email);
			query.setParameter("password", password);
			//query.addEntity(FrontUserDetail.class);
			List<FrontUserDetail> list = query.list();
			if (list.size() > 0) {

				for (Iterator iterator = list.iterator(); iterator.hasNext();){

					user = (FrontUserDetail)iterator.next(); 

					user.setId(user.getId());
					user.setFirstName(user.getFirstName());
					user.setLastName(user.getLastName());
					user.setEmail(user.getEmail());
					user.setMobile(user.getMobile());
					user.setCreatedAt(user.getCreatedAt());
					user.setPassword(user.getPassword());
					user.setAbout(user.getAbout());
					user.setCity(user.getCity());
					user.setCountry(user.getCountry());
					user.setFax(user.getFax());
					user.setMiddleName(user.getMiddleName());
					user.setZipCode(user.getZipCode());
					user.setStreetAddress(user.getStreetAddress());
				}
			}
			session.close();
			//System.out.println("getCreatedDate" +user.getCreatedAt());
		}catch(Exception e)
		{
			logger.info("-----Frontuserdao UserLogin Failed--------"+e.getMessage());
			//System.out.println("Exception" +e);
		}

		return user;


	}

	public boolean UpdateProfile(FrontUserDetail user)
	{
		boolean update = false;

		if(user!=null)
		{
		//	System.out.println("user" +user.getCity());
			try
			{
				session = HibernateUtil.getSessionFactory().openSession();
				transaction = session.beginTransaction();			
				session.saveOrUpdate(user);
				transaction.commit();
				update=true;

			}catch(Exception e)
			{
				//System.out.println("Exception" +e);
				if(transaction!=null){
					transaction.rollback();
				}
			}
			finally{
				session.close();
			}
		}

		return update;
	}

	public FrontUserDetail GetUserPassword(String Emailid)
	{
		FrontUserDetail user = null;
		
		try
		{

			session = HibernateUtil.getSessionFactory().openSession();		
			String sql = "from FrontUserDetail a where a.email=:email";
			Query query = session.createQuery(sql);		
			query.setParameter("email", Emailid);
			//query.addEntity(FrontUserDetail.class);
			List list = query.list();
			if (list.size() > 0) {

				for (Iterator iterator = list.iterator(); iterator.hasNext();){
					/*System.out.println("iterator.hasNext()" +iterator.hasNext());*/
					user = (FrontUserDetail)iterator.next(); 
					user.setId(user.getId());
					user.setFirstName(user.getFirstName());
					user.setLastName(user.getLastName());
					user.setEmail(user.getEmail());
					user.setMobile(user.getMobile());
					user.setCreatedAt(user.getCreatedAt());
					user.setPassword(user.getPassword());
					user.setAbout(user.getAbout());
					user.setCity(user.getCity());
					user.setCountry(user.getCountry());
					user.setFax(user.getFax());
					user.setMiddleName(user.getMiddleName());
					user.setZipCode(user.getZipCode());
					user.setStreetAddress(user.getStreetAddress());
					
				}
			}
			session.close();
		}catch(Exception e)
		{
			//System.out.println("Exception" +e);
		}
		return user;
	}

	public List<FlightOrderRow> GetBookingHistory(String userid)
	{

		FlightOrderRow flightdetails = null;
		List<FlightOrderRow> historylist = new ArrayList<FlightOrderRow>(); 

		try
		{
			//System.out.println("userid" +userid);
			/*" + userid + "*/
			session = HibernateUtil.getSessionFactory().openSession();		
			String sql = "from FlightOrderRow a where a.createdBy =:createdby ";
			Query query = session.createQuery(sql);
			query.setParameter("createdby", userid);
			//query.addEntity(FlightOrderRow.class);
			List<FlightOrderRow> list  = query.list();	
			if (list.size() > 0) {

				for (Iterator iterator = list.iterator(); iterator.hasNext();){
					//System.out.println("iterator.hasNext()" +iterator.hasNext());
					flightdetails = (FlightOrderRow)iterator.next(); 
					//System.out.println(flightdetails.getFinalPrice());
					BigDecimal price = new BigDecimal(String.valueOf(flightdetails.getFinalPrice()));
					price = price.setScale(2, BigDecimal.ROUND_HALF_EVEN);
					flightdetails.setFinalPrice(price);
					historylist.add(flightdetails);
				}
			}
			session.close();
		}catch(Exception e)
		{
			//System.out.println("Exception" +e);
		}

		return historylist;

	}
	
	public List<HotelOrderRow> GetBookingHotelHistory(String userid)
	{

		HotelOrderRow hoteldetails = null;
		List<HotelOrderRow> historylist = new ArrayList<HotelOrderRow>(); 

		try
		{
			//System.out.println("userid" +userid);
			/*" + userid + "*/
			session = HibernateUtil.getSessionFactory().openSession();		
			String sql = "from HotelOrderRow a where a.createdBy =:createdby ";
			Query query = session.createQuery(sql);
			query.setParameter("createdby", userid);
			//query.addEntity(FlightOrderRow.class);
			List<HotelOrderRow> list  = query.list();	
			if (list.size() > 0) {

				for (Iterator iterator = list.iterator(); iterator.hasNext();){
					//System.out.println("iterator.hasNext()" +iterator.hasNext());
					hoteldetails = (HotelOrderRow)iterator.next(); 
					System.out.println(hoteldetails.getFinalPrice());
					BigDecimal price = new BigDecimal(String.valueOf(hoteldetails.getFinalPrice()));
					price = price.setScale(2, BigDecimal.ROUND_HALF_EVEN);
					hoteldetails.setFinalPrice(price);
					historylist.add(hoteldetails);
				}
			}
			session.close();
		}catch(Exception e)
		{
			//System.out.println("Exception" +e);
		}

		return historylist;

	}
	
	
	public List<BusOrderRow> GetBookingBusHistory(String userid)
	{

		BusOrderRow busdetails = null;
		List<BusOrderRow> historylist = new ArrayList<BusOrderRow>(); 

		try
		{
			//System.out.println("userid" +userid);
			/*" + userid + "*/
			session = HibernateUtil.getSessionFactory().openSession();		
			String sql = "from BusOrderRow a where a.createdBy =:createdby ";
			Query query = session.createQuery(sql);
			query.setParameter("createdby", userid);
			//query.addEntity(FlightOrderRow.class);
			List<BusOrderRow> list  = query.list();	
			if (list.size() > 0) {

				for (Iterator iterator = list.iterator(); iterator.hasNext();){
					//System.out.println("iterator.hasNext()" +iterator.hasNext());
					busdetails = (BusOrderRow)iterator.next(); 
					BigDecimal price = new BigDecimal(String.valueOf(busdetails.getTotalAmount()));
					price = price.setScale(2, BigDecimal.ROUND_HALF_EVEN);
					busdetails.setTotalAmount(price);
					historylist.add(busdetails);
				}
			}
			session.close();
		}catch(Exception e)
		{
			//System.out.println("Exception" +e);
		}
		return historylist;

	}
	
	
	
	
	
	
	
	public List<HotelReport> GetHotelBookingHistoryList(String userid)
	{


		List<HotelReport> historylist = new ArrayList<HotelReport>(); 

		try
		{
			
			/*" + userid + "*/
			session = HibernateUtil.getSessionFactory().openSession();		
			String sql = "from HotelOrderRow a where a.createdBy =:createdBy ";
			Query query = session.createQuery(sql);
			query.setParameter("createdBy", userid);
			//	query.addEntity(HotelOrderRow.class);
			List<HotelOrderRow> list  = query.list();	
			
			if(list.size() > 0){
			for (Iterator  iterator = list.iterator(); iterator.hasNext();){
				HotelOrderRow hor = (HotelOrderRow)iterator.next(); 
				HotelReport reportData=new HotelReport();
				SimpleDateFormat sdf = new SimpleDateFormat();
				sdf.setTimeZone(new SimpleTimeZone(0, "GMT"));
				sdf.applyPattern("dd-MM-yyyy");
				reportData.setCheckInDate(sdf.format(hor.getCheckInDate()));

				reportData.setCheckOutDate(sdf.format(hor.getCheckOutDate()));
				BigDecimal basePrice= hor.getApiPrice().multiply(hor.getApiToBaseExchangeRate()) ;
				BigDecimal taxes= hor.getTaxes().multiply(hor.getApiToBaseExchangeRate()) ;
				BigDecimal totalBasePrice=basePrice.add(hor.getMarkupAmount());
				BigDecimal basePriceInBooking=totalBasePrice.multiply(hor.getBaseToBookingExchangeRate());
				BigDecimal taxesInBooking=taxes.multiply(hor.getBaseToBookingExchangeRate());
				BigDecimal totalPrice=hor.getFeeAmount().add(basePriceInBooking).add(taxesInBooking);



				reportData.setCompanyId(hor.getCompanyId());
				reportData.setConfigId(hor.getConfigId());
				reportData.setCreatedBy(hor.getCreatedBy());
				reportData.setBooking_status(hor.getBookingStatus());
				reportData.setOrderRef(hor.getOrderReference());
				reportData.setGuests(hor.getTotalGuest());
				reportData.setTax(taxesInBooking);
				reportData.setGuests(hor.getTotalGuest());
				reportData.setTotal(totalPrice.setScale(2, BigDecimal.ROUND_UP));

				reportData.setFee_amount(hor.getFeeAmount());
				reportData.setDiscount(hor.getDiscountAmount());
				reportData.setAgentCom(hor.getMarkupAmount());
				reportData.setPaymentStatus(hor.getPaymentStatus());
				reportData.setStatusAction(hor.getStatusAction());
				reportData.setHotelName(hor.getHotelOrderHotelData().getName());
				reportData.setCountry(hor.getHotelOrderHotelData().getCountry());
				reportData.setCurCode(hor.getBaseCurrency());
				reportData.setId(hor.getId());
				reportData.setHotel_loc(hor.getHotelOrderHotelData().getHotelLocation());
				reportData.setPhone(hor.getHotelOrderHotelData().getTelephone());
				reportData.setFirstname(hor.getOrderCustomer().getFirstName());
				reportData.setLastname(hor.getOrderCustomer().getLastName());
				reportData.setEmail(hor.getOrderCustomer().getEmail());
				reportData.setState(hor.getHotelOrderHotelData().getState());
				reportData.setHotel_cat(hor.getHotelOrderHotelData().getHotelCategory());
				reportData.setApiComments(hor.getApiComments());
				reportData.setUserCommits(hor.getUserComments());
				reportData.setUserId(hor.getUserId());
				reportData.setCreatedDate(hor.getBookingDate());
				if(hor.getBookingStatus() != "Confirmed")
			     	reportData.setStatus("Failed");
				else
					reportData.setStatus(hor.getBookingStatus());

				historylist.add(reportData);
			}
			
			}
			
			session.close();
		}catch(Exception e)
		{
			//System.out.println("Exception" +e);
		}

		return historylist;

	}
	
	public List<FlightOrderRow> SearchBookingHistory(String userid,String startdate,String enddate)
	{

		FlightOrderRow flightdetails = null;
		List<FlightOrderRow> historylist = new ArrayList<FlightOrderRow>(); 
	
		try
		{
			//System.out.println("userid" +userid);
			/*" + userid + "*/
			session = HibernateUtil.getSessionFactory().openSession();		
			String sql = "from FlightOrderRow a where a.createdBy =:created_by and date(a.bookingDate) between '"+startdate+"' and '"+enddate+"' order by a.id desc";
			Query query = session.createQuery(sql);
			query.setParameter("created_by", userid);
			//query.addEntity(FlightOrderRow.class);
			///System.out.println("sql" +sql);			
			List<FlightOrderRow> list  = query.list();	
			if (list.size() > 0) {

				for (Iterator iterator = list.iterator(); iterator.hasNext();){
					//System.out.println("iterator.hasNext()" +iterator.hasNext());
					flightdetails = (FlightOrderRow)iterator.next(); 
					//System.out.println(flightdetails.getFinalPrice());
					BigDecimal price = new BigDecimal(String.valueOf(flightdetails.getFinalPrice()));
					price = price.setScale(2, BigDecimal.ROUND_HALF_EVEN);
					flightdetails.setFinalPrice(price);
					historylist.add(flightdetails);
				}
			}
			session.close();
		}catch(Exception e)
		{
			//System.out.println("Exception" +e);
		}

		return historylist;

	}
	public List<HotelReport> SearchBookingHotelHistory(String userid,String startdate,String enddate)
	{


		List<HotelReport> historylist = new ArrayList<HotelReport>();
		
		try
		{
			//System.out.println("userid" +userid);
			/*" + userid + "*/
			session = HibernateUtil.getSessionFactory().openSession();		
			String sql = "from HotelOrderRow a where a.createdBy =:createdBy and date(a.createdAt) between '"+startdate+"' and '"+enddate+"' order by a.id desc";
			Query query = session.createQuery(sql);
			query.setParameter("createdBy", userid);
			
			//query.addEntity(HotelOrderRow.class);
			List<HotelOrderRow> list  = query.list();	
			for (Iterator  iterator = list.iterator(); iterator.hasNext();){
				HotelOrderRow hor= (HotelOrderRow)iterator.next(); 
			
				HotelReport reportData=new HotelReport();
				SimpleDateFormat sdf = new SimpleDateFormat();
				sdf.setTimeZone(new SimpleTimeZone(0, "GMT"));
				sdf.applyPattern("dd-MM-yyyy");
				reportData.setCheckInDate(sdf.format(hor.getCheckInDate()));

				reportData.setCheckOutDate(sdf.format(hor.getCheckOutDate()));
				BigDecimal basePrice= hor.getApiPrice().multiply(hor.getApiToBaseExchangeRate()) ;
				BigDecimal taxes= hor.getTaxes().multiply(hor.getApiToBaseExchangeRate()) ;
				BigDecimal totalBasePrice=basePrice.add(hor.getMarkupAmount());
				BigDecimal basePriceInBooking=totalBasePrice.multiply(hor.getBaseToBookingExchangeRate());
				BigDecimal taxesInBooking=taxes.multiply(hor.getBaseToBookingExchangeRate());
				BigDecimal totalPrice=hor.getFeeAmount().add(basePriceInBooking).add(taxesInBooking);



				reportData.setCompanyId(hor.getCompanyId());
				reportData.setConfigId(hor.getConfigId());
				reportData.setCreatedBy(hor.getCreatedBy());
				reportData.setBooking_status(hor.getBookingStatus());
				reportData.setOrderRef(hor.getOrderReference());
				reportData.setGuests(hor.getTotalGuest());
				reportData.setTax(taxesInBooking);
				reportData.setGuests(hor.getTotalGuest());
				reportData.setTotal(totalPrice.setScale(2, BigDecimal.ROUND_UP));

				reportData.setFee_amount(hor.getFeeAmount());
				reportData.setDiscount(hor.getDiscountAmount());
				reportData.setAgentCom(hor.getMarkupAmount());
				reportData.setPaymentStatus(hor.getPaymentStatus());
				reportData.setStatusAction(hor.getStatusAction());
				reportData.setHotelName(hor.getHotelOrderHotelData().getName());
				reportData.setCountry(hor.getHotelOrderHotelData().getCountry());
				reportData.setCurCode(hor.getBaseCurrency());
				reportData.setId(hor.getId());
				reportData.setHotel_loc(hor.getHotelOrderHotelData().getHotelLocation());
				reportData.setPhone(hor.getHotelOrderHotelData().getTelephone());
				reportData.setFirstname(hor.getOrderCustomer().getFirstName());
				reportData.setLastname(hor.getOrderCustomer().getLastName());
				reportData.setEmail(hor.getOrderCustomer().getEmail());
				reportData.setState(hor.getHotelOrderHotelData().getState());
				reportData.setHotel_cat(hor.getHotelOrderHotelData().getHotelCategory());
				reportData.setApiComments(hor.getApiComments());
				reportData.setUserCommits(hor.getUserComments());
				reportData.setUserId(hor.getUserId());
				if(hor.getBookingStatus() != "Confirmed")
			     	reportData.setStatus("Failed");
				else
					reportData.setStatus(hor.getBookingStatus());
				
				historylist.add(reportData);
			}
			session.close();

		}catch(Exception e)
		{
			//System.out.println("Exception" +e);
		}

		return historylist;

	}

	public List<Country> getCountryList()
	{
		List<Country> countryLi=null;
		try
		{
			session = HibernateUtil.getSessionFactory().openSession();
			String sql="from Country";
			Query query = session.createQuery(sql);
			//query.addEntity(Country.class);
			countryLi = query.list();
			return countryLi;
			/*session.close();*/
		}
		catch (HibernateException e) {
			logger.error("--------------HibernateException-----------------"+e.getMessage());
		}finally {
			session.close(); 
		}
		return countryLi;
	}


	public Email insertEmail(String userid,int status,int emailType)
	{
		Session session = null;
		Transaction transaction = null;
		Email email = new Email();
		try{
			session = HibernateUtil.getSessionFactory().openSession();
			transaction = session.beginTransaction();
			email.setOrderId(userid);
			email.setMailStatus(status);
			email.setType(emailType);
			Timestamp updated_at = new Timestamp(new Date().getTime());		
			email.setUpdatedAt(updated_at);
			email.setCreatedAt(updated_at);
			session.save(email);
			transaction.commit();
		}catch(HibernateException e){
			if(transaction!=null){
				transaction.rollback();
			}
			logger.info("insertEmail"+e.getMessage());
			//System.out.println("Exception" +e.getMessage());
		}
		finally{
			if(session != null && session.isOpen())
				session.close();
		}
		return email;
	}

	/*Insert the User details into the database*/
	public void insertQueryDetails(LintasQueryForm query) throws Exception
	{
		session = HibernateUtil.getSessionFactory().openSession();
		transaction = session.beginTransaction();
		session.save(query);
		transaction.commit();
		session.close();

	}

	/*Insert the Travel Query details into the database*/
	public boolean insertTravelQueryDetails(Enquery query) throws Exception
	{
		boolean isinserted = false;
		try{
			session = HibernateUtil.getSessionFactory().openSession();
			transaction = session.beginTransaction();
			session.save(query);
			transaction.commit();
			session.close();
			isinserted = true;
		}catch(Exception e){
			isinserted = false;
			logger.info("insertTravelQueryDetailsException"+e.getMessage());
		}
		return isinserted;
	}

}
