import { OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ConduitZone } from './conduit-zone.service';
import { ConduitProperties } from './interfaces/conduit-properties';
export declare class ConduitComponent implements OnInit, OnDestroy {
    protected _zone: ConduitZone;
    constructor(_zone: ConduitZone);
    /** We need to register the conduits with the zone when the component is initialised */
    ngOnInit(): void;
    /** We need to unregister the conduits when the component is destroyed */
    ngOnDestroy(): void;
    /** Alter the properties of a conduit dynamically */
    setConduitProperties(subject: Subject<any>, properties: Partial<ConduitProperties>): void;
    /** Programmatically create a conduit at runtime */
    createConduit(subject: Subject<any>, properties: ConduitProperties): void;
}
