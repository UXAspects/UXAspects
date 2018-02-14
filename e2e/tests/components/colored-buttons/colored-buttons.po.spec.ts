import { browser, element, by } from 'protractor';

export class ColoredButtonsPage {
        
    getPage(): void {
        browser.get('#/colored-buttons');
    }
    
    buttonPrimary = element(by.id('buttonPrimary'));
    buttonSecondary = element(by.id('buttonSecondary'));
    buttonAccent = element(by.id('buttonAccent'));
    buttonWarning = element(by.id('buttonWarning'));
    buttonDisabled = element(by.id('buttonDisabled'));    
}

