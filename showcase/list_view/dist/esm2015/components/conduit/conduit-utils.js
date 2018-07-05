/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * This utility is to ensure a all functions with the specified name are called in all super classes
 * @param {?} target
 * @param {?} functionName
 * @return {?}
 */
export function invokeSuperFunction(target, functionName) {
    // get all instances of the function
    const /** @type {?} */ functionList = [];
    // store the current prototype we are checking
    let /** @type {?} */ prototype = target;
    // look through every base class and check it
    do {
        if (prototype.hasOwnProperty(functionName)) {
            functionList.push(prototype[functionName]);
        }
        prototype = prototype.__proto__;
    } while (prototype.__proto__);
    // augment the top level function to call all the functions
    target[functionName] = function (...args) {
        functionList.forEach(func => func.call(target, ...args));
    };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZHVpdC11dGlscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2NvbmR1aXQvY29uZHVpdC11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EsTUFBTSw4QkFBOEIsTUFBYyxFQUFFLFlBQW9COztJQUVwRSx1QkFBTSxZQUFZLEdBQWUsRUFBRSxDQUFDOztJQUdwQyxxQkFBSSxTQUFTLEdBQVEsTUFBTSxDQUFDOztJQUc1QixHQUFHLENBQUM7UUFDQSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1NBQzlDO1FBRUQsU0FBUyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUM7S0FDbkMsUUFBUSxTQUFTLENBQUMsU0FBUyxFQUFFOztJQUc5QixNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsVUFBVSxHQUFHLElBQVc7UUFDM0MsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQzVELENBQUM7Q0FDTCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBUaGlzIHV0aWxpdHkgaXMgdG8gZW5zdXJlIGEgYWxsIGZ1bmN0aW9ucyB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZSBhcmUgY2FsbGVkIGluIGFsbCBzdXBlciBjbGFzc2VzICovXG5leHBvcnQgZnVuY3Rpb24gaW52b2tlU3VwZXJGdW5jdGlvbih0YXJnZXQ6IG9iamVjdCwgZnVuY3Rpb25OYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAvLyBnZXQgYWxsIGluc3RhbmNlcyBvZiB0aGUgZnVuY3Rpb25cbiAgICBjb25zdCBmdW5jdGlvbkxpc3Q6IEZ1bmN0aW9uW10gPSBbXTtcblxuICAgIC8vIHN0b3JlIHRoZSBjdXJyZW50IHByb3RvdHlwZSB3ZSBhcmUgY2hlY2tpbmdcbiAgICBsZXQgcHJvdG90eXBlOiBhbnkgPSB0YXJnZXQ7XG5cbiAgICAvLyBsb29rIHRocm91Z2ggZXZlcnkgYmFzZSBjbGFzcyBhbmQgY2hlY2sgaXRcbiAgICBkbyB7XG4gICAgICAgIGlmIChwcm90b3R5cGUuaGFzT3duUHJvcGVydHkoZnVuY3Rpb25OYW1lKSkge1xuICAgICAgICAgICAgZnVuY3Rpb25MaXN0LnB1c2gocHJvdG90eXBlW2Z1bmN0aW9uTmFtZV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvdG90eXBlID0gcHJvdG90eXBlLl9fcHJvdG9fXztcbiAgICB9IHdoaWxlIChwcm90b3R5cGUuX19wcm90b19fKTtcblxuICAgIC8vIGF1Z21lbnQgdGhlIHRvcCBsZXZlbCBmdW5jdGlvbiB0byBjYWxsIGFsbCB0aGUgZnVuY3Rpb25zXG4gICAgdGFyZ2V0W2Z1bmN0aW9uTmFtZV0gPSBmdW5jdGlvbiAoLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgZnVuY3Rpb25MaXN0LmZvckVhY2goZnVuYyA9PiBmdW5jLmNhbGwodGFyZ2V0LCAuLi5hcmdzKSk7XG4gICAgfTtcbn1cbiJdfQ==