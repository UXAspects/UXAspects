import { browser, by, element, ElementFinder, Key, protractor } from 'protractor';

const ANNOUNCER_WAIT_TIMEOUT = 200;

export class DashboardWidgetsPage {

    container = element(by.id('dashboardWidgetContainer'));
    dashboard = element(by.className('customizable-dashboard'));
    announcer = element(by.className('cdk-live-announcer-element'));
    topFocusTarget = element(by.id('top-focus'));
    bottomFocusTarget = element(by.id('bottom-focus'));
    layoutOutput = element(by.id('layout-output'));

    async getPage(): Promise<void> {
        await browser.get('#/dashboard-widgets');
    }

    async getNumberOfWidgets() {
        return await this.container.$('div.dashboard-container').$$('ux-dashboard-widget').count();
    }

    async getWidget(widgetId: string) {
        return await this.container.$(`ux-dashboard-${widgetId}`).$('ux-dashboard-widget');
    }

    async getWidgetAttribute(widget: ElementFinder, attribute: string) {
        return widget.getAttribute(attribute);
    }

    async getLayoutOutput(): Promise<string> {
        return this.layoutOutput.getAttribute('innerText');
    }

    async enableGrabMode(): Promise<void> {
        // focus the grab handle
        const handle: ElementFinder = await this.getGrabHandle();

        // focus the element
        await handle.click();

        // enable drag mode
        await handle.sendKeys(Key.SPACE);
    }

    async disableGrabMode(): Promise<void> {
        // focus the grab handle
        const handle: ElementFinder = await this.getGrabHandle();

        // disable drag mode
        await handle.sendKeys(Key.SPACE);
    }

    async cancelGrabMode(): Promise<void> {
        // focus the grab handle
        const handle: ElementFinder = await this.getGrabHandle();

        // disable drag mode
        await handle.sendKeys(Key.ESCAPE);
    }

    async moveWidget(direction: Direction): Promise<void> {

        switch (direction) {

            case Direction.Down:
                return await browser.actions().sendKeys(Key.ARROW_DOWN).perform();

            case Direction.Right:
                return await browser.actions().sendKeys(Key.ARROW_RIGHT).perform();

            case Direction.Up:
                return await browser.actions().sendKeys(Key.ARROW_UP).perform();

            case Direction.Left:
                return await browser.actions().sendKeys(Key.ARROW_LEFT).perform();
        }
    }

    async getGrabHandle(widgetId = 'widget-actions'): Promise<ElementFinder> {
        return await this.container.$(`#${widgetId} button.widget-grab-handle`);
    }

    async getAnnouncerText(): Promise<string> {
        return this.announcer.getText();
    }

    async checkAnnouncerText(expected: string): Promise<void> {
        return await browser.wait(
            protractor.ExpectedConditions.textToBePresentInElement(this.announcer, expected),
            ANNOUNCER_WAIT_TIMEOUT
        );
    }

    // Extract and return the left, top, width or height values from the element's 'style' attribute
    async getWidgetLocationValue(widget: ElementFinder, soughtValue: string): Promise<number> {
        const styleValue = await this.getWidgetAttribute(widget, 'style');
        const pattern = '.*' + soughtValue + ':\\s*(\\d+)px;';
        const regexp = new RegExp(pattern, 'i');
        const match = regexp.exec(styleValue);
        return Number(match[1]);
    }

    async hasFocus(elem: ElementFinder): Promise<boolean> {
        return await elem.getId() === await browser.driver.switchTo().activeElement().getId();
    }
}

export enum Direction {
    Up,
    Down,
    Left,
    Right
}
