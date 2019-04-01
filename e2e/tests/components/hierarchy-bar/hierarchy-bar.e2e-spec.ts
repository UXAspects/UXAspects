import { HierarchyBarPage } from './hierarchy-bar.po.spec';

describe('Hierarchy Bar Tests', () => {

    let page: HierarchyBarPage;

    beforeEach(() => {
        page = new HierarchyBarPage();
        page.getPage();
    });

    it('should have correct initial states', async () => {

        // should initially only select the root node
        expect(await page.getNodeCount()).toBe(1);

        // ensure that the selected change event emits the select node
        expect(await page.getSelectedNodeTitle()).toBe('Theresa Chandler');

    });

    it('can programmatically set the selected node', async () => {

        // set the selected input
        await page.selectButton.click();

        // should have two visible node
        expect(await page.getNodeCount()).toBe(2);

        // ensure that the selected change event emits the select node
        expect(await page.getSelectedNodeTitle()).toBe('Leroy Rose');

    });

    it('should display arrow when item has children', async () => {

        // check if the arrow appears on the root node
        expect(await page.nodeHasChildren(0)).toBe(true);

    });

    it('should display children in popover', async () => {
        const titles = await page.getNodeChildrenTitles(0);
        expect(titles).toEqual(['Leroy Rose', 'Lilly Shaw']);
    });

    it('should have selected the correct node on popover click', async () => {
        await page.selectPopoverNode(0, 0);

        expect(await page.getSelectedNodeTitle()).toBe('Leroy Rose');
    });

    it('should show correct children when an obserable is used', async () => {
        await page.selectPopoverNode(0, 0);

        expect(await page.getSelectedNodeTitle()).toBe('Leroy Rose');

        const titles = await page.getNodeChildrenTitles(1);

        expect(titles).toEqual(['Christian Olson', 'Ernest Foster']);
    });

    it('should remove children when parent is clicked', async () => {
        // set the selected input
        await page.selectButton.click();

        // should have two visible node
        expect(await page.getNodeCount()).toBe(2);

        // ensure that the selected change event emits the select node
        expect(await page.getSelectedNodeTitle()).toBe('Leroy Rose');

        // click the first node
        await page.clickNode(0);

        // should have one visible node
        expect(await page.getNodeCount()).toBe(1);

        // ensure that the selected change event emits the select node
        expect(await page.getSelectedNodeTitle()).toBe('Theresa Chandler');
    });

    it('should not have any addons initially', async () => {
        expect((await page.getAddons()).length).toBe(0);
    });

    it('should show left addon', async () => {
        // show the left addon
        await page.showLeftAddonBtn.click();

        // there should now be one addon
        expect((await page.getAddons()).length).toBe(1);

        // check the text of the addon
        const addon = (await page.getAddons())[0];

        expect(await addon.getAttribute('innerText')).toBe('LEFT ADDON');
    });

    it('should show trailing addon', async () => {
        // show the trailing addon
        await page.showTrailingAddonBtn.click();

        // there should now be one addon
        expect((await page.getAddons()).length).toBe(1);

        // check the text of the addon
        const addon = (await page.getAddons())[0];

        expect(await addon.getAttribute('innerText')).toBe('TRAILING ADDON');
    });

    it('should show right addon', async () => {
        // show the right addon
        await page.showRightAddonBtn.click();

        // there should now be one addon
        expect((await page.getAddons()).length).toBe(1);

        // check the text of the addon
        const addon = (await page.getAddons())[0];

        expect(await addon.getAttribute('innerText')).toBe('RIGHT ADDON');
    });

    /**
     * This test is being a bit flaky across machines so commenting this out for now
     */
    // it('should show overflow indicator when overflow occurs', async () => {

    //     // select many children
    //     await page.selectPopoverNode(0, 1);
    //     await page.selectPopoverNode(1, 0);
    //     await page.selectPopoverNode(2, 0);
    //     await page.selectPopoverNode(3, 0);

    //     // overflow indicator should not be visible
    //     expect(await page.isOverflowIndicatorVisible()).toBe(false);

    //     // resize the browser window
    //     await browser.driver.manage().window().setSize(550, 700);

    //     // overflow indicator should be visible
    //     expect(await page.isOverflowIndicatorVisible()).toBe(true);

    //     // get the overflow nodes
    //     const titles = await page.getOverflowNodeTitles();

    //     // expect there to be nodes in the overflow popover
    //     expect(titles).toEqual(['Theresa Chandler', 'Lilly Shaw']);

    //     // increase browser size
    //     await browser.driver.manage().window().setSize(1000, 700);

    //     // overflow indicator should no longer be visible
    //     expect(await page.isOverflowIndicatorVisible()).toBe(false);

    //     // restore window
    //     await browser.driver.manage().window().maximize();

    // });

});