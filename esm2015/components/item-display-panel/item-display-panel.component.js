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
/** @nocollapse */
ItemDisplayPanelContentDirective.ctorParameters = () => [];
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
/** @nocollapse */
ItemDisplayPanelFooterDirective.ctorParameters = () => [];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1kaXNwbGF5LXBhbmVsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2l0ZW0tZGlzcGxheS1wYW5lbC9pdGVtLWRpc3BsYXktcGFuZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTVHLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBS3BFLE1BQU07OztZQUhMLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsNkJBQTZCO2FBQzFDOzs7Ozs7Ozs7Ozs7O0FBTUQsTUFBTTs7O1lBSEwsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSw0QkFBNEI7YUFDekM7Ozs7Ozs7Ozs7Ozs7QUFpQ0QsTUFBTSxnQ0FBaUMsU0FBUSxrQkFBa0I7Ozs7O0lBaUQ3RCxZQUFZLE9BQXlCLEVBQUUsVUFBc0I7UUFDekQsS0FBSyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQzt5QkE5Q0QsSUFBSTs0QkFFRCxJQUFJO3NCQVdWLEtBQUs7NkJBSWlCLElBQUksWUFBWSxFQUFXO1FBK0J4RSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO0tBQ3BDOzs7O0lBOUNELElBQUksWUFBWTtRQUNaLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztLQUNyQzs7Ozs7UUFHRyxZQUFZLENBQUMsS0FBYztRQUMzQixJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxLQUFLLENBQUM7Ozs7Ozs7Ozs7UUFnQm5DLEtBQUssQ0FBQyxLQUFhO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDOzs7OztJQUd4QixJQUFJLEtBQUs7UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztLQUN0Qjs7Ozs7UUFHRyxPQUFPLENBQUMsT0FBZ0I7UUFDeEIsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7Ozs7O0lBR3hCLElBQUksT0FBTztRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0tBQ3BCOzs7O0lBV0QsUUFBUTtRQUNKLElBQUksQ0FBQyw2QkFBNkIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJO1lBQ25FLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pDLENBQUMsQ0FBQztLQUNOOzs7O0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNwRDs7O1lBOUZKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FzQmI7Z0JBQ0csU0FBUyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7Z0JBQzdCLElBQUksRUFBRTtvQkFDRixPQUFPLEVBQUUscUNBQXFDO2lCQUNqRDthQUNKOzs7O1lBekNRLGdCQUFnQjtZQUhpRCxVQUFVOzs7dUJBK0MvRSxLQUFLOzBCQUVMLEtBQUs7NkJBRUwsS0FBSzs2QkFNTCxLQUFLO3VCQUtMLEtBQUs7dUJBRUwsWUFBWSxTQUFDLCtCQUErQjs4QkFFNUMsTUFBTTtzQkFRTixLQUFLO3dCQVNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIERpcmVjdGl2ZSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDb250ZW50Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IFNpZGVQYW5lbENvbXBvbmVudCB9IGZyb20gJy4uL3NpZGUtcGFuZWwvc2lkZS1wYW5lbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2lkZVBhbmVsU2VydmljZSB9IGZyb20gJy4uL3NpZGUtcGFuZWwvc2lkZS1wYW5lbC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhJdGVtRGlzcGxheVBhbmVsQ29udGVudF0nXG59KVxuZXhwb3J0IGNsYXNzIEl0ZW1EaXNwbGF5UGFuZWxDb250ZW50RGlyZWN0aXZlIHsgfVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t1eEl0ZW1EaXNwbGF5UGFuZWxGb290ZXJdJ1xufSlcbmV4cG9ydCBjbGFzcyBJdGVtRGlzcGxheVBhbmVsRm9vdGVyRGlyZWN0aXZlIHsgfVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LWl0ZW0tZGlzcGxheS1wYW5lbCcsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwidXgtc2lkZS1wYW5lbC1ob3N0IHV4LWl0ZW0tZGlzcGxheS1wYW5lbFwiXG4gICAgW2NsYXNzLmJveC1zaGFkb3ddPVwiYm94U2hhZG93XCJcbiAgICBbc3R5bGUucG9zaXRpb25dPVwicG9zaXRpb25cIlxuICAgIFtzdHlsZS53aWR0aF09XCJob3N0V2lkdGhcIlxuICAgIFtzdHlsZS50b3BdPVwiY3NzVG9wXCI+XG5cbiAgICA8ZGl2IGNsYXNzPVwidXgtc2lkZS1wYW5lbC1oZWFkZXJcIiBbY2xhc3MuaXRlbS1kaXNwbGF5LXBhbmVsLXNoYWRvd109XCJzaGFkb3dcIj5cbiAgICAgICAgPGgzPnt7IGhlYWRlciB9fTwvaDM+XG4gICAgICAgIDxidXR0b24gKm5nSWY9XCJjbG9zZVZpc2libGVcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWxnIGJ0bi1saW5rIGJ0bi1pY29uIGJ1dHRvbi1zZWNvbmRhcnlcIiAoY2xpY2spPVwidmlzaWJsZSA9IGZhbHNlXCI+XG4gICAgICAgICAgICA8aSBjbGFzcz1cImhwZS1pY29uIGhwZS1jbG9zZVwiPjwvaT5cbiAgICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwidXgtc2lkZS1wYW5lbC1jb250ZW50XCI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIlt1eEl0ZW1EaXNwbGF5UGFuZWxDb250ZW50XVwiPjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJ1eC1zaWRlLXBhbmVsLWZvb3RlclwiICpuZ0lmPVwiZm9vdGVyXCI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIlt1eEl0ZW1EaXNwbGF5UGFuZWxGb290ZXJdXCI+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuXG48L2Rpdj5cbmAsXG4gICAgcHJvdmlkZXJzOiBbU2lkZVBhbmVsU2VydmljZV0sXG4gICAgaG9zdDoge1xuICAgICAgICAnY2xhc3MnOiAndXgtc2lkZS1wYW5lbCB1eC1pdGVtLWRpc3BsYXktcGFuZWwnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBJdGVtRGlzcGxheVBhbmVsQ29tcG9uZW50IGV4dGVuZHMgU2lkZVBhbmVsQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIGhlYWRlcjogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgYm94U2hhZG93OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIGNsb3NlVmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBnZXQgcHJldmVudENsb3NlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRoaXMuY2xvc2VPbkV4dGVybmFsQ2xpY2s7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgcHJldmVudENsb3NlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuY2xvc2VPbkV4dGVybmFsQ2xpY2sgPSAhdmFsdWU7XG4gICAgfVxuXG4gICAgQElucHV0KCkgc2hhZG93OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBAQ29udGVudENoaWxkKEl0ZW1EaXNwbGF5UGFuZWxGb290ZXJEaXJlY3RpdmUpIGZvb3RlcjogSXRlbURpc3BsYXlQYW5lbEZvb3RlckRpcmVjdGl2ZTtcblxuICAgIEBPdXRwdXQoKSB2aXNpYmxlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICAvKipcbiAgICAgKiBAZGVwcmVjYXRlZFxuICAgICAqIFRpdGxlIHVzZWQgZm9yIGFkZGluZyB0b29sdGlwcyBhbmQgc2hvdWxkbid0IGJlIHVzZWQgYXMgYW4gaW5wdXRcbiAgICAgKiBpbnN0ZWFkIGhlYWRlciB3aWxsIGJlIHVzZWQuIFRoaXMgaXMgaGVyZSB0byBzdXBwb3J0IGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgb25seVxuICAgICAqIHRoaXMgcHJvcGVydHkgc2hvdWxkIG5vdCBiZSB1c2VkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2V0IHRpdGxlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgdGl0bGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhlYWRlcjtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCB2aXNpYmxlKHZpc2libGU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5vcGVuID0gdmlzaWJsZTtcbiAgICB9XG5cbiAgICBnZXQgdmlzaWJsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3BlbjtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pdGVtRGlzcGxheVBhbmVsU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcihzZXJ2aWNlOiBTaWRlUGFuZWxTZXJ2aWNlLCBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHN1cGVyKHNlcnZpY2UsIGVsZW1lbnRSZWYpO1xuXG4gICAgICAgIHRoaXMuYW5pbWF0ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNsb3NlT25FeHRlcm5hbENsaWNrID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5faXRlbURpc3BsYXlQYW5lbFN1YnNjcmlwdGlvbiA9IHRoaXMuc2VydmljZS5vcGVuJC5zdWJzY3JpYmUoKG5leHQpID0+IHtcbiAgICAgICAgICAgIHRoaXMudmlzaWJsZUNoYW5nZS5lbWl0KG5leHQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5faXRlbURpc3BsYXlQYW5lbFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbn0iXX0=