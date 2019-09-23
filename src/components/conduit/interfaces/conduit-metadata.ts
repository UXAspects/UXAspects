import { Subject } from 'rxjs';
import { ConduitProperties } from './conduit-properties';

export interface ConduitMetadata extends ConduitProperties {
    subject?: Subject<any>;
    currentValue?: any;
    lastModified?: Date;
    target?: object;
    propertyKey?: string;
}
