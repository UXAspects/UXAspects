import { FacetCheckListPage } from './facet-check-list.po.spec';

describe('FacetCheckListPage Tests', () => {

    let page: FacetCheckListPage = new FacetCheckListPage();
    page.getPage();

    it('should start with no facets', () => {

        // No facets should be visible.
        expect<any>(page.getNumberOfFacets()).toEqual(0);
        expect(page.getClearAllButton().isPresent()).toBeFalsy();
        expect(page.getNoItemsLabel().isPresent()).toBeTruthy();

        // No items in the list should be checked.
        expect<any>(page.getNumberOfFacetsInCheckList()).toEqual(30);
        expect(page.confirmCheckListScrollbarExists()).toBeTruthy();
        expect(page.confirmCheckListFacetIsTicked(0)).toBeFalsy();

    });

    it('should allow addition of facets', async () => {

        // Check list items, confirming that the corresponding facets are created.
        page.getFacetFromCheckList(3).click();
        expect(page.getClearAllButton().isPresent()).toBeTruthy();
        expect(page.getNoItemsLabel().isPresent()).toBeFalsy();

        expect(page.confirmCheckListFacetIsTicked(3)).toBeTruthy();
        expect(page.getFacetName(0)).toEqual(page.getFacetNameFromCheckList(3));

        page.getFacetFromCheckList(13).click();
        expect(page.confirmCheckListFacetIsTicked(13)).toBeTruthy();
        expect(page.getFacetName(1)).toEqual(page.getFacetNameFromCheckList(13));

        page.getFacetFromCheckList(23).click();
        expect(page.confirmCheckListFacetIsTicked(23)).toBeTruthy();
        expect(page.getFacetName(2)).toEqual(page.getFacetNameFromCheckList(23));

        expect<any>(page.getNumberOfFacets()).toEqual(3);
        expect<any>(page.getNumberOfFacetsInCheckList()).toEqual(30);

        await page.getClearAllButton().click();

    });

    it('should allow deletion of facets one by one', () => {

        // Create some facets.
        page.getFacetFromCheckList(0).click();
        page.getFacetFromCheckList(15).click();
        page.getFacetFromCheckList(29).click();
        expect<any>(page.getNumberOfFacets()).toEqual(3);

        // Close the facets and then confirm that the corresponding list items are unchecked.
        page.closeFacet(2);
        expect<any>(page.getNumberOfFacets()).toEqual(2);
        page.closeFacet(0);
        expect<any>(page.getNumberOfFacets()).toEqual(1);
        page.closeFacet(0);
        expect<any>(page.getNumberOfFacets()).toEqual(0);

        expect(page.confirmCheckListFacetIsTicked(0)).toBeFalsy();
        expect(page.confirmCheckListFacetIsTicked(15)).toBeFalsy();
        expect(page.confirmCheckListFacetIsTicked(29)).toBeFalsy();

    });

    it('should allow deletion of all facets', () => {

        // Create some facets.
        page.getFacetFromCheckList(23).click();
        page.getFacetFromCheckList(1).click();
        page.getFacetFromCheckList(9).click();
        expect<any>(page.getNumberOfFacets()).toEqual(3);

        // Close all the facets and then confirm that the corresponding list items are unchecked.
        page.getClearAllButton().click();
        expect<any>(page.getNumberOfFacets()).toEqual(0);

        expect(page.confirmCheckListFacetIsTicked(23)).toBeFalsy();
        expect(page.confirmCheckListFacetIsTicked(1)).toBeFalsy();
        expect(page.confirmCheckListFacetIsTicked(9)).toBeFalsy();

    });
});