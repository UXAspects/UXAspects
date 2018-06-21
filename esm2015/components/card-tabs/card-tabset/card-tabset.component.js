/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';
import { CardTabsService } from '../card-tabs.service';
export class CardTabsetComponent {
    /**
     * @param {?} tabService
     */
    constructor(tabService) {
        this.tabService = tabService;
        this.offset = 0;
        this.bounds = { lower: 0, upper: 0 };
    }
    /**
     * @param {?} direction
     * @return {?}
     */
    set position(direction) {
        this.tabService.setPosition(direction);
    }
    /**
     * @return {?}
     */
    get position() {
        return this.tabService.position$.getValue();
    }
    /**
     * @param {?} tab
     * @param {?} element
     * @return {?}
     */
    select(tab, element) {
        // select the tab
        this.tabService.select(tab);
        // ensure the tab is moved into view if required
        this.moveIntoView(element);
    }
    /**
     * @param {?} dimensions
     * @return {?}
     */
    resize(dimensions) {
        this._width = dimensions.width;
        this._innerWidth = this.tablist.nativeElement.scrollWidth;
        this.bounds.lower = 0;
        this.bounds.upper = -(this._innerWidth - this._width);
    }
    /**
     * @return {?}
     */
    previous() {
        this.offset += this._width;
        // ensure it remains within the allowed bounds
        this.offset = Math.min(this.offset, this.bounds.lower);
    }
    /**
     * @return {?}
     */
    next() {
        this.offset -= this._width;
        // ensure it remains within the allowed bounds
        this.offset = Math.max(this.offset, this.bounds.upper);
    }
    /**
     * @param {?} element
     * @return {?}
     */
    moveIntoView(element) {
        // if we dont have the dimensions we cant check
        if (!this._width || !this._innerWidth) {
            return;
        }
        // get the current element bounds
        const { offsetLeft, offsetWidth } = element;
        const { marginLeft, marginRight } = getComputedStyle(element);
        // calculate the visible area
        const /** @type {?} */ viewportStart = Math.abs(this.offset);
        const /** @type {?} */ viewportEnd = viewportStart + this._width;
        const /** @type {?} */ cardWidth = parseFloat(marginLeft) + offsetWidth + parseFloat(marginRight);
        // if we need to move to the left - figure out how much
        if (offsetLeft < viewportStart) {
            this.offset -= (offsetLeft - parseFloat(marginLeft)) - viewportStart;
        }
        // if we need to move to the right - figure out how much
        if ((offsetLeft + cardWidth) > viewportEnd) {
            this.offset -= (offsetLeft + cardWidth) - viewportEnd;
        }
    }
}
CardTabsetComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-card-tabset',
                template: `<div class="card-tab-content" role="tabpanel" *ngIf="(tabService.tab$ | async)">
    <ng-content></ng-content>
</div>

<div class="card-tabs" #tabs>

    <button class="card-tabs-paging-btn card-tabs-paging-btn-previous" aria-label="Previous Tabs" (click)="previous()" *ngIf="offset < bounds.lower">
        <i class="hpe-icon hpe-previous"></i>
    </button>

    <div class="card-tabs-list" role="tablist" #tablist (uxResize)="resize($event)" [style.transform]="'translateX(' + offset + 'px)'">

        <div class="card-tab"
            role="tab"
            tabindex="0" #card
            *ngFor="let tab of tabService.tabs$ | async"
            [ngClass]="tabService.position$ | async"
            [class.active]="tab.active$ | async"
            [attr.aria-selected]="tab.active$ | async"
            (click)="select(tab, card)"
            (focus)="tabs.scrollLeft = 0"
            (keydown.enter)="select(tab, card)">

            <ng-container [ngTemplateOutlet]="tab.content"></ng-container>
        </div>

    </div>

    <button class="card-tabs-paging-btn card-tabs-paging-btn-next" aria-label="Next Tabs" (click)="next()" *ngIf="offset > bounds.upper">
        <i class="hpe-icon hpe-next"></i>
    </button>
</div>`,
                providers: [CardTabsService]
            },] },
];
/** @nocollapse */
CardTabsetComponent.ctorParameters = () => [
    { type: CardTabsService, },
];
CardTabsetComponent.propDecorators = {
    "position": [{ type: HostBinding, args: ['class',] }, { type: Input },],
    "tablist": [{ type: ViewChild, args: ['tablist',] },],
};
function CardTabsetComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CardTabsetComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CardTabsetComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    CardTabsetComponent.propDecorators;
    /** @type {?} */
    CardTabsetComponent.prototype.tablist;
    /** @type {?} */
    CardTabsetComponent.prototype.offset;
    /** @type {?} */
    CardTabsetComponent.prototype.bounds;
    /** @type {?} */
    CardTabsetComponent.prototype._width;
    /** @type {?} */
    CardTabsetComponent.prototype._innerWidth;
    /** @type {?} */
    CardTabsetComponent.prototype.tabService;
}
/**
 * @record
 */
export function CardTabsBounds() { }
function CardTabsBounds_tsickle_Closure_declarations() {
    /** @type {?} */
    CardTabsBounds.prototype.lower;
    /** @type {?} */
    CardTabsBounds.prototype.upper;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC10YWJzZXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY2FyZC10YWJzL2NhcmQtdGFic2V0L2NhcmQtdGFic2V0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHckYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBc0N2RCxNQUFNOzs7O0lBbUJKLFlBQW1CLFVBQTJCO1FBQTNCLGVBQVUsR0FBVixVQUFVLENBQWlCO3NCQU43QixDQUFDO3NCQUNPLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFO0tBS0c7Ozs7O1FBaEJyQyxRQUFRLENBQUMsU0FBaUI7UUFDckMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7Ozs7O0lBR3pDLElBQUksUUFBUTtRQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUM3Qzs7Ozs7O0lBWUQsTUFBTSxDQUFDLEdBQXFCLEVBQUUsT0FBb0I7O1FBRWhELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztRQUc1QixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzVCOzs7OztJQUVELE1BQU0sQ0FBQyxVQUE0QjtRQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7UUFFMUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUN2RDs7OztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUM7O1FBRzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDeEQ7Ozs7SUFFRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDOztRQUczQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3hEOzs7OztJQUVPLFlBQVksQ0FBQyxPQUFvQjs7UUFHdkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDdEMsTUFBTSxDQUFDO1NBQ1I7O1FBR0QsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFDNUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7UUFHOUQsdUJBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVDLHVCQUFNLFdBQVcsR0FBRyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNoRCx1QkFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFdBQVcsR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7O1FBR2pGLEVBQUUsQ0FBQyxDQUFDLFVBQVUsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDO1NBQ3RFOztRQUdELEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUMsR0FBRyxXQUFXLENBQUM7U0FDdkQ7Ozs7WUEvR0osU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQStCTDtnQkFDTCxTQUFTLEVBQUUsQ0FBQyxlQUFlLENBQUM7YUFDN0I7Ozs7WUFyQ1EsZUFBZTs7O3lCQXdDckIsV0FBVyxTQUFDLE9BQU8sY0FDbkIsS0FBSzt3QkFRTCxTQUFTLFNBQUMsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIElucHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlc2l6ZURpbWVuc2lvbnMgfSBmcm9tICcuLi8uLi8uLi9kaXJlY3RpdmVzL3Jlc2l6ZSc7XG5pbXBvcnQgeyBDYXJkVGFiQ29tcG9uZW50IH0gZnJvbSAnLi4vY2FyZC10YWIvY2FyZC10YWIuY29tcG9uZW50JztcbmltcG9ydCB7IENhcmRUYWJzU2VydmljZSB9IGZyb20gJy4uL2NhcmQtdGFicy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndXgtY2FyZC10YWJzZXQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJjYXJkLXRhYi1jb250ZW50XCIgcm9sZT1cInRhYnBhbmVsXCIgKm5nSWY9XCIodGFiU2VydmljZS50YWIkIHwgYXN5bmMpXCI+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPC9kaXY+XG5cbjxkaXYgY2xhc3M9XCJjYXJkLXRhYnNcIiAjdGFicz5cblxuICAgIDxidXR0b24gY2xhc3M9XCJjYXJkLXRhYnMtcGFnaW5nLWJ0biBjYXJkLXRhYnMtcGFnaW5nLWJ0bi1wcmV2aW91c1wiIGFyaWEtbGFiZWw9XCJQcmV2aW91cyBUYWJzXCIgKGNsaWNrKT1cInByZXZpb3VzKClcIiAqbmdJZj1cIm9mZnNldCA8IGJvdW5kcy5sb3dlclwiPlxuICAgICAgICA8aSBjbGFzcz1cImhwZS1pY29uIGhwZS1wcmV2aW91c1wiPjwvaT5cbiAgICA8L2J1dHRvbj5cblxuICAgIDxkaXYgY2xhc3M9XCJjYXJkLXRhYnMtbGlzdFwiIHJvbGU9XCJ0YWJsaXN0XCIgI3RhYmxpc3QgKHV4UmVzaXplKT1cInJlc2l6ZSgkZXZlbnQpXCIgW3N0eWxlLnRyYW5zZm9ybV09XCIndHJhbnNsYXRlWCgnICsgb2Zmc2V0ICsgJ3B4KSdcIj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC10YWJcIlxuICAgICAgICAgICAgcm9sZT1cInRhYlwiXG4gICAgICAgICAgICB0YWJpbmRleD1cIjBcIiAjY2FyZFxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IHRhYiBvZiB0YWJTZXJ2aWNlLnRhYnMkIHwgYXN5bmNcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwidGFiU2VydmljZS5wb3NpdGlvbiQgfCBhc3luY1wiXG4gICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cInRhYi5hY3RpdmUkIHwgYXN5bmNcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJ0YWIuYWN0aXZlJCB8IGFzeW5jXCJcbiAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3QodGFiLCBjYXJkKVwiXG4gICAgICAgICAgICAoZm9jdXMpPVwidGFicy5zY3JvbGxMZWZ0ID0gMFwiXG4gICAgICAgICAgICAoa2V5ZG93bi5lbnRlcik9XCJzZWxlY3QodGFiLCBjYXJkKVwiPlxuXG4gICAgICAgICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRhYi5jb250ZW50XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgPC9kaXY+XG5cbiAgICA8YnV0dG9uIGNsYXNzPVwiY2FyZC10YWJzLXBhZ2luZy1idG4gY2FyZC10YWJzLXBhZ2luZy1idG4tbmV4dFwiIGFyaWEtbGFiZWw9XCJOZXh0IFRhYnNcIiAoY2xpY2spPVwibmV4dCgpXCIgKm5nSWY9XCJvZmZzZXQgPiBib3VuZHMudXBwZXJcIj5cbiAgICAgICAgPGkgY2xhc3M9XCJocGUtaWNvbiBocGUtbmV4dFwiPjwvaT5cbiAgICA8L2J1dHRvbj5cbjwvZGl2PmAsXG4gIHByb3ZpZGVyczogW0NhcmRUYWJzU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgQ2FyZFRhYnNldENvbXBvbmVudCB7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIEBJbnB1dCgpIHNldCBwb3NpdGlvbihkaXJlY3Rpb246IHN0cmluZykge1xuICAgIHRoaXMudGFiU2VydmljZS5zZXRQb3NpdGlvbihkaXJlY3Rpb24pO1xuICB9XG5cbiAgZ2V0IHBvc2l0aW9uKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMudGFiU2VydmljZS5wb3NpdGlvbiQuZ2V0VmFsdWUoKTtcbiAgfVxuXG4gIEBWaWV3Q2hpbGQoJ3RhYmxpc3QnKSB0YWJsaXN0OiBFbGVtZW50UmVmO1xuXG4gIG9mZnNldDogbnVtYmVyID0gMDtcbiAgYm91bmRzOiBDYXJkVGFic0JvdW5kcyA9IHsgbG93ZXI6IDAsIHVwcGVyOiAwIH07XG5cbiAgcHJpdmF0ZSBfd2lkdGg6IG51bWJlcjtcbiAgcHJpdmF0ZSBfaW5uZXJXaWR0aDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0YWJTZXJ2aWNlOiBDYXJkVGFic1NlcnZpY2UpIHt9XG5cbiAgc2VsZWN0KHRhYjogQ2FyZFRhYkNvbXBvbmVudCwgZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAvLyBzZWxlY3QgdGhlIHRhYlxuICAgIHRoaXMudGFiU2VydmljZS5zZWxlY3QodGFiKTtcblxuICAgIC8vIGVuc3VyZSB0aGUgdGFiIGlzIG1vdmVkIGludG8gdmlldyBpZiByZXF1aXJlZFxuICAgIHRoaXMubW92ZUludG9WaWV3KGVsZW1lbnQpO1xuICB9XG5cbiAgcmVzaXplKGRpbWVuc2lvbnM6IFJlc2l6ZURpbWVuc2lvbnMpOiB2b2lkIHtcbiAgICB0aGlzLl93aWR0aCA9IGRpbWVuc2lvbnMud2lkdGg7XG4gICAgdGhpcy5faW5uZXJXaWR0aCA9IHRoaXMudGFibGlzdC5uYXRpdmVFbGVtZW50LnNjcm9sbFdpZHRoO1xuXG4gICAgdGhpcy5ib3VuZHMubG93ZXIgPSAwO1xuICAgIHRoaXMuYm91bmRzLnVwcGVyID0gLSh0aGlzLl9pbm5lcldpZHRoIC0gdGhpcy5fd2lkdGgpO1xuICB9XG5cbiAgcHJldmlvdXMoKTogdm9pZCB7XG4gICAgdGhpcy5vZmZzZXQgKz0gdGhpcy5fd2lkdGg7XG5cbiAgICAvLyBlbnN1cmUgaXQgcmVtYWlucyB3aXRoaW4gdGhlIGFsbG93ZWQgYm91bmRzXG4gICAgdGhpcy5vZmZzZXQgPSBNYXRoLm1pbih0aGlzLm9mZnNldCwgdGhpcy5ib3VuZHMubG93ZXIpO1xuICB9XG5cbiAgbmV4dCgpOiB2b2lkIHtcbiAgICB0aGlzLm9mZnNldCAtPSB0aGlzLl93aWR0aDtcblxuICAgIC8vIGVuc3VyZSBpdCByZW1haW5zIHdpdGhpbiB0aGUgYWxsb3dlZCBib3VuZHNcbiAgICB0aGlzLm9mZnNldCA9IE1hdGgubWF4KHRoaXMub2Zmc2V0LCB0aGlzLmJvdW5kcy51cHBlcik7XG4gIH1cblxuICBwcml2YXRlIG1vdmVJbnRvVmlldyhlbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuXG4gICAgLy8gaWYgd2UgZG9udCBoYXZlIHRoZSBkaW1lbnNpb25zIHdlIGNhbnQgY2hlY2tcbiAgICBpZiAoIXRoaXMuX3dpZHRoIHx8ICF0aGlzLl9pbm5lcldpZHRoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gZ2V0IHRoZSBjdXJyZW50IGVsZW1lbnQgYm91bmRzXG4gICAgY29uc3QgeyBvZmZzZXRMZWZ0LCBvZmZzZXRXaWR0aCB9ID0gZWxlbWVudDtcbiAgICBjb25zdCB7IG1hcmdpbkxlZnQsIG1hcmdpblJpZ2h0IH0gPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuXG4gICAgLy8gY2FsY3VsYXRlIHRoZSB2aXNpYmxlIGFyZWFcbiAgICBjb25zdCB2aWV3cG9ydFN0YXJ0ID0gTWF0aC5hYnModGhpcy5vZmZzZXQpO1xuICAgIGNvbnN0IHZpZXdwb3J0RW5kID0gdmlld3BvcnRTdGFydCArIHRoaXMuX3dpZHRoO1xuICAgIGNvbnN0IGNhcmRXaWR0aCA9IHBhcnNlRmxvYXQobWFyZ2luTGVmdCkgKyBvZmZzZXRXaWR0aCArIHBhcnNlRmxvYXQobWFyZ2luUmlnaHQpO1xuXG4gICAgLy8gaWYgd2UgbmVlZCB0byBtb3ZlIHRvIHRoZSBsZWZ0IC0gZmlndXJlIG91dCBob3cgbXVjaFxuICAgIGlmIChvZmZzZXRMZWZ0IDwgdmlld3BvcnRTdGFydCkge1xuICAgICAgdGhpcy5vZmZzZXQgLT0gKG9mZnNldExlZnQgLSBwYXJzZUZsb2F0KG1hcmdpbkxlZnQpKSAtIHZpZXdwb3J0U3RhcnQ7XG4gICAgfVxuICAgIFxuICAgIC8vIGlmIHdlIG5lZWQgdG8gbW92ZSB0byB0aGUgcmlnaHQgLSBmaWd1cmUgb3V0IGhvdyBtdWNoXG4gICAgaWYgKChvZmZzZXRMZWZ0ICsgY2FyZFdpZHRoKSA+IHZpZXdwb3J0RW5kKSB7XG4gICAgICB0aGlzLm9mZnNldCAtPSAob2Zmc2V0TGVmdCArIGNhcmRXaWR0aCkgLSB2aWV3cG9ydEVuZDtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBDYXJkVGFic0JvdW5kcyB7XG4gIGxvd2VyOiBudW1iZXI7XG4gIHVwcGVyOiBudW1iZXI7XG59XG4iXX0=