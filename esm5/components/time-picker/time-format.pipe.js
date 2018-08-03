/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Pipe } from '@angular/core';
var TimeFormatPipe = /** @class */ (function () {
    function TimeFormatPipe() {
    }
    /**
     * @param {?} value
     * @param {?} pad
     * @return {?}
     */
    TimeFormatPipe.prototype.transform = /**
     * @param {?} value
     * @param {?} pad
     * @return {?}
     */
    function (value, pad) {
        return value < 10 && pad ? '0' + value : value;
    };
    TimeFormatPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'timeFormat'
                },] }
    ];
    return TimeFormatPipe;
}());
export { TimeFormatPipe };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1mb3JtYXQucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3RpbWUtcGlja2VyL3RpbWUtZm9ybWF0LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7SUFNaEQsa0NBQVM7Ozs7O0lBQVQsVUFBVSxLQUFhLEVBQUUsR0FBWTtRQUNqQyxNQUFNLENBQUMsS0FBSyxHQUFHLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztLQUNsRDs7Z0JBTkosSUFBSSxTQUFDO29CQUNGLElBQUksRUFBRSxZQUFZO2lCQUNyQjs7eUJBSkQ7O1NBS2EsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe1xuICAgIG5hbWU6ICd0aW1lRm9ybWF0J1xufSlcbmV4cG9ydCBjbGFzcyBUaW1lRm9ybWF0UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHRyYW5zZm9ybSh2YWx1ZTogbnVtYmVyLCBwYWQ6IGJvb2xlYW4pOiBzdHJpbmcgfCBudW1iZXIge1xuICAgICAgICByZXR1cm4gdmFsdWUgPCAxMCAmJiBwYWQgPyAnMCcgKyB2YWx1ZSA6IHZhbHVlO1xuICAgIH1cbn1cbiJdfQ==