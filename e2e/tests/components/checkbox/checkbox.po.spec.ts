import { browser, element, by } from 'protractor';

export class CheckBoxesPage {
        
    getPage(): void {
        browser.get('/checkboxes');
    }
    
    titleText = browser.getTitle();
    
    checkbox1 = element(by.id('checkbox1'));
    checkbox2 = element(by.id('checkbox2'));
    checkbox3 = element(by.id('checkbox3'));
    checkbox4 = element(by.id('checkbox4'));
    text1 = element(by.id('text1'));
    text2 = element(by.id('text2'));
    text3 = element(by.id('text3'));
    text4 = element(by.id('text4'));        
    button1 = element(by.id('button1'));
    button2 = element(by.id('button2'));
    button3 = element(by.id('button3'));
    button4 = element(by.id('button4'));        
}
