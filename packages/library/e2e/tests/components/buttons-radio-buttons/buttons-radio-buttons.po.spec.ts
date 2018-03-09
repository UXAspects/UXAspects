import { browser, element, by } from 'protractor';

export class ButtonsRadioButtonsPage {
        
    getPage(): void {
        browser.get('#/buttons-radio-buttons');
    }
    
    buttonPrimaryLeft = element(by.id('buttonPrimaryLeft'));
    buttonPrimaryCentre = element(by.id('buttonPrimaryCentre'));
    buttonPrimaryRight = element(by.id('buttonPrimaryRight'));
    buttonAccentLeft = element(by.id('buttonAccentLeft'));
    buttonAccentCentre = element(by.id('buttonAccentCentre'));
    buttonAccentRight = element(by.id('buttonAccentRight'));
    textPrimary = element(by.id('textPrimary'));
    textAccent = element(by.id('textAccent'));
}

