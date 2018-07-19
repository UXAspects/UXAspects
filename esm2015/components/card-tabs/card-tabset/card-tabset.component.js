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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC10YWJzZXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY2FyZC10YWJzL2NhcmQtdGFic2V0L2NhcmQtdGFic2V0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHckYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBc0N2RCxNQUFNOzs7O0lBbUJKLFlBQW1CLFVBQTJCO1FBQTNCLGVBQVUsR0FBVixVQUFVLENBQWlCO3NCQU43QixDQUFDO3NCQUNPLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFO0tBS0c7Ozs7O1FBaEJyQyxRQUFRLENBQUMsU0FBaUI7UUFDckMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7Ozs7O0lBR3pDLElBQUksUUFBUTtRQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUM3Qzs7Ozs7O0lBWUQsTUFBTSxDQUFDLEdBQXFCLEVBQUUsT0FBb0I7O1FBRWhELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztRQUc1QixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzVCOzs7OztJQUVELE1BQU0sQ0FBQyxVQUE0QjtRQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7UUFFMUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUN2RDs7OztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUM7O1FBRzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDeEQ7Ozs7SUFFRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDOztRQUczQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3hEOzs7OztJQUVPLFlBQVksQ0FBQyxPQUFvQjs7UUFHdkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDdEMsTUFBTSxDQUFDO1NBQ1I7O1FBR0QsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFDNUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7UUFHOUQsdUJBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVDLHVCQUFNLFdBQVcsR0FBRyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNoRCx1QkFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFdBQVcsR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7O1FBR2pGLEVBQUUsQ0FBQyxDQUFDLFVBQVUsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDO1NBQ3RFOztRQUdELEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUMsR0FBRyxXQUFXLENBQUM7U0FDdkQ7Ozs7WUEvR0osU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQStCTDtnQkFDTCxTQUFTLEVBQUUsQ0FBQyxlQUFlLENBQUM7YUFDN0I7Ozs7WUFyQ1EsZUFBZTs7O3lCQXdDckIsV0FBVyxTQUFDLE9BQU8sY0FDbkIsS0FBSzt3QkFRTCxTQUFTLFNBQUMsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIElucHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlc2l6ZURpbWVuc2lvbnMgfSBmcm9tICcuLi8uLi8uLi9kaXJlY3RpdmVzL3Jlc2l6ZSc7XG5pbXBvcnQgeyBDYXJkVGFiQ29tcG9uZW50IH0gZnJvbSAnLi4vY2FyZC10YWIvY2FyZC10YWIuY29tcG9uZW50JztcbmltcG9ydCB7IENhcmRUYWJzU2VydmljZSB9IGZyb20gJy4uL2NhcmQtdGFicy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndXgtY2FyZC10YWJzZXQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJjYXJkLXRhYi1jb250ZW50XCIgcm9sZT1cInRhYnBhbmVsXCIgKm5nSWY9XCIodGFiU2VydmljZS50YWIkIHwgYXN5bmMpXCI+XHJcbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbjwvZGl2PlxyXG5cclxuPGRpdiBjbGFzcz1cImNhcmQtdGFic1wiICN0YWJzPlxyXG5cclxuICAgIDxidXR0b24gY2xhc3M9XCJjYXJkLXRhYnMtcGFnaW5nLWJ0biBjYXJkLXRhYnMtcGFnaW5nLWJ0bi1wcmV2aW91c1wiIGFyaWEtbGFiZWw9XCJQcmV2aW91cyBUYWJzXCIgKGNsaWNrKT1cInByZXZpb3VzKClcIiAqbmdJZj1cIm9mZnNldCA8IGJvdW5kcy5sb3dlclwiPlxyXG4gICAgICAgIDxpIGNsYXNzPVwiaHBlLWljb24gaHBlLXByZXZpb3VzXCI+PC9pPlxyXG4gICAgPC9idXR0b24+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cImNhcmQtdGFicy1saXN0XCIgcm9sZT1cInRhYmxpc3RcIiAjdGFibGlzdCAodXhSZXNpemUpPVwicmVzaXplKCRldmVudClcIiBbc3R5bGUudHJhbnNmb3JtXT1cIid0cmFuc2xhdGVYKCcgKyBvZmZzZXQgKyAncHgpJ1wiPlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC10YWJcIlxyXG4gICAgICAgICAgICByb2xlPVwidGFiXCJcclxuICAgICAgICAgICAgdGFiaW5kZXg9XCIwXCIgI2NhcmRcclxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IHRhYiBvZiB0YWJTZXJ2aWNlLnRhYnMkIHwgYXN5bmNcIlxyXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ0YWJTZXJ2aWNlLnBvc2l0aW9uJCB8IGFzeW5jXCJcclxuICAgICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJ0YWIuYWN0aXZlJCB8IGFzeW5jXCJcclxuICAgICAgICAgICAgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJ0YWIuYWN0aXZlJCB8IGFzeW5jXCJcclxuICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdCh0YWIsIGNhcmQpXCJcclxuICAgICAgICAgICAgKGZvY3VzKT1cInRhYnMuc2Nyb2xsTGVmdCA9IDBcIlxyXG4gICAgICAgICAgICAoa2V5ZG93bi5lbnRlcik9XCJzZWxlY3QodGFiLCBjYXJkKVwiPlxyXG5cclxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJ0YWIuY29udGVudFwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxidXR0b24gY2xhc3M9XCJjYXJkLXRhYnMtcGFnaW5nLWJ0biBjYXJkLXRhYnMtcGFnaW5nLWJ0bi1uZXh0XCIgYXJpYS1sYWJlbD1cIk5leHQgVGFic1wiIChjbGljayk9XCJuZXh0KClcIiAqbmdJZj1cIm9mZnNldCA+IGJvdW5kcy51cHBlclwiPlxyXG4gICAgICAgIDxpIGNsYXNzPVwiaHBlLWljb24gaHBlLW5leHRcIj48L2k+XHJcbiAgICA8L2J1dHRvbj5cclxuPC9kaXY+YCxcbiAgcHJvdmlkZXJzOiBbQ2FyZFRhYnNTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBDYXJkVGFic2V0Q29tcG9uZW50IHtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgQElucHV0KCkgc2V0IHBvc2l0aW9uKGRpcmVjdGlvbjogc3RyaW5nKSB7XG4gICAgdGhpcy50YWJTZXJ2aWNlLnNldFBvc2l0aW9uKGRpcmVjdGlvbik7XG4gIH1cblxuICBnZXQgcG9zaXRpb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy50YWJTZXJ2aWNlLnBvc2l0aW9uJC5nZXRWYWx1ZSgpO1xuICB9XG5cbiAgQFZpZXdDaGlsZCgndGFibGlzdCcpIHRhYmxpc3Q6IEVsZW1lbnRSZWY7XG5cbiAgb2Zmc2V0OiBudW1iZXIgPSAwO1xuICBib3VuZHM6IENhcmRUYWJzQm91bmRzID0geyBsb3dlcjogMCwgdXBwZXI6IDAgfTtcblxuICBwcml2YXRlIF93aWR0aDogbnVtYmVyO1xuICBwcml2YXRlIF9pbm5lcldpZHRoOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHRhYlNlcnZpY2U6IENhcmRUYWJzU2VydmljZSkge31cblxuICBzZWxlY3QodGFiOiBDYXJkVGFiQ29tcG9uZW50LCBlbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIC8vIHNlbGVjdCB0aGUgdGFiXG4gICAgdGhpcy50YWJTZXJ2aWNlLnNlbGVjdCh0YWIpO1xuXG4gICAgLy8gZW5zdXJlIHRoZSB0YWIgaXMgbW92ZWQgaW50byB2aWV3IGlmIHJlcXVpcmVkXG4gICAgdGhpcy5tb3ZlSW50b1ZpZXcoZWxlbWVudCk7XG4gIH1cblxuICByZXNpemUoZGltZW5zaW9uczogUmVzaXplRGltZW5zaW9ucyk6IHZvaWQge1xuICAgIHRoaXMuX3dpZHRoID0gZGltZW5zaW9ucy53aWR0aDtcbiAgICB0aGlzLl9pbm5lcldpZHRoID0gdGhpcy50YWJsaXN0Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsV2lkdGg7XG5cbiAgICB0aGlzLmJvdW5kcy5sb3dlciA9IDA7XG4gICAgdGhpcy5ib3VuZHMudXBwZXIgPSAtKHRoaXMuX2lubmVyV2lkdGggLSB0aGlzLl93aWR0aCk7XG4gIH1cblxuICBwcmV2aW91cygpOiB2b2lkIHtcbiAgICB0aGlzLm9mZnNldCArPSB0aGlzLl93aWR0aDtcblxuICAgIC8vIGVuc3VyZSBpdCByZW1haW5zIHdpdGhpbiB0aGUgYWxsb3dlZCBib3VuZHNcbiAgICB0aGlzLm9mZnNldCA9IE1hdGgubWluKHRoaXMub2Zmc2V0LCB0aGlzLmJvdW5kcy5sb3dlcik7XG4gIH1cblxuICBuZXh0KCk6IHZvaWQge1xuICAgIHRoaXMub2Zmc2V0IC09IHRoaXMuX3dpZHRoO1xuXG4gICAgLy8gZW5zdXJlIGl0IHJlbWFpbnMgd2l0aGluIHRoZSBhbGxvd2VkIGJvdW5kc1xuICAgIHRoaXMub2Zmc2V0ID0gTWF0aC5tYXgodGhpcy5vZmZzZXQsIHRoaXMuYm91bmRzLnVwcGVyKTtcbiAgfVxuXG4gIHByaXZhdGUgbW92ZUludG9WaWV3KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG5cbiAgICAvLyBpZiB3ZSBkb250IGhhdmUgdGhlIGRpbWVuc2lvbnMgd2UgY2FudCBjaGVja1xuICAgIGlmICghdGhpcy5fd2lkdGggfHwgIXRoaXMuX2lubmVyV2lkdGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBnZXQgdGhlIGN1cnJlbnQgZWxlbWVudCBib3VuZHNcbiAgICBjb25zdCB7IG9mZnNldExlZnQsIG9mZnNldFdpZHRoIH0gPSBlbGVtZW50O1xuICAgIGNvbnN0IHsgbWFyZ2luTGVmdCwgbWFyZ2luUmlnaHQgfSA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XG5cbiAgICAvLyBjYWxjdWxhdGUgdGhlIHZpc2libGUgYXJlYVxuICAgIGNvbnN0IHZpZXdwb3J0U3RhcnQgPSBNYXRoLmFicyh0aGlzLm9mZnNldCk7XG4gICAgY29uc3Qgdmlld3BvcnRFbmQgPSB2aWV3cG9ydFN0YXJ0ICsgdGhpcy5fd2lkdGg7XG4gICAgY29uc3QgY2FyZFdpZHRoID0gcGFyc2VGbG9hdChtYXJnaW5MZWZ0KSArIG9mZnNldFdpZHRoICsgcGFyc2VGbG9hdChtYXJnaW5SaWdodCk7XG5cbiAgICAvLyBpZiB3ZSBuZWVkIHRvIG1vdmUgdG8gdGhlIGxlZnQgLSBmaWd1cmUgb3V0IGhvdyBtdWNoXG4gICAgaWYgKG9mZnNldExlZnQgPCB2aWV3cG9ydFN0YXJ0KSB7XG4gICAgICB0aGlzLm9mZnNldCAtPSAob2Zmc2V0TGVmdCAtIHBhcnNlRmxvYXQobWFyZ2luTGVmdCkpIC0gdmlld3BvcnRTdGFydDtcbiAgICB9XG4gICAgXG4gICAgLy8gaWYgd2UgbmVlZCB0byBtb3ZlIHRvIHRoZSByaWdodCAtIGZpZ3VyZSBvdXQgaG93IG11Y2hcbiAgICBpZiAoKG9mZnNldExlZnQgKyBjYXJkV2lkdGgpID4gdmlld3BvcnRFbmQpIHtcbiAgICAgIHRoaXMub2Zmc2V0IC09IChvZmZzZXRMZWZ0ICsgY2FyZFdpZHRoKSAtIHZpZXdwb3J0RW5kO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIENhcmRUYWJzQm91bmRzIHtcbiAgbG93ZXI6IG51bWJlcjtcbiAgdXBwZXI6IG51bWJlcjtcbn1cbiJdfQ==