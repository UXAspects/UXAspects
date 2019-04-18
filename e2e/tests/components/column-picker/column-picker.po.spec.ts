import { $, $$, browser, ElementFinder } from 'protractor';

export class ColumnPickerPage {

    selected = $('#selected-list');
    deselected = $('#deselected-list');
    actions = $('.column-picker-actions-column');
    selectBtn = this.actions.$$('.btn').get(0);
    deselectBtn = this.actions.$$('.btn').get(1);
    selectAllBtn = this.actions.$$('.btn').get(2);
    deselectAllBtn = this.actions.$$('.btn').get(3);

    deselectedTitle = $$('.column-picker-stats').get(0);
    selectedTitle = $$('.column-picker-stats').get(1);

    deselectedList = $$('.column-picker-list').get(0);
    deselectedListItems = this.deselectedList.$$('.column-picker-list-item');
    selectedList = $$('.column-picker-list').get(1);
    selectedListItems = this.selectedList.$$('.column-picker-list-item');

    toggleCustomTitles = $('#toggle-custom-titles');

    async getPage(): Promise<void> {
        return browser.get('#/column-picker');
    }

    async getButtonDisabled(button: ElementFinder): Promise<boolean> {
        return await button.getAttribute('disabled') === 'true';
    }

    async getSelection(): Promise<string> {
        return await this.selected.getAttribute('innerText');
    }

    async getDeselection(): Promise<string> {
        return await this.deselected.getAttribute('innerText');
    }

    async getSelectedTitle(): Promise<string> {
        return await this.selectedTitle.getAttribute('innerText');
    }

    async getDeselectedTitle(): Promise<string> {
        return await this.deselectedTitle.getAttribute('innerText');
    }

    async getDeselectedColumn(index: number): Promise<ElementFinder> {
        return await this.deselectedListItems.get(index);
    }

    async getSelectedColumn(index: number): Promise<ElementFinder> {
        return await this.selectedListItems.get(index);
    }

    async isColumnLocked(index: number): Promise<boolean> {
        const column = await this.getSelectedColumn(index);
        const classes = await column.getAttribute('class');
        return classes.indexOf('column-picker-list-item-locked') !== -1;
    }

    async isColumnSelected(list: ColumnPickerList, index: number): Promise<boolean> {
        const column = await (list === ColumnPickerList.Selected ? this.getSelectedColumn(index) : this.getDeselectedColumn(index));
        const classes = await column.getAttribute('class');

        return classes.indexOf('ux-selection-selected') !== -1;
    }

    async selectColumn(list: ColumnPickerList, index: number): Promise<void> {
        const column: ElementFinder = await (list === ColumnPickerList.Selected ? this.getSelectedColumn(index) : this.getDeselectedColumn(index));
        return await column.click();
    }

    async getColumnCount(list: ColumnPickerList): Promise<number> {
        const columns = (list === ColumnPickerList.Selected ? this.selectedListItems : this.deselectedListItems);
        return await columns.count();
    }

}

export enum ColumnPickerList {
    Deselected,
    Selected
}
