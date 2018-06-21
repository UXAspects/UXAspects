/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, HostListener, Output, EventEmitter, ElementRef } from '@angular/core';
var ToolbarSearchButtonDirective = (function () {
    function ToolbarSearchButtonDirective(_elementRef) {
        this._elementRef = _elementRef;
        this.clicked = new EventEmitter();
    }
    Object.defineProperty(ToolbarSearchButtonDirective.prototype, "width", {
        get: /**
         * @return {?}
         */
        function () {
            return this._elementRef.nativeElement.offsetWidth;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ToolbarSearchButtonDirective.prototype.clickHandler = /**
     * @return {?}
     */
    function () {
        this.clicked.emit();
    };
    ToolbarSearchButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxToolbarSearchButton]'
                },] },
    ];
    /** @nocollapse */
    ToolbarSearchButtonDirective.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    ToolbarSearchButtonDirective.propDecorators = {
        "clicked": [{ type: Output },],
        "clickHandler": [{ type: HostListener, args: ['click',] },],
    };
    return ToolbarSearchButtonDirective;
}());
export { ToolbarSearchButtonDirective };
function ToolbarSearchButtonDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ToolbarSearchButtonDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ToolbarSearchButtonDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    ToolbarSearchButtonDirective.propDecorators;
    /** @type {?} */
    ToolbarSearchButtonDirective.prototype.clicked;
    /** @type {?} */
    ToolbarSearchButtonDirective.prototype._elementRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJhci1zZWFyY2gtYnV0dG9uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3Rvb2xiYXItc2VhcmNoL3Rvb2xiYXItc2VhcmNoLWJ1dHRvbi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztJQWN0RixzQ0FBb0IsV0FBdUI7UUFBdkIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7dUJBTmpDLElBQUksWUFBWSxFQUFRO0tBTWM7SUFKaEQsc0JBQUksK0NBQUs7Ozs7UUFBVDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7U0FDckQ7OztPQUFBOzs7O0lBS0QsbURBQVk7Ozs7UUFDUixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDOzs7Z0JBaEIzQixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHlCQUF5QjtpQkFDdEM7Ozs7Z0JBSnVELFVBQVU7Ozs0QkFPN0QsTUFBTTtpQ0FTTixZQUFZLFNBQUMsT0FBTzs7dUNBaEJ6Qjs7U0FLYSw0QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhUb29sYmFyU2VhcmNoQnV0dG9uXSdcbn0pXG5leHBvcnQgY2xhc3MgVG9vbGJhclNlYXJjaEJ1dHRvbkRpcmVjdGl2ZSB7XG5cbiAgICBAT3V0cHV0KClcbiAgICBjbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgZ2V0IHdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZikgeyB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gICAgY2xpY2tIYW5kbGVyKCkge1xuICAgICAgICB0aGlzLmNsaWNrZWQuZW1pdCgpO1xuICAgIH1cbn1cbiJdfQ==