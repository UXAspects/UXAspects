import { browser, Key } from 'protractor';
import { InfiniteScrollPage } from './infinite-scroll.po.spec';

describe('Infinite Scroll Tests', () => {

    let page: InfiniteScrollPage;

    beforeEach(() => {
        page = new InfiniteScrollPage();
        page.getPage();
    });

    it('should have correct initial states', async () => {

        // 20 visible employees
        expect(await page.getNumberOfEmployees()).toEqual(20);

        // loadMore not visible
        expect(await page.confirmLoadMoreIsVisible()).toBeFalsy();

        // loadOnScroll checked
        expect(await page.confirmLoadOnScrollIsChecked()).toBeTruthy();

        // arrows enabled
        expect(await page.confirmPageSizeButtonIsDisabled('up')).toBeFalsy();
        expect(await page.confirmPageSizeButtonIsDisabled('down')).toBeFalsy();

        // valid value in number picker
        expect(await page.confirmValueIsInvalid()).toBeFalsy();

        expect(await browser.imageComparison.checkScreen('infinite-scroll-initial')).toEqual(0);

    });

    it('should display correct text for employee details', async () => {

        // employee's name
        for (let i = 0; i < 20; i++) {
            expect(await page.getEmployeeText(i)).toBe('employee_' + i);
        }

        // employee's department
        for (let i = 0; i < 20; i++) {
            expect(await page.getDepartmentText(i)).toBe('(department_' + i + ')');
        }

        // employee's email
        for (let i = 0; i < 20; i++) {
            expect(await page.getEmailText(i)).toBe('employee_' + i + '@business.com');
        }

        // employee's ID
        for (let i = 0; i < 20; i++) {
            expect(await page.getEmployeeIDNumber(i)).toBe(i.toString());
        }

    });

    it('should react to clicking on the loadOnScroll checkbox', async () => {

        // unchecking
        await page.clickOnLoadOnScroll();
        expect(await page.confirmLoadOnScrollIsChecked()).toBeFalsy();

        // checking
        await page.clickOnLoadOnScroll();
        expect(await page.confirmLoadOnScrollIsChecked()).toBeTruthy();

    });

    it('should display more employees when the LOAD MORE button is clicked', async () => {

        await page.clickOnLoadOnScroll();

        // default number of visible employees
        expect(await page.getNumberOfEmployees()).toEqual(20);

        // scroll down
        await page.hoverOverLastEmployee();
        expect(await page.getNumberOfEmployees()).toEqual(20);

        // click on button
        await page.loadMoreButton.click();
        expect(await page.getNumberOfEmployees()).toEqual(40);

        // scroll down
        await page.hoverOverLastEmployee();
        expect(await page.getNumberOfEmployees()).toEqual(40);

        // click on button
        await page.loadMoreButton.click();
        expect(await page.getNumberOfEmployees()).toEqual(60);

    });

    it('should display the LOAD MORE button when appropriate', async () => {

        // visible when loadOnScroll is unchecked
        await page.clickOnLoadOnScroll();
        expect(await page.confirmLoadMoreIsVisible()).toBeTruthy();

        // not visible when loadOnScroll is checked
        await page.clickOnLoadOnScroll();
        expect(await page.confirmLoadMoreIsVisible()).toBeFalsy();

        // not visible when all employees are on the list
        await page.clickOnLoadOnScroll();
        await page.clickOnPageSize();
        await page.getPageSize().clear();
        await page.getPageSize().sendKeys('10'); // 110
        expect(await page.confirmLoadMoreIsVisible()).toBeTruthy();
        await page.loadMoreButton.click();
        expect(await page.getNumberOfEmployees()).toEqual(111);
        expect(await page.confirmLoadMoreIsVisible()).toBeFalsy();

    });

    it('should display more employees when scrolling down', async () => {

        await page.hoverOverLastEmployee();
        expect(await page.getNumberOfEmployees()).toEqual(40);
        await page.hoverOverLastEmployee();
        expect(await page.getNumberOfEmployees()).toEqual(60);
        await page.hoverOverLastEmployee();
        expect(await page.getNumberOfEmployees()).toEqual(80);

    });

    it('should be possible to change the page size', async () => {

        // increase page size by 1
        await page.clickOnIncrementPageSize(); // 21
        expect(await page.getNumberOfEmployees()).toEqual(21);
        await page.hoverOverLastEmployee();
        expect(await page.getNumberOfEmployees()).toEqual(42);

        // decrease page size by 2
        await page.clickOnDecrementPageSize();
        await page.clickOnDecrementPageSize(); // 19
        expect(await page.getNumberOfEmployees()).toEqual(19);
        await page.hoverOverLastEmployee();
        expect(await page.getNumberOfEmployees()).toEqual(38);

        // change page size to 39
        await page.clickOnPageSize();
        await page.getPageSize().sendKeys(Key.DELETE);
        await page.getPageSize().sendKeys('3'); // 39
        expect(await page.getNumberOfEmployees()).toEqual(39);
        await page.hoverOverLastEmployee();
        expect(await page.getNumberOfEmployees()).toEqual(78);
        await page.hoverOverLastEmployee();
        expect(await page.getNumberOfEmployees()).toEqual(111);

    });

    it('should be possible to filter employees using entered text', async () => {

        // no match
        await page.filter.click();
        await page.filter.sendKeys('-');
        expect(await page.getNumberOfEmployees()).toEqual(0);

        // upper case
        await page.filter.clear();
        await page.filter.sendKeys('Y');
        expect(await page.getEmployeeText(0)).toBe('employee_0');
        expect(await page.getEmployeeText(1)).toBe('employee_1');
        expect(await page.getEmployeeText(19)).toBe('employee_19');

        // names starting with input
        await page.filter.clear();
        await page.filter.sendKeys('e');
        expect(await page.getEmployeeText(0)).toBe('employee_0');
        expect(await page.getEmployeeText(1)).toBe('employee_1');
        expect(await page.getEmployeeText(19)).toBe('employee_19');

        // names containing input
        await page.filter.clear();
        await page.filter.sendKeys('_1');
        expect(await page.getEmployeeText(0)).toBe('employee_1');
        expect(await page.getEmployeeText(1)).toBe('employee_10');
        expect(await page.getEmployeeText(19)).toBe('employee_108');

    });

    it('should be possible to us filtering and page sizing simultaneously', async () => {

        // use filter when loadOnScroll is checked
        await page.filter.sendKeys('0');
        expect(await page.getNumberOfEmployees()).toEqual(20);
        expect(await page.getEmployeeText(0)).toBe('employee_0');
        expect(await page.getEmployeeText(1)).toBe('employee_10');
        expect(await page.getEmployeeText(19)).toBe('employee_109');

        // scroll down
        await page.hoverOverLastEmployee();
        expect(await page.getNumberOfEmployees()).toEqual(21);
        expect(await page.getEmployeeText(20)).toBe('employee_110');

        // uncheck loadOnScroll
        await page.clickOnLoadOnScroll();

        // set page size to 2
        await page.clickOnPageSize();
        await page.getPageSize().sendKeys(Key.ARROW_RIGHT);
        await page.getPageSize().sendKeys(Key.DELETE);

        // check employee list
        expect(await page.getNumberOfEmployees()).toEqual(2);
        expect(await page.getEmployeeText(0)).toBe('employee_0');
        expect(await page.getEmployeeText(1)).toBe('employee_10');

        // load more
        await page.loadMoreButton.click();
        expect(await page.getNumberOfEmployees()).toEqual(4);
        expect(await page.getEmployeeText(2)).toBe('employee_20');
        expect(await page.getEmployeeText(3)).toBe('employee_30');

    });
});
