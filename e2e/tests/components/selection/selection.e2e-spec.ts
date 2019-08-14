import { SelectionPage } from './selection.po.spec';

describe('Selection Tests', () => {

    let page: SelectionPage;

    beforeEach(async () => {
        page = new SelectionPage();
        await page.getPage();
    });

    it('should have correct initial state', async () => {

        // all table rows should be correctly rendered
        page.rows.forEach(async row => expect(await row.isPresent()).toBeTruthy());

        // tabindex should be disabled on the child buttons
        page.rows.forEach(async row => expect(await page.getRowButtonTabIndex(row)).toBe('-1'));

        // expect all rows to be deselected
        page.rows.forEach(async row => expect(await page.isRowSelected(row)).toBeFalsy());

        // no table rows are selected
        expect(await page.getSelection()).toBe('[]');
    });

    it('should select a row on click (simple)', async () => {

        // click the first row
        await page.clickSelectRow(page.row0);

        // expect the row to be selected
        expect(await page.isRowSelected(page.row0)).toBeTruthy();

        // the selection should be updated
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true } ]');
    });

    it('should toggle a row on double click (simple)', async () => {

        // click the first row
        await page.clickSelectRow(page.row0);

        // expect the row to be selected
        expect(await page.isRowSelected(page.row0)).toBeTruthy();

        // the selection should be updated
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true } ]');

        // click the first row again
        await page.clickSelectRow(page.row0);

        // expect the row to not be selected
        expect(await page.isRowSelected(page.row0)).toBeFalsy();

        // the selection should be updated
        expect(await page.getSelection()).toBe('[]');
    });

    it('should allow multiple click selections (simple)', async () => {

        // click the first row
        await page.clickSelectRow(page.row0);

        // expect the row to be selected
        expect(await page.isRowSelected(page.row0)).toBeTruthy();

        // the selection should be updated
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true } ]');

        // click the second row
        await page.clickSelectRow(page.row1);

        // expect the row to be selected
        expect(await page.isRowSelected(page.row1)).toBeTruthy();

        // the selection should be updated
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true }, { "name": "Document 2", "author": "John Smith", "selected": true } ]');
    });

    it('should allow select all (simple)', async () => {

        // select all
        await page.selectAll();

        // expect the rows to be selected
        page.rows.forEach(async row => expect(await page.isRowSelected(row)).toBeTruthy());

        // the selection should be updated
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true }, { "name": "Document 2", "author": "John Smith", "selected": true }, { "name": "Document 3", "author": "John Smith", "selected": true }, { "name": "Document 4", "author": "John Smith", "selected": true } ]');
    });

    it('should allow deselect all (simple)', async () => {

        // select all
        await page.selectAll();

        // expect the rows to be selected
        page.rows.forEach(async row => expect(await page.isRowSelected(row)).toBeTruthy());

        // the selection should be updated
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true }, { "name": "Document 2", "author": "John Smith", "selected": true }, { "name": "Document 3", "author": "John Smith", "selected": true }, { "name": "Document 4", "author": "John Smith", "selected": true } ]');

        // deselect all
        await page.deselectAll();

        // expect the rows to be deselected
        page.rows.forEach(async row => expect(await page.isRowSelected(row)).toBeFalsy());

        // the selection should be updated
        expect(await page.getSelection()).toBe('[]');
    });

    it('should toggle the state using spacebar (simple)', async () => {

        // nothing should be selected initially
        expect(await page.getSelection()).toBe('[]');

        await page.clickSelectRow(page.row0);

        // expect the row to be selected
        expect(await page.isRowSelected(page.row0)).toBeTruthy();

        // first row should be selected
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true } ]');

        // press keys
        await page.spacebar();

        // expect the row to be deselected
        expect(await page.isRowSelected(page.row0)).toBeFalsy();

        // nothing should be selected
        expect(await page.getSelection()).toBe('[]');
    });

    it('should allow keyboard navigation (simple)', async () => {

        // nothing should be selected initially
        expect(await page.getSelection()).toBe('[]');

        await page.clickSelectRow(page.row0);

        // expect the row to be selected
        expect(await page.isRowSelected(page.row0)).toBeTruthy();

        // first row should be selected
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true } ]');

        // press keys
        await page.arrowDown();
        await page.spacebar();

        // expect the row to be selected
        expect(await page.isRowSelected(page.row1)).toBeTruthy();

        // first two rows should be selected
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true }, { "name": "Document 2", "author": "John Smith", "selected": true } ]');

        // press keys
        await page.arrowUp();
        await page.spacebar();

        // expect the row selection to be updated
        expect(await page.isRowSelected(page.row0)).toBeFalsy();
        expect(await page.isRowSelected(page.row1)).toBeTruthy();

        // only the second row should be focused
        expect(await page.getSelection()).toBe('[ { "name": "Document 2", "author": "John Smith", "selected": true } ]');

    });

    it('should allow keyboard navigation (row-alt)', async () => {

        // select row mode
        await page.setRowAltMode();

        // nothing should be selected initially
        expect(await page.getSelection()).toBe('[]');

        await page.clickSelectRow(page.row0);

        // expect the row to be selected
        expect(await page.isRowSelected(page.row0)).toBeTruthy();
        expect(await page.isRowSelected(page.row1)).toBeFalsy();
        expect(await page.isRowSelected(page.row2)).toBeFalsy();
        expect(await page.isRowSelected(page.row3)).toBeFalsy();

        // first row should be selected
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true } ]', '1. initial click');

        // press down
        await page.arrowDown();

        // expect the rows to be selected
        expect(await page.isRowSelected(page.row0)).toBeFalsy();
        expect(await page.isRowSelected(page.row1)).toBeTruthy();
        expect(await page.isRowSelected(page.row2)).toBeFalsy();
        expect(await page.isRowSelected(page.row3)).toBeFalsy();

        // second row should be selected
        expect(await page.getSelection()).toBe('[ { "name": "Document 2", "author": "John Smith", "selected": true } ]', '2. down');

        // press shift+down
        await page.arrowDown(true);

        // expect the rows to be selected
        expect(await page.isRowSelected(page.row0)).toBeFalsy();
        expect(await page.isRowSelected(page.row1)).toBeTruthy();
        expect(await page.isRowSelected(page.row2)).toBeTruthy();
        expect(await page.isRowSelected(page.row3)).toBeFalsy();

        // second and third
        expect(await page.getSelection()).toBe('[ { "name": "Document 2", "author": "John Smith", "selected": true }, { "name": "Document 3", "author": "John Smith", "selected": true } ]', '3. shift+down');

        // press ctrl+down
        await page.arrowDown(false, true);

        // expect the rows to be selected
        expect(await page.isRowSelected(page.row0)).toBeFalsy();
        expect(await page.isRowSelected(page.row1)).toBeTruthy();
        expect(await page.isRowSelected(page.row2)).toBeTruthy();
        expect(await page.isRowSelected(page.row3)).toBeFalsy();

        // second and third (still)
        expect(await page.getSelection()).toBe('[ { "name": "Document 2", "author": "John Smith", "selected": true }, { "name": "Document 3", "author": "John Smith", "selected": true } ]', '4. ctrl+down');

        // press space
        await page.spacebar();

        // expect the rows to be selected
        expect(await page.isRowSelected(page.row0)).toBeFalsy();
        expect(await page.isRowSelected(page.row1)).toBeTruthy();
        expect(await page.isRowSelected(page.row2)).toBeTruthy();
        expect(await page.isRowSelected(page.row3)).toBeTruthy();

        // second, third, and fourth
        expect(await page.getSelection()).toBe('[ { "name": "Document 2", "author": "John Smith", "selected": true }, { "name": "Document 3", "author": "John Smith", "selected": true }, { "name": "Document 4", "author": "John Smith", "selected": true } ]', '5. space');

        // press down
        await page.arrowDown();

        // expect the rows to be selected
        expect(await page.isRowSelected(page.row0)).toBeFalsy();
        expect(await page.isRowSelected(page.row1)).toBeFalsy();
        expect(await page.isRowSelected(page.row2)).toBeFalsy();
        expect(await page.isRowSelected(page.row3)).toBeTruthy();

        // fourth
        expect(await page.getSelection()).toBe('[ { "name": "Document 4", "author": "John Smith", "selected": true } ]', '6. down');

    });

    it('should select a row on click (row)', async () => {

        // select row mode
        await page.setRowMode();

        // click the first row
        await page.clickSelectRow(page.row0);

        // expect the row to be selected
        expect(await page.isRowSelected(page.row0)).toBeTruthy();

        // the selection should be updated
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true } ]');
    });

    it('should not toggle a row on double click (row)', async () => {

        // select row mode
        await page.setRowMode();

        // click the first row
        await page.clickSelectRow(page.row0);

        // expect the row to be selected
        expect(await page.isRowSelected(page.row0)).toBeTruthy();

        // the selection should be updated
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true } ]');

        // click the first row again
        await page.clickSelectRow(page.row0);

        // expect the row to be selected
        expect(await page.isRowSelected(page.row0)).toBeTruthy();

        // the selection should be updated
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true } ]');
    });

    it('should not allow multiple click selections (row)', async () => {

        // select row mode
        await page.setRowMode();

        // click the first row
        await page.clickSelectRow(page.row0);

        // expect the row to be selected
        expect(await page.isRowSelected(page.row0)).toBeTruthy();

        // the selection should be updated
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true } ]');

        // click the second row
        await page.clickSelectRow(page.row1);

        // expect the rows to be updated
        expect(await page.isRowSelected(page.row0)).toBeFalsy();
        expect(await page.isRowSelected(page.row1)).toBeTruthy();

        // the selection should be updated
        expect(await page.getSelection()).toBe('[ { "name": "Document 2", "author": "John Smith", "selected": true } ]');
    });

    it('should allow select all (row)', async () => {

        // select row mode
        await page.setRowMode();

        // select all
        await page.selectAll();

        // expect all rows to be selected
        page.rows.forEach(async row => expect(await page.isRowSelected(row)).toBeTruthy());

        // the selection should be updated
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true }, { "name": "Document 2", "author": "John Smith", "selected": true }, { "name": "Document 3", "author": "John Smith", "selected": true }, { "name": "Document 4", "author": "John Smith", "selected": true } ]');
    });

    it('should allow deselect all (row)', async () => {

        // select row mode
        await page.setRowMode();

        // select all
        await page.selectAll();

        // expect all rows to be selected
        page.rows.forEach(async row => expect(await page.isRowSelected(row)).toBeTruthy());

        // the selection should be updated
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true }, { "name": "Document 2", "author": "John Smith", "selected": true }, { "name": "Document 3", "author": "John Smith", "selected": true }, { "name": "Document 4", "author": "John Smith", "selected": true } ]');

        // deselect all
        await page.deselectAll();

        // expect all rows to be deselected
        page.rows.forEach(async row => expect(await page.isRowSelected(row)).toBeFalsy());

        // the selection should be updated
        expect(await page.getSelection()).toBe('[]');
    });

    it('should toggle the state using spacebar (row)', async () => {

        // select row mode
        await page.setRowMode();

        // nothing should be selected initially
        expect(await page.getSelection()).toBe('[]');

        await page.clickSelectRow(page.row0);

        // expect the row to be selected
        expect(await page.isRowSelected(page.row0)).toBeTruthy();

        // first row should be selected
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true } ]');

        // press keys
        await page.spacebar();

        // expect the row to be selected
        expect(await page.isRowSelected(page.row0)).toBeFalsy();

        // nothing should be selected
        expect(await page.getSelection()).toBe('[]');
    });

    it('should allow keyboard navigation (row)', async () => {

        // select row mode
        await page.setRowMode();

        // nothing should be selected initially
        expect(await page.getSelection()).toBe('[]');

        await page.clickSelectRow(page.row0);

        // expect the row to be selected
        expect(await page.isRowSelected(page.row0)).toBeTruthy();

        // first row should be selected
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true } ]');

        // press keys
        await page.arrowDown();
        await page.spacebar();

        // expect the row to be selected
        expect(await page.isRowSelected(page.row0)).toBeFalsy();
        expect(await page.isRowSelected(page.row1)).toBeTruthy();

        // first two rows should be selected
        expect(await page.getSelection()).toBe('[ { "name": "Document 2", "author": "John Smith", "selected": true } ]');

        // press keys
        await page.arrowUp();
        await page.spacebar();

        // expect the row to be selected
        expect(await page.isRowSelected(page.row0)).toBeTruthy();
        expect(await page.isRowSelected(page.row1)).toBeFalsy();

        // only the second row should be focused
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true } ]');

    });

    it('should allow multiple click selection with ctrl key down (row)', async () => {

        // select row mode
        await page.setRowMode();

        // nothing should be selected initially
        expect(await page.getSelection()).toBe('[]');

        // click the first row
        await page.clickSelectRow(page.row0);

        // expect the row to be selected
        expect(await page.isRowSelected(page.row0)).toBeTruthy();

        // the selection should be updated
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true } ]');

        // ctrl + click the second row
        await page.clickSelectRow(page.row1, false, true);

        // expect the row to be selected
        expect(await page.isRowSelected(page.row0)).toBeTruthy();
        expect(await page.isRowSelected(page.row1)).toBeTruthy();

        // the selection should be updated
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true }, { "name": "Document 2", "author": "John Smith", "selected": true } ]');

    });

    it('should allow group click selection with shift key down (row)', async () => {

        // select row mode
        await page.setRowMode();

        // nothing should be selected initially
        expect(await page.getSelection()).toBe('[]');

        // click the first row
        await page.clickSelectRow(page.row0);

        // expect the row to be selected
        expect(await page.isRowSelected(page.row0)).toBeTruthy();

        // the selection should be updated
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true } ]');

        // shift + click the last row
        await page.clickSelectRow(page.row3, true);

        // expect the rows to be selected
        page.rows.forEach(async row => expect(await page.isRowSelected(row)).toBeTruthy());

        // the selection should be updated
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true }, { "name": "Document 2", "author": "John Smith", "selected": true }, { "name": "Document 3", "author": "John Smith", "selected": true }, { "name": "Document 4", "author": "John Smith", "selected": true } ]');

    });

    it('should restore tabindex on focused rows', async () => {

        // tabindex should initially be disabled
        expect<any>(page.getRowButtonTabIndex(page.row0)).toBe('-1');

        // click the first row
        await page.clickSelectRow(page.row0);

        // Focus should restore the tabindex to its original value
        expect<any>(page.getRowButtonTabIndex(page.row0)).toBe('5');

        // click the second row
        await page.clickSelectRow(page.row1);

        // tabindex should be disabled again on blur
        expect<any>(page.getRowButtonTabIndex(page.row0)).toBe('-1');
        expect<any>(page.getRowButtonTabIndex(page.row1)).toBe('5');
    });

    it('should allow individual items to be disabled', async () => {

        // add a disabled items
        await page.addDisabledItem();

        // try and select the disabled item
        await page.clickSelectRow(page.row4);

        // expect the row to be deselected
        expect(await page.isRowSelected(page.row4)).toBeFalsy();

        // the selection should be updated
        expect(await page.getSelection()).toBe('[]');

        // other rows should still be selectable
        await page.clickSelectRow(page.row0);

        // expect the row to be selected
        expect(await page.isRowSelected(page.row0)).toBeTruthy();

        // the selection should be updated
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true } ]');
    });

    it('should not allow select all on individually disabled items', async () => {

        // add a disabled items
        await page.addDisabledItem();

        // select all
        await page.selectAll();

        // expect the enabled rows to be selected
        page.rows.forEach(async row => expect(await page.isRowSelected(row)).toBeTruthy());

        // expect the disabled row to not be selected
        expect(await page.isRowSelected(page.row4)).toBeFalsy();

        // the selection should be updated
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true }, { "name": "Document 2", "author": "John Smith", "selected": true }, { "name": "Document 3", "author": "John Smith", "selected": true }, { "name": "Document 4", "author": "John Smith", "selected": true } ]');
    });

});