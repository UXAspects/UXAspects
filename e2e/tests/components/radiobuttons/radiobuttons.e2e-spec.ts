import { browser, Key } from 'protractor';
import { imageCompare } from '../common/image-compare';
import { RadioButtonsPage } from './radiobuttons.po.spec';

describe('RadioButton Tests', () => {

    let page: RadioButtonsPage = new RadioButtonsPage();

    beforeAll(async () => {
        await page.getPage();
    });

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

        expect(await imageCompare('radio-buttons-initial')).toEqual(0);

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

        expect(await imageCompare('radio-buttons-disabled')).toEqual(0);
    });

    it('should react to setting to simplified style', async () => {

        await page.changeToSimplified.click();

        expect(await page.confirmIsSimplified(page.radiobutton1)).toBeTruthy();
        expect(await page.confirmIsSimplified(page.radiobutton2)).toBeTruthy();
        expect(await page.confirmIsSimplified(page.radiobutton3)).toBeTruthy();
        expect(await page.confirmIsSimplified(page.radiobutton4)).toBeTruthy();

        expect(await imageCompare('radio-buttons-simplified')).toEqual(0);

    });

    describe('Keyboard Tests', () => {

        beforeAll(async () => {
            // Re-enabling first radio button
            await page.disableFirstButton.click();
        });

        it('should focus the top radio button and toggle the radio button when pressing space', async () => {

            await page.removeSelected.click();
            await page.topFocus.click();
            await browser.actions().sendKeys(Key.TAB).perform();

            expect(await page.confirmIsFocused(page.radiobutton1)).toBeTruthy();
            expect(await page.confirmIsFocused(page.radiobutton2)).toBeFalsy();
            expect(await page.confirmIsFocused(page.radiobutton3)).toBeFalsy();
            expect(await page.confirmIsFocused(page.radiobutton4)).toBeFalsy();

            await browser.actions().sendKeys(Key.SPACE).perform();

            expect(await page.confirmIsChecked(page.radiobutton1)).toBeTruthy();
            expect(await page.confirmIsChecked(page.radiobutton2)).toBeFalsy();
            expect(await page.confirmIsChecked(page.radiobutton3)).toBeFalsy();
            expect(await page.confirmIsChecked(page.radiobutton4)).toBeFalsy();
            expect(await page.text1.getText()).toBe('100');

        });

        it('should focus the selected radio button', async () => {

            await page.radiobutton3.click();
            expect(await page.confirmIsChecked(page.radiobutton3)).toBeTruthy();

            await page.topFocus.click();
            await browser.actions().sendKeys(Key.TAB).perform();

            expect(await page.confirmIsChecked(page.radiobutton1)).toBeFalsy();
            expect(await page.confirmIsChecked(page.radiobutton2)).toBeFalsy();
            expect(await page.confirmIsChecked(page.radiobutton3)).toBeTruthy();
            expect(await page.confirmIsChecked(page.radiobutton4)).toBeFalsy();

        });

        it('should allow the first enabled radio button to be focusable when one is disabled', async () => {

            await page.removeSelected.click();
            await page.disableFirstButton.click();

            await page.topFocus.click();
            await browser.actions().sendKeys(Key.TAB).perform();

            expect(await page.confirmIsFocused(page.radiobutton1)).toBeFalsy();
            expect(await page.confirmIsFocused(page.radiobutton2)).toBeTruthy();
            expect(await page.confirmIsFocused(page.radiobutton3)).toBeFalsy();
            expect(await page.confirmIsFocused(page.radiobutton4)).toBeFalsy();

        });

        it('should only allow one radio button to be focused', async () => {

            await page.removeSelected.click();

            await page.topFocus.click();
            await browser.actions().sendKeys(Key.TAB).perform();

            expect(await page.confirmIsFocused(page.radiobutton1)).toBeFalsy();
            expect(await page.confirmIsFocused(page.radiobutton2)).toBeTruthy();
            expect(await page.confirmIsFocused(page.radiobutton3)).toBeFalsy();
            expect(await page.confirmIsFocused(page.radiobutton4)).toBeFalsy();

            await browser.actions().sendKeys(Key.TAB).perform();

            expect(await page.confirmIsFocused(page.radiobutton1)).toBeFalsy();
            expect(await page.confirmIsFocused(page.radiobutton2)).toBeFalsy();
            expect(await page.confirmIsFocused(page.radiobutton3)).toBeFalsy();
            expect(await page.confirmIsFocused(page.radiobutton4)).toBeFalsy();

        });
    });
});