import { $, browser } from 'protractor';
import { DashboardPage } from '../dashboard.po.spec';

export class DashboardLayoutPage extends DashboardPage {

    updateLayout = $('#update-layout');

    async getPage(): Promise<void> {
        await browser.get('#/dashboard/layout');
    }

}
