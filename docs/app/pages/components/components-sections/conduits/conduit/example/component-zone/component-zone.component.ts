import { Component } from '@angular/core';
import { ConduitZone, ConduitZoneComponent } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'uxd-conduit-example-zone',
    templateUrl: './component-zone.component.html',
    providers: [ConduitZone]
})
export class ConduitComponentZoneComponent extends ConduitZoneComponent {
    zoneId: string = 'root-zone';
}