package WebDriverTests.WebDriverTests.Components;

import org.testng.annotations.*;

import java.util.List;

import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import WebDriverTests.WebDriverTests.UXAspectsTesting.TestNGBase;
import WebDriverTests.WebDriverTests.UXAspectsTesting.Utilities;

/**
 * Defines tests for the Components -> Input Controls section.
 */

public class InputControls extends TestNGBase {
	/**
	 * Tests the Input Controls -> Checkbox section of the Components page
	 * 
	 * @throws Exception Throws exception thrown by a WebDriver executable
	 */
	@Test(alwaysRun = true)
	public void testCheckbox() throws Exception {
		try {
			initialiseMethod(getClass().getCanonicalName(), Utilities.getMethodName());

			// Scroll to the required section and wait until one of the components is displayed
			String displaySection = "window.location.href=\"" + this.startingUrl + "#checkbox" + "\"";
			Utilities.scrollToSection(driver, displaySection);

			WebDriverWait wait = new WebDriverWait(driver, this.displayWaitTimeMS / 1000);
			wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("uxd-components-checkbox div:nth-of-type(1) > ux-checkbox")));
			
			// Get the elements
			WebElement checkboxesContainer = driver.findElement(By.cssSelector("uxd-components-checkbox"));
			
			WebElement checkbox1 = checkboxesContainer.findElement(By.cssSelector("div:nth-of-type(1) > ux-checkbox"));
			WebElement checkbox2 = checkboxesContainer.findElement(By.cssSelector("div:nth-of-type(2) > ux-checkbox"));
			WebElement checkbox3 = checkboxesContainer.findElement(By.cssSelector("div:nth-of-type(3) > ux-checkbox"));
			WebElement checkbox4 = checkboxesContainer.findElement(By.cssSelector("div:nth-of-type(4) > ux-checkbox"));
			
			WebElement checkboxIcon1 = checkbox1.findElement(By.cssSelector("div.ux-checkbox"));
			WebElement checkboxIcon2 = checkbox2.findElement(By.cssSelector("div.ux-checkbox"));
			WebElement checkboxIcon3 = checkbox3.findElement(By.cssSelector("div.ux-checkbox"));
			WebElement checkboxIcon4 = checkbox4.findElement(By.cssSelector("div.ux-checkbox"));
			
			WebElement checkboxInput1 = checkbox1.findElement(By.cssSelector("div.ux-checkbox > input"));
			WebElement checkboxInput2 = checkbox2.findElement(By.cssSelector("div.ux-checkbox > input"));
			WebElement checkboxInput3 = checkbox3.findElement(By.cssSelector("div.ux-checkbox > input"));
			WebElement checkboxInput4 = checkbox4.findElement(By.cssSelector("div.ux-checkbox > input"));
			
			// Ensure controls are visible for clicking
			Utilities.performVerticalScroll(driver, checkbox1, verticalScrollPixels);

			// Check whether checkboxes are enabled
			checkElementEnabledUX(checkboxIcon1);
			checkElementEnabledUX(checkboxIcon2);
			checkElementEnabledUX(checkboxIcon3);
			checkElementEnabledUX(checkboxIcon4);
			
			// Check states of checkboxes
			checkElementSelected(checkboxInput1);
			checkElementNotSelected(checkboxInput2);
			checkElementNotSelected(checkboxInput3);
			checkElementNotSelected(checkboxInput4);
			
			// Check values of text fields
			WebElement phrase1 = checkboxesContainer.findElement(By.cssSelector("p > em:nth-of-type(1)"));
			WebElement phrase2 = checkboxesContainer.findElement(By.cssSelector("p > em:nth-of-type(2)"));
			WebElement phrase3 = checkboxesContainer.findElement(By.cssSelector("p > em:nth-of-type(3)"));
			WebElement phrase4 = checkboxesContainer.findElement(By.cssSelector("p > em:nth-of-type(4)"));
			
			checkElementText(phrase1, "true");
			checkElementText(phrase2, "false");
			checkElementText(phrase3, "false");
			checkElementText(phrase4, "false");

			// Click on the first checkbox
			checkbox1.click();
			
			// Check states of checkboxes
			if (!this.browser.equalsIgnoreCase("edge")) {
				checkElementNotCheckedUX(checkboxIcon1);
				checkElementNotCheckedUX(checkboxIcon2);
				checkElementNotCheckedUX(checkboxIcon3);
				checkElementNotCheckedUX(checkboxIcon4);
			}
			
			// Check values of text fields
			checkElementText(phrase1, "false");
			checkElementText(phrase2, "false");
			checkElementText(phrase3, "false");
			checkElementText(phrase4, "false");

			// Click on the second checkbox
			checkbox2.click();

			// Check states of checkboxes
			if (!this.browser.equalsIgnoreCase("edge")) {
				checkElementNotCheckedUX(checkboxIcon1);
				checkElementCheckedUX(checkboxIcon2);
				checkElementNotCheckedUX(checkboxIcon3);
				checkElementNotCheckedUX(checkboxIcon4);
			}
			
			// Check values of text fields
			checkElementText(phrase1, "false");
			checkElementText(phrase2, "true");
			checkElementText(phrase3, "false");
			checkElementText(phrase4, "false");

			// Click on the third checkbox
			checkbox3.click();

			// Check states of checkboxes
			if (!this.browser.equalsIgnoreCase("edge")) {
				checkElementNotCheckedUX(checkboxIcon1);
				checkElementCheckedUX(checkboxIcon2);
				checkElementCheckedUX(checkboxIcon3);
				checkElementNotCheckedUX(checkboxIcon4);
			}
			
			// Check values of text fields
			checkElementText(phrase1, "false");
			checkElementText(phrase2, "true");
			checkElementText(phrase3, "true");
			checkElementText(phrase4, "false");

			// Click on the fourth checkbox
			checkbox4.click();

			// Check states of checkboxes
			if (!this.browser.equalsIgnoreCase("edge")) {
				checkElementNotCheckedUX(checkboxIcon1);
				checkElementCheckedUX(checkboxIcon2);
				checkElementCheckedUX(checkboxIcon3);
				checkElementCheckedUX(checkboxIcon4);
			}
			
			// Check values of text fields
			checkElementText(phrase1, "false");
			checkElementText(phrase2, "true");
			checkElementText(phrase3, "true");
			checkElementText(phrase4, "true");

			// Click on the 'Disable Option1' button
			WebElement disableOption1Button = checkboxesContainer.findElement(By.cssSelector("div:nth-of-type(5) > button:nth-of-type(1)"));
			disableOption1Button.click();

			// Check states of checkboxes
			wait.until(ExpectedConditions.elementToBeClickable(checkbox1));
			checkElementNotEnabledUX(checkboxIcon1);
			checkElementEnabledUX(checkboxIcon2);
			checkElementEnabledUX(checkboxIcon3);
			checkElementEnabledUX(checkboxIcon4);
			
			// Click on the first checkbox
			checkbox1.click();

			// Check states of checkboxes
			if (!this.browser.equalsIgnoreCase("edge")) {
				checkElementNotCheckedUX(checkboxIcon1);
				checkElementCheckedUX(checkboxIcon2);
				checkElementCheckedUX(checkboxIcon3);
				checkElementCheckedUX(checkboxIcon4);
			}
			
			// Check values of text fields
			checkElementText(phrase1, "false");
			checkElementText(phrase2, "true");
			checkElementText(phrase3, "true");
			checkElementText(phrase4, "true");

			// Click on the 'Set Option2 To Indeterminate State' button
			WebElement setOption2Button = checkboxesContainer.findElement(By.cssSelector("div:nth-of-type(5) > button:nth-of-type(2)"));
			setOption2Button.click();

			// Check states of checkboxes
			if (!this.browser.equalsIgnoreCase("edge")) {
				checkElementNotCheckedUX(checkboxIcon1);
				checkElementIndeterminateUX(checkboxIcon2);
				checkElementCheckedUX(checkboxIcon3);
				checkElementCheckedUX(checkboxIcon4);
			}
			
			// Check values of text fields
			checkElementText(phrase1, "false");
			checkElementText(phrase2, "-1");
			checkElementText(phrase3, "true");
			checkElementText(phrase4, "true");
		} finally {
			logErrors();
		}
	}
	
	/**
	 * Tests the Input Controls -> Checkbox (Angular 1) section of the Components page
	 * 
	 * @throws Exception Throws exception thrown by a WebDriver executable
	 */
	@Test(alwaysRun = true)
	public void testCheckboxAngular1() throws Exception {
		try {
			initialiseMethod(getClass().getCanonicalName(), Utilities.getMethodName());

			// Scroll to the required section and wait until one of the components is displayed
			String displaySection = "window.location.href=\"" + this.startingUrl + "#checkbox-ng1" + "\"";
			Utilities.scrollToSection(driver, displaySection);

			WebDriverWait wait = new WebDriverWait(driver, this.displayWaitTimeMS / 1000);
			wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("uxd-components-checkbox-ng1 uxd-checkbox-wrapper div:nth-of-type(1) label div.el-checkbox")));
			
			// Get the elements
			WebElement checkboxesContainer = driver.findElement(By.cssSelector("uxd-components-checkbox-ng1 uxd-checkbox-wrapper"));
			
			WebElement checkbox1 = checkboxesContainer.findElement(By.cssSelector("div:nth-of-type(1).ng-scope > label > div.el-checkbox"));
			WebElement checkbox2 = checkboxesContainer.findElement(By.cssSelector("div:nth-of-type(2).ng-scope > label > div.el-checkbox"));
			WebElement checkbox3 = checkboxesContainer.findElement(By.cssSelector("div:nth-of-type(3).ng-scope > label > div.el-checkbox"));
			WebElement checkbox4 = checkboxesContainer.findElement(By.cssSelector("div:nth-of-type(4).ng-scope > label > div.el-checkbox"));
			
			WebElement checkboxInput1 = checkbox1.findElement(By.cssSelector("input"));
			WebElement checkboxInput2 = checkbox2.findElement(By.cssSelector("input"));
			WebElement checkboxInput3 = checkbox3.findElement(By.cssSelector("input"));
			WebElement checkboxInput4 = checkbox4.findElement(By.cssSelector("input"));
			
			// Ensure controls are visible for clicking
			Utilities.performVerticalScroll(driver, checkbox1, verticalScrollPixels);

			// Check whether checkboxes are enabled
			checkElementEnabled(checkboxInput1);
			checkElementEnabled(checkboxInput2);
			checkElementEnabled(checkboxInput3);
			checkElementEnabled(checkboxInput4);
			
			// Check states of checkboxes
			checkElementSelected(checkboxInput1);
			checkElementNotSelected(checkboxInput2);
			checkElementNotSelected(checkboxInput3);
			checkElementNotSelected(checkboxInput4);
			
			// Check values of text fields
			WebElement phrase1 = checkboxesContainer.findElement(By.cssSelector("p em:nth-of-type(1)"));
			WebElement phrase2 = checkboxesContainer.findElement(By.cssSelector("p em:nth-of-type(2)"));
			WebElement phrase3 = checkboxesContainer.findElement(By.cssSelector("p em:nth-of-type(3)"));
			WebElement phrase4 = checkboxesContainer.findElement(By.cssSelector("p em:nth-of-type(4)"));
			
			checkElementText(phrase1, "true");
			checkElementText(phrase2, "false");
			checkElementText(phrase3, "false");
			checkElementText(phrase4, "false");
			
			// Click on the first checkbox
			checkbox1.click();
			
			// Check states of checkboxes
			if (!this.browser.equalsIgnoreCase("edge")) {
				checkElementNotChecked(checkbox1);
				checkElementNotChecked(checkbox2);
				checkElementNotChecked(checkbox3);
				checkElementNotChecked(checkbox4);
			}
			
			// Check values of text fields
			checkElementText(phrase1, "false");
			checkElementText(phrase2, "false");
			checkElementText(phrase3, "false");
			checkElementText(phrase4, "false");

			// Click on the second checkbox
			checkbox2.click();

			// Check states of checkboxes
			if (!this.browser.equalsIgnoreCase("edge")) {
				checkElementNotChecked(checkbox1);
				checkElementChecked(checkbox2);
				checkElementNotChecked(checkbox3);
				checkElementNotChecked(checkbox4);
			}
			
			// Check values of text fields
			checkElementText(phrase1, "false");
			checkElementText(phrase2, "true");
			checkElementText(phrase3, "false");
			checkElementText(phrase4, "false");

			// Click on the third checkbox
			checkbox3.click();

			// Check states of checkboxes
			if (!this.browser.equalsIgnoreCase("edge")) {
				checkElementNotChecked(checkbox1);
				checkElementChecked(checkbox2);
				checkElementChecked(checkbox3);
				checkElementNotChecked(checkbox4);
			}
			
			// Check values of text fields
			checkElementText(phrase1, "false");
			checkElementText(phrase2, "true");
			checkElementText(phrase3, "true");
			checkElementText(phrase4, "false");

			// Click on the fourth checkbox
			checkbox4.click();

			// Check states of checkboxes
			if (!this.browser.equalsIgnoreCase("edge")) {
				checkElementNotChecked(checkbox1);
				checkElementChecked(checkbox2);
				checkElementChecked(checkbox3);
				checkElementChecked(checkbox4);
			}
			
			// Check values of text fields
			checkElementText(phrase1, "false");
			checkElementText(phrase2, "true");
			checkElementText(phrase3, "true");
			checkElementText(phrase4, "true");

			// Click on the 'Disable Option1' button
			WebElement disableOption1Button = checkboxesContainer.findElement(By.cssSelector("div:nth-of-type(5) button:nth-of-type(1)"));
			disableOption1Button.click();

			// Check states of checkboxes
			wait.until(ExpectedConditions.elementToBeClickable(checkbox1));
			checkElementNotEnabled(checkbox1);
			checkElementEnabled(checkbox2);
			checkElementEnabled(checkbox3);
			checkElementEnabled(checkbox4);
			
			// Click on the first checkbox
			checkbox1.click();

			// Check states of checkboxes
			if (!this.browser.equalsIgnoreCase("edge")) {
				checkElementNotChecked(checkbox1);
				checkElementChecked(checkbox2);
				checkElementChecked(checkbox3);
				checkElementChecked(checkbox4);
			}
			
			// Check values of text fields
			checkElementText(phrase1, "false");
			checkElementText(phrase2, "true");
			checkElementText(phrase3, "true");
			checkElementText(phrase4, "true");

			// Click on the 'Set Option2 To Indeterminate State' button
			WebElement setOption2Button = checkboxesContainer.findElement(By.cssSelector("div:nth-of-type(5) button:nth-of-type(2)"));
			setOption2Button.click();

			// Check states of checkboxes
			if (!this.browser.equalsIgnoreCase("edge")) {
				checkElementNotChecked(checkbox1);
				checkElementIndeterminate(checkbox2);
				checkElementChecked(checkbox3);
				checkElementChecked(checkbox4);
			}
			
			// Check values of text fields
			checkElementText(phrase1, "false");
			checkElementText(phrase2, "-1");
			checkElementText(phrase3, "true");
			checkElementText(phrase4, "true");
		} finally {
			logErrors();
		}
	}
	
	/**
	 * Tests the Input Controls -> Radio Button section of the Components page
	 * 
	 * @throws Exception Throws exception thrown by a WebDriver executable
	 */
	@Test(alwaysRun = true)
	public void testRadioButton() throws Exception {
		try {
			initialiseMethod(getClass().getCanonicalName(), Utilities.getMethodName());

			// Scroll to the required section and wait until one of the components is displayed
			String displaySection = "window.location.href=\"" + this.startingUrl + "#radio-button-ng1" + "\"";
			Utilities.scrollToSection(driver, displaySection);
			
			WebDriverWait wait = new WebDriverWait(driver, this.displayWaitTimeMS / 1000);
			wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("uxd-components-radio-button-ng1 uxd-radio-button-wrapper div:nth-of-type(1).ng-scope > label")));

			// Get the elements
			WebElement radioButtonsContainer = driver.findElement(By.cssSelector("uxd-components-radio-button-ng1 uxd-radio-button-wrapper"));
			
			WebElement radioButton1 = radioButtonsContainer.findElement(By.cssSelector("div:nth-of-type(1).ng-scope > label"));
			WebElement radioButton2 = radioButtonsContainer.findElement(By.cssSelector("div:nth-of-type(2).ng-scope > label"));
			WebElement radioButton3 = radioButtonsContainer.findElement(By.cssSelector("div:nth-of-type(3).ng-scope > label"));
			WebElement radioButton4 = radioButtonsContainer.findElement(By.cssSelector("div:nth-of-type(4).ng-scope > label"));	

			WebElement radioButtonIcon1 = radioButton1.findElement(By.cssSelector("div.el-radiobutton"));
			WebElement radioButtonIcon2 = radioButton2.findElement(By.cssSelector("div.el-radiobutton"));
			WebElement radioButtonIcon3 = radioButton3.findElement(By.cssSelector("div.el-radiobutton"));
			WebElement radioButtonIcon4 = radioButton4.findElement(By.cssSelector("div.el-radiobutton"));
			
			WebElement radioButtonInput1 = radioButton1.findElement(By.cssSelector("div.el-radiobutton > input"));
			WebElement radioButtonInput2 = radioButton2.findElement(By.cssSelector("div.el-radiobutton > input"));
			WebElement radioButtonInput3 = radioButton3.findElement(By.cssSelector("div.el-radiobutton > input"));
			WebElement radioButtonInput4 = radioButton4.findElement(By.cssSelector("div.el-radiobutton > input"));
			
			// Ensure controls are visible for clicking
			Utilities.performVerticalScroll(driver, radioButton1, verticalScrollPixels);

			// Check whether radio buttons are enabled
			checkElementEnabled(radioButtonIcon1);
			checkElementEnabled(radioButtonIcon2);
			checkElementEnabled(radioButtonIcon3);
			checkElementEnabled(radioButtonIcon4);
			
			// Check states of radio buttons
			checkElementSelected(radioButtonInput1);
			checkElementNotSelected(radioButtonInput2);
			checkElementNotSelected(radioButtonInput3);
			checkElementNotSelected(radioButtonInput4);
			
			// Check value of text field
			WebElement phrase = radioButtonsContainer.findElement(By.cssSelector("p code~em"));		
			checkElementText(phrase, "100");

			// Click on the first radio button
			radioButton1.click();

			// Check states of radio buttons
			if (!this.browser.equalsIgnoreCase("edge")) {
				checkElementChecked(radioButtonIcon1);
				checkElementNotChecked(radioButtonIcon2);
				checkElementNotChecked(radioButtonIcon3);
				checkElementNotChecked(radioButtonIcon4);
			}
			
			// Check value of text field
			checkElementText(phrase, "100");

			// Click on the second radio button
			radioButton2.click();

			// Check states of radio buttons
			if (!this.browser.equalsIgnoreCase("edge")) {
				checkElementNotChecked(radioButtonIcon1);
				checkElementChecked(radioButtonIcon2);
				checkElementNotChecked(radioButtonIcon3);
				checkElementNotChecked(radioButtonIcon4);
			}
			
			// Check value of text field
			checkElementText(phrase, "string");

			// Click on the third radio button
			radioButton3.click();

			// Check states of radio buttons
			if (!this.browser.equalsIgnoreCase("edge")) {
				checkElementNotChecked(radioButtonIcon1);
				checkElementNotChecked(radioButtonIcon2);
				checkElementChecked(radioButtonIcon3);
				checkElementNotChecked(radioButtonIcon4);
			}
			
			// Check value of text field
			checkElementText(phrase, "[object Object]");

			// Click on the fourth radio button
			radioButton4.click();

			// Check states of radio buttons
			if (!this.browser.equalsIgnoreCase("edge")) {
				checkElementNotChecked(radioButtonIcon1);
				checkElementNotChecked(radioButtonIcon2);
				checkElementNotChecked(radioButtonIcon3);
				checkElementChecked(radioButtonIcon4);
			}
			
			// Check value of text field
			checkElementText(phrase, "Wrap-Text");

			// Click on the 'Disable Option1' button
			WebElement disableOption1Button = radioButtonsContainer.findElement(By.cssSelector("div:nth-of-type(5) > button.btn.button-primary"));
			disableOption1Button.click();

			// Check whether radio buttons are enabled
			checkElementNotEnabled(radioButtonIcon1);
			checkElementEnabled(radioButtonIcon2);
			checkElementEnabled(radioButtonIcon3);
			checkElementEnabled(radioButtonIcon4);
			
			// Click on the first radio button
			radioButton4.click();

			// Check states of radio buttons
			if (!this.browser.equalsIgnoreCase("edge")) {
				checkElementNotChecked(radioButtonIcon1);
				checkElementNotChecked(radioButtonIcon2);
				checkElementNotChecked(radioButtonIcon3);
				checkElementChecked(radioButtonIcon4);
			}
			
			// Check value of text field
			checkElementText(phrase, "Wrap-Text");
		} finally {
			logErrors();
		}
	}	
}
