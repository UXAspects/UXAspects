/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, Input } from '@angular/core';
import { HelpCenterService } from './help-center.service';
export class HelpCenterItemDirective {
    /**
     * @param {?} _helpCenterService
     */
    constructor(_helpCenterService) {
        this._helpCenterService = _helpCenterService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // register the item in the service
        this._helpCenterService.registerItem(this.uxHelpCenterItem);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        // remove this item when it is destroyed
        this._helpCenterService.unregisterItem(this.uxHelpCenterItem);
    }
}
HelpCenterItemDirective.decorators = [
    { type: Directive, args: [{ selector: '[uxHelpCenterItem]' },] },
];
/** @nocollapse */
HelpCenterItemDirective.ctorParameters = () => [
    { type: HelpCenterService, },
];
HelpCenterItemDirective.propDecorators = {
    "uxHelpCenterItem": [{ type: Input },],
};
function HelpCenterItemDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    HelpCenterItemDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    HelpCenterItemDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    HelpCenterItemDirective.propDecorators;
    /** @type {?} */
    HelpCenterItemDirective.prototype.uxHelpCenterItem;
    /** @type {?} */
    HelpCenterItemDirective.prototype._helpCenterService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC1jZW50ZXItaXRlbS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9oZWxwLWNlbnRlci9oZWxwLWNlbnRlci1pdGVtLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxpQkFBaUIsRUFBa0IsTUFBTSx1QkFBdUIsQ0FBQztBQUcxRSxNQUFNOzs7O0lBSUYsWUFBb0Isa0JBQXFDO1FBQXJDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7S0FBSzs7OztJQUU5RCxRQUFROztRQUdKLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7S0FDL0Q7Ozs7SUFFRCxXQUFXOztRQUVQLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7S0FDakU7OztZQWhCSixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsb0JBQW9CLEVBQUU7Ozs7WUFGcEMsaUJBQWlCOzs7aUNBS3JCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSGVscENlbnRlclNlcnZpY2UsIEhlbHBDZW50ZXJJdGVtIH0gZnJvbSAnLi9oZWxwLWNlbnRlci5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3V4SGVscENlbnRlckl0ZW1dJyB9KVxuZXhwb3J0IGNsYXNzIEhlbHBDZW50ZXJJdGVtRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgdXhIZWxwQ2VudGVySXRlbTogSGVscENlbnRlckl0ZW07XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9oZWxwQ2VudGVyU2VydmljZTogSGVscENlbnRlclNlcnZpY2UpIHsgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gcmVnaXN0ZXIgdGhlIGl0ZW0gaW4gdGhlIHNlcnZpY2VcbiAgICAgICAgdGhpcy5faGVscENlbnRlclNlcnZpY2UucmVnaXN0ZXJJdGVtKHRoaXMudXhIZWxwQ2VudGVySXRlbSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIC8vIHJlbW92ZSB0aGlzIGl0ZW0gd2hlbiBpdCBpcyBkZXN0cm95ZWRcbiAgICAgICAgdGhpcy5faGVscENlbnRlclNlcnZpY2UudW5yZWdpc3Rlckl0ZW0odGhpcy51eEhlbHBDZW50ZXJJdGVtKTtcbiAgICB9XG59Il19