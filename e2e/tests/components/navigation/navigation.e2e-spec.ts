import { browser, Key } from 'protractor';
import { imageCompare } from '../common/image-compare';
import { NavigationPage } from './navigation.po.spec';

describe('Navigation Tests', () => {

    let page: NavigationPage;

    beforeEach(async () => {
        page = new NavigationPage();
        await page.getPage();
    });

    it('should intially be collapsed with no items selected', async () => {

        // there should be 3 top level items
        const items = await page.getTopLevelItems();
        expect(items.length).toBe(4);

        // none of these items should be selected
        expect(await page.isItemActive(items[0])).toBeFalsy();
        expect(await page.isItemActive(items[1])).toBeFalsy();
        expect(await page.isItemActive(items[2])).toBeFalsy();
        expect(await page.isItemActive(items[3])).toBeFalsy();

        // all items should be collapsed
        expect((await page.getItemChildren(items[0])).length).toBe(0);
        expect((await page.getItemChildren(items[1])).length).toBe(0);
        expect((await page.getItemChildren(items[2])).length).toBe(0);
        expect((await page.getItemChildren(items[3])).length).toBe(0);

        expect(await imageCompare('navigation-initial')).toEqual(0);
    });

    it('should navigate to the routerLink when clicked', async () => {
        const items = await page.getTopLevelItems();

        await page.selectItem(items[0]);

        expect(await page.isItemActive(items[0])).toBeTruthy();
        expect(await page.isItemActive(items[1])).toBeFalsy();
        expect(await page.isItemActive(items[2])).toBeFalsy();
        expect(await page.isItemActive(items[3])).toBeFalsy();
    });

    it('should expand but not change route when item has children but no routerLink', async () => {
        const items = await page.getTopLevelItems();

        await page.selectItem(items[1]);

        expect(await page.isItemActive(items[0])).toBeFalsy();
        expect(await page.isItemActive(items[1])).toBeFalsy();
        expect(await page.isItemActive(items[2])).toBeFalsy();
        expect(await page.isItemActive(items[3])).toBeFalsy();

        // get the visible children
        expect((await page.getItemChildren(items[0])).length).toBe(0);
        expect((await page.getItemChildren(items[1])).length).toBe(2);
        expect((await page.getItemChildren(items[2])).length).toBe(0);
        expect((await page.getItemChildren(items[3])).length).toBe(0);

        expect(await imageCompare('navigation-expanded')).toEqual(0);
    });

    it('should expand and change route when item has children and routerLink', async () => {
        const items = await page.getTopLevelItems();

        await page.selectItem(items[2]);

        expect(await page.isItemActive(items[0])).toBeFalsy();
        expect(await page.isItemActive(items[1])).toBeFalsy();
        expect(await page.isItemActive(items[2])).toBeTruthy();
        expect(await page.isItemActive(items[3])).toBeFalsy();

        // get the visible children
        expect((await page.getItemChildren(items[0])).length).toBe(0);
        expect((await page.getItemChildren(items[1])).length).toBe(0);
        expect((await page.getItemChildren(items[2])).length).toBe(2);
        expect((await page.getItemChildren(items[3])).length).toBe(0);

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

        expect(await imageCompare('navigation-child-selection')).toEqual(0);
    });

    // Disabled due to Ivy issue: https://github.com/angular/angular/issues/35826
    // it('should initially select a root node if the router link matches', async () => {
    //     await browser.get('#/navigation/dashboard');

    //     const items = await page.getTopLevelItems();

    //     // expect the first item to be selected
    //     expect(await page.isItemActive(items[0])).toBeTruthy();
    //     expect(await page.isItemActive(items[1])).toBeFalsy();
    //     expect(await page.isItemActive(items[2])).toBeFalsy();

    //     // expect the page content to be correct
    //     expect(await page.getPageContent()).toBe('Dashboard');

    //     expect(await imageCompare('navigation-root-selection')).toEqual(0);
    // });

    // Disabled due to Ivy issue: https://github.com/angular/angular/issues/35826
    // it('should initially select a child node if the router link matches', async () => {
    //     await browser.get('#/navigation/products/add');

    //     const items = await page.getTopLevelItems();

    //     // expect the first item to be selected
    //     expect(await page.isItemActive(items[0])).toBeFalsy();
    //     expect(await page.isItemActive(items[1])).toBeFalsy();
    //     expect(await page.isItemActive(items[2])).toBeFalsy();

    //     // get the visible children
    //     expect((await page.getItemChildren(items[0])).length).toBe(0);
    //     expect((await page.getItemChildren(items[1])).length).toBe(2);
    //     expect((await page.getItemChildren(items[2])).length).toBe(0);

    //     const children = await page.getItemChildren(items[1]);

    //     // the selected state should be updated correctly
    //     expect(await page.isItemActive(children[0])).toBeTruthy();
    //     expect(await page.isItemActive(children[1])).toBeFalsy();

    //     // expect the page content to be correct
    //     expect(await page.getPageContent()).toBe('Product Add');
    // });

    it('should collapse an expanded node on click', async () => {
        const items = await page.getTopLevelItems();

        await page.selectItem(items[1]);

        // get the visible children
        expect((await page.getItemChildren(items[0])).length).toBe(0);
        expect((await page.getItemChildren(items[1])).length).toBe(2);
        expect((await page.getItemChildren(items[2])).length).toBe(0);
        expect((await page.getItemChildren(items[3])).length).toBe(0);

        await page.selectItem(items[1]);

        // get the visible children
        expect((await page.getItemChildren(items[0])).length).toBe(0);
        expect((await page.getItemChildren(items[1])).length).toBe(0);
        expect((await page.getItemChildren(items[2])).length).toBe(0);
        expect((await page.getItemChildren(items[3])).length).toBe(0);
    });

    it('should not collapse other items when autoCollapse is false', async () => {
        const items = await page.getTopLevelItems();
        await page.selectItem(items[1]);

        // get the visible children
        expect((await page.getItemChildren(items[0])).length).toBe(0);
        expect((await page.getItemChildren(items[1])).length).toBe(2);
        expect((await page.getItemChildren(items[2])).length).toBe(0);
        expect((await page.getItemChildren(items[3])).length).toBe(0);

        await page.selectItem(items[2]);

        // get the visible children
        expect((await page.getItemChildren(items[0])).length).toBe(0);
        expect((await page.getItemChildren(items[1])).length).toBe(2);
        expect((await page.getItemChildren(items[2])).length).toBe(2);
        expect((await page.getItemChildren(items[3])).length).toBe(0);
    });

    it('should collapse other items when autoCollapse is true', async () => {
        const items = await page.getTopLevelItems();
        await page.selectItem(items[1]);

        // get the visible children
        expect((await page.getItemChildren(items[0])).length).toBe(0);
        expect((await page.getItemChildren(items[1])).length).toBe(2);
        expect((await page.getItemChildren(items[2])).length).toBe(0);
        expect((await page.getItemChildren(items[3])).length).toBe(0);

        // enable auto collapse
        await page.enableAutoCollapse.click();

        await page.selectItem(items[2]);

        // get the visible children
        expect((await page.getItemChildren(items[0])).length).toBe(0);
        expect((await page.getItemChildren(items[1])).length).toBe(0);
        expect((await page.getItemChildren(items[2])).length).toBe(2);
        expect((await page.getItemChildren(items[3])).length).toBe(0);
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
        expect(await page.isItemActive(items[3])).toBeFalsy();

        expect(await page.isItemActive(children[0])).toBeTruthy();
        expect(await page.isItemActive(children[1])).toBeFalsy();

        // expect the page content to be correct
        expect(await page.getPageContent()).toBe('Accounts Add');
    });

    it('should disable node when disabled is to true', async () => {
        const items = await page.getTopLevelItems();
        await page.selectItem(items[3]);
        const children = await page.getItemChildren(items[3]);

        expect(await page.isItemDisabled(children[0])).toBe(true);
    });

    it('should disable the options node when disabled is set to true', async () => {
        const items = await page.getTopLevelItems();
        await page.disableOptions.click();

        expect(await page.isItemDisabled(items[3])).toBe(true);

        expect(await imageCompare('navigation-options-disabled')).toEqual(0);
    });

    it('should prevent routerLinks from activating when disabled is true', async () => {
        const items = await page.getTopLevelItems();
        await page.disableOptions.click();

        await browser.actions().mouseMove(items[3]).click();

        expect(await imageCompare('navigation-options-disabled')).toEqual(0);
    });

    it('should fire click events when disabled is false or not set', async () => {
        const items = await page.getTopLevelItems();
        await page.selectItem(items[3]);

        expect(await page.getOptionsClicked()).toBe('Options click event');
    });

    it('should prevent click events from activating when disabled is true', async () => {
        const items = await page.getTopLevelItems();
        await page.disableOptions.click();

        await browser.actions().mouseMove(items[3]).click();

        expect(await imageCompare('navigation-options-disabled')).toEqual(0);
    });

    it('should not collapse disabled nodes when disabled is true', async () => {
        const items = await page.getTopLevelItems();

        // Expand options node
        await items[3].click();
        expect(await page.isItemSelected(items[3])).toBe(true);
        expect(await page.getOptionsClicked()).toBe('Options click event');

        // disable options node
        await page.disableOptions.click();

        // try to click disabled options node
        await browser.actions().mouseMove(items[3]).click();

        // should remain expanded
        expect(await page.isItemSelected(items[3])).toBe(true);

        expect(await imageCompare('navigation-options-expanded-disabled'));
    });

    it('should prevent clicking of child nodes when they are disabled', async () => {
        const items = await page.getTopLevelItems();

        // Expand options node
        await items[3].click();
        expect(await page.isItemSelected(items[3])).toBe(true);
        expect(await page.getPageContent()).toBe('Options');
        expect(await page.getOptionsClicked()).toBe('Options click event');

        // try to click disabled options child node
        const childNodes = await page.getItemChildren(items[3]);
        await browser.actions().mouseMove(childNodes[0]).click();

        // expect page content to not have changed
        expect(await page.getPageContent()).toBe('Options');
    });

    it('should prevent disabled items from receiving focus', async () => {
        const items = await page.getTopLevelItems();
        await page.disableOptions.click();

        await page.topFocus.click();

        // expect Accounts node to be focused
        await browser.actions().sendKeys(Key.TAB).perform();
        await browser.actions().sendKeys(Key.ARROW_DOWN).perform();
        await browser.actions().sendKeys(Key.ARROW_DOWN).perform();
        expect(await page.isItemFocused(items[2])).toBe(true);

        // try to move down to Options node
        await browser.actions().sendKeys(Key.ARROW_DOWN).perform();

        // Options node should not be focused and Dashboard node should be focused
        expect(await page.isItemFocused(items[3])).toBe(false);
        expect(await page.isItemFocused(items[0])).toBe(true);

        expect(await imageCompare('navigation-disabled-focus')).toEqual(0);
    });

    it('should disabled items in tree mode preventing navigation and click events', async () => {
        const items = await page.getTopLevelItems();
        await page.enableTreeBtn.click();
        await page.disableOptions.click();

        // expect tree mode to be active
        expect(await page.isTreeModeActive()).toBe(true);

        // try to click options node
        await browser.actions().mouseMove(items[3]).click();

        expect(await page.isItemSelected(items[3])).toBe(false);
        expect(await imageCompare('navigation-tree-mode-options-disabled'));
    });

    // disabel items on tree mode

    it('should update the UI when tree mode is enabled', async () => {
        expect(await page.isTreeModeActive()).toBe(false);
        await page.enableTreeBtn.click();
        expect(await page.isTreeModeActive()).toBe(true);

        expect(await imageCompare('navigation-tree-initial')).toEqual(0);
    });

    it('should not activate item when queryParams are set', async () => {
        await browser.get('#/navigation/products/add?search=phone');

        const items = await page.getTopLevelItems();

        // none of these items should be selected
        expect(await page.isItemActive(items[0])).toBeFalsy();
        expect(await page.isItemActive(items[1])).toBeFalsy();
        expect(await page.isItemActive(items[2])).toBeFalsy();
        expect(await page.isItemActive(items[3])).toBeFalsy();

        // all items should be collapsed
        expect((await page.getItemChildren(items[0])).length).toBe(0);
        expect((await page.getItemChildren(items[1])).length).toBe(0);
        expect((await page.getItemChildren(items[2])).length).toBe(0);
        expect((await page.getItemChildren(items[3])).length).toBe(0);
    });

    // Disabled due to Ivy issue: https://github.com/angular/angular/issues/35826
    // it('should activate item when queryParams are set and ignoreQueryParams is set', async () => {
    //     await browser.get('#/navigation/products/remove?search=phone');

    //     const items = await page.getTopLevelItems();

    //     // none of these items should be selected
    //     expect(await page.isItemActive(items[0])).toBeFalsy();
    //     expect(await page.isItemActive(items[1])).toBeFalsy();
    //     expect(await page.isItemActive(items[2])).toBeFalsy();

    //     // the second item should be collapsed
    //     expect((await page.getItemChildren(items[0])).length).toBe(0);
    //     expect((await page.getItemChildren(items[1])).length).toBe(2);
    //     expect((await page.getItemChildren(items[2])).length).toBe(0);

    //     const children = await page.getItemChildren(items[1]);

    //     // none of these items should be selected
    //     expect(await page.isItemActive(children[0])).toBeFalsy();
    //     expect(await page.isItemActive(children[1])).toBeTruthy();
    // });
});
