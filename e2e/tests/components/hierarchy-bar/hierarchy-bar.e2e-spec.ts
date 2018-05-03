import { HierarchyBarPage } from './hierarchy-bar.po.spec';
import { browser } from 'protractor';

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
        expect(JSON.stringify(titles)).toBe(JSON.stringify(['Leroy Rose', 'Lilly Shaw']));
    });

    it('should display children in popover', async () => {
        await page.selectPopoverNode(0, 0);

        expect(await page.getSelectedNodeTitle()).toBe('Leroy Rose');
    });

    it('should show correct children when an obserable is used', async () => {
        await page.selectPopoverNode(0, 0);

        expect(await page.getSelectedNodeTitle()).toBe('Leroy Rose');

        const titles = await page.getNodeChildrenTitles(1);

        expect(JSON.stringify(titles)).toBe(JSON.stringify(['Christian Olson', 'Ernest Foster']));
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

    it('should show overflow indicator when overflow occurs', async () => {
        
        // select many children
        await page.selectPopoverNode(0, 1);
        await page.selectPopoverNode(1, 0);
        await page.selectPopoverNode(2, 0);
        await page.selectPopoverNode(3, 0);

        // overflow indicator should not be visible
        expect(await page.isOverflowIndicatorVisible()).toBe(false);

        // resize the browser window
        await browser.driver.manage().window().setSize(550, 700);

        // overflow indicator should be visible
        expect(await page.isOverflowIndicatorVisible()).toBe(true);

        // get the overflow nodes
        const titles = await page.getOverflowNodeTitles();
        
        // expect there to be nodes in the overflow popover
        expect(JSON.stringify(titles)).toBe(JSON.stringify(['Theresa Chandler', 'Lilly Shaw']));

        // increase browser size
        await browser.driver.manage().window().setSize(1000, 700);
        
        // overflow indicator should no longer be visible
        expect(await page.isOverflowIndicatorVisible()).toBe(false);
        
        // restore window
        await browser.driver.manage().window().maximize();
        
    });

});