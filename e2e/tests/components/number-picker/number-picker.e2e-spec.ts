import { NumberPickerPage } from './number-picker.po.spec';

describe('Number Picker Tests', () => {

  let page: NumberPickerPage;

  beforeEach(() => {
    page = new NumberPickerPage();
    page.getPage();
  });

  it('should have correct initial states', () => {
  
    // Initial values.
    expect(page.numberPicker1.isPresent()).toBeTruthy();
    expect(page.numberPicker1.$('input').isPresent()).toBeTruthy();
    expect<any>(page.getNumberPickerMinimum(page.numberPicker1)).toEqual('-10');
    expect<any>(page.getNumberPickerMaximum(page.numberPicker1)).toEqual('10');
    expect<any>(page.getNumberPickerStep(page.numberPicker1)).toEqual('1');
    expect<any>(page.getNumberPickerValue(page.numberPicker1)).toEqual('0');
    expect(page.confirmUpDownControlIsDisabled(page.numberPicker1, 'up')).toBeFalsy();
    expect(page.confirmUpDownControlIsDisabled(page.numberPicker1, 'down')).toBeFalsy();
    expect(page.confirmErrorMessage1IsVisible()).toBeFalsy();
    
    expect(page.numberPicker2.isPresent()).toBeTruthy();
    expect(page.numberPicker2.$('input').isPresent()).toBeTruthy();
    expect<any>(page.getNumberPickerMinimum(page.numberPicker2)).toEqual('0');
    expect<any>(page.getNumberPickerMaximum(page.numberPicker2)).toEqual('10');
    expect<any>(page.getNumberPickerStep(page.numberPicker2)).toEqual('0.5');
    expect<any>(page.getNumberPickerValue(page.numberPicker2)).toEqual('0');
    expect(page.confirmUpDownControlIsDisabled(page.numberPicker2, 'up')).toBeFalsy();
    expect(page.confirmUpDownControlIsDisabled(page.numberPicker2, 'down')).toBeTruthy();
    expect(page.confirmErrorMessage2IsVisible()).toBeFalsy();
    
  });
  
  it('should allow changes to the value by clicking', () => {
      
    // Number Picker 1
    page.incrementNumberPickerValue(page.numberPicker1);
    expect<any>(page.getNumberPickerValue(page.numberPicker1)).toEqual('1');
    page.incrementNumberPickerValue(page.numberPicker1);
    page.incrementNumberPickerValue(page.numberPicker1);
    page.incrementNumberPickerValue(page.numberPicker1);
    expect<any>(page.getNumberPickerValue(page.numberPicker1)).toEqual('4');
    page.decrementNumberPickerValue(page.numberPicker1);
    page.decrementNumberPickerValue(page.numberPicker1);
    page.decrementNumberPickerValue(page.numberPicker1);
    page.decrementNumberPickerValue(page.numberPicker1);
    page.decrementNumberPickerValue(page.numberPicker1);
    page.decrementNumberPickerValue(page.numberPicker1);
    expect<any>(page.getNumberPickerValue(page.numberPicker1)).toEqual('-2');
    page.incrementNumberPickerValue(page.numberPicker1);
    page.incrementNumberPickerValue(page.numberPicker1);
    page.incrementNumberPickerValue(page.numberPicker1);
    expect<any>(page.getNumberPickerValue(page.numberPicker1)).toEqual('1');
      
    // Number Picker 2
    page.incrementNumberPickerValue(page.numberPicker2);
    expect<any>(page.getNumberPickerValue(page.numberPicker2)).toEqual('0.5');
    page.incrementNumberPickerValue(page.numberPicker2);
    page.incrementNumberPickerValue(page.numberPicker2);
    page.incrementNumberPickerValue(page.numberPicker2);
    expect<any>(page.getNumberPickerValue(page.numberPicker2)).toEqual('2');
    page.decrementNumberPickerValue(page.numberPicker2);
    page.decrementNumberPickerValue(page.numberPicker2);
    page.decrementNumberPickerValue(page.numberPicker2);
    expect<any>(page.getNumberPickerValue(page.numberPicker2)).toEqual('0.5');
    page.decrementNumberPickerValue(page.numberPicker2);
    expect<any>(page.getNumberPickerValue(page.numberPicker2)).toEqual('0');
      
  });
  
  it('should allow changes to the value by text entry', () => {
      
    // Number Picker 1
    page.setNumberPickerValue(page.numberPicker1, '5');
    expect<any>(page.getNumberPickerValue(page.numberPicker1)).toEqual('5');
    page.setNumberPickerValue(page.numberPicker1, '10');
    expect<any>(page.getNumberPickerValue(page.numberPicker1)).toEqual('10');
    page.setNumberPickerValue(page.numberPicker1, '-10');
    expect<any>(page.getNumberPickerValue(page.numberPicker1)).toEqual('-10');
    page.setNumberPickerValue(page.numberPicker1, '15');
    expect<any>(page.getNumberPickerValue(page.numberPicker1)).toEqual('15');

    // Number Picker 2
    page.setNumberPickerValue(page.numberPicker1, '5');
    expect<any>(page.getNumberPickerValue(page.numberPicker1)).toEqual('5');
    page.setNumberPickerValue(page.numberPicker1, '15');
    expect<any>(page.getNumberPickerValue(page.numberPicker1)).toEqual('15');
    page.setNumberPickerValue(page.numberPicker1, '-10');
    expect<any>(page.getNumberPickerValue(page.numberPicker1)).toEqual('-10');
      
  });
  
  it('should display an error is the minimum limit is breached', () => {
      
    // Number Picker 1
    page.setNumberPickerValue(page.numberPicker1, '-11');
    expect(page.confirmErrorMessage1IsVisible()).toBeTruthy();

    // Number Picker 2
    page.setNumberPickerValue(page.numberPicker2, '-0.5');
    expect(page.confirmErrorMessage2IsVisible()).toBeTruthy();
      
  });
  
  it('should display an error is the maximum limit is breached', () => {
      
    // Number Picker 1
    page.setNumberPickerValue(page.numberPicker1, '11');
    expect(page.confirmErrorMessage1IsVisible()).toBeTruthy();

    // Number Picker 2
    page.setNumberPickerValue(page.numberPicker2, '10.5');
    expect(page.confirmErrorMessage2IsVisible()).toBeTruthy();
      
  });
  
  it('should prevent changes by clicking if the minimum limit has been reached', () => {
      
    // Number Picker 1
    page.setNumberPickerValue(page.numberPicker1, '-9');
    page.decrementNumberPickerValue(page.numberPicker1);
    expect(page.confirmUpDownControlIsDisabled(page.numberPicker1, 'up')).toBeFalsy();
    expect(page.confirmUpDownControlIsDisabled(page.numberPicker1, 'down')).toBeTruthy();

    // Number Picker 2
    page.setNumberPickerValue(page.numberPicker2, '0.5');
    page.decrementNumberPickerValue(page.numberPicker2);
    expect(page.confirmUpDownControlIsDisabled(page.numberPicker2, 'up')).toBeFalsy();
    expect(page.confirmUpDownControlIsDisabled(page.numberPicker2, 'down')).toBeTruthy();
      
  });
  
  it('should prevent changes by clicking if the maximum limit has been reached', () => {
      
    // Number Picker 1
    page.setNumberPickerValue(page.numberPicker1, '9');
    page.incrementNumberPickerValue(page.numberPicker1);
    expect(page.confirmUpDownControlIsDisabled(page.numberPicker1, 'up')).toBeTruthy();
    expect(page.confirmUpDownControlIsDisabled(page.numberPicker1, 'down')).toBeFalsy();

    // Number Picker 2
    page.setNumberPickerValue(page.numberPicker2, '9.5');
    page.incrementNumberPickerValue(page.numberPicker2);
    expect(page.confirmUpDownControlIsDisabled(page.numberPicker2, 'up')).toBeTruthy();
    expect(page.confirmUpDownControlIsDisabled(page.numberPicker2, 'down')).toBeFalsy();
      
  });
});