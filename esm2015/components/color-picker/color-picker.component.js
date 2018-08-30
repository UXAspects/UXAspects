/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { pairwise, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { ThemeColor } from '../../services/color/color.service';
// Values corresponding to stylesheet
const /** @type {?} */ BUTTON_MARGIN = 8;
const /** @type {?} */ BUTTON_WIDTHS = {
    'sm': 26,
    'md': 32,
    'lg': 40
};
let /** @type {?} */ uniqueId = 0;
export class ColorPickerComponent {
    constructor() {
        this.id = `ux-color-picker-${uniqueId++}`;
        this.buttonStyle = 'circle';
        this.showTooltips = false;
        this.showInput = false;
        this.inputMode = 'hex';
        this.selectedChange = new EventEmitter();
        this.inputSubmit = new EventEmitter();
        this.cssWidth = 'auto';
        this.colors = [];
        this.selected$ = new BehaviorSubject(null);
        this.columns$ = new BehaviorSubject(-1);
        this.buttonSize$ = new BehaviorSubject('md');
        this.inputPatterns = {
            'hex': /^#(?:[\da-fA-F]{3}){1,2}$/,
            'rgba': /^(?:rgb\(\d{1,3},\s*\d{1,3},\s*\d{1,3}\))|(?:rgba\(\d{1,3},\s*\d{1,3},\s*\d{1,3},\s*\d(\.\d+)?\))$/
        };
        this._onDestroy = new Subject();
    }
    /**
     * @param {?} colors
     * @return {?}
     */
    set inputColors(colors) {
        let /** @type {?} */ normalizedColors;
        // If it's a 1d array, convert it to 2d
        if (colors.length === 0 || !Array.isArray(colors[0])) {
            normalizedColors = [/** @type {?} */ (colors)];
        }
        else {
            normalizedColors = /** @type {?} */ (colors);
        }
        // Convert any string colors to ColorPickerColor
        this.colors = normalizedColors.map(row => {
            return row.map(color => color instanceof ColorPickerColor ? color : new ColorPickerColor(color, color));
        });
    }
    /**
     * @param {?} selected
     * @return {?}
     */
    set selected(selected) {
        this.selected$.next(selected);
    }
    /**
     * @param {?} columns
     * @return {?}
     */
    set columns(columns) {
        this.columns$.next(columns);
    }
    /**
     * @param {?} buttonSize
     * @return {?}
     */
    set buttonSize(buttonSize) {
        this.buttonSize$.next(buttonSize);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Skip emitting the initial selectedChange
        this.selected$.pipe(pairwise(), takeUntil(this._onDestroy)).subscribe(([prev, curr]) => {
            if (prev) {
                this.selectedChange.emit(curr);
            }
        });
        // Set the width based on column count and button size
        combineLatest(this.columns$, this.buttonSize$)
            .pipe(takeUntil(this._onDestroy))
            .subscribe(([columns, buttonSize]) => {
            if (columns > 0) {
                const /** @type {?} */ w = columns * (BUTTON_WIDTHS[buttonSize] + (2 * BUTTON_MARGIN));
                this.cssWidth = `${w}px`;
            }
            else {
                this.cssWidth = 'auto';
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * @param {?} input
     * @param {?} mode
     * @return {?}
     */
    updateColorValue(input, mode) {
        if (this.inputPatterns[mode].test(input)) {
            this.selected$.next(new ColorPickerColor('Custom', input, mode));
        }
    }
    /**
     * @return {?}
     */
    toggleColorEntryType() {
        this.inputMode = (this.inputMode === 'hex') ? 'rgba' : 'hex';
    }
}
ColorPickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-color-picker',
                exportAs: 'ux-color-picker',
                template: "<div class=\"ux-color-picker\" uxTabbableList direction=\"horizontal\">\n    <div class=\"ux-color-picker-swatch\">\n        <div *ngFor=\"let row of colors\" class=\"ux-color-picker-swatch-row\">\n            <div *ngFor=\"let color of row\"\n                class=\"ux-color-picker-color\"\n                [class.ux-small]=\"(buttonSize$ | async) === 'sm'\"\n                [class.ux-large]=\"(buttonSize$ | async) === 'lg'\"\n                [class.ux-circle]=\"buttonStyle === 'circle'\"\n                [class.ux-selected]=\"color === (selected$ | async)\">\n                <button type=\"button\"\n                    attr.aria-label=\"Select color {{color.name}}\" i18n-aria-label\n                    aria-selected=\"color === (selected$ | async)\"\n                    class=\"btn btn-icon\"\n                    [style.background-color]=\"color.rgba\"\n                    (click)=\"selected$.next(color)\"\n                    uxTabbableListItem\n                    [uxTooltip]=\"color.name\"\n                    [tooltipDisabled]=\"!showTooltips\"></button>\n            </div>\n        </div>\n    </div>\n    <div *ngIf=\"showInput\" class=\"ux-color-picker-input-panel\">\n        <div class=\"ux-color-picker-input-header\">\n            <div class=\"ux-color-picker-preview\"\n                [style.background-color]=\"(selected$ | async).rgba\"\n                [class.ux-circle]=\"buttonStyle === 'circle'\"></div>\n            <label *ngIf=\"inputMode === 'hex'\" attr.for=\"{{id}}-input-field\">HEX</label>\n            <label *ngIf=\"inputMode === 'rgba'\" attr.for=\"{{id}}-input-field\">RGBA</label>\n            <button type=\"button\"\n                attr.aria-label=\"Switch input mode to {{inputMode === 'hex' ? 'RGBA' : 'hex'}}\" i18n-aria-label\n                class=\"btn btn-link btn-icon button-secondary ux-color-picker-input-toggle\"\n                (click)=\"toggleColorEntryType(); $event.stopPropagation()\">\n                <span class=\"hpe-icon hpe-chevron-right\"></span>\n            </button>\n        </div>\n        <div class=\"ux-color-picker-input\"\n            [class.has-error]=\"inputField.errors\"\n            [class.has-feedback]=\"inputField.errors\">\n            <input type=\"text\"\n                attr.id=\"{{id}}-input-field\"\n                attr.aria-description=\"Edit {{inputMode}} color value\" i18n-aria-description\n                class=\"form-control\"\n                #inputField=\"ngModel\"\n                [ngModel]=\"(selected$ | async)[inputMode]\"\n                (ngModelChange)=\"updateColorValue($event, inputMode)\"\n                [pattern]=\"inputPatterns[inputMode].source\"\n                (keyup.enter)=\"inputSubmit.emit()\">\n            <span class=\"hpe-icon hpe-alert form-control-feedback\"></span>\n        </div>\n    </div>\n</div>\n"
            }] }
];
ColorPickerComponent.propDecorators = {
    id: [{ type: Input }, { type: HostBinding, args: ['attr.id',] }],
    inputColors: [{ type: Input, args: ['colors',] }],
    selected: [{ type: Input }],
    columns: [{ type: Input }],
    buttonStyle: [{ type: Input }],
    buttonSize: [{ type: Input }],
    showTooltips: [{ type: Input }],
    showInput: [{ type: Input }],
    inputMode: [{ type: Input }],
    selectedChange: [{ type: Output }],
    inputSubmit: [{ type: Output }],
    cssWidth: [{ type: HostBinding, args: ['style.width',] }]
};
function ColorPickerComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    ColorPickerComponent.prototype.id;
    /** @type {?} */
    ColorPickerComponent.prototype.buttonStyle;
    /** @type {?} */
    ColorPickerComponent.prototype.showTooltips;
    /** @type {?} */
    ColorPickerComponent.prototype.showInput;
    /** @type {?} */
    ColorPickerComponent.prototype.inputMode;
    /** @type {?} */
    ColorPickerComponent.prototype.selectedChange;
    /** @type {?} */
    ColorPickerComponent.prototype.inputSubmit;
    /** @type {?} */
    ColorPickerComponent.prototype.cssWidth;
    /** @type {?} */
    ColorPickerComponent.prototype.colors;
    /** @type {?} */
    ColorPickerComponent.prototype.selected$;
    /** @type {?} */
    ColorPickerComponent.prototype.columns$;
    /** @type {?} */
    ColorPickerComponent.prototype.buttonSize$;
    /** @type {?} */
    ColorPickerComponent.prototype.inputPatterns;
    /** @type {?} */
    ColorPickerComponent.prototype._onDestroy;
}
/**
 * Type representing a color, including its descriptive name.
 */
export class ColorPickerColor {
    /**
     * Hex value of the color, e.g. `#ffffff`.
     * @return {?}
     */
    get hex() {
        return this._originalHexValue ? this._originalHexValue : this._color.toHex();
    }
    /**
     * RGBA value of the color, e.g. `rgba(255, 255, 255, 1)`.
     * @return {?}
     */
    get rgba() {
        return this._originalRgbaValue ? this._originalRgbaValue : this._color.toRgba();
    }
    /**
     * @return {?}
     */
    get r() {
        return parseInt(this._color.getRed());
    }
    /**
     * @return {?}
     */
    get g() {
        return parseInt(this._color.getGreen());
    }
    /**
     * @return {?}
     */
    get b() {
        return parseInt(this._color.getBlue());
    }
    /**
     * @return {?}
     */
    get a() {
        return parseFloat(this._color.getAlpha());
    }
    /**
     * @param {?} name
     * @param {?} value
     * @param {?=} inputMode
     */
    constructor(name, value, inputMode) {
        this.name = name;
        this._color = ThemeColor.parse(value);
        // Preserve the format entered by the user if it's valid
        if (inputMode === 'hex') {
            this._originalHexValue = value;
        }
        else if (inputMode === 'rgba') {
            this._originalRgbaValue = value;
        }
    }
    /**
     * @return {?}
     */
    toString() {
        return this._color.toRgba();
    }
}
function ColorPickerColor_tsickle_Closure_declarations() {
    /**
     * Human-readable name of the color.
     * @type {?}
     */
    ColorPickerColor.prototype.name;
    /** @type {?} */
    ColorPickerColor.prototype._color;
    /** @type {?} */
    ColorPickerColor.prototype._originalHexValue;
    /** @type {?} */
    ColorPickerColor.prototype._originalRgbaValue;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2NvbG9yLXBpY2tlci9jb2xvci1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkcsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9DQUFvQyxDQUFDOztBQUdoRSx1QkFBTSxhQUFhLEdBQUcsQ0FBQyxDQUFDO0FBQ3hCLHVCQUFNLGFBQWEsR0FBRztJQUNsQixJQUFJLEVBQUUsRUFBRTtJQUNSLElBQUksRUFBRSxFQUFFO0lBQ1IsSUFBSSxFQUFFLEVBQUU7Q0FDWCxDQUFDO0FBRUYscUJBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztBQU9qQixNQUFNOztrQkFJVyxtQkFBbUIsUUFBUSxFQUFFLEVBQUU7MkJBK0JOLFFBQVE7NEJBUXRCLEtBQUs7eUJBR1IsS0FBSzt5QkFHUSxLQUFLOzhCQUd0QixJQUFJLFlBQVksRUFBb0I7MkJBR3ZDLElBQUksWUFBWSxFQUFRO3dCQUczQixNQUFNO3NCQUVjLEVBQUU7eUJBQ3JCLElBQUksZUFBZSxDQUFtQixJQUFJLENBQUM7d0JBQzVDLElBQUksZUFBZSxDQUFTLENBQUMsQ0FBQyxDQUFDOzJCQUM1QixJQUFJLGVBQWUsQ0FBd0IsSUFBSSxDQUFD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QUM7S0FDekM7Ozs7SUFFRCxJQUFJLENBQUM7UUFDRCxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztLQUMzQzs7OztJQUVELElBQUksQ0FBQztRQUNELE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0tBQzFDOzs7O0lBRUQsSUFBSSxDQUFDO1FBQ0QsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7S0FDN0M7Ozs7OztJQU1ELFlBQVksSUFBWSxFQUFFLEtBQWEsRUFBRSxTQUFnQztRQUNyRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7O1FBR3RDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7U0FDbEM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztTQUNuQztLQUNKOzs7O0lBRUQsUUFBUTtRQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQy9CO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0IH0gZnJvbSAncnhqcy9vYnNlcnZhYmxlL2NvbWJpbmVMYXRlc3QnO1xuaW1wb3J0IHsgcGFpcndpc2UsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgVGhlbWVDb2xvciB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NvbG9yL2NvbG9yLnNlcnZpY2UnO1xuXG4vLyBWYWx1ZXMgY29ycmVzcG9uZGluZyB0byBzdHlsZXNoZWV0XG5jb25zdCBCVVRUT05fTUFSR0lOID0gODtcbmNvbnN0IEJVVFRPTl9XSURUSFMgPSB7XG4gICAgJ3NtJzogMjYsXG4gICAgJ21kJzogMzIsXG4gICAgJ2xnJzogNDBcbn07XG5cbmxldCB1bmlxdWVJZCA9IDA7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtY29sb3ItcGlja2VyJyxcbiAgICBleHBvcnRBczogJ3V4LWNvbG9yLXBpY2tlcicsXG4gICAgdGVtcGxhdGVVcmw6ICdjb2xvci1waWNrZXIuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIENvbG9yUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KClcbiAgICBASG9zdEJpbmRpbmcoJ2F0dHIuaWQnKVxuICAgIGlkOiBzdHJpbmcgPSBgdXgtY29sb3ItcGlja2VyLSR7dW5pcXVlSWQrK31gO1xuXG4gICAgQElucHV0KCdjb2xvcnMnKVxuICAgIHNldCBpbnB1dENvbG9ycyhjb2xvcnM6IENvbG9yUGlja2VySW5wdXRDb2xvcnNbXSB8IENvbG9yUGlja2VySW5wdXRDb2xvcnNbXVtdKSB7XG5cbiAgICAgICAgbGV0IG5vcm1hbGl6ZWRDb2xvcnM6IENvbG9yUGlja2VySW5wdXRDb2xvcnNbXVtdO1xuXG4gICAgICAgIC8vIElmIGl0J3MgYSAxZCBhcnJheSwgY29udmVydCBpdCB0byAyZFxuICAgICAgICBpZiAoY29sb3JzLmxlbmd0aCA9PT0gMCB8fCAhQXJyYXkuaXNBcnJheShjb2xvcnNbMF0pKSB7XG4gICAgICAgICAgICBub3JtYWxpemVkQ29sb3JzID0gWzxDb2xvclBpY2tlcklucHV0Q29sb3JzW10+Y29sb3JzXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vcm1hbGl6ZWRDb2xvcnMgPSA8Q29sb3JQaWNrZXJJbnB1dENvbG9yc1tdW10+Y29sb3JzO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ29udmVydCBhbnkgc3RyaW5nIGNvbG9ycyB0byBDb2xvclBpY2tlckNvbG9yXG4gICAgICAgIHRoaXMuY29sb3JzID0gbm9ybWFsaXplZENvbG9ycy5tYXAocm93ID0+IHtcbiAgICAgICAgICAgIHJldHVybiByb3cubWFwKGNvbG9yID0+IGNvbG9yIGluc3RhbmNlb2YgQ29sb3JQaWNrZXJDb2xvciA/IGNvbG9yIDogbmV3IENvbG9yUGlja2VyQ29sb3IoY29sb3IsIGNvbG9yKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHNlbGVjdGVkKHNlbGVjdGVkOiBDb2xvclBpY2tlckNvbG9yKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQkLm5leHQoc2VsZWN0ZWQpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGNvbHVtbnMoY29sdW1uczogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuY29sdW1ucyQubmV4dChjb2x1bW5zKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGJ1dHRvblN0eWxlOiBDb2xvclBpY2tlckJ1dHRvblN0eWxlID0gJ2NpcmNsZSc7XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBidXR0b25TaXplKGJ1dHRvblNpemU6IENvbG9yUGlja2VyQnV0dG9uU2l6ZSkge1xuICAgICAgICB0aGlzLmJ1dHRvblNpemUkLm5leHQoYnV0dG9uU2l6ZSk7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzaG93VG9vbHRpcHM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgc2hvd0lucHV0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKVxuICAgIGlucHV0TW9kZTogQ29sb3JQaWNrZXJJbnB1dE1vZGUgPSAnaGV4JztcblxuICAgIEBPdXRwdXQoKVxuICAgIHNlbGVjdGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxDb2xvclBpY2tlckNvbG9yPigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgaW5wdXRTdWJtaXQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICBASG9zdEJpbmRpbmcoJ3N0eWxlLndpZHRoJylcbiAgICBjc3NXaWR0aCA9ICdhdXRvJztcblxuICAgIGNvbG9yczogQ29sb3JQaWNrZXJDb2xvcltdW10gPSBbXTtcbiAgICBzZWxlY3RlZCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PENvbG9yUGlja2VyQ29sb3I+KG51bGwpO1xuICAgIGNvbHVtbnMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KC0xKTtcbiAgICBidXR0b25TaXplJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Q29sb3JQaWNrZXJCdXR0b25TaXplPignbWQnKTtcbiAgICBpbnB1dFBhdHRlcm5zID0ge1xuICAgICAgICAnaGV4JzogL14jKD86W1xcZGEtZkEtRl17M30pezEsMn0kLyxcbiAgICAgICAgJ3JnYmEnOiAvXig/OnJnYlxcKFxcZHsxLDN9LFxccypcXGR7MSwzfSxcXHMqXFxkezEsM31cXCkpfCg/OnJnYmFcXChcXGR7MSwzfSxcXHMqXFxkezEsM30sXFxzKlxcZHsxLDN9LFxccypcXGQoXFwuXFxkKyk/XFwpKSQvXG4gICAgfTtcblxuICAgIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcblxuICAgICAgICAvLyBTa2lwIGVtaXR0aW5nIHRoZSBpbml0aWFsIHNlbGVjdGVkQ2hhbmdlXG4gICAgICAgIHRoaXMuc2VsZWN0ZWQkLnBpcGUocGFpcndpc2UoKSwgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSgoW3ByZXYsIGN1cnJdKSA9PiB7XG4gICAgICAgICAgICBpZiAocHJldikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdChjdXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gU2V0IHRoZSB3aWR0aCBiYXNlZCBvbiBjb2x1bW4gY291bnQgYW5kIGJ1dHRvbiBzaXplXG4gICAgICAgIGNvbWJpbmVMYXRlc3QodGhpcy5jb2x1bW5zJCwgdGhpcy5idXR0b25TaXplJClcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoW2NvbHVtbnMsIGJ1dHRvblNpemVdKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbnMgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHcgPSBjb2x1bW5zICogKEJVVFRPTl9XSURUSFNbYnV0dG9uU2l6ZV0gKyAoMiAqIEJVVFRPTl9NQVJHSU4pKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jc3NXaWR0aCA9IGAke3d9cHhgO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3NzV2lkdGggPSAnYXV0byc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIHVwZGF0ZUNvbG9yVmFsdWUoaW5wdXQ6IHN0cmluZywgbW9kZTogQ29sb3JQaWNrZXJJbnB1dE1vZGUpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaW5wdXRQYXR0ZXJuc1ttb2RlXS50ZXN0KGlucHV0KSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCQubmV4dChuZXcgQ29sb3JQaWNrZXJDb2xvcignQ3VzdG9tJywgaW5wdXQsIG1vZGUpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZUNvbG9yRW50cnlUeXBlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlucHV0TW9kZSA9ICh0aGlzLmlucHV0TW9kZSA9PT0gJ2hleCcpID8gJ3JnYmEnIDogJ2hleCc7XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBDb2xvclBpY2tlcklucHV0Q29sb3JzID0gQ29sb3JQaWNrZXJDb2xvciB8IHN0cmluZztcbmV4cG9ydCB0eXBlIENvbG9yUGlja2VyQnV0dG9uU3R5bGUgPSAnc3F1YXJlJyB8ICdjaXJjbGUnO1xuZXhwb3J0IHR5cGUgQ29sb3JQaWNrZXJCdXR0b25TaXplID0gJ3NtJyB8ICdtZCcgfCAnbGcnO1xuZXhwb3J0IHR5cGUgQ29sb3JQaWNrZXJJbnB1dE1vZGUgPSAnaGV4JyB8ICdyZ2JhJztcblxuLyoqXG4gKiBUeXBlIHJlcHJlc2VudGluZyBhIGNvbG9yLCBpbmNsdWRpbmcgaXRzIGRlc2NyaXB0aXZlIG5hbWUuXG4gKi9cbmV4cG9ydCBjbGFzcyBDb2xvclBpY2tlckNvbG9yIHtcblxuICAgIC8qKlxuICAgICAqIEh1bWFuLXJlYWRhYmxlIG5hbWUgb2YgdGhlIGNvbG9yLlxuICAgICAqL1xuICAgIG5hbWU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEhleCB2YWx1ZSBvZiB0aGUgY29sb3IsIGUuZy4gYCNmZmZmZmZgLlxuICAgICAqL1xuICAgIGdldCBoZXgoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29yaWdpbmFsSGV4VmFsdWUgPyB0aGlzLl9vcmlnaW5hbEhleFZhbHVlIDogdGhpcy5fY29sb3IudG9IZXgoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSR0JBIHZhbHVlIG9mIHRoZSBjb2xvciwgZS5nLiBgcmdiYSgyNTUsIDI1NSwgMjU1LCAxKWAuXG4gICAgICovXG4gICAgZ2V0IHJnYmEoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29yaWdpbmFsUmdiYVZhbHVlID8gdGhpcy5fb3JpZ2luYWxSZ2JhVmFsdWUgOiB0aGlzLl9jb2xvci50b1JnYmEoKTtcbiAgICB9XG5cbiAgICBnZXQgcigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQodGhpcy5fY29sb3IuZ2V0UmVkKCkpO1xuICAgIH1cblxuICAgIGdldCBnKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBwYXJzZUludCh0aGlzLl9jb2xvci5nZXRHcmVlbigpKTtcbiAgICB9XG5cbiAgICBnZXQgYigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQodGhpcy5fY29sb3IuZ2V0Qmx1ZSgpKTtcbiAgICB9XG5cbiAgICBnZXQgYSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdCh0aGlzLl9jb2xvci5nZXRBbHBoYSgpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jb2xvcjogVGhlbWVDb2xvcjtcbiAgICBwcml2YXRlIF9vcmlnaW5hbEhleFZhbHVlOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfb3JpZ2luYWxSZ2JhVmFsdWU6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZywgaW5wdXRNb2RlPzogQ29sb3JQaWNrZXJJbnB1dE1vZGUpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5fY29sb3IgPSBUaGVtZUNvbG9yLnBhcnNlKHZhbHVlKTtcblxuICAgICAgICAvLyBQcmVzZXJ2ZSB0aGUgZm9ybWF0IGVudGVyZWQgYnkgdGhlIHVzZXIgaWYgaXQncyB2YWxpZFxuICAgICAgICBpZiAoaW5wdXRNb2RlID09PSAnaGV4Jykge1xuICAgICAgICAgICAgdGhpcy5fb3JpZ2luYWxIZXhWYWx1ZSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2UgaWYgKGlucHV0TW9kZSA9PT0gJ3JnYmEnKSB7XG4gICAgICAgICAgICB0aGlzLl9vcmlnaW5hbFJnYmFWYWx1ZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbG9yLnRvUmdiYSgpO1xuICAgIH1cbn0iXX0=