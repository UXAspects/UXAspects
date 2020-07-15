import { NumberInputComponent } from './number-input.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NumberPickerModule } from '../../../number-picker';

describe('NumberInputComponent', () => {
    let component: NumberInputComponent;
    let fixture: ComponentFixture<NumberInputComponent>;
    let numberInput: HTMLInputElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NumberPickerModule],
            declarations: [NumberInputComponent]
        }).compileComponents();
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(NumberInputComponent);

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            component = fixture.componentInstance;
            numberInput = fixture.debugElement.nativeElement.querySelector('input');
        });
    }));

    it('should be created', () => {
        expect(component).toBeDefined();
    });

    it('should display 0 by default', async(() => {
        component.value = null;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(numberInput.valueAsNumber).toEqual(0);
            component.valueChange.subscribe((value: number) => expect(value).toEqual(0));
        });
    }));

    it('should display input value', async(() => {
        component.value = 5;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(numberInput.valueAsNumber).toEqual(5);
            component.valueChange.subscribe((value: number) => expect(value).toEqual(5));
        });
    }));

    it('should apply data', async(() => {
        component.value = null;
        component.data = { min: -5, max: 5 };

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(numberInput.min).toEqual('-5');
            expect(numberInput.max).toEqual('5');
        });
    }));
});
