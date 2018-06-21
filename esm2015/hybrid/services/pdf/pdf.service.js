/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, Inject } from '@angular/core';
export class PdfService {
    /**
     * @param {?} _pdfService
     */
    constructor(_pdfService) {
        this._pdfService = _pdfService;
    }
    /**
     * @param {?} columns
     * @param {?} rows
     * @param {?=} options
     * @return {?}
     */
    createTable(columns, rows, options = {}) {
        return this._pdfService.createTable(columns, rows, options);
    }
}
PdfService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
PdfService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['$pdf',] },] },
];
function PdfService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    PdfService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    PdfService.ctorParameters;
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
export const /** @type {?} */ pdfServiceProvider = {
    provide: '$pdf',
    useFactory: pdfServiceFactory,
    deps: ['$injector']
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGRmLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiaHlicmlkL3NlcnZpY2VzL3BkZi9wZGYuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQVksTUFBTSxlQUFlLENBQUM7QUFJN0QsTUFBTTs7OztJQUVGLFlBQW9DO1FBQUEsZ0JBQVcsR0FBWCxXQUFXO0tBQWtCOzs7Ozs7O0lBRWpFLFdBQVcsQ0FBQyxPQUFtQixFQUFFLElBQVcsRUFBRSxVQUFzQixFQUFFO1FBQ2xFLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQy9EOzs7WUFQSixVQUFVOzs7OzRDQUdNLE1BQU0sU0FBQyxNQUFNOzs7Ozs7Ozs7Ozs7Ozs7OztBQU85QixNQUFNLDRCQUE0QixRQUFrQjtJQUNoRCxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUMvQjtBQUVELE1BQU0sQ0FBQyx1QkFBTSxrQkFBa0IsR0FBRztJQUM5QixPQUFPLEVBQUUsTUFBTTtJQUNmLFVBQVUsRUFBRSxpQkFBaUI7SUFDN0IsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDO0NBQ3RCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJUGRmU2VydmljZSwgUGRmQ29sdW1ucywgUGRmT3B0aW9ucywgUGRmRG9jdW1lbnQgfSBmcm9tICcuL3BkZi5pbnRlcmZhY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUGRmU2VydmljZSBpbXBsZW1lbnRzIElQZGZTZXJ2aWNlIHtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KCckcGRmJykgcHJpdmF0ZSBfcGRmU2VydmljZTogSVBkZlNlcnZpY2UpIHsgfVxuICAgIFxuICAgIGNyZWF0ZVRhYmxlKGNvbHVtbnM6IFBkZkNvbHVtbnMsIHJvd3M6IGFueVtdLCBvcHRpb25zOiBQZGZPcHRpb25zID0ge30pOiBQZGZEb2N1bWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wZGZTZXJ2aWNlLmNyZWF0ZVRhYmxlKGNvbHVtbnMsIHJvd3MsIG9wdGlvbnMpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBkZlNlcnZpY2VGYWN0b3J5KGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgIHJldHVybiBpbmplY3Rvci5nZXQoJyRwZGYnKTtcbn1cblxuZXhwb3J0IGNvbnN0IHBkZlNlcnZpY2VQcm92aWRlciA9IHtcbiAgICBwcm92aWRlOiAnJHBkZicsXG4gICAgdXNlRmFjdG9yeTogcGRmU2VydmljZUZhY3RvcnksXG4gICAgZGVwczogWyckaW5qZWN0b3InXVxufTsiXX0=