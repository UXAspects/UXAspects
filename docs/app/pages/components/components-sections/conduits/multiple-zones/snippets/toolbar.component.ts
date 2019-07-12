import { Component } from '@angular/core';
import { Conduit, ConduitZone, ConduitZoneComponent } from '@ux-aspects/ux-aspects';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar/toolbar.component.html',
    styleUrls: ['./toolbar/toolbar.component.css'],
    providers: [ConduitZone]
})
export class ToolbarComponent extends ConduitZoneComponent {

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
