import { $, browser, ElementFinder } from 'protractor';

export class PopoverFallbackPage {

    leftPopoverContent = $('.left-popover');
    topPopoverContent = $('.top-popover');
    bottomPopoverContent = $('.bottom-popover');
    rightPopoverContent = $('.right-popover');
    customFallbackContent = $('.custom-popover');

    cdkOverlayContainer = $('.cdk-overlay-container');

    async getPage() {
        return await browser.get('#/popover/fallback');
    }

    async popoverHasClass(popover: ElementFinder, className: string): Promise<boolean> {
        const classes = (await popover.getAttribute('class')).split(' ');
        return classes.indexOf(className) !== -1;
    }

}
