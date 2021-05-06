import { imageCompare } from '../../common/image-compare';
import { SelectCustomHeadingPage } from './select-custom-heading.po.spec';

describe('Select Custom Heading Tests', () => {

    let page: SelectCustomHeadingPage;

    beforeEach(async () => {
        page = new SelectCustomHeadingPage();
        await page.getPage();
    });

    it('should display custom headings for recent and normal options', async () => {
        await page.clickOnCheckbox(page.checkboxRecentOptions);
        await page.clickOnDropdown(false);

        await page.clickOnCountry(false, 1);
        await page.checkRecentOptions(false, ['United Kingdom']);

        expect(await page.recentNodes.getText()).toBe('Recent Nodes');
        expect(await page.nodes.getText()).toBe('Nodes');

        expect(await imageCompare('select-custom-heading')).toEqual(0);
    });

    it('should display custom heading when there are no recent options selected', async () => {
        await page.clickOnDropdown(false);

        expect(await page.nodes.getText()).toBe('Nodes');

        expect(await imageCompare('select-no-recent-options-heading')).toEqual(0);
    });
});
