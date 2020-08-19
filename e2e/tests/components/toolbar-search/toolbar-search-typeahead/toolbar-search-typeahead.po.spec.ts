import { browser, by, element } from 'protractor';

export class ToolbarSearchTypeheadPage {

    // ux-toolbar-search component
    search = element(by.id('search'));
    toolbarInput = this.search.$('[uxToolbarSearchField]');
    searchButton = this.search.$('[uxToolbarSearchButton]');
    searchClear = this.search.$('.ux-toolbar-search-clear');

    // Most recently submitted search query
    searchedFor = element(by.id('searchedFor'));

    async getPage(): Promise<void> {
        await browser.get('#/toolbar-search/toolbar-search-typeahead');
    }

    async isDropdownExpanded(): Promise<boolean> {
        return this.search.$('.ux-typeahead-all-options').isPresent();
    }

    async openDropdown(): Promise<void> {
        await this.searchButton.click();
        return this.toolbarInput.click();
    }

}
