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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZHVpdC11dGlscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2NvbmR1aXQvY29uZHVpdC11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EsTUFBTSw4QkFBOEIsTUFBYyxFQUFFLFlBQW9COztJQUVwRSx1QkFBTSxZQUFZLEdBQWUsRUFBRSxDQUFDOztJQUdwQyxxQkFBSSxTQUFTLEdBQVEsTUFBTSxDQUFDOztJQUc1QixHQUFHLENBQUM7UUFDQSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1NBQzlDO1FBRUQsU0FBUyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUM7S0FDbkMsUUFBUSxTQUFTLENBQUMsU0FBUyxFQUFFOztJQUc5QixNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsVUFBVSxHQUFHLElBQVc7UUFDM0MsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUM1RCxDQUFDO0NBQ0wiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogVGhpcyB1dGlsaXR5IGlzIHRvIGVuc3VyZSBhIGFsbCBmdW5jdGlvbnMgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWUgYXJlIGNhbGxlZCBpbiBhbGwgc3VwZXIgY2xhc3NlcyAqL1xuZXhwb3J0IGZ1bmN0aW9uIGludm9rZVN1cGVyRnVuY3Rpb24odGFyZ2V0OiBvYmplY3QsIGZ1bmN0aW9uTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgLy8gZ2V0IGFsbCBpbnN0YW5jZXMgb2YgdGhlIGZ1bmN0aW9uXG4gICAgY29uc3QgZnVuY3Rpb25MaXN0OiBGdW5jdGlvbltdID0gW107XG5cbiAgICAvLyBzdG9yZSB0aGUgY3VycmVudCBwcm90b3R5cGUgd2UgYXJlIGNoZWNraW5nXG4gICAgbGV0IHByb3RvdHlwZTogYW55ID0gdGFyZ2V0O1xuXG4gICAgLy8gbG9vayB0aHJvdWdoIGV2ZXJ5IGJhc2UgY2xhc3MgYW5kIGNoZWNrIGl0XG4gICAgZG8ge1xuICAgICAgICBpZiAocHJvdG90eXBlLmhhc093blByb3BlcnR5KGZ1bmN0aW9uTmFtZSkpIHtcbiAgICAgICAgICAgIGZ1bmN0aW9uTGlzdC5wdXNoKHByb3RvdHlwZVtmdW5jdGlvbk5hbWVdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb3RvdHlwZSA9IHByb3RvdHlwZS5fX3Byb3RvX187XG4gICAgfSB3aGlsZSAocHJvdG90eXBlLl9fcHJvdG9fXyk7XG5cbiAgICAvLyBhdWdtZW50IHRoZSB0b3AgbGV2ZWwgZnVuY3Rpb24gdG8gY2FsbCBhbGwgdGhlIGZ1bmN0aW9uc1xuICAgIHRhcmdldFtmdW5jdGlvbk5hbWVdID0gZnVuY3Rpb24gKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIGZ1bmN0aW9uTGlzdC5mb3JFYWNoKGZ1bmMgPT4gZnVuYy5jYWxsKHRhcmdldCwgLi4uYXJncykpO1xuICAgIH07XG59XG4iXX0=