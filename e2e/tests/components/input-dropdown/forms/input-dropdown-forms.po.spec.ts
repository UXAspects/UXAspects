import { browser, by, element } from 'protractor';

export class InputDropdownFormPage {

    async getPage(): Promise<void> {
        await browser.get('#/input-dropdown/forms');
    }

    checkboxDisabled = element(by.id('disabledBtn'));

}

