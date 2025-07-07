import { Component } from '@angular/core';
import { ConduitZone, ConduitZoneComponent } from '@ux-aspects/ux-aspects';
import { ConduitComponentSearchComponent } from '../component-search/component-search.component';

@Component({
  selector: 'uxd-conduit-example-zone',
  templateUrl: './component-zone.component.html',
  providers: [ConduitZone],
  imports: [ConduitComponentSearchComponent],
})
export class ConduitComponentZoneComponent extends ConduitZoneComponent {
  zoneId: string = 'root-zone';
}
