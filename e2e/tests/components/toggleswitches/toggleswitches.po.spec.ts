import { ElementFinder, browser, by, element } from 'protractor';

export class ToggleSwitchesPage {
        
    getPage(): void {
        browser.get('#/toggleswitches');
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
    
    confirmIsChecked(toggleswitch: ElementFinder) {
        return toggleswitch.$('.ux-toggleswitch-checked').isPresent();
    }
    
    confirmIsDisabled(toggleswitch: ElementFinder) {
        return toggleswitch.$('.ux-toggleswitch-disabled').isPresent();
    }
    
    toggleByKey(toggleswitch: ElementFinder, key: string) {
        toggleswitch.$('.ux-toggleswitch').sendKeys(key);
    }
}
