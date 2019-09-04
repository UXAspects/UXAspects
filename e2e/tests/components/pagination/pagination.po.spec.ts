import { browser, by, element, ElementFinder } from 'protractor';

export class PaginationPage {

    async getPage(): Promise<void> {
        await browser.get('#/pagination');
    }

    pagination = element(by.id('pagination'));
    text = element(by.id('text'));
    resetBtn = element(by.id('reset-button'));

    async confirmButtonClassExists(item: ElementFinder, soughtClass: string) {
        const classes = await item.getAttribute('class');
        return classes.split(' ').indexOf(soughtClass) > -1;
    }

    confirmButtonIsActive(item: ElementFinder) {
        return this.confirmButtonClassExists(item, 'active');
    }

    confirmButtonIsDisabled(item: ElementFinder) {
        return this.confirmButtonClassExists(item, 'disabled');
    }

    getButton(index: number) {
        return this.pagination.$('ul.pagination').$$('li.page-item').get(index);
    }

    async clickButton(index: number) {
        await this.pagination.$('ul.pagination').$$('li.page-item').get(index).$('a').click();
    }
}