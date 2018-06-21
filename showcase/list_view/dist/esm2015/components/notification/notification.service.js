/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ColorService } from '../../services/color/index';
export class NotificationService {
    /**
     * @param {?} _colorService
     */
    constructor(_colorService) {
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
    show(templateRef, options = this.options, data = {}) {
        options = Object.assign({}, this.options, options);
        const /** @type {?} */ notificationRef = {
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
        const /** @type {?} */ notifications = this.notifications$.getValue();
        if (this.direction === 'above') {
            notifications.unshift(notificationRef);
        }
        else {
            notifications.push(notificationRef);
        }
        this.notifications$.next(notifications);
        // remove notification after delay
        if (options.duration !== 0) {
            setTimeout(() => this.dismiss(notificationRef), options.duration * 1000);
        }
        return notificationRef;
    }
    /**
     * @return {?}
     */
    getHistory() {
        return this.notifications$.getValue();
    }
    /**
     * @param {?} notificationRef
     * @return {?}
     */
    dismiss(notificationRef) {
        notificationRef.visible = false;
        this.notifications$.next(this.notifications$.getValue());
    }
    /**
     * @return {?}
     */
    dismissAll() {
        this.notifications$.getValue().forEach(notificationRef => notificationRef.visible = false);
        this.notifications$.next(this.notifications$.getValue());
    }
}
NotificationService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NotificationService.ctorParameters = () => [
    { type: ColorService, },
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWUsTUFBTSxlQUFlLENBQUM7QUFDeEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUcxRCxNQUFNOzs7O0lBK0RGLFlBQW9CLGFBQTJCO1FBQTNCLGtCQUFhLEdBQWIsYUFBYSxDQUFjOzt1QkE1RGhCO1lBQzNCLFFBQVEsRUFBRSxDQUFDO1lBQ1gsTUFBTSxFQUFFLEdBQUc7WUFDWCxPQUFPLEVBQUUsRUFBRTtZQUNYLGVBQWUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEVBQUU7WUFDOUQsU0FBUyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssRUFBRTtTQUMzRDt5QkFFc0MsT0FBTzs4QkFFTyxJQUFJLGVBQWUsQ0FBb0IsRUFBRSxDQUFDO0tBbUQ5Rjs7Ozs7OztJQWpERCxJQUFJLENBQUMsV0FBNkIsRUFBRSxVQUErQixJQUFJLENBQUMsT0FBTyxFQUFFLE9BQStCLEVBQUU7UUFFOUcsT0FBTyxxQkFBUSxJQUFJLENBQUMsT0FBTyxFQUFLLE9BQU8sQ0FBRSxDQUFDO1FBRTFDLHVCQUFNLGVBQWUsR0FBb0I7WUFDckMsV0FBVyxFQUFFLFdBQVc7WUFDeEIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRO1lBQzFCLElBQUksRUFBRSxJQUFJLElBQUksRUFBRTtZQUNoQixPQUFPLEVBQUUsSUFBSTtZQUNiLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtZQUN0QixPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87WUFDeEIsZUFBZSxFQUFFLE9BQU8sQ0FBQyxlQUFlO1lBQ3hDLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUztZQUM1QixJQUFJLEVBQUUsSUFBSTtTQUNiLENBQUM7UUFFRix1QkFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVyRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDN0IsYUFBYSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUMxQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osYUFBYSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUN2QztRQUVELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDOztRQUd4QyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsVUFBVSxDQUFDLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRSxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDO1NBQzVFO1FBRUQsTUFBTSxDQUFDLGVBQWUsQ0FBQztLQUMxQjs7OztJQUVELFVBQVU7UUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUN6Qzs7Ozs7SUFFRCxPQUFPLENBQUMsZUFBZ0M7UUFDcEMsZUFBZSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0tBQzVEOzs7O0lBRUQsVUFBVTtRQUNOLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLGVBQWUsSUFBSSxlQUFlLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQzNGLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztLQUM1RDs7O1lBOURKLFVBQVU7Ozs7WUFGRixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7IENvbG9yU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NvbG9yL2luZGV4JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvblNlcnZpY2Uge1xuXG4gICAgLy8gcHJvdmlkZSBkZWZhdWx0IG9wdGlvbnNcbiAgICBvcHRpb25zOiBOb3RpZmljYXRpb25PcHRpb25zID0ge1xuICAgICAgICBkdXJhdGlvbjogNCxcbiAgICAgICAgaGVpZ2h0OiAxMDAsXG4gICAgICAgIHNwYWNpbmc6IDEwLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuX2NvbG9yU2VydmljZS5nZXRDb2xvcignYWNjZW50JykudG9IZXgoKSxcbiAgICAgICAgaWNvbkNvbG9yOiB0aGlzLl9jb2xvclNlcnZpY2UuZ2V0Q29sb3IoJ2FjY2VudCcpLnRvSGV4KClcbiAgICB9O1xuXG4gICAgZGlyZWN0aW9uOiBOb3RpZmljYXRpb25MaXN0RGlyZWN0aW9uID0gJ2Fib3ZlJztcblxuICAgIG5vdGlmaWNhdGlvbnMkOiBCZWhhdmlvclN1YmplY3Q8Tm90aWZpY2F0aW9uUmVmW10+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxOb3RpZmljYXRpb25SZWZbXT4oW10pOyAgICBcblxuICAgIHNob3codGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4sIG9wdGlvbnM6IE5vdGlmaWNhdGlvbk9wdGlvbnMgPSB0aGlzLm9wdGlvbnMsIGRhdGE6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7fSk6IE5vdGlmaWNhdGlvblJlZiB7XG5cbiAgICAgICAgb3B0aW9ucyA9IHsgLi4udGhpcy5vcHRpb25zLCAuLi5vcHRpb25zIH07XG5cbiAgICAgICAgY29uc3Qgbm90aWZpY2F0aW9uUmVmOiBOb3RpZmljYXRpb25SZWYgPSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVJlZjogdGVtcGxhdGVSZWYsXG4gICAgICAgICAgICBkdXJhdGlvbjogb3B0aW9ucy5kdXJhdGlvbixcbiAgICAgICAgICAgIGRhdGU6IG5ldyBEYXRlKCksXG4gICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgaGVpZ2h0OiBvcHRpb25zLmhlaWdodCxcbiAgICAgICAgICAgIHNwYWNpbmc6IG9wdGlvbnMuc3BhY2luZyxcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogb3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IsXG4gICAgICAgICAgICBpY29uQ29sb3I6IG9wdGlvbnMuaWNvbkNvbG9yLFxuICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IG5vdGlmaWNhdGlvbnMgPSB0aGlzLm5vdGlmaWNhdGlvbnMkLmdldFZhbHVlKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uID09PSAnYWJvdmUnKSB7XG4gICAgICAgICAgICBub3RpZmljYXRpb25zLnVuc2hpZnQobm90aWZpY2F0aW9uUmVmKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvbnMucHVzaChub3RpZmljYXRpb25SZWYpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb25zJC5uZXh0KG5vdGlmaWNhdGlvbnMpO1xuXG4gICAgICAgIC8vIHJlbW92ZSBub3RpZmljYXRpb24gYWZ0ZXIgZGVsYXlcbiAgICAgICAgaWYgKG9wdGlvbnMuZHVyYXRpb24gIT09IDApIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5kaXNtaXNzKG5vdGlmaWNhdGlvblJlZiksIG9wdGlvbnMuZHVyYXRpb24gKiAxMDAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBub3RpZmljYXRpb25SZWY7XG4gICAgfVxuXG4gICAgZ2V0SGlzdG9yeSgpOiBOb3RpZmljYXRpb25SZWZbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vdGlmaWNhdGlvbnMkLmdldFZhbHVlKCk7XG4gICAgfVxuXG4gICAgZGlzbWlzcyhub3RpZmljYXRpb25SZWY6IE5vdGlmaWNhdGlvblJlZik6IHZvaWQge1xuICAgICAgICBub3RpZmljYXRpb25SZWYudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbnMkLm5leHQodGhpcy5ub3RpZmljYXRpb25zJC5nZXRWYWx1ZSgpKTtcbiAgICB9XG4gICAgXG4gICAgZGlzbWlzc0FsbCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb25zJC5nZXRWYWx1ZSgpLmZvckVhY2gobm90aWZpY2F0aW9uUmVmID0+IG5vdGlmaWNhdGlvblJlZi52aXNpYmxlID0gZmFsc2UpO1xuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbnMkLm5leHQodGhpcy5ub3RpZmljYXRpb25zJC5nZXRWYWx1ZSgpKTsgICAgICAgIFxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NvbG9yU2VydmljZTogQ29sb3JTZXJ2aWNlKSB7XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIE5vdGlmaWNhdGlvblJlZiB7XG4gICAgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgZHVyYXRpb246IG51bWJlcjtcbiAgICBkYXRlOiBEYXRlO1xuICAgIHZpc2libGU/OiBib29sZWFuO1xuICAgIGhlaWdodD86IG51bWJlcjtcbiAgICBzcGFjaW5nPzogbnVtYmVyO1xuICAgIGJhY2tncm91bmRDb2xvcj86IHN0cmluZztcbiAgICBpY29uQ29sb3I/OiBzdHJpbmc7XG4gICAgZGF0YTogeyBba2V5OiBzdHJpbmddOiBhbnkgfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBOb3RpZmljYXRpb25PcHRpb25zIHtcbiAgICBkdXJhdGlvbj86IG51bWJlcjtcbiAgICBoZWlnaHQ/OiBudW1iZXI7XG4gICAgc3BhY2luZz86IG51bWJlcjtcbiAgICBiYWNrZ3JvdW5kQ29sb3I/OiBzdHJpbmc7XG4gICAgaWNvbkNvbG9yPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBOb3RpZmljYXRpb25MaXN0RGlyZWN0aW9uID0gJ2Fib3ZlJyB8ICdiZWxvdyc7Il19