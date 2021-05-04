import { imageCompare } from '../../common/image-compare';
import { SelectCustomHeadingPage } from './select-custom-heading.po.spec';

describe('Select Custom Heading Tests', () => {

    let page: SelectCustomHeadingPage;

    beforeEach(async () => {
        page = new SelectCustomHeadingPage();
        await page.getPage();
    });

    it('should have correct initial states', async () => {

        // dropdown list not expanded
        expect(await page.confirmDropdownIsExpanded()).toBeFalsy();

        // selected text in dropdown list
        expect(await page.getDropdownPlaceholderText(false)).toEqual('Select a country');

        // selected location(s) - null
        expect(await page.getSelectedLocationText()).toBe('null');

        expect(await imageCompare('select-initial')).toEqual(0);
    });


    it('should display custom headings for recent and normal options', async () => {
        await page.clickOnCheckbox(page.checkboxRecentOptions);
        await page.clickOnDropdown(false);

        await page.clickOnCountry(false, 1);
        await page.checkRecentOptions(false, ['United Kingdom']);

        expect(await imageCompare('select-custom-heading')).toEqual(0);
    });
});
