import { browser, Key } from 'protractor';
import { CheckBoxesPage } from './checkbox.po.spec';

describe('Checkbox Tests', () => {

  let page: CheckBoxesPage;
  let browserName: string;

  beforeEach(() => {
    page = new CheckBoxesPage();
    page.getPage();
    
    browser.getCapabilities().then(function(caps) {
        browserName = caps.get('browserName');
    });
  });

  it('should have correct initial states', () => {
    if (browserName === 'internet explorer') {
        console.log('Skipping test in ' + browserName);
        return;
    }   
    
    // Initial values.
    expect(page.confirmIsChecked(page.checkbox1)).toBeTruthy();
    expect(page.confirmIsChecked(page.checkbox2)).toBeFalsy();
    expect(page.confirmIsChecked(page.checkbox3)).toBeFalsy();
    expect(page.confirmIsChecked(page.checkbox4)).toBeFalsy();
    expect<any>(page.text1.getText()).toBe('true');
    expect<any>(page.text2.getText()).toBe('false');
    expect<any>(page.text3.getText()).toBe('false');
    expect<any>(page.text4.getText()).toBe('false');

    // All enabled.
    expect(page.confirmIsDisabled(page.checkbox1)).toBeFalsy();
    expect(page.confirmIsDisabled(page.checkbox2)).toBeFalsy();
    expect(page.confirmIsDisabled(page.checkbox3)).toBeFalsy();
    expect(page.confirmIsDisabled(page.checkbox4)).toBeFalsy();

    // None indeterminate.
    expect(page.confirmIsIndeterminate(page.checkbox1)).toBeFalsy();
    expect(page.confirmIsIndeterminate(page.checkbox2)).toBeFalsy();
    expect(page.confirmIsIndeterminate(page.checkbox3)).toBeFalsy();
    expect(page.confirmIsIndeterminate(page.checkbox4)).toBeFalsy();

    // None with simplified style.
    expect(page.confirmIsSimplified(page.checkbox1)).toBeFalsy();
    expect(page.confirmIsSimplified(page.checkbox2)).toBeFalsy();
    expect(page.confirmIsSimplified(page.checkbox3)).toBeFalsy();
    expect(page.confirmIsSimplified(page.checkbox4)).toBeFalsy();
  });

  it('should react to clicks', () => {
    page.checkbox2.click();
    page.checkbox3.click();

    expect(page.confirmIsChecked(page.checkbox1)).toBeTruthy();
    expect(page.confirmIsChecked(page.checkbox2)).toBeTruthy();
    expect(page.confirmIsChecked(page.checkbox3)).toBeTruthy();
    expect(page.confirmIsChecked(page.checkbox4)).toBeFalsy();
    expect<any>(page.text1.getText()).toBe('true');
    expect<any>(page.text2.getText()).toBe('true');
    expect<any>(page.text3.getText()).toBe('true');
    expect<any>(page.text4.getText()).toBe('false');

    page.checkbox1.click();
    page.checkbox4.click();

    expect(page.confirmIsChecked(page.checkbox1)).toBeFalsy();
    expect(page.confirmIsChecked(page.checkbox2)).toBeTruthy();
    expect(page.confirmIsChecked(page.checkbox3)).toBeTruthy();
    expect(page.confirmIsChecked(page.checkbox4)).toBeTruthy();
    expect<any>(page.text1.getText()).toBe('false');
    expect<any>(page.text2.getText()).toBe('true');
    expect<any>(page.text3.getText()).toBe('true');
    expect<any>(page.text4.getText()).toBe('true');
  });

  it('should react to disabling', () => {
    page.disableButton.click();

    expect(page.confirmIsDisabled(page.checkbox1)).toBeTruthy();
    expect(page.confirmIsDisabled(page.checkbox2)).toBeFalsy();
    expect(page.confirmIsDisabled(page.checkbox3)).toBeFalsy();
    expect(page.confirmIsDisabled(page.checkbox4)).toBeFalsy();

    page.checkbox1.click();
    page.checkbox4.click();

    expect(page.confirmIsChecked(page.checkbox1)).toBeTruthy();
    expect(page.confirmIsChecked(page.checkbox2)).toBeFalsy();
    expect(page.confirmIsChecked(page.checkbox3)).toBeFalsy();
    expect(page.confirmIsChecked(page.checkbox4)).toBeTruthy();
    expect<any>(page.text1.getText()).toBe('true');
    expect<any>(page.text2.getText()).toBe('false');
    expect<any>(page.text3.getText()).toBe('false');
    expect<any>(page.text4.getText()).toBe('true');
  });

  it('should react to setting to indeterminate state', () => {
    page.setToIndeterminateState.click();

    expect(page.confirmIsIndeterminate(page.checkbox1)).toBeFalsy();
    expect(page.confirmIsIndeterminate(page.checkbox2)).toBeTruthy();
    expect(page.confirmIsIndeterminate(page.checkbox3)).toBeFalsy();
    expect(page.confirmIsIndeterminate(page.checkbox4)).toBeFalsy();
    expect<any>(page.text1.getText()).toBe('true');
    expect<any>(page.text2.getText()).toBe('-1');
    expect<any>(page.text3.getText()).toBe('false');
    expect<any>(page.text4.getText()).toBe('false');
  });

  it('should react to setting to simplified style', () => {
    page.changeToSimplified.click();

    expect(page.confirmIsSimplified(page.checkbox1)).toBeTruthy();
    expect(page.confirmIsSimplified(page.checkbox2)).toBeTruthy();
    expect(page.confirmIsSimplified(page.checkbox3)).toBeTruthy();
    expect(page.confirmIsSimplified(page.checkbox4)).toBeTruthy();
  });

  it('should toggle the checkbox when pressing space', () => {
    if ((browserName === 'internet explorer') || (browserName === 'firefox')) {
        console.log('Skipping test in ' + browserName);
        return;
    }    
    
    page.toggleByKey(page.checkbox1, Key.SPACE);
    page.toggleByKey(page.checkbox2, Key.SPACE);

    expect(page.confirmIsChecked(page.checkbox1)).toBeFalsy();
    expect(page.confirmIsChecked(page.checkbox2)).toBeTruthy();
  });
});