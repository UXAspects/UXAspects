import { $, $$, browser } from 'protractor';

export class DateTimePickerPage {

    header = $('.header-title');
    weekdayColumns = $$('th.weekday');
    dates = $$('.date-button');
    previewDates = $$('.date-button.preview');
    selectedDate = $('.date-button.active');

    changeWeekStartBtn = $('#change-start-of-week');

    getPage(): void {
        browser.get('#/date-time-picker');
    }

    async getWeekdayOrder(): Promise<string[]> {
        return await this.weekdayColumns.map<string>(element => element.getText());
    }

    async getPositionOfSelectedDate(): Promise<number> {
        const dates: string[] = await this.dates.map<string>(element => element.getText());
        const selected: string = await this.selectedDate.getText();

        return dates.indexOf(selected);
    }
}