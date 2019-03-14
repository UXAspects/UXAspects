import { VirtualForPage } from './virtual-for.po.spec';

describe('Virtual For Tests', () => {

    let page: VirtualForPage;

    beforeEach(async () => {
        page = new VirtualForPage();
        await page.getPage();
    });

    it('should have correct initial states', async () => {
        expect(await page.getVisibleRowCount()).toBe(39);
        expect(await page.getSpacerHeight()).toBe('390000px');
    });


    it('should have the correct context on the first row', async () => {
        expect(await page.getValue(0)).toBe('0');
        expect(await page.getIndex(0)).toBe('0');
        expect(await page.getCount(0)).toBe('10000');
        expect(await page.getFirst(0)).toBe(true);
        expect(await page.getLast(0)).toBe(false);
        expect(await page.getEven(0)).toBe(true);
        expect(await page.getOdd(0)).toBe(false);
    });


    it('should have the correct context on non-first rows', async () => {

        for (let idx = 1; idx < 5; idx++) {
            expect(await page.getValue(idx)).toBe(`${idx}`);
            expect(await page.getIndex(idx)).toBe(`${idx}`);
            expect(await page.getCount(idx)).toBe('10000');
            expect(await page.getFirst(idx)).toBe(false);
            expect(await page.getLast(idx)).toBe(false);
            expect(await page.getEven(idx)).toBe(idx % 2 === 0);
            expect(await page.getOdd(idx)).toBe(idx % 2 === 1);
        }
    });

    it('should have the scroll and update virtual items', async () => {
        await page.scrollToPosition(200000);

        for (let idx = 0; idx < 5; idx++) {
            expect(await page.getValue(idx)).toBe(`${idx + 5118}`);
            expect(await page.getIndex(idx)).toBe(`${idx + 5118}`);
            expect(await page.getCount(idx)).toBe('10000');
            expect(await page.getFirst(idx)).toBe(false);
            expect(await page.getLast(idx)).toBe(false);
            expect(await page.getEven(idx)).toBe((idx + 5118) % 2 === 0);
            expect(await page.getOdd(idx)).toBe((idx + 5118) % 2 === 1);
        }
    });

    it('should have the correct context for the last item', async () => {
        await page.scrollToPosition(parseInt(await page.getSpacerHeight()));

        expect(await page.getValue(29)).toBe(`9999`);
        expect(await page.getIndex(29)).toBe(`9999`);
        expect(await page.getCount(29)).toBe('10000');
        expect(await page.getFirst(29)).toBe(false);
        expect(await page.getLast(29)).toBe(true);
        expect(await page.getEven(29)).toBe(9999 % 2 === 0);
        expect(await page.getOdd(29)).toBe(9999 % 2 === 1);

    });

});