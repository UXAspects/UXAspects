import { $, browser } from 'protractor';
import { DashboardPage } from '../dashboard.po.spec';

export class DashboardEightColumnLayoutPage extends DashboardPage {

    initLayoutAlt = $('#init-layout-alt');
    flipLayout = $('#flip-layout');
    flipLayoutAlt = $('#flip-layout-alt');
    topFocus = $('#top-focus');

    async getPage(): Promise<void> {
        await browser.get('#/dashboard/eight-column-layout');
    }

}
