import { OnDestroy, OnInit, Optional } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { invokeSuperFunction } from './conduit-utils';
import { ConduitZone } from './conduit-zone.service';
import { ConduitMetadata } from './interfaces/conduit-metadata';
import { ConduitProperties } from './interfaces/conduit-properties';

export class ConduitComponent implements OnInit, OnDestroy {

    /** Store the internal list of conduits */
    private _conduits: ConduitMetadata[];

    constructor(@Optional() protected _zone: ConduitZone) {
        // we want to ensure these functions get called even if a class overrides them
        invokeSuperFunction(this, 'ngOnInit');
        invokeSuperFunction(this, 'ngOnDestroy');
    }

    /** We need to register the conduits with the zone when the component is initialised */
    ngOnInit(): void {
        // register the conduit in the zone and ensure it gets the correct instance of the target
        if (Array.isArray(this._conduits)) {
            this._conduits.forEach(conduit => this._zone.registerConduit({ ...conduit, subject: this[conduit.propertyKey] }));
        }
    }

    /** We need to unregister the conduits when the component is destroyed */
    ngOnDestroy(): void {
        if (Array.isArray(this._conduits)) {
            this._conduits.forEach(conduit => this._zone.unregisterConduit(conduit));
        }
    }

    /** Alter the properties of a conduit dynamically */
    setConduitProperties(subject: Subject<any>, properties: Partial<ConduitProperties>): void {

        // find the conduit with the matching subject
        const conduitSubject = this._zone.getSubjects().find(_conduit => _conduit.conduit.subject === subject);

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

        // if the internal conduits array does not exist then create it
        if (!Array.isArray(this._conduits)) {
            this._conduits = [];
        }

        // add the conduit to the internal list
        this._conduits.push(properties);

        // register the conduit with the zone
        this._zone.registerConduit({ ...properties, subject });
    }

}
