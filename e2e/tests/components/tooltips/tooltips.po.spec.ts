import { $, browser } from 'protractor';

export class TooltipsPage {

    showTooltipBtn = $('#show-tooltip-btn');
    placementTopBtn = $('#placement-top-btn');
    placementRightBtn = $('#placement-right-btn');
    placementBottomBtn = $('#placement-bottom-btn');
    placementLeftBtn = $('#placement-left-btn');
    customClasssBtn = $('#custom-classs-btn');
    templateRefBtn = $('#template-ref-btn');
    programmaticallyShowBtn = $('#programmatically-show-btn');
    programmaticallyHideBtn = $('#programmatically-hide-btn');
    programmaticallyToggleBtn = $('#programmatically-toggle-btn');
    resetBtn = $('#reset-btn');

    cdkOverlayContainer = $('.cdk-overlay-container');
    tooltip = $('.tooltip');

    getPage() {
        return browser.get('#/tooltips');
    }

    async showTooltip(): Promise<void> {
        return await this.programmaticallyShowBtn.click();
    }

    async hideTooltip(): Promise<void> {
        return await this.programmaticallyHideBtn.click();
    }

    async toggleTooltip(): Promise<void> {
        return await this.programmaticallyToggleBtn.click();
    }

    async getTooltipPlacement(): Promise<string> {
        await this.showTooltip();

        const classAttribute = await this.tooltip.getAttribute('class');
        const classNames = classAttribute.split(' ');

        if (classNames.indexOf('top') !== -1) {
            return 'top';
        }

        if (classNames.indexOf('right') !== -1) {
            return 'right';
        }

        if (classNames.indexOf('bottom') !== -1) {
            return 'bottom';
        }

        if (classNames.indexOf('left') !== -1) {
            return 'left';
        }
    }

    async getTooltipContent(): Promise<string> {
        await this.showTooltip();

        return await this.tooltip.$('.tooltip-inner').getText();
    }

    async getTooltipClasses(): Promise<string> {
        await this.showTooltip();
        return await this.tooltip.getAttribute('class');
    }

    async tooltipHasClass(className: string): Promise<boolean> {
        const classes = await this.getTooltipClasses();

        return classes.indexOf(className) !== -1;
    }

    reset() {
        return this.resetBtn.click();
    }

}

