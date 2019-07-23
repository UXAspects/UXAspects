import { Key } from 'protractor';
import { numberOfCountries, SelectPage } from './select.po.spec';

describe('Select Tests', () => {

    let page: SelectPage;

    beforeEach(() => {
        page = new SelectPage();
        page.getPage();
    });

    it('should have correct initial states', () => {

        // dropdown list not expanded
        expect(page.confirmDropdownIsExpanded()).toBeFalsy();

        // selected text in dropdown list
        expect<any>(page.getDropdownPlaceholderText(false)).toEqual('Select a country');

        // selected location(s) - null
        expect<any>(page.getSelectedLocationText()).toBe('null');
    });

    it('should display correct text', () => {

        // country list
        page.clickOnDropdown(false);
        expect<any>(page.getCountryText(false, 0)).toBe('United States');
        expect<any>(page.getCountryText(false, 124)).toBe('Latvia');
        expect<any>(page.getCountryText(false, 248)).toBe('Zimbabwe');

        expect<any>(page.selectedLocation.getText()).toBe('Selected location(s): null');

    });

    it('should expand dropdown list', () => {

        page.clickOnDropdown(false);
        expect(page.confirmDropdownIsExpanded()).toBeTruthy();

    });

    it('should close dropdown list if clicked when open', () => {

        page.clickOnDropdown(false);
        expect(page.confirmDropdownIsExpanded()).toBeTruthy();

        page.clickOnDropdown(false);
        expect(page.confirmDropdownIsExpanded()).toBeFalsy();

    });

    it('should display the name of the selected country', () => {

        // selecting country with clicking
        page.clickOnDropdown(false);
        page.clickOnCountry(false, 0);
        expect<any>(page.getSelectedLocationText()).toBe('"United States"');

        page.clickOnDropdown(false);
        page.clickOnCountry(false, 248);
        expect<any>(page.getSelectedLocationText()).toBe('"Zimbabwe"');

        // selecting country with enter key
        page.clickOnDropdown(false);
        page.hoverOverCountry(false, 124);
        page.getDropdown(false).sendKeys(Key.ENTER);
        expect<any>(page.getSelectedLocationText()).toBe('"Latvia"');

    });

    it('should be possible to filter the list of countries', () => {

        // no match
        page.clickOnDropdown(false);
        page.getDropdown(false).sendKeys('0');
        expect<any>(page.getNumberOfCountries(false)).toEqual(0);

        // countries starting with letter
        page.getDropdown(false).clear();
        page.getDropdown(false).sendKeys('ye');
        expect<any>(page.getCountryText(false, 0)).toBe('Svalbard and Jan Mayen');
        expect<any>(page.getCountryText(false, 1)).toBe('Yemen');

        // countries containing letter
        page.getDropdown(false).clear();
        page.getDropdown(false).sendKeys('x');
        expect<any>(page.getCountryText(false, 0)).toBe('Luxembourg');
        expect<any>(page.getCountryText(false, 1)).toBe('Mexico');

        // upper case
        page.getDropdown(false).clear();
        page.getDropdown(false).sendKeys('Q');
        expect<any>(page.getCountryText(false, 0)).toBe('Equatorial Guinea');
        expect<any>(page.getCountryText(false, 4)).toBe('Qatar');

        // space
        page.getDropdown(false).clear();
        page.getDropdown(false).sendKeys(Key.SPACE);
        expect<any>(page.getCountryText(false, 0)).toBe('United States');
        expect<any>(page.getCountryText(false, 3)).toBe('American Samoa');

        // hyphen
        page.getDropdown(false).clear();
        page.getDropdown(false).sendKeys('-');
        expect<any>(page.getCountryText(false, 0)).toBe('Guinea-bissau');
        expect<any>(page.getCountryText(false, 1)).toBe('Timor-leste');

        // comma
        page.getDropdown(false).clear();
        page.getDropdown(false).sendKeys(',');
        expect<any>(page.getCountryText(false, 0)).toBe('Bolivia, Plurinational State of');
        expect<any>(page.getCountryText(false, 8)).toBe('Moldova, Republic of');

        // brackets
        page.getDropdown(false).clear();
        page.getDropdown(false).sendKeys('(');
        expect<any>(page.getCountryText(false, 0)).toBe('Cocos (Keeling) Islands');
        expect<any>(page.getCountryText(false, 3)).toBe('Saint Martin (French part)');

        page.getDropdown(false).clear();
        page.getDropdown(false).sendKeys(')');
        expect<any>(page.getCountryText(false, 0)).toBe('Cocos (Keeling) Islands');
        expect<any>(page.getCountryText(false, 4)).toBe('Sint Maarten (Dutch part)');

    });

    it('should highlight the characters entered for filtering', () => {

        page.clickOnDropdown(false);
        page.getDropdown(false).sendKeys('ch');
        expect<any>(page.getFilterText(3)).toBe('Ch');
        expect<any>(page.getFilterText(4)).toBe('ch');

    });

    it('should be possible to return objects instead of strings', () => {

        // select country
        page.clickOnDropdown(false);
        page.clickOnCountry(false, 100);
        expect<any>(page.getSelectedLocationText()).toBe('"Honduras"');

        // click on objects button
        page.clickOnObjects();
        expect<any>(page.getSelectedLocationText()).toBe('null');

        // select country
        page.clickOnDropdown(false);
        page.clickOnCountry(false, 100);
        expect<any>(page.getSelectedLocationText()).toBe('{ "id": 100, "name": "Honduras" }');

        // select different country
        page.clickOnDropdown(false);
        page.clickOnCountry(false, 200);
        expect<any>(page.getSelectedLocationText()).toBe('{ "id": 200, "name": "Sierra Leone" }');

        // click on strings button
        page.clickOnStrings();
        expect<any>(page.getSelectedLocationText()).toBe('null');

        // select country
        page.clickOnDropdown(false);
        page.clickOnCountry(false, 178);
        expect<any>(page.getSelectedLocationText()).toBe('"Poland"');

        // select different country
        page.clickOnDropdown(false);
        page.clickOnCountry(false, 113);
        expect<any>(page.getSelectedLocationText()).toBe('"Japan"');

    });

    it('should react to use of the "multiple" checkbox', () => {

        // click on checkbox when country is selected
        page.clickOnDropdown(false);
        page.clickOnCountry(false, 150);
        page.clickOnCheckbox(page.checkboxMulti);
        expect<any>(page.getSelectedLocationText()).toBe('null');

        // multiple + strings combination
        page.clickOnDropdown(true);
        page.clickOnCountry(true, 10);
        page.clickOnCountry(true, 20);
        page.clickOnCountry(true, 30);
        expect<any>(page.getSelectedLocationText()).toBe('[ "Antarctica", "Bangladesh", "Bosnia and Herzegovina" ]');

        // multiple + objects combination
        page.clickOnObjects();
        page.clickOnDropdown(true);
        page.clickOnCountry(true, 40);
        page.clickOnCountry(true, 50);
        expect<any>(page.getSelectedLocationText()).toBe('[ { "id": 40, "name": "Cameroon" }, { "id": 50, "name": "Colombia" } ]');

        // use filter
        page.clickOnDropdown(true);
        page.getDropdown(true).sendKeys('ire');
        expect<any>(page.getCountryText(true, 2)).toBe('Ireland');

    });

    it('should disable selected countries when in multiple mode', () => {

        // click on multiple button
        page.clickOnCheckbox(page.checkboxMulti);

        // confirm countries are not disabled
        page.clickOnDropdown(true);
        expect(page.confirmCountryIsDisabled(true, 60)).toBeFalsy();
        expect(page.confirmCountryIsDisabled(true, 70)).toBeFalsy();

        // select countries
        page.clickOnCountry(true, 60);
        page.clickOnCountry(true, 70);
        expect<any>(page.getSelectedLocationText()).toBe('[ "Cyprus", "Eritrea" ]');

        // confirm countries are disabled
        expect(page.confirmCountryIsDisabled(true, 60)).toBeTruthy();
        expect(page.confirmCountryIsDisabled(true, 70)).toBeTruthy();

        // reselect countries and confirm that nothing happened
        page.clickOnCountry(true, 60);
        expect<any>(page.getSelectedLocationText()).toBe('[ "Cyprus", "Eritrea" ]');
        page.clickOnCountry(true, 70);
        expect<any>(page.getSelectedLocationText()).toBe('[ "Cyprus", "Eritrea" ]');

    });

    it('should be possible to remove tags', () => {

        // select 3 countries in multiple mode
        page.clickOnCheckbox(page.checkboxMulti);
        page.clickOnDropdown(true);
        page.clickOnCountry(true, 80);
        page.clickOnCountry(true, 90);
        page.clickOnCountry(true, 110);
        expect<any>(page.getSelectedLocationText()).toBe('[ "French Southern Territories", "Guadeloupe", "Israel" ]');

        // remove 2nd tag
        page.removeCountry(1);
        expect<any>(page.getSelectedLocationText()).toBe('[ "French Southern Territories", "Israel" ]');

        // remove 1st tag
        page.removeCountry(0);
        expect<any>(page.getSelectedLocationText()).toBe('[ "Israel" ]');

    });

    it('should highlight countries hovered over', () => {

        // normal mode
        page.clickOnDropdown(false);
        expect(page.confirmCountryIsHighlighted(false, 0)).toBeTruthy();
        expect(page.confirmCountryIsHighlighted(false, 140)).toBeFalsy();

        page.hoverOverCountry(false, 140);
        expect(page.confirmCountryIsHighlighted(false, 0)).toBeFalsy();
        expect(page.confirmCountryIsHighlighted(false, 140)).toBeTruthy();

        page.hoverOverCountry(false, 0);
        expect(page.confirmCountryIsHighlighted(false, 0)).toBeTruthy();
        expect(page.confirmCountryIsHighlighted(false, 140)).toBeFalsy();


        // click on country
        page.clickOnCountry(false, 140);
        page.clickOnDropdown(false);
        expect(page.confirmCountryIsHighlighted(false, 0)).toBeTruthy();
        expect(page.confirmCountryIsHighlighted(false, 140)).toBeFalsy();

        // multiple mode
        page.clickOnCheckbox(page.checkboxMulti);
        page.clickOnDropdown(true);
        expect(page.confirmCountryIsHighlighted(true, 0)).toBeTruthy();
        expect(page.confirmCountryIsHighlighted(true, 140)).toBeFalsy();

        page.hoverOverCountry(true, 140);
        expect(page.confirmCountryIsHighlighted(true, 0)).toBeFalsy();
        expect(page.confirmCountryIsHighlighted(true, 140)).toBeTruthy();

        page.hoverOverCountry(true, 0);
        expect(page.confirmCountryIsHighlighted(true, 0)).toBeTruthy();
        expect(page.confirmCountryIsHighlighted(true, 140)).toBeFalsy();


        // click on country
        page.clickOnCountry(true, 140);
        expect(page.confirmCountryIsHighlighted(true, 140)).toBeFalsy();

        // hover over country while it is disabled
        expect(page.confirmCountryIsDisabled(true, 140)).toBeTruthy();
        page.hoverOverCountry(true, 140);
        expect(page.confirmCountryIsHighlighted(true, 140)).toBeFalsy();

    });

    it('should be possible to disable access to the list of countries', () => {

        // no selected countries
        page.clickOnCheckbox(page.checkboxDisabled);
        page.clickOnDropdown(false);
        expect(page.confirmDropdownIsExpanded()).toBeFalsy();
        expect<any>(page.getSelectedLocationText()).toBe('null');

        // 1 selected country
        page.clickOnCheckbox(page.checkboxDisabled);
        page.clickOnDropdown(false);
        page.clickOnCountry(false, 160);
        page.clickOnCheckbox(page.checkboxDisabled);
        page.clickOnDropdown(false);
        expect(page.confirmDropdownIsExpanded()).toBeFalsy();
        expect<any>(page.getSelectedLocationText()).toBe('"New Zealand"');

        // 2 selected countries
        page.clickOnCheckbox(page.checkboxDisabled);
        page.clickOnCheckbox(page.checkboxMulti);
        page.clickOnDropdown(true);
        page.clickOnCountry(true, 170);
        page.clickOnCountry(true, 180);
        page.clickOnCheckbox(page.checkboxDisabled);
        expect<any>(page.getSelectedLocationText()).toBe('[ "Palau", "Puerto Rico" ]');

        page.removeCountry(0);
        expect<any>(page.getSelectedLocationText()).toBe('[ "Palau", "Puerto Rico" ]');

    });

    it('should react to changes in the status of the "allowNull" checkbox', () => {

        // prevent deletion of text when allowNull is unchecked
        page.clickOnDropdown(false);
        page.clickOnCountry(false, 190);
        expect<any>(page.getSelectedLocationText()).toBe('"Saint Martin (French part)"');
        page.clickOnDropdown(false);
        page.getDropdown(false).sendKeys(Key.DELETE);
        page.clickOnPlaceholder();
        expect<any>(page.getSelectedLocationText()).toBe('"Saint Martin (French part)"');

        // allow deletion of text when allowNull is checked
        page.clickOnCheckbox(page.checkboxAllowNull);
        page.clickOnDropdown(false);
        page.clickOnCountry(false, 190);
        expect<any>(page.getSelectedLocationText()).toBe('"Saint Martin (French part)"');
        page.clickOnPlaceholder();
        page.clickOnDropdown(false);
        page.getDropdown(false).sendKeys(Key.DELETE);
        page.clickOnPlaceholder();
        expect<any>(page.getSelectedLocationText()).toBe('null');

    });

    it('should display the placeholder text', () => {

        // change placeholder text
        page.clickOnPlaceholder();
        page.getPlaceholder().clear();
        page.getPlaceholder().sendKeys('COUNTRIES');

        // check dropdown list title
        expect<any>(page.getDropdownPlaceholderText(false)).toEqual('COUNTRIES');

        // select country and check title
        page.clickOnDropdown(false);
        page.clickOnCountry(false, 220);
        expect<any>(page.getDropdownPlaceholderText(false)).toEqual('COUNTRIES');

        // confirm it works in multiple mode
        page.clickOnCheckbox(page.checkboxMulti);
        expect<any>(page.getDropdownPlaceholderText(true)).toEqual('COUNTRIES');

        page.clickOnPlaceholder();
        page.getPlaceholder().clear();
        page.getPlaceholder().sendKeys('Pick a country');
        expect<any>(page.getDropdownPlaceholderText(true)).toEqual('Pick a country');

        page.clickOnDropdown(true);
        page.clickOnCountry(true, 230);
        expect<any>(page.getDropdownPlaceholderText(true)).toEqual('Pick a country');

    });

    it('should use the paging size', () => {

        // confirm initial number of visible countries
        page.clickOnDropdown(false);
        expect<any>(page.getNumberOfCountries(false)).toEqual(numberOfCountries);
        page.hoverOverLastCountry(false);
        expect<any>(page.getNumberOfCountries(false)).toEqual(numberOfCountries);

        // enable paging
        page.clickOnCheckbox(page.checkboxPaging);
        var result;

        // use original page size
        var pageSize = 20;

        // confirm number of visible countries increases by 20 each time
        page.clickOnDropdown(false);
        result = page.calculateNewNumberOfCountries(false, pageSize);
        expect(page.waitForLoadingAfterHoverToFinish(false)).toBeTruthy();
        expect<any>(page.getNumberOfCountries(false)).toEqual(result);

        result = page.calculateNewNumberOfCountries(false, pageSize);
        expect(page.waitForLoadingAfterHoverToFinish(false)).toBeTruthy();
        expect<any>(page.getNumberOfCountries(false)).toEqual(result);

        // disable paging and check number of countries
        page.clickOnCheckbox(page.checkboxPaging);
        page.clickOnDropdown(false);
        expect<any>(page.getNumberOfCountries(false)).toEqual(numberOfCountries);

    });

    it('should allow increases of the paging size', () => {

        // enable paging
        page.clickOnCheckbox(page.checkboxPaging);
        var result;

        // increase page size
        page.clickOnIncrementPageSize();
        var pageSize = 21;

        // confirm number of visible countries increases by 21 each time
        expect(page.waitForLoadingAfterClickToFinish(false)).toBeTruthy();

        result = page.calculateNewNumberOfCountries(false, pageSize);
        expect(page.waitForLoadingAfterHoverToFinish(false)).toBeTruthy();
        expect<any>(page.getNumberOfCountries(false)).toEqual(result);

        result = page.calculateNewNumberOfCountries(false, pageSize);
        expect(page.waitForLoadingAfterHoverToFinish(false)).toBeTruthy();
        expect<any>(page.getNumberOfCountries(false)).toEqual(result);

    });

    it('should allow decreases of the paging size', () => {

        // enable paging
        page.clickOnCheckbox(page.checkboxPaging);
        var result;

        // decrease page size
        page.clickOnDecrementPageSize();
        var pageSize = 19;

        // confirm number of visible countries increases by 19 each time
        expect(page.waitForLoadingAfterClickToFinish(false)).toBeTruthy();

        result = page.calculateNewNumberOfCountries(false, pageSize);
        expect(page.waitForLoadingAfterHoverToFinish(false)).toBeTruthy();
        expect<any>(page.getNumberOfCountries(false)).toEqual(result);

        result = page.calculateNewNumberOfCountries(false, pageSize);
        expect(page.waitForLoadingAfterHoverToFinish(false)).toBeTruthy();
        expect<any>(page.getNumberOfCountries(false)).toEqual(result);

    });

    it('should use the paging size in multiple mode', () => {

        // enable paging & multiple mode
        page.clickOnCheckbox(page.checkboxMulti);
        page.clickOnCheckbox(page.checkboxPaging);
        var result;
        var pageSize = 20;

        // confirm number of visible countries increases by 20 each time
        expect(page.waitForLoadingAfterClickToFinish(true)).toBeTruthy();
        result = page.calculateNewNumberOfCountries(true, pageSize);
        expect(page.waitForLoadingAfterHoverToFinish(true)).toBeTruthy();
        expect<any>(page.getNumberOfCountries(true)).toEqual(result);

        result = page.calculateNewNumberOfCountries(true, pageSize);
        expect(page.waitForLoadingAfterHoverToFinish(true)).toBeTruthy();
        expect<any>(page.getNumberOfCountries(true)).toEqual(result);

    });

    it('should use the paging size when filtering the countries', () => {

        // enable paging
        page.clickOnCheckbox(page.checkboxPaging);
        var result;
        var pageSize = 20;

        // use filter
        expect(page.waitForLoadingAfterClickToFinish(false)).toBeTruthy();
        page.getDropdown(false).sendKeys('b');
        expect<any>(page.getCountryText(false, 0)).toBe('Albania');

        // confirm number of visible countries increases by 20 each time
        result = page.calculateNewNumberOfCountries(false, pageSize);
        expect(page.waitForLoadingAfterHoverToFinish(false)).toBeTruthy();
        expect<any>(page.getNumberOfCountries(false)).toEqual(result);
        expect<any>(page.getCountryText(false, 39)).toBe('Korea, Democratic People\'s Republic of');
        expect<any>(page.getNumberOfCountries(false)).toEqual(result);

    });
    it('should not show the clear button by default in single select', async () => {
        expect(await page.isClearButtonPresent()).toBeFalsy();
    });

    it('should not show the clear button by default in single select when allowNull is true', async () => {
        await page.checkboxAllowNull.click();
        expect(await page.isClearButtonPresent()).toBeFalsy();
    });

    it('should not show the clear button by default in multiple select', async () => {
        await page.checkboxMulti.click();
        expect(await page.isClearButtonPresent(true)).toBeFalsy();
    });

    it('should not show the clear button when there is a value but allowNull is false in single select', async () => {
        await page.clickOnDropdown(false);
        await page.clickOnCountry(false, 0);
        expect(await page.isClearButtonPresent()).toBeFalsy();
    });

    it('should show the clear button when there is a value but allowNull is true in single select', async () => {
        await page.checkboxAllowNull.click();
        await page.clickOnDropdown(false);
        await page.clickOnCountry(false, 0);
        expect(await page.isClearButtonPresent()).toBeTruthy();
    });

    it('should show the clear button when there is a value in multiple select', async () => {
        await page.checkboxMulti.click();
        await page.clickOnDropdown(true);
        await page.clickOnCountry(true, 0);
        expect(await page.isClearButtonPresent(true)).toBeTruthy();
    });

    it('should clear the value when clear button is click in single select', async () => {
        await page.checkboxAllowNull.click();
        await page.clickOnDropdown(false);
        await page.clickOnCountry(false, 0);
        expect(await page.isClearButtonPresent()).toBeTruthy();
        expect(await page.getSelectedLocationText()).toBe('"United States"');

        // press the clear button
        await page.clickClearButton();
        expect(await page.selectedLocation.getText()).toBe('Selected location(s): null');
    });

    it('should clear the value when clear button is click in multiple select', async () => {
        await page.checkboxMulti.click();
        await page.clickOnDropdown(true);
        await page.clickOnCountry(true, 0);
        expect(await page.isClearButtonPresent(true)).toBeTruthy();
        expect(await page.getSelectedLocationText()).toBe('[ "United States" ]');

        // press the clear button
        await page.clickClearButton(true);
        expect(await page.selectedLocation.getText()).toBe('Selected location(s): []');
    });
});