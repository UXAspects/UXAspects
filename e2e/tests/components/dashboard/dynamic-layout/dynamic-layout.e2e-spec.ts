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

    it('should resize widget 1 to 3 rows when the rowSpan is changed to 3, widgets 2-4 should move down one row', async () => {
        // expect widget 1 to have a rowSpan of 2
        expect(await page.getWidgetLocationValue(widget1, 'height')).toBe(440);

        // expect widgets 2-4 to be in row 2
        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(440);
        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(440);
        expect(await page.getWidgetLocationValue(widget4, 'top')).toBe(440);

        // change rowSpan to 3
        // await page.wgt1RowSpan3.click();

        // expect widget 1 to have a rowSpan of 3
        expect(await page.getWidgetLocationValue(widget1, 'height')).toBe(660);

        // expect widgets 2-4 to be in row 3
        expect(await page.getWidgetLocationValue(widget2, 'top')).toBe(660);
        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(660);
        expect(await page.getWidgetLocationValue(widget4, 'top')).toBe(660);
    });

    it('should not resize widget 1 to 1 row when the rowSpan is changed to 1 as the minRowSpan is set to 2', async () => {
        // expect widget 1 to have a rowSpan of 2
        expect(await page.getWidgetLocationValue(widget1, 'height')).toBe(440);

        // change rowSpan to 1
        // await page.wgt1RowSpan1.click();

        // expect widget 1 to not change as it has a minRowSpan of 2
        expect(await page.getWidgetLocationValue(widget1, 'height')).toBe(440);
    });

    it('should resize widget 2 to 3 columns when the colSpan is changed to 3, widget 3 should move down one row', async () => {
        // expect widget 2 to have a colSpan of 2
        expect(await page.getWidgetLocationValue(widget2, 'width')).toBe(554);
        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(440);

        // change colSpan to 1
        // await page.wgt2ColSpan3.click();

        // expect widget 2 to have a colSpan of 3
        expect(await page.getWidgetLocationValue(widget2, 'width')).toBe(831);
        // expect widget 3 to move down one row
        expect(await page.getWidgetLocationValue(widget3, 'top')).toBe(660);
    });

    it('should not resize widget 2 to 1 column when the colSpan is changed to 1 as the minColSpan is set to 2', async () => {
        // expect widget 2 to have a colSpan of 2
        expect(await page.getWidgetLocationValue(widget2, 'width')).toBe(554);

        // change colSpan to 1
        // await page.wgt2ColSpan1.click();

        // expect widget 2 to have a colSpan of 2 as it has a minColSpan of 2
        expect(await page.getWidgetLocationValue(widget2, 'width')).toBe(554);
    });


});
