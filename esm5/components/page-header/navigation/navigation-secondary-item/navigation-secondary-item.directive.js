/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, Input } from '@angular/core';
import { delay, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { PageHeaderService } from '../../page-header.service';
var PageHeaderNavigationSecondaryItemDirective = /** @class */ (function () {
    function PageHeaderNavigationSecondaryItemDirective(_pageHeaderService) {
        this._pageHeaderService = _pageHeaderService;
        this._onDestroy = new Subject();
    }
    /**
     * @return {?}
     */
    PageHeaderNavigationSecondaryItemDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._pageHeaderService.selected$.pipe(delay(0), takeUntil(this._onDestroy)).subscribe(function (next) {
            // Update selected state for this item
            // Update selected state for this item
            _this._pageHeaderService.updateItem(_this.item, next);
        });
    };
    /**
     * @return {?}
     */
    PageHeaderNavigationSecondaryItemDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    PageHeaderNavigationSecondaryItemDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxPageHeaderNavigationSecondaryItem]'
                },] }
    ];
    /** @nocollapse */
    PageHeaderNavigationSecondaryItemDirective.ctorParameters = function () { return [
        { type: PageHeaderService }
    ]; };
    PageHeaderNavigationSecondaryItemDirective.propDecorators = {
        item: [{ type: Input, args: ['uxPageHeaderNavigationSecondaryItem',] }]
    };
    return PageHeaderNavigationSecondaryItemDirective;
}());
export { PageHeaderNavigationSecondaryItemDirective };
function PageHeaderNavigationSecondaryItemDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    PageHeaderNavigationSecondaryItemDirective.prototype.item;
    /** @type {?} */
    PageHeaderNavigationSecondaryItemDirective.prototype._onDestroy;
    /** @type {?} */
    PageHeaderNavigationSecondaryItemDirective.prototype._pageHeaderService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi1zZWNvbmRhcnktaXRlbS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9wYWdlLWhlYWRlci9uYXZpZ2F0aW9uL25hdmlnYXRpb24tc2Vjb25kYXJ5LWl0ZW0vbmF2aWdhdGlvbi1zZWNvbmRhcnktaXRlbS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUNwRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0lBYTFELG9EQUFvQixrQkFBcUM7UUFBckMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjswQkFGcEMsSUFBSSxPQUFPLEVBQVE7S0FFc0I7Ozs7SUFFOUQsNkRBQVE7OztJQUFSO1FBQUEsaUJBUUM7UUFORyxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUk7O1lBR3ZGLEFBREEsc0NBQXNDO1lBQ3RDLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsS0FBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUV2RCxDQUFDLENBQUM7S0FDTjs7OztJQUVELGdFQUFXOzs7SUFBWDtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUM5Qjs7Z0JBekJKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsdUNBQXVDO2lCQUNwRDs7OztnQkFMUSxpQkFBaUI7Ozt1QkFRckIsS0FBSyxTQUFDLHFDQUFxQzs7cURBWGhEOztTQVNhLDBDQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGRlbGF5LCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xyXG5pbXBvcnQgeyBQYWdlSGVhZGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3BhZ2UtaGVhZGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW0gfSBmcm9tICcuLi9uYXZpZ2F0aW9uLmNvbXBvbmVudCc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW3V4UGFnZUhlYWRlck5hdmlnYXRpb25TZWNvbmRhcnlJdGVtXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIFBhZ2VIZWFkZXJOYXZpZ2F0aW9uU2Vjb25kYXJ5SXRlbURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgICBASW5wdXQoJ3V4UGFnZUhlYWRlck5hdmlnYXRpb25TZWNvbmRhcnlJdGVtJylcclxuICAgIGl0ZW06IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbTtcclxuXHJcbiAgICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3BhZ2VIZWFkZXJTZXJ2aWNlOiBQYWdlSGVhZGVyU2VydmljZSkgeyB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX3BhZ2VIZWFkZXJTZXJ2aWNlLnNlbGVjdGVkJC5waXBlKGRlbGF5KDApLCB0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKG5leHQgPT4ge1xyXG5cclxuICAgICAgICAgICAgLy8gVXBkYXRlIHNlbGVjdGVkIHN0YXRlIGZvciB0aGlzIGl0ZW1cclxuICAgICAgICAgICAgdGhpcy5fcGFnZUhlYWRlclNlcnZpY2UudXBkYXRlSXRlbSh0aGlzLml0ZW0sIG5leHQpO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xyXG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xyXG4gICAgfVxyXG59Il19