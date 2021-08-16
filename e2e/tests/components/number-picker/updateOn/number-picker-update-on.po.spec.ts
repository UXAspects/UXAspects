import { browser, by, element } from 'protractor';
import { NumberPickerPage } from '../number-picker.po.spec';

export class NumberPickerUpdateOnPage extends NumberPickerPage {

    root = element(by.id('root'));
    numberPickerBlur = element(by.id('update-on-blur-number-picker'));
    numberPickerChange = element(by.id('update-on-change-number-picker'));
    topFocus = element(by.id('top-focus'));
    emittedValue = element(by.id('emitted-value'));

    async getPage(): Promise<void> {
        await browser.get('#/number-picker/updateOn');
    }
}
