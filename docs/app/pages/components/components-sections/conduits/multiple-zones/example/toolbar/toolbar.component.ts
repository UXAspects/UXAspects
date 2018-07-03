import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Conduit, ConduitZone, ConduitZoneComponent } from '../../../../../../../../../src/components/conduit/index';

@Component({
    selector: 'uxd-components-conduit-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.less'],
    providers: [ConduitZone]
})
export class ComponentsConduitToolbarComponent extends ConduitZoneComponent {

    zoneId: string = 'toolbar-zone';
    acceptsInput: boolean | string[] = true;
    producesOutput: boolean = true;

    // We want to trigger this every time it changes - even if it emitting is the same value
    @Conduit({ id: 'search', acceptsInput: false, changeDetection: () => false })
    search = new BehaviorSubject('');

    @Conduit({ id: 'show-zones' })
    showZones = new BehaviorSubject(false);

    clear(): void {
        this.search.next('');
    }

    toggle(): void {
        this.showZones.next(!this.showZones.value);
    }
}
