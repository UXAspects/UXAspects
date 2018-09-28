/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var NavigationService = /** @class */ (function () {
    function NavigationService() {
        this.autoCollapse = true;
    }
    /**
     * @param {?} source
     * @param {?} expanded
     * @return {?}
     */
    NavigationService.prototype.setExpanded = /**
     * @param {?} source
     * @param {?} expanded
     * @return {?}
     */
    function (source, expanded) {
        if (expanded && this.autoCollapse) {
            this.collapseSiblings(source);
        }
    };
    /**
     * @param {?} source
     * @return {?}
     */
    NavigationService.prototype.collapseSiblings = /**
     * @param {?} source
     * @return {?}
     */
    function (source) {
        var /** @type {?} */ siblings = this.items;
        try {
            for (var _a = tslib_1.__values(this.items), _b = _a.next(); !_b.done; _b = _a.next()) {
                var item = _b.value;
                var /** @type {?} */ parent_1 = this.getParent(source, item);
                if (parent_1) {
                    siblings = parent_1.children;
                    break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            for (var siblings_1 = tslib_1.__values(siblings), siblings_1_1 = siblings_1.next(); !siblings_1_1.done; siblings_1_1 = siblings_1.next()) {
                var item = siblings_1_1.value;
                if (item !== source) {
                    this.collapseAll(item);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (siblings_1_1 && !siblings_1_1.done && (_d = siblings_1.return)) _d.call(siblings_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var e_1, _c, e_2, _d;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    NavigationService.prototype.collapseAll = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        item.expanded = false;
        if (item.children) {
            try {
                for (var _a = tslib_1.__values(item.children), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var child = _b.value;
                    this.collapseAll(child);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        var e_3, _c;
    };
    /**
     * @param {?} target
     * @param {?} item
     * @return {?}
     */
    NavigationService.prototype.getParent = /**
     * @param {?} target
     * @param {?} item
     * @return {?}
     */
    function (target, item) {
        if (item.children) {
            try {
                for (var _a = tslib_1.__values(item.children), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var child = _b.value;
                    if (child === target) {
                        return item;
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
        return null;
        var e_4, _c;
    };
    NavigationService.decorators = [
        { type: Injectable }
    ];
    return NavigationService;
}());
export { NavigationService };
function NavigationService_tsickle_Closure_declarations() {
    /** @type {?} */
    NavigationService.prototype.items;
    /** @type {?} */
    NavigationService.prototype.autoCollapse;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7NEJBUWYsSUFBSTs7Ozs7OztJQUU1Qix1Q0FBVzs7Ozs7SUFBWCxVQUFZLE1BQXNCLEVBQUUsUUFBaUI7UUFDakQsRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNqQztLQUNKOzs7OztJQUVPLDRDQUFnQjs7OztjQUFDLE1BQXNCO1FBQzNDLHFCQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDOztZQUMxQixHQUFHLENBQUMsQ0FBYSxJQUFBLEtBQUEsaUJBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQSxnQkFBQTtnQkFBdEIsSUFBSSxJQUFJLFdBQUE7Z0JBQ1QscUJBQU0sUUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUM1QyxFQUFFLENBQUMsQ0FBQyxRQUFNLENBQUMsQ0FBQyxDQUFDO29CQUNULFFBQVEsR0FBRyxRQUFNLENBQUMsUUFBUSxDQUFDO29CQUMzQixLQUFLLENBQUM7aUJBQ1Q7YUFDSjs7Ozs7Ozs7OztZQUVELEdBQUcsQ0FBQyxDQUFhLElBQUEsYUFBQSxpQkFBQSxRQUFRLENBQUEsa0NBQUE7Z0JBQXBCLElBQUksSUFBSSxxQkFBQTtnQkFDVCxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDMUI7YUFDSjs7Ozs7Ozs7Ozs7Ozs7O0lBR0csdUNBQVc7Ozs7Y0FBQyxJQUFvQjtRQUNwQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7Z0JBQ2hCLEdBQUcsQ0FBQyxDQUFjLElBQUEsS0FBQSxpQkFBQSxJQUFJLENBQUMsUUFBUSxDQUFBLGdCQUFBO29CQUExQixJQUFJLEtBQUssV0FBQTtvQkFDVixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUMzQjs7Ozs7Ozs7O1NBQ0o7Ozs7Ozs7O0lBR0cscUNBQVM7Ozs7O2NBQUMsTUFBc0IsRUFBRSxJQUFvQjtRQUMxRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7Z0JBQ2hCLEdBQUcsQ0FBQyxDQUFjLElBQUEsS0FBQSxpQkFBQSxJQUFJLENBQUMsUUFBUSxDQUFBLGdCQUFBO29CQUExQixJQUFJLEtBQUssV0FBQTtvQkFDVixFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQzt3QkFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQztxQkFDZjtpQkFDSjs7Ozs7Ozs7O1NBQ0o7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDOzs7O2dCQWhEbkIsVUFBVTs7NEJBSFg7O1NBSWEsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkl0ZW0gfSBmcm9tICcuL25hdmlnYXRpb24taXRlbS5pbmZlcmZhY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvblNlcnZpY2Uge1xuXG4gICAgaXRlbXM6IE5hdmlnYXRpb25JdGVtW107XG5cbiAgICBhdXRvQ29sbGFwc2U6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgc2V0RXhwYW5kZWQoc291cmNlOiBOYXZpZ2F0aW9uSXRlbSwgZXhwYW5kZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgaWYgKGV4cGFuZGVkICYmIHRoaXMuYXV0b0NvbGxhcHNlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbGxhcHNlU2libGluZ3Moc291cmNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY29sbGFwc2VTaWJsaW5ncyhzb3VyY2U6IE5hdmlnYXRpb25JdGVtKTogdm9pZCB7XG4gICAgICAgIGxldCBzaWJsaW5ncyA9IHRoaXMuaXRlbXM7XG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2YgdGhpcy5pdGVtcykge1xuICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5nZXRQYXJlbnQoc291cmNlLCBpdGVtKTtcbiAgICAgICAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgICAgICAgICBzaWJsaW5ncyA9IHBhcmVudC5jaGlsZHJlbjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2Ygc2libGluZ3MpIHtcbiAgICAgICAgICAgIGlmIChpdGVtICE9PSBzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxhcHNlQWxsKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb2xsYXBzZUFsbChpdGVtOiBOYXZpZ2F0aW9uSXRlbSk6IHZvaWQge1xuICAgICAgICBpdGVtLmV4cGFuZGVkID0gZmFsc2U7XG4gICAgICAgIGlmIChpdGVtLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBpdGVtLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsYXBzZUFsbChjaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFBhcmVudCh0YXJnZXQ6IE5hdmlnYXRpb25JdGVtLCBpdGVtOiBOYXZpZ2F0aW9uSXRlbSk6IE5hdmlnYXRpb25JdGVtIHtcbiAgICAgICAgaWYgKGl0ZW0uY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNoaWxkIG9mIGl0ZW0uY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQgPT09IHRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59Il19