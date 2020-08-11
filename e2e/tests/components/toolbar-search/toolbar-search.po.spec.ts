import { browser, by, element } from 'protractor';

export class ToolbarSearchPage {

    async getPage(): Promise<void> {
        await browser.get('#/toolbar-search');
    }

    // ux-toolbar-search component (left)
    left = element(by.id('searchLeft'));
    leftInput = this.left.$('[uxToolbarSearchField]');
    leftButton = this.left.$('[uxToolbarSearchButton]');
    leftClear = this.left.$('.ux-toolbar-search-clear');

    // ux-toolbar-search component (right)
    right = element(by.id('searchRight'));
    rightInput = this.right.$('[uxToolbarSearchField]');
    rightButton = this.right.$('[uxToolbarSearchButton]');
    rightClear = this.right.$('.ux-toolbar-search-clear');

    // Most recently submitted search query
    searchedFor = element(by.id('searchedFor'));
    selectedLocation = element(by.id('mastheadSearchText'));

    // button to set always expanded state
    alwaysExpandedBtn = element(by.id('always-expanded-btn'));

    async clickOnDropdown() {
        await this.leftButton.click();
        return this.leftInput.click();
    }

    confirmDropdownIsExpanded() {
        return this.left.$('ux-typeahead-all-options').isPresent();
    }

    getSelectedLocationText() {
        return this.selectedLocation.$('code').getText();
    }

}
