package WebDriverTests.WebDriverTests.UXAspectsTesting;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertFalse;
import static org.testng.Assert.assertTrue;
import static org.testng.Assert.fail;

import static org.testng.internal.EclipseInterface.ASSERT_LEFT;
import static org.testng.internal.EclipseInterface.ASSERT_MIDDLE;
import static org.testng.internal.EclipseInterface.ASSERT_RIGHT;

import java.net.URL;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.TimeUnit;
import org.apache.commons.lang.StringUtils;
import org.testng.annotations.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.Color;

/**
 * Records parameters specified for a test in TestNG.xml and defines
 * methods used to run the tests.
 */
public class TestNGBase {
	/**
	 * The WebDriver executable for the browser to be tested.
	 */
	protected WebDriver driver;
	
	/**
	 * An identifier for the browser the test is to be executed on (one of "firefox", "chrome", "ie" or "edge").
	 */
	protected String browser = "";
	
	/**
	 * The root of the documentation hierarchy.
	 */
	protected String rootUrl = "";
	
	/**
	 * The relative location from the root of the old documentation hierarchy of the web page to be tested. The complete URL will be constructed from the rootUrl and page parameters.
	 */
	protected String page = "";
	
	/**
	 * May be used to enforce the page to be tested.
	 * 
	 * If not specified the page's URL will be constructed from the `browser` and `page` parameters.
	 */
	protected String startingUrl = "";
	
	/**
	 * The maximum time, in milliseconds, to be taken to find an element or elements (default: 5000ms).
	 */
	protected Integer implicitWaitTimeMS = 0;
	
	/**
	 * The maximum time, in milliseconds, to wait to allow a page to be loaded before performing the next action (default: 0ms).
	 */
	protected Integer displayWaitTimeMS = 0;
	
	/**
	 * The number of pixels by which the window may be scrolled vertically to make controls visible (default 0).
	 */
	protected Integer verticalScrollPixels = 0;
	
	/** 
	 * The location on disk of the ChromeDriver executable used to send commands to a Chrome browser.
	 * 
	 * It may be downloaded from http://chromedriver.storage.googleapis.com/index.html.
	 */
	protected String chromeDriverLocation = "";
	
	/** 
	 * The location on disk of the GeckoeDriver executable used to send commands to a Firefox browser.
	 */
	protected String geckoDriverLocation = "";
	
	/**
	 * The location on disk of the IEDriveDriver executable, used to send commands to an IE 11 browser.
	 * 
	 * It may be downloaded from:
	 * 32 bits - http://selenium-release.storage.googleapis.com/2.53/IEDriverServer_Win32_2.53.1.zip
	 * 64 bits - http://selenium-release.storage.googleapis.com/2.53/IEDriverServer_x64_2.53.1.zip
	 */
	protected String IEDriverLocation = "";

	/**
	 * The location on disk of the MicrosoftWebDriver executable, used to send commands to an Edge browser.
	 * 
	 * It may be downloaded from https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/
	 */
	protected String edgeDriverLocation = "";
	
	/**
	 * The URL of the Selenium Grid hub
	 */
	protected String gridHubURL = "";
	
	/**
	 * String to record errors logged
	 */
	protected StringBuffer verificationErrors = new StringBuffer();

	/**
	 * Name of the class containing the test method being executed
	 */	
	protected String className = "";
	
	/**
	 * Name of the test method being executed
	 */	
	protected String methodName = "";

	/**  
	 * This function will execute before each Class tag in testng.xml.
	 * 
	 * @param browser An identifier for the browser the test is to be executed on (one of "firefox", "chrome", "ie" or "edge").
	 * @param rootUrl The root of the new documentation hierarchy.
	 * @param page The relative location from the root of the new documentation hierarchy of the web page to be tested. The complete URL will be constructed from the rootUrl and page parameters.
	 * @param startingUrl May be used to enforce the page to be tested. If not specified the page's URL will be constructed from the `rootUrl` and `page` parameters.
	 * @param implicitWaitTimeMS The maximum time, in milliseconds, to be taken to find an element or elements (default: 10000ms).
	 * @param displayWaitTimeMS The maximum time, in milliseconds, to wait to allow a page to be loaded before performing the next action (default: 10000ms).
	 * @param verticalScrollPixels The number of pixels by which the window may be scrolled vertically to make controls visible (default -200).
	 * @param chromeDriverLocation The location on disk of the ChromeDriver executable, used to send commands to a Chrome browser.
	 * @param geckoDriverLocation The location on disk of the GeckoDriver executable, used to send commands to a Firefox browser.
	 * @param IEDriverLocation The location on disk of the IEDriveDriver executable, used to send commands to an IE 11 browser.
	 * @param edgeDriverLocation The location on disk of the MicrosoftWebDriver executable, used to send commands to an Edge browser.
	 * @param useRemoteWebDriver Whether to send test commands to a Selenium Grid hub (true) or a local web driver (false) (default: true)?
	 * @param browserPlatform The OS on which the browser being tested is running (one of "vista", "win8" or "win10").
	 * @param gridHubURL The URL of the Selenium Grid hub.
	 * 
	 * @throws Exception Throws exception thrown by a WebDriver executable
	 */
	@BeforeClass
	@Parameters({"browser", "rootUrl", "page", "startingUrl", "implicitWaitTimeMS", "displayWaitTimeMS", "verticalScrollPixels",
		"chromeDriverLocation", "geckoDriverLocation", "IEDriverLocation", "edgeDriverLocation", "useRemoteWebDriver", "browserPlatform", "gridHubURL"})
	protected void setupBaseClass(String browser,
								  @Optional("") String rootUrl,
								  @Optional("") String page,
								  @Optional("") String startingUrl,
								  @Optional("5000") Integer implicitWaitTimeMS,
								  @Optional("5000") Integer displayWaitTimeMS,
								  @Optional("-50") Integer verticalScrollPixels,
								  @Optional("") String chromeDriverLocation,
								  @Optional("") String geckoDriverLocation,
								  @Optional("") String IEDriverLocation,
								  @Optional("") String edgeDriverLocation,
								  @Optional("true") Boolean useRemoteWebDriver,
								  @Optional("") String browserPlatform,
								  @Optional("") String gridHubURL) throws Exception{
		// Record the platform/browser combination to be tested
		this.browser = browser;

		Platform platform;
		if (browserPlatform.equalsIgnoreCase("vista")) {
			platform = Platform.VISTA;
		} else if (browserPlatform.equalsIgnoreCase("win8")) {
			platform = Platform.WIN8;
		} else if (browserPlatform.equalsIgnoreCase("win10")) {
			platform = Platform.WIN10;
		} else {
			platform = Platform.VISTA;
		}
		
		// Record the URL of the Selenium Grid hub
		if (!gridHubURL.isEmpty()) {
			this.gridHubURL = gridHubURL;
		}
		
		DesiredCapabilities capability;

		//Check if parameter passed from TestNG is 'firefox'
		if(this.browser.equalsIgnoreCase("firefox")){
			if (!geckoDriverLocation.isEmpty()) {
				this.geckoDriverLocation = geckoDriverLocation;
			}
			System.setProperty("webdriver.gecko.driver", this.geckoDriverLocation);

			if (WebDriverStore.webDriver == null) {
				// Create Firefox instance
				if (useRemoteWebDriver) {
					capability = DesiredCapabilities.firefox();
					capability.setBrowserName("firefox");
					capability.setPlatform(platform);
					this.driver = new RemoteWebDriver(new URL(gridHubURL), capability);
				} else {
					this.driver = new FirefoxDriver();
				}
				WebDriverStore.webDriver = this.driver;
			} else {
				this.driver = WebDriverStore.webDriver;
			}
		}
		//Check if parameter passed from TestNG is 'chrome'
		else if(this.browser.equalsIgnoreCase("chrome")){			
			if (!chromeDriverLocation.isEmpty()) {
				this.chromeDriverLocation = chromeDriverLocation;
			}
			System.setProperty("webdriver.chrome.driver", this.chromeDriverLocation);

			if (WebDriverStore.webDriver == null) {
				// Create Chrome instance
				if (useRemoteWebDriver) {
					capability = DesiredCapabilities.chrome();
					capability.setBrowserName("chrome");
					capability.setPlatform(platform);
					this.driver = new RemoteWebDriver(new URL(gridHubURL), capability);
				} else {
					this.driver = new ChromeDriver();
				}
				WebDriverStore.webDriver = this.driver;
			} else {
				this.driver = WebDriverStore.webDriver;
			}
		}
		//Check if parameter passed from TestNG is 'ie'
		else if(this.browser.equalsIgnoreCase("ie")){
			if (!IEDriverLocation.isEmpty()) {
				this.IEDriverLocation = IEDriverLocation;
			}
			System.setProperty("webdriver.ie.driver", this.IEDriverLocation);

			if (WebDriverStore.webDriver == null) {
				// Create IE instance. Disable persistent hovering.
				capability = DesiredCapabilities.internetExplorer();
				capability.setCapability(InternetExplorerDriver.ENABLE_PERSISTENT_HOVERING, false);
				if (useRemoteWebDriver) {
					capability.setBrowserName("internet explorer");
					capability.setPlatform(platform);
					this.driver = new RemoteWebDriver(new URL(gridHubURL), capability);
				} else {
					this.driver = new InternetExplorerDriver(capability);
				}
				WebDriverStore.webDriver = this.driver;
			} else {
				this.driver = WebDriverStore.webDriver;
			}
		}
		//Check if parameter passed from TestNG is 'edge'
		else if(this.browser.equalsIgnoreCase("edge")){
			if (!edgeDriverLocation.isEmpty()) {
				this.edgeDriverLocation = edgeDriverLocation;
			}
			System.setProperty("webdriver.edge.driver", this.edgeDriverLocation);

			if (WebDriverStore.webDriver == null) {
				// Create IE instance. Disable persistent hovering.
				capability = DesiredCapabilities.edge();
				if (useRemoteWebDriver) {
					capability.setBrowserName("MicrosoftEdge");
					capability.setPlatform(platform);
					this.driver = new RemoteWebDriver(new URL(gridHubURL), capability);
				} else {
					this.driver = new EdgeDriver(capability);
				}
				WebDriverStore.webDriver = this.driver;
			} else {
				this.driver = WebDriverStore.webDriver;
			}
		} else{
			//If no browser passed throw exception
			throw new Exception("Browser is not correct");
		}
		
		// Record the root URL and the page to be tested. If the URL of the page is not specified construct it
		// from the supplied root URL and the page.
		if (!rootUrl.isEmpty()) {
			this.rootUrl = rootUrl;
		}		
		this.page = page;
		if (!startingUrl.isEmpty()) {
			this.startingUrl = startingUrl;
		} else {
			this.startingUrl = this.rootUrl + "/#/" + this.page;
		}
		
		// Record the implicit wait time, the maximum time to be taken to find an element or elements
		this.implicitWaitTimeMS = implicitWaitTimeMS;
		driver.manage().timeouts().implicitlyWait(this.implicitWaitTimeMS, TimeUnit.MILLISECONDS);
		
		// Record the display wait time, the maximum time to wait to allow a page to be loaded before performing the next action
		this.displayWaitTimeMS = displayWaitTimeMS;

		// Record the number of pixels by which the window may be scrolled vertically to make controls visible
		this.verticalScrollPixels = verticalScrollPixels;

		// Maximise the window
		this.driver.manage().window().maximize();
	}

	/**
	 * This method will execute before each test method defined in the class.
	 * 
	 * It will empty the list of logged errors.
	 */
	@BeforeMethod(alwaysRun = true)
	protected void clearErrors() {
		verificationErrors.setLength(0);
	}
	
	/**
	 * This method will set the result status of the test method and log any errors.
	 */
	protected void logErrors() {
		String verificationErrorString = verificationErrors.toString();
		if (!"".equals(verificationErrorString)) {
			fail(verificationErrorString);
		}
	}
	
	/**
	 * Enter text into an input element.
	 * @param element Input element
	 * @param text String to enter
	 */
	protected void inputText(WebElement element, String text) {
		element.sendKeys(text);
	}
	
	/**
	 * This method will record the name of the calling test method and the class it is defined in.
	 * 
	 * @param className Name of the class containing the test method being executed
	 * @param methodName Name of the test method being executed
	 */
	protected void initialiseMethod(String className, String methodName) {
		this.className = (StringUtils.isNotBlank(className) ? className : "UNKNOWN");
		this.methodName = (StringUtils.isNotBlank(methodName) ? methodName : "UNKNOWN");
	}

	/**
	 * This method tests whether the specified element can be found.
	 * 
	 * @param element The parent element
	 * @param by The Selenium locator object for the sought element relative to the parent element
	 * @return true if the element was found
	 */
	protected boolean isElementPresent(WebElement element, By by) {
		try {
			element.findElement(by);
			return true;
		} catch (NoSuchElementException e) {
			return false;
		}
	}
	
	/**
	 * Compares the title of the current page to a specified value.
	 * 
	 * Logs an error if the page's title does not match the specified title.
	 * 
	 * @param expectedValue The expected page title
	 */
	protected void checkPageTitle(String expectedValue) {
		try {
			assertEquals(this.driver.getTitle(), expectedValue);
		} catch (Error e) {
			Utilities.logError(this.verificationErrors, this.className, this.methodName, e);
		}
	}

	/**
	 * Compares the text of an element to a specified value.
	 * 
	 * Logs an error if the element's text does not match the specified text.
	 * 
	 * @param element The element
	 * @param expectedValue The expected text
	 */
	protected void checkElementText(WebElement element, String expectedValue) {
		try {
			assertEquals(element.getText(), expectedValue);
		} catch (Error e) {
			Utilities.logError(this.verificationErrors, this.className, this.methodName, e);
		}
	}
	
	/**
	 * Compares the trimmed text of an element to a specified value.
	 * 
	 * Logs an error if the element's trimmed text does not match the specified text.
	 * 
	 * @param element The element
	 * @param expectedValue The expected text
	 */
	protected void checkElementTrimmedText(WebElement element, String expectedValue) {
		try {
			assertEquals(element.getText().trim(), expectedValue);
		} catch (Error e) {
			Utilities.logError(this.verificationErrors, this.className, this.methodName, e);
		}
	}
	
	/**
	 * Compares the HREF attribute of an element to a specified value.
	 * 
	 * Logs an error if the element's HREF attribute does not match the specified value.
	 * 
	 * @param element The element
	 * @param expectedValue The expected value
	 */
	protected void checkElementLinkAttribute(WebElement element, String expectedValue) {
		try {
			assertEquals(element.getAttribute("href"), expectedValue);
		} catch (Error e) {
			Utilities.logError(this.verificationErrors, this.className, this.methodName, e);
		}
	}
	
	/**
	 * Checks whether a specified element can be found.
	 * 
	 * Logs an error if the element cannot be found.
	 * 
	 * @param element The parent element
	 * @param locator The Selenium locator object for the element relative to the parent element
	 */
	protected void checkElementPresent(WebElement element, By locator) {
		try {
			assertTrue(isElementPresent(element, locator));
		} catch (Error e) {
			Utilities.logError(this.verificationErrors, this.className, this.methodName, e);
		}
	}
	
	/**
	 * Checks whether a specified element can not be found.
	 * 
	 * Logs an error if the element can be found.
	 * 
	 * @param element The parent element
	 * @param locator The Selenium locator object for the element relative to the parent element
	 */
	protected void checkElementNotPresent(WebElement element, By locator) {
		try {
			assertFalse(isElementPresent(element, locator));
		} catch (Error e) {
			Utilities.logError(this.verificationErrors, this.className, this.methodName, e);
		}
	}
	
	/** Checks whether the element can be found as the immediate child of a specified element.
	 * 
	 * Logs an error if the element cannot be found
	 * 
	 * @param element The parent element
	 * @param soughtClass The class we want to find
	 * @return 
	 */
	protected void checkElementPresentImmediate(WebElement element, String soughtClass) {
		try {
			boolean result = false;
			List<WebElement> children = element.findElements(By.xpath("*"));
			for (WebElement child: children){
				if(child.getAttribute("class") != null && child.getAttribute("class").contains(soughtClass)){
					result = true;	
				}
			}
			assertTrue(result);
		} catch (Error e) {
			Utilities.logError(this.verificationErrors, className, methodName, e);
		}
	}
	
	/** Checks whether the element can NOT be found as the immediate child of a specified element.
	 * 
	 * Logs an error if the element cannot be found
	 * 
	 * @param element The parent element
	 * @param soughtClass The class we want to find
	 * @return 
	 */
	protected void checkElementNotPresentImmediate(WebElement element, String soughtClass) {
		try {
			boolean result = false;
			List<WebElement> children = element.findElements(By.xpath("*"));
			for (WebElement child: children){
				if(child.getAttribute("class") != null && child.getAttribute("class").contains(soughtClass)){
					result = true;	
				}
			}
			assertFalse(result);
		} catch (Error e) {
			Utilities.logError(this.verificationErrors, className, methodName, e);
		}
	}
	
	/**
	 * Checks whether a specified element is selected.
	 * 
	 * Logs an error if the element is not selected.
	 * 
	 * @param element The element
	 */
	protected void checkElementSelected(WebElement element) {
		try {
			assertTrue(element.isSelected());
		} catch (Error e) {
			Utilities.logError(this.verificationErrors, this.className, this.methodName, e);
		}
	}
	
	/**
	 * Checks whether a specified element is not selected.
	 * 
	 * Logs an error if the element is selected.
	 * 
	 * @param element The element
	 */
	protected void checkElementNotSelected(WebElement element) {
		try {
			assertFalse(element.isSelected());
		} catch (Error e) {
			Utilities.logError(this.verificationErrors, this.className, this.methodName, e);
		}
	}
	
	/**
	 * Compares the colour of a property of an element to a specified colour.
	 * 
	 * Logs an error if the property's colour does not match the specified colour.
	 * 
	 * @param element The element
	 * @param property The property to be tested
	 * @param expectedValue The expected colour
	 */
	protected void checkElementPropertyColour(WebElement element, String property, String expectedValue) {
		try {
			assertEquals(Color.fromString(element.getCssValue(property)).asHex(), expectedValue);
		} catch (Error e) {
			Utilities.logError(this.verificationErrors, this.className, this.methodName, e);
		}
	}

	/**
	 * Compares the colour of a property of an element to an array of specified colours.
	 * 
	 * Logs an error if the property's colour does not match one of the specified colours.
	 * 
	 * @param element The element
	 * @param property The property to be tested
	 * @param expectedValues The expected colours
	 */
	protected void checkElementPropertyColour(WebElement element, String property, String [] expectedValues) {
		try {
			String propertyColour = Color.fromString(element.getCssValue(property)).asHex();
			String result = "";
			for (String s : expectedValues) {
				if (s.equalsIgnoreCase(propertyColour)) {
					result = s;
					break;
				}
			}

			if (result == "") {
				String errorMessage = ASSERT_LEFT + "one of ";
				int valuePosition = 0;
				for (String s : expectedValues) {
					valuePosition++;
					errorMessage = errorMessage + s;
					if (valuePosition < expectedValues.length) {
						errorMessage = errorMessage + ", ";
					}
				}
				errorMessage = errorMessage + ASSERT_MIDDLE + propertyColour + ASSERT_RIGHT;
				fail(errorMessage);
			}
		} catch (Error e) {
			Utilities.logError(this.verificationErrors, this.className, this.methodName, e);
		}
	}

	/**
	 * Compares the value of a property of an element to a specified value.
	 * 
	 * Logs an error if the property's value does not match the specified value.
	 * 
	 * @param element The element
	 * @param property The property to be tested
	 * @param expectedValue The expected value
	 */
	protected void checkElementProperty(WebElement element, String property, String expectedValue) {
		try {
			assertEquals(element.getCssValue(property), expectedValue);
		} catch (Error e) {
			Utilities.logError(this.verificationErrors, this.className, this.methodName, e);
		}
	}
	
	/**
	 * Compares the value of a property of an element to a specified value converted to a rounded integer.
	 * 
	 * Logs an error if the property's value does not match the specified value.
	 * 
	 * @param element The element
	 * @param property The property to be tested
	 * @param expectedValue The expected value
	 */
	protected void checkElementPropertyInt(WebElement element, String property, String expectedValue) {
		try {
			String numberOnly= element.getCssValue(property).replaceAll("[^0-9, .]", "");
			double doubleValue = Double.parseDouble(numberOnly);
			String number = Integer.toString((int) Math.round(doubleValue));
			assertEquals(number, expectedValue);
		} catch (Error e) {
			Utilities.logError(this.verificationErrors, this.className, this.methodName, e);
		}
	}
	
	/**
	 * Compares the value of a property of an element to an array of specified values.
	 * 
	 * Logs an error if the property's value does not match one of the specified values.
	 * 
	 * @param element The element
	 * @param property The property to be tested
	 * @param expectedValues The expected values
	 */
	protected void checkElementProperty(WebElement element, String property, String [] expectedValues) {
		try {
			String propertyValue = element.getCssValue(property);
			String result = "";
			for (String s : expectedValues) {
				if (s.equalsIgnoreCase(propertyValue)) {
					result = s;
					break;
				}
			}

			if (result == "") {
				String errorMessage = ASSERT_LEFT + "one of ";
				int valuePosition = 0;
				for (String s : expectedValues) {
					valuePosition++;
					errorMessage = errorMessage + s;
					if (valuePosition < expectedValues.length) {
						errorMessage = errorMessage + ", ";
					}
				}
				errorMessage = errorMessage + ASSERT_MIDDLE + propertyValue + ASSERT_RIGHT;
				fail(errorMessage);
			}
		} catch (Error e) {
			Utilities.logError(this.verificationErrors, this.className, this.methodName, e);
		}
	}

	/**
	 * Checks whether an element has the specified value in the specified attribute.
	 * 
	 * Logs an error if the element does not have the value.
	 * 
	 * @param element The element
	 * @param attribute The attribute to look at
	 * @param value The sought value
	 */
	private void checkElementAttributeValueImpl(WebElement element, String attribute, String value) {
		String result = element.getAttribute(attribute);
		assertEquals(result, value);
	}
	
	/**
	 * Checks whether an element's attribute contains the specified value.
	 * 
	 * Logs an error if the element does not have the value.
	 * 
	 * @param element The element
	 * @param attribute The attribute to look at
	 * @param separators Regular expression containing the separators for a list
	 * @param value The sought value
	 */
	private void checkElementAttributeContainsValueImpl(WebElement element, String attribute, String separators, String value) {
		String result = "";
		String values = element.getAttribute(attribute);
		String [] valuesArray = values.split(separators);
		if (valuesArray.length > 0) {
			for (String s : valuesArray) {
				if (s.trim().equalsIgnoreCase(value)) {
					result = value;
					break;
				}
			}
		}
		assertEquals(result, value);
	}
	
	/**
	 * Checks whether an element's attribute does not contain the specified value.
	 * 
	 * Logs an error if the element does not have the value.
	 * 
	 * @param element The element
	 * @param attribute The attribute to look at
	 * @param separators Regular expression containing the separators for a list
	 * @param value The sought value
	 */
	private void checkElementAttributeDoesNotContainValueImpl(WebElement element, String attribute, String separators, String value) {
		String result = "";
		String values = element.getAttribute(attribute);
		String [] valuesArray = values.split(separators);
		if (valuesArray.length > 0) {
			for (String s : valuesArray) {
				if (s.trim().equalsIgnoreCase(value)) {
					result = value;
					break;
				}
			}
		}
		assertEquals(result, "");
	}
	
	/**
	 * Checks whether an element's attribute has the specified value.
	 * 
	 * Logs an error if the element does not have the value.
	 * 
	 * @param element The element
	 * @param attribute The attribute to look at
	 * @param value The sought value
	 */
	protected void checkElementAttributeValue(WebElement element, String attribute, String value) {
		try {
			checkElementAttributeValueImpl(element, attribute, value);
		} catch (Error e) {
			Utilities.logError(this.verificationErrors, this.className, this.methodName, e);
		}
	}
	
	/**
	 * Checks whether an element's attribute contains the specified value when the attribute can contain multiple values.
	 * 
	 * Logs an error if the element does not have the value.
	 * 
	 * @param element The element
	 * @param attribute The attribute to look at
	 * @param separators Regular expression containing the separators for a list
	 * @param value The sought value
	 */
	protected void checkElementAttributeContainsValue(WebElement element, String attribute, String separators, String value) {
		try {
			checkElementAttributeContainsValueImpl(element, attribute, separators, value);
		} catch (Error e) {
			Utilities.logError(this.verificationErrors, this.className, this.methodName, e);
		}
	}
	
	/**
	 * Checks whether an element's attribute does not contains the specified value when the attribute can contain multiple values.
	 * 
	 * Logs an error if the element does have the value.
	 * 
	 * @param element The element
	 * @param attribute The attribute to look at
	 * @param separators Regular expression containing the separators for a list
	 * @param value The sought value
	 */
	protected void checkElementAttributeDoesNotContainValue(WebElement element, String attribute, String separators, String value) {
		try {
			checkElementAttributeDoesNotContainValueImpl(element, attribute, separators, value);
		} catch (Error e) {
			Utilities.logError(this.verificationErrors, this.className, this.methodName, e);
		}
	}
	
	/**
	 * Checks whether a specified element has the specified class.
	 * 
	 * Logs an error if the class is not found.
	 * 
	 * @param element The element
	 * @param soughtClass The class
	 */
	protected void checkElementHasClass(WebElement element, String soughtClass) {
		try {
			checkElementAttributeContainsValueImpl(element, "class", "\\s+", soughtClass);
		} catch (Error e) {
			Utilities.logError(this.verificationErrors, this.className, this.methodName, e);
		}
	}
	
	/**
	 * Checks whether a specified element does not have the specified class.
	 * 
	 * Logs an error if the class is found.
	 * 
	 * @param element The element
	 * @param soughtClass The class
	 */
	protected void checkElementHasNotClass(WebElement element, String soughtClass) {
		try {
			checkElementAttributeDoesNotContainValueImpl(element, "class", "\\s+", soughtClass);
		} catch (Error e) {
			Utilities.logError(this.verificationErrors, this.className, this.methodName, e);
		}
	}
		
	/**
	 * Checks whether a specified element has the "active" class.
	 * 
	 * Logs an error if the element is not active.
	 * 
	 * @param element The element
	 */
	protected void checkElementActive(WebElement element) {
		try {
			checkElementAttributeContainsValueImpl(element, "class", "\\s+", "active");
		} catch (Error e) {
			Utilities.logError(this.verificationErrors, this.className, this.methodName, e);
		}
	}
	
	/**
	 * Checks whether a specified element does not have the "active" class.
	 * 
	 * Logs an error if the element is active.
	 * 
	 * @param element The element
	 */
	protected void checkElementNotActive(WebElement element) {
		try {
			checkElementAttributeDoesNotContainValueImpl(element, "class", "\\s+", "active");
		} catch (Error e) {
			Utilities.logError(this.verificationErrors, this.className, this.methodName, e);
		}
	}
	
	/**
	 * Checks whether a specified element is checked.
	 * 
	 * Logs an error if the element is not checked.
	 * 
	 * @param element The element
	 */
	protected void checkElementChecked(WebElement element) {
		try {
			checkElementAttributeContainsValueImpl(element, "class", "\\s+", "checked");
		} catch (Error e) {
			Utilities.logError(this.verificationErrors, this.className, this.methodName, e);
		}
	}
	
	/**
	 * Checks whether a specified element is not checked.
	 * 
	 * Logs an error if the element is checked.
	 * 
	 * @param element The element
	 */
	protected void checkElementNotChecked(WebElement element) {
		try {
			checkElementAttributeDoesNotContainValueImpl(element, "class", "\\s+", "checked");
		} catch (Error e) {
			Utilities.logError(this.verificationErrors, this.className, this.methodName, e);
		}
	}
	
	/**
	 * Checks whether a specified element is EL checked.
	 * 
	 * Logs an error if the element is not EL checked.
	 * 
	 * @param element The element
	 */
	protected void checkElementCheckedEL(WebElement element) {
		try {
			checkElementAttributeContainsValueImpl(element, "class", "\\s+", "el-checked");
		} catch (Error e) {
			Utilities.logError(this.verificationErrors, this.className, this.methodName, e);
		}
	}
	
	/**
	 * Checks whether a specified element is not EL checked.
	 * 
	 * Logs an error if the element is EL checked.
	 * 
	 * @param element The element
	 */
	protected void checkElementNotCheckedEL(WebElement element) {
		try {
			checkElementAttributeDoesNotContainValueImpl(element, "class", "\\s+", "el-checked");
		} catch (Error e) {
			Utilities.logError(this.verificationErrors, this.className, this.methodName, e);
		}
	}
	
	/**
	 * Checks whether a specified element is UX checked.
	 * 
	 * Logs an error if the element is not UX checked.
	 * 
	 * @param element The element
	 */
	protected void checkElementCheckedUX(WebElement element) {
		try {
			checkElementAttributeContainsValueImpl(element, "class", "\\s+", "ux-checked");
		} catch (Error e) {
			Utilities.logError(this.verificationErrors, this.className, this.methodName, e);
		}
	}
	
	/**
	 * Checks whether a specified element is not UX checked.
	 * 
	 * Logs an error if the element is UX checked.
	 * 
	 * @param element The element
	 */
	protected void checkElementNotCheckedUX(WebElement element) {
		try {
			checkElementAttributeDoesNotContainValueImpl(element, "class", "\\s+", "ux-checked");
		} catch (Error e) {
			Utilities.logError(this.verificationErrors, this.className, this.methodName, e);
		}
	}
	
	/**
	 * Checks whether a specified element is indeterminate.
	 * 
	 * Logs an error if the element is not indeterminate.
	 * 
	 * @param element The element
	 */
	protected void checkElementIndeterminate(WebElement element) {
		try {
			checkElementAttributeContainsValueImpl(element, "class", "\\s+", "indeterminate");
		} catch (Error e) {
			Utilities.logError(this.verificationErrors, this.className, this.methodName, e);
		}
	}
	
	/**
	 * Checks whether a specified element is EL indeterminate.
	 * 
	 * Logs an error if the element is not EL indeterminate.
	 * 
	 * @param element The element
	 */
	protected void checkElementIndeterminateEL(WebElement element) {
		try {
			checkElementAttributeContainsValueImpl(element, "class", "\\s+", "el-indeterminate");
		} catch (Error e) {
			Utilities.logError(this.verificationErrors, this.className, this.methodName, e);
		}
	}
	
	/**
	 * Checks whether a specified element is UX indeterminate.
	 * 
	 * Logs an error if the element is not UX indeterminate.
	 * 
	 * @param element The element
	 */
	protected void checkElementIndeterminateUX(WebElement element) {
		try {
			checkElementAttributeContainsValueImpl(element, "class", "\\s+", "ux-indeterminate");
		} catch (Error e) {
			Utilities.logError(this.verificationErrors, this.className, this.methodName, e);
		}
	}
	
	/**
	 * Checks whether a specified element is enabled.
	 * 
	 * Logs an error if the element is not enabled.
	 * 
	 * @param element The element
	 */
	protected void checkElementEnabled(WebElement element) {
		try {
			checkElementAttributeDoesNotContainValueImpl(element, "class", "\\s+", "disabled");
		} catch (Error e) {
			Utilities.logError(this.verificationErrors, this.className, this.methodName, e);
		}
	}
	
	/**
	 * Checks whether a specified element is not enabled.
	 * 
	 * Logs an error if the element is enabled.
	 * 
	 * @param element The element
	 */
	protected void checkElementNotEnabled(WebElement element) {
		try {
			checkElementAttributeContainsValueImpl(element, "class", "\\s+", "disabled");
		} catch (Error e) {
			Utilities.logError(this.verificationErrors, this.className, this.methodName, e);
		}
	}	
	
	/**
	 * Checks whether a specified element is enabled.
	 * 
	 * Logs an error if the element is not enabled.
	 * 
	 * @param element The element
	 */
	protected void checkElementEnabledUX(WebElement element) {
		try {
			checkElementAttributeDoesNotContainValueImpl(element, "class", "\\s+", "ux-disabled");
		} catch (Error e) {
			Utilities.logError(this.verificationErrors, this.className, this.methodName, e);
		}
	}
	
	/**
	 * Checks whether a specified element is not enabled.
	 * 
	 * Logs an error if the element is enabled.
	 * 
	 * @param element The element
	 */
	protected void checkElementNotEnabledUX(WebElement element) {
		try {
			checkElementAttributeContainsValueImpl(element, "class", "\\s+", "ux-disabled");
		} catch (Error e) {
			Utilities.logError(this.verificationErrors, this.className, this.methodName, e);
		}
	}	
	
	/**
	 * Checks whether a specified element is visible.
	 * 
	 * Logs an error if the element is not visible.
	 * 
	 * @param element The element
	 */
	protected void checkElementVisible(WebElement element) {
		try {
			assert(element.isDisplayed());
		} catch (Error e) {
			Utilities.logError(this.verificationErrors, this.className, this.methodName, e);
		}
	}
	
	/**
	 * Checks whether a specified element is not visible.
	 * 
	 * Logs an error if the element is visible.
	 * 
	 * @param element The element
	 */
	protected void checkElementNotVisible(WebElement element) {
		try {
			assert(!element.isDisplayed());
		} catch (Error e) {
			Utilities.logError(this.verificationErrors, this.className, this.methodName, e);
		}
	}
	
	/**
	 * Checks the number of matched elements.
	 * 
	 * Logs an error if the elements count is not as expected.
	 * 
	 * @param elements List of elements
	 * @param expected Expected element count
	 */
	protected void checkNumberOfElements(List<WebElement> elements, int expected) {
		try {
			assertEquals(elements.size(), expected);
		} catch (Error e) {
			Utilities.logError(this.verificationErrors, this.className, this.methodName, e);
		}
	}
}



