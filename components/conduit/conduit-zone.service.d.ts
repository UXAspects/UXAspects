import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ConduitSubject } from './conduit-subject';
import { ConduitEvent } from './interfaces/conduit-event';
import { ConduitMetadata } from './interfaces/conduit-metadata';
import { ConduitProperties } from './interfaces/conduit-properties';
export declare class ConduitZone implements OnDestroy {
    /** Create a global subject store */
    static subjects: ConduitSubject[];
    /** Expose an event stream of new values */
    static events: Subject<ConduitEvent>;
    /** Store the zone name */
    private _zoneId;
    ngOnDestroy(): void;
    /** Store reference to the repository and begin watching for and emitting changes */
    registerConduit(conduit: ConduitMetadata): void;
    /** Destroy a conduit */
    unregisterConduit(conduit: ConduitMetadata): void;
    /** Provide the zone with an ID */
    setZoneId(zoneId: string): void;
    /** Emit a value to all zones for checking */
    emit(event: ConduitEvent): void;
    /** Retrieve a conduit subsject object from the rxjs subject */
    getConduitSubject(subject: Subject<any>): ConduitSubject | null;
    /** Get all subjects from all zones */
    getSubjects(): ConduitSubject[];
    /** Alter the properties of a conduit dynamically */
    setConduitProperties(subject: Subject<any>, properties: Partial<ConduitProperties>): void;
    /** Programmatically create a conduit at runtime */
    createConduit(subject: Subject<any>, properties: ConduitProperties): void;
    /** Register all conduits in a component */
    registerConduits(component: any): void;
    /** Register all conduits in a component */
    unregisterConduits(component: any): void;
    /** Return the global event stream */
    getEvents(): Subject<ConduitEvent>;
}
