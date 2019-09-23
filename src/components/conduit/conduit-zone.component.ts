import { OnInit } from '@angular/core';
import { ConduitComponent } from './conduit.component';

export abstract class ConduitZoneComponent extends ConduitComponent implements OnInit {
    abstract zoneId: string;

    ngOnInit(): void {
        this._zone.setZoneId(this.zoneId);
    }
}
