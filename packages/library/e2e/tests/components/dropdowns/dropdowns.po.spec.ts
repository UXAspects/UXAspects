import { browser, element, by , ElementFinder, protractor } from 'protractor';

export class DropdownsPage {
        
    getPage(): void {
        browser.get('#/dropdowns');
    }

    group = element(by.id('group'));
    button1 = element(by.id('button1'));
    menu1 = element(by.id('dropdown-menu1'));
    menu2 = element(by.id('dropdown-menu2'));
    menu3 = element(by.id('dropdown-menu3'));
    listItems = element(by.id('list-items'));

    confirmButtonClassExists(item: ElementFinder, soughtClass: string) {
        return item.getAttribute('class').then(function(classes: string) {
            var allClasses = classes.split(' ');
            if (allClasses.indexOf(soughtClass) > -1) {
                return true;
            } else {
                return false;
            }
        });
    }
    
    confirmButtonIsExpanded(item: ElementFinder) {
        return this.confirmButtonClassExists(item, 'open');
    }

    getMenu1Item(index: number) {
        return browser.driver.wait(() => {
            var EC = protractor.ExpectedConditions;
            var elem: ElementFinder;
            elem = this.menu1.$$(this.menu1.locator().value + ' > li[role="menuitem"]').get(index);
            browser.wait(EC.presenceOf(elem));
            return elem;
        });
    }
    getMenu2Item(index: number) {
        return browser.driver.wait(() => {
            var EC = protractor.ExpectedConditions;
            var elem: ElementFinder;
            elem = this.menu2.$$('li[role="menuitem"]').get(index);
            browser.wait(EC.presenceOf(elem));
            return elem;
        });
    }
    getMenu3Item(index: number) {
        return browser.driver.wait(() => {
            var EC = protractor.ExpectedConditions;
            var elem: ElementFinder;
            elem = this.menu3.$$('li[role="menuitem"]').get(index);
            browser.wait(EC.presenceOf(elem));
            return elem;
        });
    }

    getMenu1Text(index: number) {
        return browser.driver.wait(() => {
            var EC = protractor.ExpectedConditions;
            var elem: ElementFinder;
            elem = this.menu1.$$(this.menu1.locator().value + ' > li[role="menuitem"]').get(index);
            browser.wait(EC.presenceOf(elem));
            return elem.$$(elem.locator().value + ' > a.dropdown-menu-item').get(0).$('span.dropdown-menu-text').getText();
        });
    }

    getMenu2Text(index: number) {
        return this.menu2.$$('li[role="menuitem"]').get(index).$('a.dropdown-menu-item').$('span.dropdown-menu-text').getText();
    }

    getMenu3Text(index: number) {
        return this.menu3.$$(this.menu3.locator().value + ' > div').get(1).$('div.case-items').$('ul').
               $$('li[role="menuitem"]').get(index).$('a').getText();
    }

    hoverMenu1Item(index: number) {
        this.getMenu1Item(index).then(function(elem: ElementFinder) {
            browser.actions().mouseMove(elem).perform();
        });
    }

    clickMenu1Item(index: number) {
        this.getMenu1Item(index).then(function(elem: ElementFinder) {
            elem.click();
        });
    }

    clickMenu2Item(index: number) {
        this.getMenu2Item(index).then(function(elem: ElementFinder) {
            elem.click();
        });
    }

    clickMenu3Item(index: number) {
        this.getMenu3Item(index).then(function(elem: ElementFinder) {
            elem.click();
        });
    }

    getTextBox(index: number) {
        return this.menu1.$$('li.dropdown-submenu').get(index).$('div.case-dropdown').$('div.case-filter').$('div.inner-addon').
               $('input.form-control');
    }

    clickTextBox(index: number) {
        this.menu1.$$('li.dropdown-submenu').get(index).$('div.case-dropdown').$('div.case-filter').$('div.inner-addon').
               $('input.form-control').click();
    }

    getListContent(index: number) {
        return this.listItems.$$('li[role="menuitem"]').get(index).$('a').getText();
    }
}
