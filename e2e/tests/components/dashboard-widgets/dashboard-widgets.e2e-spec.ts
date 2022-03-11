import {$, browser, ElementFinder} from 'protractor';
import {WebElement} from 'selenium-webdriver';
import {DashboardWidgetsPage} from './dashboard-widgets.po.spec';
import {imageCompare} from '../common/image-compare';

describe('Dashboard Widgets', () => {

    let page: DashboardWidgetsPage;
    let widgetActions: ElementFinder;
    let widgetSelect: ElementFinder;
    let widgetTable: ElementFinder;
    let widgetText: ElementFinder;
    let widgetTextReadOnly: ElementFinder;

    beforeEach(async () => {
        page = new DashboardWidgetsPage();
        await page.getPage();

        // set the browser window to a specific size to ensure consistency
        await browser.driver.manage().window().setSize(1320, 800);

        widgetActions = await page.getWidget('actions');
        widgetSelect = await page.getWidget('select');
        widgetTable = await page.getWidget('table');
        widgetText = await page.getWidget('text');
        widgetTextReadOnly = await page.getWidget('text-readonly');
    });

    // restore the window to its original size after all these tests have run
    afterAll(async () => {
        await browser.driver.manage().window().setSize(800, 600);
    });

    it('should have correct initial states', async () => {
        expect(await imageCompare('dashboard-widgets-initial')).toEqual(0);

        expect(await page.getWidgetLocationValue(widgetActions, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widgetActions, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widgetSelect, 'top')).toBe(112);
        expect(await page.getWidgetLocationValue(widgetSelect, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widgetTable, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widgetTable, 'left')).toBe(554);

        expect(await page.getWidgetLocationValue(widgetText, 'top')).toBe(224);
        expect(await page.getWidgetLocationValue(widgetText, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widgetTextReadOnly, 'top')).toBe(448);
        expect(await page.getWidgetLocationValue(widgetTextReadOnly, 'left')).toBe(0);
    });

    it('should react correctly when a widget is moved and resized', async () => {
        const layoutMock = [
            {id: 'widget-actions', col: 0, row: 6, colSpan: 2, rowSpan: 1, minColSpan: 1, minRowSpan: 1},
            {id: 'widget-table', col: 2, row: 0, colSpan: 2, rowSpan: 2, minColSpan: 1, minRowSpan: 1},
            {id: 'widget-select', col: 0, row: 0, colSpan: 2, rowSpan: 1, minColSpan: 1, minRowSpan: 1},
            {id: 'widget-text', col: 0, row: 2, colSpan: 4, rowSpan: 2, minColSpan: 1, minRowSpan: 1},
            {id: 'widget-text-readonly', col: 0, row: 4, colSpan: 4, rowSpan: 2, minColSpan: 1, minRowSpan: 1}
        ];

        // drag the top widget down
        await browser.actions().dragAndDrop(widgetActions.$('button.widget-grab-handle'), {x: 0, y: 800}).perform();

        expect(await imageCompare('dashboard-widgets-moved')).toEqual(0);

        expect(await page.getWidgetLocationValue(widgetActions, 'top')).toBe(672, 'widget-actions top');
        expect(await page.getWidgetLocationValue(widgetActions, 'left')).toBe(0, 'widget-actions left');

        expect(await page.getWidgetLocationValue(widgetSelect, 'top')).toBe(0, 'widget-select top');
        expect(await page.getWidgetLocationValue(widgetSelect, 'left')).toBe(0, 'widget-select left');

        expect(await page.getWidgetLocationValue(widgetTable, 'top')).toBe(0, 'widget-table top');
        expect(await page.getWidgetLocationValue(widgetTable, 'left')).toBe(554, 'widget-table left');

        expect(await page.getWidgetLocationValue(widgetText, 'top')).toBe(224, 'widget-text top');
        expect(await page.getWidgetLocationValue(widgetText, 'left')).toBe(0, 'widget-text left');

        expect(await page.getWidgetLocationValue(widgetTextReadOnly, 'top')).toBe(448, 'widget-text top');
        expect(await page.getWidgetLocationValue(widgetTextReadOnly, 'left')).toBe(0, 'widget-text left');

        expect(JSON.parse(await page.getLayoutOutput())).toEqual(layoutMock);
    });

    it('should react correctly on action click', async () => {
        // Click on button of action 'accept'
        const acceptButton: WebElement = widgetActions.$('#dashboard-action-widget-button-accept');
        await acceptButton.click();

        // Expect the status label to have changed to 'Accept'
        const label: WebElement = widgetActions.$('#dashboard-action-widget-label');
        expect(await label.getText()).toEqual('accept');
    });

    it('should react correctly on selection', async () => {
        // Click on the drop-down to open it
        const dropDownButton: WebElement = widgetSelect.$('.select-dropdown').$('.ux-select-container').$('button');
        await dropDownButton.click();
        expect(await imageCompare('dashboard-widgets-dropdown-open')).toEqual(0);

        // Click on option 1 to change the value
        const option1: WebElement = $('#dashboard-select-widget-item-something');
        await option1.click();

        // Expect the drop-down label to have changed to 'One'
        const label: WebElement = widgetSelect.$('#dashboard-select-widget-label');
        expect(await label.getText()).toEqual('One');
    });

    it('should allow to edit text', async () => {
        await page.clickDetailsButton(widgetText);
        expect(await imageCompare('dashboard-widgets-edit-open')).toEqual(0);
        await page.writeText('edited');
        expect(await imageCompare('dashboard-widgets-edit-edited')).toEqual(0);

        await page.clickSidePanelButton('cancel');
        expect(await imageCompare('dashboard-widgets-initial')).toEqual(0);

        await page.clickDetailsButton(widgetText);
        await page.writeText('edited again');

        await page.clickSidePanelButton('save');
        expect(await imageCompare('dashboard-widgets-edited')).toEqual(0);
    });

    it('should display read-only text', async () => {
        await page.clickDetailsButton(widgetTextReadOnly);
        expect(await imageCompare('dashboard-widgets-view-open')).toEqual(0);
    });
});
