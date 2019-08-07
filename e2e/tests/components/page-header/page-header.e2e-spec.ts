// import { ElementArrayFinder, ElementFinder } from 'protractor';
import { PageHeaderPage } from './page-header.po.spec';

describe('Page Header Tests', () => {

    let page: PageHeaderPage;

    beforeEach(() => {
        page = new PageHeaderPage();
        page.getPage();

        page.condensed = false;
    });

    // it('should have correct initial states', async () => {
    //     // Initial values.
    //     expect(await page.confirmPageHeaderIsCondensed()).toBeFalsy();
    //     expect(await page.getABreadcrumb(0)).toEqual('Archive');
    //     expect(await page.confirmApplicationLogoIsPresent()).toBeTruthy();
    //     expect(await page.getApplicationLogoText()).toEqual('Home');
    //     expect(await page.confirmDropdownIsPresent()).toBeTruthy();
    //     expect(await page.confirmDropdownIsOpened()).toBeFalsy();
    //     expect(await page.confirmNotificationIconIsPresent()).toBeTruthy();
    //     expect(await page.confirmActionsIconIsPresent()).toBeTruthy();

    // });

    // it('should display breadcrumbs when condensed', async () => {

    //     await page.toggleTheHeader();
    //     expect(await page.getABreadcrumb(0)).toEqual('Archive');
    //     expect(await page.getABreadcrumb(1)).toEqual('My Page');

    // });

    // it('should display an application logo and text when condensed', async () => {

    //     await page.toggleTheHeader();
    //     expect(await page.confirmApplicationLogoIsPresent()).toBeTruthy();
    //     expect(await page.getApplicationLogoText()).toEqual('Home');

    // });

    // it('should display the dropdown menu', async () => {

    //     expect(await page.confirmDropdownIsPresent()).toBeTruthy();
    //     await page.openDropdown();
    //     expect(await page.confirmDropdownIsOpened()).toBeTruthy();

    // });

    // it('should display the dropdown menu when condensed', async () => {

    //     await page.toggleTheHeader();
    //     expect(await page.confirmDropdownIsPresent()).toBeTruthy();
    //     await page.openDropdown();
    //     expect(await page.confirmDropdownIsOpened()).toBeTruthy();

    // });

    // it('should display the dropdown menu items', async () => {

    //     expect(await page.confirmDropdownIsPresent()).toBeTruthy();
    //     await page.openDropdown();
    //     expect(await page.confirmDropdownIsOpened()).toBeTruthy();

    //     expect(await page.getFirstDropdownMenuItem(1)).toEqual('Pie Charts');
    //     await page.displaySecondDropdownMenu();
    //     expect(await page.getSecondDropdownMenuItem(2)).toEqual('Monthly View');

    // });

    // it('should display the dropdown menu items when condensed', async () => {

    //     await page.toggleTheHeader();
    //     expect(await page.confirmDropdownIsPresent()).toBeTruthy();
    //     await page.openDropdown();
    //     expect(await page.confirmDropdownIsOpened()).toBeTruthy();
    //     expect(await page.getFirstDropdownMenuItem(1)).toEqual('Pie Charts');
    //     await page.displaySecondDropdownMenu();
    //     expect(await page.getSecondDropdownMenuItem(2)).toEqual('Monthly View');

    // });

    // it('should display the notifications menu', async () => {

    //     expect(await page.confirmNotificationIconIsPresent()).toBeTruthy();
    //     await page.openNotifications();
    //     expect(await page.confirmNotificationsAreDisplayed()).toEqual(3);

    // });

    // it('should display the notifications menu when condensed', async () => {

    //     await page.toggleTheHeader();
    //     expect(await page.confirmNotificationIconIsPresent()).toBeTruthy();
    //     await page.openNotifications();
    //     expect(await page.confirmNotificationsAreDisplayed()).toEqual(3);

    // });

    // it('should display the actions menu', async () => {

    //     expect(await page.confirmActionsIconIsPresent()).toBeTruthy();
    //     await page.openActions();
    //     expect(await page.confirmActionsAreDisplayed()).toEqual(3);

    // });

    // it('should display the actions menu when condensed', async () => {

    //     await page.toggleTheHeader();
    //     expect(await page.confirmActionsIconIsPresent()).toBeTruthy();
    //     await page.openActions();
    //     expect(await page.confirmActionsAreDisplayed()).toEqual(3);

    // });

    // it('should not show secondary navigation when nothing is selected', async () => {
    //     const secondaryNavigation: ElementFinder = await page.getSecondaryNavigation();
    //     expect(await secondaryNavigation.isPresent()).toBe(false);
    // });

    // it('should not show secondary navigation items when there is no children on the selected item', async () => {

    //     // enable autoselect
    //     await page.autoselectButton.click();

    //     // click the first menu item
    //     await page.pageHeader2.$$('.horizontal-navigation-button').get(0).click();

    //     // get the required elements
    //     const secondaryNavigation: ElementFinder = await page.getSecondaryNavigation();
    //     const tabset = await secondaryNavigation.$('.nav-tabs');

    //     expect(await secondaryNavigation.isPresent()).toBe(false);
    //     expect(await tabset.isPresent()).toBe(false);
    // });

    // it('should show secondary navigation items when there are children on the selected item', async () => {

    //     // enable autoselect
    //     await page.autoselectButton.click();

    //     // click the second menu item
    //     await page.pageHeader2.$$('.horizontal-navigation-button').get(1).click();

    //     // get the required elements
    //     const secondaryNavigation: ElementFinder = await page.getSecondaryNavigation();
    //     const tabset = await secondaryNavigation.$('.nav-tabs');
    //     const tabs: ElementArrayFinder = await tabset.$$('li');

    //     expect(await secondaryNavigation.isPresent()).toBe(true);
    //     expect(await tabset.isPresent()).toBe(true);

    //     // check the number of tabs are correct
    //     expect(tabs.length).toBe(3);
    // });

    // it('should align the tabset accordingly', async () => {

    //     // enable autoselect
    //     await page.autoselectButton.click();

    //     // click the second menu item
    //     await page.pageHeader2.$$('.horizontal-navigation-button').get(1).click();

    //     // get the required elements
    //     const secondaryNavigation: ElementFinder = await page.getSecondaryNavigation();

    //     // should contain the 'center' class initially
    //     expect(await page.getClasses(secondaryNavigation)).toContain('center');

    //     // click the left align button
    //     await page.alignLeftButton.click();

    //     // should now contain the 'left' class
    //     expect(await page.getClasses(secondaryNavigation)).toContain('left');

    //     // click the right align button
    //     await page.alignRightButton.click();

    //     // should now contain the 'right' class
    //     expect(await page.getClasses(secondaryNavigation)).toContain('right');

    //     // click the center align button
    //     await page.alignCenterButton.click();

    //     // should now contain the 'center' class
    //     expect(await page.getClasses(secondaryNavigation)).toContain('center');
    // });

    // it('should call the select functions when secondary items are clicked', async () => {

    //     // enable autoselect
    //     await page.autoselectButton.click();

    //     // click the second menu item
    //     await page.pageHeader2.$$('.horizontal-navigation-button').get(1).click();

    //     // get the required elements
    //     const secondaryNavigation: ElementFinder = await page.getSecondaryNavigation();
    //     const tabset = await secondaryNavigation.$('.nav-tabs');
    //     const tabs: ElementArrayFinder = await tabset.$$('li');

    //     // click the first item
    //     await tabs[0].click();

    //     // check the selected text
    //     expect(await page.selected.getText()).toBe('Daily View');

    //     // click the second item
    //     await tabs[1].click();

    //     // check the selected text
    //     expect(await page.selected.getText()).toBe('Weekly View');

    //     // click the third item
    //     await tabs[2].click();

    //     // check the selected text
    //     expect(await page.selected.getText()).toBe('Monthly View');
    // });

    // it('should automatically select the first item when autoselect is enabled', async () => {

    //     // enable autoselect
    //     await page.autoselectButton.click();

    //     // click the second menu item
    //     await page.pageHeader2.$$('.horizontal-navigation-button').get(1).click();

    //     // get the required elements
    //     const secondaryNavigation: ElementFinder = await page.getSecondaryNavigation();
    //     const tabset = await secondaryNavigation.$('.nav-tabs');
    //     const tabs: ElementArrayFinder = await tabset.$$('li');

    //     // check the selected text
    //     expect(await page.selected.getText()).toBe('Daily View');
    // });

    // it('should reselect the first item when the parent it clicked with autoselect enabled', async () => {

    //     // enable autoselect
    //     await page.autoselectButton.click();

    //     // click the second menu item
    //     await page.pageHeader2.$$('.horizontal-navigation-button').get(1).click();

    //     // get the required elements
    //     const secondaryNavigation: ElementFinder = await page.getSecondaryNavigation();
    //     const tabset = await secondaryNavigation.$('.nav-tabs');
    //     const tabs: ElementArrayFinder = await tabset.$$('li');

    //     // click the second item
    //     await tabs[1].click();

    //     // check the selected text
    //     expect(await page.selected.getText()).toBe('Weekly View');

    //     // click the second menu item again
    //     await page.pageHeader2.$$('.horizontal-navigation-button').get(1).click();

    //     // check the first child is selected
    //     expect(await page.selected.getText()).toBe('Daily View');
    // });

    // it('should get the correct subheader', async () => {
    //     expect(await page.getSubheaderText(page.pageHeader1)).toBe('My Subheader');

    //     // we have a deprecated `title` property which original set the subheader. We should check that this also still works
    //     expect(await page.getSubheaderText(page.pageHeader2)).toBe('My Subheader');
    // });
});