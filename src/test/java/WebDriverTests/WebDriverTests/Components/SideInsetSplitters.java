package WebDriverTests.WebDriverTests.Components;

import org.testng.annotations.*;

import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import WebDriverTests.WebDriverTests.UXAspectsTesting.TestNGBase;
import WebDriverTests.WebDriverTests.UXAspectsTesting.Utilities;

/**
 * Defines tests for the Components -> Splitter - > Side Inset Panel Splitter  section.
 */

public class SideInsetSplitters extends TestNGBase {
	/**
	 * Tests the Components -> Splitter - > Side Inset Panel Splitter section of the Components page
	 * 
	 * @throws Exception Throws exception thrown by a WebDriver executable
	 */
	@Test(alwaysRun = true)
	public void testSideInsetSplitters() throws Exception {
		try {
			initialiseMethod(getClass().getCanonicalName(), Utilities.getMethodName());
			
			// Scroll to the required section and wait until one of the components is displayed
			String displaySection = "window.location.href=\"" + this.startingUrl + "#side-inset-panel-splitter-ng1" + "\"";
			Utilities.scrollToSection(driver, displaySection);
			Utilities.removeAnimations(driver);

			WebDriverWait wait = new WebDriverWait(driver, this.displayWaitTimeMS / 1000);
			wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("uxd-side-inset-panel-splitter-ng1 uxd-side-inset-panel-splitter-wrapper div:nth-of-type(1).splitter-demo .splitter .side-inset-splitter-toggle")));
			
			// Get the elements
			WebElement splittersSection = driver.findElement(By.cssSelector("uxd-side-inset-panel-splitter-ng1 uxd-side-inset-panel-splitter-wrapper"));
			
			WebElement horizontalSplitter = splittersSection.findElement(By.cssSelector("div:nth-of-type(1) .splitter.horizontal"));
			WebElement verticalSplitter = splittersSection.findElement(By.cssSelector("div:nth-of-type(2) .splitter.vertical"));
			
			WebElement horizontalMain = horizontalSplitter.findElement(By.cssSelector("div:nth-of-type(4)"));
			WebElement horizontalSide = horizontalSplitter.findElement(By.cssSelector("div:nth-of-type(1)"));
			WebElement horizontalGutter = horizontalSplitter.findElement(By.cssSelector("div.gutter-horizontal"));
			WebElement horizontalToggle = horizontalSplitter.findElement(By.cssSelector("div:nth-of-type(3) .side-inset-splitter-toggle"));
			WebElement horizontalToggleArrow = horizontalToggle.findElement(By.cssSelector("a"));
			
			WebElement verticalMain = verticalSplitter.findElement(By.cssSelector("div:nth-of-type(1)"));
			WebElement verticalSide = verticalSplitter.findElement(By.cssSelector("div:nth-of-type(4)"));
			WebElement verticalGutter = verticalSplitter.findElement(By.cssSelector("div.gutter-vertical"));
			WebElement verticalToggle = verticalSplitter.findElement(By.cssSelector("div:nth-of-type(2) .side-inset-splitter-toggle"));
			WebElement verticalToggleArrow = verticalToggle.findElement(By.cssSelector("a"));
			
			// Ensure controls are visible for clicking
			Utilities.performVerticalScroll(driver, horizontalSplitter, verticalScrollPixels);
			
			// Check side panels are hidden and main panels are the correct size
			checkElementPropertyInt(horizontalSide, "width", "0");
			checkElementPropertyInt(horizontalMain, "width", "868");
			checkElementPropertyInt(verticalSide, "height", "0");
			checkElementPropertyInt(verticalMain, "height", "398");
			
			// Check arrows are pointing the correct way
			checkElementHasClass(horizontalToggleArrow, "hpe-next");
			checkElementHasClass(verticalToggleArrow, "hpe-up");
			
			// Check the gutters are hidden
			checkElementPropertyInt(horizontalGutter, "width", "0");
			checkElementPropertyInt(verticalGutter, "height", "0");
			
						
			// Click toggles
			horizontalToggle.click();
			verticalToggle.click();
			Thread.sleep(5000);

			checkElementPropertyInt(horizontalMain, "width", "429");
			checkElementPropertyInt(horizontalSide, "width", "429");
			
			checkElementPropertyInt(verticalSide, "height", "194");
			checkElementPropertyInt(verticalMain, "height", "194");
			
			// Check arrows are pointing the correct way
			if (this.browser.equalsIgnoreCase("chrome")) {
				checkElementHasClass(horizontalToggleArrow, "hpe-previous");
			} else {
				checkElementHasClass(horizontalToggleArrow, "");
			}
			checkElementHasClass(verticalToggleArrow, "hpe-down");

			checkElementPropertyInt(horizontalGutter, "width", "10");			
			checkElementPropertyInt(verticalGutter, "height", "10");
			
			
			// Click toggles again
			horizontalToggle.click();
			verticalToggle.click();
			Thread.sleep(5000);

			checkElementPropertyInt(horizontalSide, "width", "0");
			checkElementPropertyInt(horizontalMain, "width", "868");
			
			checkElementPropertyInt(verticalSide, "height", "0");
			checkElementPropertyInt(verticalMain, "height", "398");
			
			// Check arrows are pointing the correct way
			if (this.browser.equalsIgnoreCase("chrome")) {
				checkElementHasClass(horizontalToggleArrow, "hpe-next");
			} else {
				checkElementHasClass(horizontalToggleArrow, "");
			}
			checkElementHasClass(verticalToggleArrow, "hpe-up");

			// Check the gutters are hidden
			checkElementPropertyInt(horizontalGutter, "width", "0");			
			checkElementPropertyInt(verticalGutter, "height", "0");
		} finally {
			logErrors();
		}
	}
}
