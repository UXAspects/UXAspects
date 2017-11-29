import { browser, element, by, ElementFinder, $$ } from 'protractor';


export class DateTimePickerPage {

    getPage(): void {
        browser.get('/date-time-picker');
    }

    date: Date = new Date();
    hours = this.date.getHours();
    minutes = this.date.getMinutes();
    day = this.date.getDate();
    month = this.date.getMonth();
    year = this.date.getFullYear();
    monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    dateTimePicker = element(by.id('date-time-picker'));
    todayBtn = element(by.className('now-button'));
    currentDate = element(by.id('current-date'));
    selectedDay = element(by.css('.date-cell.active'));
    selectedMonthYear = element(by.css('.header-title.active'));

    initialTimezone = element(by.className('time-zone'));
    headerTitle = element(by.className('header-title'));
    incrementHeader = element(by.className('hpe-next'));
    decrementHeader = element(by.className('hpe-previous'));

    timePicker = element(by.css('time-picker'));
    timePickerInputs = $$('.bs-timepicker-field');
    timePickerIncrements = $$('.bs-chevron-up');
    timePickerDecrements = $$('.bs-chevron-down');  

    hourPicker = this.timePickerInputs.get(0);
    hourPickerIncrement = this.timePickerIncrements.get(0);
    hourPickerDecrement = this.timePickerDecrements.get(0);

    minutePicker = this.timePickerInputs.get(1);
    minutePickerIncrement = this.timePickerIncrements.get(1);
    minutePickerDecrement = this.timePickerDecrements.get(1);

    timezonePicker = this.timePickerInputs.get(2);
    timezonePickerIncrement = this.timePickerIncrements.get(2);
    timezonePickerDecrement = this.timePickerDecrements.get(2);
    
   
    // monthViewFeb = element(by.css('.calendar-row:first-child .calendar-item:nth-child(2)'));


    incrementHour() {
        this.hourPickerIncrement.click();
    }

    decrementHour() {
        this.hourPickerDecrement.click();
    }

    incrementMinutes() {
        this.minutePickerIncrement.click();
    }

    decrementMinutes() {
        this.minutePickerDecrement.click();
    }

    incrementTimezone() {
        this.timezonePickerIncrement.click();        
    }

    decrementTimeZone() {
        this.timezonePickerDecrement.click(); 
    }

    incrementHeaderNavigation(headerType: HeaderType, increment: number) {

        for (let i = 0; i < increment; i++) {
            this.incrementHeader.click();

            switch (headerType) {

                case HeaderType.Month:
                    this.month++;

                    if (this.month % 12) {
                        this.month = 0;
                    }

                    break;

                case HeaderType.Year:
                    break;

                case HeaderType.YearGroup:
                    break;
            }
        }


    }

    decrementHeaderNavigation(headerType: HeaderType, decrement: number) {
        for (let i = 0; i < decrement; i++) {
            this.decrementHeader.click();

            switch (headerType) {
                
                case HeaderType.Month:
                    this.month--;

                    if (this.month === -1) {
                        this.month = 11;
                    }

                    break;

                case HeaderType.Year:
                    break;

                case HeaderType.YearGroup:
                    break;
            }
        }
    }

    // getFeb(): Promise<string> {
    //     return new Promise<string>((resolve) => {
    //         this.monthViewFeb.getText().then(result => {
    //             resolve(result);
    //         });
    //     });
    // }

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

    getSelectedHour(): Promise<string> {
        return new Promise<string>((resolve) => {
            this.hourPicker.getAttribute('value').then(result => {
                resolve(result);
            });
        });
    }

    getSelectedMinute(): Promise<string> {
        return new Promise<string>((resolve) => {
            this.minutePicker.getAttribute('value').then(result => {
                resolve(result);
            });
        });
    }

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

export enum HeaderType {
    Month,
    Year,
    YearGroup
}