import { browser, Key } from 'protractor';
import { FacetTypeaheadListPage } from './facet-typeahead-list.po.spec';

describe('FacetTypeaheadListPage Tests', () => {

  let page: FacetTypeaheadListPage;
  let browserName: string;

  beforeEach(() => {
    page = new FacetTypeaheadListPage();
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
    
    expect(page.getNumberOfFacetsInSuggestedList()).toEqual(6);
    expect(page.confirmSuggestedListFacetIsTicked(0)).toBeFalsy();
    
  });
  
  it('should allow addition of facets', () => {
    
    page.getFacetFromSuggestedList(0).click();
    expect(page.confirmSuggestedListFacetIsTicked(0)).toBeTruthy();
    expect(page.getClearAllButton().isPresent()).toBeTruthy();
    expect(page.getNoItemsLabel().isPresent()).toBeFalsy();
    
    page.getFacetFromSuggestedList(3).click();
    expect(page.confirmSuggestedListFacetIsTicked(3)).toBeTruthy();
    page.getFacetFromSuggestedList(5).click();
    expect(page.confirmSuggestedListFacetIsTicked(5)).toBeTruthy();
    expect(page.getNumberOfFacets()).toEqual(3);
    
    expect(page.getFacetName(0)).toMatch('\\w+\\d*\\w*');
    expect(page.getFacetName(1)).toMatch('\\w+\\d*\\w*');
    expect(page.getFacetName(2)).toMatch('\\w+\\d*\\w*');
    
  });
  
  it('should allow deletion of facets one by one', () => {
    
    page.getFacetFromSuggestedList(0).click();
    page.getFacetFromSuggestedList(4).click();
    page.getFacetFromSuggestedList(5).click();
    expect(page.getNumberOfFacets()).toEqual(3);
    
    page.closeFacet(2); 
    expect(page.getNumberOfFacets()).toEqual(2);
    page.closeFacet(0);    
    expect(page.getNumberOfFacets()).toEqual(1);
    page.closeFacet(0);    
    expect(page.getNumberOfFacets()).toEqual(0);
    
    expect(page.confirmSuggestedListFacetIsTicked(0)).toBeFalsy();
    expect(page.confirmSuggestedListFacetIsTicked(4)).toBeFalsy();
    expect(page.confirmSuggestedListFacetIsTicked(5)).toBeFalsy();
    
  });
  
  it('should allow deletion of all facets', () => {
    
    page.getFacetFromSuggestedList(2).click();
    page.getFacetFromSuggestedList(1).click();
    page.getFacetFromSuggestedList(4).click();
    expect(page.getNumberOfFacets()).toEqual(3);
    
    page.getClearAllButton().click();
    expect(page.getNumberOfFacets()).toEqual(0);
    
    expect(page.confirmSuggestedListFacetIsTicked(2)).toBeFalsy();
    expect(page.confirmSuggestedListFacetIsTicked(1)).toBeFalsy();
    expect(page.confirmSuggestedListFacetIsTicked(4)).toBeFalsy();
    
  });
  
  it('should allow entry of typeahead text', () => {
    
    page.addTextToTypeaheadInput('t');
    page.getFacetFromDropdownList(1).click();
    expect(page.getNumberOfFacets()).toEqual(1);
    
    browser.sleep(10000);
    
  });
});