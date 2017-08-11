import { browser, Key } from 'protractor';
import { ToggleButtonPage } from './toggle-button.po.spec';

describe('Toggle Buttons Tests', () => {

  let page: ToggleButtonPage;
  let browserName: string;

  beforeEach(() => {
    page = new ToggleButtonPage();
    page.getPage();
    
    browser.getCapabilities().then(function(caps) {
        browserName = caps.get('browserName');
    });
  });

  it('should have correct initial states', () => {
      
    // Initial values
    expect(page.confirmButtonIsActive(page.button1)).toBeFalsy();
    expect(page.confirmButtonIsActive(page.button2)).toBeFalsy();
    expect(page.confirmButtonIsActive(page.button3)).toBeFalsy();
    expect(page.confirmButtonIsActive(page.button4)).toBeTruthy();
    expect(page.confirmButtonIsActive(page.button5)).toBeFalsy();
    expect(page.confirmButtonIsActive(page.button6)).toBeFalsy();
    expect(page.confirmButtonIsActive(page.button7)).toBeTruthy();
    expect(page.confirmButtonIsActive(page.button8)).toBeFalsy();
    expect<any>(page.text1.getText()).toBe('Primary Toggle value: 0');
    expect<any>(page.text2.getText()).toBe('Accent Toggle value: off');

    // Initial styles
    expect(page.confirmTextIsBolded(page.text3)).toBeFalsy();
    expect(page.confirmTextIsItalicised(page.text3)).toBeTruthy();
    expect(page.confirmTextIsUnderlined(page.text3)).toBeFalsy();
    expect(page.confirmTextIsBolded(page.text4)).toBeFalsy();
    expect(page.confirmTextIsItalicised(page.text4)).toBeTruthy();
    expect(page.confirmTextIsUnderlined(page.text4)).toBeFalsy();
    
  });

  it('should react to clicks', () => {
      
    // click on 3 buttons
    page.button1.click();
    page.button3.click();
    page.button4.click();
    
    // check button states
    expect(page.confirmButtonIsActive(page.button1)).toBeTruthy();
    expect(page.confirmButtonIsActive(page.button2)).toBeFalsy();
    expect(page.confirmButtonIsActive(page.button3)).toBeTruthy();
    expect(page.confirmButtonIsActive(page.button4)).toBeFalsy();
    expect(page.confirmButtonIsActive(page.button5)).toBeFalsy();
    expect(page.confirmButtonIsActive(page.button6)).toBeFalsy();
    expect(page.confirmButtonIsActive(page.button7)).toBeTruthy();
    expect(page.confirmButtonIsActive(page.button8)).toBeFalsy();
    expect<any>(page.text1.getText()).toBe('Primary Toggle value: 1');
    expect<any>(page.text2.getText()).toBe('Accent Toggle value: off');
    
    // check text style
    expect(page.confirmTextIsBolded(page.text3)).toBeTruthy();
    expect(page.confirmTextIsItalicised(page.text3)).toBeFalsy();
    expect(page.confirmTextIsUnderlined(page.text3)).toBeFalsy();
    expect(page.confirmTextIsBolded(page.text4)).toBeFalsy();
    expect(page.confirmTextIsItalicised(page.text4)).toBeTruthy();
    expect(page.confirmTextIsUnderlined(page.text4)).toBeFalsy();

    
    // click on 3 buttons
    page.button2.click();
    page.button7.click();
    page.button8.click();
    
    // check button states
    expect(page.confirmButtonIsActive(page.button1)).toBeTruthy();
    expect(page.confirmButtonIsActive(page.button2)).toBeTruthy();
    expect(page.confirmButtonIsActive(page.button3)).toBeTruthy();
    expect(page.confirmButtonIsActive(page.button4)).toBeFalsy();
    expect(page.confirmButtonIsActive(page.button5)).toBeFalsy();
    expect(page.confirmButtonIsActive(page.button6)).toBeFalsy();
    expect(page.confirmButtonIsActive(page.button7)).toBeFalsy();
    expect(page.confirmButtonIsActive(page.button8)).toBeTruthy();
    expect<any>(page.text1.getText()).toBe('Primary Toggle value: 1');
    expect<any>(page.text2.getText()).toBe('Accent Toggle value: on');
    
    // check text style
    expect(page.confirmTextIsBolded(page.text3)).toBeTruthy();
    expect(page.confirmTextIsItalicised(page.text3)).toBeFalsy();
    expect(page.confirmTextIsUnderlined(page.text3)).toBeFalsy();
    expect(page.confirmTextIsBolded(page.text4)).toBeFalsy();
    expect(page.confirmTextIsItalicised(page.text4)).toBeFalsy();
    expect(page.confirmTextIsUnderlined(page.text4)).toBeTruthy();
    
  });

  it('should allow style combinations', () => {
      
    // click on 4 buttons
    page.button3.click();
    page.button5.click();
    page.button6.click();
    page.button8.click();
    
    // check text style
    expect(page.confirmTextIsBolded(page.text3)).toBeTruthy();
    expect(page.confirmTextIsItalicised(page.text3)).toBeTruthy();
    expect(page.confirmTextIsUnderlined(page.text3)).toBeTruthy();
    expect(page.confirmTextIsBolded(page.text4)).toBeTruthy();
    expect(page.confirmTextIsItalicised(page.text4)).toBeTruthy();
    expect(page.confirmTextIsUnderlined(page.text4)).toBeTruthy();
    
  });

});