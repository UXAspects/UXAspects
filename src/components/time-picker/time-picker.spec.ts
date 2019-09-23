import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TimePickerModule } from './time-picker.module';

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
            declarations: [TimePickerTestComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimePickerTestComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should allow a number to be set in hour field', async () => {

        const inputs = nativeElement.querySelectorAll<HTMLInputElement>('input');
        const hourInput = inputs.item(0);

        component.value.setHours(5);
        fixture.detectChanges();
        await fixture.whenStable();

        expect(hourInput.value).toBe('5');
    });

    it('should allow a number up to 23 to be set in the hour field when meridian is set to false', async () => {
        component.showMeridian = false;
        fixture.detectChanges();

        const inputs = nativeElement.querySelectorAll<HTMLInputElement>('input');
        const hourInput = inputs.item(0);

        component.value.setHours(23);
        fixture.detectChanges();
        await fixture.whenStable();

        expect(hourInput.value).toBe('23');
    });

    it('should not allow a number above 23 in the hour field when meridian is set to false', async () => {
        component.showMeridian = false;
        fixture.detectChanges();

        const inputs = nativeElement.querySelectorAll<HTMLInputElement>('input');
        const hourInput = inputs.item(0);

        hourInput.value = '78';
        hourInput.dispatchEvent(new Event('input'));

        fixture.detectChanges();
        await fixture.whenStable();

        expect(hourInput.value).toBe('23');
    });

    it('should not allow a number less than 0 in the hour field when meridian is set to false', async () => {
        component.showMeridian = false;
        fixture.detectChanges();

        const inputs = nativeElement.querySelectorAll<HTMLInputElement>('input');
        const hourInput = inputs.item(0);

        hourInput.value = '-7';
        hourInput.dispatchEvent(new Event('input'));

        fixture.detectChanges();
        await fixture.whenStable();

        expect(hourInput.value).toBe('00');
    });

    it('should allow a number to be set in minute field', async () => {
        const inputs = nativeElement.querySelectorAll<HTMLInputElement>('input');
        const minuteInput = inputs.item(1);

        component.value.setMinutes(50);
        fixture.detectChanges();
        await fixture.whenStable();

        expect(minuteInput.value).toBe('50');
    });

    it('should allow a number to be set in second field', async () => {
        component.showSeconds = true;
        fixture.detectChanges();

        const inputs = nativeElement.querySelectorAll<HTMLInputElement>('input');
        const secondInput = inputs.item(2);

        component.value.setSeconds(20);
        fixture.detectChanges();
        await fixture.whenStable();

        expect(secondInput.value).toBe('20');
    });

    it('should not allow a number more than 12 to be set in hour field', async () => {

        const inputs = nativeElement.querySelectorAll<HTMLInputElement>('input');
        const hourInput = inputs.item(0);

        hourInput.value = '30';
        hourInput.dispatchEvent(new Event('input'));

        fixture.detectChanges();
        await fixture.whenStable();

        expect(hourInput.value).toBe('12');
    });

    it('should not allow a number more than 59 to be set in the minute field', async () => {

        const inputs = nativeElement.querySelectorAll<HTMLInputElement>('input');
        const minutesInput = inputs.item(1);

        minutesInput.value = '78';
        minutesInput.dispatchEvent(new Event('input'));

        fixture.detectChanges();
        await fixture.whenStable();

        expect(minutesInput.value).toBe('00');
    });

    it('should not allow a number more than 59 to be set in the second field', async () => {
        component.showSeconds = true;
        fixture.detectChanges();

        const inputs = nativeElement.querySelectorAll<HTMLInputElement>('input');
        const secondsInput = inputs.item(2);

        secondsInput.value = '90';
        secondsInput.dispatchEvent(new Event('input'));

        fixture.detectChanges();
        await fixture.whenStable();

        expect(secondsInput.value).toBe('59');
    });

    it('should not allow a number less than 0 to be set in hour field', async () => {

        const inputs = nativeElement.querySelectorAll<HTMLInputElement>('input');
        const hourInput = inputs.item(0);

        hourInput.value = '-30';
        hourInput.dispatchEvent(new Event('input'));

        fixture.detectChanges();
        await fixture.whenStable();

        expect(hourInput.value).toBe('12');
    });

    it('should not allow a number less than 0 to be set in the minute field', async () => {

        const inputs = nativeElement.querySelectorAll<HTMLInputElement>('input');
        const minutesInput = inputs.item(1);

        minutesInput.value = '-78';
        minutesInput.dispatchEvent(new Event('input'));

        fixture.detectChanges();
        await fixture.whenStable();

        expect(minutesInput.value).toBe('59');
    });

    it('should not allow a number less than 0 to be set in the second field', async () => {
        component.showSeconds = true;
        fixture.detectChanges();

        const inputs = nativeElement.querySelectorAll<HTMLInputElement>('input');
        const secondsInput = inputs.item(2);

        secondsInput.value = '-90';
        secondsInput.dispatchEvent(new Event('input'));

        fixture.detectChanges();
        await fixture.whenStable();

        expect(secondsInput.value).toBe('00');
    });

});