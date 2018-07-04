import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ConduitSubject } from './conduit-subject';
import { ConduitEvent } from './interfaces/conduit-event';
import { ConduitMetadata } from './interfaces/conduit-metadata';
import { ConduitProperties } from './interfaces/conduit-properties';

@Injectable()
export class ConduitZone implements OnDestroy {

    /** Create a global subject store */
    static subjects: ConduitSubject[] = [];

    /** Expose an event stream of new values */
    static events = new Subject<ConduitEvent>();

    /** Store the zone name */
    private _zoneId: string;

    ngOnDestroy(): void {
        // find all conduit subjects that are part of this zone
        ConduitZone.subjects.filter(_subject => _subject.zoneId === this._zoneId)
            .forEach(_subject => this.unregisterConduit(_subject.conduit));
    }

    /** Store reference to the repository and begin watching for and emitting changes */
    registerConduit(conduit: ConduitMetadata): void {
        ConduitZone.subjects.push(new ConduitSubject(conduit, this, this._zoneId));
    }

    /** Destroy a conduit */
    unregisterConduit(conduit: ConduitMetadata): void {
        const subject = this.getConduitSubject(conduit.subject);

        if (subject) {
            // remove the subject from the internal list of conduit subjects
            ConduitZone.subjects = ConduitZone.subjects.filter(_subject => _subject !== subject);

            // perform all unsubscriptions
            subject.destroy();
        }
    }

    /** Provide the zone with an ID */
    setZoneId(zoneId: string): void {
        this._zoneId = zoneId;
    }

    /** Emit a value to all zones for checking */
    emit(event: ConduitEvent): void {
        ConduitZone.events.next(event);
    }

    /** Retrieve a conduit subsject object from the rxjs subject */
    getConduitSubject(subject: Subject<any>): ConduitSubject | null {
        return ConduitZone.subjects.find(_subject => _subject.conduit.subject === subject);
    }

    /** Get all subjects from all zones */
    getSubjects(): ConduitSubject[] {
        return ConduitZone.subjects;
    }

    /** Alter the properties of a conduit dynamically */
    setConduitProperties(subject: Subject<any>, properties: Partial<ConduitProperties>): void {

        // find the conduit with the matching subject
        const conduitSubject = this.getSubjects().find(_conduit => _conduit.conduit.subject === subject);

        // if a match was found update the properties
        if (conduitSubject) {

            // update each specified property
            for (const prop in properties) {
                conduitSubject.conduit[prop] = properties[prop];
            }
        }
    }

    /** Programmatically create a conduit at runtime */
    createConduit(subject: Subject<any>, properties: ConduitProperties): void {

        // register the conduit with the zone
        this.registerConduit({ ...properties, subject });
    }

    /** Register all conduits in a component */
    registerConduits(component: any): void {
        if (Array.isArray(component._conduits)) {
            component._conduits.forEach((conduit: ConduitMetadata) => this.registerConduit({ ...conduit, subject: component[conduit.propertyKey] }));
        }
    }

    /** Register all conduits in a component */
    unregisterConduits(component: any): void {
        if (Array.isArray(component._conduits)) {
            component._conduits.forEach((conduit: ConduitMetadata) => this.unregisterConduit(conduit));
        }
    }

    /** Return the global event stream */
    getEvents(): Subject<ConduitEvent> {
        return ConduitZone.events;
    }
}
