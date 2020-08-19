import { imageCompare } from '../../common/image-compare';
import { ToolbarSearchTypeheadPage } from './toolbar-search-typeahead.po.spec';

describe('Toolbar Search Typeahead', () => {

    let page: ToolbarSearchTypeheadPage;

    beforeEach(async () => {
        page = new ToolbarSearchTypeheadPage();
        await page.getPage();
    });

    it('should display the dropdown correctly', async () => {

        await page.openDropdown();
        expect(await page.isDropdownExpanded()).toBe(true);

        expect(await imageCompare('toolbar-search-typeahead-open')).toEqual(0);
    });

});
