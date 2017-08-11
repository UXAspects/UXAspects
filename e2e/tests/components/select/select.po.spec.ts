import { browser, element, by , ElementFinder, protractor } from 'protractor';

export namespace SelectPage {

    export const numberOfCountries: number = 249;
    export const scrollingTimeout: number = 5000;
    
    export class SelectPage {
            
        getPage(): void {
            browser.get('select');
        }
        
        dropdown = element(by.id('dropdown'));
        selectedLocation = element(by.id('selectedLocation'));
        panel = element(by.id('panel'));
        radioOptions = element(by.id('radio1'));
        radioDirection = element(by.id('radio2'));
        checkboxMulti = element(by.id('checkbox1'));
        checkboxDisabled = element(by.id('checkbox2'));
        checkboxAllowNull = element(by.id('checkbox3'));
        checkboxPaging = element(by.id('checkbox4'));
        placeholder = element(by.id('placeholder'));
        pageSize = element(by.id('pageSize'));
        
        
        // confirm & check
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
        
        confirmDropdownIsExpanded() {
            return this.dropdown.$('div.inner-addon').$('ux-typeahead.open').isPresent();
        }
        
        confirmPanelIsExpanded() {
            return this.confirmClassExists(this.panel, 'panel-open');
        }
        
        // use Truthy for "strings" button and Falsy for "objects" button
        checkSelectedOptionsButton() {
            return this.radioOptions.$('ux-radio-button[option="strings"]').$('div.ux-checked').isPresent();
        }
        
        // use Truthy for "down" button and Falsy for "up" button
        checkSelectedDirectionButton() {
            return this.radioDirection.$('ux-radio-button[option="down"]').$('div.ux-checked').isPresent();
        }
        
        confirmIsChecked(checkbox: ElementFinder) {
            return checkbox.$('div.ux-checked').isPresent();
        }
        
        confirmCountryIsHighlighted(allowMultiple: boolean, index: number) {
            return this.confirmClassExists(this.getCountry(allowMultiple, index), 'highlighted');
        }
        
        confirmCountryIsDisabled(allowMultiple: boolean, index: number) {
            return this.confirmClassExists(this.getCountry(allowMultiple, index), 'disabled');
        }
        
        confirmAllowNullIsDisabled() {
            return this.checkboxAllowNull.$('div.ux-disabled').isPresent();
        }
        
        confirmPageSizeIsDisabled() {
            return this.pageSize.$('input[disabled]').isPresent();
        }    

        confirmPageSizeButtonIsDisabled(direction: string) {
            if (direction === 'down') {
                return this.confirmClassExists(this.pageSize.$('div.number-picker-controls').$$('div').get(0), 'disabled');
            } else {
                return this.confirmClassExists(this.pageSize.$('div.number-picker-controls').$$('div').get(1), 'disabled');
            }
        }
        
        
        // get item
        getDropdown(allowMultiple: boolean) {
            if (allowMultiple) {
                return this.dropdown.$('ux-tag-input').$$(this.dropdown.$('ux-tag-input').locator().value + ' > ol').get(0).
                       $('li.ux-tag-input').$('input.ux-tag-input');
            } else {
                return this.dropdown.$('div.inner-addon').$('input.form-control');
            }
        }
        
        getCountry(allowMultiple: boolean, index: number) {
            if (allowMultiple) {
                return this.dropdown.$('ux-tag-input.focus').$('ux-typeahead.open').$('div.ux-typeahead-options').
                       $('ol').$$('li').get(index);
            } else {     
                return this.dropdown.$('div.inner-addon').$('ux-typeahead').$('div.ux-typeahead-options').$('ol').$$('li').get(index);
            }
        }
        
        getLastCountry(allowMultiple: boolean) {
            if (allowMultiple) {
                return this.dropdown.$('ux-tag-input.focus').$('ux-typeahead.open').$('div.ux-typeahead-options').
                       $('ol').$$('li').last();
            } else {
                return this.dropdown.$('div.inner-addon').$('ux-typeahead').$('div.ux-typeahead-options').$('ol').$$('li').last();
            }
        }
        
        getTag(index: number) {
            return this.dropdown.$('ux-tag-input').$$(this.dropdown.$('ux-tag-input').locator().value + ' > ol').get(0).
                   $$('li').get(index);
        }
        
        getPlaceholder() {
            return this.placeholder;
        }
        
        getPageSize() {
            return this.pageSize.$('input.form-control');
        }
        
        
        // get text
        getDropdownPlaceholderText(allowMultiple: boolean) {
            return this.getDropdown(allowMultiple).getAttribute('placeholder');
        }
        
        getCountryText(allowMultiple: boolean, index: number) {
            return this.getCountry(allowMultiple, index).$('span.ux-typeahead-option').getText();
        }
        
        getFilterText(index: number) {
            return this.getCountry(false, index).$('span.ux-typeahead-option').$('span.ux-filter-match').getText();
        }
        
        getSelectedLocationText() {
            return this.selectedLocation.$('code').getText();
        }    
        
        
        // click
        clickOnDropdown(allowMultiple: boolean) {
            this.getDropdown(allowMultiple).click();
        }
        
        clickOnCountry(allowMultiple: boolean, index: number) {
            this.getCountry(allowMultiple, index).click();
        }
        
        clickOnPanel() {
            this.panel.$('div.panel').$('div.panel-heading').$('div.panel-title').$('div.accordion-toggle').$('div').click();
        }
        
        clickOnStrings() {
            this.radioOptions.$('ux-radio-button[option="strings"]').$('div.ux-radio-button').click();
        }
        
        clickOnObjects() {
            this.radioOptions.$('ux-radio-button[option="objects"]').$('div.ux-radio-button').click();
        }
        
        clickOnCheckbox(checkbox: ElementFinder) {
            checkbox.$('div.ux-checkbox').click();
        }
        
        clickOnDropDirectionDown() {
            this.radioDirection.$('ux-radio-button[option="down"]').$('div.ux-radio-button').click();
        }
        
        clickOnDropDirectionUp() {
            this.radioDirection.$('ux-radio-button[option="up"]').$('div.ux-radio-button').click();
        }
        
        clickOnPlaceholder() {
            this.getPlaceholder().click();
        }
        
        clickOnPageSize() {
            this.getPageSize().click();
        }
        
        clickOnIncrementPageSize() {
            this.pageSize.$('div.number-picker-controls').$('div.number-picker-control-up').$('span.hpe-up').click();
        }
        
        clickOnDecrementPageSize() {
            this.pageSize.$('div.number-picker-controls').$('div.number-picker-control-down').$('span.hpe-down').click();
        }
        
        clickOnTag(index: number) {
            this.getTag(index).click();
        }
        
        removeCountry(index: number) {
            this.getTag(index).$('button.ux-tag-remove').$('i.hpe-close').click();
        }
        
        
        // other
        hoverOverCountry(allowMultiple: boolean, index: number) {
            browser.actions().mouseMove(this.getCountry(allowMultiple, index)).perform();
        }
        
        hoverOverLastCountry(allowMultiple: boolean) {
            if (allowMultiple) {
                browser.actions().mouseMove(this.dropdown.$('ux-tag-input.focus').$('ux-typeahead.open').$('div.ux-typeahead-options').
                        $('ol').$$('li').last()).perform();
            } else {
                browser.actions().mouseMove(this.dropdown.$('div.inner-addon').$('ux-typeahead').$('div.ux-typeahead-options').
                        $('ol').$$('li').last()).perform();
            }
        }

        getNumberOfCountries(allowMultiple: boolean) {
            if (allowMultiple) {
                return this.dropdown.$('ux-tag-input.focus').$('ux-typeahead.open').$('div.ux-typeahead-options').
                       $('ol').$$('li').count();
            } else {
                return this.dropdown.$('div.inner-addon').$('ux-typeahead').$('div.ux-typeahead-options').
                       $$(this.dropdown.$('div.inner-addon').$('ux-typeahead').
                       $('div.ux-typeahead-options').locator().value + ' > ol').get(0).$$('li').count();
            }
        }
        
        calculateNewNumberOfCountries(allowMultiple: boolean, pageSize: number) {
            return this.getNumberOfCountries(allowMultiple).then(function(count) {
                if (count > (numberOfCountries - pageSize)) { // makes sure number can't exceed 249
                    return numberOfCountries;
                } else {
                    return count + pageSize;
                }
            });
        }    

        waitForLoadingToFinish() {
            var EC = protractor.ExpectedConditions;
            var elem: ElementFinder;
            elem = this.dropdown.$('ux-tag-input.focus').$('ux-typeahead.open').$('div.ux-typeahead-options').
                   $('div').$('div.ux-typeahead-loading');
            return browser.wait(EC.invisibilityOf(elem), scrollingTimeout).then(function() {
                return true;
            }, function() {
                return false;
            });
        }    

        waitForLoadingAfterClickToFinish(allowMultiple: boolean) {
            if (allowMultiple) {
                browser.actions().click(this.dropdown.$('ux-tag-input').$$(this.dropdown.$('ux-tag-input').
                        locator().value + ' > ol').get(0). $('li.ux-tag-input').$('input.ux-tag-input')).perform();
            } else {
                browser.actions().click(this.dropdown.$('div.inner-addon').$('input.form-control')).perform();
            }
            return this.waitForLoadingToFinish();
        }    

        waitForLoadingAfterHoverToFinish(allowMultiple: boolean) {
            if (allowMultiple) {
                browser.actions().mouseMove(this.dropdown.$('ux-tag-input.focus').$('ux-typeahead.open').
                        $('div.ux-typeahead-options').$('ol').$$('li').last()).perform();
            } else {
                browser.actions().mouseMove(this.dropdown.$('div.inner-addon').$('ux-typeahead').$('div.ux-typeahead-options').
                        $('ol').$$('li').last()).perform();
            }
            return this.waitForLoadingToFinish();
        }
    }
}