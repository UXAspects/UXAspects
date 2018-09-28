/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { TreeGridService } from './tree-grid.service';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
var TreeGridDirective = /** @class */ (function () {
    function TreeGridDirective(_treeGridService) {
        this._treeGridService = _treeGridService;
        this.rowsChange = new EventEmitter();
        this._onDestroy = new Subject();
    }
    Object.defineProperty(TreeGridDirective.prototype, "data", {
        set: /**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            this._treeGridService.data$.next(data);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeGridDirective.prototype, "loadChildren", {
        set: /**
         * @param {?} loadChildren
         * @return {?}
         */
        function (loadChildren) {
            this._treeGridService.loadChildren = loadChildren;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    TreeGridDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._treeGridService.rows$.pipe(takeUntil(this._onDestroy)).subscribe(function (rows) { return _this.rowsChange.emit(rows); });
    };
    /**
     * @return {?}
     */
    TreeGridDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    TreeGridDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxTreeGrid]',
                    providers: [TreeGridService],
                    host: {
                        class: 'treegrid'
                    }
                },] }
    ];
    /** @nocollapse */
    TreeGridDirective.ctorParameters = function () { return [
        { type: TreeGridService }
    ]; };
    TreeGridDirective.propDecorators = {
        data: [{ type: Input, args: ['uxTreeGrid',] }],
        loadChildren: [{ type: Input }],
        rows: [{ type: Input }],
        rowsChange: [{ type: Output }]
    };
    return TreeGridDirective;
}());
export { TreeGridDirective };
function TreeGridDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    TreeGridDirective.prototype.rows;
    /** @type {?} */
    TreeGridDirective.prototype.rowsChange;
    /** @type {?} */
    TreeGridDirective.prototype._onDestroy;
    /** @type {?} */
    TreeGridDirective.prototype._treeGridService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ncmlkLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3RyZWUtZ3JpZC90cmVlLWdyaWQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUcxRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0lBNEJ2QywyQkFBb0IsZ0JBQWlDO1FBQWpDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7MEJBSnhDLElBQUksWUFBWSxFQUFrQjswQkFFMUIsSUFBSSxPQUFPLEVBQVE7S0FFaUI7SUFsQnpELHNCQUNJLG1DQUFJOzs7OztRQURSLFVBQ1MsSUFBb0I7WUFDekIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDMUM7OztPQUFBO0lBRUQsc0JBQ0ksMkNBQVk7Ozs7O1FBRGhCLFVBQ2lCLFlBQWtDO1lBQy9DLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1NBQ3JEOzs7T0FBQTs7OztJQVlELG9DQUFROzs7SUFBUjtRQUFBLGlCQUVDO1FBREcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUExQixDQUEwQixDQUFDLENBQUM7S0FDOUc7Ozs7SUFFRCx1Q0FBVzs7O0lBQVg7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDOUI7O2dCQW5DSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLFNBQVMsRUFBRSxDQUFDLGVBQWUsQ0FBQztvQkFDNUIsSUFBSSxFQUFFO3dCQUNGLEtBQUssRUFBRSxVQUFVO3FCQUNwQjtpQkFDSjs7OztnQkFWUSxlQUFlOzs7dUJBWW5CLEtBQUssU0FBQyxZQUFZOytCQUtsQixLQUFLO3VCQUtMLEtBQUs7NkJBR0wsTUFBTTs7NEJBNUJYOztTQWNhLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJlZUdyaWRJdGVtIH0gZnJvbSAnLi90cmVlLWdyaWQtaXRlbS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgVHJlZUdyaWRMb2FkRnVuY3Rpb24gfSBmcm9tICcuL3RyZWUtZ3JpZC1sb2FkLWZ1bmN0aW9uLnR5cGUnO1xuaW1wb3J0IHsgVHJlZUdyaWRTZXJ2aWNlIH0gZnJvbSAnLi90cmVlLWdyaWQuc2VydmljZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhUcmVlR3JpZF0nLFxuICAgIHByb3ZpZGVyczogW1RyZWVHcmlkU2VydmljZV0sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3RyZWVncmlkJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgVHJlZUdyaWREaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCd1eFRyZWVHcmlkJylcbiAgICBzZXQgZGF0YShkYXRhOiBUcmVlR3JpZEl0ZW1bXSkge1xuICAgICAgICB0aGlzLl90cmVlR3JpZFNlcnZpY2UuZGF0YSQubmV4dChkYXRhKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBsb2FkQ2hpbGRyZW4obG9hZENoaWxkcmVuOiBUcmVlR3JpZExvYWRGdW5jdGlvbikge1xuICAgICAgICB0aGlzLl90cmVlR3JpZFNlcnZpY2UubG9hZENoaWxkcmVuID0gbG9hZENoaWxkcmVuO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcm93czogVHJlZUdyaWRJdGVtW107XG5cbiAgICBAT3V0cHV0KClcbiAgICByb3dzQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxUcmVlR3JpZEl0ZW1bXT4oKTtcblxuICAgIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF90cmVlR3JpZFNlcnZpY2U6IFRyZWVHcmlkU2VydmljZSkge31cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl90cmVlR3JpZFNlcnZpY2Uucm93cyQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKHJvd3MgPT4gdGhpcy5yb3dzQ2hhbmdlLmVtaXQocm93cykpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB9XG59XG4iXX0=