import { browser } from 'protractor';
import { FacetContainerPage } from './facet-container.po.spec';

describe('FacetContainerPage Tests', () => {

    let page: FacetContainerPage = new FacetContainerPage();
    page.getPage();

    it('should start with no facets', () => {

        // No facets should be visible.
        expect<any>(page.getNumberOfFacets()).toEqual(0);
        expect(page.getClearAllButton().isPresent()).toBeFalsy();
        expect(page.getNoItemsLabel().isPresent()).toBeTruthy();

        expect(browser.imageComparison.checkScreen('facet-container-list-initial')).toEqual(0);
    });

    it('should allow addition of facets', async () => {

        // Create facets, checking the number displayed.
        page.addFacet.click();
        expect(page.getClearAllButton().isPresent()).toBeTruthy();
        expect(page.getNoItemsLabel().isPresent()).toBeFalsy();

        page.addFacet.click();
        page.addFacet.click();
        expect<any>(page.getNumberOfFacets()).toEqual(3);

        expect(page.getFacetName(0)).toMatch('\\w+\\d*\\w*');
        expect(page.getFacetName(1)).toMatch('\\w+\\d*\\w*');
        expect(page.getFacetName(2)).toMatch('\\w+\\d*\\w*');

        await page.getClearAllButton().click();

        expect(browser.imageComparison.checkScreen('facet-container-list-addition')).toEqual(0);
    });

    it('should allow deletion of facets one by one', async () => {

        // Create some facets.
        page.addFacet.click();
        page.addFacet.click();
        page.addFacet.click();
        expect<any>(page.getNumberOfFacets()).toEqual(3);

        // Close the facets and confirm that the corresponding list items are unchecked.
        page.closeFacet(2);
        expect<any>(page.getNumberOfFacets()).toEqual(2);
        page.closeFacet(0);
        expect<any>(page.getNumberOfFacets()).toEqual(1);

        await page.getClearAllButton().click();
    });

    it('should allow deletion of all facets', () => {

        // Create some facets.
        page.addFacet.click();
        page.addFacet.click();
        page.addFacet.click();
        expect<any>(page.getNumberOfFacets()).toEqual(3);

        // Close all the facets and then confirm that the corresponding list items are unchecked.
        page.getClearAllButton().click();
        expect<any>(page.getNumberOfFacets()).toEqual(0);

    });
});