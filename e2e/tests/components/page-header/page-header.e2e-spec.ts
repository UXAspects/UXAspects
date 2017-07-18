import { browser } from 'protractor';
import { PageHeaderPage } from './page-header.po.spec';

describe('Page Header Tests', () => {

  let page: PageHeaderPage;
  let browserName: string;

  beforeEach(() => {
    page = new PageHeaderPage();
    page.getPage();
    
    page.condensed = false;
    
    browser.getCapabilities().then(function(caps) {
        browserName = caps.get('browserName');
    });
  });

  it('should have correct initial states', () => {
    
    // Initial values.
    expect(page.confirmPageHeaderIsCondensed()).toBeFalsy();
    expect<any>(page.getABreadcrumb(0)).toEqual('Archive');
    expect(page.confirmApplicationLogoIsPresent()).toBeTruthy();
    expect<any>(page.getApplicationLogoText()).toEqual('Home');    
    expect(page.confirmDropdownIsPresent()).toBeTruthy();
    expect(page.confirmDropdownIsOpened()).toBeFalsy();
    expect(page.confirmNotificationIconIsPresent()).toBeTruthy();
    expect(page.confirmActionsIconIsPresent()).toBeTruthy();
    
  });

  it('should display breadcrumbs when condensed', () => {
    
    page.toggleTheHeader();
    expect<any>(page.getABreadcrumbWhenCondensed(0)).toEqual('Archive');
    expect<any>(page.getABreadcrumbWhenCondensed(1)).toEqual('My Page');
    
  });

  it('should display an application logo and text when condensed', () => {
    
    page.toggleTheHeader();
    expect(page.confirmApplicationLogoIsPresent()).toBeTruthy();
    expect<any>(page.getApplicationLogoText()).toEqual('Home'); 
    
  });

  it('should display the dropdown menu', () => {
    
    expect(page.confirmDropdownIsPresent()).toBeTruthy();
    page.openDropdown();
    expect(page.confirmDropdownIsOpened()).toBeTruthy();
    
  });

  it('should display the dropdown menu when condensed', () => {
    
    page.toggleTheHeader();
    expect(page.confirmDropdownIsPresent()).toBeTruthy();
    page.openDropdown();
    expect(page.confirmDropdownIsOpened()).toBeTruthy();
    
  });
  
  it('should display the dropdown menu items', () => {
    
    expect(page.confirmDropdownIsPresent()).toBeTruthy();
    page.openDropdown();
    expect(page.confirmDropdownIsOpened()).toBeTruthy();
    expect<any>(page.getFirstDropdownMenuItem(1)).toEqual('Pie Charts');
    page.displaySecondDropdownMenu();
    expect<any>(page.getSecondDropdownMenuItem(2)).toEqual('Monthly View');
    
  });

  it('should display the dropdown menu items when condensed', () => {
    
    page.toggleTheHeader();
    expect(page.confirmDropdownIsPresent()).toBeTruthy();
    page.openDropdown();
    expect(page.confirmDropdownIsOpened()).toBeTruthy();
    expect<any>(page.getFirstDropdownMenuItem(1)).toEqual('Pie Charts');
    page.displaySecondDropdownMenu();
    expect<any>(page.getSecondDropdownMenuItem(2)).toEqual('Monthly View');
    
  });

  it('should display the notifications menu', () => {
    
    expect(page.confirmNotificationIconIsPresent()).toBeTruthy();
    page.openNotifications();
    expect<any>(page.confirmNotificationsAreDisplayed()).toEqual(3);
    
  });

  it('should display the notifications menu when condensed', () => {
    
    page.toggleTheHeader();
    expect(page.confirmNotificationIconIsPresent()).toBeTruthy();
    page.openNotifications();
    expect<any>(page.confirmNotificationsAreDisplayed()).toEqual(3);
    
  });

  it('should display the actions menu', () => {
    
    expect(page.confirmActionsIconIsPresent()).toBeTruthy();
    page.openActions();
    expect<any>(page.confirmActionsAreDisplayed()).toEqual(4);
    
  });

  it('should display the actions menu when condensed', () => {
    
    page.toggleTheHeader();
    expect(page.confirmActionsIconIsPresent()).toBeTruthy();
    page.openActions();
    expect<any>(page.confirmActionsAreDisplayed()).toEqual(4);
    
  });
});