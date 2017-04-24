package WebDriverTests.WebDriverTests.UXAspectsTesting;

import org.testng.annotations.Test;

/**
 * Opens a browser using the specified URL
 */
public class OpenPage extends TestNGBase {
	@Test(alwaysRun = true)
	public void openPage() throws Exception {
		try {
			initialiseMethod(getClass().getCanonicalName(), Utilities.getMethodName());

			WebDriverStore.webDriver.get(this.startingUrl);
			WebDriverStore.openedPage = true;
		} finally {
			logErrors();
		}
	}
}
