import { ConduitMetadata } from './interfaces/conduit-metadata';
import { ConduitProperties, defaultConduitProps } from './interfaces/conduit-properties';

/** Expose the property that conduits will be stored in */
export const CONDUITS = '_conduits';

/** Create the conduit property decorator */
export function Conduit(properties: ConduitProperties | Function): PropertyDecorator {
    return (target: Object, propertyKey: string) => {

        if (typeof properties === 'function') {
            properties = properties.call(null);
        }

        // if the target does not already have a conduit list then create one
        if (!target.hasOwnProperty(CONDUITS)) {
            Object.defineProperty(target, CONDUITS, { value: [] });
        }

        // add the conduit to the list ensuring all required properties are provided
        target[CONDUITS].push({ ...defaultConduitProps, ...properties, target, propertyKey } as ConduitMetadata);
    };
}
