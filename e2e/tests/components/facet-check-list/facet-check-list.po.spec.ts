import { browser, element, by } from 'protractor';

export class FacetCheckListPage {
        
    getPage(): void {
        browser.get('/facet-check-list');
    }
    
    titleText = browser.getTitle();
    
    container = element(by.id('container1'));
    
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
    
    getNumberOfFacetsInCheckList = function() {
        return this.container.$('div.facets-region').$('ux-facet-check-list').$('div.facet-check-list-container').$$('div.facet-check-list-item').count();
    };
    
    getFacetFromCheckList = function(index: number) {
        return this.container.$('div.facets-region').$('ux-facet-check-list').$('div.facet-check-list-container').$$('div.facet-check-list-item').get(index);
    };
    
    confirmCheckListFacetIsTicked = function(index: number) {
        return this.container.$('div.facets-region').$('ux-facet-check-list').$('div.facet-check-list-container').$$('div.facet-check-list-item').get(index).
            getAttribute('class').then(function(classes: any){
                var allClasses = classes.split(' ');
                if (allClasses.indexOf('facet-active') > -1) {
                    return true;
                } else {
                    return false;
                }
            });
    };
    
    confirmCheckListScrollbarExists = function() {
        return this.container.$('div.facets-region').$('ux-facet-check-list').$('div.facet-check-list-container').getAttribute('facet-check-list-scrollbar').isPresent();
    };    
}
