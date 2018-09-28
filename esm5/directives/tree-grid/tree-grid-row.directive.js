/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs-compat/BehaviorSubject';
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ncmlkLXJvdy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy90cmVlLWdyaWQvdHJlZS1ncmlkLXJvdy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckgsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzlELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFFNUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDOztJQXNDbEQsOEJBQW9CLGdCQUFpQztRQUFyRCxpQkFNQztRQU5tQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCOzhCQVpwQyxJQUFJLFlBQVksRUFBVzt1QkFHekIsS0FBSzswQkFHRixLQUFLOzBCQUVOLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQzswQkFFMUIsSUFBSSxPQUFPLEVBQVE7UUFHcEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLG9CQUFvQixFQUFFLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLFFBQVE7WUFDeEcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbkMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3ZELEtBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1NBQzlCLENBQUMsQ0FBQztLQUNOO0lBM0JELHNCQUNJLDBDQUFROzs7O1FBR1o7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNyQzs7Ozs7UUFORCxVQUNhLFFBQWlCO1lBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNwQzs7O09BQUE7Ozs7SUEwQkQsdUNBQVE7OztJQUFSO1FBQUEsaUJBUUM7UUFORyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDakMsTUFBTSxJQUFJLEtBQUssQ0FBQywrRUFBK0UsQ0FBQyxDQUFDO1NBQ3BHO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3BELFNBQVMsQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLEtBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxFQUF0QixDQUFzQixDQUFDLENBQUM7S0FDckQ7Ozs7SUFFRCwwQ0FBVzs7O0lBQVg7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDOUI7Ozs7O0lBR0QsdUNBQVE7Ozs7SUFEUixVQUNTLEtBQWE7UUFFbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFFdEIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNSLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUMxQjtLQUNKOzs7OztJQUdELHFDQUFNOzs7O0lBRE4sVUFDTyxLQUFhOztRQUdoQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDO1FBRXZDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDUixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDMUI7S0FDSjs7OztJQUVELHFDQUFNOzs7SUFBTjtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ25EOztnQkFsRkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFFBQVEsRUFBRSxlQUFlO29CQUN6QixJQUFJLEVBQUU7d0JBQ0Ysc0JBQXNCLEVBQUUsTUFBTTtxQkFDakM7aUJBQ0o7Ozs7Z0JBUlEsZUFBZTs7O3VCQVduQixLQUFLLFNBQUMsZUFBZTs0QkFHckIsS0FBSzsyQkFHTCxLQUFLO2lDQVFMLE1BQU07MEJBR04sV0FBVyxTQUFDLDRCQUE0Qjs2QkFHeEMsV0FBVyxTQUFDLDZCQUE2QjsyQkE4QnpDLFlBQVksU0FBQyxtQkFBbUIsRUFBRSxDQUFDLFFBQVEsQ0FBQzt5QkFVNUMsWUFBWSxTQUFDLG9CQUFvQixFQUFFLENBQUMsUUFBUSxDQUFDOzsrQkE3RWxEOztTQWVhLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy1jb21wYXQvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBza2lwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IHRpY2sgfSBmcm9tICcuLi8uLi9jb21tb24vb3BlcmF0b3JzL3RpY2sub3BlcmF0b3InO1xuaW1wb3J0IHsgVHJlZUdyaWRJdGVtIH0gZnJvbSAnLi90cmVlLWdyaWQtaXRlbS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgVHJlZUdyaWRTZXJ2aWNlIH0gZnJvbSAnLi90cmVlLWdyaWQuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4VHJlZUdyaWRSb3ddJyxcbiAgICBleHBvcnRBczogJ3V4VHJlZUdyaWRSb3cnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy50cmVlZ3JpZC1yb3ddJzogJ3RydWUnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBUcmVlR3JpZFJvd0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgndXhUcmVlR3JpZFJvdycpXG4gICAgaXRlbTogVHJlZUdyaWRJdGVtO1xuXG4gICAgQElucHV0KClcbiAgICBjYW5FeHBhbmQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBleHBhbmRlZChleHBhbmRlZDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9leHBhbmRlZCQubmV4dCghIWV4cGFuZGVkKTtcbiAgICB9XG4gICAgZ2V0IGV4cGFuZGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXhwYW5kZWQkLmdldFZhbHVlKCk7XG4gICAgfVxuXG4gICAgQE91dHB1dCgpXG4gICAgZXhwYW5kZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRyZWVncmlkLXJvdy1sb2FkaW5nJylcbiAgICBsb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRyZWVncmlkLXJvdy1leHBhbmRlZCcpXG4gICAgaXNFeHBhbmRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBfZXhwYW5kZWQkID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XG5cbiAgICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfdHJlZUdyaWRTZXJ2aWNlOiBUcmVlR3JpZFNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5fZXhwYW5kZWQkLnBpcGUoc2tpcCgxKSwgdGljaygpLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLCB0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKGV4cGFuZGVkID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXhwYW5kZWRDaGFuZ2UuZW1pdChleHBhbmRlZCk7XG4gICAgICAgICAgICB0aGlzLl90cmVlR3JpZFNlcnZpY2Uuc2V0RXhwYW5kZWQodGhpcy5pdGVtLCBleHBhbmRlZCk7XG4gICAgICAgICAgICB0aGlzLmlzRXhwYW5kZWQgPSBleHBhbmRlZDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG5cbiAgICAgICAgaWYgKCF0aGlzLml0ZW0gfHwgIXRoaXMuaXRlbS5zdGF0ZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1eFRyZWVHcmlkUm93IHNob3VsZCBiZSBjb25maWd1cmVkIHdpdGggYW4gb2JqZWN0IGVtaXR0ZWQgYnkgdXhUcmVlR3JpZC5yb3dzLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pdGVtLnN0YXRlLmxvYWRpbmckLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGxvYWRpbmcgPT4gdGhpcy5sb2FkaW5nID0gbG9hZGluZyk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uQXJyb3dMZWZ0JywgWyckZXZlbnQnXSlcbiAgICBjb2xsYXBzZShldmVudD86IEV2ZW50KTogdm9pZCB7XG5cbiAgICAgICAgdGhpcy5leHBhbmRlZCA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uQXJyb3dSaWdodCcsIFsnJGV2ZW50J10pXG4gICAgZXhwYW5kKGV2ZW50PzogRXZlbnQpOiB2b2lkIHtcblxuICAgICAgICAvLyB0YWtlIGludG8gYWNjb3VudCB3aGV0aGVyIG9yIG5vdCB0aGUgaXRlbSBjYW4gZXhwYW5kZWRcbiAgICAgICAgdGhpcy5leHBhbmRlZCA9IHRoaXMuY2FuRXhwYW5kICYmIHRydWU7XG5cbiAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmV4cGFuZGVkID8gdGhpcy5jb2xsYXBzZSgpIDogdGhpcy5leHBhbmQoKTtcbiAgICB9XG59Il19