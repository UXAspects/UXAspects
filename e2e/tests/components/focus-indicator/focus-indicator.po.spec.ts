import { browser, by, element, Key } from 'protractor';

export class FocusIndicatorButtonsPage {

    target = element(by.id('target'));
    indicatorLabel = element(by.id('indicator-label'));
    mouseToggle = element(by.id('mouse-toggle'));
    keyboardToggle = element(by.id('keyboard-toggle'));
    programmaticToggle = element(by.id('programmatic-toggle'));

    getPage(): void {
        browser.get('#/focus-indicator');
    }

    async getFocusIndicatorClass(): Promise<boolean> {
        // get all the classes
        const classList = await this.target.getAttribute('class');

        // check if the ux-focus-indicator-active is present
        return classList.split(' ').indexOf('ux-focus-indicator') !== -1;
    }

    async getFocusIndicatorActiveClass(): Promise<boolean> {
        // get all the classes
        const classList = await this.target.getAttribute('class');

        // check if the ux-focus-indicator-active is present
        return classList.split(' ').indexOf('ux-focus-indicator-active') !== -1;
    }

    async getIndicatorLabel(): Promise<string> {
        return this.indicatorLabel.getText();
    }

    async setProgrammaticFocus(): Promise<{}> {
        return browser.executeScript('document.querySelector("#target").focus()');
    }

    async setContainerFocused(): Promise<{}> {
        return browser.executeScript('document.querySelector("#container").focus()');
    }

    async pressTab(): Promise<void> {
        return browser.actions().sendKeys(Key.TAB).perform();
    }

}

