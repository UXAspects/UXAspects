/** This utility is to ensure a all functions with the specified name are called in all super classes */
export function invokeSuperFunction(target: object, functionName: string): void {
    // get all instances of the function
    const functionList: Function[] = [];

    // store the current prototype we are checking
    let prototype: any = target;

    // look through every base class and check it
    do {
        if (prototype.hasOwnProperty(functionName)) {
            functionList.push(prototype[functionName]);
        }

        prototype = prototype.__proto__;
    } while (prototype.__proto__);

    // augment the top level function to call all the functions
    target[functionName] = function (...args: any[]) {
        functionList.forEach(func => func.call(target, ...args));
    };
}
