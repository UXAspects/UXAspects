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
export class MenuNavigationDirective {
    /**
     * @param {?} _service
     * @param {?} _elementRef
     * @param {?} _document
     */
    constructor(_service, _elementRef, _document) {
        this._service = _service;
        this._elementRef = _elementRef;
        this._document = _document;
        this.toggleButtonPosition = 'top';
        this.navigatedOut = new EventEmitter();
        this._onDestroy = new Subject();
    }
    /**
     * @return {?}
     */
    get activeIndex() {
        return this._itemsOrdered.indexOf(this._service.active$.value);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.toggleButton) {
            this.toggleButton.keyEnter.pipe(takeUntil(this._onDestroy))
                .subscribe(() => this.focusFirst());
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.items.changes.pipe(takeUntil(this._onDestroy))
            .subscribe(() => this._itemsOrdered = this.items.toArray());
        this._itemsOrdered = this.items.toArray();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * @return {?}
     */
    focusFirst() {
        this.moveFirst();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    keydownHandler(event) {
        // Only handle events when focus in within the list of menu items
        if (!this._elementRef.nativeElement.contains(this._document.activeElement)) {
            return;
        }
        let /** @type {?} */ handled = false;
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
    }
    /**
     * @param {?} event
     * @return {?}
     */
    moveNext(event) {
        // Do nothing if there's no active menu item registered
        if (this.activeIndex < 0) {
            return;
        }
        const /** @type {?} */ nextIndex = this.activeIndex + 1;
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
    }
    /**
     * @param {?} event
     * @return {?}
     */
    movePrevious(event) {
        // Do nothing if there's no active menu item registered
        if (this.activeIndex < 0) {
            return;
        }
        const /** @type {?} */ nextIndex = this.activeIndex - 1;
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
    }
    /**
     * @return {?}
     */
    moveFirst() {
        if (this._itemsOrdered.length > 0) {
            this._service.active$.next(this._itemsOrdered[0]);
        }
    }
    /**
     * @return {?}
     */
    moveLast() {
        if (this._itemsOrdered.length > 0) {
            this._service.active$.next(this._itemsOrdered[this._itemsOrdered.length - 1]);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    moveToToggleButton(event) {
        if (this.toggleButton) {
            this.toggleButton.focus();
            this.toggleButton.menuOpen = false;
        }
        this.navigatedOut.emit(event);
    }
}
MenuNavigationDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxMenuNavigation]',
                exportAs: 'uxMenuNavigation',
                providers: [MenuNavigationService]
            },] }
];
/** @nocollapse */
MenuNavigationDirective.ctorParameters = () => [
    { type: MenuNavigationService },
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
MenuNavigationDirective.propDecorators = {
    toggleButton: [{ type: Input }],
    toggleButtonPosition: [{ type: Input }],
    navigatedOut: [{ type: Output }],
    items: [{ type: ContentChildren, args: [MenuNavigationItemDirective, { descendants: true },] }],
    keydownHandler: [{ type: HostListener, args: ['document:keydown', ['$event'],] }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1uYXZpZ2F0aW9uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL21lbnUtbmF2aWdhdGlvbi9tZW51LW5hdmlnYXRpb24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDekcsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBb0IsZUFBZSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFLLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBT2xFLE1BQU07Ozs7OztJQXFCRixZQUNZLFVBQ0EsYUFDa0IsU0FBYztRQUZoQyxhQUFRLEdBQVIsUUFBUTtRQUNSLGdCQUFXLEdBQVgsV0FBVztRQUNPLGNBQVMsR0FBVCxTQUFTLENBQUs7b0NBbEJnQixLQUFLOzRCQUdsRCxJQUFJLFlBQVksRUFBaUI7MEJBVTNCLElBQUksT0FBTyxFQUFRO0tBTW5DOzs7O0lBWEwsSUFBSSxXQUFXO1FBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFh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QUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFOzZCQXdDbEUsWUFBWSxTQUFDLGtCQUFrQixFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRE9XTl9BUlJPVywgRU5ELCBFU0NBUEUsIEhPTUUsIExFRlRfQVJST1csIFJJR0hUX0FSUk9XLCBVUF9BUlJPVyB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDb250ZW50Q2hpbGRyZW4sIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIEluamVjdCwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBNZW51TmF2aWdhdGlvbkl0ZW1EaXJlY3RpdmUgfSBmcm9tICcuL21lbnUtbmF2aWdhdGlvbi1pdGVtLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNZW51TmF2aWdhdGlvblRvZ2dsZURpcmVjdGl2ZSB9IGZyb20gJy4vbWVudS1uYXZpZ2F0aW9uLXRvZ2dsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWVudU5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9tZW51LW5hdmlnYXRpb24uc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4TWVudU5hdmlnYXRpb25dJyxcbiAgICBleHBvcnRBczogJ3V4TWVudU5hdmlnYXRpb24nLFxuICAgIHByb3ZpZGVyczogW01lbnVOYXZpZ2F0aW9uU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgTWVudU5hdmlnYXRpb25EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKVxuICAgIHRvZ2dsZUJ1dHRvbjogTWVudU5hdmlnYXRpb25Ub2dnbGVEaXJlY3RpdmU7XG5cbiAgICBASW5wdXQoKVxuICAgIHRvZ2dsZUJ1dHRvblBvc2l0aW9uOiAndG9wJyB8ICdyaWdodCcgfCAnYm90dG9tJyB8ICdsZWZ0JyA9ICd0b3AnO1xuXG4gICAgQE91dHB1dCgpXG4gICAgbmF2aWdhdGVkT3V0ID0gbmV3IEV2ZW50RW1pdHRlcjxLZXlib2FyZEV2ZW50PigpO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihNZW51TmF2aWdhdGlvbkl0ZW1EaXJlY3RpdmUsIHsgZGVzY2VuZGFudHM6IHRydWUgfSlcbiAgICBpdGVtczogUXVlcnlMaXN0PE1lbnVOYXZpZ2F0aW9uSXRlbURpcmVjdGl2ZT47XG5cbiAgICBnZXQgYWN0aXZlSW5kZXgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zT3JkZXJlZC5pbmRleE9mKHRoaXMuX3NlcnZpY2UuYWN0aXZlJC52YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaXRlbXNPcmRlcmVkOiBNZW51TmF2aWdhdGlvbkl0ZW1EaXJlY3RpdmVbXTtcbiAgICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX3NlcnZpY2U6IE1lbnVOYXZpZ2F0aW9uU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueVxuICAgICkgeyB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudG9nZ2xlQnV0dG9uKSB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUJ1dHRvbi5rZXlFbnRlci5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5mb2N1c0ZpcnN0KCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuXG4gICAgICAgIHRoaXMuaXRlbXMuY2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9pdGVtc09yZGVyZWQgPSB0aGlzLml0ZW1zLnRvQXJyYXkoKSk7XG5cbiAgICAgICAgdGhpcy5faXRlbXNPcmRlcmVkID0gdGhpcy5pdGVtcy50b0FycmF5KCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIGZvY3VzRmlyc3QoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubW92ZUZpcnN0KCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6a2V5ZG93bicsIFsnJGV2ZW50J10pXG4gICAga2V5ZG93bkhhbmRsZXIoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcblxuICAgICAgICAvLyBPbmx5IGhhbmRsZSBldmVudHMgd2hlbiBmb2N1cyBpbiB3aXRoaW4gdGhlIGxpc3Qgb2YgbWVudSBpdGVtc1xuICAgICAgICBpZiAoIXRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jb250YWlucyh0aGlzLl9kb2N1bWVudC5hY3RpdmVFbGVtZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGhhbmRsZWQgPSBmYWxzZTtcblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG5cbiAgICAgICAgICAgIGNhc2UgVVBfQVJST1c6XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlUHJldmlvdXMoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGhhbmRsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIERPV05fQVJST1c6XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlTmV4dChldmVudCk7XG4gICAgICAgICAgICAgICAgaGFuZGxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgTEVGVF9BUlJPVzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50b2dnbGVCdXR0b25Qb3NpdGlvbiA9PT0gJ2xlZnQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZVRvVG9nZ2xlQnV0dG9uKGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFJJR0hUX0FSUk9XOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRvZ2dsZUJ1dHRvblBvc2l0aW9uID09PSAncmlnaHQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZVRvVG9nZ2xlQnV0dG9uKGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEhPTUU6XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlRmlyc3QoKTtcbiAgICAgICAgICAgICAgICBoYW5kbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBFTkQ6XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlTGFzdCgpO1xuICAgICAgICAgICAgICAgIGhhbmRsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEVTQ0FQRTpcbiAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlZE91dC5lbWl0KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBoYW5kbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYW5kbGVkKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG1vdmVOZXh0KGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG5cbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiB0aGVyZSdzIG5vIGFjdGl2ZSBtZW51IGl0ZW0gcmVnaXN0ZXJlZFxuICAgICAgICBpZiAodGhpcy5hY3RpdmVJbmRleCA8IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5leHRJbmRleCA9IHRoaXMuYWN0aXZlSW5kZXggKyAxO1xuICAgICAgICBpZiAobmV4dEluZGV4IDwgdGhpcy5faXRlbXNPcmRlcmVkLmxlbmd0aCkge1xuXG4gICAgICAgICAgICAvLyBBY3RpdmF0ZSB0aGUgbmV4dCBtZW51IGl0ZW1cbiAgICAgICAgICAgIC8vICh1eE1lbnVOYXZpZ2F0aW9uSXRlbSBzdWJzY3JpYmVzIHRvIHRoaXMgYW5kIGFwcGxpZXMgZm9jdXMgaWYgaXQgbWF0Y2hlcylcbiAgICAgICAgICAgIHRoaXMuX3NlcnZpY2UuYWN0aXZlJC5uZXh0KHRoaXMuX2l0ZW1zT3JkZXJlZFtuZXh0SW5kZXhdKTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAvLyBDaGVjayBpZiBmb2N1cyB3ZW50IG91dCBvZiBib3VuZHMgaW4gdGhlIGRpcmVjdGlvbiBvZiB0aGUgb3JpZ2luIHRvZ2dsZSBidXR0b25cbiAgICAgICAgICAgIGlmICh0aGlzLnRvZ2dsZUJ1dHRvblBvc2l0aW9uID09PSAnYm90dG9tJykge1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZVRvVG9nZ2xlQnV0dG9uKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgbW92ZVByZXZpb3VzKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG5cbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiB0aGVyZSdzIG5vIGFjdGl2ZSBtZW51IGl0ZW0gcmVnaXN0ZXJlZFxuICAgICAgICBpZiAodGhpcy5hY3RpdmVJbmRleCA8IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5leHRJbmRleCA9IHRoaXMuYWN0aXZlSW5kZXggLSAxO1xuICAgICAgICBpZiAobmV4dEluZGV4ID49IDApIHtcblxuICAgICAgICAgICAgLy8gQWN0aXZhdGUgdGhlIHByZXZpb3VzIG1lbnUgaXRlbVxuICAgICAgICAgICAgLy8gKHV4TWVudU5hdmlnYXRpb25JdGVtIHN1YnNjcmliZXMgdG8gdGhpcyBhbmQgYXBwbGllcyBmb2N1cyBpZiBpdCBtYXRjaGVzKVxuICAgICAgICAgICAgdGhpcy5fc2VydmljZS5hY3RpdmUkLm5leHQodGhpcy5faXRlbXNPcmRlcmVkW25leHRJbmRleF0pO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIC8vIENoZWNrIGlmIGZvY3VzIHdlbnQgb3V0IG9mIGJvdW5kcyBpbiB0aGUgZGlyZWN0aW9uIG9mIHRoZSBvcmlnaW4gdG9nZ2xlIGJ1dHRvblxuICAgICAgICAgICAgaWYgKHRoaXMudG9nZ2xlQnV0dG9uUG9zaXRpb24gPT09ICd0b3AnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlVG9Ub2dnbGVCdXR0b24oZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtb3ZlRmlyc3QoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9pdGVtc09yZGVyZWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fc2VydmljZS5hY3RpdmUkLm5leHQodGhpcy5faXRlbXNPcmRlcmVkWzBdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgbW92ZUxhc3QoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9pdGVtc09yZGVyZWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fc2VydmljZS5hY3RpdmUkLm5leHQodGhpcy5faXRlbXNPcmRlcmVkW3RoaXMuX2l0ZW1zT3JkZXJlZC5sZW5ndGggLSAxXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG1vdmVUb1RvZ2dsZUJ1dHRvbihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy50b2dnbGVCdXR0b24pIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlQnV0dG9uLmZvY3VzKCk7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUJ1dHRvbi5tZW51T3BlbiA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5uYXZpZ2F0ZWRPdXQuZW1pdChldmVudCk7XG4gICAgfVxufSJdfQ==