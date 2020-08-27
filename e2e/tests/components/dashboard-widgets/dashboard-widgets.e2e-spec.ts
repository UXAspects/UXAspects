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

        widgetActions = await page.getWidget('actions-widget');
        widgetEnum = await page.getWidget('enum-widget');
        widgetTable = await page.getWidget('table-widget');
        widgetText = await page.getWidget('text-widget');
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

        // expect(await imageCompareFullPageScreen('dashboard-widgets-initial')).toEqual(0);
    });

    it('should react correctly when a widget is moved and resized', async () => {

        const layoutMock =  [
            { id: 'widget-actions', 'col': 0, 'row': 3, 'colSpan': 2, 'rowSpan': 1 },
            { id: 'widget-enum', 'col': 0, 'row': 0, 'colSpan': 2, 'rowSpan': 1 },
            { id: 'widget-table', 'col': 2, 'row': 0, 'colSpan': 2, 'rowSpan': 2 },
            { id: 'widget-text', 'col': 0, 'row': 2, 'colSpan': 4, 'rowSpan': 1 }
        ];

        // drag the top widget down
        await browser.actions().dragAndDrop(widgetActions, { x: 0, y: 800 }).perform();

        expect(await page.getWidgetLocationValue(widgetActions, 'top')).toBe(748, 'widget-actions top');
        expect(await page.getWidgetLocationValue(widgetActions, 'left')).toBe(0, 'widget-actions left');

        expect(await page.getWidgetLocationValue(widgetEnum, 'top')).toBe(0, 'widget-enum top');
        expect(await page.getWidgetLocationValue(widgetEnum, 'left')).toBe(0, 'widget-enum left');

        expect(await page.getWidgetLocationValue(widgetTable, 'top')).toBe(0, 'widget-table top');
        expect(await page.getWidgetLocationValue(widgetTable, 'left')).toBe(554, 'widget-table left');

        expect(await page.getWidgetLocationValue(widgetText, 'top')).toBe(374, 'widget-text top');
        expect(await page.getWidgetLocationValue(widgetText, 'left')).toBe(0, 'widget-text left');

        const layoutOutput = await page.getLayoutOutput();
        console.log(layoutOutput);

        expect(JSON.parse(layoutOutput)).toEqual(layoutMock);
    });
});
