import { SlidersPersistentCalloutPage } from './sliders-persistent-callout.po.spec';

describe('Sliders with persistent callouts', () => {
  let page: SlidersPersistentCalloutPage;

  beforeEach(async () => {
    page = new SlidersPersistentCalloutPage();
    await page.getPage();
  });

  it('should display the expected drag handles', async () => {
    // Confirm the appropriate handles are displayed for each slider.
    expect(await page.getHandleAttribute(page.rangeCallout, 'lower', 'hidden')).toBeNull();
    expect(await page.getHandleAttribute(page.rangeCallout, 'upper', 'hidden')).toBeNull();

    expect(await page.getHandleAttribute(page.rangeCalloutOnDrag, 'lower', 'hidden')).toBeNull();
    expect(await page.getHandleAttribute(page.rangeCalloutOnDrag, 'upper', 'hidden')).toBeNull();
  });

  it('should display the expected ticks', async () => {
    // Range Track - Persistent Callout.
    expect(await page.confirmTicksExist(page.rangeCallout)).toBe(false);
    expect(await page.confirmTicksExist(page.rangeCalloutOnDrag)).toBe(false);
  });

  it('should have persistent tooltips', async () => {
    // Range Track - Persistent Callout.
    expect(await page.confirmTooltipExists(page.rangeCallout, 'lower')).toBeTruthy();
    expect(await page.confirmTooltipExists(page.rangeCallout, 'upper')).toBeTruthy();
    expect(await page.getTooltipValue(page.rangeCallout, 'lower')).toEqual('1234');
    expect(await page.getTooltipValue(page.rangeCallout, 'upper')).toEqual('9876');

    // Move the handles and confirm that the tooltips are still displayed.
    await page.dragAndDropHandle(page.rangeCallout, 'lower', { x: 100, y: 0 });
    await page.dragAndDropHandle(page.rangeCallout, 'upper', { x: -2000, y: 0 });
    expect(await page.confirmTooltipExists(page.rangeCallout, 'lower')).toBeTruthy();
    expect(await page.confirmTooltipExists(page.rangeCallout, 'upper')).toBeTruthy();

    expect(await page.confirmTooltipExists(page.rangeCalloutOnDrag, 'lower')).toBeTruthy();
    expect(await page.confirmTooltipExists(page.rangeCalloutOnDrag, 'upper')).toBeTruthy();
  });

  it('should have custom tooltips', async () => {
    // should have dynamic tooltips
    expect(await page.getTooltipClass(page.rangeCalloutOnDrag, 'lower')).toContain(
      'tooltip-dynamic'
    );
    expect(await page.getTooltipClass(page.rangeCalloutOnDrag, 'upper')).toContain(
      'tooltip-dynamic'
    );
  });

  it('should have correct initial values', async () => {
    await page.moveMouseToHandle(page.rangeCallout, 'lower');
    expect(await page.getTooltipValue(page.rangeCallout, 'lower')).toEqual('1234');
    await page.moveMouseToHandle(page.rangeCallout, 'upper');
    expect(await page.getTooltipValue(page.rangeCallout, 'upper')).toEqual('9876');

    await page.moveMouseToHandle(page.rangeCalloutOnDrag, 'lower');
    expect(await page.getTooltipValue(page.rangeCalloutOnDrag, 'lower')).toEqual('1234');
    await page.moveMouseToHandle(page.rangeCalloutOnDrag, 'upper');
    expect(await page.getTooltipValue(page.rangeCalloutOnDrag, 'upper')).toEqual('9876');
  });

  it('should react to drag and drops', async () => {
    // Move the handle(s) along the track. Get values from tooltips where available; otherwise, use the style attribute.
    await page.dragAndDropHandle(page.rangeCallout, 'lower', { x: -2000, y: 0 });
    expect(await page.getTooltipValue(page.rangeCallout, 'lower')).toEqual('1000');
    await page.dragAndDropHandle(page.rangeCallout, 'upper', { x: 2000, y: 0 });
    expect(await page.getTooltipValue(page.rangeCallout, 'upper')).toEqual('10000');

    await page.dragAndDropHandle(page.rangeCalloutOnDrag, 'lower', { x: -2000, y: 0 });
    expect(await page.getTooltipValue(page.rangeCalloutOnDrag, 'lower')).toEqual('1000');
    await page.dragAndDropHandle(page.rangeCalloutOnDrag, 'upper', { x: 2000, y: 0 });
    expect(await page.getTooltipValue(page.rangeCalloutOnDrag, 'upper')).toEqual('10000');
  });

  it('should never allow negative ranges', async () => {
    // Range Track - Persistent Callout. Try to move the upper handle to a value less than the lower handle's.
    await page.dragAndDropHandle(page.rangeCallout, 'lower', { x: 200, y: 0 });
    await page.dragAndDropHandle(page.rangeCallout, 'upper', { x: -2000, y: 0 });
    expect(await page.getTooltipValue(page.rangeCallout, 'lower')).toEqual(
      await page.getTooltipValue(page.rangeCallout, 'upper')
    );

    expect(await page.getSliderRangeAttribute(page.rangeCallout, 'style')).toContain(
      'flex-grow: 0;'
    );
  });
});
