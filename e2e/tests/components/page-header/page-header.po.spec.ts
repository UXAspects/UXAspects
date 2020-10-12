import { $, browser, by, element, ElementFinder } from 'protractor';

export class PageHeaderPage {

    async getPage(): Promise<void> {
        await browser.get('#/page-header');
    }

    pageHeader1 = $('#pageHeader1');
    pageHeader2 = $('#pageHeader2');
    selected = $('#selected');
    toggleButton = $('#button1');
    breadcrumbs = this.pageHeader1.$$('.breadcrumb a');

    alignLeftButton = $('#align-left');
    alignCenterButton = $('#align-center');
    alignRightButton = $('#align-right');
    autoselectButton = $('#autoselect');

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
        return this.confirmClassExists(element(by.id('pageHeader1')), 'page-header-condensed');
    }

    async toggleTheHeader() {
        await this.toggleButton.click();
    }

    async getABreadcrumb(index: number): Promise<string> {
        return element(by.id('pageHeader1')).$('ux-breadcrumbs').$$('li').get(index).getText();
    }

    async confirmApplicationLogoIsPresent() {
        return element(by.id('pageHeader1')).$('div.page-header-navigation').$('ux-page-header-horizontal-navigation').
            $$('ux-page-header-horizontal-navigation-item').get(0).$('.horizontal-navigation-button').
            $('ux-icon').isPresent();
    }

    async getApplicationLogoText(): Promise<string> {
        return element(by.id('pageHeader1')).$('div.page-header-navigation').$('ux-page-header-horizontal-navigation').
            $$('ux-page-header-horizontal-navigation-item').get(0).$('.horizontal-navigation-button').
            $('span.navigation-item-label').getText();
    }

    confirmDropdownIsPresent() {
        return element(by.id('pageHeader1')).$('div.page-header-navigation').$('ux-page-header-horizontal-navigation').
            $$('ux-page-header-horizontal-navigation-item').get(1).$('.horizontal-navigation-button').
            $('ux-icon').isPresent();
    }

    openDropdown() {
        return element(by.id('pageHeader1')).$('div.page-header-navigation').$('ux-page-header-horizontal-navigation').
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
        return element(by.id('pageHeader1')).$('div.page-header-icon-menus').$$('ux-page-header-icon-menu').get(0).$('div.page-header-icon-menu').
            $('.page-header-icon-menu-button').$('ux-icon').isPresent();
    }

    openNotifications() {
        return element(by.id('pageHeader1')).$('div.page-header-icon-menus').$$('ux-page-header-icon-menu').get(0).$('div.page-header-icon-menu').
            $('.page-header-icon-menu-button').click();
    }

    confirmNotificationsAreDisplayed() {
        return $('.ux-page-header-icon-menu').$$('.ux-menu-item').count();
    }

    confirmActionsIconIsPresent() {
        return element(by.id('pageHeader1')).$('div.page-header-icon-menus').$$('ux-page-header-icon-menu').get(1).$('div.page-header-icon-menu').
            $('.page-header-icon-menu-button').$('ux-icon').isPresent();
    }

    openActions() {
        return element(by.id('pageHeader1')).$('div.page-header-icon-menus').$$('ux-page-header-icon-menu').get(1).$('div.page-header-icon-menu').
            $('.page-header-icon-menu-button').click();
    }

    confirmActionsAreDisplayed() {
        return $('.ux-page-header-icon-menu').$$('.ux-menu-item').count();
    }

    async getSecondaryNavigation(): Promise<ElementFinder> {
        return await element(by.id('pageHeader2')).$('.ux-page-header-secondary .page-header-navigation');
    }

    async getClasses(target: ElementFinder): Promise<string[]> {
        return (await target.getAttribute('class') || '').split(' ');
    }

    async getSubheaderText(target: ElementFinder): Promise<string> {
        return await target.$('.page-header-subtitle').getAttribute('innerText');
    }

    async getBreadcrumbPageTextContent(): Promise<string> {
        return $('.breadcrumb-content').getText();
    }

    async clickBreadcrumb(index: number): Promise<void> {
        return this.breadcrumbs.get(index).click();
    }
}

