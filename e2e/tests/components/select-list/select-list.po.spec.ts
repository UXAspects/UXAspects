import { $, $$, browser } from 'protractor';

export class SelectListPage {

    input = $('#search-input');
    list = $('ux-select-list');
    items = $$('ux-select-list-item');
    output = $('#select-output');
    toggleButton = $('#toggle-btn');
    resetButton = $('#reset-btn');

    getPage() {
        return browser.get('#/select-list');
    }

    async getItemCount(): Promise<number> {
        return await this.items.count();
    }

    async getSelection(): Promise<string> {
        return await this.output.getText();
    }

    async selectItem(index: number): Promise<void> {
        await this.items.get(index).click();
    }

    async search(query: string): Promise<void> {
        await this.input.sendKeys(query);
    }

    async getTabbableItemCount(): Promise<number> {
        const items = await this.items.map(element => element.getAttribute('tabindex'));

        return items.filter(item => item === '0').length;
    }

    async getTabbableItem(): Promise<string> {
        const items = await this.items.filter(element => element.getAttribute('tabindex').then(tabindex => tabindex === '0'));
        return await items[0].getText();
    }

    async reset(): Promise<void> {
        return this.resetButton.click();
    }
}