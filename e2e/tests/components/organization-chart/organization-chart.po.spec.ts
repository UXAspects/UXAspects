import { $$, browser, by, element } from 'protractor';

export class OrganizationChartPage {

    nodes = $$('.ux-organization-chart-node');
    toggleNodes = element(by.id('toggleNodesBtn'));

    async getPage(): Promise<void> {
        await browser.get('#/organization-chart');
    }

}
