import { browser, Key } from 'protractor';
import { ToggleSwitchesPage } from './toggleswitches.po.spec';

describe('ToggleSwitchesPage Tests', () => {

  let page: ToggleSwitchesPage;
  let browserName: string;

  beforeEach(() => {
    page = new ToggleSwitchesPage();
    page.getPage();
    
    browser.getCapabilities().then(function(caps) {
        browserName = caps.get('browserName');
    });
  });

  it('should have correct initial states', () => {
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
  });

  it('should react to clicks', () => {
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
  });

  it('should react to disabling', () => {
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
  });

  it('should toggle the toggle switch when pressing space', () => {
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
  });
});