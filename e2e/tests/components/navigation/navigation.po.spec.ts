import { $, browser, ElementFinder } from 'protractor';

export class NavigationPage {

    navigation = $('ux-navigation');
    pageContent = $('#page-content');
    enableTreeBtn = $('#enable-tree-btn');
    enableAutoCollapse = $('#enable-auto-collapse-btn');
    disableExact = $('#disable-exact');

    async getPage(): Promise<void> {
        await browser.get('#/navigation');
    }

    async getTopLevelItems(): Promise<ElementFinder[]> {
        return await this.navigation.$$('.ux-side-nav > .nav > li');
    }

    async isItemActive(item: ElementFinder): Promise<boolean> {
        const classes = await item.getAttribute('class');

        return classes.split(' ').indexOf('active') !== -1;
    }

    async getItemChildren(item: ElementFinder): Promise<ElementFinder[]> {
        return item.$$('ol > li');
    }

    async getPageContent(): Promise<string> {
        return await this.pageContent.getText();
    }

    async selectItem(item: ElementFinder): Promise<void> {
        await item.$(item.locator().value + ' > a').click();
    }

    async isTreeModeActive(): Promise<boolean> {
        const classes = await this.navigation.$('.ux-side-nav').getAttribute('class');
        return classes.split(' ').indexOf('tree') !== -1;
    }
}

