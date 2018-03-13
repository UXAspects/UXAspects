import { browser, Key } from 'protractor';
import { FloatingActionButtonsNg1Page } from './floating-action-buttons-ng1.po.spec';
import { Constants, Functions } from '../common/common.spec';

describe('Floating Action Button Ng1 Tests', () => {

  let page: FloatingActionButtonsNg1Page;
  let browserName: string;
  let constants = new Constants();
  let functions = new Functions();

  beforeEach(() => {

    page = new FloatingActionButtonsNg1Page();
    page.getPage();
    
    browser.getCapabilities().then(function(caps) {
        browserName = caps.get('browserName');
    });
  });
  
  it('should have correct initial states', () => {

    // Vertical (bottom) button
    expect<any>(functions.getElementColourHex(page.fabBottomTrigger, 'background-color')).toBe(constants.PRIMARY_BACKGROUND_COLOR);
    expect<any>(functions.getElementColourHex(page.fabBottomTrigger, 'color')).toBe(constants.PRIMARY_COLOR);

    expect(page.fabButtomButtons.getAttribute('class')).not.toContain('expanded');

    expect(page.fabBottomBtn1.isDisplayed()).toBeFalsy();
    expect(page.fabBottomBtn2.isDisplayed()).toBeFalsy();
    expect(page.fabBottomBtn3.isDisplayed()).toBeFalsy();
    
    // Horizontal (right) button
    expect<any>(functions.getElementColourHex(page.fabRightTrigger, 'background-color')).toBe(constants.PRIMARY_BACKGROUND_COLOR);
    expect<any>(functions.getElementColourHex(page.fabRightTrigger, 'color')).toBe(constants.PRIMARY_COLOR);

    expect(page.fabRightButtons.getAttribute('class')).not.toContain('expanded');

    expect(page.fabRightBtn1.isDisplayed()).toBeFalsy();
    expect(page.fabRightBtn2.isDisplayed()).toBeFalsy();
    expect(page.fabRightBtn3.isDisplayed()).toBeFalsy();
    
    // Vertical (up) button
    expect<any>(functions.getElementColourHex(page.fabUpTrigger, 'background-color')).toBe(constants.PRIMARY_BACKGROUND_COLOR);
    expect<any>(functions.getElementColourHex(page.fabUpTrigger, 'color')).toBe(constants.PRIMARY_COLOR);

    expect(page.fabUpButtons.getAttribute('class')).not.toContain('expanded');

    expect(page.fabUpBtn1.isDisplayed()).toBeFalsy();
    expect(page.fabUpBtn2.isDisplayed()).toBeFalsy();
    expect(page.fabUpBtn3.isDisplayed()).toBeFalsy();
    
    // Horizontal (left) button
    expect<any>(functions.getElementColourHex(page.fabLeftTrigger, 'background-color')).toBe(constants.PRIMARY_BACKGROUND_COLOR);
    expect<any>(functions.getElementColourHex(page.fabLeftTrigger, 'color')).toBe(constants.PRIMARY_COLOR);

    expect(page.fabLeftButtons.getAttribute('class')).not.toContain('expanded');

    expect(page.fabLeftBtn1.isDisplayed()).toBeFalsy();
    expect(page.fabLeftBtn2.isDisplayed()).toBeFalsy();
    expect(page.fabLeftBtn3.isDisplayed()).toBeFalsy();
    
  });

  it('should change the vertical (bottom) button\'s colour upon hover', () => {

    functions.moveToElement(page.fabBottomTriggerIcon);

    expect<any>(functions.getElementColourHex(page.fabBottomTrigger, 'background-color')).toBe(constants.PRIMARY_BACKGROUND_HOVER_COLOR);
    expect<any>(functions.getElementColourHex(page.fabBottomTrigger, 'color')).toBe(constants.PRIMARY_COLOR);

  });

  it('should display action buttons when the vertical (bottom) button is clicked', () => {
    
    page.fabBottom.click();
    
    expect(page.fabButtomButtons.getAttribute('class')).toContain('expanded');

    expect(page.fabBottomBtn1.isDisplayed()).toBeTruthy();
    expect(page.fabBottomBtn2.isDisplayed()).toBeTruthy();
    expect(page.fabBottomBtn3.isDisplayed()).toBeTruthy();

    expect(page.fabBottomBtn1Icon.getAttribute('class')).toContain('hpe-add');
    expect(page.fabBottomBtn2Icon.getAttribute('class')).toContain('hpe-analytics');
    expect(page.fabBottomBtn3Icon.getAttribute('class')).toContain('hpe-app');
    
  });

  it('should display action buttons in the correct position when the vertical (bottom) button is clicked', () => {
    
    page.fabBottom.click();
    
    page.fabBottomBtn1.getLocation().then((location0: object) => {
      page.fabBottomBtn2.getLocation().then((location1: object) => {
        page.fabBottomBtn3.getLocation().then((location2: object) => {
          expect(Number(location0['x'])).toBe(Number(location1['x']));
          expect(Number(location1['x'])).toBe(Number(location2['x']));

          expect(Number(location0['y'])).toBeLessThan(Number(location1['y']));
          expect(Number(location1['y'])).toBeLessThan(Number(location2['y']));
        });
      });
    });

  });

  it('should change the horizontal (right) button\'s colour upon hover', () => {

    functions.moveToElement(page.fabRightTriggerIcon);

    expect<any>(functions.getElementColourHex(page.fabRightTrigger, 'background-color')).toBe(constants.PRIMARY_BACKGROUND_HOVER_COLOR);
    expect<any>(functions.getElementColourHex(page.fabRightTrigger, 'color')).toBe(constants.PRIMARY_COLOR);

  });

  it('should display action buttons when the horizontal (right) button is clicked', () => {
    
    page.fabRight.click();
    
    expect(page.fabRightButtons.getAttribute('class')).toContain('expanded');

    expect(page.fabRightBtn1.isDisplayed()).toBeTruthy();
    expect(page.fabRightBtn2.isDisplayed()).toBeTruthy();
    expect(page.fabRightBtn3.isDisplayed()).toBeTruthy();

    expect(page.fabRightBtn1Icon.getAttribute('class')).toContain('hpe-add');
    expect(page.fabRightBtn2Icon.getAttribute('class')).toContain('hpe-analytics');
    expect(page.fabRightBtn3Icon.getAttribute('class')).toContain('hpe-app');
    
  });

  it('should display action buttons in the correct position when the horizontal (right) button is clicked', () => {
    
    page.fabRight.click();
    
    page.fabRightBtn1.getLocation().then((location0: object) => {
      page.fabRightBtn2.getLocation().then((location1: object) => {
        page.fabRightBtn3.getLocation().then((location2: object) => {
          expect(Number(location0['x'])).toBeLessThan(Number(location1['x']));
          expect(Number(location1['x'])).toBeLessThan(Number(location2['x']));

          expect(Number(location0['y'])).toBe(Number(location1['y']));
          expect(Number(location1['y'])).toBe(Number(location2['y']));
        });
      });
    });

  });

  it('should change the vertical (up) button\'s colour upon hover', () => {

    functions.moveToElement(page.fabUpTriggerIcon);

    expect<any>(functions.getElementColourHex(page.fabUpTrigger, 'background-color')).toBe(constants.PRIMARY_BACKGROUND_HOVER_COLOR);
    expect<any>(functions.getElementColourHex(page.fabUpTrigger, 'color')).toBe(constants.PRIMARY_COLOR);

  });

  it('should display action buttons when the vertical (up) button is clicked', () => {
    
    page.fabUp.click();
    
    expect(page.fabUpButtons.getAttribute('class')).toContain('expanded');

    expect(page.fabUpBtn1.isDisplayed()).toBeTruthy();
    expect(page.fabUpBtn2.isDisplayed()).toBeTruthy();
    expect(page.fabUpBtn3.isDisplayed()).toBeTruthy();

    expect(page.fabUpBtn1Icon.getAttribute('class')).toContain('hpe-add');
    expect(page.fabUpBtn2Icon.getAttribute('class')).toContain('hpe-analytics');
    expect(page.fabUpBtn3Icon.getAttribute('class')).toContain('hpe-app');
    
  });

  it('should display action buttons in the correct position when the vertical (up) button is clicked', () => {
    
    page.fabUp.click();
    
    page.fabUpBtn1.getLocation().then((location0: object) => {
      page.fabUpBtn2.getLocation().then((location1: object) => {
        page.fabUpBtn3.getLocation().then((location2: object) => {
          expect(Number(location0['x'])).toBe(Number(location1['x']));
          expect(Number(location1['x'])).toBe(Number(location2['x']));

          expect(Number(location1['y'])).toBeLessThan(Number(location0['y']));
          expect(Number(location2['y'])).toBeLessThan(Number(location1['y']));
        });
      });
    });

  });

  it('should change the horizontal (left) button\'s colour upon hover', () => {

    functions.moveToElement(page.fabLeftTriggerIcon);

    expect<any>(functions.getElementColourHex(page.fabLeftTrigger, 'background-color')).toBe(constants.PRIMARY_BACKGROUND_HOVER_COLOR);
    expect<any>(functions.getElementColourHex(page.fabLeftTrigger, 'color')).toBe(constants.PRIMARY_COLOR);

  });

  it('should display action buttons when the horizontal (left) button is clicked', () => {
    
    page.fabLeft.click();
    
    expect(page.fabLeftButtons.getAttribute('class')).toContain('expanded');

    expect(page.fabLeftBtn1.isDisplayed()).toBeTruthy();
    expect(page.fabLeftBtn2.isDisplayed()).toBeTruthy();
    expect(page.fabLeftBtn3.isDisplayed()).toBeTruthy();

    expect(page.fabLeftBtn1Icon.getAttribute('class')).toContain('hpe-add');
    expect(page.fabLeftBtn2Icon.getAttribute('class')).toContain('hpe-analytics');
    expect(page.fabLeftBtn3Icon.getAttribute('class')).toContain('hpe-app');
    
  });

  it('should display action buttons in the correct position when the horizontal (left) button is clicked', () => {
    
    page.fabLeft.click();
    
    page.fabLeftBtn1.getLocation().then((location0: object) => {
      page.fabLeftBtn2.getLocation().then((location1: object) => {
        page.fabLeftBtn3.getLocation().then((location2: object) => {
          expect(Number(location1['x'])).toBeLessThan(Number(location0['x']));
          expect(Number(location2['x'])).toBeLessThan(Number(location1['x']));

          expect(Number(location0['y'])).toBe(Number(location1['y']));
          expect(Number(location1['y'])).toBe(Number(location2['y']));
        });
      });
    });

  });
});