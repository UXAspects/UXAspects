import { browser, by, element, ElementFinder, protractor } from 'protractor';

export class ItemDisplayPanelPage {

    async getPage(): Promise<void> {
        await browser.get('#/item-display-panel');
    }

    table1 = element(by.id('table1'));
    panel1 = element(by.id('panel1'));
    header = element(by.id('panel1')).$('div.ux-item-display-panel > div.ux-side-panel-header > h3');
    closeButton = element(by.id('panel1')).$('div.ux-item-display-panel > div.ux-side-panel-header > button');
    contentHeader = element(by.id('panel1')).$('div.ux-item-display-panel > div.ux-side-panel-content h1');
    previousButton = element(by.id('panel1')).$('div.ux-item-display-panel > div.ux-side-panel-footer button:nth-of-type(1)');
    nextButton = element(by.id('panel1')).$('div.ux-item-display-panel > div.ux-side-panel-footer button:nth-of-type(2)');

    confirmClassExists(item: ElementFinder, soughtClass: string) {
        return item.getAttribute('class').then(function (classes: string) {
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

    async checkPanelPreviousButtonIsEnabled() {
        const disabled = await this.previousButton.getAttribute('disabled');
        return disabled ? false : true;
    }

    async checkPanelNextButtonIsEnabled() {
        const disabled = await this.nextButton.getAttribute('disabled');
        return disabled ? false : true;
    }

    async clickCloseButton() {
        // Sometimes fails with button no visible. Therefore, wait for it to become visible.
        const EC = protractor.ExpectedConditions;
        const elem = this.closeButton;
        browser.wait(EC.visibilityOf(elem));
        await elem.click();
    }

    async clickPreviousButton() {
        await this.previousButton.click();
    }

    async clickNextButton() {
        await this.nextButton.click();
    }
}

