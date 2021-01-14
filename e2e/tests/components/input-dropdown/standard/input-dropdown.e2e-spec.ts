import { imageCompare } from '../../common/image-compare';
import { InputDropdownPage } from './input-dropdown.po.spec';

describe('Input Dropdown (standalone)', () => {

    let page: InputDropdownPage;

    beforeEach(async () => {
        page = new InputDropdownPage();
        await page.getPage();
    });

    it('should have correct initial states', async () => {

        // dropdown list not expanded
        expect(await page.isDropdownExpanded()).toBeFalsy();

        expect(await page.getButtonText()).toEqual('Selection: (none)');

        expect(await imageCompare('input-dropdown-initial')).toEqual(0);

    });

    it('should disable input dropdown when the disabled button is checked', async () => {

        await page.checkboxDisabled.click();

        expect(await imageCompare('input-dropdown-disabled')).toEqual(0);

    });

});
