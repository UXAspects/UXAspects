import { browser, Key } from 'protractor';
import { imageCompare } from '../../common/image-compare';
import { NumberPickerReadonlyPage } from './number-picker-read-only.po.spec';

describe('Number Picker Tests readonly:', () => {

    const page: NumberPickerReadonlyPage = new NumberPickerReadonlyPage();

    beforeAll(async () => {
        await page.getPage();
    });

    describe('true', () => {

        it('should prevent changes to the value via the input', async () => {
            await browser.actions().mouseMove(page.numberPickerReadOnly).click().perform();
            await browser.actions().sendKeys('7').perform();

            expect(await page.emittedValue.getText()).toBe('{ "readonly": 5, "readonlyInline": 6 }');
            expect(await imageCompare('number-picker-readonly-initial')).toEqual(0);
        });

        it('should prevent changes to the value by hitting the increment arrow', async () => {
            await browser.actions().mouseMove(page.incrementArrow).click().perform();

            expect(await page.emittedValue.getText()).toBe('{ "readonly": 5, "readonlyInline": 6 }');
        });

        it('should prevent changes to the value by hitting the decrement arrow', async () => {
            await browser.actions().mouseMove(page.decrementArrow).click().perform();

            expect(await page.emittedValue.getText()).toBe('{ "readonly": 5, "readonlyInline": 6 }');
        });

        it('should prevent changes to the value by hitting the up arrow on the keyboard', async () => {
            await browser.actions().mouseMove(page.numberPickerReadOnly).click().perform();
            await browser.actions().sendKeys(Key.ARROW_UP).perform();

            expect(await page.emittedValue.getText()).toBe('{ "readonly": 5, "readonlyInline": 6 }');
        });

        it('should prevent changes to the value by hitting the down arrow on the keyboard', async () => {
            await browser.actions().mouseMove(page.numberPickerReadOnly).click().perform();
            await browser.actions().sendKeys(Key.ARROW_DOWN).perform();

            expect(await page.emittedValue.getText()).toBe('{ "readonly": 5, "readonlyInline": 6 }');
        });
    });
});
