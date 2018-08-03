/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
var MenuNavigationToggleDirective = /** @class */ (function () {
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
                },] }
    ];
    /** @nocollapse */
    MenuNavigationToggleDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    MenuNavigationToggleDirective.propDecorators = {
        menuOpen: [{ type: Input }],
        menuPosition: [{ type: Input }],
        menuOpenChange: [{ type: Output }],
        keydownHandler: [{ type: HostListener, args: ['keydown', ['$event'],] }]
    };
    return MenuNavigationToggleDirective;
}());
export { MenuNavigationToggleDirective };
function MenuNavigationToggleDirective_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1uYXZpZ2F0aW9uLXRvZ2dsZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9tZW51LW5hdmlnYXRpb24vbWVudS1uYXZpZ2F0aW9uLXRvZ2dsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQzs7SUE0QjdGLHVDQUFvQixXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTs0QkFUUyxRQUFROzhCQUczQyxJQUFJLFlBQVksRUFBVzt3QkFFakMsSUFBSSxZQUFZLEVBQVE7S0FJYTtJQXBCaEQsc0JBQ0ksbURBQVE7Ozs7UUFEWjtZQUVJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQ3pCOzs7OztRQUVELFVBQWEsS0FBYztZQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNuQzs7O09BTEE7Ozs7SUFtQkQsNkNBQUs7OztJQUFMO1FBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7S0FDMUM7Ozs7O0lBR0Qsc0RBQWM7Ozs7SUFEZCxVQUNlLEtBQW9CO1FBRG5DLGlCQWdCQztRQWJHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFHN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7O1lBR3JCLFVBQVUsQ0FBQztnQkFDUCxLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ3hCLENBQUMsQ0FBQztZQUVILEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDM0I7S0FDSjs7Ozs7SUFFTyxrREFBVTs7OztjQUFDLEdBQVc7UUFDMUIsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNWLEtBQUssT0FBTyxDQUFDO1lBQ2IsS0FBSyxHQUFHO2dCQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFFaEIsS0FBSyxTQUFTLENBQUM7WUFDZixLQUFLLElBQUk7Z0JBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEtBQUssS0FBSyxDQUFDO1lBRXZDLEtBQUssV0FBVyxDQUFDO1lBQ2pCLEtBQUssTUFBTTtnQkFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksS0FBSyxRQUFRLENBQUM7WUFFMUMsS0FBSyxXQUFXLENBQUM7WUFDakIsS0FBSyxNQUFNO2dCQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxLQUFLLE1BQU0sQ0FBQztZQUV4QyxLQUFLLFlBQVksQ0FBQztZQUNsQixLQUFLLE9BQU87Z0JBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEtBQUssT0FBTyxDQUFDO1NBQzVDO1FBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQzs7O2dCQXpFcEIsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSwwQkFBMEI7b0JBQ3BDLFFBQVEsRUFBRSx3QkFBd0I7aUJBQ3JDOzs7O2dCQUxtQixVQUFVOzs7MkJBUXpCLEtBQUs7K0JBVUwsS0FBSztpQ0FHTCxNQUFNO2lDQWFOLFlBQVksU0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7O3dDQWxDdkM7O1NBTWEsNkJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t1eE1lbnVOYXZpZ2F0aW9uVG9nZ2xlXScsXG4gICAgZXhwb3J0QXM6ICd1eE1lbnVOYXZpZ2F0aW9uVG9nZ2xlJ1xufSlcbmV4cG9ydCBjbGFzcyBNZW51TmF2aWdhdGlvblRvZ2dsZURpcmVjdGl2ZSB7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBtZW51T3BlbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lbnVPcGVuO1xuICAgIH1cblxuICAgIHNldCBtZW51T3Blbih2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9tZW51T3BlbiA9IHZhbHVlO1xuICAgICAgICB0aGlzLm1lbnVPcGVuQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgbWVudVBvc2l0aW9uOiAndG9wJyB8ICdyaWdodCcgfCAnYm90dG9tJyB8ICdsZWZ0JyA9ICdib3R0b20nO1xuXG4gICAgQE91dHB1dCgpXG4gICAgbWVudU9wZW5DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICBrZXlFbnRlciA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgIHByaXZhdGUgX21lbnVPcGVuOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZikgeyB9XG5cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gICAga2V5ZG93bkhhbmRsZXIoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcblxuICAgICAgICBpZiAodGhpcy5pc0tleU1hdGNoKGV2ZW50LmtleSkpIHtcblxuICAgICAgICAgICAgLy8gT3BlbiB0aGUgbWVudVxuICAgICAgICAgICAgdGhpcy5tZW51T3BlbiA9IHRydWU7XG5cbiAgICAgICAgICAgIC8vIEFsbG93IHRoZSBtZW51IHRvIGluaXQsIHRoZW4gc2VuZCB0aGUgZXZlbnQgdG8gZ2l2ZSBpdCBmb2N1c1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlFbnRlci5lbWl0KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0tleU1hdGNoKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICBjYXNlICcgJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICBjYXNlICdVcCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWVudVBvc2l0aW9uID09PSAndG9wJztcblxuICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgIGNhc2UgJ0Rvd24nOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1lbnVQb3NpdGlvbiA9PT0gJ2JvdHRvbSc7XG5cbiAgICAgICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICBjYXNlICdMZWZ0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tZW51UG9zaXRpb24gPT09ICdsZWZ0JztcblxuICAgICAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgICAgICBjYXNlICdSaWdodCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWVudVBvc2l0aW9uID09PSAncmlnaHQnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn0iXX0=