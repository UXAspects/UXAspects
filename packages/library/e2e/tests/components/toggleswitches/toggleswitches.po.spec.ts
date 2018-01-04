import { browser, element, by, ElementFinder } from 'protractor';

export class ToggleSwitchesPage {
        
    getPage(): void {
        browser.get('/toggleswitches');
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
        return toggleswitch.$('div.checked').isPresent();
    }
    
    confirmIsDisabled(toggleswitch: ElementFinder) {
        return toggleswitch.$('div.disabled').isPresent();
    }
    
    toggleByKey(toggleswitch: ElementFinder, key: string) {
        toggleswitch.$('div.ux-toggleswitch').sendKeys(key);
    }
}
