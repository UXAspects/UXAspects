import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorService, ColorServiceModule, colorSets } from '../../services/color/index';
import { ColorPickerColor } from './color-picker-color';
import { ColorPickerModule } from './color-picker.module';
import { ColorPickerInputMode } from './color-picker.type';

@Component({
    selector: 'app-color-picker-test',
    template: `
        <ux-color-picker
            [colors]="colors"
            [(selected)]="selected"
            [columns]="4"
            [showInput]="true"
            [(inputMode)]="inputMode">
         </ux-color-picker>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorPickerTestComponent {

    private _colorService = inject(ColorService);

    private _colorNames = [
        ['Primary', 'Accent', 'Secondary', 'Alternate1', 'Alternate2', 'Alternate3', 'Vibrant1',
            'Vibrant2'],
        ['Grey1', 'Grey2', 'Grey3', 'Grey4', 'Grey5', 'Grey6', 'Grey7', 'Grey8']
    ];

    colors = this._colorNames.map(row => row.map(colorName => new ColorPickerColor(colorName, this._colorService.resolve(colorName))));
    selected: ColorPickerColor = this.colors[0][0];
    inputMode: ColorPickerInputMode = 'hex';
}

describe('Color Picker Component', () => {
    let component: ColorPickerTestComponent;
    let fixture: ComponentFixture<ColorPickerTestComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ColorPickerModule,
                ColorServiceModule.forRoot(colorSets.keppel),
            ],
            declarations: [ColorPickerTestComponent]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(ColorPickerTestComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should initialise', () => {
        expect(component).toBeTruthy();
    });

    it('should not invalidate input when color InputMode changes and ChangeDetectionStrategy.OnPush is used', async () => {
        // get the button that changes the color format
        const colorFormatButton = nativeElement.querySelector<HTMLButtonElement>('.ux-color-picker-input-toggle');
        const colorInput = nativeElement.querySelector('.ux-color-picker .ux-color-picker-input-panel .ux-color-picker-input input');

        // check input mode is the same as the default
        expect(component.inputMode).toBe('hex');

        // change the color format
        colorFormatButton.click();

        // allow the UI to update
        fixture.detectChanges();
        await fixture.whenStable();

        // check that the color input field is not invalid
        expect(colorInput.classList.contains('ng-invalid')).toBeFalsy();

        // check that the input mode has now changed
        expect(component.inputMode).toBe('rgba');
    });

});