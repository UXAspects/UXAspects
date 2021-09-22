import { $, browser, by, element, ElementFinder } from 'protractor';
import { NumberPickerPage } from '../number-picker.po.spec';

export class NumberPickerUpdateOnPage extends NumberPickerPage {

    numberPickerReadOnly = $('#read-only-number-picker');
    emittedValue = element(by.id('emitted-value'));
    readonlyCheckbox = element(by.id('readonlyCheckbox'));

    incrementArrow = $('#read-only-number-picker').$('div.number-picker-controls').$('div.number-picker-control-up');
    decrementArrow = $('#read-only-number-picker').$('div.number-picker-controls').$('div.number-picker-control-down');

    async getPage(): Promise<void> {
        await browser.get('#/number-picker/readonly');
    }

    async attemptToSetNumberPickerValue(value: string): Promise<void> {
        await this.numberPickerReadOnly.$('input').click();
        await browser.actions().sendKeys(value).perform();
    }

    async clickOnCheckbox(checkbox: ElementFinder) {
        await checkbox.$('.ux-checkbox').click();
    }
}
