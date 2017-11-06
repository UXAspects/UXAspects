import { browser, element, by, ElementFinder } from 'protractor';

export class TreeGridTestPageComponent {
        
    getPage(): void {
        browser.get('/tree-grid');
    }
    
    treegrid = element(by.id('treegrid'));
    tableBody = this.treegrid.$('table').$('tbody');
    selectedItems = element(by.id('selectedItems'));
    customizeExample = element(by.id('customizeExample')).$('div.col-md-12').$('accordion').$('div.panel-group').$('div.panel').$('div.accordion-toggle');
    panel = element(by.id('customizeExample')).$('div.col-md-12').$('accordion').$('div.panel-group').$('div.panel').$('div.panel-collapse');
    displayPanel = element(by.id('displayPanel'));
    selectRow = element(by.id('selectRow'));
    selectCheck = element(by.id('selectCheck'));
    selectChildren = element(by.id('selectChildren'));
    panelHeader = element(by.css('h3.modalheader'));
    panelContents = element(by.css('div.m-md.ng-scope')).$('div.ng-scope').$('ul').$$('li');

    getNumberOfRows() {
        return this.tableBody.$$('tr').count();
    }
    getRow(index: number) {
        return this.tableBody.$$('tr').get(index);
    }

    getColumnHeaderText(index: number) {
        return this.treegrid.$('table').$('thead').$('tr.table-header-dark').$$('th').get(index).$('span').getText();
    }

    confirmRowHasExpander(index: number) {
        return browser.isElementPresent(this.tableBody.$$('tr').get(index).$$('td').get(0).$('span.treegrid-expand').$('span.treegrid-expand-toggle'));
    }
    getTitleColumnIndentation(index: number) {
        return this.tableBody.$$('tr').get(index).$$('td').get(0).$('span.treegrid-indent');
    }
    getTitleColumnExpanderIcon(index: number) {
        return this.tableBody.$$('tr').get(index).$$('td').get(0).$('span.treegrid-expand').$('span.treegrid-expand-toggle').$('i.hpe-icon');
    }
    getTitleColumnCheckbox(index: number) {
        return this.tableBody.$$('tr').get(index).$$('td').get(0).$('span.treegrid-checkbox');
    }
    getTitleColumnObjectIcon(index: number) {
        return this.tableBody.$$('tr').get(index).$$('td').get(0).$('span.treegrid-icon').$('i.hpe-icon');
    }
    getTitleColumnValue(index: number) {
        return this.tableBody.$$('tr').get(index).$$('td').get(0).$('span.ng-binding').getText();
    }

    getDateColumnValue(index: number) {
        return this.tableBody.$$('tr').get(index).$$('td').get(1).$('span').getText();
    }

    getActionsColumnAction(index: number, actionIndex: number) {
        return this.tableBody.$$('tr').get(index).$$('td').get(2).$('div.item-actions').$('div.list-hover-actions').$$('a.list-hover-action').get(actionIndex);
    }
    getActionsColumnActionIcon(index: number, actionIndex: number) {
        return this.getActionsColumnAction(index, actionIndex).$('span.hpe-icon');
    }

    confirmSelectedItemsListIsEmpty() {
        return browser.isElementPresent(this.selectedItems.$('em'));
    }
    getSelectedItemsText() {
        return this.selectedItems.$$('span');
    }

    getDisplayPanelCheckbox() {
        return this.displayPanel.$('div.el-checkbox');
    }
    getSelectRowCheckbox() {
        return this.selectRow.$('div.el-checkbox');
    }
    getSelectCheckCheckbox() {
        return this.selectCheck.$('div.el-checkbox');
    }
    getSelectChildrenCheckbox() {
        return this.selectChildren.$('div.el-checkbox');
    }

}

