package WebDriverTests.WebDriverTests.Components;

import org.testng.annotations.*;

import java.util.List;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import WebDriverTests.WebDriverTests.UXAspectsTesting.TestNGBase;
import WebDriverTests.WebDriverTests.UXAspectsTesting.Utilities;

/**
 * Defines tests for the Panels -> Item Display Panel section.
 */

public class ItemDisplayPanel extends TestNGBase {
	/**
	 * Tests the Panels -> Item Display Panel section of the Components page
	 * 
	 * @throws Exception Throws exception thrown by a WebDriver executable
	 */
	@Test(alwaysRun = true)
	public void testItemDisplayPanel() throws Exception {
		try {
			initialiseMethod(getClass().getCanonicalName(), Utilities.getMethodName());
			
			// Scroll to the required section and wait until one of the components is displayed
			String displaySection = "window.location.href=\"" + this.startingUrl + "#item-display-panel-ng1" + "\"";
			Utilities.scrollToSection(driver, displaySection);

			WebDriverWait wait = new WebDriverWait(driver, this.displayWaitTimeMS / 1000);
			wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("uxd-item-display-panel-ng1 uxd-item-display-panel-wrapper div table tbody tr:nth-of-type(1)")));
			
			if (this.browser.equalsIgnoreCase("firefox")) {return;}
			
			// Get the elements
			
			WebElement body = driver.findElement(By.cssSelector("body"));
			
			WebElement table = driver.findElement(By.cssSelector("uxd-item-display-panel-ng1 uxd-item-display-panel-wrapper div table tbody"));
			
			WebElement row1 = table.findElement(By.cssSelector("tr:nth-of-type(1)"));
			WebElement row2 = table.findElement(By.cssSelector("tr:nth-of-type(2)"));
			WebElement row3 = table.findElement(By.cssSelector("tr:nth-of-type(3)"));
			WebElement row5 = table.findElement(By.cssSelector("tr:nth-of-type(5)"));
			
			checkElementNotPresentImmediate(body, "displayPanel");
			
			// Click row and check display panel is visible
			row1.click();
			wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("body div.displayPanel")));
			WebElement displayPanel = body.findElement(By.cssSelector("div.displayPanel"));
			
			checkElementPresentImmediate(body, "displayPanel");
			
			// Get display panel elements
			WebElement displayPanelh3 = displayPanel.findElement(By.cssSelector("h3"));
			WebElement displayPanelh1 = displayPanel.findElement(By.cssSelector("h1"));

			// find the next and previous buttons
			List<WebElement> buttons = displayPanel.findElements(By.cssSelector("span.btn-pair button"));

			// get the specific buttons from list
			WebElement previous = buttons.get(0);
			WebElement next = buttons.get(1);
			
			// Check elements are displaying correct data
			checkElementText(displayPanelh3, "Site Detail - UX Aspects (PPT)");
			checkElementText(displayPanelh1, "Preview PPT");
			
			// Click second row and check data updated
			row2.click();
			checkElementText(displayPanelh3, "Site Detail - UX Aspects (PDF)");
			// Need to find this again as it was destroyed
			displayPanelh1 = displayPanel.findElement(By.cssSelector("h1"));
			checkElementText(displayPanelh1, "Preview PDF");
			
			// Press down key and check data updated
			row2.sendKeys(Keys.DOWN);
			checkElementText(displayPanelh3, "Site Detail - UX Aspects (DOC)");
			// Need to find this again as it was destroyed
			displayPanelh1 = displayPanel.findElement(By.cssSelector("h1"));
			checkElementText(displayPanelh1, "Preview DOC");
			
			// Press next button and check data updated
			next.sendKeys(Keys.ENTER);
			checkElementText(displayPanelh3, "Site Detail - UX Aspects (PDF)");
			// Need to find this again as it was destroyed
			displayPanelh1 = displayPanel.findElement(By.cssSelector("h1"));
			checkElementText(displayPanelh1, "Preview PDF");
			
			// Press previous button and check data updated
			previous.sendKeys(Keys.ENTER);
			checkElementText(displayPanelh3, "Site Detail - UX Aspects (DOC)");
			// Need to find this again as it was destroyed
			displayPanelh1 = displayPanel.findElement(By.cssSelector("h1"));
			checkElementText(displayPanelh1, "Preview DOC");
			
			// Press up key and check data updated
			row3.sendKeys(Keys.UP);
			checkElementText(displayPanelh3, "Site Detail - UX Aspects (PDF)");
			// Need to find this again as it was destroyed
			displayPanelh1 = displayPanel.findElement(By.cssSelector("h1"));
			checkElementText(displayPanelh1, "Preview PDF");
			
			// Check previous is disabled
			row1.click();
			checkElementAttributeValue(previous, "disabled", "true");
			
			// Check next is disabled
			row5.click();
			checkElementAttributeValue(next, "disabled", "true");
			
			// Check previous is disabled
			row1.click();
			checkElementAttributeValue(previous, "disabled", "true");
			row1.sendKeys(Keys.UP);
			checkElementText(displayPanelh3, "Site Detail - UX Aspects (PPT)");
			// Need to find this again as it was destroyed
			displayPanelh1 = displayPanel.findElement(By.cssSelector("h1"));
			checkElementText(displayPanelh1, "Preview PPT");
			
			// Check next is disabled
			row5.click();
			checkElementAttributeValue(next, "disabled", "true");
			row5.sendKeys(Keys.DOWN);
			checkElementText(displayPanelh3, "Site Detail - UX Aspects (PDF)");
			// Need to find this again as it was destroyed
			displayPanelh1 = displayPanel.findElement(By.cssSelector("h1"));
			checkElementText(displayPanelh1, "Preview PDF");
			
			// Check esc button removes display panel
			row5.sendKeys(Keys.ESCAPE);
			checkElementNotPresentImmediate(body, "displayPanel");
			
			// Check clicking the x button closes the display panel
			row1.click();
			WebElement displayPanelClose = body.findElement(By.cssSelector("div.displayPanel span.modal-close button"));
			displayPanelClose.click();
			checkElementNotPresentImmediate(body, "displayPanel");
		} finally {
			logErrors();
		}
	}

}
