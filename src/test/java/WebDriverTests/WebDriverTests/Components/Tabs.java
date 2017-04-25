package WebDriverTests.WebDriverTests.Components;

import org.testng.annotations.*;

import java.util.List;

import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import WebDriverTests.WebDriverTests.UXAspectsTesting.TestNGBase;
import WebDriverTests.WebDriverTests.UXAspectsTesting.Utilities;

/**
 * Defines tests for the Components -> Tabs section.
 */

public class Tabs extends TestNGBase {
	/**
	 * Tests the Tabs -> Tabs section of the Components page
	 * 
	 * @throws Exception Throws exception thrown by a WebDriver executable
	 */
	@Test(alwaysRun = true)
	public void testTabs() throws Exception {
		try {
			initialiseMethod(getClass().getCanonicalName(), Utilities.getMethodName());

			// Scroll to the required section and wait until one of the components is displayed
			String displaySection = "window.location.href=\"" + this.startingUrl + "#tabs-ng1" + "\"";
			Utilities.scrollToSection(driver, displaySection);

			WebDriverWait wait = new WebDriverWait(driver, this.displayWaitTimeMS / 1000);
			wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("uxd-components-tabs-ng1 uxd-tabs-wrapper > div > div > ul > li.ng-isolate-scope.active > a")));
			
			// Get all the Tabs sections
			List<WebElement> allTabsContainers = driver.findElements(By.cssSelector("uxd-components-tabs-ng1 uxd-tabs-wrapper > div"));
			
			/*
			 * Icon Only tabs
			 */	
			
			// Get the elements
			WebElement tabsContainer1 = allTabsContainers.get(0);			
			
			WebElement firstTab1 = tabsContainer1.findElement(By.cssSelector("div > ul > li:nth-child(1)"));
			WebElement secondTab1 = tabsContainer1.findElement(By.cssSelector("div > ul > li:nth-child(2)"));
			WebElement thirdTab1 = tabsContainer1.findElement(By.cssSelector("div > ul > li:nth-child(3)"));
			WebElement fourthTab1 = tabsContainer1.findElement(By.cssSelector("div > ul > li:nth-child(4)"));
			
			// Ensure controls are visible for clicking
			Utilities.performVerticalScroll(driver, firstTab1, verticalScrollPixels);

			// Perform initial check for active tab
			checkElementHasClass(firstTab1, "active");
			checkElementHasNotClass(secondTab1, "active");
			checkElementHasNotClass(thirdTab1, "active");
			checkElementHasNotClass(fourthTab1, "active");
			
			// Click different tabs and check they active and the previously active tab is not
			secondTab1.findElement(By.cssSelector("a")).click();
			checkElementHasClass(secondTab1, "active");
			checkElementHasNotClass(firstTab1, "active");
			
			thirdTab1.findElement(By.cssSelector("a")).click();
			checkElementHasClass(thirdTab1, "active");
			checkElementHasNotClass(secondTab1, "active");
			
			fourthTab1.findElement(By.cssSelector("a")).click();
			checkElementHasClass(fourthTab1, "active");
			checkElementHasNotClass(thirdTab1, "active");
			
			/*
			 * Text and Icon tabs
			 */	
			 
			WebElement tabsContainer2 = allTabsContainers.get(1);
			
			WebElement firstTab2 = tabsContainer2.findElement(By.cssSelector("div > ul > li:nth-child(1)"));
			WebElement secondTab2 = tabsContainer2.findElement(By.cssSelector("div > ul > li:nth-child(2)"));
			WebElement thirdTab2 = tabsContainer2.findElement(By.cssSelector("div > ul > li:nth-child(3)"));
			WebElement fourthTab2 = tabsContainer2.findElement(By.cssSelector("div > ul > li:nth-child(4)"));
			
			// Ensure controls are visible for clicking
			Utilities.performVerticalScroll(driver, firstTab2, verticalScrollPixels);

			// Perform initial check for active tab
			checkElementHasClass(firstTab2, "active");
			checkElementHasNotClass(secondTab2, "active");
			checkElementHasNotClass(thirdTab2, "active");
			checkElementHasNotClass(fourthTab2, "active");
			
			// Click different tabs and check they active and the previously active tab is not
			secondTab2.findElement(By.cssSelector("a")).click();
			checkElementHasClass(secondTab2, "active");
			checkElementHasNotClass(firstTab2, "active");
			
			thirdTab2.findElement(By.cssSelector("a")).click();
			checkElementHasClass(thirdTab2, "active");
			checkElementHasNotClass(secondTab2, "active");
			
			fourthTab2.findElement(By.cssSelector("a")).click();
			checkElementHasClass(fourthTab2, "active");
			checkElementHasNotClass(thirdTab2, "active");
			
			/*
			 * Text Only tabs
			 */	
			 
			WebElement tabsContainer3 = allTabsContainers.get(2);
			
			WebElement firstTab3 = tabsContainer3.findElement(By.cssSelector("div > ul > li:nth-child(1)"));
			WebElement secondTab3 = tabsContainer3.findElement(By.cssSelector("div > ul > li:nth-child(2)"));
			WebElement thirdTab3 = tabsContainer3.findElement(By.cssSelector("div > ul > li:nth-child(3)"));
			WebElement fourthTab3 = tabsContainer3.findElement(By.cssSelector("div > ul > li:nth-child(4)"));
			
			// Ensure controls are visible for clicking
			Utilities.performVerticalScroll(driver, firstTab3, verticalScrollPixels);

			// Perform initial check for active tab
			checkElementHasClass(firstTab3, "active");
			checkElementHasNotClass(secondTab3, "active");
			checkElementHasNotClass(thirdTab3, "active");
			checkElementHasNotClass(fourthTab3, "active");
			
			// Click different tabs and check they active and the previously active tab is not
			secondTab3.findElement(By.cssSelector("a")).click();
			checkElementHasClass(secondTab3, "active");
			checkElementHasNotClass(firstTab3, "active");
			
			thirdTab3.findElement(By.cssSelector("a")).click();
			checkElementHasClass(thirdTab3, "active");
			checkElementHasNotClass(secondTab3, "active");
			
			fourthTab3.findElement(By.cssSelector("a")).click();
			checkElementHasClass(fourthTab3, "active");
			checkElementHasNotClass(thirdTab3, "active");
			
			/*
			 * Alternative Style tabs
			 */	
			 
			WebElement tabsContainer4 = allTabsContainers.get(3);
			
			WebElement firstTab4 = tabsContainer4.findElement(By.cssSelector("div > ul > li:nth-child(1)"));
			WebElement secondTab4 = tabsContainer4.findElement(By.cssSelector("div > ul > li:nth-child(2)"));
			WebElement thirdTab4 = tabsContainer4.findElement(By.cssSelector("div > ul > li:nth-child(3)"));
			WebElement fourthTab4 = tabsContainer4.findElement(By.cssSelector("div > ul > li:nth-child(4)"));
			
			// Ensure controls are visible for clicking
			Utilities.performVerticalScroll(driver, firstTab4, verticalScrollPixels);

			// Perform initial check for active tab
			checkElementHasClass(firstTab4, "active");
			checkElementHasNotClass(secondTab4, "active");
			checkElementHasNotClass(thirdTab4, "active");
			checkElementHasNotClass(fourthTab4, "active");
			
			// Click different tabs and check they active and the previously active tab is not
			secondTab4.findElement(By.cssSelector("a")).click();
			checkElementHasClass(secondTab4, "active");
			checkElementHasNotClass(firstTab4, "active");
			
			thirdTab4.findElement(By.cssSelector("a")).click();
			checkElementHasClass(thirdTab4, "active");
			checkElementHasNotClass(secondTab4, "active");
			
			fourthTab4.findElement(By.cssSelector("a")).click();
			checkElementHasClass(fourthTab4, "active");
			checkElementHasNotClass(thirdTab4, "active");
			
			/*
			 * Dynamic tabs
			 */	
			 
			WebElement tabsContainer5 = allTabsContainers.get(4);
			
			// Ensure controls are visible for clicking
			Utilities.performVerticalScroll(driver, tabsContainer5, verticalScrollPixels);
			
			WebElement firstTab5 = tabsContainer5.findElement(By.cssSelector("div > ul > li:nth-child(1)"));
			WebElement secondTab5 = tabsContainer5.findElement(By.cssSelector("div > ul > li:nth-child(2)"));
			WebElement thirdTab5 = tabsContainer5.findElement(By.cssSelector("div > ul > li:nth-child(3)"));
			WebElement fourthTab5 = tabsContainer5.findElement(By.cssSelector("div > ul > li:nth-child(4)"));
			WebElement dynamicAddDropdownButton = tabsContainer5.findElement(By.cssSelector("div > ul > div > div > button"));
			
			// Ensure controls are visible for clicking
			Utilities.performVerticalScroll(driver, firstTab5, verticalScrollPixels);

			// Perform initial check for active tab
			checkElementHasClass(firstTab5, "active");
			checkElementHasNotClass(secondTab5, "active");
			checkElementHasNotClass(thirdTab5, "active");
			checkElementHasNotClass(fourthTab5, "active");
			
			// Click different tabs and check they active and the previously active tab is not
			secondTab5.findElement(By.cssSelector("a")).click();
			checkElementHasClass(secondTab5, "active");
			checkElementHasNotClass(firstTab5, "active");
			
			thirdTab5.findElement(By.cssSelector("a")).click();
			checkElementHasClass(thirdTab5, "active");
			checkElementHasNotClass(secondTab5, "active");
			
			fourthTab5.findElement(By.cssSelector("a")).click();
			checkElementHasClass(fourthTab5, "active");
			checkElementHasNotClass(thirdTab5, "active");
			
			// Click Dynamic add button and add a new tab then check it exists and is clickable
			dynamicAddDropdownButton.click();
			WebElement newTabButton = tabsContainer5.findElement(By.cssSelector("div > ul > div > ul > li:nth-child(1) > a"));
			newTabButton.click();
			
			// Getting the updated tabs container as the new tab element will have been added
			tabsContainer5 = driver.findElements(By.cssSelector("uxd-components-tabs-ng1 uxd-tabs-wrapper > div")).get(4);
			WebElement newlyAddedTab = tabsContainer5.findElement(By.cssSelector("div > ul > li:nth-child(5)"));
			newlyAddedTab.click();
			checkElementHasClass(newlyAddedTab, "active");
			checkElementHasNotClass(fourthTab5, "active");			
		} finally {
			logErrors();
		}
	}
	
	/**
	 * Tests the Tabs -> Detailed Tabs section of the Components page
	 * 
	 * @throws Exception Throws exception thrown by a WebDriver executable
	 */
	@Test(alwaysRun = true)
	public void testDetailedTabs() throws Exception {
		try {
			initialiseMethod(getClass().getCanonicalName(), Utilities.getMethodName());

			// Scroll to the required section and wait until one of the components is displayed
			String displaySection = "window.location.href=\"" + this.startingUrl + "#detailed-tab-example-ng1" + "\"";
			Utilities.scrollToSection(driver, displaySection);

			WebDriverWait wait = new WebDriverWait(driver, this.displayWaitTimeMS / 1000);
			wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("uxd-components-detailed-tab-example-ng1 uxd-detailed-tab-wrapper > div > div > ul > li.ng-isolate-scope.active > a")));
			
			// Get all the Tabs sections
			WebElement tabsContainer = driver.findElement(By.cssSelector("uxd-components-detailed-tab-example-ng1 uxd-detailed-tab-wrapper"));
			WebElement firstTab = tabsContainer.findElement(By.cssSelector("div > div > ul > li:nth-child(1)"));
			WebElement secondTab = tabsContainer.findElement(By.cssSelector("div > div > ul > li:nth-child(2)"));
			WebElement thirdTab = tabsContainer.findElement(By.cssSelector("div > div > ul > li:nth-child(3)"));
			
			// Perform initial check for active tab
			checkElementHasClass(firstTab, "active");
			checkElementHasNotClass(secondTab, "active");
			checkElementHasNotClass(thirdTab, "active");
			
			// Click different tabs and check they active and the previously active tab is not
			secondTab.findElement(By.cssSelector("a")).click();
			checkElementHasClass(secondTab, "active");
			checkElementHasNotClass(firstTab, "active");
			
			thirdTab.findElement(By.cssSelector("a")).click();
			checkElementHasClass(thirdTab, "active");
			checkElementHasNotClass(secondTab, "active");
		} finally {
			logErrors();
		}
	}
	
	/**
	 * Tests the Tabs -> Stacked Tabs section of the Components page
	 * 
	 * @throws Exception Throws exception thrown by a WebDriver executable
	 */
	@Test(alwaysRun = true)
	public void testStackedTabs() throws Exception {
		try {
			initialiseMethod(getClass().getCanonicalName(), Utilities.getMethodName());

			// Scroll to the required section and wait until one of the components is displayed
			String displaySection = "window.location.href=\"" + this.startingUrl + "#stacked-tabs-ng1" + "\"";
			Utilities.scrollToSection(driver, displaySection);
			
			WebDriverWait wait = new WebDriverWait(driver, this.displayWaitTimeMS / 1000);
			wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("uxd-components-stacked-tabs-ng1 > uxd-stacked-tabs-wrapper > div:nth-of-type(1) > div:nth-of-type(1) > div.tabs-left > div > ul > li.ng-isolate-scope.active > a")));
			
			// Get all the Tabs sections
			WebElement allTabsContainers = driver.findElement(By.cssSelector("uxd-components-stacked-tabs-ng1 uxd-stacked-tabs-wrapper"));
			
			/*
			 * Icon Only tabs, left and right
			 */	
						
			// Get the elements
			WebElement tabsContainerLeft1 = allTabsContainers.findElement(By.cssSelector("div:nth-of-type(1) > div:nth-of-type(1) > div > div > ul"));

			WebElement firstTab1 = tabsContainerLeft1.findElement(By.cssSelector("li:nth-child(1)"));
			WebElement secondTab1 = tabsContainerLeft1.findElement(By.cssSelector("li:nth-child(2)"));
			WebElement thirdTab1 = tabsContainerLeft1.findElement(By.cssSelector("li:nth-child(3)"));
			
			// Ensure controls are visible for clicking
			Utilities.performVerticalScroll(driver, firstTab1, verticalScrollPixels);

			// Perform initial check for active tab
			checkElementHasClass(firstTab1, "active");
			checkElementHasNotClass(secondTab1, "active");
			checkElementHasNotClass(thirdTab1, "active");
			
			// Click different tabs and check they active and the previously active tab is not
			secondTab1.findElement(By.cssSelector("a")).click();
			checkElementHasClass(secondTab1, "active");
			checkElementHasNotClass(firstTab1, "active");
			
			thirdTab1.findElement(By.cssSelector("a")).click();
			checkElementHasClass(thirdTab1, "active");
			checkElementHasNotClass(secondTab1, "active");
			
			WebElement tabsContainerRight1 = allTabsContainers.findElement(By.cssSelector("div:nth-of-type(1) > div:nth-of-type(2) > div > div > ul"));

			firstTab1 = tabsContainerRight1.findElement(By.cssSelector("li:nth-child(1)"));
			secondTab1 = tabsContainerRight1.findElement(By.cssSelector("li:nth-child(2)"));
			thirdTab1 = tabsContainerRight1.findElement(By.cssSelector("li:nth-child(3)"));
			
			// Perform initial check for active tab
			checkElementHasClass(firstTab1, "active");
			checkElementHasNotClass(secondTab1, "active");
			checkElementHasNotClass(thirdTab1, "active");
			
			// Click different tabs and check they active and the previously active tab is not
			secondTab1.findElement(By.cssSelector("a")).click();
			checkElementHasClass(secondTab1, "active");
			checkElementHasNotClass(firstTab1, "active");
			
			thirdTab1.findElement(By.cssSelector("a")).click();
			checkElementHasClass(thirdTab1, "active");
			checkElementHasNotClass(secondTab1, "active");
			
			/*
			 * Text and Icon tabs, left and right
			 */	
						
			// Get the elements
			WebElement tabsContainerLeft2 = allTabsContainers.findElement(By.cssSelector("div:nth-of-type(2) > div:nth-of-type(1) > div > div > ul"));

			WebElement firstTab2 = tabsContainerLeft2.findElement(By.cssSelector("li:nth-child(1)"));
			WebElement secondTab2 = tabsContainerLeft2.findElement(By.cssSelector("li:nth-child(2)"));
			WebElement thirdTab2 = tabsContainerLeft2.findElement(By.cssSelector("li:nth-child(3)"));
			
			// Ensure controls are visible for clicking
			Utilities.performVerticalScroll(driver, firstTab2, verticalScrollPixels);

			// Perform initial check for active tab
			checkElementHasClass(firstTab2, "active");
			checkElementHasNotClass(secondTab2, "active");
			checkElementHasNotClass(thirdTab2, "active");
			
			// Click different tabs and check they active and the previously active tab is not
			secondTab2.findElement(By.cssSelector("a")).click();
			checkElementHasClass(secondTab2, "active");
			checkElementHasNotClass(firstTab2, "active");
			
			thirdTab2.findElement(By.cssSelector("a")).click();
			checkElementHasClass(thirdTab2, "active");
			checkElementHasNotClass(secondTab2, "active");
			
			WebElement tabsContainerRight2 = allTabsContainers.findElement(By.cssSelector("div:nth-of-type(2) > div:nth-of-type(2) > div > div > ul"));

			firstTab2 = tabsContainerRight2.findElement(By.cssSelector("li:nth-child(1)"));
			secondTab2 = tabsContainerRight2.findElement(By.cssSelector("li:nth-child(2)"));
			thirdTab2 = tabsContainerRight2.findElement(By.cssSelector("li:nth-child(3)"));
			
			// Perform initial check for active tab
			checkElementHasClass(firstTab2, "active");
			checkElementHasNotClass(secondTab2, "active");
			checkElementHasNotClass(thirdTab2, "active");
			
			// Click different tabs and check they active and the previously active tab is not
			secondTab2.findElement(By.cssSelector("a")).click();
			checkElementHasClass(secondTab2, "active");
			checkElementHasNotClass(firstTab2, "active");
			
			thirdTab2.findElement(By.cssSelector("a")).click();
			checkElementHasClass(thirdTab2, "active");
			checkElementHasNotClass(secondTab2, "active");
			
			
			/*
			 * Text Only tabs, left and right
			 */	
						
			// Get the elements
			WebElement tabsContainerLeft3 = allTabsContainers.findElement(By.cssSelector("div:nth-of-type(3) > div:nth-of-type(1) > div > div > ul"));

			WebElement firstTab3 = tabsContainerLeft3.findElement(By.cssSelector("li:nth-child(1)"));
			WebElement secondTab3 = tabsContainerLeft3.findElement(By.cssSelector("li:nth-child(2)"));
			WebElement thirdTab3 = tabsContainerLeft3.findElement(By.cssSelector("li:nth-child(3)"));
			
			// Ensure controls are visible for clicking
			Utilities.performVerticalScroll(driver, firstTab3, verticalScrollPixels);

			// Perform initial check for active tab
			checkElementHasClass(firstTab3, "active");
			checkElementHasNotClass(secondTab3, "active");
			checkElementHasNotClass(thirdTab3, "active");
			
			// Click different tabs and check they active and the previously active tab is not
			secondTab3.findElement(By.cssSelector("a")).click();
			checkElementHasClass(secondTab3, "active");
			checkElementHasNotClass(firstTab3, "active");
			
			thirdTab3.findElement(By.cssSelector("a")).click();
			checkElementHasClass(thirdTab3, "active");
			checkElementHasNotClass(secondTab3, "active");
			
			WebElement tabsContainerRight3 = allTabsContainers.findElement(By.cssSelector("div:nth-of-type(3) > div:nth-of-type(2) > div > div > ul"));

			firstTab3 = tabsContainerRight3.findElement(By.cssSelector("li:nth-child(1)"));
			secondTab3 = tabsContainerRight3.findElement(By.cssSelector("li:nth-child(2)"));
			thirdTab3 = tabsContainerRight3.findElement(By.cssSelector("li:nth-child(3)"));
			
			// Perform initial check for active tab
			checkElementHasClass(firstTab3, "active");
			checkElementHasNotClass(secondTab3, "active");
			checkElementHasNotClass(thirdTab3, "active");
			
			// Click different tabs and check they active and the previously active tab is not
			secondTab3.findElement(By.cssSelector("a")).click();
			checkElementHasClass(secondTab3, "active");
			checkElementHasNotClass(firstTab3, "active");
			
			thirdTab3.findElement(By.cssSelector("a")).click();
			checkElementHasClass(thirdTab3, "active");
			checkElementHasNotClass(secondTab3, "active");
		} finally {
			logErrors();
		}
	}
	
	/**
	 * Tests the Tabs -> Stacked Tabs section of the Components page
	 * 
	 * @throws Exception Throws exception thrown by a WebDriver executable
	 */
	@Test(alwaysRun = true)
	public void testCardTabs() throws Exception {
		try {
			initialiseMethod(getClass().getCanonicalName(), Utilities.getMethodName());

			// Scroll to the required section and wait until one of the components is displayed
			String displaySection = "window.location.href=\"" + this.startingUrl + "#card-tabs-ng1" + "\"";
			Utilities.scrollToSection(driver, displaySection);

			WebDriverWait wait = new WebDriverWait(driver, this.displayWaitTimeMS / 1000);
			wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("uxd-components-card-tabs-ng1 uxd-card-tabs-wrapper > div > div.card-tab-container > ul > li.active")));
			
			// Get all the Tabs sections
			WebElement tabsContainer = driver.findElement(By.cssSelector("uxd-components-card-tabs-ng1 uxd-card-tabs-wrapper"));
			
			WebElement firstTab = tabsContainer.findElement(By.cssSelector("ul > li:nth-child(1)"));
			WebElement secondTab = tabsContainer.findElement(By.cssSelector("ul > li:nth-child(2)"));
			WebElement thirdTab = tabsContainer.findElement(By.cssSelector("ul > li:nth-child(3)"));
			WebElement fourthTab = tabsContainer.findElement(By.cssSelector("ul > li:nth-child(4)"));
			WebElement fifthTab = tabsContainer.findElement(By.cssSelector("ul > li:nth-child(5)"));
			
			// Perform initial check for active tab
			checkElementHasClass(firstTab, "active");
			checkElementHasNotClass(secondTab, "active");
			checkElementHasNotClass(thirdTab, "active");
			checkElementHasNotClass(fourthTab, "active");
			checkElementHasNotClass(fifthTab, "active");
			
			// Click different tabs and check they active and the previously active tab is not
			secondTab.click();
			checkElementHasClass(secondTab, "active");
			checkElementHasNotClass(firstTab, "active");
			
			thirdTab.click();
			checkElementHasClass(thirdTab, "active");
			checkElementHasNotClass(secondTab, "active");
			
			fourthTab.click();
			checkElementHasClass(fourthTab, "active");
			checkElementHasNotClass(thirdTab, "active");
			
			WebElement nextButton = tabsContainer.findElement(By.cssSelector("div.next > i"));
			nextButton.click();
			
			fifthTab.click();
			checkElementHasClass(fifthTab, "active");
			checkElementHasNotClass(fourthTab, "active");
		} finally {
			logErrors();
		}
	}
	
}
