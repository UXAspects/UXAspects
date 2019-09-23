import { Component, forwardRef } from '@angular/core';
import { Conduit, ConduitZone, ConduitZoneComponent } from '@ux-aspects/ux-aspects';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'uxd-components-conduit-filter',
    templateUrl: './filter.component.html',
    providers: [ConduitZone]
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
