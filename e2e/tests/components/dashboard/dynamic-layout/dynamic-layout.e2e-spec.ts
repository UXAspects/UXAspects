import { browser, ElementFinder } from 'protractor';
import { DashboardDynamicLayoutPage } from './dynamic-layout.po.spec';

describe('Dashboard Dynamic Layout', () => {

    let page: DashboardDynamicLayoutPage;
    let widget1: ElementFinder;
    let widget2: ElementFinder;
    let widget3: ElementFinder;
    let widget4: ElementFinder;

    beforeEach(async () => {
        page = new DashboardDynamicLayoutPage();
        await page.getPage();

        // set the browser window to a specific size to ensure consistency
        await browser.driver.manage().window().setSize(1320, 800);

        widget1 = await page.getWidget(0);
        widget2 = await page.getWidget(1);
        widget3 = await page.getWidget(2);
        widget4 = await page.getWidget(3);
    });

    it('should resize widget 1 to 2 rows when the rowSpan is changed to 2, widgets 4 should move down one row', async () => {
        // expect widget 1 to have a rowSpan of 1
        expect(await page.getWidgetLocationValue(widget1, 'height')).toBe(220);

        // expect widgets 4 to be on row 1
        expect(await page.getWidgetLocationValue(widget4, 'top')).toBe(220);

        // change rowSpan to 2
        await page.widget1RowIncrement.click();

        // expect widget 1 to have a rowSpan of 2
        expect(await page.getWidgetLocationValue(widget1, 'height')).toBe(440);

        // expect widgets 4 to be in row 2
        expect(await page.getWidgetLocationValue(widget4, 'top')).toBe(440);
    });

    it('should resize widget 1 to 2 columns when the colSpan is changed to 2, widgets 2 should move down one row', async () => {
        // expect widget 1 to have a colSpan of 1
        expect(await page.getWidgetLocationValue(widget1, 'width')).toBe(554);

        // expect widgets 2 to be on row 0
        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(0);

        // change rowSpan to 2
        await page.widget1ColIncrement.click();

        // expect widget 1 to have a colSpan of 2
        expect(await page.getWidgetLocationValue(widget1, 'width')).toBe(831);

        // expect widgets 2 to be in row 1
        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(220);
    });

    it('should not resize widget 4 to 1 row when the rowSpan is changed to 1 as the minRowSpan is set to 2', async () => {
        // expect widget 4 to have a rowSpan of 2
        expect(await page.getWidgetLocationValue(widget4, 'height')).toBe(440);

        // change rowSpan to 1
        await page.widget4RowDecrement.click();

        // expect widget 4 to not change as it has a minRowSpan of 2
        expect(await page.getWidgetLocationValue(widget4, 'height')).toBe(440);
    });

    it('should not resize widget 4 to 3 columns when the colSpan is changed to 3 as the minColSpan is set to 4', async () => {
        // expect widget 4 to have a ColSpan of 4
        expect(await page.getWidgetLocationValue(widget4, 'width')).toBe(1108);

        // change colSpan to 2
        await page.widget4ColDecrement.click();

        // expect widget 4 to not change as it has a minColSpan of 3
        expect(await page.getWidgetLocationValue(widget4, 'width')).toBe(1108);
    });

    it('should resize widget 1 to 4 columns and 2 rows when the colSpan is changed to 4 and the rowSpan is changed to 2, widgets 2-4 should react correctly', async () => {
        // widget 1 should have the correct initial size
        expect(await page.getWidgetLocationValue(widget1, 'height')).toBe(220);
        expect(await page.getWidgetLocationValue(widget1, 'width')).toBe(554);

        // widgets 2-4 should have the correct initial positions
        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(554);
        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(0);
        expect(await page.getWidgetLocationValue(widget3, 'left')).toBe(831);
        expect(await page.getWidgetLocationValue(widget4, 'top')).toBe(220);
        expect(await page.getWidgetLocationValue(widget4, 'left')).toBe(0);

        // resize widget 1
        await page.widget1BothIncrement.click();
        await page.widget1BothIncrement.click();

        // widget 1 should have the correct new size
        expect(await page.getWidgetLocationValue(widget1, 'height')).toBe(660);
        expect(await page.getWidgetLocationValue(widget1, 'width')).toBe(1108);

        // widgets 2-4 should have the correct positions
        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(660);
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(554);
        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(660);
        expect(await page.getWidgetLocationValue(widget3, 'left')).toBe(831);
        expect(await page.getWidgetLocationValue(widget4, 'top')).toBe(880);
        expect(await page.getWidgetLocationValue(widget4, 'left')).toBe(0);
    });

    it('should resize widget 1 and widgets 2-4 should react correctly', async () => {
        // change layout
        await page.changeLayout.click();

        // increase both colSpan and rowSpan
        await page.widget1BothIncrement.click();

        // widget 1 should have the correct new size
        expect(await page.getWidgetLocationValue(widget1, 'height')).toBe(660);
        expect(await page.getWidgetLocationValue(widget1, 'width')).toBe(1108);

        // widgets 2-4 should have the correct positions
        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(880);
        expect(await page.getWidgetLocationValue(widget2, 'left')).toBe(831);
        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(660);
        expect(await page.getWidgetLocationValue(widget3, 'left')).toBe(831);
        expect(await page.getWidgetLocationValue(widget4, 'top')).toBe(1100);
        expect(await page.getWidgetLocationValue(widget4, 'left')).toBe(0);
    });
});
