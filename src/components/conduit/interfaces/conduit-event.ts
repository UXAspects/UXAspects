import { ConduitMetadata } from './conduit-metadata';

export interface ConduitEvent {
    conduit: ConduitMetadata;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
    zoneId: string;
}
