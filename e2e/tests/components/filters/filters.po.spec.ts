import { browser, by, element, ElementFinder } from 'protractor';

export class FiltersPage {

    getPage(): void {
        browser.get('#/filters');
    }

    container = element(by.id('container'));
    authorMenu = element(by.id('authorMenu'));
    statusMenu = element(by.id('statusMenu'));
    title = element(by.id('tableTitle'));
    table = element(by.id('tableRow'));

    // confirm
    confirmClassExists(item: ElementFinder, soughtClass: string) {
        return item.getAttribute('class').then(function (classes: string) {
            var allClasses = classes.split(' ');
            if (allClasses.indexOf(soughtClass) > -1) {
                return true;
            } else {
                return false;
            }
        });
    }

    confirmAuthorsAreFiltered() {
        return this.confirmClassExists(this.getAuthorMenu(), 'active');
    }

    confirmStatusIsFiltered() {
        return this.confirmClassExists(this.getStatusMenu(), 'active');
    }

    confirmFilterItemIsHighlighted(index: number) {
        return this.confirmClassExists(this.getFilterItem(index), 'highlighted');
    }

    confirmAuthorMenuIsExpanded() {
        return this.authorMenu.$('div.open').isPresent();
    }

    confirmStatusMenuIsExpanded() {
        return this.statusMenu.$('div.open').isPresent();
    }

    confirmAuthorMenuItemCheckExists(index: number) {
        return this.authorMenu.$$('.dropdown-list-item').get(index).
            $('a.dropdown-item').$('i.hpe-checkmark').isPresent();
    }

    confirmStatusMenuItemCheckExists(index: number) {
        return this.statusMenu.$$('li.dropdown-list-item').get(index).
            $('a.dropdown-item').$('i.hpe-checkmark').isPresent();
    }

    confirmClearAllIsVisible() {
        return this.container.$('button.btn-link').isPresent();
    }

    confirmItemStatus(index: number) {
        return this.table.$$('tr.clickable').get(index).$('td.text-center').$('div.hpe-checkmark').isPresent();
    }


    // get item
    getAuthorMenu() {
        return this.authorMenu.$('button.filter-dropdown');
    }

    getAuthorMenuItem(index: number) {
        return this.authorMenu.$('div.btn-group').$('.dropdown-menu').$$('li.dropdown-list-item').get(index).
            $('a.dropdown-item').$('span.filter-dropdown-title');
    }

    getStatusMenu() {
        return this.statusMenu.$('div.btn-group').$('button.filter-dropdown');
    }

    getStatusMenuItem(index: number) {
        return this.statusMenu.$('div.btn-group').$('.dropdown-menu').$$('li.dropdown-list-item').get(index).
            $('a.dropdown-item').$('span.filter-dropdown-title');
    }

    getFilter() {
        return this.authorMenu.$('div.btn-group').$('.dropdown-menu').$('li.typeahead-box').$('input.form-control');
    }

    getFilterItem(index: number) {
        return this.authorMenu.$('div.btn-group').$('.dropdown-menu').$('li.typeahead-box').
            $('.ux-typeahead-options').$$('li').get(index);
    }


    // get text
    getAuthorMenuItemText(index: number) {
        return this.getAuthorMenuItem(index).getText();
    }

    getPlaceholderText() {
        return this.getFilter().getAttribute('placeholder');
    }

    getFilterItemText(index: number) {
        return this.getFilterItem(index).getText();
    }

    getFilterText(index: number) {
        return this.getFilterItem(index).$('span').$('b').getText();
    }

    getStatusMenuItemText(index: number) {
        return this.getStatusMenuItem(index).getText();
    }

    getTitleText(index: number) {
        return this.title.$$('th.text-black').get(index).getText();
    }

    getItemText(index: number, index2: number) {
        return this.table.$$('tr.clickable').get(index).$$('td').get(index2).getText();
    }

    getPercentageOfWorkCompleted(index: number) {
        return this.table.$$('tr.clickable').get(index).$$('td').get(4).$('ux-spark').$('div.ux-spark-inline-label-container').
            $('div.ux-spark-inline-label-left').getText();
    }


    // click
    clickOnAuthorMenu() {
        return this.getAuthorMenu().click();
    }

    clickOnAuthorMenuItem(index: number) {
        return this.getAuthorMenuItem(index).click();
    }

    clickOnFilter() {
        return this.getFilter().click();
    }

    clickOnFilterItem(index: number) {
        return this.getFilterItem(index).$('span').click();
    }

    clickOnStatusMenu() {
        return this.getStatusMenu().click();
    }

    clickOnStatusMenuItem(index: number) {
        return this.getStatusMenuItem(index).click();
    }

    clickOnClearAll() {
        return this.container.$('button.btn-link').click();
    }


    // other
    getNumberOfItems() {
        return this.table.$$('tr.clickable').count();
    }

    getNumberOfFilterItems() {
        return this.authorMenu.$('.ux-typeahead-options').$$('li').count();
    }

    hoverOverFilterItem(index: number) {
        browser.actions().mouseMove(this.getFilterItem(index)).perform();
    }
}