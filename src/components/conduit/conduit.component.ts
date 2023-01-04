import { Directive, inject, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ConduitZone } from './conduit-zone.service';
import { ConduitProperties } from './interfaces/conduit-properties';

@Directive({
    selector: 'ux-conduit',
})
export class ConduitComponent implements OnInit, OnDestroy {
    protected _zone = inject(ConduitZone, { optional: true });

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
