import { imageCompare } from '../common/image-compare';
import { DateTimePickerPage } from './date-time-picker.po.spec';

describe('Date Time Picker Tests', () => {

    let page: DateTimePickerPage;

    beforeEach(async () => {
        page = new DateTimePickerPage();
        await page.getPage();
    });

    it('should have correct initial states', async () => {
        // expect the correct header
        expect((await page.header.getText()).toLocaleLowerCase()).toBe('january 2019');

        // expect the correct date to be selected
        expect(await page.selectedDate.getText()).toBe('3');

        // expect there to be the correct number of days in the month
        expect(await page.dates.count()).toBe(35);
        expect(await page.previewDates.count()).toBe(4);

        // expect the headers to be Sun -> Sat
        expect(await page.getWeekdayOrder()).toEqual(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);

        // it should have the correct date selected
        expect(await page.getCurrentDate()).toBe('January 3, 2019, 12:00:00 PM');

        // the previous and next header buttons should not be disabled
        expect(await page.getDisabled(page.previousHeaderBtn)).toBe(false);
        expect(await page.getDisabled(page.nextHeaderBtn)).toBe(false);

        // check that the today button is not disabled
        expect(await page.getDisabled(page.todayBtn)).toBe(false);

        expect(await imageCompare('date-picker-initial')).toEqual(0);
    });

    it('should select a valid date on click', async () => {

        // get a valid date element
        const date = await page.getDate('8');

        // click the date
        await date.click();

        // check if it now has the active class
        const classes = await date.getAttribute('class');

        expect(classes.indexOf('active')).toBeGreaterThan(-1);

        // it should have the correct date selected
        expect(await page.getCurrentDate()).toBe('January 8, 2019, 12:00:00 PM');

        expect(await imageCompare('date-picker-select')).toEqual(0);
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

    it('should allow minimum and maximum dates to be set', async () => {
        // set the min and max values
        await page.setMinAndMax();

        // check that the invalid dates are disabled
        expect(await page.getDisabled(await page.getDate('30', true))).toBe(true);
        expect(await page.getDisabled(await page.getDate('31', true))).toBe(true);
        expect(await page.getDisabled(await page.getDate('1', false))).toBe(true);
        expect(await page.getDisabled(await page.getDate('29', false))).toBe(true);
        expect(await page.getDisabled(await page.getDate('30', false))).toBe(true);
        expect(await page.getDisabled(await page.getDate('31', false))).toBe(true);
        expect(await page.getDisabled(await page.getDate('1', true))).toBe(true);
        expect(await page.getDisabled(await page.getDate('2', true))).toBe(true);

        // check if the header buttons are disabled
        expect(await page.getDisabled(page.previousHeaderBtn)).toBe(true);
        expect(await page.getDisabled(page.nextHeaderBtn)).toBe(true);

        // check if the today button is disabled (it should be as today is not a valid date)
        expect(await page.getDisabled(page.todayBtn)).toBe(true);

        // we should not be able to select a disabled date
        const date = await page.getDate('1');

        // click the date
        await date.click();

        // check if it now has the active class
        const classes = await date.getAttribute('class');

        expect(classes.indexOf('active')).toBe(-1);

        // it should have the correct date selected
        expect(await page.getCurrentDate()).toBe('January 3, 2019, 12:00:00 PM');

        // go to month view
        await page.header.click();

        // check if the header buttons are disabled
        expect(await page.getDisabled(page.previousHeaderBtn)).toBe(true);
        expect(await page.getDisabled(page.nextHeaderBtn)).toBe(true);

        // check the correct buttons are disabled
        expect(await page.getDisabled(await page.getCalendarItem('Jan'))).toBe(false);
        expect(await page.getDisabled(await page.getCalendarItem('Feb'))).toBe(true);
        expect(await page.getDisabled(await page.getCalendarItem('Mar'))).toBe(true);
        expect(await page.getDisabled(await page.getCalendarItem('Apr'))).toBe(true);
        expect(await page.getDisabled(await page.getCalendarItem('May'))).toBe(true);
        expect(await page.getDisabled(await page.getCalendarItem('Jun'))).toBe(true);
        expect(await page.getDisabled(await page.getCalendarItem('Jul'))).toBe(true);
        expect(await page.getDisabled(await page.getCalendarItem('Aug'))).toBe(true);
        expect(await page.getDisabled(await page.getCalendarItem('Sep'))).toBe(true);
        expect(await page.getDisabled(await page.getCalendarItem('Oct'))).toBe(true);
        expect(await page.getDisabled(await page.getCalendarItem('Nov'))).toBe(true);
        expect(await page.getDisabled(await page.getCalendarItem('Dec'))).toBe(true);

        // go to year view
        await page.header.click();

        // check if the header buttons are disabled
        expect(await page.getDisabled(page.previousHeaderBtn)).toBe(true);
        expect(await page.getDisabled(page.nextHeaderBtn)).toBe(true);

        // check the correct buttons are disabled
        expect(await page.getDisabled(await page.getCalendarItem('2010'))).toBe(true);
        expect(await page.getDisabled(await page.getCalendarItem('2011'))).toBe(true);
        expect(await page.getDisabled(await page.getCalendarItem('2012'))).toBe(true);
        expect(await page.getDisabled(await page.getCalendarItem('2013'))).toBe(true);
        expect(await page.getDisabled(await page.getCalendarItem('2014'))).toBe(true);
        expect(await page.getDisabled(await page.getCalendarItem('2015'))).toBe(true);
        expect(await page.getDisabled(await page.getCalendarItem('2016'))).toBe(true);
        expect(await page.getDisabled(await page.getCalendarItem('2017'))).toBe(true);
        expect(await page.getDisabled(await page.getCalendarItem('2018'))).toBe(true);
        expect(await page.getDisabled(await page.getCalendarItem('2019'))).toBe(false);

    });
});