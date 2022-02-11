import { $, $$, browser } from 'protractor';

export class OrganizationChartPage {

    nodes = $$('.ux-organization-chart-node');
    toggleNodesOnClick = $('#toggleNodesBtn');

    async getPage(): Promise<void> {
        await browser.get('#/organization-chart');
    }

    async getNodeText(index: number): Promise<string> {
        return this.nodes.get(index).getText();
    }
}
