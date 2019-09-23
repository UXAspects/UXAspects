import { browser } from 'protractor';
import { SelectPage } from '../standard/select.po.spec';

export class SelectFormsPage extends SelectPage {

    async getPage(): Promise<void> {
        await browser.get('#/select/forms');
    }
}