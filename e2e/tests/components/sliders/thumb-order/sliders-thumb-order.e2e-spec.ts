import { SlidersThumbOrderPage } from './sliders-thumb-order.po.spec';

describe('Sliders thumb orders', () => {
  let page: SlidersThumbOrderPage;

  beforeEach(async () => {
    page = new SlidersThumbOrderPage();
    await page.getPage();
  });

  describe('Lower and upper at minimum', () => {
    it('Should prioritise upper thumb over lower thumb', async () => {
      page.clickOnSlider(page.rangeValueMin);
      page.moveMouseToHandle(page.rangeValueMin, 'upper');
      expect(await page.getTooltipValue(page.rangeValueMin, 'upper')).toEqual('0');

      await page.dragAndDropHandle(page.rangeValueMin, 'upper', { x: 200, y: 0 });
      await page.moveMouseToHandle(page.rangeValueMin, 'upper');
      expect(await page.getTooltipValue(page.rangeValueMin, 'upper')).toEqual('100');
    });
  });

  describe('Lower and upper in middle', () => {
    it('Should prioritise upper thumb over lower thumb', async () => {
      page.clickOnSlider(page.rangeValueMiddle);
      page.moveMouseToHandle(page.rangeValueMiddle, 'upper');
      expect(await page.getTooltipValue(page.rangeValueMiddle, 'upper')).toEqual('50');

      await page.dragAndDropHandle(page.rangeValueMiddle, 'upper', { x: 200, y: 0 });
      await page.moveMouseToHandle(page.rangeValueMiddle, 'upper');
      expect(await page.getTooltipValue(page.rangeValueMiddle, 'upper')).toEqual('100');
    });
  });

  describe('Lower and upper at maximum', () => {
    it('Should prioritise lower thumb over upper thumb', async () => {
      page.clickOnSlider(page.rangeValueMax);
      page.moveMouseToHandle(page.rangeValueMax, 'lower');
      expect(await page.getTooltipValue(page.rangeValueMax, 'lower')).toEqual('100');

      await page.dragAndDropHandle(page.rangeValueMax, 'lower', { x: -200, y: 0 });
      await page.moveMouseToHandle(page.rangeValueMax, 'lower');
      expect(await page.getTooltipValue(page.rangeValueMax, 'lower')).toEqual('0');
    });
  });

  describe('Lower at 99 and upper at maximum', () => {
    it('Should prioritise lower thumb over upper thumb', async () => {
      page.clickOnSlider(page.rangeValueNearlyMax);
      page.moveMouseToHandle(page.rangeValueNearlyMax, 'lower');
      expect(await page.getTooltipValue(page.rangeValueNearlyMax, 'lower')).toEqual('99');

      await page.dragAndDropHandle(page.rangeValueNearlyMax, 'lower', { x: -200, y: 0 });
      await page.moveMouseToHandle(page.rangeValueNearlyMax, 'lower');
      expect(await page.getTooltipValue(page.rangeValueNearlyMax, 'lower')).toEqual('0');
    });
  });

  describe('Minimum is not zero', () => {
    it('Should prioritise upper thumb over lower thumb', async () => {
      page.clickOnSlider(page.rangeValueMinNotZero);
      page.moveMouseToHandle(page.rangeValueMinNotZero, 'upper');
      expect(await page.getTooltipValue(page.rangeValueMinNotZero, 'upper')).toEqual('9900');

      await page.dragAndDropHandle(page.rangeValueMinNotZero, 'upper', { x: 200, y: 0 });
      await page.moveMouseToHandle(page.rangeValueMinNotZero, 'upper');
      expect(await page.getTooltipValue(page.rangeValueMinNotZero, 'upper')).toEqual('10000');
    });
  });
});
