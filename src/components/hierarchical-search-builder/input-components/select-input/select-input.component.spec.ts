import { SelectInputComponent } from './select-input.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectModule } from '../../../select';

describe('SelectInputComponent', () => {
    let component: SelectInputComponent;
    let fixture: ComponentFixture<SelectInputComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SelectModule],
            declarations: [SelectInputComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeDefined();
    });
});
