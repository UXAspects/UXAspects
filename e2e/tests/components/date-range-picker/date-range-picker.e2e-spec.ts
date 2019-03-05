import { DateRangePickerPage, Picker } from './date-range-picker.po.spec';

describe('Date Range Picker Tests', () => {

    let page: DateRangePickerPage;

    beforeEach(() => {
        page = new DateRangePickerPage();
        page.getPage();
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
    });

    it('should disabled items after the end range', async () => {
        await page.selectDate(Picker.Start, 4);
        expect(await page.getDisabled(Picker.Start)).toEqual(['22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '1', '2', '3', '4', '5', '6']);
    });

    it('should emit the date on date start change', async () => {
        await page.selectDate(Picker.Start, 2);
        expect(await page.getInputText()).toBe('2 March 2019  12:00 AM GMT — 21 March 2019  11:59 PM GMT');
    });

    it('should emit the date on date end change', async () => {
        await page.selectDate(Picker.End, 25);
        expect(await page.getInputText()).toBe('4 March 2019  12:00 AM GMT — 25 March 2019  11:59 PM GMT');
    });

    it('should emit on hour change', async () => {
        await page.incrementHour(Picker.Start);
        await page.incrementHour(Picker.End);

        expect(await page.getInputText()).toBe('4 March 2019  1:00 AM GMT — 21 March 2019  12:59 AM GMT');

        await page.decrementHour(Picker.Start);
        await page.decrementHour(Picker.End);

        expect(await page.getInputText()).toBe('4 March 2019  12:00 AM GMT — 21 March 2019  11:59 PM GMT');
    });

    it('should emit on minute change', async () => {
        await page.incrementMinute(Picker.Start);
        await page.incrementMinute(Picker.End);

        expect(await page.getInputText()).toBe('4 March 2019  12:01 AM GMT — 21 March 2019  12:00 AM GMT');

        await page.decrementMinute(Picker.Start);
        await page.decrementMinute(Picker.End);

        expect(await page.getInputText()).toBe('4 March 2019  12:00 AM GMT — 21 March 2019  11:59 PM GMT');
    });

    it('should emit on timezone change', async () => {
        await page.incrementTimezone(Picker.Start);
        expect(await page.getInputText()).toBe('4 March 2019  12:00 AM GMT+1 — 21 March 2019  11:59 PM GMT');

        await page.incrementTimezone(Picker.End);
        expect(await page.getInputText()).toBe('4 March 2019  12:00 AM GMT+1 — 21 March 2019  11:59 PM GMT+1');

        await page.decrementTimezone(Picker.Start);
        expect(await page.getInputText()).toBe('4 March 2019  12:00 AM GMT — 21 March 2019  11:59 PM GMT+1');

        await page.decrementTimezone(Picker.End);
        expect(await page.getInputText()).toBe('4 March 2019  12:00 AM GMT — 21 March 2019  11:59 PM GMT');
    });

});