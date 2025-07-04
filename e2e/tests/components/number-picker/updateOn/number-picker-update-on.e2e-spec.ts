import { NumberPickerUpdateOnPage } from './number-picker-update-on.po.spec';

describe('Number Picker Tests updateOn:', () => {
  const page: NumberPickerUpdateOnPage = new NumberPickerUpdateOnPage();

  beforeAll(async () => {
    await page.getPage();
  });

  beforeEach(async () => {
    await page.setNumberPickerValue(page.numberPickerBlur, '0');
    await page.setNumberPickerValue(page.numberPickerChange, '0');
  });

  describe('blur', () => {
    it('should update the value on blur', async () => {
      await page.numberPickerBlur.click();
      await page.setNumberPickerValue(page.numberPickerBlur, '2');
      await page.topFocus.click();

      expect(await page.getNumberPickerValue(page.numberPickerBlur)).toBe('2');
      expect(await page.emittedValue.getText()).toBe('{ "updateOnBlur": 2, "updateOnChange": 0 }');
    });

    it('should not update the value when the value changes', async () => {
      await page.numberPickerBlur.click();
      await page.setNumberPickerValue(page.numberPickerBlur, '2');

      expect(await page.getNumberPickerValue(page.numberPickerBlur)).toBe('2');
      expect(await page.emittedValue.getText()).toBe('{ "updateOnBlur": 0, "updateOnChange": 0 }');
    });

    it('should update the value when typing in a value then using the arrows', async () => {
      await page.setNumberPickerValue(page.numberPickerBlur, '2');
      await page.incrementNumberPickerValue(page.numberPickerBlur);

      expect(await page.getNumberPickerValue(page.numberPickerBlur)).toBe('3');
      expect(await page.emittedValue.getText()).toBe('{ "updateOnBlur": 3, "updateOnChange": 0 }');
    });
  });

  describe('change', () => {
    it('should update the value when the number picker changes value', async () => {
      await page.setNumberPickerValue(page.numberPickerChange, '2');

      expect(await page.getNumberPickerValue(page.numberPickerChange)).toBe('2');
      expect(await page.emittedValue.getText()).toBe('{ "updateOnBlur": 0, "updateOnChange": 2 }');
    });

    it('should update the value when typing in a value then using the arrows', async () => {
      await page.setNumberPickerValue(page.numberPickerChange, '1');
      await page.incrementNumberPickerValue(page.numberPickerChange);

      expect(await page.getNumberPickerValue(page.numberPickerChange)).toBe('2');
      expect(await page.emittedValue.getText()).toBe('{ "updateOnBlur": 0, "updateOnChange": 2 }');
    });
  });
});
