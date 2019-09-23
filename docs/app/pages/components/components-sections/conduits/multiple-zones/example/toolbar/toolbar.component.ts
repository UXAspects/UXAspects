import { Component, forwardRef } from '@angular/core';
import { Conduit, ConduitZone, ConduitZoneComponent } from '@ux-aspects/ux-aspects';
import { BehaviorSubject } from 'rxjs';

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
    @Conduit(forwardRef(() => ({ id: 'search', acceptsInput: false, changeDetection: () => false })) as any)
    search = new BehaviorSubject('');

    @Conduit(forwardRef(() => ({ id: 'show-zones' })) as any)
    showZones = new BehaviorSubject(false);

    clear(): void {
        this.search.next('');
    }

    toggle(): void {
        this.showZones.next(!this.showZones.value);
    }
}
