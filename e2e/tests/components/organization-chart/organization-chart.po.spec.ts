import { $$, browser } from 'protractor';

export class OrganizationChartPage {

    nodes = $$('.ux-organization-chart-node');

    async getPage(): Promise<void> {
        await browser.get('#/organization-chart');
    }

}
