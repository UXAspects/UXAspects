import { browser, element, by, ElementFinder } from 'protractor';


export class DateTimePickerPage {
        
    getPage(): void {
        browser.get('/date-time-picker');
    }
    
    todayBtn = element(by.className('now-button'));
    numberPicker1 = element(by.id('numberPicker1'));
    numberPicker2 = element(by.id('numberPicker2'));

    async getTodayButtonText(): Promise<string> {
        return new Promise<string>((resolve) => {
            this.todayBtn.getText().then(result => {
                resolve(result);
            });
        });
    }

    getNumberPickerMinimum(numberPicker: ElementFinder) {
        return numberPicker.getAttribute('min').then(function(min: string) {
            return min;
        });
    }
    
    getNumberPickerMaximum(numberPicker: ElementFinder) {
        return numberPicker.getAttribute('max').then(function(max: string) {
            return max;
        });
    }
    
    getNumberPickerStep(numberPicker: ElementFinder) {
        return numberPicker.getAttribute('step').then(function(step: string) {
            if (step) {
                return step;
            } else {
                return '1';
            }
        });
    }
    
    getNumberPickerValue(numberPicker: ElementFinder) {
        return numberPicker.$('input').getAttribute('value').then(function(value: string) {
            return value;
        });
    }
    
    confirmNumberPickerClassExists(item: ElementFinder, soughtClass: string) {
        return item.getAttribute('class').then(function(classes: string) {
            var allClasses = classes.split(' ');
            if (allClasses.indexOf(soughtClass) > -1) {
                return true;
            } else {
                return false;
            }
        });
    }
    
    confirmUpDownControlIsDisabled(numberPicker: ElementFinder, direction: string) {
        var arrow;
        if (direction === 'up') {
            arrow = numberPicker.$('div.number-picker-controls').$('div.number-picker-control-up');
        } else {
            arrow = numberPicker.$('div.number-picker-controls').$('div.number-picker-control-down');
        }
        return this.confirmNumberPickerClassExists(arrow, 'disabled');
    }
    
    setNumberPickerValue(numberPicker: ElementFinder, value: string) {
        numberPicker.$('input').clear();
        numberPicker.$('input').sendKeys(value);
    }
    
    incrementNumberPickerValue(numberPicker: ElementFinder) {
        numberPicker.$('div.number-picker-controls').$('div.number-picker-control-up').$('span').click();
    }
    
    decrementNumberPickerValue(numberPicker: ElementFinder) {
        numberPicker.$('div.number-picker-controls').$('div.number-picker-control-down').$('span').click();
    }
    
    confirmErrorMessage1IsVisible() {
        return this.root.$('p#errorMessage1').isPresent();
    }
    
    confirmErrorMessage2IsVisible() {
        return this.root.$('p#errorMessage2').isPresent();
    }
}

