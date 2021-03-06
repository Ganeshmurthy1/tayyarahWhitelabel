package com.lintas.model;

import java.io.File;
import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author      : Manish Samrat
 * @createdAt   : 28/06/2017
 * @version
 */
@Entity
@Table(name="theme_insertion_request")
public class ThemeInsertionRequestModel implements Serializable{

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue
	private int id;
	private int companyId;
	private int configId;

	private String appKey;
	private String themeName;
	private String url;
	private String designPattern;
	private String logoImagePath;
	private File logoImageFile;
	private File cssFile;
	private String cssPath;
	
	private Boolean enableFlight;
	private Boolean enableHotel;
	private Boolean enableCar;
	private Boolean enableBus;
	private Boolean enableTrain;
	private Boolean enableInsurance;
	private Boolean enableVisa;
	private Boolean enableMiscellaneous;
	private Boolean enableLogoOnVoucher;
	private Boolean enableHeader;
	private Boolean enableFooter;
	private Boolean enablePaymentGateway;
	private Boolean enableB2B;
	
	private Boolean whitelabelActive;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getCompanyId() {
		return companyId;
	}
	public int getConfigId() {
		return configId;
	}
	public String getAppKey() {
		return appKey;
	}
	public String getThemeName() {
		return themeName;
	}
	public String getDesignPattern() {
		return designPattern;
	}
	public String getLogoImagePath() {
		return logoImagePath;
	}
	
	public Boolean getEnableFlight() {
		return enableFlight;
	}
	public Boolean getEnableHotel() {
		return enableHotel;
	}
	public Boolean getEnableCar() {
		return enableCar;
	}
	public Boolean getEnableBus() {
		return enableBus;
	}
	public Boolean getEnableTrain() {
		return enableTrain;
	}
	public Boolean getEnableInsurance() {
		return enableInsurance;
	}
	public Boolean getEnableVisa() {
		return enableVisa;
	}
	public Boolean getEnableMiscellaneous() {
		return enableMiscellaneous;
	}
	public Boolean getEnableLogoOnVoucher() {
		return enableLogoOnVoucher;
	}
	public Boolean getEnableHeader() {
		return enableHeader;
	}
	public Boolean getEnableFooter() {
		return enableFooter;
	}
	public Boolean getEnablePaymentGateway() {
		return enablePaymentGateway;
	}
	public Boolean getEnableB2B() {
		return enableB2B;
	}
	public void setCompanyId(int companyId) {
		this.companyId = companyId;
	}
	public void setConfigId(int configId) {
		this.configId = configId;
	}
	public void setAppKey(String appKey) {
		this.appKey = appKey;
	}
	public void setThemeName(String themeName) {
		this.themeName = themeName;
	}
	public void setDesignPattern(String designPattern) {
		this.designPattern = designPattern;
	}
	public void setLogoImagePath(String logoImagePath) {
		this.logoImagePath = logoImagePath;
	}
	
	public String getCssPath() {
		return cssPath;
	}
	public void setCssPath(String cssPath) {
		this.cssPath = cssPath;
	}
	public void setEnableFlight(Boolean enableFlight) {
		this.enableFlight = enableFlight;
	}
	public void setEnableHotel(Boolean enableHotel) {
		this.enableHotel = enableHotel;
	}
	public void setEnableCar(Boolean enableCar) {
		this.enableCar = enableCar;
	}
	public void setEnableBus(Boolean enableBus) {
		this.enableBus = enableBus;
	}
	public void setEnableTrain(Boolean enableTrain) {
		this.enableTrain = enableTrain;
	}
	public void setEnableInsurance(Boolean enableInsurance) {
		this.enableInsurance = enableInsurance;
	}
	public void setEnableVisa(Boolean enableVisa) {
		this.enableVisa = enableVisa;
	}
	public void setEnableMiscellaneous(Boolean enableMiscellaneous) {
		this.enableMiscellaneous = enableMiscellaneous;
	}
	public void setEnableLogoOnVoucher(Boolean enableLogoOnVoucher) {
		this.enableLogoOnVoucher = enableLogoOnVoucher;
	}
	public void setEnableHeader(Boolean enableHeader) {
		this.enableHeader = enableHeader;
	}
	public void setEnableFooter(Boolean enableFooter) {
		this.enableFooter = enableFooter;
	}
	public void setEnablePaymentGateway(Boolean enablePaymentGateway) {
		this.enablePaymentGateway = enablePaymentGateway;
	}
	public void setEnableB2B(Boolean enableB2B) {
		this.enableB2B = enableB2B;
	}
	public Boolean isWhitelabelActive() {
		return whitelabelActive;
	}
	public void setWhitelabelActive(Boolean whitelabelActive) {
		this.whitelabelActive = whitelabelActive;
	}
	public File getLogoImageFile() {
		return logoImageFile;
	}
	public File getCssFile() {
		return cssFile;
	}
	public void setLogoImageFile(File logoImageFile) {
		this.logoImageFile = logoImageFile;
	}
	public void setCssFile(File cssFile) {
		this.cssFile = cssFile;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	
}
