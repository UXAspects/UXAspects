import { Injectable, OnDestroy, Optional, SkipSelf } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ConduitSubject } from './conduit-subject';
import { ConduitEvent } from './interfaces/conduit-event';
import { ConduitMetadata } from './interfaces/conduit-metadata';

@Injectable()
export class ConduitZone implements OnDestroy {

    /** Expose an event stream of new values */
    events = new Subject<ConduitEvent>();

    /** Store a reference to the top-most zone */
    rootZone: ConduitZone = this.getRootZone();

    /** Store an internal list of all conduit subjects */
    private _subjects: ConduitSubject[] = [];

    /** Store the zone name */
    private _zoneId: string;

    constructor(@Optional() @SkipSelf() private _parentZone: ConduitZone) { }

    ngOnDestroy(): void {
        // find all conduit subjects that are part of this zone
        this.rootZone._subjects.filter(_subject => _subject.zoneId === this._zoneId)
            .forEach(_subject => this.unregisterConduit(_subject.conduit));
    }

    /** Get the top-most zone */
    getRootZone(): ConduitZone {
        return this._parentZone ? this._parentZone.getRootZone() : this;
    }

    /** Store reference to the repository and begin watching for and emitting changes */
    registerConduit(conduit: ConduitMetadata): void {
        this.rootZone._subjects.push(new ConduitSubject(conduit, this, this._zoneId));
    }

    /** Destroy a conduit */
    unregisterConduit(conduit: ConduitMetadata): void {
        const subject = this.getConduitSubject(conduit.subject);

        if (subject) {
            // remove the subject from the internal list of conduit subjects
            this.rootZone._subjects = this.rootZone._subjects.filter(_subject => _subject === subject);

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
        this.rootZone.events.next(event);
    }

    /** Retrieve a conduit subsject object from the rxjs subject */
    getConduitSubject(subject: Subject<any>): ConduitSubject | null {
        return this.rootZone._subjects.find(_subject => _subject.conduit.subject === subject);
    }

    getSubjects(): ConduitSubject[] {
        return this.rootZone._subjects;
    }
}
