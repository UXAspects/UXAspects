import { browser, Key } from 'protractor';
import { TooltipsPage } from './tooltips.po.spec';
import { imageCompare } from '../common/image-compare';

describe('Tooltips', () => {

    let page: TooltipsPage = new TooltipsPage();
    page.getPage();

    it('should have correct initial states', async () => {
        expect(await page.cdkOverlayContainer.isPresent()).toBe(false);
        expect(await page.tooltip.isPresent()).toBe(false);

        expect(await imageCompare('tooltip-initial')).toEqual(0);

        await page.reset();
    });

    it('should show tooltip on mouse enter', async () => {

        // hover over the button
        await browser.actions().mouseMove(page.showTooltipBtn).perform();

        // the tooltip should now be visible
        expect(await page.cdkOverlayContainer.isPresent()).toBe(true);
        expect(await page.tooltip.isPresent()).toBe(true);

        expect(await imageCompare('tooltip-open')).toEqual(0);

        await page.reset();
    });

    it('should hide tooltip on mouse leave', async () => {

        // hover over the button
        await browser.actions().mouseMove(page.showTooltipBtn).perform();

        // the tooltip should now be visible
        expect(await page.cdkOverlayContainer.isPresent()).toBe(true);
        expect(await page.tooltip.isPresent()).toBe(true);

        // move mouse away from element
        await browser.actions().mouseMove(page.placementBottomBtn).perform();

        // the tooltip should now be hidden but the overlay container should remain
        expect(await page.cdkOverlayContainer.isPresent()).toBe(true);
        expect(await page.tooltip.isPresent()).toBe(false);

        await page.reset();
    });

    it('should be able to programmatically show the tooltip', async () => {
        await page.showTooltip();
        expect(await page.tooltip.isPresent()).toBe(true);

        await page.reset();
    });

    it('should be able to programmatically hide the tooltip', async () => {
        await page.showTooltip();
        expect(await page.tooltip.isPresent()).toBe(true);

        await page.hideTooltip();
        expect(await page.tooltip.isPresent()).toBe(false);

        await page.reset();
    });

    it('should be able to programmatically toggle the tooltip', async () => {
        await page.toggleTooltip();
        expect(await page.tooltip.isPresent()).toBe(true);

        await page.toggleTooltip();
        expect(await page.tooltip.isPresent()).toBe(false);

        await page.toggleTooltip();
        expect(await page.tooltip.isPresent()).toBe(true);

        await page.reset();
    });

    it('should be able to position the tooltip', async () => {
        // by default the tooltip should be displayed on top
        expect(await page.getTooltipPlacement()).toBe('top');

        // set the tooltip placement to right
        await page.placementRightBtn.click();
        expect(await page.getTooltipPlacement()).toBe('right');

        // set the tooltip placement to bottom
        await page.placementBottomBtn.click();
        expect(await page.getTooltipPlacement()).toBe('bottom');

        // set the tooltip placement to left
        await page.placementLeftBtn.click();
        expect(await page.getTooltipPlacement()).toBe('left');

        // set the tooltip placement to top
        await page.placementTopBtn.click();
        expect(await page.getTooltipPlacement()).toBe('top');

        await page.reset();

    });

    it('should show the correct content', async () => {
        expect(await page.getTooltipContent()).toBe('Some content here');

        await page.reset();
    });

    it('should allow a custom class', async () => {

        // should not initially have the class
        expect(await page.tooltipHasClass('my-custom-class')).toBe(false);

        // add the custom class
        await page.customClasssBtn.click();

        // should now have the class
        expect(await page.tooltipHasClass('my-custom-class')).toBe(true);

        await page.reset();
    });

    it('should allow a TemplateRef to be used', async () => {
        // the original content should initially be shown
        expect(await page.getTooltipContent()).toBe('Some content here');

        // set the content to a TemplateRef
        await page.templateRefBtn.click();

        // the content should now have changed
        expect(await page.getTooltipContent()).toBe('My Template Here');

        await page.reset();
    });

    it('should show the tooltip on button focus', async () => {

        // we need to reload this page
        await page.getPage();

        // the tooltip should initially be hidden
        expect(await page.tooltip.isPresent()).toBe(false);

        // tab to the button
        await browser.actions().sendKeys(Key.TAB).perform();

        // the tooltip should be visible
        expect(await page.tooltip.isPresent()).toBe(true);

        await page.reset();
    });

    it('should hide the tooltip on button blur', async () => {

        // we need to reload this page
        await page.getPage();

        // the tooltip should initially be hidden
        expect(await page.tooltip.isPresent()).toBe(false);

        // tab to the button
        await browser.actions().sendKeys(Key.TAB).perform();

        // the tooltip should be visible
        expect(await page.tooltip.isPresent()).toBe(true);

        // tab away from the button
        await browser.actions().sendKeys(Key.TAB).perform();

        // the tooltip should be hidden again
        expect(await page.tooltip.isPresent()).toBe(false);

        await page.reset();
    });
});