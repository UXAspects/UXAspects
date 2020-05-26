import { imageCompare } from '../common/image-compare';
import { DateRangePickerPage, Picker } from './date-range-picker.po.spec';

describe('Date Range Picker Tests', () => {

    let page: DateRangePickerPage;

    beforeEach(async () => {
        page = new DateRangePickerPage();
        await page.getPage();
    });

    it('should have correct initial states', async () => {

        // check the headers
        expect(await page.getPickerDateHeader(Picker.Start)).toBe('4 March 2019');
        expect(await page.getPickerTimeHeader(Picker.Start)).toBe('12:00 AM');
        expect(await page.getPickerDateHeader(Picker.End)).toBe('21 March 2019');
        expect(await page.getPickerTimeHeader(Picker.End)).toBe('11:59 PM');
        expect(await page.getPickerDuration()).toBe('18 days');

        // check the selected range
        expect(await page.getRangeStart(Picker.Start)).toBe('4');
        expect(await page.getRangeStart(Picker.End)).toBe('4');
        expect(await page.getRangeEnd(Picker.Start)).toBe('21');
        expect(await page.getRangeEnd(Picker.End)).toBe('21');
        expect(await page.getRange(Picker.Start)).toEqual(['5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']);
        expect(await page.getRange(Picker.End)).toEqual(['5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']);

        expect(await imageCompare('date-range-initial')).toEqual(0);
    });

    it('should change the start date when click a date in the left panel', async () => {
        await page.selectDate(Picker.Start, 2);
        expect(await page.getPickerDateHeader(Picker.Start)).toBe('2 March 2019');
        expect(await page.getPickerTimeHeader(Picker.Start)).toBe('12:00 AM');
        expect(await page.getPickerDuration()).toBe('20 days');
        expect(await page.getRangeStart(Picker.Start)).toBe('2');
        expect(await page.getRangeStart(Picker.End)).toBe('2');
        expect(await page.getRangeEnd(Picker.Start)).toBe('21');
        expect(await page.getRangeEnd(Picker.End)).toBe('21');
        expect(await page.getRange(Picker.Start)).toEqual(['3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']);
        expect(await page.getRange(Picker.End)).toEqual(['3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']);

        expect(await imageCompare('date-range-left-select')).toEqual(0);
    });

    it('should change the end date when click a date in the right panel', async () => {
        await page.selectDate(Picker.End, 8);
        expect(await page.getPickerDateHeader(Picker.Start)).toBe('4 March 2019');
        expect(await page.getPickerTimeHeader(Picker.Start)).toBe('12:00 AM');
        expect(await page.getPickerDateHeader(Picker.End)).toBe('8 March 2019');
        expect(await page.getPickerTimeHeader(Picker.End)).toBe('11:59 PM');
        expect(await page.getPickerDuration()).toBe('5 days');
        expect(await page.getRangeStart(Picker.Start)).toBe('4');
        expect(await page.getRangeStart(Picker.End)).toBe('4');
        expect(await page.getRangeEnd(Picker.Start)).toBe('8');
        expect(await page.getRangeEnd(Picker.End)).toBe('8');
        expect(await page.getRange(Picker.Start)).toEqual(['5', '6', '7']);
        expect(await page.getRange(Picker.End)).toEqual(['5', '6', '7']);

        expect(await imageCompare('date-range-right-select')).toEqual(0);
    });

    it('should clear if start date is selected after end date', async () => {
        await page.selectDate(Picker.Start, 22);
        expect(await page.getPickerDateHeader(Picker.Start)).toBe('22 March 2019');
        expect(await page.getPickerTimeHeader(Picker.Start)).toBe('12:00 AM');
        expect(await page.getRangeStart(Picker.Start)).toBe('22');
        expect(await page.getRange(Picker.Start)).toEqual([]);
    });

    it('should clear if end date is selected before start date', async () => {
        await page.selectDate(Picker.End, 3);
        expect(await page.getPickerDateHeader(Picker.End)).toBe('3 March 2019');
        expect(await page.getPickerTimeHeader(Picker.End)).toBe('11:59 PM');
        expect(await page.getRangeEnd(Picker.End)).toBe('3');
        expect(await page.getRange(Picker.End)).toEqual([]);
    });

    it('should clear if end date is selected before start date', async () => {
        await page.selectDate(Picker.End, 3);
        expect(await page.getPickerDateHeader(Picker.End)).toBe('3 March 2019');
        expect(await page.getPickerTimeHeader(Picker.End)).toBe('11:59 PM');
        expect(await page.getRangeEnd(Picker.End)).toBe('3');
        expect(await page.getRange(Picker.End)).toEqual([]);
    });

    it('should toggle when clicking the range start date', async () => {
        await page.selectDate(Picker.Start, 4);
        expect(await page.getPickerDateHeader(Picker.End)).toBe('21 March 2019');
        expect(await page.getPickerTimeHeader(Picker.End)).toBe('11:59 PM');
        expect(await page.getRangeEnd(Picker.End)).toBe('21');
    });

    it('should toggle when clicking the range end date', async () => {
        await page.selectDate(Picker.End, 21);
        expect(await page.getPickerDateHeader(Picker.Start)).toBe('4 March 2019');
        expect(await page.getPickerTimeHeader(Picker.Start)).toBe('12:00 AM');
        expect(await page.getRangeStart(Picker.Start)).toBe('4');
    });

    it('should disabled items before the start range', async () => {
        await page.selectDate(Picker.End, 21);
        expect(await page.getDisabled(Picker.End)).toEqual(['24', '25', '26', '27', '28', '1', '2', '3']);
        expect(await imageCompare('date-range-disabled')).toEqual(0);
    });

    it('should disabled items after the end range', async () => {
        await page.selectDate(Picker.Start, 4);
        expect(await page.getDisabled(Picker.Start)).toEqual(['22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '1', '2', '3', '4', '5', '6']);
    });

    it('should emit the date on date start change', async () => {
        await page.selectDate(Picker.Start, 2);
        expect(await page.getInputText()).toBe(`2 March 2019  12:00 AM GMT — 21 March 2019  11:59 PM GMT`);
    });

    it('should emit the date on date end change', async () => {
        await page.selectDate(Picker.End, 25);
        expect(await page.getInputText()).toBe(`4 March 2019  12:00 AM GMT — 25 March 2019  11:59 PM GMT`);
    });

    it('should emit on hour change', async () => {
        await page.incrementHour(Picker.Start);
        await page.incrementHour(Picker.End);

        expect(await page.getInputText()).toBe(`4 March 2019  1:00 AM GMT — 21 March 2019  12:59 AM GMT`);

        await page.decrementHour(Picker.Start);
        await page.decrementHour(Picker.End);

        expect(await page.getInputText()).toBe(`4 March 2019  12:00 AM GMT — 21 March 2019  11:59 PM GMT`);
    });

    it('should emit on minute change', async () => {
        await page.incrementMinute(Picker.Start);
        await page.incrementMinute(Picker.End);

        expect(await page.getInputText()).toBe(`4 March 2019  12:01 AM GMT — 21 March 2019  12:00 AM GMT`);

        await page.decrementMinute(Picker.Start);
        await page.decrementMinute(Picker.End);

        expect(await page.getInputText()).toBe(`4 March 2019  12:00 AM GMT — 21 March 2019  11:59 PM GMT`);
    });

    it('should emit on timezone change', async () => {

        await page.incrementTimezone(Picker.Start);
        expect(await page.getInputText()).toBe(`4 March 2019  12:00 AM GMT+1 — 21 March 2019  11:59 PM GMT`);

        await page.incrementTimezone(Picker.End);
        expect(await page.getInputText()).toBe(`4 March 2019  12:00 AM GMT+1 — 21 March 2019  11:59 PM GMT+1`);

        await page.decrementTimezone(Picker.Start);
        expect(await page.getInputText()).toBe(`4 March 2019  12:00 AM GMT — 21 March 2019  11:59 PM GMT+1`);

        await page.decrementTimezone(Picker.End);
        expect(await page.getInputText()).toBe(`4 March 2019  12:00 AM GMT — 21 March 2019  11:59 PM GMT`);
    });

    it('should update the range end picker on selection when start date is after the visible end month', async () => {
        await page.clear();
        await page.goToPreviousMonth(Picker.End);
        expect((await page.getPickerTitle(Picker.End)).toLocaleLowerCase()).toBe('february 2019');

        // select a date on the start picker
        await page.selectDate(Picker.Start, 6);

        // the range end date should get updated
        expect((await page.getPickerTitle(Picker.End)).toLocaleLowerCase()).toBe('march 2019');
    });

    it('should not update the range end picker on selection when start date is before the visible end month', async () => {
        await page.clear();
        await page.goToNextMonth(Picker.End);
        expect((await page.getPickerTitle(Picker.End)).toLocaleLowerCase()).toBe('april 2019');

        // select a date on the start picker
        await page.selectDate(Picker.Start, 6);

        // the range end date should get updated
        expect((await page.getPickerTitle(Picker.End)).toLocaleLowerCase()).toBe('april 2019');
    });

    it('should update the range start picker on selection when end date is before the visible start month', async () => {
        await page.clear();
        await page.goToPreviousMonth(Picker.Start);
        expect((await page.getPickerTitle(Picker.Start)).toLocaleLowerCase()).toBe('february 2019');

        // select a date on the end picker
        await page.selectDate(Picker.End, 6);

        // the range end date should get updated
        expect((await page.getPickerTitle(Picker.Start)).toLocaleLowerCase()).toBe('february 2019');
    });

    it('should not update the range start picker on selection when end date is after the visible start month', async () => {
        await page.clear();
        await page.goToNextMonth(Picker.Start);
        expect((await page.getPickerTitle(Picker.Start)).toLocaleLowerCase()).toBe('april 2019');

        // select a date on the end picker
        await page.selectDate(Picker.End, 6);

        // the range end date should get updated
        expect((await page.getPickerTitle(Picker.Start)).toLocaleLowerCase()).toBe('march 2019');
    });

    it('should prevent selection outside of the defined min and max values', async () => {
        await page.enableMinAndMax();

        // Update to min and max does not affect existing selection
        expect(await page.getRangeStart(Picker.Start)).toBe('4');
        expect(await page.getRangeStart(Picker.End)).toBe('4');
        expect(await page.getRangeEnd(Picker.Start)).toBe('21');
        expect(await page.getRangeEnd(Picker.End)).toBe('21');

        await page.clear();

        // Dates outside of the min and max should be disabled in both panels
        expect(await page.getDisabled(Picker.Start)).toEqual(['24', '25', '26', '27', '28', '1', '2', '3', '4', '2', '3', '4', '5', '6']);
        expect(await page.getDisabled(Picker.End)).toEqual(['24', '25', '26', '27', '28', '1', '2', '3', '4', '2', '3', '4', '5', '6']);

        // Cannot go to previous month (February) since it has no selectable dates
        await page.goToPreviousMonth(Picker.Start);
        expect((await page.getPickerTitle(Picker.Start)).toLocaleLowerCase()).toBe('march 2019');

        // Move end picker to April
        await page.goToNextMonth(Picker.End);
        expect((await page.getPickerTitle(Picker.End)).toLocaleLowerCase()).toBe('april 2019');
        expect(await page.getDisabled(Picker.End)).toEqual(['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '1', '2', '3', '4']);

        // Cannot go to May since it has no selectable dates
        await page.goToNextMonth(Picker.End);
        expect((await page.getPickerTitle(Picker.End)).toLocaleLowerCase()).toBe('april 2019');

        // Clicking a date earlier that the min date should do nothing
        await page.selectDate(Picker.Start, 4);
        expect(await page.getPickerDateHeader(Picker.Start)).toBeNull();
        expect(await page.getPickerTimeHeader(Picker.Start)).toBe('');

        // Clicking a date later than the min date should select as normal
        await page.selectDate(Picker.Start, 5);
        expect(await page.getPickerDateHeader(Picker.Start)).toBe('5 March 2019');
        expect(await page.getPickerTimeHeader(Picker.Start)).toBe('12:00 AM');

        // Clicking a date later than the max date should do nothing
        await page.selectDate(Picker.End, 2);
        expect(await page.getPickerDateHeader(Picker.End)).toBeNull();
        expect(await page.getPickerTimeHeader(Picker.End)).toBe('');

        // Clicking a date earlier than the max date should select as normal
        await page.selectDate(Picker.End, 1);
        expect(await page.getPickerDateHeader(Picker.End)).toBe('1 April 2019');
        expect(await page.getPickerTimeHeader(Picker.End)).toBe('11:59 PM');

        // Unset min and max
        await page.clear();
        await page.disableMinAndMax();

        // All dates re-enabled
        expect(await page.getDisabled(Picker.Start)).toEqual([]);
        expect(await page.getDisabled(Picker.End)).toEqual([]);

        // Clicking previously disabled dates should now work
        await page.selectDate(Picker.Start, 4);
        expect(await page.getPickerDateHeader(Picker.Start)).toBe('4 March 2019');
        expect(await page.getPickerTimeHeader(Picker.Start)).toBe('12:00 AM');
        await page.selectDate(Picker.End, 2);
        expect(await page.getPickerDateHeader(Picker.End)).toBe('2 April 2019');
        expect(await page.getPickerTimeHeader(Picker.End)).toBe('11:59 PM');

    });

    it('should allow localization to be added to both the date and time', async () => {
        // check the headers
        expect(await page.getPickerDateHeader(Picker.Start)).toBe('4 March 2019');
        expect(await page.getPickerTimeHeader(Picker.Start)).toBe('12:00 AM');
        expect(await page.getPickerDateHeader(Picker.End)).toBe('21 March 2019');
        expect(await page.getPickerTimeHeader(Picker.End)).toBe('11:59 PM');

        // click the date locale button
        await page.enableDateFormat();

        // check the date headers
        expect(await page.getPickerDateHeader(Picker.Start)).toBe('3/4/19');
        expect(await page.getPickerDateHeader(Picker.End)).toBe('3/21/19');

        // click the time locale button
        await page.enableTimeFormat();

        // check the time headers
        expect(await page.getPickerTimeHeader(Picker.Start)).toBe('12:00:00 AM GMT+00:00');
        expect(await page.getPickerTimeHeader(Picker.End)).toBe('11:59:00 PM GMT+00:00');

        expect(await imageCompare('date-range-format')).toEqual(0);
    });

    it('should update date picker when input date is updated', async () => {

        // click the show seconds format button
        await page.showSecondsFormat();

        // Clear input and enter new date
        await page.input.clear();
        await page.input.sendKeys('1 January 2020 09:00:01 AM GMT — 3 January 2020 10:59:02 PM GMT');
        expect(await page.getInputText()).toBe('1 January 2020 09:00:01 AM GMT — 3 January 2020 10:59:02 PM GMT');

        // remove focus from input
        await page.clickOnRangeHeader();

        // Check date picker has been updated
        expect(await page.getPickerDateHeader(Picker.Start)).toBe('1 January 2020');
        expect(await page.getPickerTimeHeader(Picker.Start)).toBe('9:00 AM');
        expect(await page.getPickerDateHeader(Picker.End)).toBe('3 January 2020');
        expect(await page.getPickerTimeHeader(Picker.End)).toBe('10:59 PM');

        expect(await page.getSpinnerHour(Picker.Start)).toBe('9');
        expect(await page.getSpinnerMinute(Picker.Start)).toBe('00');
        expect(await page.getSpinnerSecond(Picker.Start)).toBe('01');

        expect(await page.getSpinnerHour(Picker.End)).toBe('10');
        expect(await page.getSpinnerMinute(Picker.End)).toBe('59');
        expect(await page.getSpinnerSecond(Picker.End)).toBe('02');
    });
});

const timezones = [
    { name: 'GMT-11', offset: 660 },
    { name: 'GMT-10', offset: 600 },
    { name: 'GMT-9', offset: 540 },
    { name: 'GMT-8', offset: 480 },
    { name: 'GMT-7', offset: 420 },
    { name: 'GMT-6', offset: 360 },
    { name: 'GMT-5', offset: 300 },
    { name: 'GMT-4', offset: 240 },
    { name: 'GMT-3', offset: 180 },
    { name: 'GMT-2', offset: 120 },
    { name: 'GMT-1', offset: 60 },
    { name: 'GMT', offset: 0 },
    { name: 'GMT+1', offset: -60 },
    { name: 'GMT+2', offset: -120 },
    { name: 'GMT+3', offset: -180 },
    { name: 'GMT+4', offset: -240 },
    { name: 'GMT+5', offset: -300 },
    { name: 'GMT+6', offset: -360 },
    { name: 'GMT+7', offset: -420 },
    { name: 'GMT+8', offset: -480 },
    { name: 'GMT+9', offset: -540 },
    { name: 'GMT+10', offset: -600 },
    { name: 'GMT+11', offset: -660 },
    { name: 'GMT+12', offset: -720 }
];
