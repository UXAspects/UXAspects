/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { defaultConduitProps } from './interfaces/conduit-properties';
/**
 * Expose the property that conduits will be stored in
 */
export const /** @type {?} */ CONDUITS = '_conduits';
/**
 * Create the conduit property decorator
 * @param {?} properties
 * @return {?}
 */
export function Conduit(properties) {
    return (target, propertyKey) => {
        if (typeof properties === 'function') {
            properties = properties.call(null);
        }
        // if the target does not already have a conduit list then create one
        if (!target.hasOwnProperty(CONDUITS)) {
            Object.defineProperty(target, CONDUITS, { value: [] });
        }
        // add the conduit to the list ensuring all required properties are provided
        target[CONDUITS].push(/** @type {?} */ (Object.assign({}, defaultConduitProps, properties, { target, propertyKey })));
    };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZHVpdC5kZWNvcmF0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9jb25kdWl0L2NvbmR1aXQuZGVjb3JhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQXFCLG1CQUFtQixFQUFFLE1BQU0saUNBQWlDLENBQUM7Ozs7QUFHekYsTUFBTSxDQUFDLHVCQUFNLFFBQVEsR0FBRyxXQUFXLENBQUM7Ozs7OztBQUdwQyxNQUFNLGtCQUFrQixVQUF3QztJQUM1RCxNQUFNLENBQUMsQ0FBQyxNQUFjLEVBQUUsV0FBbUIsRUFBRSxFQUFFO1FBRTNDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sVUFBVSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDbkMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdEM7O1FBR0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUMxRDs7UUFHRCxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxtQkFBQyxrQkFBSyxtQkFBbUIsRUFBSyxVQUFVLElBQUUsTUFBTSxFQUFFLFdBQVcsR0FBcUIsRUFBQyxDQUFDO0tBQzVHLENBQUM7Q0FDTCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbmR1aXRNZXRhZGF0YSB9IGZyb20gJy4vaW50ZXJmYWNlcy9jb25kdWl0LW1ldGFkYXRhJztcbmltcG9ydCB7IENvbmR1aXRQcm9wZXJ0aWVzLCBkZWZhdWx0Q29uZHVpdFByb3BzIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2NvbmR1aXQtcHJvcGVydGllcyc7XG5cbi8qKiBFeHBvc2UgdGhlIHByb3BlcnR5IHRoYXQgY29uZHVpdHMgd2lsbCBiZSBzdG9yZWQgaW4gKi9cbmV4cG9ydCBjb25zdCBDT05EVUlUUyA9ICdfY29uZHVpdHMnO1xuXG4vKiogQ3JlYXRlIHRoZSBjb25kdWl0IHByb3BlcnR5IGRlY29yYXRvciAqL1xuZXhwb3J0IGZ1bmN0aW9uIENvbmR1aXQocHJvcGVydGllczogQ29uZHVpdFByb3BlcnRpZXMgfCBGdW5jdGlvbik6IFByb3BlcnR5RGVjb3JhdG9yIHtcbiAgICByZXR1cm4gKHRhcmdldDogT2JqZWN0LCBwcm9wZXJ0eUtleTogc3RyaW5nKSA9PiB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBwcm9wZXJ0aWVzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBwcm9wZXJ0aWVzID0gcHJvcGVydGllcy5jYWxsKG51bGwpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgdGhlIHRhcmdldCBkb2VzIG5vdCBhbHJlYWR5IGhhdmUgYSBjb25kdWl0IGxpc3QgdGhlbiBjcmVhdGUgb25lXG4gICAgICAgIGlmICghdGFyZ2V0Lmhhc093blByb3BlcnR5KENPTkRVSVRTKSkge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgQ09ORFVJVFMsIHsgdmFsdWU6IFtdIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWRkIHRoZSBjb25kdWl0IHRvIHRoZSBsaXN0IGVuc3VyaW5nIGFsbCByZXF1aXJlZCBwcm9wZXJ0aWVzIGFyZSBwcm92aWRlZFxuICAgICAgICB0YXJnZXRbQ09ORFVJVFNdLnB1c2goeyAuLi5kZWZhdWx0Q29uZHVpdFByb3BzLCAuLi5wcm9wZXJ0aWVzLCB0YXJnZXQsIHByb3BlcnR5S2V5IH0gYXMgQ29uZHVpdE1ldGFkYXRhKTtcbiAgICB9O1xufVxuIl19