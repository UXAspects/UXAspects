/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Attribute, ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { FloatingActionButtonsService } from './floating-action-buttons.service';
var FloatingActionButtonComponent = (function () {
    function FloatingActionButtonComponent(primary, fab) {
        this.fab = fab;
        this.tabindex = 1;
        this.primary = false;
        this.primary = primary !== null;
    }
    FloatingActionButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-floating-action-button',
                    template: "<button class=\"btn floating-action-button\" \n        [class.button-primary]=\"primary\" \n        [class.button-secondary]=\"!primary\" \n        (click)=\"primary ? fab.toggle() : fab.close()\">\n\n    <span class=\"hpe-icon floating-action-button-icon\" *ngIf=\"icon\" [ngClass]=\"icon\"></span>\n    <ng-content *ngIf=\"!icon\"></ng-content>\n\n</button>",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false
                },] },
    ];
    /** @nocollapse */
    FloatingActionButtonComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Attribute, args: ['fab-primary',] },] },
        { type: FloatingActionButtonsService, },
    ]; };
    FloatingActionButtonComponent.propDecorators = {
        "icon": [{ type: Input },],
        "tabindex": [{ type: HostBinding },],
    };
    return FloatingActionButtonComponent;
}());
export { FloatingActionButtonComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXRpbmctYWN0aW9uLWJ1dHRvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9mbG9hdGluZy1hY3Rpb24tYnV0dG9ucy9mbG9hdGluZy1hY3Rpb24tYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7SUF1QjdFLHVDQUFzQyxTQUF3QixHQUFpQztRQUFqQyxRQUFHLEdBQUgsR0FBRyxDQUE4Qjt3QkFKckUsQ0FBQzt1QkFFUixLQUFLO1FBR3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxLQUFLLElBQUksQ0FBQztLQUNuQzs7Z0JBdkJKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsMkJBQTJCO29CQUNyQyxRQUFRLEVBQUUseVdBUUo7b0JBQ04sZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLG1CQUFtQixFQUFFLEtBQUs7aUJBQzdCOzs7O2dEQVFnQixTQUFTLFNBQUMsYUFBYTtnQkF2Qi9CLDRCQUE0Qjs7O3lCQWtCaEMsS0FBSzs2QkFDTCxXQUFXOzt3Q0FwQmhCOztTQWlCYSw2QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBdHRyaWJ1dGUsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmxvYXRpbmdBY3Rpb25CdXR0b25zU2VydmljZSB9IGZyb20gJy4vZmxvYXRpbmctYWN0aW9uLWJ1dHRvbnMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtZmxvYXRpbmctYWN0aW9uLWJ1dHRvbicsXG4gICAgdGVtcGxhdGU6IGA8YnV0dG9uIGNsYXNzPVwiYnRuIGZsb2F0aW5nLWFjdGlvbi1idXR0b25cIiBcbiAgICAgICAgW2NsYXNzLmJ1dHRvbi1wcmltYXJ5XT1cInByaW1hcnlcIiBcbiAgICAgICAgW2NsYXNzLmJ1dHRvbi1zZWNvbmRhcnldPVwiIXByaW1hcnlcIiBcbiAgICAgICAgKGNsaWNrKT1cInByaW1hcnkgPyBmYWIudG9nZ2xlKCkgOiBmYWIuY2xvc2UoKVwiPlxuXG4gICAgPHNwYW4gY2xhc3M9XCJocGUtaWNvbiBmbG9hdGluZy1hY3Rpb24tYnV0dG9uLWljb25cIiAqbmdJZj1cImljb25cIiBbbmdDbGFzc109XCJpY29uXCI+PC9zcGFuPlxuICAgIDxuZy1jb250ZW50ICpuZ0lmPVwiIWljb25cIj48L25nLWNvbnRlbnQ+XG5cbjwvYnV0dG9uPmAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2Vcbn0pXG5leHBvcnQgY2xhc3MgRmxvYXRpbmdBY3Rpb25CdXR0b25Db21wb25lbnQge1xuXG4gICAgQElucHV0KCkgaWNvbjogc3RyaW5nO1xuICAgIEBIb3N0QmluZGluZygpIHRhYmluZGV4ID0gMTtcblxuICAgIHByaW1hcnk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKEBBdHRyaWJ1dGUoJ2ZhYi1wcmltYXJ5JykgcHJpbWFyeTogc3RyaW5nLCBwdWJsaWMgZmFiOiBGbG9hdGluZ0FjdGlvbkJ1dHRvbnNTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMucHJpbWFyeSA9IHByaW1hcnkgIT09IG51bGw7XG4gICAgfVxufSJdfQ==