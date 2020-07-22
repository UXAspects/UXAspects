import { TextInputComponent } from './text-input.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('TextInputComponent', () => {
    let component: TextInputComponent;
    let fixture: ComponentFixture<TextInputComponent>;
    let textInput: HTMLInputElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TextInputComponent]
        });
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(TextInputComponent);
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            component = fixture.componentInstance;
            textInput = fixture.debugElement.nativeElement.querySelector('input');
        });
    }));

    it('should be created', () => {
        expect(component).toBeDefined();
    });

    it('should render text input', () => {
        expect(textInput).toBeDefined();
    });

    it('should be empty by default', () => {
        component.value = null;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(textInput.value).toEqual('');
            component.valueChange.subscribe((value: string) => expect(value).toEqual(''));
        });
    });

    it('should display input value', async(() => {
        const testValue = 'Test value';
        component.value = testValue;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(textInput.value).toEqual(testValue);
            component.valueChange.subscribe((value: string) => expect(value).toEqual(testValue));
        });
    }));
});
