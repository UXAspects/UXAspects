import { $, browser, ElementFinder } from 'protractor';

export class AlertTestPage {
    async getPage(): Promise<void> {
        await browser.get('#/alert');
    }

    getAlert(id: string): ElementFinder {
        return $(`#${id}`);
    }

    async clickDismiss(id: string): Promise<void> {
        return await this.getAlert(id).$('.alert-close').click();
    }
}
