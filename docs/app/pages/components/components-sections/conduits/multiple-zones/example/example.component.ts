import { AsyncPipe } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { Conduit, ConduitZone, ConduitZoneComponent } from '@ux-aspects/ux-aspects';
import { BehaviorSubject } from 'rxjs';
import { ComponentsConduitFilterComponent } from './filter/filter.component';
import { ComponentsConduitListViewComponent } from './list-view/list-view.component';
import { ComponentsConduitToolbarComponent } from './toolbar/toolbar.component';

@Component({
  selector: 'uxd-conduit-zone-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.less'],
  providers: [ConduitZone],
  imports: [
    ComponentsConduitToolbarComponent,
    ComponentsConduitListViewComponent,
    ComponentsConduitFilterComponent,
    AsyncPipe,
  ],
})
export class ConduitZoneExampleComponent extends ConduitZoneComponent {
  zoneId: string = 'root-zone';

  @Conduit(forwardRef(() => ({ id: 'show-zones', producesOutput: false })) as any)
  showZones = new BehaviorSubject(false);
}
