import { browser, ElementFinder } from 'protractor';
import { DashboardDynamicLayoutPage } from './dynamic-layout.po.spec';

describe('Dashboard Dynamic Layout', () => {

    let page: DashboardDynamicLayoutPage;
    let widget1: ElementFinder;
    let widget2: ElementFinder;
    let widget3: ElementFinder;
    let widget4: ElementFinder;

    beforeEach(async () => {
        page = new DashboardDynamicLayoutPage();
        await page.getPage();

        // set the browser window to a specific size to ensure consistency
        await browser.driver.manage().window().setSize(1320, 800);

        widget1 = await page.getWidget(0);
        widget2 = await page.getWidget(1);
        widget3 = await page.getWidget(2);
        widget4 = await page.getWidget(3);
    });


});
