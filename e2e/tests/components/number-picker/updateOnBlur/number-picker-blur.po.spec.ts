import { browser, by, element } from 'protractor';
import { NumberPickerPage } from '../number-picker.po.spec';

export class NumberPickerBlurPage extends NumberPickerPage {

    root = element(by.id('root'));
    numberPicker1 = element(by.id('numberPicker1'));
    numberPicker2 = element(by.id('numberPicker2'));
    topFocus = element(by.id('top-focus'));
    value = element(by.id('value'));

    async getPage(): Promise<void> {
        await browser.get('#/number-picker/updateOnBlur');
    }
}
