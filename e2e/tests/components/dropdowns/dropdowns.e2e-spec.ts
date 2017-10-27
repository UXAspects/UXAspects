import { browser, Key } from 'protractor';
import { DropdownsPage } from './dropdowns.po.spec';

describe('Dropdown Tests', () => {

  let page: DropdownsPage;
  let browserName: string;

  beforeEach(() => {
    page = new DropdownsPage();
    page.getPage();
    
    browser.getCapabilities().then(function(caps) {
        browserName = caps.get('browserName');
    });
  });

  it('should have correct initial states', () => {
  
    expect(page.confirmButtonIsExpanded(page.group)).toBeFalsy();
    expect(page.menu1.isPresent()).toBeFalsy();
    expect(page.menu2.isPresent()).toBeFalsy();
    expect(page.menu3.isPresent()).toBeFalsy();

  });

  it('should expand menu on click', () => {
  
    page.button1.click();
    expect(page.confirmButtonIsExpanded(page.group)).toBeTruthy();
    expect(page.menu1.isDisplayed()).toBeTruthy();
    expect(page.menu2.isDisplayed()).toBeFalsy();
    expect(page.menu3.isDisplayed()).toBeFalsy();
    
  });

  it('should expand submenus on hover', () => {

    page.button1.click();
    expect(page.menu1.isDisplayed()).toBeTruthy();
    
    page.hoverMenu1Item(0);
    expect(page.menu2.isDisplayed()).toBeTruthy();
    
    page.hoverMenu1Item(2);
    expect(page.menu3.isDisplayed()).toBeTruthy();
    
  });

  it('should react to clicks', () => {

    page.button1.click();
    page.clickMenu1Item(0);
    expect(page.menu1.isDisplayed()).toBeFalsy();
    expect(page.menu2.isDisplayed()).toBeFalsy();
    expect(page.menu3.isDisplayed()).toBeFalsy();
    
    page.button1.click();
    page.hoverMenu1Item(0);
    page.clickMenu2Item(2);
    expect(page.menu1.isDisplayed()).toBeFalsy();
    expect(page.menu2.isDisplayed()).toBeFalsy();
    expect(page.menu3.isDisplayed()).toBeFalsy();

    page.button1.click();
    page.hoverMenu1Item(2);
    page.clickMenu3Item(3);
    expect(page.menu1.isDisplayed()).toBeFalsy();
    expect(page.menu2.isDisplayed()).toBeFalsy();
    expect(page.menu3.isDisplayed()).toBeFalsy();

  });

  it('should show correct text', () => {
  
    expect<any>(page.button1.getText()).toBe('ACTIONS');
    page.button1.click();
    
    expect<any>(page.getMenu1Text(0)).toBe('Mark as');
    expect<any>(page.getMenu1Text(1)).toBe('Export');
    expect<any>(page.getMenu1Text(2)).toBe('Add to case');
    expect<any>(page.getMenu1Text(3)).toBe('Save list');
    expect<any>(page.getMenu1Text(4)).toBe('Save search query');
    expect<any>(page.getMenu1Text(5)).toBe('Annotate');
    
    page.hoverMenu1Item(0);
    expect<any>(page.getMenu2Text(0)).toBe('Pending');
    expect<any>(page.getMenu2Text(1)).toBe('Escalated');
    expect<any>(page.getMenu2Text(2)).toBe('Closed');
    
    page.hoverMenu1Item(2);
    expect<any>(page.getMenu3Text(0)).toBe('Alpha');
    expect<any>(page.getMenu3Text(1)).toBe('Beta');
    expect<any>(page.getMenu3Text(2)).toBe('Gamma');
    expect<any>(page.getMenu3Text(3)).toBe('Delta');
    expect<any>(page.getMenu3Text(4)).toBe('Epsilon');
    expect<any>(page.getMenu3Text(5)).toBe('Zeta');
    expect<any>(page.getMenu3Text(6)).toBe('Eta');
    expect<any>(page.getMenu3Text(7)).toBe('Theta');
    expect<any>(page.getMenu3Text(8)).toBe('Iota');
    expect<any>(page.getMenu3Text(9)).toBe('Kappa');
    expect<any>(page.getMenu3Text(10)).toBe('Alpha 2');
    expect<any>(page.getMenu3Text(11)).toBe('Alpha 3');
  });

  it('should be possible to filter list items using entered text', () => {
  
    page.button1.click();
    page.hoverMenu1Item(2);
    page.clickTextBox(1);
    
    page.getTextBox(1).sendKeys('al');
    expect<any>(page.getListContent(0)).toBe('Alpha');
    expect<any>(page.getListContent(1)).toBe('Alpha 2');
    expect<any>(page.getListContent(2)).toBe('Alpha 3');

    page.getTextBox(1).clear();
    page.getTextBox(1).sendKeys('alpha ');
    expect<any>(page.getListContent(0)).toBe('Alpha 2');
    expect<any>(page.getListContent(1)).toBe('Alpha 3');

  });
});
