package com.intelli.listener;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.net.URLEncoder;

import javax.servlet.ServletContext;
import javax.xml.bind.JAXBException;
import javax.xml.soap.SOAPException;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.intelli.hotel.AreaResponse;
import com.intelli.util.FileUtil;


public class CityLoadJob implements Job {

	public static final org.apache.log4j.Logger logger = org.apache.log4j.Logger.getLogger(CityLoadJob.class);
	
	private String pathWebContent;
	public String getPathWebContent() {
		return pathWebContent;
	}
	public void setPathWebContent(String pathWebContent) {
		this.pathWebContent = pathWebContent;
	}

	private String name = "CityLoadJob";
	
	@Override
	public void execute(JobExecutionContext arg0) throws JobExecutionException {
	
		logger.info("city load job...");
		
		try {
			searchCitiesAndSave();
			logger.info("city load job.Completed..");
			
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			logger.info("city load job..### Exception."+e.getMessage());
		}
		
		
		
	}
	private StringBuilder doGet(String endPointUrl) throws SOAPException,JAXBException
	{
		String urlParameters = "";		
		StringBuilder response = new StringBuilder();		
		logger.info("-------------((((("+name+"---------endPointUrl : "+endPointUrl);
		HttpURLConnection urlConnection = null;
		String line;
		try{
			URL url = new URL(endPointUrl);
			urlConnection = (HttpURLConnection) url.openConnection();
			InputStream in = new BufferedInputStream(urlConnection.getInputStream());
			BufferedReader reader = new BufferedReader(new InputStreamReader(in));
			
			while ((line = reader.readLine()) != null) {
				response.append(line);
			}

		}		
		catch(UnsupportedEncodingException e)
		{
			logger.info("-------------((((("+name+"---------UnsupportedEncodingException : "+e.getMessage());
			e.printStackTrace();

		}
		catch(ProtocolException e)
		{
			logger.info("-------------((((("+name+"---------ProtocolException : "+e.getMessage());
			e.printStackTrace();

		}
		catch(MalformedURLException e)
		{
			logger.info("-------------((((("+name+"---------MalformedURLException : "+e.getMessage());
			e.printStackTrace();
		}
		catch(IOException e)
		{
			logger.info("-------------((((("+name+"---------IOException : "+e.getMessage());
			e.printStackTrace();
		}

		return response;

	}	
	
	public void searchCitiesAndSave()
			throws Exception {		
		try {
			String searchURL = "https://api.tayyarah.com/tayyarahapi/cities/search?";			
			StringBuilder response = doGet(searchURL);
			AreaResponse areaResponse;
			ObjectMapper mapper = null;
			mapper = new ObjectMapper();
			mapper.configure(SerializationFeature.INDENT_OUTPUT, true);
			areaResponse = mapper.readValue(response.toString(), AreaResponse.class);
			FileUtil.writeJson(areaResponse, "hotel-city.json");
			areaResponse = null;
			logger.info("-------------((((("+name+" city list is been loaded ");		
		 } catch (JsonGenerationException e) {
			logger.info("-------------((((("+name+" Searhing hotels : JsonGenerationException--"+e.getMessage());
			e.printStackTrace();
		} catch (JsonMappingException e) {
			logger.info("-------------((((("+name+" Searhing hotels : JsonMappingException--"+e.getMessage());
			e.printStackTrace();
		} catch (IOException e) {
			logger.info("-------------((((("+name+" Searhing hotels : IOException--"+e.getMessage());
			e.printStackTrace();
		}
		catch (Exception e) {
			logger.info("-------------((((("+name+" Searhing hotels : Exception--"+e.getMessage());
			e.printStackTrace();
		}	
	}
	
	
}
