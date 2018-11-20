import { PaginationPage } from './pagination.po.spec';

describe('Pagination Tests', () => {

  let page: PaginationPage;

  beforeEach(() => {
    page = new PaginationPage();
    page.getPage();
  });

  it('should have correct initial states', () => {
      
    // button states
    expect(page.confirmButtonIsDisabled(page.getButton(0))).toBeTruthy();
    expect(page.confirmButtonIsActive(page.getButton(1))).toBeTruthy();
    expect(page.confirmButtonIsActive(page.getButton(2))).toBeFalsy();
    expect(page.confirmButtonIsActive(page.getButton(3))).toBeFalsy();
    expect(page.confirmButtonIsActive(page.getButton(4))).toBeFalsy();
    expect(page.confirmButtonIsActive(page.getButton(5))).toBeFalsy();
    expect(page.confirmButtonIsDisabled(page.getButton(6))).toBeFalsy();

    // button numbers
    expect<any>(page.getButton(1).getText()).toBe('1');
    expect<any>(page.getButton(2).getText()).toBe('2');
    expect<any>(page.getButton(3).getText()).toBe('3');
    expect<any>(page.getButton(4).getText()).toBe('4');
    expect<any>(page.getButton(5).getText()).toBe('5');
    
    // page number
    expect<any>(page.text.getText()).toBe('Page 1 of 10');
    
  });

  it('should react to arrow clicks', () => {
      
    page.clickButton(6);
    page.clickButton(6);
    page.clickButton(6);
    expect(page.confirmButtonIsActive(page.getButton(1))).toBeFalsy();
    expect(page.confirmButtonIsActive(page.getButton(2))).toBeFalsy();
    expect(page.confirmButtonIsActive(page.getButton(3))).toBeTruthy();
    expect(page.confirmButtonIsActive(page.getButton(4))).toBeFalsy();
    expect(page.confirmButtonIsActive(page.getButton(5))).toBeFalsy();
    expect<any>(page.text.getText()).toBe('Page 4 of 10');
    
    page.clickButton(0);
    page.clickButton(0);
    expect(page.confirmButtonIsActive(page.getButton(1))).toBeFalsy();
    expect(page.confirmButtonIsActive(page.getButton(2))).toBeTruthy();
    expect(page.confirmButtonIsActive(page.getButton(3))).toBeFalsy();
    expect(page.confirmButtonIsActive(page.getButton(4))).toBeFalsy();
    expect(page.confirmButtonIsActive(page.getButton(5))).toBeFalsy();
    expect<any>(page.text.getText()).toBe('Page 2 of 10');
    
  });

  it('should react to numbered button clicks', () => {
      
    page.clickButton(2);
    expect(page.confirmButtonIsActive(page.getButton(1))).toBeFalsy();
    expect(page.confirmButtonIsActive(page.getButton(2))).toBeTruthy();
    expect(page.confirmButtonIsActive(page.getButton(3))).toBeFalsy();
    expect(page.confirmButtonIsActive(page.getButton(4))).toBeFalsy();
    expect(page.confirmButtonIsActive(page.getButton(5))).toBeFalsy();
    expect<any>(page.text.getText()).toBe('Page 2 of 10');

    page.clickButton(1);
    expect(page.confirmButtonIsActive(page.getButton(1))).toBeTruthy();
    expect(page.confirmButtonIsActive(page.getButton(2))).toBeFalsy();
    expect(page.confirmButtonIsActive(page.getButton(3))).toBeFalsy();
    expect(page.confirmButtonIsActive(page.getButton(4))).toBeFalsy();
    expect(page.confirmButtonIsActive(page.getButton(5))).toBeFalsy();
    expect<any>(page.text.getText()).toBe('Page 1 of 10');

    page.clickButton(3);
    page.clickButton(5);
    page.clickButton(4);
    expect(page.confirmButtonIsActive(page.getButton(1))).toBeFalsy();
    expect(page.confirmButtonIsActive(page.getButton(2))).toBeFalsy();
    expect(page.confirmButtonIsActive(page.getButton(3))).toBeTruthy();
    expect(page.confirmButtonIsActive(page.getButton(4))).toBeFalsy();
    expect(page.confirmButtonIsActive(page.getButton(5))).toBeFalsy();
    expect<any>(page.text.getText()).toBe('Page 6 of 10');
    
  });

  it('should disable arrow buttons when appropriate', () => {
      
    page.clickButton(2);
    page.clickButton(1);
    expect(page.confirmButtonIsDisabled(page.getButton(0))).toBeTruthy();
    expect(page.confirmButtonIsDisabled(page.getButton(6))).toBeFalsy();

    page.clickButton(5);
    page.clickButton(5);
    page.clickButton(5);
    page.clickButton(5);
    expect(page.confirmButtonIsDisabled(page.getButton(0))).toBeFalsy();
    expect(page.confirmButtonIsDisabled(page.getButton(6))).toBeTruthy();
    
  });

  it('should move the selected number to the centre when possible', () => {
      
    // page 2
    page.clickButton(2);
    expect<any>(page.getButton(1).getText()).toBe('1');
    expect<any>(page.getButton(2).getText()).toBe('2');
    expect<any>(page.getButton(3).getText()).toBe('3');
    expect<any>(page.getButton(4).getText()).toBe('4');
    expect<any>(page.getButton(5).getText()).toBe('5');
    
    // page 3
    page.clickButton(3);
    expect<any>(page.getButton(1).getText()).toBe('1');
    expect<any>(page.getButton(2).getText()).toBe('2');
    expect<any>(page.getButton(3).getText()).toBe('3');
    expect<any>(page.getButton(4).getText()).toBe('4');
    expect<any>(page.getButton(5).getText()).toBe('5');
    
    // page 4
    page.clickButton(4);
    expect<any>(page.getButton(1).getText()).toBe('2');
    expect<any>(page.getButton(2).getText()).toBe('3');
    expect<any>(page.getButton(3).getText()).toBe('4');
    expect<any>(page.getButton(4).getText()).toBe('5');
    expect<any>(page.getButton(5).getText()).toBe('6');
    
    // page 6
    page.clickButton(5);
    expect<any>(page.getButton(1).getText()).toBe('4');
    expect<any>(page.getButton(2).getText()).toBe('5');
    expect<any>(page.getButton(3).getText()).toBe('6');
    expect<any>(page.getButton(4).getText()).toBe('7');
    expect<any>(page.getButton(5).getText()).toBe('8');
    
    // page 8
    page.clickButton(5);
    expect<any>(page.getButton(1).getText()).toBe('6');
    expect<any>(page.getButton(2).getText()).toBe('7');
    expect<any>(page.getButton(3).getText()).toBe('8');
    expect<any>(page.getButton(4).getText()).toBe('9');
    expect<any>(page.getButton(5).getText()).toBe('10');
    
    // page 10
    page.clickButton(5);
    expect<any>(page.getButton(1).getText()).toBe('6');
    expect<any>(page.getButton(2).getText()).toBe('7');
    expect<any>(page.getButton(3).getText()).toBe('8');
    expect<any>(page.getButton(4).getText()).toBe('9');
    expect<any>(page.getButton(5).getText()).toBe('10');
    
    // page 9
    page.clickButton(4);
    expect<any>(page.getButton(1).getText()).toBe('6');
    expect<any>(page.getButton(2).getText()).toBe('7');
    expect<any>(page.getButton(3).getText()).toBe('8');
    expect<any>(page.getButton(4).getText()).toBe('9');
    expect<any>(page.getButton(5).getText()).toBe('10');
    
    // page 6
    page.clickButton(1);
    expect<any>(page.getButton(1).getText()).toBe('4');
    expect<any>(page.getButton(2).getText()).toBe('5');
    expect<any>(page.getButton(3).getText()).toBe('6');
    expect<any>(page.getButton(4).getText()).toBe('7');
    expect<any>(page.getButton(5).getText()).toBe('8');
    
  });
});