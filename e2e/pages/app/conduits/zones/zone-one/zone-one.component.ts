import { Component } from '@angular/core';
import { Conduit, ConduitZone, ConduitZoneComponent } from '@ux-aspects/ux-aspects';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-zone-one',
    templateUrl: './zone-one.component.html',
    providers: [ConduitZone]
})
export class ZoneOneComponent extends ConduitZoneComponent {
    zoneId: string = 'zone-one';
    producesOutput: boolean = true;
    acceptsInput2: boolean = true;
    acceptsInput3: boolean = true;

    @Conduit({ id: 'search' })
    search = new BehaviorSubject<string>('');

    updateConduit(): void {
        const acceptsInput = [];

        if (this.acceptsInput2) {
            acceptsInput.push('zone-two');
        }

        if (this.acceptsInput3) {
            acceptsInput.push('zone-three');
        }

        this.setConduitProperties(this.search, { producesOutput: this.producesOutput, acceptsInput });
    }
}
