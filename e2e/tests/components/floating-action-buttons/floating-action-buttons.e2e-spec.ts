import { browser, Key } from 'protractor';
import { FloatingActionButtonsPage } from './floating-action-buttons.po.spec';
import { Constants, Functions } from '../common/common.spec';

describe('Floating Action Button Tests', () => {

  let page: FloatingActionButtonsPage;
  let browserName: string;
  let constants: Constants;
  let functions: Functions;

  beforeEach(() => {
    page = new FloatingActionButtonsPage();
    page.getPage();
    
    constants = new Constants();
    functions = new Functions();
    
    browser.getCapabilities().then(function(caps) {
        browserName = caps.get('browserName');
    });
  });
  
  it('should have correct initial states', () => {

    // Vertical (bottom) button
    expect<any>(functions.getElementColourHex(page.buttonVerticalBottomButton, 'background-color')).toBe(constants.PRIMARY_BACKGROUND_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonVerticalBottomButton, 'color')).toBe(constants.PRIMARY_COLOR);

    expect(page.actionButtonVerticalBottom.getAttribute('class')).not.toContain('floating-expand');

    expect(page.buttonVerticalBottomAction0.isDisplayed()).toBeFalsy();
    expect(page.buttonVerticalBottomAction1.isDisplayed()).toBeFalsy();
    expect(page.buttonVerticalBottomAction2.isDisplayed()).toBeFalsy();
    
    // Horizontal (right) button
    expect<any>(functions.getElementColourHex(page.actionButtonHorizontalRight.$('button.dir-right'), 'background-color')).toBe(constants.PRIMARY_BACKGROUND_COLOR);
    expect<any>(functions.getElementColourHex(page.actionButtonHorizontalRight.$('button.dir-right'), 'color')).toBe(constants.PRIMARY_COLOR);

    expect(page.actionButtonHorizontalRight.getAttribute('class')).not.toContain('floating-expand');

    expect(page.actionButtonHorizontalRight.$('span.child-btn-set-horizontal.right').$$('button.btn-circular').get(0).isDisplayed()).toBeFalsy();
    expect(page.actionButtonHorizontalRight.$('span.child-btn-set-horizontal.right').$$('button.btn-circular').get(1).isDisplayed()).toBeFalsy();
    expect(page.actionButtonHorizontalRight.$('span.child-btn-set-horizontal.right').$$('button.btn-circular').get(2).isDisplayed()).toBeFalsy();
    
    // Vertical (up) button
    expect<any>(functions.getElementColourHex(page.buttonVerticalUpButton, 'background-color')).toBe(constants.PRIMARY_BACKGROUND_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonVerticalUpButton, 'color')).toBe(constants.PRIMARY_COLOR);

    expect(page.actionButtonVerticalUp.getAttribute('class')).not.toContain('floating-expand');

    expect(page.buttonVerticalUpAction0.isDisplayed()).toBeFalsy();
    expect(page.buttonVerticalUpAction1.isDisplayed()).toBeFalsy();
    expect(page.buttonVerticalUpAction2.isDisplayed()).toBeFalsy();
    
    // Horizontal (left) button
    expect<any>(functions.getElementColourHex(page.buttonHorizontalLeftButton, 'background-color')).toBe(constants.PRIMARY_BACKGROUND_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonHorizontalLeftButton, 'color')).toBe(constants.PRIMARY_COLOR);

    expect(page.actionButtonHorizontalLeft.getAttribute('class')).not.toContain('floating-expand');

    expect(page.buttonHorizontalLeftAction0.isDisplayed()).toBeFalsy();
    expect(page.buttonHorizontalLeftAction1.isDisplayed()).toBeFalsy();
    expect(page.buttonHorizontalLeftAction2.isDisplayed()).toBeFalsy();
    
  });

  it('should change the vertical (bottom) button\'s colour upon hover', () => {

    functions.moveToElement(page.buttonVerticalBottomButtonIcon);

    expect<any>(functions.getElementColourHex(page.buttonVerticalBottomButton, 'background-color')).toBe(constants.PRIMARY_BACKGROUND_HOVER_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonVerticalBottomButton, 'color')).toBe(constants.PRIMARY_COLOR);

  });

  it('should display action buttons when the vertical (bottom) button is clicked', () => {
    
    page.actionButtonVerticalBottom.click();
    
    expect(page.actionButtonVerticalBottom.getAttribute('class')).toContain('floating-expand');

    expect(page.buttonVerticalBottomAction0.isDisplayed()).toBeTruthy();
    expect(page.buttonVerticalBottomAction1.isDisplayed()).toBeTruthy();
    expect(page.buttonVerticalBottomAction2.isDisplayed()).toBeTruthy();

    expect(page.buttonVerticalBottomAction0Icon.getAttribute('class')).toContain('hpe-add');
    expect(page.buttonVerticalBottomAction1Icon.getAttribute('class')).toContain('hpe-analytics');
    expect(page.buttonVerticalBottomAction2Icon.getAttribute('class')).toContain('hpe-app');
    
  });

  it('should display action buttons in the correct position when the vertical (bottom) button is clicked', () => {
    
    page.actionButtonVerticalBottom.click();
    
    page.buttonVerticalBottomAction0.getLocation().then((location0: object) => {
      page.buttonVerticalBottomAction1.getLocation().then((location1: object) => {
        page.buttonVerticalBottomAction2.getLocation().then((location2: object) => {
          expect(Number(location0['x'])).toBe(Number(location1['x']));
          expect(Number(location1['x'])).toBe(Number(location2['x']));

          expect(Number(location0['y'])).toBeLessThan(Number(location1['y']));
          expect(Number(location1['y'])).toBeLessThan(Number(location2['y']));
        });
      });
    });

  });

  it('should change the horizontal (right) button\'s colour upon hover', () => {

    functions.moveToElement(page.buttonHorizontalRightButtonIcon);

    expect<any>(functions.getElementColourHex(page.buttonHorizontalRightButton, 'background-color')).toBe(constants.PRIMARY_BACKGROUND_HOVER_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonHorizontalRightButton, 'color')).toBe(constants.PRIMARY_COLOR);

  });

  it('should display action buttons when the horizontal (right) button is clicked', () => {
    
    page.actionButtonHorizontalRight.click();
    
    expect(page.actionButtonHorizontalRight.getAttribute('class')).toContain('floating-expand');

    expect(page.buttonHorizontalRightAction0.isDisplayed()).toBeTruthy();
    expect(page.buttonHorizontalRightAction1.isDisplayed()).toBeTruthy();
    expect(page.buttonHorizontalRightAction2.isDisplayed()).toBeTruthy();

    expect(page.buttonHorizontalRightAction0Icon.getAttribute('class')).toContain('hpe-add');
    expect(page.buttonHorizontalRightAction1Icon.getAttribute('class')).toContain('hpe-analytics');
    expect(page.buttonHorizontalRightAction2Icon.getAttribute('class')).toContain('hpe-app');
    
  });

  it('should display action buttons in the correct position when the horizontal (right) button is clicked', () => {
    
    page.actionButtonHorizontalRight.click();
    
    page.buttonHorizontalRightAction0.getLocation().then((location0: object) => {
      page.buttonHorizontalRightAction1.getLocation().then((location1: object) => {
        page.buttonHorizontalRightAction2.getLocation().then((location2: object) => {
          expect(Number(location0['x'])).toBeLessThan(Number(location1['x']));
          expect(Number(location1['x'])).toBeLessThan(Number(location2['x']));

          expect(Number(location0['y'])).toBe(Number(location1['y']));
          expect(Number(location1['y'])).toBe(Number(location2['y']));
        });
      });
    });

  });

  it('should change the vertical (up) button\'s colour upon hover', () => {

    functions.moveToElement(page.buttonVerticalUpButtonIcon);

    expect<any>(functions.getElementColourHex(page.buttonVerticalUpButton, 'background-color')).toBe(constants.PRIMARY_BACKGROUND_HOVER_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonVerticalUpButton, 'color')).toBe(constants.PRIMARY_COLOR);

  });

  it('should display action buttons when the vertical (up) button is clicked', () => {
    
    page.actionButtonVerticalUp.click();
    
    expect(page.actionButtonVerticalUp.getAttribute('class')).toContain('floating-expand');

    expect(page.buttonVerticalUpAction0.isDisplayed()).toBeTruthy();
    expect(page.buttonVerticalUpAction1.isDisplayed()).toBeTruthy();
    expect(page.buttonVerticalUpAction2.isDisplayed()).toBeTruthy();

    expect(page.buttonVerticalUpAction0Icon.getAttribute('class')).toContain('hpe-add');
    expect(page.buttonVerticalUpAction1Icon.getAttribute('class')).toContain('hpe-analytics');
    expect(page.buttonVerticalUpAction2Icon.getAttribute('class')).toContain('hpe-app');
    
  });

  it('should display action buttons in the correct position when the vertical (up) button is clicked', () => {
    
    page.actionButtonVerticalUp.click();
    
    page.buttonVerticalUpAction0.getLocation().then((location0: object) => {
      page.buttonVerticalUpAction1.getLocation().then((location1: object) => {
        page.buttonVerticalUpAction2.getLocation().then((location2: object) => {
          expect(Number(location0['x'])).toBe(Number(location1['x']));
          expect(Number(location1['x'])).toBe(Number(location2['x']));

          expect(Number(location0['y'])).toBeLessThan(Number(location1['y']));
          expect(Number(location1['y'])).toBeLessThan(Number(location2['y']));
        });
      });
    });

  });

  it('should change the horizontal (left) button\'s colour upon hover', () => {

    functions.moveToElement(page.buttonHorizontalLeftButtonIcon);

    expect<any>(functions.getElementColourHex(page.buttonHorizontalLeftButton, 'background-color')).toBe(constants.PRIMARY_BACKGROUND_HOVER_COLOR);
    expect<any>(functions.getElementColourHex(page.buttonHorizontalLeftButton, 'color')).toBe(constants.PRIMARY_COLOR);

  });

  it('should display action buttons when the horizontal (left) button is clicked', () => {
    
    page.actionButtonHorizontalLeft.click();
    
    expect(page.actionButtonHorizontalLeft.getAttribute('class')).toContain('floating-expand');

    expect(page.buttonHorizontalLeftAction0.isDisplayed()).toBeTruthy();
    expect(page.buttonHorizontalLeftAction1.isDisplayed()).toBeTruthy();
    expect(page.buttonHorizontalLeftAction2.isDisplayed()).toBeTruthy();

    expect(page.buttonHorizontalLeftAction0Icon.getAttribute('class')).toContain('hpe-add');
    expect(page.buttonHorizontalLeftAction1Icon.getAttribute('class')).toContain('hpe-analytics');
    expect(page.buttonHorizontalLeftAction2Icon.getAttribute('class')).toContain('hpe-app');
    
  });

  it('should display action buttons in the correct position when the horizontal (left) button is clicked', () => {
    
    page.actionButtonHorizontalLeft.click();
    
    page.buttonHorizontalLeftAction0.getLocation().then((location0: object) => {
      page.buttonHorizontalLeftAction1.getLocation().then((location1: object) => {
        page.buttonHorizontalLeftAction2.getLocation().then((location2: object) => {
          expect(Number(location0['x'])).toBeLessThan(Number(location1['x']));
          expect(Number(location1['x'])).toBeLessThan(Number(location2['x']));

          expect(Number(location0['y'])).toBe(Number(location1['y']));
          expect(Number(location1['y'])).toBe(Number(location2['y']));
        });
      });
    });

  });
});