import { browser, element, by, ElementFinder, protractor } from 'protractor';

export class ItemDisplayPanelPage {

    getPage(): void {
        browser.get('#/item-display-panel');
    }

    table1 = element(by.id('table1'));
    panel1 = element(by.id('panel1'));
    header = element(by.id('panel1')).$('div.ux-item-display-panel > div.ux-side-panel-header > h3');
    closeButton = element(by.id('panel1')).$('div.ux-item-display-panel > div.ux-side-panel-header > button');
    contentHeader = element(by.id('panel1')).$('div.ux-item-display-panel > div.ux-side-panel-content h1');
    previousButton = element(by.id('panel1')).$('div.ux-item-display-panel > div.ux-side-panel-footer button:nth-of-type(1)');
    nextButton = element(by.id('panel1')).$('div.ux-item-display-panel > div.ux-side-panel-footer button:nth-of-type(2)');

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
        return this.confirmClassExists(this.panel1, 'open');
    }

    clickARow(index: number) {
        this.table1.$('tbody').$$('tr').get(index).click();
    }

    getPanelHeader() {
        return this.header.getText();
    }

    getPanelContent() {
        return this.contentHeader.getText();
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

