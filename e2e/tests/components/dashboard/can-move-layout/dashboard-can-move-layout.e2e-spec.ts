import { browser, ElementFinder } from 'protractor';
import { DashboardCanMoveLayoutPage } from './dashboard-can-move-layout.po.spec';

describe('Dashboard Layout', () => {

    let page: DashboardCanMoveLayoutPage;
    let widget1: ElementFinder;
    let widget2: ElementFinder;

    beforeEach(async () => {
        page = new DashboardCanMoveLayoutPage();
        await page.getPage();

        // set the browser window to a specific size to ensure consistency
        await browser.driver.manage().window().setSize(1320, 800);

        widget1 = await page.getWidget(0);
        widget2 = await page.getWidget(1);
    });

});
