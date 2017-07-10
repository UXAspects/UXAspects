import { browser, element, by } from 'protractor';

export class FacetTypeaheadListPage {
        
    getPage(): void {
        browser.get('/facet-typeahead-list');
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
    
    getNumberOfFacetsInSuggestedList = function() {
        return this.container.$('div.facets-region').$('ux-facet-typeahead-list').$('div.facet-typeahead-list-container').
            $('div.facet-typeahead-list-selected-container').$$('div.facet-typeahead-list-selected-option').count();
    };
    
    getFacetFromSuggestedList = function(index: number) {
        return this.container.$('div.facets-region').$('ux-facet-typeahead-list').$('div.facet-typeahead-list-container').
            $('div.facet-typeahead-list-selected-container').$$('div.facet-typeahead-list-selected-option').get(index);
    };
    
    confirmSuggestedListFacetIsTicked = function(index: number) {
        return this.container.$('div.facets-region').$('ux-facet-typeahead-list').$('div.facet-typeahead-list-container').
            $('div.facet-typeahead-list-selected-container').$$('div.facet-typeahead-list-selected-option').get(index).
            $('ux-checkbox').$('div.ux-checkbox').
            getAttribute('class').then(function(classes: any){
                var allClasses = classes.split(' ');
                if (allClasses.indexOf('ux-checked') > -1) {
                    return true;
                } else {
                    return false;
                }
            });
    };
    
    addTextToTypeaheadInput = function(text: string) {
        this.container.$('div.facets-region').$('ux-facet-typeahead-list').$('div.facet-typeahead-list-container').
            $('div.facet-typeahead-list-control').$('input').sendKeys(text);
    };
    
    getFacetFromDropdownList = function(index: number) {
        return this.container.$('div.facets-region').$('ux-facet-typeahead-list').$('div.facet-typeahead-list-container').
            $('div.facet-typeahead-list-control').$('typeahead-container').$('ul.dropdown-menu').
            $$('li').get(index).$('a');
    };    
}
