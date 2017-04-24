package WebDriverTests.WebDriverTests.Charts;

import org.testng.annotations.*;

import java.util.List;

import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import WebDriverTests.WebDriverTests.UXAspectsTesting.TestNGBase;
import WebDriverTests.WebDriverTests.UXAspectsTesting.Utilities;

/**
 * Defines tests for the Charts -> Bar Charts section.
 */

public class Spark extends TestNGBase {
	/**
	 * Tests the Spark -> Spark Line section of the Charts page
	 * 
	 * @throws Exception Throws exception thrown by a WebDriver executable
	 */
	@Test(alwaysRun = true)
	public void testSparkLine() throws Exception {
		try {
			initialiseMethod(getClass().getCanonicalName(), Utilities.getMethodName());

			// Scroll to the required section and wait until one of the components is displayed
			String displaySection = "window.location.href=\"" + this.startingUrl + "#spark-chart-ng1" + "\"";
			Utilities.scrollToSection(driver, displaySection);
			
			// First row, left
			WebElement firstRowContainer = driver.findElement(By.cssSelector("uxd-charts-spark-chart-ng1 div:nth-of-type(1).row"));

			WebDriverWait wait = new WebDriverWait(driver, this.displayWaitTimeMS / 1000);
			wait.until(ExpectedConditions.visibilityOf(firstRowContainer));
			
			// Ensure controls are visible for clicking
			Utilities.performVerticalScroll(driver, firstRowContainer, verticalScrollPixels);
			
			// Check the line
			WebElement line = firstRowContainer.findElement(By.cssSelector("ux-spark-ng1:nth-of-type(1) spark div div div.spark"));

			checkElementAttributeContainsValue(line, "style", "\\s*;+\\s*", "height: 10px");
			checkElementAttributeValue(line, "tooltip", "Spark Line indicator - 2.17MB of 8.2GB occupied (35%)");
			
			WebElement progressBar = line.findElement(By.cssSelector("div.progress-bar"));
			
			checkElementAttributeContainsValue(progressBar, "style", "\\s*;+\\s*", "width: 35%");
			
			
			// First row, right

			// Check the line			
			line = firstRowContainer.findElement(By.cssSelector("ux-spark-ng1:nth-of-type(2) spark div div div.spark"));

			checkElementAttributeContainsValue(line, "style", "\\s*;+\\s*", "height: 5px");
			checkElementAttributeValue(line, "tooltip", "");
			
			progressBar = line.findElement(By.cssSelector("div.progress-bar"));
			
			checkElementAttributeContainsValue(progressBar, "style", "\\s*;+\\s*", "width: 30%");
			
			
			// Second row, left
			WebElement secondRowContainer = driver.findElement(By.cssSelector("uxd-charts-spark-chart-ng1 div:nth-of-type(2).row"));

			// Check the line			
			line = secondRowContainer.findElement(By.cssSelector("ux-spark-ng1:nth-of-type(1) spark div div div.spark"));

			checkElementAttributeContainsValue(line, "style", "\\s*;+\\s*", "height: 10px");
			checkElementAttributeValue(line, "tooltip", "Spark Line indicator - 2.17MB of 8.2GB occupied (35%)");
			
			progressBar = line.findElement(By.cssSelector("div.progress-bar"));
			
			checkElementAttributeContainsValue(progressBar, "style", "\\s*;+\\s*", "width: 35%");
			
			
			// Second row, right

			// Check the line			
			line = secondRowContainer.findElement(By.cssSelector("ux-spark-ng1:nth-of-type(2) spark div div div.spark-line div.spark"));

			checkElementAttributeContainsValue(line, "style", "\\s*;+\\s*", "height: 5px");
			checkElementAttributeValue(line, "tooltip", "");
			
			progressBar = line.findElement(By.cssSelector("div.progress-bar"));
			
			checkElementAttributeContainsValue(progressBar, "style", "\\s*;+\\s*", "width: 30%");
			
			
			// Third row, left
			WebElement thirdRowContainer = driver.findElement(By.cssSelector("uxd-charts-spark-chart-ng1 div:nth-of-type(3).row"));

			// Check the line			
			line = thirdRowContainer.findElement(By.cssSelector("ux-spark-ng1:nth-of-type(1) spark div div div.spark"));

			checkElementAttributeContainsValue(line, "style", "\\s*;+\\s*", "height: 10px");
			checkElementAttributeValue(line, "tooltip", "");
			
			progressBar = line.findElement(By.cssSelector("div.progress-bar"));
			
			checkElementAttributeContainsValue(progressBar, "style", "\\s*;+\\s*", "width: 55%");
			
			
			// Third row, right

			// Check the line			
			line = thirdRowContainer.findElement(By.cssSelector("ux-spark-ng1:nth-of-type(2) spark div div div.spark"));

			checkElementAttributeContainsValue(line, "style", "\\s*;+\\s*", "height: 10px");
			checkElementAttributeValue(line, "tooltip", "");
			
			progressBar = line.findElement(By.cssSelector("div.progress-bar"));
			
			checkElementAttributeContainsValue(progressBar, "style", "\\s*;+\\s*", "width: 30%");
			
			
			// Fourth row, left
			WebElement fourthRowContainer = driver.findElement(By.cssSelector("uxd-charts-spark-chart-ng1 div:nth-of-type(4).row"));

			// Check the line			
			line = fourthRowContainer.findElement(By.cssSelector("ux-spark-ng1:nth-of-type(1) spark div div div.spark"));

			checkElementAttributeContainsValue(line, "style", "\\s*;+\\s*", "height: 10px");
			checkElementAttributeValue(line, "tooltip", "");
			
			progressBar = line.findElement(By.cssSelector("div.progress-bar"));
			
			checkElementAttributeContainsValue(progressBar, "style", "\\s*;+\\s*", "width: 55%");
			
			
			// Fourth row, right

			// Check the line			
			line = fourthRowContainer.findElement(By.cssSelector("ux-spark-ng1:nth-of-type(2) spark div div div.spark"));

			checkElementAttributeContainsValue(line, "style", "\\s*;+\\s*", "height: 10px");
			checkElementAttributeValue(line, "tooltip", "");
			
			progressBar = line.findElement(By.cssSelector("div.progress-bar"));
			
			checkElementAttributeContainsValue(progressBar, "style", "\\s*;+\\s*", "width: 30%");
		} finally {
			logErrors();
		}
	}	
}