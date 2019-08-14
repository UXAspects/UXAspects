import { Key } from 'protractor';
import { imageCompare } from '../common/image-compare';
import { CheckBoxesPage } from './checkbox.po.spec';

describe('Checkbox Tests', () => {

    let page: CheckBoxesPage = new CheckBoxesPage();

    beforeAll(async () => {
        await page.getPage();
    });

    it('should have correct initial states', async () => {

        // Initial values.
        expect(await page.confirmIsChecked(page.checkbox1)).toBeTruthy();
        expect(await page.confirmIsChecked(page.checkbox2)).toBeFalsy();
        expect(await page.confirmIsChecked(page.checkbox3)).toBeFalsy();
        expect(await page.confirmIsChecked(page.checkbox4)).toBeFalsy();
        expect(await page.text1.getText()).toBe('true');
        expect(await page.text2.getText()).toBe('false');
        expect(await page.text3.getText()).toBe('false');
        expect(await page.text4.getText()).toBe('false');

        // All enabled.
        expect(await page.confirmIsDisabled(page.checkbox1)).toBeFalsy();
        expect(await page.confirmIsDisabled(page.checkbox2)).toBeFalsy();
        expect(await page.confirmIsDisabled(page.checkbox3)).toBeFalsy();
        expect(await page.confirmIsDisabled(page.checkbox4)).toBeFalsy();

        // None indeterminate.
        expect(await page.confirmIsIndeterminate(page.checkbox1)).toBeFalsy();
        expect(await page.confirmIsIndeterminate(page.checkbox2)).toBeFalsy();
        expect(await page.confirmIsIndeterminate(page.checkbox3)).toBeFalsy();
        expect(await page.confirmIsIndeterminate(page.checkbox4)).toBeFalsy();

        // None with simplified style.
        expect(await page.confirmIsSimplified(page.checkbox1)).toBeFalsy();
        expect(await page.confirmIsSimplified(page.checkbox2)).toBeFalsy();
        expect(await page.confirmIsSimplified(page.checkbox3)).toBeFalsy();
        expect(await page.confirmIsSimplified(page.checkbox4)).toBeFalsy();

        expect(await imageCompare('checkbox-initial')).toEqual(0);
    });

    it('should react to clicks', async () => {

        // reset the state
        await page.resetBtn.click();

        await page.checkbox2.click();
        await page.checkbox3.click();

        expect(await page.confirmIsChecked(page.checkbox1)).toBeTruthy();
        expect(await page.confirmIsChecked(page.checkbox2)).toBeTruthy();
        expect(await page.confirmIsChecked(page.checkbox3)).toBeTruthy();
        expect(await page.confirmIsChecked(page.checkbox4)).toBeFalsy();
        expect(await page.text1.getText()).toBe('true');
        expect(await page.text2.getText()).toBe('true');
        expect(await page.text3.getText()).toBe('true');
        expect(await page.text4.getText()).toBe('false');

        expect(await imageCompare('checkbox-active')).toEqual(0);

        await page.checkbox1.click();
        await page.checkbox4.click();

        expect(await page.confirmIsChecked(page.checkbox1)).toBeFalsy();
        expect(await page.confirmIsChecked(page.checkbox2)).toBeTruthy();
        expect(await page.confirmIsChecked(page.checkbox3)).toBeTruthy();
        expect(await page.confirmIsChecked(page.checkbox4)).toBeTruthy();
        expect(await page.text1.getText()).toBe('false');
        expect(await page.text2.getText()).toBe('true');
        expect(await page.text3.getText()).toBe('true');
        expect(await page.text4.getText()).toBe('true');
    });

    it('should react to disabling', async () => {

        // reset the state
        await page.resetBtn.click();

        await page.disableButton.click();

        expect(await page.confirmIsDisabled(page.checkbox1)).toBeTruthy();
        expect(await page.confirmIsDisabled(page.checkbox2)).toBeFalsy();
        expect(await page.confirmIsDisabled(page.checkbox3)).toBeFalsy();
        expect(await page.confirmIsDisabled(page.checkbox4)).toBeFalsy();

        await page.checkbox1.click();
        await page.checkbox4.click();

        expect(await page.confirmIsChecked(page.checkbox1)).toBeTruthy();
        expect(await page.confirmIsChecked(page.checkbox2)).toBeFalsy();
        expect(await page.confirmIsChecked(page.checkbox3)).toBeFalsy();
        expect(await page.confirmIsChecked(page.checkbox4)).toBeTruthy();
        expect(await page.text1.getText()).toBe('true');
        expect(await page.text2.getText()).toBe('false');
        expect(await page.text3.getText()).toBe('false');
        expect(await page.text4.getText()).toBe('true');

        expect(await imageCompare('checkbox-disabled')).toEqual(0);
    });

    it('should react to setting to indeterminate state', async () => {

        // reset the state
        await page.resetBtn.click();

        await page.setToIndeterminateState.click();

        expect(await page.confirmIsIndeterminate(page.checkbox1)).toBeFalsy();
        expect(await page.confirmIsIndeterminate(page.checkbox2)).toBeTruthy();
        expect(await page.confirmIsIndeterminate(page.checkbox3)).toBeFalsy();
        expect(await page.confirmIsIndeterminate(page.checkbox4)).toBeFalsy();
        expect(await page.text1.getText()).toBe('true');
        expect(await page.text2.getText()).toBe('-1');
        expect(await page.text3.getText()).toBe('false');
        expect(await page.text4.getText()).toBe('false');

        expect(await imageCompare('checkbox-intermediate')).toEqual(0);
    });

    it('should react to setting to simplified style', async () => {

        // reset the state
        await page.resetBtn.click();

        await page.changeToSimplified.click();

        expect(await page.confirmIsSimplified(page.checkbox1)).toBeTruthy();
        expect(await page.confirmIsSimplified(page.checkbox2)).toBeTruthy();
        expect(await page.confirmIsSimplified(page.checkbox3)).toBeTruthy();
        expect(await page.confirmIsSimplified(page.checkbox4)).toBeTruthy();

        expect(await imageCompare('checkbox-simplified')).toEqual(0);
    });

    it('should toggle the checkbox when pressing space', async () => {

        // reset the state
        await page.resetBtn.click();

        await page.toggleByKey(page.checkbox1, Key.SPACE);
        await page.toggleByKey(page.checkbox2, Key.SPACE);

        expect(await page.confirmIsChecked(page.checkbox1)).toBeFalsy();
        expect(await page.confirmIsChecked(page.checkbox2)).toBeTruthy();
    });
});