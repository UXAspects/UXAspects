import { Component, forwardRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Conduit, ConduitZone, ConduitZoneComponent } from '../../../../../../../../src';

@Component({
    selector: 'uxd-conduit-zone-example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.less'],
    providers: [ConduitZone]
})
export class ConduitZoneExampleComponent extends ConduitZoneComponent {
    zoneId: string = 'root-zone';

    @Conduit(forwardRef(() => ({ id: 'show-zones', producesOutput: false })) as any)
    showZones = new BehaviorSubject(false);
}