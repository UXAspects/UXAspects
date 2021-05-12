import { browser, by, element, ElementFinder, promise } from 'protractor';

export class SelectCustomHeadingPage {

    dropdown = element(by.id('dropdown'));
    optionsHeading = element(by.id('options-heading'));
    recentOptionsHeading = element(by.id('recent-options-heading'));
    checkboxRecentOptions = element(by.id('recent-options-checkbox'));

    async getPage(): Promise<any> {
        await browser.get('#/select/custom-heading');
    }

    getCountry(index: number): ElementFinder {
        return this.dropdown.$$('.ux-typeahead-all-options li').get(index);
    }

    async clickOnDropdown(): Promise<void> {
        return this.dropdown.click();
    }

    async clickOnCheckbox(checkbox: ElementFinder): Promise<void> {
        await checkbox.$('.ux-checkbox').click();
    }

    async clickOnCountry(index: number): Promise<void> {
        return this.getCountry(index).click();
    }
}
