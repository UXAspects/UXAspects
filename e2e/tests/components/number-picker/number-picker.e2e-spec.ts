import { imageCompare } from '../common/image-compare';
import { NumberPickerPage } from './number-picker.po.spec';

describe('Number Picker Tests', () => {

    const page: NumberPickerPage = new NumberPickerPage();

    beforeAll(async () => {
        await page.getPage();
    });

    it('should have correct initial states', async () => {

        // Initial values.
        expect(await page.numberPicker1.isPresent()).toBeTruthy();
        expect(await page.numberPicker1.$('input').isPresent()).toBeTruthy();
        expect(await page.getNumberPickerMinimum(page.numberPicker1)).toEqual('-10');
        expect(await page.getNumberPickerMaximum(page.numberPicker1)).toEqual('10');
        expect(await page.getNumberPickerStep(page.numberPicker1)).toEqual('1');
        expect(await page.getNumberPickerValue(page.numberPicker1)).toEqual('0');
        expect(await page.confirmUpDownControlIsDisabled(page.numberPicker1, 'up')).toBeFalsy();
        expect(await page.confirmUpDownControlIsDisabled(page.numberPicker1, 'down')).toBeFalsy();
        expect(await page.confirmErrorMessage1IsVisible()).toBeFalsy();

        expect(await page.numberPicker2.isPresent()).toBeTruthy();
        expect(await page.numberPicker2.$('input').isPresent()).toBeTruthy();
        expect(await page.getNumberPickerMinimum(page.numberPicker2)).toEqual('0');
        expect(await page.getNumberPickerMaximum(page.numberPicker2)).toEqual('10');
        expect(await page.getNumberPickerStep(page.numberPicker2)).toEqual('0.1');
        expect(await page.getNumberPickerValue(page.numberPicker2)).toEqual('0');
        expect(await page.confirmUpDownControlIsDisabled(page.numberPicker2, 'up')).toBeFalsy();
        expect(await page.confirmUpDownControlIsDisabled(page.numberPicker2, 'down')).toBeTruthy();
        expect(await page.confirmErrorMessage2IsVisible()).toBeFalsy();

        expect(await imageCompare('number-picker-initial')).toEqual(0);

    });

    it('should allow changes to the value by clicking', async () => {

        // Number Picker 1
        await page.incrementNumberPickerValue(page.numberPicker1);
        expect(await page.getNumberPickerValue(page.numberPicker1)).toEqual('1');
        await page.incrementNumberPickerValue(page.numberPicker1);
        await page.incrementNumberPickerValue(page.numberPicker1);
        await page.incrementNumberPickerValue(page.numberPicker1);
        expect(await page.getNumberPickerValue(page.numberPicker1)).toEqual('4');
        await page.decrementNumberPickerValue(page.numberPicker1);
        await page.decrementNumberPickerValue(page.numberPicker1);
        await page.decrementNumberPickerValue(page.numberPicker1);
        await page.decrementNumberPickerValue(page.numberPicker1);
        await page.decrementNumberPickerValue(page.numberPicker1);
        await page.decrementNumberPickerValue(page.numberPicker1);
        expect(await page.getNumberPickerValue(page.numberPicker1)).toEqual('-2');
        await page.incrementNumberPickerValue(page.numberPicker1);
        await page.incrementNumberPickerValue(page.numberPicker1);
        await page.incrementNumberPickerValue(page.numberPicker1);
        expect(await page.getNumberPickerValue(page.numberPicker1)).toEqual('1');

        // Number Picker 2
        await page.incrementNumberPickerValue(page.numberPicker2);
        expect(await page.getNumberPickerValue(page.numberPicker2)).toEqual('0.1');
        await page.incrementNumberPickerValue(page.numberPicker2);
        expect(await page.getNumberPickerValue(page.numberPicker2)).toEqual('0.2');
        await page.incrementNumberPickerValue(page.numberPicker2);
        expect(await page.getNumberPickerValue(page.numberPicker2)).toEqual('0.3');
        await page.incrementNumberPickerValue(page.numberPicker2);
        expect(await page.getNumberPickerValue(page.numberPicker2)).toEqual('0.4');
        await page.decrementNumberPickerValue(page.numberPicker2);
        expect(await page.getNumberPickerValue(page.numberPicker2)).toEqual('0.3');
        await page.decrementNumberPickerValue(page.numberPicker2);
        expect(await page.getNumberPickerValue(page.numberPicker2)).toEqual('0.2');
        await page.decrementNumberPickerValue(page.numberPicker2);
        expect(await page.getNumberPickerValue(page.numberPicker2)).toEqual('0.1');
        await page.decrementNumberPickerValue(page.numberPicker2);
        expect(await page.getNumberPickerValue(page.numberPicker2)).toEqual('0');

    });

    it('should allow changes to the value by text entry', async () => {

        // Number Picker 1
        await page.setNumberPickerValue(page.numberPicker1, '5');
        expect(await page.getNumberPickerValue(page.numberPicker1)).toEqual('5');
        await page.setNumberPickerValue(page.numberPicker1, '10');
        expect(await page.getNumberPickerValue(page.numberPicker1)).toEqual('10');
        await page.setNumberPickerValue(page.numberPicker1, '-10');
        expect(await page.getNumberPickerValue(page.numberPicker1)).toEqual('-10');
        await page.setNumberPickerValue(page.numberPicker1, '15');
        expect(await page.getNumberPickerValue(page.numberPicker1)).toEqual('15');

        // Number Picker 2
        await page.setNumberPickerValue(page.numberPicker1, '5');
        expect(await page.getNumberPickerValue(page.numberPicker1)).toEqual('5');
        await page.setNumberPickerValue(page.numberPicker1, '15');
        expect(await page.getNumberPickerValue(page.numberPicker1)).toEqual('15');
        await page.setNumberPickerValue(page.numberPicker1, '-10');
        expect(await page.getNumberPickerValue(page.numberPicker1)).toEqual('-10');

    });

    it('should display an error is the minimum limit is breached', async () => {

        // Number Picker 1
        await page.setNumberPickerValue(page.numberPicker1, '-11');
        expect(await page.confirmErrorMessage1IsVisible()).toBeTruthy();

        // Number Picker 2
        await page.setNumberPickerValue(page.numberPicker2, '-0.5');
        expect(await page.confirmErrorMessage2IsVisible()).toBeTruthy();

        expect(await imageCompare('number-picker-invalid')).toEqual(0);

    });

    it('should display an error is the maximum limit is breached', async () => {

        // Number Picker 1
        await page.setNumberPickerValue(page.numberPicker1, '11');
        expect(await page.confirmErrorMessage1IsVisible()).toBeTruthy();

        // Number Picker 2
        await page.setNumberPickerValue(page.numberPicker2, '10.5');
        expect(await page.confirmErrorMessage2IsVisible()).toBeTruthy();

    });

    it('should prevent changes by clicking if the minimum limit has been reached', async () => {

        // Number Picker 1
        await page.setNumberPickerValue(page.numberPicker1, '-9');
        await page.decrementNumberPickerValue(page.numberPicker1);
        expect(await page.confirmUpDownControlIsDisabled(page.numberPicker1, 'up')).toBeFalsy();
        expect(await page.confirmUpDownControlIsDisabled(page.numberPicker1, 'down')).toBeTruthy();

        // Number Picker 2
        await page.setNumberPickerValue(page.numberPicker2, '0.1');
        await page.decrementNumberPickerValue(page.numberPicker2);
        expect(await page.confirmUpDownControlIsDisabled(page.numberPicker2, 'up')).toBeFalsy();
        expect(await page.confirmUpDownControlIsDisabled(page.numberPicker2, 'down')).toBeTruthy();

    });

    it('should prevent changes by clicking if the maximum limit has been reached', async () => {

        // Number Picker 1
        await page.setNumberPickerValue(page.numberPicker1, '9');
        await page.incrementNumberPickerValue(page.numberPicker1);
        expect(await page.confirmUpDownControlIsDisabled(page.numberPicker1, 'up')).toBeTruthy();
        expect(await page.confirmUpDownControlIsDisabled(page.numberPicker1, 'down')).toBeFalsy();

        // Number Picker 2
        await page.setNumberPickerValue(page.numberPicker2, '9.9');
        await page.incrementNumberPickerValue(page.numberPicker2);
        expect(await page.confirmUpDownControlIsDisabled(page.numberPicker2, 'up')).toBeTruthy();
        expect(await page.confirmUpDownControlIsDisabled(page.numberPicker2, 'down')).toBeFalsy();

    });

    it('should not continue to display ux-number-picker-invalid class when value changed from above max value to max value', async () => {

        // Number Picker 1
        await page.setNumberPickerValue(page.numberPicker1, '11');
        await page.decrementNumberPickerValue(page.numberPicker1);
        expect(page.numberPicker1.getAttribute('class')).not.toContain('ux-number-picker-invalid');

    });

    it('should not continue to display ux-number-picker-invalid class when value changed from below min value to min value', async () => {

        // Number Picker 1
        await page.setNumberPickerValue(page.numberPicker1, '-11');
        await page.incrementNumberPickerValue(page.numberPicker1);
        expect(page.numberPicker1.getAttribute('class')).not.toContain('ux-number-picker-invalid');

    });
});