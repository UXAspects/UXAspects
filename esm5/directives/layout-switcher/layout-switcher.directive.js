/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, QueryList, ContentChildren, Input, ViewContainerRef } from '@angular/core';
import { ResizeService } from '../resize/index';
import { LayoutSwitcherItemDirective } from './layout-switcher-item.directive';
var LayoutSwitcherDirective = (function () {
    function LayoutSwitcherDirective(_elementRef, resizeService, _viewContainerRef) {
        var _this = this;
        this._elementRef = _elementRef;
        this._viewContainerRef = _viewContainerRef;
        // watch for changes to the container size
        resizeService.addResizeListener(_elementRef.nativeElement).subscribe(function (event) {
            _this._width = event.width;
            // render the appropriate layout
            // render the appropriate layout
            _this.updateActiveLayout();
        });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    LayoutSwitcherDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        // if the active group has changed then render the appropriate layout
        if (changes["group"].currentValue !== changes["group"].previousValue) {
            this.updateActiveLayout();
        }
    };
    /**
     * @return {?}
     */
    LayoutSwitcherDirective.prototype.getActiveLayout = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // if there are currently no layouts then do nothing
        if (!this._layouts) {
            return null;
        }
        // otherwise find layouts that match the active group and that meet the constraints
        return this._layouts.filter(function (layout) { return _this.group === layout.getConfig().group; }).find(function (layout) {
            var /** @type {?} */ minWidth = layout.getConfig().minWidth || 0;
            var /** @type {?} */ maxWidth = layout.getConfig().maxWidth || Infinity;
            return _this._width >= minWidth && _this._width < maxWidth;
        });
    };
    /**
     * @return {?}
     */
    LayoutSwitcherDirective.prototype.updateActiveLayout = /**
     * @return {?}
     */
    function () {
        // get the layout that should be shown
        var /** @type {?} */ layout = this.getActiveLayout();
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
    };
    /**
     * @return {?}
     */
    LayoutSwitcherDirective.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        // store the initial current element width
        this._width = this._elementRef.nativeElement.offsetWidth;
        // render the appropriate layout - need a delay as Angular doesn't like changes like this in these lifecycle hooks
        requestAnimationFrame(this.updateActiveLayout.bind(this));
    };
    LayoutSwitcherDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxLayoutSwitcher]'
                },] },
    ];
    /** @nocollapse */
    LayoutSwitcherDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: ResizeService, },
        { type: ViewContainerRef, },
    ]; };
    LayoutSwitcherDirective.propDecorators = {
        "group": [{ type: Input },],
        "_layouts": [{ type: ContentChildren, args: [LayoutSwitcherItemDirective,] },],
    };
    return LayoutSwitcherDirective;
}());
export { LayoutSwitcherDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LXN3aXRjaGVyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2xheW91dC1zd2l0Y2hlci9sYXlvdXQtc3dpdGNoZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBb0IsZ0JBQWdCLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZKLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQzs7SUFhM0UsaUNBQW9CLFdBQXVCLEVBQUUsYUFBNEIsRUFDN0Q7UUFEWixpQkFVQztRQVZtQixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUMvQixzQkFBaUIsR0FBakIsaUJBQWlCOztRQUd6QixhQUFhLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUs7WUFDdEUsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDOztZQUcxQixBQURBLGdDQUFnQztZQUNoQyxLQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUM3QixDQUFDLENBQUM7S0FDTjs7Ozs7SUFFRCw2Q0FBVzs7OztJQUFYLFVBQVksT0FBc0I7O1FBRzlCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sVUFBTyxZQUFZLEtBQUssT0FBTyxVQUFPLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDN0QsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDN0I7S0FDSjs7OztJQUVELGlEQUFlOzs7SUFBZjtRQUFBLGlCQWVDOztRQVpHLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNmOztRQUdELE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLEtBQUssTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssRUFBdkMsQ0FBdUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07WUFFdEYscUJBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDO1lBQ2hELHFCQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQztZQUV2RCxNQUFNLENBQUMsS0FBSSxDQUFDLE1BQU0sSUFBSSxRQUFRLElBQUksS0FBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7U0FDNUQsQ0FBQyxDQUFDO0tBQ047Ozs7SUFFRCxvREFBa0I7OztJQUFsQjs7UUFHSSxxQkFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDOztRQUdwQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDaEMsTUFBTSxDQUFDO1NBQ1Y7O1FBR0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNuQzs7UUFHRCxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQzs7UUFHNUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNqQztLQUNKOzs7O0lBRUQsb0RBQWtCOzs7SUFBbEI7O1FBR0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7O1FBR3pELHFCQUFxQixDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUM3RDs7Z0JBL0VKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsb0JBQW9CO2lCQUNqQzs7OztnQkFObUIsVUFBVTtnQkFDckIsYUFBYTtnQkFEK0QsZ0JBQWdCOzs7MEJBU2hHLEtBQUs7NkJBQ0wsZUFBZSxTQUFDLDJCQUEyQjs7a0NBVmhEOztTQU9hLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgUXVlcnlMaXN0LCBDb250ZW50Q2hpbGRyZW4sIElucHV0LCBBZnRlckNvbnRlbnRJbml0LCBWaWV3Q29udGFpbmVyUmVmLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlc2l6ZVNlcnZpY2UgfSBmcm9tICcuLi9yZXNpemUvaW5kZXgnO1xuaW1wb3J0IHsgTGF5b3V0U3dpdGNoZXJJdGVtRGlyZWN0aXZlIH0gZnJvbSAnLi9sYXlvdXQtc3dpdGNoZXItaXRlbS5kaXJlY3RpdmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t1eExheW91dFN3aXRjaGVyXSdcbn0pXG5leHBvcnQgY2xhc3MgTGF5b3V0U3dpdGNoZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkNoYW5nZXMge1xuXG4gICAgQElucHV0KCkgZ3JvdXA6IHN0cmluZztcbiAgICBAQ29udGVudENoaWxkcmVuKExheW91dFN3aXRjaGVySXRlbURpcmVjdGl2ZSkgcHJpdmF0ZSBfbGF5b3V0czogUXVlcnlMaXN0PExheW91dFN3aXRjaGVySXRlbURpcmVjdGl2ZT47XG4gICAgXG4gICAgcHJpdmF0ZSBfd2lkdGg6IG51bWJlcjtcbiAgICBwcml2YXRlIF9hY3RpdmVMYXlvdXQ6IExheW91dFN3aXRjaGVySXRlbURpcmVjdGl2ZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHJlc2l6ZVNlcnZpY2U6IFJlc2l6ZVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcblxuICAgICAgICAvLyB3YXRjaCBmb3IgY2hhbmdlcyB0byB0aGUgY29udGFpbmVyIHNpemVcbiAgICAgICAgcmVzaXplU2VydmljZS5hZGRSZXNpemVMaXN0ZW5lcihfZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KS5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuICAgICAgICAgICAgdGhpcy5fd2lkdGggPSBldmVudC53aWR0aDtcblxuICAgICAgICAgICAgLy8gcmVuZGVyIHRoZSBhcHByb3ByaWF0ZSBsYXlvdXRcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQWN0aXZlTGF5b3V0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcblxuICAgICAgICAvLyBpZiB0aGUgYWN0aXZlIGdyb3VwIGhhcyBjaGFuZ2VkIHRoZW4gcmVuZGVyIHRoZSBhcHByb3ByaWF0ZSBsYXlvdXRcbiAgICAgICAgaWYgKGNoYW5nZXMuZ3JvdXAuY3VycmVudFZhbHVlICE9PSBjaGFuZ2VzLmdyb3VwLnByZXZpb3VzVmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQWN0aXZlTGF5b3V0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRBY3RpdmVMYXlvdXQoKTogTGF5b3V0U3dpdGNoZXJJdGVtRGlyZWN0aXZlIHwgbnVsbCB7XG5cbiAgICAgICAgLy8gaWYgdGhlcmUgYXJlIGN1cnJlbnRseSBubyBsYXlvdXRzIHRoZW4gZG8gbm90aGluZ1xuICAgICAgICBpZiAoIXRoaXMuX2xheW91dHMpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gb3RoZXJ3aXNlIGZpbmQgbGF5b3V0cyB0aGF0IG1hdGNoIHRoZSBhY3RpdmUgZ3JvdXAgYW5kIHRoYXQgbWVldCB0aGUgY29uc3RyYWludHNcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xheW91dHMuZmlsdGVyKGxheW91dCA9PiB0aGlzLmdyb3VwID09PSBsYXlvdXQuZ2V0Q29uZmlnKCkuZ3JvdXApLmZpbmQobGF5b3V0ID0+IHtcblxuICAgICAgICAgICAgbGV0IG1pbldpZHRoID0gbGF5b3V0LmdldENvbmZpZygpLm1pbldpZHRoIHx8IDA7XG4gICAgICAgICAgICBsZXQgbWF4V2lkdGggPSBsYXlvdXQuZ2V0Q29uZmlnKCkubWF4V2lkdGggfHwgSW5maW5pdHk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl93aWR0aCA+PSBtaW5XaWR0aCAmJiB0aGlzLl93aWR0aCA8IG1heFdpZHRoO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVBY3RpdmVMYXlvdXQoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBsYXlvdXQgdGhhdCBzaG91bGQgYmUgc2hvd25cbiAgICAgICAgbGV0IGxheW91dCA9IHRoaXMuZ2V0QWN0aXZlTGF5b3V0KCk7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgd2UgYXJlIGN1cnJlbnRseSBzaG93aW5nIHRoZSBsYXlvdXRcbiAgICAgICAgaWYgKHRoaXMuX2FjdGl2ZUxheW91dCA9PT0gbGF5b3V0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZW1vdmUgdGhlIGN1cnJlbnQgbGF5b3V0XG4gICAgICAgIGlmICh0aGlzLl9hY3RpdmVMYXlvdXQpIHtcbiAgICAgICAgICAgIHRoaXMuX2FjdGl2ZUxheW91dC5kZWFjdGl2YXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzdG9yZSB0aGUgbmV3IGFjdGl2ZSBsYXlvdXRcbiAgICAgICAgdGhpcy5fYWN0aXZlTGF5b3V0ID0gbGF5b3V0O1xuXG4gICAgICAgIC8vIGlmIHRoZXJlIGlzIGFuIGFjdGl2ZSBsYXlvdXQgdGhlbiBhY3RpdmF0ZVxuICAgICAgICBpZiAodGhpcy5fYWN0aXZlTGF5b3V0KSB7XG4gICAgICAgICAgICB0aGlzLl9hY3RpdmVMYXlvdXQuYWN0aXZhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcblxuICAgICAgICAvLyBzdG9yZSB0aGUgaW5pdGlhbCBjdXJyZW50IGVsZW1lbnQgd2lkdGhcbiAgICAgICAgdGhpcy5fd2lkdGggPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG5cbiAgICAgICAgLy8gcmVuZGVyIHRoZSBhcHByb3ByaWF0ZSBsYXlvdXQgLSBuZWVkIGEgZGVsYXkgYXMgQW5ndWxhciBkb2Vzbid0IGxpa2UgY2hhbmdlcyBsaWtlIHRoaXMgaW4gdGhlc2UgbGlmZWN5Y2xlIGhvb2tzXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZUFjdGl2ZUxheW91dC5iaW5kKHRoaXMpKTtcbiAgICB9XG59Il19