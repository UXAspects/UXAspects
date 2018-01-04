import { browser, element, by } from 'protractor';

export class FacetCheckListPage {
        
    getPage(): void {
        browser.get('/facet-check-list');
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
    
    getNumberOfFacetsInCheckList() {
        return this.container.$('div.facets-region').$('ux-facet-check-list').$('div.facet-check-list-container').$$('div.facet-check-list-item').count();
    }
    
    getFacetFromCheckList(index: number) {
        return this.container.$('div.facets-region').$('ux-facet-check-list').$('div.facet-check-list-container').$$('div.facet-check-list-item').get(index);
    }
    
    getFacetNameFromCheckList(index: number) {
        return this.container.$('div.facets-region').$('ux-facet-check-list').$('div.facet-check-list-container').$$('div.facet-check-list-item').get(index).$('span.facet-check-list-item-title').getText();
    }
    
    confirmCheckListFacetIsTicked(index: number) {
        return this.container.$('div.facets-region').$('ux-facet-check-list').$('div.facet-check-list-container').$$('div.facet-check-list-item').get(index).
            getAttribute('class').then(function(classes: string) {
                var allClasses = classes.split(' ');
                if (allClasses.indexOf('facet-active') > -1) {
                    return true;
                } else {
                    return false;
                }
            });
    }
    
    confirmCheckListScrollbarExists() {
        return browser.isElementPresent(this.container.$('div.facets-region').$('ux-facet-check-list').$('div.facet-check-list-container').getAttribute('facet-check-list-scrollbar'));
    }
}
