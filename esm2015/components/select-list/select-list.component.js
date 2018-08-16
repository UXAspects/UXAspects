/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { SelectListItemComponent } from './select-list-item/select-list-item.component';
import { SelectListService } from './select-list.service';
export class SelectListComponent {
    /**
     * @param {?} _selectList
     */
    constructor(_selectList) {
        this._selectList = _selectList;
        this.selectedChange = new EventEmitter();
        this._onDestroy = new Subject();
        // any time the selection changes emit the latest value
        _selectList.selected$.pipe(distinctUntilChanged(), takeUntil(this._onDestroy))
            .subscribe(selected => this.selectedChange.emit(selected));
    }
    /**
     * @param {?} multiple
     * @return {?}
     */
    set multiple(multiple) { this._selectList.multiple = multiple; }
    /**
     * @param {?} items
     * @return {?}
     */
    set selected(items) { this._selectList.selected$.next(items); }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._selectList.initialise(this.items);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
SelectListComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-select-list',
                template: "<ng-content></ng-content>",
                providers: [SelectListService],
                host: {
                    role: 'list'
                }
            }] }
];
/** @nocollapse */
SelectListComponent.ctorParameters = () => [
    { type: SelectListService }
];
SelectListComponent.propDecorators = {
    multiple: [{ type: Input }],
    selected: [{ type: Input }],
    selectedChange: [{ type: Output }],
    items: [{ type: ContentChildren, args: [SelectListItemComponent,] }]
};
function SelectListComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    SelectListComponent.prototype.selectedChange;
    /** @type {?} */
    SelectListComponent.prototype.items;
    /** @type {?} */
    SelectListComponent.prototype._onDestroy;
    /** @type {?} */
    SelectListComponent.prototype._selectList;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VsZWN0LWxpc3Qvc2VsZWN0LWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdILE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBVTFELE1BQU07Ozs7SUFVRixZQUFvQixXQUE4QjtRQUE5QixnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7OEJBTnZCLElBQUksWUFBWSxFQUFTOzBCQUkvQixJQUFJLE9BQU8sRUFBUTs7UUFJcEMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3pFLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7S0FDbEU7Ozs7O0lBWkQsSUFBYSxRQUFRLENBQUMsUUFBaUIsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsRUFBRTs7Ozs7SUFDbEYsSUFBYSxRQUFRLENBQUMsS0FBWSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFOzs7O0lBYS9FLGVBQWU7UUFDWCxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDM0M7Ozs7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQzlCOzs7WUEvQkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLHFDQUEyQztnQkFDM0MsU0FBUyxFQUFFLENBQUMsaUJBQWlCLENBQUM7Z0JBQzlCLElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsTUFBTTtpQkFDZjthQUNKOzs7O1lBVFEsaUJBQWlCOzs7dUJBWXJCLEtBQUs7dUJBQ0wsS0FBSzs2QkFDTCxNQUFNO29CQUVOLGVBQWUsU0FBQyx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPdXRwdXQsIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgU2VsZWN0TGlzdEl0ZW1Db21wb25lbnQgfSBmcm9tICcuL3NlbGVjdC1saXN0LWl0ZW0vc2VsZWN0LWxpc3QtaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VsZWN0TGlzdFNlcnZpY2UgfSBmcm9tICcuL3NlbGVjdC1saXN0LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LXNlbGVjdC1saXN0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vc2VsZWN0LWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICAgIHByb3ZpZGVyczogW1NlbGVjdExpc3RTZXJ2aWNlXSxcbiAgICBob3N0OiB7XG4gICAgICAgIHJvbGU6ICdsaXN0J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0TGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBzZXQgbXVsdGlwbGUobXVsdGlwbGU6IGJvb2xlYW4pIHsgdGhpcy5fc2VsZWN0TGlzdC5tdWx0aXBsZSA9IG11bHRpcGxlOyB9XG4gICAgQElucHV0KCkgc2V0IHNlbGVjdGVkKGl0ZW1zOiBhbnlbXSkgeyB0aGlzLl9zZWxlY3RMaXN0LnNlbGVjdGVkJC5uZXh0KGl0ZW1zKTsgfVxuICAgIEBPdXRwdXQoKSBzZWxlY3RlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55W10+KCk7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFNlbGVjdExpc3RJdGVtQ29tcG9uZW50KSBpdGVtczogUXVlcnlMaXN0PFNlbGVjdExpc3RJdGVtQ29tcG9uZW50PjtcblxuICAgIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZWxlY3RMaXN0OiBTZWxlY3RMaXN0U2VydmljZSkge1xuICAgICAgICAvLyBhbnkgdGltZSB0aGUgc2VsZWN0aW9uIGNoYW5nZXMgZW1pdCB0aGUgbGF0ZXN0IHZhbHVlXG4gICAgICAgIF9zZWxlY3RMaXN0LnNlbGVjdGVkJC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksIHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKVxuICAgICAgICAgICAgLnN1YnNjcmliZShzZWxlY3RlZCA9PiB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQoc2VsZWN0ZWQpKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3NlbGVjdExpc3QuaW5pdGlhbGlzZSh0aGlzLml0ZW1zKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gICAgfVxufSJdfQ==