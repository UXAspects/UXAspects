import { ConduitMetadata } from './conduit-metadata';
export interface ConduitEvent {
    conduit: ConduitMetadata;
    value: any;
    zoneId: string;
}
