/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
export class ProgressBarComponent {
    constructor() {
        this.value = 0;
        this.min = 0;
        this.max = 100;
        this.indeterminate = false;
    }
    /**
     * When indeteminate we should omit the valuenow label
     * @return {?}
     */
    get valueNow() {
        return this.indeterminate ? null : this.value;
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3Byb2dyZXNzLWJhci9wcm9ncmVzcy1iYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFVdkYsTUFBTTs7cUJBQ3VCLENBQUM7bUJBQ2dDLENBQUM7bUJBQ0QsR0FBRzs2QkFDM0IsS0FBSzs7Ozs7O0lBS3ZDLElBQXVDLFFBQVE7UUFDM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztLQUNqRDs7O1lBbkJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQiw2a0JBQTRDO2dCQUM1QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxhQUFhO2lCQUN0QjthQUNKOzs7b0JBRUksS0FBSztrQkFDTCxLQUFLLFlBQUksV0FBVyxTQUFDLG9CQUFvQjtrQkFDekMsS0FBSyxZQUFJLFdBQVcsU0FBQyxvQkFBb0I7NEJBQ3pDLEtBQUs7eUJBQ0wsS0FBSzt1QkFDTCxLQUFLO3VCQUdMLFdBQVcsU0FBQyxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1wcm9ncmVzcy1iYXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9wcm9ncmVzcy1iYXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgcm9sZTogJ3Byb2dyZXNzYmFyJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgUHJvZ3Jlc3NCYXJDb21wb25lbnQge1xuICAgIEBJbnB1dCgpIHZhbHVlOiBudW1iZXIgPSAwO1xuICAgIEBJbnB1dCgpIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLXZhbHVlbWluJykgbWluOiBudW1iZXIgPSAwO1xuICAgIEBJbnB1dCgpIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLXZhbHVlbWF4JykgbWF4OiBudW1iZXIgPSAxMDA7XG4gICAgQElucHV0KCkgaW5kZXRlcm1pbmF0ZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHRyYWNrQ29sb3I6IHN0cmluZztcbiAgICBASW5wdXQoKSBiYXJDb2xvcjogc3RyaW5nO1xuXG4gICAgLyoqIFdoZW4gaW5kZXRlbWluYXRlIHdlIHNob3VsZCBvbWl0IHRoZSB2YWx1ZW5vdyBsYWJlbCAqL1xuICAgIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLXZhbHVlbm93JykgZ2V0IHZhbHVlTm93KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbmRldGVybWluYXRlID8gbnVsbCA6IHRoaXMudmFsdWU7XG4gICAgfVxufVxuIl19