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
    /** @nocollapse */
    HelpCenterService.ctorParameters = function () { return []; };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC1jZW50ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2hlbHAtY2VudGVyL2hlbHAtY2VudGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7cUJBS1IsSUFBSSxlQUFlLENBQW1CLEVBQUUsQ0FBQzs7Ozs7O0lBRXBGLHdDQUFZOzs7O0lBQVosVUFBYSxJQUFvQjs7UUFHN0IscUJBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7O1FBR2xDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7O1FBR2pCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzFCOzs7OztJQUVELDBDQUFjOzs7O0lBQWQsVUFBZSxJQUFvQjs7UUFHL0IscUJBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7O1FBR2xDLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxLQUFLLElBQUksRUFBWixDQUFZLENBQUMsQ0FBQzs7UUFHMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDMUI7O2dCQTNCSixVQUFVOzs7OzRCQUhYOztTQUlhLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEhlbHBDZW50ZXJTZXJ2aWNlIHtcblxuICAgIGl0ZW1zOiBCZWhhdmlvclN1YmplY3Q8SGVscENlbnRlckl0ZW1bXT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEhlbHBDZW50ZXJJdGVtW10+KFtdKTtcblxuICAgIHJlZ2lzdGVySXRlbShpdGVtOiBIZWxwQ2VudGVySXRlbSk6IHZvaWQge1xuXG4gICAgICAgIC8vIGdldCB0aGUgY3VycmVudCBpdGVtc1xuICAgICAgICBsZXQgaXRlbXMgPSB0aGlzLml0ZW1zLmdldFZhbHVlKCk7XG5cbiAgICAgICAgLy8gYWRkIHRoZSBuZXcgaXRlbSB0byB0aGUgbGlzdFxuICAgICAgICBpdGVtcy5wdXNoKGl0ZW0pO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgb2JzZXJ2YWJsZVxuICAgICAgICB0aGlzLml0ZW1zLm5leHQoaXRlbXMpO1xuICAgIH1cblxuICAgIHVucmVnaXN0ZXJJdGVtKGl0ZW06IEhlbHBDZW50ZXJJdGVtKTogdm9pZCB7XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBjdXJyZW50IGl0ZW1zXG4gICAgICAgIGxldCBpdGVtcyA9IHRoaXMuaXRlbXMuZ2V0VmFsdWUoKTtcblxuICAgICAgICAvLyByZW1vdmUgdGhlIGl0ZW0gYmVpbmcgdW5yZWdpc3RlcmVkXG4gICAgICAgIGl0ZW1zID0gaXRlbXMuZmlsdGVyKGl0bSA9PiBpdG0gIT09IGl0ZW0pO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgb2JzZXJ2YWJsZVxuICAgICAgICB0aGlzLml0ZW1zLm5leHQoaXRlbXMpO1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBIZWxwQ2VudGVySXRlbSB7XG4gICAgaWNvbj86IHN0cmluZztcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHNlbGVjdD86ICgpID0+IHZvaWQ7XG59Il19