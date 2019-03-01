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

});