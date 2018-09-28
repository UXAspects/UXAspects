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
export class TreeGridService {
    /**
     * @param {?} _changeDetector
     */
    constructor(_changeDetector) {
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
        this.data$.pipe(takeUntil(this._onDestroy)).subscribe(data => this.rows$.next(this.getFlattenedTree(data)));
    }
    /**
     * Unsubscribe from all observables
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * Set the expanded state of a row
     * @param {?} item
     * @param {?} expanded
     * @return {?}
     */
    setExpanded(item, expanded) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (expanded) {
                yield this.getChildren(item);
                this.insertChildren(item);
            }
            else {
                this.removeChildren(item);
            }
            this._changeDetector.detectChanges();
        });
    }
    /**
     * A function to flatten tree data
     * @param {?} data
     * @param {?=} parent
     * @return {?}
     */
    getFlattenedTree(data, parent) {
        // flatten the nodes at this level
        return data.reduce((previous, item, index) => {
            item.state = new TreeGridState(parent ? parent.state.level + 1 : 0, data.length, index + 1);
            // Convert any child nodes
            const /** @type {?} */ children = (item.children && item.expanded) ? this.getFlattenedTree(item.children, item) : [];
            // return the nodes in a flattened array
            return [...previous, item, ...children];
        }, []);
    }
    /**
     * Load any children dynamically
     * @param {?} item
     * @return {?}
     */
    getChildren(item) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!item.children && this.loadChildren) {
                item.state.loading$.next(true);
                try {
                    item.children = yield this.getNormalizedChildren(this.loadChildren(item));
                }
                finally {
                    item.state.loading$.next(false);
                }
            }
        });
    }
    /**
     * We want to support an array, a promise and an observable. This will return all types as a promise
     * @param {?} response
     * @return {?}
     */
    getNormalizedChildren(response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // if it is already an observable do nothing
            if (response instanceof Observable) {
                return yield response.toPromise();
            }
            // if it is a promise wrap it as an observable
            if (response instanceof Promise) {
                return yield response;
            }
            // if it is an array then make it an observable
            return response;
        });
    }
    /**
     * Insert the children into the flattened tree at the correct location
     * @param {?} parent
     * @return {?}
     */
    insertChildren(parent) {
        if (!parent.children) {
            return;
        }
        const /** @type {?} */ row = this.rows$.getValue();
        const /** @type {?} */ index = row.indexOf(parent);
        if (index < 0) {
            return;
        }
        // Skip duplicates - this could happen if an already expanded child has been inserted
        const /** @type {?} */ uniqueChildren = parent.children.filter(child => row.indexOf(child) === -1);
        const /** @type {?} */ childRows = this.getFlattenedTree(uniqueChildren, parent);
        row.splice(index + 1, 0, ...childRows);
    }
    /**
     * Remove all rows from the flattened tree
     * @param {?} parent
     * @return {?}
     */
    removeChildren(parent) {
        const /** @type {?} */ rows = this.rows$.getValue();
        const /** @type {?} */ index = rows.indexOf(parent);
        if (index < 0) {
            return;
        }
        while (index + 1 < rows.length && rows[index + 1].state.level > parent.state.level) {
            rows.splice(index + 1, 1);
        }
    }
}
TreeGridService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
TreeGridService.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ncmlkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy90cmVlLWdyaWQvdHJlZS1ncmlkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHdkMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBR3hELE1BQU07Ozs7SUFjRixZQUFvQixlQUFrQztRQUFsQyxvQkFBZSxHQUFmLGVBQWUsQ0FBbUI7Ozs7cUJBWDlDLElBQUksZUFBZSxDQUFpQixFQUFFLENBQUM7Ozs7cUJBR3ZDLElBQUksZUFBZSxDQUFpQixFQUFFLENBQUM7Ozs7MEJBTTFCLElBQUksT0FBTyxFQUFRO1FBR3BDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQy9HOzs7OztJQUdELFdBQVc7UUFDUCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDOUI7Ozs7Ozs7SUFHSyxXQUFXLENB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Q0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWxGLHVCQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRWhFLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxTQUFTLENBQUMsQ0FBQzs7Ozs7OztJQUluQyxjQUFjLENBQUMsTUFBb0I7UUFFdkMsdUJBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbkMsdUJBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFbkMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDWixNQUFNLENBQUM7U0FDVjtRQUVELE9BQU8sS0FBSyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2pGLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUM3Qjs7OztZQXJIUixVQUFVOzs7O1lBVEYsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IFRyZWVHcmlkSXRlbSB9IGZyb20gJy4vdHJlZS1ncmlkLWl0ZW0uaW50ZXJmYWNlJztcbmltcG9ydCB7IFRyZWVHcmlkTG9hZEZ1bmN0aW9uIH0gZnJvbSAnLi90cmVlLWdyaWQtbG9hZC1mdW5jdGlvbi50eXBlJztcbmltcG9ydCB7IFRyZWVHcmlkU3RhdGUgfSBmcm9tICcuL3RyZWUtZ3JpZC1zdGF0ZS5jbGFzcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUcmVlR3JpZFNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgLyoqIFRoZSByYXcgdGFibGUgZGF0YSAqL1xuICAgIGRhdGEkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxUcmVlR3JpZEl0ZW1bXT4oW10pO1xuXG4gICAgLyoqIFRoZSBmbGF0dGVuZWQgdGFibGUgZGF0YSAqL1xuICAgIHJvd3MkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxUcmVlR3JpZEl0ZW1bXT4oW10pO1xuXG4gICAgLyoqIFRoZSBmdW5jdGlvbiB0byBsb2FkIGNoaWxkIGl0ZW1zICovXG4gICAgbG9hZENoaWxkcmVuOiBUcmVlR3JpZExvYWRGdW5jdGlvbjtcblxuICAgIC8qKiBFbnN1cmUgd2UgZGVzdHJveSBhbGwgb2JzZXJ2YWJsZXMgY29ycmVjdGx5ICovXG4gICAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgICAgICB0aGlzLmRhdGEkLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZShkYXRhID0+IHRoaXMucm93cyQubmV4dCh0aGlzLmdldEZsYXR0ZW5lZFRyZWUoZGF0YSkpKTtcbiAgICB9XG5cbiAgICAvKiogVW5zdWJzY3JpYmUgZnJvbSBhbGwgb2JzZXJ2YWJsZXMgKi9cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgLyoqIFNldCB0aGUgZXhwYW5kZWQgc3RhdGUgb2YgYSByb3cgKi9cbiAgICBhc3luYyBzZXRFeHBhbmRlZChpdGVtOiBUcmVlR3JpZEl0ZW0sIGV4cGFuZGVkOiBib29sZWFuKSB7XG4gICAgICAgIGlmIChleHBhbmRlZCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRDaGlsZHJlbihpdGVtKTtcbiAgICAgICAgICAgIHRoaXMuaW5zZXJ0Q2hpbGRyZW4oaXRlbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUNoaWxkcmVuKGl0ZW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIC8qKiBBIGZ1bmN0aW9uIHRvIGZsYXR0ZW4gdHJlZSBkYXRhICovXG4gICAgcHJpdmF0ZSBnZXRGbGF0dGVuZWRUcmVlKGRhdGE6IFRyZWVHcmlkSXRlbVtdLCBwYXJlbnQ/OiBUcmVlR3JpZEl0ZW0pOiBUcmVlR3JpZEl0ZW1bXSB7XG4gICAgICAgIC8vIGZsYXR0ZW4gdGhlIG5vZGVzIGF0IHRoaXMgbGV2ZWxcbiAgICAgICAgcmV0dXJuIGRhdGEucmVkdWNlKChwcmV2aW91cywgaXRlbSwgaW5kZXgpID0+IHtcblxuICAgICAgICAgICAgaXRlbS5zdGF0ZSA9IG5ldyBUcmVlR3JpZFN0YXRlKHBhcmVudCA/IHBhcmVudC5zdGF0ZS5sZXZlbCArIDEgOiAwLCBkYXRhLmxlbmd0aCwgaW5kZXggKyAxKTtcblxuICAgICAgICAgICAgLy8gQ29udmVydCBhbnkgY2hpbGQgbm9kZXNcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuID0gKGl0ZW0uY2hpbGRyZW4gJiYgaXRlbS5leHBhbmRlZCkgPyB0aGlzLmdldEZsYXR0ZW5lZFRyZWUoaXRlbS5jaGlsZHJlbiwgaXRlbSkgOiBbXTtcblxuICAgICAgICAgICAgLy8gcmV0dXJuIHRoZSBub2RlcyBpbiBhIGZsYXR0ZW5lZCBhcnJheVxuICAgICAgICAgICAgcmV0dXJuIFsuLi5wcmV2aW91cywgaXRlbSwgLi4uY2hpbGRyZW5dO1xuICAgICAgICB9LCBbXSk7XG4gICAgfVxuXG4gICAgLyoqIExvYWQgYW55IGNoaWxkcmVuIGR5bmFtaWNhbGx5ICovXG4gICAgcHJpdmF0ZSBhc3luYyBnZXRDaGlsZHJlbihpdGVtOiBUcmVlR3JpZEl0ZW0pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgaWYgKCFpdGVtLmNoaWxkcmVuICYmIHRoaXMubG9hZENoaWxkcmVuKSB7XG4gICAgICAgICAgICBpdGVtLnN0YXRlLmxvYWRpbmckLm5leHQodHJ1ZSk7XG5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaXRlbS5jaGlsZHJlbiA9IGF3YWl0IHRoaXMuZ2V0Tm9ybWFsaXplZENoaWxkcmVuKHRoaXMubG9hZENoaWxkcmVuKGl0ZW0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIGl0ZW0uc3RhdGUubG9hZGluZyQubmV4dChmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogV2Ugd2FudCB0byBzdXBwb3J0IGFuIGFycmF5LCBhIHByb21pc2UgYW5kIGFuIG9ic2VydmFibGUuIFRoaXMgd2lsbCByZXR1cm4gYWxsIHR5cGVzIGFzIGEgcHJvbWlzZSAqL1xuICAgIHByaXZhdGUgYXN5bmMgZ2V0Tm9ybWFsaXplZENoaWxkcmVuKHJlc3BvbnNlOiBUcmVlR3JpZEl0ZW1bXSB8IFByb21pc2U8VHJlZUdyaWRJdGVtW10+IHwgT2JzZXJ2YWJsZTxUcmVlR3JpZEl0ZW1bXT4pOiBQcm9taXNlPFRyZWVHcmlkSXRlbVtdPiB7XG5cbiAgICAgICAgLy8gaWYgaXQgaXMgYWxyZWFkeSBhbiBvYnNlcnZhYmxlIGRvIG5vdGhpbmdcbiAgICAgICAgaWYgKHJlc3BvbnNlIGluc3RhbmNlb2YgT2JzZXJ2YWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHJlc3BvbnNlLnRvUHJvbWlzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgaXQgaXMgYSBwcm9taXNlIHdyYXAgaXQgYXMgYW4gb2JzZXJ2YWJsZVxuICAgICAgICBpZiAocmVzcG9uc2UgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgcmVzcG9uc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBpdCBpcyBhbiBhcnJheSB0aGVuIG1ha2UgaXQgYW4gb2JzZXJ2YWJsZVxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgLyoqIEluc2VydCB0aGUgY2hpbGRyZW4gaW50byB0aGUgZmxhdHRlbmVkIHRyZWUgYXQgdGhlIGNvcnJlY3QgbG9jYXRpb24gKi9cbiAgICBwcml2YXRlIGluc2VydENoaWxkcmVuKHBhcmVudDogVHJlZUdyaWRJdGVtKTogdm9pZCB7XG4gICAgICAgIGlmICghcGFyZW50LmNoaWxkcmVuKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByb3cgPSB0aGlzLnJvd3MkLmdldFZhbHVlKCk7XG5cbiAgICAgICAgY29uc3QgaW5kZXggPSByb3cuaW5kZXhPZihwYXJlbnQpO1xuXG4gICAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNraXAgZHVwbGljYXRlcyAtIHRoaXMgY291bGQgaGFwcGVuIGlmIGFuIGFscmVhZHkgZXhwYW5kZWQgY2hpbGQgaGFzIGJlZW4gaW5zZXJ0ZWRcbiAgICAgICAgY29uc3QgdW5pcXVlQ2hpbGRyZW4gPSBwYXJlbnQuY2hpbGRyZW4uZmlsdGVyKGNoaWxkID0+IHJvdy5pbmRleE9mKGNoaWxkKSA9PT0gLTEpO1xuXG4gICAgICAgIGNvbnN0IGNoaWxkUm93cyA9IHRoaXMuZ2V0RmxhdHRlbmVkVHJlZSh1bmlxdWVDaGlsZHJlbiwgcGFyZW50KTtcblxuICAgICAgICByb3cuc3BsaWNlKGluZGV4ICsgMSwgMCwgLi4uY2hpbGRSb3dzKTtcbiAgICB9XG5cbiAgICAvKiogUmVtb3ZlIGFsbCByb3dzIGZyb20gdGhlIGZsYXR0ZW5lZCB0cmVlICovXG4gICAgcHJpdmF0ZSByZW1vdmVDaGlsZHJlbihwYXJlbnQ6IFRyZWVHcmlkSXRlbSk6IHZvaWQge1xuXG4gICAgICAgIGNvbnN0IHJvd3MgPSB0aGlzLnJvd3MkLmdldFZhbHVlKCk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gcm93cy5pbmRleE9mKHBhcmVudCk7XG5cbiAgICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUgKGluZGV4ICsgMSA8IHJvd3MubGVuZ3RoICYmIHJvd3NbaW5kZXggKyAxXS5zdGF0ZS5sZXZlbCA+IHBhcmVudC5zdGF0ZS5sZXZlbCkge1xuICAgICAgICAgICAgcm93cy5zcGxpY2UoaW5kZXggKyAxLCAxKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==