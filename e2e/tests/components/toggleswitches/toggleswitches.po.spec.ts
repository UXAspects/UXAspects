import { browser, by, element, ElementFinder } from 'protractor';

export class ToggleSwitchesPage {

    async getPage(): Promise<void> {
        await browser.get('#/toggleswitches');
    }

    toggleswitch1 = element(by.id('switch1'));
    toggleswitch2 = element(by.id('switch2'));
    toggleswitch3 = element(by.id('switch3'));
    toggleswitch4 = element(by.id('switch4'));
    text1 = element(by.id('text1'));
    text2 = element(by.id('text2'));
    text3 = element(by.id('text3'));
    text4 = element(by.id('text4'));
    disableButton = element(by.id('button1'));
    resetButton = element(by.id('reset-button'));

    confirmIsChecked(toggleswitch: ElementFinder) {
        return toggleswitch.$('.ux-toggleswitch-checked').isPresent();
    }

    confirmIsDisabled(toggleswitch: ElementFinder) {
        return toggleswitch.$('.ux-toggleswitch-disabled').isPresent();
    }

    async toggleByKey(toggleswitch: ElementFinder, key: string) {
        await toggleswitch.$('.ux-toggleswitch').sendKeys(key);
    }

    reset() {
        return this.resetButton.click();
    }
}
