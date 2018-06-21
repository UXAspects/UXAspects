/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Attribute, ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { FloatingActionButtonsService } from './floating-action-buttons.service';
export class FloatingActionButtonComponent {
    /**
     * @param {?} primary
     * @param {?} fab
     */
    constructor(primary, fab) {
        this.fab = fab;
        this.tabindex = 1;
        this.primary = false;
        this.primary = primary !== null;
    }
}
FloatingActionButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-floating-action-button',
                template: `<button class="btn floating-action-button" 
        [class.button-primary]="primary" 
        [class.button-secondary]="!primary" 
        (click)="primary ? fab.open() : fab.close()">

    <span class="hpe-icon floating-action-button-icon" *ngIf="icon" [ngClass]="icon"></span>
    <ng-content *ngIf="!icon"></ng-content>

</button>`,
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false
            },] },
];
/** @nocollapse */
FloatingActionButtonComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Attribute, args: ['fab-primary',] },] },
    { type: FloatingActionButtonsService, },
];
FloatingActionButtonComponent.propDecorators = {
    "icon": [{ type: Input },],
    "tabindex": [{ type: HostBinding },],
};
function FloatingActionButtonComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FloatingActionButtonComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FloatingActionButtonComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    FloatingActionButtonComponent.propDecorators;
    /** @type {?} */
    FloatingActionButtonComponent.prototype.icon;
    /** @type {?} */
    FloatingActionButtonComponent.prototype.tabindex;
    /** @type {?} */
    FloatingActionButtonComponent.prototype.primary;
    /** @type {?} */
    FloatingActionButtonComponent.prototype.fab;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXRpbmctYWN0aW9uLWJ1dHRvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9mbG9hdGluZy1hY3Rpb24tYnV0dG9ucy9mbG9hdGluZy1hY3Rpb24tYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQWdCakYsTUFBTTs7Ozs7SUFPRixZQUFzQyxTQUF3QixHQUFpQztRQUFqQyxRQUFHLEdBQUgsR0FBRyxDQUE4Qjt3QkFKckUsQ0FBQzt1QkFFUixLQUFLO1FBR3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxLQUFLLElBQUksQ0FBQztLQUNuQzs7O1lBdkJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsMkJBQTJCO2dCQUNyQyxRQUFRLEVBQUU7Ozs7Ozs7O1VBUUo7Z0JBQ04sZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLG1CQUFtQixFQUFFLEtBQUs7YUFDN0I7Ozs7NENBUWdCLFNBQVMsU0FBQyxhQUFhO1lBdkIvQiw0QkFBNEI7OztxQkFrQmhDLEtBQUs7eUJBQ0wsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEF0dHJpYnV0ZSwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSG9zdEJpbmRpbmcsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGbG9hdGluZ0FjdGlvbkJ1dHRvbnNTZXJ2aWNlIH0gZnJvbSAnLi9mbG9hdGluZy1hY3Rpb24tYnV0dG9ucy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1mbG9hdGluZy1hY3Rpb24tYnV0dG9uJyxcbiAgICB0ZW1wbGF0ZTogYDxidXR0b24gY2xhc3M9XCJidG4gZmxvYXRpbmctYWN0aW9uLWJ1dHRvblwiIFxuICAgICAgICBbY2xhc3MuYnV0dG9uLXByaW1hcnldPVwicHJpbWFyeVwiIFxuICAgICAgICBbY2xhc3MuYnV0dG9uLXNlY29uZGFyeV09XCIhcHJpbWFyeVwiIFxuICAgICAgICAoY2xpY2spPVwicHJpbWFyeSA/IGZhYi5vcGVuKCkgOiBmYWIuY2xvc2UoKVwiPlxuXG4gICAgPHNwYW4gY2xhc3M9XCJocGUtaWNvbiBmbG9hdGluZy1hY3Rpb24tYnV0dG9uLWljb25cIiAqbmdJZj1cImljb25cIiBbbmdDbGFzc109XCJpY29uXCI+PC9zcGFuPlxuICAgIDxuZy1jb250ZW50ICpuZ0lmPVwiIWljb25cIj48L25nLWNvbnRlbnQ+XG5cbjwvYnV0dG9uPmAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2Vcbn0pXG5leHBvcnQgY2xhc3MgRmxvYXRpbmdBY3Rpb25CdXR0b25Db21wb25lbnQge1xuXG4gICAgQElucHV0KCkgaWNvbjogc3RyaW5nO1xuICAgIEBIb3N0QmluZGluZygpIHRhYmluZGV4ID0gMTtcblxuICAgIHByaW1hcnk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKEBBdHRyaWJ1dGUoJ2ZhYi1wcmltYXJ5JykgcHJpbWFyeTogc3RyaW5nLCBwdWJsaWMgZmFiOiBGbG9hdGluZ0FjdGlvbkJ1dHRvbnNTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMucHJpbWFyeSA9IHByaW1hcnkgIT09IG51bGw7XG4gICAgfVxufSJdfQ==