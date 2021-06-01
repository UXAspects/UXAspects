import { browser } from 'protractor';
import { DashboardPage } from '../dashboard.po.spec';

export class DashboardCanMoveLayoutPage extends DashboardPage {

    async getPage(): Promise<void> {
        await browser.get('#/dashboard/pinned');
    }

}
