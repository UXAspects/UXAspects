import { imageCompare } from '../common/image-compare';
import { BadgePage } from './badge.po.spec';

describe('Badge Tests', () => {
    let page: BadgePage;

    beforeEach(async () => {
        page = new BadgePage();
        await page.getPage();
    });

    it('should have the correct initial state', async () => {
        expect(await imageCompare('badge-initial')).toEqual(0);
    });
});
