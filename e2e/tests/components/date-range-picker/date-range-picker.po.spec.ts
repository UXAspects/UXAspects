import { $, browser, ElementFinder } from 'protractor';

export class DateRangePickerPage {

    input = $('#date-range-input');
    dateRangePicker = $('ux-date-range-picker');

    getPage(): void {
        browser.get('#/date-range-picker');
    }

    async getPicker(picker: Picker): Promise<ElementFinder> {
        const pickers = await this.dateRangePicker.$$('ux-date-time-picker');
        return picker === Picker.Start ? pickers[0] : pickers[1];
    }

    async getInputText(): Promise<string> {
        return await this.input.getAttribute('value');
    }

    async setInputText(value: string): Promise<void> {
        await this.input.setAttribute('value', value);
    }

    async getRangeStart(picker: Picker): Promise<string> {
        const pickerElement = await this.getPicker(picker);
        return await pickerElement.$('.range-start').getAttribute('innerText');
    }

    async getRange(picker: Picker): Promise<string[]> {
        const pickerElement = await this.getPicker(picker);
        const elements: ElementFinder[] = await pickerElement.$$('.range-between');
        const dates: string[] = [];

        for (let idx = 0; idx < elements.length; idx++) {
            const element = elements[idx];
            dates.push(await element.getAttribute('innerText'));
        }

        return dates;
    }

    async getDisabled(picker: Picker): Promise<string[]> {
        const pickerElement = await this.getPicker(picker);
        const elements: ElementFinder[] = await pickerElement.$$('.date-button');
        const dates: string[] = [];

        for (let idx = 0; idx < elements.length; idx++) {
            const element = elements[idx];
            const date = await element.getAttribute('innerText');
            const disabled = await element.getAttribute('disabled');

            if (disabled) {
                dates.push(date);
            }
        }

        return dates;
    }

    async getRangeEnd(picker: Picker): Promise<string> {
        const pickerElement = await this.getPicker(picker);
        return await pickerElement.$('.range-end').getAttribute('innerText');
    }

    async getPickerDateHeader(picker: Picker): Promise<string> {
        const headers = await this.dateRangePicker.$$('.date-header');

        // it will only be 1 if only 1 date is selected
        if (headers.length === 2) {
            return await headers[picker === Picker.Start ? 0 : 1].getAttribute('innerText');
        } else if (headers.length === 1) {
            return await headers[0].getAttribute('innerText');
        }
    }

    async getPickerTimeHeader(picker: Picker): Promise<string> {
        const headers = await this.dateRangePicker.$$('.time-header');
        return await headers[picker === Picker.Start ? 0 : 1].getAttribute('innerText');
    }

    async getPickerDuration(): Promise<string> {
        return await this.dateRangePicker.$('.duration').getAttribute('innerText');
    }

    async selectDate(picker: Picker, date: number): Promise<void> {
        const pickerElement = await this.getPicker(picker);
        const elements: ElementFinder[] = await pickerElement.$$('.date-button');

        for (let idx = 0; idx < elements.length; idx++) {
            const button = elements[idx];
            const label = await button.getAttribute('innerText');
            const classes = await button.getAttribute('class');

            if (label === date.toString() && classes.indexOf('preview') === -1) {
                return button.click();
            }
        }
    }

    async incrementHour(picker: Picker): Promise<void> {
        const pickerElement = await this.getPicker(picker);
        const spinners = await pickerElement.$$('ux-spin-button');
        const spinner = spinners[0];
        const buttons = await spinner.$$('.spin-button');
        return buttons[0].click();
    }

    async decrementHour(picker: Picker): Promise<void> {
        const pickerElement = await this.getPicker(picker);
        const spinners = await pickerElement.$$('ux-spin-button');
        const spinner = spinners[0];
        const buttons = await spinner.$$('.spin-button');
        return buttons[1].click();
    }

    async incrementMinute(picker: Picker): Promise<void> {
        const pickerElement = await this.getPicker(picker);
        const spinners = await pickerElement.$$('ux-spin-button');
        const spinner = spinners[1];
        const buttons = await spinner.$$('.spin-button');
        return buttons[0].click();
    }

    async decrementMinute(picker: Picker): Promise<void> {
        const pickerElement = await this.getPicker(picker);
        const spinners = await pickerElement.$$('ux-spin-button');
        const spinner = spinners[1];
        const buttons = await spinner.$$('.spin-button');
        return buttons[1].click();
    }

    async incrementTimezone(picker: Picker): Promise<void> {
        const pickerElement = await this.getPicker(picker);
        const spinner = await pickerElement.$('.time-zone-spinner');
        const buttons = await spinner.$$('.spin-button');
        return buttons[0].click();
    }

    async decrementTimezone(picker: Picker): Promise<void> {
        const pickerElement = await this.getPicker(picker);
        const spinner = await pickerElement.$('.time-zone-spinner');
        const buttons = await spinner.$$('.spin-button');
        return buttons[1].click();
    }
}

export enum Picker {
    Start,
    End
}