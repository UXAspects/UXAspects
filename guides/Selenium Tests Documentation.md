
### These instructions apply to Windows machines only.


# Software installation and configuration

If you are operating behind a firewall set the environment variables http\_proxy and https\_proxy to the URL of your proxy.

You will need a means of unpacking archives e.g. [7-zip](http://www.7-zip.org/download.html).

### Required software

Install the [Java SE SDK 1.8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html).

- Add the environment variable JAVA\_HOME, setting it to the location of the JDK e.g. C:\Program Files\Java\jdk1.8.0_121.
- Add the location of the JDK's Bin folder to the PATH environment variable.

Install [Maven](https://maven.apache.org/download.cgi).

- Extract the folder to disk e.g. C:\Program Files\apache-maven-3.x.y.
- Add the apache-maven-3.x.y\bin folder to the PATH environment variable.
- Open a command prompt and run ‘mvn –v’ to verify installation.
- Add the environment variable M2\_HOME and set it to the path to the apache-maven-3.x.y folder e.g. C:\Program Files\apache-maven-3.3.9.
- Add the M2 environment variable set it to %M2\_HOME%\bin.
- If you are behind a firewall you may need to add proxy information to allow the download of Maven artifacts:
  - In your home folder (C:\Users\\{'Your name'}) create a folder called '.m2'. *Note: You may need to create it via Git Bash if you are not able to create it via right click > New Folder.*
  - Inside the new '.m2' folder create a folder called 'repository'.
  - Copy the 'settings.xml' file from the apache-maven-3.x.y\conf folder and place it within your .m2 folder beside the new 'repository' folder.
  - Add proxy details in the 'proxies' section.

Install [NodeJS](https://nodejs.org/en/) (version 7.4.0 or higher).

Install [Git for Windows](https://git-scm.com/download/win).

- Ensure that the *Git Bash Here* checkbox is checked in the Select Components page.

Clone the UXAspects repository

- After installing Git, in Windows Explorer right-click in the folder where you wish to clone the UXAspects repository, open a Git Bash command prompt and run `git clone https://github.com/UXAspects/UXAspects.git`.
- cd to the 'UXAspects' folder and check out the required branch e.g. `git checkout develop`.

### WebDriver executables

Download the [ChromeDriver executable](https://sites.google.com/a/chromium.org/chromedriver/) if you wish to run the tests against Chrome.

Download the [GeckoDriver executable](https://github.com/mozilla/geckodriver/releases) if you wish to run the tests against Firefox.

Download the [IEDriverServer 32-bit executable](http://selenium-release.storage.googleapis.com/3.0/IEDriverServer_Win32_3.0.0.zip) if you wish to run the tests against the 32-bit version of Internet Explorer 11 or the [IEDriverServer 64-bit executable](http://selenium-release.storage.googleapis.com/3.0/IEDriverServer_x64_3.0.0.zip) if you wish to run the tests against the 64-bit version.

- Add the location of the executable to the PATH environment variable.

Download the [MicrosoftWebDriver executable](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/) if you wish to run the tests against the Microsoft Edge browser. Take care to download the correct version of the driver for your build of the operating system.

Place the downloaded WebDriver executable(s) at a convenient location.

### Building the web server

The Selenium tests must be run against a site hosted on a web server. The web server may be built on the local machine or within a Docker container.

##### 1. Building the web server on the local machine

A number of packages must be installed to create the server.

Install grunt

- Run `npm install -g grunt-cli`.

Download dependencies

- Run `npm install`.

Start the webserver

- Run `grunt build` followed by `grunt connect:selenium`.
- Open a browser at http://localhost:4000. The UX Aspects documentation landing page should be displayed.

##### 2. Building the web server in a Docker container

An alternative is to use Docker to build a container which has the required packages and which will build the web server.

- Install Docker and start the Docker engine.
- Open a Git Bash command prompt and change directory to the 'UXAspects' folder.
- Run `bash buildscripts/buildWebService.sh`.

  This command will build the required Docker image (if it does not already exist), create a Docker container, build the web service within the container and publish it over port 4000 (this port must be accessible outside the container).

- Open a browser at http://localhost:4000. The UX Aspects documentation landing page should be displayed. Crtl-C in the command prompt will stop the web server.

### Configuring Eclipse

Install the [Eclipse IDE](https://eclipse.org/downloads/).

- When installing choose 'Eclipse IDE for Java Developers'.

Start Eclipse.

On the menu bar, click Help.

Choose the 'Install New Software...' option.

- In the Install dialog box, click the Add button.
- In 'Name', type 'TestNG'.
- In 'Location', type 'http://beust.com/eclipse'.
- Click OK.

When the 'TestNG' checkbox is available, check it.

Click Next until you reach the License Agreement dialog, accept the terms and click Finish.

If you encounter a Security warning, click OK.

When Eclipse prompts you for a restart, click Yes.

Select 'Open Projects from File System ...' from the File menu.

Press 'Directory ...' and browse to the cloned 'UXAspects' folder. The download of dependencies may take some time.

In Package Explorer, right-click on 'JRE System Library' and select Properties. Check that 'Execution environment' is set to 'JaveSE-1.8'.

# Execution of tests in Eclipse
 
Update the TestNG.xml file :  

- Set the value of 'rootURL' to 'http://localhost:4000'.
- Update the lines containing the chromeDriverLocation, geckoDriverLocation, IEDriverLocation or edgeDriverLocation parameters with the full paths to the Webriver executables you will be using e.g. C:\Git\UXAspects\chromedriver.exe. 
- Set 'useRemoteWebDriver' to 'false' ('browserPlatform' and 'gridHubURL' may be left unchanged).
- Comment out any tests you do not wish to run.

To run the tests right-click on TestNG.xml and select Run As -> TestNG Suite. When the tests have completed a results file, emailable-report.html, should have been created in the test-output folder (refresh the Explorer tree view in Eclipse if this folder is not visible).

# Java project location and structure

The Java project is located in the https://github.com/UXAspects/UXAspects repository. The code hierarchy mimics the structure of the documentation. Each page has a corresponding package, each page section has a corresponding Java source file in the package and each sub-section has one or methods in the source file. For example, the source files for the Components page are found in src\test\java\WebDriverTests\WebDriverTests\Components and the Input Controls section's class is InputControls.java.

The src\test\java\WebDriverTests\WebDriverTests\UXAspecsTesting folder contains a base class, TestNGBase.java, from which tests classes must be derived and other utility classes used during test execution.

The file TestNG.xml lists the test classes to be executed, the platform/browser combinations the tests are to be executed on and parameters to be passed to the tests.

###### TestNGBase class

The TestNGBase class is a base class for tests. It stores the values of
parameters passed to a test from the TestNG.xml file:

-   `String browser` – An identifier for the browser the test is to be executed on (one of "firefox", "chrome", "ie" or "edge")
-   `String rootUrl` – The root of the documentation hierarchy
-   `String page` –  The relative location from the root of the documentation hierarchy of the web page to be tested. The complete URL will be constructed from the rootUrl and page parameters
-   `String startingUrl` – May be used to enforce the page to be tested. If not specified the page's URL will be constructed from the `rootUrl` and `page` parameters
-   `Integer implicitWaitTimeMS` – The maximum time, in milliseconds, to be taken to find an element or elements (default: 5000ms)
-   `Integer displayWaitTimeMS` – The maximum time, in milliseconds, to wait to allow a page to be loaded before performing the next action
    (default: 5000ms)
-   `Integer verticalScrollPixels` - The number of pixels by which the window may be scrolled vertically to make controls visible (default -50)
-   `String chromeDriverLocation` – The location on disk of the ChromeDriver executable, used to send commands to a Chrome browser
-   `String geckoDriverLocation` – The location on disk of the GeckoDriver executable, used to send commands to a Firefox browser
-   `String IEDriverLocation` – The location on disk of the IEDriveDriver executable, used to send commands to an IE 11 browser
-   `String edgeDriverLocation` – The location on disk of the MicrosoftWebDriver executable, used to send commands to an Edge browser
-   `Boolean useRemoteWebDriver` - Whether to send test commands to a Selenium Grid hub (true) or a local web driver (false) (default: true)
-   `String browserPlatform` - The OS on which the browser being tested is running (one of "vista" (for Windows Vista, Windows Server 2008 and Windows 7), "win8" (for WIndows 8 and Windows Server 2012) or "win10" (for Windows 10))
-   `String gridHubURL` - The URL of the Selenium Grid hub

The class also contains methods which:

-   record the values of input parameters for a test and create an instance of the relevant browser driver
-   empty the list of errors before each method is executed
-   perform tests on elements and log any reported errors
-   set the test’s status to failed if errors occurred
-   close the instance of the driver when all of a class’s methods have executed

###### Utilities class

The Utilities class contains methods which:

-   determine the name of the currently executing method
-   determine the line number of a method at which an error was raised
-   use the above methods to log information about the location of an
    error
-   scroll to a documentation section
-   scroll the browser screen vertically by a specified number of pixels
    (to ensure a component is visible in the browser window)

# Problems encountered during test development

#### Page loading delay

When pages are moved to a delay before test execution continues is
sometimes needed to allow page loading to complete. The default wait
time (5000 milliseconds is usually enough) is defined in the TestNG.xml
file.

#### Persistent hovering in IE

Tests in IE can execute slowly due to the browser constantly checking
where the mouse cursor is when the cursor is over a scrollbar. The test
pauses for several seconds accompanied by flickering of the scrollbar.
To avoid this, persistent hovering must be disabled when the instance of
the IE WebDriver is created:

	DesiredCapabilities returnCapabilities = DesiredCapabilities.internetExplorer();  
	returnCapabilities.setCapability(InternetExplorerDriver.ENABLE_PERSISTENT_HOVERING, false);  
	this.driver = new InternetExplorerDriver(returnCapabilities);

# Example test

Tests should use the following structure:


	public class <className> extends TestNGBase { 
	 
		@Test(alwaysRun = true)  
		public void <methodName>() throws Exception {  
	 
		try {  
			initialiseMethod(getClass().getCanonicalName(), Utilities.getMethodName());  
	
			// Scroll to the required section and wait until one of the components is displayed  
			String displaySection = "window.location.href=\"" + this.startingUrl + "#radio-button-ng1" + "\"";  
			Utilities.scrollToSection(driver, displaySection);

			WebDriverWait wait = new WebDriverWait(driver, this.displayWaitTimeMS / 1000);
			wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("uxd-components-radio-button-ng1 uxd-radio-button-wrapper div:nth-of-type(1).ng-scope > label")));

			// Get the 'div' element enclosing the components to be tested and from it get the components  
			WebElement radioButtonsContainer = driver.findElement(By.cssSelector("uxd-components-radio-button-ng1 uxd-radio-button-wrapper"));
  
			WebElement radioButton1 = radioButtonsContainer.findElement(By.cssSelector("div:nth-of-type(1).ng-scope > label"));	
			… 
 
			// Ensure controls are visible for clicking  
			Utilities.performVerticalScroll(driver, radioButton1, verticalScrollPixels);  
	
			// Perform tests  
			checkElementEnabled(radioButton1);  
			checkElementSelected(radioButton1);  
			…  
			…  
			…  
		} finally {  
			logErrors();  
		}  
	}


The following test is an abridged version of the test for the Input Controls -> Radio Button section of the Components page:

	public class InputControls extends TestNGBase {  
	
		@Test(alwaysRun = true)  
		public void testRadioButton() throws Exception {
	
			try {  
				// Record the name of the calling method and the class it is defined in. These values will be used when logging errors.  
				initialiseMethod(getClass().getCanonicalName(), Utilities.getMethodName());  
	
				// Scroll to the required section and wait until one of the components is displayed
				String displaySection = "window.location.href=\"" + this.startingUrl + "#radio-button-ng1" + "\"";
				Utilities.scrollToSection(driver, displaySection);
			
				WebDriverWait wait = new WebDriverWait(driver, this.displayWaitTimeMS * 1000);
				wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("uxd-components-radio-button-ng1 uxd-radio-button-wrapper div:nth-of-type(1).ng-scope > label")));

				// Get the elements
				WebElement radioButtonsContainer = driver.findElement(By.cssSelector("uxd-components-radio-button-ng1 uxd-radio-button-wrapper"));
			
				WebElement radioButton1 = radioButtonsContainer.findElement(By.cssSelector("div:nth-of-type(1).ng-scope > label"));
				...
				WebElement radioButtonIcon1 = radioButton1.findElement(By.cssSelector("div.el-radiobutton"));
				...
				WebElement radioButtonInput1 = radioButton1.findElement(By.cssSelector("div.el-radiobutton > input"));
				...

				// Ensure controls are visible for clicking
				Utilities.performVerticalScroll(driver, radioButton1, verticalScrollPixels);

				// Check whether radio buttons are enabled
				checkElementEnabled(radioButton1);
				...
	
				// Check states of radio buttons
				checkElementSelected(radioButtonInput1);
				...

				// Check value of text field
				WebElement phrase = radioButtonsContainer.findElement(By.cssSelector("p code~em"));		
				checkElementText(phrase, "100");

				// Click on the first radio button
				radioButton1.click();

				// Check states of radio buttons
				checkElementChecked(radioButton1);
				...
			} finally {  
				// Record any errors and set the test status to 'Failed' if there was an error  
				logErrors();  
			}
		}
	}

# Useful links

CSS Selectors Reference  
<http://www.w3schools.com/cssref/css_selectors.asp>

Selenium Reference  
<http://www.seleniumhq.org/docs/>

Selenium Tutorials  
<http://www.guru99.com/selenium-tutorial.html>

TestNG  
<http://testng.org/doc/documentation-main.html>

Working with TestNG – Starter’s Guide  
<https://www.subjectcoach.com/tutorials/detail/contents/working-with-testng-starters-guide/chapter/what-is-testng>
