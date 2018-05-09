import { browser, $, $$, element, by } from 'protractor';

export class ReorderableGroupPage {

    container1 = element(by.id('container1'));
    container1Rows = $$('#container1 > .list-item');
    json1 = element(by.id('json1'));
    container2 = element(by.id('container2'));
    container2Rows = $$('#container2 > .list-item');
    json2 = element(by.id('json2'));

    getPage(): void {
        browser.get('#/reorderable-group');
    }

    async getObjects1(): Promise<any[]> {
        const json = await this.json1.getText();
        return JSON.parse(json);
    }

    async getObjects2(): Promise<any[]> {
        const json = await this.json2.getText();
        return JSON.parse(json);
    }
}
