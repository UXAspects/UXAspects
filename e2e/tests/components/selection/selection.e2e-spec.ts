import { SelectionPage } from './selection.po.spec';

describe('Selection Tests', () => {

    let page: SelectionPage;

    beforeEach(() => {
        page = new SelectionPage();
        page.getPage();
    });

    it('should have correct initial state', async () => {

        // all table rows should be correctly rendered
        expect<any>(page.row0.isPresent()).toBe(true);
        expect<any>(page.row1.isPresent()).toBe(true);
        expect<any>(page.row2.isPresent()).toBe(true);
        expect<any>(page.row3.isPresent()).toBe(true);

        // no table rows are selected
        expect(await page.getSelection()).toBe('[]');
    });

    it('should select a row on click (simple)', async () => {

        // click the first row
        await page.clickSelectRow(page.row0);

        // the selection should be updated
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true } ]');
    });

    it('should toggle a row on double click (simple)', async () => {

        // click the first row
        await page.clickSelectRow(page.row0);

        // the selection should be updated
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true } ]');

        // click the first row again
        await page.clickSelectRow(page.row0);

        // the selection should be updated
        expect(await page.getSelection()).toBe('[]');
    });

    it('should allow multiple click selections (simple)', async () => {

        // click the first row
        await page.clickSelectRow(page.row0);

        // the selection should be updated
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true } ]');

        // click the second row
        await page.clickSelectRow(page.row1);

        // the selection should be updated
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true }, { "name": "Document 2", "author": "John Smith", "selected": true } ]');
    });

    it('should allow select all (simple)', async () => {

        // select all
        await page.selectAll();

        // the selection should be updated
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true }, { "name": "Document 2", "author": "John Smith", "selected": true }, { "name": "Document 3", "author": "John Smith", "selected": true }, { "name": "Document 4", "author": "John Smith", "selected": true } ]');
    });

    it('should allow deselect all (simple)', async () => {

        // select all
        await page.selectAll();

        // the selection should be updated
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true }, { "name": "Document 2", "author": "John Smith", "selected": true }, { "name": "Document 3", "author": "John Smith", "selected": true }, { "name": "Document 4", "author": "John Smith", "selected": true } ]');

        // deselect all
        await page.deselectAll();

        // the selection should be updated
        expect(await page.getSelection()).toBe('[]');
    });

    it('should toggle the state using spacebar (simple)', async () => {

        // nothing should be selected initially
        expect(await page.getSelection()).toBe('[]');

        await page.clickSelectRow(page.row0);

        // first row should be selected
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true } ]');

        // press keys
        await page.spacebar();

        // nothing should be selected
        expect(await page.getSelection()).toBe('[]');
    });

    it('should allow keyboard navigation (simple)', async () => {

        // nothing should be selected initially
        expect(await page.getSelection()).toBe('[]');

        await page.clickSelectRow(page.row0);

        // first row should be selected
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true } ]');

        // press keys
        await page.arrowDown();
        await page.spacebar();

        // first two rows should be selected
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true }, { "name": "Document 2", "author": "John Smith", "selected": true } ]');

        // press keys
        await page.arrowUp();
        await page.spacebar();

        // only the second row should be focused
        expect(await page.getSelection()).toBe('[ { "name": "Document 2", "author": "John Smith", "selected": true } ]');
        
    });

    it('should select a row on click (row)', async () => {

        // select row mode
        await page.setRowMode();

        // click the first row
        await page.clickSelectRow(page.row0);

        // the selection should be updated
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true } ]');
    });

    it('should not toggle a row on double click (row)', async () => {

        // select row mode
        await page.setRowMode();

        // click the first row
        await page.clickSelectRow(page.row0);

        // the selection should be updated
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true } ]');

        // click the first row again
        await page.clickSelectRow(page.row0);

        // the selection should be updated
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true } ]');
    });

    it('should not allow multiple click selections (row)', async () => {

        // select row mode
        await page.setRowMode();

        // click the first row
        await page.clickSelectRow(page.row0);

        // the selection should be updated
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true } ]');

        // click the second row
        await page.clickSelectRow(page.row1);

        // the selection should be updated
        expect(await page.getSelection()).toBe('[ { "name": "Document 2", "author": "John Smith", "selected": true } ]');
    });

    it('should allow select all (row)', async () => {

        // select row mode
        await page.setRowMode();

        // select all
        await page.selectAll();

        // the selection should be updated
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true }, { "name": "Document 2", "author": "John Smith", "selected": true }, { "name": "Document 3", "author": "John Smith", "selected": true }, { "name": "Document 4", "author": "John Smith", "selected": true } ]');
    });

    it('should allow deselect all (row)', async () => {
        
        // select row mode
        await page.setRowMode();

        // select all
        await page.selectAll();

        // the selection should be updated
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true }, { "name": "Document 2", "author": "John Smith", "selected": true }, { "name": "Document 3", "author": "John Smith", "selected": true }, { "name": "Document 4", "author": "John Smith", "selected": true } ]');

        // deselect all
        await page.deselectAll();

        // the selection should be updated
        expect(await page.getSelection()).toBe('[]');
    });

    it('should toggle the state using spacebar (row)', async () => {

        // select row mode
        await page.setRowMode();

        // nothing should be selected initially
        expect(await page.getSelection()).toBe('[]');

        await page.clickSelectRow(page.row0);

        // first row should be selected
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true } ]');

        // press keys
        await page.spacebar();

        // nothing should be selected
        expect(await page.getSelection()).toBe('[]');
    });

    it('should allow keyboard navigation (row)', async () => {

        // select row mode
        await page.setRowMode();

        // nothing should be selected initially
        expect(await page.getSelection()).toBe('[]');

        await page.clickSelectRow(page.row0);

        // first row should be selected
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true } ]');

        // press keys
        await page.arrowDown();
        await page.spacebar();

        // first two rows should be selected
        expect(await page.getSelection()).toBe('[ { "name": "Document 2", "author": "John Smith", "selected": true } ]');

        // press keys
        await page.arrowUp();
        await page.spacebar();

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

        // the selection should be updated
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true } ]');

        // ctrl + click the second row
        await page.clickSelectRow(page.row1, false, true); 

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

        // the selection should be updated
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true } ]');

        // shift + click the last row
        await page.clickSelectRow(page.row3, true);     

        // the selection should be updated
        expect(await page.getSelection()).toBe('[ { "name": "Document 1", "author": "John Smith", "selected": true }, { "name": "Document 2", "author": "John Smith", "selected": true }, { "name": "Document 3", "author": "John Smith", "selected": true }, { "name": "Document 4", "author": "John Smith", "selected": true } ]');
        
    });

});