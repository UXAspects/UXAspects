import { browser, element, by } from 'protractor';

export class FacetContainerPage {
        
    getPage(): void {
        browser.get('/facet-container');
    }
    
    titleText = browser.getTitle();
    
    container = element(by.id('container1'));
    addFacet = element(by.id('button1'));
    
    getNumberOfFacets = function() {
        return this.container.$('div.facets-selected-container').$('div.facets-selected-list').$$('div.facet-selected-tag').count();
    };
    
    getClearAllButton = function() {
        return this.container.$('div.facets-selected-container').$('div.facets-selected-header-container').$('div.facets-selected-clear-button');
    };
    
    getFacet = function(index: number) {
        return this.container.$('div.facets-selected-container').$('div.facets-selected-list').$$('div.facet-selected-tag').get(index);
    };
    
    getFacetName = function(index: number) {
        return this.container.$('div.facets-selected-container').$('div.facets-selected-list').$$('div.facet-selected-tag').get(index).$('span.facet-selected-tag-label').getText();
    };
    
    closeFacet = function(index: number) {
        this.container.$('div.facets-selected-container').$('div.facets-selected-list').$$('div.facet-selected-tag').get(index).$('span.hpe-close').click();
    };
    
    getNoItemsLabel = function() {
        return this.container.$('div.facets-selected-container').$('p.facets-selected-none-label');
    };    
}
