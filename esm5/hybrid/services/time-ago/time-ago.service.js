/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, Inject } from '@angular/core';
var TimeAgoService = /** @class */ (function () {
    function TimeAgoService(_timeAgoService) {
        this._timeAgoService = _timeAgoService;
    }
    /**
     * @param {?} strings
     * @return {?}
     */
    TimeAgoService.prototype.setStrings = /**
     * @param {?} strings
     * @return {?}
     */
    function (strings) {
        this._timeAgoService.setStrings(strings);
    };
    /**
     * @param {?} past
     * @param {?} present
     * @return {?}
     */
    TimeAgoService.prototype.timeSince = /**
     * @param {?} past
     * @param {?} present
     * @return {?}
     */
    function (past, present) {
        return this._timeAgoService.timeSince(past, present);
    };
    /**
     * @param {?} moment
     * @return {?}
     */
    TimeAgoService.prototype.timeSinceNow = /**
     * @param {?} moment
     * @return {?}
     */
    function (moment) {
        return this._timeAgoService.timeSinceNow(moment);
    };
    TimeAgoService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    TimeAgoService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: ['timeAgoService',] }] }
    ]; };
    return TimeAgoService;
}());
export { TimeAgoService };
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
export var /** @type {?} */ timeAgoServiceProvider = {
    provide: 'timeAgoService',
    useFactory: timeAgoServiceFactory,
    deps: ['$injector']
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1hZ28uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJoeWJyaWQvc2VydmljZXMvdGltZS1hZ28vdGltZS1hZ28uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQVksTUFBTSxlQUFlLENBQUM7O0lBTXpELHdCQUE4QyxlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7S0FBSzs7Ozs7SUFFbkYsbUNBQVU7Ozs7SUFBVixVQUFXLE9BQThCO1FBQ3JDLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzVDOzs7Ozs7SUFFRCxrQ0FBUzs7Ozs7SUFBVCxVQUFVLElBQVUsRUFBRSxPQUFhO1FBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDeEQ7Ozs7O0lBRUQscUNBQVk7Ozs7SUFBWixVQUFhLE1BQVk7UUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3BEOztnQkFmSixVQUFVOzs7O2dEQUdNLE1BQU0sU0FBQyxnQkFBZ0I7O3lCQU54Qzs7U0FJYSxjQUFjOzs7Ozs7Ozs7QUFrQjNCLE1BQU0sZ0NBQWdDLFFBQWtCO0lBQ3BELE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7Q0FDekM7QUFFRCxNQUFNLENBQUMscUJBQU0sc0JBQXNCLEdBQUc7SUFDbEMsT0FBTyxFQUFFLGdCQUFnQjtJQUN6QixVQUFVLEVBQUUscUJBQXFCO0lBQ2pDLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQztDQUN0QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSVRpbWVBZ29TZXJ2aWNlLCBUaW1lQWdvTG9jYWxpemVkVGltZXMgfSBmcm9tICcuL3RpbWUtYWdvLmludGVyZmFjZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUaW1lQWdvU2VydmljZSBpbXBsZW1lbnRzIElUaW1lQWdvU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KCd0aW1lQWdvU2VydmljZScpIHByaXZhdGUgX3RpbWVBZ29TZXJ2aWNlOiBJVGltZUFnb1NlcnZpY2UpIHsgfVxuXG4gICAgc2V0U3RyaW5ncyhzdHJpbmdzOiBUaW1lQWdvTG9jYWxpemVkVGltZXMpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fdGltZUFnb1NlcnZpY2Uuc2V0U3RyaW5ncyhzdHJpbmdzKTtcbiAgICB9XG5cbiAgICB0aW1lU2luY2UocGFzdDogRGF0ZSwgcHJlc2VudDogRGF0ZSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl90aW1lQWdvU2VydmljZS50aW1lU2luY2UocGFzdCwgcHJlc2VudCk7XG4gICAgfVxuXG4gICAgdGltZVNpbmNlTm93KG1vbWVudDogRGF0ZSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl90aW1lQWdvU2VydmljZS50aW1lU2luY2VOb3cobW9tZW50KTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRpbWVBZ29TZXJ2aWNlRmFjdG9yeShpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICByZXR1cm4gaW5qZWN0b3IuZ2V0KCd0aW1lQWdvU2VydmljZScpO1xufVxuXG5leHBvcnQgY29uc3QgdGltZUFnb1NlcnZpY2VQcm92aWRlciA9IHtcbiAgICBwcm92aWRlOiAndGltZUFnb1NlcnZpY2UnLFxuICAgIHVzZUZhY3Rvcnk6IHRpbWVBZ29TZXJ2aWNlRmFjdG9yeSxcbiAgICBkZXBzOiBbJyRpbmplY3RvciddXG59OyJdfQ==