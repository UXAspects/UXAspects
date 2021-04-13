import { $, browser } from 'protractor';

export class PopoverFallbackPage {
    
    cdkOverlayContainer = $('.cdk-overlay-container');
    hasArrowCheckbox = $('#has-arrow-checkbox');

    async getPage() {
        return await browser.get('#/popover/fallback');
    }

    async getClassList(dir: string): Promise<string[]> {
        const popover = $(`.${dir}-popover`);
        return (await popover.getAttribute('class')).split(' ');
    }
}
