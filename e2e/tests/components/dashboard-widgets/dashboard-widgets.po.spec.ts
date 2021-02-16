import {$, browser, by, element, ElementFinder, Key, protractor} from 'protractor';
import {WebElement} from 'selenium-webdriver';

const ANNOUNCER_WAIT_TIMEOUT = 200;

export class DashboardWidgetsPage {

    container: ElementFinder = element(by.id('dashboardWidgetContainer'));
    dashboard: ElementFinder = element(by.className('customizable-dashboard'));
    announcer: ElementFinder = element(by.className('cdk-live-announcer-element'));
    layoutOutput = element(by.id('layout-output'));

    async getPage(): Promise<void> {
        await browser.get('#/dashboard-widgets');
    }

    getWidget(widgetId: string): ElementFinder {
        return this.container.$(`ux-dashboard-${widgetId}`).$('ux-dashboard-widget');
    }

    async getWidgetAttribute(widget: ElementFinder, attribute: string): Promise<string> {
        return widget.getAttribute(attribute);
    }

    async getLayoutOutput(): Promise<string> {
        return this.layoutOutput.getAttribute('innerText');
    }

    async disableGrabMode(): Promise<void> {
        // focus the grab handle
        const handle: ElementFinder = await this.getGrabHandle();

        // disable drag mode
        await handle.sendKeys(Key.SPACE);
    }

    async moveWidget(direction: Direction): Promise<void> {

        switch (direction) {

            case Direction.Down:
                return browser.actions().sendKeys(Key.ARROW_DOWN).perform();

            case Direction.Right:
                return browser.actions().sendKeys(Key.ARROW_RIGHT).perform();

            case Direction.Up:
                return browser.actions().sendKeys(Key.ARROW_UP).perform();

            case Direction.Left:
                return browser.actions().sendKeys(Key.ARROW_LEFT).perform();
        }
    }

    async getGrabHandle(widgetId = 'widget-actions'): Promise<ElementFinder> {
        return await this.container.$(`#${widgetId} button.widget-grab-handle`);
    }

    async checkAnnouncerText(expected: string): Promise<void> {
        return browser.wait(
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

    async clickDetailsButton(readOnlyWidget: boolean): Promise<void> {
        const widget: ElementFinder = this.container.$(readOnlyWidget ? '#widget-text-readonly' : '#widget-text');
        const editButton: WebElement = widget.$('#show-details-button');
        await editButton.click();
    }

    async writeText(text: string): Promise<void> {
        const sidePanel: ElementFinder = $('#side-panel');
        const textArea: WebElement = sidePanel.$('textarea');
        await textArea.sendKeys(Key.CONTROL, 'a', Key.NULL, Key.DELETE, text);
    }

    async clickSidePanelButton(button: string): Promise<void> {
        const sidePanel: ElementFinder = $('#side-panel');
        const buttonElement: WebElement = sidePanel.$('#' + button + '-button');
        await buttonElement.click();
    }

    async closeSidePanel(): Promise<void> {
        const sidePanel: ElementFinder = $('#side-panel');
        await sidePanel.sendKeys(Key.ESCAPE);
    }
}

export enum Direction {
    Up,
    Down,
    Left,
    Right
}
