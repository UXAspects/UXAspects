import { browser, $, element, by } from 'protractor';

export class ReorderableGroupPage {

    row1 = element(by.id('row-0'));
    handle1 = element(by.id('handle-0'));

    row2 = element(by.id('row-1'));
    handle2 = element(by.id('handle-1'));

    row3 = element(by.id('row-2'));
    handle3 = element(by.id('handle-2'));

    data = $('.data-model');

    getPage(): void {
        browser.get('#/reorderable-group');
    }
}
