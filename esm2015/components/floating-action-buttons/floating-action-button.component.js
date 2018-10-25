/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { DOWN_ARROW, ENTER, ESCAPE, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { Attribute, ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, Optional, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { TooltipDirective } from '../tooltip/index';
import { FloatingActionButtonsService } from './floating-action-buttons.service';
export class FloatingActionButtonComponent {
    /**
     * @param {?} primary
     * @param {?} fab
     * @param {?} _tooltip
     */
    constructor(primary, fab, _tooltip) {
        this.fab = fab;
        this._tooltip = _tooltip;
        this.primary = false;
        this.tabindex$ = new BehaviorSubject(-1);
        this._onDestroy = new Subject();
        this.primary = primary !== null;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (this._tooltip) {
            // ensure the tooltip gets hidden when the button is hidden
            this.fab.open$.pipe(takeUntil(this._onDestroy), filter(isOpen => !isOpen && !this.primary))
                .subscribe(() => this._tooltip.hide());
        }
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
    focus() {
        this.button.nativeElement.focus();
    }
    /**
     * @return {?}
     */
    onFocus() {
        // ensure the tooltip gets shown
        if (this._tooltip) {
            this._tooltip.show();
        }
    }
    /**
     * @return {?}
     */
    onBlur() {
        // ensure the tooltip gets hidden
        if (this._tooltip) {
            this._tooltip.hide();
        }
    }
    /**
     * @return {?}
     */
    close() {
        this.fab.close();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeydown(event) {
        switch (event.which) {
            case UP_ARROW:
                if (this.fab.isVertical()) {
                    this.fab.focusSibling(this.fab.direction$.value !== 'bottom');
                    event.preventDefault();
                }
                break;
            case DOWN_ARROW:
                if (this.fab.isVertical()) {
                    this.fab.focusSibling(this.fab.direction$.value === 'bottom');
                    event.preventDefault();
                }
                break;
            case LEFT_ARROW:
                if (this.fab.isHorizontal()) {
                    this.fab.focusSibling(this.fab.direction$.value !== 'right');
                    event.preventDefault();
                }
                break;
            case RIGHT_ARROW:
                if (this.fab.isHorizontal()) {
                    this.fab.focusSibling(this.fab.direction$.value === 'right');
                    event.preventDefault();
                }
                break;
            case ENTER:
                this.fab.focusPrimaryButton();
                break;
            case ESCAPE:
                this.fab.focusPrimaryButton();
                this.fab.close();
                break;
        }
    }
}
FloatingActionButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-floating-action-button',
                template: "<button #button class=\"btn floating-action-button\"\n        [class.button-primary]=\"primary\"\n        [class.button-secondary]=\"!primary\"\n        [attr.aria-label]=\"ariaLabel\"\n        [tabIndex]=\"tabindex$ | async\"\n        (focus)=\"onFocus()\"\n        (blur)=\"onBlur()\"\n        (click)=\"primary ? fab.toggle() : close()\">\n\n    <span class=\"hpe-icon floating-action-button-icon\" *ngIf=\"icon\" [ngClass]=\"icon\"></span>\n    <ng-content *ngIf=\"!icon\"></ng-content>\n\n</button>",
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false
            }] }
];
/** @nocollapse */
FloatingActionButtonComponent.ctorParameters = () => [
    { type: String, decorators: [{ type: Attribute, args: ['fab-primary',] }] },
    { type: FloatingActionButtonsService },
    { type: TooltipDirective, decorators: [{ type: Optional }] }
];
FloatingActionButtonComponent.propDecorators = {
    icon: [{ type: Input }],
    ariaLabel: [{ type: Input, args: ['aria-label',] }],
    button: [{ type: ViewChild, args: ['button',] }],
    onKeydown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};
function FloatingActionButtonComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    FloatingActionButtonComponent.prototype.icon;
    /** @type {?} */
    FloatingActionButtonComponent.prototype.ariaLabel;
    /** @type {?} */
    FloatingActionButtonComponent.prototype.button;
    /** @type {?} */
    FloatingActionButtonComponent.prototype.primary;
    /** @type {?} */
    FloatingActionButtonComponent.prototype.tabindex$;
    /** @type {?} */
    FloatingActionButtonComponent.prototype._onDestroy;
    /** @type {?} */
    FloatingActionButtonComponent.prototype.fab;
    /** @type {?} */
    FloatingActionButtonComponent.prototype._tooltip;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXRpbmctYWN0aW9uLWJ1dHRvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9mbG9hdGluZy1hY3Rpb24tYnV0dG9ucy9mbG9hdGluZy1hY3Rpb24tYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDckcsT0FBTyxFQUFpQixTQUFTLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUosT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQVFqRixNQUFNOzs7Ozs7SUFXRixZQUFzQyxPQUFlLEVBQVMsR0FBaUMsRUFBc0IsUUFBMEI7UUFBakYsUUFBRyxHQUFILEdBQUcsQ0FBOEI7UUFBc0IsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7dUJBTDVILEtBQUs7eUJBQ1osSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7MEJBRXRCLElBQUksT0FBTyxFQUFRO1FBR3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxLQUFLLElBQUksQ0FBQztLQUNuQzs7OztJQUVELGVBQWU7UUFDWCxFQUFF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Q0FBQztZQUVWLEtBQUssTUFBTTtnQkFDUCxJQUFJLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2pCLEtBQUssQ0FBQztTQUViO0tBRUo7OztZQXBHSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDJCQUEyQjtnQkFDckMsbWdCQUFzRDtnQkFDdEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLG1CQUFtQixFQUFFLEtBQUs7YUFDN0I7Ozs7eUNBWWdCLFNBQVMsU0FBQyxhQUFhO1lBbkIvQiw0QkFBNEI7WUFENUIsZ0JBQWdCLHVCQW9CNkUsUUFBUTs7O21CQVR6RyxLQUFLO3dCQUNMLEtBQUssU0FBQyxZQUFZO3FCQUNsQixTQUFTLFNBQUMsUUFBUTt3QkE4Q2xCLFlBQVksU0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET1dOX0FSUk9XLCBFTlRFUiwgRVNDQVBFLCBMRUZUX0FSUk9XLCBSSUdIVF9BUlJPVywgVVBfQVJST1cgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQXR0cmlidXRlLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9wdGlvbmFsLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7IGZpbHRlciwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBUb29sdGlwRGlyZWN0aXZlIH0gZnJvbSAnLi4vdG9vbHRpcC9pbmRleCc7XG5pbXBvcnQgeyBGbG9hdGluZ0FjdGlvbkJ1dHRvbnNTZXJ2aWNlIH0gZnJvbSAnLi9mbG9hdGluZy1hY3Rpb24tYnV0dG9ucy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1mbG9hdGluZy1hY3Rpb24tYnV0dG9uJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZmxvYXRpbmctYWN0aW9uLWJ1dHRvbi5jb21wb25lbnQuaHRtbCcsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2Vcbn0pXG5leHBvcnQgY2xhc3MgRmxvYXRpbmdBY3Rpb25CdXR0b25Db21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgaWNvbjogc3RyaW5nO1xuICAgIEBJbnB1dCgnYXJpYS1sYWJlbCcpIGFyaWFMYWJlbDogc3RyaW5nO1xuICAgIEBWaWV3Q2hpbGQoJ2J1dHRvbicpIGJ1dHRvbjogRWxlbWVudFJlZjtcblxuICAgIHByaW1hcnk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICB0YWJpbmRleCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oLTEpO1xuXG4gICAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIGNvbnN0cnVjdG9yKEBBdHRyaWJ1dGUoJ2ZhYi1wcmltYXJ5JykgcHJpbWFyeTogc3RyaW5nLCBwdWJsaWMgZmFiOiBGbG9hdGluZ0FjdGlvbkJ1dHRvbnNTZXJ2aWNlLCBAT3B0aW9uYWwoKSBwcml2YXRlIF90b29sdGlwOiBUb29sdGlwRGlyZWN0aXZlKSB7XG4gICAgICAgIHRoaXMucHJpbWFyeSA9IHByaW1hcnkgIT09IG51bGw7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fdG9vbHRpcCkge1xuICAgICAgICAgICAgLy8gZW5zdXJlIHRoZSB0b29sdGlwIGdldHMgaGlkZGVuIHdoZW4gdGhlIGJ1dHRvbiBpcyBoaWRkZW5cbiAgICAgICAgICAgIHRoaXMuZmFiLm9wZW4kLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSksIGZpbHRlcihpc09wZW4gPT4gIWlzT3BlbiAmJiAhdGhpcy5wcmltYXJ5KSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuX3Rvb2x0aXAuaGlkZSgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5idXR0b24ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIG9uRm9jdXMoKTogdm9pZCB7XG4gICAgICAgIC8vIGVuc3VyZSB0aGUgdG9vbHRpcCBnZXRzIHNob3duXG4gICAgICAgIGlmICh0aGlzLl90b29sdGlwKSB7XG4gICAgICAgICAgICB0aGlzLl90b29sdGlwLnNob3coKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQmx1cigpOiB2b2lkIHtcbiAgICAgICAgLy8gZW5zdXJlIHRoZSB0b29sdGlwIGdldHMgaGlkZGVuXG4gICAgICAgIGlmICh0aGlzLl90b29sdGlwKSB7XG4gICAgICAgICAgICB0aGlzLl90b29sdGlwLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsb3NlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZhYi5jbG9zZSgpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICAgIG9uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcblxuICAgICAgICAgICAgY2FzZSBVUF9BUlJPVzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mYWIuaXNWZXJ0aWNhbCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmFiLmZvY3VzU2libGluZyh0aGlzLmZhYi5kaXJlY3Rpb24kLnZhbHVlICE9PSAnYm90dG9tJyk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIERPV05fQVJST1c6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZmFiLmlzVmVydGljYWwoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZhYi5mb2N1c1NpYmxpbmcodGhpcy5mYWIuZGlyZWN0aW9uJC52YWx1ZSA9PT0gJ2JvdHRvbScpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBMRUZUX0FSUk9XOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZhYi5pc0hvcml6b250YWwoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZhYi5mb2N1c1NpYmxpbmcodGhpcy5mYWIuZGlyZWN0aW9uJC52YWx1ZSAhPT0gJ3JpZ2h0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFJJR0hUX0FSUk9XOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZhYi5pc0hvcml6b250YWwoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZhYi5mb2N1c1NpYmxpbmcodGhpcy5mYWIuZGlyZWN0aW9uJC52YWx1ZSA9PT0gJ3JpZ2h0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEVOVEVSOlxuICAgICAgICAgICAgICAgIHRoaXMuZmFiLmZvY3VzUHJpbWFyeUJ1dHRvbigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEVTQ0FQRTpcbiAgICAgICAgICAgICAgICB0aGlzLmZhYi5mb2N1c1ByaW1hcnlCdXR0b24oKTtcbiAgICAgICAgICAgICAgICB0aGlzLmZhYi5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIH1cblxuICAgIH1cbn0iXX0=