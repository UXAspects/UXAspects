import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Conduit, ConduitZone, ConduitZoneComponent } from '../../../../../../../../../src/components/conduit/index';

@Component({
    selector: 'uxd-components-conduit-filter',
    templateUrl: './filter.component.html',
    providers: [ConduitZone]
})
export class ComponentsConduitFilterComponent extends ConduitZoneComponent {

    zoneId: string = 'filter-zone';
    acceptsInput: boolean | string[] = true;
    producesOutput: boolean = true;

    @Conduit({ id: 'search' })
    search = new BehaviorSubject('');

    @Conduit({ id: 'show-zones', producesOutput: false })
    showZones = new BehaviorSubject(false);

}
