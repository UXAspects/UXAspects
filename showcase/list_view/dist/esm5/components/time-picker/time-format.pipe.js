/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Pipe } from '@angular/core';
var TimeFormatPipe = (function () {
    function TimeFormatPipe() {
    }
    /**
     * @param {?} value
     * @return {?}
     */
    TimeFormatPipe.prototype.transform = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return value < 10 ? '0' + value : value;
    };
    TimeFormatPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'timeFormat'
                },] },
    ];
    return TimeFormatPipe;
}());
export { TimeFormatPipe };
function TimeFormatPipe_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    TimeFormatPipe.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    TimeFormatPipe.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1mb3JtYXQucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3RpbWUtcGlja2VyL3RpbWUtZm9ybWF0LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOzs7Ozs7OztJQU9sRCxrQ0FBUzs7OztJQUFULFVBQVUsS0FBYTtRQUNyQixNQUFNLENBQUMsS0FBSyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQztLQUN6Qzs7Z0JBUEYsSUFBSSxTQUFDO29CQUNKLElBQUksRUFBRSxZQUFZO2lCQUNuQjs7eUJBSkQ7O1NBS2EsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe1xuICBuYW1lOiAndGltZUZvcm1hdCdcbn0pXG5leHBvcnQgY2xhc3MgVGltZUZvcm1hdFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICB0cmFuc2Zvcm0odmFsdWU6IG51bWJlcik6IHN0cmluZyB8IG51bWJlciB7XG4gICAgcmV0dXJuIHZhbHVlIDwgMTAgPyAnMCcgKyB2YWx1ZSA6IHZhbHVlO1xuICB9XG5cbn0iXX0=