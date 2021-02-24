import { browser, Key } from 'protractor';
import { imageCompare } from '../common/image-compare';
import { OrganizationChartPage } from './organization-chart.po.spec';


describe('Organization Chart Tests', () => {

    let page: OrganizationChartPage;

    beforeEach(async () => {
        page = new OrganizationChartPage();
        await page.getPage();
    });

    it('should have correct initial states', async () => {
        expect(await page.nodes.count()).toBe(2);

        expect(await imageCompare('organization-chart-initial')).toEqual(0);
    });

    it('should not toggle node when allowtoggling = false when clicking', async () => {
        await page.toggleNodes.click();

        await page.nodes.get(1).click();

        expect(await imageCompare('organization-chart-disallow-toggle')).toEqual(0);
    });

    it('should not toggle node when allowtoggling = false when using keyboard', async () => {
        await page.toggleNodes.click();
        await page.nodes.sendKeys(Key.ENTER);

        await browser.actions().sendKeys(Key.ARROW_DOWN).perform();

        expect(await imageCompare('organization-chart-disallow-toggling-keyboard')).toEqual(0);
    });

    it('should allow toggle of mode when allowtoggling = true', async () => {
        await page.nodes.get(1).click();

        expect(await page.nodes.count()).toBe(3);

        expect(await imageCompare('organization-chart-allow-toggle')).toEqual(0);
    });

});

