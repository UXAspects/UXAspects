import { browser } from 'protractor';
import { FacetContainerPage } from './facet-container.po.spec';

describe('FacetContainerPage Tests', () => {

    let page: FacetContainerPage = new FacetContainerPage();
    page.getPage();

    it('should start with no facets', async () => {

        // No facets should be visible.
        expect<any>(page.getNumberOfFacets()).toEqual(0);
        expect(page.getClearAllButton().isPresent()).toBeFalsy();
        expect(page.getNoItemsLabel().isPresent()).toBeTruthy();

        expect(await browser.imageComparison.checkScreen('facet-container-list-initial')).toEqual(0);
    });

    it('should allow addition of facets', async () => {

        // Create facets, checking the number displayed.
        await page.addFacet.click();
        expect(await page.getClearAllButton().isPresent()).toBeTruthy();
        expect(await page.getNoItemsLabel().isPresent()).toBeFalsy();

        await page.addFacet.click();
        await page.addFacet.click();
        expect(await page.getNumberOfFacets()).toEqual(3);

        expect(await browser.imageComparison.checkScreen('facet-container-list-addition')).toEqual(0);

        expect(await page.getFacetName(0)).toMatch('\\w+\\d*\\w*');
        expect(await page.getFacetName(1)).toMatch('\\w+\\d*\\w*');
        expect(await page.getFacetName(2)).toMatch('\\w+\\d*\\w*');

        await page.getClearAllButton().click();

    });

    it('should allow deletion of facets one by one', async () => {

        // Create some facets.
        await page.addFacet.click();
        await page.addFacet.click();
        await page.addFacet.click();
        expect(await page.getNumberOfFacets()).toEqual(3);

        // Close the facets and confirm that the corresponding list items are unchecked.
        await page.closeFacet(2);
        expect(await page.getNumberOfFacets()).toEqual(2);
        await page.closeFacet(0);
        expect(await page.getNumberOfFacets()).toEqual(1);

        await page.getClearAllButton().click();
    });

    it('should allow deletion of all facets', async () => {

        // Create some facets.
        await page.addFacet.click();
        await page.addFacet.click();
        await page.addFacet.click();
        expect(await page.getNumberOfFacets()).toEqual(3);

        // Close all the facets and then confirm that the corresponding list items are unchecked.
        await page.getClearAllButton().click();
        expect(await page.getNumberOfFacets()).toEqual(0);

    });
});