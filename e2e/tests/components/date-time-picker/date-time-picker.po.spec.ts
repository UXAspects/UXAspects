import { $, $$, browser, ElementFinder } from 'protractor';

export class DateTimePickerPage {

    header = $('.header-title');
    weekdayColumns = $$('th.weekday');
    dates = $$('.date-button');
    calendarItems = $$('.calendar-item');
    previewDates = $$('.date-button.preview');
    selectedDate = $('.date-button.active');
    todayBtn = $('.now-button');
    currentDate = $('#current-date');

    changeWeekStartBtn = $('#change-start-of-week');
    setMinAndMaxBtn = $('#set-limits');

    headerButtons = $$('.header-navigation');
    previousHeaderBtn = this.headerButtons.get(0);
    nextHeaderBtn = this.headerButtons.get(1);

    getPage(): void {
        browser.get('#/date-time-picker');
    }

    async getCurrentDate(): Promise<string> {
        return await this.currentDate.getAttribute('innerText');
    }

    async getWeekdayOrder(): Promise<string[]> {
        return await this.weekdayColumns.map<string>(element => element.getText());
    }

    async getPositionOfSelectedDate(): Promise<number> {
        const dates: string[] = await this.dates.map<string>(element => element.getText());
        const selected: string = await this.selectedDate.getText();

        return dates.indexOf(selected);
    }

    async setMinAndMax(): Promise<void> {
        return this.setMinAndMaxBtn.click();
    }

    async getDisabled(element: ElementFinder): Promise<boolean> {
        return await element.getAttribute('disabled') === 'true';
    }

    async getDate(day: string, isPreview: boolean = false): Promise<ElementFinder> {
        for (const date of await this.dates) {
            const text = await date.getAttribute('innerText');
            const classes = await date.getAttribute('class');

            if (!isPreview && classes.indexOf('preview') === -1 && day === text) {
                return date;
            }

            if (isPreview && classes.indexOf('preview') !== -1 && day === text) {
                return date;
            }
        }
    }

    async getCalendarItem(item: string): Promise<ElementFinder> {
        for (const date of await this.calendarItems) {
            const text = await date.getAttribute('innerText');

            if (item === text) {
                return date;
            }
        }
    }
}