import { imageCompare } from '../common/image-compare';
import { ColorPickerPage } from './color-picker.po.spec';

describe('Color Picker', () => {

    let page: ColorPickerPage;

    beforeEach(async () => {
        page = new ColorPickerPage();
        await page.getPage();
    });

    it('should have correct initial state', async () => {
        expect(await imageCompare('color-picker-initial')).toEqual(0);
    });
});
