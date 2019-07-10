import { Key } from 'protractor';
import { FiltersPage } from './filters.po.spec';

describe('Filters Tests', () => {

    let page: FiltersPage;

    beforeEach(() => {
        page = new FiltersPage();
        page.getPage();
    });

    it('should have correct initial states', async () => {

        // menus not expanded
        expect(await page.confirmAuthorMenuIsExpanded()).toBeFalsy();
        expect(await page.confirmStatusMenuIsExpanded()).toBeFalsy();

        // clear all not visible
        expect(await page.confirmClearAllIsVisible()).toBeFalsy();

        // default authors and status
        expect(await page.confirmAuthorsAreFiltered()).toBeFalsy();
        expect(await page.confirmStatusIsFiltered()).toBeFalsy();

        // 8 items visible
        expect(await page.getNumberOfItems()).toEqual(8);

    });

    it('should display correct text', async () => {

        // Author menu
        await page.clickOnAuthorMenu();

        expect(await page.getAuthorMenuItemText(0)).toBe('Author (All)');
        expect(await page.getPlaceholderText()).toBe('Find Author');

        await page.closeMenus();

        // Status menu
        await page.clickOnStatusMenu();

        expect(await page.getStatusMenuItemText(0)).toBe('Status (All)');
        expect(await page.getStatusMenuItemText(1)).toBe('Active');
        expect(await page.getStatusMenuItemText(2)).toBe('Inactive');

        // titles
        expect(await page.getTitleText(0)).toBe('NAME');
        expect(await page.getTitleText(1)).toBe('AUTHOR');
        expect(await page.getTitleText(2)).toBe('DATE MODIFIED');
        expect(await page.getTitleText(3)).toBe('WORK COMPLETED');
        expect(await page.getTitleText(4)).toBe('STATUS');

        // items
        expect(await page.getItemText(0, 1)).toBe('Document');
        expect(await page.getItemText(0, 2)).toBe('Lily Clarke');
        expect(await page.getItemText(0, 3)).toBe('18 Dec 2016');
        expect(await page.getPercentageOfWorkCompleted(0)).toBe('97');
        expect(await page.getItemText(1, 1)).toBe('Email');
        expect(await page.getItemText(1, 2)).toBe('Jesse Bass');
        expect(await page.getItemText(1, 3)).toBe('22 Dec 2016');
        expect(await page.getPercentageOfWorkCompleted(1)).toBe('15');
        expect(await page.getItemText(2, 1)).toBe('Email');
        expect(await page.getItemText(2, 2)).toBe('Iva Rogers');
        expect(await page.getItemText(2, 3)).toBe('12 Dec 2016');
        expect(await page.getPercentageOfWorkCompleted(2)).toBe('20');
        expect(await page.getItemText(3, 1)).toBe('Email');
        expect(await page.getItemText(3, 2)).toBe('Nina Copeland');
        expect(await page.getItemText(3, 3)).toBe('16 Dec 2016');
        expect(await page.getPercentageOfWorkCompleted(3)).toBe('74');
        expect(await page.getItemText(4, 1)).toBe('Email');
        expect(await page.getItemText(4, 2)).toBe('Bradley Mason');
        expect(await page.getItemText(4, 3)).toBe('17 Dec 2016');
        expect(await page.getPercentageOfWorkCompleted(4)).toBe('63');
        expect(await page.getItemText(5, 1)).toBe('Document');
        expect(await page.getItemText(5, 2)).toBe('Aaron Scott');
        expect(await page.getItemText(5, 3)).toBe('21 Dec 2016');
        expect(await page.getPercentageOfWorkCompleted(5)).toBe('21');
        expect(await page.getItemText(6, 1)).toBe('Document');
        expect(await page.getItemText(6, 2)).toBe('Lily Clarke');
        expect(await page.getItemText(6, 3)).toBe('17 Dec 2016');
        expect(await page.getPercentageOfWorkCompleted(6)).toBe('85');
        expect(await page.getItemText(7, 1)).toBe('Document');
        expect(await page.getItemText(7, 2)).toBe('Lily Clarke');
        expect(await page.getItemText(7, 3)).toBe('17 Dec 2016');
        expect(await page.getPercentageOfWorkCompleted(7)).toBe('11');

    });

    it('should expand menu on click', async () => {

        await page.clickOnAuthorMenu();
        expect(await page.confirmAuthorMenuIsExpanded()).toBeTruthy();

        await page.closeMenus();

        await page.clickOnStatusMenu();
        expect(await page.confirmStatusMenuIsExpanded()).toBeTruthy();

    });

    it('should react to selecting an author from the author menu', async () => {

        // select author using filter + clicking
        await await page.clickOnAuthorMenu();
        await page.clickOnFilter();
        await page.getFilter().sendKeys('j');
        await page.clickOnFilterItem(0);

        expect(await page.confirmAuthorMenuIsExpanded()).toBeFalsy();
        expect(await page.confirmAuthorsAreFiltered()).toBeTruthy();
        expect(await await page.getNumberOfItems()).toEqual(1);
        expect(await await page.getItemText(0, 2)).toBe('Jesse Bass');
        await await page.clickOnAuthorMenu();
        expect(await await page.getAuthorMenuItemText(1)).toBe('Jesse Bass');

        // select author using filter + enter key
        await page.clickOnFilter();
        await page.getFilter().sendKeys('u');
        await page.getFilter().sendKeys(Key.ENTER);

        expect(await page.confirmAuthorMenuIsExpanded()).toBeFalsy();
        expect(await page.confirmAuthorsAreFiltered()).toBeTruthy();
        expect(await await page.getNumberOfItems()).toEqual(0);
        await await page.clickOnAuthorMenu();
        expect(await await page.getAuthorMenuItemText(1)).toBe('Lois Saunders');

        await page.clickOnFilter();
        await page.getFilter().sendKeys('ar');
        await page.getFilter().sendKeys(Key.ARROW_DOWN);
        await page.getFilter().sendKeys(Key.ENTER);

        expect(await page.confirmAuthorMenuIsExpanded()).toBeFalsy();
        expect(await page.confirmAuthorsAreFiltered()).toBeTruthy();
        expect(await await page.getNumberOfItems()).toEqual(1);
        await await page.clickOnAuthorMenu();
        expect(await await page.getAuthorMenuItemText(1)).toBe('Aaron Scott');

        // choose Author (All) from Author menu
        await page.clickOnAuthorMenuItem(0);

        expect(await page.confirmAuthorMenuIsExpanded()).toBeFalsy();
        expect(await page.confirmAuthorsAreFiltered()).toBeFalsy();
        expect(await await page.getNumberOfItems()).toEqual(8);
    });

    it('should react to selecting an item in the status menu', async () => {

        // choose Active from Status menu
        await page.clickOnStatusMenu();
        page.clickOnStatusMenuItem(1);

        expect(await page.confirmStatusMenuIsExpanded()).toBeFalsy();
        expect(await page.confirmStatusIsFiltered()).toBeTruthy();
        expect(await page.confirmItemStatus(0)).toBeTruthy();
        expect(await page.getNumberOfItems()).toEqual(6);
        expect(await page.getItemText(3, 2)).toBe('Aaron Scott');


        // choose Status (All) from Status menu
        await page.clickOnStatusMenu();
        page.clickOnStatusMenuItem(0);
        expect(await page.confirmStatusMenuIsExpanded()).toBeFalsy();
        expect(await page.confirmStatusIsFiltered()).toBeFalsy();
        expect(await page.getNumberOfItems()).toEqual(8);
        expect(await page.getItemText(6, 2)).toBe('Lily Clarke');


        // choose Inactive from Status menu
        await page.clickOnStatusMenu();
        page.clickOnStatusMenuItem(2);

        expect(await page.confirmStatusMenuIsExpanded()).toBeFalsy();
        expect(await page.confirmStatusIsFiltered()).toBeTruthy();
        expect(await page.confirmItemStatus(0)).toBeFalsy();
        expect(await page.getNumberOfItems()).toEqual(2);
        expect(await page.getItemText(1, 2)).toBe('Bradley Mason');

    });

    it('should react to pressing clear all', async () => {

        // choose Active from Status menu
        await await page.clickOnStatusMenu();
        await page.clickOnStatusMenuItem(1);
        expect(await page.confirmAuthorsAreFiltered()).toBeFalsy();
        expect(await page.confirmStatusIsFiltered()).toBeTruthy();
        expect(await page.confirmClearAllIsVisible()).toBeTruthy();

        // click on Clear All icon
        await page.clickOnClearAll();
        expect(await page.confirmAuthorsAreFiltered()).toBeFalsy();
        expect(await page.confirmStatusIsFiltered()).toBeFalsy();
        expect(await page.confirmClearAllIsVisible()).toBeFalsy();

        // choose Inactive from Status menu
        await await page.clickOnStatusMenu();
        await page.clickOnStatusMenuItem(2);
        expect(await page.confirmAuthorsAreFiltered()).toBeFalsy();
        expect(await page.confirmStatusIsFiltered()).toBeTruthy();
        expect(await page.confirmClearAllIsVisible()).toBeTruthy();

        // select author using filter
        await await page.clickOnAuthorMenu();
        await page.clickOnFilter();
        await page.getFilter().sendKeys('g');
        await page.clickOnFilterItem(0);
        expect(await page.confirmAuthorsAreFiltered()).toBeTruthy();
        expect(await page.confirmStatusIsFiltered()).toBeTruthy();
        expect(await page.confirmClearAllIsVisible()).toBeTruthy();

        // click on Clear All icon
        await page.clickOnClearAll();
        expect(await page.confirmAuthorsAreFiltered()).toBeFalsy();
        expect(await page.confirmStatusIsFiltered()).toBeFalsy();
        expect(await page.confirmClearAllIsVisible()).toBeFalsy();
        expect(await await page.getNumberOfItems()).toEqual(8);

    });

    it('should react to filtering by author', async () => {

        // no match
        await await page.clickOnAuthorMenu();
        await page.clickOnFilter();
        await page.getFilter().sendKeys('x');
        expect(await await page.getNumberOfFilterItems()).toEqual(0);

        // upper case
        await page.getFilter().clear();
        await page.getFilter().sendKeys('H');
        expect(await await page.getNumberOfFilterItems()).toEqual(1);
        expect(await await page.getFilterItemText(0)).toBe('Ethel Collier');

        // exact characters
        await page.getFilter().clear();
        await page.getFilter().sendKeys('as');
        expect(await await page.getNumberOfFilterItems()).toEqual(2);
        expect(await await page.getFilterItemText(0)).toBe('Jesse Bass');
        expect(await await page.getFilterItemText(1)).toBe('Bradley Mason');

        // confirm style of filtered characters
        await page.getFilter().clear();
        await page.getFilter().sendKeys('ro');
        expect(await await page.getFilterText(0)).toBe('Ro');
        expect(await await page.getFilterText(1)).toBe('ro');

    });

    it('should highlight an author in the authors menu when it is hovered over', async () => {

        // default highlighted item
        await page.clickOnAuthorMenu();
        page.clickOnFilter();
        page.getFilter().sendKeys('d');
        expect(await page.confirmFilterItemIsHighlighted(0)).toBeTruthy();
        expect(await page.confirmFilterItemIsHighlighted(1)).toBeFalsy();
        expect(await page.confirmFilterItemIsHighlighted(2)).toBeFalsy();

        // hover over author
        page.hoverOverFilterItem(1);
        expect(await page.confirmFilterItemIsHighlighted(0)).toBeFalsy();
        expect(await page.confirmFilterItemIsHighlighted(1)).toBeTruthy();
        expect(await page.confirmFilterItemIsHighlighted(2)).toBeFalsy();

        // press arrow down
        page.getFilter().sendKeys(Key.ARROW_DOWN);
        expect(await page.confirmFilterItemIsHighlighted(0)).toBeFalsy();
        expect(await page.confirmFilterItemIsHighlighted(1)).toBeFalsy();
        expect(await page.confirmFilterItemIsHighlighted(2)).toBeTruthy();

    });

    it('should display a check next to a selected menu item', async () => {

        // author menu
        await page.clickOnAuthorMenu();
        expect(await page.confirmAuthorMenuItemCheckExists(0)).toBeTruthy();

        await page.clickOnFilter();
        await page.getFilter().sendKeys('n');
        await page.getFilter().sendKeys(Key.ENTER);

        await page.clickOnAuthorMenu();
        expect(await page.confirmAuthorMenuItemCheckExists(0)).toBeFalsy();
        expect(await page.confirmAuthorMenuItemCheckExists(1)).toBeTruthy();

        await page.closeMenus();

        // status menu
        await page.clickOnStatusMenu();
        expect(await page.confirmStatusMenuItemCheckExists(0)).toBeTruthy();
        expect(await page.confirmStatusMenuItemCheckExists(1)).toBeFalsy();
        expect(await page.confirmStatusMenuItemCheckExists(2)).toBeFalsy();

        await page.clickOnStatusMenuItem(1);
        await page.clickOnStatusMenu();

        expect(await page.confirmStatusMenuItemCheckExists(0)).toBeFalsy();
        expect(await page.confirmStatusMenuItemCheckExists(1)).toBeTruthy();
        expect(await page.confirmStatusMenuItemCheckExists(2)).toBeFalsy();

        await page.clickOnStatusMenuItem(2);
        await page.clickOnStatusMenu();

        expect(await page.confirmStatusMenuItemCheckExists(0)).toBeFalsy();
        expect(await page.confirmStatusMenuItemCheckExists(1)).toBeFalsy();
        expect(await page.confirmStatusMenuItemCheckExists(2)).toBeTruthy();

    });
});