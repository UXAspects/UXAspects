import { browser, Key, protractor } from 'protractor';
import { imageCompareFullPageScreen } from '../common/image-compare';
import { SlidersPage } from './sliders.po.spec';

describe('Sliders', () => {

    let page: SlidersPage;

    beforeEach(async () => {
        page = new SlidersPage();
        await page.getPage();
    });

    it('should display the expected drag handles', async () => {

        // Confirm the appropriate handles are displayed for each slider.
        expect(await page.getHandleAttribute(page.singleValueCustomLabels, 'lower', 'hidden')).toBeNull();
        expect(await page.getHandleAttribute(page.singleValueCustomLabels, 'upper', 'hidden')).not.toBeNull();

        expect(await page.getHandleAttribute(page.singleValueCalloutOnDrag, 'lower', 'hidden')).toBeNull();
        expect(await page.getHandleAttribute(page.singleValueCalloutOnDrag, 'upper', 'hidden')).not.toBeNull();

        expect(await page.getHandleAttribute(page.singleValueNarrowSnapping, 'lower', 'hidden')).toBeNull();
        expect(await page.getHandleAttribute(page.singleValueNarrowSnapping, 'upper', 'hidden')).not.toBeNull();

        expect(await page.getHandleAttribute(page.singleValueNarrowCalloutOnHover, 'lower', 'hidden')).toBeNull();
        expect(await page.getHandleAttribute(page.singleValueNarrowCalloutOnHover, 'upper', 'hidden')).not.toBeNull();

        expect(await page.getHandleAttribute(page.rangeCalloutCustom, 'lower', 'hidden')).toBeNull();
        expect(await page.getHandleAttribute(page.rangeCalloutCustom, 'upper', 'hidden')).toBeNull();

        expect(await page.getHandleAttribute(page.rangeWithTextInputs, 'lower', 'hidden')).toBeNull();
        expect(await page.getHandleAttribute(page.rangeWithTextInputs, 'upper', 'hidden')).toBeNull();

        expect(await imageCompareFullPageScreen('sliders-initial')).toEqual(0);
    });

    it('should display the expected ticks', async () => {

        // Button Handle - Custom Labels.
        expect(await page.getTickAttribute(page.singleValueCustomLabels, 'hidden', 0)).toBeNull();
        expect(await page.getTickAttribute(page.singleValueCustomLabels, 'hidden', 1)).toBeNull();
        expect(await page.getTickAttribute(page.singleValueCustomLabels, 'hidden', 2)).toBeNull();

        expect(await page.getTickLabel(page.singleValueCustomLabels, 0)).toEqual('Minimum');
        expect(await page.getTickLabel(page.singleValueCustomLabels, 1)).toEqual('Default');
        expect(await page.getTickLabel(page.singleValueCustomLabels, 2)).toEqual('Maximum');

        expect(await page.getTickAttribute(page.singleValueCustomLabels, 'class', 0)).toContain('major');
        expect(await page.getTickAttribute(page.singleValueCustomLabels, 'class', 1)).toContain('major');
        expect(await page.getTickAttribute(page.singleValueCustomLabels, 'class', 2)).toContain('major');

        // Line Handle - Callout on Drag.
        expect(await page.getTickAttribute(page.singleValueCalloutOnDrag, 'hidden', 0)).toBeNull();
        expect(await page.getTickAttribute(page.singleValueCalloutOnDrag, 'hidden', 2)).toBeNull();
        expect(await page.getTickAttribute(page.singleValueCalloutOnDrag, 'hidden', 4)).toBeNull();

        expect(await page.getTickLabel(page.singleValueCalloutOnDrag, 0)).toEqual('1');
        expect(await page.getTickLabel(page.singleValueCalloutOnDrag, 2)).toEqual('');
        expect(await page.getTickLabel(page.singleValueCalloutOnDrag, 4)).toEqual('5');

        expect(await page.getTickAttribute(page.singleValueCalloutOnDrag, 'class', 0)).toContain('major');
        expect(await page.getTickAttribute(page.singleValueCalloutOnDrag, 'class', 2)).toContain('minor');
        expect(await page.getTickAttribute(page.singleValueCalloutOnDrag, 'class', 4)).toContain('major');

        // Narrow - Track Styling - Snapping.
        expect(await page.getTickAttribute(page.singleValueNarrowSnapping, 'hidden', 0)).toBeNull();
        expect(await page.getTickAttribute(page.singleValueNarrowSnapping, 'hidden', 3)).toBeNull();
        expect(await page.getTickAttribute(page.singleValueNarrowSnapping, 'hidden', 5)).toBeNull();

        expect(await page.getTickLabel(page.singleValueNarrowSnapping, 0)).toEqual('0');
        expect(await page.getTickLabel(page.singleValueNarrowSnapping, 3)).toEqual('3');
        expect(await page.getTickLabel(page.singleValueNarrowSnapping, 5)).toEqual('5');

        expect(await page.getTickAttribute(page.singleValueNarrowSnapping, 'class', 0)).toContain('major');
        expect(await page.getTickAttribute(page.singleValueNarrowSnapping, 'class', 3)).toContain('minor');
        expect(await page.getTickAttribute(page.singleValueNarrowSnapping, 'class', 5)).toContain('major');

        // Narrow - Gradient Track Styling - Callout on Hover.
        expect(await page.getTickAttribute(page.singleValueNarrowCalloutOnHover, 'hidden', 0)).toBeNull();
        expect(await page.getTickAttribute(page.singleValueNarrowCalloutOnHover, 'hidden', 5)).toBeNull();
        expect(await page.getTickAttribute(page.singleValueNarrowCalloutOnHover, 'hidden', 7)).toBeNull();
        expect(await page.getTickAttribute(page.singleValueNarrowCalloutOnHover, 'hidden', 10)).toBeNull();

        expect(await page.getTickLabel(page.singleValueNarrowCalloutOnHover, 0)).toEqual('0');
        expect(await page.getTickLabel(page.singleValueNarrowCalloutOnHover, 5)).toEqual('50');
        expect(await page.getTickLabel(page.singleValueNarrowCalloutOnHover, 7)).toEqual('');
        expect(await page.getTickLabel(page.singleValueNarrowCalloutOnHover, 10)).toEqual('100');

        expect(await page.getTickAttribute(page.singleValueNarrowCalloutOnHover, 'class', 0)).toContain('major');
        expect(await page.getTickAttribute(page.singleValueNarrowCalloutOnHover, 'class', 5)).toContain('major');
        expect(await page.getTickAttribute(page.singleValueNarrowCalloutOnHover, 'class', 7)).toContain('minor');
        expect(await page.getTickAttribute(page.singleValueNarrowCalloutOnHover, 'class', 10)).toContain('major');

        // Range Track Style - Custom Callout Styles.
        expect(await page.getTickAttribute(page.rangeCalloutCustom, 'hidden', 0)).toBeNull();
        expect(await page.getTickAttribute(page.rangeCalloutCustom, 'hidden', 5)).toBeNull();
        expect(await page.getTickAttribute(page.rangeCalloutCustom, 'hidden', 10)).toBeNull();
        expect(await page.getTickAttribute(page.rangeCalloutCustom, 'hidden', 12)).toBeNull();
        expect(await page.getTickAttribute(page.rangeCalloutCustom, 'hidden', 20)).toBeNull();

        expect(await page.getTickLabel(page.rangeCalloutCustom, 0)).toEqual('0');
        expect(await page.getTickLabel(page.rangeCalloutCustom, 5)).toEqual('25');
        expect(await page.getTickLabel(page.rangeCalloutCustom, 10)).toEqual('50');
        expect(await page.getTickLabel(page.rangeCalloutCustom, 12)).toEqual('');
        expect(await page.getTickLabel(page.rangeCalloutCustom, 20)).toEqual('100');

        expect(await page.getTickAttribute(page.rangeCalloutCustom, 'class', 0)).toContain('major');
        expect(await page.getTickAttribute(page.rangeCalloutCustom, 'class', 5)).toContain('major');
        expect(await page.getTickAttribute(page.rangeCalloutCustom, 'class', 10)).toContain('major');
        expect(await page.getTickAttribute(page.rangeCalloutCustom, 'class', 12)).toContain('minor');
        expect(await page.getTickAttribute(page.rangeCalloutCustom, 'class', 20)).toContain('major');

        // Range Slider with Text Inputs.
        expect(await page.getTickAttribute(page.rangeWithTextInputs, 'hidden', 0)).toBeNull();
        expect(await page.getTickAttribute(page.rangeWithTextInputs, 'hidden', 5)).toBeNull();
        expect(await page.getTickAttribute(page.rangeWithTextInputs, 'hidden', 6)).toBeNull();
        expect(await page.getTickAttribute(page.rangeWithTextInputs, 'hidden', 10)).toBeNull();
        expect(await page.getTickAttribute(page.rangeWithTextInputs, 'hidden', 20)).toBeNull();

        expect(await page.getTickLabel(page.rangeWithTextInputs, 0)).toEqual('0');
        expect(await page.getTickLabel(page.rangeWithTextInputs, 5)).toEqual('25');
        expect(await page.getTickLabel(page.rangeWithTextInputs, 6)).toEqual('');
        expect(await page.getTickLabel(page.rangeWithTextInputs, 10)).toEqual('50');
        expect(await page.getTickLabel(page.rangeWithTextInputs, 20)).toEqual('100');

        expect(await page.getTickAttribute(page.rangeWithTextInputs, 'class', 0)).toContain('major');
        expect(await page.getTickAttribute(page.rangeWithTextInputs, 'class', 5)).toContain('major');
        expect(await page.getTickAttribute(page.rangeWithTextInputs, 'class', 6)).toContain('minor');
        expect(await page.getTickAttribute(page.rangeWithTextInputs, 'class', 10)).toContain('major');
        expect(await page.getTickAttribute(page.rangeWithTextInputs, 'class', 20)).toContain('major');

    });

    it('should have custom tooltips', async () => {

        // Range Track Style - Custom Callout Styles
        await page.moveMouseToHandle(page.rangeCalloutCustom, 'lower');
        expect(await page.getTooltipValue(page.rangeCalloutCustom, 'lower')).toEqual('22');
        await page.moveMouseToHandle(page.rangeCalloutCustom, 'upper');
        expect(await page.getTooltipValue(page.rangeCalloutCustom, 'upper')).toEqual('76');

        expect(await imageCompareFullPageScreen('sliders-tooltips')).toEqual(0);
    });

    it('should have correct initial values', async () => {

        // Get initial values from tooltips where available; otherwise, use the style attribute.
        expect(await page.getHandleAttribute(page.singleValueCustomLabels, 'lower', 'style')).toContain('left: 50%');

        await page.mouseDownOnHandle(page.singleValueCalloutOnDrag, 'lower');
        expect(await page.getTooltipValue(page.singleValueCalloutOnDrag, 'lower')).toEqual('3.8');

        expect(await page.getHandleAttribute(page.singleValueNarrowSnapping, 'lower', 'style')).toContain('left: 80%');

        await page.moveMouseToHandle(page.singleValueNarrowCalloutOnHover, 'lower');
        expect(await page.getTooltipValue(page.singleValueNarrowCalloutOnHover, 'lower')).toEqual('60');

        await page.moveMouseToHandle(page.rangeCalloutCustom, 'lower');
        expect(await page.getTooltipValue(page.rangeCalloutCustom, 'lower')).toEqual('22');
        await page.moveMouseToHandle(page.rangeCalloutCustom, 'upper');
        expect(await page.getTooltipValue(page.rangeCalloutCustom, 'upper')).toEqual('76');

        await page.moveMouseToHandle(page.rangeWithTextInputs, 'lower');
        expect(await page.getTooltipValue(page.rangeWithTextInputs, 'lower')).toEqual('25');
        await page.moveMouseToHandle(page.rangeWithTextInputs, 'upper');
        expect(await page.getTooltipValue(page.rangeWithTextInputs, 'upper')).toEqual('75');

        expect(await page.getInputValue(page.input1)).toEqual('25');
        expect(await page.getInputValue(page.input2)).toEqual('75');

    });

    it('should react to drag and drops', async () => {

        // Move the hanlde(s) along the track. Get values from tooltips where available; otherwise, use the style attribute.
        await page.dragAndDropHandle(page.singleValueCustomLabels, 'lower', { x: -2000, y: 0 });
        expect(await page.getHandleAttribute(page.singleValueCustomLabels, 'lower', 'style')).toContain('left: 0');
        await page.dragAndDropHandle(page.singleValueCustomLabels, 'lower', { x: 2000, y: 0 });
        expect(await page.getHandleAttribute(page.singleValueCustomLabels, 'lower', 'style')).toContain('left: 100');

        await page.dragAndDropHandle(page.singleValueCalloutOnDrag, 'lower', { x: -2000, y: 0 });
        await page.mouseDownOnHandle(page.singleValueCalloutOnDrag, 'lower');
        expect(await page.getTooltipValue(page.singleValueCalloutOnDrag, 'lower')).toEqual('1.0');
        await page.dragAndDropHandle(page.singleValueCalloutOnDrag, 'lower', { x: 2000, y: 0 });
        await page.mouseDownOnHandle(page.singleValueCalloutOnDrag, 'lower');
        expect(await page.getTooltipValue(page.singleValueCalloutOnDrag, 'lower')).toEqual('5.0');

        await page.dragAndDropHandle(page.singleValueNarrowSnapping, 'lower', { x: -2000, y: 0 });
        expect(await page.getHandleAttribute(page.singleValueNarrowSnapping, 'lower', 'style')).toContain('left: 0');
        await page.dragAndDropHandle(page.singleValueNarrowSnapping, 'lower', { x: 2000, y: 0 });
        expect(await page.getHandleAttribute(page.singleValueNarrowSnapping, 'lower', 'style')).toContain('left: 100');

        await page.dragAndDropHandle(page.singleValueNarrowCalloutOnHover, 'lower', { x: -2000, y: 0 });
        await page.mouseDownOnHandle(page.singleValueNarrowCalloutOnHover, 'lower');
        expect(await page.getTooltipValue(page.singleValueNarrowCalloutOnHover, 'lower')).toEqual('0');
        await page.dragAndDropHandle(page.singleValueNarrowCalloutOnHover, 'lower', { x: 2000, y: 0 });
        await page.mouseDownOnHandle(page.singleValueNarrowCalloutOnHover, 'lower');
        expect(await page.getTooltipValue(page.singleValueNarrowCalloutOnHover, 'lower')).toEqual('100');

        await page.dragAndDropHandle(page.rangeCalloutCustom, 'lower', { x: -2000, y: 0 });
        await page.moveMouseToHandle(page.rangeCalloutCustom, 'lower');
        expect(await page.getTooltipValue(page.rangeCalloutCustom, 'lower')).toEqual('0');
        await page.dragAndDropHandle(page.rangeCalloutCustom, 'upper', { x: 2000, y: 0 });
        await page.moveMouseToHandle(page.rangeCalloutCustom, 'upper');
        expect(await page.getTooltipValue(page.rangeCalloutCustom, 'upper')).toEqual('100');

        await page.dragAndDropHandle(page.rangeWithTextInputs, 'lower', { x: -2000, y: 0 });
        await page.moveMouseToHandle(page.rangeWithTextInputs, 'lower');
        expect(await page.getTooltipValue(page.rangeWithTextInputs, 'lower')).toEqual('0');
        await page.dragAndDropHandle(page.rangeWithTextInputs, 'upper', { x: 2000, y: 0 });
        await page.moveMouseToHandle(page.rangeWithTextInputs, 'upper');
        expect(await page.getTooltipValue(page.rangeWithTextInputs, 'upper')).toEqual('100');

    });

    it('should display tooltips', async () => {

        // Line Handle - Callout on Drag.
        await page.mouseDownOnHandle(page.singleValueCalloutOnDrag, 'lower');
        expect(await page.getTooltipValue(page.singleValueCalloutOnDrag, 'lower')).toEqual('3.8');
        await page.mouseUpFromHandle(page.singleValueCalloutOnDrag, 'lower');

        await page.moveHandleToTick(page.singleValueCalloutOnDrag, 'lower', 0);
        await page.mouseDownOnHandle(page.singleValueCalloutOnDrag, 'lower');
        expect(await page.getTooltipValue(page.singleValueCalloutOnDrag, 'lower')).toEqual('1.0');
        await page.mouseUpFromHandle(page.singleValueCalloutOnDrag, 'lower');

        await page.moveHandleToTick(page.singleValueCalloutOnDrag, 'lower', 4);
        await page.mouseDownOnHandle(page.singleValueCalloutOnDrag, 'lower');
        expect(await page.getTooltipValue(page.singleValueCalloutOnDrag, 'lower')).toEqual('5.0');
        await page.mouseUpFromHandle(page.rangeCalloutCustom, 'lower');

        await page.moveHandleToTick(page.singleValueCalloutOnDrag, 'lower', 3);
        await page.mouseDownOnHandle(page.singleValueCalloutOnDrag, 'lower');
        expect(await page.getTooltipValue(page.singleValueCalloutOnDrag, 'lower')).toEqual('4.0');
        await page.mouseUpFromHandle(page.singleValueCalloutOnDrag, 'lower');

        // Narrow - Gradient Track Styling - Callout on Hover.
        await page.moveMouseToHandle(page.singleValueNarrowCalloutOnHover, 'lower');
        expect(await page.getTooltipValue(page.singleValueNarrowCalloutOnHover, 'lower')).toEqual('60');

        await page.moveHandleToTick(page.singleValueNarrowCalloutOnHover, 'lower', 0);
        await page.moveMouseToHandle(page.singleValueNarrowCalloutOnHover, 'lower');
        expect(await page.getTooltipValue(page.singleValueNarrowCalloutOnHover, 'lower')).toEqual('0');

        await page.moveHandleToTick(page.singleValueNarrowCalloutOnHover, 'lower', 10);
        await page.moveMouseToHandle(page.singleValueNarrowCalloutOnHover, 'lower');
        expect(await page.getTooltipValue(page.singleValueNarrowCalloutOnHover, 'lower')).toEqual('100');

        await page.moveHandleToTick(page.singleValueNarrowCalloutOnHover, 'lower', 9);
        await page.moveMouseToHandle(page.singleValueNarrowCalloutOnHover, 'lower');
        expect(await page.getTooltipValue(page.singleValueNarrowCalloutOnHover, 'lower')).toEqual('90');

        await page.moveMouseToTick(page.singleValueNarrowCalloutOnHover, 8);
        await page.moveMouseToHandle(page.singleValueNarrowCalloutOnHover, 'lower');
        expect(await page.getTooltipValue(page.singleValueNarrowCalloutOnHover, 'lower')).toEqual('90');

    });

    it('should snap to ticks', async () => {

        // Narrow - Track Styling - Snapping.
        await page.dragAndDropHandle(page.singleValueNarrowSnapping, 'lower', { x: -100, y: 0 });
        await page.mouseDownOnHandle(page.singleValueNarrowSnapping, 'lower');
        expect(await page.getHandleAttribute(page.singleValueNarrowSnapping, 'lower', 'style')).toContain('left: 60');
        await page.mouseUpFromHandle(page.singleValueNarrowSnapping, 'lower');

        await page.dragAndDropHandle(page.singleValueNarrowSnapping, 'lower', { x: 100, y: 0 });
        await page.mouseDownOnHandle(page.singleValueNarrowSnapping, 'lower');
        expect(await page.getHandleAttribute(page.singleValueNarrowSnapping, 'lower', 'style')).toContain('left: 80');
        await page.mouseUpFromHandle(page.singleValueNarrowSnapping, 'lower');

        await page.dragAndDropHandle(page.singleValueNarrowSnapping, 'lower', { x: 1000, y: 0 });
        await page.mouseDownOnHandle(page.singleValueNarrowSnapping, 'lower');
        expect(await page.getHandleAttribute(page.singleValueNarrowSnapping, 'lower', 'style')).toContain('left: 100');
        await page.mouseUpFromHandle(page.singleValueNarrowSnapping, 'lower');

    });

    it('should never allow negative ranges', async () => {

        // Range Track Style - Custom Callout Styles. Try to move the lower handle to a value greater than the upper handle's.
        await page.dragAndDropHandle(page.rangeCalloutCustom, 'upper', { x: -100, y: 0 });
        await page.dragAndDropHandle(page.rangeCalloutCustom, 'lower', { x: 2000, y: 0 });
        expect(await page.getTooltipValue(page.rangeCalloutCustom, 'lower')).toEqual(await page.getTooltipValue(page.rangeCalloutCustom, 'upper'));

        expect(await page.getSliderRangeAttribute(page.rangeCalloutCustom, 'style')).toContain('flex-grow: 0;');

    });

    it('should allow track styling to be changed on range and single sliders', async () => {

        expect(await imageCompareFullPageScreen('slider-range-track-colors-default')).toEqual(0);

        // change the default colours
        await page.colorChangeButton.click();

        expect(await imageCompareFullPageScreen('slider-range-track-colors')).toEqual(0);

    });

    it('should synchronize with text inputs', async () => {

        // Move handles and confirm the associated inputs are updated with the correct values.
        page.moveMouseToHandle(page.rangeWithTextInputs, 'lower');
        expect(await page.getTooltipValue(page.rangeWithTextInputs, 'lower')).toEqual('25');
        page.dragAndDropHandle(page.rangeWithTextInputs, 'lower', { x: -30, y: 0 });
        page.mouseDownOnHandle(page.rangeWithTextInputs, 'lower');
        expect(await page.getTooltipValue(page.rangeWithTextInputs, 'lower')).toEqual('20');
        page.mouseUpFromHandle(page.rangeWithTextInputs, 'lower');

        page.moveMouseToHandle(page.rangeWithTextInputs, 'upper');
        expect(await page.getTooltipValue(page.rangeWithTextInputs, 'upper')).toEqual('75');
        page.dragAndDropHandle(page.rangeWithTextInputs, 'upper', { x: 30, y: 0 });
        page.mouseDownOnHandle(page.rangeWithTextInputs, 'upper');
        expect(await page.getTooltipValue(page.rangeWithTextInputs, 'upper')).toEqual('80');
        page.mouseUpFromHandle(page.rangeWithTextInputs, 'upper');

        expect(await page.getInputValue(page.input1)).toEqual('20');
        expect(await page.getInputValue(page.input2)).toEqual('80');

        // Enter numbers into the inputs and confirm that the handles' positions are changed accordingly.
        page.input1.clear();
        page.input1.sendKeys('40');
        page.clickOnSlider(page.rangeWithTextInputs);
        page.moveMouseToHandle(page.rangeWithTextInputs, 'lower');
        expect(await page.getTooltipValue(page.rangeWithTextInputs, 'lower')).toEqual('40');

        page.input2.clear();
        page.input2.sendKeys('65' + Key.ENTER);
        page.moveMouseToHandle(page.rangeWithTextInputs, 'upper');
        expect(await page.getTooltipValue(page.rangeWithTextInputs, 'upper')).toEqual('65');

        page.input1.clear();
        page.input1.sendKeys('50' + Key.ENTER);
        page.moveMouseToHandle(page.rangeWithTextInputs, 'lower');
        expect(await page.getTooltipValue(page.rangeWithTextInputs, 'lower')).toEqual('50');

        page.input2.clear();
        page.input2.sendKeys('40' + Key.ENTER);
        page.moveMouseToHandle(page.rangeWithTextInputs, 'upper');
        expect(await page.getTooltipValue(page.rangeWithTextInputs, 'upper')).toEqual('50');

    });

    describe('in disabled state', () => {
        beforeEach(async () => {
            await page.disabledButton.click();
        });

        it('should not react to drag and drop', async () => {
            await page.dragAndDropHandle(page.rangeWithTextInputs, 'lower', { x: -2000, y: 0 });
            expect(await page.getHandleAttribute(page.rangeWithTextInputs, 'lower', 'style')).toContain('left: 25%');

            expect(await imageCompareFullPageScreen('slider-disabled')).toEqual(0);
        });

        it('should not react to drag and drop (range)', async () => {
            await page.dragAndDropHandle(page.rangeWithTextInputs, 'lower', { x: -2000, y: 0 });
            expect(await page.getHandleAttribute(page.rangeWithTextInputs, 'lower', 'style')).toContain('left: 25%');

            await page.dragAndDropHandle(page.rangeWithTextInputs, 'upper', { x: 2000, y: 0 });
            expect(await page.getHandleAttribute(page.rangeWithTextInputs, 'upper', 'style')).toContain('left: 75%');

            expect(await page.getInputValue(page.input1)).toEqual('25');
            expect(await page.getInputValue(page.input2)).toEqual('75');
        });

        it('should not receive focus', async () => {
            await page.topFocusTarget.click();

            expect(await browser.driver.switchTo().activeElement().getAttribute('id')).toBe('top-focus');

            await browser.actions().sendKeys(protractor.Key.TAB).perform();

            expect(await browser.driver.switchTo().activeElement().getAttribute('id')).toBe('bottom-focus');
        });
    });
});
