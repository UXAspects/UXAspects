import { imageCompare } from '../common/image-compare';
import { ReorderableGroupPage } from './reorderable-group.po.spec';

describe('Reorderable Group', () => {

    let page: ReorderableGroupPage;

    beforeEach(async () => {
        page = new ReorderableGroupPage();
        await page.getPage();
    });

    it('should have correct initial states', async () => {
        expect(await page.container1Rows.count()).toBe(3);
        expect(await page.container2Rows.count()).toBe(0);

        const objects1 = await page.getObjects1();
        expect(objects1.length).toBe(3);
        expect(objects1[0].document).toBe('Document 0');
        expect(objects1[1].document).toBe('Document 1');
        expect(objects1[2].document).toBe('Document 2');

        const objects2 = await page.getObjects2();
        expect(objects2.length).toBe(0);

        expect(await imageCompare('reorderable-group-initial')).toEqual(0);
    });

});
