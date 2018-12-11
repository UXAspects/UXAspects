import { Key } from 'protractor';
import { ToggleSwitchesPage } from './toggleswitches.po.spec';

describe('ToggleSwitchesPage Tests', () => {

    let page: ToggleSwitchesPage = new ToggleSwitchesPage();
    page.getPage();

    it('should have correct initial states', async () => {
        // Initial values
        expect(page.confirmIsChecked(page.toggleswitch1)).toBeTruthy();
        expect(page.confirmIsChecked(page.toggleswitch2)).toBeFalsy();
        expect(page.confirmIsChecked(page.toggleswitch3)).toBeFalsy();
        expect(page.confirmIsChecked(page.toggleswitch4)).toBeFalsy();
        expect<any>(page.text1.getText()).toBe('true');
        expect<any>(page.text2.getText()).toBe('false');
        expect<any>(page.text3.getText()).toBe('false');
        expect<any>(page.text4.getText()).toBe('false');

        // All enabled
        expect(page.confirmIsDisabled(page.toggleswitch1)).toBeFalsy();
        expect(page.confirmIsDisabled(page.toggleswitch2)).toBeFalsy();
        expect(page.confirmIsDisabled(page.toggleswitch3)).toBeFalsy();
        expect(page.confirmIsDisabled(page.toggleswitch4)).toBeFalsy();

        await page.reset();
    });

    it('should react to clicks', async () => {
        page.toggleswitch2.click();

        expect(page.confirmIsChecked(page.toggleswitch1)).toBeTruthy();
        expect(page.confirmIsChecked(page.toggleswitch2)).toBeTruthy();
        expect(page.confirmIsChecked(page.toggleswitch3)).toBeFalsy();
        expect(page.confirmIsChecked(page.toggleswitch4)).toBeFalsy();
        expect<any>(page.text1.getText()).toBe('true');
        expect<any>(page.text2.getText()).toBe('true');
        expect<any>(page.text3.getText()).toBe('false');
        expect<any>(page.text4.getText()).toBe('false');

        page.toggleswitch3.click();

        expect(page.confirmIsChecked(page.toggleswitch1)).toBeTruthy();
        expect(page.confirmIsChecked(page.toggleswitch2)).toBeTruthy();
        expect(page.confirmIsChecked(page.toggleswitch3)).toBeTruthy();
        expect(page.confirmIsChecked(page.toggleswitch4)).toBeFalsy();
        expect<any>(page.text1.getText()).toBe('true');
        expect<any>(page.text2.getText()).toBe('true');
        expect<any>(page.text3.getText()).toBe('true');
        expect<any>(page.text4.getText()).toBe('false');

        page.toggleswitch4.click();

        expect(page.confirmIsChecked(page.toggleswitch1)).toBeTruthy();
        expect(page.confirmIsChecked(page.toggleswitch2)).toBeTruthy();
        expect(page.confirmIsChecked(page.toggleswitch3)).toBeTruthy();
        expect(page.confirmIsChecked(page.toggleswitch4)).toBeTruthy();
        expect<any>(page.text1.getText()).toBe('true');
        expect<any>(page.text2.getText()).toBe('true');
        expect<any>(page.text3.getText()).toBe('true');
        expect<any>(page.text4.getText()).toBe('true');

        await page.reset();
    });

    it('should react to disabling', async () => {
        page.disableButton.click();

        expect(page.confirmIsDisabled(page.toggleswitch1)).toBeTruthy();
        expect(page.confirmIsDisabled(page.toggleswitch2)).toBeFalsy();
        expect(page.confirmIsDisabled(page.toggleswitch3)).toBeFalsy();
        expect(page.confirmIsDisabled(page.toggleswitch4)).toBeFalsy();
        expect<any>(page.text1.getText()).toBe('true');
        expect<any>(page.text2.getText()).toBe('false');
        expect<any>(page.text3.getText()).toBe('false');
        expect<any>(page.text4.getText()).toBe('false');

        page.toggleswitch1.click();

        expect(page.confirmIsChecked(page.toggleswitch1)).toBeTruthy();
        expect(page.confirmIsChecked(page.toggleswitch2)).toBeFalsy();
        expect(page.confirmIsChecked(page.toggleswitch3)).toBeFalsy();
        expect(page.confirmIsChecked(page.toggleswitch4)).toBeFalsy();
        expect<any>(page.text1.getText()).toBe('true');
        expect<any>(page.text2.getText()).toBe('false');
        expect<any>(page.text3.getText()).toBe('false');
        expect<any>(page.text4.getText()).toBe('false');

        page.toggleswitch4.click();

        expect(page.confirmIsChecked(page.toggleswitch1)).toBeTruthy();
        expect(page.confirmIsChecked(page.toggleswitch2)).toBeFalsy();
        expect(page.confirmIsChecked(page.toggleswitch3)).toBeFalsy();
        expect(page.confirmIsChecked(page.toggleswitch4)).toBeTruthy();
        expect<any>(page.text1.getText()).toBe('true');
        expect<any>(page.text2.getText()).toBe('false');
        expect<any>(page.text3.getText()).toBe('false');
        expect<any>(page.text4.getText()).toBe('true');

        await page.reset();
    });

    it('should toggle the toggle switch when pressing space', async () => {
        page.toggleByKey(page.toggleswitch1, Key.SPACE);
        page.toggleByKey(page.toggleswitch2, Key.SPACE);

        expect(page.confirmIsChecked(page.toggleswitch1)).toBeFalsy();
        expect(page.confirmIsChecked(page.toggleswitch2)).toBeTruthy();
        expect(page.confirmIsChecked(page.toggleswitch3)).toBeFalsy();
        expect(page.confirmIsChecked(page.toggleswitch4)).toBeFalsy();
        expect<any>(page.text1.getText()).toBe('false');
        expect<any>(page.text2.getText()).toBe('true');
        expect<any>(page.text3.getText()).toBe('false');
        expect<any>(page.text4.getText()).toBe('false');

        await page.reset();
    });
});