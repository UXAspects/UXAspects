import { browser, by, element, ElementFinder, promise } from 'protractor';

export class SelectCustomHeadingPage {

    dropdown = element(by.id('dropdown'));
    optionsHeader = element(by.id('options-header'));
    recentHeadingOptions = element(by.id('recent-options-header'));
    checkboxRecentOptions = element(by.id('checkbox1'));

    async getPage(): Promise<void> {
        await browser.get('#/select/custom-heading');
    }

    getCountry(_allowMultiple: boolean, index: number): ElementFinder {
        return this.dropdown.$$('.ux-typeahead-all-options li').get(index);
    }

    getRecentCountry(_allowMultiple: boolean, index: number): ElementFinder {
        return this.dropdown.$$('.ux-typeahead-recent-options li').get(index);
    }

    // get item
    getDropdown(allowMultiple: boolean): ElementFinder {
        if (allowMultiple) {
            return this.dropdown.$('input.ux-tag-input');
        } else {
            return this.dropdown.$('input.form-control');
        }
    }

    getRecentCountryText(allowMultiple: boolean, index: number): promise.Promise<string> {
        return this.getRecentCountry(allowMultiple, index).$('span.ux-typeahead-option').getText();
    }

    getNumberOfRecentCountries(_allowMultiple: boolean): promise.Promise<number> {
        return this.dropdown.$$('.ux-typeahead-recent-options li').count();
    }

    // click
    clickOnDropdown(allowMultiple: boolean): promise.Promise<void> {
        return this.getDropdown(allowMultiple).click();
    }

    async clickOnCheckbox(checkbox: ElementFinder): Promise<void> {
        await checkbox.$('.ux-checkbox').click();
    }

    clickOnCountry(allowMultiple: boolean, index: number): promise.Promise<void> {
        return this.getCountry(allowMultiple, index).click();
    }

    async checkRecentOptions(multi: boolean, expectedOptions: string[]): Promise<void> {
        if (!multi) {
            await this.clickOnDropdown(multi);
        }
        expect(await this.getNumberOfRecentCountries(multi)).toBe(expectedOptions.length);
        for (let index = 0 ; index < expectedOptions.length ; index++) {
            expect(await this.getRecentCountryText(multi, index)).toBe(expectedOptions[index]);
        }
    }

}
