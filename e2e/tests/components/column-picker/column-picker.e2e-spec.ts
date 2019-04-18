import { browser, Key } from 'protractor';
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

        expect(await page.getSelection()).toBe('[ "Type", "Date", "Requested by", "Status", "Completion" ]');
        expect(await page.getDeselection()).toBe('[ "Author", "Category", "Date Created", "Date Modified", "Department", "Document ID", "Flag", "From", "Icon", "Importance", "Location", "Location ID", "Message", "Organization", "Time", "Time Created", "Time Modified", "Work Completed" ]');
    });

    it('should lock the ID column', async () => {
        expect(await page.isColumnLocked(0)).toBe(true);
        expect(await page.isColumnLocked(1)).toBe(false);
    });

    it('should allow selection of deselected columns', async () => {
        expect(await page.isColumnSelected(ColumnPickerList.Deselected, 0)).toBe(false);
        await page.selectColumn(ColumnPickerList.Deselected, 0);
        expect(await page.isColumnSelected(ColumnPickerList.Deselected, 0)).toBe(true);
    });

    it('should allow selection of selected columns', async () => {
        expect(await page.isColumnSelected(ColumnPickerList.Selected, 1)).toBe(false);
        await page.selectColumn(ColumnPickerList.Selected, 1);
        expect(await page.isColumnSelected(ColumnPickerList.Selected, 1)).toBe(true);
    });

    it('should not allow selection of locked selected columns', async () => {
        expect(await page.isColumnSelected(ColumnPickerList.Selected, 0)).toBe(false);
        await page.selectColumn(ColumnPickerList.Selected, 0);
        expect(await page.isColumnSelected(ColumnPickerList.Selected, 0)).toBe(false);
    });

    it('should enable the move button when a deselected column is selected', async () => {
        await page.selectColumn(ColumnPickerList.Deselected, 0);
        expect(await page.getButtonDisabled(page.selectBtn)).toBe(false);
        expect(await page.getButtonDisabled(page.deselectBtn)).toBe(true);
    });

    it('should enable the move button when a selected column is selected', async () => {
        await page.selectColumn(ColumnPickerList.Selected, 1);
        expect(await page.getButtonDisabled(page.selectBtn)).toBe(true);
        expect(await page.getButtonDisabled(page.deselectBtn)).toBe(false);
    });

    it('should allow moving a deselected column', async () => {
        expect(await page.getColumnCount(ColumnPickerList.Deselected)).toBe(18);
        expect(await page.getColumnCount(ColumnPickerList.Selected)).toBe(6);
        await page.selectColumn(ColumnPickerList.Deselected, 0);
        await page.selectBtn.click();
        expect(await page.getColumnCount(ColumnPickerList.Deselected)).toBe(17);
        expect(await page.getColumnCount(ColumnPickerList.Selected)).toBe(7);
        expect(await page.getDeselection()).toBe('[ "Category", "Date Created", "Date Modified", "Department", "Document ID", "Flag", "From", "Icon", "Importance", "Location", "Location ID", "Message", "Organization", "Time", "Time Created", "Time Modified", "Work Completed" ]');
        expect(await page.getSelection()).toBe('[ "Type", "Date", "Requested by", "Status", "Completion", "Author" ]');
    });

    it('should allow moving a selected column', async () => {
        expect(await page.getColumnCount(ColumnPickerList.Deselected)).toBe(18);
        expect(await page.getColumnCount(ColumnPickerList.Selected)).toBe(6);
        await page.selectColumn(ColumnPickerList.Selected, 1);
        await page.deselectBtn.click();
        expect(await page.getColumnCount(ColumnPickerList.Deselected)).toBe(19);
        expect(await page.getColumnCount(ColumnPickerList.Selected)).toBe(5);
        expect(await page.getDeselection()).toBe('[ "Author", "Category", "Date Created", "Date Modified", "Department", "Document ID", "Flag", "From", "Icon", "Importance", "Location", "Location ID", "Message", "Organization", "Time", "Time Created", "Time Modified", "Work Completed", "Type" ]');
        expect(await page.getSelection()).toBe('[ "Date", "Requested by", "Status", "Completion" ]');
    });

    it('should allow moving all deselected columns', async () => {
        expect(await page.getColumnCount(ColumnPickerList.Deselected)).toBe(18);
        expect(await page.getColumnCount(ColumnPickerList.Selected)).toBe(6);
        await page.selectAllBtn.click();
        expect(await page.getColumnCount(ColumnPickerList.Deselected)).toBe(0);
        expect(await page.getColumnCount(ColumnPickerList.Selected)).toBe(24);
        expect(await page.getDeselection()).toBe('[]');
        expect(await page.getSelection()).toBe('[ "Type", "Date", "Requested by", "Status", "Completion", "Author", "Category", "Date Created", "Date Modified", "Department", "Document ID", "Flag", "From", "Icon", "Importance", "Location", "Location ID", "Message", "Organization", "Time", "Time Created", "Time Modified", "Work Completed" ]');
    });

    it('should allow moving all selected columns', async () => {
        expect(await page.getColumnCount(ColumnPickerList.Deselected)).toBe(18);
        expect(await page.getColumnCount(ColumnPickerList.Selected)).toBe(6);
        await page.deselectAllBtn.click();
        expect(await page.getColumnCount(ColumnPickerList.Deselected)).toBe(23);
        expect(await page.getColumnCount(ColumnPickerList.Selected)).toBe(1);
        expect(await page.getDeselection()).toBe('[ "Author", "Category", "Date Created", "Date Modified", "Department", "Document ID", "Flag", "From", "Icon", "Importance", "Location", "Location ID", "Message", "Organization", "Time", "Time Created", "Time Modified", "Work Completed", "Type", "Date", "Requested by", "Status", "Completion" ]');
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