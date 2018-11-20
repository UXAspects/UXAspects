import { Constants, Functions } from '../common/common.spec';
import { FloatingActionButtonsPage } from './floating-action-buttons.po.spec';

describe('Floating Action Button Tests', () => {

  let page: FloatingActionButtonsPage;
  let constants = new Constants();
  let functions = new Functions();

  beforeEach(() => {

    page = new FloatingActionButtonsPage();
    page.getPage();
  });

  it('should have correct initial states', () => {

    // Vertical (bottom) button
    expect<any>(functions.getElementColourHex(page.fabBottomTrigger, 'background-color')).toBe(constants.PRIMARY_BACKGROUND_COLOR);
    expect<any>(functions.getElementColourHex(page.fabBottomTrigger, 'color')).toBe(constants.PRIMARY_COLOR);

    // there should only be the trigger button visible
    expect<any>(page.fabBottom.$$('ux-floating-action-button').count()).toBe(1);

    // // Horizontal (right) button
    expect<any>(functions.getElementColourHex(page.fabRightTrigger, 'background-color')).toBe(constants.PRIMARY_BACKGROUND_COLOR);
    expect<any>(functions.getElementColourHex(page.fabRightTrigger, 'color')).toBe(constants.PRIMARY_COLOR);

    // there should only be the trigger button visible
    expect<any>(page.fabRight.$$('ux-floating-action-button').count()).toBe(1);

    // // Vertical (up) button
    expect<any>(functions.getElementColourHex(page.fabUpTrigger, 'background-color')).toBe(constants.PRIMARY_BACKGROUND_COLOR);
    expect<any>(functions.getElementColourHex(page.fabUpTrigger, 'color')).toBe(constants.PRIMARY_COLOR);

    // there should only be the trigger button visible
    expect<any>(page.fabUp.$$('ux-floating-action-button').count()).toBe(1);

    // // Horizontal (left) button
    expect<any>(functions.getElementColourHex(page.fabLeftTrigger, 'background-color')).toBe(constants.PRIMARY_BACKGROUND_COLOR);
    expect<any>(functions.getElementColourHex(page.fabLeftTrigger, 'color')).toBe(constants.PRIMARY_COLOR);

    // there should only be the trigger button visible
    expect<any>(page.fabLeft.$$('ux-floating-action-button').count()).toBe(1);

  });

  it('should change the vertical (bottom) button\'s colour upon hover', () => {

    functions.moveToElement(page.fabBottomTriggerIcon);

    expect<any>(functions.getElementColourHex(page.fabBottomTrigger, 'background-color')).toBe(constants.PRIMARY_BACKGROUND_HOVER_COLOR);
    expect<any>(functions.getElementColourHex(page.fabBottomTrigger, 'color')).toBe(constants.PRIMARY_COLOR);

  });

  it('should display action buttons when the vertical (bottom) button is clicked', () => {

    page.fabBottom.click();

    const buttons = page.fabBottom.$$('ux-floating-action-button');

    expect<any>(buttons.count()).toBe(4);

    // check the icons are correct on each button
    expect(buttons.get(1).$('.hpe-icon').getAttribute('class')).toContain('hpe-add');
    expect(buttons.get(2).$('.hpe-icon').getAttribute('class')).toContain('hpe-analytics');
    expect(buttons.get(3).$('.hpe-icon').getAttribute('class')).toContain('hpe-app');

  });

  it('should display action buttons in the correct position when the vertical (bottom) button is clicked', () => {

    page.fabBottom.click();

    const buttons = page.fabBottom.$$('ux-floating-action-button');

    buttons.get(1).getLocation().then((location0: object) => {
      buttons.get(2).getLocation().then((location1: object) => {
        buttons.get(3).getLocation().then((location2: object) => {
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

    const buttons = page.fabRight.$$('ux-floating-action-button');

    expect<any>(buttons.count()).toBe(4);

    // check the icons are correct on each button
    expect(buttons.get(1).$('.hpe-icon').getAttribute('class')).toContain('hpe-add');
    expect(buttons.get(2).$('.hpe-icon').getAttribute('class')).toContain('hpe-analytics');
    expect(buttons.get(3).$('.hpe-icon').getAttribute('class')).toContain('hpe-app');

  });

  it('should display action buttons in the correct position when the horizontal (right) button is clicked', () => {

    page.fabRight.click();

    const buttons = page.fabRight.$$('ux-floating-action-button');

    buttons.get(1).getLocation().then((location0: object) => {
      buttons.get(2).getLocation().then((location1: object) => {
        buttons.get(3).getLocation().then((location2: object) => {
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

    const buttons = page.fabUp.$$('ux-floating-action-button');

    expect<any>(buttons.count()).toBe(4);

    // check the icons are correct on each button
    expect(buttons.get(1).$('.hpe-icon').getAttribute('class')).toContain('hpe-add');
    expect(buttons.get(2).$('.hpe-icon').getAttribute('class')).toContain('hpe-analytics');
    expect(buttons.get(3).$('.hpe-icon').getAttribute('class')).toContain('hpe-app');

  });

  it('should display action buttons in the correct position when the vertical (up) button is clicked', () => {

    page.fabUp.click();

    const buttons = page.fabUp.$$('ux-floating-action-button');    

    buttons.get(1).getLocation().then((location0: object) => {
      buttons.get(2).getLocation().then((location1: object) => {
        buttons.get(3).getLocation().then((location2: object) => {
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

    const buttons = page.fabLeft.$$('ux-floating-action-button');

    expect<any>(buttons.count()).toBe(4);

    // check the icons are correct on each button
    expect(buttons.get(1).$('.hpe-icon').getAttribute('class')).toContain('hpe-add');
    expect(buttons.get(2).$('.hpe-icon').getAttribute('class')).toContain('hpe-analytics');
    expect(buttons.get(3).$('.hpe-icon').getAttribute('class')).toContain('hpe-app');

  });

  it('should display action buttons in the correct position when the horizontal (left) button is clicked', () => {

    page.fabLeft.click();

    const buttons = page.fabLeft.$$('ux-floating-action-button');    

    buttons.get(1).getLocation().then((location0: object) => {
      buttons.get(2).getLocation().then((location1: object) => {
        buttons.get(3).getLocation().then((location2: object) => {
          expect(Number(location1['x'])).toBeLessThan(Number(location0['x']));
          expect(Number(location2['x'])).toBeLessThan(Number(location1['x']));

          expect(Number(location0['y'])).toBe(Number(location1['y']));
          expect(Number(location1['y'])).toBe(Number(location2['y']));
        });
      });
    });

  });
});