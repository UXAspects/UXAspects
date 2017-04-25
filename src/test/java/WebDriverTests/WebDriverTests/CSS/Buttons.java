package WebDriverTests.WebDriverTests.CSS;

import org.testng.annotations.*;
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import WebDriverTests.WebDriverTests.UXAspectsTesting.TestNGBase;
import WebDriverTests.WebDriverTests.UXAspectsTesting.Utilities;

/**
 * Defines tests for the CSS -> Buttons section.
 */

public class Buttons extends TestNGBase {
	/**
	 * Tests the Buttons -> Colored Buttons section of the CSS page
	 * 
	 * @throws Exception Throws exception thrown by a WebDriver executable
	 */
	@Test(alwaysRun = true)
	public void testColoredButtons() throws Exception {
		try {
			initialiseMethod(getClass().getCanonicalName(), Utilities.getMethodName());

			// Scroll to the required section and wait until one of the components is displayed
			String displaySection = "window.location.href=\"" + this.startingUrl + "#colored-buttons" + "\"";
			Utilities.scrollToSection(driver, displaySection);

			WebDriverWait wait = new WebDriverWait(driver, this.displayWaitTimeMS / 1000);
			wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("uxd-css-colored-buttons div button.m-b.btn.button-primary")));

			// Get the elements
			WebElement buttonsContainer = driver.findElement(By.cssSelector("uxd-css-colored-buttons div"));
			
			WebElement buttonPrimary = buttonsContainer.findElement(By.cssSelector("button.m-b.btn.button-primary"));
			WebElement buttonSecondary = buttonsContainer.findElement(By.cssSelector("button.m-b.btn.button-secondary"));
			WebElement buttonAccent = buttonsContainer.findElement(By.cssSelector("button.m-b.btn.button-accent"));
			WebElement buttonWarning = buttonsContainer.findElement(By.cssSelector("button.m-b.btn.button-warning"));
			WebElement buttonDisabled = buttonsContainer.findElement(By.cssSelector("button.m-b.btn.button-primary[disabled]"));
			
			// Ensure controls are visible for clicking
			Utilities.performVerticalScroll(driver, buttonPrimary, verticalScrollPixels);

			// Verify buttons' text
			if (this.browser.equalsIgnoreCase("edge")) {
				checkElementTrimmedText(buttonPrimary, "Primary");
			} else {
				checkElementText(buttonPrimary, "PRIMARY");
			}
			if (this.browser.equalsIgnoreCase("edge")) {
				checkElementTrimmedText(buttonSecondary, "Secondary");
			} else {
				checkElementTrimmedText(buttonSecondary, "SECONDARY");
			}
			if (this.browser.equalsIgnoreCase("edge")) {
				checkElementTrimmedText(buttonAccent, "Accent");
			} else {
				checkElementTrimmedText(buttonAccent, "ACCENT");
			}
			if (this.browser.equalsIgnoreCase("ie")) {
				checkElementTrimmedText(buttonWarning, "WARNINGWARNING");
			} else if (this.browser.equalsIgnoreCase("edge")) {
				checkElementTrimmedText(buttonWarning, "WarningWarning");
			} else {
				checkElementText(buttonWarning, "WARNING\nWARNING");
			}
			if (this.browser.equalsIgnoreCase("edge")) {
				checkElementTrimmedText(buttonDisabled, "Disabled");
			} else {
				checkElementText(buttonDisabled, "DISABLED");
			}

			// Verify buttons' properties
			checkElementPropertyColour(buttonPrimary, "background-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonPrimary, "color", "#ffffff");
			checkElementPropertyColour(buttonPrimary, "border-top-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonPrimary, "border-right-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonPrimary, "border-bottom-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonPrimary, "border-left-color", Utilities.COLOR_PRIMARY);
			checkElementProperty(buttonPrimary, "border-top-style", "solid");
			checkElementProperty(buttonPrimary, "border-right-style", "solid");
			checkElementProperty(buttonPrimary, "border-bottom-style", "solid");
			checkElementProperty(buttonPrimary, "border-left-style", "solid");
			checkElementProperty(buttonPrimary, "border-top-width", "1px");
			checkElementProperty(buttonPrimary, "border-right-width", "1px");
			checkElementProperty(buttonPrimary, "border-bottom-width", "1px");
			checkElementProperty(buttonPrimary, "border-left-width", "1px");

			checkElementPropertyColour(buttonSecondary, "background-color", "#ffffff");
			checkElementPropertyColour(buttonSecondary, "color", "#999999");
			checkElementPropertyColour(buttonSecondary, "border-top-color", "#cccccc");
			checkElementPropertyColour(buttonSecondary, "border-right-color", "#cccccc");
			checkElementPropertyColour(buttonSecondary, "border-bottom-color", "#cccccc");
			checkElementPropertyColour(buttonSecondary, "border-left-color", "#cccccc");
			checkElementProperty(buttonSecondary, "border-top-style", "solid");
			checkElementProperty(buttonSecondary, "border-right-style", "solid");
			checkElementProperty(buttonSecondary, "border-bottom-style", "solid");
			checkElementProperty(buttonSecondary, "border-left-style", "solid");
			checkElementProperty(buttonSecondary, "border-top-width", "1px");
			checkElementProperty(buttonSecondary, "border-right-width", "1px");
			checkElementProperty(buttonSecondary, "border-bottom-width", "1px");
			checkElementProperty(buttonSecondary, "border-left-width", "1px");

			checkElementPropertyColour(buttonAccent, "background-color", Utilities.COLOR_ACCENT);
			checkElementPropertyColour(buttonAccent, "color", "#ffffff");
			checkElementPropertyColour(buttonAccent, "border-top-color", Utilities.COLOR_ACCENT);
			checkElementPropertyColour(buttonAccent, "border-right-color", Utilities.COLOR_ACCENT);
			checkElementPropertyColour(buttonAccent, "border-bottom-color", Utilities.COLOR_ACCENT);
			checkElementPropertyColour(buttonAccent, "border-left-color", Utilities.COLOR_ACCENT);
			checkElementProperty(buttonAccent, "border-top-style", "solid");
			checkElementProperty(buttonAccent, "border-right-style", "solid");
			checkElementProperty(buttonAccent, "border-bottom-style", "solid");
			checkElementProperty(buttonAccent, "border-left-style", "solid");
			checkElementProperty(buttonAccent, "border-top-width", "1px");
			checkElementProperty(buttonAccent, "border-right-width", "1px");
			checkElementProperty(buttonAccent, "border-bottom-width", "1px");
			checkElementProperty(buttonAccent, "border-left-width", "1px");

			checkElementPropertyColour(buttonWarning, "background-color", "#ff454f");
			checkElementPropertyColour(buttonWarning, "color", "#ffffff");
			if (this.browser.equalsIgnoreCase("chrome")) {
				checkElementProperty(buttonWarning, "border-top-color", "rgba(0, 0, 0, 0)");
			} else {
				checkElementProperty(buttonWarning, "border-top-color", "transparent");
			}
			if (this.browser.equalsIgnoreCase("chrome")) {
				checkElementProperty(buttonWarning, "border-right-color", "rgba(0, 0, 0, 0)");
			} else {
				checkElementProperty(buttonWarning, "border-right-color", "transparent");
			}
			if (this.browser.equalsIgnoreCase("chrome")) {
				checkElementProperty(buttonWarning, "border-bottom-color", "rgba(0, 0, 0, 0)");
			} else {
				checkElementProperty(buttonWarning, "border-bottom-color", "transparent");
			}
			if (this.browser.equalsIgnoreCase("chrome")) {
				checkElementProperty(buttonWarning, "border-left-color", "rgba(0, 0, 0, 0)");
			} else {
				checkElementProperty(buttonWarning, "border-left-color", "transparent");
			}
			checkElementProperty(buttonWarning, "border-top-style", "solid");
			checkElementProperty(buttonWarning, "border-right-style", "solid");
			checkElementProperty(buttonWarning, "border-bottom-style", "solid");
			checkElementProperty(buttonWarning, "border-left-style", "solid");
			checkElementProperty(buttonWarning, "border-top-width", "1px");
			checkElementProperty(buttonWarning, "border-right-width", "1px");
			checkElementProperty(buttonWarning, "border-bottom-width", "1px");
			checkElementProperty(buttonWarning, "border-left-width", "1px");

			checkElementPropertyColour(buttonDisabled, "background-color", "#ededed");
			checkElementPropertyColour(buttonDisabled, "color", "#a8a8a8");
			checkElementPropertyColour(buttonDisabled, "border-top-color", "#ededed");
			checkElementPropertyColour(buttonDisabled, "border-right-color", "#ededed");
			checkElementPropertyColour(buttonDisabled, "border-bottom-color", "#ededed");
			checkElementPropertyColour(buttonDisabled, "border-left-color", "#ededed");
			checkElementProperty(buttonDisabled, "border-top-style", "solid");
			checkElementProperty(buttonDisabled, "border-right-style", "solid");
			checkElementProperty(buttonDisabled, "border-bottom-style", "solid");
			checkElementProperty(buttonDisabled, "border-left-style", "solid");
			checkElementProperty(buttonDisabled, "border-top-width", "1px");
			checkElementProperty(buttonDisabled, "border-right-width", "1px");
			checkElementProperty(buttonDisabled, "border-bottom-width", "1px");
			checkElementProperty(buttonDisabled, "border-left-width", "1px");
			} finally {
			logErrors();
		}
	}

	/**
	 * Tests the Buttons -> Link Styles section of the CSS page
	 * 
	 * @throws Exception Throws exception thrown by a WebDriver executable
	 */
	@Test(alwaysRun = true)
	public void testLinkStyles() throws Exception {
		try {
			initialiseMethod(getClass().getCanonicalName(), Utilities.getMethodName());

			// Scroll to the required section and wait until one of the components is displayed
			String displaySection = "window.location.href=\"" + this.startingUrl + "#link-buttons" + "\"";
			Utilities.scrollToSection(driver, displaySection);
			
			WebDriverWait wait = new WebDriverWait(driver, this.displayWaitTimeMS / 1000);
			wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("uxd-css-link-buttons button.m-b.btn-link.button-secondary")));

			// Get the elements
			WebElement buttonsContainer = driver.findElement(By.cssSelector("uxd-css-link-buttons"));
			
			WebElement buttonSecondary = buttonsContainer.findElement(By.cssSelector("button.m-b.btn-link.button-secondary"));
			WebElement buttonAccent = buttonsContainer.findElement(By.cssSelector("button.m-b.btn-link.button-accent"));
			WebElement buttonWarning = buttonsContainer.findElement(By.cssSelector("button.m-b.btn-link.button-warning"));
			WebElement buttonDisabled = buttonsContainer.findElement(By.cssSelector("button.m-b.btn-link.button-secondary[disabled]"));
			
			// Ensure controls are visible for clicking
			Utilities.performVerticalScroll(driver, buttonSecondary, verticalScrollPixels);

			// Verify buttons' text
			if (this.browser.equalsIgnoreCase("edge")) {
				checkElementTrimmedText(buttonSecondary, "Secondary");
			} else {
				checkElementText(buttonSecondary, "SECONDARY");
			}
			if (this.browser.equalsIgnoreCase("edge")) {
				checkElementTrimmedText(buttonAccent, "Accent");
			} else {
				checkElementText(buttonAccent, "ACCENT");
			}
			if (this.browser.equalsIgnoreCase("ie")) {
				checkElementText(buttonWarning, "WARNINGWARNING");
			} else if (this.browser.equalsIgnoreCase("edge")) {
				checkElementTrimmedText(buttonWarning, "WarningWarning");
			} else {
				checkElementText(buttonWarning, "WARNING\nWARNING");
			}
			if (this.browser.equalsIgnoreCase("edge")) {
				checkElementTrimmedText(buttonDisabled, "Disabled");
			} else {
				checkElementText(buttonDisabled, "DISABLED");
			}

			// Verify buttons' properties
			checkElementPropertyColour(buttonSecondary, "color", "#999999");
			if (this.browser.equalsIgnoreCase("chrome")) {
				checkElementProperty(buttonSecondary, "background-color", "rgba(0, 0, 0, 0)");
			} else {
				checkElementProperty(buttonSecondary, "background-color", "transparent");
			}
			checkElementProperty(buttonSecondary, "border-top-style", "none");
			checkElementProperty(buttonSecondary, "border-right-style", "none");
			checkElementProperty(buttonSecondary, "border-bottom-style", "none");
			checkElementProperty(buttonSecondary, "border-left-style", "none");
			checkElementProperty(buttonSecondary, "border-top-width", "0px");
			checkElementProperty(buttonSecondary, "border-right-width", "0px");
			checkElementProperty(buttonSecondary, "border-bottom-width", "0px");
			checkElementProperty(buttonSecondary, "border-left-width", "0px");

			checkElementPropertyColour(buttonAccent, "color", Utilities.COLOR_ACCENT);
			if (this.browser.equalsIgnoreCase("chrome")) {
				checkElementProperty(buttonAccent, "background-color", "rgba(0, 0, 0, 0)");
			} else {
				checkElementProperty(buttonAccent, "background-color", "transparent");
			}
			checkElementProperty(buttonAccent, "border-top-style", "none");
			checkElementProperty(buttonAccent, "border-right-style", "none");
			checkElementProperty(buttonAccent, "border-bottom-style", "none");
			checkElementProperty(buttonAccent, "border-left-style", "none");
			checkElementProperty(buttonAccent, "border-top-width", "0px");
			checkElementProperty(buttonAccent, "border-right-width", "0px");
			checkElementProperty(buttonAccent, "border-bottom-width", "0px");
			checkElementProperty(buttonAccent, "border-left-width", "0px");
			
			checkElementPropertyColour(buttonWarning, "color", "#ff454f");
			if (this.browser.equalsIgnoreCase("chrome")) {
				checkElementProperty(buttonWarning, "background-color", "rgba(0, 0, 0, 0)");
			} else {
				checkElementProperty(buttonWarning, "background-color", "transparent");
			}
			checkElementProperty(buttonWarning, "border-top-style", "none");
			checkElementProperty(buttonWarning, "border-right-style", "none");
			checkElementProperty(buttonWarning, "border-bottom-style", "none");
			checkElementProperty(buttonWarning, "border-left-style", "none");
			checkElementProperty(buttonWarning, "border-top-width", "0px");
			checkElementProperty(buttonWarning, "border-right-width", "0px");
			checkElementProperty(buttonWarning, "border-bottom-width", "0px");
			checkElementProperty(buttonWarning, "border-left-width", "0px");

			checkElementPropertyColour(buttonDisabled, "color", "#c8c8c8");
			if (this.browser.equalsIgnoreCase("chrome")) {
				checkElementProperty(buttonDisabled, "background-color", "rgba(0, 0, 0, 0)");
			} else {
				checkElementProperty(buttonDisabled, "background-color", "transparent");
			}
			checkElementProperty(buttonDisabled, "border-top-style", "none");
			checkElementProperty(buttonDisabled, "border-right-style", "none");
			checkElementProperty(buttonDisabled, "border-bottom-style", "none");
			checkElementProperty(buttonDisabled, "border-left-style", "none");
			checkElementProperty(buttonDisabled, "border-top-width", "0px");
			checkElementProperty(buttonDisabled, "border-right-width", "0px");
			checkElementProperty(buttonDisabled, "border-bottom-width", "0px");
			checkElementProperty(buttonDisabled, "border-left-width", "0px");
		} finally {
			logErrors();
		}
	}
	
	/**
	 * Tests the Buttons -> Size Variations section of the CSS page
	 * 
	 * @throws Exception Throws exception thrown by a WebDriver executable
	 */
	@Test(alwaysRun = true)
	public void testSizeVariations() throws Exception {
		try {
			initialiseMethod(getClass().getCanonicalName(), Utilities.getMethodName());

			// Scroll to the required section and wait until one of the components is displayed
			String displaySection = "window.location.href=\"" + this.startingUrl + "#buttons-size-variations" + "\"";
			Utilities.scrollToSection(driver, displaySection);
			
			WebDriverWait wait = new WebDriverWait(driver, this.displayWaitTimeMS / 1000);
			wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("uxd-css-buttons-size-variation button:nth-of-type(1)")));

			// Get the Text Only elements
			WebElement buttonsContainer = driver.findElement(By.cssSelector("uxd-css-buttons-size-variation"));
			
			WebElement buttonLarge = buttonsContainer.findElement(By.cssSelector("button:nth-of-type(1)"));
			WebElement buttonMedium = buttonsContainer.findElement(By.cssSelector("button:nth-of-type(2)"));
			WebElement buttonSmall = buttonsContainer.findElement(By.cssSelector("button:nth-of-type(3)"));
			
			// Ensure controls are visible for clicking
			Utilities.performVerticalScroll(driver, buttonLarge, verticalScrollPixels);

			// Verify buttons' text
			if (this.browser.equalsIgnoreCase("edge")) {
				checkElementTrimmedText(buttonLarge, "Large");
			} else {
				checkElementText(buttonLarge, "LARGE");
			}
			if (this.browser.equalsIgnoreCase("edge")) {
				checkElementTrimmedText(buttonMedium, "Medium");
			} else {
				checkElementText(buttonMedium, "MEDIUM");
			}
			if (this.browser.equalsIgnoreCase("edge")) {
				checkElementTrimmedText(buttonSmall, "Small");
			} else {
				checkElementText(buttonSmall, "SMALL");
			}

			// Verify buttons' properties
			checkElementAttributeContainsValue(buttonLarge, "class", "\\s+", "btn-lg");
			checkElementAttributeDoesNotContainValue(buttonLarge, "class", "\\s+", "btn-sm");			
			checkElementPropertyColour(buttonLarge, "background-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonLarge, "color", "#ffffff");
			checkElementPropertyColour(buttonLarge, "border-top-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonLarge, "border-right-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonLarge, "border-bottom-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonLarge, "border-left-color", Utilities.COLOR_PRIMARY);
			checkElementProperty(buttonLarge, "border-top-style", "solid");
			checkElementProperty(buttonLarge, "border-right-style", "solid");
			checkElementProperty(buttonLarge, "border-bottom-style", "solid");
			checkElementProperty(buttonLarge, "border-left-style", "solid");
			checkElementProperty(buttonLarge, "border-top-width", "1px");
			checkElementProperty(buttonLarge, "border-right-width", "1px");
			checkElementProperty(buttonLarge, "border-bottom-width", "1px");
			checkElementProperty(buttonLarge, "border-left-width", "1px");
			if ((this.browser.equalsIgnoreCase("ie")) || (this.browser.equalsIgnoreCase("edge"))) {
				checkElementProperty(buttonLarge, "font-size", "17.93px");
			} else {
				checkElementProperty(buttonLarge, "font-size", "18px");
			}

			checkElementAttributeDoesNotContainValue(buttonMedium, "class", "\\s+", "btn-lg");
			checkElementAttributeDoesNotContainValue(buttonMedium, "class", "\\s+", "btn-sm");
			checkElementPropertyColour(buttonMedium, "background-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonMedium, "color", "#ffffff");
			checkElementPropertyColour(buttonMedium, "border-top-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonMedium, "border-right-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonMedium, "border-bottom-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonMedium, "border-left-color", Utilities.COLOR_PRIMARY);
			checkElementProperty(buttonMedium, "border-top-style", "solid");
			checkElementProperty(buttonMedium, "border-right-style", "solid");
			checkElementProperty(buttonMedium, "border-bottom-style", "solid");
			checkElementProperty(buttonMedium, "border-left-style", "solid");
			checkElementProperty(buttonMedium, "border-top-width", "1px");
			checkElementProperty(buttonMedium, "border-right-width", "1px");
			checkElementProperty(buttonMedium, "border-bottom-width", "1px");
			checkElementProperty(buttonMedium, "border-left-width", "1px");
			if ((this.browser.equalsIgnoreCase("ie")) || (this.browser.equalsIgnoreCase("edge"))) {
				checkElementProperty(buttonMedium, "font-size", "13.93px");
			} else {
				checkElementProperty(buttonMedium, "font-size", "14px");
			}

			checkElementAttributeDoesNotContainValue(buttonSmall, "class", "\\s+", "btn-lg");
			checkElementAttributeContainsValue(buttonSmall, "class", "\\s+", "btn-sm");
			checkElementPropertyColour(buttonSmall, "background-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonSmall, "color", "#ffffff");
			checkElementPropertyColour(buttonSmall, "border-top-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonSmall, "border-right-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonSmall, "border-bottom-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonSmall, "border-left-color", Utilities.COLOR_PRIMARY);
			checkElementProperty(buttonSmall, "border-top-style", "solid");
			checkElementProperty(buttonSmall, "border-right-style", "solid");
			checkElementProperty(buttonSmall, "border-bottom-style", "solid");
			checkElementProperty(buttonSmall, "border-left-style", "solid");
			checkElementProperty(buttonSmall, "border-top-width", "1px");
			checkElementProperty(buttonSmall, "border-right-width", "1px");
			checkElementProperty(buttonSmall, "border-bottom-width", "1px");
			checkElementProperty(buttonSmall, "border-left-width", "1px");
			checkElementProperty(buttonSmall, "font-size", "12px");

			// Get the Text & Icon elements
			buttonLarge = buttonsContainer.findElement(By.cssSelector("button:nth-of-type(4)"));
			buttonMedium = buttonsContainer.findElement(By.cssSelector("button:nth-of-type(5)"));
			buttonSmall = buttonsContainer.findElement(By.cssSelector("button:nth-of-type(6)"));
			
			WebElement spanLarge = buttonLarge.findElement(By.cssSelector("span.hpe-icon"));
			WebElement spanMedium = buttonMedium.findElement(By.cssSelector("span.hpe-icon"));
			WebElement spanSmall = buttonSmall.findElement(By.cssSelector("span.hpe-icon"));

			// Ensure controls are visible for clicking
			Utilities.performVerticalScroll(driver, buttonLarge, verticalScrollPixels);

			// Verify buttons' text
			if (this.browser.equalsIgnoreCase("edge")) {
				checkElementTrimmedText(buttonLarge, "Large");
			} else {
				checkElementTrimmedText(buttonLarge, "LARGE");
			}
			if (this.browser.equalsIgnoreCase("edge")) {
				checkElementTrimmedText(buttonMedium, "Medium");
			} else {
				checkElementTrimmedText(buttonMedium, "MEDIUM");
			}
			if (this.browser.equalsIgnoreCase("edge")) {
				checkElementTrimmedText(buttonSmall, "Small");
			} else {
				checkElementTrimmedText(buttonSmall, "SMALL");
			}
			
			// Verify buttons' properties
			checkElementAttributeContainsValue(buttonLarge, "class", "\\s+", "btn-lg");
			checkElementAttributeDoesNotContainValue(buttonLarge, "class", "\\s+", "btn-sm");
			checkElementPropertyColour(buttonLarge, "background-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonLarge, "color", "#ffffff");
			checkElementPropertyColour(buttonLarge, "border-top-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonLarge, "border-right-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonLarge, "border-bottom-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonLarge, "border-left-color", Utilities.COLOR_PRIMARY);
			checkElementProperty(buttonLarge, "border-top-style", "solid");
			checkElementProperty(buttonLarge, "border-right-style", "solid");
			checkElementProperty(buttonLarge, "border-bottom-style", "solid");
			checkElementProperty(buttonLarge, "border-left-style", "solid");
			checkElementProperty(buttonLarge, "border-top-width", "1px");
			checkElementProperty(buttonLarge, "border-right-width", "1px");
			checkElementProperty(buttonLarge, "border-bottom-width", "1px");
			checkElementProperty(buttonLarge, "border-left-width", "1px");
			if ((this.browser.equalsIgnoreCase("ie")) || (this.browser.equalsIgnoreCase("edge"))) {
				checkElementProperty(buttonLarge, "font-size", "17.93px");
			} else {
				checkElementProperty(buttonLarge, "font-size", "18px");
			}
			checkElementAttributeContainsValue(spanLarge, "class", "\\s+", "hpe-add");

			checkElementAttributeDoesNotContainValue(buttonMedium, "class", "\\s+", "btn-lg");
			checkElementAttributeDoesNotContainValue(buttonMedium, "class", "\\s+", "btn-sm");
			checkElementPropertyColour(buttonMedium, "background-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonMedium, "color", "#ffffff");
			checkElementPropertyColour(buttonMedium, "border-top-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonMedium, "border-right-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonMedium, "border-bottom-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonMedium, "border-left-color", Utilities.COLOR_PRIMARY);
			checkElementProperty(buttonMedium, "border-top-style", "solid");
			checkElementProperty(buttonMedium, "border-right-style", "solid");
			checkElementProperty(buttonMedium, "border-bottom-style", "solid");
			checkElementProperty(buttonMedium, "border-left-style", "solid");
			checkElementProperty(buttonMedium, "border-top-width", "1px");
			checkElementProperty(buttonMedium, "border-right-width", "1px");
			checkElementProperty(buttonMedium, "border-bottom-width", "1px");
			checkElementProperty(buttonMedium, "border-left-width", "1px");
			if ((this.browser.equalsIgnoreCase("ie")) || (this.browser.equalsIgnoreCase("edge"))) {
				checkElementProperty(buttonMedium, "font-size", "13.93px");
			} else {
				checkElementProperty(buttonMedium, "font-size", "14px");
			}
			checkElementAttributeContainsValue(spanMedium, "class", "\\s+", "hpe-add");

			checkElementAttributeDoesNotContainValue(buttonSmall, "class", "\\s+", "btn-lg");
			checkElementAttributeContainsValue(buttonSmall, "class", "\\s+", "btn-sm");
			checkElementPropertyColour(buttonSmall, "background-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonSmall, "color", "#ffffff");
			checkElementPropertyColour(buttonSmall, "border-top-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonSmall, "border-right-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonSmall, "border-bottom-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonSmall, "border-left-color", Utilities.COLOR_PRIMARY);
			checkElementProperty(buttonSmall, "border-top-style", "solid");
			checkElementProperty(buttonSmall, "border-right-style", "solid");
			checkElementProperty(buttonSmall, "border-bottom-style", "solid");
			checkElementProperty(buttonSmall, "border-left-style", "solid");
			checkElementProperty(buttonSmall, "border-top-width", "1px");
			checkElementProperty(buttonSmall, "border-right-width", "1px");
			checkElementProperty(buttonSmall, "border-bottom-width", "1px");
			checkElementProperty(buttonSmall, "border-left-width", "1px");
			checkElementProperty(buttonSmall, "font-size", "12px");
			checkElementAttributeContainsValue(spanSmall, "class", "\\s+", "hpe-add");

			// Get the Icon Only elements
			buttonLarge = buttonsContainer.findElement(By.cssSelector("button:nth-of-type(7)"));
			buttonMedium = buttonsContainer.findElement(By.cssSelector("button:nth-of-type(8)"));
			buttonSmall = buttonsContainer.findElement(By.cssSelector("button:nth-of-type(9)"));
			
			spanLarge = buttonLarge.findElement(By.cssSelector("span.hpe-icon"));
			spanMedium = buttonMedium.findElement(By.cssSelector("span.hpe-icon"));
			spanSmall = buttonSmall.findElement(By.cssSelector("span.hpe-icon"));

			// Ensure controls are visible for clicking
			Utilities.performVerticalScroll(driver, buttonLarge, verticalScrollPixels);

			// Verify buttons' properties
			checkElementAttributeContainsValue(buttonLarge, "class", "\\s+", "btn-lg");
			checkElementAttributeDoesNotContainValue(buttonLarge, "class", "\\s+", "btn-sm");
			checkElementPropertyColour(buttonLarge, "background-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonLarge, "color", "#ffffff");
			checkElementPropertyColour(buttonLarge, "border-top-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonLarge, "border-right-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonLarge, "border-bottom-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonLarge, "border-left-color", Utilities.COLOR_PRIMARY);
			checkElementProperty(buttonLarge, "border-top-style", "solid");
			checkElementProperty(buttonLarge, "border-right-style", "solid");
			checkElementProperty(buttonLarge, "border-bottom-style", "solid");
			checkElementProperty(buttonLarge, "border-left-style", "solid");
			checkElementProperty(buttonLarge, "border-top-width", "1px");
			checkElementProperty(buttonLarge, "border-right-width", "1px");
			checkElementProperty(buttonLarge, "border-bottom-width", "1px");
			checkElementProperty(buttonLarge, "border-left-width", "1px");
			if ((this.browser.equalsIgnoreCase("ie")) || (this.browser.equalsIgnoreCase("edge"))) {
				checkElementProperty(buttonLarge, "font-size", "17.93px");
			} else {
				checkElementProperty(buttonLarge, "font-size", "18px");
			}
			checkElementAttributeContainsValue(spanLarge, "class", "\\s+", "hpe-add");

			checkElementAttributeDoesNotContainValue(buttonMedium, "class", "\\s+", "btn-lg");
			checkElementAttributeDoesNotContainValue(buttonMedium, "class", "\\s+", "btn-sm");
			checkElementPropertyColour(buttonMedium, "background-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonMedium, "color", "#ffffff");
			checkElementPropertyColour(buttonMedium, "border-top-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonMedium, "border-right-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonMedium, "border-bottom-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonMedium, "border-left-color", Utilities.COLOR_PRIMARY);
			checkElementProperty(buttonMedium, "border-top-style", "solid");
			checkElementProperty(buttonMedium, "border-right-style", "solid");
			checkElementProperty(buttonMedium, "border-bottom-style", "solid");
			checkElementProperty(buttonMedium, "border-left-style", "solid");
			checkElementProperty(buttonMedium, "border-top-width", "1px");
			checkElementProperty(buttonMedium, "border-right-width", "1px");
			checkElementProperty(buttonMedium, "border-bottom-width", "1px");
			checkElementProperty(buttonMedium, "border-left-width", "1px");
			if ((this.browser.equalsIgnoreCase("ie")) || (this.browser.equalsIgnoreCase("edge"))) {
				checkElementProperty(buttonMedium, "font-size", "13.93px");
			} else {
				checkElementProperty(buttonMedium, "font-size", "14px");
			}
			checkElementAttributeContainsValue(spanMedium, "class", "\\s+", "hpe-add");

			checkElementAttributeDoesNotContainValue(buttonSmall, "class", "\\s+", "btn-lg");
			checkElementAttributeContainsValue(buttonSmall, "class", "\\s+", "btn-sm");
			checkElementPropertyColour(buttonSmall, "background-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonSmall, "color", "#ffffff");
			checkElementPropertyColour(buttonSmall, "border-top-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonSmall, "border-right-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonSmall, "border-bottom-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonSmall, "border-left-color", Utilities.COLOR_PRIMARY);
			checkElementProperty(buttonSmall, "border-top-style", "solid");
			checkElementProperty(buttonSmall, "border-right-style", "solid");
			checkElementProperty(buttonSmall, "border-bottom-style", "solid");
			checkElementProperty(buttonSmall, "border-left-style", "solid");
			checkElementProperty(buttonSmall, "border-top-width", "1px");
			checkElementProperty(buttonSmall, "border-right-width", "1px");
			checkElementProperty(buttonSmall, "border-bottom-width", "1px");
			checkElementProperty(buttonSmall, "border-left-width", "1px");
			checkElementProperty(buttonSmall, "font-size", "12px");
			checkElementAttributeContainsValue(spanSmall, "class", "\\s+", "hpe-add");
		} finally {
			logErrors();
		}
	}

	/**
	 * Tests the Buttons -> Circular Icon Buttons section of the CSS page
	 * 
	 * @throws Exception Throws exception thrown by a WebDriver executable
	 */
	@Test(alwaysRun = true)
	public void testCircularIconButtons() throws Exception {
		try {
			initialiseMethod(getClass().getCanonicalName(), Utilities.getMethodName());

			// Scroll to the required section and wait until one of the components is displayed
			String displaySection = "window.location.href=\"" + this.startingUrl + "#circular-icon-buttons" + "\"";
			Utilities.scrollToSection(driver, displaySection);
			
			WebDriverWait wait = new WebDriverWait(driver, this.displayWaitTimeMS / 1000);
			wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("uxd-css-buttons-circular-icon-buttons button.btn.button-primary.btn-lg")));

			// Get the elements
			WebElement buttonsContainer = driver.findElement(By.cssSelector("uxd-css-buttons-circular-icon-buttons"));
			
			WebElement buttonLarge = buttonsContainer.findElement(By.cssSelector("button:nth-of-type(1)"));
			WebElement buttonMedium = buttonsContainer.findElement(By.cssSelector("button:nth-of-type(2)"));
			WebElement buttonSmall = buttonsContainer.findElement(By.cssSelector("button:nth-of-type(3)"));
			
			WebElement spanLarge = buttonLarge.findElement(By.cssSelector("span.hpe-icon"));
			WebElement spanMedium = buttonMedium.findElement(By.cssSelector("span.hpe-icon"));
			WebElement spanSmall = buttonSmall.findElement(By.cssSelector("span.hpe-icon"));

			// Ensure controls are visible for clicking
			Utilities.performVerticalScroll(driver, buttonLarge, verticalScrollPixels);

			// Verify buttons' properties
			checkElementAttributeContainsValue(buttonLarge, "class", "\\s+", "btn-lg");
			checkElementAttributeDoesNotContainValue(buttonLarge, "class", "\\s+", "btn-sm");
			checkElementPropertyColour(buttonLarge, "background-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonLarge, "color", "#ffffff");
			checkElementPropertyColour(buttonLarge, "border-top-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonLarge, "border-right-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonLarge, "border-bottom-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonLarge, "border-left-color", Utilities.COLOR_PRIMARY);
			checkElementProperty(buttonLarge, "border-top-style", "solid");
			checkElementProperty(buttonLarge, "border-right-style", "solid");
			checkElementProperty(buttonLarge, "border-bottom-style", "solid");
			checkElementProperty(buttonLarge, "border-left-style", "solid");
			checkElementProperty(buttonLarge, "border-top-width", "1px");
			checkElementProperty(buttonLarge, "border-right-width", "1px");
			checkElementProperty(buttonLarge, "border-bottom-width", "1px");
			checkElementProperty(buttonLarge, "border-left-width", "1px");
			checkElementProperty(buttonLarge, "padding-top", "6px");
			checkElementProperty(buttonLarge, "padding-right", "10px");
			checkElementProperty(buttonLarge, "padding-bottom", "6px");
			checkElementProperty(buttonLarge, "padding-left", "10px");
			checkElementProperty(buttonLarge, "border-top-left-radius", "50%");
			checkElementProperty(buttonLarge, "border-top-right-radius", "50%");
			checkElementProperty(buttonLarge, "border-bottom-right-radius", "50%");
			checkElementProperty(buttonLarge, "border-bottom-left-radius", "50%");
			checkElementAttributeContainsValue(spanLarge, "class", "\\s+", "hpe-contract");

			checkElementAttributeDoesNotContainValue(buttonMedium, "class", "\\s+", "btn-lg");
			checkElementAttributeDoesNotContainValue(buttonMedium, "class", "\\s+", "btn-sm");
			checkElementPropertyColour(buttonMedium, "background-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonMedium, "color", "#ffffff");
			checkElementPropertyColour(buttonMedium, "border-top-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonMedium, "border-right-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonMedium, "border-bottom-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonMedium, "border-left-color", Utilities.COLOR_PRIMARY);
			checkElementProperty(buttonMedium, "border-top-style", "solid");
			checkElementProperty(buttonMedium, "border-right-style", "solid");
			checkElementProperty(buttonMedium, "border-bottom-style", "solid");
			checkElementProperty(buttonMedium, "border-left-style", "solid");
			checkElementProperty(buttonMedium, "border-top-width", "1px");
			checkElementProperty(buttonMedium, "border-right-width", "1px");
			checkElementProperty(buttonMedium, "border-bottom-width", "1px");
			checkElementProperty(buttonMedium, "border-left-width", "1px");
			checkElementProperty(buttonMedium, "padding-top", "4px");
			checkElementProperty(buttonMedium, "padding-right", "7px");
			checkElementProperty(buttonMedium, "padding-bottom", "4px");
			checkElementProperty(buttonMedium, "padding-left", "7px");
			checkElementProperty(buttonMedium, "border-top-left-radius", "50%");
			checkElementProperty(buttonMedium, "border-top-right-radius", "50%");
			checkElementProperty(buttonMedium, "border-bottom-right-radius", "50%");
			checkElementProperty(buttonMedium, "border-bottom-left-radius", "50%");
			checkElementAttributeContainsValue(spanMedium, "class", "\\s+", "hpe-contract");

			checkElementAttributeDoesNotContainValue(buttonSmall, "class", "\\s+", "btn-lg");
			checkElementAttributeContainsValue(buttonSmall, "class", "\\s+", "btn-sm");
			checkElementPropertyColour(buttonSmall, "background-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonSmall, "color", "#ffffff");
			checkElementPropertyColour(buttonSmall, "border-top-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonSmall, "border-right-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonSmall, "border-bottom-color", Utilities.COLOR_PRIMARY);
			checkElementPropertyColour(buttonSmall, "border-left-color", Utilities.COLOR_PRIMARY);
			checkElementProperty(buttonSmall, "border-top-style", "solid");
			checkElementProperty(buttonSmall, "border-right-style", "solid");
			checkElementProperty(buttonSmall, "border-bottom-style", "solid");
			checkElementProperty(buttonSmall, "border-left-style", "solid");
			checkElementProperty(buttonSmall, "border-top-width", "1px");
			checkElementProperty(buttonSmall, "border-right-width", "1px");
			checkElementProperty(buttonSmall, "border-bottom-width", "1px");
			checkElementProperty(buttonSmall, "border-left-width", "1px");
			checkElementProperty(buttonSmall, "padding-top", "0px");
			checkElementProperty(buttonSmall, "padding-right", "0px");
			checkElementProperty(buttonSmall, "padding-bottom", "0px");
			checkElementProperty(buttonSmall, "padding-left", "0px");
			checkElementProperty(buttonSmall, "border-top-left-radius", "50%");
			checkElementProperty(buttonSmall, "border-top-right-radius", "50%");
			checkElementProperty(buttonSmall, "border-bottom-right-radius", "50%");
			checkElementProperty(buttonSmall, "border-bottom-left-radius", "50%");
			checkElementAttributeContainsValue(spanSmall, "class", "\\s+", "hpe-contract");
		} finally {
			logErrors();
		}
	}

	/**
	 * Tests the Buttons -> Hyperlinks section of the CSS page
	 * 
	 * @throws Exception Throws exception thrown by a WebDriver executable
	 */
	@Test(alwaysRun = true)
	public void testHyperlinks() throws Exception {
		try {
			initialiseMethod(getClass().getCanonicalName(), Utilities.getMethodName());

			// Scroll to the required section and wait until one of the components is displayed
			String displaySection = "window.location.href=\"" + this.startingUrl + "#hyperlinks" + "\"";
			Utilities.scrollToSection(driver, displaySection);
			
			WebDriverWait wait = new WebDriverWait(driver, this.displayWaitTimeMS / 1000);
			wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("uxd-css-buttons-hyperlinks a.hyperlink")));

			// Get the elements
			WebElement linksContainer = driver.findElement(By.cssSelector("uxd-css-buttons-hyperlinks"));
			
			WebElement linkText = linksContainer.findElement(By.cssSelector("a.hyperlink"));
			
			WebElement linkFirstLink = linksContainer.findElement(By.cssSelector("a:nth-of-type(2)"));
			WebElement linkSecondLink = linksContainer.findElement(By.cssSelector("a:nth-of-type(3)"));
			WebElement linkThirdLink = linksContainer.findElement(By.cssSelector("a:nth-of-type(4)"));
			WebElement linkFourthLink = linksContainer.findElement(By.cssSelector("a:nth-of-type(5)"));
			
			// Ensure controls are visible for clicking
			Utilities.performVerticalScroll(driver, linkText, verticalScrollPixels);

			// Verify existence of first link
			checkElementText(linkText, "Text");
			checkElementAttributeContainsValue(linkText, "class", "\\s+", "hyperlink");
			
			// Verify link's properties
			checkElementPropertyColour(linkText, "color", new String [] {"#333333", "#585858"});
			checkElementProperty(linkText, "background-color", new String [] {"#000000", "transparent", "rgba(0, 0, 0, 0)"});
			checkElementProperty(linkText, "border-bottom-width", new String [] {"0px", "2px"});
			checkElementProperty(linkText, "border-bottom-style", new String [] {"none", "dotted"});
			checkElementPropertyColour(linkText, "border-bottom-color", new String [] {"#333333", Utilities.COLOR_PRIMARY});
			
			// Verify existence of second set of links
			checkElementText(linkFirstLink, "First Link");
			checkElementAttributeContainsValue(linkFirstLink, "class", "\\s+", "hyperlink-hover");
			
			checkElementText(linkSecondLink, "Second Link");
			checkElementAttributeContainsValue(linkSecondLink, "class", "\\s+", "hyperlink-hover");
			
			checkElementText(linkThirdLink, "Third Link");
			checkElementAttributeContainsValue(linkThirdLink, "class", "\\s+", "hyperlink-hover");
			
			checkElementText(linkFourthLink, "Fourth Link");
			checkElementAttributeContainsValue(linkFourthLink, "class", "\\s+", "hyperlink-hover");
			
			// Verify links' properties			
			checkElementPropertyColour(linkFirstLink, "color", "#585858");
			checkElementPropertyColour(linkFirstLink, "background-color", "#000000");
			
			checkElementPropertyColour(linkSecondLink, "color", "#585858");
			checkElementPropertyColour(linkSecondLink, "background-color", "#000000");
			
			checkElementPropertyColour(linkThirdLink, "color", "#585858");
			checkElementPropertyColour(linkThirdLink, "background-color", "#000000");
			
			checkElementPropertyColour(linkFourthLink, "color", "#585858");
			checkElementPropertyColour(linkFourthLink, "background-color", "#000000");
		} finally {
			logErrors();
		}
	}

	/**
	 * Tests the Buttons -> Button Dropdowns section of the CSS page
	 * 
	 * @throws Exception Throws exception thrown by a WebDriver executable
	 */
	@Test(alwaysRun = true)
	public void testButtonDropdowns() throws Exception {
		try {
			initialiseMethod(getClass().getCanonicalName(), Utilities.getMethodName());
			
			if (this.browser.equalsIgnoreCase("edge")) {return;}
			
			// Scroll to the required section and wait until one of the components is displayed
			String displaySection = "window.location.href=\"" + this.startingUrl + "#button-dropdowns" + "\"";
			Utilities.scrollToSection(driver, displaySection);
			
			WebDriverWait wait = new WebDriverWait(driver, this.displayWaitTimeMS / 1000);
			wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("uxd-css-button-dropdowns div:nth-of-type(1).btn-group button.button-primary")));

			// Get the elements
			WebElement buttonsContainer = driver.findElement(By.cssSelector("uxd-css-button-dropdowns"));
			
			WebElement buttonTopLeft = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(1).btn-group button.button-primary"));
			WebElement buttonTopRight = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(2).btn-group button.button-secondary"));
			WebElement buttonMiddleLeft = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(3).btn-group button.button-primary"));
			WebElement buttonMiddleRight = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(4).btn-group button.button-secondary"));
			WebElement buttonBottomLeft = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(5).btn-group button.button-primary"));
			WebElement buttonBottomRight = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(6).btn-group button.button-secondary"));
			
			// Ensure controls are visible for clicking
			Utilities.performVerticalScroll(driver, buttonTopLeft, verticalScrollPixels);

			// Verify first button text
			if (this.browser.equalsIgnoreCase("edge")) {
				checkElementTrimmedText(buttonTopLeft, "Action");
			} else {
				checkElementText(buttonTopLeft, "ACTION");
			}

			// Click on the first dropdown
			buttonTopLeft.click();
			
			WebElement dropdown = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(1).btn-group ul"));
			WebElement link1 = dropdown.findElement(By.cssSelector("li:nth-child(1) a"));
			WebElement link2 = dropdown.findElement(By.cssSelector("li:nth-child(2) a"));
			WebElement link3 = dropdown.findElement(By.cssSelector("li:nth-child(3) a"));
			WebElement link4 = dropdown.findElement(By.cssSelector("li:nth-child(5) a"));

			// Verify menu item's titles
			checkElementText(link1, "Action");
			checkElementText(link2, "Another action");
			checkElementText(link3, "Something else here");
			checkElementText(link4, "Separated link");

			// Verify menu items' links
			checkElementLinkAttribute(link1, this.rootUrl + "/#/");
			checkElementLinkAttribute(link2, this.rootUrl + "/#/");
			checkElementLinkAttribute(link3, this.rootUrl + "/#/");
			checkElementLinkAttribute(link4, this.rootUrl + "/#/");

			// Click on the first menu item and verify the location
			dropdown.findElement(By.cssSelector("li:nth-child(1)")).click();
			checkPageTitle("UX Aspects Documentation");

			// Verify second button text
			if (this.browser.equalsIgnoreCase("edge")) {
				checkElementTrimmedText(buttonTopRight, "Action");
			} else {
				checkElementText(buttonTopRight, "ACTION");
			}

			// Click on the second dropdown
			buttonTopRight.click();
			
			dropdown = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(2).btn-group ul"));
			link1 = dropdown.findElement(By.cssSelector("li:nth-child(1) a"));
			link2 = dropdown.findElement(By.cssSelector("li:nth-child(2) a"));
			link3 = dropdown.findElement(By.cssSelector("li:nth-child(3) a"));
			link4 = dropdown.findElement(By.cssSelector("li:nth-child(5) a"));

			// Verify menu item's titles
			checkElementText(link1, "Action");
			checkElementText(link2, "Another action");
			checkElementText(link3, "Something else here");
			checkElementText(link4, "Separated link");

			// Verify menu items' links
			checkElementLinkAttribute(link1, this.rootUrl + "/#/");
			checkElementLinkAttribute(link2, this.rootUrl + "/#/");
			checkElementLinkAttribute(link3, this.rootUrl + "/#/");
			checkElementLinkAttribute(link4, this.rootUrl + "/#/");

			// Click on the second menu item and verify the location
			dropdown.findElement(By.cssSelector("li:nth-child(2)")).click();
			checkPageTitle("UX Aspects Documentation");

			// Verify third button text
			if (this.browser.equalsIgnoreCase("edge")) {
				checkElementTrimmedText(buttonMiddleLeft, "Action");
			} else {
				checkElementText(buttonMiddleLeft, "ACTION");
			}

			// Click on the third dropdown
			buttonMiddleLeft.click();
			
			dropdown = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(3).btn-group ul"));
			link1 = dropdown.findElement(By.cssSelector("li:nth-child(1) a"));
			link2 = dropdown.findElement(By.cssSelector("li:nth-child(2) a"));
			link3 = dropdown.findElement(By.cssSelector("li:nth-child(3) a"));
			link4 = dropdown.findElement(By.cssSelector("li:nth-child(5) a"));

			// Verify menu item's titles
			checkElementText(link1, "Action");
			checkElementText(link2, "Another action");
			checkElementText(link3, "Something else here");
			checkElementText(link4, "Separated link");

			// Verify menu items' links
			checkElementLinkAttribute(link1, this.rootUrl + "/#/");
			checkElementLinkAttribute(link2, this.rootUrl + "/#/");
			checkElementLinkAttribute(link3, this.rootUrl + "/#/");
			checkElementLinkAttribute(link4, this.rootUrl + "/#/");

			// Click on the third menu item and verify the location
			dropdown.findElement(By.cssSelector("li:nth-child(3)")).click();
			checkPageTitle("UX Aspects Documentation");

			// Verify fourth button text
			if (this.browser.equalsIgnoreCase("edge")) {
				checkElementTrimmedText(buttonMiddleRight, "Action");
			} else {
				checkElementText(buttonMiddleRight, "ACTION");
			}

			// Click on the fourth dropdown
			buttonMiddleRight.click();
			
			dropdown = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(4).btn-group ul"));
			link1 = dropdown.findElement(By.cssSelector("li:nth-child(1) a"));
			link2 = dropdown.findElement(By.cssSelector("li:nth-child(2) a"));
			link3 = dropdown.findElement(By.cssSelector("li:nth-child(3) a"));
			link4 = dropdown.findElement(By.cssSelector("li:nth-child(5) a"));

			// Verify menu item's titles
			checkElementText(link1, "Action");
			checkElementText(link2, "Another action");
			checkElementText(link3, "Something else here");
			checkElementText(link4, "Separated link");

			// Verify menu items' links
			checkElementLinkAttribute(link1, this.rootUrl + "/#/");
			checkElementLinkAttribute(link2, this.rootUrl + "/#/");
			checkElementLinkAttribute(link3, this.rootUrl + "/#/");
			checkElementLinkAttribute(link4, this.rootUrl + "/#/");

			// Click on the fourth menu item and verify the location
			dropdown.findElement(By.cssSelector("li:nth-child(5)")).click();
			checkPageTitle("UX Aspects Documentation");

			// Verify fifth button text
			if (this.browser.equalsIgnoreCase("edge")) {
				checkElementTrimmedText(buttonBottomLeft, "Action");
			} else {
				checkElementText(buttonBottomLeft, "ACTION");
			}

			// Click on the fifth dropdown
			buttonBottomLeft.click();
			
			dropdown = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(5).btn-group ul"));
			link1 = dropdown.findElement(By.cssSelector("li:nth-child(1) a"));
			link2 = dropdown.findElement(By.cssSelector("li:nth-child(2) a"));
			link3 = dropdown.findElement(By.cssSelector("li:nth-child(3) a"));
			link4 = dropdown.findElement(By.cssSelector("li:nth-child(5) a"));

			// Verify menu item's titles
			checkElementText(link1, "Action");
			checkElementText(link2, "Another action");
			checkElementText(link3, "Something else here");
			checkElementText(link4, "Separated link");

			// Verify menu items' links
			checkElementLinkAttribute(link1, this.rootUrl + "/#/");
			checkElementLinkAttribute(link2, this.rootUrl + "/#/");
			checkElementLinkAttribute(link3, this.rootUrl + "/#/");
			checkElementLinkAttribute(link4, this.rootUrl + "/#/");

			// Click on the first menu item and verify the location
			dropdown.findElement(By.cssSelector("li:nth-child(1)")).click();
			checkPageTitle("UX Aspects Documentation");

			// Verify sixth button text
			if (this.browser.equalsIgnoreCase("edge")) {
				checkElementTrimmedText(buttonBottomRight, "Action");
			} else {
				checkElementText(buttonBottomRight, "ACTION");
			}

			// Click on the sixth dropdown
			buttonBottomRight.click();
			
			dropdown = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(6).btn-group ul"));
			link1 = dropdown.findElement(By.cssSelector("li:nth-child(1) a"));
			link2 = dropdown.findElement(By.cssSelector("li:nth-child(2) a"));
			link3 = dropdown.findElement(By.cssSelector("li:nth-child(3) a"));
			link4 = dropdown.findElement(By.cssSelector("li:nth-child(5) a"));

			// Verify menu item's titles
			checkElementText(link1, "Action");
			checkElementText(link2, "Another action");
			checkElementText(link3, "Something else here");
			checkElementText(link4, "Separated link");

			// Verify menu items' links
			checkElementLinkAttribute(link1, this.rootUrl + "/#/");
			checkElementLinkAttribute(link2, this.rootUrl + "/#/");
			checkElementLinkAttribute(link3, this.rootUrl + "/#/");
			checkElementLinkAttribute(link4, this.rootUrl + "/#/");

			// Click on the second menu item and verify the location
			dropdown.findElement(By.cssSelector("li:nth-child(2)")).click();
			checkPageTitle("UX Aspects Documentation");
		} finally {
			logErrors();
		}
	}

	/**
	 * Tests the Buttons -> Split Button Dropdowns section of the CSS page
	 * 
	 * @throws Exception Throws exception thrown by a WebDriver executable
	 */
	@Test(alwaysRun = true)
	public void testSplitButtonDropdowns() throws Exception {
		try {
			initialiseMethod(getClass().getCanonicalName(), Utilities.getMethodName());
			
			if (this.browser.equalsIgnoreCase("edge")) {return;}

			// Scroll to the required section and wait until one of the components is displayed
			String displaySection = "window.location.href=\"" + this.startingUrl + "#split-button-dropdowns" + "\"";
			Utilities.scrollToSection(driver, displaySection);
			
			WebDriverWait wait = new WebDriverWait(driver, this.displayWaitTimeMS / 1000);
			wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("uxd-css-split-button-dropdowns div.btn-group button.button-primary")));

			// Get the elements
			WebElement buttonsContainer = driver.findElement(By.cssSelector("uxd-css-split-button-dropdowns"));
			
			WebElement buttonTopLeft = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(1).btn-group button:nth-of-type(1)"));
			WebElement buttonTopRight = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(2).btn-group button:nth-of-type(1)"));
			WebElement buttonMiddleLeft = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(3).btn-group button:nth-of-type(1)"));
			WebElement buttonMiddleRight = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(4).btn-group button:nth-of-type(1)"));
			WebElement buttonBottomLeft = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(5).btn-group button:nth-of-type(1)"));
			WebElement buttonBottomRight = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(6).btn-group button:nth-of-type(1)"));
			
			WebElement dropdownTopLeft = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(1).btn-group button:nth-of-type(2)"));
			WebElement dropdownTopRight = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(2).btn-group button:nth-of-type(2)"));
			WebElement dropdownMiddleLeft = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(3).btn-group button:nth-of-type(2)"));
			WebElement dropdownMiddleRight = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(4).btn-group button:nth-of-type(2)"));
			WebElement dropdownBottomLeft = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(5).btn-group button:nth-of-type(2)"));
			WebElement dropdownBottomRight = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(6).btn-group button:nth-of-type(2)"));
			
			// Ensure controls are visible for clicking
			Utilities.performVerticalScroll(driver, buttonTopLeft, verticalScrollPixels);

			if (this.browser.equalsIgnoreCase("edge")) {
				checkElementText(buttonTopLeft, "Action");
			} else {
				checkElementText(buttonTopLeft, "ACTION");
			}

			// Click on the first dropdown
			dropdownTopLeft.click();

			WebElement dropdown = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(1).btn-group ul"));
			WebElement link1 = dropdown.findElement(By.cssSelector("li:nth-child(1) a"));
			WebElement link2 = dropdown.findElement(By.cssSelector("li:nth-child(2) a"));
			WebElement link3 = dropdown.findElement(By.cssSelector("li:nth-child(3) a"));
			WebElement link4 = dropdown.findElement(By.cssSelector("li:nth-child(5) a"));

			// Verify menu item's titles
			checkElementText(link1, "Action");
			checkElementText(link2, "Another action");
			checkElementText(link3, "Something else here");
			checkElementText(link4, "Separated link");

			// Verify menu items' links
			checkElementLinkAttribute(link1, this.rootUrl + "/#/");
			checkElementLinkAttribute(link2, this.rootUrl + "/#/");
			checkElementLinkAttribute(link3, this.rootUrl + "/#/");
			checkElementLinkAttribute(link4, this.rootUrl + "/#/");

			// Click on the first menu item and verify the location
			dropdown.findElement(By.cssSelector("li:nth-child(1)")).click();
			checkPageTitle("UX Aspects Documentation");

			if (this.browser.equalsIgnoreCase("edge")) {
				checkElementText(buttonTopRight, "Action");
			} else {
				checkElementText(buttonTopRight, "ACTION");
			}

			// Click on the second dropdown
			dropdownTopRight.click();

			dropdown = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(2).btn-group ul"));
			link1 = dropdown.findElement(By.cssSelector("li:nth-child(1) a"));
			link2 = dropdown.findElement(By.cssSelector("li:nth-child(2) a"));
			link3 = dropdown.findElement(By.cssSelector("li:nth-child(3) a"));
			link4 = dropdown.findElement(By.cssSelector("li:nth-child(5) a"));

			// Verify menu item's titles
			checkElementText(link1, "Action");
			checkElementText(link2, "Another action");
			checkElementText(link3, "Something else here");
			checkElementText(link4, "Separated link");

			// Verify menu items' links
			checkElementLinkAttribute(link1, this.rootUrl + "/#/");
			checkElementLinkAttribute(link2, this.rootUrl + "/#/");
			checkElementLinkAttribute(link3, this.rootUrl + "/#/");
			checkElementLinkAttribute(link4, this.rootUrl + "/#/");

			// Click on the second menu item and verify the location
			dropdown.findElement(By.cssSelector("li:nth-child(2)")).click();
			checkPageTitle("UX Aspects Documentation");

			if (this.browser.equalsIgnoreCase("edge")) {
				checkElementText(buttonMiddleLeft, "Action");
			} else {
				checkElementText(buttonMiddleLeft, "ACTION");
			}

			// Click on the third dropdown
			dropdownMiddleLeft.click();

			dropdown = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(3).btn-group ul"));
			link1 = dropdown.findElement(By.cssSelector("li:nth-child(1) a"));
			link2 = dropdown.findElement(By.cssSelector("li:nth-child(2) a"));
			link3 = dropdown.findElement(By.cssSelector("li:nth-child(3) a"));
			link4 = dropdown.findElement(By.cssSelector("li:nth-child(5) a"));

			// Verify menu item's titles
			checkElementText(link1, "Action");
			checkElementText(link2, "Another action");
			checkElementText(link3, "Something else here");
			checkElementText(link4, "Separated link");

			// Verify menu items' links
			checkElementLinkAttribute(link1, this.rootUrl + "/#/");
			checkElementLinkAttribute(link2, this.rootUrl + "/#/");
			checkElementLinkAttribute(link3, this.rootUrl + "/#/");
			checkElementLinkAttribute(link4, this.rootUrl + "/#/");

			// Click on the third menu item and verify the location
			dropdown.findElement(By.cssSelector("li:nth-child(3)")).click();
			checkPageTitle("UX Aspects Documentation");

			if (this.browser.equalsIgnoreCase("edge")) {
				checkElementText(buttonMiddleRight, "Action");
			} else {
				checkElementText(buttonMiddleRight, "ACTION");
			}

			// Click on the fourth dropdown
			dropdownMiddleRight.click();

			dropdown = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(4).btn-group ul"));
			link1 = dropdown.findElement(By.cssSelector("li:nth-child(1) a"));
			link2 = dropdown.findElement(By.cssSelector("li:nth-child(2) a"));
			link3 = dropdown.findElement(By.cssSelector("li:nth-child(3) a"));
			link4 = dropdown.findElement(By.cssSelector("li:nth-child(5) a"));

			// Verify menu item's titles
			checkElementText(link1, "Action");
			checkElementText(link2, "Another action");
			checkElementText(link3, "Something else here");
			checkElementText(link4, "Separated link");

			// Verify menu items' links
			checkElementLinkAttribute(link1, this.rootUrl + "/#/");
			checkElementLinkAttribute(link2, this.rootUrl + "/#/");
			checkElementLinkAttribute(link3, this.rootUrl + "/#/");
			checkElementLinkAttribute(link4, this.rootUrl + "/#/");

			// Click on the fourth menu item and verify the location
			dropdown.findElement(By.cssSelector("li:nth-child(5)")).click();
			checkPageTitle("UX Aspects Documentation");

			if (this.browser.equalsIgnoreCase("edge")) {
				checkElementText(buttonBottomLeft, "Action");
			} else {
				checkElementText(buttonBottomLeft, "ACTION");
			}

			// Click on the fifth dropdown
			dropdownBottomLeft.click();

			dropdown = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(5).btn-group ul"));
			link1 = dropdown.findElement(By.cssSelector("li:nth-child(1) a"));
			link2 = dropdown.findElement(By.cssSelector("li:nth-child(2) a"));
			link3 = dropdown.findElement(By.cssSelector("li:nth-child(3) a"));
			link4 = dropdown.findElement(By.cssSelector("li:nth-child(5) a"));

			// Verify menu item's titles
			checkElementText(link1, "Action");
			checkElementText(link2, "Another action");
			checkElementText(link3, "Something else here");
			checkElementText(link4, "Separated link");

			// Verify menu items' links
			checkElementLinkAttribute(link1, this.rootUrl + "/#/");
			checkElementLinkAttribute(link2, this.rootUrl + "/#/");
			checkElementLinkAttribute(link3, this.rootUrl + "/#/");
			checkElementLinkAttribute(link4, this.rootUrl + "/#/");

			// Click on the first menu item and verify the location
			dropdown.findElement(By.cssSelector("li:nth-child(1)")).click();
			checkPageTitle("UX Aspects Documentation");

			if (this.browser.equalsIgnoreCase("edge")) {
				checkElementText(buttonBottomRight, "Action");
			} else {
				checkElementText(buttonBottomRight, "ACTION");
			}

			// Click on the sixth dropdown			
			dropdownBottomRight.click();

			dropdown = buttonsContainer.findElement(By.cssSelector("div:nth-of-type(6).btn-group ul"));
			link1 = dropdown.findElement(By.cssSelector("li:nth-child(1) a"));
			link2 = dropdown.findElement(By.cssSelector("li:nth-child(2) a"));
			link3 = dropdown.findElement(By.cssSelector("li:nth-child(3) a"));
			link4 = dropdown.findElement(By.cssSelector("li:nth-child(5) a"));

			// Verify menu item's titles
			checkElementText(link1, "Action");
			checkElementText(link2, "Another action");
			checkElementText(link3, "Something else here");
			checkElementText(link4, "Separated link");

			// Verify menu items' links
			checkElementLinkAttribute(link1, this.rootUrl + "/#/");
			checkElementLinkAttribute(link2, this.rootUrl + "/#/");
			checkElementLinkAttribute(link3, this.rootUrl + "/#/");
			checkElementLinkAttribute(link4, this.rootUrl + "/#/");

			// Click on the second menu item and verify the location
			dropdown.findElement(By.cssSelector("li:nth-child(2)")).click();
			checkPageTitle("UX Aspects Documentation");
		} finally {
			logErrors();
		}
	}
}
