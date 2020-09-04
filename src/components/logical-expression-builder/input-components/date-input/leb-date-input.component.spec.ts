import { LebDateInputComponent } from './leb-date-input.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DateTimePickerModule } from '../../../date-time-picker/index';
import { PopoverModule } from '../../../popover/index';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'l10n'})
class MockL10nPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        return 'test';
    }
}

describe('DateInputComponent', () => {
    let component: LebDateInputComponent;
    let fixture: ComponentFixture<LebDateInputComponent>;
    let dateInput: HTMLInputElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [DateTimePickerModule, PopoverModule],
            declarations: [LebDateInputComponent, MockL10nPipe],
        }).compileComponents();
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(LebDateInputComponent);

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            component = fixture.componentInstance;
            dateInput = fixture.debugElement.nativeElement.querySelector('input');
        });
    }));

    it('should be created', () => {
        expect(component).toBeDefined();
    });

    it('should set options correctly', async(() => {
        component.value = null;
        component.data = {
            showTime: true,
            dateFormat: 'short',
            showNowBtn: true,
            validateFunction: (_: number) => false
        };

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(component.showTime).toBeTruthy();
            expect(component.dateFormat).toEqual('short');
            expect(component.showNowBtn).toBeTruthy();
            expect(component.validate(1234)).toBeFalsy();
        });
    }));

    it('should set date correctly', async(() => {
        const value = 1597052487877;

        component.value = value;

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(component.date).toEqual(new Date(value));
        });
    }));
});
