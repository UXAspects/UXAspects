/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ColorService } from '../../services/color/index';
var NotificationService = /** @class */ (function () {
    function NotificationService(_colorService) {
        this._colorService = _colorService;
        // provide default options
        this.options = {
            duration: 4,
            height: 100,
            spacing: 10,
            backgroundColor: this._colorService.getColor('accent').toHex(),
            iconColor: this._colorService.getColor('accent').toHex()
        };
        this.direction = 'above';
        this.notifications$ = new BehaviorSubject([]);
    }
    /**
     * @param {?} templateRef
     * @param {?=} options
     * @param {?=} data
     * @return {?}
     */
    NotificationService.prototype.show = /**
     * @param {?} templateRef
     * @param {?=} options
     * @param {?=} data
     * @return {?}
     */
    function (templateRef, options, data) {
        var _this = this;
        if (options === void 0) { options = this.options; }
        if (data === void 0) { data = {}; }
        options = tslib_1.__assign({}, this.options, options);
        var /** @type {?} */ notificationRef = {
            templateRef: templateRef,
            duration: options.duration,
            date: new Date(),
            visible: true,
            height: options.height,
            spacing: options.spacing,
            backgroundColor: options.backgroundColor,
            iconColor: options.iconColor,
            data: data
        };
        var /** @type {?} */ notifications = this.notifications$.getValue();
        if (this.direction === 'above') {
            notifications.unshift(notificationRef);
        }
        else {
            notifications.push(notificationRef);
        }
        this.notifications$.next(notifications);
        // remove notification after delay
        if (options.duration !== 0) {
            setTimeout(function () { return _this.dismiss(notificationRef); }, options.duration * 1000);
        }
        return notificationRef;
    };
    /**
     * @return {?}
     */
    NotificationService.prototype.getHistory = /**
     * @return {?}
     */
    function () {
        return this.notifications$.getValue();
    };
    /**
     * @param {?} notificationRef
     * @return {?}
     */
    NotificationService.prototype.dismiss = /**
     * @param {?} notificationRef
     * @return {?}
     */
    function (notificationRef) {
        notificationRef.visible = false;
        this.notifications$.next(this.notifications$.getValue());
    };
    /**
     * @return {?}
     */
    NotificationService.prototype.dismissAll = /**
     * @return {?}
     */
    function () {
        this.notifications$.getValue().forEach(function (notificationRef) { return notificationRef.visible = false; });
        this.notifications$.next(this.notifications$.getValue());
    };
    NotificationService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    NotificationService.ctorParameters = function () { return [
        { type: ColorService }
    ]; };
    return NotificationService;
}());
export { NotificationService };
function NotificationService_tsickle_Closure_declarations() {
    /** @type {?} */
    NotificationService.prototype.options;
    /** @type {?} */
    NotificationService.prototype.direction;
    /** @type {?} */
    NotificationService.prototype.notifications$;
    /** @type {?} */
    NotificationService.prototype._colorService;
}
/**
 * @record
 */
export function NotificationRef() { }
function NotificationRef_tsickle_Closure_declarations() {
    /** @type {?} */
    NotificationRef.prototype.templateRef;
    /** @type {?} */
    NotificationRef.prototype.duration;
    /** @type {?} */
    NotificationRef.prototype.date;
    /** @type {?|undefined} */
    NotificationRef.prototype.visible;
    /** @type {?|undefined} */
    NotificationRef.prototype.height;
    /** @type {?|undefined} */
    NotificationRef.prototype.spacing;
    /** @type {?|undefined} */
    NotificationRef.prototype.backgroundColor;
    /** @type {?|undefined} */
    NotificationRef.prototype.iconColor;
    /** @type {?} */
    NotificationRef.prototype.data;
}
/**
 * @record
 */
export function NotificationOptions() { }
function NotificationOptions_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    NotificationOptions.prototype.duration;
    /** @type {?|undefined} */
    NotificationOptions.prototype.height;
    /** @type {?|undefined} */
    NotificationOptions.prototype.spacing;
    /** @type {?|undefined} */
    NotificationOptions.prototype.backgroundColor;
    /** @type {?|undefined} */
    NotificationOptions.prototype.iconColor;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFlLE1BQU0sZUFBZSxDQUFDO0FBQ3hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7O0lBa0V0RCw2QkFBb0IsYUFBMkI7UUFBM0Isa0JBQWEsR0FBYixhQUFhLENBQWM7O3VCQTVEaEI7WUFDM0IsUUFBUSxFQUFFLENBQUM7WUFDWCxNQUFNLEVBQUUsR0FBRztZQUNYLE9BQU8sRUFBRSxFQUFFO1lBQ1gsZUFBZSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssRUFBRTtZQUM5RCxTQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxFQUFFO1NBQzNEO3lCQUVzQyxPQUFPOzhCQUVPLElBQUksZUFBZSxDQUFvQixFQUFFLENBQUM7S0FtRDlGOzs7Ozs7O0lBakRELGtDQUFJOzs7Ozs7SUFBSixVQUFLLFdBQTZCLEVBQUUsT0FBMkMsRUFBRSxJQUFpQztRQUFsSCxpQkFnQ0M7UUFoQ21DLHdCQUFBLEVBQUEsVUFBK0IsSUFBSSxDQUFDLE9BQU87UUFBRSxxQkFBQSxFQUFBLFNBQWlDO1FBRTlHLE9BQU8sd0JBQVEsSUFBSSxDQUFDLE9BQU8sRUFBSyxPQUFPLENBQUUsQ0FBQztRQUUxQyxxQkFBTSxlQUFlLEdBQW9CO1lBQ3JDLFdBQVcsRUFBRSxXQUFXO1lBQ3hCLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUTtZQUMxQixJQUFJLEVBQUUsSUFBSSxJQUFJLEVBQUU7WUFDaEIsT0FBTyxFQUFFLElBQUk7WUFDYixNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07WUFDdEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO1lBQ3hCLGVBQWUsRUFBRSxPQUFPLENBQUMsZUFBZTtZQUN4QyxTQUFTLEVBQUUsT0FBTyxDQUFDLFNBQVM7WUFDNUIsSUFBSSxFQUFFLElBQUk7U0FDYixDQUFDO1FBRUYscUJBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFckQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzdCLGFBQWEsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDMUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLGFBQWEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDdkM7UUFFRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzs7UUFHeEMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLFVBQVUsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBN0IsQ0FBNkIsRUFBRSxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDO1NBQzVFO1FBRUQsTUFBTSxDQUFDLGVBQWUsQ0FBQztLQUMxQjs7OztJQUVELHdDQUFVOzs7SUFBVjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ3pDOzs7OztJQUVELHFDQUFPOzs7O0lBQVAsVUFBUSxlQUFnQztRQUNwQyxlQUFlLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNoQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7S0FDNUQ7Ozs7SUFFRCx3Q0FBVTs7O0lBQVY7UUFDSSxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFBLGVBQWUsSUFBSSxPQUFBLGVBQWUsQ0FBQyxPQUFPLEdBQUcsS0FBSyxFQUEvQixDQUErQixDQUFDLENBQUM7UUFDM0YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0tBQzVEOztnQkE5REosVUFBVTs7OztnQkFGRixZQUFZOzs4QkFGckI7O1NBS2EsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xyXG5pbXBvcnQgeyBDb2xvclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jb2xvci9pbmRleCc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb25TZXJ2aWNlIHtcclxuXHJcbiAgICAvLyBwcm92aWRlIGRlZmF1bHQgb3B0aW9uc1xyXG4gICAgb3B0aW9uczogTm90aWZpY2F0aW9uT3B0aW9ucyA9IHtcclxuICAgICAgICBkdXJhdGlvbjogNCxcclxuICAgICAgICBoZWlnaHQ6IDEwMCxcclxuICAgICAgICBzcGFjaW5nOiAxMCxcclxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuX2NvbG9yU2VydmljZS5nZXRDb2xvcignYWNjZW50JykudG9IZXgoKSxcclxuICAgICAgICBpY29uQ29sb3I6IHRoaXMuX2NvbG9yU2VydmljZS5nZXRDb2xvcignYWNjZW50JykudG9IZXgoKVxyXG4gICAgfTtcclxuXHJcbiAgICBkaXJlY3Rpb246IE5vdGlmaWNhdGlvbkxpc3REaXJlY3Rpb24gPSAnYWJvdmUnO1xyXG5cclxuICAgIG5vdGlmaWNhdGlvbnMkOiBCZWhhdmlvclN1YmplY3Q8Tm90aWZpY2F0aW9uUmVmW10+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxOb3RpZmljYXRpb25SZWZbXT4oW10pOyAgICBcclxuXHJcbiAgICBzaG93KHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+LCBvcHRpb25zOiBOb3RpZmljYXRpb25PcHRpb25zID0gdGhpcy5vcHRpb25zLCBkYXRhOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge30pOiBOb3RpZmljYXRpb25SZWYge1xyXG5cclxuICAgICAgICBvcHRpb25zID0geyAuLi50aGlzLm9wdGlvbnMsIC4uLm9wdGlvbnMgfTtcclxuXHJcbiAgICAgICAgY29uc3Qgbm90aWZpY2F0aW9uUmVmOiBOb3RpZmljYXRpb25SZWYgPSB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlUmVmOiB0ZW1wbGF0ZVJlZixcclxuICAgICAgICAgICAgZHVyYXRpb246IG9wdGlvbnMuZHVyYXRpb24sXHJcbiAgICAgICAgICAgIGRhdGU6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgIHZpc2libGU6IHRydWUsXHJcbiAgICAgICAgICAgIGhlaWdodDogb3B0aW9ucy5oZWlnaHQsXHJcbiAgICAgICAgICAgIHNwYWNpbmc6IG9wdGlvbnMuc3BhY2luZyxcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBvcHRpb25zLmJhY2tncm91bmRDb2xvcixcclxuICAgICAgICAgICAgaWNvbkNvbG9yOiBvcHRpb25zLmljb25Db2xvcixcclxuICAgICAgICAgICAgZGF0YTogZGF0YVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IG5vdGlmaWNhdGlvbnMgPSB0aGlzLm5vdGlmaWNhdGlvbnMkLmdldFZhbHVlKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gJ2Fib3ZlJykge1xyXG4gICAgICAgICAgICBub3RpZmljYXRpb25zLnVuc2hpZnQobm90aWZpY2F0aW9uUmVmKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBub3RpZmljYXRpb25zLnB1c2gobm90aWZpY2F0aW9uUmVmKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9ucyQubmV4dChub3RpZmljYXRpb25zKTtcclxuXHJcbiAgICAgICAgLy8gcmVtb3ZlIG5vdGlmaWNhdGlvbiBhZnRlciBkZWxheVxyXG4gICAgICAgIGlmIChvcHRpb25zLmR1cmF0aW9uICE9PSAwKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5kaXNtaXNzKG5vdGlmaWNhdGlvblJlZiksIG9wdGlvbnMuZHVyYXRpb24gKiAxMDAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBub3RpZmljYXRpb25SZWY7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SGlzdG9yeSgpOiBOb3RpZmljYXRpb25SZWZbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubm90aWZpY2F0aW9ucyQuZ2V0VmFsdWUoKTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNtaXNzKG5vdGlmaWNhdGlvblJlZjogTm90aWZpY2F0aW9uUmVmKTogdm9pZCB7XHJcbiAgICAgICAgbm90aWZpY2F0aW9uUmVmLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbnMkLm5leHQodGhpcy5ub3RpZmljYXRpb25zJC5nZXRWYWx1ZSgpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZGlzbWlzc0FsbCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbnMkLmdldFZhbHVlKCkuZm9yRWFjaChub3RpZmljYXRpb25SZWYgPT4gbm90aWZpY2F0aW9uUmVmLnZpc2libGUgPSBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb25zJC5uZXh0KHRoaXMubm90aWZpY2F0aW9ucyQuZ2V0VmFsdWUoKSk7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jb2xvclNlcnZpY2U6IENvbG9yU2VydmljZSkge1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE5vdGlmaWNhdGlvblJlZiB7XHJcbiAgICB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PjtcclxuICAgIGR1cmF0aW9uOiBudW1iZXI7XHJcbiAgICBkYXRlOiBEYXRlO1xyXG4gICAgdmlzaWJsZT86IGJvb2xlYW47XHJcbiAgICBoZWlnaHQ/OiBudW1iZXI7XHJcbiAgICBzcGFjaW5nPzogbnVtYmVyO1xyXG4gICAgYmFja2dyb3VuZENvbG9yPzogc3RyaW5nO1xyXG4gICAgaWNvbkNvbG9yPzogc3RyaW5nO1xyXG4gICAgZGF0YTogeyBba2V5OiBzdHJpbmddOiBhbnkgfTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBOb3RpZmljYXRpb25PcHRpb25zIHtcclxuICAgIGR1cmF0aW9uPzogbnVtYmVyO1xyXG4gICAgaGVpZ2h0PzogbnVtYmVyO1xyXG4gICAgc3BhY2luZz86IG51bWJlcjtcclxuICAgIGJhY2tncm91bmRDb2xvcj86IHN0cmluZztcclxuICAgIGljb25Db2xvcj86IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgTm90aWZpY2F0aW9uTGlzdERpcmVjdGlvbiA9ICdhYm92ZScgfCAnYmVsb3cnOyJdfQ==