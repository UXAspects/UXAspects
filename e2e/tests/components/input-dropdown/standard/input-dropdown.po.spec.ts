import { browser, by, element, ElementFinder } from 'protractor';

export class InputDropdownPage {

    async getPage(): Promise<void> {
        await browser.get('#/input-dropdown');
    }

    dropdown = element(by.id('dropdown'));
    checkboxDisabled = element(by.id('disabledBtn'));

    async isDropdownExpanded(): Promise<boolean> {
        return this.dropdown.$('dropdown').isPresent();
    }

    getButton(): ElementFinder {
        return this.dropdown.$('button.form-control');
    }

    async getButtonText(): Promise<string> {
        return this.getButton().getText();
    }

}

