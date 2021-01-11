import { browser, by, element } from 'protractor';

export class InputDropdownPage {

    async getPage(): Promise<void> {
        await browser.get('#/input-dropdown');
    }

    dropdown = element(by.id('dropdown'));
    checkboxDisabled = element(by.id('checkbox2'));

    confirmDropdownIsExpanded() {
        return this.dropdown.$('dropdown').isPresent();
    }

       // get item
    getDropdown() {
        return this.dropdown.$('button.form-control');
    }

    getText() {
        return this.getDropdown().getAttribute('innerText');
    }

}

