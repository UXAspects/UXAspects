import { browser, Key } from 'protractor';
import { CircularIconButtonsPage } from './circular-icon-buttons.po.spec';
import { Constants, Functions } from '../common/common.spec';

describe('Circular Icon Buttons Tests', () => {

  let page: CircularIconButtonsPage;
  let browserName: string;
  let constants: Constants;
  let functions: Functions;

  beforeEach(() => {
    page = new CircularIconButtonsPage();
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
    expect<any>(page.buttonLarge.getCssValue('width')).toBe('40px');
    expect<any>(page.buttonLarge.getCssValue('padding-top')).toBe('6px');
    expect<any>(page.buttonLarge.getCssValue('padding-right')).toBe('10px');
    expect<any>(page.buttonLarge.getCssValue('padding-bottom')).toBe('6px');
    expect<any>(page.buttonLarge.getCssValue('padding-left')).toBe('10px');
    
    expect<any>(functions.getElementColourHex(page.buttonMedium, 'background-color')).toBe(constants.PRIMARY_BACKGROUND_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonMedium, 'color')).toBe(constants.PRIMARY_COLOR);
    expect<any>(page.buttonMedium.getCssValue('width')).toBe('30px');
    expect<any>(page.buttonMedium.getCssValue('padding-top')).toBe('4px');
    expect<any>(page.buttonMedium.getCssValue('padding-right')).toBe('7px');
    expect<any>(page.buttonMedium.getCssValue('padding-bottom')).toBe('4px');
    expect<any>(page.buttonMedium.getCssValue('padding-left')).toBe('7px');
    
    expect<any>(functions.getElementColourHex(page.buttonSmall, 'background-color')).toBe(constants.PRIMARY_BACKGROUND_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonSmall, 'color')).toBe(constants.PRIMARY_COLOR);
    expect<any>(page.buttonSmall.getCssValue('width')).toBe('20px');
    expect<any>(page.buttonSmall.getCssValue('padding-top')).toBe('0px');
    expect<any>(page.buttonSmall.getCssValue('padding-right')).toBe('0px');
    expect<any>(page.buttonSmall.getCssValue('padding-bottom')).toBe('0px');
    expect<any>(page.buttonSmall.getCssValue('padding-left')).toBe('0px');
  });  
});