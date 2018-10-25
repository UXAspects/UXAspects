/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { DOWN_ARROW, END, ESCAPE, HOME, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { DOCUMENT } from '@angular/common';
import { ContentChildren, Directive, ElementRef, EventEmitter, HostListener, Inject, Input, Output, QueryList } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { MenuNavigationItemDirective } from './menu-navigation-item.directive';
import { MenuNavigationToggleDirective } from './menu-navigation-toggle.directive';
import { MenuNavigationService } from './menu-navigation.service';
var MenuNavigationDirective = /** @class */ (function () {
    function MenuNavigationDirective(_service, _elementRef, _document) {
        this._service = _service;
        this._elementRef = _elementRef;
        this._document = _document;
        this.toggleButtonPosition = 'top';
        this.navigatedOut = new EventEmitter();
        this._onDestroy = new Subject();
    }
    Object.defineProperty(MenuNavigationDirective.prototype, "activeIndex", {
        get: /**
         * @return {?}
         */
        function () {
            return this._itemsOrdered.indexOf(this._service.active$.value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MenuNavigationDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.toggleButton) {
            this.toggleButton.keyEnter.pipe(takeUntil(this._onDestroy))
                .subscribe(function () { return _this.focusFirst(); });
        }
    };
    /**
     * @return {?}
     */
    MenuNavigationDirective.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.items.changes.pipe(takeUntil(this._onDestroy))
            .subscribe(function () { return _this._itemsOrdered = _this.items.toArray(); });
        this._itemsOrdered = this.items.toArray();
    };
    /**
     * @return {?}
     */
    MenuNavigationDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /**
     * @return {?}
     */
    MenuNavigationDirective.prototype.focusFirst = /**
     * @return {?}
     */
    function () {
        this.moveFirst();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MenuNavigationDirective.prototype.keydownHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // Only handle events when focus in within the list of menu items
        if (!this._elementRef.nativeElement.contains(this._document.activeElement)) {
            return;
        }
        var /** @type {?} */ handled = false;
        switch (event.which) {
            case UP_ARROW:
                this.movePrevious(event);
                handled = true;
                break;
            case DOWN_ARROW:
                this.moveNext(event);
                handled = true;
                break;
            case LEFT_ARROW:
                if (this.toggleButtonPosition === 'left') {
                    this.moveToToggleButton(event);
                    handled = true;
                }
                break;
            case RIGHT_ARROW:
                if (this.toggleButtonPosition === 'right') {
                    this.moveToToggleButton(event);
                    handled = true;
                }
                break;
            case HOME:
                this.moveFirst();
                handled = true;
                break;
            case END:
                this.moveLast();
                handled = true;
                break;
            case ESCAPE:
                this.navigatedOut.emit(event);
                handled = true;
                break;
        }
        if (handled) {
            event.preventDefault();
            event.stopPropagation();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MenuNavigationDirective.prototype.moveNext = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // Do nothing if there's no active menu item registered
        if (this.activeIndex < 0) {
            return;
        }
        var /** @type {?} */ nextIndex = this.activeIndex + 1;
        if (nextIndex < this._itemsOrdered.length) {
            // Activate the next menu item
            // (uxMenuNavigationItem subscribes to this and applies focus if it matches)
            this._service.active$.next(this._itemsOrdered[nextIndex]);
        }
        else {
            // Check if focus went out of bounds in the direction of the origin toggle button
            if (this.toggleButtonPosition === 'bottom') {
                this.moveToToggleButton(event);
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MenuNavigationDirective.prototype.movePrevious = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // Do nothing if there's no active menu item registered
        if (this.activeIndex < 0) {
            return;
        }
        var /** @type {?} */ nextIndex = this.activeIndex - 1;
        if (nextIndex >= 0) {
            // Activate the previous menu item
            // (uxMenuNavigationItem subscribes to this and applies focus if it matches)
            this._service.active$.next(this._itemsOrdered[nextIndex]);
        }
        else {
            // Check if focus went out of bounds in the direction of the origin toggle button
            if (this.toggleButtonPosition === 'top') {
                this.moveToToggleButton(event);
            }
        }
    };
    /**
     * @return {?}
     */
    MenuNavigationDirective.prototype.moveFirst = /**
     * @return {?}
     */
    function () {
        if (this._itemsOrdered.length > 0) {
            this._service.active$.next(this._itemsOrdered[0]);
        }
    };
    /**
     * @return {?}
     */
    MenuNavigationDirective.prototype.moveLast = /**
     * @return {?}
     */
    function () {
        if (this._itemsOrdered.length > 0) {
            this._service.active$.next(this._itemsOrdered[this._itemsOrdered.length - 1]);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MenuNavigationDirective.prototype.moveToToggleButton = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.toggleButton) {
            this.toggleButton.focus();
            this.toggleButton.menuOpen = false;
        }
        this.navigatedOut.emit(event);
    };
    MenuNavigationDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxMenuNavigation]',
                    exportAs: 'uxMenuNavigation',
                    providers: [MenuNavigationService]
                },] }
    ];
    /** @nocollapse */
    MenuNavigationDirective.ctorParameters = function () { return [
        { type: MenuNavigationService },
        { type: ElementRef },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    MenuNavigationDirective.propDecorators = {
        toggleButton: [{ type: Input }],
        toggleButtonPosition: [{ type: Input }],
        navigatedOut: [{ type: Output }],
        items: [{ type: ContentChildren, args: [MenuNavigationItemDirective, { descendants: true },] }],
        keydownHandler: [{ type: HostListener, args: ['document:keydown', ['$event'],] }]
    };
    return MenuNavigationDirective;
}());
export { MenuNavigationDirective };
function MenuNavigationDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    MenuNavigationDirective.prototype.toggleButton;
    /** @type {?} */
    MenuNavigationDirective.prototype.toggleButtonPosition;
    /** @type {?} */
    MenuNavigationDirective.prototype.navigatedOut;
    /** @type {?} */
    MenuNavigationDirective.prototype.items;
    /** @type {?} */
    MenuNavigationDirective.prototype._itemsOrdered;
    /** @type {?} */
    MenuNavigationDirective.prototype._onDestroy;
    /** @type {?} */
    MenuNavigationDirective.prototype._service;
    /** @type {?} */
    MenuNavigationDirective.prototype._elementRef;
    /** @type {?} */
    MenuNavigationDirective.prototype._document;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1uYXZpZ2F0aW9uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL21lbnUtbmF2aWdhdGlvbi9tZW51LW5hdmlnYXRpb24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDekcsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBb0IsZUFBZSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFLLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDOztJQTRCOUQsaUNBQ1ksVUFDQSxhQUNrQixTQUFjO1FBRmhDLGFBQVEsR0FBUixRQUFRO1FBQ1IsZ0JBQVcsR0FBWCxXQUFXO1FBQ08sY0FBUyxHQUFULFNBQVMsQ0FBSztvQ0FsQmdCLEtBQUs7NEJBR2xELElBQUksWUFBWSxFQUFpQjswQkFVM0IsSUFBSSxPQUFPLEVBQVE7S0FNbkM7SUFYTCxzQkFBSSxnREFBVzs7OztRQUFmO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMs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cUI7Z0JBTHlCLFVBQVU7Z0RBb0N4RCxNQUFNLFNBQUMsUUFBUTs7OytCQXRCbkIsS0FBSzt1Q0FHTCxLQUFLOytCQUdMLE1BQU07d0JBR04sZUFBZSxTQUFDLDJCQUEyQixFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTtpQ0F3Q2xFLFlBQVksU0FBQyxrQkFBa0IsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7a0NBakVoRDs7U0FjYSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET1dOX0FSUk9XLCBFTkQsIEVTQ0FQRSwgSE9NRSwgTEVGVF9BUlJPVywgUklHSFRfQVJST1csIFVQX0FSUk9XIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENvbnRlbnRDaGlsZHJlbiwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5qZWN0LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IE1lbnVOYXZpZ2F0aW9uSXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vbWVudS1uYXZpZ2F0aW9uLWl0ZW0uZGlyZWN0aXZlJztcbmltcG9ydCB7IE1lbnVOYXZpZ2F0aW9uVG9nZ2xlRGlyZWN0aXZlIH0gZnJvbSAnLi9tZW51LW5hdmlnYXRpb24tdG9nZ2xlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNZW51TmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuL21lbnUtbmF2aWdhdGlvbi5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhNZW51TmF2aWdhdGlvbl0nLFxuICAgIGV4cG9ydEFzOiAndXhNZW51TmF2aWdhdGlvbicsXG4gICAgcHJvdmlkZXJzOiBbTWVudU5hdmlnYXRpb25TZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBNZW51TmF2aWdhdGlvbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpXG4gICAgdG9nZ2xlQnV0dG9uOiBNZW51TmF2aWdhdGlvblRvZ2dsZURpcmVjdGl2ZTtcblxuICAgIEBJbnB1dCgpXG4gICAgdG9nZ2xlQnV0dG9uUG9zaXRpb246ICd0b3AnIHwgJ3JpZ2h0JyB8ICdib3R0b20nIHwgJ2xlZnQnID0gJ3RvcCc7XG5cbiAgICBAT3V0cHV0KClcbiAgICBuYXZpZ2F0ZWRPdXQgPSBuZXcgRXZlbnRFbWl0dGVyPEtleWJvYXJkRXZlbnQ+KCk7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKE1lbnVOYXZpZ2F0aW9uSXRlbURpcmVjdGl2ZSwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KVxuICAgIGl0ZW1zOiBRdWVyeUxpc3Q8TWVudU5hdmlnYXRpb25JdGVtRGlyZWN0aXZlPjtcblxuICAgIGdldCBhY3RpdmVJbmRleCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXNPcmRlcmVkLmluZGV4T2YodGhpcy5fc2VydmljZS5hY3RpdmUkLnZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pdGVtc09yZGVyZWQ6IE1lbnVOYXZpZ2F0aW9uSXRlbURpcmVjdGl2ZVtdO1xuICAgIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfc2VydmljZTogTWVudU5hdmlnYXRpb25TZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55XG4gICAgKSB7IH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy50b2dnbGVCdXR0b24pIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlQnV0dG9uLmtleUVudGVyLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmZvY3VzRmlyc3QoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG5cbiAgICAgICAgdGhpcy5pdGVtcy5jaGFuZ2VzLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuX2l0ZW1zT3JkZXJlZCA9IHRoaXMuaXRlbXMudG9BcnJheSgpKTtcblxuICAgICAgICB0aGlzLl9pdGVtc09yZGVyZWQgPSB0aGlzLml0ZW1zLnRvQXJyYXkoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgZm9jdXNGaXJzdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tb3ZlRmlyc3QoKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDprZXlkb3duJywgWyckZXZlbnQnXSlcbiAgICBrZXlkb3duSGFuZGxlcihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuXG4gICAgICAgIC8vIE9ubHkgaGFuZGxlIGV2ZW50cyB3aGVuIGZvY3VzIGluIHdpdGhpbiB0aGUgbGlzdCBvZiBtZW51IGl0ZW1zXG4gICAgICAgIGlmICghdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKHRoaXMuX2RvY3VtZW50LmFjdGl2ZUVsZW1lbnQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaGFuZGxlZCA9IGZhbHNlO1xuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcblxuICAgICAgICAgICAgY2FzZSBVUF9BUlJPVzpcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVQcmV2aW91cyhldmVudCk7XG4gICAgICAgICAgICAgICAgaGFuZGxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgRE9XTl9BUlJPVzpcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVOZXh0KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBoYW5kbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBMRUZUX0FSUk9XOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRvZ2dsZUJ1dHRvblBvc2l0aW9uID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlVG9Ub2dnbGVCdXR0b24oZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgUklHSFRfQVJST1c6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudG9nZ2xlQnV0dG9uUG9zaXRpb24gPT09ICdyaWdodCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlVG9Ub2dnbGVCdXR0b24oZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgSE9NRTpcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVGaXJzdCgpO1xuICAgICAgICAgICAgICAgIGhhbmRsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEVORDpcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVMYXN0KCk7XG4gICAgICAgICAgICAgICAgaGFuZGxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgRVNDQVBFOlxuICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVkT3V0LmVtaXQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGhhbmRsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhhbmRsZWQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgbW92ZU5leHQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcblxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIHRoZXJlJ3Mgbm8gYWN0aXZlIG1lbnUgaXRlbSByZWdpc3RlcmVkXG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZUluZGV4IDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbmV4dEluZGV4ID0gdGhpcy5hY3RpdmVJbmRleCArIDE7XG4gICAgICAgIGlmIChuZXh0SW5kZXggPCB0aGlzLl9pdGVtc09yZGVyZWQubGVuZ3RoKSB7XG5cbiAgICAgICAgICAgIC8vIEFjdGl2YXRlIHRoZSBuZXh0IG1lbnUgaXRlbVxuICAgICAgICAgICAgLy8gKHV4TWVudU5hdmlnYXRpb25JdGVtIHN1YnNjcmliZXMgdG8gdGhpcyBhbmQgYXBwbGllcyBmb2N1cyBpZiBpdCBtYXRjaGVzKVxuICAgICAgICAgICAgdGhpcy5fc2VydmljZS5hY3RpdmUkLm5leHQodGhpcy5faXRlbXNPcmRlcmVkW25leHRJbmRleF0pO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIC8vIENoZWNrIGlmIGZvY3VzIHdlbnQgb3V0IG9mIGJvdW5kcyBpbiB0aGUgZGlyZWN0aW9uIG9mIHRoZSBvcmlnaW4gdG9nZ2xlIGJ1dHRvblxuICAgICAgICAgICAgaWYgKHRoaXMudG9nZ2xlQnV0dG9uUG9zaXRpb24gPT09ICdib3R0b20nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlVG9Ub2dnbGVCdXR0b24oZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtb3ZlUHJldmlvdXMoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcblxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIHRoZXJlJ3Mgbm8gYWN0aXZlIG1lbnUgaXRlbSByZWdpc3RlcmVkXG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZUluZGV4IDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbmV4dEluZGV4ID0gdGhpcy5hY3RpdmVJbmRleCAtIDE7XG4gICAgICAgIGlmIChuZXh0SW5kZXggPj0gMCkge1xuXG4gICAgICAgICAgICAvLyBBY3RpdmF0ZSB0aGUgcHJldmlvdXMgbWVudSBpdGVtXG4gICAgICAgICAgICAvLyAodXhNZW51TmF2aWdhdGlvbkl0ZW0gc3Vic2NyaWJlcyB0byB0aGlzIGFuZCBhcHBsaWVzIGZvY3VzIGlmIGl0IG1hdGNoZXMpXG4gICAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmFjdGl2ZSQubmV4dCh0aGlzLl9pdGVtc09yZGVyZWRbbmV4dEluZGV4XSk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgZm9jdXMgd2VudCBvdXQgb2YgYm91bmRzIGluIHRoZSBkaXJlY3Rpb24gb2YgdGhlIG9yaWdpbiB0b2dnbGUgYnV0dG9uXG4gICAgICAgICAgICBpZiAodGhpcy50b2dnbGVCdXR0b25Qb3NpdGlvbiA9PT0gJ3RvcCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVUb1RvZ2dsZUJ1dHRvbihldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG1vdmVGaXJzdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2l0ZW1zT3JkZXJlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmFjdGl2ZSQubmV4dCh0aGlzLl9pdGVtc09yZGVyZWRbMF0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtb3ZlTGFzdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2l0ZW1zT3JkZXJlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmFjdGl2ZSQubmV4dCh0aGlzLl9pdGVtc09yZGVyZWRbdGhpcy5faXRlbXNPcmRlcmVkLmxlbmd0aCAtIDFdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgbW92ZVRvVG9nZ2xlQnV0dG9uKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnRvZ2dsZUJ1dHRvbikge1xuICAgICAgICAgICAgdGhpcy50b2dnbGVCdXR0b24uZm9jdXMoKTtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlQnV0dG9uLm1lbnVPcGVuID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm5hdmlnYXRlZE91dC5lbWl0KGV2ZW50KTtcbiAgICB9XG59Il19