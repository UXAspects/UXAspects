import { ConduitZone } from './conduit-zone.service';
import { ConduitEvent } from './interfaces/conduit-event';
import { ConduitMetadata } from './interfaces/conduit-metadata';
export declare class ConduitSubject {
    conduit: ConduitMetadata;
    private _zone;
    zoneId: string;
    private _subject;
    private _onDestroy;
    constructor(conduit: ConduitMetadata, _zone: ConduitZone, zoneId: string);
    /** Check all allow inputs to see if there is a value we should initially set the conduit to */
    getInitialValue(): void;
    /** This will be triggered when a conduits value has changed */
    onInput(event: ConduitEvent): void;
    /** This will be fired when this conduit emits a new value */
    onOutput(value: any): void;
    /** Unsubscribe once this subject is destroyed */
    destroy(): void;
}
