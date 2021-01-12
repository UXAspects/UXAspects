import { browser } from 'protractor';

export class InputDropdownFormPage {

    async getPage(): Promise<void> {
        await browser.get('#/input-dropdown/forms');
    }


}

