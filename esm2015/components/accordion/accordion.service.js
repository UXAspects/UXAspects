/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
export class AccordionService {
    constructor() {
        this.collapseOthers = false;
        this.collapse = new Subject();
    }
    /**
     * @return {?}
     */
    collapseAll() {
        this.collapse.next();
    }
}
AccordionService.decorators = [
    { type: Injectable }
];
function AccordionService_tsickle_Closure_declarations() {
    /** @type {?} */
    AccordionService.prototype.collapseOthers;
    /** @type {?} */
    AccordionService.prototype.collapse;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9hY2NvcmRpb24vYWNjb3JkaW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUd2QyxNQUFNOzs4QkFFd0IsS0FBSzt3QkFDcEIsSUFBSSxPQUFPLEVBQVE7Ozs7O0lBRTlCLFdBQVc7UUFDUCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ3hCOzs7WUFSSixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBY2NvcmRpb25TZXJ2aWNlIHtcblxuICAgIGNvbGxhcHNlT3RoZXJzOiBib29sZWFuID0gZmFsc2U7XG4gICAgY29sbGFwc2UgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29sbGFwc2VBbGwoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29sbGFwc2UubmV4dCgpO1xuICAgIH1cbn0iXX0=