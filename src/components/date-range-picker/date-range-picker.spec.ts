import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { PopoverModule } from '../../components/popover';
import { IconModule } from '../icon';
import { DateRangePickerModule } from './date-range-picker.module';
import { DateTimePickerTimezone } from '../date-time-picker';

@Component({
    selector: 'ux-components-date-range-picker',
    template: `
        <ux-date-range-picker
            [(start)]="start"
            [(end)]="end"
            [showTime]="showTime"
            [showTimezone]="showTimezone"
            [showSeconds]="showSeconds"
            [showMeridian]="showMeridian"
            [showSpinners]="showSpinners"
            [showNowBtn]="showNowBtn"
            [startTimezone]="startTimezone"
            [endTimezone]="endTimezone"
            [timezones]="timezones"
            (startTimezoneChange)="onStartTimezoneChange($event)"
            (endTimezoneChange)="onEndTimezoneChange($event)"
            (startChange)="onStartChange()"
            (endChange)="onEndChange()">
        </ux-date-range-picker>
    `
})
export class DateRangePickerComponent {

    onStartChange(): void { }
    onEndChange(): void { }
    onStartTimezoneChange(value: DateTimePickerTimezone): void { }
    onEndTimezoneChange(value: DateTimePickerTimezone): void { }

    start: Date;
    end: Date;
    date: string;
    invalid: boolean = false;
    showTime: boolean = false;
    showTimezone: boolean = false;
    showSeconds: boolean = false;
    showMeridian: boolean = true;
    showSpinners: boolean = true;
    showNowBtn: boolean = false;
    startTimezone: DateTimePickerTimezone;
    endTimezone: DateTimePickerTimezone;
    timezones: DateTimePickerTimezone[];
}

describe('Date Range Picker', () => {
    let component: DateRangePickerComponent;
    let fixture: ComponentFixture<DateRangePickerComponent>;
    let nativeElement: HTMLElement;
    let onStartTimezoneChangeSpy: jasmine.Spy;
    let onEndTimezoneChangeSpy: jasmine.Spy;
    let getTimezoneOffset: () => number;

    beforeAll(() => {
        getTimezoneOffset = Date.prototype.getTimezoneOffset;
        Date.prototype.getTimezoneOffset = () => {
            return 0;
        };
    });

    afterAll(() => {
        Date.prototype.getTimezoneOffset = getTimezoneOffset;
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [DateRangePickerModule, IconModule, PopoverModule, FormsModule],
            declarations: [DateRangePickerComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DateRangePickerComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        onStartTimezoneChangeSpy = spyOn(component, 'onStartTimezoneChange');
        onEndTimezoneChangeSpy = spyOn(component, 'onEndTimezoneChange');
        fixture.detectChanges();
    });

    it('should initialise correctly', () => {
        expect(component).toBeTruthy();
    });

    it('should update start date and call onStartChange when start date is changed ', async () => {
        spyOn(component, 'onStartChange');
        component.start = new Date(2020, 0, 7, 0, 0, 0);

        fixture.detectChanges();
        await fixture.whenStable();

        expect(getDate().innerHTML).toBe(' 7 January 2020 ');
        expect(component.onStartChange).toHaveBeenCalled();
    });

    it('should update end date and call onEndChange when end date is changed', async () => {
        spyOn(component, 'onEndChange');
        component.end = new Date(2020, 0, 23, 23, 59, 59);

        fixture.detectChanges();
        await fixture.whenStable();

        expect(getDate(1).innerHTML).toBe(' 23 January 2020 ');
        expect(component.onEndChange).toHaveBeenCalled();
    });

    it('should not cause an error when dates set to undefined', async () => {
        component.start = undefined;
        component.end = undefined;

        fixture.detectChanges();
        await fixture.whenStable();

        expect(getDate(0)).toBeNull();
        expect(getDate(1)).toBeNull();
    });

    it('should allow a half time zone to be set if it is present in the timezone array and not call startTimezoneChange or endTimzoneChange', async() => {
        // Ignore the initial call from timezone being set to default
        onStartTimezoneChangeSpy.calls.reset();
        onEndTimezoneChangeSpy.calls.reset();

        component.showTime = true;
        component.showTimezone = true;
        component.timezones = [{ name: 'GMT-3.5', offset: 210 }, { name: 'GMT-3', offset: 180 }, { name: 'GMT-2', offset: 120 }, { name: 'GMT-1', offset: 60 }, { name: 'GMT', offset: 0 }];
        component.startTimezone = { name: 'GMT-3.5', offset: 210 };
        component.endTimezone = { name: 'GMT-3.5', offset: 210 };

        fixture.detectChanges();
        await fixture.whenStable();

        await expect(getTimezone(0).value).toBe('GMT-3.5');
        await expect(getTimezone(1).value).toBe('GMT-3.5');

        expect(component.onStartTimezoneChange).not.toHaveBeenCalled();
        expect(component.onEndTimezoneChange).not.toHaveBeenCalled();
    });

    it('should not allow a timezone to be set that is not in the provided timezone list and default to GMT', async() => {
        // Verify the initial `timezone` change from undefined to GMT and reset the spies
        expect(component.onStartTimezoneChange).toHaveBeenCalledWith({ name: 'GMT', offset: 0 });
        expect(component.onStartTimezoneChange).toHaveBeenCalledTimes(1);
        onStartTimezoneChangeSpy.calls.reset();

        expect(component.onEndTimezoneChange).toHaveBeenCalledWith({ name: 'GMT', offset: 0 });
        expect(component.onEndTimezoneChange).toHaveBeenCalledTimes(1);
        onEndTimezoneChangeSpy.calls.reset();

        component.showTime = true;
        component.showTimezone = true;
        component.timezones = [{ name: 'GMT-3.5', offset: 210 }, { name: 'GMT-3', offset: 180 }, { name: 'GMT-2', offset: 120 }, { name: 'GMT-1', offset: 60 }, { name: 'GMT', offset: 0 }];
        component.startTimezone = { name: 'GMT-3.5x', offset: 3000 };
        component.endTimezone = { name: 'GMT-3.5x', offset: 3000 };

        fixture.detectChanges();
        await fixture.whenStable();

        await expect(getTimezone(0).value).toBe('GMT');
        await expect(getTimezone(1).value).toBe('GMT');

        // Timezone was changed to GMT on initialization, so we do not expect another call with the same value
        expect(component.onStartTimezoneChange).not.toHaveBeenCalled();
        expect(component.onEndTimezoneChange).not.toHaveBeenCalled();
    });

    it('should not allow a timezone to be set that is not in the default timezone list and default to GMT', async() => {
        // Verify the initial `timezone` change from undefined to GMT and reset the spies
        expect(component.onStartTimezoneChange).toHaveBeenCalledWith({ name: 'GMT', offset: 0 });
        expect(component.onStartTimezoneChange).toHaveBeenCalledTimes(1);
        onStartTimezoneChangeSpy.calls.reset();

        expect(component.onEndTimezoneChange).toHaveBeenCalledWith({ name: 'GMT', offset: 0 });
        expect(component.onEndTimezoneChange).toHaveBeenCalledTimes(1);
        onEndTimezoneChangeSpy.calls.reset();

        component.showTime = true;
        component.showTimezone = true;
        component.startTimezone = { name: 'GMT-3.5x', offset: 3000 };
        component.endTimezone = { name: 'GMT-3.5x', offset: 3000 };

        fixture.detectChanges();
        await fixture.whenStable();

        await expect(getTimezone(0).value).toBe('GMT');
        await expect(getTimezone(1).value).toBe('GMT');

        // Timezone was changed to GMT on initialization, so we do not expect another call with the same value
        expect(component.onStartTimezoneChange).not.toHaveBeenCalled();
        expect(component.onEndTimezoneChange).not.toHaveBeenCalled();
    });

    function getDate(index: number = 0): HTMLElement {
        const headerSections = nativeElement.querySelectorAll('ux-date-range-picker .header-section');
        return headerSections[index].querySelector('.date-header');
    }

    function getPicker(index: number = 0): HTMLElement {
        const pickers = nativeElement.querySelector('ux-date-range-picker .content');
        if (index === 0) {
            return pickers.querySelector('.start-date-picker');
        } else {
            return pickers.querySelector('.end-date-picker');
        }
    }

    function getTimezone(index: number): HTMLInputElement {
        const picker = getPicker(index);
        return picker.querySelector('ux-date-time-picker-time-view .time-zone-picker ux-spin-button input');
    }

});

