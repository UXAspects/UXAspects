import { browser, element, by } from 'protractor';

export class ButtonSizeVariationsPage {
        
    getPage(): void {
        browser.get('#/button-size-variations');
    }
    
    buttonLarge = element(by.id('buttonLarge'));
    buttonMedium = element(by.id('buttonMedium'));
    buttonSmall = element(by.id('buttonSmall'));    
}

