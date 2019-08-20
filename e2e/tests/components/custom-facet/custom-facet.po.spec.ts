import { browser, by, element } from 'protractor';

export class CustomFacetPage {

    async getPage(): Promise<void> {
        await browser.get('#/custom-facet');
    }

    container = element(by.id('customFacetContainer'));
    checkboxContainer = element(by.id('facetCheckboxContainer'));

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

    closeFacet(index: number) {
        return this.container.$('div.facets-selected-container').$('div.facets-selected-list').$$('div.facet-selected-tag').get(index).$('.facet-selected-remove-btn').click();
    }

    getNoItemsLabel() {
        return this.container.$('div.facets-selected-container').$('p.facets-selected-none-label');
    }

    getCheckbox(index: number) {
        return this.checkboxContainer.$$('ux-checkbox').get(index).$('.ux-checkbox');
    }

    confirmIsChecked(index: number) {
        return this.checkboxContainer.$$('ux-checkbox').get(index).$('.ux-checkbox-checked').isPresent();
    }
}
