/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component, Directive } from '@angular/core';
var EboxComponent = /** @class */ (function () {
    function EboxComponent() {
    }
    EboxComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-ebox',
                    template: "<div class=\"ux-ebox-header\">\n    <ng-content select=\"ux-ebox-header\"></ng-content>\n</div>\n\n<div class=\"ux-ebox-content\">\n    <ng-content select=\"ux-ebox-content\"></ng-content>\n</div>",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    return EboxComponent;
}());
export { EboxComponent };
var EboxHeaderDirective = /** @class */ (function () {
    function EboxHeaderDirective() {
    }
    EboxHeaderDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'ux-ebox-header'
                },] }
    ];
    return EboxHeaderDirective;
}());
export { EboxHeaderDirective };
var EboxContentDirective = /** @class */ (function () {
    function EboxContentDirective() {
    }
    EboxContentDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'ux-ebox-content'
                },] }
    ];
    return EboxContentDirective;
}());
export { EboxContentDirective };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWJveC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9lYm94L2Vib3guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Z0JBRTdFLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsU0FBUztvQkFDbkIsZ05BQW9DO29CQUNwQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDbEQ7O3dCQU5EOztTQU9hLGFBQWE7Ozs7O2dCQUV6QixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGdCQUFnQjtpQkFDN0I7OzhCQVhEOztTQVlhLG1CQUFtQjs7Ozs7Z0JBRS9CLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsaUJBQWlCO2lCQUM5Qjs7K0JBaEJEOztTQWlCYSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBEaXJlY3RpdmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1lYm94JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZWJveC5jb21wb25lbnQuaHRtbCcsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgRWJveENvbXBvbmVudCB7IH1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICd1eC1lYm94LWhlYWRlcidcbn0pXG5leHBvcnQgY2xhc3MgRWJveEhlYWRlckRpcmVjdGl2ZSB7IH1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICd1eC1lYm94LWNvbnRlbnQnXG59KVxuZXhwb3J0IGNsYXNzIEVib3hDb250ZW50RGlyZWN0aXZlIHsgfVxuIl19