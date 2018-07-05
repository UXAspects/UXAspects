/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { defaultConduitProps } from './interfaces/conduit-properties';
/**
 * Expose the property that conduits will be stored in
 */
export var /** @type {?} */ CONDUITS = '_conduits';
/**
 * Create the conduit property decorator
 * @param {?} properties
 * @return {?}
 */
export function Conduit(properties) {
    return function (target, propertyKey) {
        if (typeof properties === 'function') {
            properties = properties.call(null);
        }
        // if the target does not already have a conduit list then create one
        if (!target.hasOwnProperty(CONDUITS)) {
            Object.defineProperty(target, CONDUITS, { value: [] });
        }
        // add the conduit to the list ensuring all required properties are provided
        target[CONDUITS].push(/** @type {?} */ (tslib_1.__assign({}, defaultConduitProps, properties, { target: target, propertyKey: propertyKey })));
    };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZHVpdC5kZWNvcmF0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9jb25kdWl0L2NvbmR1aXQuZGVjb3JhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFxQixtQkFBbUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOzs7O0FBR3pGLE1BQU0sQ0FBQyxxQkFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDOzs7Ozs7QUFHcEMsTUFBTSxrQkFBa0IsVUFBd0M7SUFDNUQsTUFBTSxDQUFDLFVBQUMsTUFBYyxFQUFFLFdBQW1CO1FBRXZDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sVUFBVSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDbkMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdEM7O1FBR0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUMxRDs7UUFHRCxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxtQkFBQyxxQkFBSyxtQkFBbUIsRUFBSyxVQUFVLElBQUUsTUFBTSxRQUFBLEVBQUUsV0FBVyxhQUFBLEdBQXFCLEVBQUMsQ0FBQztLQUM1RyxDQUFDO0NBQ0wiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25kdWl0TWV0YWRhdGEgfSBmcm9tICcuL2ludGVyZmFjZXMvY29uZHVpdC1tZXRhZGF0YSc7XG5pbXBvcnQgeyBDb25kdWl0UHJvcGVydGllcywgZGVmYXVsdENvbmR1aXRQcm9wcyB9IGZyb20gJy4vaW50ZXJmYWNlcy9jb25kdWl0LXByb3BlcnRpZXMnO1xuXG4vKiogRXhwb3NlIHRoZSBwcm9wZXJ0eSB0aGF0IGNvbmR1aXRzIHdpbGwgYmUgc3RvcmVkIGluICovXG5leHBvcnQgY29uc3QgQ09ORFVJVFMgPSAnX2NvbmR1aXRzJztcblxuLyoqIENyZWF0ZSB0aGUgY29uZHVpdCBwcm9wZXJ0eSBkZWNvcmF0b3IgKi9cbmV4cG9ydCBmdW5jdGlvbiBDb25kdWl0KHByb3BlcnRpZXM6IENvbmR1aXRQcm9wZXJ0aWVzIHwgRnVuY3Rpb24pOiBQcm9wZXJ0eURlY29yYXRvciB7XG4gICAgcmV0dXJuICh0YXJnZXQ6IE9iamVjdCwgcHJvcGVydHlLZXk6IHN0cmluZykgPT4ge1xuXG4gICAgICAgIGlmICh0eXBlb2YgcHJvcGVydGllcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcHJvcGVydGllcyA9IHByb3BlcnRpZXMuY2FsbChudWxsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHRoZSB0YXJnZXQgZG9lcyBub3QgYWxyZWFkeSBoYXZlIGEgY29uZHVpdCBsaXN0IHRoZW4gY3JlYXRlIG9uZVxuICAgICAgICBpZiAoIXRhcmdldC5oYXNPd25Qcm9wZXJ0eShDT05EVUlUUykpIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIENPTkRVSVRTLCB7IHZhbHVlOiBbXSB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFkZCB0aGUgY29uZHVpdCB0byB0aGUgbGlzdCBlbnN1cmluZyBhbGwgcmVxdWlyZWQgcHJvcGVydGllcyBhcmUgcHJvdmlkZWRcbiAgICAgICAgdGFyZ2V0W0NPTkRVSVRTXS5wdXNoKHsgLi4uZGVmYXVsdENvbmR1aXRQcm9wcywgLi4ucHJvcGVydGllcywgdGFyZ2V0LCBwcm9wZXJ0eUtleSB9IGFzIENvbmR1aXRNZXRhZGF0YSk7XG4gICAgfTtcbn1cbiJdfQ==