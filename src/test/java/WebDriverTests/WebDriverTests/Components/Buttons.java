package WebDriverTests.WebDriverTests.Components;

import org.testng.annotations.*;
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import WebDriverTests.WebDriverTests.UXAspectsTesting.TestNGBase;
import WebDriverTests.WebDriverTests.UXAspectsTesting.Utilities;

/**
 * Defines tests for the Components -> Buttons section.
 */

public class Buttons extends TestNGBase {
	/**
	 * Tests the Buttons -> Grouped Buttons section of the Components page
	 * 
	 * @throws Exception Throws exception thrown by a WebDriver executable
	 */
	@Test(alwaysRun = true)
	public void testGroupedButtons() throws Exception {
		try {
			initialiseMethod(getClass().getCanonicalName(), Utilities.getMethodName());
			
			// Scroll to the required section and wait until one of the components is displayed
			String displaySection = "window.location.href=\"" + this.startingUrl + "#grouped-buttons-ng1" + "\"";
			Utilities.scrollToSection(driver, displaySection);

			WebDriverWait wait = new WebDriverWait(driver, this.displayWaitTimeMS / 1000);
			wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("uxd-components-grouped-buttons-ng1 uxd-grouped-buttons-wrapper div:nth-of-type(1).btn-group button:nth-child(1)")));
			
			// Get the elements
			WebElement buttonsContainer = driver.findElement(By.cssSelector("uxd-components-grouped-buttons-ng1 uxd-grouped-buttons-wrapper"));
			
			WebElement buttonLeft = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(1).btn-group button:nth-child(1)"));
			WebElement buttonMiddle = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(1).btn-group button:nth-child(2)"));
			WebElement buttonRight = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(1).btn-group button:nth-child(3)"));

			WebElement buttonLeftArrow = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(2).btn-group button:nth-child(1)"));
			WebElement buttonNumber1 = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(2).btn-group button:nth-child(2)"));
			WebElement buttonNumber2 = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(2).btn-group button:nth-child(3)"));
			WebElement buttonNumber3 = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(2).btn-group button:nth-child(4)"));
			WebElement buttonNumber4 = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(2).btn-group button:nth-child(5)"));
			WebElement buttonRightArrow = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(2).btn-group button:nth-child(6)"));

			// Ensure controls are visible for clicking
			Utilities.performVerticalScroll(driver, buttonLeft, verticalScrollPixels);

			// Check for expected classes
			checkElementHasClass(buttonLeft, "button-secondary");
			checkElementHasNotClass(buttonLeft, "active");
			checkElementHasClass(buttonMiddle, "button-secondary");
			checkElementHasClass(buttonMiddle, "active");
			checkElementHasClass(buttonRight, "button-secondary");
			checkElementHasNotClass(buttonRight, "active");			

			// Verify titles of first group of buttons
			if (this.browser.equalsIgnoreCase("edge")) {
				checkElementText(buttonLeft, "Left");
				checkElementText(buttonMiddle, "Middle");
				checkElementText(buttonRight, "Right");
			} else {
				checkElementText(buttonLeft, "LEFT");
				checkElementText(buttonMiddle, "MIDDLE");
				checkElementText(buttonRight, "RIGHT");
			}			
			
			// Verify statuses of first group of buttons
			checkElementNotActive(buttonLeft);
			checkElementActive(buttonMiddle);
			checkElementNotActive(buttonRight);

			// Click on 'Left' button
			buttonLeft.click();

			// Verify statuses of first group of buttons
			checkElementActive(buttonLeft);
			checkElementNotActive(buttonMiddle);
			checkElementNotActive(buttonRight);

			// Click on 'Right' button
			buttonRight.click();

			// Verify statuses of first group of buttons
			checkElementNotActive(buttonLeft);
			checkElementNotActive(buttonMiddle);
			checkElementActive(buttonRight);

			// Check titles of second group of buttons
			checkElementText(buttonNumber1, "1");
			checkElementText(buttonNumber2, "2");
			checkElementText(buttonNumber3, "3");
			checkElementText(buttonNumber4, "4");

			// Verify statuses of second group of buttons
			checkElementActive(buttonNumber1);
			checkElementNotActive(buttonNumber2);
			checkElementNotActive(buttonNumber3);
			checkElementNotActive(buttonNumber4);

			// Click on '3' button
			buttonNumber3.click();

			// Verify statuses of second group of buttons
			checkElementNotActive(buttonNumber1);
			checkElementNotActive(buttonNumber2);
			checkElementActive(buttonNumber3);
			checkElementNotActive(buttonNumber4);

			// Click on '<' button
			buttonLeftArrow.click();

			// Verify statuses of second group of buttons
			checkElementNotActive(buttonNumber1);
			checkElementActive(buttonNumber2);
			checkElementNotActive(buttonNumber3);
			checkElementNotActive(buttonNumber4);

			// Click twice on '>' button
			buttonRightArrow.click();
			buttonRightArrow.click();

			// Verify statuses of second group of buttons
			checkElementNotActive(buttonNumber1);
			checkElementNotActive(buttonNumber2);
			checkElementNotActive(buttonNumber3);
			checkElementActive(buttonNumber4);
		} finally {
			logErrors();
		}
	}

	/**
	 * Tests the Buttons -> Toggle Buttons section of the Components page
	 * 
	 * @throws Exception Throws exception thrown by a WebDriver executable
	 */
	@Test(alwaysRun = true)
	public void testToggleButtons() throws Exception {
		try {
			initialiseMethod(getClass().getCanonicalName(), Utilities.getMethodName());
			
			// Scroll to the required section and wait until one of the components is displayed
			String displaySection = "window.location.href=\"" + this.startingUrl + "#toggle-buttons-ng1" + "\"";
			Utilities.scrollToSection(driver, displaySection);
			
			WebDriverWait wait = new WebDriverWait(driver, this.displayWaitTimeMS / 1000);
			wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("uxd-components-toggle-buttons-ng1 div:nth-of-type(1) button.button-toggle-primary")));

			// Get the elements
			WebElement buttonsContainer = driver.findElement(By.cssSelector("uxd-components-toggle-buttons-ng1"));
			
			WebElement buttonPrimarySingleToggle = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(1) button.button-toggle-primary"));
            WebElement buttonAccentSingleToggle = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(1) button.button-toggle-accent"));
			
			WebElement buttonBold = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(2) div.btn-group label:nth-of-type(1)"));
			WebElement buttonUnderline = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(2) div.btn-group label:nth-of-type(2)"));
			WebElement buttonItalic = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(2) div.btn-group label:nth-of-type(3)"));
			
			// Ensure controls are visible for clicking
			Utilities.performVerticalScroll(driver, buttonPrimarySingleToggle, verticalScrollPixels);

			// Verify titles of button
			if (this.browser.equalsIgnoreCase("edge")) {
				checkElementTrimmedText(buttonPrimarySingleToggle, "Primary Single Toggle");
			} else {
				checkElementText(buttonPrimarySingleToggle, "PRIMARY SINGLE TOGGLE");
			}

			// Verify status of button
			checkElementNotActive(buttonPrimarySingleToggle);
			
			// Click on button
            buttonPrimarySingleToggle.click();

			// Verify title of button
			if (this.browser.equalsIgnoreCase("edge")) {
				checkElementTrimmedText(buttonPrimarySingleToggle, "Primary Single Toggle");
			} else {
				checkElementText(buttonPrimarySingleToggle, "PRIMARY SINGLE TOGGLE");
			}

			// Verify status of button
			checkElementActive(buttonPrimarySingleToggle);

            Utilities.performVerticalScroll(driver, buttonAccentSingleToggle, verticalScrollPixels);

            // Verify titles of button
            if (this.browser.equalsIgnoreCase("edge")) {
                checkElementTrimmedText(buttonAccentSingleToggle, "Accent Single Toggle");
            } else {
                checkElementText(buttonAccentSingleToggle, "ACCENT SINGLE TOGGLE");
            }

            // Verify status of button
            checkElementNotActive(buttonAccentSingleToggle);

            // Click on button
            buttonAccentSingleToggle.click();

            // Verify title of button
            if (this.browser.equalsIgnoreCase("edge")) {
                checkElementTrimmedText(buttonAccentSingleToggle, "Accent Single Toggle");
            } else {
                checkElementText(buttonAccentSingleToggle, "ACCENT SINGLE TOGGLE");
            }

            // Verify status of button
            checkElementActive(buttonAccentSingleToggle);
			
			// Verify titles of buttons
			if (this.browser.equalsIgnoreCase("edge")) {
				checkElementText(buttonBold, "Bold");
				checkElementTrimmedText(buttonUnderline, "Underline");
				checkElementTrimmedText(buttonItalic, "Italic");
			} else {
				checkElementText(buttonBold, "BOLD");
				checkElementText(buttonUnderline, "UNDERLINE");
				checkElementText(buttonItalic, "ITALIC");
			}
			
			// Verify statuses of buttons
			checkElementNotActive(buttonBold);
			checkElementActive(buttonUnderline);
			checkElementNotActive(buttonItalic);
			
			// Click on buttons
			buttonBold.click();
			buttonUnderline.click();
			buttonItalic.click();

			// Verify titles of buttons
			if (this.browser.equalsIgnoreCase("edge")) {
				checkElementText(buttonBold, "Bold");
				checkElementTrimmedText(buttonUnderline, "Underline");
				checkElementTrimmedText(buttonItalic, "Italic");
			} else {
				checkElementText(buttonBold, "BOLD");
				checkElementText(buttonUnderline, "UNDERLINE");
				checkElementText(buttonItalic, "ITALIC");
			}
			
			// Verify statuses of buttons
			checkElementActive(buttonBold);
			checkElementNotActive(buttonUnderline);
			checkElementActive(buttonItalic);
		} finally {
			logErrors();
		}
	}

	/**
	 * Tests the Buttons -> Floating Action Button section of the Components page
	 * 
	 * @throws Exception Throws exception thrown by a WebDriver executable
	 */
	@Test(alwaysRun = true)
	public void testFloatingActionButton() throws Exception {
		try {
			initialiseMethod(getClass().getCanonicalName(), Utilities.getMethodName());

			// Scroll to the required section and wait until one of the components is displayed
			String displaySection = "window.location.href=\"" + this.startingUrl + "#floating-action-button-ng1" + "\"";
			Utilities.scrollToSection(driver, displaySection);
			
			WebDriverWait wait = new WebDriverWait(driver, this.displayWaitTimeMS / 1000);
			wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("uxd-floating-action-button-ng1 uxd-floating-action-button-wrapper div:nth-of-type(1) span.floating-action-button button.dir-bottom")));

			// Get the elements
			WebElement buttonsContainer = driver.findElement(By.cssSelector("uxd-floating-action-button-ng1 uxd-floating-action-button-wrapper"));
			
		
			// Ensure Vertical(Bottom) button is visible for clicking
			WebElement floatingActionButton1 = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(1) span.floating-action-button"));
			WebElement buttonVerticalBottom = floatingActionButton1.findElement(By.cssSelector("button.dir-bottom"));
			Utilities.performVerticalScroll(driver, buttonVerticalBottom, verticalScrollPixels);

			// Verify existence of button
			checkElementPresent(floatingActionButton1, By.cssSelector("button.dir-bottom span.hpe-icon.hpe-contract"));
			
			if ((!this.browser.equalsIgnoreCase("ie")) && (!this.browser.equalsIgnoreCase("edge"))) {
				checkElementNotPresent(floatingActionButton1, By.cssSelector("ul.child-btn-set.child-btn-set-visible"));
			}
			
			// Verify button properties
			checkElementPropertyColour(buttonVerticalBottom, "background-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonVerticalBottom, "border-top-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonVerticalBottom, "color", "#ffffff");
				
			// Click on the Vertical(Bottom) button
			buttonVerticalBottom.click();
			
			if ((!this.browser.equalsIgnoreCase("ie")) && (!this.browser.equalsIgnoreCase("edge"))) {
				checkElementPresent(floatingActionButton1, By.cssSelector("ul.child-btn-set.child-btn-set-visible"));
			}
			
			// Verify action buttons' properties
			WebElement floatingButton1 = floatingActionButton1.findElement(By.cssSelector("ul.child-btn-set li:nth-of-type(1) button"));
			WebElement floatingButton2 = floatingActionButton1.findElement(By.cssSelector("ul.child-btn-set li:nth-of-type(2) button"));
			WebElement floatingButton3 = floatingActionButton1.findElement(By.cssSelector("ul.child-btn-set li:nth-of-type(3) button"));
			
			checkElementPropertyColour(floatingButton1, "color", "#999999");
			checkElementPropertyColour(floatingButton1, "background-color", "#ffffff");
			checkElementPresent(floatingActionButton1, By.cssSelector("ul.child-btn-set li:nth-of-type(1) button span.hpe-icon.hpe-add"));
			
			checkElementPropertyColour(floatingButton2, "color", "#999999");
			checkElementPropertyColour(floatingButton2, "background-color", "#ffffff");
			checkElementPresent(floatingActionButton1, By.cssSelector("ul.child-btn-set li:nth-of-type(2) button span.hpe-icon.hpe-analytics"));
			
			checkElementPropertyColour(floatingButton3, "color", "#999999");
			checkElementPropertyColour(floatingButton3, "background-color", "#ffffff");
			checkElementPresent(floatingActionButton1, By.cssSelector("ul.child-btn-set li:nth-of-type(3) button span.hpe-icon.hpe-app"));			
			

			// Ensure Horizontal(Right) button is visible for clicking
			WebElement floatingActionButton2 = buttonsContainer.findElement(By.cssSelector("span[direction=\"'right'\"]"));
			WebElement buttonHorizontalRight = floatingActionButton2.findElement(By.cssSelector("button"));
			Utilities.performVerticalScroll(driver, buttonHorizontalRight, verticalScrollPixels);

			// Verify existence of button
			checkElementPresent(floatingActionButton2, By.cssSelector("button span.hpe-icon.hpe-contract"));
			
			if ((!this.browser.equalsIgnoreCase("ie")) && (!this.browser.equalsIgnoreCase("edge"))) {
				checkElementNotPresent(floatingActionButton2, By.cssSelector("span.child-btn-set-horizontal.child-btn-set-visible-horizontal"));
			}
			
			// Verify button properties
			checkElementPropertyColour(buttonHorizontalRight, "background-color", new String[] {Utilities.COLOR_PRIMARY, Utilities.COLOR_PRIMARY_FOCUS});
			checkElementPropertyColour(buttonHorizontalRight, "border-top-color", new String[] {Utilities.COLOR_PRIMARY, Utilities.COLOR_PRIMARY_FOCUS});
			checkElementPropertyColour(buttonHorizontalRight, "color", "#ffffff");
			
			// Click on the Horizontal(Right) button
			buttonHorizontalRight.click();
			
			if ((!this.browser.equalsIgnoreCase("ie")) && (!this.browser.equalsIgnoreCase("edge"))) {
				checkElementPresent(floatingActionButton2, By.cssSelector("span.child-btn-set-horizontal.child-btn-set-visible-horizontal"));
			}
			
			// Verify action buttons' properties
			floatingButton1 = floatingActionButton2.findElement(By.cssSelector("span.child-btn-set-horizontal.right button:nth-of-type(1)"));
			floatingButton2 = floatingActionButton2.findElement(By.cssSelector("span.child-btn-set-horizontal.right button:nth-of-type(2)"));
			floatingButton3 = floatingActionButton2.findElement(By.cssSelector("span.child-btn-set-horizontal.right button:nth-of-type(3)"));
			
			checkElementPropertyColour(floatingButton1, "color", "#999999");
			checkElementPropertyColour(floatingButton1, "background-color", "#ffffff");
			checkElementPresent(floatingActionButton2, By.cssSelector("span.child-btn-set-horizontal.right button:nth-of-type(1) span.hpe-icon.hpe-add"));
			
			checkElementPropertyColour(floatingButton2, "color", "#999999");
			checkElementPropertyColour(floatingButton2, "background-color", "#ffffff");
			checkElementPresent(floatingActionButton2, By.cssSelector("span.child-btn-set-horizontal.right button:nth-of-type(2) span.hpe-icon.hpe-analytics"));
			
			checkElementPropertyColour(floatingButton3, "color", "#999999");
			checkElementPropertyColour(floatingButton3, "background-color", "#ffffff");
			checkElementPresent(floatingActionButton2, By.cssSelector("span.child-btn-set-horizontal.right button:nth-of-type(3) span.hpe-icon.hpe-app"));			
			

			// Ensure Vertical(Up) button is visible for clicking
			WebElement floatingActionButton3 = buttonsContainer.findElement(By.cssSelector("span[direction=\"'top'\"]"));
			WebElement buttonVerticalUp = floatingActionButton3.findElement(By.cssSelector("button.dir-top"));
			Utilities.performVerticalScroll(driver, buttonVerticalUp, -300);

			// Verify existence of button
			checkElementPresent(floatingActionButton3, By.cssSelector("button span.hpe-icon.hpe-contract"));
			
			if ((!this.browser.equalsIgnoreCase("ie")) && (!this.browser.equalsIgnoreCase("edge"))) {
				checkElementNotPresent(floatingActionButton3, By.cssSelector("ul.child-btn-set-top.child-btn-set-top-visible"));
			}
			
			// Verify button properties
			checkElementPropertyColour(buttonVerticalUp, "background-color", new String[] {Utilities.COLOR_PRIMARY, Utilities.COLOR_PRIMARY_FOCUS});
			checkElementPropertyColour(buttonVerticalUp, "border-top-color", new String[] {Utilities.COLOR_PRIMARY, Utilities.COLOR_PRIMARY_FOCUS});
			checkElementPropertyColour(buttonVerticalUp, "color", "#ffffff");			
			
			// Click on the Vertical(Up) button
			buttonVerticalUp.click();
			
			if ((!this.browser.equalsIgnoreCase("ie")) && (!this.browser.equalsIgnoreCase("edge"))) {
				checkElementPresent(floatingActionButton3, By.cssSelector("ul.child-btn-set-top.child-btn-set-top-visible"));
			}
			
			// Verify action buttons' properties
			floatingButton1 = floatingActionButton3.findElement(By.cssSelector("ul.child-btn-set-top li:nth-of-type(1) button"));
			floatingButton2 = floatingActionButton3.findElement(By.cssSelector("ul.child-btn-set-top li:nth-of-type(2) button"));
			floatingButton3 = floatingActionButton3.findElement(By.cssSelector("ul.child-btn-set-top li:nth-of-type(3) button"));
			
			checkElementPropertyColour(floatingButton1, "color", "#999999");
			checkElementPropertyColour(floatingButton1, "background-color", "#ffffff");
			checkElementPresent(floatingActionButton3, By.cssSelector("ul.child-btn-set-top li:nth-of-type(1) button span.hpe-icon.hpe-add"));
			
			checkElementPropertyColour(floatingButton2, "color", "#999999");
			checkElementPropertyColour(floatingButton2, "background-color", "#ffffff");
			checkElementPresent(floatingActionButton3, By.cssSelector("ul.child-btn-set-top li:nth-of-type(2) button span.hpe-icon.hpe-analytics"));
			
			checkElementPropertyColour(floatingButton3, "color", "#999999");
			checkElementPropertyColour(floatingButton3, "background-color", "#ffffff");
			checkElementPresent(floatingActionButton3, By.cssSelector("ul.child-btn-set-top li:nth-of-type(3) button span.hpe-icon.hpe-app"));			
			
			
			// Ensure Horizontal(Left) button is visible for clicking
			WebElement floatingActionButton4 = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(2) span[direction=\"'left'\"]"));
			WebElement buttonHorizontalLeft = floatingActionButton4.findElement(By.cssSelector("button"));
			Utilities.performVerticalScroll(driver, buttonHorizontalLeft, verticalScrollPixels);

			// Verify existence of button
			checkElementPresent(floatingActionButton4, By.cssSelector("button span.hpe-icon.hpe-contract"));
			
			if ((!this.browser.equalsIgnoreCase("ie")) && (!this.browser.equalsIgnoreCase("edge"))) {
				checkElementNotPresent(floatingActionButton4, By.cssSelector("ul.child-btn-set-horizontal.child-btn-set-visible-horizontal"));
			}
			
			// Verify button properties
			checkElementPropertyColour(buttonHorizontalLeft, "background-color", new String[] {Utilities.COLOR_PRIMARY, Utilities.COLOR_PRIMARY_FOCUS});
			checkElementPropertyColour(buttonHorizontalLeft, "border-top-color", new String[] {Utilities.COLOR_PRIMARY, Utilities.COLOR_PRIMARY_FOCUS});
			checkElementPropertyColour(buttonHorizontalLeft, "color", "#ffffff");
			
			// Click on the Horizontal (Left) button
			buttonHorizontalLeft.click();
			
			if ((!this.browser.equalsIgnoreCase("ie")) && (!this.browser.equalsIgnoreCase("edge"))) {
				checkElementPresent(floatingActionButton4, By.cssSelector("ul.child-btn-set-horizontal.child-btn-set-visible-horizontal"));
			}
			
			// Verify action buttons' properties
			floatingButton1 = floatingActionButton4.findElement(By.cssSelector("ul.child-btn-set-horizontal li:nth-of-type(1) button"));
			floatingButton2 = floatingActionButton4.findElement(By.cssSelector("ul.child-btn-set-horizontal li:nth-of-type(2) button"));
			floatingButton3 = floatingActionButton4.findElement(By.cssSelector("ul.child-btn-set-horizontal li:nth-of-type(3) button"));

			checkElementPropertyColour(floatingButton1, "color", "#999999");
			checkElementPropertyColour(floatingButton1, "background-color", "#ffffff");
			checkElementPresent(floatingActionButton4, By.cssSelector("ul.child-btn-set-horizontal li:nth-of-type(1) button span.hpe-icon.hpe-add"));
			
			checkElementPropertyColour(floatingButton2, "color", "#999999");
			checkElementPropertyColour(floatingButton2, "background-color", "#ffffff");
			checkElementPresent(floatingActionButton4, By.cssSelector("ul.child-btn-set-horizontal li:nth-of-type(2) button span.hpe-icon.hpe-analytics"));
			
			checkElementPropertyColour(floatingButton3, "color", "#999999");
			checkElementPropertyColour(floatingButton3, "background-color", "#ffffff");
			checkElementPresent(floatingActionButton4, By.cssSelector("ul.child-btn-set-horizontal li:nth-of-type(3) button span.hpe-icon.hpe-app"));
		} finally {
			logErrors();
		}
	}

	/**
	 * Tests the Buttons -> Pagination section of the Components page
	 * 
	 * @throws Exception Throws exception thrown by a WebDriver executable
	 */
	@Test(alwaysRun = true)
	public void testPagination() throws Exception {
		try {
			initialiseMethod(getClass().getCanonicalName(), Utilities.getMethodName());
			
			// Scroll to the required section and wait until one of the components is displayed
			String displaySection = "window.location.href=\"" + this.startingUrl + "#pagination-ng1" + "\"";
			Utilities.scrollToSection(driver, displaySection);
			
			WebDriverWait wait = new WebDriverWait(driver, this.displayWaitTimeMS / 1000);
			wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("uxd-pagination-ng1 uxd-pagination-wrapper ul.pagination li:nth-of-type(1) a")));

			// Get the elements
			WebElement paginationContainer = driver.findElement(By.cssSelector("uxd-pagination-ng1 uxd-pagination-wrapper"));
			
			WebElement list = paginationContainer.findElement(By.cssSelector("ul.pagination"));
			
			WebElement listItemLeft = list.findElement(By.cssSelector("li:nth-of-type(1)"));
			WebElement listItemNumber1 = list.findElement(By.cssSelector("li:nth-of-type(2)"));
			WebElement listItemNumber3 = list.findElement(By.cssSelector("li:nth-of-type(4)"));
			WebElement listItemNumber5 = list.findElement(By.cssSelector("li:nth-of-type(6)"));
			WebElement listItemRight = list.findElement(By.cssSelector("li:nth-of-type(7)"));
			
			WebElement linkLeft = listItemLeft.findElement(By.cssSelector("a"));
			WebElement linkNumber1 = listItemNumber1.findElement(By.cssSelector("a"));
			WebElement linkNumber5 = listItemNumber5.findElement(By.cssSelector("a"));
			WebElement linkRight = listItemRight.findElement(By.cssSelector("a"));
			
			WebElement paragraph = paginationContainer.findElement(By.cssSelector("p:nth-of-type(1)"));
			
			// Ensure controls are visible for clicking
			Utilities.performVerticalScroll(driver, linkLeft, verticalScrollPixels);

			// Verify titles of buttons
			checkElementText(linkNumber1, "1");
			checkElementText(linkNumber5, "5");

			// Verify statuses of buttons
			checkElementActive(listItemNumber1);
			checkElementNotActive(listItemNumber5);

			// Check value of text field
			checkElementText(paragraph, "Page 1 of 10");

			// Click on 'Right' button nine times
			linkRight.click();
			linkRight.click();
			linkRight.click();
			linkRight.click();
			linkRight.click();
			linkRight.click();
			linkRight.click();
			linkRight.click();
			linkRight.click();

			// Verify titles of buttons
			checkElementText(linkNumber1, "6");
			checkElementText(linkNumber5, "10");

			// Verify statuses of buttons
			checkElementNotActive(listItemNumber1);
			checkElementActive(listItemNumber5);

			// Check value of text field
			checkElementText(paragraph, "Page 10 of 10");

			// Click on 'Left' button three times
			linkLeft.click();
			linkLeft.click();
			linkLeft.click();

			// Verify titles of buttons
			checkElementText(linkNumber1, "5");
			checkElementText(linkNumber5, "9");

			// Verify statuses of buttons
			checkElementNotActive(listItemNumber1);
			checkElementActive(listItemNumber3);
			checkElementNotActive(listItemNumber5);
			
			// Check value of text field
			checkElementText(paragraph, "Page 7 of 10");
		} finally {
			logErrors();
		}
	}

	/**
	 * Tests the Buttons -> Single Toggle Button section of the Components page
	 * 
	 * @throws Exception Throws exception thrown by a WebDriver executable
	 */
	@Test(alwaysRun = true)
	public void testSingleToggleButton() throws Exception {
		try {
			initialiseMethod(getClass().getCanonicalName(), Utilities.getMethodName());
			
			// Scroll to the required section and wait until one of the components is displayed
			String displaySection = "window.location.href=\"" + this.startingUrl + "#single-toggle-button-ng1" + "\"";
			Utilities.scrollToSection(driver, displaySection);
			
			WebDriverWait wait = new WebDriverWait(driver, this.displayWaitTimeMS / 1000);
			wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("uxd-single-toggle-button-ng1 uxd-single-toggle-button-wrapper button")));

			// Get the elements
			WebElement buttonContainer = driver.findElement(By.cssSelector("uxd-single-toggle-button-ng1 uxd-single-toggle-button-wrapper"));
			
			WebElement button = buttonContainer.findElement(By.cssSelector("button"));
			WebElement span = button.findElement(By.cssSelector("span"));
			WebElement paragraph = buttonContainer.findElement(By.cssSelector("p em"));

			// Ensure controls are visible for clicking
			Utilities.performVerticalScroll(driver, button, verticalScrollPixels);

			// Verify titles of button
			checkElementText(span, "ON");

			// Verify status of button
			checkElementActive(button);

			// Check value of text field
			checkElementText(paragraph, "ON");

			// Click on button
			button.click();

			// Verify titles of button
			checkElementText(span, "OFF");

			// Verify status of button
			checkElementNotActive(button);

			// Check value of text field
			checkElementText(paragraph, "OFF");
		} finally {
			logErrors();
		}
	}

	/**
	 * Tests the Buttons -> Checkbox Buttons section of the Components page
	 * 
	 * @throws Exception Throws exception thrown by a WebDriver executable
	 */
	@Test(alwaysRun = true)
	public void testCheckboxButtons() throws Exception {
		try {
			initialiseMethod(getClass().getCanonicalName(), Utilities.getMethodName());
			
			// Scroll to the required section and wait until one of the components is displayed
			String displaySection = "window.location.href=\"" + this.startingUrl + "#checkbox-buttons-ng1" + "\"";
			Utilities.scrollToSection(driver, displaySection);
			
			WebDriverWait wait = new WebDriverWait(driver, this.displayWaitTimeMS / 1000);
			wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("uxd-checkbox-buttons-ng1 uxd-checkbox-buttons-wrapper div.btn-group button:nth-of-type(1)")));

			// Get the elements
			WebElement checkBoxesContainer = driver.findElement(By.cssSelector("uxd-checkbox-buttons-ng1 uxd-checkbox-buttons-wrapper"));
			
			WebElement buttonLeft = checkBoxesContainer.findElement(By.cssSelector("div.btn-group button:nth-of-type(1)"));
			WebElement buttonMiddle = checkBoxesContainer.findElement(By.cssSelector("div.btn-group button:nth-of-type(2)"));
			WebElement buttonRight = checkBoxesContainer.findElement(By.cssSelector("div.btn-group button:nth-of-type(3)"));
			
			WebElement emphasizedLeft = checkBoxesContainer.findElement(By.cssSelector("p:nth-of-type(1) em:nth-of-type(1)"));
			WebElement emphasizedMiddle = checkBoxesContainer.findElement(By.cssSelector("p:nth-of-type(1) em:nth-of-type(2)"));
			WebElement emphasizedRight = checkBoxesContainer.findElement(By.cssSelector("p:nth-of-type(1) em:nth-of-type(3)"));
			
			// Ensure controls are visible for clicking
			Utilities.performVerticalScroll(driver, buttonLeft, verticalScrollPixels);

			// Verify titles of buttons
			if (this.browser.equalsIgnoreCase("ie")) {
				checkElementText(buttonLeft, "LEFTON");
			} else if (this.browser.equalsIgnoreCase("edge")) {
				checkElementTrimmedText(buttonLeft, "LeftON");
			} else {
				checkElementText(buttonLeft, "LEFT\nON");
			}

			if (this.browser.equalsIgnoreCase("edge")) {
				checkElementTrimmedText(buttonMiddle, "Middle");
				checkElementTrimmedText(buttonRight, "Right");
			} else {
				checkElementText(buttonMiddle, "MIDDLE");
				checkElementText(buttonRight, "RIGHT");
			}

			// Verify status of buttons
			checkElementActive(buttonLeft);
			checkElementNotActive(buttonMiddle);
			checkElementNotActive(buttonRight);

			// Check values of text fields
			checkElementText(emphasizedLeft, "ON");
			checkElementText(emphasizedMiddle, "false");
			checkElementText(emphasizedRight, "false");

			// Click on buttons
			buttonLeft.click();
			buttonMiddle.click();
			buttonRight.click();

			// Verify titles of buttons
			if (this.browser.equalsIgnoreCase("ie")) {
				checkElementText(buttonLeft, "LEFTOFF");
			} else if (this.browser.equalsIgnoreCase("edge")) {
				checkElementTrimmedText(buttonLeft, "LeftOFF");
			} else {
				checkElementText(buttonLeft, "LEFT\nOFF");
			}
			
			if (this.browser.equalsIgnoreCase("edge")) {
				checkElementTrimmedText(buttonMiddle, "Middle");
				checkElementTrimmedText(buttonRight, "Right");
			} else {
				checkElementTrimmedText(buttonMiddle, "MIDDLE");
				checkElementTrimmedText(buttonRight, "RIGHT");
			}
			
			// Verify status of buttons
			checkElementNotActive(buttonLeft);
			checkElementActive(buttonMiddle);
			checkElementActive(buttonRight);

			// Check values of text fields
			checkElementText(emphasizedLeft, "OFF");
			checkElementText(emphasizedMiddle, "true");
			checkElementText(emphasizedRight, "true");
		} finally {
			logErrors();
		}
	}

	/**
	 * Tests the Radio Buttons section of the Angular Buttons page
	 * 
	 * @throws Exception Throws exception thrown by a WebDriver executable
	 */
	@Test(alwaysRun = true)
	public void testRadioButtons() throws Exception {
		try {
			initialiseMethod(getClass().getCanonicalName(), Utilities.getMethodName());
			
			// Scroll to the required section and wait until one of the components is displayed
			String displaySection = "window.location.href=\"" + this.startingUrl + "#radio-buttons-ng1" + "\"";
			Utilities.scrollToSection(driver, displaySection);
			
			WebDriverWait wait = new WebDriverWait(driver, this.displayWaitTimeMS / 1000);
			wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("uxd-radio-buttons-ng1 uxd-radio-buttons-wrapper div.btn-group button:nth-of-type(1)")));

			// Get the elements
			WebElement radioButtonsContainer = driver.findElement(By.cssSelector("uxd-radio-buttons-ng1 uxd-radio-buttons-wrapper"));
			
			WebElement buttonLeft = radioButtonsContainer.findElement(By.cssSelector("div.btn-group button:nth-of-type(1)"));
			WebElement buttonMiddle = radioButtonsContainer.findElement(By.cssSelector("div.btn-group button:nth-of-type(2)"));
			WebElement buttonRight = radioButtonsContainer.findElement(By.cssSelector("div.btn-group button:nth-of-type(3)"));
			
			WebElement emphasized = radioButtonsContainer.findElement(By.cssSelector("p:nth-of-type(1) em:nth-of-type(1)"));

			// Ensure controls are visible for clicking
			Utilities.performVerticalScroll(driver, buttonLeft, verticalScrollPixels);

			// Verify titles of buttons
			if (this.browser.equalsIgnoreCase("edge")) {
				checkElementText(buttonLeft, "Left");
				checkElementTrimmedText(buttonMiddle, "Middle");
				checkElementTrimmedText(buttonRight, "Right");
			} else {
				checkElementText(buttonLeft, "LEFT");
				checkElementText(buttonMiddle, "MIDDLE");
				checkElementText(buttonRight, "RIGHT");
			}
			
			// Verify status of buttons
			checkElementActive(buttonLeft);
			checkElementNotActive(buttonMiddle);
			checkElementNotActive(buttonRight);
			
			// Check value of text field
			checkElementText(emphasized, "Left");

			// Click on 'Left' button
			buttonLeft.click();

			// Verify titles of buttons
			if (this.browser.equalsIgnoreCase("edge")) {
				checkElementText(buttonLeft, "Left");
				checkElementTrimmedText(buttonMiddle, "Middle");
				checkElementTrimmedText(buttonRight, "Right");
			} else {
				checkElementText(buttonLeft, "LEFT");
				checkElementText(buttonMiddle, "MIDDLE");
				checkElementText(buttonRight, "RIGHT");
			}
			
			// Verify status of buttons
			checkElementActive(buttonLeft);
			checkElementNotActive(buttonMiddle);
			checkElementNotActive(buttonRight);
			
			// Check value of text field
			checkElementText(emphasized, "Left");

			// Click on 'Right' button
			buttonRight.click();

			// Verify titles of buttons
			if (this.browser.equalsIgnoreCase("edge")) {
				checkElementText(buttonLeft, "Left");
				checkElementTrimmedText(buttonMiddle, "Middle");
				checkElementTrimmedText(buttonRight, "Right");
			} else {
				checkElementText(buttonLeft, "LEFT");
				checkElementText(buttonMiddle, "MIDDLE");
				checkElementText(buttonRight, "RIGHT");
			}
			
			// Verify status of buttons
			checkElementNotActive(buttonLeft);
			checkElementNotActive(buttonMiddle);
			checkElementActive(buttonRight);
			
			// Check value of text field
			checkElementText(emphasized, "Right");

			// Click on 'Middle' button
			buttonMiddle.click();

			// Verify titles of buttons
			if (this.browser.equalsIgnoreCase("edge")) {
				checkElementText(buttonLeft, "Left");
				checkElementTrimmedText(buttonMiddle, "Middle");
				checkElementTrimmedText(buttonRight, "Right");
			} else {
				checkElementText(buttonLeft, "LEFT");
				checkElementText(buttonMiddle, "MIDDLE");
				checkElementText(buttonRight, "RIGHT");
			}
			
			// Verify status of buttons
			checkElementNotActive(buttonLeft);
			checkElementActive(buttonMiddle);
			checkElementNotActive(buttonRight);
			
			// Check value of text field
			checkElementText(emphasized, "Middle");
		} finally {
			logErrors();
		}
	}

	/**
	 * Tests the Buttons -> Dropdown section of the Components page
	 * 
	 * @throws Exception Throws exception thrown by a WebDriver executable
	 */
	@Test(alwaysRun = true)
	public void testDropdown() throws Exception {
		try {
			initialiseMethod(getClass().getCanonicalName(), Utilities.getMethodName());
			
			// Scroll to the required section and wait until one of the components is displayed
			String displaySection = "window.location.href=\"" + this.startingUrl + "#dropdown-ng1" + "\"";
			Utilities.scrollToSection(driver, displaySection);
			
			WebDriverWait wait = new WebDriverWait(driver, this.displayWaitTimeMS / 1000);
			wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("uxd-dropdown-ng1 uxd-dropdown-wrapper div p em:nth-of-type(1)")));

			// Get the elements
			WebElement buttonsContainer = driver.findElement(By.cssSelector("uxd-dropdown-ng1 uxd-dropdown-wrapper"));
			
			WebElement buttonLeft = buttonsContainer.findElement(By.cssSelector("div div:nth-of-type(1).btn-group button"));
			WebElement buttonRight = buttonsContainer.findElement(By.cssSelector("div div:nth-of-type(2).btn-group button"));
			WebElement buttonDropdown = buttonsContainer.findElement(By.cssSelector("div div:nth-of-type(2).btn-group button:nth-of-type(2)"));
			
			WebElement textLeft = buttonsContainer.findElement(By.cssSelector("p em:nth-of-type(1)"));
			WebElement textRight = buttonsContainer.findElement(By.cssSelector("p em:nth-of-type(2)"));
			
			// Ensure controls are visible for clicking
			Utilities.performVerticalScroll(driver, textLeft, verticalScrollPixels);

			// Verify first button text
			if (this.browser.equalsIgnoreCase("edge")) {
				checkElementTrimmedText(buttonLeft, "Button dropdown");
			} else {
				checkElementText(buttonLeft, "BUTTON DROPDOWN");
			}

			// Check values of text fields
			checkElementText(textLeft, "false");
			checkElementText(textRight, "false");

			// Click on the first dropdown
			buttonLeft.click();

			WebElement dropdown = buttonsContainer.findElement(By.cssSelector("div div div:nth-of-type(1).btn-group ul"));
			WebElement link1 = dropdown.findElement(By.cssSelector("li:nth-child(1) a"));
			WebElement link2 = dropdown.findElement(By.cssSelector("li:nth-child(2) a"));
			WebElement link3 = dropdown.findElement(By.cssSelector("li:nth-child(3) a"));
			WebElement link4 = dropdown.findElement(By.cssSelector("li:nth-child(4) a"));

			// Check values of text fields
			checkElementText(textLeft, "true");
			checkElementText(textRight, "false");
			
			WebElement text1 = link1.findElement(By.cssSelector(".el-radiobutton-content > span"));
			WebElement text2 = link2.findElement(By.cssSelector(".el-checkbox-content > span"));
			WebElement text3 = link3.findElement(By.cssSelector(".el-checkbox-content > span"));
			WebElement text4 = link4.findElement(By.cssSelector(".el-radiobutton-content > span"));

			// Verify menu item's titles
			checkElementTrimmedText(text1, "Radio Option 1");
			checkElementTrimmedText(text2, "Checkbox A");
			checkElementTrimmedText(text3, "Checkbox B");
			checkElementTrimmedText(text4, "Radio Option 2");

			// Click on radio 1
			dropdown.findElement(By.cssSelector("li:nth-child(1)")).click();
			checkPageTitle("UX Aspects Documentation");
			checkElementHasClass(link1.findElement(By.cssSelector(".el-radiobutton")), "checked");
			checkElementHasNotClass(link2.findElement(By.cssSelector(".el-checkbox")), "disabled");
			checkElementHasNotClass(link3.findElement(By.cssSelector(".el-checkbox")), "disabled");
			checkElementHasNotClass(link4.findElement(By.cssSelector(".el-radiobutton")), "checked");

			// Confirm dropdown remains open
			checkElementText(textLeft, "true");
			checkElementText(textRight, "false");
			
			// Click on checkbox A
			dropdown.findElement(By.cssSelector("li:nth-child(2)")).click();
			checkPageTitle("UX Aspects Documentation");
			checkElementHasClass(link2.findElement(By.cssSelector(".el-checkbox")), "checked");
			
			// Click on radio 2
			dropdown.findElement(By.cssSelector("li:nth-child(4)")).click();
			checkPageTitle("UX Aspects Documentation");
			checkElementHasNotClass(link1.findElement(By.cssSelector(".el-radiobutton")), "checked");
			checkElementHasClass(link2.findElement(By.cssSelector(".el-checkbox")), "disabled");
			checkElementHasClass(link3.findElement(By.cssSelector(".el-checkbox")), "disabled");
			checkElementHasClass(link4.findElement(By.cssSelector(".el-radiobutton")), "checked");

			// Verify second button text
			if (this.browser.equalsIgnoreCase("edge")) {
				checkElementTrimmedText(buttonRight, "Split dropdown");
			} else {
				checkElementText(buttonRight, "SPLIT DROPDOWN");
			}

			// Click on the second dropdown
			WebElement span = buttonDropdown.findElement(By.cssSelector("span"));
			span.click();

			dropdown = buttonsContainer.findElement(By.cssSelector("div div div:nth-of-type(2).btn-group ul"));
			link1 = dropdown.findElement(By.cssSelector("li:nth-child(1) a"));
			link2 = dropdown.findElement(By.cssSelector("li:nth-child(2) a"));
			link3 = dropdown.findElement(By.cssSelector("li:nth-child(3) a"));
			link4 = dropdown.findElement(By.cssSelector("li:nth-child(5) a"));

			// Check values of text fields
			checkElementText(textLeft, "false");
			checkElementText(textRight, "true");

			// Verify menu item's titles
			checkElementText(link1, "Action");
			checkElementText(link2, "Another action");
			checkElementText(link3, "Something else here");
			checkElementText(link4, "Separated link");

			// Verify menu items' links
			if (this.browser.equalsIgnoreCase("edge")) {
				//checkElementLinkAttribute(link1, "");
				//checkElementLinkAttribute(link2, "");
				//checkElementLinkAttribute(link3, "");
				//checkElementLinkAttribute(link4, "");
			} else {
				checkElementLinkAttribute(link1, null);
				checkElementLinkAttribute(link2, null);
				checkElementLinkAttribute(link3, null);
				checkElementLinkAttribute(link4, null);
			}

			// Click on second menu item and verify new location
			dropdown.findElement(By.cssSelector("li:nth-child(2)")).click();
			checkPageTitle("UX Aspects Documentation");
		} finally {
			logErrors();
		}
	}
}
