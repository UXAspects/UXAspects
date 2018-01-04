import { browser, Key } from 'protractor';
import { LinkButtonsPage } from './link-buttons.po.spec';
import { Constants, Functions } from '../common/common.spec';

describe('Link Buttons Tests', () => {

  let page: LinkButtonsPage;
  let browserName: string;
  let constants: Constants;
  let functions: Functions;

  beforeEach(() => {
    page = new LinkButtonsPage();
    page.getPage();
    
    constants = new Constants();
    functions = new Functions();
    
    browser.getCapabilities().then(function(caps) {
        browserName = caps.get('browserName');
    });
  });
  
  it('should have correct initial states', () => {
    // Initial values.    
    expect<any>(page.confirmBackgroundIsTransparent(page.buttonSecondary)).toBeTruthy();
    expect<any>(functions.getElementColourHex(page.buttonSecondary, 'color')).toBe(constants.SECONDARY_COLOR);
    expect<any>(page.confirmBackgroundIsTransparent(page.buttonAccent)).toBeTruthy();
    expect<any>(functions.getElementColourHex(page.buttonAccent, 'color')).toBe(constants.ACCENT_BACKGROUND_COLOR);
    expect<any>(page.confirmBackgroundIsTransparent(page.buttonWarning)).toBeTruthy();
    expect<any>(functions.getElementColourHex(page.buttonWarning, 'color')).toBe(constants.WARNING_BACKGROUND_COLOR);
    expect<any>(page.confirmBackgroundIsTransparent(page.buttonDisabled)).toBeTruthy();
    expect<any>(functions.getElementColourHex(page.buttonDisabled, 'color')).toBe('#c8c8c8');
  });

  it('should acquire a border when clicked', () => {
    functions.moveToElementAndClick(page.buttonSecondary);
    expect<any>(functions.getElementColourHex(page.buttonSecondary, 'outline-color')).toBe(constants.SECONDARY_BORDER_COLOR);
  
    functions.moveToElementAndClick(page.buttonAccent);
    expect<any>(functions.getElementColourHex(page.buttonAccent, 'outline-color')).toBe(constants.ACCENT_BORDER_COLOR);
  
    functions.moveToElementAndClick(page.buttonWarning);
    expect<any>(functions.getElementColourHex(page.buttonWarning, 'outline-color')).toBe(constants.WARNING_BORDER_COLOR);
  
    functions.moveToElementAndClick(page.buttonDisabled);
    expect<any>(functions.getElementColourHex(page.buttonDisabled, 'outline-color')).toBe('#c8c8c8');
  });  
});