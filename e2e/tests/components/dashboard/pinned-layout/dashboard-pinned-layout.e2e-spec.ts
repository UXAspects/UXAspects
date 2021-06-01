import { browser, ElementFinder, Key } from 'protractor';
import { DashboardCanMoveLayoutPage } from './dashboard-pinned-layout.po.spec';

describe('Dashboard Pinned Layout', () => {

    let page: DashboardCanMoveLayoutPage;
    let widget1: ElementFinder;
    let widget2: ElementFinder;
    let widget3: ElementFinder;
    let widget4: ElementFinder;

    beforeEach(async () => {
        page = new DashboardCanMoveLayoutPage();
        await page.getPage();

        // set the browser window to a specific size to ensure consistency
        await browser.driver.manage().window().setSize(1320, 800);

        widget1 = await page.getWidget(0);
        widget2 = await page.getWidget(1);
        widget3 = await page.getWidget(2);
        widget4 = await page.getWidget(3);
    });

    // restore the window to its original size after all these tests have run
    afterAll(async () => {
        await browser.driver.manage().window().setSize(800, 600);
    });

    it('should not allow widget 2 to move as it has pinned set to true', async () => {
        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(554);

        // select widget 3 in grab mode
        await browser.actions().sendKeys(Key.TAB);
        await browser.actions().sendKeys(Key.ARROW_RIGHT);
        await browser.actions().sendKeys(Key.SPACE);

        // try to move the widget
        await browser.actions().sendKeys(Key.ARROW_DOWN);
        await browser.actions().sendKeys(Key.ARROW_RIGHT);
        await browser.actions().sendKeys(Key.TAB);

        // expect widget to not have moved
        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(554);
    });

    it('should not allow widget 1 to move into the space occupied by widget 2 which has pinned set to true', async () => {
        expect(await page.getWidgetLocationValue(widget1, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(554);

        // try to move widget 1 down
        await browser.actions().sendKeys(Key.TAB);
        await browser.actions().sendKeys(Key.SPACE);

        // try to move the widget
        await browser.actions().sendKeys(Key.ARROW_RIGHT);
        await browser.actions().sendKeys(Key.TAB);

        expect(await page.getWidgetLocationValue(widget1, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(554);
    });

    it('should not allow widget 4 to move into the space occupied by widget 2 which has pinned set to true', async () => {
        expect(await page.getWidgetLocationValue(widget4, 'top')).toBe(220);
        expect(await page.getWidgetLocationValue(widget4, 'left')).toBe(0);
        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(554);

        // select widget 4 in grab mode
        await browser.actions().sendKeys(Key.TAB);
        await browser.actions().sendKeys(Key.ARROW_DOWN);
        await browser.actions().sendKeys(Key.SPACE);

        // try to move the widget
        await browser.actions().sendKeys(Key.ARROW_UP);

        expect(await page.getWidgetLocationValue(widget4, 'top')).toBe(220);
        expect(await page.getWidgetLocationValue(widget4, 'left')).toBe(0);
        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(554);
    });

    it('should not allow widget 1 to be resized right, widget 2 should remain in place as pinned is set to true', async () => {
        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(554);
        expect(await page.getWidgetLocationValue(widget1, 'width')).toBe(554);

        // attempt to resize widget 1 right
        await browser.actions().sendKeys(Key.TAB);
        await browser.actions().sendKeys(Key.SPACE);
        await browser.actions().keyDown(Key.CONTROL).sendKeys(Key.ARROW_RIGHT).perform();

        // expect widget 1 to not be resized
        expect(await page.getWidgetLocationValue(widget1, 'width')).toBe(554);

        // expect widget 2 to not move
        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(554);
    });
});
