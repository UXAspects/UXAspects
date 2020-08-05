import { browser, Key } from 'protractor';
import { imageCompare } from '../common/image-compare';
import { ColumnPickerList, ColumnPickerPage } from './column-picker.po.spec';

describe('Column Picker Tests', () => {

    let page: ColumnPickerPage = new ColumnPickerPage();

    beforeEach(async () => {
        await page.getPage();
    });

    it('should have the correct initial state', async () => {
        expect(await page.getButtonDisabled(page.selectBtn)).toBe(true);
        expect(await page.getButtonDisabled(page.deselectBtn)).toBe(true);
        expect(await page.getButtonDisabled(page.selectAllBtn)).toBe(false);
        expect(await page.getButtonDisabled(page.deselectAllBtn)).toBe(false);

        expect(await page.getDeselectedTitle()).toBe('0 of 18 selected');
        expect(await page.getSelectedTitle()).toBe('6 columns added');

        expect(await page.getColumnCount(ColumnPickerList.Deselected)).toBe(18);
        expect(await page.getColumnCount(ColumnPickerList.Selected)).toBe(6);

        expect(await page.getSelection()).toBe('[ "Type", "Date", "Requested by", "Status", "Completion" ]');
        expect(await page.getDeselection()).toBe('[ { "group": "Metadata", "name": "Author" }, { "group": "Metadata", "name": "Category" }, { "group": "Metadata", "name": "Date Created" }, { "group": "Metadata", "name": "Date Modified" }, { "group": "Metadata", "name": "Department" }, "Document ID", "Flag", "From", "Icon", "Importance", "Location", "Location ID", "Message", { "group": "Metadata", "name": "Organization" }, "Time", "Time Created", "Time Modified", "Work Completed" ]');

        expect(await imageCompare('column-picker-initial')).toEqual(0);
    });

    it('should lock the ID column', async () => {
        expect(await page.isColumnLocked(0)).toBe(true);
        expect(await page.isColumnLocked(1)).toBe(false);
        expect(await imageCompare('column-picker-locked')).toEqual(0);
    });

    it('should allow a group to navigate, close and expand using mouse and keyboard', async () => {
        // close the group using mouse click
        const firstGroup = await page.deselectedListGroupBtns.get(0);
        await firstGroup.click();
        expect(await page.getColumnCount(ColumnPickerList.Deselected)).toBe(12);
        // expand the group using mouse click
        await firstGroup.click();
        expect(await page.getColumnCount(ColumnPickerList.Deselected)).toBe(18);

        // press down arrow to focus the first group child
        await browser.actions().sendKeys(Key.ARROW_DOWN).perform();
        const deselectedColumn1 = await page.getDeselectedColumn(0);
        const deselectedColumn2 = await page.getDeselectedColumn(1);
        expect(await page.hasFocus(deselectedColumn1)).toBe(true);

        // press down arrow to focus the second group child
        await browser.actions().sendKeys(Key.ARROW_DOWN).perform();
        expect(await page.hasFocus(deselectedColumn2)).toBe(true);

        // press up arrow to jump back up to the first group child
        await browser.actions().sendKeys(Key.ARROW_UP).perform();
        expect(await page.hasFocus(deselectedColumn1)).toBe(true);

        // press up arrow to jump back up to the group itself
        await browser.actions().sendKeys(Key.ARROW_UP).perform();
        expect(await page.hasFocus(page.deselectedListGroupBtns.get(0))).toBe(true);

        // press enter key to close the group
        await browser.actions().sendKeys(Key.ENTER).perform();
        expect(await page.getColumnCount(ColumnPickerList.Deselected)).toBe(12);

        // press enter key to expand the group
        await browser.actions().sendKeys(Key.ENTER).perform();
        expect(await page.getColumnCount(ColumnPickerList.Deselected)).toBe(18);
    });

    it('should allow selection of deselected columns', async () => {
        expect(await page.isColumnSelected(ColumnPickerList.Deselected, 0)).toBe(false);
        await page.selectColumn(ColumnPickerList.Deselected, 0);
        expect(await page.isColumnSelected(ColumnPickerList.Deselected, 0)).toBe(true);
        expect(await imageCompare('column-picker-selection-1')).toEqual(0);
    });

    it('should allow selection of selected columns', async () => {
        expect(await page.isColumnSelected(ColumnPickerList.Selected, 1)).toBe(false);
        await page.selectColumn(ColumnPickerList.Selected, 1);
        expect(await page.isColumnSelected(ColumnPickerList.Selected, 1)).toBe(true);
        expect(await imageCompare('column-picker-selection-2')).toEqual(0);
    });

    it('should not allow selection of locked selected columns', async () => {
        expect(await page.isColumnSelected(ColumnPickerList.Selected, 0)).toBe(false);
        await page.selectColumn(ColumnPickerList.Selected, 0);
        expect(await page.isColumnSelected(ColumnPickerList.Selected, 0)).toBe(false);
        expect(await imageCompare('column-picker-prevent-selection')).toEqual(0);
    });

    it('should enable the move button when a deselected column is selected', async () => {
        await page.selectColumn(ColumnPickerList.Deselected, 0);
        expect(await page.getButtonDisabled(page.selectBtn)).toBe(false);
        expect(await page.getButtonDisabled(page.deselectBtn)).toBe(true);
        expect(await imageCompare('column-picker-button-enable-1')).toEqual(0);
    });

    it('should enable the move button when a selected column is selected', async () => {
        await page.selectColumn(ColumnPickerList.Selected, 1);
        expect(await page.getButtonDisabled(page.selectBtn)).toBe(true);
        expect(await page.getButtonDisabled(page.deselectBtn)).toBe(false);
        expect(await imageCompare('column-picker-button-enable-2')).toEqual(0);
    });

    it('should allow moving a deselected column', async () => {
        await page.selectColumn(ColumnPickerList.Deselected, 0);
        await page.selectBtn.click();
        expect(await page.getColumnCount(ColumnPickerList.Deselected)).toBe(17);
        expect(await page.getColumnCount(ColumnPickerList.Selected)).toBe(7);
        expect(await page.getSelection()).toBe('[ "Type", "Date", "Requested by", "Status", "Completion", { "group": "Metadata", "name": "Author" } ]');
    });

    it('should allow moving a selected column', async () => {
        expect(await page.getColumnCount(ColumnPickerList.Deselected)).toBe(18);
        expect(await page.getColumnCount(ColumnPickerList.Selected)).toBe(6);
        await page.selectColumn(ColumnPickerList.Selected, 1);
        await page.deselectBtn.click();
        expect(await page.getColumnCount(ColumnPickerList.Deselected)).toBe(19);
        expect(await page.getColumnCount(ColumnPickerList.Selected)).toBe(5);
        expect(await page.getSelection()).toBe('[ "Date", "Requested by", "Status", "Completion" ]');
    });

    it('should allow moving all deselected columns', async () => {
        expect(await page.getColumnCount(ColumnPickerList.Deselected)).toBe(18);
        expect(await page.getColumnCount(ColumnPickerList.Selected)).toBe(6);
        await page.selectAllBtn.click();
        expect(await page.getColumnCount(ColumnPickerList.Deselected)).toBe(0);
        expect(await page.getColumnCount(ColumnPickerList.Selected)).toBe(24);
        expect(await page.getSelection()).toBe('[ "Type", "Date", "Requested by", "Status", "Completion", { "group": "Metadata", "name": "Author" }, { "group": "Metadata", "name": "Category" }, { "group": "Metadata", "name": "Date Created" }, { "group": "Metadata", "name": "Date Modified" }, { "group": "Metadata", "name": "Department" }, "Document ID", "Flag", "From", "Icon", "Importance", "Location", "Location ID", "Message", { "group": "Metadata", "name": "Organization" }, "Time", "Time Created", "Time Modified", "Work Completed" ]');
    });

    it('should allow moving all selected columns', async () => {
        expect(await page.getColumnCount(ColumnPickerList.Deselected)).toBe(18);
        expect(await page.getColumnCount(ColumnPickerList.Selected)).toBe(6);
        await page.deselectAllBtn.click();
        expect(await page.getColumnCount(ColumnPickerList.Deselected)).toBe(23);
        expect(await page.getColumnCount(ColumnPickerList.Selected)).toBe(1);
        expect(await page.getSelection()).toBe('[]');
    });

    it('should allow reordering', async () => {
        const column = await page.getSelectedColumn(2);
        await browser.actions().click(column).sendKeys(Key.ALT, Key.ARROW_UP).perform();
        expect(await page.getSelection()).toBe('[ "Date", "Type", "Requested by", "Status", "Completion" ]');
    });

    it('should allow custom title templates', async () => {
        await page.toggleCustomTitles.click();
        expect(await page.getDeselectedTitle()).toBe('Custom Title');
        expect(await page.getSelectedTitle()).toBe('Custom Title');
    });
});
