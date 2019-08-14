import { $, browser, by, element, ElementFinder } from 'protractor';

export class PageHeaderPage {

    async getPage(): Promise<void> {
        await browser.get('#/page-header');
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
        return item.getAttribute('class').then(function (classes: string) {
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

    async getABreadcrumb(index: number): Promise<string> {
        return this.pageHeader1.$('ux-breadcrumbs').$$('li').get(index).getText();
    }

    async confirmApplicationLogoIsPresent() {
        return this.pageHeader1.$('div.page-header-navigation').$('ux-page-header-horizontal-navigation').
            $$('ux-page-header-horizontal-navigation-item').get(0).$('.horizontal-navigation-button').
            $('span.hpe-home').isPresent();
    }

    async getApplicationLogoText(): Promise<string> {
        return this.pageHeader1.$('div.page-header-navigation').$('ux-page-header-horizontal-navigation').
            $$('ux-page-header-horizontal-navigation-item').get(0).$('.horizontal-navigation-button').
            $('span.navigation-item-label').getText();
    }

    confirmDropdownIsPresent() {
        return this.pageHeader1.$('div.page-header-navigation').$('ux-page-header-horizontal-navigation').
            $$('ux-page-header-horizontal-navigation-item').get(1).$('.horizontal-navigation-button').
            $('span.hpe-analytics').isPresent();
    }

    openDropdown() {
        return this.pageHeader1.$('div.page-header-navigation').$('ux-page-header-horizontal-navigation').
            $$('ux-page-header-horizontal-navigation-item').get(1).$('.horizontal-navigation-button').click();
    }

    async confirmDropdownIsOpened() {
        return await $('.horizontal-navigation-dropdown-menu').isPresent();
    }

    getFirstDropdownMenuItem(index: number) {
        return $('.horizontal-navigation-dropdown-menu')
            .$$('ux-page-header-horizontal-navigation-dropdown-item').get(index).$('.dropdown-item-title').getText();
    }

    displaySecondDropdownMenu() {
        const menuItem = $('.horizontal-navigation-dropdown-menu')
            .$$('ux-page-header-horizontal-navigation-dropdown-item').get(1);

        return browser.actions().mouseMove(menuItem).perform();
    }

    async getSecondDropdownMenuItem(index: number) {
        return $('.horizontal-navigation-dropdown-submenu')
            .$$('.ux-menu-item').get(index).$('.dropdown-item-title').getText();
    }

    confirmNotificationIconIsPresent() {
        return this.pageHeader1.$('div.page-header-icon-menus').$$('ux-page-header-icon-menu').get(0).$('div.page-header-icon-menu').
            $('.page-header-icon-menu-button').$('i.hpe-notification').isPresent();
    }

    openNotifications() {
        return this.pageHeader1.$('div.page-header-icon-menus').$$('ux-page-header-icon-menu').get(0).$('div.page-header-icon-menu').
            $('.page-header-icon-menu-button').click();
    }

    confirmNotificationsAreDisplayed() {
        return $('.ux-page-header-icon-menu').$$('.ux-menu-item').count();
    }

    confirmActionsIconIsPresent() {
        return this.pageHeader1.$('div.page-header-icon-menus').$$('ux-page-header-icon-menu').get(1).$('div.page-header-icon-menu').
            $('.page-header-icon-menu-button').$('i.hpe-actions').isPresent();
    }

    openActions() {
        return this.pageHeader1.$('div.page-header-icon-menus').$$('ux-page-header-icon-menu').get(1).$('div.page-header-icon-menu').
            $('.page-header-icon-menu-button').click();
    }

    confirmActionsAreDisplayed() {
        return $('.ux-page-header-icon-menu').$$('.ux-menu-item').count();
    }

    async getSecondaryNavigation(): Promise<ElementFinder> {
        return await this.pageHeader2.$('.page-header-secondary');
    }

    async getClasses(target: ElementFinder): Promise<string[]> {
        return (await target.getAttribute('class') || '').split(' ');
    }

    async getSubheaderText(target: ElementFinder): Promise<string> {
        return await target.$('.page-header-subtitle').getAttribute('innerText');
    }
}

