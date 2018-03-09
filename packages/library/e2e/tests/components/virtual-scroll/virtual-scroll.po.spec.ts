import { browser, element, by , ElementFinder } from 'protractor';

export class VirtualScrollPage {
        
    getPage(): void {
        browser.get('#/virtual-scroll');
    }

    container = element(by.id('container'));
    loadingText = element(by.id('loading-text'));
    loadMoreButton = element(by.id('load-more-button'));
    panel = element(by.id('panel'));
    loadOnScrollCheckbox = element(by.id('load-on-scroll-checkbox'));
    

    confirmClassExists(elem: ElementFinder, soughtClass: string) {
        return elem.getAttribute('class').then(function(classes: string) {
            var allClasses = classes.split(' ');
            if (allClasses.indexOf(soughtClass) > -1) {
                return true;
            } else {
                return false;
            }
        });
    }
    
    confirmCustomizeExamplePanelIsExpanded() {
        return this.confirmClassExists(this.panel, 'panel-open');
    }
    
    confirmLoadOnScrollIsChecked() {
        return this.confirmClassExists(this.getCheckbox(), 'ux-checked');
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
    
    getPanel() {
        return this.panel.$('div.panel').$('div.panel-heading').$('div.panel-title').$('div.accordion-toggle').$('div');
    }
    
    getCheckbox() {
        return this.loadOnScrollCheckbox.$('div.ux-checkbox');
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

    
    // click
    clickOnCustomizeExamplePanel() {
        this.getPanel().click();
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