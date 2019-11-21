import { $, $$, browser, ElementFinder } from 'protractor';

export class HierarchyBarPage {

    hierarchyBar = $('ux-hierarchy-bar');
    nodes = $$('.hierarchy-bar-node');
    selectedLabel = $('#selected');
    selectButton = $('#set-selected-btn');

    showLeftAddonBtn = $('#show-left-addon-btn');
    showRightAddonBtn = $('#show-right-addon-btn');
    showTrailingAddonBtn = $('#show-trailing-addon-btn');

    collapsedMode = $('#collapsed-mode');
    dropdownMode = $('#dropdown-mode');
    readOnlyBtn = $('#readonly-btn');

    async getPage(): Promise<void> {
        await browser.get('#/hierarchy-bar');
    }

    async getSelectedNodeTitle(): Promise<string> {
        return await this.selectedLabel.getText();
    }

    async getNodeCount(): Promise<number> {
        return await this.nodes.count();
    }

    async getNode(index: number): Promise<ElementFinder> {
        return await this.nodes.get(index);
    }

    async clickNode(index: number): Promise<void> {
        const node: ElementFinder = await this.getNode(index);
        const content: ElementFinder = await node.$('.hierarchy-bar-node-content');

        await content.click();
    }

    async nodeHasChildren(index: number): Promise<boolean> {
        const node: ElementFinder = await this.getNode(index);
        const arrow: ElementFinder[] = await node.$$('.hierarchy-bar-node-arrow');

        return arrow.length === 1;
    }

    async nodeHasChildrenDropdown(index: number): Promise<boolean> {
        const node: ElementFinder = await this.getNode(index);
        const arrow: ElementFinder[] = await node.$$('.hierarchy-bar-node-arrow-icon-dropdown');

        return arrow.length === 1;
    }

    async showNodePopover(index: number): Promise<void> {
        const node: ElementFinder = await this.getNode(index);
        const arrow: ElementFinder = await node.$('.hierarchy-bar-node-arrow');

        await arrow.click();
    }

    async selectPopoverNode(index: number, childIndex: number): Promise<void> {
        const children = await this.getNodeChildren(index);
        const child = children[childIndex];

        await child.click();
    }

    async selectPopoverNodeDropdown(index: number, childIndex: number): Promise<void> {
        const children = await this.getNodeChildrenDropdown(index);
        const child = children[childIndex];

        await child.click();
    }

    async selectPopoverNodeCollapsed(childIndex: number): Promise<void> {
        const children = await this.getOverflowNodesCollapsed();
        const child = children[childIndex];

        await child.click();
    }

    async getNodeChildren(index: number): Promise<ElementFinder[]> {

        // check if the node has any children
        if (await this.nodeHasChildren(index) === false) {
            return [];
        }

        // if it does have children then open the popover
        await this.showNodePopover(index);

        // return all the list items
        return await $$('ux-hierarchy-bar-popover-item');
    }

    async getNodeChildrenDropdown(index: number): Promise<ElementFinder[]> {

        // check if the node has any children
        if (await this.nodeHasChildrenDropdown(index) === false) {
            return [];
        }

        // if it does have children then open the popover
        await this.clickNode(index);

        // return all the list items
        return await $$('ux-hierarchy-bar-popover-item');
    }

    async getNodeChildrenTitles(index: number): Promise<string[]> {

        const children = await this.getNodeChildren(index);

        const titles: string[] = [];

        for (let child of children) {

            const title: ElementFinder = await child.$('.hierarchy-bar-node-title');

            titles.push(await title.getText());
        }

        return titles;
    }

    async getOverflowNodesCollapsed(): Promise<ElementFinder[]> {
        const content: ElementFinder = await $('.hierarchy-bar-overflow');

        await content.click();

        return await $$('ux-hierarchy-bar-popover-item');
    }

    async getOverflowNodes(): Promise<ElementFinder[]> {
        const indicator: ElementFinder = await $('.hierarchy-bar-overflow-indicator');

        await indicator.click();

        return await $$('ux-hierarchy-bar-popover-item');
    }

    async getOverflowNodeTitles(): Promise<string[]> {

        const children = await this.getOverflowNodes();

        const titles: string[] = [];

        for (let child of children) {

            const title: ElementFinder = await child.$('.hierarchy-bar-node-title');

            titles.push(await title.getText());
        }

        return titles;
    }

    async getAddons(): Promise<ElementFinder[]> {
        return await this.hierarchyBar.$$('.button-secondary');
    }

}