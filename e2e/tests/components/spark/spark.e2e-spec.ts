import { SparkPage } from './spark.po.spec';

describe('Spark Chart Tests', () => {

    const page = new SparkPage();

    // initially load the page
    page.getPage();

    it('should have the correct theme (single value)', async () => {
        expect(await page.getTheme(page.singleValueChart)).toBe('ux-spark-theme-vibrant2');
    });

    it('should have the correct theme (multi value)', async () => {
        expect(await page.getTheme(page.multiValueChart)).toBe('ux-spark-theme-primary');
    });

    it('should have the correct bar height (single value)', async () => {
        expect(await page.getSparkHeight(page.singleValueChart)).toBe('8px');
    });

    it('should have the correct bar height (multi value)', async () => {
        expect(await page.getSparkHeight(page.multiValueChart)).toBe('6px');
    });

    it('should have the correct number of segments (single value)', async () => {
        expect((await page.getSegments(page.singleValueChart)).length).toBe(1);
    });

    it('should have the correct number of segments (multi value)', async () => {
        expect((await page.getSegments(page.multiValueChart)).length).toBe(3);
    });

    it('should have the correct values (single value)', async () => {
        const segments = await page.getSegments(page.singleValueChart);
        expect(await page.getSegmentWidth(segments[0])).toBe(90);
    });

    it('should have the correct values (multi value)', async () => {
        const segments = await page.getSegments(page.multiValueChart);

        expect(await page.getSegmentWidth(segments[0])).toBe(212);
        expect(await page.getSegmentWidth(segments[1])).toBe(60);
        expect(await page.getSegmentWidth(segments[2])).toBe(30);
    });

    it('should have the correct aria label (single value)', async () => {
        expect(await page.getAriaLabel(page.singleValueChart)).toBe('Spark Chart Aria');
    });

    it('should have the correct aria label (multi value)', async () => {
        expect(await page.getAriaLabel(page.multiValueChart)).toBe(null);
    });

    it('should have the correct segment aria label (single value)', async () => {
        expect(await page.getSegmentAriaLabels(page.singleValueChart)).toEqual([]);
    });

    it('should have the correct segment aria label (multi value)', async () => {
        expect(await page.getSegmentAriaLabels(page.multiValueChart)).toEqual(['Segment One', 'Segment Two', 'Segment Three']);
    });

    it('should have the correct top left label (single value)', async () => {
        expect(await page.getTopLeftLabel(page.singleValueChart)).toBe('30%');
    });

    it('should have the correct top left label (multi value)', async () => {
        expect(await page.getTopLeftLabel(page.multiValueChart)).toBe('Multi-value');
    });

    it('should have the correct top right label (single value)', async () => {
        expect(await page.getTopRightLabel(page.singleValueChart)).toBe('75.0 MB');
    });

    it('should have the correct top right label (multi value)', async () => {
        expect(await page.getTopRightLabel(page.multiValueChart)).toBe(null);
    });

    it('should have the correct bottom left label (single value)', async () => {
        expect(await page.getBottomLeftLabel(page.singleValueChart)).toBe('ITEMS ON HOLD');
    });

    it('should have the correct bottom left label (multi value)', async () => {
        expect(await page.getBottomLeftLabel(page.multiValueChart)).toBe(null);
    });

    it('should have the correct bottom right label (single value)', async () => {
        expect(await page.getBottomRightLabel(page.singleValueChart)).toBe('TOTAL');
    });

    it('should have the correct bottom right label (multi value)', async () => {
        expect(await page.getBottomRightLabel(page.multiValueChart)).toBe(null);
    });

});