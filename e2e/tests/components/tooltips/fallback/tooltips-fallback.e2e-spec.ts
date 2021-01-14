import { browser } from 'protractor';
import { TooltipsFallbackPage } from './tooltips-fallback.po.spec';

describe('Tooltips (Fallback) Tests', () => {

    let page: TooltipsFallbackPage;

    beforeEach(async () => {
        page = new TooltipsFallbackPage();
        await page.getPage();
    });

    it('should fallback to right when left is unavailable', async () => {
        await browser.actions().mouseMove(page.leftTooltip).perform();

        expect(await page.cdkOverlayContainer.isPresent()).toBe(true);
        expect(await page.tooltipHasClass('right')).toBe(true);
    });

    it('should fallback to left when right is unavailable', async () => {
        await browser.actions().mouseMove(page.rightTooltip).perform();

        expect(await page.cdkOverlayContainer.isPresent()).toBe(true);
        expect(await page.tooltipHasClass('left')).toBe(true);
    });

    it('should fallback to bottom when top is unavailable', async () => {
        await browser.actions().mouseMove(page.topTooltip).perform();

        expect(await page.cdkOverlayContainer.isPresent()).toBe(true);
        expect(await page.tooltipHasClass('bottom')).toBe(true);
    });

    it('should fallback to top when bottom is unavailable', async () => {
        await browser.actions().mouseMove(page.bottomTooltip).perform();

        expect(await page.cdkOverlayContainer.isPresent()).toBe(true);
        expect(await page.tooltipHasClass('top')).toBe(true);
    });

    it('should use custom fallback placement when specified', async () => {
        await browser.actions().mouseMove(page.customFallback).perform();

        expect(await page.cdkOverlayContainer.isPresent()).toBe(true);
        expect(await page.tooltipHasClass('top')).toBe(true);
    });
});
