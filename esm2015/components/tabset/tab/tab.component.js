/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { TabsetService } from '../tabset.service';
let /** @type {?} */ uniqueTabId = 0;
export class TabComponent {
    /**
     * @param {?} _tabset
     */
    constructor(_tabset) {
        this._tabset = _tabset;
        this.id = `ux-tab-${++uniqueTabId}`;
        this.disabled = false;
        this.select = new EventEmitter();
        this.deselect = new EventEmitter();
        this.active$ = this._tabset.active$.pipe(map(active => active === this));
        _tabset.add(this);
        this._subscription = this.active$.subscribe(active => active ? this.select.emit() : this.deselect.emit());
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set active(value) {
        if (value) {
            this._tabset.select(this);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._tabset.remove(this);
        this._subscription.unsubscribe();
    }
}
TabComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-tab',
                template: "<div role=\"tabpanel\"\n     class=\"tab-pane\"\n     [class.active]=\"active$ | async\"\n     [id]=\"id + '-panel'\"\n     [attr.aria-labelledby]=\"id\"\n     [attr.aria-hidden]=\"!(active$ | async)\">\n  <ng-content></ng-content>\n</div>",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
TabComponent.ctorParameters = () => [
    { type: TabsetService }
];
TabComponent.propDecorators = {
    id: [{ type: Input }],
    disabled: [{ type: Input }],
    heading: [{ type: Input }],
    customClass: [{ type: Input }],
    select: [{ type: Output }],
    deselect: [{ type: Output }],
    active: [{ type: Input }]
};
function TabComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    TabComponent.prototype.id;
    /** @type {?} */
    TabComponent.prototype.disabled;
    /** @type {?} */
    TabComponent.prototype.heading;
    /** @type {?} */
    TabComponent.prototype.customClass;
    /** @type {?} */
    TabComponent.prototype.select;
    /** @type {?} */
    TabComponent.prototype.deselect;
    /** @type {?} */
    TabComponent.prototype.headingRef;
    /** @type {?} */
    TabComponent.prototype.active$;
    /** @type {?} */
    TabComponent.prototype._subscription;
    /** @type {?} */
    TabComponent.prototype._tabset;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3RhYnNldC90YWIvdGFiLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBZSxNQUFNLGVBQWUsQ0FBQztBQUd4SCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRWxELHFCQUFJLFdBQVcsR0FBRyxDQUFDLENBQUM7QUFPcEIsTUFBTTs7OztJQXFCRixZQUFvQixPQUFzQjtRQUF0QixZQUFPLEdBQVAsT0FBTyxDQUFlO2tCQW5CcEIsVUFBVSxFQUFFLFdBQVcsRUFBRTt3QkFDbEIsS0FBSztzQkFJZixJQUFJLFlBQVksRUFBUTt3QkFDdEIsSUFBSSxZQUFZLEVBQVE7dUJBU2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsQ0FBQztRQUtwRixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWxCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUM3Rzs7Ozs7SUFmRCxJQUFhLE1BQU0sQ0FBQyxLQUFjO1FBQzlCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDUixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM3QjtLQUNKOzs7O0lBYUQsV0FBVztRQUNQLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEM7OztZQW5DSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLDJQQUFtQztnQkFDbkMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDbEQ7Ozs7WUFSUSxhQUFhOzs7aUJBV2pCLEtBQUs7dUJBQ0wsS0FBSztzQkFDTCxLQUFLOzBCQUNMLEtBQUs7cUJBRUwsTUFBTTt1QkFDTixNQUFNO3FCQUVOLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgVGFic2V0U2VydmljZSB9IGZyb20gJy4uL3RhYnNldC5zZXJ2aWNlJztcblxubGV0IHVuaXF1ZVRhYklkID0gMDtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC10YWInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90YWIuY29tcG9uZW50Lmh0bWwnLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFRhYkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBpZDogc3RyaW5nID0gYHV4LXRhYi0keysrdW5pcXVlVGFiSWR9YDtcbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGhlYWRpbmc6IHN0cmluZztcbiAgICBASW5wdXQoKSBjdXN0b21DbGFzczogc3RyaW5nO1xuXG4gICAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgICBAT3V0cHV0KCkgZGVzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICBASW5wdXQoKSBzZXQgYWN0aXZlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fdGFic2V0LnNlbGVjdCh0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhlYWRpbmdSZWY6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgYWN0aXZlJDogT2JzZXJ2YWJsZTxib29sZWFuPiA9IHRoaXMuX3RhYnNldC5hY3RpdmUkLnBpcGUobWFwKGFjdGl2ZSA9PiBhY3RpdmUgPT09IHRoaXMpKTtcblxuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfdGFic2V0OiBUYWJzZXRTZXJ2aWNlKSB7XG4gICAgICAgIF90YWJzZXQuYWRkKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IHRoaXMuYWN0aXZlJC5zdWJzY3JpYmUoYWN0aXZlID0+IGFjdGl2ZSA/IHRoaXMuc2VsZWN0LmVtaXQoKSA6IHRoaXMuZGVzZWxlY3QuZW1pdCgpKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fdGFic2V0LnJlbW92ZSh0aGlzKTtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG59Il19