import { browser, element, by, ElementFinder } from 'protractor';

export class LinkButtonsPage {
        
    getPage(): void {
        browser.get('/link-buttons');
    }
    
    buttonSecondary = element(by.id('buttonSecondary'));
    buttonAccent = element(by.id('buttonAccent'));
    buttonWarning = element(by.id('buttonWarning'));
    buttonDisabled = element(by.id('buttonDisabled'));
    
    confirmBackgroundIsTransparent(button: ElementFinder) {
        return button.getCssValue('background-color').then((color: string) => {
            if (color === 'transparent') {
                return true;
            } else {
                return false;
            }
        });
    }    
}

