import { NumberInputComponent } from './number-input.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NumberPickerModule } from '../../../number-picker';

describe('NumberInputComponent', () => {
    let component: NumberInputComponent;
    let fixture: ComponentFixture<NumberInputComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NumberPickerModule],
            declarations: [NumberInputComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NumberInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeDefined();
    });
});
