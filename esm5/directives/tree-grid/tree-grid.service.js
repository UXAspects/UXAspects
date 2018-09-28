/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { TreeGridState } from './tree-grid-state.class';
var TreeGridService = /** @class */ (function () {
    function TreeGridService(_changeDetector) {
        var _this = this;
        this._changeDetector = _changeDetector;
        /**
         * The raw table data
         */
        this.data$ = new BehaviorSubject([]);
        /**
         * The flattened table data
         */
        this.rows$ = new BehaviorSubject([]);
        /**
         * Ensure we destroy all observables correctly
         */
        this._onDestroy = new Subject();
        this.data$.pipe(takeUntil(this._onDestroy)).subscribe(function (data) { return _this.rows$.next(_this.getFlattenedTree(data)); });
    }
    /** Unsubscribe from all observables */
    /**
     * Unsubscribe from all observables
     * @return {?}
     */
    TreeGridService.prototype.ngOnDestroy = /**
     * Unsubscribe from all observables
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /** Set the expanded state of a row */
    /**
     * Set the expanded state of a row
     * @param {?} item
     * @param {?} expanded
     * @return {?}
     */
    TreeGridService.prototype.setExpanded = /**
     * Set the expanded state of a row
     * @param {?} item
     * @param {?} expanded
     * @return {?}
     */
    function (item, expanded) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!expanded) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getChildren(item)];
                    case 1:
                        _a.sent();
                        this.insertChildren(item);
                        return [3 /*break*/, 3];
                    case 2:
                        this.removeChildren(item);
                        _a.label = 3;
                    case 3:
                        this._changeDetector.detectChanges();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * A function to flatten tree data
     * @param {?} data
     * @param {?=} parent
     * @return {?}
     */
    TreeGridService.prototype.getFlattenedTree = /**
     * A function to flatten tree data
     * @param {?} data
     * @param {?=} parent
     * @return {?}
     */
    function (data, parent) {
        var _this = this;
        // flatten the nodes at this level
        return data.reduce(function (previous, item, index) {
            item.state = new TreeGridState(parent ? parent.state.level + 1 : 0, data.length, index + 1);
            // Convert any child nodes
            var /** @type {?} */ children = (item.children && item.expanded) ? _this.getFlattenedTree(item.children, item) : [];
            // return the nodes in a flattened array
            return tslib_1.__spread(previous, [item], children);
        }, []);
    };
    /**
     * Load any children dynamically
     * @param {?} item
     * @return {?}
     */
    TreeGridService.prototype.getChildren = /**
     * Load any children dynamically
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(!item.children && this.loadChildren)) return [3 /*break*/, 4];
                        item.state.loading$.next(true);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, , 3, 4]);
                        _a = item;
                        return [4 /*yield*/, this.getNormalizedChildren(this.loadChildren(item))];
                    case 2:
                        _a.children = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        item.state.loading$.next(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * We want to support an array, a promise and an observable. This will return all types as a promise
     * @param {?} response
     * @return {?}
     */
    TreeGridService.prototype.getNormalizedChildren = /**
     * We want to support an array, a promise and an observable. This will return all types as a promise
     * @param {?} response
     * @return {?}
     */
    function (response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(response instanceof Observable)) return [3 /*break*/, 2];
                        return [4 /*yield*/, response.toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        if (!(response instanceof Promise)) return [3 /*break*/, 4];
                        return [4 /*yield*/, response];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: 
                    // if it is an array then make it an observable
                    return [2 /*return*/, response];
                }
            });
        });
    };
    /**
     * Insert the children into the flattened tree at the correct location
     * @param {?} parent
     * @return {?}
     */
    TreeGridService.prototype.insertChildren = /**
     * Insert the children into the flattened tree at the correct location
     * @param {?} parent
     * @return {?}
     */
    function (parent) {
        if (!parent.children) {
            return;
        }
        var /** @type {?} */ row = this.rows$.getValue();
        var /** @type {?} */ index = row.indexOf(parent);
        if (index < 0) {
            return;
        }
        // Skip duplicates - this could happen if an already expanded child has been inserted
        var /** @type {?} */ uniqueChildren = parent.children.filter(function (child) { return row.indexOf(child) === -1; });
        var /** @type {?} */ childRows = this.getFlattenedTree(uniqueChildren, parent);
        row.splice.apply(row, tslib_1.__spread([index + 1, 0], childRows));
    };
    /**
     * Remove all rows from the flattened tree
     * @param {?} parent
     * @return {?}
     */
    TreeGridService.prototype.removeChildren = /**
     * Remove all rows from the flattened tree
     * @param {?} parent
     * @return {?}
     */
    function (parent) {
        var /** @type {?} */ rows = this.rows$.getValue();
        var /** @type {?} */ index = rows.indexOf(parent);
        if (index < 0) {
            return;
        }
        while (index + 1 < rows.length && rows[index + 1].state.level > parent.state.level) {
            rows.splice(index + 1, 1);
        }
    };
    TreeGridService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    TreeGridService.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    return TreeGridService;
}());
export { TreeGridService };
function TreeGridService_tsickle_Closure_declarations() {
    /**
     * The raw table data
     * @type {?}
     */
    TreeGridService.prototype.data$;
    /**
     * The flattened table data
     * @type {?}
     */
    TreeGridService.prototype.rows$;
    /**
     * The function to load child items
     * @type {?}
     */
    TreeGridService.prototype.loadChildren;
    /**
     * Ensure we destroy all observables correctly
     * @type {?}
     */
    TreeGridService.prototype._onDestroy;
    /** @type {?} */
    TreeGridService.prototype._changeDetector;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ncmlkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy90cmVlLWdyaWQvdHJlZS1ncmlkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHdkMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDOztJQWlCcEQseUJBQW9CLGVBQWtDO1FBQXRELGlCQUVDO1FBRm1CLG9CQUFlLEdBQWYsZUFBZSxDQUFtQjs7OztxQkFYOUMsSUFBSSxlQUFlLENBQWlCLEVBQUUsQ0FBQzs7OztxQkFHdkMsSUFBSSxlQUFlLENBQWlCLEVBQUUsQ0FBQzs7OzswQkFNMUIsSUFBSSxPQUFPLEVBQVE7UUFHcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUE1QyxDQUE0QyxDQUFDLENBQUM7S0FDL0c7SUFFRCx1Q0FBdUM7Ozs7O0lBQ3ZDLHFDQUFXOzs7O0lBQVg7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFB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QyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBekIsQ0FBeUIsQ0FBQyxDQUFDO1FBRWxGLHFCQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRWhFLEdBQUcsQ0FBQyxNQUFNLE9BQVYsR0FBRyxvQkFBUSxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBSyxTQUFTLEdBQUU7Ozs7Ozs7SUFJbkMsd0NBQWM7Ozs7O2NBQUMsTUFBb0I7UUFFdkMscUJBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbkMscUJBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFbkMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDWixNQUFNLENBQUM7U0FDVjtRQUVELE9BQU8sS0FBSyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2pGLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUM3Qjs7O2dCQXJIUixVQUFVOzs7O2dCQVRGLGlCQUFpQjs7MEJBQTFCOztTQVVhLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgVHJlZUdyaWRJdGVtIH0gZnJvbSAnLi90cmVlLWdyaWQtaXRlbS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgVHJlZUdyaWRMb2FkRnVuY3Rpb24gfSBmcm9tICcuL3RyZWUtZ3JpZC1sb2FkLWZ1bmN0aW9uLnR5cGUnO1xuaW1wb3J0IHsgVHJlZUdyaWRTdGF0ZSB9IGZyb20gJy4vdHJlZS1ncmlkLXN0YXRlLmNsYXNzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRyZWVHcmlkU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICAvKiogVGhlIHJhdyB0YWJsZSBkYXRhICovXG4gICAgZGF0YSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFRyZWVHcmlkSXRlbVtdPihbXSk7XG5cbiAgICAvKiogVGhlIGZsYXR0ZW5lZCB0YWJsZSBkYXRhICovXG4gICAgcm93cyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFRyZWVHcmlkSXRlbVtdPihbXSk7XG5cbiAgICAvKiogVGhlIGZ1bmN0aW9uIHRvIGxvYWQgY2hpbGQgaXRlbXMgKi9cbiAgICBsb2FkQ2hpbGRyZW46IFRyZWVHcmlkTG9hZEZ1bmN0aW9uO1xuXG4gICAgLyoqIEVuc3VyZSB3ZSBkZXN0cm95IGFsbCBvYnNlcnZhYmxlcyBjb3JyZWN0bHkgKi9cbiAgICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHRoaXMuZGF0YSQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKGRhdGEgPT4gdGhpcy5yb3dzJC5uZXh0KHRoaXMuZ2V0RmxhdHRlbmVkVHJlZShkYXRhKSkpO1xuICAgIH1cblxuICAgIC8qKiBVbnN1YnNjcmliZSBmcm9tIGFsbCBvYnNlcnZhYmxlcyAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICAvKiogU2V0IHRoZSBleHBhbmRlZCBzdGF0ZSBvZiBhIHJvdyAqL1xuICAgIGFzeW5jIHNldEV4cGFuZGVkKGl0ZW06IFRyZWVHcmlkSXRlbSwgZXhwYW5kZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKGV4cGFuZGVkKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmdldENoaWxkcmVuKGl0ZW0pO1xuICAgICAgICAgICAgdGhpcy5pbnNlcnRDaGlsZHJlbihpdGVtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2hpbGRyZW4oaXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgLyoqIEEgZnVuY3Rpb24gdG8gZmxhdHRlbiB0cmVlIGRhdGEgKi9cbiAgICBwcml2YXRlIGdldEZsYXR0ZW5lZFRyZWUoZGF0YTogVHJlZUdyaWRJdGVtW10sIHBhcmVudD86IFRyZWVHcmlkSXRlbSk6IFRyZWVHcmlkSXRlbVtdIHtcbiAgICAgICAgLy8gZmxhdHRlbiB0aGUgbm9kZXMgYXQgdGhpcyBsZXZlbFxuICAgICAgICByZXR1cm4gZGF0YS5yZWR1Y2UoKHByZXZpb3VzLCBpdGVtLCBpbmRleCkgPT4ge1xuXG4gICAgICAgICAgICBpdGVtLnN0YXRlID0gbmV3IFRyZWVHcmlkU3RhdGUocGFyZW50ID8gcGFyZW50LnN0YXRlLmxldmVsICsgMSA6IDAsIGRhdGEubGVuZ3RoLCBpbmRleCArIDEpO1xuXG4gICAgICAgICAgICAvLyBDb252ZXJ0IGFueSBjaGlsZCBub2Rlc1xuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW4gPSAoaXRlbS5jaGlsZHJlbiAmJiBpdGVtLmV4cGFuZGVkKSA/IHRoaXMuZ2V0RmxhdHRlbmVkVHJlZShpdGVtLmNoaWxkcmVuLCBpdGVtKSA6IFtdO1xuXG4gICAgICAgICAgICAvLyByZXR1cm4gdGhlIG5vZGVzIGluIGEgZmxhdHRlbmVkIGFycmF5XG4gICAgICAgICAgICByZXR1cm4gWy4uLnByZXZpb3VzLCBpdGVtLCAuLi5jaGlsZHJlbl07XG4gICAgICAgIH0sIFtdKTtcbiAgICB9XG5cbiAgICAvKiogTG9hZCBhbnkgY2hpbGRyZW4gZHluYW1pY2FsbHkgKi9cbiAgICBwcml2YXRlIGFzeW5jIGdldENoaWxkcmVuKGl0ZW06IFRyZWVHcmlkSXRlbSk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBpZiAoIWl0ZW0uY2hpbGRyZW4gJiYgdGhpcy5sb2FkQ2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGl0ZW0uc3RhdGUubG9hZGluZyQubmV4dCh0cnVlKTtcblxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpdGVtLmNoaWxkcmVuID0gYXdhaXQgdGhpcy5nZXROb3JtYWxpemVkQ2hpbGRyZW4odGhpcy5sb2FkQ2hpbGRyZW4oaXRlbSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgaXRlbS5zdGF0ZS5sb2FkaW5nJC5uZXh0KGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBXZSB3YW50IHRvIHN1cHBvcnQgYW4gYXJyYXksIGEgcHJvbWlzZSBhbmQgYW4gb2JzZXJ2YWJsZS4gVGhpcyB3aWxsIHJldHVybiBhbGwgdHlwZXMgYXMgYSBwcm9taXNlICovXG4gICAgcHJpdmF0ZSBhc3luYyBnZXROb3JtYWxpemVkQ2hpbGRyZW4ocmVzcG9uc2U6IFRyZWVHcmlkSXRlbVtdIHwgUHJvbWlzZTxUcmVlR3JpZEl0ZW1bXT4gfCBPYnNlcnZhYmxlPFRyZWVHcmlkSXRlbVtdPik6IFByb21pc2U8VHJlZUdyaWRJdGVtW10+IHtcblxuICAgICAgICAvLyBpZiBpdCBpcyBhbHJlYWR5IGFuIG9ic2VydmFibGUgZG8gbm90aGluZ1xuICAgICAgICBpZiAocmVzcG9uc2UgaW5zdGFuY2VvZiBPYnNlcnZhYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgcmVzcG9uc2UudG9Qcm9taXNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBpdCBpcyBhIHByb21pc2Ugd3JhcCBpdCBhcyBhbiBvYnNlcnZhYmxlXG4gICAgICAgIGlmIChyZXNwb25zZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCByZXNwb25zZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIGl0IGlzIGFuIGFycmF5IHRoZW4gbWFrZSBpdCBhbiBvYnNlcnZhYmxlXG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG5cbiAgICAvKiogSW5zZXJ0IHRoZSBjaGlsZHJlbiBpbnRvIHRoZSBmbGF0dGVuZWQgdHJlZSBhdCB0aGUgY29ycmVjdCBsb2NhdGlvbiAqL1xuICAgIHByaXZhdGUgaW5zZXJ0Q2hpbGRyZW4ocGFyZW50OiBUcmVlR3JpZEl0ZW0pOiB2b2lkIHtcbiAgICAgICAgaWYgKCFwYXJlbnQuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJvdyA9IHRoaXMucm93cyQuZ2V0VmFsdWUoKTtcblxuICAgICAgICBjb25zdCBpbmRleCA9IHJvdy5pbmRleE9mKHBhcmVudCk7XG5cbiAgICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2tpcCBkdXBsaWNhdGVzIC0gdGhpcyBjb3VsZCBoYXBwZW4gaWYgYW4gYWxyZWFkeSBleHBhbmRlZCBjaGlsZCBoYXMgYmVlbiBpbnNlcnRlZFxuICAgICAgICBjb25zdCB1bmlxdWVDaGlsZHJlbiA9IHBhcmVudC5jaGlsZHJlbi5maWx0ZXIoY2hpbGQgPT4gcm93LmluZGV4T2YoY2hpbGQpID09PSAtMSk7XG5cbiAgICAgICAgY29uc3QgY2hpbGRSb3dzID0gdGhpcy5nZXRGbGF0dGVuZWRUcmVlKHVuaXF1ZUNoaWxkcmVuLCBwYXJlbnQpO1xuXG4gICAgICAgIHJvdy5zcGxpY2UoaW5kZXggKyAxLCAwLCAuLi5jaGlsZFJvd3MpO1xuICAgIH1cblxuICAgIC8qKiBSZW1vdmUgYWxsIHJvd3MgZnJvbSB0aGUgZmxhdHRlbmVkIHRyZWUgKi9cbiAgICBwcml2YXRlIHJlbW92ZUNoaWxkcmVuKHBhcmVudDogVHJlZUdyaWRJdGVtKTogdm9pZCB7XG5cbiAgICAgICAgY29uc3Qgcm93cyA9IHRoaXMucm93cyQuZ2V0VmFsdWUoKTtcbiAgICAgICAgY29uc3QgaW5kZXggPSByb3dzLmluZGV4T2YocGFyZW50KTtcblxuICAgICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAoaW5kZXggKyAxIDwgcm93cy5sZW5ndGggJiYgcm93c1tpbmRleCArIDFdLnN0YXRlLmxldmVsID4gcGFyZW50LnN0YXRlLmxldmVsKSB7XG4gICAgICAgICAgICByb3dzLnNwbGljZShpbmRleCArIDEsIDEpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19