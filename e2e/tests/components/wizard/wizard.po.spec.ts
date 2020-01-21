import { $, $$, browser, by, element, ElementFinder } from 'protractor';

export class WizardPage {

    wizard = $('ux-wizard');
    stepHeaders = $$('.wizard-step');
    stepContents = $$('ux-wizard-step');
    buttons = $$('ux-wizard button');
    addStep5Button = $('#addStep5');
    removeStep5Button = $('#removeStep5');
    footerTemplateButton = element(by.id('footerTemplate'));
    resetButton = element(by.id('reset'));
    step1InvalidButton = element(by.id('step1Invalid'));
    step4InvalidButton = element(by.id('step4Invalid'));
    step2InvalidButton = element(by.id('step2Invalid'));
    disableNextWhenInvalidWizardButton = element(by.id('disableNextWhenInvalidWizard'));
    disableNextWhenInvalidButton = element(by.id('disableNextWhenInvalid'));

    async getPage(): Promise<void> {
        await browser.get('#/wizard');
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

    async goToNext(): Promise<void> {
        // find the next button
        const next = await this.getNextButton();

        // click on the next button
        return await next.click();
    }

    async goToPrevious(): Promise<void> {
        // find the next button
        const prev = await this.getPreviousButton();

        // click on the next button
        return await prev.click();
    }

    async addStep5(): Promise<void> {
        return await this.addStep5Button.click();
    }

    async removeStep5(): Promise<void> {
        return await this.removeStep5Button.click();
    }

}
