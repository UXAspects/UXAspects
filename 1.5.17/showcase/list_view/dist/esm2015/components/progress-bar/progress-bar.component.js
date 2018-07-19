/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
export class ProgressBarComponent {
    constructor() {
        this.value = 0;
        this.max = 100;
        this.indeterminate = false;
    }
}
ProgressBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-progress-bar',
                template: `<div *ngIf="!indeterminate" class="progressbar-track" [style.width.%]="(value / max) * 100" [style.backgroundColor]="barColor">
    <ng-content></ng-content>
</div>
<div *ngIf="indeterminate" class="progressbar-track indeterminate" [style.backgroundColor]="barColor">
    <ng-content></ng-content>
</div>`,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
ProgressBarComponent.ctorParameters = () => [];
ProgressBarComponent.propDecorators = {
    "value": [{ type: Input },],
    "max": [{ type: Input },],
    "indeterminate": [{ type: Input },],
    "trackColor": [{ type: Input },],
    "barColor": [{ type: Input },],
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3Byb2dyZXNzLWJhci9wcm9ncmVzcy1iYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVkxRSxNQUFNOztxQkFDdUIsQ0FBQzttQkFDSCxHQUFHOzZCQUNRLEtBQUs7Ozs7WUFiMUMsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFFBQVEsRUFBRTs7Ozs7T0FLUDtnQkFDSCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNsRDs7Ozs7c0JBRUksS0FBSztvQkFDTCxLQUFLOzhCQUNMLEtBQUs7MkJBQ0wsS0FBSzt5QkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1wcm9ncmVzcy1iYXInLFxuICAgIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cIiFpbmRldGVybWluYXRlXCIgY2xhc3M9XCJwcm9ncmVzc2Jhci10cmFja1wiIFtzdHlsZS53aWR0aC4lXT1cIih2YWx1ZSAvIG1heCkgKiAxMDBcIiBbc3R5bGUuYmFja2dyb3VuZENvbG9yXT1cImJhckNvbG9yXCI+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPC9kaXY+XG48ZGl2ICpuZ0lmPVwiaW5kZXRlcm1pbmF0ZVwiIGNsYXNzPVwicHJvZ3Jlc3NiYXItdHJhY2sgaW5kZXRlcm1pbmF0ZVwiIFtzdHlsZS5iYWNrZ3JvdW5kQ29sb3JdPVwiYmFyQ29sb3JcIj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L2Rpdj5gLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFByb2dyZXNzQmFyQ29tcG9uZW50IHtcbiAgICBASW5wdXQoKSB2YWx1ZTogbnVtYmVyID0gMDtcbiAgICBASW5wdXQoKSBtYXg6IG51bWJlciA9IDEwMDtcbiAgICBASW5wdXQoKSBpbmRldGVybWluYXRlOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgdHJhY2tDb2xvcjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGJhckNvbG9yOiBzdHJpbmc7XG59XG4iXX0=