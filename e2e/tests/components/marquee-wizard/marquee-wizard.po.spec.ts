import { $, $$, browser, ElementFinder } from 'protractor';

export class MarqueeWizardPage {

    wizard = $('ux-marquee-wizard');
    stepHeaders = $$('.marquee-wizard-step');
    stepContents = $$('ux-marquee-wizard-step');

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

}
