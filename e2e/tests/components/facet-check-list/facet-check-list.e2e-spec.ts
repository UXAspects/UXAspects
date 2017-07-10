import { browser, Key } from 'protractor';
import { FacetCheckListPage } from './facet-check-list.po.spec';

describe('FacetCheckListPage Tests', () => {

  let page: FacetCheckListPage;
  let browserName: string;

  beforeEach(() => {
    page = new FacetCheckListPage();
    page.getPage();
    
    browser.getCapabilities().then(function(caps) {
        browserName = caps.get('browserName');
    });
  });

  it('should have the correct tab title', () => {
    let expectedTitle = 'UX Aspects E2E Tests';
    expect<any>(page.titleText).toEqual(expectedTitle);
  });

  it('should start with no facets', () => {
    
    expect(page.getNumberOfFacets()).toEqual(0);
    expect(page.getClearAllButton().isPresent()).toBeFalsy();
    expect(page.getNoItemsLabel().isPresent()).toBeTruthy();
    
    expect(page.getNumberOfFacetsInCheckList()).toEqual(30);
    expect(page.confirmCheckListScrollbarExists()).toBeTruthy();
    expect(page.confirmCheckListFacetIsTicked(0)).toBeFalsy();
    
  });
  
  it('should allow addition of facets', () => {
    
    page.getFacetFromCheckList(3).click();
    expect(page.confirmCheckListFacetIsTicked(3)).toBeTruthy();
    expect(page.getClearAllButton().isPresent()).toBeTruthy();
    expect(page.getNoItemsLabel().isPresent()).toBeFalsy();
    
    page.getFacetFromCheckList(13).click();
    expect(page.confirmCheckListFacetIsTicked(13)).toBeTruthy();
    page.getFacetFromCheckList(23).click();
    expect(page.confirmCheckListFacetIsTicked(23)).toBeTruthy();
    expect(page.getNumberOfFacets()).toEqual(3);
    expect(page.getNumberOfFacetsInCheckList()).toEqual(30);
    
    expect(page.getFacetName(0)).toMatch('\\w+\\d*\\w*');
    expect(page.getFacetName(1)).toMatch('\\w+\\d*\\w*');
    expect(page.getFacetName(2)).toMatch('\\w+\\d*\\w*');
    
  });
  
  it('should allow deletion of facets one by one', () => {
    
    page.getFacetFromCheckList(0).click();
    page.getFacetFromCheckList(15).click();
    page.getFacetFromCheckList(29).click();
    expect(page.getNumberOfFacets()).toEqual(3);
    
    page.closeFacet(2); 
    expect(page.getNumberOfFacets()).toEqual(2);
    page.closeFacet(0);    
    expect(page.getNumberOfFacets()).toEqual(1);
    page.closeFacet(0);    
    expect(page.getNumberOfFacets()).toEqual(0);
    
    expect(page.confirmCheckListFacetIsTicked(0)).toBeFalsy();
    expect(page.confirmCheckListFacetIsTicked(15)).toBeFalsy();
    expect(page.confirmCheckListFacetIsTicked(29)).toBeFalsy();
    
  });
  
  it('should allow deletion of all facets', () => {
    
    page.getFacetFromCheckList(23).click();
    page.getFacetFromCheckList(1).click();
    page.getFacetFromCheckList(9).click();
    expect(page.getNumberOfFacets()).toEqual(3);
    
    page.getClearAllButton().click();
    expect(page.getNumberOfFacets()).toEqual(0);
    
    expect(page.confirmCheckListFacetIsTicked(23)).toBeFalsy();
    expect(page.confirmCheckListFacetIsTicked(1)).toBeFalsy();
    expect(page.confirmCheckListFacetIsTicked(9)).toBeFalsy();
    
  });
});