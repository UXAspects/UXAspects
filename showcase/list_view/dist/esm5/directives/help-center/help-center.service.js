/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
var HelpCenterService = (function () {
    function HelpCenterService() {
        this.items = new BehaviorSubject([]);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    HelpCenterService.prototype.registerItem = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        // get the current items
        var /** @type {?} */ items = this.items.getValue();
        // add the new item to the list
        items.push(item);
        // update the observable
        this.items.next(items);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    HelpCenterService.prototype.unregisterItem = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        // get the current items
        var /** @type {?} */ items = this.items.getValue();
        // remove the item being unregistered
        items = items.filter(function (itm) { return itm !== item; });
        // update the observable
        this.items.next(items);
    };
    HelpCenterService.decorators = [
        { type: Injectable },
    ];
    return HelpCenterService;
}());
export { HelpCenterService };
function HelpCenterService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    HelpCenterService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    HelpCenterService.ctorParameters;
    /** @type {?} */
    HelpCenterService.prototype.items;
}
/**
 * @record
 */
export function HelpCenterItem() { }
function HelpCenterItem_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    HelpCenterItem.prototype.icon;
    /** @type {?} */
    HelpCenterItem.prototype.title;
    /** @type {?|undefined} */
    HelpCenterItem.prototype.select;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC1jZW50ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2hlbHAtY2VudGVyL2hlbHAtY2VudGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7cUJBS1IsSUFBSSxlQUFlLENBQW1CLEVBQUUsQ0FBQzs7Ozs7O0lBRXBGLHdDQUFZOzs7O0lBQVosVUFBYSxJQUFvQjs7UUFHN0IscUJBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7O1FBR2xDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7O1FBR2pCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzFCOzs7OztJQUVELDBDQUFjOzs7O0lBQWQsVUFBZSxJQUFvQjs7UUFHL0IscUJBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7O1FBR2xDLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxLQUFLLElBQUksRUFBWixDQUFZLENBQUMsQ0FBQzs7UUFHMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDMUI7O2dCQTNCSixVQUFVOzs0QkFIWDs7U0FJYSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIZWxwQ2VudGVyU2VydmljZSB7XG5cbiAgICBpdGVtczogQmVoYXZpb3JTdWJqZWN0PEhlbHBDZW50ZXJJdGVtW10+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxIZWxwQ2VudGVySXRlbVtdPihbXSk7XG5cbiAgICByZWdpc3Rlckl0ZW0oaXRlbTogSGVscENlbnRlckl0ZW0pOiB2b2lkIHtcblxuICAgICAgICAvLyBnZXQgdGhlIGN1cnJlbnQgaXRlbXNcbiAgICAgICAgbGV0IGl0ZW1zID0gdGhpcy5pdGVtcy5nZXRWYWx1ZSgpO1xuXG4gICAgICAgIC8vIGFkZCB0aGUgbmV3IGl0ZW0gdG8gdGhlIGxpc3RcbiAgICAgICAgaXRlbXMucHVzaChpdGVtKTtcblxuICAgICAgICAvLyB1cGRhdGUgdGhlIG9ic2VydmFibGVcbiAgICAgICAgdGhpcy5pdGVtcy5uZXh0KGl0ZW1zKTtcbiAgICB9XG5cbiAgICB1bnJlZ2lzdGVySXRlbShpdGVtOiBIZWxwQ2VudGVySXRlbSk6IHZvaWQge1xuXG4gICAgICAgIC8vIGdldCB0aGUgY3VycmVudCBpdGVtc1xuICAgICAgICBsZXQgaXRlbXMgPSB0aGlzLml0ZW1zLmdldFZhbHVlKCk7XG5cbiAgICAgICAgLy8gcmVtb3ZlIHRoZSBpdGVtIGJlaW5nIHVucmVnaXN0ZXJlZFxuICAgICAgICBpdGVtcyA9IGl0ZW1zLmZpbHRlcihpdG0gPT4gaXRtICE9PSBpdGVtKTtcblxuICAgICAgICAvLyB1cGRhdGUgdGhlIG9ic2VydmFibGVcbiAgICAgICAgdGhpcy5pdGVtcy5uZXh0KGl0ZW1zKTtcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSGVscENlbnRlckl0ZW0ge1xuICAgIGljb24/OiBzdHJpbmc7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBzZWxlY3Q/OiAoKSA9PiB2b2lkO1xufSJdfQ==