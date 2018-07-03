import { OnDestroy, OnInit, Optional } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { invokeSuperFunction } from './conduit-utils';
import { ConduitZone } from './conduit-zone.service';
import { ConduitProperties } from './interfaces/conduit-properties';

export class ConduitComponent implements OnInit, OnDestroy {

    constructor(@Optional() protected _zone: ConduitZone) {
        // we want to ensure these functions get called even if a class overrides them
        invokeSuperFunction(this, 'ngOnInit');
        invokeSuperFunction(this, 'ngOnDestroy');
    }

    /** We need to register the conduits with the zone when the component is initialised */
    ngOnInit(): void {
        // register the conduit in the zone and ensure it gets the correct instance of the target
        this._zone.registerConduits(this);
    }

    /** We need to unregister the conduits when the component is destroyed */
    ngOnDestroy(): void {
        this._zone.unregisterConduits(this);
    }

    /** Alter the properties of a conduit dynamically */
    setConduitProperties(subject: Subject<any>, properties: Partial<ConduitProperties>): void {
        this._zone.setConduitProperties(subject, properties);
    }

    /** Programmatically create a conduit at runtime */
    createConduit(subject: Subject<any>, properties: ConduitProperties): void {
        this._zone.createConduit(subject, properties);
    }

}
