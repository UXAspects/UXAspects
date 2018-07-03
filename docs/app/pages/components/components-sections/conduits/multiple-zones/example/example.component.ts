import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Conduit, ConduitZoneComponent } from '../../../../../../../../src';

@Component({
    selector: 'uxd-conduit-zone-example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.less']
})
export class ConduitZoneExampleComponent extends ConduitZoneComponent {
    zoneId: string = 'root-zone';

    @Conduit({ id: 'show-zones', producesOutput: false })
    showZones = new BehaviorSubject(false);
}