/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ColorService } from '../../services/color/index';
var NotificationService = (function () {
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
        { type: Injectable },
    ];
    /** @nocollapse */
    NotificationService.ctorParameters = function () { return [
        { type: ColorService, },
    ]; };
    return NotificationService;
}());
export { NotificationService };
function NotificationService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    NotificationService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    NotificationService.ctorParameters;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFlLE1BQU0sZUFBZSxDQUFDO0FBQ3hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7O0lBa0V0RCw2QkFBb0IsYUFBMkI7UUFBM0Isa0JBQWEsR0FBYixhQUFhLENBQWM7O3VCQTVEaEI7WUFDM0IsUUFBUSxFQUFFLENBQUM7WUFDWCxNQUFNLEVBQUUsR0FBRztZQUNYLE9BQU8sRUFBRSxFQUFFO1lBQ1gsZUFBZSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssRUFBRTtZQUM5RCxTQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxFQUFFO1NBQzNEO3lCQUVzQyxPQUFPOzhCQUVPLElBQUksZUFBZSxDQUFvQixFQUFFLENBQUM7S0FtRDlGOzs7Ozs7O0lBakRELGtDQUFJOzs7Ozs7SUFBSixVQUFLLFdBQTZCLEVBQUUsT0FBMkMsRUFBRSxJQUFpQztRQUFsSCxpQkFnQ0M7UUFoQ21DLHdCQUFBLEVBQUEsVUFBK0IsSUFBSSxDQUFDLE9BQU87UUFBRSxxQkFBQSxFQUFBLFNBQWlDO1FBRTlHLE9BQU8sd0JBQVEsSUFBSSxDQUFDLE9BQU8sRUFBSyxPQUFPLENBQUUsQ0FBQztRQUUxQyxxQkFBTSxlQUFlLEdBQW9CO1lBQ3JDLFdBQVcsRUFBRSxXQUFXO1lBQ3hCLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUTtZQUMxQixJQUFJLEVBQUUsSUFBSSxJQUFJLEVBQUU7WUFDaEIsT0FBTyxFQUFFLElBQUk7WUFDYixNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07WUFDdEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO1lBQ3hCLGVBQWUsRUFBRSxPQUFPLENBQUMsZUFBZTtZQUN4QyxTQUFTLEVBQUUsT0FBTyxDQUFDLFNBQVM7WUFDNUIsSUFBSSxFQUFFLElBQUk7U0FDYixDQUFDO1FBRUYscUJBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFckQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzdCLGFBQWEsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDMUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLGFBQWEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDdkM7UUFFRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzs7UUFHeEMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLFVBQVUsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBN0IsQ0FBNkIsRUFBRSxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDO1NBQzVFO1FBRUQsTUFBTSxDQUFDLGVBQWUsQ0FBQztLQUMxQjs7OztJQUVELHdDQUFVOzs7SUFBVjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ3pDOzs7OztJQUVELHFDQUFPOzs7O0lBQVAsVUFBUSxlQUFnQztRQUNwQyxlQUFlLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNoQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7S0FDNUQ7Ozs7SUFFRCx3Q0FBVTs7O0lBQVY7UUFDSSxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFBLGVBQWUsSUFBSSxPQUFBLGVBQWUsQ0FBQyxPQUFPLEdBQUcsS0FBSyxFQUEvQixDQUErQixDQUFDLENBQUM7UUFDM0YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0tBQzVEOztnQkE5REosVUFBVTs7OztnQkFGRixZQUFZOzs4QkFGckI7O1NBS2EsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7IENvbG9yU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NvbG9yL2luZGV4JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvblNlcnZpY2Uge1xuXG4gICAgLy8gcHJvdmlkZSBkZWZhdWx0IG9wdGlvbnNcbiAgICBvcHRpb25zOiBOb3RpZmljYXRpb25PcHRpb25zID0ge1xuICAgICAgICBkdXJhdGlvbjogNCxcbiAgICAgICAgaGVpZ2h0OiAxMDAsXG4gICAgICAgIHNwYWNpbmc6IDEwLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuX2NvbG9yU2VydmljZS5nZXRDb2xvcignYWNjZW50JykudG9IZXgoKSxcbiAgICAgICAgaWNvbkNvbG9yOiB0aGlzLl9jb2xvclNlcnZpY2UuZ2V0Q29sb3IoJ2FjY2VudCcpLnRvSGV4KClcbiAgICB9O1xuXG4gICAgZGlyZWN0aW9uOiBOb3RpZmljYXRpb25MaXN0RGlyZWN0aW9uID0gJ2Fib3ZlJztcblxuICAgIG5vdGlmaWNhdGlvbnMkOiBCZWhhdmlvclN1YmplY3Q8Tm90aWZpY2F0aW9uUmVmW10+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxOb3RpZmljYXRpb25SZWZbXT4oW10pOyAgICBcblxuICAgIHNob3codGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4sIG9wdGlvbnM6IE5vdGlmaWNhdGlvbk9wdGlvbnMgPSB0aGlzLm9wdGlvbnMsIGRhdGE6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7fSk6IE5vdGlmaWNhdGlvblJlZiB7XG5cbiAgICAgICAgb3B0aW9ucyA9IHsgLi4udGhpcy5vcHRpb25zLCAuLi5vcHRpb25zIH07XG5cbiAgICAgICAgY29uc3Qgbm90aWZpY2F0aW9uUmVmOiBOb3RpZmljYXRpb25SZWYgPSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVJlZjogdGVtcGxhdGVSZWYsXG4gICAgICAgICAgICBkdXJhdGlvbjogb3B0aW9ucy5kdXJhdGlvbixcbiAgICAgICAgICAgIGRhdGU6IG5ldyBEYXRlKCksXG4gICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgaGVpZ2h0OiBvcHRpb25zLmhlaWdodCxcbiAgICAgICAgICAgIHNwYWNpbmc6IG9wdGlvbnMuc3BhY2luZyxcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogb3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IsXG4gICAgICAgICAgICBpY29uQ29sb3I6IG9wdGlvbnMuaWNvbkNvbG9yLFxuICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IG5vdGlmaWNhdGlvbnMgPSB0aGlzLm5vdGlmaWNhdGlvbnMkLmdldFZhbHVlKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uID09PSAnYWJvdmUnKSB7XG4gICAgICAgICAgICBub3RpZmljYXRpb25zLnVuc2hpZnQobm90aWZpY2F0aW9uUmVmKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvbnMucHVzaChub3RpZmljYXRpb25SZWYpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb25zJC5uZXh0KG5vdGlmaWNhdGlvbnMpO1xuXG4gICAgICAgIC8vIHJlbW92ZSBub3RpZmljYXRpb24gYWZ0ZXIgZGVsYXlcbiAgICAgICAgaWYgKG9wdGlvbnMuZHVyYXRpb24gIT09IDApIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5kaXNtaXNzKG5vdGlmaWNhdGlvblJlZiksIG9wdGlvbnMuZHVyYXRpb24gKiAxMDAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBub3RpZmljYXRpb25SZWY7XG4gICAgfVxuXG4gICAgZ2V0SGlzdG9yeSgpOiBOb3RpZmljYXRpb25SZWZbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vdGlmaWNhdGlvbnMkLmdldFZhbHVlKCk7XG4gICAgfVxuXG4gICAgZGlzbWlzcyhub3RpZmljYXRpb25SZWY6IE5vdGlmaWNhdGlvblJlZik6IHZvaWQge1xuICAgICAgICBub3RpZmljYXRpb25SZWYudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbnMkLm5leHQodGhpcy5ub3RpZmljYXRpb25zJC5nZXRWYWx1ZSgpKTtcbiAgICB9XG4gICAgXG4gICAgZGlzbWlzc0FsbCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb25zJC5nZXRWYWx1ZSgpLmZvckVhY2gobm90aWZpY2F0aW9uUmVmID0+IG5vdGlmaWNhdGlvblJlZi52aXNpYmxlID0gZmFsc2UpO1xuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbnMkLm5leHQodGhpcy5ub3RpZmljYXRpb25zJC5nZXRWYWx1ZSgpKTsgICAgICAgIFxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NvbG9yU2VydmljZTogQ29sb3JTZXJ2aWNlKSB7XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIE5vdGlmaWNhdGlvblJlZiB7XG4gICAgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgZHVyYXRpb246IG51bWJlcjtcbiAgICBkYXRlOiBEYXRlO1xuICAgIHZpc2libGU/OiBib29sZWFuO1xuICAgIGhlaWdodD86IG51bWJlcjtcbiAgICBzcGFjaW5nPzogbnVtYmVyO1xuICAgIGJhY2tncm91bmRDb2xvcj86IHN0cmluZztcbiAgICBpY29uQ29sb3I/OiBzdHJpbmc7XG4gICAgZGF0YTogeyBba2V5OiBzdHJpbmddOiBhbnkgfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBOb3RpZmljYXRpb25PcHRpb25zIHtcbiAgICBkdXJhdGlvbj86IG51bWJlcjtcbiAgICBoZWlnaHQ/OiBudW1iZXI7XG4gICAgc3BhY2luZz86IG51bWJlcjtcbiAgICBiYWNrZ3JvdW5kQ29sb3I/OiBzdHJpbmc7XG4gICAgaWNvbkNvbG9yPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBOb3RpZmljYXRpb25MaXN0RGlyZWN0aW9uID0gJ2Fib3ZlJyB8ICdiZWxvdyc7Il19