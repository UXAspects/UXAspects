import { FacetTypeaheadListPage } from './facet-typeahead-list.po.spec';

describe('FacetTypeaheadListPage Tests', () => {

  let page: FacetTypeaheadListPage;

  beforeEach(() => {
    page = new FacetTypeaheadListPage();
    page.getPage();
  });

  it('should start with no facets', () => {
    
    // No facets should be visible.
    expect<any>(page.getNumberOfFacets()).toEqual(0);
    expect(page.getClearAllButton().isPresent()).toBeFalsy();
    expect(page.getNoItemsLabel().isPresent()).toBeTruthy();
    
    // No checkboxes should be checked.
    expect<any>(page.getNumberOfFacetsInSuggestedList()).toEqual(6);
    expect(page.confirmSuggestedListFacetIsTicked(0)).toBeFalsy();
    expect(page.confirmSuggestedListFacetIsTicked(1)).toBeFalsy();
    expect(page.confirmSuggestedListFacetIsTicked(2)).toBeFalsy();
    expect(page.confirmSuggestedListFacetIsTicked(3)).toBeFalsy();
    expect(page.confirmSuggestedListFacetIsTicked(4)).toBeFalsy();
    expect(page.confirmSuggestedListFacetIsTicked(5)).toBeFalsy();
    
  });
  
  it('should allow addition of facets', () => {
    
    // Check checkboxes, confirming that the corresponding facets are created.
    page.getFacetFromSuggestedList(0).click();
    expect(page.getClearAllButton().isPresent()).toBeTruthy();
    expect(page.getNoItemsLabel().isPresent()).toBeFalsy();
    
    expect(page.confirmSuggestedListFacetIsTicked(0)).toBeTruthy();
    expect(page.getFacetName(0)).toEqual(page.getFacetNameFromSuggestedList(0));
    
    page.getFacetFromSuggestedList(3).click();
    expect(page.confirmSuggestedListFacetIsTicked(3)).toBeTruthy();
    expect(page.getFacetName(1)).toEqual(page.getFacetNameFromSuggestedList(3));
    
    page.getFacetFromSuggestedList(5).click();
    expect(page.confirmSuggestedListFacetIsTicked(5)).toBeTruthy();
    expect(page.getFacetName(2)).toEqual(page.getFacetNameFromSuggestedList(5));
    
    expect<any>(page.getNumberOfFacets()).toEqual(3);
    
  });
  
  it('should allow deletion of facets one by one', () => {
    
    // Create some facets.
    page.getFacetFromSuggestedList(0).click();
    page.getFacetFromSuggestedList(4).click();
    page.getFacetFromSuggestedList(5).click();
    expect<any>(page.getNumberOfFacets()).toEqual(3);
    
    // Close the facets and then confirm that the corresponding checkboxes are unchecked.
    page.closeFacet(2); 
    expect<any>(page.getNumberOfFacets()).toEqual(2);
    page.closeFacet(0);    
    expect<any>(page.getNumberOfFacets()).toEqual(1);
    page.closeFacet(0);    
    expect<any>(page.getNumberOfFacets()).toEqual(0);
    
    expect(page.confirmSuggestedListFacetIsTicked(0)).toBeFalsy();
    expect(page.confirmSuggestedListFacetIsTicked(4)).toBeFalsy();
    expect(page.confirmSuggestedListFacetIsTicked(5)).toBeFalsy();
    
  });
  
  it('should allow deletion of all facets', () => {
    
    // Create some facets.
    page.getFacetFromSuggestedList(2).click();
    page.getFacetFromSuggestedList(1).click();
    page.getFacetFromSuggestedList(4).click();
    expect<any>(page.getNumberOfFacets()).toEqual(3);
    
    // Close all the facets and then confirm that the corresponding checkboxes are unchecked.
    page.getClearAllButton().click();
    expect<any>(page.getNumberOfFacets()).toEqual(0);
    
    expect(page.confirmSuggestedListFacetIsTicked(2)).toBeFalsy();
    expect(page.confirmSuggestedListFacetIsTicked(1)).toBeFalsy();
    expect(page.confirmSuggestedListFacetIsTicked(4)).toBeFalsy();
    
  });
  
  it('should allow entry of typeahead text', () => {
    
    // Enter text in the typeahead box, select the first item in the list and confirm that a facet is created.
    page.addTextToTypeaheadInput('t');
    page.getFacetFromDropdownList(1).click();
    expect<any>(page.getNumberOfFacets()).toEqual(1);
    
  });
});