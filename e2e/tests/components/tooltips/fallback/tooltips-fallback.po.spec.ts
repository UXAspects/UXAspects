import { $, browser } from 'protractor';

export class TooltipsFallbackPage {

    leftTooltip = $('#left-tooltip');
    rightTooltip = $('#right-tooltip');
    topTooltip = $('#top-tooltip');
    bottomTooltip = $('#bottom-tooltip');
    customFallback = $('#custom-fallback');

    cdkOverlayContainer = $('.cdk-overlay-container');
    tooltip = $('.tooltip');

    async getPage() {
        return await browser.get('#/tooltips/fallback');
    }

    async tooltipHasClass(className: string): Promise<boolean> {
        const classes = (await this.tooltip.getAttribute('class')).split(' ');
        return classes.indexOf(className) !== -1;
    }

}
