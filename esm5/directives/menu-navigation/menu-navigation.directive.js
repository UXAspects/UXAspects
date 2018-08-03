/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { DOCUMENT } from '@angular/common';
import { ContentChildren, Directive, ElementRef, EventEmitter, HostListener, Inject, Input, Output, QueryList } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MenuNavigationItemDirective } from './menu-navigation-item.directive';
import { MenuNavigationToggleDirective } from './menu-navigation-toggle.directive';
import { MenuNavigationService } from './menu-navigation.service';
var MenuNavigationDirective = /** @class */ (function () {
    function MenuNavigationDirective(_service, _elementRef, document) {
        this._service = _service;
        this._elementRef = _elementRef;
        this.toggleButtonPosition = 'top';
        this.navigatedOut = new EventEmitter();
        this._subscription = new Subscription();
        this._document = document;
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
        if (this.toggleButton) {
            this._subscription.add(this.toggleButton.keyEnter.subscribe(this.focusFirst.bind(this)));
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
        this._subscription.add(this.items.changes.subscribe(function () {
            _this._itemsOrdered = _this.items.toArray();
        }));
        this._itemsOrdered = this.items.toArray();
    };
    /**
     * @return {?}
     */
    MenuNavigationDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
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
        switch (event.key) {
            case 'ArrowUp':
            case 'Up':
                this.movePrevious(event);
                handled = true;
                break;
            case 'ArrowDown':
            case 'Down':
                this.moveNext(event);
                handled = true;
                break;
            case 'ArrowLeft':
            case 'Left':
                if (this.toggleButtonPosition === 'left') {
                    this.moveToToggleButton(event);
                    handled = true;
                }
                break;
            case 'ArrowRight':
            case 'Right':
                if (this.toggleButtonPosition === 'right') {
                    this.moveToToggleButton(event);
                    handled = true;
                }
                break;
            case 'Home':
                this.moveFirst();
                handled = true;
                break;
            case 'End':
                this.moveLast();
                handled = true;
                break;
            case 'Escape':
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
    MenuNavigationDirective.prototype._document;
    /** @type {?} */
    MenuNavigationDirective.prototype._subscription;
    /** @type {?} */
    MenuNavigationDirective.prototype._service;
    /** @type {?} */
    MenuNavigationDirective.prototype._elementRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1uYXZpZ2F0aW9uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL21lbnUtbmF2aWdhdGlvbi9tZW51LW5hdmlnYXRpb24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFvQixlQUFlLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUssT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDOztJQStCOUQsaUNBQ1ksVUFDQSxhQUNVLFFBQWE7UUFGdkIsYUFBUSxHQUFSLFFBQVE7UUFDUixnQkFBVyxHQUFYLFdBQVc7b0NBcEJxQyxLQUFLOzRCQUdsRCxJQUFJLFlBQVksRUFBaUI7NkJBYXhCLElBQUksWUFBWSxFQUFFO1FBT3RDLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO0tBQzdCO0lBaEJELHNCQUFJLGdEQUFXOzs7O1FBQWY7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbEU7OztPQUFBOzs7O0lBZ0JELDBDQUFROzs7SUFBUjtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FB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LFNBQUMsa0JBQWtCLEVBQUUsQ0FBQyxRQUFRLENBQUM7O2tDQXZFaEQ7O1NBWWEsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQ29udGVudENoaWxkcmVuLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbmplY3QsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IE1lbnVOYXZpZ2F0aW9uSXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vbWVudS1uYXZpZ2F0aW9uLWl0ZW0uZGlyZWN0aXZlJztcbmltcG9ydCB7IE1lbnVOYXZpZ2F0aW9uVG9nZ2xlRGlyZWN0aXZlIH0gZnJvbSAnLi9tZW51LW5hdmlnYXRpb24tdG9nZ2xlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNZW51TmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuL21lbnUtbmF2aWdhdGlvbi5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhNZW51TmF2aWdhdGlvbl0nLFxuICAgIGV4cG9ydEFzOiAndXhNZW51TmF2aWdhdGlvbicsXG4gICAgcHJvdmlkZXJzOiBbTWVudU5hdmlnYXRpb25TZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBNZW51TmF2aWdhdGlvbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpXG4gICAgdG9nZ2xlQnV0dG9uOiBNZW51TmF2aWdhdGlvblRvZ2dsZURpcmVjdGl2ZTtcblxuICAgIEBJbnB1dCgpXG4gICAgdG9nZ2xlQnV0dG9uUG9zaXRpb246ICd0b3AnIHwgJ3JpZ2h0JyB8ICdib3R0b20nIHwgJ2xlZnQnID0gJ3RvcCc7XG5cbiAgICBAT3V0cHV0KClcbiAgICBuYXZpZ2F0ZWRPdXQgPSBuZXcgRXZlbnRFbWl0dGVyPEtleWJvYXJkRXZlbnQ+KCk7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKE1lbnVOYXZpZ2F0aW9uSXRlbURpcmVjdGl2ZSwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KVxuICAgIGl0ZW1zOiBRdWVyeUxpc3Q8TWVudU5hdmlnYXRpb25JdGVtRGlyZWN0aXZlPjtcblxuICAgIGdldCBhY3RpdmVJbmRleCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXNPcmRlcmVkLmluZGV4T2YodGhpcy5fc2VydmljZS5hY3RpdmUkLnZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pdGVtc09yZGVyZWQ6IE1lbnVOYXZpZ2F0aW9uSXRlbURpcmVjdGl2ZVtdO1xuXG4gICAgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueTtcblxuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9zZXJ2aWNlOiBNZW51TmF2aWdhdGlvblNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIEBJbmplY3QoRE9DVU1FTlQpIGRvY3VtZW50OiBhbnlcbiAgICApIHtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudG9nZ2xlQnV0dG9uKSB7XG4gICAgICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlQnV0dG9uLmtleUVudGVyLnN1YnNjcmliZSh0aGlzLmZvY3VzRmlyc3QuYmluZCh0aGlzKSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG5cbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgICAgICAgIHRoaXMuaXRlbXMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2l0ZW1zT3JkZXJlZCA9IHRoaXMuaXRlbXMudG9BcnJheSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLl9pdGVtc09yZGVyZWQgPSB0aGlzLml0ZW1zLnRvQXJyYXkoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgZm9jdXNGaXJzdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tb3ZlRmlyc3QoKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDprZXlkb3duJywgWyckZXZlbnQnXSlcbiAgICBrZXlkb3duSGFuZGxlcihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuXG4gICAgICAgIC8vIE9ubHkgaGFuZGxlIGV2ZW50cyB3aGVuIGZvY3VzIGluIHdpdGhpbiB0aGUgbGlzdCBvZiBtZW51IGl0ZW1zXG4gICAgICAgIGlmICghdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKHRoaXMuX2RvY3VtZW50LmFjdGl2ZUVsZW1lbnQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaGFuZGxlZCA9IGZhbHNlO1xuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG5cbiAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgY2FzZSAnVXAnOlxuICAgICAgICAgICAgICAgIHRoaXMubW92ZVByZXZpb3VzKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBoYW5kbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgIGNhc2UgJ0Rvd24nOlxuICAgICAgICAgICAgICAgIHRoaXMubW92ZU5leHQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGhhbmRsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgICAgY2FzZSAnTGVmdCc6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudG9nZ2xlQnV0dG9uUG9zaXRpb24gPT09ICdsZWZ0Jykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVUb1RvZ2dsZUJ1dHRvbihldmVudCk7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgICAgICBjYXNlICdSaWdodCc6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudG9nZ2xlQnV0dG9uUG9zaXRpb24gPT09ICdyaWdodCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlVG9Ub2dnbGVCdXR0b24oZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0hvbWUnOlxuICAgICAgICAgICAgICAgIHRoaXMubW92ZUZpcnN0KCk7XG4gICAgICAgICAgICAgICAgaGFuZGxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0VuZCc6XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlTGFzdCgpO1xuICAgICAgICAgICAgICAgIGhhbmRsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdFc2NhcGUnOlxuICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVkT3V0LmVtaXQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGhhbmRsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhhbmRsZWQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgbW92ZU5leHQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcblxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIHRoZXJlJ3Mgbm8gYWN0aXZlIG1lbnUgaXRlbSByZWdpc3RlcmVkXG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZUluZGV4IDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbmV4dEluZGV4ID0gdGhpcy5hY3RpdmVJbmRleCArIDE7XG4gICAgICAgIGlmIChuZXh0SW5kZXggPCB0aGlzLl9pdGVtc09yZGVyZWQubGVuZ3RoKSB7XG5cbiAgICAgICAgICAgIC8vIEFjdGl2YXRlIHRoZSBuZXh0IG1lbnUgaXRlbVxuICAgICAgICAgICAgLy8gKHV4TWVudU5hdmlnYXRpb25JdGVtIHN1YnNjcmliZXMgdG8gdGhpcyBhbmQgYXBwbGllcyBmb2N1cyBpZiBpdCBtYXRjaGVzKVxuICAgICAgICAgICAgdGhpcy5fc2VydmljZS5hY3RpdmUkLm5leHQodGhpcy5faXRlbXNPcmRlcmVkW25leHRJbmRleF0pO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIC8vIENoZWNrIGlmIGZvY3VzIHdlbnQgb3V0IG9mIGJvdW5kcyBpbiB0aGUgZGlyZWN0aW9uIG9mIHRoZSBvcmlnaW4gdG9nZ2xlIGJ1dHRvblxuICAgICAgICAgICAgaWYgKHRoaXMudG9nZ2xlQnV0dG9uUG9zaXRpb24gPT09ICdib3R0b20nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlVG9Ub2dnbGVCdXR0b24oZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtb3ZlUHJldmlvdXMoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcblxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIHRoZXJlJ3Mgbm8gYWN0aXZlIG1lbnUgaXRlbSByZWdpc3RlcmVkXG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZUluZGV4IDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbmV4dEluZGV4ID0gdGhpcy5hY3RpdmVJbmRleCAtIDE7XG4gICAgICAgIGlmIChuZXh0SW5kZXggPj0gMCkge1xuXG4gICAgICAgICAgICAvLyBBY3RpdmF0ZSB0aGUgcHJldmlvdXMgbWVudSBpdGVtXG4gICAgICAgICAgICAvLyAodXhNZW51TmF2aWdhdGlvbkl0ZW0gc3Vic2NyaWJlcyB0byB0aGlzIGFuZCBhcHBsaWVzIGZvY3VzIGlmIGl0IG1hdGNoZXMpXG4gICAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmFjdGl2ZSQubmV4dCh0aGlzLl9pdGVtc09yZGVyZWRbbmV4dEluZGV4XSk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgZm9jdXMgd2VudCBvdXQgb2YgYm91bmRzIGluIHRoZSBkaXJlY3Rpb24gb2YgdGhlIG9yaWdpbiB0b2dnbGUgYnV0dG9uXG4gICAgICAgICAgICBpZiAodGhpcy50b2dnbGVCdXR0b25Qb3NpdGlvbiA9PT0gJ3RvcCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVUb1RvZ2dsZUJ1dHRvbihldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG1vdmVGaXJzdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2l0ZW1zT3JkZXJlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmFjdGl2ZSQubmV4dCh0aGlzLl9pdGVtc09yZGVyZWRbMF0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtb3ZlTGFzdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2l0ZW1zT3JkZXJlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmFjdGl2ZSQubmV4dCh0aGlzLl9pdGVtc09yZGVyZWRbdGhpcy5faXRlbXNPcmRlcmVkLmxlbmd0aCAtIDFdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgbW92ZVRvVG9nZ2xlQnV0dG9uKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnRvZ2dsZUJ1dHRvbikge1xuICAgICAgICAgICAgdGhpcy50b2dnbGVCdXR0b24uZm9jdXMoKTtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlQnV0dG9uLm1lbnVPcGVuID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm5hdmlnYXRlZE91dC5lbWl0KGV2ZW50KTtcbiAgICB9XG59Il19