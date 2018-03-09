import { browser, Key, protractor } from 'protractor';
import { ButtonDropdownsPage } from './button-dropdowns.po.spec';
import { Constants, Functions } from '../common/common.spec';

describe('Button Dropdowns Tests', () => {

  let page: ButtonDropdownsPage;
  let browserName: string;
  let constants: Constants;
  let functions: Functions;

  beforeEach(() => {

    page = new ButtonDropdownsPage();
    page.getPage();
    
    constants = new Constants();
    functions = new Functions();
    
    browser.getCapabilities().then(function(caps) {
        browserName = caps.get('browserName');
    });

  });
  
  it('should have correct initial states', () => {

    // Initial values.
     
    // Button group should not be expanded.
    expect(page.buttonGroup.getAttribute('class')).not.toContain('open');

    expect<any>(functions.getElementColourHex(page.dropdownButton, 'background-color')).toBe(constants.SECONDARY_BACKGROUND_COLOR);
    expect<any>(functions.getElementColourHex(page.dropdownButton, 'color')).toBe(constants.SECONDARY_COLOR);

    expect(page.link1.isDisplayed()).toBeFalsy();
    expect(page.link2.isDisplayed()).toBeFalsy();
    expect(page.link3.isDisplayed()).toBeFalsy();
    expect(page.link4.isDisplayed()).toBeFalsy();

  });

  it('should change color when it is hovered', () => {
    
    functions.moveToElement(page.dropdownButton);

    expect<any>(functions.getElementColourHex(page.dropdownButton, 'background-color')).toBe(constants.SECONDARY_BACKGROUND_HOVER_COLOR);
    expect<any>(functions.getElementColourHex(page.dropdownButton, 'color')).toBe(constants.SECONDARY_COLOR);

    // Button group should not be expanded.
    expect(page.buttonGroup.getAttribute('class')).not.toContain('open');
    
  });
    
  it('should acquire a border when clicked', () => {

    functions.moveToElementAndClick(page.dropdownButton);

    expect<any>(functions.getElementColourHex(page.dropdownButton, 'outline-color')).toBe(constants.SECONDARY_BORDER_COLOR);

  });

  it('should display the dropdown menu when clicked', () => {

    functions.moveToElementAndClick(page.dropdownButton);

    // Button group should be expanded.
    expect(page.buttonGroup.getAttribute('class')).toContain('open');

    expect<any>(functions.getElementColourHex(page.dropdownButton, 'background-color')).toBe(constants.SECONDARY_BACKGROUND_HOVER_COLOR);
    expect<any>(functions.getElementColourHex(page.dropdownButton, 'color')).toBe(constants.SECONDARY_COLOR);

    expect(page.link1.isDisplayed()).toBeTruthy();
    expect(page.link2.isDisplayed()).toBeTruthy();
    expect(page.link3.isDisplayed()).toBeTruthy();
    expect(page.link4.isDisplayed()).toBeTruthy();

    expect(functions.confirmBackgroundColorIsTransparent(page.link1)).toBeTruthy();
    expect(functions.confirmBackgroundColorIsTransparent(page.link2)).toBeTruthy();
    expect(functions.confirmBackgroundColorIsTransparent(page.link3)).toBeTruthy();
    expect(functions.confirmBackgroundColorIsTransparent(page.link4)).toBeTruthy();

  });

  it('should change menu items\' background color when they are hovered', () => {
    
    functions.moveToElementAndClick(page.dropdownButton);

    functions.moveToElement(page.link1);

    expect<any>(functions.getElementColourHex(page.link1, 'background-color')).toBe('#f5f5f5');
    expect<any>(functions.getElementColourHex(page.link1, 'color')).toBe('#676a6c');
    
  });
    
  it('should close the dropdown when a menu item is clicked', () => {
    
    functions.moveToElementAndClick(page.dropdownButton);

    functions.moveToElementAndClick(page.link1).then();

    const EC = protractor.ExpectedConditions;
    browser.wait(EC.urlIs('http://localhost:8080/'), 5000);
    
  });
    
  it('should display the dropdown when ENTER is pressed', () => {
    
    page.dropdownButton.sendKeys(Key.ENTER);

    // Button group should be expanded.
    expect(page.buttonGroup.getAttribute('class')).toContain('open');

    expect<any>(functions.getElementColourHex(page.dropdownButton, 'outline-color')).toBe(constants.SECONDARY_BORDER_COLOR);
    
  });
    
  it('should allow traversal of the menu when arrow keys are pressed', () => {
    
    page.dropdownButton.sendKeys(Key.ENTER);

    browser.actions().sendKeys(Key.ARROW_DOWN).perform();
    browser.actions().sendKeys(Key.ARROW_DOWN).perform();
    browser.actions().sendKeys(Key.ARROW_DOWN).perform();
    browser.actions().sendKeys(Key.ARROW_DOWN).perform();
    
    expect(functions.confirmBackgroundColorIsTransparent(page.link1)).toBeTruthy();
    expect(functions.confirmBackgroundColorIsTransparent(page.link2)).toBeTruthy();
    expect(functions.confirmBackgroundColorIsTransparent(page.link3)).toBeTruthy();
    expect<any>(functions.getElementColourHex(page.link4, 'background-color')).toBe('#f5f5f5');
    expect<any>(functions.getElementColourHex(page.link4, 'color')).toBe('#262626');
    
    browser.actions().sendKeys(Key.ARROW_UP).perform();
    browser.actions().sendKeys(Key.ARROW_UP).perform();
    
    expect(functions.confirmBackgroundColorIsTransparent(page.link1)).toBeTruthy();
    expect<any>(functions.getElementColourHex(page.link2, 'background-color')).toBe('#f5f5f5');
    expect<any>(functions.getElementColourHex(page.link2, 'color')).toBe('#262626');
    expect(functions.confirmBackgroundColorIsTransparent(page.link3)).toBeTruthy();
    expect(functions.confirmBackgroundColorIsTransparent(page.link4)).toBeTruthy();
    
  });
});