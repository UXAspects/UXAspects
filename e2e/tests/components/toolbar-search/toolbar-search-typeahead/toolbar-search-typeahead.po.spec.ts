import { browser, by, element } from 'protractor';

export class ToolbarSearchTypeheadPage {

    async getPage(): Promise<void> {
        await browser.get('#/toolbar-search/toolbar-search-typeahead');
    }

    // ux-toolbar-search component
    search = element(by.id('search'));
    toolbarInput = this.search.$('[uxToolbarSearchField]');
    searchButton = this.search.$('[uxToolbarSearchButton]');
    searchClear = this.search.$('.ux-toolbar-search-clear');

    // Most recently submitted search query
    searchedFor = element(by.id('searchedFor'));

    async openDropdown() {
        await this.searchButton.click();
        return this.toolbarInput.click();
    }

    isDropdownExpanded() {
        return this.search.$('.ux-typeahead-all-options').isPresent();
    }

}
