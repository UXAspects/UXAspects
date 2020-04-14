import { $, browser, by, element } from 'protractor';

export class BadgePage {
    iconNoContent = $('#iconExampleNoContent');
    anchor = $('#anchorExample');
    anchorBadge = $('#anchorExample .ux-badge');
    button = $('#buttonExample');
    buttonBadge = $('#buttonExample .ux-badge');

    setLimitOnAnchorButton = element(by.id('setLimitOnAnchor'));
    setContentAnchorButton = element(by.id('setContentOnAnchor'));
    setBackgroundOnAnchorButton = element(by.id('setBackgroundOnAnchor'));
    setSizeOnAnchorButton = element(by.id('setSizeOnAnchor'));

    setLimitOnButton = element(by.id('setLimitOnButton'));
    setBackgroundOnButton = element(by.id('setBackgroundOnButton'));
    toggleHideOnButton = element(by.id('toggleHideOnButton'));
    setPositionOnButton = element(by.id('setPositionOnButton'));
    removeOverlapOnButton = element(by.id('removeOverlapOnButton'));

    async getPage(): Promise<void> {
        await browser.get('#/badge');
    }

    async limitOnAnchor(): Promise<void> {
        return await this.setLimitOnAnchorButton.click();
    }

    async contentOnAnchor(): Promise<void> {
        return await this.setContentAnchorButton.click();
    }

    async backgroundOnAnchor(): Promise<void> {
        return await this.setBackgroundOnAnchorButton.click();
    }

    async sizeOnAnchor(): Promise<void> {
        return await this.setSizeOnAnchorButton.click();
    }

    async limitOnButton(): Promise<void> {
        return await this.setLimitOnButton.click();
    }

    async backgroundOnButton(): Promise<void> {
        return await this.setBackgroundOnButton.click();
    }

    async toggleHideButtonBadge(): Promise<void> {
        return await this.toggleHideOnButton.click();
    }

    async repositionButtonBadge(): Promise<void> {
        return await this.setPositionOnButton.click();
    }

    async removeOverlapButtonBadge(): Promise<void> {
        return await this.removeOverlapOnButton.click();
    }
}
