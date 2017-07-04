import { browser, Key } from 'protractor';
import { CheckBoxesPage } from './checkbox.po.spec';

describe('Checkbox Tests', () => {

  let pageObject: CheckBoxesPage;
  let browserName: string;

  beforeEach(() => {
    pageObject = new CheckBoxesPage();
    pageObject.getPage();
    
    browser.getCapabilities().then(function(caps) {
        browserName = caps.get('browserName');
    });
  });

  it('should have the correct tab title', () => {
    let expectedTitle = 'UX Aspects E2E Tests';
    expect<any>(pageObject.titleText).toEqual(expectedTitle);
  });

  it('should have correct initial states', () => {
    if (browserName === 'internet explorer') {
        console.log('Skipping test in ' + browserName);
        return;
    }   
    
    // Initial values
    expect(pageObject.checkbox1.$('div.ux-checked').isPresent()).toBeTruthy();
    expect(pageObject.checkbox2.$('div.ux-checked').isPresent()).toBeFalsy();
    expect(pageObject.checkbox3.$('div.ux-checked').isPresent()).toBeFalsy();
    expect(pageObject.checkbox4.$('div.ux-checked').isPresent()).toBeFalsy();
    expect<any>(pageObject.text1.getText()).toBe('true');
    expect<any>(pageObject.text2.getText()).toBe('false');
    expect<any>(pageObject.text3.getText()).toBe('false');
    expect<any>(pageObject.text4.getText()).toBe('false');

    // All enabled
    expect(pageObject.checkbox1.$('div.ux-disabled').isPresent()).toBeFalsy();
    expect(pageObject.checkbox2.$('div.ux-disabled').isPresent()).toBeFalsy();
    expect(pageObject.checkbox3.$('div.ux-disabled').isPresent()).toBeFalsy();
    expect(pageObject.checkbox4.$('div.ux-disabled').isPresent()).toBeFalsy();

    // None indeterminate
    expect(pageObject.checkbox1.$('div.ux-indeterminate').isPresent()).toBeFalsy();
    expect(pageObject.checkbox2.$('div.ux-indeterminate').isPresent()).toBeFalsy();
    expect(pageObject.checkbox3.$('div.ux-indeterminate').isPresent()).toBeFalsy();
    expect(pageObject.checkbox4.$('div.ux-indeterminate').isPresent()).toBeFalsy();

    // None with simplified style
    expect(pageObject.checkbox1.$('div.ux-simplified').isPresent()).toBeFalsy();
    expect(pageObject.checkbox2.$('div.ux-simplified').isPresent()).toBeFalsy();
    expect(pageObject.checkbox3.$('div.ux-simplified').isPresent()).toBeFalsy();
    expect(pageObject.checkbox4.$('div.ux-simplified').isPresent()).toBeFalsy();
  });

  it('should react to clicks', () => {
    pageObject.checkbox2.click();
    pageObject.checkbox3.click();

    expect(pageObject.checkbox1.$('div.ux-checked').isPresent()).toBeTruthy();
    expect(pageObject.checkbox2.$('div.ux-checked').isPresent()).toBeTruthy();
    expect(pageObject.checkbox3.$('div.ux-checked').isPresent()).toBeTruthy();
    expect(pageObject.checkbox4.$('div.ux-checked').isPresent()).toBeFalsy();
    expect<any>(pageObject.text1.getText()).toBe('true');
    expect<any>(pageObject.text2.getText()).toBe('true');
    expect<any>(pageObject.text3.getText()).toBe('true');
    expect<any>(pageObject.text4.getText()).toBe('false');

    pageObject.checkbox1.click();
    pageObject.checkbox4.click();

    expect(pageObject.checkbox1.$('div.ux-checked').isPresent()).toBeFalsy();
    expect(pageObject.checkbox2.$('div.ux-checked').isPresent()).toBeTruthy();
    expect(pageObject.checkbox3.$('div.ux-checked').isPresent()).toBeTruthy();
    expect(pageObject.checkbox4.$('div.ux-checked').isPresent()).toBeTruthy();
    expect<any>(pageObject.text1.getText()).toBe('false');
    expect<any>(pageObject.text2.getText()).toBe('true');
    expect<any>(pageObject.text3.getText()).toBe('true');
    expect<any>(pageObject.text4.getText()).toBe('true');
  });

  it('should react to disabling', () => {
    pageObject.button1.click();

    expect(pageObject.checkbox1.$('div.ux-disabled').isPresent()).toBeTruthy();
    expect(pageObject.checkbox2.$('div.ux-disabled').isPresent()).toBeFalsy();
    expect(pageObject.checkbox3.$('div.ux-disabled').isPresent()).toBeFalsy();
    expect(pageObject.checkbox4.$('div.ux-disabled').isPresent()).toBeFalsy();

    pageObject.checkbox1.click();
    pageObject.checkbox4.click();

    expect(pageObject.checkbox1.$('div.ux-checked').isPresent()).toBeTruthy();
    expect(pageObject.checkbox2.$('div.ux-checked').isPresent()).toBeFalsy();
    expect(pageObject.checkbox3.$('div.ux-checked').isPresent()).toBeFalsy();
    expect(pageObject.checkbox4.$('div.ux-checked').isPresent()).toBeTruthy();
    expect<any>(pageObject.text1.getText()).toBe('true');
    expect<any>(pageObject.text2.getText()).toBe('false');
    expect<any>(pageObject.text3.getText()).toBe('false');
    expect<any>(pageObject.text4.getText()).toBe('true');
  });

  it('should react to setting to indeterminate state', () => {
    pageObject.button2.click();

    expect(pageObject.checkbox1.$('div.ux-indeterminate').isPresent()).toBeFalsy();
    expect(pageObject.checkbox2.$('div.ux-indeterminate').isPresent()).toBeTruthy();
    expect(pageObject.checkbox3.$('div.ux-indeterminate').isPresent()).toBeFalsy();
    expect(pageObject.checkbox4.$('div.ux-indeterminate').isPresent()).toBeFalsy();
    expect<any>(pageObject.text1.getText()).toBe('true');
    expect<any>(pageObject.text2.getText()).toBe('-1');
    expect<any>(pageObject.text3.getText()).toBe('false');
    expect<any>(pageObject.text4.getText()).toBe('false');
  });

  it('should react to setting to simplified style', () => {
    pageObject.button3.click();

    expect(pageObject.checkbox1.$('div.ux-simplified').isPresent()).toBeTruthy();
    expect(pageObject.checkbox2.$('div.ux-simplified').isPresent()).toBeTruthy();
    expect(pageObject.checkbox3.$('div.ux-simplified').isPresent()).toBeTruthy();
    expect(pageObject.checkbox4.$('div.ux-simplified').isPresent()).toBeTruthy();
  });

  it('should toggle the checkbox when pressing space', () => {
    if ((browserName === 'internet explorer') || (browserName === 'firefox')) {
        console.log('Skipping test in ' + browserName);
        return;
    }    
    
    pageObject.checkbox1.$('div.ux-checkbox').sendKeys(Key.SPACE);
    pageObject.checkbox2.$('div.ux-checkbox').sendKeys(Key.SPACE);

    expect(pageObject.checkbox1.$('div.ux-checked').isPresent()).toBeFalsy();
    expect(pageObject.checkbox2.$('div.ux-checked').isPresent()).toBeTruthy();
  });
});