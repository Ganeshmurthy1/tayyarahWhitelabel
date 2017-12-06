package com.lintas.Imageaction;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;

import com.opensymphony.xwork2.ActionSupport;

public class DealImageAction  extends ActionSupport {

	  /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private InputStream imageStream;
		 private String filename ="/home/dealimages/";
		   //private String filename = "D:\\vimaldealimage\\";
		    private String customContentType = "image/jpeg";
		    private String customDisposition = "attachment, filename: " + filename;
		    String imageId =  "1.jpg";
		    
		    public String getImageId() {
				return imageId;
			}

			public void setImageId(String imageId) {
				this.imageId = imageId;
			}
		    
		    public InputStream getImageStream() {
		        return imageStream;
		    }

		    public String execute() {
		    	String filePath = filename + imageId ;
		        File file = new File(filePath);
		      
		        try {
		            imageStream = getInputStream(file);
		        }
		        catch (FileNotFoundException e) {

		        }

		        return SUCCESS;
		    }

		    private File getImageFile(String imageId) {
				String filePath = "/home/dealimages/";
		    	//String filePath = "D:\\vimaldealimage\\";
				//File file = new File(filePath + "/Image/", imageId);
				File file = new File(filePath + imageId);
				//System.out.println(file.toString());
				return file;
			}
		    
		    public String getFilename() {
		        return filename;
		    }

		    public String getCustomContentType() {
		        return customContentType;
		    }

		    public String getCustomContentDisposition() {
		        return  customDisposition;
		    }

		    public void setFilename(String filename) {
		        this.filename = filename;
		    }

		    protected InputStream getInputStream(File file) throws FileNotFoundException {
		        return new BufferedInputStream(new FileInputStream(file));
		    }
}