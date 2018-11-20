import { Key } from 'protractor';
import { InfiniteScrollPage } from './infinite-scroll.po.spec';

describe('Infinite Scroll Tests', () => {

  let page: InfiniteScrollPage;

  beforeEach(() => {
    page = new InfiniteScrollPage();
    page.getPage();
  });

  it('should have correct initial states', () => {

    // 20 visible employees
    expect<any>(page.getNumberOfEmployees()).toEqual(20);

    // loadMore not visible
    expect(page.confirmLoadMoreIsVisible()).toBeFalsy();

    // loadOnScroll checked
    expect(page.confirmLoadOnScrollIsChecked()).toBeTruthy();

    // arrows enabled
    expect(page.confirmPageSizeButtonIsDisabled('up')).toBeFalsy();
    expect(page.confirmPageSizeButtonIsDisabled('down')).toBeFalsy();

    // valid value in number picker
    expect(page.confirmValueIsInvalid()).toBeFalsy();

  });

  it('should display correct text for employee details', () => {

    // employee's name
    for (var i = 0; i < 20; i++) {
      expect<any>(page.getEmployeeText(i)).toBe('employee_' + i);
    }

    // employee's department
    for (i = 0; i < 20; i++) {
      expect<any>(page.getDepartmentText(i)).toBe('(department_' + i + ')');
    }

    // employee's email
    for (i = 0; i < 20; i++) {
      expect<any>(page.getEmailText(i)).toBe('employee_' + i + '@business.com');
    }

    // employee's ID
    for (i = 0; i < 20; i++) {
      expect<any>(page.getEmployeeIDNumber(i)).toBe(i.toString());
    }

  });

  it('should react to clicking on the loadOnScroll checkbox', () => {

    // unchecking
    page.clickOnLoadOnScroll();
    expect(page.confirmLoadOnScrollIsChecked()).toBeFalsy();

    // checking
    page.clickOnLoadOnScroll();
    expect(page.confirmLoadOnScrollIsChecked()).toBeTruthy();

  });

  it('should display more employees when the LOAD MORE button is clicked', () => {

    page.clickOnLoadOnScroll();

    // default number of visible employees
    expect<any>(page.getNumberOfEmployees()).toEqual(20);

    // scroll down
    page.hoverOverLastEmployee();
    expect<any>(page.getNumberOfEmployees()).toEqual(20);

    // click on button
    page.loadMoreButton.click();
    expect<any>(page.getNumberOfEmployees()).toEqual(40);

    // scroll down
    page.hoverOverLastEmployee();
    expect<any>(page.getNumberOfEmployees()).toEqual(40);

    // click on button
    page.loadMoreButton.click();
    expect<any>(page.getNumberOfEmployees()).toEqual(60);

  });

  it('should display the LOAD MORE button when appropriate', () => {

    // visible when loadOnScroll is unchecked
    page.clickOnLoadOnScroll();
    expect(page.confirmLoadMoreIsVisible()).toBeTruthy();

    // not visible when loadOnScroll is checked
    page.clickOnLoadOnScroll();
    expect(page.confirmLoadMoreIsVisible()).toBeFalsy();

    // not visible when all employees are on the list
    page.clickOnLoadOnScroll();
    page.clickOnPageSize();
    page.getPageSize().clear();
    page.getPageSize().sendKeys('10'); // 110
    expect(page.confirmLoadMoreIsVisible()).toBeTruthy();
    page.loadMoreButton.click();
    expect<any>(page.getNumberOfEmployees()).toEqual(111);
    expect(page.confirmLoadMoreIsVisible()).toBeFalsy();

  });

  it('should display more employees when scrolling down', () => {

    page.hoverOverLastEmployee();
    expect<any>(page.getNumberOfEmployees()).toEqual(40);
    page.hoverOverLastEmployee();
    expect<any>(page.getNumberOfEmployees()).toEqual(60);
    page.hoverOverLastEmployee();
    expect<any>(page.getNumberOfEmployees()).toEqual(80);

  });

  it('should be possible to change the page size', () => {

    // increase page size by 1
    page.clickOnIncrementPageSize(); // 21
    expect<any>(page.getNumberOfEmployees()).toEqual(21);
    page.hoverOverLastEmployee();
    expect<any>(page.getNumberOfEmployees()).toEqual(42);

    // decrease page size by 2
    page.clickOnDecrementPageSize();
    page.clickOnDecrementPageSize(); // 19
    expect<any>(page.getNumberOfEmployees()).toEqual(19);
    page.hoverOverLastEmployee();
    expect<any>(page.getNumberOfEmployees()).toEqual(38);

    // change page size to 39
    page.clickOnPageSize();
    page.getPageSize().sendKeys(Key.DELETE);
    page.getPageSize().sendKeys('3'); // 39
    expect<any>(page.getNumberOfEmployees()).toEqual(39);
    page.hoverOverLastEmployee();
    expect<any>(page.getNumberOfEmployees()).toEqual(78);
    page.hoverOverLastEmployee();
    expect<any>(page.getNumberOfEmployees()).toEqual(111);

  });

  it('should be possible to filter employees using entered text', () => {

    // no match
    page.filter.click();
    page.filter.sendKeys('-');
    expect<any>(page.getNumberOfEmployees()).toEqual(0);

    // upper case
    page.filter.clear();
    page.filter.sendKeys('Y');
    expect<any>(page.getEmployeeText(0)).toBe('employee_0');
    expect<any>(page.getEmployeeText(1)).toBe('employee_1');
    expect<any>(page.getEmployeeText(19)).toBe('employee_19');

    // names starting with input
    page.filter.clear();
    page.filter.sendKeys('e');
    expect<any>(page.getEmployeeText(0)).toBe('employee_0');
    expect<any>(page.getEmployeeText(1)).toBe('employee_1');
    expect<any>(page.getEmployeeText(19)).toBe('employee_19');

    // names containing input
    page.filter.clear();
    page.filter.sendKeys('_1');
    expect<any>(page.getEmployeeText(0)).toBe('employee_1');
    expect<any>(page.getEmployeeText(1)).toBe('employee_10');
    expect<any>(page.getEmployeeText(19)).toBe('employee_108');

  });

  it('should be possible to us filtering and page sizing simultaneously', () => {

    // use filter when loadOnScroll is checked
    page.filter.sendKeys('0');
    expect<any>(page.getNumberOfEmployees()).toEqual(20);
    expect<any>(page.getEmployeeText(0)).toBe('employee_0');
    expect<any>(page.getEmployeeText(1)).toBe('employee_10');
    expect<any>(page.getEmployeeText(19)).toBe('employee_109');

    // scroll down
    page.hoverOverLastEmployee();
    expect<any>(page.getNumberOfEmployees()).toEqual(21);
    expect<any>(page.getEmployeeText(20)).toBe('employee_110');

    // uncheck loadOnScroll
    page.clickOnLoadOnScroll();

    // set page size to 2
    page.clickOnPageSize();
    page.getPageSize().sendKeys(Key.ARROW_RIGHT);
    page.getPageSize().sendKeys(Key.DELETE);

    // check employee list
    expect<any>(page.getNumberOfEmployees()).toEqual(2);
    expect<any>(page.getEmployeeText(0)).toBe('employee_0');
    expect<any>(page.getEmployeeText(1)).toBe('employee_10');

    // load more
    page.loadMoreButton.click();
    expect<any>(page.getNumberOfEmployees()).toEqual(4);
    expect<any>(page.getEmployeeText(2)).toBe('employee_20');
    expect<any>(page.getEmployeeText(3)).toBe('employee_30');

  });
});
