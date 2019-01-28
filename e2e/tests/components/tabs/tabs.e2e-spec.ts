import { Key } from 'protractor';
import { TabsTestPageComponent } from './tabs.po.spec';

describe('Tabs Tests (Angular)', () => {

    let page: TabsTestPageComponent;


    beforeEach(() => {
        page = new TabsTestPageComponent();
        page.getPage();
    });

    it('should have correct initial states', async () => {
        // should have 4 tabs
        expect(await page.getTabCount()).toBe(4);

        // expect the first tab to be selected by default
        expect(await page.getSelectedTab()).toBe('Schedule');

        // expect the correct tab content to be visible
        expect(await page.getSelectedTabContent()).toBe('Schedule');

        // expect the tabset to have the minimal styling by default
        expect(await page.getTabsetStyle()).toBe('minimal');

        // expect the tabset not to be stacked
        expect(await page.getTabsetStack()).toBe('none');
    });

    it('should select a tab on click', async () => {

        // expect the first tab to be selected by default
        expect(await page.getSelectedTab()).toBe('Schedule');

        // expect the correct tab content to be visible
        expect(await page.getSelectedTabContent()).toBe('Schedule');

        // click the second tab
        await page.clickTabAtIndex(1);

        // expect the second tab to be selected
        expect(await page.getSelectedTab()).toBe('Protection');

        // expect the correct tab content to be visible
        expect(await page.getSelectedTabContent()).toBe('Protection');
    });

    it('should navigate between tabs using arrow keys', async () => {

        // expect the first tab to be selected by default
        expect(await page.getSelectedTab()).toBe('Schedule');

        // expect the correct tab content to be visible
        expect(await page.getSelectedTabContent()).toBe('Schedule');

        // click the second tab
        await page.clickTabAtIndex(1);

        // expect the second tab to be selected
        expect(await page.getSelectedTab()).toBe('Protection');

        // expect the correct tab content to be visible
        expect(await page.getSelectedTabContent()).toBe('Protection');

        // press the left arrow
        await page.pressKey(Key.ARROW_LEFT);

        // expect the first tab to be selected
        expect(await page.getSelectedTab()).toBe('Schedule');

        // expect the correct tab content to be visible
        expect(await page.getSelectedTabContent()).toBe('Schedule');

        // press the right arrow
        await page.pressKey(Key.ARROW_RIGHT);

        // expect the second tab to be selected
        expect(await page.getSelectedTab()).toBe('Protection');

        // expect the correct tab content to be visible
        expect(await page.getSelectedTabContent()).toBe('Protection');
    });

    it('should navigate to first tab when Home key is pressed', async () => {

        // expect the first tab to be selected by default
        expect(await page.getSelectedTab()).toBe('Schedule');

        // expect the correct tab content to be visible
        expect(await page.getSelectedTabContent()).toBe('Schedule');

        // click the second tab
        await page.clickTabAtIndex(1);

        // expect the second tab to be selected
        expect(await page.getSelectedTab()).toBe('Protection');

        // expect the correct tab content to be visible
        expect(await page.getSelectedTabContent()).toBe('Protection');

        // press home key
        await page.pressKey(Key.HOME);

        // expect the first tab to be selected
        expect(await page.getSelectedTab()).toBe('Schedule');

        // expect the correct tab content to be visible
        expect(await page.getSelectedTabContent()).toBe('Schedule');
    });

    it('should navigate to last tab when End key is pressed', async () => {

        // expect the first tab to be selected by default
        expect(await page.getSelectedTab()).toBe('Schedule');

        // expect the correct tab content to be visible
        expect(await page.getSelectedTabContent()).toBe('Schedule');

        // click the second tab
        await page.clickTabAtIndex(1);

        // expect the second tab to be selected
        expect(await page.getSelectedTab()).toBe('Protection');

        // expect the correct tab content to be visible
        expect(await page.getSelectedTabContent()).toBe('Protection');

        // press home key
        await page.pressKey(Key.END);

        // expect the last tab to be selected
        expect(await page.getSelectedTab()).toBe('Analytics');

        // expect the correct tab content to be visible
        expect(await page.getSelectedTabContent()).toBe('Analytics');
    });

    it('should trigger select event on click', async () => {

        // expect the first tab to be selected by default
        expect(await page.getSelectedLabelText()).toBe('The selected tab is: Schedule');

        // click the second tab
        await page.clickTabAtIndex(1);

        // the selected label text should have update once the event it emitted
        expect(await page.getSelectedLabelText()).toBe('The selected tab is: Protection');

    });

    it('should allow alternative styling', async () => {

        // expect minimal style
        expect(await page.getTabsetStyle()).toBe('minimal');

        // toggle the checkbox
        await page.minimalCheckbox.click();

        // expect alternative style
        expect(await page.getTabsetStyle()).toBe('alternative');

    });

    it('should allow stacking left', async () => {

        // expect no stacking
        expect(await page.getTabsetStack()).toBe('none');

        // select stack left
        await page.stackLeftRadio.click();

        // expect stack left
        expect(await page.getTabsetStack()).toBe('left');

    });

    it('should allow stacking right', async () => {

        // expect no stacking
        expect(await page.getTabsetStack()).toBe('none');

        // select stack right
        await page.stackRightRadio.click();

        // expect stack right
        expect(await page.getTabsetStack()).toBe('right');

    });

});