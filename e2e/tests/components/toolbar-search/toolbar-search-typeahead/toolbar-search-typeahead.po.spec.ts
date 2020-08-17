import { browser, by, element } from 'protractor';

export class ToolbarSearchTypeheadPage {

    async getPage(): Promise<void> {
        await browser.get('#/toolbar-search/ToolbarSearchTypeahead');
    }

    // ux-toolbar-search component
    left = element(by.id('searchLeft'));
    leftInput = this.left.$('[uxToolbarSearchField]');
    leftButton = this.left.$('[uxToolbarSearchButton]');
    leftClear = this.left.$('.ux-toolbar-search-clear');

    // Most recently submitted search query
    searchedFor = element(by.id('searchedFor'));

    async openDropdown() {
        await this.leftButton.click();
        return this.leftInput.click();
    }

    isDropdownExpanded() {
        return this.left.$('.ux-typeahead-all-options').isPresent();
    }

}
