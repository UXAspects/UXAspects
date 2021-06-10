import { $, browser } from 'protractor';
import { DashboardPage } from '../dashboard.po.spec';

export class DashboardEightColumnLayoutPage extends DashboardPage {

    updateLayout = $('#update-layout');
    topFocus = $('#top-focus');

    async getPage(): Promise<void> {
        await browser.get('#/dashboard/eight-column-layout');
    }

}
