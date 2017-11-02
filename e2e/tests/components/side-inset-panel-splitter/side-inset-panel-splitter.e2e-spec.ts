import { browser, Key } from 'protractor';
import { SideInsetPanelSplitterPage } from './side-inset-panel-splitter.po.spec';
import { Constants, Functions } from '../common/common.spec';

describe('Side Inset Panel Splitter Tests', () => {

  // Time, in milliseconds, to pause while waiting for the panels to be resized.
  const RESIZE_DELAY_MS = 2000;
  
  let page: SideInsetPanelSplitterPage;
  let browserName: string;
  let constants: Constants;
  let functions: Functions;

  beforeEach(() => {
    page = new SideInsetPanelSplitterPage();
    page.getPage();
    
    constants = new Constants();
    functions = new Functions();
    
    browser.getCapabilities().then(function(caps) {
        browserName = caps.get('browserName');
    });
  });
  
  it('should have correct initial states', () => {

    // Horizontal main panel should be visible
    expect<any>(page.splitterHorizMain.getCssValue('overflow-y')).not.toBe('hidden');
    expect<any>(page.splitterHorizMain.getCssValue('width')).not.toBe('0px');
    expect<any>(page.splitterHorizMain.getAttribute('size')).toBe('80');
    
    // Horizontal side panel should not be visible
    expect<any>(page.splitterHorizSide.getCssValue('overflow-y')).toBe('hidden');
    expect<any>(page.splitterHorizSide.getCssValue('width')).toBe('0px');
    expect<any>(page.splitterHorizSide.getAttribute('size')).toBe('20');
    
    // Horizontal panels' divider should not be visible
    expect(page.dividerHorizHandle.getAttribute('class')).toContain('hidden-drag-handle');
    expect<any>(page.dividerHoriz.getCssValue('width')).toBe('0px');
    expect<any>(page.dividerHoriz.getCssValue('height')).toBe('0px');

    // Horizontal toggle button should display the 'next' icon
    expect<any>(functions.getElementColourHex(page.buttonHoriz, 'background-color')).toBe(constants.PRIMARY_BACKGROUND_COLOR);
    expect(page.buttonHorizIcon.getAttribute('class')).toContain('hpe-next');

    // Vertical main panel should be visible
    expect<any>(page.splitterVertMain.getCssValue('height')).not.toBe('0px');
    expect<any>(page.splitterVertMain.getAttribute('size')).toBe('33');
    
    // Vertical side panel should not be visible
    expect<any>(page.splitterVertSide.getCssValue('height')).toBe('0px');
    expect<any>(page.splitterVertSide.getAttribute('size')).toBe('67');
    
    // Vertical panels' divider should not be visible
    expect(page.dividerVertHandle.getAttribute('class')).toContain('hidden-drag-handle');
    expect<any>(page.dividerVert.getCssValue('width')).toBe('0px');
    expect<any>(page.dividerVert.getCssValue('height')).toBe('0px');

    // Vertical toggle button should display the 'up' icon
    expect<any>(functions.getElementColourHex(page.buttonVert, 'background-color')).toBe(constants.PRIMARY_BACKGROUND_COLOR);
    expect(page.buttonVertIcon.getAttribute('class')).toContain('hpe-up');

  });

  it('should display the side panel when the horizontal direction toggle button is clicked', () => {

    // Need to pause after clicking the button to allow the panels to resize.
    page.buttonHoriz.click().then(() => {
        browser.sleep(RESIZE_DELAY_MS);
    });

    // Main panel should be visible
    expect<any>(page.splitterHorizMain.getCssValue('overflow-y')).not.toBe('hidden');
    expect<any>(page.splitterHorizMain.getCssValue('width')).not.toBe('0px');

    // Side panel should be visible
    expect<any>(page.splitterHorizSide.getCssValue('overflow-y')).not.toBe('hidden');
    expect<any>(page.splitterHorizSide.getCssValue('width')).not.toBe('0px');

    // Divider should be visible
    expect(page.dividerHorizHandle.getAttribute('class')).not.toContain('hidden-drag-handle');
    expect<any>(page.dividerHoriz.getCssValue('width')).not.toBe('0px');
    expect<any>(page.dividerHoriz.getCssValue('height')).not.toBe('0px');

    // Toggle button should display the 'previous' icon
    expect<any>(functions.getElementColourHex(page.buttonHoriz, 'background-color')).toBe(constants.PRIMARY_BACKGROUND_COLOR);
    expect(page.buttonHorizIcon.getAttribute('class')).toContain('hpe-previous');

  });

  it('should calculate the panel widths in the correct ratio when the horizontal direction toggle button is clicked', () => {
    
    // Need to pause after clicking the button to allow the panels to resize.
    page.buttonHoriz.click().then(() => {
        browser.sleep(RESIZE_DELAY_MS);
    });

    page.getPanelDimension(page.splitterHorizMain, 'width').then((mainWidth: string) => {
      page.getPanelDimension(page.splitterHorizSide, 'width').then((sideWidth: string) => {
        var ratio = Number(mainWidth) / Number(sideWidth);

        // With the main and side panel widths set to 80% and 20% respectively, the ratio of the
        // calculated widths should be in the 3.5 - 4.5 range.
        expect(ratio).toBeGreaterThan(3.5);
        expect(ratio).toBeLessThan(4.5);
      });
    });
    
  });
    
  it('should hide the side panel when the horizontal direction toggle button is clicked twice', () => {
    
    // Must move to button's new location after first click. Need to pause each click to allow the panels to resize.
    page.buttonHoriz.click().then(() => {
      browser.sleep(RESIZE_DELAY_MS);
      functions.moveToElement(page.buttonHoriz).then(() => {
        page.buttonHoriz.click().then(() => {
          browser.sleep(RESIZE_DELAY_MS);
        });
      });
    });
    
    // Main panel should be visible
    expect<any>(page.splitterHorizMain.getCssValue('overflow-y')).not.toBe('hidden');
    expect<any>(page.splitterHorizMain.getCssValue('width')).not.toBe('0px');
    
    // Side panel should not be visible
    expect<any>(page.splitterHorizSide.getCssValue('overflow-y')).toBe('hidden');
    expect<any>(page.splitterHorizSide.getCssValue('width')).toBe('0px');
    
    // Divider should not be visible
    expect(page.dividerHorizHandle.getAttribute('class')).toContain('hidden-drag-handle');
    expect<any>(page.dividerHoriz.getCssValue('width')).toBe('0px');
    expect<any>(page.dividerHoriz.getCssValue('height')).toBe('0px');

    // Toggle button should display the 'next' icon
    expect<any>(functions.getElementColourHex(page.buttonHoriz, 'background-color')).toBe(constants.PRIMARY_BACKGROUND_COLOR);
    expect(page.buttonHorizIcon.getAttribute('class')).toContain('hpe-next');

  });

  it('should change the horizontal panels\' widths when the divider is moved', () => {
    
    // Need to pause after clicking the button to allow the panels to resize.
    page.buttonHoriz.click().then(() => {
        browser.sleep(RESIZE_DELAY_MS);
    });
    
    // Drag the divider leftwards by the width in pixels of the side panel
    page.getPanelDimension(page.splitterHorizSide, 'width').then((sideWidth: string) => {
      browser.actions().
        dragAndDrop(page.dividerHoriz, { x: -(parseInt(sideWidth)), y: 0 }).
        perform();
    });

    // Main panel should still be visible
    expect<any>(page.splitterHorizMain.getCssValue('overflow-y')).not.toBe('hidden');
    expect<any>(page.splitterHorizMain.getCssValue('width')).not.toBe('0px');
    
    // Side panel should be visible but narrowed to less than 6 pixels
    expect<any>(page.splitterHorizSide.getCssValue('overflow-y')).not.toBe('hidden');
    page.getPanelDimension(page.splitterHorizSide, 'width').then((sideWidth: string) => {
      expect(sideWidth).toBeLessThan(6);
    });

    // Drag the divider rightwards by the width in pixels of the main panel
    page.getPanelDimension(page.splitterHorizMain, 'width').then((mainWidth: string) => {
      browser.actions().
        dragAndDrop(page.dividerHoriz, { x: Number(mainWidth), y: 0 }).
        perform();
    });
    
    // Main panel should be visible but narrowed to less than 6 pixels
    page.getPanelDimension(page.splitterHorizMain, 'width').then((mainWidth: string) => {
      expect(mainWidth).toBeLessThan(6);
    });

  });
  
  it('should display the side panel when the vertical direction toggle button is clicked', () => {
    
    // Need to pause after clicking the button to allow the panels to resize.
    page.buttonVert.click().then(() => {
        browser.sleep(RESIZE_DELAY_MS);
    });

    // Main panel should be visible
    expect<any>(page.splitterVertMain.getCssValue('height')).not.toBe('0px');

    // Side panel should be visible
    expect<any>(page.splitterVertSide.getCssValue('height')).not.toBe('0px');

    // Divider should be visible
    expect(page.dividerVertHandle.getAttribute('class')).not.toContain('hidden-drag-handle');
    expect<any>(page.dividerVert.getCssValue('width')).not.toBe('0px');
    expect<any>(page.dividerVert.getCssValue('height')).not.toBe('0px');

    // Toggle button should display the 'down' icon
    expect<any>(functions.getElementColourHex(page.buttonVert, 'background-color')).toBe(constants.PRIMARY_BACKGROUND_COLOR);
    expect(page.buttonVertIcon.getAttribute('class')).toContain('hpe-down');
    
  });

  it('should calculate the panel heights in the correct ratio when the vertical direction toggle button is clicked', () => {
    
    // Need to pause after clicking the button to allow the panels to resize.
    page.buttonVert.click().then(() => {
        browser.sleep(RESIZE_DELAY_MS);
    });

    page.getPanelDimension(page.splitterVertMain, 'height').then((mainHeight: string) => {
      page.getPanelDimension(page.splitterVertSide, 'height').then((sideHeight: string) => {
        var ratio = Number(sideHeight) / Number(mainHeight);

        console.log('sideHeight = ' + sideHeight);
        console.log('mainHeight = ' + mainHeight);
        console.log('ratio = ' + ratio);

        // With the side and main panel height set to 67% and 33% respectively, the ratio of the
        // calculated heights should be in the 1.5 - 2.5 range.
        expect(ratio).toBeGreaterThan(1.5);
        expect(ratio).toBeLessThan(2.5);
      });
    });
    
  });

  it('should hide the side panel when the vertical direction toggle button is clicked twice', () => {
    
    // Must move to button's new location after first click. Need to pause each click to allow the panels to resize.
    page.buttonVert.click().then(() => {
      browser.sleep(RESIZE_DELAY_MS);
      functions.moveToElement(page.buttonVert).then(() => {
        page.buttonVert.click().then(() => {
          browser.sleep(RESIZE_DELAY_MS);
        });
      });
    });
    
    // Main panel should be visible
    expect<any>(page.splitterVertMain.getCssValue('height')).not.toBe('0px');
    
    // Side panel should not be visible
    expect<any>(page.splitterVertSide.getCssValue('overflow-y')).toBe('auto');
    expect<any>(page.splitterVertSide.getCssValue('height')).toBe('0px');
    
    // Divider should not be visible
    expect(page.dividerVertHandle.getAttribute('class')).toContain('hidden-drag-handle');
    expect<any>(page.dividerVert.getCssValue('width')).toBe('0px');
    expect<any>(page.dividerVert.getCssValue('height')).toBe('0px');

    // Toggle button should display the 'next' icon
    expect<any>(functions.getElementColourHex(page.buttonVert, 'background-color')).toBe(constants.PRIMARY_BACKGROUND_COLOR);
    expect(page.buttonVertIcon.getAttribute('class')).toContain('hpe-up');

  });

  it('should change the vertical panels\' heights when the divider is moved', () => {
    
    // Need to pause after clicking the button to allow the panels to resize.
    page.buttonVert.click().then(() => {
        browser.sleep(RESIZE_DELAY_MS);
    });
    
    // Drag the divider downwards by the height in pixels of the side panel less the height in pixels
    // of the divider
    page.getPanelDimension(page.splitterVertSide, 'height').then((sideHeight: string) => {
      page.dividerVert.getCssValue('height').then((dividerHeight: string) => {
        var dividerHeightNum = /^\s*[0-9]*/.exec(dividerHeight);
        browser.actions().
          dragAndDrop(page.dividerVert, { x: 0, y: parseInt(sideHeight) - parseInt(dividerHeightNum[0]) }).
          perform();
        
        browser.sleep(RESIZE_DELAY_MS);
      });
    });

    // Main panel should still be visible
    expect<any>(page.splitterVertMain.getCssValue('height')).not.toBe('0px');
    
    // Side panel should be visible but narrowed to less than 6 pixels
    expect<any>(page.splitterVertSide.getCssValue('overflow-y')).toBe('auto');
    page.getPanelDimension(page.splitterVertSide, 'height').then((sideHeight: string) => {
      expect(sideHeight).toBeLessThan(6);
    });

    // Drag the divider upwards by the height in pixels of the main panel
    page.getPanelDimension(page.splitterVertMain, 'height').then((mainHeight: string) => {
      browser.actions().
        dragAndDrop(page.dividerVert, { x: 0, y: -(Number(mainHeight))}).
        perform();

        browser.sleep(RESIZE_DELAY_MS);
    });
    
    // Main panel should be visible but narrowed to less than 6 pixels
    page.getPanelDimension(page.splitterVertMain, 'height').then((mainHeight: string) => {
      expect(mainHeight).toBeLessThan(6);
    });

  });
});