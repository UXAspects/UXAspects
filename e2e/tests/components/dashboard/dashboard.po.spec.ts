import { browser, by, element, ElementFinder, Key } from 'protractor';

export class DashboardPage {

    container = element(by.id('dashboardWidgetContainer'));
    dashboard = element(by.className('customizable-dashboard'));
    announcer = element(by.className('cdk-visually-hidden'));

    getPage(): void {
        browser.get('#/dashboard');
    }

    getNumberOfWidgets() {
        return this.container.$('div.dashboard-container').$$('ux-dashboard-widget').count();
    }

    getWidget(index: number) {
        return this.container.$('div.dashboard-container').$$('ux-dashboard-widget').get(index);
    }

    getWidgetAttribute(widget: ElementFinder, attribute: string) {
        return widget.getAttribute(attribute);
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

    async getGrabHandle(): Promise<ElementFinder> {
        return await this.container.$('button.widget-grab-handle');
    }

    async getAnnouncerText(): Promise<string> {
        return this.announcer.getText();
    }

    // Extract and return the left, top, width or height values from the element's 'style' attribute
    async getWidgetLocationValue(widget: ElementFinder, soughtValue: string) {
        return this.getWidgetAttribute(widget, 'style').then(function(styleValue: string) {
            const pattern = '.*' + soughtValue + ':\\s*(\\d+)px;';
            const regexp = new RegExp(pattern, 'i');
            const match = regexp.exec(styleValue);
            return Number(match[1]);
        });
    }
}

export enum Direction {
    Up,
    Down,
    Left,
    Right
}