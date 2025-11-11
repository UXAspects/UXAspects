import { AsyncPipe } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Conduit, ConduitZone, ConduitZoneComponent, IconModule } from '@ux-aspects/ux-aspects';
import { BehaviorSubject } from 'rxjs';
import { ConduitZoneInspectorComponent } from '../inspector/inspector.component';

@Component({
  selector: 'uxd-components-conduit-filter',
  templateUrl: './filter.component.html',
  providers: [ConduitZone],
  imports: [IconModule, FormsModule, ConduitZoneInspectorComponent, AsyncPipe],
})
export class ComponentsConduitFilterComponent extends ConduitZoneComponent {
  zoneId: string = 'filter-zone';
  acceptsInput: boolean | string[] = true;
  producesOutput: boolean = true;

  @Conduit(forwardRef(() => ({ id: 'search' })) as any)
  search = new BehaviorSubject('');

  @Conduit(forwardRef(() => ({ id: 'show-zones', producesOutput: false })) as any)
  showZones = new BehaviorSubject(false);
}
