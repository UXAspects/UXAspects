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
var FloatingActionButtonComponent = /** @class */ (function () {
    function FloatingActionButtonComponent(primary, fab, _tooltip) {
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
    FloatingActionButtonComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._tooltip) {
            // ensure the tooltip gets hidden when the button is hidden
            this.fab.open$.pipe(takeUntil(this._onDestroy), filter(function (isOpen) { return !isOpen && !_this.primary; }))
                .subscribe(function () { return _this._tooltip.hide(); });
        }
    };
    /**
     * @return {?}
     */
    FloatingActionButtonComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /**
     * @return {?}
     */
    FloatingActionButtonComponent.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.button.nativeElement.focus();
    };
    /**
     * @return {?}
     */
    FloatingActionButtonComponent.prototype.onFocus = /**
     * @return {?}
     */
    function () {
        // ensure the tooltip gets shown
        if (this._tooltip) {
            this._tooltip.show();
        }
    };
    /**
     * @return {?}
     */
    FloatingActionButtonComponent.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        // ensure the tooltip gets hidden
        if (this._tooltip) {
            this._tooltip.hide();
        }
    };
    /**
     * @return {?}
     */
    FloatingActionButtonComponent.prototype.close = /**
     * @return {?}
     */
    function () {
        this.fab.close();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FloatingActionButtonComponent.prototype.onKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
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
    };
    FloatingActionButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-floating-action-button',
                    template: "<button #button class=\"btn floating-action-button\"\n        [class.button-primary]=\"primary\"\n        [class.button-secondary]=\"!primary\"\n        [attr.aria-label]=\"ariaLabel\"\n        [tabIndex]=\"tabindex$ | async\"\n        (focus)=\"onFocus()\"\n        (blur)=\"onBlur()\"\n        (click)=\"primary ? fab.toggle() : close()\">\n\n    <span class=\"hpe-icon floating-action-button-icon\" *ngIf=\"icon\" [ngClass]=\"icon\"></span>\n    <ng-content *ngIf=\"!icon\"></ng-content>\n\n</button>",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false
                }] }
    ];
    /** @nocollapse */
    FloatingActionButtonComponent.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Attribute, args: ['fab-primary',] }] },
        { type: FloatingActionButtonsService },
        { type: TooltipDirective, decorators: [{ type: Optional }] }
    ]; };
    FloatingActionButtonComponent.propDecorators = {
        icon: [{ type: Input }],
        ariaLabel: [{ type: Input, args: ['aria-label',] }],
        button: [{ type: ViewChild, args: ['button',] }],
        onKeydown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
    };
    return FloatingActionButtonComponent;
}());
export { FloatingActionButtonComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXRpbmctYWN0aW9uLWJ1dHRvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9mbG9hdGluZy1hY3Rpb24tYnV0dG9ucy9mbG9hdGluZy1hY3Rpb24tYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDckcsT0FBTyxFQUFpQixTQUFTLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUosT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7SUFtQjdFLHVDQUFzQyxPQUFlLEVBQVMsR0FBaUMsRUFBc0IsUUFBMEI7UUFBakYsUUFBRyxHQUFILEdBQUcsQ0FBOEI7UUFBc0IsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7dUJBTDVILEtBQUs7eUJBQ1osSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7MEJBRXRCLElBQUksT0FBTyxFQUFRO1FBR3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxLQUFLLElBQUksQ0FBQztLQUNuQzs7OztJQUVELHVEQUFlOzs7SUFBZjtRQUFBLGlCQU1DO1FB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Q0FBQztZQUVWLEtBQUssS0FBSztnQkFDTixJQUFJLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLENBQUM7Z0JBQzlCLEtBQUssQ0FBQztZQUVWLEtBQUssTUFBTTtnQkFDUCxJQUFJLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2pCLEtBQUssQ0FBQztTQUViO0tBRUo7O2dCQXBHSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLDJCQUEyQjtvQkFDckMsbWdCQUFzRDtvQkFDdEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLG1CQUFtQixFQUFFLEtBQUs7aUJBQzdCOzs7OzZDQVlnQixTQUFTLFNBQUMsYUFBYTtnQkFuQi9CLDRCQUE0QjtnQkFENUIsZ0JBQWdCLHVCQW9CNkUsUUFBUTs7O3VCQVR6RyxLQUFLOzRCQUNMLEtBQUssU0FBQyxZQUFZO3lCQUNsQixTQUFTLFNBQUMsUUFBUTs0QkE4Q2xCLFlBQVksU0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7O3dDQWhFdkM7O1NBY2EsNkJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRE9XTl9BUlJPVywgRU5URVIsIEVTQ0FQRSwgTEVGVF9BUlJPVywgUklHSFRfQVJST1csIFVQX0FSUk9XIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIEF0dHJpYnV0ZSwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25EZXN0cm95LCBPcHRpb25hbCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQgeyBmaWx0ZXIsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgVG9vbHRpcERpcmVjdGl2ZSB9IGZyb20gJy4uL3Rvb2x0aXAvaW5kZXgnO1xuaW1wb3J0IHsgRmxvYXRpbmdBY3Rpb25CdXR0b25zU2VydmljZSB9IGZyb20gJy4vZmxvYXRpbmctYWN0aW9uLWJ1dHRvbnMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtZmxvYXRpbmctYWN0aW9uLWJ1dHRvbicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2Zsb2F0aW5nLWFjdGlvbi1idXR0b24uY29tcG9uZW50Lmh0bWwnLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlXG59KVxuZXhwb3J0IGNsYXNzIEZsb2F0aW5nQWN0aW9uQnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIGljb246IHN0cmluZztcbiAgICBASW5wdXQoJ2FyaWEtbGFiZWwnKSBhcmlhTGFiZWw6IHN0cmluZztcbiAgICBAVmlld0NoaWxkKCdidXR0b24nKSBidXR0b246IEVsZW1lbnRSZWY7XG5cbiAgICBwcmltYXJ5OiBib29sZWFuID0gZmFsc2U7XG4gICAgdGFiaW5kZXgkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KC0xKTtcblxuICAgIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihAQXR0cmlidXRlKCdmYWItcHJpbWFyeScpIHByaW1hcnk6IHN0cmluZywgcHVibGljIGZhYjogRmxvYXRpbmdBY3Rpb25CdXR0b25zU2VydmljZSwgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfdG9vbHRpcDogVG9vbHRpcERpcmVjdGl2ZSkge1xuICAgICAgICB0aGlzLnByaW1hcnkgPSBwcmltYXJ5ICE9PSBudWxsO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX3Rvb2x0aXApIHtcbiAgICAgICAgICAgIC8vIGVuc3VyZSB0aGUgdG9vbHRpcCBnZXRzIGhpZGRlbiB3aGVuIHRoZSBidXR0b24gaXMgaGlkZGVuXG4gICAgICAgICAgICB0aGlzLmZhYi5vcGVuJC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpLCBmaWx0ZXIoaXNPcGVuID0+ICFpc09wZW4gJiYgIXRoaXMucHJpbWFyeSkpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLl90b29sdGlwLmhpZGUoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYnV0dG9uLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBvbkZvY3VzKCk6IHZvaWQge1xuICAgICAgICAvLyBlbnN1cmUgdGhlIHRvb2x0aXAgZ2V0cyBzaG93blxuICAgICAgICBpZiAodGhpcy5fdG9vbHRpcCkge1xuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5zaG93KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkJsdXIoKTogdm9pZCB7XG4gICAgICAgIC8vIGVuc3VyZSB0aGUgdG9vbHRpcCBnZXRzIGhpZGRlblxuICAgICAgICBpZiAodGhpcy5fdG9vbHRpcCkge1xuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbG9zZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mYWIuY2xvc2UoKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgICBvbktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG5cbiAgICAgICAgICAgIGNhc2UgVVBfQVJST1c6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZmFiLmlzVmVydGljYWwoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZhYi5mb2N1c1NpYmxpbmcodGhpcy5mYWIuZGlyZWN0aW9uJC52YWx1ZSAhPT0gJ2JvdHRvbScpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBET1dOX0FSUk9XOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZhYi5pc1ZlcnRpY2FsKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mYWIuZm9jdXNTaWJsaW5nKHRoaXMuZmFiLmRpcmVjdGlvbiQudmFsdWUgPT09ICdib3R0b20nKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgTEVGVF9BUlJPVzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mYWIuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mYWIuZm9jdXNTaWJsaW5nKHRoaXMuZmFiLmRpcmVjdGlvbiQudmFsdWUgIT09ICdyaWdodCcpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBSSUdIVF9BUlJPVzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mYWIuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mYWIuZm9jdXNTaWJsaW5nKHRoaXMuZmFiLmRpcmVjdGlvbiQudmFsdWUgPT09ICdyaWdodCcpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBFTlRFUjpcbiAgICAgICAgICAgICAgICB0aGlzLmZhYi5mb2N1c1ByaW1hcnlCdXR0b24oKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBFU0NBUEU6XG4gICAgICAgICAgICAgICAgdGhpcy5mYWIuZm9jdXNQcmltYXJ5QnV0dG9uKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5mYWIuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICB9XG5cbiAgICB9XG59Il19