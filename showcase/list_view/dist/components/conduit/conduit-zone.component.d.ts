import { OnInit } from '@angular/core';
import { ConduitComponent } from './conduit.component';
export declare abstract class ConduitZoneComponent extends ConduitComponent implements OnInit {
    abstract zoneId: string;
    ngOnInit(): void;
}
