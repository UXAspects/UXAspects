import { Component, ElementRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ColorService, ColorServiceModule } from '../../services/color';
import { IconModule } from '../icon';
import { ColorPickerColor } from './color-picker-color';
import { ColorPickerModule } from './color-picker.module';


@Component({
    selector: 'color-picker-test-app',
    template: `
            <ux-color-picker
                [colors]='colors'
                [(selected)]='selected'
                (selectedChange)='colorPickerSelectedChange(); toggleButton.focus()'
                [columns]='columns'
                [buttonStyle]='buttonStyle'
                [buttonSize]='buttonSize'
                [showInput]='showInput'
                (inputSubmit)='isPickerOpen = false'></ux-color-picker>

            <div *ngIf='showInput' class='btn-container demo-color-picker-close'>
                <button type='button' class='btn button-primary'>
                    Accept
                </button>
            </div>
// `,
        changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorPickerTestComponent {
    colors: ColorPickerColor[][];
    selected: ColorPickerColor;
    columns = 4;
    buttonStyle = 'circle';
    buttonSize = 'md';
    showInput = true;

    @ViewChild('toggleButton', { static: false }) toggleButton: ElementRef;
    @ViewChild('dropdownMenu', { static: false }) dropdownMenu: ElementRef;

    private _colorNames = [
        ['Primary', 'Accent', 'Secondary', 'Alternate1', 'Alternate2', 'Alternate3', 'Vibrant1',
            'Vibrant2'],
        ['Grey1', 'Grey2', 'Grey3', 'Grey4', 'Grey5', 'Grey6', 'Grey7', 'Grey8']
    ];

    constructor(colorService: ColorService) {
        this.colors = this._colorNames.map(row =>
            row.map(colorName => new ColorPickerColor(colorName, colorService.resolve(colorName))));
        this.selected = this.colors[0][0];
    }
}

fdescribe('Color Picker Component', () => {
    let component: ColorPickerTestComponent;
    let fixture: ComponentFixture<ColorPickerTestComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ColorPickerModule,
                IconModule,
                BrowserModule,
                FormsModule,
                ReactiveFormsModule,
                BrowserAnimationsModule,
                ColorPickerModule,
                ColorServiceModule,
                BsDropdownModule.forRoot(),
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

    it('should not invalidate input when color InputMode changes', async () => {
        const inputModeSwapButton = nativeElement.querySelector<HTMLButtonElement>(
            '.ux-color-picker-input-toggle'
        );
        inputModeSwapButton.click();
        debugger;
        // await button click to register
        await fixture.whenStable();
        fixture.detectChanges();
        // await validation to update to true
        await fixture.whenStable();
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();
        debugger;
        const colorInputBox = nativeElement.querySelector(
            '.ux-color-picker .ux-color-picker-input-panel .ux-color-picker-input input'
        );
        // Check input is valid following changing input mode
        expect(colorInputBox.classList.contains('ng-valid')).toBeTruthy();

    });

});