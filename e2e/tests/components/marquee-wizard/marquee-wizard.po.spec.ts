import { $, $$, browser, by, element, ElementFinder, Key } from 'protractor';

export class MarqueeWizardPage {

    wizard = $('ux-marquee-wizard');
    stepHeaders = $$('.marquee-wizard-step');
    stepContents = $$('ux-marquee-wizard-step');
    gutter = element(by.tagName('split-gutter'));
    resizeableButton = element(by.id('resizeable'));
    footerTemplateButton = element(by.id('footerTemplate'));
    step4InvalidButton = element(by.id('step4Invalid'));
    step1InvalidButton = element(by.id('step1Invalid'));
    step2InvalidButton = element(by.id('step2Invalid'));
    disableNextWhenInvalidStep1Button = element(by.id('disableNextWhenInvalidStep1'));
    disableNextWhenInvalidWizardButton = element(by.id('disableNextWhenInvalidWizard'));
    resetButton = element(by.id('reset'));
    input = $('ux-number-picker input');
    emittedWidth = element(by.id('sidePanelWidthChange'));

    buttons = $$('button');

    async getPage(): Promise<void> {
        await browser.get('#/marquee-wizard');
    }

    async getButtonByText(text: string): Promise<ElementFinder> {
        let buttons = await this.buttons;
        let btnText = await this.buttons.map(button => button.getText());
        let matchIdx = btnText.findIndex((label: string) => label.toLowerCase() === text.toLowerCase());

        return matchIdx === -1 ? null : buttons[matchIdx];
    }

    async getPreviousButton(): Promise<ElementFinder> {
        return await this.getButtonByText('Previous');
    }

    async getNextButton(): Promise<ElementFinder> {
        return await this.getButtonByText('Next');
    }

    async getCancelButton(): Promise<ElementFinder> {
        return await this.getButtonByText('Cancel');
    }


    async getFinishButton(): Promise<ElementFinder> {
        return await this.getButtonByText('Finish');
    }

    async goToNext() {
        // find the next button
        let next: ElementFinder = await this.getNextButton();

        // click on the next button
        await next.click();
    }

    async getGutterAriaValue(): Promise<string> {
        return await this.gutter.getAttribute('aria-valuenow');
    }

    async getGutterAriaValueMin(): Promise<string> {
        return await this.gutter.getAttribute('aria-valuemin');
    }

    async getGutterAriaValueMax(): Promise<string> {
        return await this.gutter.getAttribute('aria-valuemax');
    }

    async getInputField(): Promise<string> {
        return await this.input.getAttribute('value');
    }

    async setGutterFocused(): Promise<void> {
        return await this.gutter.click();
    }

    async sendLeftKey(): Promise<void> {
        return await browser.actions().sendKeys(Key.ARROW_LEFT).perform();
    }

    async sendRightKey(): Promise<void> {
        return await browser.actions().sendKeys(Key.ARROW_RIGHT).perform();
    }

    async sendHomeKey(): Promise<void> {
        return await browser.actions().sendKeys(Key.HOME).perform();
    }

    async sendEndKey(): Promise<void> {
        return await browser.actions().sendKeys(Key.END).perform();
    }

    async mouseMoveLeft(): Promise<void> {
        return await browser.actions().dragAndDrop(this.gutter, { x: -10, y: 0 }).perform();
    }

    async mouseMoveRight(): Promise<void> {
        return await browser.actions().dragAndDrop(this.gutter, { x: 10, y: 0 }).perform();
    }
}
