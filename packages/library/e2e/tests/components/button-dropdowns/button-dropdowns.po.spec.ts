import { browser, element, by, ElementFinder } from 'protractor';

export class ButtonDropdownsPage {
        
    getPage(): void {
        browser.get('/button-dropdowns');
    }
    
    buttonGroup = element(by.id('buttonGroup'));
    dropdownButton = element(by.id('dropdownButton'));
    link1 = element(by.id('link1'));
    link2 = element(by.id('link2'));
    link3 = element(by.id('link3'));
    link4 = element(by.id('link4'));

}

