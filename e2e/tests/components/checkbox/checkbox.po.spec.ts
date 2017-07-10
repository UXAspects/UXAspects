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
    disableButton = element(by.id('button1'));
    setToIndeterminateState = element(by.id('button2'));
    changeToSimplified = element(by.id('button3'));
    
    confirmIsChecked = function(checkbox: any) {    
        return checkbox.$('div.ux-checked').isPresent();
    };
    
    confirmIsDisabled = function(checkbox: any) {
        return checkbox.$('div.ux-disabled').isPresent();
    };
    
    confirmIsIndeterminate = function(checkbox: any) {
        return checkbox.$('div.ux-indeterminate').isPresent();
    };
    
    confirmIsSimplified = function(checkbox: any) {
        return checkbox.$('div.ux-simplified').isPresent();
    };
    
    toggleByKey = function(checkbox: any, key: any) {
        checkbox.$('div.ux-checkbox').sendKeys(key);
    };
}
