import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TimePickerModule } from './time-picker.module';
import { By } from '@angular/platform-browser';

@Component({
    selector: 'app-time-picker-test',
    template: `
        <ux-time-picker [(value)]="value"
                        [showMeridian]="showMeridian"
                        [showHours]="showHours"
                        [showMinutes]="showMinutes"
                        [showSeconds]="showSeconds"
                        [showSpinners]="showSpinners"
                        [hourStep]="hourStep"
                        [minuteStep]="minuteStep"
                        [secondStep]="secondStep"
                        [disabled]="disabled">
        </ux-time-picker>
    `
})
export class TimePickerTestComponent {

    value = new Date();
    showMeridian = true;
    showHours = true;
    showMinutes = true;
    showSeconds = false;
    showSpinners = true;
    hourStep = 1;
    minuteStep = 1;
    secondStep = 1;
    disabled = false;

}

describe('Time Picker Component', () => {
    let component: TimePickerTestComponent;
    let fixture: ComponentFixture<TimePickerTestComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TimePickerModule],
            declarations: [ TimePickerTestComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimePickerTestComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should initialise', () => {
        expect(component).toBeTruthy();
    });
    it('should allow a number to be entered', () => {
        let debugTest = fixture.debugElement.queryAll(By.css('.spin-button'));
        let elementTest = debugTest[0].nativeElement;
        elementTest.value = '1';
        fixture.detectChanges();

        expect(elementTest.value).toBe('1');
    });
});