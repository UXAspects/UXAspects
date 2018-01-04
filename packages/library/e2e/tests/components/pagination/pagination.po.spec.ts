import { browser, element, by , ElementFinder} from 'protractor';

export class PaginationPage {
        
    getPage(): void {
        browser.get('pagination');
    }

    pagination = element(by.id('pagination'));
    text = element(by.id('text'));

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
   
    confirmButtonIsActive(item: ElementFinder) {
        return this.confirmButtonClassExists(item, 'active');
    }
    
    confirmButtonIsDisabled(item: ElementFinder) {
        return this.confirmButtonClassExists(item, 'disabled');
    }
    
    getButton(index: number) {
        return this.pagination.$('ul.pagination').$$('li.page-item').get(index);
    }

    clickButton(index: number) {
        this.pagination.$('ul.pagination').$$('li.page-item').get(index).$('a').click();
    }
}