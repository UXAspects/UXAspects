import { imageCompare } from '../common/image-compare';
import { SplitterPage } from './splitter.po.spec';

describe('SplitterPage Tests', () => {

    let page: SplitterPage;

    beforeEach(async () => {
        page = new SplitterPage();
        await page.getPage();
    });

    it('should have the correct initial properties', async () => {

        const valuenow = await page.getGutterAriaValue();
        const valuemin = await page.getGutterAriaValueMin();
        const valuemax = await page.getGutterAriaValueMax();

        expect(valuenow).toBe('40');
        expect(valuemin).toBe('0');
        expect(valuemax).toBe('100');

        expect(await imageCompare('splitter-initial')).toEqual(0);
    });

    it('should move left when left arrow key is pressed', async () => {

        // focus the gutter
        await page.setGutterFocused();

        // press the left key
        await page.sendLeftKey();

        const valuenow = await page.getGutterAriaValue();
        const valuemin = await page.getGutterAriaValueMin();
        const valuemax = await page.getGutterAriaValueMax();

        expect(valuenow).toBe('39');
        expect(valuemin).toBe('0');
        expect(valuemax).toBe('100');
    });

    it('should move right when right arrow key is pressed', async () => {

        // focus the gutter
        await page.setGutterFocused();

        // press the right key
        await page.sendRightKey();

        const valuenow = await page.getGutterAriaValue();
        const valuemin = await page.getGutterAriaValueMin();
        const valuemax = await page.getGutterAriaValueMax();

        expect(valuenow).toBe('41');
        expect(valuemin).toBe('0');
        expect(valuemax).toBe('100');
    });

    it('should move to the start when home key is pressed', async () => {

        // focus the gutter
        await page.setGutterFocused();

        // press the home key
        await page.sendHomeKey();

        const valuenow = await page.getGutterAriaValue();
        const valuemin = await page.getGutterAriaValueMin();
        const valuemax = await page.getGutterAriaValueMax();

        expect(valuenow).toBe('0');
        expect(valuemin).toBe('0');
        expect(valuemax).toBe('100');
    });

    it('should move to the end when end key is pressed', async () => {

        // focus the gutter
        await page.setGutterFocused();

        // press the end key
        await page.sendEndKey();

        const valuenow = await page.getGutterAriaValue();
        const valuemin = await page.getGutterAriaValueMin();
        const valuemax = await page.getGutterAriaValueMax();

        expect(valuenow).toBe('100');
        expect(valuemin).toBe('0');
        expect(valuemax).toBe('100');
    });

    it('should not move left when left arrow key is pressed and we are at the start', async () => {

        // focus the gutter
        await page.setGutterFocused();

        // move to start
        await page.sendHomeKey();

        let valuenow = await page.getGutterAriaValue();
        expect(valuenow).toBe('0');

        // press the left key
        await page.sendLeftKey();

        valuenow = await page.getGutterAriaValue();
        const valuemin = await page.getGutterAriaValueMin();
        const valuemax = await page.getGutterAriaValueMax();

        expect(valuenow).toBe('0');
        expect(valuemin).toBe('0');
        expect(valuemax).toBe('100');
    });

    it('should not move right when right arrow key is pressed and we are at the end', async () => {

        // focus the gutter
        await page.setGutterFocused();

        // move to start
        await page.sendEndKey();

        let valuenow = await page.getGutterAriaValue();
        expect(valuenow).toBe('100');

        // press the right key
        await page.sendRightKey();

        valuenow = await page.getGutterAriaValue();
        const valuemin = await page.getGutterAriaValueMin();
        const valuemax = await page.getGutterAriaValueMax();

        expect(valuenow).toBe('100');
        expect(valuemin).toBe('0');
        expect(valuemax).toBe('100');
    });
});