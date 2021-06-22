import { browser } from 'protractor';
import { DashboardPage } from '../dashboard.po.spec';

export class DashboardDynamicLayoutPage extends DashboardPage {

    async getPage(): Promise<void> {
        await browser.get('#/dashboard/dynamic-layout');
    }

}
