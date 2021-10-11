import { imageCompare } from '../../common/image-compare';
import { MenuAlignmentPage } from './menu-alignment.po.spec';

describe('Menu (Alignment) Tests', () => {

    let page: MenuAlignmentPage;

    beforeEach(async () => {
        page = new MenuAlignmentPage();
        await page.getPage();
    });

    it('should change the alignment without having placement set', async () => {
        await page.alignmentCenterBtn.click();
        await page.openMenuBtn.click();
        expect(await imageCompare('menu-alignment-center')).toEqual(0);
    });

    it('should change aligment after initialisation', async () => {
        await page.alignmentEndBtn.click();
        await page.openMenuBtn.click();
        expect(await imageCompare('menu-alignment-end')).toEqual(0);
    });
});
