/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { distinctUntilChanged, skip, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { tick } from '../../common/operators/tick.operator';
import { TreeGridService } from './tree-grid.service';
var TreeGridRowDirective = /** @class */ (function () {
    function TreeGridRowDirective(_treeGridService) {
        var _this = this;
        this._treeGridService = _treeGridService;
        this.expandedChange = new EventEmitter();
        this.loading = false;
        this.isExpanded = false;
        this._expanded$ = new BehaviorSubject(false);
        this._onDestroy = new Subject();
        this._expanded$.pipe(skip(1), tick(), distinctUntilChanged(), takeUntil(this._onDestroy)).subscribe(function (expanded) {
            _this.expandedChange.emit(expanded);
            _this._treeGridService.setExpanded(_this.item, expanded);
            _this.isExpanded = expanded;
        });
    }
    Object.defineProperty(TreeGridRowDirective.prototype, "expanded", {
        get: /**
         * @return {?}
         */
        function () {
            return this._expanded$.getValue();
        },
        set: /**
         * @param {?} expanded
         * @return {?}
         */
        function (expanded) {
            this._expanded$.next(!!expanded);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    TreeGridRowDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.item || !this.item.state) {
            throw new Error('uxTreeGridRow should be configured with an object emitted by uxTreeGrid.rows.');
        }
        this.item.state.loading$.pipe(takeUntil(this._onDestroy))
            .subscribe(function (loading) { return _this.loading = loading; });
    };
    /**
     * @return {?}
     */
    TreeGridRowDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /**
     * @param {?=} event
     * @return {?}
     */
    TreeGridRowDirective.prototype.collapse = /**
     * @param {?=} event
     * @return {?}
     */
    function (event) {
        this.expanded = false;
        if (event) {
            event.preventDefault();
        }
    };
    /**
     * @param {?=} event
     * @return {?}
     */
    TreeGridRowDirective.prototype.expand = /**
     * @param {?=} event
     * @return {?}
     */
    function (event) {
        // take into account whether or not the item can expanded
        this.expanded = this.canExpand && true;
        if (event) {
            event.preventDefault();
        }
    };
    /**
     * @return {?}
     */
    TreeGridRowDirective.prototype.toggle = /**
     * @return {?}
     */
    function () {
        this.expanded ? this.collapse() : this.expand();
    };
    TreeGridRowDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxTreeGridRow]',
                    exportAs: 'uxTreeGridRow',
                    host: {
                        '[class.treegrid-row]': 'true'
                    }
                },] }
    ];
    /** @nocollapse */
    TreeGridRowDirective.ctorParameters = function () { return [
        { type: TreeGridService }
    ]; };
    TreeGridRowDirective.propDecorators = {
        item: [{ type: Input, args: ['uxTreeGridRow',] }],
        canExpand: [{ type: Input }],
        expanded: [{ type: Input }],
        expandedChange: [{ type: Output }],
        loading: [{ type: HostBinding, args: ['class.treegrid-row-loading',] }],
        isExpanded: [{ type: HostBinding, args: ['class.treegrid-row-expanded',] }],
        collapse: [{ type: HostListener, args: ['keydown.ArrowLeft', ['$event'],] }],
        expand: [{ type: HostListener, args: ['keydown.ArrowRight', ['$event'],] }]
    };
    return TreeGridRowDirective;
}());
export { TreeGridRowDirective };
function TreeGridRowDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    TreeGridRowDirective.prototype.item;
    /** @type {?} */
    TreeGridRowDirective.prototype.canExpand;
    /** @type {?} */
    TreeGridRowDirective.prototype.expandedChange;
    /** @type {?} */
    TreeGridRowDirective.prototype.loading;
    /** @type {?} */
    TreeGridRowDirective.prototype.isExpanded;
    /** @type {?} */
    TreeGridRowDirective.prototype._expanded$;
    /** @type {?} */
    TreeGridRowDirective.prototype._onDestroy;
    /** @type {?} */
    TreeGridRowDirective.prototype._treeGridService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ncmlkLXJvdy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy90cmVlLWdyaWQvdHJlZS1ncmlkLXJvdy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckgsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFFNUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDOztJQXNDbEQsOEJBQW9CLGdCQUFpQztRQUFyRCxpQkFNQztRQU5tQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCOzhCQVpwQyxJQUFJLFlBQVksRUFBVzt1QkFHekIsS0FBSzswQkFHRixLQUFLOzBCQUVOLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQzswQkFFMUIsSUFBSSxPQUFPLEVBQVE7UUFHcEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLG9CQUFvQixFQUFFLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLFFBQVE7WUFDeEcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbkMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3ZELEtBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1NBQzlCLENBQUMsQ0FBQztLQUNOO0lBM0JELHNCQUNJLDBDQUFROzs7O1FBR1o7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNyQzs7Ozs7UUFORCxVQUNhLFFBQWlCO1lBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNwQzs7O09BQUE7Ozs7SUEwQkQsdUNBQVE7OztJQUFSO1FBQUEsaUJBUUM7UUFORyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDakMsTUFBTSxJQUFJLEtBQUssQ0FBQywrRUFBK0UsQ0FBQyxDQUFDO1NBQ3BHO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3BELFNBQVMsQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLEtBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxFQUF0QixDQUFzQixDQUFDLENBQUM7S0FDckQ7Ozs7SUFFRCwwQ0FBVzs7O0lBQVg7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDOUI7Ozs7O0lBR0QsdUNBQVE7Ozs7SUFEUixVQUNTLEtBQWE7UUFFbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFFdEIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNSLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUMxQjtLQUNKOzs7OztJQUdELHFDQUFNOzs7O0lBRE4sVUFDTyxLQUFhOztRQUdoQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDO1FBRXZDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDUixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDMUI7S0FDSjs7OztJQUVELHFDQUFNOzs7SUFBTjtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ25EOztnQkFsRkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFFBQVEsRUFBRSxlQUFlO29CQUN6QixJQUFJLEVBQUU7d0JBQ0Ysc0JBQXNCLEVBQUUsTUFBTTtxQkFDakM7aUJBQ0o7Ozs7Z0JBUlEsZUFBZTs7O3VCQVduQixLQUFLLFNBQUMsZUFBZTs0QkFHckIsS0FBSzsyQkFHTCxLQUFLO2lDQVFMLE1BQU07MEJBR04sV0FBVyxTQUFDLDRCQUE0Qjs2QkFHeEMsV0FBVyxTQUFDLDZCQUE2QjsyQkE4QnpDLFlBQVksU0FBQyxtQkFBbUIsRUFBRSxDQUFDLFFBQVEsQ0FBQzt5QkFVNUMsWUFBWSxTQUFDLG9CQUFvQixFQUFFLENBQUMsUUFBUSxDQUFDOzsrQkE3RWxEOztTQWVhLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIHNraXAsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgdGljayB9IGZyb20gJy4uLy4uL2NvbW1vbi9vcGVyYXRvcnMvdGljay5vcGVyYXRvcic7XG5pbXBvcnQgeyBUcmVlR3JpZEl0ZW0gfSBmcm9tICcuL3RyZWUtZ3JpZC1pdGVtLmludGVyZmFjZSc7XG5pbXBvcnQgeyBUcmVlR3JpZFNlcnZpY2UgfSBmcm9tICcuL3RyZWUtZ3JpZC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhUcmVlR3JpZFJvd10nLFxuICAgIGV4cG9ydEFzOiAndXhUcmVlR3JpZFJvdycsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLnRyZWVncmlkLXJvd10nOiAndHJ1ZSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFRyZWVHcmlkUm93RGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCd1eFRyZWVHcmlkUm93JylcbiAgICBpdGVtOiBUcmVlR3JpZEl0ZW07XG5cbiAgICBASW5wdXQoKVxuICAgIGNhbkV4cGFuZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGV4cGFuZGVkKGV4cGFuZGVkOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2V4cGFuZGVkJC5uZXh0KCEhZXhwYW5kZWQpO1xuICAgIH1cbiAgICBnZXQgZXhwYW5kZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9leHBhbmRlZCQuZ2V0VmFsdWUoKTtcbiAgICB9XG5cbiAgICBAT3V0cHV0KClcbiAgICBleHBhbmRlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIEBIb3N0QmluZGluZygnY2xhc3MudHJlZWdyaWQtcm93LWxvYWRpbmcnKVxuICAgIGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBIb3N0QmluZGluZygnY2xhc3MudHJlZWdyaWQtcm93LWV4cGFuZGVkJylcbiAgICBpc0V4cGFuZGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIF9leHBhbmRlZCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcblxuICAgIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF90cmVlR3JpZFNlcnZpY2U6IFRyZWVHcmlkU2VydmljZSkge1xuICAgICAgICB0aGlzLl9leHBhbmRlZCQucGlwZShza2lwKDEpLCB0aWNrKCksIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksIHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoZXhwYW5kZWQgPT4ge1xuICAgICAgICAgICAgdGhpcy5leHBhbmRlZENoYW5nZS5lbWl0KGV4cGFuZGVkKTtcbiAgICAgICAgICAgIHRoaXMuX3RyZWVHcmlkU2VydmljZS5zZXRFeHBhbmRlZCh0aGlzLml0ZW0sIGV4cGFuZGVkKTtcbiAgICAgICAgICAgIHRoaXMuaXNFeHBhbmRlZCA9IGV4cGFuZGVkO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcblxuICAgICAgICBpZiAoIXRoaXMuaXRlbSB8fCAhdGhpcy5pdGVtLnN0YXRlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3V4VHJlZUdyaWRSb3cgc2hvdWxkIGJlIGNvbmZpZ3VyZWQgd2l0aCBhbiBvYmplY3QgZW1pdHRlZCBieSB1eFRyZWVHcmlkLnJvd3MuJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLml0ZW0uc3RhdGUubG9hZGluZyQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUobG9hZGluZyA9PiB0aGlzLmxvYWRpbmcgPSBsb2FkaW5nKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5BcnJvd0xlZnQnLCBbJyRldmVudCddKVxuICAgIGNvbGxhcHNlKGV2ZW50PzogRXZlbnQpOiB2b2lkIHtcblxuICAgICAgICB0aGlzLmV4cGFuZGVkID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5BcnJvd1JpZ2h0JywgWyckZXZlbnQnXSlcbiAgICBleHBhbmQoZXZlbnQ/OiBFdmVudCk6IHZvaWQge1xuXG4gICAgICAgIC8vIHRha2UgaW50byBhY2NvdW50IHdoZXRoZXIgb3Igbm90IHRoZSBpdGVtIGNhbiBleHBhbmRlZFxuICAgICAgICB0aGlzLmV4cGFuZGVkID0gdGhpcy5jYW5FeHBhbmQgJiYgdHJ1ZTtcblxuICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZXhwYW5kZWQgPyB0aGlzLmNvbGxhcHNlKCkgOiB0aGlzLmV4cGFuZCgpO1xuICAgIH1cbn1cbiJdfQ==