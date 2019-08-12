import { browser } from 'protractor';
import { FacetCheckListPage } from './facet-check-list.po.spec';

describe('FacetCheckListPage Tests', () => {

    let page: FacetCheckListPage = new FacetCheckListPage();
    page.getPage();

    it('should start with no facets', async () => {

        // No facets should be visible.
        expect(await page.getNumberOfFacets()).toEqual(0);
        expect(await page.getClearAllButton().isPresent()).toBeFalsy();
        expect(await page.getNoItemsLabel().isPresent()).toBeTruthy();

        // No items in the list should be checked.
        expect(await page.getNumberOfFacetsInCheckList()).toEqual(30);
        expect(await page.confirmCheckListScrollbarExists()).toBeTruthy();
        expect(await page.confirmCheckListFacetIsTicked(0)).toBeFalsy();

        expect(await browser.imageComparison.checkScreen('facet-check-list-initial')).toEqual(0);
    });

    it('should allow addition of facets', async () => {

        // Check list items, confirming that the corresponding facets are created.
        await page.getFacetFromCheckList(3).click();
        expect(await page.getClearAllButton().isPresent()).toBeTruthy();
        expect(await page.getNoItemsLabel().isPresent()).toBeFalsy();

        expect(await page.confirmCheckListFacetIsTicked(3)).toBeTruthy();
        expect(await page.getFacetName(0)).toEqual(await page.getFacetNameFromCheckList(3));

        await page.getFacetFromCheckList(13).click();
        expect(await page.confirmCheckListFacetIsTicked(13)).toBeTruthy();
        expect(await page.getFacetName(1)).toEqual(await page.getFacetNameFromCheckList(13));

        await page.getFacetFromCheckList(23).click();
        expect(await page.confirmCheckListFacetIsTicked(23)).toBeTruthy();
        expect(await page.getFacetName(2)).toEqual(await page.getFacetNameFromCheckList(23));

        expect(await page.getNumberOfFacets()).toEqual(3);
        expect(await page.getNumberOfFacetsInCheckList()).toEqual(30);

        await page.getClearAllButton().click();

        expect(await browser.imageComparison.checkScreen('facet-check-list-selected')).toEqual(0);

    });

    it('should allow deletion of facets one by one', async () => {

        // Create some facets.
        await page.getFacetFromCheckList(0).click();
        await page.getFacetFromCheckList(15).click();
        await page.getFacetFromCheckList(29).click();
        expect(await page.getNumberOfFacets()).toEqual(3);

        // Close the facets and then confirm that the corresponding list items are unchecked.
        await page.closeFacet(2);
        expect(await page.getNumberOfFacets()).toEqual(2);
        await page.closeFacet(0);
        expect(await page.getNumberOfFacets()).toEqual(1);
        await page.closeFacet(0);
        expect(await page.getNumberOfFacets()).toEqual(0);

        expect(await page.confirmCheckListFacetIsTicked(0)).toBeFalsy();
        expect(await page.confirmCheckListFacetIsTicked(15)).toBeFalsy();
        expect(await page.confirmCheckListFacetIsTicked(29)).toBeFalsy();

    });

    it('should allow deletion of all facets', async () => {

        // Create some facets.
        await page.getFacetFromCheckList(23).click();
        await page.getFacetFromCheckList(1).click();
        await page.getFacetFromCheckList(9).click();
        expect(await page.getNumberOfFacets()).toEqual(3);

        // Close all the facets and then confirm that the corresponding list items are unchecked.
        await page.getClearAllButton().click();
        expect(await page.getNumberOfFacets()).toEqual(0);

        expect(await page.confirmCheckListFacetIsTicked(23)).toBeFalsy();
        expect(await page.confirmCheckListFacetIsTicked(1)).toBeFalsy();
        expect(await page.confirmCheckListFacetIsTicked(9)).toBeFalsy();

    });
});