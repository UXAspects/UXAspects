import { browser, Key } from 'protractor';
import { InfiniteScrollPage } from './infinite-scroll.po.spec';

describe('Infinite Scroll Tests', () => {

  let page: InfiniteScrollPage;
  let browserName: string;

  beforeEach(() => {
    page = new InfiniteScrollPage();
    page.getPage();
    
    browser.getCapabilities().then(function(caps) {
        browserName = caps.get('browserName');
    });
  });

  it('should have correct initial states', () => {
    
    // panel hidden
    expect(page.confirmCustomizeExamplePanelIsExpanded()).toBeFalsy();
    
    // 20 visible employees
    expect<any>(page.getNumberOfEmployees()).toEqual(20);
    
    // loadMore not visible
    expect(page.confirmLoadMoreIsVisible()).toBeFalsy();
    
    // loadOnScroll checked
    page.clickOnCustomizeExamplePanel();
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
 
  it('should expand/hide panel on click', () => {
    
    page.clickOnCustomizeExamplePanel();
    expect(page.confirmCustomizeExamplePanelIsExpanded()).toBeTruthy();
    page.clickOnCustomizeExamplePanel();
    expect(page.confirmCustomizeExamplePanelIsExpanded()).toBeFalsy();
    
  });
 
  it('should react to clicking on the loadOnScroll checkbox', () => {
    
    // unchecking
    page.clickOnCustomizeExamplePanel();
    page.clickOnLoadOnScroll();
    expect(page.confirmLoadOnScrollIsChecked()).toBeFalsy();
    
    // checking
    page.clickOnLoadOnScroll();
    expect(page.confirmLoadOnScrollIsChecked()).toBeTruthy();
    
  });
 
  it('should display more employees when the LOAD MORE button is clicked', () => {
    
    page.clickOnCustomizeExamplePanel();
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
    page.clickOnCustomizeExamplePanel();
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
    page.clickOnCustomizeExamplePanel();
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
 
  it('should have min and max page size values', () => {
    
    page.clickOnCustomizeExamplePanel();
    page.clickOnLoadOnScroll();

    // min - clearing box
    page.getPageSize().clear(); // 1
    expect<any>(page.getNumberOfEmployees()).toEqual(1);

    // min - using arrows
    page.clickOnIncrementPageSize();
    page.clickOnDecrementPageSize(); // 1
    expect<any>(page.getNumberOfEmployees()).toEqual(1);

    // min - entering a value
    page.clickOnPageSize();
    page.getPageSize().sendKeys('1');
    page.getPageSize().sendKeys(Key.DELETE); // 1
    expect<any>(page.getNumberOfEmployees()).toEqual(1);    

    // max - entering a value
    page.clickOnPageSize();
    page.getPageSize().sendKeys(Key.ARROW_RIGHT);
    page.getPageSize().sendKeys('000'); // 1000
    expect<any>(page.getNumberOfEmployees()).toEqual(111);

    // max - using arrows
    page.clickOnDecrementPageSize();
    page.clickOnIncrementPageSize(); // 1000
    expect<any>(page.getNumberOfEmployees()).toEqual(111);
    
  });
 
  it('should disable arrow buttons when appropriate', () => {
    
    page.clickOnCustomizeExamplePanel();
    page.clickOnPageSize();

    // disable arrow up
    page.getPageSize().sendKeys('100');
    page.getPageSize().sendKeys(Key.DELETE); // 1000
    expect(page.confirmPageSizeButtonIsDisabled('up')).toBeTruthy();
    expect(page.confirmPageSizeButtonIsDisabled('down')).toBeFalsy();

    // disable arrow down
    page.getPageSize().clear(); // 1
    expect(page.confirmPageSizeButtonIsDisabled('up')).toBeFalsy();
    expect(page.confirmPageSizeButtonIsDisabled('down')).toBeTruthy();

    // enable both
    page.clickOnIncrementPageSize(); // 1
    expect(page.confirmPageSizeButtonIsDisabled('up')).toBeFalsy();
    expect(page.confirmPageSizeButtonIsDisabled('down')).toBeFalsy();
    
  });
 
  it('should warn the user when the page size value is outside of boundaries', () => {
    
    page.clickOnCustomizeExamplePanel();

    // deceed minimum
    page.clickOnPageSize();
    page.getPageSize().clear();
    page.getPageSize().sendKeys(Key.ARROW_LEFT);
    page.getPageSize().sendKeys('0');
    page.getPageSize().sendKeys(Key.DELETE); // 0
    expect(page.confirmValueIsInvalid()).toBeTruthy();

    // reset value
    page.clickOnIncrementPageSize(); // 1
    expect(page.confirmValueIsInvalid()).toBeFalsy();
    
    // exceed maximum
    page.clickOnPageSize();
    page.getPageSize().sendKeys(100); // 1001
    expect(page.confirmValueIsInvalid()).toBeTruthy();

    // reset value
    page.clickOnDecrementPageSize(); // 1000
    expect(page.confirmValueIsInvalid()).toBeFalsy();

    // null
    page.getPageSize().clear();
    page.getPageSize().sendKeys(Key.BACK_SPACE); // 0
    expect(page.confirmValueIsInvalid()).toBeTruthy();
    
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
    page.clickOnCustomizeExamplePanel();
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