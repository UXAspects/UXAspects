import { browser, Key } from 'protractor';
import { ColoredButtonsPage } from './colored-buttons.po.spec';
import { Constants, Functions } from '../common/common.spec';

describe('Colored Buttons Tests', () => {

  let page: ColoredButtonsPage;
  let browserName: string;
  let constants: Constants;
  let functions: Functions;

  beforeEach(() => {
    page = new ColoredButtonsPage();
    page.getPage();
    
    constants = new Constants();
    functions = new Functions();
    
    browser.getCapabilities().then(function(caps) {
        browserName = caps.get('browserName');
    });
  });
  
  it('should have correct initial states', () => {

    // Initial values.    
    expect<any>(functions.getElementColourHex(page.buttonPrimary, 'background-color')).toBe(constants.PRIMARY_BACKGROUND_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonPrimary, 'color')).toBe(constants.PRIMARY_COLOR);

    expect<any>(functions.getElementColourHex(page.buttonSecondary, 'background-color')).toBe(constants.SECONDARY_BACKGROUND_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonSecondary, 'color')).toBe(constants.SECONDARY_COLOR);

    expect<any>(functions.getElementColourHex(page.buttonAccent, 'background-color')).toBe(constants.ACCENT_BACKGROUND_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonAccent, 'color')).toBe(constants.ACCENT_COLOR);

    expect<any>(functions.getElementColourHex(page.buttonWarning, 'background-color')).toBe(constants.WARNING_BACKGROUND_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonWarning, 'color')).toBe(constants.WARNING_COLOR);

    expect<any>(functions.getElementColourHex(page.buttonDisabled, 'background-color')).toBe(constants.DISABLED_BACKGROUND_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonDisabled, 'color')).toBe(constants.DISABLED_COLOR);

  });

  it('should change colour upon hover', () => {

    functions.moveToElement(page.buttonPrimary);
    expect<any>(functions.getElementColourHex(page.buttonPrimary, 'background-color')).toBe(constants.PRIMARY_BACKGROUND_HOVER_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonPrimary, 'color')).toBe(constants.PRIMARY_COLOR);

    functions.moveToElement(page.buttonSecondary);
    expect<any>(functions.getElementColourHex(page.buttonSecondary, 'background-color')).toBe(constants.SECONDARY_BACKGROUND_HOVER_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonSecondary, 'color')).toBe(constants.SECONDARY_COLOR);

    functions.moveToElement(page.buttonAccent);
    expect<any>(functions.getElementColourHex(page.buttonAccent, 'background-color')).toBe(constants.ACCENT_BACKGROUND_HOVER_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonAccent, 'color')).toBe(constants.ACCENT_COLOR);

    functions.moveToElement(page.buttonWarning);
    expect<any>(functions.getElementColourHex(page.buttonWarning, 'background-color')).toBe(constants.WARNING_BACKGROUND_HOVER_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonWarning, 'color')).toBe(constants.WARNING_COLOR);

    functions.moveToElement(page.buttonDisabled);
    expect<any>(functions.getElementColourHex(page.buttonDisabled, 'background-color')).toBe(constants.DISABLED_BACKGROUND_HOVER_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonDisabled, 'color')).toBe(constants.DISABLED_COLOR);

  });

  it('should acquire a border when clicked', () => {

    functions.moveToElementAndClick(page.buttonPrimary);
    expect<any>(functions.getElementColourHex(page.buttonPrimary, 'outline-color')).toBe(constants.PRIMARY_BORDER_COLOR);
  
    functions.moveToElementAndClick(page.buttonSecondary);
    expect<any>(functions.getElementColourHex(page.buttonSecondary, 'outline-color')).toBe(constants.SECONDARY_BORDER_COLOR);
  
    functions.moveToElementAndClick(page.buttonAccent);
    expect<any>(functions.getElementColourHex(page.buttonAccent, 'outline-color')).toBe(constants.ACCENT_BORDER_COLOR);
  
    functions.moveToElementAndClick(page.buttonWarning);
    expect<any>(functions.getElementColourHex(page.buttonWarning, 'outline-color')).toBe(constants.WARNING_BORDER_COLOR);
  
    functions.moveToElementAndClick(page.buttonDisabled);
    expect<any>(functions.getElementColourHex(page.buttonDisabled, 'outline-color')).toBe(constants.DISABLED_COLOR);

  });

  it('should change the primary button\'s colour when it is selected through the keyboard', () => {
    
    page.buttonPrimary.sendKeys(Key.ENTER);
    expect<any>(functions.getElementColourHex(page.buttonPrimary, 'background-color')).toBe(constants.PRIMARY_BACKGROUND_HOVER_COLOR);
    
  });
    
  it('should acquire a border when selected through the keyboard', () => {

    page.buttonPrimary.sendKeys(Key.ENTER);
    expect<any>(functions.getElementColourHex(page.buttonPrimary, 'outline-color')).toBe(constants.PRIMARY_BORDER_COLOR);
  
    browser.actions().sendKeys(Key.TAB).perform();
    expect<any>(functions.getElementColourHex(page.buttonSecondary, 'outline-color')).toBe(constants.SECONDARY_BORDER_COLOR);
  
    browser.actions().sendKeys(Key.TAB).perform();
    expect<any>(functions.getElementColourHex(page.buttonAccent, 'outline-color')).toBe(constants.ACCENT_BORDER_COLOR);
  
    browser.actions().sendKeys(Key.TAB).perform();
    expect<any>(functions.getElementColourHex(page.buttonWarning, 'outline-color')).toBe(constants.WARNING_BORDER_COLOR);
  
    browser.actions().sendKeys(Key.TAB).perform();
    expect<any>(functions.getElementColourHex(page.buttonDisabled, 'outline-color')).toBe(constants.DISABLED_COLOR);

  });
    
});