import { Key } from 'protractor';
import { imageCompare } from '../../common/image-compare';
import { numberOfCountries } from '../standard/select.po.spec';
import { SelectFormsPage } from './select-forms.po.spec';

describe('Select (forms) Tests', () => {

    let page: SelectFormsPage;

    beforeEach(() => {
        page = new SelectFormsPage();
        page.getPage();
    });

    it('should have correct initial states', async () => {

        // dropdown list not expanded
        expect(await page.confirmDropdownIsExpanded()).toBeFalsy();

        // selected text in dropdown list
        expect(await page.getDropdownPlaceholderText(false)).toEqual('Select a country');

        // selected location(s) - null
        expect(await page.getSelectedLocationText()).toBe('null');

        // expand panel and check inital state
        expect(await page.checkSelectedOptionsButton()).toBeTruthy();
        expect(await page.checkSelectedDirectionButton()).toBeTruthy();
        expect(await page.confirmIsChecked(page.checkboxMulti)).toBeFalsy();
        expect(await page.confirmIsChecked(page.checkboxDisabled)).toBeFalsy();
        expect(await page.confirmIsChecked(page.checkboxAllowNull)).toBeFalsy();
        expect(await page.confirmIsChecked(page.checkboxPaging)).toBeFalsy();
        expect(await page.confirmAllowNullIsDisabled()).toBeFalsy();
        expect(await page.confirmPageSizeIsDisabled()).toBeTruthy();
        expect(await page.confirmPageSizeButtonIsDisabled('down')).toBeTruthy();
        expect(await page.confirmPageSizeButtonIsDisabled('up')).toBeTruthy();

        expect(await imageCompare('select-forms-initial')).toEqual(0);

    });

    it('should display correct text', async () => {

        // country list
        await page.clickOnDropdown(false);
        expect(await page.getCountryText(false, 0)).toBe('United States');
        expect(await page.getCountryText(false, 124)).toBe('Latvia');
        expect(await page.getCountryText(false, 248)).toBe('Zimbabwe');

        expect(await page.selectedLocation.getText()).toBe('Selected location(s): null');

    });

    it('should expand dropdown list', async () => {

        await page.clickOnDropdown(false);
        expect(await page.confirmDropdownIsExpanded()).toBeTruthy();

        expect(await imageCompare('select-forms-dropdown')).toEqual(0);

    });

    it('should react to button clicks', async () => {

        // options radio button
        await page.clickOnObjects();
        expect(await page.checkSelectedOptionsButton()).toBeFalsy();
        await page.clickOnStrings();
        expect(await page.checkSelectedOptionsButton()).toBeTruthy();

        // multiple checkbox
        await page.clickOnCheckbox(page.checkboxMulti);
        expect(await page.confirmIsChecked(page.checkboxMulti)).toBeTruthy();
        await page.clickOnCheckbox(page.checkboxMulti);
        expect(await page.confirmIsChecked(page.checkboxMulti)).toBeFalsy();

        // disabled checkbox
        await page.clickOnCheckbox(page.checkboxDisabled);
        expect(await page.confirmIsChecked(page.checkboxDisabled)).toBeTruthy();
        await page.clickOnCheckbox(page.checkboxDisabled);
        expect(await page.confirmIsChecked(page.checkboxDisabled)).toBeFalsy();

        // allowNull checkbox
        await page.clickOnCheckbox(page.checkboxAllowNull);
        expect(await page.confirmIsChecked(page.checkboxAllowNull)).toBeTruthy();
        await page.clickOnCheckbox(page.checkboxAllowNull);
        expect(await page.confirmIsChecked(page.checkboxAllowNull)).toBeFalsy();

        // dropDirection radio button
        await page.clickOnDropDirectionUp();
        expect(await page.checkSelectedDirectionButton()).toBeFalsy();
        await page.clickOnDropDirectionDown();
        expect(await page.checkSelectedDirectionButton()).toBeTruthy();

        // Enable Option Paging button
        await page.clickOnCheckbox(page.checkboxPaging);
        expect(await page.confirmIsChecked(page.checkboxPaging)).toBeTruthy();
        await page.clickOnCheckbox(page.checkboxPaging);
        expect(await page.confirmIsChecked(page.checkboxPaging)).toBeFalsy();

    });

    it('should display the name of the selected country', async () => {

        // selecting country with clicking
        await page.clickOnDropdown(false);
        await page.clickOnCountry(false, 0);
        expect(await page.getSelectedLocationText()).toBe('"United States"');

        await page.clickOnDropdown(false);
        await page.clickOnCountry(false, 248);
        expect(await page.getSelectedLocationText()).toBe('"Zimbabwe"');

        // selecting country with enter key
        await page.clickOnDropdown(false);
        await page.hoverOverCountry(false, 124);
        await page.getDropdown(false).sendKeys(Key.ENTER);
        expect(await page.getSelectedLocationText()).toBe('"Latvia"');

    });

    it('should be possible to filter the list of countries', async () => {

        // no match
        await page.clickOnDropdown(false);
        await page.getDropdown(false).sendKeys('0');
        expect(await page.getNumberOfCountries(false)).toEqual(0);

        // countries starting with letter
        await page.getDropdown(false).clear();
        await page.getDropdown(false).sendKeys('ye');
        expect(await page.getCountryText(false, 0)).toBe('Svalbard and Jan Mayen');
        expect(await page.getCountryText(false, 1)).toBe('Yemen');

        // countries containing letter
        await page.getDropdown(false).clear();
        await page.getDropdown(false).sendKeys('x');
        expect(await page.getCountryText(false, 0)).toBe('Luxembourg');
        expect(await page.getCountryText(false, 1)).toBe('Mexico');

        // upper case
        await page.getDropdown(false).clear();
        await page.getDropdown(false).sendKeys('Q');
        expect(await page.getCountryText(false, 0)).toBe('Equatorial Guinea');
        expect(await page.getCountryText(false, 4)).toBe('Qatar');

        // space
        await page.getDropdown(false).clear();
        await page.getDropdown(false).sendKeys(Key.SPACE);
        expect(await page.getCountryText(false, 0)).toBe('United States');
        expect(await page.getCountryText(false, 3)).toBe('American Samoa');

        // hyphen
        await page.getDropdown(false).clear();
        await page.getDropdown(false).sendKeys('-');
        expect(await page.getCountryText(false, 0)).toBe('Guinea-bissau');
        expect(await page.getCountryText(false, 1)).toBe('Timor-leste');

        // comma
        await page.getDropdown(false).clear();
        await page.getDropdown(false).sendKeys(',');
        expect(await page.getCountryText(false, 0)).toBe('Bolivia, Plurinational State of');
        expect(await page.getCountryText(false, 8)).toBe('Moldova, Republic of');

        // brackets
        await page.getDropdown(false).clear();
        await page.getDropdown(false).sendKeys('(');
        expect(await page.getCountryText(false, 0)).toBe('Cocos (Keeling) Islands');
        expect(await page.getCountryText(false, 3)).toBe('Saint Martin (French part)');

        await page.getDropdown(false).clear();
        await page.getDropdown(false).sendKeys(')');
        expect(await page.getCountryText(false, 0)).toBe('Cocos (Keeling) Islands');
        expect(await page.getCountryText(false, 4)).toBe('Sint Maarten (Dutch part)');

    });

    it('should highlight the characters entered for filtering', async () => {

        await page.clickOnDropdown(false);
        await page.getDropdown(false).sendKeys('ch');
        expect(await page.getFilterText(3)).toBe('Ch');
        expect(await page.getFilterText(4)).toBe('ch');

        expect(await imageCompare('select-forms-highlight')).toEqual(0);

    });

    it('should be possible to return objects instead of strings', async () => {

        // select country
        await page.clickOnDropdown(false);
        await page.clickOnCountry(false, 100);
        expect(await page.getSelectedLocationText()).toBe('"Honduras"');

        await // click on objects button
            await page.clickOnObjects();
        expect(await page.getSelectedLocationText()).toBe('null');

        // select country
        await page.clickOnDropdown(false);
        await page.clickOnCountry(false, 100);
        expect(await page.getSelectedLocationText()).toBe('{ "id": 100, "name": "Honduras" }');

        // select different country
        await page.clickOnDropdown(false);
        await page.clickOnCountry(false, 200);
        expect(await page.getSelectedLocationText()).toBe('{ "id": 200, "name": "Sierra Leone" }');

        await // click on strings button
            await page.clickOnStrings();
        expect(await page.getSelectedLocationText()).toBe('null');

        // select country
        await page.clickOnDropdown(false);
        await page.clickOnCountry(false, 178);
        expect(await page.getSelectedLocationText()).toBe('"Poland"');

        // select different country
        await page.clickOnDropdown(false);
        await page.clickOnCountry(false, 113);
        expect(await page.getSelectedLocationText()).toBe('"Japan"');

    });

    it('should react to use of the "multiple" checkbox', async () => {

        // click on checkbox when country is selected
        await page.clickOnDropdown(false);
        await page.clickOnCountry(false, 150);
        await page.clickOnCheckbox(page.checkboxMulti);
        expect(await page.getSelectedLocationText()).toBe('null');

        // multiple + strings combination
        await page.clickOnDropdown(true);
        await page.clickOnCountry(true, 10);
        await page.clickOnCountry(true, 20);
        await page.clickOnCountry(true, 30);
        expect(await page.getSelectedLocationText()).toBe('[ "Antarctica", "Bangladesh", "Bosnia and Herzegovina" ]');

        // multiple + objects combination
        await page.clickOnObjects();
        await page.clickOnDropdown(true);
        await page.clickOnCountry(true, 40);
        await page.clickOnCountry(true, 50);
        expect(await page.getSelectedLocationText()).toBe('[ { "id": 40, "name": "Cameroon" }, { "id": 50, "name": "Colombia" } ]');

        // use filter
        await page.clickOnDropdown(true);
        await page.getDropdown(true).sendKeys('ire');
        expect(await page.getCountryText(true, 2)).toBe('Ireland');

        expect(await imageCompare('select-forms-multiple')).toEqual(0);

    });

    it('should disable selected countries when in multiple mode', async () => {

        // click on multiple button
        await page.clickOnCheckbox(page.checkboxMulti);

        // confirm countries are not disabled
        await page.clickOnDropdown(true);
        expect(await page.confirmCountryIsDisabled(true, 60)).toBeFalsy();
        expect(await page.confirmCountryIsDisabled(true, 70)).toBeFalsy();

        // select countries
        await page.clickOnCountry(true, 60);
        await page.clickOnCountry(true, 70);
        expect(await page.getSelectedLocationText()).toBe('[ "Cyprus", "Eritrea" ]');

        // confirm countries are disabled
        expect(await page.confirmCountryIsDisabled(true, 60)).toBeTruthy();
        expect(await page.confirmCountryIsDisabled(true, 70)).toBeTruthy();

        // reselect countries and confirm that nothing happened
        await page.clickOnCountry(true, 60);
        expect(await page.getSelectedLocationText()).toBe('[ "Cyprus", "Eritrea" ]');
        await page.clickOnCountry(true, 70);
        expect(await page.getSelectedLocationText()).toBe('[ "Cyprus", "Eritrea" ]');

        expect(await imageCompare('select-forms-multiple-disabled')).toEqual(0);

    });

    it('should be possible to remove tags', async () => {

        // select 3 countries in multiple mode
        await page.clickOnCheckbox(page.checkboxMulti);
        await page.clickOnDropdown(true);
        await page.clickOnCountry(true, 80);
        await page.clickOnCountry(true, 90);
        await page.clickOnCountry(true, 110);
        expect(await page.getSelectedLocationText()).toBe('[ "French Southern Territories", "Guadeloupe", "Israel" ]');

        // remove 2nd tag
        await page.removeCountry(1);
        expect(await page.getSelectedLocationText()).toBe('[ "French Southern Territories", "Israel" ]');

        // remove 1st tag
        await page.removeCountry(0);
        expect(await page.getSelectedLocationText()).toBe('[ "Israel" ]');

    });

    it('should highlight countries hovered over', async () => {

        // normal mode
        await page.clickOnDropdown(false);
        expect(await page.confirmCountryIsHighlighted(false, 0)).toBeTruthy();
        expect(await page.confirmCountryIsHighlighted(false, 140)).toBeFalsy();

        await page.hoverOverCountry(false, 140);
        expect(await page.confirmCountryIsHighlighted(false, 0)).toBeFalsy();
        expect(await page.confirmCountryIsHighlighted(false, 140)).toBeTruthy();

        await page.hoverOverCountry(false, 0);
        expect(await page.confirmCountryIsHighlighted(false, 0)).toBeTruthy();
        expect(await page.confirmCountryIsHighlighted(false, 140)).toBeFalsy();


        // click on country
        await page.clickOnCountry(false, 140);
        await page.clickOnDropdown(false);
        expect(await page.confirmCountryIsHighlighted(false, 0)).toBeTruthy();
        expect(await page.confirmCountryIsHighlighted(false, 140)).toBeFalsy();

        // multiple mode
        await page.clickOnCheckbox(page.checkboxMulti);
        await page.clickOnDropdown(true);
        expect(await page.confirmCountryIsHighlighted(true, 0)).toBeTruthy();
        expect(await page.confirmCountryIsHighlighted(true, 140)).toBeFalsy();

        await page.hoverOverCountry(true, 140);
        expect(await page.confirmCountryIsHighlighted(true, 0)).toBeFalsy();
        expect(await page.confirmCountryIsHighlighted(true, 140)).toBeTruthy();

        await page.hoverOverCountry(true, 0);
        expect(await page.confirmCountryIsHighlighted(true, 0)).toBeTruthy();
        expect(await page.confirmCountryIsHighlighted(true, 140)).toBeFalsy();


        // click on country
        await page.clickOnCountry(true, 140);
        expect(await page.confirmCountryIsHighlighted(true, 140)).toBeFalsy();

        // hover over country while it is disabled
        expect(await page.confirmCountryIsDisabled(true, 140)).toBeTruthy();
        await page.hoverOverCountry(true, 140);
        expect(await page.confirmCountryIsHighlighted(true, 140)).toBeFalsy();

    });

    it('should be possible to disable access to the list of countries', async () => {

        // no selected countries
        await page.clickOnCheckbox(page.checkboxDisabled);
        await page.clickOnDropdown(false);
        expect(await page.confirmDropdownIsExpanded()).toBeFalsy();
        expect(await page.getSelectedLocationText()).toBe('null');

        // 1 selected country
        await page.clickOnCheckbox(page.checkboxDisabled);
        await page.clickOnDropdown(false);
        await page.clickOnCountry(false, 160);
        await page.clickOnCheckbox(page.checkboxDisabled);
        await page.clickOnDropdown(false);
        expect(await page.confirmDropdownIsExpanded()).toBeFalsy();
        expect(await page.getSelectedLocationText()).toBe('"New Zealand"');

        // 2 selected countries
        await page.clickOnCheckbox(page.checkboxDisabled);
        await page.clickOnCheckbox(page.checkboxMulti);
        await page.clickOnDropdown(true);
        await page.clickOnCountry(true, 170);
        await page.clickOnCountry(true, 180);
        await page.clickOnCheckbox(page.checkboxDisabled);
        expect(await page.getSelectedLocationText()).toBe('[ "Palau", "Puerto Rico" ]');

        await page.removeCountry(0);
        expect(await page.getSelectedLocationText()).toBe('[ "Palau", "Puerto Rico" ]');

    });

    it('should react to changes in the status of the "allowNull" checkbox', async () => {

        // unselectable in multiple mode
        await page.clickOnCheckbox(page.checkboxMulti);
        expect(await page.confirmAllowNullIsDisabled()).toBeTruthy();
        await page.clickOnCheckbox(page.checkboxAllowNull);
        expect(await page.confirmIsChecked(page.checkboxAllowNull)).toBeFalsy();

        // checked but disabled
        await page.clickOnCheckbox(page.checkboxMulti);
        await page.clickOnCheckbox(page.checkboxAllowNull);
        await page.clickOnCheckbox(page.checkboxMulti);
        expect(await page.confirmIsChecked(page.checkboxAllowNull)).toBeTruthy();
        expect(await page.confirmAllowNullIsDisabled()).toBeTruthy();

        // checked & enabled after unchecking multiple button
        await page.clickOnCheckbox(page.checkboxMulti);
        expect(await page.confirmIsChecked(page.checkboxAllowNull)).toBeTruthy();
        expect(await page.confirmAllowNullIsDisabled()).toBeFalsy();

        // prevent deletion of text when allowNull is unchecked
        await page.clickOnCheckbox(page.checkboxAllowNull);
        await page.clickOnDropdown(false);
        await page.clickOnCountry(false, 190);
        expect(await page.getSelectedLocationText()).toBe('"Saint Martin (French part)"');
        await page.clickOnDropdown(false);
        await page.getDropdown(false).sendKeys(Key.DELETE);
        await page.clickOnPlaceholder();
        expect(await page.getSelectedLocationText()).toBe('"Saint Martin (French part)"');

        // allow deletion of text when allowNull is checked
        await page.clickOnCheckbox(page.checkboxAllowNull);
        await page.clickOnDropdown(false);
        await page.clickOnCountry(false, 190);
        expect(await page.getSelectedLocationText()).toBe('"Saint Martin (French part)"');
        await page.clickOnPlaceholder();
        await page.clickOnDropdown(false);
        await page.getDropdown(false).sendKeys(Key.DELETE);
        await page.clickOnPlaceholder();
        expect(await page.getSelectedLocationText()).toBe('null');

    });

    it('should display the placeholder text', async () => {

        // change placeholder text
        await page.clickOnPlaceholder();
        await page.getPlaceholder().clear();
        await page.getPlaceholder().sendKeys('COUNTRIES');

        // check dropdown list title
        expect(await page.getDropdownPlaceholderText(false)).toEqual('COUNTRIES');

        // select country and check title
        await page.clickOnDropdown(false);
        await page.clickOnCountry(false, 220);
        expect(await page.getDropdownPlaceholderText(false)).toEqual('COUNTRIES');

        // confirm it works in multiple mode
        await page.clickOnCheckbox(page.checkboxMulti);
        expect(await page.getDropdownPlaceholderText(true)).toEqual('COUNTRIES');

        await page.clickOnPlaceholder();
        await page.getPlaceholder().clear();
        await page.getPlaceholder().sendKeys('Pick a country');
        expect(await page.getDropdownPlaceholderText(true)).toEqual('Pick a country');

        await page.clickOnDropdown(true);
        await page.clickOnCountry(true, 230);
        expect(await page.getDropdownPlaceholderText(true)).toEqual('Pick a country');

    });

    it('should react to changes in the status of the "Enable Option Paging" button', async () => {

        // enable paging
        await page.clickOnCheckbox(page.checkboxPaging);
        expect(await page.confirmPageSizeIsDisabled()).toBeFalsy();
        expect(await page.confirmPageSizeButtonIsDisabled('down')).toBeFalsy();
        expect(await page.confirmPageSizeButtonIsDisabled('up')).toBeFalsy();

        // disable paging
        await page.clickOnCheckbox(page.checkboxPaging);
        expect(await page.confirmPageSizeIsDisabled()).toBeTruthy();
        expect(await page.confirmPageSizeButtonIsDisabled('down')).toBeTruthy();
        expect(await page.confirmPageSizeButtonIsDisabled('up')).toBeTruthy();

    });

    it('should use the paging size', async () => {

        // confirm initial number of visible countries
        await page.clickOnDropdown(false);
        expect(await page.getNumberOfCountries(false)).toEqual(numberOfCountries);
        await page.hoverOverLastCountry(false);
        expect(await page.getNumberOfCountries(false)).toEqual(numberOfCountries);

        // enable paging
        await page.clickOnCheckbox(page.checkboxPaging);
        let result;

        // use original page size
        const pageSize = 20;

        // confirm number of visible countries increases by 20 each time
        await page.clickOnDropdown(false);
        result = await page.calculateNewNumberOfCountries(false, pageSize);
        expect(await page.waitForLoadingAfterHoverToFinish(false)).toBeTruthy();
        expect(await page.getNumberOfCountries(false)).toEqual(result);

        result = await page.calculateNewNumberOfCountries(false, pageSize);
        expect(await page.waitForLoadingAfterHoverToFinish(false)).toBeTruthy();
        expect(await page.getNumberOfCountries(false)).toEqual(result);

        // disable paging and check number of countries
        await page.clickOnCheckbox(page.checkboxPaging);
        await page.clickOnDropdown(false);
        expect(await page.getNumberOfCountries(false)).toEqual(numberOfCountries);

    });

    it('should allow increases of the paging size', async () => {

        // enable paging
        await page.clickOnCheckbox(page.checkboxPaging);
        let result;

        // increase page size
        await page.clickOnIncrementPageSize();
        const pageSize = 21;

        // confirm number of visible countries increases by 21 each time
        expect(await page.waitForLoadingAfterClickToFinish(false)).toBeTruthy();

        result = await page.calculateNewNumberOfCountries(false, pageSize);
        expect(await page.waitForLoadingAfterHoverToFinish(false)).toBeTruthy();
        expect(await page.getNumberOfCountries(false)).toEqual(result);

        result = await page.calculateNewNumberOfCountries(false, pageSize);
        expect(await page.waitForLoadingAfterHoverToFinish(false)).toBeTruthy();
        expect(await page.getNumberOfCountries(false)).toEqual(result);

    });

    it('should allow decreases of the paging size', async () => {

        // enable paging
        await page.clickOnCheckbox(page.checkboxPaging);
        let result;

        // decrease page size
        await page.clickOnDecrementPageSize();
        const pageSize = 19;

        // confirm number of visible countries increases by 19 each time
        expect(await page.waitForLoadingAfterClickToFinish(false)).toBeTruthy();

        result = await page.calculateNewNumberOfCountries(false, pageSize);
        expect(await page.waitForLoadingAfterHoverToFinish(false)).toBeTruthy();
        expect(await page.getNumberOfCountries(false)).toEqual(result);

        result = await page.calculateNewNumberOfCountries(false, pageSize);
        expect(await page.waitForLoadingAfterHoverToFinish(false)).toBeTruthy();
        expect(await page.getNumberOfCountries(false)).toEqual(result);

    });

    it('should use the paging size in multiple mode', async () => {

        // enable paging & multiple mode
        await page.clickOnCheckbox(page.checkboxMulti);
        await page.clickOnCheckbox(page.checkboxPaging);
        let result;
        const pageSize = 20;

        // confirm number of visible countries increases by 20 each time
        expect(await page.waitForLoadingAfterClickToFinish(true)).toBeTruthy();
        result = await page.calculateNewNumberOfCountries(true, pageSize);
        expect(await page.waitForLoadingAfterHoverToFinish(true)).toBeTruthy();
        expect(await page.getNumberOfCountries(true)).toEqual(result);

        result = await page.calculateNewNumberOfCountries(true, pageSize);
        expect(await page.waitForLoadingAfterHoverToFinish(true)).toBeTruthy();
        expect<any>(await page.getNumberOfCountries(true)).toEqual(result);

    });

    it('should use the paging size when filtering the countries', async () => {

        // enable paging
        await page.clickOnCheckbox(page.checkboxPaging);
        let result;
        const pageSize = 20;

        // use filter
        expect(await page.waitForLoadingAfterClickToFinish(false)).toBeTruthy();
        await page.getDropdown(false).sendKeys('b');
        expect(await page.getCountryText(false, 0)).toBe('Albania');

        // confirm number of visible countries increases by 20 each time
        result = await page.calculateNewNumberOfCountries(false, pageSize);
        expect(await page.waitForLoadingAfterHoverToFinish(false)).toBeTruthy();
        expect(await page.getNumberOfCountries(false)).toEqual(result);
        expect(await page.getCountryText(false, 39)).toBe('Korea, Democratic People\'s Republic of');
        expect(await page.getNumberOfCountries(false)).toEqual(result);

    });

});