import { browser, element, by, ElementFinder, protractor } from 'protractor';

export class ItemDisplayPanelPage {
    
    getPage(): void {
        browser.get('/item-display-panel');
    }
    
    table1 = element(by.id('table1'));
    panel1 = element(by.id('panel1'));
    closeButton = element(by.id('panel1')).$('div.ux-item-display-panel').$('div.item-display-panel-header').
                  $('div.heading-flex-box').$('span.heading-close-button').$('i');
    previousButton = element(by.id('panel1')).$('div.ux-item-display-panel').$('div.item-display-panel-footer').
                     $('div.pull-right').$('span.btn-pair').$$('button').get(0);
    nextButton = element(by.id('panel1')).$('div.ux-item-display-panel').$('div.item-display-panel-footer').
                 $('div.pull-right').$('span.btn-pair').$$('button').get(1);
    
    confirmClassExists(item: ElementFinder, soughtClass: string) {
        return item.getAttribute('class').then(function(classes: string) {
            var allClasses = classes.split(' ');
            if (allClasses.indexOf(soughtClass) > -1) {
                return true;
            } else {
                return false;
            }
        });
    }
    
    getNumberOfTableRows() {
        return this.table1.$('tbody').$$('tr').count();
    }
    
    confirmRowIsHighlighted(index: number) {
        return this.confirmClassExists(this.table1.$('tbody').$$('tr').get(index), 'highlight');
    }
    
    waitForPanelToBeDisplayed() {
        return browser.wait(protractor.ExpectedConditions.visibilityOf(this.panel1));
    }
    
    confirmPanelIsDisplayed() {
        return this.confirmClassExists(this.panel1, 'visible-host');
    }
    
    clickARow(index: number) {
        this.table1.$('tbody').$$('tr').get(index).click();
    }
    
    getPanelHeader() {
        return this.panel1.$('div.ux-item-display-panel').$('div.item-display-panel-header').$('div.heading-flex-box').
               $('h3').getText();
    }

    getPanelContent() {
        return this.panel1.$('div.ux-item-display-panel').$('div.item-display-panel-content').$('div[uxitemdisplaypanelcontent]').
               $('div.p-r-md').$('h1').getText();
    }
    
    confirmPanelCloseButtonIsVisible() {
        return this.closeButton.isPresent();
    }
    
    checkPanelPreviousButtonIsEnabled() {
        return(this.previousButton.getAttribute('disabled').then(function(attr: string) {
                return (attr) ? false : true;
            })
        );
    }
    
    checkPanelNextButtonIsEnabled() {
        return(this.nextButton.getAttribute('disabled').then(function(attr: string) {
                return (attr) ? false : true;
            })
        );
    }
    
    clickCloseButton() {
        // Sometimes fails with button no visible. Therefore, wait for it to become visible.
        var EC = protractor.ExpectedConditions;
        var elem = this.closeButton;
        browser.wait(EC.visibilityOf(elem));
        elem.click();
    }
    
    clickPreviousButton() {
        this.previousButton.click();
    }
    
    clickNextButton() {
        this.nextButton.click();
    }    
}

