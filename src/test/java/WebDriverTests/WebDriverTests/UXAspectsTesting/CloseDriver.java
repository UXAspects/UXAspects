package WebDriverTests.WebDriverTests.UXAspectsTesting;

import org.testng.annotations.Test;

/**
 * Closes the WebDriver instance
 */
public class CloseDriver extends TestNGBase {
	@Test(alwaysRun = true)
	public void closeDriver() throws Exception {
		try {
			initialiseMethod(getClass().getCanonicalName(), Utilities.getMethodName());

			this.driver.quit();
			this.driver = null;
			WebDriverStore.webDriver = null;
			WebDriverStore.openedPage = false;
		} finally {
			logErrors();
		}
	}
}
