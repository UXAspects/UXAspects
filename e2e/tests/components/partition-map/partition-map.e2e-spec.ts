import { imageCompare } from '../common/image-compare';
import { PartitionMapPage } from './partition-map.po.spec';

describe('Partition Map', () => {

    let page: PartitionMapPage = new PartitionMapPage();

    beforeAll(async () => {
        await page.getPage();
    });

    it('should have correct initial states', async () => {

        expect(await page.getNumberOfSegments()).toBe(13);

        // Segment text
        expect(await page.getSegmentText(0)).toBe(' My Workspace ');
        expect(await page.getSegmentText(1)).toBe(' Financial Data ');
        expect(await page.getSegmentText(2)).toBe(' Identification Data ');
        expect(await page.getSegmentText(3)).toBe(' Sensitive ');
        expect(await page.getSegmentText(4)).toBe(' Partially Sensitive ');
        expect(await page.getSegmentText(5)).toBe(' To be retained ');
        expect(await page.getSegmentText(6)).toBe(' Redundant ');
        expect(await page.getSegmentText(7)).toBe(' Obsolete ');
        expect(await page.getSegmentText(8)).toBe(' Sensitive ');
        expect(await page.getSegmentText(9)).toBe(' Partially Sensitive ');
        expect(await page.getSegmentText(10)).toBe(' To be retained ');
        expect(await page.getSegmentText(11)).toBe(' Redundant ');
        expect(await page.getSegmentText(12)).toBe(' Obsolete ');

        expect(await imageCompare('partition-map-initial')).toEqual(0);
    });

    it('should retain inline styling after dataset is changed', async () => {
        await page.changeDatasetBtn.click();

        expect(await imageCompare('partition-map-dataset-change')).toEqual(0);
    });
});