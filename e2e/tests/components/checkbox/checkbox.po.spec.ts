import { browser, by, element, ElementFinder } from 'protractor';

export class CheckBoxesPage {

    async getPage(): Promise<void> {
        await browser.get('#/checkboxes');
    }

    checkbox1 = element(by.id('checkbox1'));
    checkbox2 = element(by.id('checkbox2'));
    checkbox3 = element(by.id('checkbox3'));
    checkbox4 = element(by.id('checkbox4'));
    text1 = element(by.id('text1'));
    text2 = element(by.id('text2'));
    text3 = element(by.id('text3'));
    text4 = element(by.id('text4'));
    disableButton = element(by.id('button1'));
    setToIndeterminateState = element(by.id('button2'));
    changeToSimplified = element(by.id('button3'));
    resetBtn = element(by.id('button4'));

    confirmIsChecked(checkbox: ElementFinder) {
        return checkbox.$('.ux-checkbox-checked').isPresent();
    }

    confirmIsDisabled(checkbox: ElementFinder) {
        return checkbox.$('.ux-checkbox-disabled').isPresent();
    }

    confirmIsIndeterminate(checkbox: ElementFinder) {
        return checkbox.$('.ux-checkbox-indeterminate').isPresent();
    }

    confirmIsSimplified(checkbox: ElementFinder) {
        return checkbox.$('.ux-checkbox-simplified').isPresent();
    }

    async toggleByKey(checkbox: ElementFinder, key: string) {
        await checkbox.$('.ux-checkbox').sendKeys(key);
    }
}

