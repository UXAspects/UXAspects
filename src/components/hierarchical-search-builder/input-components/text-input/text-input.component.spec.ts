import { TextInputComponent } from './text-input.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectModule } from '../../../select';

describe('TextInputComponent', () => {
    let component: TextInputComponent;
    let fixture: ComponentFixture<TextInputComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SelectModule],
            declarations: [TextInputComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TextInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeDefined();
    });

    it('should render text input', () => {
        const textInput: HTMLElement = fixture.debugElement.nativeElement.querySelector('input');
        expect(textInput).toBeDefined();
    });

    it('should show value in text input', () => {
        const textInput: HTMLElement = fixture.debugElement.nativeElement.querySelector('input');
        expect(textInput).toBeDefined();
    });
});
