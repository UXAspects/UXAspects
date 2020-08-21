import { browser, ElementFinder, Key } from 'protractor';
import { imageCompareFullPageScreen } from '../common/image-compare';
import { DashboardWidgetsPage } from './dashboard-widgets.po.spec';

describe('Dashboard Widgets Tests', () => {

    let page: DashboardWidgetsPage;
    let widgetActions: ElementFinder;
    let widgetEnum: ElementFinder;
    let widgetTable: ElementFinder;
    let widgetText: ElementFinder;

    beforeEach(async () => {
        page = new DashboardWidgetsPage();
        await page.getPage();

        // set the browser window to a specific size to ensure consistency
        await browser.driver.manage().window().setSize(1320, 800);

        widgetActions = await page.getWidget('widget-actions');
        widgetEnum = await page.getWidget('widget-enum');
        widgetTable = await page.getWidget('widget-table');
        widgetText = await page.getWidget('widget-text');
    });

    // restore the window to its original size after all these tests have run
    afterAll(async () => {
        await browser.driver.manage().window().setSize(800, 600);
    });

    it('should have correct initial states', async () => {
        expect(await page.getWidgetLocationValue(widgetActions, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widgetActions, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widgetEnum, 'top')).toBe(187);
        expect(await page.getWidgetLocationValue(widgetEnum, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widgetTable, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widgetTable, 'left')).toBe(554);

        expect(await page.getWidgetLocationValue(widgetText, 'top')).toBe(374);
        expect(await page.getWidgetLocationValue(widgetText, 'left')).toBe(0);

        expect(await imageCompareFullPageScreen('dashboard-initial')).toEqual(0);
    });

    it('should react correctly when a widget is moved down', async () => {

        const layoutMock =  [
            { id: 'widget-actions', 'col': 0, 'row': 3, 'colSpan': 2, 'rowSpan': 1 },
            { id: 'widget-enum', 'col': 0, 'row': 0, 'colSpan': 2, 'rowSpan': 1 },
            { id: 'widget-table', 'col': 2, 'row': 0, 'colSpan': 2, 'rowSpan': 2 },
            { id: 'widget-text', 'col': 0, 'row': 2, 'colSpan': 4, 'rowSpan': 1 }
        ];

        // drag the top widget down
        await browser.actions().dragAndDrop(widgetActions, { x: 0, y: 600 }).perform();

        expect(await page.getWidgetLocationValue(widgetActions, 'top')).toBe(561, 'widget-actions top');
        expect(await page.getWidgetLocationValue(widgetActions, 'left')).toBe(0, 'widget-actions left');

        expect(await page.getWidgetLocationValue(widgetEnum, 'top')).toBe(0, 'widget-enum top');
        expect(await page.getWidgetLocationValue(widgetEnum, 'left')).toBe(0, 'widget-enum left');

        expect(await page.getWidgetLocationValue(widgetTable, 'top')).toBe(0, 'widget-table top');
        expect(await page.getWidgetLocationValue(widgetTable, 'left')).toBe(554, 'widget-table left');

        expect(await page.getWidgetLocationValue(widgetText, 'top')).toBe(374, 'widget-text top');
        expect(await page.getWidgetLocationValue(widgetText, 'left')).toBe(0, 'widget-text left');

        expect(JSON.parse(await page.getLayoutOutput())).toEqual(layoutMock);
    });

    it('should manage focus of the grab handles', async () => {

        // Set focus to the element before the dashboard
        await page.topFocusTarget.click();

        // Tab into the dashboard
        await browser.actions().sendKeys(Key.TAB).perform();

        // First grab handle should have focus
        const grabHandle1 = await page.getGrabHandle('widget-actions');
        expect(await page.hasFocus(grabHandle1)).toBe(true);

        // Tab again
        await browser.actions().sendKeys(Key.TAB).perform();

        // Focus should have left the dashboard
        expect(await page.hasFocus(page.bottomFocusTarget)).toBe(true);

        // Set focus to the element before the dashboard again
        await page.topFocusTarget.click();

        // Tab into the dashboard and move to the next grab handle
        await browser.actions().sendKeys(Key.TAB).sendKeys(Key.ARROW_RIGHT).perform();

        // Second grab handle should have focus
        const grabHandle2 = await page.getGrabHandle('widget-enum');
        expect(await page.hasFocus(grabHandle2)).toBe(true);

        // Tab again
        await browser.actions().sendKeys(Key.TAB).perform();

        // Focus should have left the dashboard
        expect(await page.hasFocus(page.bottomFocusTarget)).toBe(true);

        // Set focus to the element before the dashboard again
        await page.topFocusTarget.click();

        // Tab into the dashboard
        await browser.actions().sendKeys(Key.TAB).perform();

        // Second grab handle should still have focus
        expect(await page.hasFocus(grabHandle2)).toBe(true);
    });

    it('should maintain a focusable grab handle when widgets are removed', async () => {

        // Remove first widget from the DOM
        await page.toggleWidget();

        expect(await page.getNumberOfWidgets()).toBe(3);

        // Set focus to the element before the dashboard
        await page.topFocusTarget.click();

        // Tab into the dashboard
        await browser.actions().sendKeys(Key.TAB).perform();

        // Second grab handle should have focus
        const grabHandle2 = await page.getGrabHandle('widget-enum');
        expect(await page.hasFocus(grabHandle2)).toBe(true);
    });
});
