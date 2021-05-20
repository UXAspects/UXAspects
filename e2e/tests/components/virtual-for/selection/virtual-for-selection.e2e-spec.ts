import { VirtualForSelectionPage } from './virtual-for-selection.po.spec';
import { imageCompare } from '../../common/image-compare';

describe('Virtual For with Selection', () => {

    let page: VirtualForSelectionPage;

    beforeEach(async () => {
        page = new VirtualForSelectionPage();
        await page.getPage();
    });

    describe('with mode = simple', () => {
        it('should allow persistent selection across virtual pages', async () => {
            await page.getRow(9).click();
            expect(await page.getSelectionText()).toBe('9', 'first selection');

            await page.scrollToPosition(200000);
            await page.getRow(999).click();
            expect(await page.getSelectionText()).toBe('9, 999', 'second selection');
            expect(await page.getSelectedRows().count()).toBe(1, 'second selection');
            expect(await imageCompare('virtual-for-selection-simple-1')).toBe(0);

            await page.scrollToPosition(0);
            expect(await page.getSelectedRows().count()).toBe(1, 'scroll back to top');
            expect(await imageCompare('virtual-for-selection-simple-2')).toBe(0);
        });
    });

    describe('with mode = row', () => {
        beforeEach(async () => {
            await page.setMode('row');
        });

        it('should allow persistent selection across virtual pages', async () => {
            await page.getRow(9).click();
            expect(await page.getSelectionText()).toBe('9', 'first selection');

            await page.scrollToPosition(200000);
            await page.ctrlClick(page.getRow(999));
            expect(await page.getSelectionText()).toBe('9, 999', 'second selection');
            expect(await page.getSelectedRows().count()).toBe(1, 'second selection');
            expect(await imageCompare('virtual-for-selection-row-1')).toBe(0);

            await page.scrollToPosition(0);
            expect(await page.getSelectedRows().count()).toBe(1, 'scroll back to top');
            expect(await imageCompare('virtual-for-selection-row-2')).toBe(0);
        });

        it('should allow range selection across virtual pages', async () => {
            await page.getRow(0).click();

            await page.scrollToPosition(200000);
            await page.shiftClick(page.getRow(999));
            expect(await page.getSelectionCount()).toBe(1000);
            expect(await imageCompare('virtual-for-selection-row-range')).toBe(0);
        });
    });
});
