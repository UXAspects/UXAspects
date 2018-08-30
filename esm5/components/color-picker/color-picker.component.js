/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { pairwise, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { ThemeColor } from '../../services/color/color.service';
// Values corresponding to stylesheet
var /** @type {?} */ BUTTON_MARGIN = 8;
var /** @type {?} */ BUTTON_WIDTHS = {
    'sm': 26,
    'md': 32,
    'lg': 40
};
var /** @type {?} */ uniqueId = 0;
var ColorPickerComponent = /** @class */ (function () {
    function ColorPickerComponent() {
        this.id = "ux-color-picker-" + uniqueId++;
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
    Object.defineProperty(ColorPickerComponent.prototype, "inputColors", {
        set: /**
         * @param {?} colors
         * @return {?}
         */
        function (colors) {
            var /** @type {?} */ normalizedColors;
            // If it's a 1d array, convert it to 2d
            if (colors.length === 0 || !Array.isArray(colors[0])) {
                normalizedColors = [/** @type {?} */ (colors)];
            }
            else {
                normalizedColors = /** @type {?} */ (colors);
            }
            // Convert any string colors to ColorPickerColor
            this.colors = normalizedColors.map(function (row) {
                return row.map(function (color) { return color instanceof ColorPickerColor ? color : new ColorPickerColor(color, color); });
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPickerComponent.prototype, "selected", {
        set: /**
         * @param {?} selected
         * @return {?}
         */
        function (selected) {
            this.selected$.next(selected);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPickerComponent.prototype, "columns", {
        set: /**
         * @param {?} columns
         * @return {?}
         */
        function (columns) {
            this.columns$.next(columns);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPickerComponent.prototype, "buttonSize", {
        set: /**
         * @param {?} buttonSize
         * @return {?}
         */
        function (buttonSize) {
            this.buttonSize$.next(buttonSize);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ColorPickerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // Skip emitting the initial selectedChange
        this.selected$.pipe(pairwise(), takeUntil(this._onDestroy)).subscribe(function (_a) {
            var _b = tslib_1.__read(_a, 2), prev = _b[0], curr = _b[1];
            if (prev) {
                _this.selectedChange.emit(curr);
            }
        });
        // Set the width based on column count and button size
        combineLatest(this.columns$, this.buttonSize$)
            .pipe(takeUntil(this._onDestroy))
            .subscribe(function (_a) {
            var _b = tslib_1.__read(_a, 2), columns = _b[0], buttonSize = _b[1];
            if (columns > 0) {
                var /** @type {?} */ w = columns * (BUTTON_WIDTHS[buttonSize] + (2 * BUTTON_MARGIN));
                _this.cssWidth = w + "px";
            }
            else {
                _this.cssWidth = 'auto';
            }
        });
    };
    /**
     * @return {?}
     */
    ColorPickerComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /**
     * @param {?} input
     * @param {?} mode
     * @return {?}
     */
    ColorPickerComponent.prototype.updateColorValue = /**
     * @param {?} input
     * @param {?} mode
     * @return {?}
     */
    function (input, mode) {
        if (this.inputPatterns[mode].test(input)) {
            this.selected$.next(new ColorPickerColor('Custom', input, mode));
        }
    };
    /**
     * @return {?}
     */
    ColorPickerComponent.prototype.toggleColorEntryType = /**
     * @return {?}
     */
    function () {
        this.inputMode = (this.inputMode === 'hex') ? 'rgba' : 'hex';
    };
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
    return ColorPickerComponent;
}());
export { ColorPickerComponent };
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
var /**
 * Type representing a color, including its descriptive name.
 */
ColorPickerColor = /** @class */ (function () {
    function ColorPickerColor(name, value, inputMode) {
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
    Object.defineProperty(ColorPickerColor.prototype, "hex", {
        /**
         * Hex value of the color, e.g. `#ffffff`.
         */
        get: /**
         * Hex value of the color, e.g. `#ffffff`.
         * @return {?}
         */
        function () {
            return this._originalHexValue ? this._originalHexValue : this._color.toHex();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPickerColor.prototype, "rgba", {
        /**
         * RGBA value of the color, e.g. `rgba(255, 255, 255, 1)`.
         */
        get: /**
         * RGBA value of the color, e.g. `rgba(255, 255, 255, 1)`.
         * @return {?}
         */
        function () {
            return this._originalRgbaValue ? this._originalRgbaValue : this._color.toRgba();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPickerColor.prototype, "r", {
        get: /**
         * @return {?}
         */
        function () {
            return parseInt(this._color.getRed());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPickerColor.prototype, "g", {
        get: /**
         * @return {?}
         */
        function () {
            return parseInt(this._color.getGreen());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPickerColor.prototype, "b", {
        get: /**
         * @return {?}
         */
        function () {
            return parseInt(this._color.getBlue());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPickerColor.prototype, "a", {
        get: /**
         * @return {?}
         */
        function () {
            return parseFloat(this._color.getAlpha());
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ColorPickerColor.prototype.toString = /**
     * @return {?}
     */
    function () {
        return this._color.toRgba();
    };
    return ColorPickerColor;
}());
/**
 * Type representing a color, including its descriptive name.
 */
export { ColorPickerColor };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2NvbG9yLXBpY2tlci9jb2xvci1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZHLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQzs7QUFHaEUscUJBQU0sYUFBYSxHQUFHLENBQUMsQ0FBQztBQUN4QixxQkFBTSxhQUFhLEdBQUc7SUFDbEIsSUFBSSxFQUFFLEVBQUU7SUFDUixJQUFJLEVBQUUsRUFBRTtJQUNSLElBQUksRUFBRSxFQUFFO0NBQ1gsQ0FBQztBQUVGLHFCQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7OztrQkFXQSxxQkFBbUIsUUFBUSxFQUFJOzJCQStCTixRQUFROzRCQVF0QixLQUFLO3lCQUdSLEtBQUs7eUJBR1EsS0FBSzs4QkFHdEIsSUFBSSxZQUFZLEVBQW9COzJCQUd2QyxJQUFJLFlBQVksRUFBUTt3QkFHM0IsTUFBTTtzQkFFYyxFQUFFO3lCQUNyQixJQUFJLGVBQWUsQ0FBbUIsSUFBSSxDQUFDO3dCQUM1QyxJQUFJLGVBQWUsQ0FBUyxDQUFDLENBQUMsQ0FBQzsyQkFDNUIsSUFBSSxlQUFlLENBQXdCLElBQUksQ0FBQzs2QkFDOUM7WUFDWixL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QUFNLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDL0I7MkJBbE1MO0lBbU1DLENBQUE7Ozs7QUF4REQsNEJBd0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdCB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS9jb21iaW5lTGF0ZXN0JztcbmltcG9ydCB7IHBhaXJ3aXNlLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IFRoZW1lQ29sb3IgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jb2xvci9jb2xvci5zZXJ2aWNlJztcblxuLy8gVmFsdWVzIGNvcnJlc3BvbmRpbmcgdG8gc3R5bGVzaGVldFxuY29uc3QgQlVUVE9OX01BUkdJTiA9IDg7XG5jb25zdCBCVVRUT05fV0lEVEhTID0ge1xuICAgICdzbSc6IDI2LFxuICAgICdtZCc6IDMyLFxuICAgICdsZyc6IDQwXG59O1xuXG5sZXQgdW5pcXVlSWQgPSAwO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LWNvbG9yLXBpY2tlcicsXG4gICAgZXhwb3J0QXM6ICd1eC1jb2xvci1waWNrZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnY29sb3ItcGlja2VyLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBDb2xvclBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpXG4gICAgQEhvc3RCaW5kaW5nKCdhdHRyLmlkJylcbiAgICBpZDogc3RyaW5nID0gYHV4LWNvbG9yLXBpY2tlci0ke3VuaXF1ZUlkKyt9YDtcblxuICAgIEBJbnB1dCgnY29sb3JzJylcbiAgICBzZXQgaW5wdXRDb2xvcnMoY29sb3JzOiBDb2xvclBpY2tlcklucHV0Q29sb3JzW10gfCBDb2xvclBpY2tlcklucHV0Q29sb3JzW11bXSkge1xuXG4gICAgICAgIGxldCBub3JtYWxpemVkQ29sb3JzOiBDb2xvclBpY2tlcklucHV0Q29sb3JzW11bXTtcblxuICAgICAgICAvLyBJZiBpdCdzIGEgMWQgYXJyYXksIGNvbnZlcnQgaXQgdG8gMmRcbiAgICAgICAgaWYgKGNvbG9ycy5sZW5ndGggPT09IDAgfHwgIUFycmF5LmlzQXJyYXkoY29sb3JzWzBdKSkge1xuICAgICAgICAgICAgbm9ybWFsaXplZENvbG9ycyA9IFs8Q29sb3JQaWNrZXJJbnB1dENvbG9yc1tdPmNvbG9yc107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub3JtYWxpemVkQ29sb3JzID0gPENvbG9yUGlja2VySW5wdXRDb2xvcnNbXVtdPmNvbG9ycztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENvbnZlcnQgYW55IHN0cmluZyBjb2xvcnMgdG8gQ29sb3JQaWNrZXJDb2xvclxuICAgICAgICB0aGlzLmNvbG9ycyA9IG5vcm1hbGl6ZWRDb2xvcnMubWFwKHJvdyA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcm93Lm1hcChjb2xvciA9PiBjb2xvciBpbnN0YW5jZW9mIENvbG9yUGlja2VyQ29sb3IgPyBjb2xvciA6IG5ldyBDb2xvclBpY2tlckNvbG9yKGNvbG9yLCBjb2xvcikpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBzZWxlY3RlZChzZWxlY3RlZDogQ29sb3JQaWNrZXJDb2xvcikge1xuICAgICAgICB0aGlzLnNlbGVjdGVkJC5uZXh0KHNlbGVjdGVkKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBjb2x1bW5zKGNvbHVtbnM6IG51bWJlcikge1xuICAgICAgICB0aGlzLmNvbHVtbnMkLm5leHQoY29sdW1ucyk7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBidXR0b25TdHlsZTogQ29sb3JQaWNrZXJCdXR0b25TdHlsZSA9ICdjaXJjbGUnO1xuXG4gICAgQElucHV0KClcbiAgICBzZXQgYnV0dG9uU2l6ZShidXR0b25TaXplOiBDb2xvclBpY2tlckJ1dHRvblNpemUpIHtcbiAgICAgICAgdGhpcy5idXR0b25TaXplJC5uZXh0KGJ1dHRvblNpemUpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2hvd1Rvb2x0aXBzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKVxuICAgIHNob3dJbnB1dDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBpbnB1dE1vZGU6IENvbG9yUGlja2VySW5wdXRNb2RlID0gJ2hleCc7XG5cbiAgICBAT3V0cHV0KClcbiAgICBzZWxlY3RlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Q29sb3JQaWNrZXJDb2xvcj4oKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIGlucHV0U3VibWl0ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgQEhvc3RCaW5kaW5nKCdzdHlsZS53aWR0aCcpXG4gICAgY3NzV2lkdGggPSAnYXV0byc7XG5cbiAgICBjb2xvcnM6IENvbG9yUGlja2VyQ29sb3JbXVtdID0gW107XG4gICAgc2VsZWN0ZWQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxDb2xvclBpY2tlckNvbG9yPihudWxsKTtcbiAgICBjb2x1bW5zJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigtMSk7XG4gICAgYnV0dG9uU2l6ZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PENvbG9yUGlja2VyQnV0dG9uU2l6ZT4oJ21kJyk7XG4gICAgaW5wdXRQYXR0ZXJucyA9IHtcbiAgICAgICAgJ2hleCc6IC9eIyg/OltcXGRhLWZBLUZdezN9KXsxLDJ9JC8sXG4gICAgICAgICdyZ2JhJzogL14oPzpyZ2JcXChcXGR7MSwzfSxcXHMqXFxkezEsM30sXFxzKlxcZHsxLDN9XFwpKXwoPzpyZ2JhXFwoXFxkezEsM30sXFxzKlxcZHsxLDN9LFxccypcXGR7MSwzfSxcXHMqXFxkKFxcLlxcZCspP1xcKSkkL1xuICAgIH07XG5cbiAgICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdCgpO1xuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gU2tpcCBlbWl0dGluZyB0aGUgaW5pdGlhbCBzZWxlY3RlZENoYW5nZVxuICAgICAgICB0aGlzLnNlbGVjdGVkJC5waXBlKHBhaXJ3aXNlKCksIHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKFtwcmV2LCBjdXJyXSkgPT4ge1xuICAgICAgICAgICAgaWYgKHByZXYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQoY3Vycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFNldCB0aGUgd2lkdGggYmFzZWQgb24gY29sdW1uIGNvdW50IGFuZCBidXR0b24gc2l6ZVxuICAgICAgICBjb21iaW5lTGF0ZXN0KHRoaXMuY29sdW1ucyQsIHRoaXMuYnV0dG9uU2l6ZSQpXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKFtjb2x1bW5zLCBidXR0b25TaXplXSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjb2x1bW5zID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB3ID0gY29sdW1ucyAqIChCVVRUT05fV0lEVEhTW2J1dHRvblNpemVdICsgKDIgKiBCVVRUT05fTUFSR0lOKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3NzV2lkdGggPSBgJHt3fXB4YDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNzc1dpZHRoID0gJ2F1dG8nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVDb2xvclZhbHVlKGlucHV0OiBzdHJpbmcsIG1vZGU6IENvbG9yUGlja2VySW5wdXRNb2RlKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlucHV0UGF0dGVybnNbbW9kZV0udGVzdChpbnB1dCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQkLm5leHQobmV3IENvbG9yUGlja2VyQ29sb3IoJ0N1c3RvbScsIGlucHV0LCBtb2RlKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGVDb2xvckVudHJ5VHlwZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbnB1dE1vZGUgPSAodGhpcy5pbnB1dE1vZGUgPT09ICdoZXgnKSA/ICdyZ2JhJyA6ICdoZXgnO1xuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgQ29sb3JQaWNrZXJJbnB1dENvbG9ycyA9IENvbG9yUGlja2VyQ29sb3IgfCBzdHJpbmc7XG5leHBvcnQgdHlwZSBDb2xvclBpY2tlckJ1dHRvblN0eWxlID0gJ3NxdWFyZScgfCAnY2lyY2xlJztcbmV4cG9ydCB0eXBlIENvbG9yUGlja2VyQnV0dG9uU2l6ZSA9ICdzbScgfCAnbWQnIHwgJ2xnJztcbmV4cG9ydCB0eXBlIENvbG9yUGlja2VySW5wdXRNb2RlID0gJ2hleCcgfCAncmdiYSc7XG5cbi8qKlxuICogVHlwZSByZXByZXNlbnRpbmcgYSBjb2xvciwgaW5jbHVkaW5nIGl0cyBkZXNjcmlwdGl2ZSBuYW1lLlxuICovXG5leHBvcnQgY2xhc3MgQ29sb3JQaWNrZXJDb2xvciB7XG5cbiAgICAvKipcbiAgICAgKiBIdW1hbi1yZWFkYWJsZSBuYW1lIG9mIHRoZSBjb2xvci5cbiAgICAgKi9cbiAgICBuYW1lOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBIZXggdmFsdWUgb2YgdGhlIGNvbG9yLCBlLmcuIGAjZmZmZmZmYC5cbiAgICAgKi9cbiAgICBnZXQgaGV4KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcmlnaW5hbEhleFZhbHVlID8gdGhpcy5fb3JpZ2luYWxIZXhWYWx1ZSA6IHRoaXMuX2NvbG9yLnRvSGV4KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUkdCQSB2YWx1ZSBvZiB0aGUgY29sb3IsIGUuZy4gYHJnYmEoMjU1LCAyNTUsIDI1NSwgMSlgLlxuICAgICAqL1xuICAgIGdldCByZ2JhKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcmlnaW5hbFJnYmFWYWx1ZSA/IHRoaXMuX29yaWdpbmFsUmdiYVZhbHVlIDogdGhpcy5fY29sb3IudG9SZ2JhKCk7XG4gICAgfVxuXG4gICAgZ2V0IHIoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHRoaXMuX2NvbG9yLmdldFJlZCgpKTtcbiAgICB9XG5cbiAgICBnZXQgZygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQodGhpcy5fY29sb3IuZ2V0R3JlZW4oKSk7XG4gICAgfVxuXG4gICAgZ2V0IGIoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHRoaXMuX2NvbG9yLmdldEJsdWUoKSk7XG4gICAgfVxuXG4gICAgZ2V0IGEoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodGhpcy5fY29sb3IuZ2V0QWxwaGEoKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY29sb3I6IFRoZW1lQ29sb3I7XG4gICAgcHJpdmF0ZSBfb3JpZ2luYWxIZXhWYWx1ZTogc3RyaW5nO1xuICAgIHByaXZhdGUgX29yaWdpbmFsUmdiYVZhbHVlOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIGlucHV0TW9kZT86IENvbG9yUGlja2VySW5wdXRNb2RlKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuX2NvbG9yID0gVGhlbWVDb2xvci5wYXJzZSh2YWx1ZSk7XG5cbiAgICAgICAgLy8gUHJlc2VydmUgdGhlIGZvcm1hdCBlbnRlcmVkIGJ5IHRoZSB1c2VyIGlmIGl0J3MgdmFsaWRcbiAgICAgICAgaWYgKGlucHV0TW9kZSA9PT0gJ2hleCcpIHtcbiAgICAgICAgICAgIHRoaXMuX29yaWdpbmFsSGV4VmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChpbnB1dE1vZGUgPT09ICdyZ2JhJykge1xuICAgICAgICAgICAgdGhpcy5fb3JpZ2luYWxSZ2JhVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb2xvci50b1JnYmEoKTtcbiAgICB9XG59Il19