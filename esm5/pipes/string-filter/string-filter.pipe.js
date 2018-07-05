/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Pipe, Injectable } from '@angular/core';
var StringFilterPipe = (function () {
    function StringFilterPipe() {
    }
    /**
     * @param {?} items
     * @param {?} value
     * @return {?}
     */
    StringFilterPipe.prototype.transform = /**
     * @param {?} items
     * @param {?} value
     * @return {?}
     */
    function (items, value) {
        if (!items) {
            return [];
        }
        return items.filter(function (it) { return it.toLowerCase().indexOf(value.toLowerCase()) >= 0; });
    };
    StringFilterPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'stringFilter'
                },] },
        { type: Injectable },
    ];
    /** @nocollapse */
    StringFilterPipe.ctorParameters = function () { return []; };
    return StringFilterPipe;
}());
export { StringFilterPipe };
function StringFilterPipe_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    StringFilterPipe.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    StringFilterPipe.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLWZpbHRlci5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbInBpcGVzL3N0cmluZy1maWx0ZXIvc3RyaW5nLWZpbHRlci5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBaUIsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7OztJQU81RCxvQ0FBUzs7Ozs7SUFBVCxVQUFVLEtBQVksRUFBRSxLQUFhO1FBQ2pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNULE1BQU0sQ0FBQyxFQUFFLENBQUM7U0FDYjtRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQWxELENBQWtELENBQUMsQ0FBQztLQUNqRjs7Z0JBVkosSUFBSSxTQUFDO29CQUNGLElBQUksRUFBRSxjQUFjO2lCQUN2QjtnQkFDQSxVQUFVOzs7OzJCQUxYOztTQU1hLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIEluamVjdGFibGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe1xuICAgIG5hbWU6ICdzdHJpbmdGaWx0ZXInXG59KVxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFN0cmluZ0ZpbHRlclBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgICB0cmFuc2Zvcm0oaXRlbXM6IGFueVtdLCB2YWx1ZTogc3RyaW5nKTogYW55W10geyAgXG4gICAgICAgIGlmICghaXRlbXMpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXRlbXMuZmlsdGVyKGl0ID0+IGl0LnRvTG93ZXJDYXNlKCkuaW5kZXhPZih2YWx1ZS50b0xvd2VyQ2FzZSgpKSA+PSAwKTtcbiAgICB9XG59Il19