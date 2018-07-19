import { ConduitProperties } from './interfaces/conduit-properties';
/** Expose the property that conduits will be stored in */
export declare const CONDUITS = "_conduits";
/** Create the conduit property decorator */
export declare function Conduit(properties: ConduitProperties | Function): PropertyDecorator;
