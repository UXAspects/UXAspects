import { Component } from '@angular/core';
import { Conduit, ConduitZone, ConduitZoneComponent } from '@ux-aspects/ux-aspects';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-filter',
    templateUrl: './filter/filter.component.html',
    providers: [ConduitZone]
})
export class FilterComponent extends ConduitZoneComponent {

    zoneId: string = 'filter-zone';
    acceptsInput: boolean | string[] = true;
    producesOutput: boolean = true;

    @Conduit({ id: 'search' })
    search = new BehaviorSubject('');

    @Conduit({ id: 'show-zones', producesOutput: false })
    showZones = new BehaviorSubject(false);

}
