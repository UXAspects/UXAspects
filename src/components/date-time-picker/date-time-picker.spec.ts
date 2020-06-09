import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { PopoverModule } from '../../components/popover';
import { IconModule } from '../icon';
import { DateTimePickerModule } from './date-time-picker.module';
import { DateTimePickerTimezone } from './date-time-picker.utils';

@Component({
    selector: 'ux-components-date-time-picker',
    template: `
        <ux-date-time-picker
            [(date)]="date"
            [showTime]="showTime"
            [showDate]="showDate"
            [showTimezone]="showTimezone"
            [showMeridian]="showMeridian"
            [showSpinners]="showSpinners"
            [timezones]="timezones"
            [timezone]="timezone"
            (timezoneChange)="onTimezoneChange($event)"
            (dateChange)="onDateChange()">
        </ux-date-time-picker>
    `
})
export class DateTimePickerTestComponent {

    onDateChange(): void { }
    onTimezoneChange(value: DateTimePickerTimezone): void {}

    date: Date;
    showTime: boolean = false;
    showDate: boolean = true;
    showTimezone: boolean;
    showMeridian: boolean = true;
    showSpinners: boolean = true;
    timezone: DateTimePickerTimezone;
    timezones: DateTimePickerTimezone[];
}

describe('Date Time Picker', () => {
    let component: DateTimePickerTestComponent;
    let fixture: ComponentFixture<DateTimePickerTestComponent>;
    let nativeElement: HTMLElement;
    let onTimezoneChangeSpy: jasmine.Spy;
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
            imports: [DateTimePickerModule, IconModule, PopoverModule, FormsModule],
            declarations: [DateTimePickerTestComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DateTimePickerTestComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        onTimezoneChangeSpy = spyOn(component, 'onTimezoneChange');
        fixture.detectChanges();
    });

    it('should initialise correctly', () => {
        expect(component).toBeTruthy();
    });

    it('should update date and call onDateChange when start date is changed ', async () => {
        spyOn(component, 'onDateChange');
        component.date = new Date(2020, 0, 7);
        fixture.detectChanges();
        await fixture.whenStable();

        expect(getHeader().innerHTML).toBe(' January 2020 ');
        expect(component.onDateChange).toHaveBeenCalled();
    });

    it('should not cause an error when dates set to undefined', async () => {
        const now = new Date();
        component.date = undefined;

        fixture.detectChanges();
        await fixture.whenStable();

        expect(getHeader().innerHTML.trim()).toBe(now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }));
        expect(getSelected().innerHTML.trim()).toBe(now.getDate().toString());
    });

    it('should display the correct date when the last day in the month is selected', async () => {
        component.date = new Date(2020, 1, 18);
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.date.getDate()).toBe(18);
        expect(getSelected().innerHTML).toBe(' 18 ');

        component.date = new Date(2020, 2, 31);
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.date.getDate()).toBe(31);
        expect(getSelected().innerHTML).toBe(' 31 ');
    });

    it('should allow a half time zone to be set if it is present in the timezone array and not call timezoneChange', async() => {
        // Ignore the initial call from timezone being set to default
        onTimezoneChangeSpy.calls.reset();

        component.showTime = true;
        component.showTimezone = true;
        component.timezones = [{ name: 'GMT-3.5', offset: 210 }, { name: 'GMT-3', offset: 180 }, { name: 'GMT-2', offset: 120 }, { name: 'GMT-1', offset: 60 }, { name: 'GMT', offset: 0 }];
        component.timezone = { name: 'GMT-3.5', offset: 210 };

        fixture.detectChanges();
        await fixture.whenStable();

        expect(getTimezone().value).toBe('GMT-3.5');
        expect(component.onTimezoneChange).not.toHaveBeenCalled();
    });

    it('should not allow a timezone to be set that is not in the provided timezone list and default to GMT', async() => {
        // Verify the initial `timezone` change from undefined to GMT and reset the spy
        expect(component.onTimezoneChange).toHaveBeenCalledWith({ name: 'GMT', offset: 0 });
        expect(component.onTimezoneChange).toHaveBeenCalledTimes(1);
        onTimezoneChangeSpy.calls.reset();

        component.showTime = true;
        component.showTimezone = true;
        component.timezones = [{ name: 'GMT-3.5', offset: 210 }, { name: 'GMT-3', offset: 180 }, { name: 'GMT-2', offset: 120 }, { name: 'GMT-1', offset: 60 }, { name: 'GMT', offset: 0 }];
        component.timezone = { name: 'GMT-3.5x', offset: 3000 };

        fixture.detectChanges();
        await fixture.whenStable();

        expect(getTimezone().value).toBe('GMT');

        // Timezone was changed to GMT on initialization, so we do not expect another call with the same value
        expect(component.onTimezoneChange).not.toHaveBeenCalled();
    });

    it('should not allow a timezone to be set that is not in the default timezone list and default to GMT', async() => {
        // Verify the initial `timezone` change from undefined to GMT and reset the spy
        expect(component.onTimezoneChange).toHaveBeenCalledWith({ name: 'GMT', offset: 0 });
        expect(component.onTimezoneChange).toHaveBeenCalledTimes(1);
        onTimezoneChangeSpy.calls.reset();

        component.showTime = true;
        component.showTimezone = true;
        component.timezone = { name: 'GMT-3.5x', offset: 3000 };

        fixture.detectChanges();
        await fixture.whenStable();

        expect(getTimezone().value).toBe('GMT');

        // Timezone was changed to GMT on initialization, so we do not expect another call with the same value
        expect(component.onTimezoneChange).not.toHaveBeenCalled();
    });

    it('should update only the time is changed', async() => {
        component.date = new Date(2020, 5, 2, 11);
        component.showTime = true;
        fixture.detectChanges();
        await fixture.whenStable();

        component.date = new Date(2020, 5, 2, 13, 45);
        fixture.detectChanges();
        await fixture.whenStable();

        expect(getHours().value).toBe('1');
        expect(getMinutes().value).toBe('45');
        expect(getMeridianPM().classList).toContain('active');
    });

    function getHeader(): HTMLElement | null {
        return nativeElement.querySelector('ux-date-time-picker .header-title');
    }

    function getSelected(): HTMLElement | null {
        return nativeElement.querySelector('ux-date-time-picker-day-view .active');
    }

    function getTimezone(): HTMLInputElement {
        return nativeElement.querySelector('ux-date-time-picker-time-view .time-zone-picker ux-spin-button input');
    }

    function getHours(): HTMLInputElement {
        return nativeElement.querySelector('ux-date-time-picker-time-view .time-hours-picker ux-spin-button input');
    }

    function getMinutes(): HTMLInputElement {
        return nativeElement.querySelector('ux-date-time-picker-time-view .time-minutes-picker ux-spin-button input');
    }

    function getMeridianPM(): HTMLInputElement {
        return nativeElement.querySelector('.time-picker-meridian .btn-group button:last-child');
    }
});
