import { browser, element, by, ElementFinder } from 'protractor';

export class StackedTabsTestPageComponent {
        
    getPage(): void {
        browser.get('#/stacked-tabs');
    }
    
    // Icon only (tabs - left)
    tabSetIconOnlyLeft = element(by.id('tabSetIconOnlyLeft'));

    getIconOnlyLeftTabHeader(index: number) {
        return this.tabSetIconOnlyLeft.$('ul').$$('li').get(index);
    }
    getIconOnlyLeftTabHeaderIcon(index: number) {
        return this.getIconOnlyLeftTabHeader(index).$('a').$('tab-heading').$('i.hpe-icon');
    }
    getIconOnlyLeftTabContent(index: number) {
        return this.tabSetIconOnlyLeft.$('div.tab-content').$$('div.tab-pane').get(index);
    }
    
    // Icon only (tabs - right)
    tabSetIconOnlyRight = element(by.id('tabSetIconOnlyRight'));

    getIconOnlyRightTabHeader(index: number) {
        return this.tabSetIconOnlyRight.$('ul').$$('li').get(index);
    }
    getIconOnlyRightTabHeaderIcon(index: number) {
        return this.getIconOnlyRightTabHeader(index).$('a').$('tab-heading').$('i.hpe-icon');
    }
    getIconOnlyRightTabContent(index: number) {
        return this.tabSetIconOnlyRight.$('div.tab-content').$$('div.tab-pane').get(index);
    }
    
}

