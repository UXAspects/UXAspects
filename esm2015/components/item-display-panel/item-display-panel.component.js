/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Directive, Input, Output, EventEmitter, ContentChild, ElementRef } from '@angular/core';
import { SidePanelComponent } from '../side-panel/side-panel.component';
import { SidePanelService } from '../side-panel/side-panel.service';
export class ItemDisplayPanelContentDirective {
}
ItemDisplayPanelContentDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxItemDisplayPanelContent]'
            },] },
];
function ItemDisplayPanelContentDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ItemDisplayPanelContentDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ItemDisplayPanelContentDirective.ctorParameters;
}
export class ItemDisplayPanelFooterDirective {
}
ItemDisplayPanelFooterDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxItemDisplayPanelFooter]'
            },] },
];
function ItemDisplayPanelFooterDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ItemDisplayPanelFooterDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ItemDisplayPanelFooterDirective.ctorParameters;
}
export class ItemDisplayPanelComponent extends SidePanelComponent {
    /**
     * @param {?} service
     * @param {?} elementRef
     */
    constructor(service, elementRef) {
        super(service, elementRef);
        this.boxShadow = true;
        this.closeVisible = true;
        this.shadow = false;
        this.visibleChange = new EventEmitter();
        this.animate = false;
        this.closeOnExternalClick = true;
    }
    /**
     * @return {?}
     */
    get preventClose() {
        return !this.closeOnExternalClick;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set preventClose(value) {
        this.closeOnExternalClick = !value;
    }
    /**
     * @deprecated
     * Title used for adding tooltips and shouldn't be used as an input
     * instead header will be used. This is here to support backward compatibility only
     * this property should not be used.
     * @param {?} value
     * @return {?}
     */
    set title(value) {
        this.header = value;
    }
    /**
     * @return {?}
     */
    get title() {
        return this.header;
    }
    /**
     * @param {?} visible
     * @return {?}
     */
    set visible(visible) {
        this.open = visible;
    }
    /**
     * @return {?}
     */
    get visible() {
        return this.open;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._itemDisplayPanelSubscription = this.service.open$.subscribe((next) => {
            this.visibleChange.emit(next);
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._itemDisplayPanelSubscription.unsubscribe();
    }
}
ItemDisplayPanelComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-item-display-panel',
                template: `<div class="ux-side-panel-host ux-item-display-panel"
    [class.box-shadow]="boxShadow"
    [style.position]="position"
    [style.width]="hostWidth"
    [style.top]="cssTop">

    <div class="ux-side-panel-header" [class.item-display-panel-shadow]="shadow">
        <h3>{{ header }}</h3>
        <button *ngIf="closeVisible" type="button" class="btn btn-lg btn-link btn-icon button-secondary" (click)="visible = false">
            <i class="hpe-icon hpe-close"></i>
        </button>
    </div>

    <div class="ux-side-panel-content">
        <ng-content select="[uxItemDisplayPanelContent]"></ng-content>
    </div>

    <div class="ux-side-panel-footer" *ngIf="footer">
        <ng-content select="[uxItemDisplayPanelFooter]"></ng-content>
    </div>

</div>
`,
                providers: [SidePanelService],
                host: {
                    'class': 'ux-side-panel ux-item-display-panel'
                }
            },] },
];
/** @nocollapse */
ItemDisplayPanelComponent.ctorParameters = () => [
    { type: SidePanelService, },
    { type: ElementRef, },
];
ItemDisplayPanelComponent.propDecorators = {
    "header": [{ type: Input },],
    "boxShadow": [{ type: Input },],
    "closeVisible": [{ type: Input },],
    "preventClose": [{ type: Input },],
    "shadow": [{ type: Input },],
    "footer": [{ type: ContentChild, args: [ItemDisplayPanelFooterDirective,] },],
    "visibleChange": [{ type: Output },],
    "title": [{ type: Input },],
    "visible": [{ type: Input },],
};
function ItemDisplayPanelComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ItemDisplayPanelComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ItemDisplayPanelComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    ItemDisplayPanelComponent.propDecorators;
    /** @type {?} */
    ItemDisplayPanelComponent.prototype.header;
    /** @type {?} */
    ItemDisplayPanelComponent.prototype.boxShadow;
    /** @type {?} */
    ItemDisplayPanelComponent.prototype.closeVisible;
    /** @type {?} */
    ItemDisplayPanelComponent.prototype.shadow;
    /** @type {?} */
    ItemDisplayPanelComponent.prototype.footer;
    /** @type {?} */
    ItemDisplayPanelComponent.prototype.visibleChange;
    /** @type {?} */
    ItemDisplayPanelComponent.prototype._itemDisplayPanelSubscription;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1kaXNwbGF5LXBhbmVsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2l0ZW0tZGlzcGxheS1wYW5lbC9pdGVtLWRpc3BsYXktcGFuZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTVHLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBS3BFLE1BQU07OztZQUhMLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsNkJBQTZCO2FBQzFDOzs7Ozs7Ozs7OztBQU1ELE1BQU07OztZQUhMLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsNEJBQTRCO2FBQ3pDOzs7Ozs7Ozs7OztBQWlDRCxNQUFNLGdDQUFpQyxTQUFRLGtCQUFrQjs7Ozs7SUFpRDdELFlBQVksT0FBeUIsRUFBRSxVQUFzQjtRQUN6RCxLQUFLLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO3lCQTlDRCxJQUFJOzRCQUVELElBQUk7c0JBV1YsS0FBSzs2QkFJaUIsSUFBSSxZQUFZLEVBQVc7UUErQnhFLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7S0FDcEM7Ozs7SUE5Q0QsSUFBSSxZQUFZO1FBQ1osTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDO0tBQ3JDOzs7OztRQUdHLFlBQVksQ0FBQyxLQUFjO1FBQzNCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLEtBQUssQ0FBQzs7Ozs7Ozs7OztRQWdCbkMsS0FBSyxDQUFDLEtBQWE7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7Ozs7O0lBR3hCLElBQUksS0FBSztRQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0tBQ3RCOzs7OztRQUdHLE9BQU8sQ0FBQyxPQUFnQjtRQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQzs7Ozs7SUFHeEIsSUFBSSxPQUFPO1FBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7S0FDcEI7Ozs7SUFXRCxRQUFRO1FBQ0osSUFBSSxDQUFDLDZCQUE2QixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUk7WUFDbkUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakMsQ0FBQyxDQUFDO0tBQ047Ozs7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLDZCQUE2QixDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3BEOzs7WUE5RkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXNCYjtnQkFDRyxTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDN0IsSUFBSSxFQUFFO29CQUNGLE9BQU8sRUFBRSxxQ0FBcUM7aUJBQ2pEO2FBQ0o7Ozs7WUF6Q1EsZ0JBQWdCO1lBSGlELFVBQVU7Ozt1QkErQy9FLEtBQUs7MEJBRUwsS0FBSzs2QkFFTCxLQUFLOzZCQU1MLEtBQUs7dUJBS0wsS0FBSzt1QkFFTCxZQUFZLFNBQUMsK0JBQStCOzhCQUU1QyxNQUFNO3NCQVFOLEtBQUs7d0JBU0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRGlyZWN0aXZlLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIENvbnRlbnRDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgU2lkZVBhbmVsQ29tcG9uZW50IH0gZnJvbSAnLi4vc2lkZS1wYW5lbC9zaWRlLXBhbmVsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTaWRlUGFuZWxTZXJ2aWNlIH0gZnJvbSAnLi4vc2lkZS1wYW5lbC9zaWRlLXBhbmVsLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t1eEl0ZW1EaXNwbGF5UGFuZWxDb250ZW50XSdcbn0pXG5leHBvcnQgY2xhc3MgSXRlbURpc3BsYXlQYW5lbENvbnRlbnREaXJlY3RpdmUgeyB9XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4SXRlbURpc3BsYXlQYW5lbEZvb3Rlcl0nXG59KVxuZXhwb3J0IGNsYXNzIEl0ZW1EaXNwbGF5UGFuZWxGb290ZXJEaXJlY3RpdmUgeyB9XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtaXRlbS1kaXNwbGF5LXBhbmVsJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ1eC1zaWRlLXBhbmVsLWhvc3QgdXgtaXRlbS1kaXNwbGF5LXBhbmVsXCJcbiAgICBbY2xhc3MuYm94LXNoYWRvd109XCJib3hTaGFkb3dcIlxuICAgIFtzdHlsZS5wb3NpdGlvbl09XCJwb3NpdGlvblwiXG4gICAgW3N0eWxlLndpZHRoXT1cImhvc3RXaWR0aFwiXG4gICAgW3N0eWxlLnRvcF09XCJjc3NUb3BcIj5cblxuICAgIDxkaXYgY2xhc3M9XCJ1eC1zaWRlLXBhbmVsLWhlYWRlclwiIFtjbGFzcy5pdGVtLWRpc3BsYXktcGFuZWwtc2hhZG93XT1cInNoYWRvd1wiPlxuICAgICAgICA8aDM+e3sgaGVhZGVyIH19PC9oMz5cbiAgICAgICAgPGJ1dHRvbiAqbmdJZj1cImNsb3NlVmlzaWJsZVwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tbGcgYnRuLWxpbmsgYnRuLWljb24gYnV0dG9uLXNlY29uZGFyeVwiIChjbGljayk9XCJ2aXNpYmxlID0gZmFsc2VcIj5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwiaHBlLWljb24gaHBlLWNsb3NlXCI+PC9pPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJ1eC1zaWRlLXBhbmVsLWNvbnRlbnRcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3V4SXRlbURpc3BsYXlQYW5lbENvbnRlbnRdXCI+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInV4LXNpZGUtcGFuZWwtZm9vdGVyXCIgKm5nSWY9XCJmb290ZXJcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3V4SXRlbURpc3BsYXlQYW5lbEZvb3Rlcl1cIj48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG5cbjwvZGl2PlxuYCxcbiAgICBwcm92aWRlcnM6IFtTaWRlUGFuZWxTZXJ2aWNlXSxcbiAgICBob3N0OiB7XG4gICAgICAgICdjbGFzcyc6ICd1eC1zaWRlLXBhbmVsIHV4LWl0ZW0tZGlzcGxheS1wYW5lbCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIEl0ZW1EaXNwbGF5UGFuZWxDb21wb25lbnQgZXh0ZW5kcyBTaWRlUGFuZWxDb21wb25lbnQge1xuXG4gICAgQElucHV0KCkgaGVhZGVyOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBib3hTaGFkb3c6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgY2xvc2VWaXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGdldCBwcmV2ZW50Q2xvc2UoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhdGhpcy5jbG9zZU9uRXh0ZXJuYWxDbGljaztcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBwcmV2ZW50Q2xvc2UodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5jbG9zZU9uRXh0ZXJuYWxDbGljayA9ICF2YWx1ZTtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBzaGFkb3c6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBDb250ZW50Q2hpbGQoSXRlbURpc3BsYXlQYW5lbEZvb3RlckRpcmVjdGl2ZSkgZm9vdGVyOiBJdGVtRGlzcGxheVBhbmVsRm9vdGVyRGlyZWN0aXZlO1xuXG4gICAgQE91dHB1dCgpIHZpc2libGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIC8qKlxuICAgICAqIEBkZXByZWNhdGVkXG4gICAgICogVGl0bGUgdXNlZCBmb3IgYWRkaW5nIHRvb2x0aXBzIGFuZCBzaG91bGRuJ3QgYmUgdXNlZCBhcyBhbiBpbnB1dFxuICAgICAqIGluc3RlYWQgaGVhZGVyIHdpbGwgYmUgdXNlZC4gVGhpcyBpcyBoZXJlIHRvIHN1cHBvcnQgYmFja3dhcmQgY29tcGF0aWJpbGl0eSBvbmx5XG4gICAgICogdGhpcyBwcm9wZXJ0eSBzaG91bGQgbm90IGJlIHVzZWQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzZXQgdGl0bGUodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLmhlYWRlciA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCB0aXRsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVhZGVyO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHZpc2libGUodmlzaWJsZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLm9wZW4gPSB2aXNpYmxlO1xuICAgIH1cblxuICAgIGdldCB2aXNpYmxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcGVuO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2l0ZW1EaXNwbGF5UGFuZWxTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKHNlcnZpY2U6IFNpZGVQYW5lbFNlcnZpY2UsIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgc3VwZXIoc2VydmljZSwgZWxlbWVudFJlZik7XG5cbiAgICAgICAgdGhpcy5hbmltYXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2xvc2VPbkV4dGVybmFsQ2xpY2sgPSB0cnVlO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLl9pdGVtRGlzcGxheVBhbmVsU3Vic2NyaXB0aW9uID0gdGhpcy5zZXJ2aWNlLm9wZW4kLnN1YnNjcmliZSgobmV4dCkgPT4ge1xuICAgICAgICAgICAgdGhpcy52aXNpYmxlQ2hhbmdlLmVtaXQobmV4dCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLl9pdGVtRGlzcGxheVBhbmVsU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxufSJdfQ==