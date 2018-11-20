import { browser, protractor } from 'protractor';
import { Constants, Functions } from '../common/common.spec';
import { ToolbarSearchPage } from './toolbar-search.po.spec';

const ec = protractor.ExpectedConditions;

describe('Toolbar Search', () => {

  const ANIMATION_TIMEOUT = 500;

  let page: ToolbarSearchPage;
  const constants = new Constants();
  const functions = new Functions();

  beforeEach(() => {

    page = new ToolbarSearchPage();
    page.getPage();
  });

  it('should have correct initial states', () => {

    expect(page.leftInput.isDisplayed()).toBeFalsy();
    expect(page.leftButton.isDisplayed()).toBeTruthy();
    expect(page.leftClear.isPresent()).toBeFalsy();

    expect(page.rightInput.isDisplayed()).toBeFalsy();
    expect(page.rightButton.isDisplayed()).toBeTruthy();
    expect(page.rightClear.isPresent()).toBeFalsy();

    expect<any>(page.searchedFor.getText()).toBe('');

  });

  it('should display search input when the button is clicked', () => {

    page.leftButton.click();
    browser.wait(ec.visibilityOf(page.leftInput), ANIMATION_TIMEOUT);

    // Verify states (left)
    expect(page.leftInput.isDisplayed()).toBeTruthy();
    expect(page.leftButton.isDisplayed()).toBeTruthy();
    expect(page.leftClear.isPresent()).toBeFalsy();

    // Verify input focus
    expect(browser.driver.switchTo().activeElement().getId()).toEqual(page.leftInput.getId());

    // Verify input value
    expect<any>(page.leftInput.getAttribute('value')).toBe('');

    // Verify states (right) - should be unaffected
    expect(page.rightInput.isDisplayed()).toBeFalsy();
    expect(page.rightButton.isDisplayed()).toBeTruthy();
    expect(page.rightClear.isPresent()).toBeFalsy();

  });

  it('should hide search input when the button is clicked and the input is empty', () => {

    page.leftButton.click();
    browser.wait(ec.visibilityOf(page.leftInput), ANIMATION_TIMEOUT);

    // Verify states (left)
    expect(page.leftInput.isDisplayed()).toBeTruthy();
    expect(page.leftButton.isDisplayed()).toBeTruthy();
    expect(page.leftClear.isPresent()).toBeFalsy();
    expect<any>(page.searchedFor.getText()).toBe('');

    page.leftButton.click();
    browser.wait(ec.invisibilityOf(page.leftInput), ANIMATION_TIMEOUT);

    expect(page.leftInput.isDisplayed()).toBeFalsy();
    expect(page.leftButton.isDisplayed()).toBeTruthy();
    expect(page.leftClear.isPresent()).toBeFalsy();
    expect<any>(page.searchedFor.getText()).toBe('');

  });

  it('should execute search handler when the button is clicked and the input has text', () => {

    page.leftButton.click();
    browser.wait(ec.visibilityOf(page.leftInput), ANIMATION_TIMEOUT);

    // Verify states (left)
    expect(page.leftInput.isDisplayed()).toBeTruthy();
    expect(page.leftButton.isDisplayed()).toBeTruthy();
    expect(page.leftClear.isPresent()).toBeFalsy();
    expect<any>(page.searchedFor.getText()).toBe('');

    // Enter search text
    page.leftInput.sendKeys('orange');

    // Click the search button
    page.leftButton.click();

    // Verify that the states are unchanged
    expect(page.leftInput.isDisplayed()).toBeTruthy();
    expect(page.leftButton.isDisplayed()).toBeTruthy();
    expect(page.leftClear.isPresent()).toBeFalsy();

    // Verify that the search handler updated the page
    expect<any>(page.searchedFor.getText()).toBe('orange');

  });

  it('should hide search input when the button is clicked and the input was deleted', () => {

    page.leftButton.click();
    browser.wait(ec.visibilityOf(page.leftInput), ANIMATION_TIMEOUT);

    // Verify states (left)
    expect(page.leftInput.isDisplayed()).toBeTruthy();
    expect(page.leftButton.isDisplayed()).toBeTruthy();
    expect(page.leftClear.isPresent()).toBeFalsy();
    expect<any>(page.searchedFor.getText()).toBe('');

    // Enter search text
    page.leftInput.sendKeys('orange');
    expect(page.leftClear.isPresent()).toBeTruthy();

    // Clear the text
    page.leftClear.click();

    // Verify that the input was cleared
    expect<any>(page.leftInput.getAttribute('value')).toBe('');

    // Click the search button
    page.leftButton.click();

    // Verify collapsed state
    expect(page.leftInput.isDisplayed()).toBeTruthy();
    expect(page.leftButton.isDisplayed()).toBeTruthy();
    expect(page.leftClear.isPresent()).toBeFalsy();

    // Verify that the search was unchanged
    expect<any>(page.searchedFor.getText()).toBe('');

  });

  describe('key handling', () => {

    it('should hide search input when the escape key is pressed', () => {

      page.leftButton.click();
      browser.wait(ec.visibilityOf(page.leftInput), ANIMATION_TIMEOUT);

      // Verify states (left)
      expect(page.leftInput.isDisplayed()).toBeTruthy();
      expect(page.leftButton.isDisplayed()).toBeTruthy();
      expect(page.leftClear.isPresent()).toBeFalsy();
      expect<any>(page.searchedFor.getText()).toBe('');

      browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
      browser.wait(ec.invisibilityOf(page.leftInput), ANIMATION_TIMEOUT);

      expect(page.leftInput.isDisplayed()).toBeFalsy();
      expect(page.leftButton.isDisplayed()).toBeTruthy();
      expect(page.leftClear.isPresent()).toBeFalsy();
      expect<any>(page.searchedFor.getText()).toBe('');

    });

    it('should clear search input when the escape key is pressed', () => {

      page.leftButton.click();
      browser.wait(ec.visibilityOf(page.leftInput), ANIMATION_TIMEOUT);

      // Verify states (left)
      expect(page.leftInput.isDisplayed()).toBeTruthy();
      expect(page.leftButton.isDisplayed()).toBeTruthy();
      expect(page.leftClear.isPresent()).toBeFalsy();
      expect<any>(page.searchedFor.getText()).toBe('');

      // Input search query
      page.leftInput.sendKeys('orange');
      expect<any>(page.leftInput.getAttribute('value')).toBe('orange');

      // Press escape
      browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
      browser.wait(ec.invisibilityOf(page.leftInput), ANIMATION_TIMEOUT);

      expect(page.leftInput.isDisplayed()).toBeFalsy();
      expect(page.leftButton.isDisplayed()).toBeTruthy();
      expect(page.leftClear.isPresent()).toBeFalsy();
      expect<any>(page.searchedFor.getText()).toBe('');

      // Reopen search input
      page.leftButton.click();
      browser.wait(ec.visibilityOf(page.leftInput), ANIMATION_TIMEOUT);

      // Verify input value
      expect<any>(page.leftInput.getAttribute('value')).toBe('');

    });

    it('should execute search handler when the enter key is pressed', () => {
  
      page.leftButton.click();
      browser.wait(ec.visibilityOf(page.leftInput), ANIMATION_TIMEOUT);
  
      // Verify states (left)
      expect(page.leftInput.isDisplayed()).toBeTruthy();
      expect(page.leftButton.isDisplayed()).toBeTruthy();
      expect(page.leftClear.isPresent()).toBeFalsy();
      expect<any>(page.searchedFor.getText()).toBe('');
  
      // Enter search text
      page.leftInput.sendKeys('orange');

      // Press enter
      browser.actions().sendKeys(protractor.Key.ENTER).perform();
      browser.wait(ec.invisibilityOf(page.leftInput), ANIMATION_TIMEOUT);

      expect(page.leftInput.isDisplayed()).toBeFalsy();
      expect(page.leftButton.isDisplayed()).toBeTruthy();
      expect(page.leftClear.isPresent()).toBeFalsy();
  
      // Verify that the search handler updated the page
      expect<any>(page.searchedFor.getText()).toBe('orange');
  
    });

  });

  describe('right alignment', () => {

    it('should display search input when the button is clicked', () => {

      page.rightButton.click();
      browser.wait(ec.visibilityOf(page.rightInput), ANIMATION_TIMEOUT);
  
      // Verify states (right)
      expect(page.rightInput.isDisplayed()).toBeTruthy();
      expect(page.rightButton.isDisplayed()).toBeTruthy();
      expect(page.rightClear.isPresent()).toBeFalsy();
  
      // Verify input focus
      expect(browser.driver.switchTo().activeElement().getId()).toEqual(page.rightInput.getId());
  
      // Verify input value
      expect<any>(page.rightInput.getAttribute('value')).toBe('');
  
    });

  });

});