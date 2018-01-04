import { browser, Key } from 'protractor';
import { SlidersPage } from './sliders.po.spec';

describe('SlidersPage Tests', () => {

  let page: SlidersPage;
  let browserName: string;

  beforeEach(() => {
    page = new SlidersPage();
    page.getPage();
    
    browser.driver.manage().window().maximize();
    
    browser.getCapabilities().then(function(caps) {
        browserName = caps.get('browserName');
    });
  });

  it('should display the expected drag handles', () => {
    
    // Confirm the appropriate handles are displayed for each slider.
    expect(page.getHandleAttribute(page.slider1, 'lower', 'hidden')).toBeNull();
    expect(page.getHandleAttribute(page.slider1, 'upper', 'hidden')).not.toBeNull();
    
    expect(page.getHandleAttribute(page.slider2, 'lower', 'hidden')).toBeNull();
    expect(page.getHandleAttribute(page.slider2, 'upper', 'hidden')).not.toBeNull();
    
    expect(page.getHandleAttribute(page.slider3, 'lower', 'hidden')).toBeNull();
    expect(page.getHandleAttribute(page.slider3, 'upper', 'hidden')).not.toBeNull();
    
    expect(page.getHandleAttribute(page.slider4, 'lower', 'hidden')).toBeNull();
    expect(page.getHandleAttribute(page.slider4, 'upper', 'hidden')).not.toBeNull();
    
    expect(page.getHandleAttribute(page.slider5, 'lower', 'hidden')).toBeNull();
    expect(page.getHandleAttribute(page.slider5, 'upper', 'hidden')).toBeNull();
    
    expect(page.getHandleAttribute(page.slider6, 'lower', 'hidden')).toBeNull();
    expect(page.getHandleAttribute(page.slider6, 'upper', 'hidden')).toBeNull();
    
    expect(page.getHandleAttribute(page.slider7, 'lower', 'hidden')).toBeNull();
    expect(page.getHandleAttribute(page.slider7, 'upper', 'hidden')).toBeNull();
    
  });
  
  it('should display the expected ticks', () => {
    
    // Button Handle - Custom Labels.
    expect(page.getTickAttribute(page.slider1, 'hidden', 0)).toBeNull();
    expect(page.getTickAttribute(page.slider1, 'hidden', 3)).not.toBeNull();
    expect(page.getTickAttribute(page.slider1, 'hidden', 10)).toBeNull();
    expect(page.getTickAttribute(page.slider1, 'hidden', 15)).not.toBeNull();
    expect(page.getTickAttribute(page.slider1, 'hidden', 20)).toBeNull();
    
    expect<any>(page.getTickLabel(page.slider1, 0)).toEqual('Minimum');
    expect<any>(page.getTickLabel(page.slider1, 3)).toEqual('');
    expect<any>(page.getTickLabel(page.slider1, 10)).toEqual('Default');
    expect<any>(page.getTickLabel(page.slider1, 15)).toEqual('');
    expect<any>(page.getTickLabel(page.slider1, 20)).toEqual('Maximum');
    
    expect(page.getTickAttribute(page.slider1, 'class', 0)).toContain('major');
    expect(page.getTickAttribute(page.slider1, 'class', 3)).toContain('minor');
    expect(page.getTickAttribute(page.slider1, 'class', 10)).toContain('major');
    expect(page.getTickAttribute(page.slider1, 'class', 15)).toContain('minor');
    expect(page.getTickAttribute(page.slider1, 'class', 20)).toContain('major');
    
    // Line Handle - Callout on Drag.
    expect(page.getTickAttribute(page.slider2, 'hidden', 0)).toBeNull();
    expect(page.getTickAttribute(page.slider2, 'hidden', 2)).toBeNull();
    expect(page.getTickAttribute(page.slider2, 'hidden', 4)).toBeNull();
    
    expect<any>(page.getTickLabel(page.slider2, 0)).toEqual('1');
    expect<any>(page.getTickLabel(page.slider2, 2)).toEqual('');
    expect<any>(page.getTickLabel(page.slider2, 4)).toEqual('5');
    
    expect(page.getTickAttribute(page.slider2, 'class', 0)).toContain('major');
    expect(page.getTickAttribute(page.slider2, 'class', 2)).toContain('minor');
    expect(page.getTickAttribute(page.slider2, 'class', 4)).toContain('major');
    
    // Narrow - Track Styling - Snapping.
    expect(page.getTickAttribute(page.slider3, 'hidden', 0)).toBeNull();
    expect(page.getTickAttribute(page.slider3, 'hidden', 3)).toBeNull();
    expect(page.getTickAttribute(page.slider3, 'hidden', 5)).toBeNull();
    
    expect<any>(page.getTickLabel(page.slider3, 0)).toEqual('0');
    expect<any>(page.getTickLabel(page.slider3, 3)).toEqual('3');
    expect<any>(page.getTickLabel(page.slider3, 5)).toEqual('5');
    
    expect(page.getTickAttribute(page.slider3, 'class', 0)).toContain('major');
    expect(page.getTickAttribute(page.slider3, 'class', 3)).toContain('minor');
    expect(page.getTickAttribute(page.slider3, 'class', 5)).toContain('major');
    
    // Narrow - Gradient Track Styling - Callout on Hover.
    expect(page.getTickAttribute(page.slider4, 'hidden', 0)).toBeNull();
    expect(page.getTickAttribute(page.slider4, 'hidden', 5)).toBeNull();
    expect(page.getTickAttribute(page.slider4, 'hidden', 7)).toBeNull();
    expect(page.getTickAttribute(page.slider4, 'hidden', 10)).toBeNull();
    
    expect<any>(page.getTickLabel(page.slider4, 0)).toEqual('0');
    expect<any>(page.getTickLabel(page.slider4, 5)).toEqual('50');
    expect<any>(page.getTickLabel(page.slider4, 7)).toEqual('');
    expect<any>(page.getTickLabel(page.slider4, 10)).toEqual('100');
    
    expect(page.getTickAttribute(page.slider4, 'class', 0)).toContain('major');
    expect(page.getTickAttribute(page.slider4, 'class', 5)).toContain('major');
    expect(page.getTickAttribute(page.slider4, 'class', 7)).toContain('minor');
    expect(page.getTickAttribute(page.slider4, 'class', 10)).toContain('major');
    
    // Range Track - Persistent Callout.
    expect(page.confirmTicksExist(page.slider5)).toBeFalsy();
    
    // Range Track Style - Custom Callout Styles.
    expect(page.getTickAttribute(page.slider6, 'hidden', 0)).toBeNull();
    expect(page.getTickAttribute(page.slider6, 'hidden', 5)).toBeNull();
    expect(page.getTickAttribute(page.slider6, 'hidden', 10)).toBeNull();
    expect(page.getTickAttribute(page.slider6, 'hidden', 12)).toBeNull();
    expect(page.getTickAttribute(page.slider6, 'hidden', 20)).toBeNull();
    
    expect<any>(page.getTickLabel(page.slider6, 0)).toEqual('0');
    expect<any>(page.getTickLabel(page.slider6, 5)).toEqual('25');
    expect<any>(page.getTickLabel(page.slider6, 10)).toEqual('50');
    expect<any>(page.getTickLabel(page.slider6, 12)).toEqual('');
    expect<any>(page.getTickLabel(page.slider6, 20)).toEqual('100');
    
    expect(page.getTickAttribute(page.slider6, 'class', 0)).toContain('major');
    expect(page.getTickAttribute(page.slider6, 'class', 5)).toContain('major');
    expect(page.getTickAttribute(page.slider6, 'class', 10)).toContain('major');
    expect(page.getTickAttribute(page.slider6, 'class', 12)).toContain('minor');
    expect(page.getTickAttribute(page.slider6, 'class', 20)).toContain('major');
    
    // Range Slider with Text Inputs.
    expect(page.getTickAttribute(page.slider7, 'hidden', 0)).toBeNull();
    expect(page.getTickAttribute(page.slider7, 'hidden', 5)).toBeNull();
    expect(page.getTickAttribute(page.slider7, 'hidden', 6)).toBeNull();
    expect(page.getTickAttribute(page.slider7, 'hidden', 10)).toBeNull();
    expect(page.getTickAttribute(page.slider7, 'hidden', 20)).toBeNull();
    
    expect<any>(page.getTickLabel(page.slider7, 0)).toEqual('0');
    expect<any>(page.getTickLabel(page.slider7, 5)).toEqual('25');
    expect<any>(page.getTickLabel(page.slider7, 6)).toEqual('');
    expect<any>(page.getTickLabel(page.slider7, 10)).toEqual('50');
    expect<any>(page.getTickLabel(page.slider7, 20)).toEqual('100');
    
    expect(page.getTickAttribute(page.slider7, 'class', 0)).toContain('major');
    expect(page.getTickAttribute(page.slider7, 'class', 5)).toContain('major');
    expect(page.getTickAttribute(page.slider7, 'class', 6)).toContain('minor');
    expect(page.getTickAttribute(page.slider7, 'class', 10)).toContain('major');
    expect(page.getTickAttribute(page.slider7, 'class', 20)).toContain('major');
    
  });
  
  it('should have persistent tooltips', () => {
    
    // Range Track - Persistent Callout.
    expect(page.confirmTooltipExists(page.slider5, 'lower')).toBeTruthy();
    expect(page.confirmTooltipExists(page.slider5, 'upper')).toBeTruthy();
    expect<any>(page.getTooltipValue(page.slider5, 'lower')).toEqual('1234');
    expect<any>(page.getTooltipValue(page.slider5, 'upper')).toEqual('9876');
    
    // Move the handles and confirm that the tooltips are still displayed.
    page.dragAndDropHandle(page.slider5, 'lower', {x: 100, y: 0});
    page.dragAndDropHandle(page.slider5, 'upper', {x: -2000, y: 0});
    expect(page.confirmTooltipExists(page.slider5, 'lower')).toBeTruthy();
    expect(page.confirmTooltipExists(page.slider5, 'upper')).toBeTruthy();
    
  });
  
  it('should have custom tooltips', () => {
    
    // Range Track Style - Custom Callout Styles
    expect(page.getTooltipAttribute(page.slider6, 'lower', 'style')).toContain('background-color: rgb(59, 170, 67)');
    expect(page.getTooltipAttribute(page.slider6, 'upper', 'style')).toContain('background-color: rgb(59, 170, 67)');
    page.moveMouseToHandle(page.slider6, 'lower');
    expect<any>(page.getTooltipValue(page.slider6, 'lower')).toEqual('22');
    page.moveMouseToHandle(page.slider6, 'upper');
    expect<any>(page.getTooltipValue(page.slider6, 'upper')).toEqual('76');
    
  });
  
  it('should have correct initial values', () => {
    
    // Get initial values from tooltips where available; otherwise, use the style attribute.
    expect(page.getHandleAttribute(page.slider1, 'lower', 'style')).toContain('left: 50%');
    
    page.mouseDownOnHandle(page.slider2, 'lower');
    expect<any>(page.getTooltipValue(page.slider2, 'lower')).toEqual('3.8');
    
    expect(page.getHandleAttribute(page.slider3, 'lower', 'style')).toContain('left: 80%');
    
    page.moveMouseToHandle(page.slider4, 'lower');
    expect<any>(page.getTooltipValue(page.slider4, 'lower')).toEqual('60');
    
    page.moveMouseToHandle(page.slider5, 'lower');
    expect<any>(page.getTooltipValue(page.slider5, 'lower')).toEqual('1234');
    page.moveMouseToHandle(page.slider5, 'upper');
    expect<any>(page.getTooltipValue(page.slider5, 'upper')).toEqual('9876');
    
    page.moveMouseToHandle(page.slider6, 'lower');
    expect<any>(page.getTooltipValue(page.slider6, 'lower')).toEqual('22');
    page.moveMouseToHandle(page.slider6, 'upper');
    expect<any>(page.getTooltipValue(page.slider6, 'upper')).toEqual('76');
    
    page.moveMouseToHandle(page.slider7, 'lower');
    expect<any>(page.getTooltipValue(page.slider7, 'lower')).toEqual('25');
    page.moveMouseToHandle(page.slider7, 'upper');
    expect<any>(page.getTooltipValue(page.slider7, 'upper')).toEqual('75');
    
    expect<any>(page.getInputValue(page.input1)).toEqual('25');
    expect<any>(page.getInputValue(page.input2)).toEqual('75');
    
  });
  
  it('should react to drag and drops', () => {
    
    // Move the hanlde(s) along the track. Get values from tooltips where available; otherwise, use the style attribute.    
    page.dragAndDropHandle(page.slider1, 'lower', {x: -2000, y: 0});
    expect(page.getHandleAttribute(page.slider1, 'lower', 'style')).toContain('left: 0');
    page.dragAndDropHandle(page.slider1, 'lower', {x: 2000, y: 0});
    expect(page.getHandleAttribute(page.slider1, 'lower', 'style')).toContain('left: 100');
    
    page.dragAndDropHandle(page.slider2, 'lower', {x: -2000, y: 0});
    page.mouseDownOnHandle(page.slider2, 'lower');
    expect<any>(page.getTooltipValue(page.slider2, 'lower')).toEqual('1.0');
    page.dragAndDropHandle(page.slider2, 'lower', {x: 2000, y: 0});
    page.mouseDownOnHandle(page.slider2, 'lower');
    expect<any>(page.getTooltipValue(page.slider2, 'lower')).toEqual('5.0');
    
    page.dragAndDropHandle(page.slider3, 'lower', {x: -2000, y: 0});
    expect(page.getHandleAttribute(page.slider3, 'lower', 'style')).toContain('left: 0');
    page.dragAndDropHandle(page.slider3, 'lower', {x: 2000, y: 0});
    expect(page.getHandleAttribute(page.slider3, 'lower', 'style')).toContain('left: 100');
    
    page.dragAndDropHandle(page.slider4, 'lower', {x: -2000, y: 0});
    page.mouseDownOnHandle(page.slider4, 'lower');
    expect<any>(page.getTooltipValue(page.slider4, 'lower')).toEqual('0');
    page.dragAndDropHandle(page.slider4, 'lower', {x: 2000, y: 0});
    page.mouseDownOnHandle(page.slider4, 'lower');
    expect<any>(page.getTooltipValue(page.slider4, 'lower')).toEqual('100');
    
    page.dragAndDropHandle(page.slider5, 'lower', {x: -2000, y: 0});
    expect<any>(page.getTooltipValue(page.slider5, 'lower')).toEqual('1000');
    page.dragAndDropHandle(page.slider5, 'upper', {x: 2000, y: 0});
    expect<any>(page.getTooltipValue(page.slider5, 'upper')).toEqual('10000');
    
    page.dragAndDropHandle(page.slider6, 'lower', {x: -2000, y: 0});
    page.moveMouseToHandle(page.slider6, 'lower');
    expect<any>(page.getTooltipValue(page.slider6, 'lower')).toEqual('0');
    page.dragAndDropHandle(page.slider6, 'upper', {x: 2000, y: 0});
    page.moveMouseToHandle(page.slider6, 'upper');
    expect<any>(page.getTooltipValue(page.slider6, 'upper')).toEqual('100');
    
    page.dragAndDropHandle(page.slider7, 'lower', {x: -2000, y: 0});
    page.moveMouseToHandle(page.slider7, 'lower');
    expect<any>(page.getTooltipValue(page.slider7, 'lower')).toEqual('0');
    page.dragAndDropHandle(page.slider7, 'upper', {x: 2000, y: 0});
    page.moveMouseToHandle(page.slider7, 'upper');
    expect<any>(page.getTooltipValue(page.slider7, 'upper')).toEqual('100');
    
  });
  
  it('should display tooltips', () => {
    
    // Line Handle - Callout on Drag.
    page.mouseDownOnHandle(page.slider2, 'lower');
    expect<any>(page.getTooltipValue(page.slider2, 'lower')).toEqual('3.8');
    page.mouseUpFromHandle(page.slider2, 'lower');
    
    page.moveHandleToTick(page.slider2, 'lower', 0);
    page.mouseDownOnHandle(page.slider2, 'lower');
    expect<any>(page.getTooltipValue(page.slider2, 'lower')).toEqual('1.0');
    page.mouseUpFromHandle(page.slider2, 'lower');
    
    page.moveHandleToTick(page.slider2, 'lower', 4);
    page.mouseDownOnHandle(page.slider2, 'lower');
    expect<any>(page.getTooltipValue(page.slider2, 'lower')).toEqual('5.0');
    page.mouseUpFromHandle(page.slider6, 'lower');
    
    page.moveHandleToTick(page.slider2, 'lower', 3);
    page.mouseDownOnHandle(page.slider2, 'lower');
    expect<any>(page.getTooltipValue(page.slider2, 'lower')).toEqual('4.0');
    page.mouseUpFromHandle(page.slider2, 'lower');
    
    // Narrow - Gradient Track Styling - Callout on Hover.
    page.moveMouseToHandle(page.slider4, 'lower');
    expect<any>(page.getTooltipValue(page.slider4, 'lower')).toEqual('60');
    
    page.moveHandleToTick(page.slider4, 'lower', 0);
    page.moveMouseToHandle(page.slider4, 'lower');
    expect<any>(page.getTooltipValue(page.slider4, 'lower')).toEqual('0');
    
    page.moveHandleToTick(page.slider4, 'lower', 10);
    page.moveMouseToHandle(page.slider4, 'lower');
    expect<any>(page.getTooltipValue(page.slider4, 'lower')).toEqual('100');
    
    page.moveHandleToTick(page.slider4, 'lower', 9);
    page.moveMouseToHandle(page.slider4, 'lower');
    expect<any>(page.getTooltipValue(page.slider4, 'lower')).toEqual('91');
    
    page.moveMouseToTick(page.slider4, 8);
    page.moveMouseToHandle(page.slider4, 'lower');
    expect<any>(page.getTooltipValue(page.slider4, 'lower')).toEqual('91');
    
  });
  
  it('should snap to ticks', () => {
    
    // Narrow - Track Styling - Snapping.
    page.dragAndDropHandle(page.slider3, 'lower', {x: -100, y: 0});
    page.mouseDownOnHandle(page.slider3, 'lower');
    expect(page.getHandleAttribute(page.slider3, 'lower', 'style')).toContain('left: 60');
    page.mouseUpFromHandle(page.slider3, 'lower');
    
    page.dragAndDropHandle(page.slider3, 'lower', {x: 100, y: 0});
    page.mouseDownOnHandle(page.slider3, 'lower');
    expect(page.getHandleAttribute(page.slider3, 'lower', 'style')).toContain('left: 80');
    page.mouseUpFromHandle(page.slider3, 'lower');
    
    page.dragAndDropHandle(page.slider3, 'lower', {x: 1000, y: 0});
    page.mouseDownOnHandle(page.slider3, 'lower');
    expect(page.getHandleAttribute(page.slider3, 'lower', 'style')).toContain('left: 100');
    page.mouseUpFromHandle(page.slider3, 'lower');
    
  });
  
  it('should never allow negative ranges', () => {
    
    // Range Track - Persistent Callout. Try to move the upper handle to a value less than the lower handle's.
    page.dragAndDropHandle(page.slider5, 'lower', {x: 200, y: 0});
    page.dragAndDropHandle(page.slider5, 'upper', {x: -2000, y: 0});
    expect(page.getTooltipValue(page.slider5, 'lower')).toEqual(page.getTooltipValue(page.slider5, 'upper'));
    
    expect(page.getSliderRangeAttribute(page.slider5, 'style')).toContain('flex-grow: 0;');
    
    // Range Track Style - Custom Callout Styles. Try to move the lower handle to a value greater than the upper handle's.
    page.dragAndDropHandle(page.slider6, 'upper', {x: -100, y: 0});
    page.dragAndDropHandle(page.slider6, 'lower', {x: 2000, y: 0});
    expect(page.getTooltipValue(page.slider6, 'lower')).toEqual(page.getTooltipValue(page.slider6, 'upper'));
    
    expect(page.getSliderRangeAttribute(page.slider6, 'style')).toContain('flex-grow: 0;');
    
  });
  
  it('should synchronize with text inputs', () => {
    
    // Move handles and confirm the associated inputs are updated with the correct values.
    page.moveMouseToHandle(page.slider7, 'lower');
    expect<any>(page.getTooltipValue(page.slider7, 'lower')).toEqual('25');
    page.dragAndDropHandle(page.slider7, 'lower', {x: -100, y: 0});
    page.mouseDownOnHandle(page.slider7, 'lower');
    expect<any>(page.getTooltipValue(page.slider7, 'lower')).toEqual('20');
    page.mouseUpFromHandle(page.slider7, 'lower');
    
    page.moveMouseToHandle(page.slider7, 'upper');
    expect<any>(page.getTooltipValue(page.slider7, 'upper')).toEqual('75');
    page.dragAndDropHandle(page.slider7, 'upper', {x: 100, y: 0});
    page.mouseDownOnHandle(page.slider7, 'upper');
    expect<any>(page.getTooltipValue(page.slider7, 'upper')).toEqual('80');
    page.mouseUpFromHandle(page.slider7, 'upper');
    
    expect<any>(page.getInputValue(page.input1)).toEqual('20');
    expect<any>(page.getInputValue(page.input2)).toEqual('80');
    
    // Enter numbers into the inputs and confirm that the handles' positions are changed accordingly.
    page.input1.clear();
    page.input1.sendKeys('40');
    page.clickOnSlider(page.slider7);
    page.moveMouseToHandle(page.slider7, 'lower');
    expect<any>(page.getTooltipValue(page.slider7, 'lower')).toEqual('40');
    
    page.input2.clear();
    page.input2.sendKeys('65' + Key.ENTER);
    page.moveMouseToHandle(page.slider7, 'upper');
    expect<any>(page.getTooltipValue(page.slider7, 'upper')).toEqual('65');
   
    page.input1.clear();
    page.input1.sendKeys('50' + Key.ENTER);
    page.moveMouseToHandle(page.slider7, 'lower');
    expect<any>(page.getTooltipValue(page.slider7, 'lower')).toEqual('50');
    
    page.input2.clear();
    page.input2.sendKeys('40' + Key.ENTER);
    page.moveMouseToHandle(page.slider7, 'upper');
    expect<any>(page.getTooltipValue(page.slider7, 'upper')).toEqual('50');
    
  });
});