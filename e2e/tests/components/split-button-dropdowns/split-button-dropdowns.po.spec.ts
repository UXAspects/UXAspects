import { browser, element, by, ElementFinder } from 'protractor';

export class SplitButtonDropdownsPage {
        
    getPage(): void {
        browser.get('/split-button-dropdowns');
    }
    
    buttonGroup = element(by.id('buttonGroup'));
    actionButton = element(by.id('actionButton'));
    dropdownButton = element(by.id('dropdownButton'));
    link1 = element(by.id('link1'));
    link2 = element(by.id('link2'));
    link3 = element(by.id('link3'));
    link4 = element(by.id('link4'));
    
}

