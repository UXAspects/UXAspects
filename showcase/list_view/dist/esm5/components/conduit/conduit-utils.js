/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * This utility is to ensure a all functions with the specified name are called in all super classes
 * @param {?} target
 * @param {?} functionName
 * @return {?}
 */
export function invokeSuperFunction(target, functionName) {
    // get all instances of the function
    var /** @type {?} */ functionList = [];
    // store the current prototype we are checking
    var /** @type {?} */ prototype = target;
    // look through every base class and check it
    do {
        if (prototype.hasOwnProperty(functionName)) {
            functionList.push(prototype[functionName]);
        }
        prototype = prototype.__proto__;
    } while (prototype.__proto__);
    // augment the top level function to call all the functions
    target[functionName] = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        functionList.forEach(function (func) { return func.call.apply(func, tslib_1.__spread([target], args)); });
    };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZHVpdC11dGlscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2NvbmR1aXQvY29uZHVpdC11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLE1BQU0sOEJBQThCLE1BQWMsRUFBRSxZQUFvQjs7SUFFcEUscUJBQU0sWUFBWSxHQUFlLEVBQUUsQ0FBQzs7SUFHcEMscUJBQUksU0FBUyxHQUFRLE1BQU0sQ0FBQzs7SUFHNUIsR0FBRyxDQUFDO1FBQ0EsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztTQUM5QztRQUVELFNBQVMsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDO0tBQ25DLFFBQVEsU0FBUyxDQUFDLFNBQVMsRUFBRTs7SUFHOUIsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHO1FBQVUsY0FBYzthQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7WUFBZCx5QkFBYzs7UUFDM0MsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxJQUFJLE9BQVQsSUFBSSxvQkFBTSxNQUFNLEdBQUssSUFBSSxJQUF6QixDQUEwQixDQUFDLENBQUM7S0FDNUQsQ0FBQztDQUNMIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIFRoaXMgdXRpbGl0eSBpcyB0byBlbnN1cmUgYSBhbGwgZnVuY3Rpb25zIHdpdGggdGhlIHNwZWNpZmllZCBuYW1lIGFyZSBjYWxsZWQgaW4gYWxsIHN1cGVyIGNsYXNzZXMgKi9cbmV4cG9ydCBmdW5jdGlvbiBpbnZva2VTdXBlckZ1bmN0aW9uKHRhcmdldDogb2JqZWN0LCBmdW5jdGlvbk5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIC8vIGdldCBhbGwgaW5zdGFuY2VzIG9mIHRoZSBmdW5jdGlvblxuICAgIGNvbnN0IGZ1bmN0aW9uTGlzdDogRnVuY3Rpb25bXSA9IFtdO1xuXG4gICAgLy8gc3RvcmUgdGhlIGN1cnJlbnQgcHJvdG90eXBlIHdlIGFyZSBjaGVja2luZ1xuICAgIGxldCBwcm90b3R5cGU6IGFueSA9IHRhcmdldDtcblxuICAgIC8vIGxvb2sgdGhyb3VnaCBldmVyeSBiYXNlIGNsYXNzIGFuZCBjaGVjayBpdFxuICAgIGRvIHtcbiAgICAgICAgaWYgKHByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eShmdW5jdGlvbk5hbWUpKSB7XG4gICAgICAgICAgICBmdW5jdGlvbkxpc3QucHVzaChwcm90b3R5cGVbZnVuY3Rpb25OYW1lXSk7XG4gICAgICAgIH1cblxuICAgICAgICBwcm90b3R5cGUgPSBwcm90b3R5cGUuX19wcm90b19fO1xuICAgIH0gd2hpbGUgKHByb3RvdHlwZS5fX3Byb3RvX18pO1xuXG4gICAgLy8gYXVnbWVudCB0aGUgdG9wIGxldmVsIGZ1bmN0aW9uIHRvIGNhbGwgYWxsIHRoZSBmdW5jdGlvbnNcbiAgICB0YXJnZXRbZnVuY3Rpb25OYW1lXSA9IGZ1bmN0aW9uICguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBmdW5jdGlvbkxpc3QuZm9yRWFjaChmdW5jID0+IGZ1bmMuY2FsbCh0YXJnZXQsIC4uLmFyZ3MpKTtcbiAgICB9O1xufVxuIl19