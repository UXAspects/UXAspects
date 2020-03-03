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
            (timezoneChange)="onTimezoneChange()"
            (dateChange)="onDateChange()">
        </ux-date-time-picker>
    `
})
export class DateRangePickerComponent {

    onDateChange(): void { }
    onTimezoneChange(): void { }

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
    let component: DateRangePickerComponent;
    let fixture: ComponentFixture<DateRangePickerComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [DateTimePickerModule, IconModule, PopoverModule, FormsModule],
            declarations: [DateRangePickerComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DateRangePickerComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
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
        spyOn(component, 'onTimezoneChange');
        component.showTime = true;
        component.showTimezone = true;
        component.timezones = [{ name: 'GMT-3.5', offset: 210 }, { name: 'GMT-3', offset: 180 }, { name: 'GMT-2', offset: 120 }, { name: 'GMT-1', offset: 60 }, { name: 'GMT', offset: 0 }];
        component.timezone = { name: 'GMT-3.5', offset: 210 };

        fixture.detectChanges();
        await fixture.whenStable();

        expect(getTimezone().value).toBe('GMT-3.5');
        expect(component.onTimezoneChange).not.toHaveBeenCalled();
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

});
