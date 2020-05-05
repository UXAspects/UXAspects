import { $, browser, by, element } from 'protractor';

export class BadgePage {
    async getPage(): Promise<void> {
        await browser.get('#/badge');
    }
}
