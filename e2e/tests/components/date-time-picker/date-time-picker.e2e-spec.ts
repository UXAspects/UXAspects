import { browser, Key, protractor, element, by } from 'protractor';
import { DateTimePickerPage, HeaderType } from './date-time-picker.po.spec';

describe('Date Time Picker Tests', () => {

    let page: DateTimePickerPage;
    let browserName: string;

    beforeEach(() => {
        page = new DateTimePickerPage();
        page.getPage();
    });

    it('should have correct initial states', () => {

        // Initial values.
        expect(page.dateTimePicker.isPresent()).toBeTruthy();
        expect(page.currentDate.isPresent()).toBeTruthy();
        expect<any>(page.getTodayButtonText()).toBe('Today');
        expect<any>(page.getSelectedDay()).toBe(page.day.toString());
        expect<any>(page.getSelectedMonth()).toBe(page.monthNames[page.month]);
        expect<any>(page.getSelectedYear()).toBe(page.year.toString());
        expect<any>(page.getSelectedHour()).toBe(page.hours.toString());
        expect<any>(page.getSelectedMinute()).toBe(page.minutes.toString());        
        expect<any>(page.initialTimezone.getText()).toBe('GMT');
        
    });

    it('should allow changes to the value by clicking', () => {

        // Date Time Picker
        page.incrementHeaderNavigation(HeaderType.Month, 2);
        expect<any>(page.getSelectedMonth()).toBe(page.monthNames[page.month]);

        page.decrementHeaderNavigation(HeaderType.Month, 4);
        expect<any>(page.getSelectedMonth()).toBe(page.monthNames[page.month]);   
        
        page.incrementHour();
        // expected hour?
        
        page.decrementHour();
        // expected hour?

        // TODO send keys to hour input box to check upper limit, i.e. 12


        // expect<any>(page.getSelectedHour()).toBe((page.hours + 1).toString());
        
        // page.headerTitle.click();
        // page.incrementHeaderNavigation(4);
        // expect<any>(page.getSelectedYear()).toBe((year + 4).toString());

        // expect<any>(page.getFeb()).toBe('Feb');
        // page.monthViewFeb.click();
        // expect<any>(page.getSelectedMonth()).toBe('February');

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