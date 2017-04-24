package WebDriverTests.WebDriverTests.UXAspectsTesting;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

/**
 * Defines a number of utility methods.
 */
public class Utilities {
    /**
     * The line separator character for this system.
     */
	private static String separator = System.getProperty("line.separator");

    /**
     * Code to determine the name of calling method derived from http://stackoverflow.com/questions/442747/getting-the-name-of-the-current-executing-method/5891326#5891326
     */
    private static final int CLIENT_CODE_STACK_INDEX;
    
    static {
        // Finds out the index of "this code" in the returned stack trace - funny but it differs in JDK 1.5 and 1.6
        int i = -1;
        for (StackTraceElement ste : Thread.currentThread().getStackTrace()) {
            i++;
            if (ste.getClassName().equals(Utilities.class.getName())) {
                break;
            }
        }
        CLIENT_CODE_STACK_INDEX = i + 1;	// Index of calling code in stack is this code plus 1
    }
    
    public static final String COLOR_PRIMARY = "#00a7a2";
    public static final String COLOR_PRIMARY_FOCUS = "#008e89";
    public static final String COLOR_ACCENT = "#7b63a3";
    public static final String COLOR_BUTTON_ACTIVE_BG = "#008e89";

    /**
     * Returns the name of the method which calls this method.
     * 
     * @return The name of the calling method
     */
    public static String getMethodName() {
        // Return the name of the calling method
    	return Thread.currentThread().getStackTrace()[CLIENT_CODE_STACK_INDEX].getMethodName();
    }
    
    /**
     * Returns the line number at which the supplied exception was thrown.
     * 
     * @param e The exception thrown in a test method
     * @param soughtMethodName The name of the test method in which the exception was thrown
     * @return The line number at which the supplied exception was thrown in the method
     */
    public static int getLineNumber(Error e, String soughtMethodName) {
    	int lineNumber = -1;
    	for (StackTraceElement ste : e.getStackTrace()) {
    		String methodName = ste.getMethodName();
    		if (methodName.equalsIgnoreCase(soughtMethodName)) {
    			lineNumber = ste.getLineNumber();
    			break;
    		}
    	}
    	return lineNumber;
    }
    
    /**
     * Record the error which has occurred along with the name of the test method and its class.
     * 
     * @param verificationErrors The StringBuffer variable in which the error is stored
     * @param className	The name of the class containing the test method
     * @param methodName The name of the test method
     * @param e	The exception raised when the error occurred
     */
    public static void logError(StringBuffer verificationErrors, String className, String methodName, Error e) {
		Integer lineNumber = getLineNumber(e, methodName);
		verificationErrors.append(separator);
		verificationErrors.append(className + "." + methodName + ":" + lineNumber.toString() + " - " + e.toString() + separator);
    }
    
    /**
     * Scroll the browser window to a specified section using the URL of the section in the navigation tree.
     * 
     * @param driver The WebDriver executable for the browser
     * @param javaScript Code to change the location in the page 
     */
    public static void scrollToSection(WebDriver driver, String javaScript) {
    	executeJavascript(driver, javaScript);
    }
    
    /**
     * Remove animations.
     * 
     * @param driver The WebDriver executable for the browser
     */
    public static void removeAnimations(WebDriver driver) {
		executeJavascript(driver, "$('body').addClass('remove-animations-selenium');");
    }
    
    
    /**
     * Run javascript.
     * 
     * @param driver The WebDriver executable for the browser
     * @param javaScript Code
     */
    public static void executeJavascript(WebDriver driver, String javaScript) {
    	if(javaScript != "") {
    		JavascriptExecutor jse = (JavascriptExecutor) driver;
    		jse.executeScript(javaScript);
    	}
    }

    /**
     * Scroll the browser window vertically the specified number of pixels.
     * 
     * @param driver The WebDriver executable for the browser
     * @param element The element in the page which is to be scrolled into view
     * @param verticalScrollPixels The number of pixels the window is to be scrolled by (use a negative number to scroll downwards)
     */
    public static void performVerticalScroll(WebDriver driver, WebElement element, Integer verticalScrollPixels) {
		if (verticalScrollPixels != 0) {
			JavascriptExecutor jse = (JavascriptExecutor)driver;
			jse.executeScript("arguments[0].scrollIntoView(true);", element);
			jse.executeScript("window.scrollBy(0," + String.valueOf(verticalScrollPixels) + ")", "");
		}
    }
}

