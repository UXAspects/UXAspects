import { browser, element, by } from 'protractor';

export class HyperlinksPage {
        
    getPage(): void {
        browser.get('/hyperlinks');
    }
    
    textLink = element(by.id('textLink'));
    firstLink = element(by.id('firstLink'));
    secondLink = element(by.id('secondLink'));
    thirdLink = element(by.id('thirdLink'));
    fourthLink = element(by.id('fourthLink'));
}

