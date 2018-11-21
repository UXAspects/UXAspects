import { browser, by, element, ElementFinder } from 'protractor';

export class VirtualScrollPage {

    container = element(by.id('container'));
    loadingText = element(by.id('loading-text'));
    loadMoreButton = element(by.id('load-more-button'));
    loadOnScrollCheckbox = element(by.id('load-on-scroll-checkbox'));

    getPage(): void {
        browser.get('#/virtual-scroll');
    }

    confirmClassExists(elem: ElementFinder, soughtClass: string) {
        return elem.getAttribute('class').then(function (classes: string) {
            var allClasses = classes.split(' ');
            if (allClasses.indexOf(soughtClass) > -1) {
                return true;
            } else {
                return false;
            }
        });
    }

    confirmLoadOnScrollIsChecked() {
        return this.confirmClassExists(this.getCheckbox(), 'ux-checkbox-checked');
    }

    confirmLoadMoreIsVisible() {
        return this.loadMoreButton.isPresent();
    }

    // get item
    getEmployee(index: number) {
        return this.container.$('div.virtual-scroll-content').$$('div.virtual-cell').get(index);
    }

    getLastVisibleEmployee() {
        return this.container.$('div.virtual-scroll-content').$$('div.virtual-cell').last();
    }

    getCheckbox() {
        return this.loadOnScrollCheckbox.$('.ux-checkbox');
    }

    // get text
    getEmployeeText(index: number) {
        return this.getEmployee(index).$('div.employee-details').$$('div').first().$('span.employee-name').getText();
    }

    getDepartmentText(index: number) {
        return this.getEmployee(index).$('div.employee-details').$$('div').first().$('span.employee-department').getText();
    }

    getEmailText(index: number) {
        return this.getEmployee(index).$('div.employee-details').$$('div').last().$('span.employee-email').getText();
    }

    getEmployeeIDNumber(index: number) {
        return this.getEmployee(index).$('div.employee-id').getText();
    }

    getLastVisibleEmployeeIDNumber() {
        return this.getLastVisibleEmployee().$('div.employee-id').getText();
    }

    clickOnLoadOnScroll() {
        this.getCheckbox().click();
    }

    // scrollbar
    scrollToEnd() {
        var scrollbar = this.container;
        browser.executeScript('arguments[0].scrollTop = 2000000', scrollbar);
    }
}