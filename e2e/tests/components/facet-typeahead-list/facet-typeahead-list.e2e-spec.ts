import { imageCompare } from '../common/image-compare';
import { FacetTypeaheadListPage } from './facet-typeahead-list.po.spec';

describe('FacetTypeaheadListPage Tests', () => {

    let page: FacetTypeaheadListPage;

    beforeEach(async () => {
        page = new FacetTypeaheadListPage();
        await page.getPage();
    });

    it('should start with no facets', async () => {

        // No facets should be visible.
        expect(await page.getNumberOfFacets()).toEqual(0);
        expect(await page.getClearAllButton().isPresent()).toBeFalsy();
        expect(await page.getNoItemsLabel().isPresent()).toBeTruthy();

        // No checkboxes should be checked.
        expect(await page.getNumberOfFacetsInSuggestedList()).toEqual(6);
        expect(await page.confirmSuggestedListFacetIsTicked(0)).toBeFalsy();
        expect(await page.confirmSuggestedListFacetIsTicked(1)).toBeFalsy();
        expect(await page.confirmSuggestedListFacetIsTicked(2)).toBeFalsy();
        expect(await page.confirmSuggestedListFacetIsTicked(3)).toBeFalsy();
        expect(await page.confirmSuggestedListFacetIsTicked(4)).toBeFalsy();
        expect(await page.confirmSuggestedListFacetIsTicked(5)).toBeFalsy();

        expect(await imageCompare('facet-typeahead-initial')).toEqual(0);
    });

    it('should allow addition of facets', async () => {

        // Check checkboxes, confirming that the corresponding facets are created.
        await page.getFacetFromSuggestedList(0).click();
        expect(await page.getClearAllButton().isPresent()).toBeTruthy();
        expect(await page.getNoItemsLabel().isPresent()).toBeFalsy();

        expect(await page.confirmSuggestedListFacetIsTicked(0)).toBeTruthy();
        expect(await page.getFacetName(0)).toEqual(await page.getFacetNameFromSuggestedList(0));

        await page.getFacetFromSuggestedList(3).click();
        expect(await page.confirmSuggestedListFacetIsTicked(3)).toBeTruthy();
        expect(await page.getFacetName(1)).toEqual(await page.getFacetNameFromSuggestedList(3));

        await page.getFacetFromSuggestedList(5).click();
        expect(await page.confirmSuggestedListFacetIsTicked(5)).toBeTruthy();
        expect(await page.getFacetName(2)).toEqual(await page.getFacetNameFromSuggestedList(5));

        expect(await page.getNumberOfFacets()).toEqual(3);

        expect(await imageCompare('facet-typeahead-selection')).toEqual(0);

    });

    it('should allow deletion of facets one by one', async () => {

        // Create some facets.
        await page.getFacetFromSuggestedList(0).click();
        await page.getFacetFromSuggestedList(4).click();
        await page.getFacetFromSuggestedList(5).click();
        expect(await page.getNumberOfFacets()).toEqual(3);

        // Close the facets and then confirm that the corresponding checkboxes are unchecked.
        await page.closeFacet(2);
        expect(await page.getNumberOfFacets()).toEqual(2);
        await page.closeFacet(0);
        expect(await page.getNumberOfFacets()).toEqual(1);
        await page.closeFacet(0);
        expect(await page.getNumberOfFacets()).toEqual(0);

        expect(await page.confirmSuggestedListFacetIsTicked(0)).toBeFalsy();
        expect(await page.confirmSuggestedListFacetIsTicked(4)).toBeFalsy();
        expect(await page.confirmSuggestedListFacetIsTicked(5)).toBeFalsy();

    });

    it('should allow deletion of all facets', async () => {

        // Create some facets.
        await page.getFacetFromSuggestedList(2).click();
        await page.getFacetFromSuggestedList(1).click();
        await page.getFacetFromSuggestedList(4).click();
        expect(await page.getNumberOfFacets()).toEqual(3);

        // Close all the facets and then confirm that the corresponding checkboxes are unchecked.
        await page.getClearAllButton().click();
        expect(await page.getNumberOfFacets()).toEqual(0);

        expect(await page.confirmSuggestedListFacetIsTicked(2)).toBeFalsy();
        expect(await page.confirmSuggestedListFacetIsTicked(1)).toBeFalsy();
        expect(await page.confirmSuggestedListFacetIsTicked(4)).toBeFalsy();

    });

    it('should allow entry of typeahead text', async () => {

        // Enter text in the typeahead box, select the first item in the list and confirm that a facet is created.
        await page.addTextToTypeaheadInput('t');
        await page.getFacetFromDropdownList(1).click();
        expect(await page.getNumberOfFacets()).toEqual(1);

    });
});