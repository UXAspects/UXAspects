import { browser, Key } from 'protractor';
import { FacetContainerPage } from './facet-container.po.spec';

describe('FacetContainerPage Tests', () => {

  let page: FacetContainerPage;
  let browserName: string;

  beforeEach(() => {
    page = new FacetContainerPage();
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
    
  });
  
  it('should allow addition of facets', () => {
    
    page.addFacet.click();
    expect(page.getClearAllButton().isPresent()).toBeTruthy();
    expect(page.getNoItemsLabel().isPresent()).toBeFalsy();
    
    page.addFacet.click();
    page.addFacet.click();
    expect(page.getNumberOfFacets()).toEqual(3);
    
    expect(page.getFacetName(0)).toMatch('\\w+\\d*\\w*');
    expect(page.getFacetName(1)).toMatch('\\w+\\d*\\w*');
    expect(page.getFacetName(2)).toMatch('\\w+\\d*\\w*');
    
  });
  
  it('should allow deletion of facets one by one', () => {
    
    page.addFacet.click();
    page.addFacet.click();
    page.addFacet.click();
    expect(page.getNumberOfFacets()).toEqual(3);
    
    page.closeFacet(2);    
    expect(page.getNumberOfFacets()).toEqual(2);
    page.closeFacet(0);    
    expect(page.getNumberOfFacets()).toEqual(1);
    
  });
  
  it('should allow deletion of all facets', () => {
    
    page.addFacet.click();
    page.addFacet.click();
    page.addFacet.click();
    expect(page.getNumberOfFacets()).toEqual(3);
    
    page.getClearAllButton().click();
    expect(page.getNumberOfFacets()).toEqual(0);
    
  });
});