import { browser, Key } from 'protractor';
import { HyperlinksPage } from './hyperlinks.po.spec';
import { Constants, Functions } from '../common/common.spec';

describe('Hyperlinks Tests', () => {

  let page: HyperlinksPage;
  let browserName: string;
  let constants: Constants;
  let functions: Functions;

  beforeEach(() => {
    page = new HyperlinksPage();
    page.getPage();
    
    constants = new Constants();
    functions = new Functions();
    
    browser.getCapabilities().then(function(caps) {
        browserName = caps.get('browserName');
    });
  });
  
  it('should have correct initial states', () => {

    // Initial values.
    expect<any>(page.textLink.getCssValue('border-bottom-width')).toBe('2px');
    expect<any>(page.textLink.getCssValue('border-bottom-style')).toBe('dotted');
    expect<any>(functions.getElementColourHex(page.textLink, 'border-bottom-color')).toBe(constants.PRIMARY_BACKGROUND_COLOR);
    
    expect<any>(page.firstLink.getCssValue('border-bottom-width')).toBe('2px');
    expect<any>(page.firstLink.getCssValue('border-bottom-style')).toBe('dotted');
    expect<any>(page.firstLink.getCssValue('border-bottom-color')).toBe('rgba(0, 0, 0, 0)');

  });
  
  it('should change colour when hovered over', () => {

    // Hover over link
    functions.moveToElement(page.firstLink);
    expect<any>(page.firstLink.getCssValue('border-bottom-width')).toBe('2px');
    expect<any>(page.firstLink.getCssValue('border-bottom-style')).toBe('dotted');
    expect<any>(functions.getElementColourHex(page.firstLink, 'border-bottom-color')).toBe(constants.PRIMARY_BACKGROUND_COLOR);

  });  
});