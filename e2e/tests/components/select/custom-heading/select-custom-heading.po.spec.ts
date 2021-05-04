import { browser, by, element, ElementFinder } from 'protractor';

export class SelectCustomHeadingPage {

    dropdown = element(by.id('dropdown'));
    selectedLocation = element(by.id('selectedLocation'));
    checkboxRecentOptions = element(by.id('checkbox1'));

    async getPage(): Promise<void> {
        await browser.get('#/select/custom-heading');
    }

    // get item
    getDropdown(allowMultiple: boolean) {
        if (allowMultiple) {
            return this.dropdown.$('input.ux-tag-input');
        } else {
            return this.dropdown.$('input.form-control');
        }
    }

    getCountry(_allowMultiple: boolean, index: number) {
        return this.dropdown.$$('.ux-typeahead-all-options li').get(index);
    }

    getRecentCountry(_allowMultiple: boolean, index: number) {
        return this.dropdown.$$('.ux-typeahead-recent-options li').get(index);
    }

    // get text
    getDropdownPlaceholderText(allowMultiple: boolean) {
        return this.getDropdown(allowMultiple).getAttribute('placeholder');
    }

    getCountryText(allowMultiple: boolean, index: number) {
        return this.getCountry(allowMultiple, index).$('span.ux-typeahead-option').getText();
    }

    getRecentCountryText(allowMultiple: boolean, index: number) {
        return this.getRecentCountry(allowMultiple, index).$('span.ux-typeahead-option').getText();
    }

    // click
    clickOnDropdown(allowMultiple: boolean) {
        return this.getDropdown(allowMultiple).click();
    }

    clickOnCountry(allowMultiple: boolean, index: number) {
        return this.getCountry(allowMultiple, index).click();
    }

    async clickOnCheckbox(checkbox: ElementFinder) {
        await checkbox.$('.ux-checkbox').click();
    }

    getNumberOfRecentCountries(_allowMultiple: boolean) {
        return this.dropdown.$$('.ux-typeahead-recent-options li').count();
    }

    async checkRecentOptions(multi: boolean, expectedOptions: string[]) {
        if (!multi) {
            await this.clickOnDropdown(multi);
        }
        expect(await this.getNumberOfRecentCountries(multi)).toBe(expectedOptions.length);
        for (let index = 0 ; index < expectedOptions.length ; index++) {
            expect(await this.getRecentCountryText(multi, index)).toBe(expectedOptions[index]);
        }
    }
}
