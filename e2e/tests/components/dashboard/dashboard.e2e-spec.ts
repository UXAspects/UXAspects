import { browser, ElementFinder, Key } from 'protractor';
import { imageCompareFullPageScreen } from '../common/image-compare';
import { DashboardPage, Direction } from './dashboard.po.spec';

describe('Dashboard Tests', () => {

    let page: DashboardPage;
    let widget1: ElementFinder;
    let widget2: ElementFinder;
    let widget3: ElementFinder;
    let widget4: ElementFinder;

    beforeEach(async () => {
        page = new DashboardPage();
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

    it('should have correct initial states', async () => {
        expect(await page.getWidgetLocationValue(widget1, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget1, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(440);
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(440);
        expect(await page.getWidgetLocationValue(widget3, 'left')).toBe(554);

        expect(await page.getWidgetLocationValue(widget4, 'top')).toBe(440);
        expect(await page.getWidgetLocationValue(widget4, 'left')).toBe(831);

        expect(await imageCompareFullPageScreen('dashboard-initial')).toEqual(0);
    });

    it('should react correctly when dashboard options are changed', async () => {

        // click 'change options' button
        await page.changeOptions.click();

        expect(await page.getWidgetLocationValue(widget1, 'width')).toBe(888);
        expect(await page.getWidgetLocationValue(widget1, 'height')).toBe(500);
        expect(await page.getWidgetLocationValue(widget1, 'padding')).toBe(20);

        expect(await page.getWidgetLocationValue(widget2, 'width')).toBe(444);
        expect(await page.getWidgetLocationValue(widget2, 'height')).toBe(250);
        expect(await page.getWidgetLocationValue(widget2, 'padding')).toBe(20);

        expect(await page.getWidgetLocationValue(widget3, 'width')).toBe(222);
        expect(await page.getWidgetLocationValue(widget3, 'height')).toBe(250);
        expect(await page.getWidgetLocationValue(widget3, 'padding')).toBe(20);

        expect(await page.getWidgetLocationValue(widget4, 'width')).toBe(222);
        expect(await page.getWidgetLocationValue(widget4, 'height')).toBe(250);
        expect(await page.getWidgetLocationValue(widget4, 'padding')).toBe(20);

        expect(await imageCompareFullPageScreen('dashboard-option-change')).toEqual(0);
    });

    it('should react correctly when a widget is moved down', async () => {

        const layoutMock =  [{ id: 'analytics-1-widget', col: 0, row: 1, colSpan: 4, rowSpan: 2},
                             { id: 'subscription-widget', col: 0, row: 0, colSpan: 2, rowSpan: 1},
                             { id: 'users-widget', col: 2, row: 0, colSpan: 1, rowSpan: 1},
                             { id: 'alert-widget', col: 3, row: 0, colSpan: 1, rowSpan: 1}];

        // drag the top widget down
        await browser.actions().dragAndDrop(widget1, { x: 0, y: 250 }).perform();

        expect(await page.getWidgetLocationValue(widget1, 'top')).toBe(220, 'widget1 top');
        expect(await page.getWidgetLocationValue(widget1, 'left')).toBe(0, 'widget1 left');

        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(0, 'widget2 top');
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(0, 'widget2 left');

        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(0, 'widget3 top');
        expect(await page.getWidgetLocationValue(widget3, 'left')).toBe(554, 'widget3 left');

        expect(await page.getWidgetLocationValue(widget4, 'top')).toBe(0, 'widget4 top');
        expect(await page.getWidgetLocationValue(widget4, 'left')).toBe(831, 'widget4 left');

        expect(JSON.parse(await page.getLayoutOutput())).toEqual(layoutMock);
    });

    it('should react correctly when a widget is moved up', async () => {

        const layoutMock =  [{ id: 'analytics-1-widget', col: 0, row: 0, colSpan: 4, rowSpan: 2},
                             { id: 'subscription-widget', col: 0, row: 2, colSpan: 2, rowSpan: 1},
                             { id: 'users-widget', col: 2, row: 2, colSpan: 1, rowSpan: 1},
                             { id: 'alert-widget', col: 3, row: 2, colSpan: 1, rowSpan: 1}];

        // drag the top widget down
        await browser.actions().dragAndDrop(widget1, { x: 0, y: 250 }).perform();

        // drag the top widget back up
        await browser.actions().dragAndDrop(widget1, { x: 0, y: -250 }).perform();

        expect(await page.getWidgetLocationValue(widget1, 'top')).toBe(0, 'widget1 0 top');
        expect(await page.getWidgetLocationValue(widget1, 'left')).toBe(0, 'widget1 0 left');

        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(440, 'widget2 top');
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(0, 'widget2 left');

        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(440, 'widget3 top');
        expect(await page.getWidgetLocationValue(widget3, 'left')).toBe(554, 'widget3 left');

        expect(await page.getWidgetLocationValue(widget4, 'top')).toBe(440, 'widget4 top');
        expect(await page.getWidgetLocationValue(widget4, 'left')).toBe(831, 'widget4 left');

        expect(JSON.parse(await page.getLayoutOutput())).toEqual(layoutMock);
    });

    it('should react correctly when a widget is moved right', async () => {

        const layoutMock =  [{ id: 'analytics-1-widget', col: 0, row: 0, colSpan: 4, rowSpan: 2},
                             { id: 'subscription-widget', col: 1, row: 2, colSpan: 2, rowSpan: 1},
                             { id: 'users-widget', col: 0, row: 2, colSpan: 1, rowSpan: 1},
                             { id: 'alert-widget', col: 3, row: 2, colSpan: 1, rowSpan: 1}];

        // drag the widget right
        await browser.actions().dragAndDrop(widget2, { x: 250, y: 0 }).perform();

        expect(await page.getWidgetLocationValue(widget1, 'top')).toBe(0, 'widget1 top');
        expect(await page.getWidgetLocationValue(widget1, 'left')).toBe(0, 'widget1 left');

        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(440, 'widget2 top');
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(277, 'widget2 left');

        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(440, 'widget3 top');
        expect(await page.getWidgetLocationValue(widget3, 'left')).toBe(0, 'widget3 left');

        expect(await page.getWidgetLocationValue(widget4, 'top')).toBe(440, 'widget4 top');
        expect(await page.getWidgetLocationValue(widget4, 'left')).toBe(831, 'widget4 left');

        expect(JSON.parse(await page.getLayoutOutput())).toEqual(layoutMock);

    });

    it('should react correctly when a widget is moved left', async () => {

        const layoutMock =  [{ id: 'analytics-1-widget', col: 0, row: 0, colSpan: 4, rowSpan: 2},
                             { id: 'subscription-widget', col: 0, row: 2, colSpan: 2, rowSpan: 1},
                             { id: 'users-widget', col: 3, row: 2, colSpan: 1, rowSpan: 1},
                             { id: 'alert-widget', col: 2, row: 2, colSpan: 1, rowSpan: 1}];

        // drag the widget left
        await browser.actions().dragAndDrop(widget4, { x: -250, y: 0 }).perform();

        expect(await page.getWidgetLocationValue(widget1, 'top')).toBe(0, 'widget1 top');
        expect(await page.getWidgetLocationValue(widget1, 'left')).toBe(0, 'widget1 left');

        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(440, 'widget2 top');
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(0, 'widget2 left');

        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(440, 'widget3 top');
        expect(await page.getWidgetLocationValue(widget3, 'left')).toBe(831, 'widget3 left');

        expect(await page.getWidgetLocationValue(widget4, 'top')).toBe(440, 'widget4 top');
        expect(await page.getWidgetLocationValue(widget4, 'left')).toBe(554, 'widget4 left');

        expect(JSON.parse(await page.getLayoutOutput())).toEqual(layoutMock);

    });

    it('should allow subsequent widgets to be moved', async () => {

        const layoutMock =  [{ id: 'analytics-1-widget', col: 0, row: 2, colSpan: 4, rowSpan: 2},
                             { id: 'subscription-widget', col: 2, row: 1, colSpan: 2, rowSpan: 1},
                             { id: 'users-widget', col: 2, row: 0, colSpan: 1, rowSpan: 1},
                             { id: 'alert-widget', col: 3, row: 0, colSpan: 1, rowSpan: 1}];

        // drag widget1 down
        await browser.actions().dragAndDrop(widget1, { x: 0, y: 250 }).perform();

        // drag widget2 down and right
        await browser.actions().dragAndDrop(widget2, { x: 500, y: 250 }).perform();

        expect(await page.getWidgetLocationValue(widget1, 'top')).toBe(440, 'widget1 top');
        expect(await page.getWidgetLocationValue(widget1, 'left')).toBe(0, 'widget1 left');

        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(220, 'widget2 top');
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(554, 'widget2 left');

        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(0, 'widget3 top');
        expect(await page.getWidgetLocationValue(widget3, 'left')).toBe(554, 'widget3 left');

        expect(await page.getWidgetLocationValue(widget4, 'top')).toBe(0, 'widget4 top');
        expect(await page.getWidgetLocationValue(widget4, 'left')).toBe(831, 'widget4 left');

        expect(JSON.parse(await page.getLayoutOutput())).toEqual(layoutMock);
    });

    it('should manage focus of the grab handles', async () => {

        // Set focus to the element before the dashboard
        await page.topFocusTarget.click();

        // Tab into the dashboard
        await browser.actions().sendKeys(Key.TAB).perform();

        // First grab handle should have focus
        const grabHandle1 = await page.getGrabHandle('analytics-1-widget');
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
        const grabHandle2 = await page.getGrabHandle('subscription-widget');
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
        const grabHandle2 = await page.getGrabHandle('subscription-widget');
        expect(await page.hasFocus(grabHandle2)).toBe(true);
    });

    it('should allow grab mode to be activated', async () => {

        await page.enableGrabMode();

        // check we are in grab mode
        const classes = await page.dashboard.getAttribute('class');

        // expect the class to be applied to the dashboard
        expect(classes).toEqual('customizable-dashboard dashboard-grabbing');

        await page.checkAnnouncerText('Usage Analytics panel is currently on row 0, column 0 and is 4 columns wide and 2 rows high. Use the cursor keys to move the widget and the cursor keys with the control modifier to resize the widget. Press enter to commit changes and press escape to cancel changes.');

        expect(await imageCompareFullPageScreen('dashboard-grab-mode')).toEqual(0);
    });

    it('should allow widget to be moved down in grab mode', async () => {
        await page.enableGrabMode();

        // try to move down
        await page.moveWidget(Direction.Down);

        // expect the announcer to read the correct text
        await page.checkAnnouncerText('Usage Analytics panel is moved down to row 1, column 0. Use the cursor keys to continue moving and resizing, enter to commit, or escape to cancel.');
    });

    it('should prevent widgets moving when they are not able to', async () => {
        await page.enableGrabMode();

        // try to move right
        await page.moveWidget(Direction.Right);

        // expect the announcer to read the correct text
        await page.checkAnnouncerText('Cannot move the Usage Analytics panel right, because it is at the right edge of the dashboard');

        // try to move left
        await page.moveWidget(Direction.Left);

        // expect the announcer to read the correct text
        await page.checkAnnouncerText('Cannot move the Usage Analytics panel left, because it is at the left edge of the dashboard');

        // try to move up
        await page.moveWidget(Direction.Up);

        // expect the announcer to read the correct text
        await page.checkAnnouncerText('Cannot move the Usage Analytics panel up, because it is at the top edge of the dashboard');
    });

    it('should commit the change when space is pressed again', async () => {
        await page.enableGrabMode();

        // try to move down
        await page.moveWidget(Direction.Down);

        // commit the changes
        await page.disableGrabMode();

        // expect the announcer to read the correct text
        await page.checkAnnouncerText('Moving and resizing complete. Usage Analytics panel is moved down to row 1, column 0. Service panel is moved up to row 0, column 0. Users panel is moved up to row 0, column 2. Alert panel is moved up to row 0, column 3. Press space to move and resize the Usage Analytics panel.');
    });

    it('should cancel the change when escape is pressed', async () => {
        await page.enableGrabMode();

        // try to move down
        await page.moveWidget(Direction.Down);

        // cancel the movement
        await page.cancelGrabMode();

        // expect the announcer to read the correct text
        await page.checkAnnouncerText('Moving and resizing cancelled. Dashboard with 4 columns, containing 4 panels. Usage Analytics panel in row 0, column 0, is 4 columns wide and 2 rows high. Service panel in row 2, column 0, is 2 columns wide and 1 rows high. Users panel in row 2, column 2, is 1 columns wide and 1 rows high. Alert panel in row 2, column 3, is 1 columns wide and 1 rows high. Press space to move and resize the Usage Analytics panel.');
    });

    it('should allow the rowSpan to remain the same size in stacked mode as regular mode', async () => {
        // resize page so in stacked mode
        await browser.driver.manage().window().setSize(400, 600);

        // check we are in grab mode
        const widgetSpan = await widget1.$('div').getAttribute('class');

        // rowSpan remains as 2 in stacked mode
        expect(widgetSpan).toContain('widget-row-span-2');

        expect(await page.getWidgetLocationValue(widget1, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget1, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(440);
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(660);
        expect(await page.getWidgetLocationValue(widget3, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widget4, 'top')).toBe(880);
        expect(await page.getWidgetLocationValue(widget4, 'left')).toBe(0);

        expect(await imageCompareFullPageScreen('dashboard-stacked-mode-rowSpan')).toEqual(0);
    });

    it('should not change the order of widgets when moving from regular to stacked mode', async () => {
        // drag the top widget down
        await browser.actions().dragAndDrop(widget1, { x: 0, y: 250 }).perform();

        expect(await page.getWidgetLocationValue(widget1, 'top')).toBe(220);
        expect(await page.getWidgetLocationValue(widget1, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget3, 'left')).toBe(554);

        expect(await page.getWidgetLocationValue(widget4, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget4, 'left')).toBe(831);

        // resize page so in stacked mode
        await browser.driver.manage().window().setSize(400, 600);

        // expect the widgets not to shift order
        expect(await page.getWidgetLocationValue(widget1, 'top')).toBe(660);
        expect(await page.getWidgetLocationValue(widget1, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(220);
        expect(await page.getWidgetLocationValue(widget3, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widget4, 'top')).toBe(440);
        expect(await page.getWidgetLocationValue(widget4, 'left')).toBe(0);


        expect(await imageCompareFullPageScreen('dashboard-stacked-mode-widget-order')).toEqual(0);
    });

    it('should allow the rowSpan to remain the same size in stacked mode as regular mode', async () => {
        // resize page so in stacked mode
        await browser.driver.manage().window().setSize(400, 600);

        // check we are in grab mode
        const widgetSpan = await widget1.$('div').getAttribute('class');

        // rowSpan remains as 2 in stacked mode
        expect(widgetSpan).toContain('widget-row-span-2');

        expect(await page.getWidgetLocationValue(widget1, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget1, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(440);
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(660);
        expect(await page.getWidgetLocationValue(widget3, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widget4, 'top')).toBe(880);
        expect(await page.getWidgetLocationValue(widget4, 'left')).toBe(0);

        expect(await imageCompareFullPageScreen('dashboard-stacked-mode-rowSpan')).toEqual(0);
    });

    it('should not change the order of widgets when moving from regular to stacked mode', async () => {
        // drag the top widget down
        await browser.actions().dragAndDrop(widget1, { x: 0, y: 250 }).perform();

        expect(await page.getWidgetLocationValue(widget1, 'top')).toBe(220);
        expect(await page.getWidgetLocationValue(widget1, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget3, 'left')).toBe(554);

        expect(await page.getWidgetLocationValue(widget4, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget4, 'left')).toBe(831);

        // resize page so in stacked mode
        await browser.driver.manage().window().setSize(400, 600);

        // expect the widgets not to shift order
        expect(await page.getWidgetLocationValue(widget1, 'top')).toBe(660);
        expect(await page.getWidgetLocationValue(widget1, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(220);
        expect(await page.getWidgetLocationValue(widget3, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widget4, 'top')).toBe(440);
        expect(await page.getWidgetLocationValue(widget4, 'left')).toBe(0);


        expect(await imageCompareFullPageScreen('dashboard-stacked-mode-widget-order')).toEqual(0);
    });

    it('should allow the rowSpan to remain the same size in stacked mode as regular mode', async () => {
        // resize page so in stacked mode
        await browser.driver.manage().window().setSize(400, 600);

        // check we are in grab mode
        const widgetSpan = await widget1.$('div').getAttribute('class');

        // rowSpan remains as 2 in stacked mode
        expect(widgetSpan).toContain('widget-row-span-2');

        expect(await page.getWidgetLocationValue(widget1, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget1, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(440);
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(660);
        expect(await page.getWidgetLocationValue(widget3, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widget4, 'top')).toBe(880);
        expect(await page.getWidgetLocationValue(widget4, 'left')).toBe(0);

        expect(await imageCompareFullPageScreen('dashboard-stacked-mode-rowSpan')).toEqual(0);
    });

    it('should not change the order of widgets when moving from regular to stacked mode', async () => {
        // drag the top widget down
        await browser.actions().dragAndDrop(widget1, { x: 0, y: 250 }).perform();

        expect(await page.getWidgetLocationValue(widget1, 'top')).toBe(220);
        expect(await page.getWidgetLocationValue(widget1, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget3, 'left')).toBe(554);

        expect(await page.getWidgetLocationValue(widget4, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget4, 'left')).toBe(831);

        // resize page so in stacked mode
        await browser.driver.manage().window().setSize(400, 600);

        // expect the widgets not to shift order
        expect(await page.getWidgetLocationValue(widget1, 'top')).toBe(660);
        expect(await page.getWidgetLocationValue(widget1, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(220);
        expect(await page.getWidgetLocationValue(widget3, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widget4, 'top')).toBe(440);
        expect(await page.getWidgetLocationValue(widget4, 'left')).toBe(0);


        expect(await imageCompareFullPageScreen('dashboard-stacked-mode-widget-order')).toEqual(0);
    });

    it('should allow the rowSpan to remain the same size in stacked mode as regular mode', async () => {
        // resize page so in stacked mode
        await browser.driver.manage().window().setSize(400, 600);

        // check we are in grab mode
        const widgetSpan = await widget1.$('div').getAttribute('class');

        // rowSpan remains as 2 in stacked mode
        expect(widgetSpan).toContain('widget-row-span-2');

        expect(await page.getWidgetLocationValue(widget1, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget1, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(440);
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(660);
        expect(await page.getWidgetLocationValue(widget3, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widget4, 'top')).toBe(880);
        expect(await page.getWidgetLocationValue(widget4, 'left')).toBe(0);

        expect(await imageCompareFullPageScreen('dashboard-stacked-mode-rowSpan')).toEqual(0);
    });

    it('should not change the order of widgets when moving from regular to stacked mode', async () => {
        // drag the top widget down
        await browser.actions().dragAndDrop(widget1, { x: 0, y: 250 }).perform();

        expect(await page.getWidgetLocationValue(widget1, 'top')).toBe(220);
        expect(await page.getWidgetLocationValue(widget1, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget3, 'left')).toBe(554);

        expect(await page.getWidgetLocationValue(widget4, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget4, 'left')).toBe(831);

        // resize page so in stacked mode
        await browser.driver.manage().window().setSize(400, 600);

        // expect the widgets not to shift order
        expect(await page.getWidgetLocationValue(widget1, 'top')).toBe(660);
        expect(await page.getWidgetLocationValue(widget1, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(220);
        expect(await page.getWidgetLocationValue(widget3, 'left')).toBe(0);

        expect(await page.getWidgetLocationValue(widget4, 'top')).toBe(440);
        expect(await page.getWidgetLocationValue(widget4, 'left')).toBe(0);


        expect(await imageCompareFullPageScreen('dashboard-stacked-mode-widget-order')).toEqual(0);
    });
});
