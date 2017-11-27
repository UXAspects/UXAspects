import { browser, Key, protractor, element, by } from 'protractor';
import { DateTimePickerPage } from './date-time-picker.po.spec';

describe('Date Time Picker Tests', () => {

    let page: DateTimePickerPage;
    let browserName: string;

    beforeEach(() => {
        page = new DateTimePickerPage();
        page.getPage();
    });

    it('should have correct initial states', () => {

        let date: Date = new Date();
        let day = date.getDate().toString();
        let month = date.getMonth().toString();
        let year = date.getFullYear().toString();
        let monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
        
        // Initial values.
        expect(page.dateTimePicker.isPresent()).toBeTruthy();
        expect(page.currentDate.isPresent()).toBeTruthy();
        expect<any>(page.getTodayButtonText()).toBe('Today');
        expect<any>(page.getSelectedDay()).toBe(day);
        expect<any>(page.getSelectedMonth()).toBe(monthNames[month]);
        expect<any>(page.getSelectedYear()).toBe(year);
        expect<any>(page.initialTimezone.getText()).toBe('GMT');
        
    });

    it('should allow changes to the value by clicking', () => {

        // Date Time Picker
        page.headerTitle.click();

  //   // Number Picker 1
  //   page.incrementNumberPickerValue(page.numberPicker1);
  //   expect<any>(page.getNumberPickerValue(page.numberPicker1)).toEqual('1');
  //   page.incrementNumberPickerValue(page.numberPicker1);
  //   page.incrementNumberPickerValue(page.numberPicker1);
  //   page.incrementNumberPickerValue(page.numberPicker1);
  //   expect<any>(page.getNumberPickerValue(page.numberPicker1)).toEqual('4');
  //   page.decrementNumberPickerValue(page.numberPicker1);
  //   page.decrementNumberPickerValue(page.numberPicker1);
  //   page.decrementNumberPickerValue(page.numberPicker1);
  //   page.decrementNumberPickerValue(page.numberPicker1);
  //   page.decrementNumberPickerValue(page.numberPicker1);
  //   page.decrementNumberPickerValue(page.numberPicker1);
  //   expect<any>(page.getNumberPickerValue(page.numberPicker1)).toEqual('-2');
  //   page.incrementNumberPickerValue(page.numberPicker1);
  //   page.incrementNumberPickerValue(page.numberPicker1);
  //   page.incrementNumberPickerValue(page.numberPicker1);
  //   expect<any>(page.getNumberPickerValue(page.numberPicker1)).toEqual('1');

    });

  // it('should allow changes to the value by text entry', () => {

  //   // Number Picker 1
  //   page.setNumberPickerValue(page.numberPicker1, '5');
  //   expect<any>(page.getNumberPickerValue(page.numberPicker1)).toEqual('5');
  //   page.setNumberPickerValue(page.numberPicker1, '10');
  //   expect<any>(page.getNumberPickerValue(page.numberPicker1)).toEqual('10');
  //   page.setNumberPickerValue(page.numberPicker1, '-10');
  //   expect<any>(page.getNumberPickerValue(page.numberPicker1)).toEqual('-10');
  //   page.setNumberPickerValue(page.numberPicker1, '15');
  //   expect<any>(page.getNumberPickerValue(page.numberPicker1)).toEqual('15');

  //   // Number Picker 2
  //   page.setNumberPickerValue(page.numberPicker1, '5');
  //   expect<any>(page.getNumberPickerValue(page.numberPicker1)).toEqual('5');
  //   page.setNumberPickerValue(page.numberPicker1, '15');
  //   expect<any>(page.getNumberPickerValue(page.numberPicker1)).toEqual('15');
  //   page.setNumberPickerValue(page.numberPicker1, '-10');
  //   expect<any>(page.getNumberPickerValue(page.numberPicker1)).toEqual('-10');

  // });

  // it('should display an error is the minimum limit is breached', () => {

  //   // Number Picker 1
  //   page.setNumberPickerValue(page.numberPicker1, '-11');
  //   expect(page.confirmErrorMessage1IsVisible()).toBeTruthy();

  //   // Number Picker 2
  //   page.setNumberPickerValue(page.numberPicker2, '-0.5');
  //   expect(page.confirmErrorMessage2IsVisible()).toBeTruthy();

  // });

  // it('should display an error is the maximum limit is breached', () => {

  //   // Number Picker 1
  //   page.setNumberPickerValue(page.numberPicker1, '11');
  //   expect(page.confirmErrorMessage1IsVisible()).toBeTruthy();

  //   // Number Picker 2
  //   page.setNumberPickerValue(page.numberPicker2, '10.5');
  //   expect(page.confirmErrorMessage2IsVisible()).toBeTruthy();

  // });

  // it('should prevent changes by clicking if the minimum limit has been reached', () => {

  //   // Number Picker 1
  //   page.setNumberPickerValue(page.numberPicker1, '-9');
  //   page.decrementNumberPickerValue(page.numberPicker1);
  //   expect(page.confirmUpDownControlIsDisabled(page.numberPicker1, 'up')).toBeFalsy();
  //   expect(page.confirmUpDownControlIsDisabled(page.numberPicker1, 'down')).toBeTruthy();

  //   // Number Picker 2
  //   page.setNumberPickerValue(page.numberPicker2, '0.5');
  //   page.decrementNumberPickerValue(page.numberPicker2);
  //   expect(page.confirmUpDownControlIsDisabled(page.numberPicker2, 'up')).toBeFalsy();
  //   expect(page.confirmUpDownControlIsDisabled(page.numberPicker2, 'down')).toBeTruthy();

  // });

  // it('should prevent changes by clicking if the maximum limit has been reached', () => {

  //   // Number Picker 1
  //   page.setNumberPickerValue(page.numberPicker1, '9');
  //   page.incrementNumberPickerValue(page.numberPicker1);
  //   expect(page.confirmUpDownControlIsDisabled(page.numberPicker1, 'up')).toBeTruthy();
  //   expect(page.confirmUpDownControlIsDisabled(page.numberPicker1, 'down')).toBeFalsy();

  //   // Number Picker 2
  //   page.setNumberPickerValue(page.numberPicker2, '9.5');
  //   page.incrementNumberPickerValue(page.numberPicker2);
  //   expect(page.confirmUpDownControlIsDisabled(page.numberPicker2, 'up')).toBeTruthy();
  //   expect(page.confirmUpDownControlIsDisabled(page.numberPicker2, 'down')).toBeFalsy();

  // });
});