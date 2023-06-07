import { Subject } from 'rxjs';
import { ConduitProperties } from './conduit-properties';

export interface ConduitMetadata extends ConduitProperties {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subject?: Subject<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    currentValue?: any;
    lastModified?: Date;
    target?: object;
    propertyKey?: string;
}
