import { browser, ElementFinder } from 'protractor';
import { DashboardWidgetsPage } from './dashboard-widgets.po.spec';
import { imageCompare } from '../common/image-compare';

describe('Dashboard Widgets', () => {

    let page: DashboardWidgetsPage;
    let widgetActions: ElementFinder;
    let widgetSelect: ElementFinder;
    let widgetTable: ElementFinder;
    let widgetText: ElementFinder;

    beforeEach(async () => {
        page = new DashboardWidgetsPage();
        await page.getPage();

        // set the browser window to a specific size to ensure consistency
        await browser.driver.manage().window().setSize(1320, 800);

        widgetActions = await page.getWidget('actions-widget');
        widgetSelect = await page.getWidget('select-widget');
        widgetTable = await page.getWidget('table-widget');
        widgetText = await page.getWidget('text-widget');
    });

    // restore the window to its original size after all these tests have run
    afterAll(async () => {
        await browser.driver.manage().window().setSize(800, 600);
    });

    it('should have correct initial states', async () => {
        expect(await imageCompare('dashboard-widgets-initial')).toEqual(0);

        expect(await page.getWidgetLocationValue(widgetActions, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widgetActions, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widgetSelect, 'top')).toBe(110);
        expect(await page.getWidgetLocationValue(widgetSelect, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widgetTable, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widgetTable, 'left')).toBe(554);

        expect(await page.getWidgetLocationValue(widgetText, 'top')).toBe(220);
        expect(await page.getWidgetLocationValue(widgetText, 'left')).toBe(0);
    });

    it('should react correctly when a widget is moved and resized', async () => {
        const layoutMock =  [
            { id: 'widget-actions', 'col': 0, 'row': 4, 'colSpan': 2, 'rowSpan': 1 },
            { id: 'widget-table', 'col': 2, 'row': 0, 'colSpan': 2, 'rowSpan': 2 },
            { id: 'widget-select', 'col': 0, 'row': 0, 'colSpan': 2, 'rowSpan': 1 },
            { id: 'widget-text', 'col': 0, 'row': 2, 'colSpan': 4, 'rowSpan': 2 }
        ];

        // drag the top widget down
        await browser.actions().dragAndDrop(widgetActions.$('button.widget-grab-handle'), { x: 0, y: 800 }).perform();

        expect(await imageCompare('dashboard-widgets-moved')).toEqual(0);

        expect(await page.getWidgetLocationValue(widgetActions, 'top')).toBe(440, 'widget-actions top');
        expect(await page.getWidgetLocationValue(widgetActions, 'left')).toBe(0, 'widget-actions left');

        expect(await page.getWidgetLocationValue(widgetSelect, 'top')).toBe(0, 'widget-select top');
        expect(await page.getWidgetLocationValue(widgetSelect, 'left')).toBe(0, 'widget-select left');

        expect(await page.getWidgetLocationValue(widgetTable, 'top')).toBe(0, 'widget-table top');
        expect(await page.getWidgetLocationValue(widgetTable, 'left')).toBe(554, 'widget-table left');

        expect(await page.getWidgetLocationValue(widgetText, 'top')).toBe(220, 'widget-text top');
        expect(await page.getWidgetLocationValue(widgetText, 'left')).toBe(0, 'widget-text left');

        expect(JSON.parse(await page.getLayoutOutput())).toEqual(layoutMock);
    });
});
