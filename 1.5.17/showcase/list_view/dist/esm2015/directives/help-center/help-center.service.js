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
    { type: Injectable },
];
/** @nocollapse */
HelpCenterService.ctorParameters = () => [];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC1jZW50ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2hlbHAtY2VudGVyL2hlbHAtY2VudGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBR3ZELE1BQU07O3FCQUV5QyxJQUFJLGVBQWUsQ0FBbUIsRUFBRSxDQUFDOzs7Ozs7SUFFcEYsWUFBWSxDQUFDLElBQW9COztRQUc3QixxQkFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7UUFHbEMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7UUFHakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDMUI7Ozs7O0lBRUQsY0FBYyxDQUFDLElBQW9COztRQUcvQixxQkFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7UUFHbEMsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLEdBQUcsS0FBSyxJQUFJLENBQUMsQ0FBQzs7UUFHMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDMUI7OztZQTNCSixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSGVscENlbnRlclNlcnZpY2Uge1xuXG4gICAgaXRlbXM6IEJlaGF2aW9yU3ViamVjdDxIZWxwQ2VudGVySXRlbVtdPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8SGVscENlbnRlckl0ZW1bXT4oW10pO1xuXG4gICAgcmVnaXN0ZXJJdGVtKGl0ZW06IEhlbHBDZW50ZXJJdGVtKTogdm9pZCB7XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBjdXJyZW50IGl0ZW1zXG4gICAgICAgIGxldCBpdGVtcyA9IHRoaXMuaXRlbXMuZ2V0VmFsdWUoKTtcblxuICAgICAgICAvLyBhZGQgdGhlIG5ldyBpdGVtIHRvIHRoZSBsaXN0XG4gICAgICAgIGl0ZW1zLnB1c2goaXRlbSk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBvYnNlcnZhYmxlXG4gICAgICAgIHRoaXMuaXRlbXMubmV4dChpdGVtcyk7XG4gICAgfVxuXG4gICAgdW5yZWdpc3Rlckl0ZW0oaXRlbTogSGVscENlbnRlckl0ZW0pOiB2b2lkIHtcblxuICAgICAgICAvLyBnZXQgdGhlIGN1cnJlbnQgaXRlbXNcbiAgICAgICAgbGV0IGl0ZW1zID0gdGhpcy5pdGVtcy5nZXRWYWx1ZSgpO1xuXG4gICAgICAgIC8vIHJlbW92ZSB0aGUgaXRlbSBiZWluZyB1bnJlZ2lzdGVyZWRcbiAgICAgICAgaXRlbXMgPSBpdGVtcy5maWx0ZXIoaXRtID0+IGl0bSAhPT0gaXRlbSk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBvYnNlcnZhYmxlXG4gICAgICAgIHRoaXMuaXRlbXMubmV4dChpdGVtcyk7XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEhlbHBDZW50ZXJJdGVtIHtcbiAgICBpY29uPzogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgc2VsZWN0PzogKCkgPT4gdm9pZDtcbn0iXX0=