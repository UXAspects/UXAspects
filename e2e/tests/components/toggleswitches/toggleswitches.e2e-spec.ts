import { Key } from 'protractor';
import { imageCompare } from '../common/image-compare';
import { ToggleSwitchesPage } from './toggleswitches.po.spec';

describe('ToggleSwitchesPage Tests', () => {

    let page: ToggleSwitchesPage = new ToggleSwitchesPage();
    page.getPage();

    it('should have correct initial states', async () => {
        // Initial values
        expect(await page.confirmIsChecked(page.toggleswitch1)).toBeTruthy();
        expect(await page.confirmIsChecked(page.toggleswitch2)).toBeFalsy();
        expect(await page.confirmIsChecked(page.toggleswitch3)).toBeFalsy();
        expect(await page.confirmIsChecked(page.toggleswitch4)).toBeFalsy();
        expect(await page.text1.getText()).toBe('true');
        expect(await page.text2.getText()).toBe('false');
        expect(await page.text3.getText()).toBe('false');
        expect(await page.text4.getText()).toBe('false');

        // All enabled
        expect(await page.confirmIsDisabled(page.toggleswitch1)).toBeFalsy();
        expect(await page.confirmIsDisabled(page.toggleswitch2)).toBeFalsy();
        expect(await page.confirmIsDisabled(page.toggleswitch3)).toBeFalsy();
        expect(await page.confirmIsDisabled(page.toggleswitch4)).toBeFalsy();

        expect(await imageCompare('toggle-switches-initial')).toEqual(0);

        await page.reset();
    });

    it('should react to clicks', async () => {
        await page.toggleswitch2.click();

        expect(await page.confirmIsChecked(page.toggleswitch1)).toBeTruthy();
        expect(await page.confirmIsChecked(page.toggleswitch2)).toBeTruthy();
        expect(await page.confirmIsChecked(page.toggleswitch3)).toBeFalsy();
        expect(await page.confirmIsChecked(page.toggleswitch4)).toBeFalsy();
        expect(await page.text1.getText()).toBe('true');
        expect(await page.text2.getText()).toBe('true');
        expect(await page.text3.getText()).toBe('false');
        expect(await page.text4.getText()).toBe('false');

        await page.toggleswitch3.click();

        expect(await page.confirmIsChecked(page.toggleswitch1)).toBeTruthy();
        expect(await page.confirmIsChecked(page.toggleswitch2)).toBeTruthy();
        expect(await page.confirmIsChecked(page.toggleswitch3)).toBeTruthy();
        expect(await page.confirmIsChecked(page.toggleswitch4)).toBeFalsy();
        expect<any>(await page.text1.getText()).toBe('true');
        expect<any>(await page.text2.getText()).toBe('true');
        expect<any>(await page.text3.getText()).toBe('true');
        expect<any>(await page.text4.getText()).toBe('false');

        await page.toggleswitch4.click();

        expect(await page.confirmIsChecked(page.toggleswitch1)).toBeTruthy();
        expect(await page.confirmIsChecked(page.toggleswitch2)).toBeTruthy();
        expect(await page.confirmIsChecked(page.toggleswitch3)).toBeTruthy();
        expect(await page.confirmIsChecked(page.toggleswitch4)).toBeTruthy();
        expect(await page.text1.getText()).toBe('true');
        expect(await page.text2.getText()).toBe('true');
        expect(await page.text3.getText()).toBe('true');
        expect(await page.text4.getText()).toBe('true');

        expect(await imageCompare('toggle-switches-click')).toEqual(0);

        await page.reset();
    });

    it('should react to disabling', async () => {
        await page.disableButton.click();

        expect(await page.confirmIsDisabled(page.toggleswitch1)).toBeTruthy();
        expect(await page.confirmIsDisabled(page.toggleswitch2)).toBeFalsy();
        expect(await page.confirmIsDisabled(page.toggleswitch3)).toBeFalsy();
        expect(await page.confirmIsDisabled(page.toggleswitch4)).toBeFalsy();
        expect(await page.text1.getText()).toBe('true');
        expect(await page.text2.getText()).toBe('false');
        expect(await page.text3.getText()).toBe('false');
        expect(await page.text4.getText()).toBe('false');

        await page.toggleswitch1.click();

        expect(await page.confirmIsChecked(page.toggleswitch1)).toBeTruthy();
        expect(await page.confirmIsChecked(page.toggleswitch2)).toBeFalsy();
        expect(await page.confirmIsChecked(page.toggleswitch3)).toBeFalsy();
        expect(await page.confirmIsChecked(page.toggleswitch4)).toBeFalsy();
        expect(await page.text1.getText()).toBe('true');
        expect(await page.text2.getText()).toBe('false');
        expect(await page.text3.getText()).toBe('false');
        expect(await page.text4.getText()).toBe('false');

        await page.toggleswitch4.click();

        expect(await page.confirmIsChecked(page.toggleswitch1)).toBeTruthy();
        expect(await page.confirmIsChecked(page.toggleswitch2)).toBeFalsy();
        expect(await page.confirmIsChecked(page.toggleswitch3)).toBeFalsy();
        expect(await page.confirmIsChecked(page.toggleswitch4)).toBeTruthy();
        expect(await page.text1.getText()).toBe('true');
        expect(await page.text2.getText()).toBe('false');
        expect(await page.text3.getText()).toBe('false');
        expect(await page.text4.getText()).toBe('true');

        expect(await imageCompare('toggle-switches-disabled')).toEqual(0);

        await page.reset();
    });

    it('should toggle the toggle switch when pressing space', async () => {
        await page.toggleByKey(page.toggleswitch1, Key.SPACE);
        await page.toggleByKey(page.toggleswitch2, Key.SPACE);

        expect(await page.confirmIsChecked(page.toggleswitch1)).toBeFalsy();
        expect(await page.confirmIsChecked(page.toggleswitch2)).toBeTruthy();
        expect(await page.confirmIsChecked(page.toggleswitch3)).toBeFalsy();
        expect(await page.confirmIsChecked(page.toggleswitch4)).toBeFalsy();
        expect(await page.text1.getText()).toBe('false');
        expect(await page.text2.getText()).toBe('true');
        expect(await page.text3.getText()).toBe('false');
        expect(await page.text4.getText()).toBe('false');

        await page.reset();
    });
});