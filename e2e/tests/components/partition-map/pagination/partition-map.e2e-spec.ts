import { PartitionMapPage } from './partition-map.po.spec';

describe('Partition Map Tests', () => {

    let page: PartitionMapPage = new PartitionMapPage();

    beforeAll(async () => {
        await page.getPage();
    });

    it('should have correct initial states', async () => {

        expect(await page.getNumberOfSegments()).toBe(13);
        
        // Segment text
        expect(await page.getSegmentText(1)).toBe('My Workspace');
        expect(await page.getSegmentText(2)).toBe('Financial Data');
        expect(await page.getSegmentText(3)).toBe('Identification Data');
        expect(await page.getSegmentText(4)).toBe('Sensitive');
        expect(await page.getSegmentText(5)).toBe('Partially Sensitive');
        expect(await page.getSegmentText(6)).toBe('To be retained');
        expect(await page.getSegmentText(7)).toBe('Redundant');
        expect(await page.getSegmentText(8)).toBe('Obsolete');
        expect(await page.getSegmentText(9)).toBe('Sensitive');
        expect(await page.getSegmentText(10)).toBe('Partially Sensitive');
        expect(await page.getSegmentText(11)).toBe('To be retained');
        expect(await page.getSegmentText(12)).toBe('Redundant');
        expect(await page.getSegmentText(13)).toBe('Obsolete');
        // // button numbers
        // expect(await page.getButton(1).getText()).toBe('1');
        // expect(await page.getButton(2).getText()).toBe('2');
        // expect(await page.getButton(3).getText()).toBe('3');
        // expect(await page.getButton(4).getText()).toBe('4');
        // expect(await page.getButton(5).getText()).toBe('5');

        // // page number
        // expect(await page.text.getText()).toBe('Page 1 of 10');

        // await page.resetBtn.click();

        // expect(await imageCompare('partition-map-initial')).toEqual(0);
    });

    // it('should retain inline styling after dataset is changed', async () => {

    // });
});