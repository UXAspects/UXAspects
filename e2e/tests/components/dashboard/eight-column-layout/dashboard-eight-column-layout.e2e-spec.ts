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

    it('should respond correctly when widget 1 is moved down over a widget 3, when widget 1 is positioned to the left', async () => {
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

    it('should respond correctly when widget 1 is moved down over a widget 3, when widget 1 positioned to the right', async () => {
        // Change layout so widget 1 is to the right, this allows testing of widgets sifting to the left
        await page.updateLayout.click();

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
});
