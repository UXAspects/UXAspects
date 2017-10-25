import { browser, Key } from 'protractor';
import { ButtonSizeVariationsPage } from './button-size-variations.po.spec';
import { Constants, Functions } from '../common/common.spec';

describe('Button Size Variations Tests', () => {

  let page: ButtonSizeVariationsPage;
  let browserName: string;
  let constants: Constants;
  let functions: Functions;

  beforeEach(() => {
    page = new ButtonSizeVariationsPage();
    page.getPage();
    
    constants = new Constants();
    functions = new Functions();
    
    browser.getCapabilities().then(function(caps) {
        browserName = caps.get('browserName');
    });
  });
  
  it('should have correct initial states', () => {
    // Initial values.    
    expect<any>(functions.getElementColourHex(page.buttonLarge, 'background-color')).toBe(constants.PRIMARY_BACKGROUND_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonLarge, 'color')).toBe(constants.PRIMARY_COLOR);
    expect<any>(page.buttonLarge.getCssValue('font-size')).toBe('18px');
    expect<any>(page.buttonLarge.getCssValue('padding-top')).toBe('6px');
    expect<any>(page.buttonLarge.getCssValue('padding-right')).toBe('20px');
    expect<any>(page.buttonLarge.getCssValue('padding-bottom')).toBe('6px');
    expect<any>(page.buttonLarge.getCssValue('padding-left')).toBe('20px');
    
    expect<any>(functions.getElementColourHex(page.buttonMedium, 'background-color')).toBe(constants.PRIMARY_BACKGROUND_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonMedium, 'color')).toBe(constants.PRIMARY_COLOR);
    expect<any>(page.buttonMedium.getCssValue('font-size')).toBe('14px');
    expect<any>(page.buttonMedium.getCssValue('padding-top')).toBe('4px');
    expect<any>(page.buttonMedium.getCssValue('padding-right')).toBe('15px');
    expect<any>(page.buttonMedium.getCssValue('padding-bottom')).toBe('4px');
    expect<any>(page.buttonMedium.getCssValue('padding-left')).toBe('15px');
    
    expect<any>(functions.getElementColourHex(page.buttonSmall, 'background-color')).toBe(constants.PRIMARY_BACKGROUND_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonSmall, 'color')).toBe(constants.PRIMARY_COLOR);
    expect<any>(page.buttonSmall.getCssValue('font-size')).toBe('12px');
    expect<any>(page.buttonSmall.getCssValue('padding-top')).toBe('0px');
    expect<any>(page.buttonSmall.getCssValue('padding-right')).toBe('10px');
    expect<any>(page.buttonSmall.getCssValue('padding-bottom')).toBe('0px');
    expect<any>(page.buttonSmall.getCssValue('padding-left')).toBe('10px');
  });  
});