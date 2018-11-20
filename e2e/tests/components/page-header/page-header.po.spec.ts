import { browser, by, element, ElementFinder, protractor } from 'protractor';

export class PageHeaderPage {

    getPage(): void {
        browser.get('#/page-header');
    }

    pageHeader1 = element(by.id('pageHeader1'));
    pageHeader2 = element(by.id('pageHeader2'));
    selected = element(by.id('selected'));
    toggleButton = element(by.id('button1'));

    alignLeftButton = element(by.id('align-left'));
    alignCenterButton = element(by.id('align-center'));
    alignRightButton = element(by.id('align-right'));
    autoselectButton = element(by.id('autoselect'));

    condensed = false;

    confirmClassExists(item: ElementFinder, soughtClass: string) {
        return item.getAttribute('class').then(function(classes: string) {
            var allClasses = classes.split(' ');
            if (allClasses.indexOf(soughtClass) > -1) {
                return true;
            } else {
                return false;
            }
        });
    }

    confirmPageHeaderIsCondensed() {
        return this.confirmClassExists(this.pageHeader1, 'page-header-condensed');
    }

    toggleTheHeader() {
        this.toggleButton.click();
        this.condensed = !this.condensed;
    }

    // The expanded and condensed forms of most of the locators used here are the same except for the first
    // two elements. This function will return an ElementFinder for the first two elements which may then be
    // passed to the other functions, avoiding duplication of code.
    getContainerElement(condensed: boolean) {
        return browser.driver.wait(() => {
            var EC = protractor.ExpectedConditions;
            var elem: ElementFinder;
            elem = (condensed === true) ? browser.element(by.id('pageHeader1')).$('div.page-header-condensed-content') :
                                          browser.element(by.id('pageHeader1')).$('div.page-header-actions');
            browser.wait(EC.visibilityOf(elem));
            return elem;
        });
    }

    getABreadcrumb(index: number) {
        return this.pageHeader1.$('div.page-header-details').$('div.page-header-state-container').$('div.page-header-title-container').
               $('ux-breadcrumbs').$('ol.breadcrumb').$$('li').get(index).getText();
    }

    getABreadcrumbWhenCondensed(index: number) {
        return this.pageHeader1.$('div.page-header-condensed-content').$('div.page-header-breadcrumbs').
               $('ux-breadcrumbs').$('ol.breadcrumb').$$('li').get(index).getText();
    }

    confirmApplicationLogoIsPresent() {
        return this.getContainerElement(this.condensed).then(function(elem: ElementFinder) {
            return elem.$('div.page-header-navigation').$('ux-page-header-horizontal-navigation').
                   $$('ux-page-header-horizontal-navigation-item').get(0).$('.horizontal-navigation-button').
                   $('span.hpe-home').isPresent();
        });
    }

    getApplicationLogoText() {
        return this.getContainerElement(this.condensed).then(function(elem: ElementFinder) {
            return elem.$('div.page-header-navigation').$('ux-page-header-horizontal-navigation').
                   $$('ux-page-header-horizontal-navigation-item').get(0).$('.horizontal-navigation-button').
                   $('span.navigation-item-label').getText();
        });
    }

    confirmDropdownIsPresent() {
        return this.getContainerElement(this.condensed).then(function(elem: ElementFinder) {
            return elem.$('div.page-header-navigation').$('ux-page-header-horizontal-navigation').
                   $$('ux-page-header-horizontal-navigation-item').get(1).$('.horizontal-navigation-button').
                   $('span.hpe-analytics').isPresent();
        });
    }

    openDropdown() {
        this.getContainerElement(this.condensed).then(function(elem: ElementFinder) {
            elem.$('div.page-header-navigation').$('ux-page-header-horizontal-navigation').
            $$('ux-page-header-horizontal-navigation-item').get(1).$('.horizontal-navigation-button').click();
        });
    }

    confirmDropdownIsOpened() {
        return this.getContainerElement(this.condensed).then(function(elem: ElementFinder) {
            return elem.$('div.page-header-navigation').$('ux-page-header-horizontal-navigation').
                   $$('ux-page-header-horizontal-navigation-item').get(1).$('.horizontal-navigation-button.open').isPresent();
        });
    }

    getFirstDropdownMenuItem(index: number) {
        return browser.element(by.css('body')).$$('bs-dropdown-container').get(0).$('div.dropdown').$('div.dropdown-menu').
                   $$('ux-page-header-horizontal-navigation-dropdown-item').get(index).$('div').$('a.dropdown-item').$('span.dropdown-item-title').getText();
    }

    displaySecondDropdownMenu() {
        browser.actions().mouseMove(browser.element(by.css('body')).$$('bs-dropdown-container').get(0).$('div.dropdown').$('div.dropdown-menu').
                   $$('ux-page-header-horizontal-navigation-dropdown-item').get(1)).perform();
    }

    getSecondDropdownMenuItem(index: number) {
        return browser.element(by.css('body')).$$('bs-dropdown-container').get(1).$('div.dropdown').$('ul.dropdown-menu').
                   $$('li').get(index).$('a.dropdown-item').$('span.dropdown-item-title').getText();
    }

    confirmNotificationIconIsPresent() {
        return this.getContainerElement(this.condensed).then(function(elem: ElementFinder) {
            return elem.$('div.page-header-icon-menus').$$('ux-page-header-icon-menu').get(0).$('div.page-header-icon-menu').
                   $('a.page-header-icon-menu-button').$('i.hpe-notification').isPresent();
        });
    }

    openNotifications() {
        this.getContainerElement(this.condensed).then(function(elem: ElementFinder) {
            elem.$('div.page-header-icon-menus').$$('ux-page-header-icon-menu').get(0).$('div.page-header-icon-menu').
                 $('a.page-header-icon-menu-button').click();
        });
    }

    confirmNotificationsAreDisplayed() {
        return this.getContainerElement(this.condensed).then(function(elem: ElementFinder) {
            return elem.$('div.page-header-icon-menus').$$('ux-page-header-icon-menu').get(0).
                   $('div.page-header-icon-menu').$('ul.dropdown-menu').$$('li').count();
        });
    }

    confirmActionsIconIsPresent() {
        return this.getContainerElement(this.condensed).then(function(elem: ElementFinder) {
            return elem.$('div.page-header-icon-menus').$$('ux-page-header-icon-menu').get(1).$('div.page-header-icon-menu').
                   $('a.page-header-icon-menu-button').$('i.hpe-actions').isPresent();
        });
    }

    openActions() {
        this.getContainerElement(this.condensed).then(function(elem: ElementFinder) {
            elem.$('div.page-header-icon-menus').$$('ux-page-header-icon-menu').get(1).$('div.page-header-icon-menu').
                 $('a.page-header-icon-menu-button').click();
        });
    }

    confirmActionsAreDisplayed() {
        return this.getContainerElement(this.condensed).then(function(elem: ElementFinder) {
            return elem.$('div.page-header-icon-menus').$$('ux-page-header-icon-menu').get(1).
                   $('div.page-header-icon-menu').$('ul.dropdown-menu').$$('li').count();
        });
    }

    async getSecondaryNavigation(): Promise<ElementFinder> {
        return await this.pageHeader2.$('.page-header-secondary');
    }

    async getClasses(target: ElementFinder): Promise<string[]> {
        return (await target.getAttribute('class') || '').split(' ');
    }
}

