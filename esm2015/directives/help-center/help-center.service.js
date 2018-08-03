/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export class HelpCenterService {
    constructor() {
        this.items = new BehaviorSubject([]);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    registerItem(item) {
        // get the current items
        let /** @type {?} */ items = this.items.getValue();
        // add the new item to the list
        items.push(item);
        // update the observable
        this.items.next(items);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    unregisterItem(item) {
        // get the current items
        let /** @type {?} */ items = this.items.getValue();
        // remove the item being unregistered
        items = items.filter(itm => itm !== item);
        // update the observable
        this.items.next(items);
    }
}
HelpCenterService.decorators = [
    { type: Injectable }
];
function HelpCenterService_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC1jZW50ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2hlbHAtY2VudGVyL2hlbHAtY2VudGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBR3ZELE1BQU07O3FCQUV5QyxJQUFJLGVBQWUsQ0FBbUIsRUFBRSxDQUFDOzs7Ozs7SUFFcEYsWUFBWSxDQUFDLElBQW9COztRQUc3QixxQkFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7UUFHbEMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7UUFHakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDMUI7Ozs7O0lBRUQsY0FBYyxDQUFDLElBQW9COztRQUcvQixxQkFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7UUFHbEMsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLENBQUM7O1FBRzFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzFCOzs7WUEzQkosVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEhlbHBDZW50ZXJTZXJ2aWNlIHtcblxuICAgIGl0ZW1zOiBCZWhhdmlvclN1YmplY3Q8SGVscENlbnRlckl0ZW1bXT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEhlbHBDZW50ZXJJdGVtW10+KFtdKTtcblxuICAgIHJlZ2lzdGVySXRlbShpdGVtOiBIZWxwQ2VudGVySXRlbSk6IHZvaWQge1xuXG4gICAgICAgIC8vIGdldCB0aGUgY3VycmVudCBpdGVtc1xuICAgICAgICBsZXQgaXRlbXMgPSB0aGlzLml0ZW1zLmdldFZhbHVlKCk7XG5cbiAgICAgICAgLy8gYWRkIHRoZSBuZXcgaXRlbSB0byB0aGUgbGlzdFxuICAgICAgICBpdGVtcy5wdXNoKGl0ZW0pO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgb2JzZXJ2YWJsZVxuICAgICAgICB0aGlzLml0ZW1zLm5leHQoaXRlbXMpO1xuICAgIH1cblxuICAgIHVucmVnaXN0ZXJJdGVtKGl0ZW06IEhlbHBDZW50ZXJJdGVtKTogdm9pZCB7XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBjdXJyZW50IGl0ZW1zXG4gICAgICAgIGxldCBpdGVtcyA9IHRoaXMuaXRlbXMuZ2V0VmFsdWUoKTtcblxuICAgICAgICAvLyByZW1vdmUgdGhlIGl0ZW0gYmVpbmcgdW5yZWdpc3RlcmVkXG4gICAgICAgIGl0ZW1zID0gaXRlbXMuZmlsdGVyKGl0bSA9PiBpdG0gIT09IGl0ZW0pO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgb2JzZXJ2YWJsZVxuICAgICAgICB0aGlzLml0ZW1zLm5leHQoaXRlbXMpO1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBIZWxwQ2VudGVySXRlbSB7XG4gICAgaWNvbj86IHN0cmluZztcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHNlbGVjdD86ICgpID0+IHZvaWQ7XG59Il19