import { imageCompare } from '../../common/image-compare';
import { InputDropdownFormPage } from './input-dropdown-forms.po.spec';

describe('Input Dropdown Tests Reactive Form', () => {

    let page: InputDropdownFormPage;

    beforeEach(async () => {
        page = new InputDropdownFormPage();
        await page.getPage();
    });

    it('should disable input dropdown when the disabled button is checked', async () => {

        expect(await imageCompare('input-dropdown-form-disabled')).toEqual(0);

    });

});
