package com.lintas.DAO;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.Conjunction;
import org.hibernate.criterion.Restrictions;

import com.lintas.action.Agents;
import com.lintas.config.HibernateUtil;
import com.lintas.model.Company;
import com.lintas.model.CompanyConfig;
import com.lintas.model.CompanyConfigType;
import com.lintas.model.FlightOrderCustomer;
import com.lintas.model.FlightOrderRow;
import com.lintas.model.FrontUserDetail;
import com.lintas.model.HotelOrderGuest;
import com.lintas.model.HotelOrderRoomInfo;
import com.lintas.model.HotelOrderRow;
import com.lintas.model.User;
import com.lintas.model.UserWallet;
import com.sun.org.apache.xalan.internal.xsltc.compiler.sym;

public class Agentdao {
	SessionFactory sessionfactory;
	Session session = null;
	Transaction transaction = null;
	public static final org.apache.log4j.Logger logger=org.apache.log4j.Logger.getLogger(Agentdao.class);

	/*Check User emailid exists or not  in DB */
	public boolean isEmailExists(User agent) 
	{
		boolean exists = false;
		try
		{

			session = HibernateUtil.getSessionFactory().openSession();			
			String sql = "from User a where a.Email=:email";
			Query query = session.createQuery(sql);
			query.setParameter("email", agent.getEmail());
			List<FrontUserDetail> list = query.list();
			if (list.size() > 0) {
				exists = true;
			}			
			session.close();

		}
		catch(Exception e)
		{
			logger.info("-----isEmailExists Failed--------"+e.getMessage());
		}
		finally {

		}
		return exists;	

	}


	public User ThemeUserLogin(String email, String password,String companyid,String lkey)
	{
		Session session = null;
		User agent = null;		
		CompanyConfig config = null;
		try
		{
			session = HibernateUtil.getSessionFactory().openSession();	
			Criteria criteria = session.createCriteria(User.class);		
			criteria.add(Restrictions.eq("Email", email));
			criteria.add(Restrictions.eq("Password", password));
			criteria.add(Restrictions.eq("company_userid", companyid));	
			List<User> list = criteria.list();
			if (list.size() > 0) {			
				for (Iterator iterator = list.iterator(); iterator.hasNext();){			
					agent = (User)iterator.next(); 
					agent.setId(agent.getId());
					agent.setUsername(agent.getUsername());
					agent.setEmail(agent.getEmail());
					agent.setCompanyid(agent.getCompanyid());
					agent.setCompany_userid(agent.getCompany_userid());
					agent.setCurrencyCode(agent.getCurrencyCode());
					agent.setAgentWallet(agent.getAgentWallet());
					agent.setUserrole_id(agent.getUserrole_id());
					agent.setDesignation(agent.getDesignation());
					agent.setFirstname(agent.getFirstname());
					agent.setImagepath(agent.getImagepath());
					agent.setLastname(agent.getLastname());
					agent.setPhone(agent.getPhone());
					agent.setAddress(agent.getAddress());
					agent.setDescription(agent.getDescription());
					agent.setCountryname(agent.getCountryname());
				}

				if(lkey !=null){
					agent.setSecurityanswer(lkey); // No field name App_key so we are using some other setter and getter method 	
				//	System.out.println("B2B appkey isDistributor or isAgent "+lkey);
				}
			}else{
				agent.setSecurityanswer("");
			}

			session.close();
		}catch(Exception e)
		{
			logger.info("-----UserLogin Exception--------"+e.getMessage());

		}

		return agent;


	}



	/*Check Email and password are correct*/
	public User UserLogin(String email, String password,String companyid)
	{
		Session session = null;
		User agent = null;		
		CompanyConfig config = null;
		List<CompanyConfig> appkeylist = null;
		try
		{
			session = HibernateUtil.getSessionFactory().openSession();	
			Criteria criteria = session.createCriteria(User.class);		
			criteria.add(Restrictions.eq("Email", email));
			criteria.add(Restrictions.eq("Password", password));
			criteria.add(Restrictions.eq("company_userid", companyid));	
			List<User> list = criteria.list();
			if (list.size() > 0) {			
				for (Iterator iterator = list.iterator(); iterator.hasNext();){			
					agent = (User)iterator.next(); 
					agent.setId(agent.getId());
					agent.setUsername(agent.getUsername());
					agent.setEmail(agent.getEmail());
					agent.setCompanyid(agent.getCompanyid());
					agent.setCompany_userid(agent.getCompany_userid());
					agent.setCurrencyCode(agent.getCurrencyCode());
					agent.setAgentWallet(agent.getAgentWallet());
					agent.setUserrole_id(agent.getUserrole_id());
					agent.setDesignation(agent.getDesignation());
					agent.setFirstname(agent.getFirstname());
					agent.setImagepath(agent.getImagepath());
					agent.setLastname(agent.getLastname());
					agent.setPhone(agent.getPhone());
					agent.setAddress(agent.getAddress());
					agent.setDescription(agent.getDescription());
					agent.setCountryname(agent.getCountryname());
				}

				Company company  = getCompanyProfile(agent.getCompanyid());

				Criteria configCriteria = session.createCriteria(CompanyConfig.class);
				configCriteria.add(Restrictions.eq("company_id", agent.getCompanyid()));				
				appkeylist = configCriteria.list();
				if(appkeylist.size() > 0){
					for (CompanyConfig companyConfig : appkeylist) {
						if(companyConfig.isActive() && companyConfig.getCompanyConfigType().isB2B()){
							if(!company.getCompanyRole().isCorporate() && !agent.getUserrole_id().isCorporate() && !agent.getUserrole_id().isCorporateemployee() && !agent.getUserrole_id().isReports() && !agent.getUserrole_id().isCms() &&  !agent.getUserrole_id().isTravelDesk()){
								agent.setSecurityanswer(companyConfig.getAppKey()); // No field name App_key so we are using some other setter and getter method 	
								//System.out.println("B2B appkey isDistributor or isAgent "+companyConfig.getAppKey());
							}
							//else{
							//	agent.setSecurityanswer("");
							//}
						}//else{
						//	agent.setSecurityanswer("");
						//}

					}
				}else{
					agent.setSecurityanswer("");
				}


			}
			session.close();
		}catch(Exception e)
		{
			logger.info("-----UserLogin Exception--------"+e.getMessage());

		}

		return agent;


	}

	/*Check Email and password are correct*/
	public User corporateLogin(String email, String password,String companyid)
	{ 
		Session session = null;
		User agent = null;		
		CompanyConfig config = null;
		List<CompanyConfig> appkeylist = null;
		try
		{
			session = HibernateUtil.getSessionFactory().openSession();	
			Criteria criteria = session.createCriteria(User.class);		
			criteria.add(Restrictions.eq("Email", email));
			criteria.add(Restrictions.eq("Password", password));
			criteria.add(Restrictions.eq("company_userid", companyid));	
			List<User> list = criteria.list();
			if (list.size() > 0) {			
				for (Iterator iterator = list.iterator(); iterator.hasNext();){			
					agent = (User)iterator.next(); 
					agent.setId(agent.getId());
					agent.setUsername(agent.getUsername());
					agent.setEmail(agent.getEmail());
					agent.setCompanyid(agent.getCompanyid());
					agent.setCompany_userid(agent.getCompany_userid());
					agent.setCurrencyCode(agent.getCurrencyCode());
					agent.setAgentWallet(agent.getAgentWallet());
					agent.setUserrole_id(agent.getUserrole_id());
					agent.setDesignation(agent.getDesignation());
					agent.setFirstname(agent.getFirstname());
					agent.setImagepath(agent.getImagepath());
					agent.setLastname(agent.getLastname());
					agent.setPhone(agent.getPhone());
					agent.setAddress(agent.getAddress());
					agent.setDescription(agent.getDescription());
					agent.setCountryname(agent.getCountryname());
				}

				Company company  = getCompanyProfile(agent.getCompanyid());

				Criteria configCriteria = session.createCriteria(CompanyConfig.class);
				configCriteria.add(Restrictions.eq("company_id", agent.getCompanyid()));				
				appkeylist = configCriteria.list();
				if(appkeylist.size() > 0){
					for (CompanyConfig companyConfig : appkeylist) {
						if(companyConfig.isActive() && companyConfig.getCompanyConfigType().isB2E()){
							if(company.getCompanyRole().isCorporate()){
								agent.setSecurityanswer(companyConfig.getAppKey()); // No field name App_key so we are using some other setter and getter method 	
							//	System.out.println("B2E appkey isDistributor or isAgent "+companyConfig.getAppKey());
							}
							else{
								agent.setSecurityanswer("");
							}
						}else{
							agent.setSecurityanswer("");
						}

					}
				}else{
					agent.setSecurityanswer("");
				}

			}

			session.close();
		}catch(Exception e)
		{
			logger.info("-----UserLogin Exception--------"+e.getMessage());

		}
		return agent;
	}


	/*Check Email and password are correct*/
	public User LoginFromQuote(String email, String password,String companyid)
	{
		Session session = null;
		User agent = null;		
		CompanyConfig config = null;
		List<CompanyConfig> appkeylist = null;
		try
		{
			session = HibernateUtil.getSessionFactory().openSession();	
			Criteria criteria = session.createCriteria(User.class);		
			criteria.add(Restrictions.eq("Email", email));
			criteria.add(Restrictions.eq("Password", password));
			criteria.add(Restrictions.eq("company_userid", companyid));	
			List<User> list = criteria.list();
			if (list.size() > 0) {			
				for (Iterator iterator = list.iterator(); iterator.hasNext();){			
					agent = (User)iterator.next(); 
					agent.setId(agent.getId());
					agent.setUsername(agent.getUsername());
					agent.setEmail(agent.getEmail());
					agent.setCompanyid(agent.getCompanyid());
					agent.setCompany_userid(agent.getCompany_userid());
					agent.setCurrencyCode(agent.getCurrencyCode());
					agent.setAgentWallet(agent.getAgentWallet());
					agent.setUserrole_id(agent.getUserrole_id());
					agent.setDesignation(agent.getDesignation());
					agent.setFirstname(agent.getFirstname());
					agent.setImagepath(agent.getImagepath());
					agent.setLastname(agent.getLastname());
					agent.setPhone(agent.getPhone());
					agent.setAddress(agent.getAddress());
					agent.setDescription(agent.getDescription());
					agent.setCountryname(agent.getCountryname());
				}

				Company company  = getCompanyProfile(agent.getCompanyid());

				Criteria configCriteria = session.createCriteria(CompanyConfig.class);
				configCriteria.add(Restrictions.eq("company_id", agent.getCompanyid()));				
				appkeylist = configCriteria.list();
				if(appkeylist.size() > 0){
					for (CompanyConfig companyConfig : appkeylist) {
						if(company.getCompanyRole().isCorporate() && agent.getUserrole_id().isCorporate() && agent.getUserrole_id().isCorporateemployee() ){
							if(companyConfig.isActive() && companyConfig.getCompanyConfigType().isB2E()){
								agent.setSecurityanswer(companyConfig.getAppKey()); // No field name App_key so we are using some other setter and getter method 	
								//System.out.println("B2E appkey "+companyConfig.getAppKey());
							}
							else{
								agent.setSecurityanswer("");
							}
						}else if(!company.getCompanyRole().isCorporate() && !agent.getUserrole_id().isCorporate() && !agent.getUserrole_id().isCorporateemployee() && !agent.getUserrole_id().isReports() && !agent.getUserrole_id().isCms() &&  !agent.getUserrole_id().isTravelDesk()){
							if(companyConfig.isActive() && companyConfig.getCompanyConfigType().isB2B()){
								agent.setSecurityanswer(companyConfig.getAppKey()); // No field name App_key so we are using some other setter and getter method 	
								//System.out.println("B2B appkey  "+companyConfig.getAppKey());
							}
						}else{
							agent.setSecurityanswer(companyConfig.getAppKey()); // No field name App_key so we are using some other setter and getter method 		
							logger.info("agent"+agent);	
						}

					}
				}else{
					agent.setSecurityanswer("");
				}


			}

			session.close();
		}catch(Exception e)
		{
			logger.info("-----UserLogin Exception--------"+e.getMessage());

		}

		return agent;


	}



	/*Check Email and password are correct*/
	public User GetDirectUserDetails()
	{
		Session session = null;
		CompanyConfig config = null;
		User agent = new User();

		try
		{
			Conjunction conj=Restrictions.conjunction();
			session = HibernateUtil.getSessionFactory().openSession();	
			Criteria criteria = session.createCriteria(User.class);
			conj.add(Restrictions.eq("Email", "directuser@intellicommsolutions.com"));	
			conj.add(Restrictions.eq("id", 2));	
			criteria.add(conj);
			agent =  (User) criteria.uniqueResult();	
			// get all the config and check is B2C User
			Criteria configCriteria = session.createCriteria(CompanyConfig.class);
			configCriteria.add(Restrictions.eq("company_id", agent.getCompanyid()));
			List<CompanyConfig> appkeylist = configCriteria.list();			
			if (appkeylist!=null && appkeylist.size() > 0) {			
				for (Iterator iterator = appkeylist.iterator(); iterator.hasNext();){			
					config = (CompanyConfig)iterator.next(); 
					if(config.getCompanyConfigType().isB2C() && config.isActive() )
						agent.setSecurityanswer(config.getAppKey()); // No field name App_key so we are using some other setter and getter method 		

				}
			}
			session.close();

		}catch(Exception e)
		{
			logger.info("-----GetDirectUserDetails Exception--------"+e.getMessage());			
		}
		return agent;
	}

	public synchronized BigDecimal GetAgentWalletBalance(int walletid)
	{
		Session session = null;
		BigDecimal balance = null ;		
		try
		{
			session = HibernateUtil.getSessionFactory().openSession();	
			Criteria criteria = session.createCriteria(UserWallet.class);
			criteria.add(Restrictions.eq("walletId", walletid));		
			UserWallet userWallet = (UserWallet) criteria.uniqueResult();
			balance = userWallet.getWalletbalance();	
			session.close();
		}catch(Exception e)
		{
			logger.info("-----Exception GetParentAgentWalletBalance--------"+e.getMessage());
		}

		return balance;		
	}
	public synchronized BigDecimal GetAgentDepositBalance(int walletid)
	{
		BigDecimal balance = null ;
		Session session = null;
		try
		{			 
			session = HibernateUtil.getSessionFactory().openSession();	
			Criteria criteria = session.createCriteria(UserWallet.class);
			criteria.add(Restrictions.eq("walletId", walletid));		
			UserWallet userWallet = (UserWallet) criteria.uniqueResult();
			balance = userWallet.getDepositBalance();
			session.close();
		}catch(Exception e)
		{
		//	System.out.println("Exception" +e);
		}

		return balance;
	}

	public synchronized BigDecimal GetParentAgentWalletBalance(int walletid)
	{
		Session session = null;
		BigDecimal balance = null ;		
		try
		{			 
			session = HibernateUtil.getSessionFactory().openSession();	
			Criteria criteria = session.createCriteria(UserWallet.class);
			criteria.add(Restrictions.eq("walletId", walletid));		
			UserWallet userWallet = (UserWallet) criteria.uniqueResult();
			balance = userWallet.getWalletbalance();	
			session.close();
		}catch(Exception e)
		{
			logger.info("-----Exception GetParentAgentWalletBalance--------"+e.getMessage());

		}

		return balance;
	}
	public synchronized BigDecimal GetParentAgentDepositBalance(int walletid)
	{
		BigDecimal balance = null ;
		Session session = null;
		try
		{			 
			session = HibernateUtil.getSessionFactory().openSession();	
			Criteria criteria = session.createCriteria(UserWallet.class);
			criteria.add(Restrictions.eq("walletId", walletid));		
			UserWallet userWallet = (UserWallet) criteria.uniqueResult();
			balance = userWallet.getDepositBalance();		
			session.close();
		}catch(Exception e)
		{
			logger.info("-----Exception GetParentAgentDepositBalance--------"+e.getMessage());			
		}		
		return balance;
	}

	public synchronized User GetParentUser(Company company)
	{
		Session session = null;
		User user = null ;
		//UserWallet wallet = null;
		try
		{			 
			session = HibernateUtil.getSessionFactory().openSession();	
			Criteria criteria = session.createCriteria(User.class);
			criteria.add(Restrictions.eq("Email", company.getEmail()));
			user = (User) criteria.uniqueResult();		
			session.close();
		}catch(Exception e)
		{		
			//System.out.println("GetParentUser Exception" +e);
		}

		return user;
	}

	public synchronized Company GetParentCompany(int companyid)
	{
		Session session = null;
		Company company = null ;		
		try
		{
			session = HibernateUtil.getSessionFactory().openSession();	
			Criteria criteria = session.createCriteria(Company.class);
			criteria.add(Restrictions.eq("companyid", companyid));		
			company = (Company) criteria.uniqueResult();		
			session.close();
		}catch(Exception e)
		{
			logger.info("-----Exception GetParentCompany--------"+e.getMessage());
		}

		return company;		
	}


	/*Check Email and password are correct*/
	public User AgentPassword(String email)
	{

		User agent = null;	
		try
		{			 
			session = HibernateUtil.getSessionFactory().openSession();	
			String sql = "from User a where a.Email=:email";
			Query query = session.createQuery(sql);
			query.setParameter("email", email);
			List<User> list = query.list();
			if (list.size() > 0) {			
				for (Iterator iterator = list.iterator(); iterator.hasNext();){			
					agent = (User)iterator.next(); 
					agent.setPassword(agent.getPassword());		
					agent.setEmail(agent.getEmail());

				}
			}		
			session.close();
		}catch(Exception e)
		{
			logger.info("-----AgentPassword Failed--------"+e.getMessage());
		}		
		return agent;

	}

	public boolean GetCompanyRole(String email, String password,String companyid){
		boolean companyrole = false;
		try
		{

			session = HibernateUtil.getSessionFactory().openSession();		
			String sql = "from Company a where a.company_userid=:userid";//a.Email=:email and  a.Password=:password and a.company_userid=:userid";	
			Query query = session.createQuery(sql);			
			query.setParameter("userid", companyid);
			Company company = (Company) query.uniqueResult();
			if(company.getCompanyRole().isCorporate()){
				companyrole = true;
			}
		}catch(Exception e){

		}
		return companyrole;
	}

	public Company GetCompany(String email, String password,String companyid){
		Company company = null;
		try
		{

			session = HibernateUtil.getSessionFactory().openSession();		
			String sql = "from Company a where a.company_userid=:userid";//a.Email=:email and  a.Password=:password and a.company_userid=:userid";	
			Query query = session.createQuery(sql);			
			query.setParameter("userid", companyid);
			company = (Company) query.uniqueResult();

		}catch(Exception e){

		}
		return company;
	}

	public List<User> corporateEmployeeDetails(User userobj){
		List<User> employeedetails = new ArrayList<>();
		try{
			session = HibernateUtil.getSessionFactory().openSession();
			Criteria criteria=session.createCriteria(User.class);
			criteria.add(Restrictions.like("createdbyCompanyUserId", userobj.getId()));
			employeedetails = criteria.list();
		}catch(Exception e){
			logger.info("-----corporateEmployeeDetails Failed--------"+e.getMessage());
		}
		return employeedetails;
	}

	public List<FlightOrderCustomer> agentsflightCustomerDetails(User userobj){
		List<FlightOrderRow> orderslist = new ArrayList<>();
		List<FlightOrderCustomer> ordercustomerlist = new ArrayList<>();
		List<Long> userIdList = new ArrayList<Long>();
		try{
			session = HibernateUtil.getSessionFactory().openSession();
			Criteria criteria = session.createCriteria(FlightOrderRow.class);		
			criteria.add(Restrictions.like("userId", String.valueOf(userobj.getId())));
			orderslist = criteria.list();
			if(orderslist!=null && orderslist.size()>0)
			{				
				for (FlightOrderRow flightOrderRow :orderslist)
				{					
					userIdList.add(flightOrderRow.getId());
				}						
			}		
			Criteria criteriaOrderCustomer = session.createCriteria(FlightOrderCustomer.class);
			criteriaOrderCustomer.add(Restrictions.in("flightOrderRow.id", userIdList));
			ordercustomerlist = criteriaOrderCustomer.list();			

		}catch(Exception e){
			//System.out.println("-----flight agentsCustomerDetails Failed--------"+e.getMessage());
		}
		return ordercustomerlist;
	}


	public List<HotelOrderGuest> agentshotelCustomerDetails(User userobj){
		List<HotelOrderRow> orderslist = new ArrayList<>();
		List<HotelOrderRoomInfo> ordersroomlist = new ArrayList<>();
		List<HotelOrderGuest> ordercustomerlist = new ArrayList<>();
		List<Long> userroomIdList = new ArrayList<Long>();
		List<Long> userIdList = new ArrayList<Long>();
		try{
			session = HibernateUtil.getSessionFactory().openSession();
			Criteria criteria = session.createCriteria(HotelOrderRow.class);		
			criteria.add(Restrictions.like("userId", String.valueOf(userobj.getId())));
			orderslist = criteria.list();	
			if(orderslist!=null && orderslist.size()>0)
			{				
				for (HotelOrderRow hotelOrderRow :orderslist)
				{					
					userroomIdList.add(hotelOrderRow.getId());
				}						
			}		
			Criteria criteriaOrderCustomerRoom = session.createCriteria(HotelOrderRoomInfo.class);
			criteriaOrderCustomerRoom.add(Restrictions.in("hotelOrderRow.id", userroomIdList));
			ordersroomlist = criteriaOrderCustomerRoom.list();
			if(ordersroomlist!=null && ordersroomlist.size()>0)
			{
				for (HotelOrderRow hotelOrderRow :orderslist)
				{					
					userIdList.add(hotelOrderRow.getId());
				}	
			}
			Criteria criteriaOrderCustomer = session.createCriteria(HotelOrderGuest.class);
			criteriaOrderCustomer.add(Restrictions.in("roomInfo.id", userIdList));
			ordercustomerlist = criteriaOrderCustomer.list();

		}catch(Exception e){
			//System.out.println("----- hotel agents guest Details Failed--------"+e.getMessage());
		}
		return ordercustomerlist;
	}

	/*get the CompanyProfile base on company id*/
	public Company getCompanyProfile(int companyId)
	{
		Session session = null;
		Company company=null;
		try{
			session = HibernateUtil.getSessionFactory().openSession();	
			String sql = "from Company com where  com.companyid=:companyid";
			Query query = session.createQuery(sql);
			query.setParameter("companyid", companyId);
			company = (Company) query.uniqueResult();
			if(company!=null)
			{
				if(company.getCompanyRole().isAgent()){
					company.setCompType("Agency");
				}
				if(company.getCompanyRole().isDistributor()){
					company.setCompType("Wholesaler");
				}
			}
		}
		catch(Exception e){
			logger.error("---------Exception---------"+e.getMessage());
		}finally{
			if(session != null && session.isOpen())
				session.close();
		}
		return company;
	}

	public User getUserProfile (int id)
	{
		User userNew = null;
		try{
			session = HibernateUtil.getSessionFactory().openSession();
			String sql = "from User com where com.id=:id";
			Query query = session.createQuery(sql);
			query.setParameter("id", id);
			userNew = (User) query.uniqueResult();
		}
		catch (HibernateException e) {
			logger.error("--------------HibernateException-----------------"+e.getMessage());
		}finally {
			if(session!=null && session.isOpen())
				session.close(); 
		}
		return userNew;
	}
	public CompanyConfig getCompanyConfigIdByCompanyId (int id)
	{
		CompanyConfig companyConfig = null;

		try{
			Session session = HibernateUtil.getSessionFactory().openSession();	
			Criteria criteria = session.createCriteria(CompanyConfig.class);		
			criteria.add(Restrictions.eq("id",id));
			companyConfig = (CompanyConfig) criteria.uniqueResult();
		}
		catch (HibernateException e) {
			logger.error("--------------HibernateException-----------------"+e.getMessage());
		}finally {
			if(session!=null && session.isOpen())
				session.close(); 
		}
		return companyConfig;
	}

	public CompanyConfigType getCompanyConfigType (int id)
	{
		CompanyConfigType companyConfigType = null;

		try{
			Session session = HibernateUtil.getSessionFactory().openSession();	
			Criteria criteria = session.createCriteria(CompanyConfigType.class);		
			criteria.add(Restrictions.eq("id",id));
			companyConfigType = (CompanyConfigType) criteria.uniqueResult();
		}
		catch (HibernateException e) {
			logger.error("--------------HibernateException-----------------"+e.getMessage());
		}finally {
			if(session!=null && session.isOpen())
				session.close(); 
		}
		return companyConfigType;
	}
	public Company getParentCompanyBottomToTop(int companyId) {
		Company company = getCompanyProfile(companyId);
		Company companyTemp=company;
		Company parentCompany = null;		
		while(companyTemp!=null && companyTemp.getCompanyRole()!=null && !companyTemp.getCompanyRole().isSuperUser())
		{
			companyTemp = getParentCompany(companyTemp);
			parentCompany = companyTemp;
		}
		return parentCompany;

	}
	public Company getParentCompany(Company company)
			throws HibernateException {
		Session session = null;  
		Criteria crit = null;
		Company parentcompany = null;		
		try{
			session = HibernateUtil.getSessionFactory().openSession();	
			crit = session.createCriteria(Company.class);   
			crit.add(Restrictions.eq("company_userid", company.getParent_company_userid()));   
			parentcompany = (Company) crit.uniqueResult();    
		}catch (HibernateException e) {   
			throw e; 
		}finally {
			if(session != null && session.isOpen())
			{    
				session.close(); 
			}

		}
		return parentcompany;
	}
}
