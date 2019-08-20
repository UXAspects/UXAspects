import { $, browser, ElementFinder } from 'protractor';

export class SidePanelPage {

    panelContainer = $('#panelContainer');
    panel = $('ux-side-panel');
    panelHost = $('ux-side-panel > .ux-side-panel-host');
    panelClose = $('[uxSidePanelClose]');
    modalBackdrop = $('.modal-backdrop');
    toggle = $('#toggle');
    externalClick1 = $('#externalClick1');
    externalClick2 = $('#externalClick2');
    inline = $('#inline');
    attachToWindow = $('ux-radio-button#attachToWindow');
    attachToContainer = $('ux-radio-button#attachToContainer');
    width1 = $('ux-radio-button#width1');
    width2 = $('ux-radio-button#width2');
    top1 = $('ux-radio-button#top1');
    top2 = $('ux-radio-button#top2');
    modal = $('#modal');
    closeOnExternalClick = $('#closeOnExternalClick');

    async getPage() {
        await browser.get('#/side-panel');
    }

    async isPanelOpen(): Promise<boolean> {
        return this.panelHost.isPresent();
    }

    async getPanelWidth(): Promise<number> {
        const size = await this.panelHost.getSize();
        return size.width;
    }

    async getPanelHeight(): Promise<number> {
        const size = await this.panelHost.getSize();
        return size.height;
    }

    async getPanelTop(): Promise<number> {
        const position = await this.panelHost.getLocation();
        return position.y;
    }

    async getInlinePanelWidth(): Promise<number> {
        const size = await this.panel.getSize();
        return size.width;
    }

    async getInlinePanelHeight(): Promise<number> {
        const size = await this.panel.getSize();
        return size.height;
    }

    async getViewportWidth(): Promise<number> {
        return parseInt(await $('body').getAttribute('clientWidth'));
    }

    async getViewportHeight(): Promise<number> {
        const viewportSize = await browser.driver.manage().window().getSize();
        return viewportSize.height;
    }

    async getContainerWidth(): Promise<number> {
        const size = await this.panelContainer.getSize();
        return size.width;
    }

    async getContainerHeight(): Promise<number> {
        const size = await this.panelContainer.getSize();
        return size.height;
    }

    async getContainerTop(): Promise<number> {
        const position = await this.panelContainer.getLocation();
        return position.y;
    }

    async getModalBackdropWidth(): Promise<number> {
        const size = await this.modalBackdrop.getSize();
        return size.width;
    }

    async getModalBackdropHeight(): Promise<number> {
        const size = await this.modalBackdrop.getSize();
        return size.height;
    }

    async getModalBackdropTop(): Promise<number> {
        const position = await this.modalBackdrop.getLocation();
        return position.y;
    }

    /**
     * Returns the panel's right offset from the viewport.
     */
    async getRightOffsetFromWindow(): Promise<number> {
        const position = await this.panelHost.getLocation();
        const totalWidth = await this.getViewportWidth();

        return totalWidth - position.x;
    }

    /**
     * Returns the panel's right offset from the container.
     */
    async getRightOffsetFromContainer(): Promise<number> {
        const position = await this.panelHost.getLocation();
        const totalWidth = await this.getContainerWidth();

        return totalWidth - position.x;
    }

    /**
     * Determines whether an element click succeeds without throwing an error.
     */
    async isClickable(item: ElementFinder): Promise<boolean> {
        try {
            await item.click();
            return true;
        } catch (err) {
            return false;
        }
    }
}