import { Component, forwardRef } from '@angular/core';
import { Conduit, ConduitZone, ConduitZoneComponent } from '@ux-aspects/ux-aspects';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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