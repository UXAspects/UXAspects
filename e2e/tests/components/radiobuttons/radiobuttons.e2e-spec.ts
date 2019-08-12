import { browser, Key } from 'protractor';
import { RadioButtonsPage } from './radiobuttons.po.spec';

describe('RadioButton Tests', () => {

    let page: RadioButtonsPage = new RadioButtonsPage();
    page.getPage();

    it('should have correct initial states', async () => {

        // Initial values.
        expect(await page.confirmIsChecked(page.radiobutton1)).toBeTruthy();
        expect(await page.confirmIsChecked(page.radiobutton2)).toBeFalsy();
        expect(await page.confirmIsChecked(page.radiobutton3)).toBeFalsy();
        expect(await page.confirmIsChecked(page.radiobutton4)).toBeFalsy();
        expect(await page.text1.getText()).toBe('100');

        // All enabled.
        expect(await page.confirmIsDisabled(page.radiobutton1)).toBeFalsy();
        expect(await page.confirmIsDisabled(page.radiobutton2)).toBeFalsy();
        expect(await page.confirmIsDisabled(page.radiobutton3)).toBeFalsy();
        expect(await page.confirmIsDisabled(page.radiobutton4)).toBeFalsy();

        // None with simplified style.
        expect(await page.confirmIsSimplified(page.radiobutton1)).toBeFalsy();
        expect(await page.confirmIsSimplified(page.radiobutton2)).toBeFalsy();
        expect(await page.confirmIsSimplified(page.radiobutton3)).toBeFalsy();
        expect(await page.confirmIsSimplified(page.radiobutton4)).toBeFalsy();

        expect(await browser.imageComparison.checkScreen('radio-buttons-initial')).toEqual(0);

    });

    it('should react to clicks', async () => {

        await page.radiobutton2.click();

        expect(await page.confirmIsChecked(page.radiobutton1)).toBeFalsy();
        expect(await page.confirmIsChecked(page.radiobutton2)).toBeTruthy();
        expect(await page.confirmIsChecked(page.radiobutton3)).toBeFalsy();
        expect(await page.confirmIsChecked(page.radiobutton4)).toBeFalsy();
        expect(await page.text1.getText()).toBe('string');

        await page.radiobutton3.click();

        expect(await page.confirmIsChecked(page.radiobutton1)).toBeFalsy();
        expect(await page.confirmIsChecked(page.radiobutton2)).toBeFalsy();
        expect(await page.confirmIsChecked(page.radiobutton3)).toBeTruthy();
        expect(await page.confirmIsChecked(page.radiobutton4)).toBeFalsy();
        expect(await page.text1.getText()).toBe('[object Object]');

        await page.radiobutton4.click();

        expect(await page.confirmIsChecked(page.radiobutton1)).toBeFalsy();
        expect(await page.confirmIsChecked(page.radiobutton2)).toBeFalsy();
        expect(await page.confirmIsChecked(page.radiobutton3)).toBeFalsy();
        expect(await page.confirmIsChecked(page.radiobutton4)).toBeTruthy();
        expect(await page.text1.getText()).toBe('Wrap-Text');

        await page.radiobutton1.click();

        expect(await page.confirmIsChecked(page.radiobutton1)).toBeTruthy();
        expect(await page.confirmIsChecked(page.radiobutton2)).toBeFalsy();
        expect(await page.confirmIsChecked(page.radiobutton3)).toBeFalsy();
        expect(await page.confirmIsChecked(page.radiobutton4)).toBeFalsy();
        expect(await page.text1.getText()).toBe('100');

    });

    it('should react to disabling', async () => {

        await page.disableFirstButton.click();

        expect(await page.confirmIsDisabled(page.radiobutton1)).toBeTruthy();
        expect(await page.confirmIsDisabled(page.radiobutton2)).toBeFalsy();
        expect(await page.confirmIsDisabled(page.radiobutton3)).toBeFalsy();
        expect(await page.confirmIsDisabled(page.radiobutton4)).toBeFalsy();
        expect(await page.text1.getText()).toBe('100');

        await page.radiobutton1.click();

        expect(await page.confirmIsChecked(page.radiobutton1)).toBeTruthy();
        expect(await page.confirmIsChecked(page.radiobutton2)).toBeFalsy();
        expect(await page.confirmIsChecked(page.radiobutton3)).toBeFalsy();
        expect(await page.confirmIsChecked(page.radiobutton4)).toBeFalsy();
        expect(await page.text1.getText()).toBe('100');

        await page.radiobutton4.click();

        expect(await page.confirmIsChecked(page.radiobutton1)).toBeFalsy();
        expect(await page.confirmIsChecked(page.radiobutton2)).toBeFalsy();
        expect(await page.confirmIsChecked(page.radiobutton3)).toBeFalsy();
        expect(await page.confirmIsChecked(page.radiobutton4)).toBeTruthy();
        expect(await page.text1.getText()).toBe('Wrap-Text');

        expect(await browser.imageComparison.checkScreen('radio-buttons-disabled')).toEqual(0);
    });

    it('should react to setting to simplified style', async () => {

        await page.changeToSimplified.click();

        expect(await page.confirmIsSimplified(page.radiobutton1)).toBeTruthy();
        expect(await page.confirmIsSimplified(page.radiobutton2)).toBeTruthy();
        expect(await page.confirmIsSimplified(page.radiobutton3)).toBeTruthy();
        expect(await page.confirmIsSimplified(page.radiobutton4)).toBeTruthy();

        expect(await browser.imageComparison.checkScreen('radio-buttons-simplified')).toEqual(0);

    });

    it('should toggle the radio button when pressing space', async () => {

        await page.toggleByKey(page.radiobutton2, Key.SPACE);

        expect(await page.confirmIsChecked(page.radiobutton1)).toBeFalsy();
        expect(await page.confirmIsChecked(page.radiobutton2)).toBeTruthy();
        expect(await page.confirmIsChecked(page.radiobutton3)).toBeFalsy();
        expect(await page.confirmIsChecked(page.radiobutton4)).toBeFalsy();
        expect(await page.text1.getText()).toBe('string');

    });
});