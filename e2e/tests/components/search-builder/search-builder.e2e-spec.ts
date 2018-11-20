import { SearchBuilderPage } from './search-builder.po.spec';

describe('Search Builder Tests', () => {

    let page: SearchBuilderPage.Page;

    beforeEach(() => {
        page = new SearchBuilderPage.Page();
        page.getPage();
    });

    it('should have the correct initial state', async () => {
        let query = await page.getQueryObject();

        expect(query.keywords.length).toBe(0);
        expect(query.any.length).toBe(0);
        expect(query.all.length).toBe(0);
        expect(query.none.length).toBe(0);
        expect(await page.getValid()).toBeTruthy();
    });

    it('should be able to add a text component', async () => {

        // add the text field
        await page.addTextField();

        // get the updated query
        let query = await page.getQueryObject();

        // check the query fields
        expect(query.keywords.length).toBe(1);
        expect(query.any.length).toBe(0);
        expect(query.all.length).toBe(0);
        expect(query.none.length).toBe(0);
        expect(await page.getValid()).toBeTruthy();
    });

    it('should be able to add a date component', async () => {

        // add the text field
        await page.addDateField();

        // get the updated query
        let query = await page.getQueryObject();

        // check the query fields
        expect(query.keywords.length).toBe(0);
        expect(query.any.length).toBe(1);
        expect(query.all.length).toBe(0);
        expect(query.none.length).toBe(0);
        expect(await page.getValid()).toBeTruthy();
    });

    it('should be able to add a date range component', async () => {

        // add the text field
        await page.addDateRangeField();

        // get the updated query
        let query = await page.getQueryObject();

        // check the query fields
        expect(query.keywords.length).toBe(0);
        expect(query.any.length).toBe(0);
        expect(query.all.length).toBe(1);
        expect(query.none.length).toBe(0);
        expect(await page.getValid()).toBeTruthy();
    });

    it('should be able to add a select component', async () => {

        // add the text field
        await page.addSelectField();

        // get the updated query
        let query = await page.getQueryObject();

        // check the query fields
        expect(query.keywords.length).toBe(0);
        expect(query.any.length).toBe(0);
        expect(query.all.length).toBe(0);
        expect(query.none.length).toBe(1);
        expect(await page.getValid()).toBeTruthy();
    });

    it('should update when the query object changes', async () => {

        // add the text field
        await page.setQuery();

        // get the updated query
        let query = await page.getQueryObject();

        // check the query fields
        expect(query.keywords.length).toBe(1);
        expect(query.any.length).toBe(1);
        expect(query.all.length).toBe(1);
        expect(query.none.length).toBe(1);
        expect(await page.getValid()).toBeTruthy();
    });

});