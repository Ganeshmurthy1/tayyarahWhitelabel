package com.admin.hotel.fin.sheet.Dao;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;

import com.admin.hotel.fin.sheet.model.HotelTravelRequestQuotation;
import com.admin.hotel.fin.sheet.model.HotelTravelRequest;
import com.intelli.util.DateConversion;
import com.lintas.config.HibernateUtil;
;
public class HotelTravelRequestDao {
	public HotelTravelRequest insertHotelQuotationRowDetails(HotelTravelRequest hotelQuotationRow){
		// TODO Auto-generated method stub
		Session session= null;
		Transaction transaction=null;
		try {
			session = HibernateUtil.getSessionFactory().openSession();
			transaction = session.beginTransaction();
			session.save(hotelQuotationRow);
			transaction.commit();

		} catch (Exception e) {
			if(transaction!=null){
				transaction.rollback();
			}
			e.printStackTrace();
		}
		finally{
			if(session!=null && session.isOpen()){
				session.close();
			}
		}

		return hotelQuotationRow;

	}


	public List<HotelTravelRequest>  loadHotelQuotationRowList(){
		// TODO Auto-generated method stub
		Session session= null;
		List<HotelTravelRequest>  newList= new ArrayList<>();
		try {
			session = HibernateUtil.getSessionFactory().openSession();
			Criteria criteria=session.createCriteria(HotelTravelRequest.class);
			List<HotelTravelRequest> list= criteria.list();
			if(list!=null && list.size()>0){
				for(HotelTravelRequest hotetTravelRequest:list){
					hotetTravelRequest.setCheckIn(DateConversion.convertDateToStringDatewirhDDMonthYear(hotetTravelRequest.getCheckInDate()));
					hotetTravelRequest.setCheckOut(DateConversion.convertDateToStringDatewirhDDMonthYear(hotetTravelRequest.getCheckOutDate()));
					newList.add(hotetTravelRequest);
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		finally{
			if(session!=null && session.isOpen()){
				session.close();
			}
		}

		return newList;

	}

	public HotelTravelRequest getHotelQuotationRequestDetails(Long id){
		HotelTravelRequest hotetTravelRequest=null;

		Session session= null;

		try {
			session = HibernateUtil.getSessionFactory().openSession();
			Criteria criteria=session.createCriteria(HotelTravelRequest.class);
			criteria.add(Restrictions.eq("id", id));
			hotetTravelRequest= (HotelTravelRequest) criteria.uniqueResult();
		} catch (Exception e) {
		
		}
		finally{
			if(session!=null && session.isOpen()){
				session.close();
			}
		}
		return hotetTravelRequest;

	}

	public boolean insertHotelQuotationList(List<HotelTravelRequestQuotation> hotelTravelRequestQuotation,HotelTravelRequest hotetTravelRequest, int userId, int companyId){
		boolean isInserted=false;
		Session session= null;
		Transaction transaction=null;		
		try {
			session = HibernateUtil.getSessionFactory().openSession();
			transaction = session.beginTransaction();		
			if(hotelTravelRequestQuotation!=null && hotelTravelRequestQuotation.size()>0){
				for(HotelTravelRequestQuotation hotelQuotation:hotelTravelRequestQuotation){					
					hotelQuotation.setCreatedAt(new Timestamp(new Date().getTime()));
					hotelQuotation.setUserId(userId);
					hotelQuotation.setCompanyId(companyId);
					hotelQuotation.setHotelTravelRequest(hotetTravelRequest);
					session.save(hotelQuotation);
				}
			}

			transaction.commit();
			isInserted=true;
		} catch (Exception e) {
			if(transaction!=null){
				transaction.rollback();
				isInserted=false;
			}
			//System.out.println("Exception " +e);
		}
		finally{
			if(session!=null && session.isOpen()){
				session.close();
			}
		}

		return isInserted;

	}


	public List<HotelTravelRequestQuotation> getHotelRequestTravelQuotationList(Long hotelQuotationRequestId) {
		// TODO Auto-generated method stub
		List<HotelTravelRequestQuotation> Newlist =  new ArrayList<>();
		Session session = null;
		try{
			//System.out.println("hotelQuotationRequestId" +hotelQuotationRequestId);
			session = HibernateUtil.getSessionFactory().openSession();
			Criteria criteria=session.createCriteria(HotelTravelRequestQuotation.class);
			criteria.add(Restrictions.eq("id", hotelQuotationRequestId));			
			Newlist = criteria.list();
			
		}
		catch (Exception e) {
			//System.out.println("Exception "+e);
		}
		finally{
			if(session!=null && session.isOpen()){
				session.close();
			}
		}

		return Newlist;
	}

	public long  getHotelOrderRowIdFormHotelTravelRequestQuotation(Long hotelQuotationRequestId) {
		// TODO Auto-generated method stub
		HotelTravelRequestQuotation  Newlist=  null;
		long id = 0;
		Session session=null;
		try{
			session = HibernateUtil.getSessionFactory().openSession();
			String sql = "from HotelTravelRequestQuotation com where com.hotelTravelRequest.id=:id and isBooked=:isBooked";
			Query query = session.createQuery(sql);
			query.setParameter("id", hotelQuotationRequestId);
			query.setParameter("isBooked", true);
			Newlist= (HotelTravelRequestQuotation) query.uniqueResult();
			if(Newlist!=null){
				id=Newlist.getOrderRowId();	
			}


		}
		catch (Exception e) {
			e.printStackTrace();
		}
		finally{
			if(session!=null && session.isOpen()){
				session.close();
			}
		}

		return id;
	}


	public HotelTravelRequestQuotation hotelRequestQuotationUpdate(HotelTravelRequestQuotation hotelTravelRequestQuotation) {

		Session session= null;
		Transaction transaction=null;
		HotelTravelRequestQuotation  hotelTravelRequestQuotationUpdate=null;
		try {
			session = HibernateUtil.getSessionFactory().openSession();
			transaction = session.beginTransaction();
			hotelTravelRequestQuotationUpdate=(HotelTravelRequestQuotation) session.get(HotelTravelRequestQuotation.class,hotelTravelRequestQuotation.getId());
			hotelTravelRequestQuotationUpdate.setHotelName(hotelTravelRequestQuotation.getHotelName());
			hotelTravelRequestQuotationUpdate.setSellRate(hotelTravelRequestQuotation.getSellRate());
			hotelTravelRequestQuotationUpdate.setUpdatedAt(new Timestamp(new Date().getTime()));
			session.saveOrUpdate(hotelTravelRequestQuotationUpdate);
			transaction.commit();

		} catch (Exception e) {
			if(transaction!=null){
				transaction.rollback();
			}
			e.printStackTrace();
		}
		finally{
			if(session!=null && session.isOpen()){
				session.close();
			}
		}
		return hotelTravelRequestQuotationUpdate;
	}

	public HotelTravelRequestQuotation updateHotelRequestQuotationWithOrderId(Long hotelOrderRowId, Long hotelRequestQuotationId) {
		Session session= null;
		Transaction transaction=null;
		HotelTravelRequestQuotation  hotelTravelRequestQuotationUpdate=null;
		try {
			session = HibernateUtil.getSessionFactory().openSession();
			transaction = session.beginTransaction();
			hotelTravelRequestQuotationUpdate=(HotelTravelRequestQuotation) session.get(HotelTravelRequestQuotation.class,hotelRequestQuotationId);
			hotelTravelRequestQuotationUpdate.setBooked(true);
			hotelTravelRequestQuotationUpdate.setOrderRowId(hotelOrderRowId);
			session.saveOrUpdate(hotelTravelRequestQuotationUpdate);
			transaction.commit();

		} catch (Exception e) {
			if(transaction!=null){
				transaction.rollback();
			}
			e.printStackTrace();
		}
		finally{
			if(session!=null && session.isOpen()){
				session.close();
			}
		}
		return hotelTravelRequestQuotationUpdate;

	}


	public HotelTravelRequest getHotelTravelRequestDetails(Long id) {

		Session session= null;

		HotelTravelRequest  hotetTravelRequest=null;
		try {
			session = HibernateUtil.getSessionFactory().openSession();
			Criteria criteria=session.createCriteria(HotelTravelRequest.class);
			criteria.add(Restrictions.eq("id", id));
			hotetTravelRequest=(HotelTravelRequest) criteria.uniqueResult();
		} catch (Exception e) {

			e.printStackTrace();
		}
		finally{
			if(session!=null && session.isOpen()){
				session.close();
			}
		}
		return hotetTravelRequest;

	}


	public HotelTravelRequest updateHotelTravelRequestDetails(HotelTravelRequest hotelQuotationRow) {
		Session session= null;
		Transaction transaction=null;
		HotelTravelRequest hotelTravelRequest=null;
		try {
			session = HibernateUtil.getSessionFactory().openSession();
			transaction = session.beginTransaction();
			hotelTravelRequest=(HotelTravelRequest) session.get(HotelTravelRequest.class,hotelQuotationRow.getId());
			hotelTravelRequest.setCheckInDate(hotelQuotationRow.getCheckInDate());
			hotelTravelRequest.setCheckOutDate(hotelQuotationRow.getCheckOutDate());
			hotelTravelRequest.setCity(hotelQuotationRow.getCity());
			hotelTravelRequest.setCountry(hotelQuotationRow.getCountry());
			hotelTravelRequest.setCurrency(hotelQuotationRow.getCurrency());
			hotelTravelRequest.setEmpName(hotelQuotationRow.getEmpName());
			hotelTravelRequest.setEntity(hotelQuotationRow.getEntity());
			hotelTravelRequest.setTRNo(hotelQuotationRow.getTRNo());
			hotelTravelRequest.setNoOfNights(hotelQuotationRow.getNoOfNights());
			hotelTravelRequest.setUpdatedAt(new Timestamp(new Date().getTime()));
			session.update(hotelTravelRequest);
			transaction.commit();

		} catch (Exception e) {
			if(transaction!=null){
				transaction.rollback();
			}
			e.printStackTrace();
		}
		finally{
			if(session!=null && session.isOpen()){
				session.close();
			}
		}
		return hotelTravelRequest;


	}


	public List<HotelTravelRequestQuotation> getHotelTravelRequestQuotationId(Long hotelRequestQuotationId) {
		Session session= null;
		List<HotelTravelRequestQuotation> list=null;
		try{
			session = HibernateUtil.getSessionFactory().openSession();
			String sql = "from HotelTravelRequestQuotation  where hotelTravelRequest.id=:id";
			Query query = session.createQuery(sql);
			query.setParameter("id", hotelRequestQuotationId);
			list=query.list();

		}
		catch (Exception e) {
			e.printStackTrace();
		}
		finally{
			if(session!=null && session.isOpen()){
				session.close();
			}
		}
		return list;

	}

	public   boolean updateHotelTravelRequestQuotationHide(Long hotelRequestQuotationId) {
		Session session= null;
		Transaction transaction=null;
		boolean isHide=false;
		List<HotelTravelRequestQuotation> list=getHotelTravelRequestQuotationId(hotelRequestQuotationId);
		try{
			session = HibernateUtil.getSessionFactory().openSession();
			transaction = session.beginTransaction();
			if(list!=null){
				for(HotelTravelRequestQuotation hotelTravelRequestQuotation:list){
					HotelTravelRequestQuotation  hotelTravelRequestQuotationUpdate=(HotelTravelRequestQuotation) session.get(HotelTravelRequestQuotation.class,hotelTravelRequestQuotation.getId());
					hotelTravelRequestQuotationUpdate.setHide(true);
					session.saveOrUpdate(hotelTravelRequestQuotationUpdate);
					session.flush();
				}
				transaction.commit();
				isHide=true;
			}

		}
		catch (Exception e) {
			if(transaction!=null){
				transaction.rollback();
			}
			e.printStackTrace();
		}
		finally{
			if(session!=null && session.isOpen()){
				session.close();
			}
		}
		return isHide;

	}


}
