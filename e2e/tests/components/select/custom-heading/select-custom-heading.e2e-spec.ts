import { imageCompare } from '../../common/image-compare';
import { SelectCustomHeadingPage } from './select-custom-heading.po.spec';

describe('Select (custom heading)', () => {

    let page: SelectCustomHeadingPage;

    beforeEach(async () => {
        page = new SelectCustomHeadingPage();
        await page.getPage();
    });

    it('should display custom headings for recent and normal options', async () => {
        await page.clickOnCheckbox(page.checkboxRecentOptions);
        await page.clickOnDropdown();

        await page.clickOnCountry(1);
        await page.clickOnDropdown();

        expect(await page.recentOptionsHeading.getText()).toBe('Recent Nodes');
        expect(await page.optionsHeading.getText()).toBe('Nodes');

        expect(await imageCompare('select-custom-heading')).toEqual(0);
    });

    it('should display custom heading when there are no recent options selected', async () => {
        await page.clickOnDropdown();

        expect(await page.optionsHeading.getText()).toBe('Nodes');

        expect(await imageCompare('select-no-recent-options-heading')).toEqual(0);
    });
});
