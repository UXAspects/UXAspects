import { CustomFacetPage } from './custom-facet.po.spec';

describe('Custom Facet Tests', () => {

  let page: CustomFacetPage;

  beforeEach(() => {
    page = new CustomFacetPage();
    page.getPage();
  });

  it('should start with no facets', () => {
    
    expect<any>(page.getNumberOfFacets()).toEqual(0);
    expect(page.getClearAllButton().isPresent()).toBeFalsy();
    expect(page.getNoItemsLabel().isPresent()).toBeTruthy();
    expect(page.confirmIsChecked(0)).toBeFalsy();
    expect(page.confirmIsChecked(1)).toBeFalsy();
    expect(page.confirmIsChecked(2)).toBeFalsy();
    
  });
  
  it('should allow addition of facets', () => {
    
    // Add first facet
    page.getCheckbox(0).click();
    expect(page.getClearAllButton().isPresent()).toBeTruthy();
    expect(page.getNoItemsLabel().isPresent()).toBeFalsy();
    
    // Add the others
    page.getCheckbox(1).click();
    page.getCheckbox(2).click();
    expect<any>(page.getNumberOfFacets()).toEqual(3);
    
    // Confirm facets are visible and checkboxes are checked
    expect(page.getFacetName(0)).toMatch('Components');
    expect(page.getFacetName(1)).toMatch('Charts');
    expect(page.getFacetName(2)).toMatch('CSS');
    expect(page.confirmIsChecked(0)).toBeTruthy();
    expect(page.confirmIsChecked(1)).toBeTruthy();
    expect(page.confirmIsChecked(2)).toBeTruthy();
    
  });
  
  it('should allow deletion of facets one by one by clicking on the facets', () => {
    
    // Add all the facets
    page.getCheckbox(0).click();
    page.getCheckbox(1).click();
    page.getCheckbox(2).click();
    expect<any>(page.getNumberOfFacets()).toEqual(3);    
    expect(page.confirmIsChecked(0)).toBeTruthy();
    expect(page.confirmIsChecked(1)).toBeTruthy();
    expect(page.confirmIsChecked(2)).toBeTruthy();
    
    // Close a couple of facets, testing the number displayed
    page.closeFacet(2);    
    expect<any>(page.getNumberOfFacets()).toEqual(2);
    page.closeFacet(0);    
    expect<any>(page.getNumberOfFacets()).toEqual(1);
    
    // Confirm the checkbox for the remaining facet is checked
    expect(page.confirmIsChecked(0)).toBeFalsy();
    expect(page.confirmIsChecked(1)).toBeTruthy();
    expect(page.confirmIsChecked(2)).toBeFalsy();
    
  });
  
  it('should allow deletion of facets one by one by clicking on the checkboxes', () => {
    
    // Add all the facets
    page.getCheckbox(2).click();
    page.getCheckbox(1).click();
    page.getCheckbox(0).click();
    expect<any>(page.getNumberOfFacets()).toEqual(3);
    expect(page.getFacetName(0)).toMatch('CSS');
    expect(page.getFacetName(1)).toMatch('Charts');
    expect(page.getFacetName(2)).toMatch('Components');    
    
    // Close the facets by clicking the corresponding checkboxes, testing those still displayed
    page.getCheckbox(1).click();    
    expect<any>(page.getNumberOfFacets()).toEqual(2);
    expect(page.getFacetName(0)).toMatch('CSS');
    expect(page.getFacetName(1)).toMatch('Components');
    page.getCheckbox(0).click();    
    expect<any>(page.getNumberOfFacets()).toEqual(1);
    expect(page.getFacetName(0)).toMatch('CSS');
    page.getCheckbox(2).click();    
    expect<any>(page.getNumberOfFacets()).toEqual(0);
    
    // Confirm all the checkboxes are unchecked
    expect(page.confirmIsChecked(0)).toBeFalsy();
    expect(page.confirmIsChecked(1)).toBeFalsy();
    expect(page.confirmIsChecked(2)).toBeFalsy();
  });
  
  it('should allow deletion of all facets', () => {
    
    // Add all the facets
    page.getCheckbox(0).click();
    page.getCheckbox(1).click();
    page.getCheckbox(2).click();
    expect<any>(page.getNumberOfFacets()).toEqual(3);
    
    // Remove all the facets by clicking on the Clear All button
    page.getClearAllButton().click();
    expect<any>(page.getNumberOfFacets()).toEqual(0);
    expect(page.getClearAllButton().isPresent()).toBeFalsy();
    expect(page.getNoItemsLabel().isPresent()).toBeTruthy();
    
    // Confirm all the checkboxes are unchecked
    expect(page.confirmIsChecked(0)).toBeFalsy();
    expect(page.confirmIsChecked(1)).toBeFalsy();
    expect(page.confirmIsChecked(2)).toBeFalsy();
  });
});