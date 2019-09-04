import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinButtonModule } from './spin-button.module';

@Component({
    selector: 'app-spin-button-test',
    template: `
        <ux-spin-button [(value)]="value"
                        [maxLength]="maxLength"
                        type="type">
        </ux-spin-button>
    `
})
export class SpinButtonTestComponent {

    value: number | string;
    maxLength = 2;
    type = 'number';

}

describe('Spin Button Component', () => {
    let component: SpinButtonTestComponent;
    let fixture: ComponentFixture<SpinButtonTestComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SpinButtonModule],
            declarations: [SpinButtonTestComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SpinButtonTestComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should allow numbers to be entered within maxLength', async () => {
        const input = nativeElement.querySelector<HTMLInputElement>('input');

        component.value = 20;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(input.value).toBe('20');
    });

    it('should not allow value greater than maxLength value to be entered', async () => {
        const input = nativeElement.querySelector<HTMLInputElement>('input');

        component.value = 203;
        input.dispatchEvent(new Event('input'));

        fixture.detectChanges();
        await fixture.whenStable();

        expect(input.value).toBe('');
    });

    it('should not allow e to be entered when type is number', async () => {
        const input = nativeElement.querySelector<HTMLInputElement>('input');

        component.value = 'e';
        input.dispatchEvent(new Event('input'));

        fixture.detectChanges();
        await fixture.whenStable();

        expect(input.value).toBe('');
    });

    it('should allow e to be entered when type is text', async () => {
        component.type = 'text';
        fixture.detectChanges();

        const input = nativeElement.querySelector<HTMLInputElement>('input');

        component.value = 'e';
        input.dispatchEvent(new Event('input'));

        fixture.detectChanges();
        await fixture.whenStable();

        expect(input.value).toBe('');
    });
});
