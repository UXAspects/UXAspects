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
    { type: Injectable }
];
/** @nocollapse */
NotificationService.ctorParameters = () => [
    { type: ColorService }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWUsTUFBTSxlQUFlLENBQUM7QUFDeEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUcxRCxNQUFNOzs7O0lBK0RGLFlBQW9CLGFBQTJCO1FBQTNCLGtCQUFhLEdBQWIsYUFBYSxDQUFjOzt1QkE1RGhCO1lBQzNCLFFBQVEsRUFBRSxDQUFDO1lBQ1gsTUFBTSxFQUFFLEdBQUc7WUFDWCxPQUFPLEVBQUUsRUFBRTtZQUNYLGVBQWUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEVBQUU7WUFDOUQsU0FBUyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssRUFBRTtTQUMzRDt5QkFFc0MsT0FBTzs4QkFFTyxJQUFJLGVBQWUsQ0FBb0IsRUFBRSxDQUFDO0tBbUQ5Rjs7Ozs7OztJQWpERCxJQUFJLENBQUMsV0FBNkIsRUFBRSxVQUErQixJQUFJLENBQUMsT0FBTyxFQUFFLE9BQStCLEVBQUU7UUFFOUcsT0FBTyxxQkFBUSxJQUFJLENBQUMsT0FBTyxFQUFLLE9BQU8sQ0FBRSxDQUFDO1FBRTFDLHVCQUFNLGVBQWUsR0FBb0I7WUFDckMsV0FBVyxFQUFFLFdBQVc7WUFDeEIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRO1lBQzFCLElBQUksRUFBRSxJQUFJLElBQUksRUFBRTtZQUNoQixPQUFPLEVBQUUsSUFBSTtZQUNiLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtZQUN0QixPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87WUFDeEIsZUFBZSxFQUFFLE9BQU8sQ0FBQyxlQUFlO1lBQ3hDLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUztZQUM1QixJQUFJLEVBQUUsSUFBSTtTQUNiLENBQUM7UUFFRix1QkFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVyRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDN0IsYUFBYSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUMxQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osYUFBYSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUN2QztRQUVELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDOztRQUd4QyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUUsT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQztTQUM1RTtRQUVELE1BQU0sQ0FBQyxlQUFlLENBQUM7S0FDMUI7Ozs7SUFFRCxVQUFVO1FBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDekM7Ozs7O0lBRUQsT0FBTyxDQUFDLGVBQWdDO1FBQ3BDLGVBQWUsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztLQUM1RDs7OztJQUVELFVBQVU7UUFDTixJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDM0YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0tBQzVEOzs7WUE5REosVUFBVTs7OztZQUZGLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XHJcbmltcG9ydCB7IENvbG9yU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NvbG9yL2luZGV4JztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvblNlcnZpY2Uge1xyXG5cclxuICAgIC8vIHByb3ZpZGUgZGVmYXVsdCBvcHRpb25zXHJcbiAgICBvcHRpb25zOiBOb3RpZmljYXRpb25PcHRpb25zID0ge1xyXG4gICAgICAgIGR1cmF0aW9uOiA0LFxyXG4gICAgICAgIGhlaWdodDogMTAwLFxyXG4gICAgICAgIHNwYWNpbmc6IDEwLFxyXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5fY29sb3JTZXJ2aWNlLmdldENvbG9yKCdhY2NlbnQnKS50b0hleCgpLFxyXG4gICAgICAgIGljb25Db2xvcjogdGhpcy5fY29sb3JTZXJ2aWNlLmdldENvbG9yKCdhY2NlbnQnKS50b0hleCgpXHJcbiAgICB9O1xyXG5cclxuICAgIGRpcmVjdGlvbjogTm90aWZpY2F0aW9uTGlzdERpcmVjdGlvbiA9ICdhYm92ZSc7XHJcblxyXG4gICAgbm90aWZpY2F0aW9ucyQ6IEJlaGF2aW9yU3ViamVjdDxOb3RpZmljYXRpb25SZWZbXT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE5vdGlmaWNhdGlvblJlZltdPihbXSk7ICAgIFxyXG5cclxuICAgIHNob3codGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4sIG9wdGlvbnM6IE5vdGlmaWNhdGlvbk9wdGlvbnMgPSB0aGlzLm9wdGlvbnMsIGRhdGE6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7fSk6IE5vdGlmaWNhdGlvblJlZiB7XHJcblxyXG4gICAgICAgIG9wdGlvbnMgPSB7IC4uLnRoaXMub3B0aW9ucywgLi4ub3B0aW9ucyB9O1xyXG5cclxuICAgICAgICBjb25zdCBub3RpZmljYXRpb25SZWY6IE5vdGlmaWNhdGlvblJlZiA9IHtcclxuICAgICAgICAgICAgdGVtcGxhdGVSZWY6IHRlbXBsYXRlUmVmLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogb3B0aW9ucy5kdXJhdGlvbixcclxuICAgICAgICAgICAgZGF0ZTogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgaGVpZ2h0OiBvcHRpb25zLmhlaWdodCxcclxuICAgICAgICAgICAgc3BhY2luZzogb3B0aW9ucy5zcGFjaW5nLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IG9wdGlvbnMuYmFja2dyb3VuZENvbG9yLFxyXG4gICAgICAgICAgICBpY29uQ29sb3I6IG9wdGlvbnMuaWNvbkNvbG9yLFxyXG4gICAgICAgICAgICBkYXRhOiBkYXRhXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3Qgbm90aWZpY2F0aW9ucyA9IHRoaXMubm90aWZpY2F0aW9ucyQuZ2V0VmFsdWUoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uID09PSAnYWJvdmUnKSB7XHJcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvbnMudW5zaGlmdChub3RpZmljYXRpb25SZWYpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvbnMucHVzaChub3RpZmljYXRpb25SZWYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb25zJC5uZXh0KG5vdGlmaWNhdGlvbnMpO1xyXG5cclxuICAgICAgICAvLyByZW1vdmUgbm90aWZpY2F0aW9uIGFmdGVyIGRlbGF5XHJcbiAgICAgICAgaWYgKG9wdGlvbnMuZHVyYXRpb24gIT09IDApIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmRpc21pc3Mobm90aWZpY2F0aW9uUmVmKSwgb3B0aW9ucy5kdXJhdGlvbiAqIDEwMDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5vdGlmaWNhdGlvblJlZjtcclxuICAgIH1cclxuXHJcbiAgICBnZXRIaXN0b3J5KCk6IE5vdGlmaWNhdGlvblJlZltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ub3RpZmljYXRpb25zJC5nZXRWYWx1ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc21pc3Mobm90aWZpY2F0aW9uUmVmOiBOb3RpZmljYXRpb25SZWYpOiB2b2lkIHtcclxuICAgICAgICBub3RpZmljYXRpb25SZWYudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9ucyQubmV4dCh0aGlzLm5vdGlmaWNhdGlvbnMkLmdldFZhbHVlKCkpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBkaXNtaXNzQWxsKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9ucyQuZ2V0VmFsdWUoKS5mb3JFYWNoKG5vdGlmaWNhdGlvblJlZiA9PiBub3RpZmljYXRpb25SZWYudmlzaWJsZSA9IGZhbHNlKTtcclxuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbnMkLm5leHQodGhpcy5ub3RpZmljYXRpb25zJC5nZXRWYWx1ZSgpKTsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NvbG9yU2VydmljZTogQ29sb3JTZXJ2aWNlKSB7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTm90aWZpY2F0aW9uUmVmIHtcclxuICAgIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gICAgZHVyYXRpb246IG51bWJlcjtcclxuICAgIGRhdGU6IERhdGU7XHJcbiAgICB2aXNpYmxlPzogYm9vbGVhbjtcclxuICAgIGhlaWdodD86IG51bWJlcjtcclxuICAgIHNwYWNpbmc/OiBudW1iZXI7XHJcbiAgICBiYWNrZ3JvdW5kQ29sb3I/OiBzdHJpbmc7XHJcbiAgICBpY29uQ29sb3I/OiBzdHJpbmc7XHJcbiAgICBkYXRhOiB7IFtrZXk6IHN0cmluZ106IGFueSB9O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE5vdGlmaWNhdGlvbk9wdGlvbnMge1xyXG4gICAgZHVyYXRpb24/OiBudW1iZXI7XHJcbiAgICBoZWlnaHQ/OiBudW1iZXI7XHJcbiAgICBzcGFjaW5nPzogbnVtYmVyO1xyXG4gICAgYmFja2dyb3VuZENvbG9yPzogc3RyaW5nO1xyXG4gICAgaWNvbkNvbG9yPzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBOb3RpZmljYXRpb25MaXN0RGlyZWN0aW9uID0gJ2Fib3ZlJyB8ICdiZWxvdyc7Il19