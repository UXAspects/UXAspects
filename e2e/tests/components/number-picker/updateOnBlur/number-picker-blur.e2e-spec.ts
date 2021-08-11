import { NumberPickerBlurPage } from './number-picker-blur.po.spec';

describe('Number Picker Tests updateOn:', () => {

    const page: NumberPickerBlurPage = new NumberPickerBlurPage();

    beforeAll(async () => {
        await page.getPage();
    });

    beforeEach(async () => {
        await page.setNumberPickerValue(page.numberPicker1, '0');
        await page.setNumberPickerValue(page.numberPicker2, '0');
    });

    describe('blur', () => {

        it('should update the value on blur', async () => {
            await page.numberPicker1.click();
            await page.setNumberPickerValue(page.numberPicker1, '2');

            expect(await page.getNumberPickerValue(page.numberPicker1)).toBe('2');
            expect(await page.value.getText()).toBe('{ "updateOnBlur": 0, "updateOnChange": 0 }');
        });

        it('should not update the value when the number picker changes value', async () => {
            await page.numberPicker1.click();
            await page.setNumberPickerValue(page.numberPicker1, '2');
            await page.topFocus.click();

            expect(await page.getNumberPickerValue(page.numberPicker1)).toBe('2');
            expect(await page.value.getText()).toBe('{ "updateOnBlur": 2, "updateOnChange": 0 }');
        });

        it('should update the value when using the arrows', async () => {
            await page.incrementNumberPickerValue(page.numberPicker1);

            expect(await page.getNumberPickerValue(page.numberPicker1)).toBe('1');
            expect(await page.value.getText()).toBe('{ "updateOnBlur": 1, "updateOnChange": 0 }');
        });
    });

    describe('change', () => {

        it('should update the value when the number picker changes value', async () => {
            await page.setNumberPickerValue(page.numberPicker2, '2');
            await page.topFocus.click();

            expect(await page.getNumberPickerValue(page.numberPicker2)).toBe('2');
            expect(await page.value.getText()).toBe('{ "updateOnBlur": 0, "updateOnChange": 2 }');
        });

        it('should update the value when using the arrows', async () => {
            await page.incrementNumberPickerValue(page.numberPicker2);

            expect(await page.getNumberPickerValue(page.numberPicker2)).toBe('0.1');
            expect(await page.value.getText()).toBe('{ "updateOnBlur": 0, "updateOnChange": 0.1 }');
        });
    });
});
