import { browser, by, element, ElementFinder, protractor } from 'protractor';

export const numberOfCountries: number = 251;
export const scrollingTimeout: number = 5000;

export class SelectPage {

    dropdown = element(by.id('dropdown'));
    selectedLocation = element(by.id('selectedLocation'));
    radioOptions = element(by.id('radio1'));
    radioDirection = element(by.id('radio2'));
    checkboxMulti = element(by.id('checkbox1'));
    checkboxDisabled = element(by.id('checkbox2'));
    checkboxAllowNull = element(by.id('checkbox3'));
    checkboxPaging = element(by.id('checkbox4'));
    placeholder = element(by.id('placeholder'));
    pageSize = element(by.id('pageSize'));

    async getPage(): Promise<void> {
        await browser.get('#/select');
    }

    // confirm & check
    confirmClassExists(item: ElementFinder, soughtClass: string) {
        return item.getAttribute('class').then(function (classes: string) {
            var allClasses = classes.split(' ');
            if (allClasses.indexOf(soughtClass) > -1) {
                return true;
            } else {
                return false;
            }
        });
    }

    confirmDropdownIsExpanded() {
        return this.dropdown.$('ux-typeahead.open').isPresent();
    }

    // use Truthy for "strings" button and Falsy for "objects" button
    checkSelectedOptionsButton() {
        return this.radioOptions.$('ux-radio-button[option="strings"]').$('.ux-radio-button-checked').isPresent();
    }

    // use Truthy for "down" button and Falsy for "up" button
    checkSelectedDirectionButton() {
        return this.radioDirection.$('ux-radio-button[option="down"]').$('.ux-radio-button-checked').isPresent();
    }

    confirmIsChecked(checkbox: ElementFinder) {
        return checkbox.$$('.ux-checkbox-checked').isPresent();
    }

    confirmCountryIsHighlighted(allowMultiple: boolean, index: number) {
        return this.confirmClassExists(this.getCountry(allowMultiple, index), 'highlighted');
    }

    confirmCountryIsDisabled(allowMultiple: boolean, index: number) {
        return this.confirmClassExists(this.getCountry(allowMultiple, index), 'disabled');
    }

    confirmAllowNullIsDisabled() {
        return this.checkboxAllowNull.$('.ux-checkbox-disabled').isPresent();
    }

    confirmPageSizeIsDisabled() {
        return this.pageSize.$('input[disabled]').isPresent();
    }

    confirmPageSizeButtonIsDisabled(direction: string) {
        if (direction === 'down') {
            return this.confirmClassExists(this.pageSize.$('div.number-picker-controls').$$('div').get(0), 'disabled');
        } else {
            return this.confirmClassExists(this.pageSize.$('div.number-picker-controls').$$('div').get(1), 'disabled');
        }
    }


    // get item
    getDropdown(allowMultiple: boolean) {
        if (allowMultiple) {
            return this.dropdown.$('ux-tag-input').$$(this.dropdown.$('ux-tag-input').locator().value + ' > ol').get(0).
                $('li.ux-tag-input').$('input.ux-tag-input');
        } else {
            return this.dropdown.$('input.form-control');
        }
    }

    getCountry(allowMultiple: boolean, index: number) {
        if (allowMultiple) {
            return this.dropdown.$('ux-tag-input.focus').$('ux-typeahead.open').$('div.ux-typeahead-options').
                $('ol').$$('li').get(index);
        } else {
            return this.dropdown.$('ux-typeahead').$('div.ux-typeahead-options').$('ol').$$('li').get(index);
        }
    }

    getLastCountry(allowMultiple: boolean) {
        if (allowMultiple) {
            return this.dropdown.$('ux-tag-input.focus').$('ux-typeahead.open').$('div.ux-typeahead-options').
                $('ol').$$('li').last();
        } else {
            return this.dropdown.$('ux-typeahead').$('div.ux-typeahead-options').$('ol').$$('li').last();
        }
    }

    getTag(index: number) {
        return this.dropdown.$('ux-tag-input').$$(this.dropdown.$('ux-tag-input').locator().value + ' > ol').get(0).
            $$('li').get(index);
    }

    getPlaceholder() {
        return this.placeholder;
    }

    getPageSize() {
        return this.pageSize.$('input.form-control');
    }

    getClearButton(): ElementFinder {
        return this.dropdown.$('.ux-select-clear-icon');
    }


    // get text
    getDropdownPlaceholderText(allowMultiple: boolean) {
        return this.getDropdown(allowMultiple).getAttribute('placeholder');
    }

    getCountryText(allowMultiple: boolean, index: number) {
        return this.getCountry(allowMultiple, index).$('span.ux-typeahead-option').getText();
    }

    getFilterText(index: number) {
        return this.getCountry(false, index).$('span.ux-typeahead-option').$('span.ux-filter-match').getText();
    }

    getSelectedLocationText() {
        return this.selectedLocation.$('code').getText();
    }


    // click
    clickOnDropdown(allowMultiple: boolean) {
        return this.getDropdown(allowMultiple).click();
    }

    clickOnCountry(allowMultiple: boolean, index: number) {
        return this.getCountry(allowMultiple, index).click();
    }

    async clickOnStrings() {
        await this.radioOptions.$('ux-radio-button[option="strings"]').$('.ux-radio-button').click();
    }

    async clickOnObjects() {
        await this.radioOptions.$('ux-radio-button[option="objects"]').$('.ux-radio-button').click();
    }

    async clickOnCheckbox(checkbox: ElementFinder) {
        await checkbox.$('.ux-checkbox').click();
    }

    async clickOnDropDirectionDown() {
        await this.radioDirection.$('ux-radio-button[option="down"]').$('.ux-radio-button').click();
    }

    async clickOnDropDirectionUp() {
        await this.radioDirection.$('ux-radio-button[option="up"]').$('.ux-radio-button').click();
    }

    async clickOnPlaceholder() {
        await this.getPlaceholder().click();
    }

    async clickOnPageSize() {
        await this.getPageSize().click();
    }

    async clickOnIncrementPageSize() {
        await this.pageSize.$('div.number-picker-controls').$('div.number-picker-control-up').click();
    }

    async clickOnDecrementPageSize() {
        await this.pageSize.$('div.number-picker-controls').$('div.number-picker-control-down').click();
    }

    async clickOnTag(index: number) {
        await this.getTag(index).click();
    }

    async removeCountry(index: number) {
        await this.getTag(index).$('button.ux-tag-remove').click();
    }

    // other
    async hoverOverCountry(allowMultiple: boolean, index: number) {
        await browser.actions().mouseMove(this.getCountry(allowMultiple, index)).perform();
    }

    hoverOverLastCountry(allowMultiple: boolean) {
        if (allowMultiple) {
            browser.actions().mouseMove(this.dropdown.$('ux-tag-input.focus').$('ux-typeahead.open').$('div.ux-typeahead-options').
                $('ol').$$('li').last()).perform();
        } else {
            browser.actions().mouseMove(this.dropdown.$('ux-typeahead').$('div.ux-typeahead-options').
                $('ol').$$('li').last()).perform();
        }
    }

    getNumberOfCountries(allowMultiple: boolean) {
        if (allowMultiple) {
            return this.dropdown.$('ux-tag-input.focus').$('ux-typeahead.open').$('div.ux-typeahead-options').
                $('ol').$$('li').count();
        } else {
            return this.dropdown.$('ux-typeahead').$('div.ux-typeahead-options').
                $$(this.dropdown.$('ux-typeahead').
                    $('div.ux-typeahead-options').locator().value + ' > ol').get(0).$$('li').count();
        }
    }

    calculateNewNumberOfCountries(allowMultiple: boolean, pageSize: number) {
        return this.getNumberOfCountries(allowMultiple).then(function (count) {
            if (count > (numberOfCountries - pageSize)) { // makes sure number can't exceed 251
                return numberOfCountries;
            } else {
                return count + pageSize;
            }
        });
    }

    waitForLoadingToFinish() {
        var EC = protractor.ExpectedConditions;
        var elem: ElementFinder;
        elem = this.dropdown.$('ux-tag-input.focus').$('ux-typeahead.open').$('div.ux-typeahead-options').
            $('div').$('div.ux-typeahead-loading');
        return browser.wait(EC.invisibilityOf(elem), scrollingTimeout).then(function () {
            return true;
        }, function () {
            return false;
        });
    }

    waitForLoadingAfterClickToFinish(allowMultiple: boolean) {
        if (allowMultiple) {
            browser.actions().click(this.dropdown.$('ux-tag-input').$$(this.dropdown.$('ux-tag-input').
                locator().value + ' > ol').get(0).$('li.ux-tag-input').$('input.ux-tag-input')).perform();
        } else {
            browser.actions().click(this.dropdown.$('input.form-control')).perform();
        }
        return this.waitForLoadingToFinish();
    }

    waitForLoadingAfterHoverToFinish(allowMultiple: boolean) {
        if (allowMultiple) {
            browser.actions().mouseMove(this.dropdown.$('ux-tag-input.focus').$('ux-typeahead.open').
                $('div.ux-typeahead-options').$('ol').$$('li').last()).perform();
        } else {
            browser.actions().mouseMove(this.dropdown.$('ux-typeahead').$('div.ux-typeahead-options').
                $('ol').$$('li').last()).perform();
        }
        return this.waitForLoadingToFinish();
    }

    async enableClearButton() {
        await element(by.id('enable-clear-button')).click();
    }
}