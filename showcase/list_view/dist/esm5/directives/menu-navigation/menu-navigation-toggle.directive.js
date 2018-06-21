/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
var MenuNavigationToggleDirective = (function () {
    function MenuNavigationToggleDirective(_elementRef) {
        this._elementRef = _elementRef;
        this.menuPosition = 'bottom';
        this.menuOpenChange = new EventEmitter();
        this.keyEnter = new EventEmitter();
    }
    Object.defineProperty(MenuNavigationToggleDirective.prototype, "menuOpen", {
        get: /**
         * @return {?}
         */
        function () {
            return this._menuOpen;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._menuOpen = value;
            this.menuOpenChange.emit(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MenuNavigationToggleDirective.prototype.focus = /**
     * @return {?}
     */
    function () {
        this._elementRef.nativeElement.focus();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MenuNavigationToggleDirective.prototype.keydownHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (this.isKeyMatch(event.key)) {
            // Open the menu
            this.menuOpen = true;
            // Allow the menu to init, then send the event to give it focus
            setTimeout(function () {
                _this.keyEnter.emit();
            });
            event.preventDefault();
            event.stopPropagation();
        }
    };
    /**
     * @param {?} key
     * @return {?}
     */
    MenuNavigationToggleDirective.prototype.isKeyMatch = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        switch (key) {
            case 'Enter':
            case ' ':
                return true;
            case 'ArrowUp':
            case 'Up':
                return this.menuPosition === 'top';
            case 'ArrowDown':
            case 'Down':
                return this.menuPosition === 'bottom';
            case 'ArrowLeft':
            case 'Left':
                return this.menuPosition === 'left';
            case 'ArrowRight':
            case 'Right':
                return this.menuPosition === 'right';
        }
        return false;
    };
    MenuNavigationToggleDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxMenuNavigationToggle]',
                    exportAs: 'uxMenuNavigationToggle'
                },] },
    ];
    /** @nocollapse */
    MenuNavigationToggleDirective.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    MenuNavigationToggleDirective.propDecorators = {
        "menuOpen": [{ type: Input },],
        "menuPosition": [{ type: Input },],
        "menuOpenChange": [{ type: Output },],
        "keydownHandler": [{ type: HostListener, args: ['keydown', ['$event'],] },],
    };
    return MenuNavigationToggleDirective;
}());
export { MenuNavigationToggleDirective };
function MenuNavigationToggleDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MenuNavigationToggleDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MenuNavigationToggleDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MenuNavigationToggleDirective.propDecorators;
    /** @type {?} */
    MenuNavigationToggleDirective.prototype.menuPosition;
    /** @type {?} */
    MenuNavigationToggleDirective.prototype.menuOpenChange;
    /** @type {?} */
    MenuNavigationToggleDirective.prototype.keyEnter;
    /** @type {?} */
    MenuNavigationToggleDirective.prototype._menuOpen;
    /** @type {?} */
    MenuNavigationToggleDirective.prototype._elementRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1uYXZpZ2F0aW9uLXRvZ2dsZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9tZW51LW5hdmlnYXRpb24vbWVudS1uYXZpZ2F0aW9uLXRvZ2dsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQzs7SUE0QjdGLHVDQUFvQixXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTs0QkFUUyxRQUFROzhCQUczQyxJQUFJLFlBQVksRUFBVzt3QkFFakMsSUFBSSxZQUFZLEVBQVE7S0FJYTswQkFuQjVDLG1EQUFROzs7OztZQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDOzs7Ozs7UUFHMUIsVUFBYSxLQUFjO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ25DOzs7Ozs7O0lBY0QsNkNBQUs7OztJQUFMO1FBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7S0FDMUM7Ozs7O0lBR0Qsc0RBQWM7Ozs7Y0FBQyxLQUFvQjs7UUFFL0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUc3QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQzs7WUFHckIsVUFBVSxDQUFDO2dCQUNQLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDeEIsQ0FBQyxDQUFDO1lBRUgsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUMzQjs7Ozs7O0lBR0csa0RBQVU7Ozs7Y0FBQyxHQUFXO1FBQzFCLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDVixLQUFLLE9BQU8sQ0FBQztZQUNiLEtBQUssR0FBRztnQkFDSixNQUFNLENBQUMsSUFBSSxDQUFDO1lBRWhCLEtBQUssU0FBUyxDQUFDO1lBQ2YsS0FBSyxJQUFJO2dCQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxLQUFLLEtBQUssQ0FBQztZQUV2QyxLQUFLLFdBQVcsQ0FBQztZQUNqQixLQUFLLE1BQU07Z0JBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEtBQUssUUFBUSxDQUFDO1lBRTFDLEtBQUssV0FBVyxDQUFDO1lBQ2pCLEtBQUssTUFBTTtnQkFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksS0FBSyxNQUFNLENBQUM7WUFFeEMsS0FBSyxZQUFZLENBQUM7WUFDbEIsS0FBSyxPQUFPO2dCQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxLQUFLLE9BQU8sQ0FBQztTQUM1QztRQUVELE1BQU0sQ0FBQyxLQUFLLENBQUM7OztnQkF6RXBCLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsMEJBQTBCO29CQUNwQyxRQUFRLEVBQUUsd0JBQXdCO2lCQUNyQzs7OztnQkFMbUIsVUFBVTs7OzZCQVF6QixLQUFLO2lDQVVMLEtBQUs7bUNBR0wsTUFBTTttQ0FhTixZQUFZLFNBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDOzt3Q0FsQ3ZDOztTQU1hLDZCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhNZW51TmF2aWdhdGlvblRvZ2dsZV0nLFxuICAgIGV4cG9ydEFzOiAndXhNZW51TmF2aWdhdGlvblRvZ2dsZSdcbn0pXG5leHBvcnQgY2xhc3MgTWVudU5hdmlnYXRpb25Ub2dnbGVEaXJlY3RpdmUge1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgbWVudU9wZW4oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZW51T3BlbjtcbiAgICB9XG5cbiAgICBzZXQgbWVudU9wZW4odmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fbWVudU9wZW4gPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5tZW51T3BlbkNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIG1lbnVQb3NpdGlvbjogJ3RvcCcgfCAncmlnaHQnIHwgJ2JvdHRvbScgfCAnbGVmdCcgPSAnYm90dG9tJztcblxuICAgIEBPdXRwdXQoKVxuICAgIG1lbnVPcGVuQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAga2V5RW50ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICBwcml2YXRlIF9tZW51T3BlbjogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHsgfVxuXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICAgIGtleWRvd25IYW5kbGVyKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNLZXlNYXRjaChldmVudC5rZXkpKSB7XG5cbiAgICAgICAgICAgIC8vIE9wZW4gdGhlIG1lbnVcbiAgICAgICAgICAgIHRoaXMubWVudU9wZW4gPSB0cnVlO1xuXG4gICAgICAgICAgICAvLyBBbGxvdyB0aGUgbWVudSB0byBpbml0LCB0aGVuIHNlbmQgdGhlIGV2ZW50IHRvIGdpdmUgaXQgZm9jdXNcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMua2V5RW50ZXIuZW1pdCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaXNLZXlNYXRjaChrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgY2FzZSAnICc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgY2FzZSAnVXAnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1lbnVQb3NpdGlvbiA9PT0gJ3RvcCc7XG5cbiAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICBjYXNlICdEb3duJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tZW51UG9zaXRpb24gPT09ICdib3R0b20nO1xuXG4gICAgICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgICAgY2FzZSAnTGVmdCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWVudVBvc2l0aW9uID09PSAnbGVmdCc7XG5cbiAgICAgICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgY2FzZSAnUmlnaHQnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1lbnVQb3NpdGlvbiA9PT0gJ3JpZ2h0JztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59Il19