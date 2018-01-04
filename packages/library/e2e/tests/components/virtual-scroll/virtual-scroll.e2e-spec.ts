import { browser, Key } from 'protractor';
import { VirtualScrollPage } from './virtual-scroll.po.spec';

describe('Virtual Scroll Tests', () => {

  let page: VirtualScrollPage;
  let browserName: string;

  beforeEach(() => {
    page = new VirtualScrollPage();
    page.getPage();
    
    browser.getCapabilities().then(function(caps) {
        browserName = caps.get('browserName');
    });
  });

  it('should have correct initial states', () => {
    
    // Panel hidden
    expect(page.confirmCustomizeExamplePanelIsExpanded()).toBeFalsy();
    
    // LOAD MORE button not visible
    expect(page.confirmLoadMoreIsVisible()).toBeFalsy();
    
    // loadOnScroll checked
    page.clickOnCustomizeExamplePanel();
    expect(page.confirmLoadOnScrollIsChecked()).toBeTruthy();
    
    // 5 visible employees
    expect<any>(page.getLastVisibleEmployeeIDNumber()).toBe('4');
    
  });
 
  it('should display the correct employee details', () => {
    
    // Employee's name
    for (var i = 0; i < 4; i++) {
        expect<any>(page.getEmployeeText(i)).toBe('Employee_' + i);
    }

    // Employee's department
    for (i = 0; i < 4; i++) {
        expect<any>(page.getDepartmentText(i)).toBe('(Department_' + i + ')');
    }

    // Employee's email
    for (i = 0; i < 4; i++) {
        expect<any>(page.getEmailText(i)).toBe('employee.' + i + '@business.com');
    }

    // Employee's ID
    for (i = 0; i < 4; i++) {
        expect<any>(page.getEmployeeIDNumber(i)).toBe(i.toString());
    }
    
  });
 
  it('should expand/hide panel on click', () => {
    
    page.clickOnCustomizeExamplePanel();
    expect(page.confirmCustomizeExamplePanelIsExpanded()).toBeTruthy();
    page.clickOnCustomizeExamplePanel();
    expect(page.confirmCustomizeExamplePanelIsExpanded()).toBeFalsy();
    
  });
 
  it('should react to clicking on the loadOnScroll checkbox', () => {
    
    // Unchecking
    page.clickOnCustomizeExamplePanel();
    page.clickOnLoadOnScroll();
    expect(page.confirmLoadOnScrollIsChecked()).toBeFalsy();
    
    // Checking
    page.clickOnLoadOnScroll();
    expect(page.confirmLoadOnScrollIsChecked()).toBeTruthy();
    
  });
 
  it('should display more employees when the LOAD MORE button is clicked', () => {
    
    page.clickOnCustomizeExamplePanel();
    page.clickOnLoadOnScroll();

    page.scrollToEnd();
    expect<any>(page.getLastVisibleEmployeeIDNumber()).toBe('1999');
    
    // Click on LOAD MORE button
    page.loadMoreButton.click();
    page.scrollToEnd();
    expect<any>(page.getLastVisibleEmployeeIDNumber()).toBe('3999');    
    
    // Scrolling down should not have any effect
    page.scrollToEnd();
    expect<any>(page.getLastVisibleEmployeeIDNumber()).toBe('3999');
    
    // Click on LOAD MORE button again
    page.loadMoreButton.click();
    page.scrollToEnd();
    expect<any>(page.getLastVisibleEmployeeIDNumber()).toBe('5999');
    
  });
 
  it('should display the LOAD MORE button when appropriate', () => {
    
    // Button visible when loadOnScroll is unchecked
    page.clickOnCustomizeExamplePanel();
    page.clickOnLoadOnScroll();
    expect(page.confirmLoadMoreIsVisible()).toBeTruthy();

    // Button not visible when loadOnScroll is checked
    page.clickOnLoadOnScroll();
    expect(page.confirmLoadMoreIsVisible()).toBeFalsy();

    // Button visible when not all employees are on the list
    page.clickOnLoadOnScroll();    
    for (var i = 0; i < 9; i++) {
        page.scrollToEnd();
        expect(page.confirmLoadMoreIsVisible()).toBeTruthy();
        page.loadMoreButton.click();
    }    
    page.scrollToEnd();
    expect<any>(page.getLastVisibleEmployeeIDNumber()).toBe('19999');    
    expect(page.confirmLoadMoreIsVisible()).toBeTruthy();

    // Button not visible when all employees are on the list
    page.loadMoreButton.click();
    page.scrollToEnd();
    expect<any>(page.getLastVisibleEmployeeIDNumber()).toBe('21999');
    expect(page.confirmLoadMoreIsVisible()).toBeFalsy();    
    
  });
 
  it('should display more employees when scrolling down', () => {
    
    page.scrollToEnd();
    expect<any>(page.getLastVisibleEmployeeIDNumber()).toBe('2000');
    
    page.scrollToEnd();
    expect<any>(page.getLastVisibleEmployeeIDNumber()).toBe('4000');
    
    page.scrollToEnd();
    expect<any>(page.getLastVisibleEmployeeIDNumber()).toBe('6000');
    
  });
});