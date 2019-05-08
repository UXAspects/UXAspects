import { browser } from 'protractor';
import { NavigationPage } from './navigation.po.spec';

describe('Navigation Tests', () => {

    let page: NavigationPage;

    beforeEach(() => {
        page = new NavigationPage();
        page.getPage();
    });

    it('should intially be collapsed with no items selected', async () => {

        // there should be 3 top level items
        const items = await page.getTopLevelItems();
        expect(items.length).toBe(3);

        // none of these items should be selected
        expect(await page.isItemActive(items[0])).toBeFalsy();
        expect(await page.isItemActive(items[1])).toBeFalsy();
        expect(await page.isItemActive(items[2])).toBeFalsy();

        // all items should be collapsed
        expect((await page.getItemChildren(items[0])).length).toBe(0);
        expect((await page.getItemChildren(items[1])).length).toBe(0);
        expect((await page.getItemChildren(items[2])).length).toBe(0);
    });

    it('should navigate to the routerLink when clicked', async () => {
        const items = await page.getTopLevelItems();

        await page.selectItem(items[0]);

        expect(await page.isItemActive(items[0])).toBeTruthy();
        expect(await page.isItemActive(items[1])).toBeFalsy();
        expect(await page.isItemActive(items[2])).toBeFalsy();
    });

    it('should expand but not change route when item has children but no routerLink', async () => {
        const items = await page.getTopLevelItems();

        await page.selectItem(items[1]);

        expect(await page.isItemActive(items[0])).toBeFalsy();
        expect(await page.isItemActive(items[1])).toBeFalsy();
        expect(await page.isItemActive(items[2])).toBeFalsy();

        // get the visible children
        expect((await page.getItemChildren(items[0])).length).toBe(0);
        expect((await page.getItemChildren(items[1])).length).toBe(2);
        expect((await page.getItemChildren(items[2])).length).toBe(0);
    });

    it('should expand and change route when item has children and routerLink', async () => {
        const items = await page.getTopLevelItems();

        await page.selectItem(items[2]);

        expect(await page.isItemActive(items[0])).toBeFalsy();
        expect(await page.isItemActive(items[1])).toBeFalsy();
        expect(await page.isItemActive(items[2])).toBeTruthy();

        // get the visible children
        expect((await page.getItemChildren(items[0])).length).toBe(0);
        expect((await page.getItemChildren(items[1])).length).toBe(0);
        expect((await page.getItemChildren(items[2])).length).toBe(2);

        // expect the page content to be correct
        expect(await page.getPageContent()).toBe('Accounts');
    });

    it('should allow selection of child nodes', async () => {
        const items = await page.getTopLevelItems();

        await page.selectItem(items[1]);

        // get the child nodes
        const children = await page.getItemChildren(items[1]);

        // select the first child
        await page.selectItem(children[0]);

        // the selected state should be updated correctly
        expect(await page.isItemActive(children[0])).toBeTruthy();
        expect(await page.isItemActive(children[1])).toBeFalsy();

        // expect the page content to be correct
        expect(await page.getPageContent()).toBe('Product Add');
    });

    it('should initially select a root node if the router link matches', async () => {
        await browser.get('#/navigation/dashboard');

        const items = await page.getTopLevelItems();

        // expect the first item to be selected
        expect(await page.isItemActive(items[0])).toBeTruthy();
        expect(await page.isItemActive(items[1])).toBeFalsy();
        expect(await page.isItemActive(items[2])).toBeFalsy();

        // expect the page content to be correct
        expect(await page.getPageContent()).toBe('Dashboard');
    });

    it('should initially select a child node if the router link matches', async () => {
        await browser.get('#/navigation/products/add');

        const items = await page.getTopLevelItems();

        // expect the first item to be selected
        expect(await page.isItemActive(items[0])).toBeFalsy();
        expect(await page.isItemActive(items[1])).toBeFalsy();
        expect(await page.isItemActive(items[2])).toBeFalsy();

        // get the visible children
        expect((await page.getItemChildren(items[0])).length).toBe(0);
        expect((await page.getItemChildren(items[1])).length).toBe(2);
        expect((await page.getItemChildren(items[2])).length).toBe(0);

        const children = await page.getItemChildren(items[1]);

        // the selected state should be updated correctly
        expect(await page.isItemActive(children[0])).toBeTruthy();
        expect(await page.isItemActive(children[1])).toBeFalsy();

        // expect the page content to be correct
        expect(await page.getPageContent()).toBe('Product Add');
    });

    it('should collapse an expanded node on click', async () => {
        const items = await page.getTopLevelItems();

        await page.selectItem(items[1]);

        // get the visible children
        expect((await page.getItemChildren(items[0])).length).toBe(0);
        expect((await page.getItemChildren(items[1])).length).toBe(2);
        expect((await page.getItemChildren(items[2])).length).toBe(0);

        await page.selectItem(items[1]);

        // get the visible children
        expect((await page.getItemChildren(items[0])).length).toBe(0);
        expect((await page.getItemChildren(items[1])).length).toBe(0);
        expect((await page.getItemChildren(items[2])).length).toBe(0);
    });

    it('should not collapse other items when autoCollapse is false', async () => {
        const items = await page.getTopLevelItems();
        await page.selectItem(items[1]);

        // get the visible children
        expect((await page.getItemChildren(items[0])).length).toBe(0);
        expect((await page.getItemChildren(items[1])).length).toBe(2);
        expect((await page.getItemChildren(items[2])).length).toBe(0);

        await page.selectItem(items[2]);

        // get the visible children
        expect((await page.getItemChildren(items[0])).length).toBe(0);
        expect((await page.getItemChildren(items[1])).length).toBe(2);
        expect((await page.getItemChildren(items[2])).length).toBe(2);
    });

    it('should collapse other items when autoCollapse is true', async () => {
        const items = await page.getTopLevelItems();
        await page.selectItem(items[1]);

        // get the visible children
        expect((await page.getItemChildren(items[0])).length).toBe(0);
        expect((await page.getItemChildren(items[1])).length).toBe(2);
        expect((await page.getItemChildren(items[2])).length).toBe(0);

        // enable auto collapse
        await page.enableAutoCollapse.click();

        await page.selectItem(items[2]);

        // get the visible children
        expect((await page.getItemChildren(items[0])).length).toBe(0);
        expect((await page.getItemChildren(items[1])).length).toBe(0);
        expect((await page.getItemChildren(items[2])).length).toBe(2);
    });

    it('should select parent and child when exact is false', async () => {
        await page.disableExact.click();
        const items = await page.getTopLevelItems();
        await page.selectItem(items[2]);

        const children = await page.getItemChildren(items[2]);
        await page.selectItem(children[0]);

        expect(await page.isItemActive(items[0])).toBeFalsy();
        expect(await page.isItemActive(items[1])).toBeFalsy();
        expect(await page.isItemActive(items[2])).toBeTruthy();

        expect(await page.isItemActive(children[0])).toBeTruthy();
        expect(await page.isItemActive(children[1])).toBeFalsy();

        // expect the page content to be correct
        expect(await page.getPageContent()).toBe('Accounts Add');
    });

    it('should update the UI when tree mode is enabled', async () => {
        expect(await page.isTreeModeActive()).toBeFalsy();
        await page.enableTreeBtn.click();
        expect(await page.isTreeModeActive()).toBeTruthy();
    });

    it('should not activate item when queryParams are set', async () => {
        await browser.get('#/navigation/products/add?search=phone');

        const items = await page.getTopLevelItems();

        // none of these items should be selected
        expect(await page.isItemActive(items[0])).toBeFalsy();
        expect(await page.isItemActive(items[1])).toBeFalsy();
        expect(await page.isItemActive(items[2])).toBeFalsy();

        // all items should be collapsed
        expect((await page.getItemChildren(items[0])).length).toBe(0);
        expect((await page.getItemChildren(items[1])).length).toBe(0);
        expect((await page.getItemChildren(items[2])).length).toBe(0);
    });

    it('should activate item when queryParams are set and ignoreQueryParams is set', async () => {
        await browser.get('#/navigation/products/remove?search=phone');

        const items = await page.getTopLevelItems();

        // none of these items should be selected
        expect(await page.isItemActive(items[0])).toBeFalsy();
        expect(await page.isItemActive(items[1])).toBeFalsy();
        expect(await page.isItemActive(items[2])).toBeFalsy();

        // the second item should be collapsed
        expect((await page.getItemChildren(items[0])).length).toBe(0);
        expect((await page.getItemChildren(items[1])).length).toBe(2);
        expect((await page.getItemChildren(items[2])).length).toBe(0);

        const children = await page.getItemChildren(items[1]);

        // none of these items should be selected
        expect(await page.isItemActive(children[0])).toBeFalsy();
        expect(await page.isItemActive(children[1])).toBeTruthy();
    });
});
