import { browser, Key, $ } from 'protractor';

export class SplitterPage {

    gutter = $('.as-split-gutter');

    async getPage(): Promise<void> {
        await browser.get('#/splitter');
    }

    async setGutterFocused(): Promise<void> {
        return await this.gutter.click();
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
}