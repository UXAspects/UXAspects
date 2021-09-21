import { browser, by, element } from 'protractor';
import { NumberPickerPage } from '../number-picker.po.spec';

export class NumberPickerUpdateOnPage extends NumberPickerPage {

    numberPickerReadOnly = element(by.id('read-only-number-picker'));
    emittedValue = element(by.id('emitted-value'));

    async getPage(): Promise<void> {
        await browser.get('#/number-picker/readonly');
    }
}
