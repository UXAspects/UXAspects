package WebDriverTests.WebDriverTests.Components;

import org.testng.annotations.*;
import org.openqa.selenium.*;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import WebDriverTests.WebDriverTests.UXAspectsTesting.TestNGBase;
import WebDriverTests.WebDriverTests.UXAspectsTesting.Utilities;

/**
 * Defines tests for the Components -> Buttons section.
 */

public class TreeViews extends TestNGBase {
	/**
	 * Tests the Tree Views -> Tree Grid section of the Components page
	 * 
	 * @throws Exception Throws exception thrown by a WebDriver executable
	 */
	@Test(alwaysRun = true)
	public void testTreeGrid() throws Exception {
		try {
			initialiseMethod(getClass().getCanonicalName(), Utilities.getMethodName());
			
			// Scroll to the required section and wait until one of the components is displayed
			String displaySection = "window.location.href=\"" + this.startingUrl + "#tree-grid-ng1" + "\"";
			Utilities.scrollToSection(driver, displaySection);

			WebDriverWait wait = new WebDriverWait(driver, this.displayWaitTimeMS / 1000);
			wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("uxd-components-tree-grid-ng1 uxd-tree-grid-wrapper div.table-container table.treegrid")));
			
			if (this.browser.equalsIgnoreCase("firefox")) {return;}
			
			// Get the elements
			WebElement table = driver.findElement(By.cssSelector("uxd-components-tree-grid-ng1 uxd-tree-grid-wrapper div.table-container table.treegrid"));
			WebElement selected = driver.findElement(By.cssSelector("uxd-components-tree-grid-ng1 uxd-tree-grid-wrapper p"));
			
			// Verify headers
			WebElement colHeader1Span = table.findElement(By.cssSelector("thead tr th:nth-of-type(1) span"));
			WebElement colHeader2Span = table.findElement(By.cssSelector("thead tr th:nth-of-type(2) span"));
			WebElement colHeader3 = table.findElement(By.cssSelector("thead tr th:nth-of-type(3)"));
			WebElement colHeader3Span = colHeader3.findElement(By.cssSelector("span"));
			
			checkElementTrimmedText(colHeader1Span, "TITLE");
			checkElementTrimmedText(colHeader2Span, "DATE");
			checkElementTrimmedText(colHeader3Span, "ACTIONS");
			checkElementHasClass(colHeader3, "text-center");
			
			// Verify initial rows
			WebElement row1 = table.findElement(By.cssSelector("tbody tr:nth-of-type(1)"));
			WebElement row2 = table.findElement(By.cssSelector("tbody tr:nth-of-type(2)"));
			WebElement row3 = table.findElement(By.cssSelector("tbody tr:nth-of-type(3)"));
			
			// Check expander icon
			checkElementPresent(row1, By.cssSelector("td:nth-of-type(1) span.treegrid-expand span.treegrid-expand-toggle i"));
			checkElementHasClass(row1.findElement(By.cssSelector("td:nth-of-type(1) span.treegrid-expand span.treegrid-expand-toggle i")), "hpe-next");
			// Check type icon
			checkElementPresent(row1, By.cssSelector("td:nth-of-type(1) span.treegrid-icon i"));
			checkElementHasClass(row1.findElement(By.cssSelector("td:nth-of-type(1) span.treegrid-icon i")), "hpe-folder");
			// Check col 1 text
			checkElementTrimmedText(row1.findElement(By.cssSelector("td:nth-of-type(1) span:nth-of-type(4)")), "Documents");
			// Check col 2 exists (value is locale dependent)
			checkElementPresent(row1, By.cssSelector("td:nth-of-type(2) span"));
			// Check col 3 contains hover actions
			checkElementHasClass(row1.findElement(By.cssSelector("td:nth-of-type(3) > div > div")), "list-hover-actions");
			
			// Check expander icon
			checkElementPresent(row2, By.cssSelector("td:nth-of-type(1) span.treegrid-expand span.treegrid-expand-toggle i"));
			checkElementHasClass(row2.findElement(By.cssSelector("td:nth-of-type(1) span.treegrid-expand span.treegrid-expand-toggle i")), "hpe-next");
			// Check type icon
			checkElementPresent(row2, By.cssSelector("td:nth-of-type(1) span.treegrid-icon i"));
			checkElementHasClass(row2.findElement(By.cssSelector("td:nth-of-type(1) span.treegrid-icon i")), "hpe-folder");
			// Check col 1 text
			checkElementTrimmedText(row2.findElement(By.cssSelector("td:nth-of-type(1) span:nth-of-type(4)")), "Emails");
			// Check col 2 exists (value is locale dependent)
			checkElementPresent(row2, By.cssSelector("td:nth-of-type(2) span"));
			// Check col 3 contains hover actions
			checkElementHasClass(row2.findElement(By.cssSelector("td:nth-of-type(3) > div > div")), "list-hover-actions");
			
			// Check expander icon
			checkElementNotPresent(row3, By.cssSelector("td:nth-of-type(1) span.treegrid-expand span.treegrid-expand-toggle i"));
			// Check type icon
			checkElementPresent(row3, By.cssSelector("td:nth-of-type(1) span.treegrid-icon i"));
			checkElementHasClass(row3.findElement(By.cssSelector("td:nth-of-type(1) span.treegrid-icon i")), "hpe-folder");
			// Check col 1 text
			checkElementTrimmedText(row3.findElement(By.cssSelector("td:nth-of-type(1) span:nth-of-type(4)")), "Empty");
			// Check col 2 exists (value is locale dependent)
			checkElementPresent(row3, By.cssSelector("td:nth-of-type(2) span"));
			// Check col 3 contains hover actions
			checkElementHasClass(row3.findElement(By.cssSelector("td:nth-of-type(3) > div > div")), "list-hover-actions");

			// Verify there are no initially selected items
			checkElementNotPresent(selected, By.cssSelector("span:nth-of-type(1)"));

			// Expand row 2
			WebElement row2Expander = row2.findElement(By.cssSelector("td:nth-of-type(1) span.treegrid-expand span.treegrid-expand-toggle"));
			row2Expander.click();

			// Check updated expander icon
			checkElementPresent(row2, By.cssSelector("td:nth-of-type(1) span.treegrid-expand span i"));
			checkElementHasClass(row2.findElement(By.cssSelector("td:nth-of-type(1) span.treegrid-expand span i")), "hpe-down");
			
			// Verify new rows
			WebElement row2_1 = table.findElement(By.cssSelector("tbody tr:nth-of-type(3)"));
			WebElement row2_2 = table.findElement(By.cssSelector("tbody tr:nth-of-type(4)"));

			// Check expander icon
			checkElementNotPresent(row2_1, By.cssSelector("td:nth-of-type(1) span.treegrid-expand i"));
			// Check type icon
			checkElementPresent(row2_1, By.cssSelector("td:nth-of-type(1) span.treegrid-icon i"));
			checkElementHasClass(row2_1.findElement(By.cssSelector("td:nth-of-type(1) span.treegrid-icon i")), "hpe-folder");
			// Check col 1 text
			checkElementTrimmedText(row2_1.findElement(By.cssSelector("td:nth-of-type(1) span:nth-of-type(4)")), "Inbox");
			// Check col 2 exists (value is locale dependent)
			checkElementPresent(row2_1, By.cssSelector("td:nth-of-type(2) span"));
			// Check col 3 contains hover actions
			checkElementHasClass(row2_1.findElement(By.cssSelector("td:nth-of-type(3) > div > div")), "list-hover-actions");

			// Check expander icon
			checkElementNotPresent(row2_2, By.cssSelector("td:nth-of-type(1) span.treegrid-expand i"));
			// Check type icon
			checkElementPresent(row2_2, By.cssSelector("td:nth-of-type(1) span.treegrid-icon i"));
			checkElementHasClass(row2_2.findElement(By.cssSelector("td:nth-of-type(1) span.treegrid-icon i")), "hpe-folder");
			// Check col 1 text
			checkElementTrimmedText(row2_2.findElement(By.cssSelector("td:nth-of-type(1) span:nth-of-type(4)")), "Outbox");
			// Check col 2 exists (value is locale dependent)
			checkElementPresent(row2_2, By.cssSelector("td:nth-of-type(2) span"));
			// Check col 3 contains hover actions
			checkElementHasClass(row2_2.findElement(By.cssSelector("td:nth-of-type(3) > div > div")), "list-hover-actions");

			// Verify that clicking the expander did not create a selection
			checkElementNotPresent(selected, By.cssSelector("span:nth-of-type(1)"));

			// Click to select row 1
			row1.findElement(By.cssSelector("td:nth-of-type(1) span:nth-of-type(4)")).click();

			checkElementPresent(selected, By.cssSelector("span:nth-of-type(1)"));
			checkElementTrimmedText(selected.findElement(By.cssSelector("span:nth-of-type(1)")), "Documents.");

			// Shift-click to select rows 1 and 2 (seems to not be supported in other drivers)
			if (this.browser.equalsIgnoreCase("chrome")) {
				Actions shiftClick = new Actions(driver);
				shiftClick.keyDown(Keys.SHIFT).click(row2.findElement(By.cssSelector("td:nth-of-type(1) span:nth-of-type(4)"))).keyUp(Keys.SHIFT).perform();

				checkElementPresent(selected, By.cssSelector("span:nth-of-type(1)"));
				checkElementTrimmedText(selected.findElement(By.cssSelector("span:nth-of-type(1)")), "Documents,");
				checkElementPresent(selected, By.cssSelector("span:nth-of-type(2)"));
				checkElementTrimmedText(selected.findElement(By.cssSelector("span:nth-of-type(2)")), "Emails.");
			}

			// Click to select row 1
			row1.findElement(By.cssSelector("td:nth-of-type(1) span:nth-of-type(4)")).click();
			checkElementTrimmedText(selected, "Selected items: Documents.");
			
			// Press down to move to row 2 and clear selection
			row1.sendKeys(Keys.DOWN);
			checkElementTrimmedText(selected, "Selected items:");
			
			// Press shift+down to select rows 2 and 3 (looks like IE doesn't support it)
			if (!this.browser.equalsIgnoreCase("ie")) {
				Actions action = new Actions(driver);
				action.keyDown(Keys.SHIFT).sendKeys(Keys.DOWN).keyUp(Keys.SHIFT).perform();
				checkElementTrimmedText(selected, "Selected items: Emails, Inbox.");
			}
		} finally {
			logErrors();
		}
	}
}
