package WebDriverTests.WebDriverTests.Charts;

import org.testng.annotations.*;
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import WebDriverTests.WebDriverTests.UXAspectsTesting.TestNGBase;
import WebDriverTests.WebDriverTests.UXAspectsTesting.Utilities;

/**
 * Defines tests for the Charts -> Bar Charts section.
 */

public class BarCharts extends TestNGBase {
	/**
	 * Tests the Bar Charts -> Bar Chart section of the Charts page
	 * 
	 * @throws Exception Throws exception thrown by a WebDriver executable
	 */
	@Test(alwaysRun = true)
	public void testBarChart() throws Exception {
		try {
			initialiseMethod(getClass().getCanonicalName(), Utilities.getMethodName());

			// Scroll to the required section and wait until one of the components is displayed
			String displaySection = "window.location.href=\"" + this.startingUrl + "#bar-chart-ng1" + "\"";
			Utilities.scrollToSection(driver, displaySection);
			
			WebElement barsContainer = driver.findElement(By.cssSelector("uxd-charts-bar-chart-ng1 div.flot-chart ux-flot-ng1 flot div"));
			WebElement bar1 = barsContainer.findElement(By.cssSelector("div.flot-text div.flot-x-axis div:nth-of-type(1)"));

			WebDriverWait wait = new WebDriverWait(driver, this.displayWaitTimeMS / 1000);
			wait.until(ExpectedConditions.visibilityOf(bar1));
			
			// Ensure controls are visible for clicking
			Utilities.performVerticalScroll(driver, barsContainer, verticalScrollPixels);

			// Check the bars			
			WebElement bar2 = barsContainer.findElement(By.cssSelector("div.flot-text div.flot-x-axis div:nth-of-type(2)"));
			WebElement bar3 = barsContainer.findElement(By.cssSelector("div.flot-text div.flot-x-axis div:nth-of-type(3)"));
			WebElement bar4 = barsContainer.findElement(By.cssSelector("div.flot-text div.flot-x-axis div:nth-of-type(4)"));
			WebElement bar5 = barsContainer.findElement(By.cssSelector("div.flot-text div.flot-x-axis div:nth-of-type(5)"));
			WebElement bar6 = barsContainer.findElement(By.cssSelector("div.flot-text div.flot-x-axis div:nth-of-type(6)"));
			WebElement bar7 = barsContainer.findElement(By.cssSelector("div.flot-text div.flot-x-axis div:nth-of-type(7)"));
			WebElement bar8 = barsContainer.findElement(By.cssSelector("div.flot-text div.flot-x-axis div:nth-of-type(8)"));

			checkElementText(bar1, ".doc");
			checkElementText(bar2, ".ppt");
			checkElementText(bar3, ".pdf");
			checkElementText(bar4, ".xls");
			checkElementText(bar5, ".html");
			checkElementText(bar6, ".txt");
			checkElementText(bar7, ".csv");
			checkElementText(bar8, ".mht");
			
			/*checkElementAttributeContainsValue(bar1, "style", "\\s*;+\\s*", "left: 34px");
			checkElementAttributeContainsValue(bar2, "style", "\\s*;+\\s*", "left: 134px");
			checkElementAttributeContainsValue(bar3, "style", "\\s*;+\\s*", "left: 234px");
			checkElementAttributeContainsValue(bar4, "style", "\\s*;+\\s*", "left: 335px");
			checkElementAttributeContainsValue(bar5, "style", "\\s*;+\\s*", "left: 430px");
			checkElementAttributeContainsValue(bar6, "style", "\\s*;+\\s*", "left: 534px");
			checkElementAttributeContainsValue(bar7, "style", "\\s*;+\\s*", "left: 631px");
			checkElementAttributeContainsValue(bar8, "style", "\\s*;+\\s*", "left: 729px");*/
			
			// Check the chart lines
			WebElement line1 = barsContainer.findElement(By.cssSelector("div.flot-text div.flot-y-axis div:nth-of-type(1)"));
			WebElement line2 = barsContainer.findElement(By.cssSelector("div.flot-text div.flot-y-axis div:nth-of-type(2)"));
			WebElement line3 = barsContainer.findElement(By.cssSelector("div.flot-text div.flot-y-axis div:nth-of-type(3)"));
			WebElement line4 = barsContainer.findElement(By.cssSelector("div.flot-text div.flot-y-axis div:nth-of-type(4)"));
			WebElement line5 = barsContainer.findElement(By.cssSelector("div.flot-text div.flot-y-axis div:nth-of-type(5)"));

			checkElementText(line1, "0");
			checkElementText(line2, "20");
			checkElementText(line3, "40");
			checkElementText(line4, "60");
			checkElementText(line5, "80");
			
			checkElementAttributeContainsValue(line1, "style", "\\s*;+\\s*", "left: 8px");
			checkElementAttributeContainsValue(line2, "style", "\\s*;+\\s*", "left: 1px");
			checkElementAttributeContainsValue(line3, "style", "\\s*;+\\s*", "left: 1px");
			checkElementAttributeContainsValue(line4, "style", "\\s*;+\\s*", "left: 1px");
			checkElementAttributeContainsValue(line5, "style", "\\s*;+\\s*", "left: 1px");
			
			if ((!this.browser.equalsIgnoreCase("ie")) && (!this.browser.equalsIgnoreCase("edge"))) {
				checkElementAttributeContainsValue(line1, "style", "\\s*;+\\s*", "top: 166px");
				checkElementAttributeContainsValue(line2, "style", "\\s*;+\\s*", "top: 124px");
				checkElementAttributeContainsValue(line3, "style", "\\s*;+\\s*", "top: 83px");
				checkElementAttributeContainsValue(line4, "style", "\\s*;+\\s*", "top: 42px");
				checkElementAttributeContainsValue(line5, "style", "\\s*;+\\s*", "top: 1px");
			}
			
			// Check the canvas
			/*WebElement canvas = barsContainer.findElement(By.cssSelector("canvas.flot-overlay"));
			
			checkElementAttributeContainsValue(canvas, "style", "\\s*;+\\s*", "width: 778px");
			checkElementAttributeContainsValue(canvas, "style", "\\s*;+\\s*", "height: 200px");
			checkElementAttributeValue(canvas, "width", "778");
			checkElementAttributeValue(canvas, "height", "200");*/
		} finally {
			logErrors();
		}
	}	
}