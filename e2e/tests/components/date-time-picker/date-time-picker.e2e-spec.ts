import { DateTimePickerPage } from './date-time-picker.po.spec';

describe('Date Time Picker Tests', () => {

    let page: DateTimePickerPage;

    beforeEach(() => {
        page = new DateTimePickerPage();
        page.getPage();
    });

    it('should have correct initial states', async () => {
        // expect the correct header
        expect(await page.header.getText()).toBe('January 2019');

        // expect the correct date to be selected
        expect(await page.selectedDate.getText()).toBe('3');

        // expect there to be the correct number of days in the month
        expect(await page.dates.count()).toBe(35);
        expect(await page.previewDates.count()).toBe(4);

        // expect the headers to be Sun -> Sat
        expect(await page.getWeekdayOrder()).toEqual(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
    });

    it('should allow changing the startOfWeek', async () => {

        // expect the headers to be Sun -> Sat
        expect(await page.getWeekdayOrder()).toEqual(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
        expect(await page.getPositionOfSelectedDate()).toBe(4);

        // change the start of the week
        await page.changeWeekStartBtn.click();

        // expect the headers to be Mon -> Sun
        expect(await page.getWeekdayOrder()).toEqual(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
        expect(await page.getPositionOfSelectedDate()).toBe(3);

        // change the start of the week
        await page.changeWeekStartBtn.click();

        // expect the headers to be Tue -> Mon
        expect(await page.getWeekdayOrder()).toEqual(['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon']);
        expect(await page.getPositionOfSelectedDate()).toBe(2);

        // change the start of the week
        await page.changeWeekStartBtn.click();

        // expect the headers to be Wed -> Tue
        expect(await page.getWeekdayOrder()).toEqual(['Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue']);
        expect(await page.getPositionOfSelectedDate()).toBe(8);

        // change the start of the week
        await page.changeWeekStartBtn.click();

        // expect the headers to be Thu -> Wed
        expect(await page.getWeekdayOrder()).toEqual(['Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed']);
        expect(await page.getPositionOfSelectedDate()).toBe(7);

        // change the start of the week
        await page.changeWeekStartBtn.click();

        // expect the headers to be Fri -> Thu
        expect(await page.getWeekdayOrder()).toEqual(['Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu']);
        expect(await page.getPositionOfSelectedDate()).toBe(6);

        // change the start of the week
        await page.changeWeekStartBtn.click();

        // expect the headers to be Sat -> Fri
        expect(await page.getWeekdayOrder()).toEqual(['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
        expect(await page.getPositionOfSelectedDate()).toBe(5);

    });
});