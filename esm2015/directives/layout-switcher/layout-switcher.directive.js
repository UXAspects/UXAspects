/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, QueryList, ContentChildren, Input, ViewContainerRef } from '@angular/core';
import { ResizeService } from '../resize/index';
import { LayoutSwitcherItemDirective } from './layout-switcher-item.directive';
export class LayoutSwitcherDirective {
    /**
     * @param {?} _elementRef
     * @param {?} resizeService
     * @param {?} _viewContainerRef
     */
    constructor(_elementRef, resizeService, _viewContainerRef) {
        this._elementRef = _elementRef;
        this._viewContainerRef = _viewContainerRef;
        // watch for changes to the container size
        resizeService.addResizeListener(_elementRef.nativeElement).subscribe(event => {
            this._width = event.width;
            // render the appropriate layout
            this.updateActiveLayout();
        });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        // if the active group has changed then render the appropriate layout
        if (changes["group"].currentValue !== changes["group"].previousValue) {
            this.updateActiveLayout();
        }
    }
    /**
     * @return {?}
     */
    getActiveLayout() {
        // if there are currently no layouts then do nothing
        if (!this._layouts) {
            return null;
        }
        // otherwise find layouts that match the active group and that meet the constraints
        return this._layouts.filter(layout => this.group === layout.getConfig().group).find(layout => {
            let /** @type {?} */ minWidth = layout.getConfig().minWidth || 0;
            let /** @type {?} */ maxWidth = layout.getConfig().maxWidth || Infinity;
            return this._width >= minWidth && this._width < maxWidth;
        });
    }
    /**
     * @return {?}
     */
    updateActiveLayout() {
        // get the layout that should be shown
        let /** @type {?} */ layout = this.getActiveLayout();
        // check if we are currently showing the layout
        if (this._activeLayout === layout) {
            return;
        }
        // remove the current layout
        if (this._activeLayout) {
            this._activeLayout.deactivate();
        }
        // store the new active layout
        this._activeLayout = layout;
        // if there is an active layout then activate
        if (this._activeLayout) {
            this._activeLayout.activate();
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // store the initial current element width
        this._width = this._elementRef.nativeElement.offsetWidth;
        // render the appropriate layout - need a delay as Angular doesn't like changes like this in these lifecycle hooks
        requestAnimationFrame(this.updateActiveLayout.bind(this));
    }
}
LayoutSwitcherDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxLayoutSwitcher]'
            },] },
];
/** @nocollapse */
LayoutSwitcherDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: ResizeService, },
    { type: ViewContainerRef, },
];
LayoutSwitcherDirective.propDecorators = {
    "group": [{ type: Input },],
    "_layouts": [{ type: ContentChildren, args: [LayoutSwitcherItemDirective,] },],
};
function LayoutSwitcherDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    LayoutSwitcherDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    LayoutSwitcherDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    LayoutSwitcherDirective.propDecorators;
    /** @type {?} */
    LayoutSwitcherDirective.prototype.group;
    /** @type {?} */
    LayoutSwitcherDirective.prototype._layouts;
    /** @type {?} */
    LayoutSwitcherDirective.prototype._width;
    /** @type {?} */
    LayoutSwitcherDirective.prototype._activeLayout;
    /** @type {?} */
    LayoutSwitcherDirective.prototype._elementRef;
    /** @type {?} */
    LayoutSwitcherDirective.prototype._viewContainerRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LXN3aXRjaGVyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2xheW91dC1zd2l0Y2hlci9sYXlvdXQtc3dpdGNoZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBb0IsZ0JBQWdCLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZKLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUsvRSxNQUFNOzs7Ozs7SUFRRixZQUFvQixXQUF1QixFQUFFLGFBQTRCLEVBQzdEO1FBRFEsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDL0Isc0JBQWlCLEdBQWpCLGlCQUFpQjs7UUFHekIsYUFBYSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSztZQUN0RSxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7O1lBRzFCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQzdCLENBQUMsQ0FBQztLQUNOOzs7OztJQUVELFdBQVcsQ0FBQyxPQUFzQjs7UUFHOUIsRUFBRSxDQUFDLENBQUMsT0FBTyxVQUFPLFlBQVksS0FBSyxPQUFPLFVBQU8sYUFBYSxDQUFDLENBQUMsQ0FBQztZQUM3RCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUM3QjtLQUNKOzs7O0lBRUQsZUFBZTs7UUFHWCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDZjs7UUFHRCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNO1lBRXRGLHFCQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQztZQUNoRCxxQkFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUM7WUFFdkQsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDO1NBQzVELENBQUMsQ0FBQztLQUNOOzs7O0lBRUQsa0JBQWtCOztRQUdkLHFCQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7O1FBR3BDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNoQyxNQUFNLENBQUM7U0FDVjs7UUFHRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ25DOztRQUdELElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDOztRQUc1QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ2pDO0tBQ0o7Ozs7SUFFRCxrQkFBa0I7O1FBR2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7O1FBR3pELHFCQUFxQixDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUM3RDs7O1lBL0VKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsb0JBQW9CO2FBQ2pDOzs7O1lBTm1CLFVBQVU7WUFDckIsYUFBYTtZQUQrRCxnQkFBZ0I7OztzQkFTaEcsS0FBSzt5QkFDTCxlQUFlLFNBQUMsMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBRdWVyeUxpc3QsIENvbnRlbnRDaGlsZHJlbiwgSW5wdXQsIEFmdGVyQ29udGVudEluaXQsIFZpZXdDb250YWluZXJSZWYsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVzaXplU2VydmljZSB9IGZyb20gJy4uL3Jlc2l6ZS9pbmRleCc7XG5pbXBvcnQgeyBMYXlvdXRTd2l0Y2hlckl0ZW1EaXJlY3RpdmUgfSBmcm9tICcuL2xheW91dC1zd2l0Y2hlci1pdGVtLmRpcmVjdGl2ZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4TGF5b3V0U3dpdGNoZXJdJ1xufSlcbmV4cG9ydCBjbGFzcyBMYXlvdXRTd2l0Y2hlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uQ2hhbmdlcyB7XG5cbiAgICBASW5wdXQoKSBncm91cDogc3RyaW5nO1xuICAgIEBDb250ZW50Q2hpbGRyZW4oTGF5b3V0U3dpdGNoZXJJdGVtRGlyZWN0aXZlKSBwcml2YXRlIF9sYXlvdXRzOiBRdWVyeUxpc3Q8TGF5b3V0U3dpdGNoZXJJdGVtRGlyZWN0aXZlPjtcbiAgICBcbiAgICBwcml2YXRlIF93aWR0aDogbnVtYmVyO1xuICAgIHByaXZhdGUgX2FjdGl2ZUxheW91dDogTGF5b3V0U3dpdGNoZXJJdGVtRGlyZWN0aXZlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcmVzaXplU2VydmljZTogUmVzaXplU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZikge1xuXG4gICAgICAgIC8vIHdhdGNoIGZvciBjaGFuZ2VzIHRvIHRoZSBjb250YWluZXIgc2l6ZVxuICAgICAgICByZXNpemVTZXJ2aWNlLmFkZFJlc2l6ZUxpc3RlbmVyKF9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAgICAgICB0aGlzLl93aWR0aCA9IGV2ZW50LndpZHRoO1xuXG4gICAgICAgICAgICAvLyByZW5kZXIgdGhlIGFwcHJvcHJpYXRlIGxheW91dFxuICAgICAgICAgICAgdGhpcy51cGRhdGVBY3RpdmVMYXlvdXQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuXG4gICAgICAgIC8vIGlmIHRoZSBhY3RpdmUgZ3JvdXAgaGFzIGNoYW5nZWQgdGhlbiByZW5kZXIgdGhlIGFwcHJvcHJpYXRlIGxheW91dFxuICAgICAgICBpZiAoY2hhbmdlcy5ncm91cC5jdXJyZW50VmFsdWUgIT09IGNoYW5nZXMuZ3JvdXAucHJldmlvdXNWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVBY3RpdmVMYXlvdXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEFjdGl2ZUxheW91dCgpOiBMYXlvdXRTd2l0Y2hlckl0ZW1EaXJlY3RpdmUgfCBudWxsIHtcblxuICAgICAgICAvLyBpZiB0aGVyZSBhcmUgY3VycmVudGx5IG5vIGxheW91dHMgdGhlbiBkbyBub3RoaW5nXG4gICAgICAgIGlmICghdGhpcy5fbGF5b3V0cykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBvdGhlcndpc2UgZmluZCBsYXlvdXRzIHRoYXQgbWF0Y2ggdGhlIGFjdGl2ZSBncm91cCBhbmQgdGhhdCBtZWV0IHRoZSBjb25zdHJhaW50c1xuICAgICAgICByZXR1cm4gdGhpcy5fbGF5b3V0cy5maWx0ZXIobGF5b3V0ID0+IHRoaXMuZ3JvdXAgPT09IGxheW91dC5nZXRDb25maWcoKS5ncm91cCkuZmluZChsYXlvdXQgPT4ge1xuXG4gICAgICAgICAgICBsZXQgbWluV2lkdGggPSBsYXlvdXQuZ2V0Q29uZmlnKCkubWluV2lkdGggfHwgMDtcbiAgICAgICAgICAgIGxldCBtYXhXaWR0aCA9IGxheW91dC5nZXRDb25maWcoKS5tYXhXaWR0aCB8fCBJbmZpbml0eTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dpZHRoID49IG1pbldpZHRoICYmIHRoaXMuX3dpZHRoIDwgbWF4V2lkdGg7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZUFjdGl2ZUxheW91dCgpOiB2b2lkIHtcblxuICAgICAgICAvLyBnZXQgdGhlIGxheW91dCB0aGF0IHNob3VsZCBiZSBzaG93blxuICAgICAgICBsZXQgbGF5b3V0ID0gdGhpcy5nZXRBY3RpdmVMYXlvdXQoKTtcblxuICAgICAgICAvLyBjaGVjayBpZiB3ZSBhcmUgY3VycmVudGx5IHNob3dpbmcgdGhlIGxheW91dFxuICAgICAgICBpZiAodGhpcy5fYWN0aXZlTGF5b3V0ID09PSBsYXlvdXQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlbW92ZSB0aGUgY3VycmVudCBsYXlvdXRcbiAgICAgICAgaWYgKHRoaXMuX2FjdGl2ZUxheW91dCkge1xuICAgICAgICAgICAgdGhpcy5fYWN0aXZlTGF5b3V0LmRlYWN0aXZhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN0b3JlIHRoZSBuZXcgYWN0aXZlIGxheW91dFxuICAgICAgICB0aGlzLl9hY3RpdmVMYXlvdXQgPSBsYXlvdXQ7XG5cbiAgICAgICAgLy8gaWYgdGhlcmUgaXMgYW4gYWN0aXZlIGxheW91dCB0aGVuIGFjdGl2YXRlXG4gICAgICAgIGlmICh0aGlzLl9hY3RpdmVMYXlvdXQpIHtcbiAgICAgICAgICAgIHRoaXMuX2FjdGl2ZUxheW91dC5hY3RpdmF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuXG4gICAgICAgIC8vIHN0b3JlIHRoZSBpbml0aWFsIGN1cnJlbnQgZWxlbWVudCB3aWR0aFxuICAgICAgICB0aGlzLl93aWR0aCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcblxuICAgICAgICAvLyByZW5kZXIgdGhlIGFwcHJvcHJpYXRlIGxheW91dCAtIG5lZWQgYSBkZWxheSBhcyBBbmd1bGFyIGRvZXNuJ3QgbGlrZSBjaGFuZ2VzIGxpa2UgdGhpcyBpbiB0aGVzZSBsaWZlY3ljbGUgaG9va3NcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlQWN0aXZlTGF5b3V0LmJpbmQodGhpcykpO1xuICAgIH1cbn0iXX0=