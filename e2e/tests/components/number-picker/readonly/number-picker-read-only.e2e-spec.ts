import { NumberPickerUpdateOnPage } from './number-picker-read-only.po.spec';

describe('Number Picker Tests updateOn:', () => {

    const page: NumberPickerUpdateOnPage = new NumberPickerUpdateOnPage();

    beforeAll(async () => {
        await page.getPage();
    });

    beforeEach(async () => {
        await page.setNumberPickerValue(page.numberPickerReadOnly, '0');
    });

    describe('read-only', () => {

        it('should prevent changes to the value via the input', async () => {
            // await page.setNumberPickerValue(page.numberPickerReadOnly, '7');

            // expect(await page.getNumberPickerValue(page.numberPickerReadOnly)).toBe('5');
            expect(await page.emittedValue.getText()).toBe('{ "readonly": 5 }');
        });

        it('should prevent changes to the value by hitting the increment arrow', async () => {
            await page.incrementNumberPickerValue(page.numberPickerReadOnly);

            expect(await page.emittedValue.getText()).toBe('{ "readonly": 5 }');
        });

        it('should prevent changes to the value by hitting the decrement arrow', async () => {
            await page.decrementNumberPickerValue(page.numberPickerReadOnly);

            expect(await page.emittedValue.getText()).toBe('{ "readonly": 5 }');
        });

        it('should prevent changes to the value by scrolling incrementally', async () => {
            expect(await page.confirmUpDownControlIsDisabled(page.numberPickerReadOnly, 'up'));
            expect(await page.emittedValue.getText()).toBe('{ "readonly": 5 }');
        });

        it('should prevent changes to the value by scrolling decrementally', async () => {
            expect(await page.confirmUpDownControlIsDisabled(page.numberPickerReadOnly, 'down'));
            expect(await page.emittedValue.getText()).toBe('{ "readonly": 5 }');
        });
    });
});
