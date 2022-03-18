import { LebSelectInputComponent } from './leb-select-input.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectModule } from '../../../select/index';
import { IconModule } from '../../../icon/index';

describe('SelectInputComponent', () => {
    let component: LebSelectInputComponent;
    let fixture: ComponentFixture<LebSelectInputComponent>;
    let selectInput: HTMLInputElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SelectModule, IconModule],
            declarations: [LebSelectInputComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LebSelectInputComponent);
        component = fixture.componentInstance;
        component.value = [];
        component.configuration = { options: [] };
        fixture.detectChanges();
    });

    beforeEach(async(() => {
        fixture = TestBed.createComponent(LebSelectInputComponent);
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            component = fixture.componentInstance;
            component.value = [];
            component.configuration = { options: [] };
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
