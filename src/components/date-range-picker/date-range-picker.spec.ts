import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { PopoverModule } from '../../components/popover';
import { IconModule } from '../icon';
import { DateRangePickerModule } from './date-range-picker.module';


@Component({
    selector: 'ux-components-date-range-picker',
    template: `
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
});

