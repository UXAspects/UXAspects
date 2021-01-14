import { $, $$, browser, by, element, ElementFinder } from 'protractor';

export class FiltersPage {

    async getPage(): Promise<void> {
        await browser.get('#/filters');
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
        return this.confirmClassExists(this.getAuthorMenuBtn(), 'active');
    }

    confirmStatusIsFiltered() {
        return this.confirmClassExists(this.getStatusMenuBtn(), 'active');
    }

    confirmFilterItemIsHighlighted(index: number) {
        return this.confirmClassExists(this.getFilterItem(index), 'highlighted');
    }

    confirmAuthorMenuIsExpanded() {
        return $('.ux-dynamic-filter-menu').isPresent();
    }

    confirmStatusMenuIsExpanded() {
        return $('.ux-filter-menu').isPresent();
    }

    confirmAuthorMenuItemCheckExists(index: number) {
        return $('.ux-dynamic-filter-menu').$$('.ux-menu-item').get(index).$('ux-icon').isDisplayed();
    }

    confirmStatusMenuItemCheckExists(index: number) {
        return $('.ux-filter-menu').$$('.ux-menu-item').get(index).$('ux-icon').isDisplayed();
    }

    confirmClearAllIsVisible() {
        return this.container.$('button.btn-link').isPresent();
    }

    confirmItemStatus(index: number) {
        return this.table.$$('tr.clickable').get(index).$('td.text-center').$('ux-icon').isPresent();
    }


    // get item
    getAuthorMenuBtn() {
        return this.authorMenu.$('button.filter-dropdown');
    }

    getAuthorMenuItem(index: number) {
        return $('.ux-dynamic-filter-menu').$$('.ux-menu-item').get(index).$('.filter-dropdown-title');
    }

    getStatusMenuBtn() {
        return this.statusMenu.$('div.btn-group').$('button.filter-dropdown');
    }

    getStatusMenuItem(index: number) {
        return $('.ux-filter-menu').$$('.ux-menu-item').get(index).$('.filter-dropdown-title');
    }

    getFilter() {
        return $('.ux-dynamic-filter-menu').$('.typeahead-box').$('input.form-control');
    }

    getFilterItem(index: number) {
        return $('.ux-dynamic-filter-menu').$('.typeahead-box').
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
        return this.getAuthorMenuBtn().click();
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
        return this.getStatusMenuBtn().click();
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
        return $('.ux-dynamic-filter-menu').$('.ux-typeahead-options').$$('li').count();
    }

    hoverOverFilterItem(index: number) {
        browser.actions().mouseMove(this.getFilterItem(index)).perform();
    }

    async closeMenus() {
        return $$('.cdk-overlay-backdrop.cdk-overlay-backdrop-showing').click();
    }
}
