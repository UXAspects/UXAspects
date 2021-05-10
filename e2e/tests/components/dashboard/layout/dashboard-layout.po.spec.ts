import { $, browser, Key } from 'protractor';
import { DashboardPage } from '../dashboard.po.spec';

export class DashboardLayoutPage extends DashboardPage {

    updateLayout = $('#update-layout');

    async getPage(): Promise<void> {
        await browser.get('#/dashboard/layout');
    }

    async resizeWidget(widgetIndex: number, directionKey: string): Promise<void> {
        await browser.actions().sendKeys(Key.TAB, ...Array(widgetIndex + 1).fill(Key.TAB), Key.SPACE).perform();
        await browser.actions().keyDown(Key.CONTROL).sendKeys(directionKey).perform();
        await browser.actions().sendKeys(Key.SPACE).perform();
    }

}
