import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { PopoverModule } from '../../components/popover';
import { IconModule } from '../icon';
import { DateRangePickerModule } from './date-range-picker.module';



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
            (startChange)="onStartChange()"
            (endChange)="onEndChange()">
        </ux-date-range-picker>
    `
})
export class DateRangePickerComponent {

    onStartChange(): void { }
    onEndChange(): void { }

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
    startTimezone: any = { name: 'GMT', offset: 0 };
    endTimezone: any = { name: 'GMT', offset: 0 };
}

describe('Date Range Picker', () => {
    let component: DateRangePickerComponent;
    let fixture: ComponentFixture<DateRangePickerComponent>;
    let nativeElement: HTMLElement;

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
        fixture.detectChanges();
    });

    it('should initialise correctly', () => {
        expect(component).toBeTruthy();
    });

    it('should update start date and call onStartChange when start date is changed ', async () => {
        spyOn(component, 'onStartChange');
        component.start = new Date('Tue Jan 07 2020 00:00:00 GMT+0000 (Greenwich Mean Time)');

        fixture.detectChanges();
        await fixture.whenStable();

        expect(getDate().innerHTML).toBe(' 7 January 2020 ');
        expect(component.onStartChange).toHaveBeenCalled();
    });

    it('should update end date and call onEndChange when end date is changed', async () => {
        spyOn(component, 'onEndChange');
        component.end = new Date('Thu Jan 23 2020 23:59:59 GMT+0000 (Greenwich Mean Time)');

        fixture.detectChanges();
        await fixture.whenStable();

        expect(getDate().innerHTML).toBe(' 23 January 2020 ');
        expect(component.onEndChange).toHaveBeenCalled();
    });

    it('should not through an error when dates set to undefined', async () => {
        component.start = undefined;
        component.end = undefined;

        fixture.detectChanges();
        await fixture.whenStable();
    });

    function getDate(): HTMLElement | null {
        return nativeElement.querySelector('ux-date-range-picker .header-section .date-header');
    }

});

