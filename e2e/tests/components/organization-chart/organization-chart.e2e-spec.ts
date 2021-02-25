import { browser, Key } from 'protractor';
import { imageCompare } from '../common/image-compare';
import { OrganizationChartPage } from './organization-chart.po.spec';

describe('Organization Chart', () => {

    let page: OrganizationChartPage;

    beforeEach(async () => {
        page = new OrganizationChartPage();
        await page.getPage();
    });

    it('should have correct initial states', async () => {
        expect(await page.nodes.count()).toBe(2);
        expect(await page.getNodeText(0)).toBe('Node 0');
        expect(await page.getNodeText(1)).toBe('Node 1');

        expect(await imageCompare('organization-chart-initial')).toEqual(0);
    });

    it('should collapse node on click', async () => {
        await page.nodes.get(0).click();

        expect(await page.nodes.count()).toBe(1);
        expect(await page.getNodeText(0)).toBe('Node 0');

        expect(await imageCompare('organization-chart-collapsed')).toEqual(0);
    });

    it('should expand node on click', async () => {
        await page.nodes.get(1).click();

        expect(await page.nodes.count()).toBe(3);
        expect(await page.getNodeText(2)).toBe('Node 2');

        expect(await imageCompare('organization-chart-expanded')).toEqual(0);
    });

    it('should collapse node on keyboard enter', async () => {
        await page.nodes.get(0).sendKeys(Key.ENTER);

        expect(await page.nodes.count()).toBe(1);
        expect(await page.getNodeText(0)).toBe('Node 0');
    });

    it('should expand node on keyboard enter', async () => {
        await page.nodes.get(1).sendKeys(Key.ENTER);

        expect(await page.nodes.count()).toBe(3);
        expect(await page.getNodeText(2)).toBe('Node 2');
    });

    describe('with toggleNodesOnClick = false', () => {
        beforeEach(async () => {
            await page.toggleNodesOnClick.click();
        });

        it('should not collapse node on click', async () => {
            await page.nodes.get(0).click();

            expect(await page.nodes.count()).toBe(2);
            expect(await page.getNodeText(0)).toBe('Node 0');
            expect(await page.getNodeText(1)).toBe('Node 1');
        });

        it('should not expand node on click', async () => {
            await page.nodes.get(1).click();

            expect(await page.nodes.count()).toBe(2);
            expect(await page.getNodeText(0)).toBe('Node 0');
            expect(await page.getNodeText(1)).toBe('Node 1');
        });

        it('should not collapse node on keyboard enter', async () => {
            await page.nodes.get(0).sendKeys(Key.ENTER);

            expect(await page.nodes.count()).toBe(2);
            expect(await page.getNodeText(0)).toBe('Node 0');
            expect(await page.getNodeText(1)).toBe('Node 1');
        });

        it('should not expand node on keyboard enter', async () => {
            await page.nodes.get(1).sendKeys(Key.ENTER);

            expect(await page.nodes.count()).toBe(2);
            expect(await page.getNodeText(0)).toBe('Node 0');
            expect(await page.getNodeText(1)).toBe('Node 1');
        });
    });

});

