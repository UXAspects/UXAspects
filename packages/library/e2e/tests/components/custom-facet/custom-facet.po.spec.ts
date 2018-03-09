import { browser, element, by } from 'protractor';

export class CustomFacetPage {
        
    getPage(): void {
        browser.get('#/custom-facet');
    }
    
    container = element(by.id('customFacetContainer'));
    checkboxContainer = element(by.id('facetCheckboxContainer'));
    
    getNumberOfFacets() {
        return this.container.$('div.facets-selected-container').$('div.facets-selected-list').$$('div.facet-selected-tag').count();
    }
    
    getClearAllButton() {
        return this.container.$('div.facets-selected-container').$('div.facets-selected-header-container').$('div.facets-selected-clear-button');
    }
    
    getFacet(index: number) {
        return this.container.$('div.facets-selected-container').$('div.facets-selected-list').$$('div.facet-selected-tag').get(index);
    }
    
    getFacetName(index: number) {
        return this.container.$('div.facets-selected-container').$('div.facets-selected-list').$$('div.facet-selected-tag').get(index).$('span.facet-selected-tag-label').getText();
    }
    
    closeFacet(index: number) {
        this.container.$('div.facets-selected-container').$('div.facets-selected-list').$$('div.facet-selected-tag').get(index).$('span.hpe-close').click();
    }
    
    getNoItemsLabel() {
        return this.container.$('div.facets-selected-container').$('p.facets-selected-none-label');
    }
    
    getCheckbox(index: number) {
        return this.checkboxContainer.$$('ux-checkbox').get(index).$('div.ux-checkbox');
    }
    
    confirmIsChecked(index: number) {    
        return this.checkboxContainer.$$('ux-checkbox').get(index).$('div.ux-checked').isPresent();
    }    
}
