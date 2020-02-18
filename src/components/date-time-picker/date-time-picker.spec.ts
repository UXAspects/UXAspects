import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { PopoverModule } from '../../components/popover';
import { IconModule } from '../icon';
import { DateTimePickerModule } from './date-time-picker.module';



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
            (dateChange)="onDateChange()">
        </ux-date-time-picker>
    `
})
export class DateRangePickerComponent {

    onDateChange(): void { }

    date: Date;
    showTime: boolean = false;
    showDate: boolean = true;
    showTimezone: boolean = false;
    showMeridian: boolean = true;
    showSpinners: boolean = true;
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

        expect(getDate().innerHTML).toBe(' January 2020 ');
        expect(component.onDateChange).toHaveBeenCalled();
    });

    it('should not through an error when dates set to undefined', async () => {
        component.date = undefined;

        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should display the correct date when the last day in the month is selected', async () => {
        component.date = new Date(2020, 1, 18)
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.date.getDate()).toBe(18)
        expect(getSelected().innerHTML).toBe(' 18 ')

        component.date = new Date(2020, 2, 31)
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.date.getDate()).toBe(31)
        expect(getSelected().innerHTML).toBe(' 31 ')
    });

    function getDate(): HTMLElement | null {
        return nativeElement.querySelector('ux-date-time-picker .header-title');
    }

    function getSelected(): HTMLElement | null {
        return nativeElement.querySelector('ux-date-time-picker-day-view .active')
    }

});
