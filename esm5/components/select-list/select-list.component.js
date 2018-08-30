/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { SelectionService } from '../../directives/selection/selection.service';
import { MultipleSelectListStrategy } from './multiple-select-list.strategy';
import { SelectListItemComponent } from './select-list-item/select-list-item.component';
import { SingleSelectListStrategy } from './single-select-list.strategy';
var SelectListComponent = /** @class */ (function () {
    function SelectListComponent(_selection) {
        var _this = this;
        this._selection = _selection;
        this.selected = [];
        this.selectedChange = new EventEmitter();
        // set the selection strategy to single by default
        this._selection.setStrategy(new SingleSelectListStrategy());
        // emit the selection changes when they occur
        this._subscription = this._selection.selection$.subscribe(function (selection) { return _this.selectedChange.emit(selection); });
    }
    Object.defineProperty(SelectListComponent.prototype, "multiple", {
        set: /**
         * @param {?} multiple
         * @return {?}
         */
        function (multiple) {
            this._selection.strategy.deselectAll();
            this._selection.setStrategy(multiple ? new MultipleSelectListStrategy() : new SingleSelectListStrategy());
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SelectListComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // supply the initial item set
        this._selection.dataset = this.items.map(function (item) { return item.data; });
        // if the item set changes update the list
        this.items.changes.subscribe(function () { return _this._selection.dataset = _this.items.map(function (item) { return item.data; }); });
    };
    /**
     * @return {?}
     */
    SelectListComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    SelectListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-select-list',
                    template: "<ng-content></ng-content>",
                    providers: [SelectionService],
                    host: {
                        role: 'list'
                    }
                }] }
    ];
    /** @nocollapse */
    SelectListComponent.ctorParameters = function () { return [
        { type: SelectionService }
    ]; };
    SelectListComponent.propDecorators = {
        multiple: [{ type: Input }],
        selected: [{ type: Input }],
        selectedChange: [{ type: Output }],
        items: [{ type: ContentChildren, args: [SelectListItemComponent,] }]
    };
    return SelectListComponent;
}());
export { SelectListComponent };
function SelectListComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    SelectListComponent.prototype.selected;
    /** @type {?} */
    SelectListComponent.prototype.selectedChange;
    /** @type {?} */
    SelectListComponent.prototype.items;
    /** @type {?} */
    SelectListComponent.prototype._subscription;
    /** @type {?} */
    SelectListComponent.prototype._selection;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VsZWN0LWxpc3Qvc2VsZWN0LWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQW9CLFNBQVMsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWhJLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLCtCQUErQixDQUFDOztJQXdCckUsNkJBQW9CLFVBQTRCO1FBQWhELGlCQU1DO1FBTm1CLGVBQVUsR0FBVixVQUFVLENBQWtCO3dCQVByQixFQUFFOzhCQUNGLElBQUksWUFBWSxFQUFTOztRQVFoRCxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLHdCQUF3QixFQUFFLENBQUMsQ0FBQzs7UUFHNUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBQSxTQUFTLElBQUksT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBbkMsQ0FBbUMsQ0FBQyxDQUFDO0tBQy9HO0lBbEJELHNCQUFhLHlDQUFROzs7OztRQUFyQixVQUFzQixRQUFpQjtZQUNuQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN2QyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksMEJBQTBCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSx3QkFBd0IsRUFBRSxDQUFDLENBQUM7U0FDN0c7OztPQUFBOzs7O0lBaUJELGdEQUFrQjs7O0lBQWxCO1FBQUEsaUJBT0M7O1FBSkcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsSUFBSSxFQUFULENBQVMsQ0FBQyxDQUFDOztRQUc1RCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLElBQUksRUFBVCxDQUFTLENBQUMsRUFBM0QsQ0FBMkQsQ0FBQyxDQUFDO0tBQ25HOzs7O0lBRUQseUNBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNwQzs7Z0JBekNKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixxQ0FBMkM7b0JBQzNDLFNBQVMsRUFBRSxDQUFDLGdCQUFnQixDQUFDO29CQUM3QixJQUFJLEVBQUU7d0JBQ0YsSUFBSSxFQUFFLE1BQU07cUJBQ2Y7aUJBQ0o7Ozs7Z0JBWlEsZ0JBQWdCOzs7MkJBZXBCLEtBQUs7MkJBS0wsS0FBSztpQ0FDTCxNQUFNO3dCQUVOLGVBQWUsU0FBQyx1QkFBdUI7OzhCQXpCNUM7O1NBZWEsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT3V0cHV0LCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IFNlbGVjdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3NlbGVjdGlvbi9zZWxlY3Rpb24uc2VydmljZSc7XG5pbXBvcnQgeyBNdWx0aXBsZVNlbGVjdExpc3RTdHJhdGVneSB9IGZyb20gJy4vbXVsdGlwbGUtc2VsZWN0LWxpc3Quc3RyYXRlZ3knO1xuaW1wb3J0IHsgU2VsZWN0TGlzdEl0ZW1Db21wb25lbnQgfSBmcm9tICcuL3NlbGVjdC1saXN0LWl0ZW0vc2VsZWN0LWxpc3QtaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2luZ2xlU2VsZWN0TGlzdFN0cmF0ZWd5IH0gZnJvbSAnLi9zaW5nbGUtc2VsZWN0LWxpc3Quc3RyYXRlZ3knO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LXNlbGVjdC1saXN0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vc2VsZWN0LWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICAgIHByb3ZpZGVyczogW1NlbGVjdGlvblNlcnZpY2VdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgcm9sZTogJ2xpc3QnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3RMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIHNldCBtdWx0aXBsZShtdWx0aXBsZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9zZWxlY3Rpb24uc3RyYXRlZ3kuZGVzZWxlY3RBbGwoKTtcbiAgICAgICAgdGhpcy5fc2VsZWN0aW9uLnNldFN0cmF0ZWd5KG11bHRpcGxlID8gbmV3IE11bHRpcGxlU2VsZWN0TGlzdFN0cmF0ZWd5KCkgOiBuZXcgU2luZ2xlU2VsZWN0TGlzdFN0cmF0ZWd5KCkpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIHNlbGVjdGVkOiBhbnlbXSA9IFtdO1xuICAgIEBPdXRwdXQoKSBzZWxlY3RlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55W10+KCk7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFNlbGVjdExpc3RJdGVtQ29tcG9uZW50KSBpdGVtczogUXVlcnlMaXN0PFNlbGVjdExpc3RJdGVtQ29tcG9uZW50PjtcblxuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VsZWN0aW9uOiBTZWxlY3Rpb25TZXJ2aWNlKSB7XG4gICAgICAgIC8vIHNldCB0aGUgc2VsZWN0aW9uIHN0cmF0ZWd5IHRvIHNpbmdsZSBieSBkZWZhdWx0XG4gICAgICAgIHRoaXMuX3NlbGVjdGlvbi5zZXRTdHJhdGVneShuZXcgU2luZ2xlU2VsZWN0TGlzdFN0cmF0ZWd5KCkpO1xuXG4gICAgICAgIC8vIGVtaXQgdGhlIHNlbGVjdGlvbiBjaGFuZ2VzIHdoZW4gdGhleSBvY2N1clxuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSB0aGlzLl9zZWxlY3Rpb24uc2VsZWN0aW9uJC5zdWJzY3JpYmUoc2VsZWN0aW9uID0+IHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdChzZWxlY3Rpb24pKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gc3VwcGx5IHRoZSBpbml0aWFsIGl0ZW0gc2V0XG4gICAgICAgIHRoaXMuX3NlbGVjdGlvbi5kYXRhc2V0ID0gdGhpcy5pdGVtcy5tYXAoaXRlbSA9PiBpdGVtLmRhdGEpO1xuXG4gICAgICAgIC8vIGlmIHRoZSBpdGVtIHNldCBjaGFuZ2VzIHVwZGF0ZSB0aGUgbGlzdFxuICAgICAgICB0aGlzLml0ZW1zLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMuX3NlbGVjdGlvbi5kYXRhc2V0ID0gdGhpcy5pdGVtcy5tYXAoaXRlbSA9PiBpdGVtLmRhdGEpKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxufSJdfQ==