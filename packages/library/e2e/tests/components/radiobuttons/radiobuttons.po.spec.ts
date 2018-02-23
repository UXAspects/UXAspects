import { browser, element, by, ElementFinder } from 'protractor';

export class RadioButtonsPage {
        
    getPage(): void {
        browser.get('#/radiobuttons');
    }
    
    radiobutton1 = element(by.css('ux-radio-button#radiobutton1'));
    radiobutton2 = element(by.css('ux-radio-button#radiobutton2'));
    radiobutton3 = element(by.css('ux-radio-button#radiobutton3'));
    radiobutton4 = element(by.css('ux-radio-button#radiobutton4'));
    text1 = element(by.id('text1'));
    disableFirstButton = element(by.id('button1'));
    changeToSimplified = element(by.id('button2'));
    
    confirmIsChecked(radiobutton: ElementFinder) {
        return radiobutton.$('div.ux-checked').isPresent();
    }
    
    confirmIsDisabled(radiobutton: ElementFinder) {
        return radiobutton.$('div.ux-disabled').isPresent();
    }
    
    confirmIsSimplified(radiobutton: ElementFinder) {
        return radiobutton.$('div.ux-simplified').isPresent();
    }
    
    toggleByKey(radiobutton: ElementFinder, key: string) {
        radiobutton.$('div.ux-radio-button').sendKeys(key);
    }
}
