import { browser, element, by , ElementFinder} from 'protractor';

export class ToggleButtonPage {
        
    getPage(): void {
        browser.get('toggle-button');
    }
    
    button1 = element(by.id('toggle1'));
    button2 = element(by.id('toggle2'));
    button3 = element(by.id('toggle3'));
    button4 = element(by.id('toggle4'));
    button5 = element(by.id('toggle5'));
    button6 = element(by.id('toggle6'));
    button7 = element(by.id('toggle7'));
    button8 = element(by.id('toggle8'));
    text1 = element(by.id('p1'));
    text2 = element(by.id('p2'));  
    text3 = element(by.id('p3'));
    text4 = element(by.id('p4'));  

    confirmButtonClassExists(item: ElementFinder, soughtClass: string) {
        return item.getAttribute('class').then(function(classes: string) {
            var allClasses = classes.split(' ');
            if (allClasses.indexOf(soughtClass) > -1) {
                return true;
            } else {
                return false;
            }
        });
    }
   
    confirmButtonIsActive(item: ElementFinder) {
        return this.confirmButtonClassExists(item, 'active');
    }
    
    confirmButtonStyleExists(item: ElementFinder, soughtStyle: string) {
        return item.getAttribute('style').then(function(styles: string) {
            var allStyles = styles.split(' ');
            if (allStyles.indexOf(soughtStyle) > -1) {
                return true;
            } else {
                return false;
            }
        });
    }
    
    confirmTextIsBolded(item: ElementFinder) {
        return this.confirmButtonStyleExists(item, 'bold;');
    }
    
    confirmTextIsItalicised(item: ElementFinder) {
        return this.confirmButtonStyleExists(item, 'italic;');
    }
    
    confirmTextIsUnderlined(item: ElementFinder) {
        return this.confirmButtonStyleExists(item, 'underline;');
    }
}