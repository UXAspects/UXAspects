import { browser, ElementFinder, Key } from 'protractor';
import { DashboardEightColumnLayoutPage } from './dashboard-eight-column-layout.po.spec';

describe('Dashboard Eight Column Layout', () => {

    let page: DashboardEightColumnLayoutPage;
    let widget1: ElementFinder;
    let widget2: ElementFinder;
    let widget3: ElementFinder;
    let widget4: ElementFinder;

    beforeEach(async () => {
        page = new DashboardEightColumnLayoutPage();
        await page.getPage();

        // set the browser window to a specific size to ensure consistency
        await browser.driver.manage().window().setSize(1320, 800);

        widget1 = await page.getWidget(0);
        widget2 = await page.getWidget(1);
        widget3 = await page.getWidget(2);
        widget4 = await page.getWidget(3);
    });

    it('should initialize with the correct layout', async () => {
        expect(await page.getWidgetLocationValue(widget1, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget1, 'left')).toBe(0);
        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(276);
        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(220);
        expect(await page.getWidgetLocationValue(widget3, 'left')).toBe(0);
        expect(await page.getWidgetLocationValue(widget4, 'top')).toBe(220);
        expect(await page.getWidgetLocationValue(widget4, 'left')).toBe(552);
    });

    it('should respond correctly when widget 1 is moved down over a widget 3', async () => {
        // Tab into the dashboard and move to the next grab handle
        await page.topFocus.click();
        await browser.actions()
            .sendKeys(Key.TAB)
            .sendKeys(Key.SPACE)
            .sendKeys(Key.ARROW_DOWN)
            .sendKeys(Key.SPACE)
            .perform();

        // expect widget 2 to remain where it is
        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(276);

        // expect widget 1 to move to row 1
        expect(await page.getWidgetLocationValue(widget1, 'top')).toBe(220);
        expect(await page.getWidgetLocationValue(widget1, 'left')).toBe(0);

        // expect widget 3 and 4 to move two columns to the right
        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(220);
        expect(await page.getWidgetLocationValue(widget3, 'left')).toBe(276);
        expect(await page.getWidgetLocationValue(widget4, 'top')).toBe(220);
        expect(await page.getWidgetLocationValue(widget4, 'left')).toBe(828);
    });

    it('should respond correctly when widget 1 is moved right when on the same row as widget 3 and 4', async () => {
        // Tab into the dashboard and move to the next grab handle
        await page.topFocus.click();
        await browser.actions()
            .sendKeys(Key.TAB)
            .sendKeys(Key.SPACE)
            .sendKeys(Key.ARROW_DOWN)
            .sendKeys(Key.SPACE)
            .perform();

        await browser.actions()
            .sendKeys(Key.SPACE)
            .sendKeys(Key.ARROW_RIGHT)
            .sendKeys(Key.SPACE)
            .perform();

        // expect widget 2 to remain where it is
        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(276);

        // expect widget 1 to be in col 1 row 1
        expect(await page.getWidgetLocationValue(widget1, 'top')).toBe(220);
        expect(await page.getWidgetLocationValue(widget1, 'left')).toBe(138);

        // expect widget 3 in col 3 row 1 and widget 4 in col 7 row 1
        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(220);
        expect(await page.getWidgetLocationValue(widget3, 'left')).toBe(414);
        expect(await page.getWidgetLocationValue(widget4, 'top')).toBe(220);
        expect(await page.getWidgetLocationValue(widget4, 'left')).toBe(966);
    });

    it('should respond correctly when widget 1 is moved down over a widget 3, with alternative layout', async () => {
        await page.initLayoutAlt.click();

        // Tab into the dashboard and move to the next grab handle
        await page.topFocus.click();
        await browser.actions()
            .sendKeys(Key.TAB)
            .sendKeys(Key.SPACE)
            .sendKeys(Key.ARROW_DOWN)
            .sendKeys(Key.SPACE)
            .perform();

        // expect widget 2 to remain where it is
        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(276);

        // expect widget 1 to move to row 1
        expect(await page.getWidgetLocationValue(widget1, 'top')).toBe(220);
        expect(await page.getWidgetLocationValue(widget1, 'left')).toBe(0);

        // expect widget 3 and 4 to move two columns to the right
        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(220);
        expect(await page.getWidgetLocationValue(widget3, 'left')).toBe(276);
        expect(await page.getWidgetLocationValue(widget4, 'top')).toBe(220);
        expect(await page.getWidgetLocationValue(widget4, 'left')).toBe(828);
    });
});

describe('Dashboard Eight Column Layout - Flipped', () => {

    let page: DashboardEightColumnLayoutPage;
    let widget1: ElementFinder;
    let widget2: ElementFinder;
    let widget3: ElementFinder;
    let widget4: ElementFinder;

    beforeEach(async () => {
        page = new DashboardEightColumnLayoutPage();
        await page.getPage();

        // set the browser window to a specific size to ensure consistency
        await browser.driver.manage().window().setSize(1320, 800);

        widget1 = await page.getWidget(0);
        widget2 = await page.getWidget(1);
        widget3 = await page.getWidget(2);
        widget4 = await page.getWidget(3);

        // Flip layout
        await page.flipLayout.click();
    });

    it('should initialize with the correct layout', async () => {
        expect(await page.getWidgetLocationValue(widget1, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget1, 'left')).toBe(828);
        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(0);
        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(220);
        expect(await page.getWidgetLocationValue(widget3, 'left')).toBe(552);
        expect(await page.getWidgetLocationValue(widget4, 'top')).toBe(220);
        expect(await page.getWidgetLocationValue(widget4, 'left')).toBe(414);
    });

    it('should respond correctly when widget 1 is moved down over a widget 3', async () => {
        // Tab into the dashboard and move to the next grab handle
        await page.topFocus.click();
        await browser.actions()
            .sendKeys(Key.TAB)
            .sendKeys(Key.SPACE)
            .sendKeys(Key.ARROW_DOWN)
            .sendKeys(Key.SPACE)
            .perform();

        // expect widget 2 to remain where it is
        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(0);

        // expect widget 1 to move to row 1
        expect(await page.getWidgetLocationValue(widget1, 'top')).toBe(220);
        expect(await page.getWidgetLocationValue(widget1, 'left')).toBe(828);

        // expect widget 3 and 4 to move two columns to the right
        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(220);
        expect(await page.getWidgetLocationValue(widget3, 'left')).toBe(276);
        expect(await page.getWidgetLocationValue(widget4, 'top')).toBe(220);
        expect(await page.getWidgetLocationValue(widget4, 'left')).toBe(138);
    });

    it('should respond correctly when widget 1 is moved left when on the same row as widget 3 and 4', async () => {
        // Tab into the dashboard and move to the next grab handle
        await page.topFocus.click();
        await browser.actions()
            .sendKeys(Key.TAB)
            .sendKeys(Key.SPACE)
            .sendKeys(Key.ARROW_DOWN)
            .sendKeys(Key.SPACE)
            .perform();

        await browser.actions()
            .sendKeys(Key.SPACE)
            .sendKeys(Key.ARROW_LEFT)
            .sendKeys(Key.SPACE)
            .perform();

        // expect widget 2 to remain where it is
        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(0);

        // expect widget 1 to move to row 1
        expect(await page.getWidgetLocationValue(widget1, 'top')).toBe(220);
        expect(await page.getWidgetLocationValue(widget1, 'left')).toBe(690);

        // expect widget 3 and 4 to move two columns to the right
        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(220);
        expect(await page.getWidgetLocationValue(widget3, 'left')).toBe(138);
        expect(await page.getWidgetLocationValue(widget4, 'top')).toBe(220);
        expect(await page.getWidgetLocationValue(widget4, 'left')).toBe(0);
    });

    it('should respond correctly when widget 1 is moved down over a widget 3, with alternative layout', async () => {
        await page.flipLayoutAlt.click();

        // Tab into the dashboard and move to the next grab handle
        await page.topFocus.click();
        await browser.actions()
            .sendKeys(Key.TAB)
            .sendKeys(Key.ARROW_RIGHT)
            .sendKeys(Key.SPACE)
            .sendKeys(Key.ARROW_DOWN)
            .sendKeys(Key.SPACE)
            .perform();

        // expect widget 2 to remain where it is
        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(0);

        // expect widget 1 to move to row 1
        expect(await page.getWidgetLocationValue(widget1, 'top')).toBe(220);
        expect(await page.getWidgetLocationValue(widget1, 'left')).toBe(828);

        // expect widget 3 and 4 to move two columns to the right
        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(220);
        expect(await page.getWidgetLocationValue(widget3, 'left')).toBe(276);
        expect(await page.getWidgetLocationValue(widget4, 'top')).toBe(220);
        expect(await page.getWidgetLocationValue(widget4, 'left')).toBe(138);
    });
});
