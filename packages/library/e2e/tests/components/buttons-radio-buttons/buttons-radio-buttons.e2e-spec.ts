import { browser, Key } from 'protractor';
import { ButtonsRadioButtonsPage } from './buttons-radio-buttons.po.spec';
import { Constants, Functions } from '../common/common.spec';

describe('Buttons Radio Buttons Tests', () => {

  let page: ButtonsRadioButtonsPage;
  let browserName: string;
  let constants: Constants;
  let functions: Functions;

  beforeEach(() => {
    page = new ButtonsRadioButtonsPage();
    page.getPage();
    
    constants = new Constants();
    functions = new Functions();
    
    browser.getCapabilities().then(function(caps) {
        browserName = caps.get('browserName');
    });
  });
  
  it('should have correct initial states', () => {
    // Initial values.    
    expect<any>(functions.getElementColourHex(page.buttonPrimaryLeft, 'background-color')).toBe(constants.PRIMARY_BACKGROUND_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonPrimaryLeft, 'color')).toBe(constants.PRIMARY_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonPrimaryCentre, 'background-color')).toBe(constants.SECONDARY_BACKGROUND_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonPrimaryCentre, 'color')).toBe(constants.SECONDARY_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonPrimaryRight, 'background-color')).toBe(constants.SECONDARY_BACKGROUND_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonPrimaryRight, 'color')).toBe(constants.SECONDARY_COLOR);
    expect(page.textPrimary.getAttribute('style')).toContain('text-align: left');
    
    expect<any>(functions.getElementColourHex(page.buttonAccentLeft, 'background-color')).toBe(constants.ACCENT_BACKGROUND_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonAccentLeft, 'color')).toBe(constants.PRIMARY_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonAccentCentre, 'background-color')).toBe(constants.SECONDARY_BACKGROUND_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonAccentCentre, 'color')).toBe(constants.SECONDARY_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonAccentRight, 'background-color')).toBe(constants.SECONDARY_BACKGROUND_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonAccentRight, 'color')).toBe(constants.SECONDARY_COLOR);
    expect(page.textAccent.getAttribute('style')).toContain('text-align: left');
  });
  
  it('should react to clicks', () => {
    // Click on button and confirm changes to button colouration and text position    
    page.buttonPrimaryCentre.click();
    
    expect<any>(functions.getElementColourHex(page.buttonPrimaryLeft, 'background-color')).toBe(constants.SECONDARY_BACKGROUND_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonPrimaryLeft, 'color')).toBe(constants.SECONDARY_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonPrimaryCentre, 'background-color')).toBe(constants.PRIMARY_BACKGROUND_HOVER_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonPrimaryCentre, 'color')).toBe(constants.PRIMARY_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonPrimaryRight, 'background-color')).toBe(constants.SECONDARY_BACKGROUND_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonPrimaryRight, 'color')).toBe(constants.SECONDARY_COLOR);
    expect(page.textPrimary.getAttribute('style')).toContain('text-align: center');
    
    page.buttonPrimaryRight.click();
    
    expect<any>(functions.getElementColourHex(page.buttonPrimaryLeft, 'background-color')).toBe(constants.SECONDARY_BACKGROUND_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonPrimaryLeft, 'color')).toBe(constants.SECONDARY_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonPrimaryCentre, 'background-color')).toBe(constants.SECONDARY_BACKGROUND_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonPrimaryCentre, 'color')).toBe(constants.SECONDARY_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonPrimaryRight, 'background-color')).toBe(constants.PRIMARY_BACKGROUND_HOVER_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonPrimaryRight, 'color')).toBe(constants.WHITE);
    expect(page.textPrimary.getAttribute('style')).toContain('text-align: right');
    
    page.buttonAccentCentre.click();
    
    expect<any>(functions.getElementColourHex(page.buttonAccentLeft, 'background-color')).toBe(constants.SECONDARY_BACKGROUND_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonAccentLeft, 'color')).toBe(constants.SECONDARY_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonAccentCentre, 'background-color')).toBe(constants.ACCENT_BACKGROUND_HOVER_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonAccentCentre, 'color')).toBe(constants.WHITE);
    expect<any>(functions.getElementColourHex(page.buttonAccentRight, 'background-color')).toBe(constants.SECONDARY_BACKGROUND_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonAccentRight, 'color')).toBe(constants.SECONDARY_COLOR);
    expect(page.textAccent.getAttribute('style')).toContain('text-align: center');
    
    page.buttonAccentRight.click();
    
    expect<any>(functions.getElementColourHex(page.buttonAccentLeft, 'background-color')).toBe(constants.SECONDARY_BACKGROUND_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonAccentLeft, 'color')).toBe(constants.SECONDARY_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonAccentCentre, 'background-color')).toBe(constants.SECONDARY_BACKGROUND_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonAccentCentre, 'color')).toBe(constants.SECONDARY_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonAccentRight, 'background-color')).toBe(constants.ACCENT_BACKGROUND_HOVER_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonAccentRight, 'color')).toBe(constants.WHITE);
    expect(page.textAccent.getAttribute('style')).toContain('text-align: right');
  });
});