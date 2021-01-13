import { $, browser } from 'protractor';

export class PopoverPage {

    showPopoverBtn = $('#show-popover-btn');
    fallbackPopoverBtn = $('#fallback-popover-btn');
    placementTopBtn = $('#placement-top-btn');
    placementRightBtn = $('#placement-right-btn');
    placementBottomBtn = $('#placement-bottom-btn');
    placementLeftBtn = $('#placement-left-btn');
    fallbackTopBtn = $('#fallback-top-btn');
    customClasssBtn = $('#custom-classs-btn');
    templateRefBtn = $('#template-ref-btn');
    setTitleBtn = $('#set-title-btn');
    programmaticallyShowBtn = $('#programmatically-show-btn');
    programmaticallyHideBtn = $('#programmatically-hide-btn');
    programmaticallyToggleBtn = $('#programmatically-toggle-btn');

    cdkOverlayContainer = $('.cdk-overlay-container');
    popover = $('.popover');
    popoverTitle = this.popover.$('.popover-title');

    async getPage(): Promise<void> {
        await browser.get('#/popover');
    }

    async showPopover(): Promise<void> {
        return await this.programmaticallyShowBtn.click();
    }

    async hidePopover(): Promise<void> {
        return await this.programmaticallyHideBtn.click();
    }

    async togglePopover(): Promise<void> {
        return await this.programmaticallyToggleBtn.click();
    }

    async getPopoverPlacement(): Promise<string> {
        await this.showPopover();

        const classAttribute = await this.popover.getAttribute('class');
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

    async getPopoverContent(): Promise<string> {
        await this.showPopover();

        return await this.popover.$('.popover-content').getText();
    }

    async getPopoverClasses(): Promise<string> {
        await this.showPopover();
        return await this.popover.getAttribute('class');
    }

    async popoverHasClass(className: string): Promise<boolean> {
        const classes = await this.getPopoverClasses();

        return classes.indexOf(className) !== -1;
    }

}

