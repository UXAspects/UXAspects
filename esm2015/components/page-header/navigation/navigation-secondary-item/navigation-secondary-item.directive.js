/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, Input } from '@angular/core';
import { delay, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { PageHeaderService } from '../../page-header.service';
export class PageHeaderNavigationSecondaryItemDirective {
    /**
     * @param {?} _pageHeaderService
     */
    constructor(_pageHeaderService) {
        this._pageHeaderService = _pageHeaderService;
        this._onDestroy = new Subject();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._pageHeaderService.selected$.pipe(delay(0), takeUntil(this._onDestroy)).subscribe(next => {
            // Update selected state for this item
            this._pageHeaderService.updateItem(this.item, next);
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
PageHeaderNavigationSecondaryItemDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxPageHeaderNavigationSecondaryItem]'
            },] }
];
/** @nocollapse */
PageHeaderNavigationSecondaryItemDirective.ctorParameters = () => [
    { type: PageHeaderService }
];
PageHeaderNavigationSecondaryItemDirective.propDecorators = {
    item: [{ type: Input, args: ['uxPageHeaderNavigationSecondaryItem',] }]
};
function PageHeaderNavigationSecondaryItemDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    PageHeaderNavigationSecondaryItemDirective.prototype.item;
    /** @type {?} */
    PageHeaderNavigationSecondaryItemDirective.prototype._onDestroy;
    /** @type {?} */
    PageHeaderNavigationSecondaryItemDirective.prototype._pageHeaderService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi1zZWNvbmRhcnktaXRlbS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9wYWdlLWhlYWRlci9uYXZpZ2F0aW9uL25hdmlnYXRpb24tc2Vjb25kYXJ5LWl0ZW0vbmF2aWdhdGlvbi1zZWNvbmRhcnktaXRlbS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUNwRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFNOUQsTUFBTTs7OztJQU9GLFlBQW9CLGtCQUFxQztRQUFyQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1COzBCQUZwQyxJQUFJLE9BQU8sRUFBUTtLQUVzQjs7OztJQUU5RCxRQUFRO1FBRUosSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUU7O1lBRzFGLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUV2RCxDQUFDLENBQUM7S0FDTjs7OztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDOUI7OztZQXpCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHVDQUF1QzthQUNwRDs7OztZQUxRLGlCQUFpQjs7O21CQVFyQixLQUFLLFNBQUMscUNBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgZGVsYXksIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XHJcbmltcG9ydCB7IFBhZ2VIZWFkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcGFnZS1oZWFkZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbSB9IGZyb20gJy4uL25hdmlnYXRpb24uY29tcG9uZW50JztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbdXhQYWdlSGVhZGVyTmF2aWdhdGlvblNlY29uZGFyeUl0ZW1dJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgUGFnZUhlYWRlck5hdmlnYXRpb25TZWNvbmRhcnlJdGVtRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICAgIEBJbnB1dCgndXhQYWdlSGVhZGVyTmF2aWdhdGlvblNlY29uZGFyeUl0ZW0nKVxyXG4gICAgaXRlbTogUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtO1xyXG5cclxuICAgIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcGFnZUhlYWRlclNlcnZpY2U6IFBhZ2VIZWFkZXJTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fcGFnZUhlYWRlclNlcnZpY2Uuc2VsZWN0ZWQkLnBpcGUoZGVsYXkoMCksIHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUobmV4dCA9PiB7XHJcblxyXG4gICAgICAgICAgICAvLyBVcGRhdGUgc2VsZWN0ZWQgc3RhdGUgZm9yIHRoaXMgaXRlbVxyXG4gICAgICAgICAgICB0aGlzLl9wYWdlSGVhZGVyU2VydmljZS51cGRhdGVJdGVtKHRoaXMuaXRlbSwgbmV4dCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XHJcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XHJcbiAgICB9XHJcbn0iXX0=