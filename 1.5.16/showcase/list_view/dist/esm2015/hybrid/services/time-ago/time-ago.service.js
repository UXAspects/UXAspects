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
    { type: Injectable },
];
/** @nocollapse */
TimeAgoService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['timeAgoService',] },] },
];
function TimeAgoService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    TimeAgoService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    TimeAgoService.ctorParameters;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1hZ28uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJoeWJyaWQvc2VydmljZXMvdGltZS1hZ28vdGltZS1hZ28uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQVksTUFBTSxlQUFlLENBQUM7QUFJN0QsTUFBTTs7OztJQUVGLFlBQThDO1FBQUEsb0JBQWUsR0FBZixlQUFlO0tBQXNCOzs7OztJQUVuRixVQUFVLENBQUMsT0FBOEI7UUFDckMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDNUM7Ozs7OztJQUVELFNBQVMsQ0FBQyxJQUFVLEVBQUUsT0FBYTtRQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ3hEOzs7OztJQUVELFlBQVksQ0FBQyxNQUFZO1FBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNwRDs7O1lBZkosVUFBVTs7Ozs0Q0FHTSxNQUFNLFNBQUMsZ0JBQWdCOzs7Ozs7Ozs7Ozs7Ozs7OztBQWdCeEMsTUFBTSxnQ0FBZ0MsUUFBa0I7SUFDcEQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztDQUN6QztBQUVELE1BQU0sQ0FBQyx1QkFBTSxzQkFBc0IsR0FBRztJQUNsQyxPQUFPLEVBQUUsZ0JBQWdCO0lBQ3pCLFVBQVUsRUFBRSxxQkFBcUI7SUFDakMsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDO0NBQ3RCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJVGltZUFnb1NlcnZpY2UsIFRpbWVBZ29Mb2NhbGl6ZWRUaW1lcyB9IGZyb20gJy4vdGltZS1hZ28uaW50ZXJmYWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRpbWVBZ29TZXJ2aWNlIGltcGxlbWVudHMgSVRpbWVBZ29TZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoJ3RpbWVBZ29TZXJ2aWNlJykgcHJpdmF0ZSBfdGltZUFnb1NlcnZpY2U6IElUaW1lQWdvU2VydmljZSkgeyB9XG5cbiAgICBzZXRTdHJpbmdzKHN0cmluZ3M6IFRpbWVBZ29Mb2NhbGl6ZWRUaW1lcyk6IHZvaWQge1xuICAgICAgICB0aGlzLl90aW1lQWdvU2VydmljZS5zZXRTdHJpbmdzKHN0cmluZ3MpO1xuICAgIH1cblxuICAgIHRpbWVTaW5jZShwYXN0OiBEYXRlLCBwcmVzZW50OiBEYXRlKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RpbWVBZ29TZXJ2aWNlLnRpbWVTaW5jZShwYXN0LCBwcmVzZW50KTtcbiAgICB9XG5cbiAgICB0aW1lU2luY2VOb3cobW9tZW50OiBEYXRlKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RpbWVBZ29TZXJ2aWNlLnRpbWVTaW5jZU5vdyhtb21lbnQpO1xuICAgIH1cblxufVxuXG5leHBvcnQgZnVuY3Rpb24gdGltZUFnb1NlcnZpY2VGYWN0b3J5KGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgIHJldHVybiBpbmplY3Rvci5nZXQoJ3RpbWVBZ29TZXJ2aWNlJyk7XG59XG5cbmV4cG9ydCBjb25zdCB0aW1lQWdvU2VydmljZVByb3ZpZGVyID0ge1xuICAgIHByb3ZpZGU6ICd0aW1lQWdvU2VydmljZScsXG4gICAgdXNlRmFjdG9yeTogdGltZUFnb1NlcnZpY2VGYWN0b3J5LFxuICAgIGRlcHM6IFsnJGluamVjdG9yJ11cbn07Il19