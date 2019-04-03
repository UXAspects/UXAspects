import { TabbableListTestPageComponent } from './tabbable-list.po.spec';

describe('Tabbable List Tests', () => {

    let page: TabbableListTestPageComponent;

    beforeEach(async () => {
        page = new TabbableListTestPageComponent();
        await page.getPage();
    });

    it('should allow the first item to be tabbable (and only the first)', async () => {
        expect(await page.getTabIndex(0)).toBe('0');
        expect(await page.getTabIndex(1)).toBe('-1');
        expect(await page.getTabIndex(2)).toBe('-1');
        expect(await page.getTabIndex(3)).toBe('-1');
        expect(await page.getTabIndex(4)).toBe('-1');

        // no items should receive focus automatically by default
        expect(await page.getFocused(0)).toBe(false);
        expect(await page.getFocused(1)).toBe(false);
        expect(await page.getFocused(2)).toBe(false);
        expect(await page.getFocused(3)).toBe(false);
        expect(await page.getFocused(4)).toBe(false);
    });

    it('should make an item tabbable on click', async () => {
        // click the 3rd row
        await page.clickOnRow(2);

        // expect the tab index to change
        expect(await page.getTabIndex(0)).toBe('-1');
        expect(await page.getTabIndex(1)).toBe('-1');
        expect(await page.getTabIndex(2)).toBe('0');
        expect(await page.getTabIndex(3)).toBe('-1');
        expect(await page.getTabIndex(4)).toBe('-1');

        // it should now be focused but not have an indicator
        expect(await page.getFocused(0)).toBe(false);
        expect(await page.getFocused(1)).toBe(false);
        expect(await page.getFocused(2)).toBe(false);
        expect(await page.getFocused(3)).toBe(false);
        expect(await page.getFocused(4)).toBe(false);
    });

    it('should navigate using arrow keys', async () => {
        // click the 1st row
        await page.clickOnRow(0);

        // move the focus down
        await page.moveFocusDown();

        // expect the tab index to change
        expect(await page.getTabIndex(0)).toBe('-1');
        expect(await page.getTabIndex(1)).toBe('0');
        expect(await page.getTabIndex(2)).toBe('-1');
        expect(await page.getTabIndex(3)).toBe('-1');
        expect(await page.getTabIndex(4)).toBe('-1');

        // it should now be focused and have an indicator
        expect(await page.getFocused(0)).toBe(false);
        expect(await page.getFocused(1)).toBe(true);
        expect(await page.getFocused(2)).toBe(false);
        expect(await page.getFocused(3)).toBe(false);
        expect(await page.getFocused(4)).toBe(false);

        // move the focus up
        await page.moveFocusUp();

        // expect the tab index to change
        expect(await page.getTabIndex(0)).toBe('0');
        expect(await page.getTabIndex(1)).toBe('-1');
        expect(await page.getTabIndex(2)).toBe('-1');
        expect(await page.getTabIndex(3)).toBe('-1');
        expect(await page.getTabIndex(4)).toBe('-1');

        // it should now be focused and have an indicator
        expect(await page.getFocused(0)).toBe(true);
        expect(await page.getFocused(1)).toBe(false);
        expect(await page.getFocused(2)).toBe(false);
        expect(await page.getFocused(3)).toBe(false);
        expect(await page.getFocused(4)).toBe(false);
    });

    it('should wrap focus when [wrap]="true"', async () => {

        // select the penultimate item in the list
        await page.clickOnRow(3);

        // move the focus down
        await page.moveFocusDown();

        // expect the tab index to change
        expect(await page.getTabIndex(0)).toBe('-1');
        expect(await page.getTabIndex(1)).toBe('-1');
        expect(await page.getTabIndex(2)).toBe('-1');
        expect(await page.getTabIndex(3)).toBe('-1');
        expect(await page.getTabIndex(4)).toBe('0');

        // it should now be focused and have an indicator
        expect(await page.getFocused(0)).toBe(false);
        expect(await page.getFocused(1)).toBe(false);
        expect(await page.getFocused(2)).toBe(false);
        expect(await page.getFocused(3)).toBe(false);
        expect(await page.getFocused(4)).toBe(true);

        // move the focus down
        await page.moveFocusDown();

        // expect the tab index to change
        expect(await page.getTabIndex(0)).toBe('0');
        expect(await page.getTabIndex(1)).toBe('-1');
        expect(await page.getTabIndex(2)).toBe('-1');
        expect(await page.getTabIndex(3)).toBe('-1');
        expect(await page.getTabIndex(4)).toBe('-1');

        // it should now be focused and have an indicator
        expect(await page.getFocused(0)).toBe(true);
        expect(await page.getFocused(1)).toBe(false);
        expect(await page.getFocused(2)).toBe(false);
        expect(await page.getFocused(3)).toBe(false);
        expect(await page.getFocused(4)).toBe(false);
    });

    it('should not wrap focus when [wrap]="false"', async () => {

        // disable wrapping
        await page.toggleWrap();

        // select the penultimate item in the list
        await page.clickOnRow(3);

        // move the focus down
        await page.moveFocusDown();

        // expect the tab index to change
        expect(await page.getTabIndex(0)).toBe('-1');
        expect(await page.getTabIndex(1)).toBe('-1');
        expect(await page.getTabIndex(2)).toBe('-1');
        expect(await page.getTabIndex(3)).toBe('-1');
        expect(await page.getTabIndex(4)).toBe('0');

        // it should now be focused and have an indicator
        expect(await page.getFocused(0)).toBe(false);
        expect(await page.getFocused(1)).toBe(false);
        expect(await page.getFocused(2)).toBe(false);
        expect(await page.getFocused(3)).toBe(false);
        expect(await page.getFocused(4)).toBe(true);

        // move the focus down
        await page.moveFocusDown();

        // expect the tab index to change
        expect(await page.getTabIndex(0)).toBe('-1');
        expect(await page.getTabIndex(1)).toBe('-1');
        expect(await page.getTabIndex(2)).toBe('-1');
        expect(await page.getTabIndex(3)).toBe('-1');
        expect(await page.getTabIndex(4)).toBe('0');

        // it should now be focused and have an indicator
        expect(await page.getFocused(0)).toBe(false);
        expect(await page.getFocused(1)).toBe(false);
        expect(await page.getFocused(2)).toBe(false);
        expect(await page.getFocused(3)).toBe(false);
        expect(await page.getFocused(4)).toBe(true);
    });

    it('should navigate to first item when HOME key is pressed when [allowBoundaryKeys]="true"', async () => {
        // select the middle item in the list
        await page.clickOnRow(2);

        // press the home key
        await page.moveFocusHome();

        // expect the tab index to change
        expect(await page.getTabIndex(0)).toBe('0');
        expect(await page.getTabIndex(1)).toBe('-1');
        expect(await page.getTabIndex(2)).toBe('-1');
        expect(await page.getTabIndex(3)).toBe('-1');
        expect(await page.getTabIndex(4)).toBe('-1');

        // it should now be focused and have an indicator
        expect(await page.getFocused(0)).toBe(true);
        expect(await page.getFocused(1)).toBe(false);
        expect(await page.getFocused(2)).toBe(false);
        expect(await page.getFocused(3)).toBe(false);
        expect(await page.getFocused(4)).toBe(false);
    });

    it('should navigate to last item when END key is pressed when [allowBoundaryKeys]="true"', async () => {
        // select the middle item in the list
        await page.clickOnRow(2);

        // press the home key
        await page.moveFocusEnd();

        // expect the tab index to change
        expect(await page.getTabIndex(0)).toBe('-1');
        expect(await page.getTabIndex(1)).toBe('-1');
        expect(await page.getTabIndex(2)).toBe('-1');
        expect(await page.getTabIndex(3)).toBe('-1');
        expect(await page.getTabIndex(4)).toBe('0');

        // it should now be focused and have an indicator
        expect(await page.getFocused(0)).toBe(false);
        expect(await page.getFocused(1)).toBe(false);
        expect(await page.getFocused(2)).toBe(false);
        expect(await page.getFocused(3)).toBe(false);
        expect(await page.getFocused(4)).toBe(true);
    });

    it('should not navigate to first item when HOME key is pressed when [allowBoundaryKeys]="false"', async () => {

        // disabled boundary keys
        await page.toggleBoundaryKeys();

        // select the middle item in the list
        await page.clickOnRow(2);

        // press the home key
        await page.moveFocusHome();

        // expect the tab index to change
        expect(await page.getTabIndex(0)).toBe('-1');
        expect(await page.getTabIndex(1)).toBe('-1');
        expect(await page.getTabIndex(2)).toBe('0');
        expect(await page.getTabIndex(3)).toBe('-1');
        expect(await page.getTabIndex(4)).toBe('-1');

        // it should not be visually focused
        expect(await page.getFocused(0)).toBe(false);
        expect(await page.getFocused(1)).toBe(false);
        expect(await page.getFocused(2)).toBe(false);
        expect(await page.getFocused(3)).toBe(false);
        expect(await page.getFocused(4)).toBe(false);
    });

    it('should not navigate to last item when END key is pressed when [allowBoundaryKeys]="false"', async () => {

        // disabled boundary keys
        await page.toggleBoundaryKeys();

        // select the middle item in the list
        await page.clickOnRow(2);

        // press the home key
        await page.moveFocusEnd();

        // expect the tab index to change
        expect(await page.getTabIndex(0)).toBe('-1');
        expect(await page.getTabIndex(1)).toBe('-1');
        expect(await page.getTabIndex(2)).toBe('0');
        expect(await page.getTabIndex(3)).toBe('-1');
        expect(await page.getTabIndex(4)).toBe('-1');

        // it should not be visually focused
        expect(await page.getFocused(0)).toBe(false);
        expect(await page.getFocused(1)).toBe(false);
        expect(await page.getFocused(2)).toBe(false);
        expect(await page.getFocused(3)).toBe(false);
        expect(await page.getFocused(4)).toBe(false);
    });

    it('should not steal focus an item when the list changes', async () => {
        // visually focus a row on the table
        await page.clickOnRow(0);
        await page.moveFocusDown();

        // expect the tab index to change
        expect(await page.getTabIndex(0)).toBe('-1');
        expect(await page.getTabIndex(1)).toBe('0');
        expect(await page.getTabIndex(2)).toBe('-1');
        expect(await page.getTabIndex(3)).toBe('-1');
        expect(await page.getTabIndex(4)).toBe('-1');

        // it should now be focused and have an indicator
        expect(await page.getFocused(0)).toBe(false);
        expect(await page.getFocused(1)).toBe(true);
        expect(await page.getFocused(2)).toBe(false);
        expect(await page.getFocused(3)).toBe(false);
        expect(await page.getFocused(4)).toBe(false);

        // now perform a search that removes all items from the list
        await page.search('zzz');

        // now clear the search so items return
        await page.clearSearch();

        // expect the first item to be tabbable
        expect(await page.getTabIndex(0)).toBe('0');
        expect(await page.getTabIndex(1)).toBe('-1');
        expect(await page.getTabIndex(2)).toBe('-1');
        expect(await page.getTabIndex(3)).toBe('-1');
        expect(await page.getTabIndex(4)).toBe('-1');

        // but no items should be focused
        expect(await page.getFocused(0)).toBe(false);
        expect(await page.getFocused(1)).toBe(false);
        expect(await page.getFocused(2)).toBe(false);
        expect(await page.getFocused(3)).toBe(false);
        expect(await page.getFocused(4)).toBe(false);
    });

    it('should ensure there is always one tabbable item when the list changes', async () => {

        // expect the third document to not be tabbable
        expect(await page.getTabIndex(2)).toBe('-1');

        // perform a search that will leave only the third item in the list visible
        await page.search('Document 3');

        // expect this remaining item to now be tabbable
        expect(await page.getTabIndex(0)).toBe('0');

        // however it should not receive focus
        expect(await page.getFocused(0)).toBe(false);
    });

    it('should initially focus the first item when [focusOnShow]="true"', async () => {
        // toggle focus on show
        await page.toggleFocusOnShow();

        // expect the first item to be tabbable
        expect(await page.getTabIndex(0)).toBe('0');
        expect(await page.getTabIndex(1)).toBe('-1');
        expect(await page.getTabIndex(2)).toBe('-1');
        expect(await page.getTabIndex(3)).toBe('-1');
        expect(await page.getTabIndex(4)).toBe('-1');

        // and first item should have focus
        expect(await page.getFocused(0)).toBe(true);
        expect(await page.getFocused(1)).toBe(false);
        expect(await page.getFocused(2)).toBe(false);
        expect(await page.getFocused(3)).toBe(false);
        expect(await page.getFocused(4)).toBe(false);
    });


});