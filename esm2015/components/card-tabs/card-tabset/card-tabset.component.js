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
                template: "<div class=\"card-tab-content\" role=\"tabpanel\" *ngIf=\"(tabService.tab$ | async)\">\r\n    <ng-content></ng-content>\r\n</div>\r\n\r\n<div class=\"card-tabs\" #tabs>\r\n\r\n    <button class=\"card-tabs-paging-btn card-tabs-paging-btn-previous\" aria-label=\"Previous Tabs\" (click)=\"previous()\" *ngIf=\"offset < bounds.lower\">\r\n        <i class=\"hpe-icon hpe-previous\"></i>\r\n    </button>\r\n\r\n    <div class=\"card-tabs-list\" role=\"tablist\" #tablist (uxResize)=\"resize($event)\" [style.transform]=\"'translateX(' + offset + 'px)'\">\r\n\r\n        <div class=\"card-tab\"\r\n            role=\"tab\"\r\n            tabindex=\"0\" #card\r\n            *ngFor=\"let tab of tabService.tabs$ | async\"\r\n            [ngClass]=\"tabService.position$ | async\"\r\n            [class.active]=\"tab.active$ | async\"\r\n            [attr.aria-selected]=\"tab.active$ | async\"\r\n            (click)=\"select(tab, card)\"\r\n            (focus)=\"tabs.scrollLeft = 0\"\r\n            (keydown.enter)=\"select(tab, card)\">\r\n\r\n            <ng-container [ngTemplateOutlet]=\"tab.content\"></ng-container>\r\n        </div>\r\n\r\n    </div>\r\n\r\n    <button class=\"card-tabs-paging-btn card-tabs-paging-btn-next\" aria-label=\"Next Tabs\" (click)=\"next()\" *ngIf=\"offset > bounds.upper\">\r\n        <i class=\"hpe-icon hpe-next\"></i>\r\n    </button>\r\n</div>",
                providers: [CardTabsService]
            }] }
];
/** @nocollapse */
CardTabsetComponent.ctorParameters = () => [
    { type: CardTabsService }
];
CardTabsetComponent.propDecorators = {
    position: [{ type: HostBinding, args: ['class',] }, { type: Input }],
    tablist: [{ type: ViewChild, args: ['tablist',] }]
};
function CardTabsetComponent_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC10YWJzZXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY2FyZC10YWJzL2NhcmQtdGFic2V0L2NhcmQtdGFic2V0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHckYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBT3ZELE1BQU07Ozs7SUFtQkosWUFBbUIsVUFBMkI7UUFBM0IsZUFBVSxHQUFWLFVBQVUsQ0FBaUI7c0JBTjdCLENBQUM7c0JBQ08sRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUU7S0FLRzs7Ozs7SUFqQmxELElBQ2EsUUFBUSxDQUFDLFNBQWlCO1FBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ3hDOzs7O0lBRUQsSUFBSSxRQUFRO1FBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQzdDOzs7Ozs7SUFZRCxNQUFNLENBQUMsR0FBcUIsRUFBRSxPQUFvQjs7UUFFaEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7O1FBRzVCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDNUI7Ozs7O0lBRUQsTUFBTSxDQUFDLFVBQTRCO1FBQ2pDLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztRQUUxRCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3ZEOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQzs7UUFHM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN4RDs7OztJQUVELElBQUk7UUFDRixJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUM7O1FBRzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDeEQ7Ozs7O0lBRU8sWUFBWSxDQUFDLE9BQW9COztRQUd2QyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUN0QyxNQUFNLENBQUM7U0FDUjs7UUFHRCxNQUFNLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxHQUFHLE9BQU8sQ0FBQztRQUM1QyxNQUFNLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxHQUFHLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDOztRQUc5RCx1QkFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUMsdUJBQU0sV0FBVyxHQUFHLGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ2hELHVCQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsV0FBVyxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQzs7UUFHakYsRUFBRSxDQUFDLENBQUMsVUFBVSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUM7U0FDdEU7O1FBR0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxHQUFHLFdBQVcsQ0FBQztTQUN2RDs7OztZQWhGSixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsazNDQUEyQztnQkFDM0MsU0FBUyxFQUFFLENBQUMsZUFBZSxDQUFDO2FBQzdCOzs7O1lBTlEsZUFBZTs7O3VCQVNyQixXQUFXLFNBQUMsT0FBTyxjQUNuQixLQUFLO3NCQVFMLFNBQVMsU0FBQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSW5wdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVzaXplRGltZW5zaW9ucyB9IGZyb20gJy4uLy4uLy4uL2RpcmVjdGl2ZXMvcmVzaXplJztcbmltcG9ydCB7IENhcmRUYWJDb21wb25lbnQgfSBmcm9tICcuLi9jYXJkLXRhYi9jYXJkLXRhYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FyZFRhYnNTZXJ2aWNlIH0gZnJvbSAnLi4vY2FyZC10YWJzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd1eC1jYXJkLXRhYnNldCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYXJkLXRhYnNldC5jb21wb25lbnQuaHRtbCcsXG4gIHByb3ZpZGVyczogW0NhcmRUYWJzU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgQ2FyZFRhYnNldENvbXBvbmVudCB7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIEBJbnB1dCgpIHNldCBwb3NpdGlvbihkaXJlY3Rpb246IHN0cmluZykge1xuICAgIHRoaXMudGFiU2VydmljZS5zZXRQb3NpdGlvbihkaXJlY3Rpb24pO1xuICB9XG5cbiAgZ2V0IHBvc2l0aW9uKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMudGFiU2VydmljZS5wb3NpdGlvbiQuZ2V0VmFsdWUoKTtcbiAgfVxuXG4gIEBWaWV3Q2hpbGQoJ3RhYmxpc3QnKSB0YWJsaXN0OiBFbGVtZW50UmVmO1xuXG4gIG9mZnNldDogbnVtYmVyID0gMDtcbiAgYm91bmRzOiBDYXJkVGFic0JvdW5kcyA9IHsgbG93ZXI6IDAsIHVwcGVyOiAwIH07XG5cbiAgcHJpdmF0ZSBfd2lkdGg6IG51bWJlcjtcbiAgcHJpdmF0ZSBfaW5uZXJXaWR0aDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0YWJTZXJ2aWNlOiBDYXJkVGFic1NlcnZpY2UpIHt9XG5cbiAgc2VsZWN0KHRhYjogQ2FyZFRhYkNvbXBvbmVudCwgZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAvLyBzZWxlY3QgdGhlIHRhYlxuICAgIHRoaXMudGFiU2VydmljZS5zZWxlY3QodGFiKTtcblxuICAgIC8vIGVuc3VyZSB0aGUgdGFiIGlzIG1vdmVkIGludG8gdmlldyBpZiByZXF1aXJlZFxuICAgIHRoaXMubW92ZUludG9WaWV3KGVsZW1lbnQpO1xuICB9XG5cbiAgcmVzaXplKGRpbWVuc2lvbnM6IFJlc2l6ZURpbWVuc2lvbnMpOiB2b2lkIHtcbiAgICB0aGlzLl93aWR0aCA9IGRpbWVuc2lvbnMud2lkdGg7XG4gICAgdGhpcy5faW5uZXJXaWR0aCA9IHRoaXMudGFibGlzdC5uYXRpdmVFbGVtZW50LnNjcm9sbFdpZHRoO1xuXG4gICAgdGhpcy5ib3VuZHMubG93ZXIgPSAwO1xuICAgIHRoaXMuYm91bmRzLnVwcGVyID0gLSh0aGlzLl9pbm5lcldpZHRoIC0gdGhpcy5fd2lkdGgpO1xuICB9XG5cbiAgcHJldmlvdXMoKTogdm9pZCB7XG4gICAgdGhpcy5vZmZzZXQgKz0gdGhpcy5fd2lkdGg7XG5cbiAgICAvLyBlbnN1cmUgaXQgcmVtYWlucyB3aXRoaW4gdGhlIGFsbG93ZWQgYm91bmRzXG4gICAgdGhpcy5vZmZzZXQgPSBNYXRoLm1pbih0aGlzLm9mZnNldCwgdGhpcy5ib3VuZHMubG93ZXIpO1xuICB9XG5cbiAgbmV4dCgpOiB2b2lkIHtcbiAgICB0aGlzLm9mZnNldCAtPSB0aGlzLl93aWR0aDtcblxuICAgIC8vIGVuc3VyZSBpdCByZW1haW5zIHdpdGhpbiB0aGUgYWxsb3dlZCBib3VuZHNcbiAgICB0aGlzLm9mZnNldCA9IE1hdGgubWF4KHRoaXMub2Zmc2V0LCB0aGlzLmJvdW5kcy51cHBlcik7XG4gIH1cblxuICBwcml2YXRlIG1vdmVJbnRvVmlldyhlbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuXG4gICAgLy8gaWYgd2UgZG9udCBoYXZlIHRoZSBkaW1lbnNpb25zIHdlIGNhbnQgY2hlY2tcbiAgICBpZiAoIXRoaXMuX3dpZHRoIHx8ICF0aGlzLl9pbm5lcldpZHRoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gZ2V0IHRoZSBjdXJyZW50IGVsZW1lbnQgYm91bmRzXG4gICAgY29uc3QgeyBvZmZzZXRMZWZ0LCBvZmZzZXRXaWR0aCB9ID0gZWxlbWVudDtcbiAgICBjb25zdCB7IG1hcmdpbkxlZnQsIG1hcmdpblJpZ2h0IH0gPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuXG4gICAgLy8gY2FsY3VsYXRlIHRoZSB2aXNpYmxlIGFyZWFcbiAgICBjb25zdCB2aWV3cG9ydFN0YXJ0ID0gTWF0aC5hYnModGhpcy5vZmZzZXQpO1xuICAgIGNvbnN0IHZpZXdwb3J0RW5kID0gdmlld3BvcnRTdGFydCArIHRoaXMuX3dpZHRoO1xuICAgIGNvbnN0IGNhcmRXaWR0aCA9IHBhcnNlRmxvYXQobWFyZ2luTGVmdCkgKyBvZmZzZXRXaWR0aCArIHBhcnNlRmxvYXQobWFyZ2luUmlnaHQpO1xuXG4gICAgLy8gaWYgd2UgbmVlZCB0byBtb3ZlIHRvIHRoZSBsZWZ0IC0gZmlndXJlIG91dCBob3cgbXVjaFxuICAgIGlmIChvZmZzZXRMZWZ0IDwgdmlld3BvcnRTdGFydCkge1xuICAgICAgdGhpcy5vZmZzZXQgLT0gKG9mZnNldExlZnQgLSBwYXJzZUZsb2F0KG1hcmdpbkxlZnQpKSAtIHZpZXdwb3J0U3RhcnQ7XG4gICAgfVxuICAgIFxuICAgIC8vIGlmIHdlIG5lZWQgdG8gbW92ZSB0byB0aGUgcmlnaHQgLSBmaWd1cmUgb3V0IGhvdyBtdWNoXG4gICAgaWYgKChvZmZzZXRMZWZ0ICsgY2FyZFdpZHRoKSA+IHZpZXdwb3J0RW5kKSB7XG4gICAgICB0aGlzLm9mZnNldCAtPSAob2Zmc2V0TGVmdCArIGNhcmRXaWR0aCkgLSB2aWV3cG9ydEVuZDtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBDYXJkVGFic0JvdW5kcyB7XG4gIGxvd2VyOiBudW1iZXI7XG4gIHVwcGVyOiBudW1iZXI7XG59XG4iXX0=