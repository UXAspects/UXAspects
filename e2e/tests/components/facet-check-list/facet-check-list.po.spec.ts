import { browser, by, element } from 'protractor';

export class FacetCheckListPage {

    async getPage(): Promise<void> {
        await browser.get('#/facet-check-list');
    }

    container = element(by.id('container1'));

    getNumberOfFacets() {
        return this.container.$('div.facets-selected-container').$('div.facets-selected-list').$$('div.facet-selected-tag').count();
    }

    getClearAllButton() {
        return this.container.$('div.facets-selected-container').$('div.facets-selected-header-container').$('.btn.btn-link');
    }

    getFacet(index: number) {
        return this.container.$('div.facets-selected-container').$('div.facets-selected-list').$$('div.facet-selected-tag').get(index);
    }

    getFacetName(index: number) {
        return this.container.$('div.facets-selected-container').$('div.facets-selected-list').$$('div.facet-selected-tag').get(index).$('span.facet-selected-tag-label').getText();
    }

    async closeFacet(index: number) {
        await this.container.$('div.facets-selected-container').$('div.facets-selected-list').$$('div.facet-selected-tag').get(index).$('.facet-selected-remove-btn').click();
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
            getAttribute('class').then(function (classes: string) {
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
