package WebDriverTests.WebDriverTests.Components;

import org.testng.annotations.*;
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import WebDriverTests.WebDriverTests.UXAspectsTesting.TestNGBase;
import WebDriverTests.WebDriverTests.UXAspectsTesting.Utilities;

public class Wizard extends TestNGBase {
	@Test(alwaysRun = true)
	public void testWizard() throws Exception {
		try {
			initialiseMethod(getClass().getCanonicalName(), Utilities.getMethodName());

			// Scroll to the required section and wait until one of the components is displayed
			String displaySection = "window.location.href=\"" + this.startingUrl + "#wizard-ng1" + "\"";
			Utilities.scrollToSection(driver, displaySection);

			WebDriverWait wait = new WebDriverWait(driver, this.displayWaitTimeMS / 1000);
			wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("uxd-components-wizard-ng1 uxd-wizard-wrapper div.wizard div.actions ul li:nth-of-type(2) a")));
			
			// Get the elements
			WebElement wizardContainer = driver.findElement(By.cssSelector("uxd-components-wizard-ng1 uxd-wizard-wrapper div.wizard"));
			
			WebElement wizardPreviousButton = wizardContainer.findElement(By.cssSelector("div.actions ul li:nth-of-type(1) a"));
			WebElement wizardNextButton = wizardContainer.findElement(By.cssSelector("div.actions ul li:nth-of-type(2) a"));
			WebElement wizardCancelButton = wizardContainer.findElement(By.cssSelector("div.actions ul li:nth-of-type(3) a"));
			
			// Ensure controls are visible for clicking
			Utilities.performVerticalScroll(driver, wizardContainer, verticalScrollPixels);
			
			// Previous button is initially disabled
			checkElementNotEnabled(wizardPreviousButton);
			
			// Previous button is enabled after Next button is clicked
			wizardNextButton.click();
			checkElementEnabled(wizardPreviousButton);
		} finally {
			logErrors();
		}
	}
}