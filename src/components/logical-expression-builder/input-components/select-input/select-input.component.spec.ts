import { SelectInputComponent } from './select-input.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectModule } from '../../../select/index';
import { IconModule } from '../../../icon/index';

describe('SelectInputComponent', () => {
    let component: SelectInputComponent;
    let fixture: ComponentFixture<SelectInputComponent>;
    let selectInput: HTMLInputElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SelectModule, IconModule],
            declarations: [SelectInputComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectInputComponent);
        component = fixture.componentInstance;
        component.value = [];
        component.data = { options: [] };
        fixture.detectChanges();
    });

    beforeEach(async(() => {
        fixture = TestBed.createComponent(SelectInputComponent);
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            component = fixture.componentInstance;
            component.value = [];
            component.data = { options: [] };
        });
    }));

    it('should be created', () => {
        expect(component).toBeDefined();
    });

    it('should be empty be default', () => {
        selectInput = fixture.debugElement.nativeElement.querySelector('input.ux-tag-input');
        expect(selectInput.value).toEqual('');
    });
});
