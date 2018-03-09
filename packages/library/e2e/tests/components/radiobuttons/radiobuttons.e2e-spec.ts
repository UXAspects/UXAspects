import { browser, element, by, Key } from 'protractor';
import { RadioButtonsPage } from './radiobuttons.po.spec';

describe('RadioButton Tests', () => {

  let page: RadioButtonsPage;
  let browserName: string;

  beforeEach(() => {
    page = new RadioButtonsPage();
    page.getPage();
    
    browser.getCapabilities().then(function(caps) {
        browserName = caps.get('browserName');
    });
  });

  it('should have correct initial states', () => {
  
    // Initial values.
    expect(page.confirmIsChecked(page.radiobutton1)).toBeTruthy();
    expect(page.confirmIsChecked(page.radiobutton2)).toBeFalsy();
    expect(page.confirmIsChecked(page.radiobutton3)).toBeFalsy();
    expect(page.confirmIsChecked(page.radiobutton4)).toBeFalsy();
    expect<any>(page.text1.getText()).toBe('100');

    // All enabled.
    expect(page.confirmIsDisabled(page.radiobutton1)).toBeFalsy();
    expect(page.confirmIsDisabled(page.radiobutton2)).toBeFalsy();
    expect(page.confirmIsDisabled(page.radiobutton3)).toBeFalsy();
    expect(page.confirmIsDisabled(page.radiobutton4)).toBeFalsy();

    // None with simplified style.
    expect(page.confirmIsSimplified(page.radiobutton1)).toBeFalsy();
    expect(page.confirmIsSimplified(page.radiobutton2)).toBeFalsy();
    expect(page.confirmIsSimplified(page.radiobutton3)).toBeFalsy();
    expect(page.confirmIsSimplified(page.radiobutton4)).toBeFalsy();
    
  });

  it('should react to clicks', () => {
  
    page.radiobutton2.click();

    expect(page.confirmIsChecked(page.radiobutton1)).toBeFalsy();
    expect(page.confirmIsChecked(page.radiobutton2)).toBeTruthy();
    expect(page.confirmIsChecked(page.radiobutton3)).toBeFalsy();
    expect(page.confirmIsChecked(page.radiobutton4)).toBeFalsy();
    expect<any>(page.text1.getText()).toBe('string');

    page.radiobutton3.click();

    expect(page.confirmIsChecked(page.radiobutton1)).toBeFalsy();
    expect(page.confirmIsChecked(page.radiobutton2)).toBeFalsy();
    expect(page.confirmIsChecked(page.radiobutton3)).toBeTruthy();
    expect(page.confirmIsChecked(page.radiobutton4)).toBeFalsy();
    expect<any>(page.text1.getText()).toBe('[object Object]');

    page.radiobutton4.click();

    expect(page.confirmIsChecked(page.radiobutton1)).toBeFalsy();
    expect(page.confirmIsChecked(page.radiobutton2)).toBeFalsy();
    expect(page.confirmIsChecked(page.radiobutton3)).toBeFalsy();
    expect(page.confirmIsChecked(page.radiobutton4)).toBeTruthy();
    expect<any>(page.text1.getText()).toBe('Wrap-Text');

    page.radiobutton1.click();

    expect(page.confirmIsChecked(page.radiobutton1)).toBeTruthy();
    expect(page.confirmIsChecked(page.radiobutton2)).toBeFalsy();
    expect(page.confirmIsChecked(page.radiobutton3)).toBeFalsy();
    expect(page.confirmIsChecked(page.radiobutton4)).toBeFalsy();
    expect<any>(page.text1.getText()).toBe('100');
    
  });

  it('should react to disabling', () => {
  
    page.disableFirstButton.click();

    expect(page.confirmIsDisabled(page.radiobutton1)).toBeTruthy();
    expect(page.confirmIsDisabled(page.radiobutton2)).toBeFalsy();
    expect(page.confirmIsDisabled(page.radiobutton3)).toBeFalsy();
    expect(page.confirmIsDisabled(page.radiobutton4)).toBeFalsy();
    expect<any>(page.text1.getText()).toBe('100');

    page.radiobutton1.click();

    expect(page.confirmIsChecked(page.radiobutton1)).toBeTruthy();
    expect(page.confirmIsChecked(page.radiobutton2)).toBeFalsy();
    expect(page.confirmIsChecked(page.radiobutton3)).toBeFalsy();
    expect(page.confirmIsChecked(page.radiobutton4)).toBeFalsy();
    expect<any>(page.text1.getText()).toBe('100');

    page.radiobutton4.click();

    expect(page.confirmIsChecked(page.radiobutton1)).toBeFalsy();
    expect(page.confirmIsChecked(page.radiobutton2)).toBeFalsy();
    expect(page.confirmIsChecked(page.radiobutton3)).toBeFalsy();
    expect(page.confirmIsChecked(page.radiobutton4)).toBeTruthy();
    expect<any>(page.text1.getText()).toBe('Wrap-Text');
    
  });

  it('should react to setting to simplified style', () => {
  
    page.changeToSimplified.click();

    expect(page.confirmIsSimplified(page.radiobutton1)).toBeTruthy();
    expect(page.confirmIsSimplified(page.radiobutton2)).toBeTruthy();
    expect(page.confirmIsSimplified(page.radiobutton3)).toBeTruthy();
    expect(page.confirmIsSimplified(page.radiobutton4)).toBeTruthy();
    
  });

  it('should toggle the radio button when pressing space', () => {
  
    page.toggleByKey(page.radiobutton2, Key.SPACE);

    expect(page.confirmIsChecked(page.radiobutton1)).toBeFalsy();
    expect(page.confirmIsChecked(page.radiobutton2)).toBeTruthy();
    expect(page.confirmIsChecked(page.radiobutton3)).toBeFalsy();
    expect(page.confirmIsChecked(page.radiobutton4)).toBeFalsy();
    expect<any>(page.text1.getText()).toBe('string');
    
  });
});