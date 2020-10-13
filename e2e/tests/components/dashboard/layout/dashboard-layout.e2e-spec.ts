import { browser, ElementFinder } from 'protractor';
import { DashboardLayoutPage } from './dashboard-layout.po.spec';

describe('Dashboard Layout', () => {

    let page: DashboardLayoutPage;
    let widget1: ElementFinder;
    let widget2: ElementFinder;

    beforeEach(async () => {
        page = new DashboardLayoutPage();
        await page.getPage();

        // set the browser window to a specific size to ensure consistency
        await browser.driver.manage().window().setSize(1320, 800);

        widget1 = await page.getWidget(0);
        widget2 = await page.getWidget(1);
    });

    it('should update the layout when a new value is emitted', async () => {
        expect(await page.getWidgetLocationValue(widget1, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget1, 'left')).toBe(0);
        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(370);

        await page.updateLayout.click();

        expect(await page.getWidgetLocationValue(widget1, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget1, 'left')).toBe(740);
        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(0);
    });
});
