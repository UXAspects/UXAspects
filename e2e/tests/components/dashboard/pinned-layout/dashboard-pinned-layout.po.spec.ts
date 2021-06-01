import { browser } from 'protractor';
import { DashboardPage } from '../dashboard.po.spec';

export class DashboardPinnedLayoutPage extends DashboardPage {

    async getPage(): Promise<void> {
        await browser.get('#/dashboard/pinned');
    }

}
