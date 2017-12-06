package com.lintas.action;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONObject;
import org.apache.commons.lang3.StringUtils;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.dispatcher.SessionMap;
import org.apache.struts2.interceptor.SessionAware;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import com.lintas.DAO.Agentdao;
import com.lintas.DAO.Frontuserdao;
import com.lintas.config.HibernateUtil;
import com.lintas.config.MailConfig;
import com.lintas.model.Company;
import com.lintas.model.CompanyConfig;
import com.lintas.model.CompanyConfigType;
import com.lintas.model.Email;
import com.lintas.model.MailStatus;
import com.lintas.model.User;
import com.lintas.model.UserWallet;
import com.lintas.session.encryptions;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;

public class Agents extends ActionSupport implements ModelDriven<User>,SessionAware{


	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public static final org.apache.log4j.Logger logger=org.apache.log4j.Logger.getLogger(Agents.class);
	SessionMap<String, Object> sessionmap ;
	User agent = new User();
	User directuser = new User();
	CompanyConfigType companyConfigType = new CompanyConfigType();
	CompanyConfig companyConfig = new CompanyConfig();
	Agentdao agentdao = new Agentdao();
	MailConfig mailconfig = new MailConfig();
	MailStatus status = new MailStatus();
	UserWallet wallet  = new UserWallet();
	private Map<String,BigDecimal> jsonobj  =  new HashMap<String, BigDecimal>();
	private Map jsonobject2  =  new HashMap();
	String appkey;
	private encryptions enc = new encryptions();
	private String EncryptedAdminlink;
	private String encryptedadmindata;
	private Map jsonobjs  =  new HashMap(); 

	public String AgentLogin() throws Exception
	{		
		agent = agentdao.UserLogin(agent.getEmail(), agent.getPassword(),agent.getCompany_userid());
		
		
		if(agent!=null && !agent.isLocked())
		{ 
			Company myCompany = agentdao.GetParentCompany(agent.getCompanyid());
			if(agent.getUserrole_id().isTravelDesk() || agent.getUserrole_id().isAdmin() || agent.getUserrole_id().isOrder()|| agent.getUserrole_id().isReports() || agent.getUserrole_id().isSuperuser() || agent.getUserrole_id().isUsermode() )
			{
				if(agent.getSecurityanswer()!=null || agent.getSecurityanswer()!="" ){
					Timestamp currentTimestamp = new java.sql.Timestamp(Calendar.getInstance().getTime().getTime());
					EncryptedAdminlink = enc.encryptAES(agent.getEmail()+"-!&"+agent.getPassword()+"-!&"+agent.getCompany_userid()+"-!&"+String.valueOf(currentTimestamp.getTime()));
					ActionContext.getContext().getSession().put("EncryptedAdminlink", EncryptedAdminlink);
					ActionContext.getContext().getSession().put("agent", agent);	
					
					ActionContext.getContext().getSession().put("isCorporate", false);
					if(myCompany.getParent_company_userid().equalsIgnoreCase(myCompany.getSuper_company_userid()))
					{						
						ActionContext.getContext().getSession().put("isCardAcess", true);
					}else{						
						ActionContext.getContext().getSession().put("isCardAcess", false);
					}

					return SUCCESS;
				}
				else{
					addActionError(getText("global.agentapierror"));
					return ERROR;
				}
			}
			else
			{
				addActionError(getText("global.agentmailerrorcontactadmin"));				
				return ERROR;
			}
		}
		else
		{
			addActionError(getText("global.agentloginnullerror"));
			//addActionError("Login failed try again");
			return ERROR;
		}		


	}

	public String corporateLogin() throws Exception
	{		
		agent = agentdao.corporateLogin(agent.getEmail(), agent.getPassword(),agent.getCompany_userid());
		if(agent!=null && !agent.isLocked())
		{
			Company myCompany = agentdao.GetParentCompany(agent.getCompanyid());

			
				if(agent.getSecurityanswer()!=null || agent.getSecurityanswer()!="" ){
					Timestamp currentTimestamp = new java.sql.Timestamp(Calendar.getInstance().getTime().getTime());
					EncryptedAdminlink = enc.encryptAES(agent.getEmail()+"-!&"+agent.getPassword()+"-!&"+agent.getCompany_userid()+"-!&"+String.valueOf(currentTimestamp.getTime()));
					ActionContext.getContext().getSession().put("EncryptedAdminlink", EncryptedAdminlink);
					ActionContext.getContext().getSession().put("agent", agent);
					Company company = agentdao.GetCompany(agent.getEmail(), agent.getPassword(),agent.getCompany_userid());
					ActionContext.getContext().getSession().put("isCorporate", company.getCompanyRole().isCorporate());		
					if(myCompany.getParent_company_userid().equalsIgnoreCase(myCompany.getSuper_company_userid()))
					{						
						ActionContext.getContext().getSession().put("isCardAcess", true);
					}else{						
						ActionContext.getContext().getSession().put("isCardAcess", false);
					}
					return SUCCESS;
				}
				else{
					addActionError(getText("global.agentapierror"));
					return ERROR;
				}
			}
			else
			{
				addActionError(getText("global.agentmailerrorcontactadmin"));
				//addActionError("Your not allowed to access.Please contact Administrator ");
				return ERROR;
			}
		
			


	}
	
	public String GetDirectUser()
	{
		directuser = agentdao.GetDirectUserDetails();
		if(directuser!=null)
		{
			ActionContext.getContext().getSession().put("Directuser", directuser);

			return SUCCESS;
		}
		else
		{
			//addActionError("Login failed try again");
			return ERROR;
		}
	}

	public String AgentLogout()
	{
		if(sessionmap!=null){
			sessionmap.remove("agent");
			sessionmap.invalidate();
		}
		return SUCCESS;
	}



	public String AgentLoginPage()
	{

		if(sessionmap!=null){
			sessionmap.invalidate();
		}

		return SUCCESS;
	}
	public String Forgotpassword()
	{
		agent = agentdao.AgentPassword(agent.getEmail());
		if(agent!=null)
		{
			//try{

			Frontuserdao userdao = new Frontuserdao();
			userdao.insertEmail(String.valueOf(agent.getId()), 0, Email.EMAIL_TYPE_USER_FORGOT_PWD_REGISTRATION);

			addActionMessage(getText("global.agentFpasswordsuccess"));

			return SUCCESS;
		}
		else
		{

			addActionError(getText("global.agentFpasswordgetmailfailed"));
			//addActionError("Failed try again");
			return ERROR;
		}
	}


	public String FromAdminToIBELogin() throws Exception
	{
		String decrString = "";
		try {
			decrString = enc.decryptAES(encryptedadmindata);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		String[] parts ;		
		parts = decrString.split("-!&");
		boolean emulateFlag=false;
		int emulateByCompanyId;
		int emulateByUserId;
		Company emulateByCompany=null;
		User emulateByUser=null;
		if(parts!=null && parts.length>3)
		{
			String email = parts[0];  		
			String Password = parts[1]; 		
			String company_userid = parts[2]; 		

			if(parts!=null && parts.length>3 && parts.length>3 && parts[3]!=null && parts[3].equalsIgnoreCase("true"))
			{
				emulateFlag=true;
				ActionContext.getContext().getSession().put("emulateFlag",emulateFlag);

				if(parts.length>4 && StringUtils.isNotBlank(parts[4]))
				{
					emulateByCompanyId = Integer.parseInt(parts[4]);
					emulateByCompany= agentdao.getCompanyProfile(emulateByCompanyId);;
					ActionContext.getContext().getSession().put("emulateByCompany",emulateByCompany);
				}
				if(parts.length>5 && StringUtils.isNotBlank(parts[5]))
				{
					emulateByUserId = Integer.parseInt(parts[5]);
					emulateByUser =agentdao.getUserProfile(emulateByUserId); 
					ActionContext.getContext().getSession().put("emulateByUserId",emulateByUser.getId());
					ActionContext.getContext().getSession().put("emulateByUser",emulateByUser);
				}
			}

			agent = agentdao.LoginFromQuote(email, Password,company_userid);
			Company myCompany = agentdao.GetParentCompany(agent.getCompanyid());
		//	agent = agentdao.UserLogin(email, Password,company_userid);
			if(agent!=null && !agent.isLocked())
			{

				if(agent.getUserrole_id().isCorporateemployee() || agent.getUserrole_id().isCorporate() || agent.getUserrole_id().isTravelDesk() || agent.getUserrole_id().isAdmin() || agent.getUserrole_id().isOrder() || agent.getUserrole_id().isSuperuser() || agent.getUserrole_id().isUsermode() )
				{
					if(agent.getSecurityanswer()!=null || agent.getSecurityanswer()!="" ){

						Timestamp currentTimestamp = new java.sql.Timestamp(Calendar.getInstance().getTime().getTime());

						EncryptedAdminlink = enc.encryptAES(agent.getEmail()+"-!&"+agent.getPassword()+"-!&"+agent.getCompany_userid()+"-!&"+String.valueOf(currentTimestamp.getTime()));

						ActionContext.getContext().getSession().put("EncryptedAdminlink", EncryptedAdminlink);

						ActionContext.getContext().getSession().put("agent", agent);
						boolean isCorporate = agentdao.GetCompanyRole(agent.getEmail(), agent.getPassword(),agent.getCompany_userid());
						ActionContext.getContext().getSession().put("isCorporate", isCorporate);
						if(myCompany.getParent_company_userid().equalsIgnoreCase(myCompany.getSuper_company_userid()))
						{						
							ActionContext.getContext().getSession().put("isCardAcess", true);
						}else{						
							ActionContext.getContext().getSession().put("isCardAcess", false);
						}
						
						return SUCCESS;
					}
					else{
						addActionError(getText("global.agentapierror"));
						return ERROR;
					}
				}
				else
				{
					addActionError(getText("global.agentmailerrorcontactadmin"));
					
					return ERROR;
				}
			}
			else
			{
				addActionError(getText("global.agentloginnullerror"));
				//addActionError("Login failed try again");
				return ERROR;
			}
		}
		{
			addActionError(getText("global.agentloginnullerror"));
			//addActionError("Login failed try again");
			return ERROR;
		}
	}

	
	public String AgentLoginFromWhiteLabel() throws Exception
	{ 
		agent = agentdao.UserLogin(agent.getEmail(), agent.getPassword(),agent.getCompany_userid());	
		
				
		companyConfig = agentdao.getCompanyConfigIdByCompanyId(agent.getCompanyid());		
		Company parentCompany = agentdao.getParentCompanyBottomToTop(companyConfig.getCompany_id());
		if(agent!=null && !agent.isLocked())
		{ 
			Company myCompany = agentdao.GetParentCompany(agent.getCompanyid());
			//System.out.println("mycompany"+myCompany.getParent_company_userid());
			 
			 if(agent.getUserrole_id().isAdmin() || agent.getUserrole_id().isOrder()|| agent.getUserrole_id().isReports() || agent.getUserrole_id().isSuperuser() || agent.getUserrole_id().isUsermode() )
			{
				if(agent.getSecurityanswer()!=null || agent.getSecurityanswer()!="" ){
					Timestamp currentTimestamp = new java.sql.Timestamp(Calendar.getInstance().getTime().getTime());
					EncryptedAdminlink = enc.encryptAES(agent.getEmail()+"-!&"+agent.getPassword()+"-!&"+agent.getCompany_userid()+"-!&"+String.valueOf(currentTimestamp.getTime()));
					ActionContext.getContext().getSession().put("EncryptedAdminlink", EncryptedAdminlink);
					ActionContext.getContext().getSession().put("agent", agent);	
					ActionContext.getContext().getSession().put("ThemeAppkey",agent.getSecurityanswer());
					ActionContext.getContext().getSession().put("isCorporate", false);
					if(myCompany.getParent_company_userid().equalsIgnoreCase(myCompany.getSuper_company_userid()))
					{						
						ActionContext.getContext().getSession().put("isCardAcess", true);
					}else{						
						ActionContext.getContext().getSession().put("isCardAcess", false);
					}

					return SUCCESS;
				}
				else{
					addActionError(getText("global.agentapierror"));
					//System.out.println("Error1");
					return ERROR;
				}
			}
			else
			{
				
				addActionError(getText("global.agentapierror"));
				//System.out.println("Error2");
				//addActionError("Your not allowed to access.Please contact Administrator ");
				return ERROR;
			} 
		}
		else
		{
			//System.out.println("Error3");
			 
			 
			addActionError("Your not allowed to access.Please contact Administrator");
			 
			//addActionError("Your not allowed to access.Please contact Administrator ");
			return ERROR;
			 
		}		


	}
	public String corporateWhiteLabelLogin() throws Exception
	{		
		agent = agentdao.corporateLogin(agent.getEmail(), agent.getPassword(),agent.getCompany_userid());
		 
			companyConfig = agentdao.getCompanyConfigIdByCompanyId(agent.getCompanyid());			
			Company parentCompany = agentdao.getParentCompanyBottomToTop(companyConfig.getCompany_id());
				
		if(agent!=null && !agent.isLocked())
		{
			Company myCompany = agentdao.GetParentCompany(agent.getCompanyid());

			
				if(agent.getSecurityanswer()!=null || agent.getSecurityanswer()!="" ){
					Timestamp currentTimestamp = new java.sql.Timestamp(Calendar.getInstance().getTime().getTime());
					EncryptedAdminlink = enc.encryptAES(agent.getEmail()+"-!&"+agent.getPassword()+"-!&"+agent.getCompany_userid()+"-!&"+String.valueOf(currentTimestamp.getTime()));
					ActionContext.getContext().getSession().put("EncryptedAdminlink", EncryptedAdminlink);
					ActionContext.getContext().getSession().put("agent", agent);
					ActionContext.getContext().getSession().put("ThemeAppkey",agent.getSecurityanswer());
					Company company = agentdao.GetCompany(agent.getEmail(), agent.getPassword(),agent.getCompany_userid());
					ActionContext.getContext().getSession().put("isCorporate", company.getCompanyRole().isCorporate());		
					if(myCompany.getParent_company_userid().equalsIgnoreCase(myCompany.getSuper_company_userid()))
					{						
						ActionContext.getContext().getSession().put("isCardAcess", true);
					}else{						
						ActionContext.getContext().getSession().put("isCardAcess", false);
					}
					return SUCCESS;
				}
				else{
					addActionError(getText("global.agentapierror"));
					return ERROR;
				}
			}
			else
			{
				addActionError(getText("global.agentmailerrorcontactadmin"));
				//addActionError("Your not allowed to access.Please contact Administrator ");
				return ERROR;
			}
		
			


	}
	
	
	public Map getJsonResult() {
		return jsonobjs;
	}

	/**
	 * @param jsonResult the jsonResult to set
	 */
	public void setJsonResult(Map jsonResult) {
		this.jsonobjs = jsonResult;
	}

	@Override
	public void setSession(Map<String, Object> map) {
		sessionmap=(SessionMap<String, Object>) map;

	}

	@Override
	public User getModel() {
		// TODO Auto-generated method stub
		return agent;
	}

	public String getAppkey() {
		return appkey;
	}

	public void setAppkey(String appkey) {
		this.appkey = appkey;
	}
	public String getEncryptedAdminlink() {
		return EncryptedAdminlink;
	}

	public void setEncryptedAdminlink(String encryptedAdminlink) {
		EncryptedAdminlink = encryptedAdminlink;
	}

	public String getEncryptedadmindata() {
		return encryptedadmindata;
	}

	public void setEncryptedadmindata(String encryptedadmindata) {
		this.encryptedadmindata = encryptedadmindata;
	}


}