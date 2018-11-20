import { Key } from 'protractor';
import { FiltersPage } from './filters.po.spec';

describe('Filters Tests', () => {

  let page: FiltersPage;

  beforeEach(() => {
    page = new FiltersPage();
    page.getPage();
  });
 
  it('should have correct initial states', () => {
    
    // menus not expanded
    expect(page.confirmAuthorMenuIsExpanded()).toBeFalsy();
    expect(page.confirmStatusMenuIsExpanded()).toBeFalsy();
    
    // clear all not visible
    expect(page.confirmClearAllIsVisible()).toBeFalsy();
    
    // default authors and status
    expect(page.confirmAuthorsAreFiltered()).toBeFalsy();
    expect(page.confirmStatusIsFiltered()).toBeFalsy();
    
    // 8 items visible
    expect<any>(page.getNumberOfItems()).toEqual(8);
    
  });

  it('should display correct text', () => {
    
    // Author menu
    page.clickOnAuthorMenu();
    expect<any>(page.getAuthorMenuItemText(0)).toBe('Author (All)');
    expect<any>(page.getPlaceholderText()).toBe('Find Author');
    
    // Status menu
    page.clickOnStatusMenu();
    expect<any>(page.getStatusMenuItemText(0)).toBe('Status (All)');
    expect<any>(page.getStatusMenuItemText(1)).toBe('Active');
    expect<any>(page.getStatusMenuItemText(2)).toBe('Inactive');
    
    // titles
    expect<any>(page.getTitleText(0)).toBe('NAME');
    expect<any>(page.getTitleText(1)).toBe('AUTHOR');
    expect<any>(page.getTitleText(2)).toBe('DATE MODIFIED');
    expect<any>(page.getTitleText(3)).toBe('WORK COMPLETED');
    expect<any>(page.getTitleText(4)).toBe('STATUS');
    
    // items
    expect<any>(page.getItemText(0, 1)).toBe('Document');
    expect<any>(page.getItemText(0, 2)).toBe('Lily Clarke');
    expect<any>(page.getItemText(0, 3)).toBe('18 Dec 2016');
    expect<any>(page.getPercentageOfWorkCompleted(0)).toBe('97');
    expect<any>(page.getItemText(1, 1)).toBe('Email');
    expect<any>(page.getItemText(1, 2)).toBe('Jesse Bass');
    expect<any>(page.getItemText(1, 3)).toBe('22 Dec 2016');
    expect<any>(page.getPercentageOfWorkCompleted(1)).toBe('15');
    expect<any>(page.getItemText(2, 1)).toBe('Email');
    expect<any>(page.getItemText(2, 2)).toBe('Iva Rogers');
    expect<any>(page.getItemText(2, 3)).toBe('12 Dec 2016');
    expect<any>(page.getPercentageOfWorkCompleted(2)).toBe('20');
    expect<any>(page.getItemText(3, 1)).toBe('Email');
    expect<any>(page.getItemText(3, 2)).toBe('Nina Copeland');
    expect<any>(page.getItemText(3, 3)).toBe('16 Dec 2016');
    expect<any>(page.getPercentageOfWorkCompleted(3)).toBe('74');
    expect<any>(page.getItemText(4, 1)).toBe('Email');
    expect<any>(page.getItemText(4, 2)).toBe('Bradley Mason');
    expect<any>(page.getItemText(4, 3)).toBe('17 Dec 2016');
    expect<any>(page.getPercentageOfWorkCompleted(4)).toBe('63');
    expect<any>(page.getItemText(5, 1)).toBe('Document');
    expect<any>(page.getItemText(5, 2)).toBe('Aaron Scott');
    expect<any>(page.getItemText(5, 3)).toBe('21 Dec 2016');
    expect<any>(page.getPercentageOfWorkCompleted(5)).toBe('21');
    expect<any>(page.getItemText(6, 1)).toBe('Document');
    expect<any>(page.getItemText(6, 2)).toBe('Lily Clarke');
    expect<any>(page.getItemText(6, 3)).toBe('17 Dec 2016');
    expect<any>(page.getPercentageOfWorkCompleted(6)).toBe('85');
    expect<any>(page.getItemText(7, 1)).toBe('Document');
    expect<any>(page.getItemText(7, 2)).toBe('Lily Clarke');
    expect<any>(page.getItemText(7, 3)).toBe('17 Dec 2016');
    expect<any>(page.getPercentageOfWorkCompleted(7)).toBe('11');
    
  });

  it('should expand menu on click', () => {
    
    page.clickOnAuthorMenu();
    expect(page.confirmAuthorMenuIsExpanded()).toBeTruthy();
    
    page.clickOnStatusMenu();
    expect(page.confirmStatusMenuIsExpanded()).toBeTruthy();
    
  });

  it('should react to selecting an author from the author menu', () => {
    
    // select author using filter + clicking
    page.clickOnAuthorMenu();
    page.clickOnFilter();
    page.getFilter().sendKeys('j');    
    page.clickOnFilterItem(0);
    
    expect(page.confirmAuthorMenuIsExpanded()).toBeFalsy();
    expect(page.confirmAuthorsAreFiltered()).toBeTruthy();
    expect<any>(page.getNumberOfItems()).toEqual(1);
    expect<any>(page.getItemText(0, 2)).toBe('Jesse Bass');
    page.clickOnAuthorMenu();
    expect<any>(page.getAuthorMenuItemText(1)).toBe('Jesse Bass');
    
    
    // select author using filter + enter key
    page.clickOnFilter();
    page.getFilter().sendKeys('u');
    page.getFilter().sendKeys(Key.ENTER);
    
    expect(page.confirmAuthorMenuIsExpanded()).toBeFalsy();
    expect(page.confirmAuthorsAreFiltered()).toBeTruthy();
    expect<any>(page.getNumberOfItems()).toEqual(0);
    page.clickOnAuthorMenu();
    expect<any>(page.getAuthorMenuItemText(1)).toBe('Lois Saunders');
    
    page.clickOnFilter();
    page.getFilter().sendKeys('ar');
    page.getFilter().sendKeys(Key.ARROW_DOWN);
    page.getFilter().sendKeys(Key.ENTER);
    
    expect(page.confirmAuthorMenuIsExpanded()).toBeFalsy();
    expect(page.confirmAuthorsAreFiltered()).toBeTruthy();
    expect<any>(page.getNumberOfItems()).toEqual(1);
    page.clickOnAuthorMenu();
    expect<any>(page.getAuthorMenuItemText(1)).toBe('Aaron Scott');
    
    
    // choose Author (All) from Author menu
    page.clickOnAuthorMenuItem(0);
    
    expect(page.confirmAuthorMenuIsExpanded()).toBeFalsy();
    expect(page.confirmAuthorsAreFiltered()).toBeFalsy();
    expect<any>(page.getNumberOfItems()).toEqual(8);
    
  });

  it('should react to selecting an item in the status menu', () => {
    
    // choose Active from Status menu
    page.clickOnStatusMenu();
    page.clickOnStatusMenuItem(1);
    
    expect(page.confirmStatusMenuIsExpanded()).toBeFalsy();
    expect(page.confirmStatusIsFiltered()).toBeTruthy();
    expect(page.confirmItemStatus(0)).toBeTruthy();
    expect<any>(page.getNumberOfItems()).toEqual(6);
    expect<any>(page.getItemText(3, 2)).toBe('Aaron Scott');
    
    
    // choose Status (All) from Status menu
    page.clickOnStatusMenu();
    page.clickOnStatusMenuItem(0);    
    expect(page.confirmStatusMenuIsExpanded()).toBeFalsy();
    expect(page.confirmStatusIsFiltered()).toBeFalsy();
    expect<any>(page.getNumberOfItems()).toEqual(8);
    expect<any>(page.getItemText(6, 2)).toBe('Lily Clarke');
    
    
    // choose Inactive from Status menu
    page.clickOnStatusMenu();
    page.clickOnStatusMenuItem(2);
    
    expect(page.confirmStatusMenuIsExpanded()).toBeFalsy();
    expect(page.confirmStatusIsFiltered()).toBeTruthy();
    expect(page.confirmItemStatus(0)).toBeFalsy();
    expect<any>(page.getNumberOfItems()).toEqual(2);
    expect<any>(page.getItemText(1, 2)).toBe('Bradley Mason');
    
  });

  it('should react to pressing clear all', () => {
    
    // choose Active from Status menu
    page.clickOnStatusMenu();
    page.clickOnStatusMenuItem(1);
    expect(page.confirmAuthorsAreFiltered()).toBeFalsy();
    expect(page.confirmStatusIsFiltered()).toBeTruthy();
    expect(page.confirmClearAllIsVisible()).toBeTruthy();
    
    // click on Clear All icon
    page.clickOnClearAll();
    expect(page.confirmAuthorsAreFiltered()).toBeFalsy();
    expect(page.confirmStatusIsFiltered()).toBeFalsy();
    expect(page.confirmClearAllIsVisible()).toBeFalsy();
    
    // choose Inactive from Status menu
    page.clickOnStatusMenu();
    page.clickOnStatusMenuItem(2);
    expect(page.confirmAuthorsAreFiltered()).toBeFalsy();
    expect(page.confirmStatusIsFiltered()).toBeTruthy();
    expect(page.confirmClearAllIsVisible()).toBeTruthy();
    
    // select author using filter
    page.clickOnAuthorMenu();
    page.clickOnFilter();
    page.getFilter().sendKeys('g');
    page.clickOnFilterItem(0);
    expect(page.confirmAuthorsAreFiltered()).toBeTruthy();
    expect(page.confirmStatusIsFiltered()).toBeTruthy();
    expect(page.confirmClearAllIsVisible()).toBeTruthy();
    
    // click on Clear All icon
    page.clickOnClearAll();
    expect(page.confirmAuthorsAreFiltered()).toBeFalsy();
    expect(page.confirmStatusIsFiltered()).toBeFalsy();
    expect(page.confirmClearAllIsVisible()).toBeFalsy();
    expect<any>(page.getNumberOfItems()).toEqual(8);
    
  });

  it('should react to filtering by author', () => {
    
    // no match
    page.clickOnAuthorMenu();
    page.clickOnFilter();
    page.getFilter().sendKeys('x');
    expect<any>(page.getNumberOfFilterItems()).toEqual(0);
    
    // upper case
    page.getFilter().clear();
    page.getFilter().sendKeys('H');
    expect<any>(page.getNumberOfFilterItems()).toEqual(1);
    expect<any>(page.getFilterItemText(0)).toBe('Ethel Collier');
    
    // exact characters
    page.getFilter().clear();
    page.getFilter().sendKeys('as');
    expect<any>(page.getNumberOfFilterItems()).toEqual(2);
    expect<any>(page.getFilterItemText(0)).toBe('Jesse Bass');
    expect<any>(page.getFilterItemText(1)).toBe('Bradley Mason');
    
    // individual characters
    page.getFilter().clear();
    page.getFilter().sendKeys('a s');
    expect<any>(page.getNumberOfFilterItems()).toEqual(5);
    expect<any>(page.getFilterItemText(0)).toBe('Jesse Bass');
    expect<any>(page.getFilterItemText(1)).toBe('Iva Rogers');
    expect<any>(page.getFilterItemText(2)).toBe('Bradley Mason');
    expect<any>(page.getFilterItemText(3)).toBe('Aaron Scott');
    expect<any>(page.getFilterItemText(4)).toBe('Lois Saunders');
    
    // confirm style of filtered characters
    page.getFilter().clear();
    page.getFilter().sendKeys('ro');
    expect<any>(page.getFilterText(0)).toBe('Ro');
    expect<any>(page.getFilterText(1)).toBe('ro');
    
  });

  it('should highlight an author in the authors menu when it is hovered over', () => {
    
    // default highlighted item
    page.clickOnAuthorMenu();
    page.clickOnFilter();
    page.getFilter().sendKeys('d');
    expect(page.confirmFilterItemIsHighlighted(0)).toBeTruthy();
    expect(page.confirmFilterItemIsHighlighted(1)).toBeFalsy();
    expect(page.confirmFilterItemIsHighlighted(2)).toBeFalsy();
    
    // hover over author
    page.hoverOverFilterItem(1);
    expect(page.confirmFilterItemIsHighlighted(0)).toBeFalsy();
    expect(page.confirmFilterItemIsHighlighted(1)).toBeTruthy();
    expect(page.confirmFilterItemIsHighlighted(2)).toBeFalsy();
    
    // press arrow down
    page.getFilter().sendKeys(Key.ARROW_DOWN);
    expect(page.confirmFilterItemIsHighlighted(0)).toBeFalsy();
    expect(page.confirmFilterItemIsHighlighted(1)).toBeFalsy();
    expect(page.confirmFilterItemIsHighlighted(2)).toBeTruthy();
    
  });

  it('should display a check next to a selected menu item', () => {
    
    // author menu
    page.clickOnAuthorMenu();
    expect(page.confirmAuthorMenuItemCheckExists(0)).toBeTruthy();
    
    page.clickOnFilter();
    page.getFilter().sendKeys('n');
    page.getFilter().sendKeys(Key.ENTER);
    page.clickOnAuthorMenu();
    expect(page.confirmAuthorMenuItemCheckExists(0)).toBeFalsy();
    expect(page.confirmAuthorMenuItemCheckExists(1)).toBeTruthy();
    
    
    // status menu
    page.clickOnStatusMenu();
    expect(page.confirmStatusMenuItemCheckExists(0)).toBeTruthy();
    expect(page.confirmStatusMenuItemCheckExists(1)).toBeFalsy();
    expect(page.confirmStatusMenuItemCheckExists(2)).toBeFalsy();
    
    page.clickOnStatusMenuItem(1);
    expect(page.confirmStatusMenuItemCheckExists(0)).toBeFalsy();
    expect(page.confirmStatusMenuItemCheckExists(1)).toBeTruthy();
    expect(page.confirmStatusMenuItemCheckExists(2)).toBeFalsy();
    
    page.clickOnStatusMenu();
    page.clickOnStatusMenuItem(2);
    expect(page.confirmStatusMenuItemCheckExists(0)).toBeFalsy();
    expect(page.confirmStatusMenuItemCheckExists(1)).toBeFalsy();
    expect(page.confirmStatusMenuItemCheckExists(2)).toBeTruthy();
    
  });
});