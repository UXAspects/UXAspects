import { browser, element, by, ElementFinder } from 'protractor';

export class ToolbarSearchPage {

    getPage(): void {
        browser.get('#/toolbar-search');
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
}
