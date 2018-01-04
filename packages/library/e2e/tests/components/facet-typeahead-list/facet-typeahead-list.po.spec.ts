import { browser, element, by } from 'protractor';

export class FacetTypeaheadListPage {
        
    getPage(): void {
        browser.get('/facet-typeahead-list');
    }
    
    container = element(by.id('container1'));
    
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
    
    getNumberOfFacetsInSuggestedList() {
        return this.container.$('div.facets-region').$('ux-facet-typeahead-list').$('div.facet-typeahead-list-container').
            $('div.facet-typeahead-list-selected-container').$$('div.facet-typeahead-list-selected-option').count();
    }
    
    getFacetFromSuggestedList(index: number) {
        return this.container.$('div.facets-region').$('ux-facet-typeahead-list').$('div.facet-typeahead-list-container').
            $('div.facet-typeahead-list-selected-container').$$('div.facet-typeahead-list-selected-option').get(index);
    }
    
    getFacetNameFromSuggestedList(index: number) {
        return this.container.$('div.facets-region').$('ux-facet-typeahead-list').$('div.facet-typeahead-list-container').
            $('div.facet-typeahead-list-selected-container').$$('div.facet-typeahead-list-selected-option').get(index).
            $('ux-checkbox').$('div.ux-checkbox-content').$('span.facet-typeahead-list-selected-option-title').getText();
    }
    
    confirmSuggestedListFacetIsTicked(index: number) {
        return this.container.$('div.facets-region').$('ux-facet-typeahead-list').$('div.facet-typeahead-list-container').
            $('div.facet-typeahead-list-selected-container').$$('div.facet-typeahead-list-selected-option').get(index).
            $('ux-checkbox').$('div.ux-checkbox').
            getAttribute('class').then(function(classes: string) {
                var allClasses = classes.split(' ');
                if (allClasses.indexOf('ux-checked') > -1) {
                    return true;
                } else {
                    return false;
                }
            });
    }
    
    addTextToTypeaheadInput(text: string) {
        this.container.$('div.facets-region').$('ux-facet-typeahead-list').$('div.facet-typeahead-list-container').
            $('div.facet-typeahead-list-control').$('input').sendKeys(text);
    }
    
    getFacetFromDropdownList(index: number) {
        return this.container.$('div.facets-region').$('ux-facet-typeahead-list').$('div.facet-typeahead-list-container').
            $('div.facet-typeahead-list-control').$('typeahead-container').$('ul.dropdown-menu').
            $$('li').get(index).$('a');
    }
}
