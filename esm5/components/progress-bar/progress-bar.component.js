/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
var ProgressBarComponent = /** @class */ (function () {
    function ProgressBarComponent() {
        this.value = 0;
        this.min = 0;
        this.max = 100;
        this.indeterminate = false;
    }
    Object.defineProperty(ProgressBarComponent.prototype, "valueNow", {
        /** When indeteminate we should omit the valuenow label */
        get: /**
         * When indeteminate we should omit the valuenow label
         * @return {?}
         */
        function () {
            return this.indeterminate ? null : this.value;
        },
        enumerable: true,
        configurable: true
    });
    ProgressBarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-progress-bar',
                    template: "<div *ngIf=\"!indeterminate\" class=\"progressbar-track\" [style.width.%]=\"((value - min) / (max - min)) * 100\" [style.backgroundColor]=\"barColor\">\n    <ng-container *ngTemplateOutlet=\"content\"></ng-container>\n</div>\n<div *ngIf=\"indeterminate\" class=\"progressbar-track indeterminate\" [style.backgroundColor]=\"barColor\">\n    <ng-container *ngTemplateOutlet=\"content\"></ng-container>\n</div>\n\n<!-- Workaround for Multiple ng-content tags issue: https://github.com/angular/angular/issues/22972 -->\n<ng-template #content><ng-content></ng-content></ng-template>",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        role: 'progressbar'
                    }
                }] }
    ];
    ProgressBarComponent.propDecorators = {
        value: [{ type: Input }],
        min: [{ type: Input }, { type: HostBinding, args: ['attr.aria-valuemin',] }],
        max: [{ type: Input }, { type: HostBinding, args: ['attr.aria-valuemax',] }],
        indeterminate: [{ type: Input }],
        trackColor: [{ type: Input }],
        barColor: [{ type: Input }],
        valueNow: [{ type: HostBinding, args: ['attr.aria-valuenow',] }]
    };
    return ProgressBarComponent;
}());
export { ProgressBarComponent };
function ProgressBarComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    ProgressBarComponent.prototype.value;
    /** @type {?} */
    ProgressBarComponent.prototype.min;
    /** @type {?} */
    ProgressBarComponent.prototype.max;
    /** @type {?} */
    ProgressBarComponent.prototype.indeterminate;
    /** @type {?} */
    ProgressBarComponent.prototype.trackColor;
    /** @type {?} */
    ProgressBarComponent.prototype.barColor;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3Byb2dyZXNzLWJhci9wcm9ncmVzcy1iYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7OztxQkFXMUQsQ0FBQzttQkFDZ0MsQ0FBQzttQkFDRCxHQUFHOzZCQUMzQixLQUFLOztJQUt2QyxzQkFBdUMsMENBQVE7UUFEL0MsMERBQTBEOzs7OztRQUMxRDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDakQ7OztPQUFBOztnQkFuQkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLDZrQkFBNEM7b0JBQzVDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxJQUFJLEVBQUU7d0JBQ0YsSUFBSSxFQUFFLGFBQWE7cUJBQ3RCO2lCQUNKOzs7d0JBRUksS0FBSztzQkFDTCxLQUFLLFlBQUksV0FBVyxTQUFDLG9CQUFvQjtzQkFDekMsS0FBSyxZQUFJLFdBQVcsU0FBQyxvQkFBb0I7Z0NBQ3pDLEtBQUs7NkJBQ0wsS0FBSzsyQkFDTCxLQUFLOzJCQUdMLFdBQVcsU0FBQyxvQkFBb0I7OytCQW5CckM7O1NBVWEsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSG9zdEJpbmRpbmcsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtcHJvZ3Jlc3MtYmFyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcHJvZ3Jlc3MtYmFyLmNvbXBvbmVudC5odG1sJyxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBob3N0OiB7XG4gICAgICAgIHJvbGU6ICdwcm9ncmVzc2JhcidcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFByb2dyZXNzQmFyQ29tcG9uZW50IHtcbiAgICBASW5wdXQoKSB2YWx1ZTogbnVtYmVyID0gMDtcbiAgICBASW5wdXQoKSBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS12YWx1ZW1pbicpIG1pbjogbnVtYmVyID0gMDtcbiAgICBASW5wdXQoKSBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS12YWx1ZW1heCcpIG1heDogbnVtYmVyID0gMTAwO1xuICAgIEBJbnB1dCgpIGluZGV0ZXJtaW5hdGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSB0cmFja0NvbG9yOiBzdHJpbmc7XG4gICAgQElucHV0KCkgYmFyQ29sb3I6IHN0cmluZztcblxuICAgIC8qKiBXaGVuIGluZGV0ZW1pbmF0ZSB3ZSBzaG91bGQgb21pdCB0aGUgdmFsdWVub3cgbGFiZWwgKi9cbiAgICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS12YWx1ZW5vdycpIGdldCB2YWx1ZU5vdygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5kZXRlcm1pbmF0ZSA/IG51bGwgOiB0aGlzLnZhbHVlO1xuICAgIH1cbn1cbiJdfQ==