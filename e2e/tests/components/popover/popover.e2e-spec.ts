import { $, browser, Key } from 'protractor';
import { imageCompare } from '../common/image-compare';
import { PopoverPage } from './popover.po.spec';

describe('Popover', () => {

    let page: PopoverPage;

    beforeEach(async () => {
        page = new PopoverPage();
        await page.getPage();
    });

    it('should have correct initial states', async () => {
        expect(await page.cdkOverlayContainer.isPresent()).toBe(false);
        expect(await page.popover.isPresent()).toBe(false);

        expect(await imageCompare('popover-initial')).toEqual(0);
    });

    it('should show popover on mouse click', async () => {

        // click the button
        await page.showPopoverBtn.click();

        // the popover should now be visible
        expect(await page.cdkOverlayContainer.isPresent()).toBe(true);
        expect(await page.popover.isPresent()).toBe(true);

        expect(await imageCompare('popover-open')).toEqual(0);
    });

    it('should hide popover on mouse click', async () => {

        // click the button
        await page.showPopoverBtn.click();

        // the popover should now be visible
        expect(await page.cdkOverlayContainer.isPresent()).toBe(true);
        expect(await page.popover.isPresent()).toBe(true);

        // click the button again
        await page.showPopoverBtn.click();

        // the popover should now be hidden but the overlay container should remain
        expect(await page.cdkOverlayContainer.isPresent()).toBe(true);
        expect(await page.popover.isPresent()).toBe(false);
    });

    it('should be able to programmatically show the popover', async () => {
        await page.showPopover();
        expect(await page.popover.isPresent()).toBe(true);
    });

    it('should be able to programmatically hide the popover', async () => {
        await page.showPopover();
        expect(await page.popover.isPresent()).toBe(true);

        await page.hidePopover();
        expect(await page.popover.isPresent()).toBe(false);
    });

    it('should be able to programmatically toggle the popover', async () => {
        await page.togglePopover();
        expect(await page.popover.isPresent()).toBe(true);

        await page.togglePopover();
        expect(await page.popover.isPresent()).toBe(false);

        await page.togglePopover();
        expect(await page.popover.isPresent()).toBe(true);
    });

    it('should be able to position the popover', async () => {
        // by default the popover should be displayed on top
        expect(await page.getPopoverPlacement()).toBe('top');

        // set the popover placement to right
        await page.placementRightBtn.click();
        expect(await page.getPopoverPlacement()).toBe('right');

        // set the popover placement to bottom
        await page.placementBottomBtn.click();
        expect(await page.getPopoverPlacement()).toBe('bottom');

        // set the popover placement to left
        await page.placementLeftBtn.click();
        expect(await page.getPopoverPlacement()).toBe('left');

        // set the popover placement to top
        await page.placementTopBtn.click();
        expect(await page.getPopoverPlacement()).toBe('top');

    });

    it('should show the correct content', async () => {
        expect(await page.getPopoverContent()).toBe('Some content here');
    });

    it('should allow a custom class', async () => {

        // should not initially have the class
        expect(await page.popoverHasClass('my-custom-class')).toBe(false);

        // add the custom class
        await page.customClasssBtn.click();

        // should now have the class
        expect(await page.popoverHasClass('my-custom-class')).toBe(true);

        expect(await imageCompare('popover-custom-class')).toEqual(0);
    });

    it('should allow a TemplateRef to be used', async () => {
        // the original content should initially be shown
        expect(await page.getPopoverContent()).toBe('Some content here');

        // set the content to a TemplateRef
        await page.templateRefBtn.click();

        // the content should now have changed
        expect(await page.getPopoverContent()).toBe('My Template Here');
    });

    it('should show a title when specified', async () => {

        // open the popover
        await page.showPopover();

        // expect there to be no title
        expect(await page.popoverTitle.isPresent()).toBe(false);

        // set the title
        await page.setTitleBtn.click();

        // open the popover
        await page.showPopover();

        // expect there to be a title
        expect(await page.popoverTitle.isPresent()).toBe(true);

        // expect the title content to be correct
        expect(await page.popoverTitle.getAttribute('textContent')).toBe('Popover Title');
    });

    it('should close when escape is pressed', async () => {

        // open the popover
        await page.showPopover();
        expect(await page.popover.isPresent()).toBe(true);

        // press the escape key
        await browser.actions().sendKeys(Key.ESCAPE).perform();

        // popover should now be closed
        expect(await page.popover.isPresent()).toBe(false);
    });

    it('should close when a click outside occurs', async () => {

        // open the popover
        await page.showPopover();
        expect(await page.popover.isPresent()).toBe(true);

        // press the mouse button key
        await browser.actions().click($('body')).perform();

        // popover should now be closed
        expect(await page.popover.isPresent()).toBe(false);
    });
});