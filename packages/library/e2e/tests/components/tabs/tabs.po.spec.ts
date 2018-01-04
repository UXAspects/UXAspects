import { browser, element, by, ElementFinder } from 'protractor';

export class TabsTestPageComponent {
        
    getPage(): void {
        browser.get('/tabs');
    }
    
    // Icon only
    tabSetIconOnly = element(by.id('tabSetIconOnly'));

    getIconOnlyTabHeader(index: number) {
        return this.tabSetIconOnly.$('ul').$$('li').get(index);
    }
    getIconOnlyTabHeaderIcon(index: number) {
        return this.getIconOnlyTabHeader(index).$('a').$('tab-heading').$('i.hpe-icon');
    }
    getIconOnlyTabContent(index: number) {
        return this.tabSetIconOnly.$('div.tab-content').$$('div.tab-pane').get(index);
    }
    
    // Text and icon
    tabSetTextAndIcon = element(by.id('tabSetTextAndIcon'));

    getTextAndIconTabHeader(index: number) {
        return this.tabSetTextAndIcon.$('ul').$$('li').get(index);
    }
    getTextAndIconTabHeaderIcon(index: number) {
        return this.getTextAndIconTabHeader(index).$('a').$('tab-heading').$('i.hpe-icon');
    }
    getTextAndIconTabHeaderText(index: number) {
        return this.getTextAndIconTabHeader(index).$('a').$('tab-heading').$('span.tab-title');
    }
    getTextAndIconTabContent(index: number) {
        return this.tabSetTextAndIcon.$('div.tab-content').$$('div.tab-pane').get(index);
    }

    // Text only
    tabSetTextOnly = element(by.id('tabSetTextOnly'));

    getTextOnlyTabHeader(index: number) {
        return this.tabSetTextOnly.$('ul').$$('li').get(index);
    }
    getTextOnlyTabHeaderText(index: number) {
        return this.getTextOnlyTabHeader(index).$('a').$('tab-heading').$('span.tab-title');
    }
    getTextOnlyTabContent(index: number) {
        return this.tabSetTextOnly.$('div.tab-content').$$('div.tab-pane').get(index);
    }

    // Alternative style
    tabSetAlternativeStyle = element(by.id('tabSetAlternativeStyle'));

    getAlternativeStyleTabHeader(index: number) {
        return this.tabSetAlternativeStyle.$('ul').$$('li').get(index);
    }
    getAlternativeStyleTabHeaderText(index: number) {
        return this.getAlternativeStyleTabHeader(index).$('a').$('tab-heading').$('span');
    }
    getAlternativeStyleTabContent(index: number) {
        return this.tabSetAlternativeStyle.$('div.tab-content').$$('div.tab-pane').get(index);
    }

    // Dynamic tabs
    tabSetDynamicTabs = element(by.id('tabSetDynamicTabs'));
    buttonGroup = element(by.id('buttonGroup'));
    dropdown = element(by.id('dropdown'));
    dropdownMenu = element(by.id('dropdownMenu'));
    
    getDynamicTabsTabHeader(index: number) {
        return this.tabSetDynamicTabs.$('ul').$$('li').get(index);
    }
    getDynamicTabsTabHeaderText(index: number) {
        return this.getDynamicTabsTabHeader(index).$('a').$('tab-heading').$('span.tab-title');
    }
    getDynamicTabsTabContent(index: number) {
        return this.tabSetDynamicTabs.$('div.tab-content').$$('div.tab-pane').get(index);
    }
    selectTabFromList(index: number) {
        this.buttonGroup.$('ul').$$('li').get(index).click();
    }
    getDropdownMenuItem(index: number) {
        return this.buttonGroup.$('ul').$$('li').get(1).$('a');
    }

}

