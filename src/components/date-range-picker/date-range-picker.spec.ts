import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { PopoverModule } from '../../components/popover';
import { IconModule } from '../icon';
import { DateRangePickerModule } from './date-range-picker.module';

@Component({
    selector: 'ux-components-date-range-picker',
    template: `
        <div class="input-group" [class.has-error]="invalid">
            <input type="text"
                    #input
                    #popover="ux-popover"
                    placeholder="Select a date range"
                    [ngModel]="date"
                    uxFocusIndicatorOrigin
                    (ngModelChange)="onDateChange($event)"
                    [uxPopover]="popoverTemplate"
                    placement="bottom"
                    [popoverClass]="showNowBtn ? 'date-range-picker-now-btn-popover' : 'date-range-picker-popover'"
                    class="form-control"
                    aria-label="Selected date"
                    (keydown.enter)="popover.show()">

            <span class="input-group-btn">
                <button class="btn button-secondary"
                        [style.visibility]="date !== '' && date !== undefined && date !== null ? 'visible' : 'hidden'"
                        aria-label="Clear"
                        (click)="clear()">
                    <ux-icon name="close" aria-hidden="true"></ux-icon>
                </button>
            </span>
        </div>
        <ng-template #popoverTemplate>
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
                (startChange)="onRangeChange()"
                (endChange)="onRangeChange()"
                (keydown.escape)="popover.hide(); input.focus()"
                (startTimezoneChange)="onTimezoneChange(true, $event)"
                (endTimezoneChange)="onTimezoneChange(false, $event)">
            </ux-date-range-picker>
        </ng-template>
    `
})
export class DateRangePickerComponent {

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
    // startTimezone: DateTimePickerTimezone = { name: 'GMT', offset: 0 };
    // endTimezone: DateTimePickerTimezone = { name: 'GMT', offset: 0 };
}

fdescribe('Date Range Picker', () => {
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

    it('should set the date in the picker when changing the input value', () => {
        expect(component).toBeTruthy();

        component.date = '1 January 2020  12:00 AM GMT — 21 February 2020  7:00 PM GMT';
        fixture.detectChanges();

        expect(getDatePicker().querySelector('.date-header').innerHTML).toBe('1 January 2020');
    });

    function getDatePicker(): HTMLElement | null {
        return nativeElement.querySelector('ux-date-range-picker');
    }

});

