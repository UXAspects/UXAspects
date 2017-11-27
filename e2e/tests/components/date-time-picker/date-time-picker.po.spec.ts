import { browser, element, by, ElementFinder } from 'protractor';


export class DateTimePickerPage {
        
    getPage(): void {
        browser.get('/date-time-picker');
    }
    
    dateTimePicker = element(by.id('date-time-picker'));
    todayBtn = element(by.className('now-button'));
    currentDate = element(by.id('current-date'));
    selectedDay = element(by.css('.date-cell.active'));
    selectedMonthYear = element(by.css('.header-title.active'));
    initialTimezone = element(by.className('time-zone'));
    headerTitle = element(by.className('header-title'));

    getTodayButtonText(): Promise<string> {
        return new Promise<string>((resolve) => {
            this.todayBtn.getText().then(result => {
                resolve(result);
            });
        });
    }

    getSelectedDay(): Promise<string> {
        return new Promise<string>((resolve) => {
            this.selectedDay.getText().then(result => {
                resolve(result);
            });
        });
    }

    getSelectedMonth(): Promise<string> {
        return new Promise<string>((resolve) => {
            this.selectedMonthYear.getText().then(result => {
                resolve(result.substring(0, result.indexOf(' ')));
            });
        });
    }

    getSelectedYear(): Promise<string> {
        return new Promise<string>((resolve) => {
            this.selectedMonthYear.getText().then(result => {
                resolve(result.slice(-4));
            });
        });
    }

    // async getDatePickerInitialDate(dateTimePicker: ElementFinder): Promise<string> {
    //     return new Promise<string>((resolve) => {
    //         dateTimePicker.getAttribute('date').then((date: string) => {
    //             resolve(date);
    //         });
    //     });
    // }

    // getDatePickerInitialDate(dateTimePicker: ElementFinder) {
    //     return dateTimePicker.getAttribute('date').then((date: string) => {
    //         return date;
    //     });
    // }

    // getNumberPickerMinimum(numberPicker: ElementFinder) {
    //     return numberPicker.getAttribute('min').then(function(min: string) {
    //         return min;
    //     });
    // }
    
    // getNumberPickerMaximum(numberPicker: ElementFinder) {
    //     return numberPicker.getAttribute('max').then(function(max: string) {
    //         return max;
    //     });
    // }
    
    // getNumberPickerStep(numberPicker: ElementFinder) {
    //     return numberPicker.getAttribute('step').then(function(step: string) {
    //         if (step) {
    //             return step;
    //         } else {
    //             return '1';
    //         }
    //     });
    // }
    
    // getNumberPickerValue(numberPicker: ElementFinder) {
    //     return numberPicker.$('input').getAttribute('value').then(function(value: string) {
    //         return value;
    //     });
    // }
    
    // confirmNumberPickerClassExists(item: ElementFinder, soughtClass: string) {
    //     return item.getAttribute('class').then(function(classes: string) {
    //         var allClasses = classes.split(' ');
    //         if (allClasses.indexOf(soughtClass) > -1) {
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     });
    // }
    
    // confirmUpDownControlIsDisabled(numberPicker: ElementFinder, direction: string) {
    //     var arrow;
    //     if (direction === 'up') {
    //         arrow = numberPicker.$('div.number-picker-controls').$('div.number-picker-control-up');
    //     } else {
    //         arrow = numberPicker.$('div.number-picker-controls').$('div.number-picker-control-down');
    //     }
    //     return this.confirmNumberPickerClassExists(arrow, 'disabled');
    // }
    
    // setNumberPickerValue(numberPicker: ElementFinder, value: string) {
    //     numberPicker.$('input').clear();
    //     numberPicker.$('input').sendKeys(value);
    // }
    
    // incrementNumberPickerValue(numberPicker: ElementFinder) {
    //     numberPicker.$('div.number-picker-controls').$('div.number-picker-control-up').$('span').click();
    // }
    
    // decrementNumberPickerValue(numberPicker: ElementFinder) {
    //     numberPicker.$('div.number-picker-controls').$('div.number-picker-control-down').$('span').click();
    // }
    
    // confirmErrorMessage1IsVisible() {
    //     return this.root.$('p#errorMessage1').isPresent();
    // }
    
    // confirmErrorMessage2IsVisible() {
    //     return this.root.$('p#errorMessage2').isPresent();
    // }
}

