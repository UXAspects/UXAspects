import { browser } from 'protractor';
import { SelectPage } from '../standard/select.po.spec';

export class SelectFormsPage extends SelectPage {

    getPage(): void {
        browser.get('#/select/forms');
    }
}