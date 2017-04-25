package WebDriverTests.WebDriverTests.Components;

import org.testng.annotations.*;

import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import WebDriverTests.WebDriverTests.UXAspectsTesting.TestNGBase;
import WebDriverTests.WebDriverTests.UXAspectsTesting.Utilities;

/**
 * Defines tests for the Components -> Input Controls section.
 */

public class Select extends TestNGBase {
	/**
	 * Tests the Select -> Select section of the Components page
	 * 
	 * @throws Exception Throws exception thrown by a WebDriver executable
	 */
	@Test(alwaysRun = true)
	public void testSelect() throws Exception {
		try {
			initialiseMethod(getClass().getCanonicalName(), Utilities.getMethodName());
			
			// Scroll to the required section and wait until one of the components is displayed
			String displaySection = "window.location.href=\"" + this.startingUrl + "#select-ng1" + "\"";
			Utilities.scrollToSection(driver, displaySection);
			
			WebDriverWait wait = new WebDriverWait(driver, this.displayWaitTimeMS / 1000);
			wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("uxd-components-select-ng1 uxd-select-wrapper > div.row:nth-of-type(1) > div:nth-of-type(1) .el-dynamicselect")));
			
			// Single Select tests
			String container1Selector = "uxd-components-select-ng1 uxd-select-wrapper > div.row:nth-of-type(1) > div:nth-of-type(1)";
			WebElement container1 = driver.findElement(By.cssSelector(container1Selector));
			WebElement select1 = container1.findElement(By.cssSelector(".el-dynamicselect"));
			WebElement selectInput1 = select1.findElement(By.cssSelector("input.el-dynamicselect-singleinput"));
			WebElement selectDropdown1 = select1.findElement(By.cssSelector("div.el-dynamicselect-dropdown"));
			WebElement selectOutput1 = container1.findElement(By.cssSelector("p > span"));
			
			// Ensure controls are visible for clicking
			Utilities.performVerticalScroll(driver, select1, verticalScrollPixels);
			
			checkElementAttributeValue(selectInput1, "value", "");
			checkElementNotVisible(selectDropdown1);
			checkElementText(selectOutput1, "");
			
			// Click displays dropdown and highlights first item
			select1.click();
			checkElementVisible(selectDropdown1);
			checkElementHasClass(selectDropdown1.findElement(By.cssSelector("ul > li.el-dynamicselect-dropdown-item:nth-of-type(1)")), "highlighted");
			
			// Down key moves to next item
			selectInput1.sendKeys(Keys.DOWN);
			checkElementHasClass(selectDropdown1.findElement(By.cssSelector("ul > li.el-dynamicselect-dropdown-item:nth-of-type(2)")), "highlighted");
			
			// Enter key selects item
			selectInput1.sendKeys(Keys.ENTER);
			checkElementAttributeValue(selectInput1, "value", "United Kingdom");
			checkElementNotVisible(selectDropdown1);
			checkElementText(selectOutput1, "United Kingdom");

			// Deleting a character in the input invalidates the selection
			selectInput1.sendKeys(Keys.BACK_SPACE);
			checkElementText(selectOutput1, "");
			
			// sendKeys with text in IE does not update the ngModel 100% of the time, so this part is unreliable.
			if (!browser.equalsIgnoreCase("ie")) {
				// Test filter text
				// Click to select all and overwite with filter expression
				select1.click();
				inputText(selectInput1, "bah");
				checkElementAttributeValue(selectInput1, "value", "bah");
				// Filter text has a debounce delay
				new WebDriverWait(driver, this.displayWaitTimeMS / 1000).until(ExpectedConditions.numberOfElementsToBe(By.cssSelector(container1Selector + " .el-dynamicselect div.el-dynamicselect-dropdown ul > li.el-dynamicselect-dropdown-item"), 2));
				checkElementVisible(selectDropdown1);
				checkElementText(selectDropdown1.findElement(By.cssSelector("ul > li.el-dynamicselect-dropdown-item:nth-of-type(1)")), "Bahamas");
				checkElementText(selectDropdown1.findElement(By.cssSelector("ul > li.el-dynamicselect-dropdown-item:nth-of-type(2)")), "Bahrain");
				
				// Clicking an item selects it
				selectDropdown1.findElement(By.cssSelector("ul > li.el-dynamicselect-dropdown-item:nth-of-type(2)")).click();
				checkElementAttributeValue(selectInput1, "value", "Bahrain");
				checkElementNotVisible(selectDropdown1);
				checkElementText(selectOutput1, "Bahrain");
			}
			
			// Multiple Select tests
			String container2Selector = "uxd-components-select-ng1 uxd-select-wrapper > div.row:nth-of-type(1) > div:nth-of-type(2)";
			WebElement container2 = driver.findElement(By.cssSelector(container2Selector));
			WebElement select2 = container2.findElement(By.cssSelector(".el-dynamicselect"));
			WebElement selectTags2 = select2.findElement(By.cssSelector(".tags > ul.tag-list"));
			WebElement selectInput2 = select2.findElement(By.cssSelector(".tags > input"));
			WebElement selectDropdown2 = select2.findElement(By.cssSelector("div.el-dynamicselect-dropdown"));
			WebElement selectOutput2 = driver.findElement(By.cssSelector(container2Selector + " > p"));
			
			checkElementAttributeValue(selectInput2, "value", "");
			checkElementNotVisible(selectDropdown2);
			checkNumberOfElements(selectTags2.findElements(By.cssSelector("li")), 0);
			checkElementTrimmedText(selectOutput2, "Selected locations:");
			
			// Select first item
			select2.click();
			checkElementVisible(selectDropdown2);
			new WebDriverWait(driver, this.displayWaitTimeMS / 1000).until(ExpectedConditions.elementToBeClickable(selectDropdown2.findElement(By.cssSelector("ul > li.el-dynamicselect-dropdown-item:nth-of-type(1)"))));
			
			selectDropdown2.findElement(By.cssSelector("ul > li.el-dynamicselect-dropdown-item:nth-of-type(1)")).click();
			checkElementAttributeValue(selectInput2, "value", "");
			checkElementNotVisible(selectDropdown2);
			checkNumberOfElements(selectTags2.findElements(By.cssSelector("li")), 1);
			checkElementText(selectTags2.findElement(By.cssSelector("li:nth-of-type(1) span")), "United States");
			checkElementTrimmedText(selectOutput2, "Selected locations: United States");
			
			// Select second item
			select2.click();
			checkElementVisible(selectDropdown2);
			new WebDriverWait(driver, this.displayWaitTimeMS / 1000).until(ExpectedConditions.elementToBeClickable(selectDropdown2.findElement(By.cssSelector("ul > li.el-dynamicselect-dropdown-item:nth-of-type(2)"))));
			
			selectDropdown2.findElement(By.cssSelector("ul > li.el-dynamicselect-dropdown-item:nth-of-type(2)")).click();
			checkElementAttributeValue(selectInput2, "value", "");
			checkElementNotVisible(selectDropdown2);
			checkNumberOfElements(selectTags2.findElements(By.cssSelector("li")), 2);
			checkElementText(selectTags2.findElement(By.cssSelector("li:nth-of-type(1) span")), "United States");
			checkElementText(selectTags2.findElement(By.cssSelector("li:nth-of-type(2) span")), "United Kingdom");
			checkElementTrimmedText(selectOutput2, "Selected locations: United States, United Kingdom");

			// Check that both items are selected in the dropdown as well
			select2.click();
			checkElementHasClass(selectDropdown2.findElement(By.cssSelector("ul > li.el-dynamicselect-dropdown-item:nth-of-type(1)")), "selected");
			checkElementHasClass(selectDropdown2.findElement(By.cssSelector("ul > li.el-dynamicselect-dropdown-item:nth-of-type(2)")), "selected");
			
			// Remove item 2 with backspace
			selectInput2.sendKeys(Keys.BACK_SPACE, Keys.BACK_SPACE);
			checkNumberOfElements(selectTags2.findElements(By.cssSelector("li")), 1);
			checkElementText(selectTags2.findElement(By.cssSelector("li:nth-of-type(1) span")), "United States");
			checkElementHasClass(selectDropdown2.findElement(By.cssSelector("ul > li.el-dynamicselect-dropdown-item:nth-of-type(1)")), "selected");
			checkElementHasNotClass(selectDropdown2.findElement(By.cssSelector("ul > li.el-dynamicselect-dropdown-item:nth-of-type(2)")), "selected");
			
			selectTags2.findElement(By.cssSelector("li:nth-of-type(1) a.remove-button")).click();
			checkNumberOfElements(selectTags2.findElements(By.cssSelector("li")), 0);
			checkElementHasNotClass(selectDropdown2.findElement(By.cssSelector("ul > li.el-dynamicselect-dropdown-item:nth-of-type(1)")), "selected");
			checkElementHasNotClass(selectDropdown2.findElement(By.cssSelector("ul > li.el-dynamicselect-dropdown-item:nth-of-type(2)")), "selected");
			
			// sendKeys with text in IE does not update the ngModel 100% of the time, so this part is unreliable.
			if (!browser.equalsIgnoreCase("ie")) {
				// Type filter text
				select2.click();
				inputText(selectInput2, "bah");
				checkElementAttributeValue(selectInput2, "value", "bah");
				// Filter text has a debounce delay
				new WebDriverWait(driver, this.displayWaitTimeMS / 1000).until(ExpectedConditions.numberOfElementsToBe(By.cssSelector(container2Selector + " .el-dynamicselect div.el-dynamicselect-dropdown ul > li.el-dynamicselect-dropdown-item"), 2));
				
				// Clicking an item selects it and clears the input
				selectDropdown2.findElement(By.cssSelector("ul > li.el-dynamicselect-dropdown-item:nth-of-type(2)")).click();
				checkElementAttributeValue(selectInput2, "value", "");
				checkElementNotVisible(selectDropdown2);
				checkElementTrimmedText(selectOutput2, "Selected locations: Bahrain");
			}
			
			// Single Select with Paging tests
			String container3Selector = "uxd-components-select-ng1 uxd-select-wrapper > div.row:nth-of-type(2) > div:nth-of-type(1)";
			WebElement container3 = driver.findElement(By.cssSelector(container3Selector));
			WebElement select3 = container3.findElement(By.cssSelector(".el-dynamicselect"));
			WebElement selectInput3 = select3.findElement(By.cssSelector("input.el-dynamicselect-singleinput"));
			WebElement selectDropdown3 = select3.findElement(By.cssSelector("div.el-dynamicselect-dropdown"));
			WebElement selectOutput3 = container3.findElement(By.cssSelector("p > span"));
			
			checkElementAttributeValue(selectInput3, "value", "");
			checkElementNotVisible(selectDropdown3);
			checkElementText(selectOutput3, "");
			
			// Click displays dropdown with first 20 items
			select3.click();
			checkElementVisible(selectDropdown3);
			new WebDriverWait(driver, this.displayWaitTimeMS / 1000).until(ExpectedConditions.elementToBeClickable(selectDropdown3.findElement(By.cssSelector("ul > li.el-dynamicselect-dropdown-item:nth-of-type(1)"))));
			
			checkNumberOfElements(selectDropdown3.findElements(By.cssSelector("ul > li.el-dynamicselect-dropdown-item")), 20);
			checkElementText(selectDropdown3.findElement(By.cssSelector("ul > li.el-dynamicselect-dropdown-item:nth-of-type(1)")), "United States");
			
			// Scroll down to the end to trigger next page load
			for (int i = 0; i < 19; i += 1) {
				selectInput3.sendKeys(Keys.DOWN);
			}
			checkElementText(selectDropdown3.findElement(By.cssSelector("ul > li.el-dynamicselect-dropdown-item:nth-of-type(20)")), "Bahrain");

			// Wait for loading to complete
			new WebDriverWait(driver, this.displayWaitTimeMS / 1000).until(ExpectedConditions.numberOfElementsToBe(By.cssSelector(container3Selector + " .el-dynamicselect div.el-dynamicselect-dropdown ul > li.el-dynamicselect-dropdown-item"), 40));
			new WebDriverWait(driver, this.displayWaitTimeMS / 1000).until(ExpectedConditions.invisibilityOfElementLocated(By.cssSelector(container3Selector + " .el-dynamicselect div.el-dynamicselect-dropdown div.infinite-scroll-loading")));

			// Select 21st item
			selectInput3.sendKeys(Keys.DOWN, Keys.ENTER);
			checkElementAttributeValue(selectInput3, "value", "Bangladesh");
			checkElementNotVisible(selectDropdown3);
			checkElementText(selectOutput3, "Bangladesh");
			
			// sendKeys with text in IE does not update the ngModel 100% of the time, so this part is unreliable.
			if (!browser.equalsIgnoreCase("ie")) {
				// Enter filter text
				select3.click();
				inputText(selectInput3, "stan");
				new WebDriverWait(driver, this.displayWaitTimeMS / 1000).until(ExpectedConditions.numberOfElementsToBe(By.cssSelector(container3Selector + " .el-dynamicselect div.el-dynamicselect-dropdown ul > li.el-dynamicselect-dropdown-item"), 8));
				checkElementText(selectDropdown3.findElement(By.cssSelector("ul > li.el-dynamicselect-dropdown-item:nth-of-type(1)")), "Afghanistan");
				checkElementText(selectDropdown3.findElement(By.cssSelector("ul > li.el-dynamicselect-dropdown-item:nth-of-type(8)")), "Uzbekistan");
				
				// Selection was cleared
				checkElementText(selectOutput3, "");
				
				// Select first filter result
				selectInput3.sendKeys(Keys.ENTER);
				checkElementAttributeValue(selectInput3, "value", "Afghanistan");
				checkElementNotVisible(selectDropdown3);
				checkElementText(selectOutput3, "Afghanistan");
			}
			
			// Multiple Select with Paging tests
			String container4Selector = "uxd-components-select-ng1 uxd-select-wrapper > div.row:nth-of-type(2) > div:nth-of-type(2)";
			WebElement container4 = driver.findElement(By.cssSelector(container4Selector));
			WebElement select4 = container4.findElement(By.cssSelector(".el-dynamicselect"));
			WebElement selectTags4 = select4.findElement(By.cssSelector(".tags > ul.tag-list"));
			WebElement selectInput4 = select4.findElement(By.cssSelector(".tags > input"));
			WebElement selectDropdown4 = select4.findElement(By.cssSelector("div.el-dynamicselect-dropdown"));
			WebElement selectOutput4 = driver.findElement(By.cssSelector(container4Selector + " > p"));
			
			// Click displays dropdown with first 20 items
			select4.click();
			checkElementVisible(selectDropdown4);
			new WebDriverWait(driver, this.displayWaitTimeMS / 1000).until(ExpectedConditions.elementToBeClickable(selectDropdown4.findElement(By.cssSelector("ul > li.el-dynamicselect-dropdown-item:nth-of-type(1)"))));
			checkNumberOfElements(selectDropdown4.findElements(By.cssSelector("ul > li.el-dynamicselect-dropdown-item")), 20);
			
			// Select first item
			selectDropdown4.findElement(By.cssSelector("ul > li.el-dynamicselect-dropdown-item:nth-of-type(1)")).click();
			checkElementAttributeValue(selectInput4, "value", "");
			checkElementNotVisible(selectDropdown4);
			checkNumberOfElements(selectTags4.findElements(By.cssSelector("li")), 1);
			checkElementText(selectTags4.findElement(By.cssSelector("li:nth-of-type(1) span")), "United States");
			checkElementTrimmedText(selectOutput4, "Selected locations: United States");
			
			// sendKeys with text in IE does not update the ngModel 100% of the time, so this part is unreliable.
			if (!browser.equalsIgnoreCase("ie")) {
				// Enter filter text
				select4.click();
				inputText(selectInput4, "stan");
				new WebDriverWait(driver, this.displayWaitTimeMS / 1000).until(ExpectedConditions.numberOfElementsToBe(By.cssSelector(container4Selector + " .el-dynamicselect div.el-dynamicselect-dropdown ul > li.el-dynamicselect-dropdown-item"), 8));
				
				// Select first result
				selectDropdown4.findElement(By.cssSelector("ul > li.el-dynamicselect-dropdown-item:nth-of-type(8)")).click();
				checkElementAttributeValue(selectInput4, "value", "");
				checkElementNotVisible(selectDropdown4);
				checkNumberOfElements(selectTags4.findElements(By.cssSelector("li")), 2);
				checkElementText(selectTags4.findElement(By.cssSelector("li:nth-of-type(1) span")), "United States");
				checkElementText(selectTags4.findElement(By.cssSelector("li:nth-of-type(2) span")), "Uzbekistan");
				checkElementTrimmedText(selectOutput4, "Selected locations: United States, Uzbekistan");
				
				// Remove item 1 from selection
				selectTags4.findElement(By.cssSelector("li:nth-of-type(1) a.remove-button")).click();
				checkNumberOfElements(selectTags4.findElements(By.cssSelector("li")), 1);
				checkElementTrimmedText(selectOutput4, "Selected locations: Uzbekistan");
				
				// Filter has been reset and the deselected item is not selected in the dropdown 
				select4.click();
				checkElementVisible(selectDropdown4);
				checkNumberOfElements(selectDropdown4.findElements(By.cssSelector("ul > li.el-dynamicselect-dropdown-item")), 20);
				checkElementText(selectDropdown4.findElement(By.cssSelector("ul > li.el-dynamicselect-dropdown-item:nth-of-type(1)")), "United States");
				checkElementHasNotClass(selectDropdown4.findElement(By.cssSelector("ul > li.el-dynamicselect-dropdown-item:nth-of-type(1)")), "selected");
				
				// Filter reset has not affected selection
				checkElementTrimmedText(selectOutput4, "Selected locations: Uzbekistan");
				
				// Filter again and check that the selected item is selected in the filtered dropdown
				inputText(selectInput4, "stan");
				new WebDriverWait(driver, this.displayWaitTimeMS / 1000).until(ExpectedConditions.numberOfElementsToBe(By.cssSelector(container4Selector + " .el-dynamicselect div.el-dynamicselect-dropdown ul > li.el-dynamicselect-dropdown-item"), 8));
	
				checkElementText(selectDropdown4.findElement(By.cssSelector("ul > li.el-dynamicselect-dropdown-item:nth-of-type(8)")), "Uzbekistan");
				checkElementHasClass(selectDropdown4.findElement(By.cssSelector("ul > li.el-dynamicselect-dropdown-item:nth-of-type(8)")), "selected");
			}
				
			// Disabled tests
			WebElement disabledCheckbox = driver.findElement(By.cssSelector("uxd-components-select-ng1 uxd-select-wrapper > div.row:nth-of-type(3) > div > label.el-checkbox-label"));
			disabledCheckbox.click();
			
			checkElementAttributeValue(selectInput1, "disabled", "true");
			select1.click();
			checkElementNotVisible(selectDropdown1);

			checkElementAttributeValue(selectInput2, "disabled", "true");
			select2.click();
			checkElementNotVisible(selectDropdown2);

			checkElementAttributeValue(selectInput3, "disabled", "true");
			select3.click();
			checkElementNotVisible(selectDropdown3);

			checkElementAttributeValue(selectInput4, "disabled", "true");
			select4.click();
			checkElementNotVisible(selectDropdown4);
		} finally {
			logErrors();
		}
	}
}
