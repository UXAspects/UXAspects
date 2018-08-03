/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, Inject } from '@angular/core';
var PdfService = /** @class */ (function () {
    function PdfService(_pdfService) {
        this._pdfService = _pdfService;
    }
    /**
     * @param {?} columns
     * @param {?} rows
     * @param {?=} options
     * @return {?}
     */
    PdfService.prototype.createTable = /**
     * @param {?} columns
     * @param {?} rows
     * @param {?=} options
     * @return {?}
     */
    function (columns, rows, options) {
        if (options === void 0) { options = {}; }
        return this._pdfService.createTable(columns, rows, options);
    };
    PdfService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    PdfService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: ['$pdf',] }] }
    ]; };
    return PdfService;
}());
export { PdfService };
function PdfService_tsickle_Closure_declarations() {
    /** @type {?} */
    PdfService.prototype._pdfService;
}
/**
 * @param {?} injector
 * @return {?}
 */
export function pdfServiceFactory(injector) {
    return injector.get('$pdf');
}
export var /** @type {?} */ pdfServiceProvider = {
    provide: '$pdf',
    useFactory: pdfServiceFactory,
    deps: ['$injector']
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGRmLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiaHlicmlkL3NlcnZpY2VzL3BkZi9wZGYuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQVksTUFBTSxlQUFlLENBQUM7O0lBTXpELG9CQUFvQyxXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtLQUFLOzs7Ozs7O0lBRWpFLGdDQUFXOzs7Ozs7SUFBWCxVQUFZLE9BQW1CLEVBQUUsSUFBVyxFQUFFLE9BQXdCO1FBQXhCLHdCQUFBLEVBQUEsWUFBd0I7UUFDbEUsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDL0Q7O2dCQVBKLFVBQVU7Ozs7Z0RBR00sTUFBTSxTQUFDLE1BQU07O3FCQU45Qjs7U0FJYSxVQUFVOzs7Ozs7Ozs7QUFTdkIsTUFBTSw0QkFBNEIsUUFBa0I7SUFDaEQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDL0I7QUFFRCxNQUFNLENBQUMscUJBQU0sa0JBQWtCLEdBQUc7SUFDOUIsT0FBTyxFQUFFLE1BQU07SUFDZixVQUFVLEVBQUUsaUJBQWlCO0lBQzdCLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQztDQUN0QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSVBkZlNlcnZpY2UsIFBkZkNvbHVtbnMsIFBkZk9wdGlvbnMsIFBkZkRvY3VtZW50IH0gZnJvbSAnLi9wZGYuaW50ZXJmYWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBkZlNlcnZpY2UgaW1wbGVtZW50cyBJUGRmU2VydmljZSB7XG4gICAgXG4gICAgY29uc3RydWN0b3IoQEluamVjdCgnJHBkZicpIHByaXZhdGUgX3BkZlNlcnZpY2U6IElQZGZTZXJ2aWNlKSB7IH1cbiAgICBcbiAgICBjcmVhdGVUYWJsZShjb2x1bW5zOiBQZGZDb2x1bW5zLCByb3dzOiBhbnlbXSwgb3B0aW9uczogUGRmT3B0aW9ucyA9IHt9KTogUGRmRG9jdW1lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGRmU2VydmljZS5jcmVhdGVUYWJsZShjb2x1bW5zLCByb3dzLCBvcHRpb25zKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwZGZTZXJ2aWNlRmFjdG9yeShpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICByZXR1cm4gaW5qZWN0b3IuZ2V0KCckcGRmJyk7XG59XG5cbmV4cG9ydCBjb25zdCBwZGZTZXJ2aWNlUHJvdmlkZXIgPSB7XG4gICAgcHJvdmlkZTogJyRwZGYnLFxuICAgIHVzZUZhY3Rvcnk6IHBkZlNlcnZpY2VGYWN0b3J5LFxuICAgIGRlcHM6IFsnJGluamVjdG9yJ11cbn07Il19