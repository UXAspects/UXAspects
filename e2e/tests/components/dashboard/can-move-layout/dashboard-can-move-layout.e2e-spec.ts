import { browser, ElementFinder, Key } from 'protractor';
import { Direction } from '../dashboard.po.spec';
import { DashboardCanMoveLayoutPage } from './dashboard-can-move-layout.po.spec';

describe('Dashboard Can Move Layout', () => {

    let page: DashboardCanMoveLayoutPage;
    let widget1: ElementFinder;
    let widget2: ElementFinder;
    let widget3: ElementFinder;
    let widget4: ElementFinder;
    let widget5: ElementFinder;

    beforeEach(async () => {
        page = new DashboardCanMoveLayoutPage();
        await page.getPage();

        // set the browser window to a specific size to ensure consistency
        await browser.driver.manage().window().setSize(1320, 800);

        widget1 = await page.getWidget(0);
        widget2 = await page.getWidget(1);
        widget3 = await page.getWidget(2);
        widget4 = await page.getWidget(3);
        widget5 = await page.getWidget(4);
    });

    // restore the window to its original size after all these tests have run
    afterAll(async () => {
        await browser.driver.manage().window().setSize(800, 600);
    });

    it('should not allow widget 3 to move if it has canMove set to false', async () => {
        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(440);

        // select widget 3 in grab mode
        await browser.actions().sendKeys(Key.TAB);
        await browser.actions().sendKeys(Key.ARROW_DOWN);
        await browser.actions().sendKeys(Key.ARROW_LEFT);
        await browser.actions().sendKeys(Key.SPACE);

        // try to move the widget
        await browser.actions().sendKeys(Key.ARROW_UP);
        await browser.actions().sendKeys(Key.ARROW_RIGHT);

        // expect widget to not have moved
        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(440);
    });

    it('should not allow widget 1 to move into the space occupied by widget 3 which has canMove set to false', async () => {
        expect(await page.getWidgetLocationValue(widget1, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(440);
        expect(await page.getWidgetLocationValue(widget3, 'left')).toBe(554);

        // try to move widget 1 down
        await page.enableGrabMode();
        await page.moveWidget(Direction.Down);

        expect(await page.getWidgetLocationValue(widget1, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(440);
        expect(await page.getWidgetLocationValue(widget3, 'left')).toBe(554);
    });

    it('should not allow widget 2 to move into the space occupied by widget 3 which has canMove set to false', async () => {
        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(440);
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(0);
        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(440);
        expect(await page.getWidgetLocationValue(widget3, 'left')).toBe(554);

        // select widget 3 in grab mode
        await browser.actions().sendKeys(Key.TAB);
        await browser.actions().sendKeys(Key.ARROW_DOWN);
        await browser.actions().sendKeys(Key.ARROW_LEFT);
        await browser.actions().sendKeys(Key.ARROW_LEFT);
        await browser.actions().sendKeys(Key.SPACE);

        // try to move the widget
        await browser.actions().sendKeys(Key.ARROW_RIGHT);

        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(440);
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(0);
        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(440);
        expect(await page.getWidgetLocationValue(widget3, 'left')).toBe(554);
    });

    it('should not allow widget 4 to move into the space occupied by widget 3 which has canMove set to false', async () => {
        expect(await page.getWidgetLocationValue(widget4, 'top')).toBe(440);
        expect(await page.getWidgetLocationValue(widget4, 'left')).toBe(831);
        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(440);
        expect(await page.getWidgetLocationValue(widget3, 'left')).toBe(554);

        // select widget 3 in grab mode
        await browser.actions().sendKeys(Key.TAB);
        await browser.actions().sendKeys(Key.ARROW_DOWN);
        await browser.actions().sendKeys(Key.SPACE);

        // try to move the widget
        await browser.actions().sendKeys(Key.ARROW_LEFT);

        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(440);
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(0);
        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(440);
        expect(await page.getWidgetLocationValue(widget3, 'left')).toBe(554);
    });

    it('should move widgets up when widget 1 is resized, widget 3 should not move up with canMove set to false', async () => {
        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(440);
        expect(await page.getWidgetLocationValue(widget3, 'left')).toBe(554);

        // resize widget 1 to 1 row
        await page.enableGrabMode();
        await page.resizeWidget(0, Key.ARROW_UP);

        // expect widget 1 to be resized
        expect(await page.getWidgetLocationValue(widget1, 'height')).toBe(220);

        // expect widget 3 to not move
        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(440);
        expect(await page.getWidgetLocationValue(widget3, 'left')).toBe(554);

        // other widgets should move up
        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(220);
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(0);
        expect(await page.getWidgetLocationValue(widget4, 'top')).toBe(220);
        expect(await page.getWidgetLocationValue(widget4, 'left')).toBe(831);
    });
});
