/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, Inject } from '@angular/core';
export class TimeAgoService {
    /**
     * @param {?} _timeAgoService
     */
    constructor(_timeAgoService) {
        this._timeAgoService = _timeAgoService;
    }
    /**
     * @param {?} strings
     * @return {?}
     */
    setStrings(strings) {
        this._timeAgoService.setStrings(strings);
    }
    /**
     * @param {?} past
     * @param {?} present
     * @return {?}
     */
    timeSince(past, present) {
        return this._timeAgoService.timeSince(past, present);
    }
    /**
     * @param {?} moment
     * @return {?}
     */
    timeSinceNow(moment) {
        return this._timeAgoService.timeSinceNow(moment);
    }
}
TimeAgoService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
TimeAgoService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['timeAgoService',] }] }
];
function TimeAgoService_tsickle_Closure_declarations() {
    /** @type {?} */
    TimeAgoService.prototype._timeAgoService;
}
/**
 * @param {?} injector
 * @return {?}
 */
export function timeAgoServiceFactory(injector) {
    return injector.get('timeAgoService');
}
export const /** @type {?} */ timeAgoServiceProvider = {
    provide: 'timeAgoService',
    useFactory: timeAgoServiceFactory,
    deps: ['$injector']
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1hZ28uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJoeWJyaWQvc2VydmljZXMvdGltZS1hZ28vdGltZS1hZ28uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQVksTUFBTSxlQUFlLENBQUM7QUFJN0QsTUFBTTs7OztJQUVGLFlBQThDLGVBQWdDO1FBQWhDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtLQUFLOzs7OztJQUVuRixVQUFVLENBQUMsT0FBOEI7UUFDckMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDNUM7Ozs7OztJQUVELFNBQVMsQ0FBQyxJQUFVLEVBQUUsT0FBYTtRQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ3hEOzs7OztJQUVELFlBQVksQ0FBQyxNQUFZO1FBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNwRDs7O1lBZkosVUFBVTs7Ozs0Q0FHTSxNQUFNLFNBQUMsZ0JBQWdCOzs7Ozs7Ozs7O0FBZ0J4QyxNQUFNLGdDQUFnQyxRQUFrQjtJQUNwRCxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0NBQ3pDO0FBRUQsTUFBTSxDQUFDLHVCQUFNLHNCQUFzQixHQUFHO0lBQ2xDLE9BQU8sRUFBRSxnQkFBZ0I7SUFDekIsVUFBVSxFQUFFLHFCQUFxQjtJQUNqQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUM7Q0FDdEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElUaW1lQWdvU2VydmljZSwgVGltZUFnb0xvY2FsaXplZFRpbWVzIH0gZnJvbSAnLi90aW1lLWFnby5pbnRlcmZhY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVGltZUFnb1NlcnZpY2UgaW1wbGVtZW50cyBJVGltZUFnb1NlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdCgndGltZUFnb1NlcnZpY2UnKSBwcml2YXRlIF90aW1lQWdvU2VydmljZTogSVRpbWVBZ29TZXJ2aWNlKSB7IH1cblxuICAgIHNldFN0cmluZ3Moc3RyaW5nczogVGltZUFnb0xvY2FsaXplZFRpbWVzKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3RpbWVBZ29TZXJ2aWNlLnNldFN0cmluZ3Moc3RyaW5ncyk7XG4gICAgfVxuXG4gICAgdGltZVNpbmNlKHBhc3Q6IERhdGUsIHByZXNlbnQ6IERhdGUpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGltZUFnb1NlcnZpY2UudGltZVNpbmNlKHBhc3QsIHByZXNlbnQpO1xuICAgIH1cblxuICAgIHRpbWVTaW5jZU5vdyhtb21lbnQ6IERhdGUpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGltZUFnb1NlcnZpY2UudGltZVNpbmNlTm93KG1vbWVudCk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aW1lQWdvU2VydmljZUZhY3RvcnkoaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgcmV0dXJuIGluamVjdG9yLmdldCgndGltZUFnb1NlcnZpY2UnKTtcbn1cblxuZXhwb3J0IGNvbnN0IHRpbWVBZ29TZXJ2aWNlUHJvdmlkZXIgPSB7XG4gICAgcHJvdmlkZTogJ3RpbWVBZ29TZXJ2aWNlJyxcbiAgICB1c2VGYWN0b3J5OiB0aW1lQWdvU2VydmljZUZhY3RvcnksXG4gICAgZGVwczogWyckaW5qZWN0b3InXVxufTsiXX0=