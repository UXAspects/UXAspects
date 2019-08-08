import { browser, by, element, ElementFinder } from 'protractor';

export class NumberPickerPage {

    root = element(by.id('root'));
    numberPicker1 = element(by.id('numberPicker1'));
    numberPicker2 = element(by.id('numberPicker2'));

    getPage(): void {
        browser.get('#/number-picker');
    }

    async getNumberPickerMinimum(numberPicker: ElementFinder): Promise<string> {
        return await numberPicker.getAttribute('min');
    }

    async getNumberPickerMaximum(numberPicker: ElementFinder): Promise<string> {
        return await numberPicker.getAttribute('max');
    }

    async getNumberPickerStep(numberPicker: ElementFinder): Promise<string> {
        return await numberPicker.getAttribute('step') || '1';
    }

    async getNumberPickerValue(numberPicker: ElementFinder): Promise<any> {
        return await numberPicker.$('input').getAttribute('value');
    }

    async confirmNumberPickerClassExists(item: ElementFinder, soughtClass: string): Promise<boolean> {
        const classes = await item.getAttribute('class');
        return classes.split(' ').indexOf(soughtClass) > -1;
    }

    async confirmUpDownControlIsDisabled(numberPicker: ElementFinder, direction: string): Promise<boolean> {
        let arrow;

        if (direction === 'up') {
            arrow = numberPicker.$('div.number-picker-controls').$('div.number-picker-control-up');
        } else {
            arrow = numberPicker.$('div.number-picker-controls').$('div.number-picker-control-down');
        }

        return await this.confirmNumberPickerClassExists(arrow, 'disabled');
    }

    async setNumberPickerValue(numberPicker: ElementFinder, value: string): Promise<void> {
        await numberPicker.$('input').clear();
        await numberPicker.$('input').sendKeys(value);
    }

    async incrementNumberPickerValue(numberPicker: ElementFinder): Promise<void> {
        await numberPicker.$('div.number-picker-controls').$('div.number-picker-control-up').click();
    }

    async decrementNumberPickerValue(numberPicker: ElementFinder): Promise<void> {
        await numberPicker.$('div.number-picker-controls').$('div.number-picker-control-down').click();
    }

    async confirmErrorMessage1IsVisible(): Promise<boolean> {
        return await this.root.$('p#errorMessage1').isPresent();
    }

    async confirmErrorMessage2IsVisible(): Promise<boolean> {
        return await this.root.$('p#errorMessage2').isPresent();
    }
}

