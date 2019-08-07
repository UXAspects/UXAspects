import { browser, by, element, ElementFinder } from 'protractor';

export class InfiniteScrollPage {

    getPage(): void {
        browser.get('#/infinite-scroll');
    }

    filter = element(by.id('filter'));
    employees = element(by.id('employees'));
    loadMoreButton = element(by.id('button1'));
    loading = element(by.id('loading'));
    loadOnScrollCheckbox = element(by.id('checkbox1'));
    pageSize = element(by.id('numberPicker'));


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

    confirmPageSizeButtonIsDisabled(direction: string) {
        if (direction === 'down') {
            return this.confirmClassExists(this.pageSize.$('div.number-picker-controls').$('div.number-picker-control-down'),
                'disabled');
        } else {
            return this.confirmClassExists(this.pageSize.$('div.number-picker-controls').$('div.number-picker-control-up'),
                'disabled');
        }
    }

    confirmLoadMoreIsVisible() {
        return this.loadMoreButton.isPresent();
    }

    confirmValueIsInvalid() {
        return this.confirmClassExists(this.pageSize, 'has-error');
    }


    // get item
    getEmployee(index: number) {
        return this.employees.$$('li.employee-item').get(index);
    }

    getCheckbox() {
        return this.loadOnScrollCheckbox.$('.ux-checkbox');
    }

    getPageSize() {
        return this.pageSize.$('input.form-control');
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

    clickOnLoadOnScroll() {
        this.getCheckbox().click();
    }

    clickOnPageSize() {
        this.getPageSize().click();
    }

    clickOnIncrementPageSize() {
        this.pageSize.$('div.number-picker-controls').$('div.number-picker-control-up').click();
    }

    clickOnDecrementPageSize() {
        this.pageSize.$('div.number-picker-controls').$('div.number-picker-control-down').click();
    }


    // other
    getNumberOfEmployees() {
        return this.employees.$$('li.employee-item').count();
    }

    hoverOverLastEmployee() {
        browser.actions().mouseMove(this.employees.$$('li.employee-item').last()).perform();
    }
}