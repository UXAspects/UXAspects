import { $, browser, ElementFinder, Key } from 'protractor';

export class TabbableListTestPageComponent {

    searchInput = $('input');
    wrapButton = $('#wrap-button');
    boundaryButton = $('#boundary-button');
    focusOnShowButton = $('#focus-on-show-button');

    async getPage(): Promise<void> {
        await browser.get('#/tabbable-list/simple-list');
    }

    async getTableRows(): Promise<ElementFinder[]> {
        const tbody = $('tbody');
        return await tbody.$$('tr');
    }

    async getTableRow(index: number): Promise<ElementFinder> {
        const rows = await this.getTableRows();
        return rows[index];
    }

    async getTabIndex(index: number): Promise<string> {
        const row: ElementFinder = await this.getTableRow(index);
        return row.getAttribute('tabindex');
    }

    async getFocused(index: number): Promise<boolean> {
        const row: ElementFinder = await this.getTableRow(index);
        const classes = await row.getAttribute('class');

        return classes.split(' ').indexOf('ux-focus-indicator-active') !== -1;
    }

    async clickOnRow(index: number): Promise<void> {
        const row = await this.getTableRow(index);
        return await row.click();
    }

    async moveFocusDown(): Promise<void> {
        browser.actions().sendKeys(Key.ARROW_DOWN).perform();
    }

    async moveFocusUp(): Promise<void> {
        browser.actions().sendKeys(Key.ARROW_UP).perform();
    }

    async moveFocusHome(): Promise<void> {
        browser.actions().sendKeys(Key.HOME).perform();
    }

    async moveFocusEnd(): Promise<void> {
        browser.actions().sendKeys(Key.END).perform();
    }

    async toggleWrap(): Promise<void> {
        await this.wrapButton.click();
    }

    async toggleBoundaryKeys(): Promise<void> {
        await this.boundaryButton.click();
    }

    async toggleFocusOnShow(): Promise<void> {
        await this.focusOnShowButton.click();
    }

    async search(query: string): Promise<void> {
        // focus the search input
        await this.searchInput.click();

        // send the search query to the input
        await this.searchInput.sendKeys(query);
    }

    async clearSearch(): Promise<void> {

        // get the current contents
        const value = await this.searchInput.getAttribute('value');

        for (let idx = 0; idx < value.length; idx++) {
            await this.searchInput.sendKeys(Key.BACK_SPACE);
        }
    }
}

