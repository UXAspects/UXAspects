/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component, ContentChild, TemplateRef } from '@angular/core';
import { map } from 'rxjs/operators';
import { CardTabsService } from '../card-tabs.service';
import { CardTabContentDirective } from './card-tab-content.directive';
export class CardTabComponent {
    /**
     * @param {?} _tabService
     */
    constructor(_tabService) {
        this._tabService = _tabService;
        this.active$ = this._tabService.tab$.pipe(map(tab => tab === this));
        this._tabService.addTab(this);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._tabService.removeTab(this);
    }
}
CardTabComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-card-tab',
                template: "<ng-content *ngIf=\"active$ | async\"></ng-content>",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
CardTabComponent.ctorParameters = () => [
    { type: CardTabsService }
];
CardTabComponent.propDecorators = {
    content: [{ type: ContentChild, args: [CardTabContentDirective, { read: TemplateRef },] }]
};
function CardTabComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    CardTabComponent.prototype.active$;
    /** @type {?} */
    CardTabComponent.prototype.content;
    /** @type {?} */
    CardTabComponent.prototype._tabService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC10YWIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY2FyZC10YWJzL2NhcmQtdGFiL2NhcmQtdGFiLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQWEsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpHLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFPdkUsTUFBTTs7OztJQUtKLFlBQW9CLFdBQTRCO1FBQTVCLGdCQUFXLEdBQVgsV0FBVyxDQUFpQjt1QkFIakIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsQ0FBQztRQUlqRixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMvQjs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNsQzs7O1lBaEJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsK0RBQXdDO2dCQUN4QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7OztZQVBRLGVBQWU7OztzQkFXckIsWUFBWSxTQUFDLHVCQUF1QixFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgT25EZXN0cm95LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDYXJkVGFic1NlcnZpY2UgfSBmcm9tICcuLi9jYXJkLXRhYnMuc2VydmljZSc7XG5pbXBvcnQgeyBDYXJkVGFiQ29udGVudERpcmVjdGl2ZSB9IGZyb20gJy4vY2FyZC10YWItY29udGVudC5kaXJlY3RpdmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd1eC1jYXJkLXRhYicsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYXJkLXRhYi5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIENhcmRUYWJDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIGFjdGl2ZSQ6IE9ic2VydmFibGU8Ym9vbGVhbj4gPSB0aGlzLl90YWJTZXJ2aWNlLnRhYiQucGlwZShtYXAodGFiID0+IHRhYiA9PT0gdGhpcykpO1xuICBAQ29udGVudENoaWxkKENhcmRUYWJDb250ZW50RGlyZWN0aXZlLCB7IHJlYWQ6IFRlbXBsYXRlUmVmIH0pIGNvbnRlbnQ6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfdGFiU2VydmljZTogQ2FyZFRhYnNTZXJ2aWNlKSB7XG4gICAgdGhpcy5fdGFiU2VydmljZS5hZGRUYWIodGhpcyk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl90YWJTZXJ2aWNlLnJlbW92ZVRhYih0aGlzKTtcbiAgfVxuXG59XG4iXX0=