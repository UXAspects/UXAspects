import { Component } from '@angular/core';
import { ConduitZone, ConduitZoneComponent } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    providers: [ConduitZone]
})
export class AppComponent extends ConduitZoneComponent {
    zoneId: string = 'root-zone';
}