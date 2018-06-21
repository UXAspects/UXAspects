/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
var ProgressBarComponent = (function () {
    function ProgressBarComponent() {
        this.value = 0;
        this.max = 100;
        this.indeterminate = false;
    }
    ProgressBarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-progress-bar',
                    template: "<div *ngIf=\"!indeterminate\" class=\"progressbar-track\" [style.width.%]=\"(value / max) * 100\" [style.backgroundColor]=\"barColor\">\n    <ng-content></ng-content>\n</div>\n<div *ngIf=\"indeterminate\" class=\"progressbar-track indeterminate\" [style.backgroundColor]=\"barColor\">\n    <ng-content></ng-content>\n</div>",
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    ProgressBarComponent.propDecorators = {
        "value": [{ type: Input },],
        "max": [{ type: Input },],
        "indeterminate": [{ type: Input },],
        "trackColor": [{ type: Input },],
        "barColor": [{ type: Input },],
    };
    return ProgressBarComponent;
}());
export { ProgressBarComponent };
function ProgressBarComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ProgressBarComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ProgressBarComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    ProgressBarComponent.propDecorators;
    /** @type {?} */
    ProgressBarComponent.prototype.value;
    /** @type {?} */
    ProgressBarComponent.prototype.max;
    /** @type {?} */
    ProgressBarComponent.prototype.indeterminate;
    /** @type {?} */
    ProgressBarComponent.prototype.trackColor;
    /** @type {?} */
    ProgressBarComponent.prototype.barColor;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3Byb2dyZXNzLWJhci9wcm9ncmVzcy1iYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O3FCQWE3QyxDQUFDO21CQUNILEdBQUc7NkJBQ1EsS0FBSzs7O2dCQWIxQyxTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsUUFBUSxFQUFFLHFVQUtQO29CQUNILGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNsRDs7OzswQkFFSSxLQUFLO3dCQUNMLEtBQUs7a0NBQ0wsS0FBSzsrQkFDTCxLQUFLOzZCQUNMLEtBQUs7OytCQWpCVjs7U0FZYSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LXByb2dyZXNzLWJhcicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwiIWluZGV0ZXJtaW5hdGVcIiBjbGFzcz1cInByb2dyZXNzYmFyLXRyYWNrXCIgW3N0eWxlLndpZHRoLiVdPVwiKHZhbHVlIC8gbWF4KSAqIDEwMFwiIFtzdHlsZS5iYWNrZ3JvdW5kQ29sb3JdPVwiYmFyQ29sb3JcIj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L2Rpdj5cbjxkaXYgKm5nSWY9XCJpbmRldGVybWluYXRlXCIgY2xhc3M9XCJwcm9ncmVzc2Jhci10cmFjayBpbmRldGVybWluYXRlXCIgW3N0eWxlLmJhY2tncm91bmRDb2xvcl09XCJiYXJDb2xvclwiPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjwvZGl2PmAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgUHJvZ3Jlc3NCYXJDb21wb25lbnQge1xuICAgIEBJbnB1dCgpIHZhbHVlOiBudW1iZXIgPSAwO1xuICAgIEBJbnB1dCgpIG1heDogbnVtYmVyID0gMTAwO1xuICAgIEBJbnB1dCgpIGluZGV0ZXJtaW5hdGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSB0cmFja0NvbG9yOiBzdHJpbmc7XG4gICAgQElucHV0KCkgYmFyQ29sb3I6IHN0cmluZztcbn1cbiJdfQ==