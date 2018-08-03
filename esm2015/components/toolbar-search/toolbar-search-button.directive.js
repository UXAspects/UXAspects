/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, HostListener, Output, EventEmitter, ElementRef } from '@angular/core';
export class ToolbarSearchButtonDirective {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        this.clicked = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get width() {
        return this._elementRef.nativeElement.offsetWidth;
    }
    /**
     * @return {?}
     */
    clickHandler() {
        this.clicked.emit();
    }
}
ToolbarSearchButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxToolbarSearchButton]'
            },] }
];
/** @nocollapse */
ToolbarSearchButtonDirective.ctorParameters = () => [
    { type: ElementRef }
];
ToolbarSearchButtonDirective.propDecorators = {
    clicked: [{ type: Output }],
    clickHandler: [{ type: HostListener, args: ['click',] }]
};
function ToolbarSearchButtonDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    ToolbarSearchButtonDirective.prototype.clicked;
    /** @type {?} */
    ToolbarSearchButtonDirective.prototype._elementRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJhci1zZWFyY2gtYnV0dG9uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3Rvb2xiYXItc2VhcmNoL3Rvb2xiYXItc2VhcmNoLWJ1dHRvbi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSzFGLE1BQU07Ozs7SUFTRixZQUFvQixXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTt1QkFOakMsSUFBSSxZQUFZLEVBQVE7S0FNYzs7OztJQUpoRCxJQUFJLEtBQUs7UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDO0tBQ3JEOzs7O0lBS0QsWUFBWTtRQUNSLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDdkI7OztZQWpCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHlCQUF5QjthQUN0Qzs7OztZQUp1RCxVQUFVOzs7c0JBTzdELE1BQU07MkJBU04sWUFBWSxTQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhUb29sYmFyU2VhcmNoQnV0dG9uXSdcbn0pXG5leHBvcnQgY2xhc3MgVG9vbGJhclNlYXJjaEJ1dHRvbkRpcmVjdGl2ZSB7XG5cbiAgICBAT3V0cHV0KClcbiAgICBjbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgZ2V0IHdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZikgeyB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gICAgY2xpY2tIYW5kbGVyKCkge1xuICAgICAgICB0aGlzLmNsaWNrZWQuZW1pdCgpO1xuICAgIH1cbn1cbiJdfQ==