import { $$, browser, by, element, ElementFinder } from 'protractor';

export class ReorderableTablePage {

    row1 = element(by.id('row-0'));
    handle1 = element(by.id('handle-0'));

    row2 = element(by.id('row-1'));
    handle2 = element(by.id('handle-1'));

    row3 = element(by.id('row-2'));
    handle3 = element(by.id('handle-2'));

    async getPage(): Promise<void> {
        await browser.get('#/reorderable-table');
    }

    async getDocumentOrder(): Promise<string[]> {
        const documents: ElementFinder[] = await $$('.document-name');

        const names = [];

        for (let idx = 0; idx < documents.length; idx++) {
            names.push(await documents[idx].getText());
        }

        return names;
    }
}
