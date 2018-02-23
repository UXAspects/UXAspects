import { browser, element, by, ElementFinder } from 'protractor';

export class CircularIconButtonsPage {
        
    getPage(): void {
        browser.get('#/circular-icon-buttons');
    }
    
    buttonLarge = element(by.id('buttonLarge'));
    buttonMedium = element(by.id('buttonMedium'));
    buttonSmall = element(by.id('buttonSmall'));    
}

